import { describe, expect, it } from "vitest";
import { ascendant, localToUtc, moonLongitude, planetLongitude, sunLongitude, julianDay } from "./astro";
import { toClientQuiz } from "./client";
import { compareResults } from "./compare";
import { AnswerValidationError, scorePartial, scoreQuiz } from "./score";
import { ASRS_FREQUENCY, PHQ_FREQUENCY } from "./scales";
import { exploreOutcomes } from "./simulate";
import type { Answers, Outcome, Question, QuizDefinition } from "./types";

const outcome = (key: string): Outcome => ({ key, name: key, tagline: "", summary: "", about: "", snapshot: [], deep: [] });

/** Minimal quiz for engine tests; content fields are blank on purpose. */
function fixture(over: Partial<QuizDefinition> & Pick<QuizDefinition, "structure" | "dimensions" | "questions">): QuizDefinition {
  return {
    slug: "fixture",
    n: 0,
    title: "Fixture",
    tagline: "",
    category: "Personality",
    description: "",
    method: "",
    minutes: 1,
    paywall: "free_headline",
    minAge: 13,
    status: "draft",
    seo: { intro: "", measures: "", origin: "", faqs: [], keywords: [] },
    outcomes: (over.outcomes ?? over.dimensions.map((d) => outcome(d.key))),
    ...over,
  };
}

const likert = (id: string, dimension: string, reverse = false): Question => ({ id, kind: "likert", text: id, dimension, reverse });
const answerAll = (q: QuizDefinition, v: number): Answers => Object.fromEntries(q.questions.map((x) => [x.id, v]));

describe("likert scoring", () => {
  const quiz = fixture({
    structure: "trait_profile",
    dimensions: [{ key: "a", label: "A" }, { key: "b", label: "B" }],
    questions: [likert("a1", "a"), likert("a2", "a", true), likert("b1", "b"), likert("b2", "b")],
  });

  it("neutral answers sit at the midpoint", () => {
    const r = scoreQuiz(quiz, answerAll(quiz, 3));
    expect(r.dimensions.a.normalized).toBe(0.5);
    expect(r.dimensions.b.normalized).toBe(0.5);
  });

  it("reverse-keyed items flip", () => {
    const r = scoreQuiz(quiz, { a1: 5, a2: 1, b1: 1, b2: 1 });
    expect(r.dimensions.a.normalized).toBe(1);
    expect(r.dimensions.b.normalized).toBe(0);
    expect(r.outcomeKey).toBe("a");
    expect(r.confidence).toBe(1);
  });

  it("breaks ties the same way for the same answers, without favoring the first dimension", () => {
    const r = scoreQuiz(quiz, answerAll(quiz, 3));
    expect(r.confidence).toBe(0);
    expect(scoreQuiz(quiz, answerAll(quiz, 3)).outcomeKey).toBe(r.outcomeKey);
    // Across many tied answer sets, both dimensions win sometimes.
    const winners = new Set<string>();
    for (const v of [1, 2, 3, 4, 5]) for (const w of [1, 2, 3, 4, 5]) {
      const tied = { a1: v, a2: 6 - v, b1: w, b2: w };
      if (scoreQuiz(quiz, tied).dimensions.a.normalized === scoreQuiz(quiz, tied).dimensions.b.normalized) winners.add(scoreQuiz(quiz, tied).outcomeKey);
    }
    expect(winners).toEqual(new Set(["a", "b"]));
  });

  it("bands cut a dimension or the pooled score", () => {
    const banded = fixture({
      ...quiz,
      outcomes: ["low", "high"].map(outcome),
      bands: { on: { dimension: "b" }, bands: [{ min: 0, outcome: "low" }, { min: 0.5, outcome: "high" }] },
    });
    expect(scoreQuiz(banded, { a1: 5, a2: 1, b1: 1, b2: 1 }).outcomeKey).toBe("low");
    expect(scoreQuiz(banded, { a1: 1, a2: 5, b1: 3, b2: 3 }).outcomeKey).toBe("high");
    const pooled = fixture({ ...banded, bands: { on: "overall", bands: banded.bands!.bands } });
    expect(scoreQuiz(pooled, { a1: 5, a2: 1, b1: 1, b2: 1 }).outcomeKey).toBe("high"); // 8/16
  });

  it("facets score separately", () => {
    const faceted = fixture({
      ...quiz,
      facets: [{ key: "a_x", label: "X", dimension: "a" }],
      questions: [{ ...likert("a1", "a"), facet: "a_x" } as Question, likert("a2", "a", true), likert("b1", "b"), likert("b2", "b")],
    });
    const r = scoreQuiz(faceted, { a1: 5, a2: 5, b1: 3, b2: 3 });
    expect(r.facets?.a_x.normalized).toBe(1);
    expect(r.dimensions.a.normalized).toBe(0.5);
  });

  it("flags a failed attention check without changing scores", () => {
    const withCheck = fixture({ ...quiz, questions: [...quiz.questions, { id: "chk", kind: "attention", text: "Pick agree", expect: 4 }] });
    const r = scoreQuiz(withCheck, { ...answerAll(quiz, 3), chk: 1 });
    expect(r.flags).toEqual(["attention_failed"]);
    expect(r.dimensions.a.normalized).toBe(0.5);
    expect(scoreQuiz(withCheck, { ...answerAll(quiz, 3), chk: 4 }).flags).toBeUndefined();
  });

  it("midpoint preview leans toward the current leader", () => {
    expect(scorePartial(quiz, { b1: 5 })).toBe("b");
    expect(scorePartial(quiz, {})).toBeNull();
  });
});

