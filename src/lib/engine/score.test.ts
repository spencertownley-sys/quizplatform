import { describe, expect, it } from "vitest";
import { quizzes } from "@/content";
import { catalog } from "@/content/catalog";
import { attachmentStyle } from "@/content/quizzes/attachment-style";
import { magicAcademyHouse } from "@/content/quizzes/magic-academy-house";
import { AnswerValidationError, NotImplementedError, lintQuiz, scoreQuiz } from "./score";
import type { Answers, QuizDefinition } from "./types";

/** Answer every likert item so its dimension lands high or low, respecting reverse keying. */
function attachmentAnswers(anxiety: "high" | "low", avoidance: "high" | "low"): Answers {
  const out: Answers = {};
  for (const q of attachmentStyle.questions) {
    if (q.kind !== "likert") continue;
    const want = q.dimension === "anxiety" ? anxiety : avoidance;
    const agree = want === "high" ? !q.reverse : !!q.reverse;
    out[q.id] = agree ? 7 : 1;
  }
  return out;
}

describe("every quiz definition", () => {
  for (const quiz of quizzes) {
    it(`${quiz.slug} passes lint`, () => expect(lintQuiz(quiz)).toEqual([]));
  }

  it("catalog has 100 unique entries", () => {
    expect(catalog).toHaveLength(100);
    expect(new Set(catalog.map((c) => c.slug)).size).toBe(100);
  });
});

describe("two-axis quadrant (attachment style)", () => {
  it.each([
    ["low", "low", "secure"],
    ["high", "low", "anxious"],
    ["low", "high", "avoidant"],
    ["high", "high", "fearful_avoidant"],
  ] as const)("anxiety %s, avoidance %s → %s", (anx, avo, expected) => {
    const r = scoreQuiz(attachmentStyle, attachmentAnswers(anx, avo));
    expect(r.outcomeKey).toBe(expected);
  });

  it("reverse-keyed items flip the score", () => {
    const r = scoreQuiz(attachmentStyle, attachmentAnswers("high", "low"));
    expect(r.dimensions.anxiety.normalized).toBe(1);
    expect(r.dimensions.avoidance.normalized).toBe(0);
  });

  it("all-neutral answers sit at the midpoint", () => {
    const answers = Object.fromEntries(attachmentStyle.questions.map((q) => [q.id, 4]));
    const r = scoreQuiz(attachmentStyle, answers);
    expect(r.dimensions.anxiety.normalized).toBe(0.5);
  });
});

describe("persona match (magic academy)", () => {
  it("all-'c' answers place you in Lanternfall", () => {
    const answers = Object.fromEntries(magicAcademyHouse.questions.map((q) => [q.id, "c"]));
    const r = scoreQuiz(magicAcademyHouse, answers);
    expect(r.outcomeKey).toBe("lanternfall");
    expect(r.ranking[0]).toEqual({ key: "lanternfall", score: 1 });
  });

  it("ties go to the first listed house", () => {
    const ids = magicAcademyHouse.questions.map((q) => q.id);
    const answers: Answers = {};
    ids.forEach((id, i) => (answers[id] = i % 2 === 0 ? "d" : "b")); // 4 Hearthwood, 4 Gildmere
    expect(scoreQuiz(magicAcademyHouse, answers).outcomeKey).toBe("gildmere");
  });
});

describe("validation", () => {
  it("rejects missing answers", () => {
    expect(() => scoreQuiz(attachmentStyle, {})).toThrow(AnswerValidationError);
  });

  it("rejects out-of-range likert values", () => {
    const a = attachmentAnswers("low", "low");
    a.a1 = 8;
    expect(() => scoreQuiz(attachmentStyle, a)).toThrow(AnswerValidationError);
  });

  it("rejects unknown option ids and extra questions", () => {
    const a = Object.fromEntries(magicAcademyHouse.questions.map((q) => [q.id, "a"]));
    expect(() => scoreQuiz(magicAcademyHouse, { ...a, m1: "z" })).toThrow(AnswerValidationError);
    expect(() => scoreQuiz(magicAcademyHouse, { ...a, bogus: "a" })).toThrow(AnswerValidationError);
  });
});

describe("screener and unimplemented structures", () => {
  const screener: QuizDefinition = {
    slug: "test-screener",
    title: "Test",
    category: "Wellbeing (free)",
    structure: "screener",
    description: "",
    minutes: 1,
    paywall: "free_headline",
    isScreener: true,
    minAge: 13,
    likertPoints: 5,
    status: "draft",
    dimensions: [{ key: "total", label: "Total" }],
    questions: [1, 2, 3].map((i) => ({ id: `s${i}`, kind: "likert" as const, dimension: "total", text: "Item" })),
    outcomes: [],
    screenerBands: [
      { min: 0, outcome: "minimal" },
      { min: 10, outcome: "elevated" },
    ],
  };

  it("uses the band for the raw total", () => {
    expect(scoreQuiz(screener, { s1: 3, s2: 3, s3: 3 }).outcomeKey).toBe("minimal");
    expect(scoreQuiz(screener, { s1: 4, s2: 3, s3: 3 }).outcomeKey).toBe("elevated");
  });

  it("throws NotImplemented for structures not built yet", () => {
    expect(() => scoreQuiz({ ...screener, structure: "ability" }, { s1: 1, s2: 1, s3: 1 })).toThrow(NotImplementedError);
  });
});
