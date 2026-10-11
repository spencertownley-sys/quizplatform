/** Read a required server env var, failing loudly at use time (not at build time). */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}. See .env.example.`);
  return v;
}

export const appUrl = () => (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const isProduction = () => process.env.NODE_ENV === "production";

/** Clerk is optional in development: without keys the site runs guest-only, with a dev sign-in. */
export const clerkEnabled = () => !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

/**
 * Local testing without Stripe: checkouts succeed instantly and run the same
 * fulfilment as the webhook. Never in production, never when a Stripe key is set.
 */
export const fakePayments = () => !isProduction() && !process.env.STRIPE_SECRET_KEY && process.env.DEV_FAKE_PAYMENTS === "1";

/** Development helpers (dev sign-in, email outbox) are never available in production. */
export const devToolsEnabled = () => !isProduction() && process.env.DEV_TOOLS !== "0";

/** Secret for signed links (refund, unsubscribe, billing portal from email). */
export function appSecret(): string {
  const s = process.env.APP_SECRET;
  if (s && s.length >= 32) return s;
  if (isProduction()) throw new Error("APP_SECRET must be set to a random string of at least 32 characters.");
  return "dev-only-secret-do-not-use-in-production-0000";
}
