import { and, eq, gte, isNotNull, lte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { accessLevel } from "@/lib/access";
import { winbackOfferEmail, winbackSampleEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { resultUrl, unsubscribeUrl } from "@/lib/links";
import { getQuiz, onSale } from "@/lib/quizzes";

const HOUR = 3_600_000;

/**
 * Win-back emails (daily cron), only to people who gave their email AND ticked
 * "send me follow-ups", saw a paid report offer, and didn't buy:
 *   1 day after: one free section of their Deep Report.
 *   4 days after: a one-time discount code (WINBACK_PROMO_CODE), then nothing more.
 * Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });

  const now = Date.now();
  const stages = [
    { from: 0, to: 1, after: 24 * HOUR },
    ...(process.env.WINBACK_PROMO_CODE ? [{ from: 1, to: 2, after: 96 * HOUR }] : []),
  ];
  let sent = 0;

  for (const stage of stages) {
    const due = await db()
      .select()
      .from(t.attempts)
      .where(
        and(
          eq(t.attempts.marketingConsent, true),
          isNotNull(t.attempts.email),
          eq(t.attempts.winbackStage, stage.from),
          lte(t.attempts.completedAt, new Date(now - stage.after)),
          gte(t.attempts.completedAt, new Date(now - 14 * 24 * HOUR)),
        ),
      )
      .limit(200);

    for (const a of due) {
      // Claim the stage first so overlapping runs never double-send.
      const claimed = await db()
        .update(t.attempts)
        .set({ winbackStage: stage.to })
        .where(and(eq(t.attempts.id, a.id), eq(t.attempts.winbackStage, stage.from)))
        .returning({ id: t.attempts.id });
      if (!claimed.length) continue;

      const quiz = await getQuiz(a.quizSlug);
      const outcome = quiz?.outcomes.find((o) => o.key === a.outcomeKey);
      if (!quiz || !outcome || !onSale(quiz) || !outcome.deep[0]) continue;
      if ((await accessLevel(a)) !== "free") continue;

      const common = { to: a.email!, quizTitle: quiz.title, outcomeName: outcome.name, resultUrl: resultUrl(a.id, a.accessToken), unsubscribeUrl: unsubscribeUrl(a.email!) };
      const r =
        stage.to === 1
          ? await sendEmail(winbackSampleEmail({ ...common, section: outcome.deep[0] }))
          : await sendEmail(winbackOfferEmail({ ...common, code: process.env.WINBACK_PROMO_CODE! }));
      if (r.ok) sent++;
    }
  }
  return NextResponse.json({ ok: true, sent });
}
