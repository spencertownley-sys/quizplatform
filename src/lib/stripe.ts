import "server-only";
import Stripe from "stripe";
import { requireEnv } from "./env";

let _stripe: Stripe | undefined;
export function stripe() {
  _stripe ??= new Stripe(requireEnv("STRIPE_SECRET_KEY"));
  return _stripe;
}

export const idOf = (v: string | { id: string } | null | undefined) => (typeof v === "string" ? v : (v?.id ?? null));

/** Newer Stripe API versions moved the period end onto subscription items. */
export function periodEnd(sub: Stripe.Subscription): Date | null {
  const legacy = (sub as unknown as { current_period_end?: number }).current_period_end;
  const fromItem = sub.items?.data?.[0]?.current_period_end;
  const ts = fromItem ?? legacy;
  return ts ? new Date(ts * 1000) : null;
}
