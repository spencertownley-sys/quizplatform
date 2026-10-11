/**
 * Quiz definitions are plain data. One engine scores every quiz; the
 * `structure` field picks the scoring rules (see docs/QUIZ_STRUCTURES.md).
 * Writers: read docs/CONTENT_GUIDE.md before adding a quiz.
 */

export type StructureCode =
  | "trait_profile" // T1: 1–6 continuous traits
  | "typology" // T2: one of 4–16 types
  | "two_axis_quadrant" // T3: 2×2 map from two scores
  | "ability" // T4: right/wrong items of rising difficulty
  | "performance" // T5: timed trials (reaction time)
  | "persona_match" // T6: fun outcomes
  | "recommender" // T7: ranked list from a catalog
  | "screener" // T8: validated public instrument, always free
  | "compare" // T9: each person scored alone, then compared
  | "chart"; // T10: birth chart from date, time and place

export type Category =
  | "Personality"
  | "Relationships"
  | "Brain"
  | "Career & money"
  | "Spiritual"
  | "Fandom-style"
  | "Style"
  | "Wellbeing (free)";

/** A rating scale. Values run from `start` to `start + labels.length - 1`. */
export interface Scale {
  /** Labels from the lowest value to the highest. */
  labels: string[];
  /** Value of the first label. Default 1. PHQ-9 and the ASRS start at 0. */
  start?: number;
}

/** Rate one statement on the quiz's (or the item's own) scale. */
export interface LikertQuestion {
  id: string;
  kind: "likert";
  text: string;
  dimension: string;
  /** Optional sub-dimension (Big Five facets, HSP subscales). Must be listed in `facets`. */
  facet?: string;
  /** Reverse-keyed: agreeing lowers the dimension score. */
  reverse?: boolean;
  /** Item weight, default 1. */
  weight?: number;
  /** Overrides the quiz scale for this item. */
  scale?: Scale;
  /** Screeners: false for items the published scoring leaves out (e.g. PHQ-9 item 10). */
  scored?: boolean;
  /** Screeners using count_at_threshold: the item counts when its value is >= this. */
  threshold?: number;
}

export interface ChoiceOption {
  id: string;
  label: string;
  /** Shown big on tile layouts (image-choice quizzes). */
  emoji?: string;
  /** Points this option adds to each dimension. */
  weights: Record<string, number>;
  /** Recommender hard filters: catalog items with any of these tags are dropped. */
  excludeTags?: string[];
  /** Recommender hard filters: catalog items must have every one of these tags. */
  requireTags?: string[];
}

/** Pick one option (forced choice, scenario, image choice). */
export interface ChoiceQuestion {
  id: string;
  kind: "choice";
  text: string;
  options: ChoiceOption[];
  /** "tiles" renders a 2×2 grid with big emoji, for image-choice items. */
  display?: "list" | "tiles";
}

/** Pick any number of options (recommenders). Each picked option adds its weights. */
export interface MultiQuestion {
  id: string;
  kind: "multi";
  text: string;
  options: ChoiceOption[];
  /** Most options a taker may pick. Default: all. */
  max?: number;
}

/** A shape drawn in a matrix figure. */
export interface FigureShape {
  shape: "circle" | "square" | "triangle" | "diamond" | "star" | "line";
  /** 1–4 copies of the shape in the cell. */
  count?: number;
  fill?: "solid" | "outline" | "striped";
  /** Degrees. */
  rotate?: number;
  /** 0.4–1, relative to the cell. */
  size?: number;
}

/** Cells of a 3×3 pattern matrix, row by row; null is the missing tile. */
export interface MatrixFigure {
  type: "matrix";
  cells: (FigureShape[] | null)[];
}

/** Right/wrong item (T4). The correct option never leaves the server. */
export interface AbilityQuestion {
  id: string;
  kind: "ability";
  text: string;
  /** The skill (dimension) this item measures. */
  dimension: string;
  /** 1 (easy) to 5 (hard). Correct answers score their difficulty. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  options: { id: string; label: string; figure?: FigureShape[] }[];
  correct: string;
  /** Shown in the paid answer review. */
  explanation: string;
  figure?: MatrixFigure;
}

/** "Choose 'Agree' for this one." Never scored; a wrong answer only flags the attempt. */
export interface AttentionQuestion {
  id: string;
  kind: "attention";
  text: string;
  /** The scale value a reader who is paying attention picks. */
  expect: number;
}

export type Question = LikertQuestion | ChoiceQuestion | MultiQuestion | AbilityQuestion | AttentionQuestion;

/** Paragraphs separated by a blank line. A line starting with "- " is a bullet. */
export type RichText = string;

