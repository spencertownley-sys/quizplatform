import { index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

/**
 * Quiz definitions live in code (src/content) for now; the admin CMS (P-14)
 * will move them here later. These tables hold everything user-generated.
 * User ids are Clerk user ids (strings); there is no local users table.
 */

export const productEnum = pgEnum("product", ["snapshot", "deep", "all_access"]);
export const purchaseStatusEnum = pgEnum("purchase_status", ["pending", "paid", "refunded", "disputed", "expired"]);

export const guestSessions = pgTable("guest_sessions", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  userId: text("user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quizSlug: text("quiz_slug").notNull(),
    guestSessionId: uuid("guest_session_id").references(() => guestSessions.id),
    userId: text("user_id"),
    /** Optional "email me a copy" address; used to claim the attempt on sign-up. */
    email: text("email"),
    /** Unguessable token; anyone holding the result link can view it (magic-link access, P-04). */
    accessToken: text("access_token").notNull(),
    answers: jsonb("answers").notNull(),
    outcomeKey: text("outcome_key").notNull(),
    scores: jsonb("scores").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("attempts_user_idx").on(t.userId),
    index("attempts_guest_idx").on(t.guestSessionId),
    index("attempts_email_idx").on(t.email),
    uniqueIndex("attempts_token_idx").on(t.accessToken),
  ],
);

export const purchases = pgTable(
  "purchases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    product: productEnum("product").notNull(),
    /** Null for All-Access, which isn't tied to one attempt. */
    attemptId: uuid("attempt_id").references(() => attempts.id),
    guestSessionId: uuid("guest_session_id").references(() => guestSessions.id),
    userId: text("user_id"),
    email: text("email"),
    amountCents: integer("amount_cents"),
    currency: text("currency"),
    status: purchaseStatusEnum("status").notNull().default("pending"),
    stripeSessionId: text("stripe_session_id").notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripeCustomerId: text("stripe_customer_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("purchases_session_idx").on(t.stripeSessionId),
    index("purchases_attempt_idx").on(t.attemptId),
    index("purchases_email_idx").on(t.email),
    index("purchases_pi_idx").on(t.stripePaymentIntentId),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    /** Mirrors Stripe's status: active, trialing, past_due, canceled, … */
    status: text("status").notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: integer("cancel_at_period_end").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("subscriptions_stripe_idx").on(t.stripeSubscriptionId), index("subscriptions_user_idx").on(t.userId)],
);

export type Attempt = typeof attempts.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
