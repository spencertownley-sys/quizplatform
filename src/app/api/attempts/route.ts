import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { getQuiz } from "@/content";
import { AnswerValidationError, scoreQuiz } from "@/lib/engine/score";
import { ensureGuest } from "@/lib/viewer";

const Body = z.object({
  slug: z.string().min(1).max(100),
  answers: z.record(z.string(), z.union([z.number(), z.string()])),
  email: z.email().max(254).optional(),
});

/** Score a finished quiz on the server and save the attempt. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { slug, answers, email } = parsed.data;

  const quiz = getQuiz(slug);
  if (!quiz) return NextResponse.json({ error: "Unknown quiz" }, { status: 404 });

  let result;
  try {
    result = scoreQuiz(quiz, answers);
  } catch (e) {
    if (e instanceof AnswerValidationError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }

  const viewer = await ensureGuest();
  const accessToken = randomBytes(24).toString("base64url");
  const [row] = await db()
    .insert(t.attempts)
    .values({
      quizSlug: slug,
      guestSessionId: viewer.guestId,
      userId: viewer.userId,
      email: email?.toLowerCase() ?? null,
      accessToken,
      answers,
      outcomeKey: result.outcomeKey,
      scores: result,
    })
    .returning({ id: t.attempts.id });

  // TODO(email): if `email` is set, send the free result + magic link via Resend/Postmark.
  return NextResponse.json({ id: row.id, token: accessToken });
}
