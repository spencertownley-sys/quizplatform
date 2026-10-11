import { scaleOf } from "./score";
import type { Answers, QuizDefinition, ScoreResult } from "./types";

export interface Comparison {
  /** 0–1 */
  overall: number;
  dimensions: { key: string; label: string; a: number; b: number; match: number }[];
  /** Likert items where the two answered furthest apart. */
  gaps: { id: string; text: string; a: number; b: number; gap: number }[];
  sameOutcome: boolean;
}

/** Each person is scored alone; this compares the two results dimension by dimension. */
export function compareResults(
  quiz: QuizDefinition,
  a: { answers: Answers; scores: ScoreResult },
  b: { answers: Answers; scores: ScoreResult },
): Comparison {
  // Compare every dimension that has comparison copy; otherwise the ones that decide the outcome.
  const keys = quiz.compare ? Object.keys(quiz.compare.dimensions) : (quiz.outcomeDimensions ?? quiz.dimensions.map((d) => d.key));
  const dimensions = keys.map((key) => {
    const na = a.scores.dimensions[key]?.normalized ?? 0;
    const nb = b.scores.dimensions[key]?.normalized ?? 0;
    return { key, label: quiz.dimensions.find((d) => d.key === key)?.label ?? key, a: na, b: nb, match: 1 - Math.abs(na - nb) };
  });

  const gaps = quiz.questions
    .filter((q) => q.kind === "likert" && q.scored !== false)
    .map((q) => {
      const s = scaleOf(quiz, q.kind === "likert" ? q : undefined);
      const va = a.answers[q.id];
      const vb = b.answers[q.id];
      if (typeof va !== "number" || typeof vb !== "number") return null;
      return { id: q.id, text: q.text, a: va, b: vb, gap: Math.abs(va - vb) / (s.labels.length - 1) };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null && g.gap > 0)
    .sort((x, y) => y.gap - x.gap)
    .slice(0, 8);

  const overall = dimensions.reduce((s, d) => s + d.match, 0) / Math.max(1, dimensions.length);
  return { overall, dimensions, gaps, sameOutcome: a.scores.outcomeKey === b.scores.outcomeKey };
}
