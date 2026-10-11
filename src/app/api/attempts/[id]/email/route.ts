import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { canViewAttempt } from "@/lib/access";
import { countEvent } from "@/lib/analytics-server";
import { sendResultCopy } from "@/lib/notify";
import { getQuiz } from "@/lib/quizzes";
import { getViewer } from "@/lib/viewer";

const Body = z.object({ token: z.string().max(100).optional(), email: z.email().max(254), consent: z.boolean().optional() });

/** "Email me a copy" from the result page (the email-after-result variant, or a later change of mind). */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });

  const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, id)).limit(1);
  const viewer = await getViewer();
  if (!attempt || !canViewAttempt(attempt, viewer, parsed.data.token)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const quiz = await getQuiz(attempt.quizSlug);
  if (!quiz) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const email = parsed.data.email.toLowerCase();
  const [updated] = await db()
    .update(t.attempts)
    .set({ email, marketingConsent: !!parsed.data.consent })
    .where(eq(t.attempts.id, attempt.id))
    .returning();
  await countEvent("email_captured", quiz.slug);
  await sendResultCopy(updated, quiz);
  return NextResponse.json({ ok: true });
}
