import { describe, expect, it } from "vitest";
import { ageBand, ageFromBirthYear, parseAgeCookie, validBirthYear } from "./age";
import { scoreQuiz } from "./engine/score";
import type { Outcome, QuizDefinition } from "./engine/types";
import { EXPERIMENTS, paywallMode, variantFor, variantLabel } from "./experiments";
import { sign, verify } from "./links";
import { pdfSafe } from "./pdf/ReportPdf";
import { atLeast, sellableBundles } from "./products";
import { mergeOverrides } from "./quizzes";
import { buildReport, firstSentence } from "./report";
import { richBlocks } from "./richtext";

const SECRET_BODY = "PAID-BODY-should-never-leak";

const outcome = (key: string): Outcome => ({
  key,
  name: `Name ${key}`,
  tagline: `Tagline ${key}`,
  summary: `Summary ${key}.`,
  about: "About.",
  snapshot: [`SNAPSHOT-POINT-${key}`],
  deep: [
    { title: "Section one", teaser: "Teaser one.", body: `${SECRET_BODY} one` },
    { title: "Section two", teaser: "Teaser two.", body: `${SECRET_BODY} two` },
  ],
});

const quiz: QuizDefinition = {
  slug: "lib-test",
  n: 0,
  title: "Lib Test",
  tagline: "",
  category: "Personality",
  structure: "trait_profile",
  description: "",
  method: "METHOD-TEXT",
  minutes: 1,
  paywall: "free_headline",
  minAge: 13,
  status: "live",
  seo: { intro: "", measures: "", origin: "", faqs: [], keywords: [] },
  dimensions: [
    { key: "a", label: "A", report: { low: "A is low. FULL-A-LOW", mid: "A is mid. FULL-A-MID", high: "A is high. FULL-A-HIGH" } },
    { key: "b", label: "B", report: { low: "B is low. FULL-B-LOW", mid: "B is mid. FULL-B-MID", high: "B is high. FULL-B-HIGH" } },
  ],
  questions: [
    { id: "a1", kind: "likert", dimension: "a", text: "a1" },
    { id: "b1", kind: "likert", dimension: "b", text: "b1" },
  ],
  outcomes: [outcome("a"), outcome("b")],
};
const answers = { a1: 5, b1: 1 };
const scores = scoreQuiz(quiz, answers);
const report = (level: "free" | "snapshot" | "deep", paywall: "free_headline" | "full" = "free_headline", freeSections = 0) =>
  JSON.stringify(buildReport({ quiz, scores, answers, level, paywall, norms: null, freeSections }));

describe("report access levels", () => {
  it("free: headline, teasers and one real preview line; no paid text, no real scores", () => {
    const json = report("free");
    expect(json).toContain("Name a");
    expect(json).toContain("Teaser one.");
    expect(json).toContain("A is high."); // personalized preview line, first sentence only
    expect(json).not.toContain(SECRET_BODY);
    expect(json).not.toContain("SNAPSHOT-POINT");
    expect(json).not.toContain("FULL-A-HIGH");
    expect(json).not.toContain("METHOD-TEXT");
    const model = JSON.parse(json);
    expect(model.dims.map((d: { pct: number }) => d.pct)).not.toEqual([100, 0]); // placeholder bars
  });

  it("full paywall hides even the headline", () => {
    const json = report("free", "full");
    expect(json).not.toContain("Name a");
    expect(json).not.toContain("Summary a");
    expect(json).not.toContain("Teaser one.");
  });

  it("snapshot: real scores, first sentences and key points; still no deep text", () => {
    const json = report("snapshot");
    const model = JSON.parse(json);
    expect(model.dims.map((d: { pct: number }) => d.pct)).toEqual([100, 0]);
    expect(json).toContain("SNAPSHOT-POINT-a");
    expect(json).toContain("A is high.");
    expect(json).not.toContain("FULL-A-HIGH");
    expect(json).not.toContain(SECRET_BODY);
  });

  it("deep: everything", () => {
    const json = report("deep");
    expect(json).toContain(`${SECRET_BODY} one`);
    expect(json).toContain("FULL-A-HIGH");
    expect(json).toContain("METHOD-TEXT");
  });

  it("preview-depth experiment gives away exactly the first section", () => {
    const json = report("free", "free_headline", 1);
    expect(json).toContain(`${SECRET_BODY} one`);
    expect(json).not.toContain(`${SECRET_BODY} two`);
  });

  it("free tools show everything (nothing to sell)", () => {
    const free = { ...quiz, sellsReports: false as const };
    const json = JSON.stringify(buildReport({ quiz: free, scores, answers, level: "free", paywall: "free_headline", norms: null }));
    expect(json).toContain(SECRET_BODY);
  });
});

