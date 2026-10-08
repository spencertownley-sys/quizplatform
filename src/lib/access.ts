import { timingSafeEqual } from "node:crypto";
import { and, eq, inArray } from "drizzle-orm";
import { db, t } from "@/db";
import type { Attempt } from "@/db/schema";
import { type AccessLevel, atLeast } from "./products";
import type { Viewer } from "./viewer";

const safeEqual = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

/** Owner (same guest cookie or same signed-in user) or anyone holding the result link token. */
export function canViewAttempt(attempt: Attempt, viewer: Viewer, token?: string | null): boolean {
  if (viewer.userId && attempt.userId === viewer.userId) return true;
  if (viewer.guestId && attempt.guestSessionId === viewer.guestId) return true;
  return !!token && safeEqual(token, attempt.accessToken);
}

export async function hasActiveSubscription(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const rows = await db()
    .select({ id: t.subscriptions.id })
    .from(t.subscriptions)
    .where(and(eq(t.subscriptions.userId, userId), inArray(t.subscriptions.status, ["active", "trialing"])))
    .limit(1);
  return rows.length > 0;
}

/** Highest report level unlocked for this attempt. One-time purchases attach to the attempt itself. */
export async function accessLevel(attempt: Attempt, viewer: Viewer): Promise<AccessLevel> {
  if (await hasActiveSubscription(viewer.userId)) return "deep";
  const paid = await db()
    .select({ product: t.purchases.product })
    .from(t.purchases)
    .where(and(eq(t.purchases.attemptId, attempt.id), eq(t.purchases.status, "paid")));
  let level: AccessLevel = "free";
  for (const p of paid) {
    const l: AccessLevel = p.product === "deep" ? "deep" : p.product === "snapshot" ? "snapshot" : "free";
    if (atLeast(l, level)) level = l;
  }
  return level;
}
