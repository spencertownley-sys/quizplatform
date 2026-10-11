import { computeChart, validateChartAnswers } from "./astro";
import { AGREE_5, scaleMax, scaleStart } from "./scales";
import type {
  Answers,
  BandConfig,
  CatalogItem,
  DimensionScore,
  LikertQuestion,
  QuizDefinition,
  Scale,
  ScoreResult,
} from "./types";

export class AnswerValidationError extends Error {}

export const scaleOf = (quiz: QuizDefinition, q?: LikertQuestion): Scale => q?.scale ?? quiz.scale ?? AGREE_5;

/** Band names used for per-dimension report text. */
export type Level = "low" | "mid" | "high";
export const levelOf = (normalized: number): Level => (normalized < 0.35 ? "low" : normalized > 0.65 ? "high" : "mid");

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const EPS = 1e-9;

/** Trial answer keys for performance quizzes: t1..tN. */
export const trialKeys = (quiz: QuizDefinition) =>
  Array.from({ length: quiz.performance?.trials ?? 0 }, (_, i) => `t${i + 1}`);

/**
 * Server-side check that every question is answered with a legal value.
 * Never score answers straight from the client without this.
 * `partial` allows unanswered items (midpoint preview).
 */
export function validateAnswers(quiz: QuizDefinition, answers: Answers, opts: { partial?: boolean } = {}): void {
  if (quiz.structure === "performance") return validateTrials(quiz, answers);
  if (quiz.structure === "chart") {
    const err = validateChartAnswers(answers);
    if (err) throw new AnswerValidationError(err);
    return;
  }

  for (const q of quiz.questions) {
    const a = answers[q.id];
    if (a === undefined) {
      if (opts.partial || q.kind === "ability") continue; // timed tests may end with items unanswered
      throw new AnswerValidationError(`Missing answer for ${q.id}`);
    }
    switch (q.kind) {
      case "likert":
      case "attention": {
        const s = q.kind === "likert" ? scaleOf(quiz, q) : scaleOf(quiz);
        if (typeof a !== "number" || !Number.isInteger(a) || a < scaleStart(s) || a > scaleMax(s)) {
          throw new AnswerValidationError(`Answer for ${q.id} must be an integer ${scaleStart(s)}–${scaleMax(s)}`);
        }
        break;
      }
      case "choice":
        if (typeof a !== "string" || !q.options.some((o) => o.id === a)) {
          throw new AnswerValidationError(`Answer for ${q.id} is not one of its options`);
        }
        break;
      case "multi": {
        const ok =
          Array.isArray(a) &&
          a.length >= 1 &&
          a.length <= (q.max ?? q.options.length) &&
          new Set(a).size === a.length &&
          a.every((id) => q.options.some((o) => o.id === id));
        if (!ok) throw new AnswerValidationError(`Answer for ${q.id} must be 1–${q.max ?? q.options.length} of its options`);
        break;
      }
      case "ability":
        if (a !== null && (typeof a !== "string" || !q.options.some((o) => o.id === a))) {
          throw new AnswerValidationError(`Answer for ${q.id} is not one of its options`);
        }
        break;
    }
  }
  const known = new Set(quiz.questions.map((q) => q.id));
  for (const id of Object.keys(answers)) {
    if (!known.has(id)) throw new AnswerValidationError(`Unknown question ${id}`);
  }
}

function validateTrials(quiz: QuizDefinition, answers: Answers) {
  const cfg = quiz.performance;
  if (!cfg) throw new Error(`${quiz.slug}: performance quizzes need a performance config`);
  const keys = trialKeys(quiz);
  for (const k of keys) {
    const v = answers[k];
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v > 10_000) {
      throw new AnswerValidationError(`Trial ${k} must be a time in milliseconds`);
    }
  }
  for (const k of Object.keys(answers)) if (!keys.includes(k)) throw new AnswerValidationError(`Unknown trial ${k}`);
  const valid = keys.map((k) => answers[k] as number).filter((v) => v >= cfg.validMs[0] && v <= cfg.validMs[1]);
  if (valid.length < cfg.minValid) {
    throw new AnswerValidationError(`Only ${valid.length} valid trials; at least ${cfg.minValid} are needed`);
  }
}

interface Acc {
  raw: number;
  max: number;
}