describe("experiments", () => {
  it("assigns the same variant to the same guest, and spreads guests across variants", () => {
    const ids = Array.from({ length: 200 }, (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`);
    expect(variantFor("snapshot_price", ids[0])).toBe(variantFor("snapshot_price", ids[0]));
    const seen = new Set(ids.map((id) => variantFor("snapshot_price", id)));
    expect(seen).toEqual(new Set(EXPERIMENTS.snapshot_price));
  });

  it("never paywalls screeners, and honors per-quiz A/B", () => {
    expect(paywallMode({ ...quiz, isScreener: true, paywall: "full" }, {})).toBe("free_headline");
    expect(paywallMode({ ...quiz, paywall: "ab" }, { paywall: "full" })).toBe("full");
    expect(paywallMode({ ...quiz, paywall: "ab" }, {})).toBe("free_headline");
    expect(variantLabel({ sub_offer: "first", paywall: "full" })).toBe("paywall=full;sub_offer=first");
  });
});

describe("signed links", () => {
  it("bind purpose and subject", () => {
    const s = sign("refund", "abc");
    expect(verify("refund", "abc", s)).toBe(true);
    expect(verify("refund", "abd", s)).toBe(false);
    expect(verify("unsubscribe", "abc", s)).toBe(false);
    expect(verify("refund", "abc", null)).toBe(false);
    expect(verify("refund", "abc", s.slice(0, -1))).toBe(false);
  });
});

describe("products", () => {
  it("levels are ordered", () => {
    expect(atLeast("deep", "snapshot")).toBe(true);
    expect(atLeast("snapshot", "deep")).toBe(false);
  });

  it("sells a bundle only with 3+ quizzes on sale, including only those", () => {
    expect(sellableBundles(new Set(["attachment-style-quiz", "love-language-quiz"]))).toEqual([]);
    const [b] = sellableBundles(new Set(["attachment-style-quiz", "love-language-quiz", "couples-compatibility-test"]));
    expect(b.key).toBe("relationship");
    expect(b.included).toEqual(["attachment-style-quiz", "love-language-quiz", "couples-compatibility-test"]);
  });
});

describe("admin overrides", () => {
  const row = (slug: string, definition: unknown, status: string | null) => ({ slug, definition, status, updatedBy: null, updatedAt: new Date() });
  it("status-only rows change status; full rows replace; unknown slugs add quizzes", () => {
    const merged = mergeOverrides([quiz], [row("lib-test", null, "draft"), row("new-quiz", { ...quiz, slug: "x", n: 5, title: "New" }, "draft")]);
    expect(merged.find((q) => q.slug === "lib-test")?.status).toBe("draft");
    expect(merged.find((q) => q.slug === "new-quiz")?.title).toBe("New");
  });
});

describe("text helpers", () => {
  it("first sentence", () => {
    expect(firstSentence("One. Two.")).toBe("One.");
    expect(firstSentence("No period")).toBe("No period");
  });

  it("rich text keeps a lead-in line separate from its bullets", () => {
    expect(richBlocks("What helps:\n- sleep\n- water\n\nAfter.")).toEqual([
      { type: "p", text: "What helps:" },
      { type: "ul", items: ["sleep", "water"] },
      { type: "p", text: "After." },
    ]);
  });

  it("PDF text drops emoji and maps symbols the built-in fonts lack", () => {
    expect(pdfSafe("Score ≥ 10 → good 🎉 “quoted”")).toBe("Score >= 10 -> good “quoted”");
  });
});

describe("age gate", () => {
  const now = new Date("2026-10-10T00:00:00Z");
  it("assumes the birthday hasn't happened yet", () => {
    expect(ageFromBirthYear(2013, now)).toBe(12);
    expect(ageFromBirthYear(2012, now)).toBe(13);
  });
  it("bands and validation", () => {
    expect(ageBand(15)).toBe("13-17");
    expect(ageBand(30)).toBe("25-34");
    expect(validBirthYear(1990, now)).toBe(true);
    expect(validBirthYear(1800, now)).toBe(false);
    expect(validBirthYear(2027, now)).toBe(false);
    expect(parseAgeCookie("under13")).toEqual({ birthYear: null, underage: true });
    expect(parseAgeCookie("1990")).toEqual({ birthYear: 1990, underage: false });
  });
});
