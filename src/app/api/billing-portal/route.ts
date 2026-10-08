import { desc, eq, isNotNull, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { appUrl } from "@/lib/env";
import { stripe } from "@/lib/stripe";

/** Stripe Customer Portal: receipts, payment method, two-click cancel (P-08). */
export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(`${appUrl()}/sign-in`, 303);

  const [sub] = await db()
    .select({ customer: t.subscriptions.stripeCustomerId })
    .from(t.subscriptions)
    .where(eq(t.subscriptions.userId, userId))
    .orderBy(desc(t.subscriptions.updatedAt))
    .limit(1);
  const [purchase] = sub
    ? []
    : await db()
        .select({ customer: t.purchases.stripeCustomerId })
        .from(t.purchases)
        .where(and(eq(t.purchases.userId, userId), isNotNull(t.purchases.stripeCustomerId)))
        .orderBy(desc(t.purchases.createdAt))
        .limit(1);

  const customer = sub?.customer ?? purchase?.customer;
  if (!customer) return NextResponse.redirect(`${appUrl()}/dashboard?billing=none`, 303);

  const portal = await stripe().billingPortal.sessions.create({ customer, return_url: `${appUrl()}/dashboard` });
  return NextResponse.redirect(portal.url, 303);
}