describe("validation", () => {
  const quiz = fixture({
    structure: "persona_match",
    dimensions: [{ key: "x", label: "X" }, { key: "y", label: "Y" }],
    questions: [
      { id: "c1", kind: "choice", text: "", options: [{ id: "a", label: "A", weights: { x: 1 } }, { id: "b", label: "B", weights: { y: 1 } }] },
      { id: "m1", kind: "multi", text: "", max: 2, options: [{ id: "a", label: "", weights: { x: 1 } }, { id: "b", label: "", weights: { y: 1 } }, { id: "c", label: "", weights: { y: 1 } }] },
    ],
  });

  it("rejects missing, unknown and malformed answers", () => {
    expect(() => scoreQuiz(quiz, { c1: "a" })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { c1: "z", m1: ["a"] })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { c1: "a", m1: ["a"], extra: 1 })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { c1: "a", m1: ["a", "b", "c"] })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { c1: "a", m1: ["a", "a"] })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { c1: "a", m1: [] })).toThrow(AnswerValidationError);
  });

  it("multi-select adds every picked option", () => {
    const r = scoreQuiz(quiz, { c1: "b", m1: ["b", "c"] });
    expect(r.dimensions.y).toMatchObject({ raw: 3, max: 3, normalized: 1 });
    expect(r.outcomeKey).toBe("y");
  });
});

describe("typology", () => {
  const nine = Array.from({ length: 9 }, (_, i) => ({ key: `t${i + 1}`, label: `Type ${i + 1}` }));
  const quiz = fixture({
    structure: "typology",
    typology: { mode: "highest" },
    dimensions: [...nine, { key: "sp", label: "SP" }, { key: "sx", label: "SX" }],
    outcomeDimensions: nine.map((d) => d.key),
    outcomes: nine.map((d) => outcome(d.key)),
    extras: [{ key: "wing", label: "Wing", kind: "wing" }, { key: "instinct", label: "Instinct", kind: "top_of", dimensions: ["sp", "sx"] }],
    questions: [...nine.map((d) => likert(d.key, d.key)), likert("sp", "sp"), likert("sx", "sx")],
  });

  it("wing is the higher neighbor, wrapping around", () => {
    const r = scoreQuiz(quiz, { ...answerAll(quiz, 1), t1: 5, t9: 4, t2: 2, sx: 5 });
    expect(r.outcomeKey).toBe("t1");
    expect(r.extras).toMatchObject({ wing: "t9", instinct: "sx" });
  });

  it("instinct dimensions never become the type", () => {
    expect(scoreQuiz(quiz, { ...answerAll(quiz, 1), sp: 5, t4: 2 }).outcomeKey).toBe("t4");
  });

  it("axes mode joins letters and reports the runner-up", () => {
    const axes = fixture({
      structure: "typology",
      typology: { mode: "axes", axes: [{ dimension: "e", low: "I", high: "E" }, { dimension: "n", low: "S", high: "N" }] },
      dimensions: [{ key: "e", label: "E" }, { key: "n", label: "N" }],
      outcomes: ["is", "in", "es", "en"].map(outcome),
      questions: [likert("e1", "e"), likert("e2", "e"), likert("n1", "n"), likert("n2", "n")],
    });
    const r = scoreQuiz(axes, { e1: 5, e2: 5, n1: 4, n2: 3 });
    expect(r.outcomeKey).toBe("en");
    expect(r.ranking[1].key).toBe("es");
    expect(exploreOutcomes(axes, 400).size).toBe(4);
  });
});

