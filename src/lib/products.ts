export type ProductKey = "snapshot" | "deep" | "all_access" | "bundle" | "comparison";

export interface ProductDef {
  name: string;
  priceLabel: string;
  cents: number;
  priceEnv: string;
  recurring: boolean;
  /** What it unlocks, for checkout copy and receipts. */
  blurb: string;
}

export const PRODUCTS: Record<ProductKey, ProductDef> = {
  snapshot: {
    name: "Snapshot",
    priceLabel: "$0.99",
    cents: 99,
    priceEnv: "STRIPE_PRICE_SNAPSHOT",
    recurring: false,
    blurb: "Every score, what each one means, key points and a PDF.",
  },
  deep: {
    name: "Deep Report",
    priceLabel: "$2.99",
    cents: 299,
    priceEnv: "STRIPE_PRICE_DEEP",
    recurring: false,
    blurb: "Everything in Snapshot plus your full personalized report and PDF.",
  },
  comparison: {
    name: "Comparison report",
    priceLabel: "$1.99",
    cents: 199,
    priceEnv: "STRIPE_PRICE_COMPARISON",
    recurring: false,
    blurb: "Side-by-side scores, where you match, friction points and conversation prompts, for both of you.",
  },
  bundle: {
    name: "Bundle",
    priceLabel: "$4.99",
    cents: 499,
    priceEnv: "STRIPE_PRICE_BUNDLE",
    recurring: false,
    blurb: "Deep Reports for every quiz in the bundle, now and when you take them later.",
  },
  all_access: {
    name: "All-Access",
    priceLabel: "$9.99/month",
    cents: 999,
    priceEnv: "STRIPE_PRICE_ALL_ACCESS",
    recurring: true,
    blurb: "Every Deep Report on every quiz, retake history, compare with friends, new quizzes monthly.",
  },
};

/** $1.99 Snapshot for the price test (experiment "snapshot_price"). */
export const SNAPSHOT_TEST = { cents: 199, priceLabel: "$1.99", priceEnv: "STRIPE_PRICE_SNAPSHOT_TEST" };

export interface Bundle {
  key: string;
  name: string;
  /** Planned quizzes; only built, on-sale ones are included in what's sold. */
  quizzes: string[];
}

export const BUNDLES: Bundle[] = [
  {
    key: "relationship",
    name: "Relationship Bundle",
    quizzes: ["attachment-style-quiz", "love-language-quiz", "conflict-style-quiz", "couples-compatibility-test"],
  },
  {
    key: "know-yourself",
    name: "Know Yourself Bundle",
    quizzes: ["16-type-personality-test", "big-five-personality-test", "enneagram-test", "four-temperaments-test"],
  },
  { key: "career", name: "Career Bundle", quizzes: ["career-test", "work-style-assessment", "leadership-style-quiz", "strengths-finder"] },
];

/** A bundle is sold only when at least 3 of its quizzes are on sale; it includes exactly those. */
export function sellableBundles(onSaleSlugs: Set<string>) {
  return BUNDLES.map((b) => ({ ...b, included: b.quizzes.filter((s) => onSaleSlugs.has(s)) })).filter((b) => b.included.length >= 3);
}

/** Report depth a buyer can see. Order matters: each level includes the ones before it. */
export const LEVELS = ["free", "snapshot", "deep"] as const;
export type AccessLevel = (typeof LEVELS)[number];
export const atLeast = (have: AccessLevel, need: AccessLevel) => LEVELS.indexOf(have) >= LEVELS.indexOf(need);

export const formatCents = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
