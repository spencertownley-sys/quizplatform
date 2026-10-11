import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db, t } from "@/db";
import type { QuizDefinition, ScoreResult } from "./engine/types";

/** No percentile, and no estimated score, until a quiz has this many takers (PRD rule). */
export const NORM_MIN = 1000;

const countCache = new Map<string, { at: number; n: number }>();

export async function takerCount(slug: string): Promise<number> {
  const hit = countCache.get(slug);
  if (hit && Date.now() - hit.at < 10 * 60_000) return hit.n;
  const [row] = await db()
    .select({ n: sql<number>`count(*)::int` })
    .from(t.attempts)
    .where(eq(t.attempts.quizSlug, slug));
  countCache.set(slug, { at: Date.now(), n: row.n });
  return row.n;
}

export interface Norms {
  takers: number;
  /** Dimension key → share of takers scoring lower (0–100). */
  percentiles: Record<string, number>;
  /** Ability tests: IQ-style estimate with a stated margin, only with enough norm data. */
  estimate?: { score: number; low: number; high: number };
  /** Performance tools: percentile within the taker's age band. */
  agePercentile?: { band: string; percentile: number; takers: number };
}

/** Standard normal inverse CDF (Acklam's approximation), for percentile → IQ-style score. */
function probit(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const q = Math.min(Math.max(p, 0.001), 0.999);
  if (q < 0.02425) {
    const r = Math.sqrt(-2 * Math.log(q));
    return (((((c[0] * r + c[1]) * r + c[2]) * r + c[3]) * r + c[4]) * r + c[5]) / ((((d[0] * r + d[1]) * r + d[2]) * r + d[3]) * r + 1);
  }
  if (q > 1 - 0.02425) return -probit(1 - q);
  const r = q - 0.5;
  const s = r * r;
  return ((((((a[0] * s + a[1]) * s + a[2]) * s + a[3]) * s + a[4]) * s + a[5]) * r) / (((((b[0] * s + b[1]) * s + b[2]) * s + b[3]) * s + b[4]) * s + 1);
}

/** Percentiles against our own takers, or null before NORM_MIN takers. */
export async function normsFor(quiz: QuizDefinition, scores: ScoreResult, ageBandValue: string | null): Promise<Norms | null> {
  if (quiz.isScreener) return null;
  const takers = await takerCount(quiz.slug);
  if (takers < NORM_MIN) return null;

  const percentiles: Record<string, number> = {};
  for (const [key, d] of Object.entries(scores.dimensions)) {
    const [row] = await db()
      .select({
        below: sql<number>`count(*) filter (where (${t.attempts.scores}->'dimensions'->${key}->>'normalized')::float8 < ${d.normalized})::int`,
        n: sql<number>`count(*)::int`,
      })
      .from(t.attempts)
      .where(eq(t.attempts.quizSlug, quiz.slug));
    percentiles[key] = row.n ? Math.round((row.below / row.n) * 100) : 50;
  }
  const norms: Norms = { takers, percentiles };

  if (quiz.structure === "ability") {
    const accuracy = Number(scores.extras?.accuracy ?? 0) / 100;
    const [row] = await db()
      .select({
        below: sql<number>`count(*) filter (where (${t.attempts.scores}->'extras'->>'accuracy')::float8 / 100 < ${accuracy})::int`,
        n: sql<number>`count(*)::int`,
      })
      .from(t.attempts)
      .where(eq(t.attempts.quizSlug, quiz.slug));
    const p = (row.below + 0.5) / (row.n + 1);
    const score = Math.round(100 + 15 * probit(p));
    // A 30-item online test is far less precise than a clinical test; we assume reliability ~0.8
    // and show a 95% range (±1.96 × SEM, SEM = 15·√(1−0.8) ≈ 6.7).
    norms.estimate = { score, low: score - 13, high: score + 13 };
  }

  if (quiz.structure === "performance" && ageBandValue) {
    const [row] = await db()
      .select({
        below: sql<number>`count(*) filter (where (${t.attempts.scores}->>'total')::float8 > ${scores.total ?? 0})::int`,
        n: sql<number>`count(*)::int`,
      })
      .from(t.attempts)
      .where(and(eq(t.attempts.quizSlug, quiz.slug), eq(t.attempts.ageBand, ageBandValue)));
    if (row.n >= 200) norms.agePercentile = { band: ageBandValue, percentile: Math.round((row.below / row.n) * 100), takers: row.n };
  }
  return norms;
}
