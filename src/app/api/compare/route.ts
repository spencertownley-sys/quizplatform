import { randomBytes } from "node:crypto";
import { and, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { isOwner } from "@/lib/access";
import { appUrl } from "@/lib/env";
import { getQuiz } from "@/lib/quizzes";
import { getViewer } from "@/lib/viewer";

const Body = z.object({ attemptId: z.uuid() });
const token = () => randomBytes(18).toString("base64url");

/**
 * Compare mode (P-11): the owner of a result creates an invite link for a partner
 * or friend. Reuses an open invite so sharing twice doesn't create clutter.
 */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, parsed.data.attemptId)).limit(1);
  const viewer = await getViewer();
  // Only the person who took the quiz can invite someone to compare with it.
  if (!attempt || !isOwner(attempt, viewer)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const quiz = await getQuiz(attempt.quizSlug);
  if (!quiz?.compare) return NextResponse.json({ error: "This quiz doesn't have compare mode." }, { status: 400 });

  const [open] = await db()
    .select()
    .from(t.comparisons)
    .where(and(eq(t.comparisons.attemptA, attempt.id), isNull(t.comparisons.attemptB)))
    .limit(1);
  const c =
    open ??
    (
      await db()
        .insert(t.comparisons)
        .values({ quizSlug: quiz.slug, attemptA: attempt.id, inviteToken: token(), accessToken: token() })
        .returning()
    )[0];

  return NextResponse.json({
    inviteUrl: `${appUrl()}/compare/join/${c.inviteToken}`,
    comparisonUrl: `${appUrl()}/compare/${c.id}?k=${encodeURIComponent(c.accessToken)}`,
  });
}
