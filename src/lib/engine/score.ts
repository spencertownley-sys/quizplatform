import type {
  Answers,
  ChoiceQuestion,
  DimensionScore,
  LikertQuestion,
  QuizDefinition,
  ScoreResult,
} from "./types";

export class AnswerValidationError extends Error {}
export class NotImplementedError extends Error {}

/**
 * Server-side check that every question is answered with a legal value.
 * Never score answers straight from the client without this.
 */
export function validateAnswers(quiz: QuizDefinition, answers: Answers): void {
  const points = quiz.likertPoints ?? 5;
  for (const q of quiz.questions) {
    const a = answers[q.id];
    if (a === undefined) throw new AnswerValidationError(`Missing answer for ${q.id}`);
    if (q.kind === "likert") {
      if (typeof a !== "number" || !Number.isInteger(a) || a < 1 || a > points) {
        throw new AnswerValidationError(`Answer for ${q.id} must be an integer 1–${points}`);
      }
    } else if (typeof a !== "string" || !q.options.some((o) => o.id === a)) {
      throw new AnswerValidationError(`Answer for ${q.id} is not one of its options`);
    }
  }
  const known = new Set(quiz.questions.map((q) => q.id));
  for (const id of Object.keys(answers)) {
    if (!known.has(id)) throw new AnswerValidationError(`Unknown question ${id}`);
  }
}

function likertScores(quiz: QuizDefinition, answers: Answers): Record<string, DimensionScore> {
  const points = quiz.likertPoints ?? 5;
  const out: Record<string, DimensionScore> = {};
  for (const d of quiz.dimensions) out[d.key] = { raw: 0, max: 0, normalized: 0 };
  const counts: Record<string, number> = {};

  for (const q of quiz.questions.filter((q): q is LikertQuestion => q.kind === "likert")) {
    const v = answers[q.id] as number;
    const value = q.reverse ? points + 1 - v : v;
    const d = out[q.dimension];
    if (!d) throw new Error(`Question ${q.id} uses unknown dimension ${q.dimension}`);
    d.raw += value;
    d.max += points;
    counts[q.dimension] = (counts[q.dimension] ?? 0) + 1;
  }
  for (const [key, d] of Object.entries(out)) {
    const n = counts[key] ?? 0;
    // Map n..n*points onto 0..1 so a neutral answer pattern sits at 0.5.
    d.normalized = n === 0 ? 0 : (d.raw - n) / (n * (points - 1));
  }
  return out;
}

function choiceScores(quiz: QuizDefinition, answers: Answers): Record<string, DimensionScore> {
  const out: Record<string, DimensionScore> = {};
  for (const d of quiz.dimensions) out[d.key] = { raw: 0, max: 0, normalized: 0 };

  for (const q of quiz.questions.filter((q): q is ChoiceQuestion => q.kind === "choice")) {
    const picked = q.options.find((o) => o.id === answers[q.id]);
    for (const d of quiz.dimensions) {
      out[d.key].max += Math.max(0, ...q.options.map((o) => o.weights[d.key] ?? 0));
    }
    for (const [dim, w] of Object.entries(picked?.weights ?? {})) {
      if (!out[dim]) throw new Error(`Option in ${q.id} uses unknown dimension ${dim}`);
      out[dim].raw += w;
    }
  }
  for (const d of Object.values(out)) d.normalized = d.max === 0 ? 0 : d.raw / d.max;
  return out;
}

/** Highest normalized score wins; ties go to the dimension listed first. */
function rank(quiz: QuizDefinition, dims: Record<string, DimensionScore>) {
  return quiz.dimensions
    .map((d, i) => ({ key: d.key, score: dims[d.key].normalized, i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map(({ key, score }) => ({ key, score }));
}

export function scoreQuiz(quiz: QuizDefinition, answers: Answers): ScoreResult {
  validateAnswers(quiz, answers);
  const hasChoice = quiz.questions.some((q) => q.kind === "choice");
  const hasLikert = quiz.questions.some((q) => q.kind === "likert");
  if (hasChoice && hasLikert) throw new Error(`${quiz.slug}: mixing likert and choice items is not supported`);
  const dims = hasChoice ? choiceScores(quiz, answers) : likertScores(quiz, answers);

  switch (quiz.structure) {
    case "trait_profile":
    case "typology":
    case "persona_match": {
      // Outcome keys equal dimension keys for these structures.
      const ranking = rank(quiz, dims);
      return { outcomeKey: ranking[0].key, dimensions: dims, ranking };
    }
    case "two_axis_quadrant": {
      const cfg = quiz.quadrant;
      if (!cfg) throw new Error(`${quiz.slug}: two_axis_quadrant needs a quadrant config`);
      const lvl = (v: number) => (v >= cfg.cutoff ? "high" : "low");
      const corner = `${lvl(dims[cfg.x].normalized)}_${lvl(dims[cfg.y].normalized)}` as keyof typeof cfg.map;
      const outcomeKey = cfg.map[corner];
      return { outcomeKey, dimensions: dims, ranking: [{ key: outcomeKey, score: 1 }] };
    }
    case "screener": {
      const bands = [...(quiz.screenerBands ?? [])].sort((a, b) => b.min - a.min);
      const total = Object.values(dims).reduce((s, d) => s + d.raw, 0);
      const band = bands.find((b) => total >= b.min);
      if (!band) throw new Error(`${quiz.slug}: no screener band covers total ${total}`);
      return { outcomeKey: band.outcome, dimensions: dims, ranking: [{ key: band.outcome, score: total }] };
    }
    default:
      throw new NotImplementedError(`Structure "${quiz.structure}" is not implemented yet`);
  }
}

/** Sanity checks run in tests for every quiz definition. */
export function lintQuiz(quiz: QuizDefinition): string[] {
  const problems: string[] = [];
  const dimKeys = new Set(quiz.dimensions.map((d) => d.key));
  const outcomeKeys = new Set(quiz.outcomes.map((o) => o.key));
  const ids = new Set<string>();

  for (const q of quiz.questions) {
    if (ids.has(q.id)) problems.push(`duplicate question id ${q.id}`);
    ids.add(q.id);
    if (q.text.split(/\s+/).length > 25) problems.push(`${q.id} is over 25 words`);
    if (q.kind === "likert" && !dimKeys.has(q.dimension)) problems.push(`${q.id} unknown dimension`);
    if (q.kind === "choice") {
      for (const o of q.options) {
        for (const k of Object.keys(o.weights)) if (!dimKeys.has(k)) problems.push(`${q.id}/${o.id} unknown dimension ${k}`);
      }
    }
  }
  if (["trait_profile", "typology", "persona_match"].includes(quiz.structure)) {
    for (const k of dimKeys) if (!outcomeKeys.has(k)) problems.push(`no outcome for dimension ${k}`);
  }
  if (quiz.quadrant) {
    for (const k of Object.values(quiz.quadrant.map)) if (!outcomeKeys.has(k)) problems.push(`quadrant maps to missing outcome ${k}`);
  }
  if (quiz.structure === "trait_profile" || quiz.structure === "two_axis_quadrant") {
    // Roughly a third of trait items should be reverse-keyed so yes-saying doesn't produce a result.
    const likert = quiz.questions.filter((q) => q.kind === "likert");
    const reversed = likert.filter((q) => q.kind === "likert" && q.reverse).length;
    if (likert.length >= 8 && reversed / likert.length < 0.2) problems.push("fewer than 20% of items are reverse-keyed");
  }
  if (quiz.isScreener && quiz.paywall !== "free_headline") problems.push("screeners must not be paywalled");
  return problems;
}