interface ItemScores {
  dims: Record<string, Acc>;
  facets: Record<string, Acc>;
  overall: Acc;
  /** Sum of scored likert values as given (reverse-keyed items flipped), for screeners. */
  total: number;
  /** Items at or above their threshold, for count_at_threshold screeners. */
  countAtThreshold: number;
  items: Record<string, boolean>;
  flags: string[];
  excludeTags: Set<string>;
  requireTags: Set<string>;
}

/** Every answered item adds (raw, max) to its dimension(s). Normalized = raw / max. */
function scoreItems(quiz: QuizDefinition, answers: Answers): ItemScores {
  const acc: ItemScores = {
    dims: Object.fromEntries(quiz.dimensions.map((d) => [d.key, { raw: 0, max: 0 }])),
    facets: Object.fromEntries((quiz.facets ?? []).map((f) => [f.key, { raw: 0, max: 0 }])),
    overall: { raw: 0, max: 0 },
    total: 0,
    countAtThreshold: 0,
    items: {},
    flags: [],
    excludeTags: new Set(),
    requireTags: new Set(),
  };
  const dim = (key: string, where: string) => {
    const d = acc.dims[key];
    if (!d) throw new Error(`${quiz.slug}: ${where} uses unknown dimension ${key}`);
    return d;
  };
  const add = (key: string, raw: number, max: number, where: string) => {
    const d = dim(key, where);
    d.raw += raw;
    d.max += max;
    acc.overall.raw += raw;
    acc.overall.max += max;
  };

  for (const q of quiz.questions) {
    const a = answers[q.id];
    switch (q.kind) {
      case "likert": {
        if (typeof a !== "number" || q.scored === false) break;
        const s = scaleOf(quiz, q);
        const start = scaleStart(s);
        const span = s.labels.length - 1;
        const w = q.weight ?? 1;
        const shifted = q.reverse ? span - (a - start) : a - start;
        add(q.dimension, shifted * w, span * w, q.id);
        if (q.facet) {
          const f = acc.facets[q.facet];
          if (!f) throw new Error(`${quiz.slug}: ${q.id} uses unknown facet ${q.facet}`);
          f.raw += shifted * w;
          f.max += span * w;
        }
        acc.total += start + shifted;
        if (q.threshold !== undefined && a >= q.threshold) acc.countAtThreshold += 1;
        break;
      }
      case "choice":
      case "multi": {
        const picked = q.kind === "choice" ? (typeof a === "string" ? [a] : []) : Array.isArray(a) ? a : [];
        if (picked.length === 0) break;
        const cap = q.kind === "multi" ? (q.max ?? q.options.length) : 1;
        for (const d of quiz.dimensions) {
          // Max is the most this item could add to the dimension.
          const best = q.options
            .map((o) => o.weights[d.key] ?? 0)
            .filter((w) => w > 0)
            .sort((x, y) => y - x)
            .slice(0, cap)
            .reduce((sum, w) => sum + w, 0);
          acc.dims[d.key].max += best;
          acc.overall.max += best;
        }
        for (const id of picked) {
          const o = q.options.find((x) => x.id === id)!;
          for (const [k, w] of Object.entries(o.weights)) {
            dim(k, `${q.id}/${o.id}`).raw += w;
            acc.overall.raw += w;
          }
          o.excludeTags?.forEach((t) => acc.excludeTags.add(t));
          o.requireTags?.forEach((t) => acc.requireTags.add(t));
        }
        break;
      }
      case "ability": {
        const right = a === q.correct;
        acc.items[q.id] = right;
        add(q.dimension, right ? q.difficulty : 0, q.difficulty, q.id);
        break;
      }
      case "attention":
        if (a !== undefined && a !== q.expect && !acc.flags.includes("attention_failed")) acc.flags.push("attention_failed");
        break;
    }
  }
  return acc;
}

const finish = (a: Acc): DimensionScore => ({ raw: a.raw, max: a.max, normalized: a.max === 0 ? 0 : clamp01(a.raw / a.max) });
const finishAll = (m: Record<string, Acc>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k, finish(v)]));

/** FNV-1a, for stable tie-breaks. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Stable fingerprint of an answer set: same answers, same tie-break. */
const answerSeed = (answers: Answers) =>
  hash(
    Object.keys(answers)
      .sort()
      .map((k) => `${k}=${JSON.stringify(answers[k])}`)
      .join("&"),
  );

