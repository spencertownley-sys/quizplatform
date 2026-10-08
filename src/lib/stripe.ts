import Stripe from "stripe";
import { requireEnv } from "./env";

let _stripe: Stripe | undefined;
export function stripe() {
  _stripe ??= new Stripe(requireEnv("STRIPE_SECRET_KEY"));
  return _stripe;
}
