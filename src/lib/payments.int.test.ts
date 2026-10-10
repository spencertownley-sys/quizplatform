/**
 * Integration tests for the money paths, against a real Postgres.
 * Skipped unless TEST_DATABASE_URL is set (it gets wiped):
 *   TEST_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/quizplatform_test npm test
 */
import { randomBytes, randomUUID } from "node:crypto";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;

describe.skipIf(!url)("payments and entitlements (Postgres)", async () => {
  process.env.DATABASE_URL = url;
  process.env.DEV_FAKE_PAYMENTS = "1";
  delete process.env.STRIPE_SECRET_KEY;
  delete process.env.RESEND_API_KEY;

  const { eq, sql } = await import("drizzle-orm");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");
  const { db, t } = await import("@/db");
  const { accessLevel, claimForUser } = await import("./access");
  const { markPaid, refundPurchase } = await import("./fulfill");

  const tok = () => randomBytes(12).toString("base64url");
  async function guest() {
    const id = randomUUID();
    await db().insert(t.guestSessions).values({ id });
    return id;
  }
  async function attempt(guestId: string, quizSlug = "enneagram-test", email: string | null = null) {
    const [a] = await db()
      .insert(t.attempts)
      .values({ quizSlug, guestSessionId: guestId, email, accessToken: tok(), shareCode: tok(), answers: {}, outcomeKey: "t1", scores: { outcomeKey: "t1", dimensions: {}, ranking: [] } })
      .returning();
    return a;
  }
  async function purchase(values: Partial<typeof t.purchases.$inferInsert> & { product: "snapshot" | "deep" | "bundle" | "comparison" | "all_access" }) {
    const sessionId = `cs_test_${randomUUID()}`;
    await db().insert(t.purchases).values({ status: "pending", stripeSessionId: sessionId, amountCents: 99, currency: "usd", ...values });
    return sessionId;
  }

  beforeAll(async () => {
    await db().execute(sql`drop schema if exists public cascade; create schema public; drop schema if exists drizzle cascade;`);
    await migrate(db(), { migrationsFolder: "drizzle" });
  });
  beforeEach(async () => {
    await db().execute(sql`truncate reviews, purchases, comparisons, attempts, guest_sessions, subscriptions, emails, funnel_daily, rate_limits restart identity cascade`);
  });

  it("marks a checkout paid once and sends exactly one receipt", async () => {
    const g = await guest();
    const a = await attempt(g);
    const session = await purchase({ product: "snapshot", attemptId: a.id, guestSessionId: g, quizSlug: a.quizSlug });
    const first = await markPaid({ stripeSessionId: session, email: "Buyer@Example.com", paymentIntentId: "pi_1", amountCents: 99, currency: "usd" });
    const second = await markPaid({ stripeSessionId: session, email: "buyer@example.com" });
    expect(first?.status).toBe("paid");
    expect(first?.email).toBe("buyer@example.com");
    expect(second).toBeNull();
    const receipts = await db().select().from(t.emails).where(eq(t.emails.kind, "receipt"));
    expect(receipts).toHaveLength(1);
    expect(receipts[0].html).toContain("not a subscription");
    expect(await accessLevel(a)).toBe("snapshot");
  });

  it("a bundle unlocks Deep Reports for its quizzes, for the same browser only", async () => {
    const g = await guest();
    const other = await guest();
    const mine = await attempt(g, "love-language-quiz");
    const notInBundle = await attempt(g, "enneagram-test");
    const theirs = await attempt(other, "love-language-quiz");
    const session = await purchase({
      product: "bundle",
      bundleKey: "relationship",
      guestSessionId: g,
      variants: { bundleQuizzes: "attachment-style-quiz,love-language-quiz,couples-compatibility-test", bundleName: "Relationship Bundle" },
    });
    await markPaid({ stripeSessionId: session, paymentIntentId: "pi_b" });
    expect(await accessLevel(mine)).toBe("deep");
    expect(await accessLevel(notInBundle)).toBe("free");
    expect(await accessLevel(theirs)).toBe("free");
  });

  it("All-Access unlocks the owner's attempts while active", async () => {
    const g = await guest();
    const a = await attempt(g);
    await db().update(t.attempts).set({ userId: "user_1" }).where(eq(t.attempts.id, a.id));
    await db().insert(t.subscriptions).values({ userId: "user_1", stripeSubscriptionId: "sub_1", stripeCustomerId: "cus_1", status: "active" });
    expect(await accessLevel({ ...a, userId: "user_1" })).toBe("deep");
    await db().update(t.subscriptions).set({ status: "canceled" });
    expect(await accessLevel({ ...a, userId: "user_1" })).toBe("free");
  });

  it("refunds one-time purchases within 30 days, once, and relocks", async () => {
    const g = await guest();
    const a = await attempt(g);
    const session = await purchase({ product: "deep", attemptId: a.id, guestSessionId: g });
    const p = (await markPaid({ stripeSessionId: session, paymentIntentId: "pi_r", email: "r@example.com" }))!;
    expect(await refundPurchase(p)).toEqual({ ok: true });
    expect(await accessLevel(a)).toBe("free");
    const [after] = await db().select().from(t.purchases).where(eq(t.purchases.id, p.id));
    expect(after.status).toBe("refunded");
    expect((await refundPurchase(after)).ok).toBe(false);

    const old = { ...p, status: "paid" as const, paidAt: new Date(Date.now() - 31 * 86_400_000) };
    expect(await refundPurchase(old)).toMatchObject({ ok: false });
    expect(await refundPurchase({ ...p, product: "all_access", status: "paid" })).toMatchObject({ ok: false });
  });

  it("claims guest attempts and purchases by browser and by verified email", async () => {
    const g = await guest();
    const fromBrowser = await attempt(g);
    const elsewhere = await attempt(await guest(), "iq-test", "me@example.com");
    await claimForUser("user_9", ["me@example.com"], g);
    const rows = await db().select().from(t.attempts);
    expect(rows.find((r) => r.id === fromBrowser.id)?.userId).toBe("user_9");
    expect(rows.find((r) => r.id === elsewhere.id)?.userId).toBe("user_9");
  });
});
