import "server-only";
import { and, desc, eq, inArray, isNotNull } from "drizzle-orm";
import { db, t } from "@/db";
import { ACTIVE_SUB } from "./access";
import { appUrl, fakePayments } from "./env";
import { stripe } from "./stripe";

/** URL of a Stripe Customer Portal session for this user (or the dev stand-in without Stripe). */
export async function portalSession(userId: string, intent: "manage" | "cancel"): Promise<string> {
  const [sub] = await db()
    .select()
    .from(t.subscriptions)
    .where(eq(t.subscriptions.userId, userId))
    .orderBy(desc(t.subscriptions.updatedAt))
    .limit(1);

  if (fakePayments()) return `${appUrl()}/dev/portal?intent=${intent}`;

  let customer: string | undefined = sub?.stripeCustomerId;
  if (!customer) {
    const [p] = await db()
      .select({ c: t.purchases.stripeCustomerId })
      .from(t.purchases)
      .where(and(eq(t.purchases.userId, userId), isNotNull(t.purchases.stripeCustomerId)))
      .orderBy(desc(t.purchases.createdAt))
      .limit(1);
    customer = p?.c ?? undefined;
  }
  if (!customer) return `${appUrl()}/dashboard?billing=none`;

  const returnUrl = `${appUrl()}/dashboard`;
  const canCancel = intent === "cancel" && sub && ACTIVE_SUB.includes(sub.status) && !sub.cancelAtPeriodEnd;
  const session = await stripe().billingPortal.sessions.create({
    customer,
    return_url: returnUrl,
    ...(process.env.STRIPE_PORTAL_CONFIGURATION ? { configuration: process.env.STRIPE_PORTAL_CONFIGURATION } : {}),
    ...(canCancel
      ? {
          flow_data: {
            type: "subscription_cancel" as const,
            subscription_cancel: { subscription: sub.stripeSubscriptionId },
            after_completion: { type: "redirect" as const, redirect: { return_url: `${returnUrl}?canceled=1` } },
          },
        }
      : {}),
  });
  return session.url;
}

export async function activeSubscription(userId: string) {
  const [sub] = await db()
    .select()
    .from(t.subscriptions)
    .where(and(eq(t.subscriptions.userId, userId), inArray(t.subscriptions.status, ACTIVE_SUB)))
    .orderBy(desc(t.subscriptions.updatedAt))
    .limit(1);
  return sub ?? null;
}
