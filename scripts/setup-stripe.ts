/**
 * Creates the three products and prices in your Stripe account (test mode first!)
 * and prints the env lines to paste into .env.local.
 *
 *   STRIPE_SECRET_KEY=sk_test_... npm run stripe:setup
 */
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error("Set STRIPE_SECRET_KEY (use a test key first).");
const stripe = new Stripe(key);

const defs = [
  { env: "STRIPE_PRICE_SNAPSHOT", name: "Snapshot report", cents: 99, recurring: false },
  { env: "STRIPE_PRICE_DEEP", name: "Deep Report", cents: 299, recurring: false },
  { env: "STRIPE_PRICE_ALL_ACCESS", name: "All-Access", cents: 999, recurring: true },
];

for (const d of defs) {
  const product = await stripe.products.create({ name: d.name, tax_code: "txcd_10000000" /* general electronically supplied services */ });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: d.cents,
    ...(d.recurring ? { recurring: { interval: "month" as const } } : {}),
  });
  console.log(`${d.env}=${price.id}`);
}
