import { randomUUID } from "node:crypto";
import { and, desc, eq, inArray, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { db, t } from "@/db";
import type { Attempt } from "@/db/schema";
import { accessLevel, canViewAttempt, canViewComparison, comparisonUnlocked, hasActiveSubscription, isOwner } from "@/lib/access";
import { viewerAge } from "@/lib/age-server";
import { countEvent } from "@/lib/analytics-server";
import { currentUser, signInPath } from "@/lib/auth";
import { appUrl, fakePayments } from "@/lib/env";
import { variantLabel, variantsFor } from "@/lib/experiments";
import { markPaid, upsertSubscription } from "@/lib/fulfill";
import { PRODUCTS, type ProductKey, SNAPSHOT_TEST, atLeast, sellableBundles } from "@/lib/products";
import { getQuiz, listQuizzes, onSale, reportMinAge } from "@/lib/quizzes";
import { requireEnv } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { ensureGuest } from "@/lib/viewer";

const Body = z.object({
  product: z.enum(["snapshot", "deep", "all_access", "bundle", "comparison"]),
  attemptId: z.uuid().optional(),
  token: z.string().max(100).optional(),
  comparisonId: z.uuid().optional(),
  bundleKey: z.string().max(50).optional(),
  /** Visitor accepted analytics cookies; server-side purchase events respect it. */
  analytics: z.boolean().optional(),
  /** Pricing page: the unchecked "I understand this renews monthly" box. */
  renewalConsent: z.boolean().optional(),
  /** Where to come back to (same-site path only). */
  returnTo: z.string().max(300).optional(),
});

const fail = (error: string, status = 400, extra: object = {}) => NextResponse.json({ error, ...extra }, { status });
const safePath = (p: string | undefined) => (p && p.startsWith("/") && !p.startsWith("//") ? p : undefined);

/**
 * Start a checkout. One-time reports are guest-friendly; All-Access needs an
 * account so the dashboard and two-click cancellation work. A one-time purchase
 * never creates a subscription: different product, different button, different mode.
 */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail("Invalid request");
  const body = parsed.data;
  const product: ProductKey = body.product;
  const viewer = await ensureGuest();
  const def = PRODUCTS[product];

  const metadata: Record<string, string> = { product, guestSessionId: viewer.guestId };
  if (viewer.userId) metadata.userId = viewer.userId;
  const variants: Record<string, string> = {};
  if (body.analytics) variants.analytics = "1";

  let returnPath = safePath(body.returnTo) ?? "/dashboard";
  let customerEmail: string | undefined;
  let quizSlug: string | null = null;
  let attempt: Attempt | undefined;
  let comparisonId: string | null = null;
  let bundleKey: string | null = null;
  let priceId: string | undefined;
  let cents = def.cents;
  let lineName = def.name;

  const age = await viewerAge(viewer.guestId);

  if (product === "all_access") {
    const user = await currentUser();
    if (!user) return fail("sign_in_required", 401, { signInUrl: signInPath("/pricing") });
    if (!body.renewalConsent) return fail("Please tick the box to confirm you understand All-Access renews monthly.");
    if (await hasActiveSubscription(user.id)) return fail("You already have All-Access. Manage it from your dashboard.");
    customerEmail = user.primaryEmail ?? undefined;
    returnPath = "/dashboard?welcome=1";
  } else if (product === "snapshot" || product === "deep") {
    if (!body.attemptId) return fail("attemptId is required");
    [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, body.attemptId)).limit(1);
    if (!attempt || !canViewAttempt(attempt, viewer, body.token)) return fail("Not found", 404);
    const quiz = await getQuiz(attempt.quizSlug);
    if (!quiz || !onSale(quiz)) return fail("Reports for this quiz aren't on sale yet.");
    if (age.age === null || age.age < reportMinAge(quiz)) return fail(`Reports for this quiz are for ages ${reportMinAge(quiz)} and over.`, 403);
    const have = await accessLevel(attempt);
    if (atLeast(have, product)) return fail("You already have this report.");
    quizSlug = quiz.slug;
    metadata.attemptId = attempt.id;
    returnPath = `/result/${attempt.id}?k=${encodeURIComponent(attempt.accessToken)}`;
    customerEmail = attempt.email ?? undefined;
    lineName = `${quiz.title}: ${def.name}`;
    Object.assign(variants, variantsFor(viewer.guestId, quiz));
    // Snapshot buyers upgrade to the Deep Report for the difference, not the full price.
    if (product === "deep" && have === "snapshot") {
      cents = PRODUCTS.deep.cents - PRODUCTS.snapshot.cents;
      lineName = `${quiz.title}: Deep Report upgrade`;
    }
    if (product === "snapshot" && variants.snapshot_price === "199") {
      cents = SNAPSHOT_TEST.cents;
      priceId = process.env[SNAPSHOT_TEST.priceEnv];
    }
  } else if (product === "comparison") {
    if (!body.comparisonId) return fail("comparisonId is required");
    const [c] = await db().select().from(t.comparisons).where(eq(t.comparisons.id, body.comparisonId)).limit(1);
    if (!c || !c.attemptB) return fail("Not found", 404);
    const pair = await db().select().from(t.attempts).where(inArray(t.attempts.id, [c.attemptA, c.attemptB]));
    const a = pair.find((p) => p.id === c.attemptA)!;
    const b = pair.find((p) => p.id === c.attemptB) ?? null;
    if (!canViewComparison(c, body.token, { a: isOwner(a, viewer), b: !!b && isOwner(b, viewer) })) return fail("Not found", 404);
    const quiz = await getQuiz(c.quizSlug);
    if (!quiz || !onSale(quiz)) return fail("Comparison reports for this quiz aren't on sale yet.");
    if (age.age === null || age.age < reportMinAge(quiz)) return fail(`Reports for this quiz are for ages ${reportMinAge(quiz)} and over.`, 403);
    if (await comparisonUnlocked(c, a, b)) return fail("This comparison is already unlocked.");
    quizSlug = quiz.slug;
    comparisonId = c.id;
    metadata.comparisonId = c.id;
    returnPath = `/compare/${c.id}?k=${encodeURIComponent(c.accessToken)}`;
    customerEmail = (isOwner(a, viewer) ? a.email : b?.email) ?? undefined;
    lineName = `${quiz.title}: comparison report`;
  } else {
    const live = new Set((await listQuizzes()).filter(onSale).map((q) => q.slug));
    const bundle = sellableBundles(live).find((b) => b.key === body.bundleKey);
    if (!bundle) return fail("That bundle isn't available.");
    const quizzes = await Promise.all(bundle.included.map((s) => getQuiz(s)));
    const minAge = Math.max(...quizzes.map((q) => (q ? reportMinAge(q) : 13)));
    if (age.age === null || age.age < minAge) return fail(`This bundle is for ages ${minAge} and over.`, 403);
    bundleKey = bundle.key;
    variants.bundleQuizzes = bundle.included.join(",");
    variants.bundleName = bundle.name;
    metadata.bundleKey = bundle.key;
    lineName = bundle.name;
  }

  if (age.underage) return fail("underage", 403);
  const experiments = variantLabel(Object.fromEntries(Object.entries(variants).filter(([k]) => !["analytics", "bundleQuizzes", "bundleName"].includes(k))));
  if (experiments) variants.experiments = experiments;

  // Reuse the Stripe customer for signed-in buyers so the portal shows every receipt.
  let customer: string | undefined;
  if (viewer.userId) {
    const [prev] = await db()
      .select({ c: t.purchases.stripeCustomerId })
      .from(t.purchases)
      .where(and(eq(t.purchases.userId, viewer.userId), isNotNull(t.purchases.stripeCustomerId)))
      .orderBy(desc(t.purchases.createdAt))
      .limit(1);
    customer = prev?.c ?? undefined;
  }

  const insertPurchase = (stripeSessionId: string) =>
    db().insert(t.purchases).values({
      product,
      attemptId: attempt?.id ?? null,
      comparisonId,
      bundleKey,
      quizSlug,
      guestSessionId: viewer.guestId,
      userId: viewer.userId,
      email: customerEmail?.toLowerCase() ?? null,
      amountCents: cents,
      currency: "usd",
      status: "pending",
      stripeSessionId,
      variants,
    });

  await countEvent("checkout_start", quizSlug ?? "_all", experiments ?? "");
  const sep = returnPath.includes("?") ? "&" : "?";

  // Local development without Stripe: pay instantly, through the same fulfilment path as the webhook.
  if (fakePayments()) {
    const sessionId = `fake_${randomUUID()}`;
    await insertPurchase(sessionId);
    if (product === "all_access") {
      const now = Date.now();
      await upsertSubscription({
        id: `sub_fake_${randomUUID()}`,
        customer: `cus_fake_${viewer.userId}`,
        status: "active",
        cancel_at_period_end: false,
        canceled_at: null,
        metadata: { userId: viewer.userId! },
        items: { data: [{ current_period_end: Math.floor((now + 30 * 86_400_000) / 1000) }] },
      } as unknown as Stripe.Subscription);
    }
    await markPaid({
      stripeSessionId: sessionId,
      email: customerEmail ?? null,
      customerId: `cus_fake_${viewer.guestId}`,
      paymentIntentId: `pi_fake_${randomUUID()}`,
      amountCents: cents,
      currency: "usd",
    });
    return NextResponse.json({ url: `${returnPath}${sep}paid=1` });
  }

  const recurring = def.recurring;
  // Configured Price IDs are preferred; one-time products fall back to an inline price
  // (digital-goods tax code) so a missing Price ID never blocks a sale.
  const configured = priceId ?? (cents === def.cents ? process.env[def.priceEnv] : undefined);
  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = configured
    ? { price: configured, quantity: 1 }
    : recurring
      ? { price: requireEnv(def.priceEnv), quantity: 1 }
      : { price_data: { currency: "usd", unit_amount: cents, product_data: { name: lineName, tax_code: "txcd_10000000" } }, quantity: 1 };

  const params: Stripe.Checkout.SessionCreateParams = {
    line_items: [lineItem],
    ...(customer ? { customer } : customerEmail ? { customer_email: customerEmail } : {}),
    success_url: `${appUrl()}${returnPath}${sep}paid=1`,
    cancel_url: `${appUrl()}${returnPath}`,
    metadata,
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
    ...(process.env.STRIPE_TOS_CONSENT === "true" ? { consent_collection: { terms_of_service: "required" as const } } : {}),
    ...(recurring
      ? {
          mode: "subscription" as const,
          subscription_data: { metadata },
          custom_text: {
            submit: {
              message: `${def.priceLabel}, renews automatically every month until you cancel. Cancel anytime in two clicks from your dashboard or any receipt email.`,
            },
          },
        }
      : {
          mode: "payment" as const,
          ...(customer ? {} : { customer_creation: "always" as const }),
          allow_promotion_codes: true,
          payment_intent_data: { metadata, description: lineName },
          custom_text: { submit: { message: "One-time payment. No subscription. 30-day refund if you're not happy." } },
        }),
  };

  const session = await stripe().checkout.sessions.create(params);
  await insertPurchase(session.id);
  return NextResponse.json({ url: session.url });
}
