import { requireEnv } from "./env";

export type ProductKey = "snapshot" | "deep" | "all_access";

export const PRODUCTS: Record<ProductKey, { name: string; priceLabel: string; cents: number; priceEnv: string; recurring: boolean }> = {
  snapshot: { name: "Snapshot", priceLabel: "$0.99", cents: 99, priceEnv: "STRIPE_PRICE_SNAPSHOT", recurring: false },
  deep: { name: "Deep Report", priceLabel: "$2.99", cents: 299, priceEnv: "STRIPE_PRICE_DEEP", recurring: false },
  all_access: { name: "All-Access", priceLabel: "$9.99/month", cents: 999, priceEnv: "STRIPE_PRICE_ALL_ACCESS", recurring: true },
};

export const stripePriceId = (p: ProductKey) => requireEnv(PRODUCTS[p].priceEnv);

/** Report depth a buyer can see. Order matters: each level includes the ones before it. */
export const LEVELS = ["free", "snapshot", "deep"] as const;
export type AccessLevel = (typeof LEVELS)[number];
export const atLeast = (have: AccessLevel, need: AccessLevel) => LEVELS.indexOf(have) >= LEVELS.indexOf(need);
