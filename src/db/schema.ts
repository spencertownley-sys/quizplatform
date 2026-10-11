import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Quiz definitions live in code (src/content) with admin edits stored in
 * quiz_overrides. These tables hold everything user-generated.
 * User ids are Clerk user ids (strings); there is no local users table.
 */

export const productEnum = pgEnum("product", ["snapshot", "deep", "all_access", "bundle", "comparison"]);
export const purchaseStatusEnum = pgEnum("purchase_status", ["pending", "paid", "refunded", "disputed", "expired"]);

const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

export const guestSessions = pgTable("guest_sessions", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  userId: text("user_id"),
  /** Self-declared at the age gate (neutral year picker). */
  birthYear: smallint("birth_year"),
  /** Set when someone declared an age under 13; the gate stays closed for this browser. */
  underage: boolean("underage").notNull().default(false),
  createdAt: createdAt(),
});

export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quizSlug: text("quiz_slug").notNull(),
    guestSessionId: uuid("guest_session_id").references(() => guestSessions.id),
    userId: text("user_id"),
    /** Optional "email me a copy" address; used to claim the attempt on sign-up and for magic links. */
    email: text("email"),
    /** Opted in to follow-up emails (win-back, retake reminders). Unchecked by default. */
    marketingConsent: boolean("marketing_consent").notNull().default(false),
    /** Unguessable token; anyone holding the result link can view it (magic-link access, P-04). */
    accessToken: text("access_token").notNull(),
    /** Public share code for the share page and card: shows only the headline result. */
    shareCode: text("share_code").notNull(),
    answers: jsonb("answers").notNull(),
    outcomeKey: text("outcome_key").notNull(),
    scores: jsonb("scores").notNull(),
    /** Age band at the time ("13-17", "18-24", …) for age-group norms. */
    ageBand: text("age_band"),
    /** Experiment variants this taker saw, e.g. { paywall: "full" }. */
    variants: jsonb("variants").$type<Record<string, string>>(),
    /** Win-back email stage sent: 0 none, 1 sample section, 2 discount. */
    winbackStage: smallint("winback_stage").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("attempts_user_idx").on(t.userId),
    index("attempts_guest_idx").on(t.guestSessionId),
    index("attempts_email_idx").on(t.email),
    index("attempts_quiz_idx").on(t.quizSlug, t.completedAt),
    uniqueIndex("attempts_token_idx").on(t.accessToken),
    uniqueIndex("attempts_share_idx").on(t.shareCode),
  ],
);

export const comparisons = pgTable(
  "comparisons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    quizSlug: text("quiz_slug").notNull(),
    attemptA: uuid("attempt_a")
      .notNull()
      .references(() => attempts.id),
    attemptB: uuid("attempt_b").references(() => attempts.id),
    /** In the invite link; lets the second person join. */
    inviteToken: text("invite_token").notNull(),
    /** In the comparison link; lets either person view it. */
    accessToken: text("access_token").notNull(),
    createdAt: createdAt(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("comparisons_invite_idx").on(t.inviteToken),
    uniqueIndex("comparisons_access_idx").on(t.accessToken),
    index("comparisons_a_idx").on(t.attemptA),
    index("comparisons_b_idx").on(t.attemptB),
  ],
);

export const purchases = pgTable(
  "purchases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    product: productEnum("product").notNull(),
    /** Snapshot/Deep: the attempt it unlocks. Null for All-Access, bundles and comparisons. */
    attemptId: uuid("attempt_id").references(() => attempts.id),
    /** Comparison reports: the comparison it unlocks (for both people). */
    comparisonId: uuid("comparison_id").references(() => comparisons.id),
    /** Bundles: which bundle (see src/lib/products.ts). */
    bundleKey: text("bundle_key"),
    quizSlug: text("quiz_slug"),
    guestSessionId: uuid("guest_session_id").references(() => guestSessions.id),
    userId: text("user_id"),
    email: text("email"),
    amountCents: integer("amount_cents"),
    currency: text("currency"),
    status: purchaseStatusEnum("status").notNull().default("pending"),
    stripeSessionId: text("stripe_session_id").notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripeCustomerId: text("stripe_customer_id"),
    /** Price variant and other experiment context at checkout. */
    variants: jsonb("variants").$type<Record<string, string>>(),
    createdAt: createdAt(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
    receiptSentAt: timestamp("receipt_sent_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("purchases_session_idx").on(t.stripeSessionId),
    index("purchases_attempt_idx").on(t.attemptId),
    index("purchases_comparison_idx").on(t.comparisonId),
    index("purchases_email_idx").on(t.email),
    index("purchases_user_idx").on(t.userId),
    index("purchases_guest_idx").on(t.guestSessionId),
    index("purchases_pi_idx").on(t.stripePaymentIntentId),
    index("purchases_paid_idx").on(t.status, t.paidAt),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    email: text("email"),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    /** Mirrors Stripe's status: active, trialing, past_due, canceled, … */
    status: text("status").notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: integer("cancel_at_period_end").notNull().default(0),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("subscriptions_stripe_idx").on(t.stripeSubscriptionId), index("subscriptions_user_idx").on(t.userId)],
);

/** Admin CMS edits. A row replaces the code definition (or adds a new quiz) without a deploy. */
export const quizOverrides = pgTable("quiz_overrides", {
  slug: text("slug").primaryKey(),
  /** Full QuizDefinition JSON, or null to keep the code definition and only change status. */
  definition: jsonb("definition"),
  status: text("status"),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Every email we send (or log in development). */
export const emails = pgTable(
  "emails",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    to: text("to").notNull(),
    kind: text("kind").notNull(),
    subject: text("subject").notNull(),
    html: text("html").notNull(),
    status: text("status").notNull(),
    providerId: text("provider_id"),
    error: text("error"),
    createdAt: createdAt(),
  },
  (t) => [index("emails_to_idx").on(t.to, t.createdAt)],
);

/** Addresses that asked for no follow-up emails. Receipts and requested links still send. */
export const unsubscribes = pgTable("unsubscribes", {
  email: text("email").primaryKey(),
  createdAt: createdAt(),
});

/** Daily funnel counters for the admin metrics page (GA4/PostHog get the full event stream). */
export const funnelDaily = pgTable(
  "funnel_daily",
  {
    day: date("day").notNull(),
    quizSlug: text("quiz_slug").notNull(),
    event: text("event").notNull(),
    variant: text("variant").notNull().default(""),
    count: integer("count").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.day, t.quizSlug, t.event, t.variant] })],
);

/** Buyer reviews. Only approved ones are shown, only from real purchases. */
export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseId: uuid("purchase_id")
      .notNull()
      .references(() => purchases.id),
    quizSlug: text("quiz_slug").notNull(),
    rating: smallint("rating").notNull(),
    body: text("body").notNull(),
    displayName: text("display_name").notNull(),
    status: text("status").notNull().default("pending"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("reviews_purchase_idx").on(t.purchaseId), index("reviews_status_idx").on(t.status, t.quizSlug)],
);

/** Fixed-window rate limits (find-my-reports, attempt spam). */
export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
  count: integer("count").notNull(),
});

export type Attempt = typeof attempts.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type Comparison = typeof comparisons.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
