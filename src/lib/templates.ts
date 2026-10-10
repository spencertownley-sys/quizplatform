import type { CatalogEntry } from "@/content/catalog";
import { AGREE_5 } from "./engine/scales";
import type { Outcome, QuizDefinition, StructureCode } from "./engine/types";

export const STRUCTURE_OF: Record<CatalogEntry["structure"], StructureCode> = {
  T1: "trait_profile",
  T2: "typology",
  T3: "two_axis_quadrant",
  T4: "ability",
  T5: "performance",
  T6: "persona_match",
  T7: "recommender",
  T8: "screener",
  T9: "compare",
  T10: "chart",
};

const outcome = (key: string, name: string): Outcome => ({
  key,
  name,
  tagline: "TODO one-line tagline",
  summary: "TODO 2–3 sentence free result.",
  about: "TODO 150–300 word public description of this result.",
  snapshot: ["TODO", "TODO", "TODO", "TODO"],
  deep: [{ title: "TODO section title", teaser: "TODO first line shown in the preview.", body: "TODO 250–450 words." }],
});

/**
 * Starting point for a new quiz in the admin editor. Placeholder text says TODO,
 * which the linter rejects, so a template can be saved as a draft but never published.
 */
export function quizTemplate(entry: CatalogEntry): QuizDefinition {
  const structure = STRUCTURE_OF[entry.structure];
  const base: QuizDefinition = {
    slug: entry.slug,
    n: entry.n,
    title: entry.title,
    tagline: "TODO short promise for cards",
    category: entry.category,
    structure,
    description: "TODO 1–2 sentences for the landing page and search results.",
    method: "TODO how scoring works and its limits (120–200 words).",
    minutes: 5,
    paywall: "free_headline",
    minAge: entry.category === "Relationships" || entry.category === "Career & money" ? 18 : 13,
    scale: AGREE_5,
    status: "draft",
    dimensions: [
      { key: "a", label: "TODO dimension A", report: { low: "TODO", mid: "TODO", high: "TODO" } },
      { key: "b", label: "TODO dimension B", report: { low: "TODO", mid: "TODO", high: "TODO" } },
    ],
    questions: [
      { id: "q1", kind: "likert", dimension: "a", text: "TODO first item (under 20 words)" },
      { id: "q2", kind: "likert", dimension: "b", text: "TODO second item", reverse: true },
    ],
    outcomes: [outcome("a", "TODO result A"), outcome("b", "TODO result B")],
    seo: {
      intro: "TODO",
      measures: "TODO",
      origin: "TODO",
      faqs: [{ q: "TODO question?", a: "TODO answer." }],
      keywords: [],
    },
    reviewNotes: "Created in the admin from the catalog template.",
  };
  if (structure === "two_axis_quadrant") {
    base.outcomes = ["low_low", "high_low", "low_high", "high_high"].map((k) => outcome(k, `TODO ${k}`));
    base.quadrant = { x: "a", y: "b", cutoff: 0.5, map: { low_low: "low_low", high_low: "high_low", low_high: "low_high", high_high: "high_high" } };
  }
  if (structure === "typology") base.typology = { mode: "highest" };
  if (structure === "screener") {
    base.isScreener = true;
    base.sellsReports = false;
    base.bands = { on: "raw_total", bands: [{ min: 0, outcome: "a" }, { min: 5, outcome: "b" }] };
    base.screener = { source: "TODO instrument citation and licence" };
  }
  if (structure === "ability" || structure === "performance") {
    base.bands = { on: "overall", bands: [{ min: 0, outcome: "a" }, { min: 0.5, outcome: "b" }] };
  }
  if (structure === "recommender") {
    base.recommender = {
      outcome: "top_item",
      similarity: "distance",
      catalog: [
        { key: "a", name: "TODO item A", profile: { a: 1, b: 0 } },
        { key: "b", name: "TODO item B", profile: { a: 0, b: 1 } },
      ],
    };
  }
  if (structure === "chart") {
    base.questions = [];
    base.chart = { bodies: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"] };
    base.dimensions = ["fire", "earth", "air", "water"].map((k) => ({ key: k, label: k[0].toUpperCase() + k.slice(1) }));
  }
  return base;
}
