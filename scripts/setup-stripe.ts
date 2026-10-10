/**
 * Sets up Stripe for the quiz platform (run in test mode first!) and prints the
 * env lines to paste into .env.local / your host's environment:
 *   - products and prices: Snapshot, Deep Report, comparison report, bundle, All-Access,
 *     and the $1.99 Snapshot used by the price experiment
 *   - a Customer Portal configuration with invoices, payment methods and cancellation
 *     (cancel at period end, so people keep what they paid for)
 *   - optionally the webhook endpoint, when APP_URL is a public https URL
 *
 *   STRIPE_SECRET_KEY=sk_test_... [APP_URL=https://yourdomain.com] npm run stripe:setup
 */
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error("Set STRIPE_SECRET_KEY (use a test key first).");
const stripe = new Stripe(key);
const appUrl = process.env.APP_URL?.replace(/\/$/, "");

const defs = [
  { env: "STRIPE_PRICE_SNAPSHOT", name: "Snapshot report", cents: 99, recurring: false },
  { env: "STRIPE_PRICE_SNAPSHOT_TEST", name: "Snapshot report ($1.99 test)", cents: 199, recurring: false },
  { env: "STRIPE_PRICE_DEEP", name: "Deep Report", cents: 299, recurring: false },
  { env: "STRIPE_PRICE_COMPARISON", name: "Comparison report", cents: 199, recurring: false },
  { env: "STRIPE_PRICE_BUNDLE", name: "Report bundle", cents: 499, recurring: false },
  { env: "STRIPE_PRICE_ALL_ACCESS", name: "All-Access", cents: 999, recurring: true },
];

const lines: string[] = [];
for (const d of defs) {
  // txcd_10000000: general electronically supplied services (Stripe Tax).
  const product = await stripe.products.create({ name: d.name, tax_code: "txcd_10000000" });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: d.cents,
    ...(d.recurring ? { recurring: { interval: "month" as const } } : {}),
  });
  lines.push(`${d.env}=${price.id}`);
}

const portal = await stripe.billingPortal.configurations.create({
  business_profile: {
    headline: "Manage your plan, receipts and payment method",
    ...(appUrl ? { privacy_policy_url: `${appUrl}/legal/privacy`, terms_of_service_url: `${appUrl}/legal/terms` } : {}),
  },
  features: {
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
    customer_update: { enabled: true, allowed_updates: ["email", "address"] },
    subscription_cancel: { enabled: true, mode: "at_period_end", cancellation_reason: { enabled: false, options: [] } },
  },
  ...(appUrl ? { default_return_url: `${appUrl}/dashboard` } : {}),
});
lines.push(`STRIPE_PORTAL_CONFIGURATION=${portal.id}`);

if (appUrl?.startsWith("https://")) {
  const hook = await stripe.webhookEndpoints.create({
    url: `${appUrl}/api/webhooks/stripe`,
    enabled_events: [
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
      "checkout.session.expired",
      "customer.subscription.created",
      "customer.subscription.updated",
      "customer.subscription.deleted",
      "charge.refunded",
      "charge.dispute.created",
    ],
  });
  lines.push(`STRIPE_WEBHOOK_SECRET=${hook.secret}`);
} else {
  console.error("No public APP_URL: skipped the webhook. Locally, run: stripe listen --forward-to localhost:3000/api/webhooks/stripe");
}

console.log(lines.join("\n"));