describe("two-axis quadrant", () => {
  const quiz = fixture({
    structure: "two_axis_quadrant",
    dimensions: [{ key: "anx", label: "Anxiety" }, { key: "avo", label: "Avoidance" }],
    outcomes: ["secure", "anxious", "avoidant", "fearful"].map(outcome),
    quadrant: { x: "anx", y: "avo", cutoff: 0.5, map: { low_low: "secure", high_low: "anxious", low_high: "avoidant", high_high: "fearful" } },
    questions: [likert("x1", "anx"), likert("x2", "anx", true), likert("y1", "avo"), likert("y2", "avo", true)],
  });
  it.each([
    [{ x1: 1, x2: 5, y1: 1, y2: 5 }, "secure"],
    [{ x1: 5, x2: 1, y1: 1, y2: 5 }, "anxious"],
    [{ x1: 1, x2: 5, y1: 5, y2: 1 }, "avoidant"],
    [{ x1: 5, x2: 1, y1: 5, y2: 1 }, "fearful"],
  ])("%o → %s", (answers, expected) => {
    const r = scoreQuiz(quiz, answers);
    expect(r.outcomeKey).toBe(expected);
    expect(r.extras?.borderDistance).toBe(50);
  });
});

describe("screeners", () => {
  const phq = fixture({
    structure: "screener",
    isScreener: true,
    scale: PHQ_FREQUENCY,
    dimensions: [{ key: "total", label: "Total" }],
    outcomes: ["minimal", "mild", "moderate"].map(outcome),
    bands: { on: "raw_total", bands: [{ min: 0, outcome: "minimal" }, { min: 5, outcome: "mild" }, { min: 10, outcome: "moderate" }] },
    screener: { source: "test", riskItems: [{ questionId: "q3", minValue: 1 }] },
    questions: [likert("q1", "total"), likert("q2", "total"), likert("q3", "total"), { ...likert("q4", "total"), scored: false } as Question],
  });

  it("sums 0-based values and skips unscored items", () => {
    const r = scoreQuiz(phq, { q1: 3, q2: 2, q3: 0, q4: 3 });
    expect(r.total).toBe(5);
    expect(r.outcomeKey).toBe("mild");
    expect(r.flags).toBeUndefined();
  });

  it("flags the risk item", () => {
    expect(scoreQuiz(phq, { q1: 0, q2: 0, q3: 1, q4: 0 }).flags).toEqual(["risk_item"]);
  });

  it("rejects values off the published scale", () => {
    expect(() => scoreQuiz(phq, { q1: 4, q2: 0, q3: 0, q4: 0 })).toThrow(AnswerValidationError);
  });

  it("counts items at threshold (ASRS Part A style)", () => {
    const asrs = fixture({
      structure: "screener",
      isScreener: true,
      scale: ASRS_FREQUENCY,
      dimensions: [{ key: "total", label: "Total" }],
      outcomes: ["unlikely", "consistent"].map(outcome),
      bands: { on: "count_at_threshold", bands: [{ min: 0, outcome: "unlikely" }, { min: 2, outcome: "consistent" }] },
      screener: { source: "test" },
      questions: [
        { ...likert("a1", "total"), threshold: 2 } as Question,
        { ...likert("a2", "total"), threshold: 3 } as Question,
        { ...likert("a3", "total"), threshold: 3 } as Question,
      ],
    });
    expect(scoreQuiz(asrs, { a1: 2, a2: 2, a3: 4 })).toMatchObject({ outcomeKey: "consistent", total: 2 });
    expect(scoreQuiz(asrs, { a1: 1, a2: 2, a3: 4 })).toMatchObject({ outcomeKey: "unlikely", total: 1 });
  });
});

