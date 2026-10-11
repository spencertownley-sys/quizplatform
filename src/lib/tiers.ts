import type { QuizDefinition, StructureCode } from "./engine/types";

/** What each tier includes, by structure (docs/QUIZ_STRUCTURES.md). Shown on the landing page before anyone starts. */
const COPY: Record<StructureCode, { free: string; snapshot: string; deep: string }> = {
  trait_profile: {
    free: "Your headline result and a short summary",
    snapshot: "Every score with what it means, key points, PDF",
    deep: "Facet-level breakdown, how it shows up at work, in love and under stress, and a growth plan",
  },
  typology: {
    free: "Your type and a short summary",
    snapshot: "Your score on every type or axis, runner-up and how clear your result is",
    deep: "Full type profile, relationships, careers, blind spots, growth plan and more",
  },
  two_axis_quadrant: {
    free: "Your style and where it sits on the map",
    snapshot: "Your exact position on both scales and how close you are to a border",
    deep: "Your full profile, triggers, pairings with each style and steps to grow",
  },
  ability: {
    free: "Your score band",
    snapshot: "Your breakdown by skill (and an estimate once we have enough takers)",
    deep: "Answer review with explanations, a practice plan and a certificate PDF",
  },
  performance: {
    free: "Your score and every trial",
    snapshot: "Your score by age group, once we have enough takers",
    deep: "History over time with All-Access",
  },
  persona_match: {
    free: "Your result and a share card",
    snapshot: "Your match with every possible result",
    deep: "Your full story, compatible results and the real traits behind it",
  },
  recommender: {
    free: "Your top match",
    snapshot: "Your top 5 matches with reasons",
    deep: "Your full ranked list and how to act on it",
  },
  screener: {
    free: "Your full result, explained, with where to get support",
    snapshot: "Not sold",
    deep: "Not sold",
  },
  compare: {
    free: "Your own result, plus a link to invite your partner",
    snapshot: "Every score with what it means",
    deep: "Your full profile; add a joint comparison report when your partner finishes",
  },
  chart: {
    free: "Your Sun, Moon and Rising signs",
    snapshot: "Your full chart with every placement",
    deep: "An interpretation of every placement",
  },
};

export const tierCopy = (q: QuizDefinition) => COPY[q.structure];

export const itemCountLabel = (q: QuizDefinition) =>
  q.structure === "performance"
    ? `${q.performance?.trials ?? 5} trials`
    : q.structure === "chart"
      ? "3 details"
      : `${q.questions.filter((x) => x.kind !== "attention").length} questions`;