/**
 * Highest normalized score wins. Exact ties are broken by a hash of the answers,
 * so the same answers always give the same result but no dimension is favored
 * just for being listed first (integer scores tie often on short scales).
 */
function rankDims(keys: string[], dims: Record<string, DimensionScore>, seed = 0) {
  return keys
    .map((key) => ({ key, score: dims[key]?.normalized ?? 0, tie: hash(`${seed}:${key}`) }))
    .sort((a, b) => b.score - a.score || a.tie - b.tie)
    .map(({ key, score }) => ({ key, score }));
}

function bandValue(cfg: BandConfig, s: ItemScores, dims: Record<string, DimensionScore>, quiz: QuizDefinition): number {
  const on = cfg.on;
  if (on === "overall") return finish(s.overall).normalized;
  if (on === "raw_total") return s.total;
  if (on === "count_at_threshold") return s.countAtThreshold;
  if (on === "mean") {
    const keys = quiz.outcomeDimensions ?? quiz.dimensions.map((d) => d.key);
    return keys.reduce((sum, k) => sum + (dims[k]?.normalized ?? 0), 0) / Math.max(1, keys.length);
  }
  const d = dims[on.dimension];
  if (!d) throw new Error(`${quiz.slug}: bands use unknown dimension ${on.dimension}`);
  return d.normalized;
}

export function pickBand(cfg: BandConfig, value: number): string {
  const band = [...cfg.bands].sort((a, b) => b.min - a.min).find((b) => value + EPS >= b.min);
  if (!band) throw new Error(`No band covers ${value}`);
  return band.outcome;
}

function similarity(kind: "distance" | "correlation", user: Record<string, DimensionScore>, item: CatalogItem): number {
  const keys = Object.keys(item.profile);
  if (keys.length === 0) return 0;
  const u = keys.map((k) => user[k]?.normalized ?? 0);
  const p = keys.map((k) => item.profile[k]);
  if (kind === "distance") return 1 - u.reduce((sum, v, i) => sum + Math.abs(v - p[i]), 0) / keys.length;
  const mean = (xs: number[]) => xs.reduce((sum, v) => sum + v, 0) / xs.length;
  const mu = mean(u);
  const mp = mean(p);
  const uc = u.map((v) => v - mu);
  const pc = p.map((v) => v - mp);
  const dot = uc.reduce((sum, v, i) => sum + v * pc[i], 0);
  const norm = Math.sqrt(uc.reduce((sum, v) => sum + v * v, 0)) * Math.sqrt(pc.reduce((sum, v) => sum + v * v, 0));
  return norm === 0 ? 0.5 : (dot / norm + 1) / 2;
}

