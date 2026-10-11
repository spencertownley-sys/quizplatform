import { randomBytes } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import { NextResponse, after } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { viewerAge } from "@/lib/age-server";
import { countEvent } from "@/lib/analytics-server";
import { comparisonReadyEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { AnswerValidationError, scoreQuiz } from "@/lib/engine/score";
import { variantLabel, variantsFor } from "@/lib/experiments";
import { comparisonUrl } from "@/lib/links";
import { sendResultCopy } from "@/lib/notify";
import { getQuiz } from "@/lib/quizzes";
import { rateLimit } from "@/lib/ratelimit";
import { ensureGuest } from "@/lib/viewer";

const Answer = z.union([z.number(), z.string().max(200), z.array(z.string().max(100)).max(50), z.null()]);
const Body = z.object({
  slug: z.string().min(1).max(100),
  answers: z.record(z.string().max(100), Answer),
  email: z.email().max(254).optional(),
  consent: z.boolean().optional(),
  /** Joining a partner's comparison invite. */
  compareToken: z.string().max(100).optional(),
});

const token = (bytes = 24) => randomBytes(bytes).toString("base64url");

/** Score a finished quiz on the server and save the attempt. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { slug, answers, email, consent, compareToken } = parsed.data;

  const quiz = await getQuiz(slug);
  if (!quiz) return NextResponse.json({ error: "Unknown quiz" }, { status: 404 });

  const viewer = await ensureGuest();
  if (!(await rateLimit(`attempt:${viewer.guestId}`, 60, 3600))) {
    return NextResponse.json({ error: "Too many quizzes in a short time. Try again in a bit." }, { status: 429 });
  }

  const age = await viewerAge(viewer.guestId);
  if (age.underage) return NextResponse.json({ error: "underage" }, { status: 403 });
  if (age.age === null) return NextResponse.json({ error: "age_required" }, { status: 403 });
  if (age.age < quiz.minAge) return NextResponse.json({ error: `This quiz is for ages ${quiz.minAge} and over.` }, { status: 403 });

  let result;
  try {
    result = scoreQuiz(quiz, answers);
  } catch (e) {
    if (e instanceof AnswerValidationError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }

  const variants = variantsFor(viewer.guestId, quiz);
  const [attempt] = await db()
    .insert(t.attempts)
    .values({
      quizSlug: slug,
      guestSessionId: viewer.guestId,
      userId: viewer.userId,
      email: email?.toLowerCase() ?? null,
      marketingConsent: !!(email && consent),
      accessToken: token(),
      shareCode: token(9),
      answers,
      outcomeKey: result.outcomeKey,
      scores: result,
      ageBand: age.band,
      variants,
    })
    .returning();

  if (email) {
    await db().update(t.guestSessions).set({ email: email.toLowerCase() }).where(and(eq(t.guestSessions.id, viewer.guestId), isNull(t.guestSessions.email)));
  }

  // Second person finishing a comparison invite.
  let comparison: { id: string; url: string } | undefined;
  if (compareToken) {
    const [c] = await db()
      .update(t.comparisons)
      .set({ attemptB: attempt.id, completedAt: new Date() })
      .where(and(eq(t.comparisons.inviteToken, compareToken), eq(t.comparisons.quizSlug, slug), isNull(t.comparisons.attemptB)))
      .returning();
    if (c) {
      comparison = { id: c.id, url: `/compare/${c.id}?k=${encodeURIComponent(c.accessToken)}` };
      const [a] = await db().select().from(t.attempts).where(eq(t.attempts.id, c.attemptA)).limit(1);
      if (a?.email && a.guestSessionId !== viewer.guestId) {
        after(() =>
          sendEmail(comparisonReadyEmail({ to: a.email!, quizTitle: quiz.title, other: quiz.compare?.other ?? "partner", url: comparisonUrl(c.id, c.accessToken) })),
        );
      }
    }
  }

  after(async () => {
    const v = variantLabel(variants);
    await countEvent("quiz_complete", slug, v);
    if (email) await countEvent("email_captured", slug, v);
    await sendResultCopy(attempt, quiz);
  });

  return NextResponse.json({ id: attempt.id, token: attempt.accessToken, comparison });
}