describe("ability tests", () => {
  const item = (id: string, dimension: string, difficulty: 1 | 2 | 3 | 4 | 5): Question => ({
    id,
    kind: "ability",
    text: id,
    dimension,
    difficulty,
    correct: "a",
    explanation: "because",
    options: [{ id: "a", label: "A" }, { id: "b", label: "B" }, { id: "c", label: "C" }],
  });
  const quiz = fixture({
    structure: "ability",
    dimensions: [{ key: "logic", label: "Logic" }, { key: "verbal", label: "Verbal" }],
    outcomes: ["developing", "strong"].map(outcome),
    bands: { on: "overall", bands: [{ min: 0, outcome: "developing" }, { min: 0.6, outcome: "strong" }] },
    questions: [item("l1", "logic", 1), item("l2", "logic", 3), item("v1", "verbal", 2)],
  });

  it("weights correct answers by difficulty and allows skipped items", () => {
    const r = scoreQuiz(quiz, { l1: "b", l2: "a", v1: null });
    expect(r.dimensions.logic).toMatchObject({ raw: 3, max: 4 });
    expect(r.items).toEqual({ l1: false, l2: true, v1: false });
    expect(r.extras).toMatchObject({ correct: 1, answered: 2, total: 3, accuracy: 50 });
    expect(r.outcomeKey).toBe("developing");
    expect(scoreQuiz(quiz, { l2: "a", v1: "a" }).outcomeKey).toBe("strong");
  });

  it("never sends the correct option to the browser", () => {
    const json = JSON.stringify(toClientQuiz(quiz));
    expect(json).not.toContain("correct");
    expect(json).not.toContain("explanation");
    expect(json).not.toContain("weights");
  });
});

describe("performance (reaction time)", () => {
  const quiz = fixture({
    structure: "performance",
    dimensions: [{ key: "speed", label: "Speed" }],
    outcomes: ["slow", "fast"].map(outcome),
    performance: { task: "reaction_time", trials: 5, validMs: [100, 1500], reference: { fast: 150, slow: 450 }, minValid: 3 },
    bands: { on: { dimension: "speed" }, bands: [{ min: 0, outcome: "slow" }, { min: 0.5, outcome: "fast" }] },
    questions: [],
  });

  it("uses the median of valid trials", () => {
    const r = scoreQuiz(quiz, { t1: 250, t2: 90, t3: 270, t4: 260, t5: 3000 });
    expect(r.total).toBe(260);
    expect(r.extras).toMatchObject({ best: 250, validTrials: 3 });
    expect(r.outcomeKey).toBe("fast");
  });

  it("needs enough valid trials", () => {
    expect(() => scoreQuiz(quiz, { t1: 50, t2: 60, t3: 270, t4: 260, t5: 3000 })).toThrow(AnswerValidationError);
  });
});

describe("recommender", () => {
  const quiz = fixture({
    structure: "recommender",
    dimensions: [{ key: "warm", label: "Warm" }, { key: "deep", label: "Deep" }],
    outcomes: ["spring", "winter", "autumn"].map(outcome),
    recommender: {
      outcome: "top_item",
      similarity: "distance",
      catalog: [
        { key: "spring", name: "Spring", profile: { warm: 1, deep: 0 }, tags: ["light"] },
        { key: "winter", name: "Winter", profile: { warm: 0, deep: 1 } },
        { key: "autumn", name: "Autumn", profile: { warm: 1, deep: 1 } },
      ],
    },
    questions: [
      { id: "w", kind: "choice", text: "", options: [{ id: "gold", label: "", weights: { warm: 1 } }, { id: "silver", label: "", weights: {} }] },
      { id: "d", kind: "choice", text: "", options: [{ id: "dark", label: "", weights: { deep: 1 } }, { id: "light", label: "", weights: {}, excludeTags: ["light"] }] },
    ],
  });

  it("ranks the catalog by profile distance", () => {
    expect(scoreQuiz(quiz, { w: "gold", d: "dark" }).outcomeKey).toBe("autumn");
    expect(scoreQuiz(quiz, { w: "silver", d: "dark" }).matches?.[0]).toEqual({ key: "winter", score: 1 });
  });

  it("drops catalog items by hard filter", () => {
    const r = scoreQuiz(quiz, { w: "gold", d: "light" });
    expect(r.matches?.map((m) => m.key)).not.toContain("spring");
  });

  it("correlation ignores overall level", () => {
    const corr = fixture({
      structure: "recommender",
      dimensions: ["r", "i", "a"].map((k) => ({ key: k, label: k })),
      outcomes: ["r", "i", "a"].map(outcome),
      recommender: {
        outcome: "top_dimension",
        similarity: "correlation",
        catalog: [
          { key: "builder", name: "Builder", profile: { r: 1, i: 0.4, a: 0 } },
          { key: "artist", name: "Artist", profile: { r: 0, i: 0.4, a: 1 } },
        ],
      },
      questions: [likert("r1", "r"), likert("i1", "i"), likert("a1", "a")],
    });
    // Rates everything high but art highest: still matches the artist profile.
    const r = scoreQuiz(corr, { r1: 4, i1: 4, a1: 5 });
    expect(r.matches?.[0].key).toBe("artist");
    expect(r.outcomeKey).toBe("a");
  });
});

