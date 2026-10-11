import { CITIES } from "./cities";
import { scaleOf, scoreQuiz, trialKeys } from "./score";
import { scaleStart } from "./scales";
import type { Answers, QuizDefinition } from "./types";

/** Small seeded PRNG so simulations are repeatable. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * A plausible answer set leaning toward `bias` (dimension → 0..1).
 * Dimensions missing from `bias` get a random lean.
 */
export function biasedAnswers(quiz: QuizDefinition, rand: () => number, bias: Record<string, number> = {}): Answers {
  const lean = (d: string) => (bias[d] ??= rand());
  const out: Answers = {};

  if (quiz.structure === "performance") {
    const cfg = quiz.performance!;
    const base = cfg.reference.fast + (cfg.reference.slow - cfg.reference.fast) * (1 - lean("speed"));
    for (const k of trialKeys(quiz)) out[k] = Math.round(base + (rand() - 0.5) * 40);
    return out;
  }
  if (quiz.structure === "chart") {
    const y = 1930 + Math.floor(rand() * 90);
    const m = 1 + Math.floor(rand() * 12);
    const d = 1 + Math.floor(rand() * 28);
    out.date = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    out.time = rand() < 0.2 ? "" : `${String(Math.floor(rand() * 24)).padStart(2, "0")}:${String(Math.floor(rand() * 60)).padStart(2, "0")}`;
    out.place = CITIES[Math.floor(rand() * CITIES.length)].id;
    return out;
  }

  for (const q of quiz.questions) {
    switch (q.kind) {
      case "likert": {
        const s = scaleOf(quiz, q);
        const span = s.labels.length - 1;
        const target = lean(q.dimension);
        const pos = clamp01((q.reverse ? 1 - target : target) + (rand() - 0.5) * 0.35);
        out[q.id] = scaleStart(s) + Math.round(pos * span);
        break;
      }
      case "attention":
        out[q.id] = q.expect;
        break;
      case "choice":
      case "multi": {
        const scored = q.options
          .map((o) => ({
            id: o.id,
            v: Object.entries(o.weights).reduce((s, [d, w]) => s + w * (lean(d) - 0.5), 0) + (rand() - 0.5) * 0.6,
          }))
          .sort((a, b) => b.v - a.v);
        if (q.kind === "choice") out[q.id] = scored[0].id;
        else out[q.id] = scored.slice(0, 1 + Math.floor(rand() * (q.max ?? q.options.length))).map((o) => o.id);
        break;
      }
      case "ability": {
        const p = lean(q.dimension);
        if (rand() < p) out[q.id] = q.correct;
        else {
          const wrong = q.options.filter((o) => o.id !== q.correct);
          out[q.id] = wrong[Math.floor(rand() * wrong.length)].id;
        }
        break;
      }
    }
  }
  return out;
}

/** Score many biased random takers; returns how often each outcome came up. */
export function exploreOutcomes(quiz: QuizDefinition, samples = 3000, seed = 7): Map<string, number> {
  const rand = rng(seed);
  const counts = new Map<string, number>();
  const dims = quiz.structure === "performance" ? ["speed"] : quiz.dimensions.map((d) => d.key);
  for (let i = 0; i < samples; i++) {
    // Mix extreme and middling profiles so corner outcomes are reachable.
    const bias: Record<string, number> = {};
    for (const d of dims) {
      const r = rand();
      bias[d] = r < 0.2 ? 0 : r < 0.4 ? 1 : rand();
    }
    const result = scoreQuiz(quiz, biasedAnswers(quiz, rand, bias));
    counts.set(result.outcomeKey, (counts.get(result.outcomeKey) ?? 0) + 1);
  }
  return counts;
}
