/**
 * Quiz definitions are plain data. One engine scores every quiz; the
 * `structure` field picks the scoring function (see docs/QUIZ_STRUCTURES.md).
 */

export type StructureCode =
  | "trait_profile" // T1
  | "typology" // T2
  | "two_axis_quadrant" // T3
  | "ability" // T4 (not implemented yet)
  | "performance" // T5 (not implemented yet)
  | "persona_match" // T6
  | "recommender" // T7 (not implemented yet)
  | "screener" // T8
  | "compare" // T9 (not implemented yet)
  | "chart"; // T10 (not implemented yet)

export type Category =
  | "Personality"
  | "Relationships"
  | "Brain"
  | "Career & money"
  | "Spiritual"
  | "Fandom-style"
  | "Style"
  | "Wellbeing (free)";

/** Agree/disagree item scored on one dimension. */
export interface LikertQuestion {
  id: string;
  kind: "likert";
  text: string;
  dimension: string;
  /** Reverse-keyed: agreeing lowers the dimension score. */
  reverse?: boolean;
}

/** Pick-one item; each option adds points to one or more dimensions. */
export interface ChoiceQuestion {
  id: string;
  kind: "choice";
  text: string;
  options: { id: string; label: string; weights: Record<string, number> }[];
}

export type Question = LikertQuestion | ChoiceQuestion;

export interface ReportSection {
  title: string;
  /** Shown blurred-but-readable as the paywall preview. */
  teaser: string;
  /** Full text, only for Deep Report buyers. */
  body: string;
}

export interface Outcome {
  key: string;
  name: string;
  /** 2–3 sentence free result. */
  summary: string;
  /** Snapshot ($0.99) bullet points. */
  snapshot: string[];
  /** Deep Report ($2.99) sections. */
  deep: ReportSection[];
}

export interface QuadrantConfig {
  x: string; // dimension key on the horizontal axis
  y: string; // dimension key on the vertical axis
  /** Normalized cutoff (0–1) separating low from high on both axes. */
  cutoff: number;
  /** Outcome key for each corner: `${xLevel}_${yLevel}`. */
  map: { low_low: string; high_low: string; low_high: string; high_high: string };
}

export interface ScreenerBand {
  /** Inclusive lower bound of the raw total. */
  min: number;
  outcome: string;
}

export interface QuizDefinition {
  slug: string;
  title: string;
  category: Category;
  structure: StructureCode;
  description: string;
  /** Plain-language note on what this quiz is and isn't (shown on landing + result). */
  disclaimer?: string;
  minutes: number;
  /** "free_headline" = free result + paid depth; "full" = result behind paywall (A/B option). */
  paywall: "free_headline" | "full";
  /** Screeners are always free and never sell reports. */
  isScreener?: boolean;
  /** Min age to take. 18 for relationship/money reports. */
  minAge: 13 | 18;
  likertPoints?: 5 | 7;
  dimensions: { key: string; label: string; low?: string; high?: string }[];
  questions: Question[];
  outcomes: Outcome[];
  quadrant?: QuadrantConfig;
  screenerBands?: ScreenerBand[];
  /** Content status. Drafts should not be sold. */
  status: "draft" | "reviewed" | "live";
}

/** Likert answers are numbers 1..points; choice answers are option ids. */
export type Answers = Record<string, number | string>;

export interface DimensionScore {
  raw: number;
  max: number;
  /** 0..1 */
  normalized: number;
}

export interface ScoreResult {
  outcomeKey: string;
  dimensions: Record<string, DimensionScore>;
  /** Outcomes ranked by score where meaningful (typology / persona), else [outcomeKey]. */
  ranking: { key: string; score: number }[];
}
