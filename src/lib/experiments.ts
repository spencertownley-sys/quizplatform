import { createHash } from "node:crypto";
import type { QuizDefinition } from "./engine/types";

/**
 * A/B tests from the requirements doc. Assignment is deterministic per guest
 * (same browser, same variant) and recorded on attempts and purchases.
 * Turn tests on with EXPERIMENTS=snapshot_price,preview_depth,email_timing,sub_offer.
 * The paywall test is per quiz: set its paywall mode to "ab" in the admin.
 */
export const EXPERIMENTS = {
  /** Free headline result vs. full paywall. */
  paywall: ["free_headline", "full"],
  /** $0.99 vs. $1.99 Snapshot. Needs STRIPE_PRICE_SNAPSHOT_TEST. */
  snapshot_price: ["99", "199"],
  /** Preview: first paragraph unblurred vs. first full section. */
  preview_depth: ["paragraph", "section"],
  /** Optional email capture before vs. after the result. */
  email_timing: ["before", "after"],
  /** All-Access offered on first purchase vs. only after a second. */
  sub_offer: ["second", "first"],
} as const;

export type ExperimentKey = keyof typeof EXPERIMENTS;
export type Variants = Partial<Record<ExperimentKey, string>>;

const enabled = () => new Set((process.env.EXPERIMENTS ?? "").split(",").map((s) => s.trim()).filter(Boolean));

export function variantFor(key: ExperimentKey, guestId: string | null): string {
  const options = EXPERIMENTS[key];
  if (!guestId) return options[0];
  const h = createHash("sha256").update(`${key}:${guestId}`).digest();
  return options[h[0] % options.length];
}

/** The variants that apply to this guest on this quiz. Control (first option) when a test is off. */
export function variantsFor(guestId: string | null, quiz?: QuizDefinition): Variants {
  const on = enabled();
  const v: Variants = {};
  for (const key of Object.keys(EXPERIMENTS) as ExperimentKey[]) {
    if (key === "paywall") {
      if (quiz?.paywall === "ab") v.paywall = variantFor("paywall", guestId);
      continue;
    }
    if (key === "snapshot_price" && !process.env.STRIPE_PRICE_SNAPSHOT_TEST && !process.env.DEV_FAKE_PAYMENTS) continue;
    if (on.has(key)) v[key] = variantFor(key, guestId);
  }
  return v;
}

/** The paywall mode a guest actually gets for a quiz. Screeners are never paywalled. */
export function paywallMode(quiz: QuizDefinition, variants: Variants): "free_headline" | "full" {
  if (quiz.isScreener || quiz.sellsReports === false) return "free_headline";
  if (quiz.paywall === "ab") return variants.paywall === "full" ? "full" : "free_headline";
  return quiz.paywall;
}

export const variantLabel = (v: Variants | null | undefined) =>
  Object.entries(v ?? {})
    .map(([k, val]) => `${k}=${val}`)
    .sort()
    .join(";");
