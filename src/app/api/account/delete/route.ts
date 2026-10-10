import { clerkClient } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { DEV_USER_COOKIE, currentUser } from "@/lib/auth";
import { activeSubscription } from "@/lib/billing";
import { deleteAttempts } from "@/lib/deletion";
import { clerkEnabled } from "@/lib/env";

/**
 * Delete my account and data. Results, comparisons, reviews and saved emails are
 * deleted; purchase records stay for accounting but lose every personal link.
 * An active All-Access plan must be cancelled first so no one is billed for a deleted account.
 */
export async function POST() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  if (await activeSubscription(user.id)) {
    return NextResponse.json({ error: "Cancel All-Access first (Billing → Cancel plan), then delete your account." }, { status: 400 });
  }

  const mine = await db().select({ id: t.attempts.id }).from(t.attempts).where(eq(t.attempts.userId, user.id));
  await deleteAttempts(mine.map((a) => a.id));

  const purchases = await db().select({ id: t.purchases.id }).from(t.purchases).where(eq(t.purchases.userId, user.id));
  if (purchases.length) await db().delete(t.reviews).where(inArray(t.reviews.purchaseId, purchases.map((p) => p.id)));
  await db().update(t.purchases).set({ userId: null, email: null, guestSessionId: null }).where(eq(t.purchases.userId, user.id));
  await db().update(t.guestSessions).set({ email: null, userId: null }).where(eq(t.guestSessions.userId, user.id));
  if (user.emails.length) await db().delete(t.emails).where(inArray(t.emails.to, user.emails));
  await db().delete(t.subscriptions).where(eq(t.subscriptions.userId, user.id));

  if (clerkEnabled()) {
    await (await clerkClient()).users.deleteUser(user.id);
  } else {
    (await cookies()).delete(DEV_USER_COOKIE);
  }
  return NextResponse.json({ ok: true });
}
