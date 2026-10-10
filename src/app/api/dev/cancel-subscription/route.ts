import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { ACTIVE_SUB } from "@/lib/access";
import { currentUserId } from "@/lib/auth";
import { appUrl, fakePayments } from "@/lib/env";

/** Development stand-in for the Stripe portal's cancel button (fake payments only). */
export async function POST() {
  const userId = await currentUserId();
  if (!fakePayments() || !userId) return new Response("Not found", { status: 404 });
  await db()
    .update(t.subscriptions)
    .set({ cancelAtPeriodEnd: 1, updatedAt: new Date() })
    .where(and(eq(t.subscriptions.userId, userId), inArray(t.subscriptions.status, ACTIVE_SUB)));
  return NextResponse.redirect(`${appUrl()}/dashboard?canceled=1`, 303);
}