describe("compare", () => {
  const quiz = fixture({
    structure: "compare",
    dimensions: [{ key: "money", label: "Money" }, { key: "time", label: "Time" }],
    questions: [likert("m1", "money"), likert("m2", "money"), likert("t1", "time"), likert("t2", "time")],
  });
  it("matches dimensions and lists the biggest item gaps", () => {
    const a = { m1: 5, m2: 5, t1: 3, t2: 3 };
    const b = { m1: 1, m2: 5, t1: 3, t2: 3 };
    const c = compareResults(quiz, { answers: a, scores: scoreQuiz(quiz, a) }, { answers: b, scores: scoreQuiz(quiz, b) });
    expect(c.dimensions.find((d) => d.key === "time")?.match).toBe(1);
    expect(c.dimensions.find((d) => d.key === "money")?.match).toBe(0.5);
    expect(c.overall).toBe(0.75);
    expect(c.gaps).toEqual([{ id: "m1", text: "m1", a: 5, b: 1, gap: 1 }]);
  });
});

describe("chart calculator (T10)", () => {
  it("matches Meeus' worked examples", () => {
    // Example 25.a: 1992 Oct 13.0 TD, apparent solar longitude 199.909°
    expect(sunLongitude(2448908.5)).toBeCloseTo(199.909, 1);
    // Example 47.a: 1992 Apr 12.0 TD, lunar longitude 133.163°
    expect(Math.abs(moonLongitude(2448724.5) - 133.163)).toBeLessThan(0.1);
    // Example 33.a: Venus 1992 Dec 20.0 TD, geocentric longitude 313.081°
    expect(Math.abs(planetLongitude("venus", 2448976.5) - 313.081)).toBeLessThan(0.5);
  });

  it("places the ascendant 90° from a 0° midheaven at the equator", () => {
    const jd = 2451545.0;
    const T = (jd - 2451545.0) / 36525;
    const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T;
    const lon = -(((gmst % 360) + 360) % 360);
    expect(ascendant(jd, 0, lon)).toBeCloseTo(90, 3);
  });

  it("converts local birth time with historical daylight saving", () => {
    expect(localToUtc(2020, 7, 1, 12, 0, "America/New_York").toISOString()).toBe("2020-07-01T16:00:00.000Z");
    expect(localToUtc(2020, 1, 1, 12, 0, "America/New_York").toISOString()).toBe("2020-01-01T17:00:00.000Z");
    expect(julianDay(new Date("2000-01-01T12:00:00Z"))).toBe(2451545);
  });

  it("scores a chart quiz end to end", () => {
    const quiz = fixture({
      structure: "chart",
      chart: { bodies: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"] },
      dimensions: ["fire", "earth", "air", "water"].map((k) => ({ key: k, label: k })),
      outcomes: [],
      questions: [],
    });
    const r = scoreQuiz(quiz, { date: "2000-01-01", time: "12:00", place: "london-uk" });
    expect(r.outcomeKey).toBe("capricorn");
    expect(r.chart?.mars.sign).toBe("aquarius");
    expect(r.chart?.jupiter.sign).toBe("aries");
    expect(r.chart?.saturn.sign).toBe("taurus");
    expect(r.extras?.rising).toBeTruthy();
    expect(() => scoreQuiz(quiz, { date: "2000-02-30", time: "", place: "london-uk" })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(quiz, { date: "2000-01-01", time: "", place: "atlantis" })).toThrow(AnswerValidationError);
    const noTime = scoreQuiz(quiz, { date: "2000-01-01", time: "", place: "london-uk" });
    expect(noTime.extras?.rising).toBe("");
  });
});
