import { and, eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db, t } from "@/db";
import { requireEnv } from "@/lib/env";
import { markPaid, markRefunded, upsertSubscription } from "@/lib/fulfill";
import { idOf, stripe } from "@/lib/stripe";

/**
 * Stripe webhooks. Handlers are idempotent: Stripe retries, and events can
 * arrive out of order. Subscribe the endpoint to: checkout.session.completed,
 * checkout.session.async_payment_succeeded, checkout.session.expired,
 * customer.subscription.created/updated/deleted, charge.refunded, charge.dispute.created.
 */
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

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object;
      if (s.payment_status !== "paid" && s.payment_status !== "no_payment_required") break;
      // Subscription first, so the receipt can show the renewal date.
      if (s.mode === "subscription" && s.subscription) {
        await upsertSubscription(await stripe().subscriptions.retrieve(idOf(s.subscription)!));
        const email = s.customer_details?.email?.toLowerCase();
        if (email) await db().update(t.subscriptions).set({ email }).where(eq(t.subscriptions.stripeSubscriptionId, idOf(s.subscription)!));
      }
      await markPaid({
        stripeSessionId: s.id,
        email: s.customer_details?.email,
        customerId: idOf(s.customer),
        paymentIntentId: idOf(s.payment_intent),
        amountCents: s.amount_total,
        currency: s.currency,
      });
      break;
    }
    case "checkout.session.expired":
      await db()
        .update(t.purchases)
        .set({ status: "expired" })
        .where(and(eq(t.purchases.stripeSessionId, event.data.object.id), eq(t.purchases.status, "pending")));
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await upsertSubscription(event.data.object);
      break;
    case "charge.refunded": {
      const charge = event.data.object;
      const pi = idOf(charge.payment_intent);
      if (!charge.refunded || !pi) break;
      const [p] = await db().select({ id: t.purchases.id }).from(t.purchases).where(eq(t.purchases.stripePaymentIntentId, pi)).limit(1);
      if (p) await markRefunded(p.id);
      break;
    }
    case "charge.dispute.created": {
      const pi = idOf(event.data.object.payment_intent);
      if (pi) await db().update(t.purchases).set({ status: "disputed" }).where(eq(t.purchases.stripePaymentIntentId, pi));
      break;
    }
  }
  return new Response("ok");
}
