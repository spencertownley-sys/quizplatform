import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db, t } from "@/db";
import { requireEnv } from "@/lib/env";
import { stripe } from "@/lib/stripe";

const idOf = (v: string | { id: string } | null | undefined) => (typeof v === "string" ? v : v?.id ?? null);

/** Newer Stripe API versions moved the period end onto subscription items. */
function periodEnd(sub: Stripe.Subscription): Date | null {
  const legacy = (sub as unknown as { current_period_end?: number }).current_period_end;
  const fromItem = sub.items?.data?.[0]?.current_period_end;
  const ts = fromItem ?? legacy;
  return ts ? new Date(ts * 1000) : null;
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const userId = sub.metadata?.userId;
  if (!userId) {
    console.warn(`subscription ${sub.id} has no userId metadata; skipping`);
    return;
  }
  const values = {
    userId,
    stripeSubscriptionId: sub.id,
    stripeCustomerId: idOf(sub.customer)!,
    status: sub.status,
    currentPeriodEnd: periodEnd(sub),
    cancelAtPeriodEnd: sub.cancel_at_period_end ? 1 : 0,
    updatedAt: new Date(),
  };
  await db()
    .insert(t.subscriptions)
    .values(values)
    .onConflictDoUpdate({ target: t.subscriptions.stripeSubscriptionId, set: values });
}

async function markCheckoutPaid(session: Stripe.Checkout.Session) {
  await db()
    .update(t.purchases)
    .set({
      status: "paid",
      paidAt: new Date(),
      email: session.customer_details?.email?.toLowerCase() ?? undefined,
      stripeCustomerId: idOf(session.customer),
      stripePaymentIntentId: idOf(session.payment_intent),
      amountCents: session.amount_total ?? undefined,
      currency: session.currency ?? undefined,
    })
    .where(eq(t.purchases.stripeSessionId, session.id));

  if (session.mode === "subscription" && session.subscription) {
    await upsertSubscription(await stripe().subscriptions.retrieve(idOf(session.subscription)!));
  }
  // TODO(email): send receipt with the result link (and cancel link for subscriptions).
  // TODO(analytics): send `purchase` to GA4 Measurement Protocol and PostHog server-side.
}

async function setStatusByPaymentIntent(pi: string | null, status: "refunded" | "disputed") {
  if (!pi) return;
  await db()
    .update(t.purchases)
    .set({ status, ...(status === "refunded" ? { refundedAt: new Date() } : {}) })
    .where(eq(t.purchases.stripePaymentIntentId, pi));
}

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), signature, requireEnv("STRIPE_WEBHOOK_SECRET"));
  } catch (err) {
    console.error("Stripe webhook signature check failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Handlers are idempotent: Stripe retries, and events can arrive out of order.
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object;
      if (s.payment_status === "paid" || s.payment_status === "no_payment_required") await markCheckoutPaid(s);
      break;
    }
    case "checkout.session.expired":
      await db().update(t.purchases).set({ status: "expired" }).where(eq(t.purchases.stripeSessionId, event.data.object.id));
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await upsertSubscription(event.data.object);
      break;
    case "charge.refunded": {
      const charge = event.data.object;
      if (charge.refunded) await setStatusByPaymentIntent(idOf(charge.payment_intent), "refunded");
      break;
    }
    case "charge.dispute.created":
      await setStatusByPaymentIntent(idOf(event.data.object.payment_intent), "disputed");
      break;
  }
  return new Response("ok");
}