export interface ReportSection {
  title: string;
  /** First line(s), shown unblurred as the paywall preview. Must make sense on its own. */
  teaser: string;
  /** Full text for Deep Report buyers. */
  body: RichText;
}

export interface Outcome {
  key: string;
  name: string;
  /** One line under the name (share card, free result). */
  tagline: string;
  emoji?: string;
  /** 2–3 sentence free result. */
  summary: string;
  /** Public description for the outcome's SEO page (150–300 words). Never the paid text. */
  about: RichText;
  /** Snapshot ($0.99) key points: 4–6 bullets. */
  snapshot: string[];
  /** Deep Report ($2.99) sections. */
  deep: ReportSection[];
}

/** Interpretation for one band of a dimension's score. Used in Snapshot (first sentence) and Deep Report. */
export interface BandText {
  low: string;
  mid: string;
  high: string;
}

export interface Dimension {
  key: string;
  label: string;
  /** Pole labels for the score bar. */
  low?: string;
  high?: string;
  /** What this dimension measures, one sentence. */
  description?: string;
  /** Personalized interpretation by score band (low < 0.35 ≤ mid ≤ 0.65 < high). */
  report?: BandText;
}

export interface Facet {
  key: string;
  label: string;
  dimension: string;
  report?: BandText;
}

/** Turns a score into an outcome by cut points. Bands are inclusive lower bounds. */
export interface BandConfig {
  /**
   * What is cut:
   * - "overall": all scored items pooled (0–1)
   * - "mean": mean of the dimensions' normalized scores (0–1)
   * - { dimension }: one dimension's normalized score (0–1)
   * - "raw_total": sum of the answer values as given (screeners)
   * - "count_at_threshold": number of items at or above their `threshold` (ASRS)
   */
  on: "overall" | "mean" | { dimension: string } | "raw_total" | "count_at_threshold";
  bands: { min: number; outcome: string }[];
}

export interface QuadrantConfig {
  x: string; // dimension key on the horizontal axis
  y: string; // dimension key on the vertical axis
  /** Normalized cutoff (0–1) separating low from high on both axes. */
  cutoff: number;
  /** Outcome key for each corner: `${xLevel}_${yLevel}`. */
  map: { low_low: string; high_low: string; low_high: string; high_high: string };
}

export interface TypologyConfig {
  /**
   * "highest": the top dimension among `outcomeDimensions` is the type.
   * "axes": each axis picks a letter; the letters joined (lowercase) are the outcome key, e.g. "intj".
   */
  mode: "highest" | "axes";
  axes?: { dimension: string; low: string; high: string }[];
}

/** Extra facts derived from scores, shown in reports (wing, instinct, modifier, RIASEC code). */
export type ExtraConfig =
  | { key: string; label: string; kind: "top_of"; dimensions: string[] }
  | { key: string; label: string; kind: "pole"; dimension: string; low: string; high: string; cutoff?: number }
  /** Enneagram wing: the higher-scoring neighbor of the outcome in `outcomeDimensions` order (circular). */
  | { key: string; label: string; kind: "wing" }
  /** First letters of the top N dimensions, e.g. RIASEC code "SAE". */
  | { key: string; label: string; kind: "code"; length: number; letters: Record<string, string> };

export interface CatalogItem {
  key: string;
  name: string;
  /** Target score (0–1) on each dimension it cares about. */
  profile: Record<string, number>;
  tags?: string[];
  blurb?: string;
  /** Display facts, e.g. { "Median pay": "$61,000" }. */
  facts?: Record<string, string>;
  /** Swatches for palettes (hex). */
  colors?: string[];
  /** Shopping or next-step links. Affiliate links get a disclosure automatically. */
  links?: { label: string; url: string; affiliate?: boolean }[];
}

export interface RecommenderConfig {
  catalog: CatalogItem[];
  /** "top_item": the best catalog match is the outcome. "top_dimension": the top dimension is. */
  outcome: "top_item" | "top_dimension";
  /** "distance": 1 − mean absolute gap. "correlation": shape match, ignores overall level (interest inventories). */
  similarity: "distance" | "correlation";
  /** How many matches the Snapshot and Deep Report list. */
  listSize?: number;
}

export interface ScreenerConfig {
  /** Shown when a risk item is endorsed (e.g. PHQ-9 item 9 above zero). */
  riskItems?: { questionId: string; minValue: number }[];
  /** Instrument citation and licence note shown under the result. */
  source: string;
}

export interface PerformanceConfig {
  task: "reaction_time";
  trials: number;
  /** Trials outside this range are dropped as false starts or distractions. */
  validMs: [number, number];
  /** Medians at or below `fast` score 1, at or above `slow` score 0. */
  reference: { fast: number; slow: number };
  /** At least this many valid trials are needed. */
  minValid: number;
}

