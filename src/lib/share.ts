import "server-only";
import { eq } from "drizzle-orm";
import { db, t } from "@/db";
import { accessLevel } from "./access";
import { type Variants, paywallMode } from "./experiments";
import { getQuiz } from "./quizzes";

export const SHARE_FORMATS = {
  og: { width: 1200, height: 630 },
  x: { width: 1200, height: 675 },
  story: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
} as const;
export type ShareFormat = keyof typeof SHARE_FORMATS;

/**
 * What a public share link may show: the quiz and the headline result only.
 * If the taker is on a full-paywall variant and hasn't paid, the result itself stays private.
 */
export async function shareInfo(code: string) {
  if (!/^[A-Za-z0-9_-]{6,20}$/.test(code)) return null;
  const [a] = await db().select().from(t.attempts).where(eq(t.attempts.shareCode, code)).limit(1);
  if (!a) return null;
  const quiz = await getQuiz(a.quizSlug);
  if (!quiz) return null;
  const outcome = quiz.outcomes.find((o) => o.key === a.outcomeKey);
  const hidden = paywallMode(quiz, (a.variants ?? {}) as Variants) === "full" && (await accessLevel(a)) === "free";
  return {
    quiz: { slug: quiz.slug, title: quiz.title, tagline: quiz.tagline, minutes: quiz.minutes },
    outcome: hidden || !outcome ? null : { key: outcome.key, name: outcome.name, tagline: outcome.tagline, emoji: outcome.emoji ?? "✨", summary: outcome.summary },
  };
}