function scoreRecommender(quiz: QuizDefinition, s: ItemScores, dims: Record<string, DimensionScore>) {
  const cfg = quiz.recommender;
  if (!cfg) throw new Error(`${quiz.slug}: recommender quizzes need a recommender config`);
  const allowed = cfg.catalog.filter(
    (item) =>
      !(item.tags ?? []).some((t) => s.excludeTags.has(t)) &&
      [...s.requireTags].every((t) => (item.tags ?? []).includes(t)),
  );
  // If filters remove everything, fall back to the whole catalog rather than show nothing.
  const pool = allowed.length > 0 ? allowed : cfg.catalog;
  return pool
    .map((item, i) => ({ key: item.key, score: similarity(cfg.similarity, dims, item), i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map(({ key, score }) => ({ key, score }));
}

function scorePerformance(quiz: QuizDefinition, answers: Answers): ScoreResult {
  const cfg = quiz.performance!;
  const trials = trialKeys(quiz).map((k) => answers[k] as number);
  const valid = trials.filter((v) => v >= cfg.validMs[0] && v <= cfg.validMs[1]).sort((a, b) => a - b);
  const mid = Math.floor(valid.length / 2);
  const median = valid.length % 2 ? valid[mid] : Math.round((valid[mid - 1] + valid[mid]) / 2);
  const normalized = clamp01((cfg.reference.slow - median) / (cfg.reference.slow - cfg.reference.fast));
  const dims: Record<string, DimensionScore> = { speed: { raw: median, max: cfg.reference.slow, normalized } };
  const outcomeKey = quiz.bands ? pickBand(quiz.bands, normalized) : quiz.outcomes[0].key;
  return {
    outcomeKey,
    dimensions: dims,
    ranking: [{ key: outcomeKey, score: normalized }],
    total: median,
    extras: { best: valid[0], validTrials: valid.length },
  };
}

/** Core: from validated (possibly partial) answers to a result. */
function scoreValidated(quiz: QuizDefinition, answers: Answers): ScoreResult {
  if (quiz.structure === "performance") return scorePerformance(quiz, answers);
  if (quiz.structure === "chart") return computeChart(quiz, answers);

  const s = scoreItems(quiz, answers);
  const seed = answerSeed(answers);
  const dims = finishAll(s.dims);
  const facets = quiz.facets?.length ? finishAll(s.facets) : undefined;
  const outcomeDims = quiz.outcomeDimensions ?? quiz.dimensions.map((d) => d.key);
  const base = { dimensions: dims, ...(facets ? { facets } : {}), ...(s.flags.length ? { flags: [...s.flags] } : {}) };
  let result: ScoreResult;

  switch (quiz.structure) {
    case "trait_profile":
    case "persona_match":
    case "compare": {
      const ranking = rankDims(outcomeDims, dims, seed);
      const outcomeKey = quiz.bands ? pickBand(quiz.bands, bandValue(quiz.bands, s, dims, quiz)) : ranking[0].key;
      const confidence = !quiz.bands && ranking.length > 1 ? ranking[0].score - ranking[1].score : undefined;
      result = { ...base, outcomeKey, ranking, ...(confidence !== undefined ? { confidence } : {}) };
      break;
    }
    case "typology": {
      const cfg = quiz.typology ?? { mode: "highest" as const };
      if (cfg.mode === "axes") {
        const axes = cfg.axes ?? [];
        // An exact 50/50 axis goes either way by the answer hash rather than always to one pole.
        const letters = axes.map((ax) => {
          const n = dims[ax.dimension]?.normalized ?? 0;
          if (Math.abs(n - 0.5) < EPS) return hash(`${seed}:${ax.dimension}`) % 2 ? ax.high : ax.low;
          return n > 0.5 ? ax.high : ax.low;
        });
        const outcomeKey = letters.join("").toLowerCase();
        // Runner-up: flip the letter on the axis closest to its midpoint.
        const closest = axes
          .map((ax, i) => ({ i, gap: Math.abs((dims[ax.dimension]?.normalized ?? 0) - 0.5) }))
          .sort((a, b) => a.gap - b.gap)[0];
        const runner = [...letters];
        if (closest) runner[closest.i] = runner[closest.i] === axes[closest.i].high ? axes[closest.i].low : axes[closest.i].high;
        const confidence =
          axes.reduce((sum, ax) => sum + Math.abs((dims[ax.dimension]?.normalized ?? 0) - 0.5) * 2, 0) / Math.max(1, axes.length);
        result = {
          ...base,
          outcomeKey,
          ranking: [
            { key: outcomeKey, score: 1 },
            { key: runner.join("").toLowerCase(), score: 1 - (closest?.gap ?? 0) * 2 },
          ],
          confidence,
        };
      } else {
        const ranking = rankDims(outcomeDims, dims, seed);
        result = { ...base, outcomeKey: ranking[0].key, ranking, confidence: ranking.length > 1 ? ranking[0].score - ranking[1].score : 1 };
      }
      break;
    }
    case "two_axis_quadrant": {
      const cfg = quiz.quadrant;
      if (!cfg) throw new Error(`${quiz.slug}: two_axis_quadrant needs a quadrant config`);
      const x = dims[cfg.x].normalized;
      const y = dims[cfg.y].normalized;
      // Strictly above the cutoff is "high": an exactly neutral score shouldn't land on the heaviest label.
      const lvl = (v: number) => (v > cfg.cutoff + EPS ? "high" : "low");
      const outcomeKey = cfg.map[`${lvl(x)}_${lvl(y)}` as keyof typeof cfg.map];
      const border = Math.min(Math.abs(x - cfg.cutoff), Math.abs(y - cfg.cutoff));
      result = {
        ...base,
        outcomeKey,
        ranking: [{ key: outcomeKey, score: 1 }],
        confidence: clamp01(border / Math.max(cfg.cutoff, 1 - cfg.cutoff)),
        extras: { x: Math.round(x * 100), y: Math.round(y * 100), borderDistance: Math.round(border * 100) },
      };
      break;
    }
    case "ability": {
      if (!quiz.bands) throw new Error(`${quiz.slug}: ability quizzes need bands`);
      const answered = quiz.questions.filter((q) => q.kind === "ability" && answers[q.id] != null).length;
      const correct = Object.values(s.items).filter(Boolean).length;
      const accuracy = finish(s.overall).normalized;
      const outcomeKey = pickBand(quiz.bands, bandValue(quiz.bands, s, dims, quiz));
      result = {
        ...base,
        outcomeKey,
        ranking: [{ key: outcomeKey, score: accuracy }],
        items: s.items,
        extras: { correct, answered, total: Object.keys(s.items).length, accuracy: Math.round(accuracy * 100) },
      };
      break;
    }
    case "recommender": {
      const matches = scoreRecommender(quiz, s, dims);
      const ranking = rankDims(outcomeDims, dims, seed);
      const outcomeKey = quiz.recommender!.outcome === "top_item" ? matches[0].key : ranking[0].key;
      result = { ...base, outcomeKey, ranking, matches: matches.slice(0, 50) };
      break;
    }
    case "screener": {
      if (!quiz.bands) throw new Error(`${quiz.slug}: screeners need bands`);
      const outcomeKey = pickBand(quiz.bands, bandValue(quiz.bands, s, dims, quiz));
      const risk = (quiz.screener?.riskItems ?? []).some((r) => {
        const v = answers[r.questionId];
        return typeof v === "number" && v >= r.minValue;
      });
      const flags = [...(base.flags ?? []), ...(risk ? ["risk_item"] : [])];
      result = {
        ...base,
        outcomeKey,
        ranking: [{ key: outcomeKey, score: s.total }],
        total: quiz.bands.on === "count_at_threshold" ? s.countAtThreshold : s.total,
        ...(flags.length ? { flags } : {}),
      };
      break;
    }
    default:
      throw new Error(`${quiz.slug}: unknown structure ${quiz.structure}`);
  }

  const extras = computeExtras(quiz, result, seed);
  if (Object.keys(extras).length) result.extras = { ...result.extras, ...extras };
  return result;
}

function computeExtras(quiz: QuizDefinition, r: ScoreResult, seed: number): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const ex of quiz.extras ?? []) {
    switch (ex.kind) {
      case "top_of":
        out[ex.key] = rankDims(ex.dimensions, r.dimensions, seed)[0]?.key ?? "";
        break;
      case "pole":
        out[ex.key] = (r.dimensions[ex.dimension]?.normalized ?? 0) >= (ex.cutoff ?? 0.5) ? ex.high : ex.low;
        break;
      case "wing": {
        const order = quiz.outcomeDimensions ?? quiz.dimensions.map((d) => d.key);
        const i = order.indexOf(r.outcomeKey);
        if (i === -1) break;
        const left = order[(i - 1 + order.length) % order.length];
        const right = order[(i + 1) % order.length];
        out[ex.key] = (r.dimensions[right]?.normalized ?? 0) > (r.dimensions[left]?.normalized ?? 0) ? right : left;
        break;
      }
      case "code":
        out[ex.key] = rankDims(Object.keys(ex.letters), r.dimensions, seed)
          .slice(0, ex.length)
          .map((d) => ex.letters[d.key])
          .join("");
        break;
    }
  }
  return out;
}

export function scoreQuiz(quiz: QuizDefinition, answers: Answers): ScoreResult {
  validateAnswers(quiz, answers);
  return scoreValidated(quiz, answers);
}

/**
 * Midpoint micro-reveal: the outcome the answers so far lean toward.
 * Only for personality-style structures; never screeners, ability tests or tools.
 */
export function scorePartial(quiz: QuizDefinition, answers: Answers): string | null {
  if (!["trait_profile", "typology", "two_axis_quadrant", "persona_match", "compare"].includes(quiz.structure)) return null;
  validateAnswers(quiz, answers, { partial: true });
  if (Object.keys(answers).length === 0) return null;
  try {
    return scoreValidated(quiz, answers).outcomeKey;
  } catch {
    return null;
  }
}