export interface AbilityConfig {
  /** Whole-test limit. Unanswered items count as wrong. */
  timeLimitSec?: number;
}

export interface ChartConfig {
  /** Bodies to place. The sun sign is the outcome; moon and rising are extras. */
  bodies: ("sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn")[];
}

/** Per-dimension copy for comparison reports. */
export interface CompareCopy {
  /** When the two people's scores are close. */
  match: string;
  /** When they're far apart. */
  differ: string;
  /** Conversation prompts for this area. */
  prompts: string[];
}

export interface CompareConfig {
  /** Invite headline on the result page, e.g. "See how you and your partner compare". */
  invite: string;
  /** Who the other person is, used in copy: "partner", "friend". */
  other: string;
  dimensions: Record<string, CompareCopy>;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface SeoCopy {
  /** Opening paragraph under the title. */
  intro: RichText;
  /** What the test measures (2–3 paragraphs). */
  measures: RichText;
  /** Where it comes from and its limits (1–2 paragraphs). */
  origin: RichText;
  faqs: FAQ[];
  keywords: string[];
}

export interface QuizDefinition {
  slug: string;
  /** Catalog number in docs/QUIZ_CATALOG.md. */
  n: number;
  title: string;
  /** Short promise for cards. */
  tagline: string;
  category: Category;
  structure: StructureCode;
  description: string;
  /** Plain-language note on what this quiz is and isn't (shown on landing + result). */
  disclaimer?: string;
  /** How scoring works and its limits; closes the Deep Report. */
  method: RichText;
  /** Shown above every item, e.g. a screener's time frame ("Over the last 2 weeks…"). */
  instructions?: string;
  minutes: number;
  /**
   * "free_headline": free result + paid depth (default).
   * "full": result behind the paywall (A/B option).
   * "ab": half of visitors get each, by guest id.
   */
  paywall: "free_headline" | "full" | "ab";
  /** Screeners are always free and never sell reports. */
  isScreener?: boolean;
  /** false for free tools that never sell one-time reports (reaction time is free + All-Access). */
  sellsReports?: boolean;
  /** Min age to take. 18 for relationship and money reports. */
  minAge: 13 | 18;
  /** Default scale for likert items. Default: 5-point agree/disagree. */
  scale?: Scale;
  dimensions: Dimension[];
  facets?: Facet[];
  /** Dimensions that compete for the outcome ("top" modes). Default: all. */
  outcomeDimensions?: string[];
  questions: Question[];
  outcomes: Outcome[];
  bands?: BandConfig;
  quadrant?: QuadrantConfig;
  typology?: TypologyConfig;
  extras?: ExtraConfig[];
  /** Report blocks for extras: extraBlocks[extraKey][`${outcome}:${value}`] or [value]. */
  extraBlocks?: Record<string, Record<string, { title: string; body: RichText }>>;
  recommender?: RecommenderConfig;
  screener?: ScreenerConfig;
  performance?: PerformanceConfig;
  ability?: AbilityConfig;
  chart?: ChartConfig;
  compare?: CompareConfig;
  seo: SeoCopy;
  /** Slugs to recommend next (dashboard Discover, result page). */
  related?: string[];
  /** Notes for the reviewer: licences to confirm, trademark checks. */
  reviewNotes?: string;
  /** Content status. Only "live" quizzes sell reports. */
  status: "draft" | "reviewed" | "live";
}

/**
 * Likert answers are scale values; choice and ability answers are option ids;
 * multi answers are arrays of option ids; null is a skipped ability item.
 * Performance answers are trial times in ms; chart answers are strings.
 */
export type AnswerValue = number | string | string[] | null;
export type Answers = Record<string, AnswerValue>;

export interface DimensionScore {
  raw: number;
  max: number;
  /** 0..1 */
  normalized: number;
}

export interface ScoreResult {
  outcomeKey: string;
  dimensions: Record<string, DimensionScore>;
  facets?: Record<string, DimensionScore>;
  /** Outcomes ranked by score where meaningful, else [outcomeKey]. */
  ranking: { key: string; score: number }[];
  /** 0–1: how clearly the result beat the alternatives. */
  confidence?: number;
  extras?: Record<string, string | number | boolean>;
  /** Ability tests: per-item correctness for the answer review. */
  items?: Record<string, boolean>;
  /** Recommenders: catalog matches, best first. */
  matches?: { key: string; score: number }[];
  /** Screeners: raw total. Performance: median ms. */
  total?: number;
  /** "attention_failed", "risk_item". */
  flags?: string[];
  /** Chart: computed placements. */
  chart?: Record<string, { sign: string; degree: number }>;
}
