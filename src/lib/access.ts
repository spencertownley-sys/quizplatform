import "server-only";
import { timingSafeEqual } from "node:crypto";
import { and, eq, inArray, isNull, or, sql } from "drizzle-orm";
import { db, t } from "@/db";
import type { Attempt, Comparison } from "@/db/schema";
import { type AccessLevel, atLeast } from "./products";
import type { Viewer } from "./viewer";

const safeEqual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export const ACTIVE_SUB = ["active", "trialing", "past_due"];

/** Owner (same guest cookie or same signed-in user) or anyone holding the result link token. */
export function canViewAttempt(attempt: Attempt, viewer: Viewer, token?: string | null): boolean {
  return isOwner(attempt, viewer) || (!!token && safeEqual(token, attempt.accessToken));
}

export function isOwner(attempt: Attempt, viewer: Viewer): boolean {
  if (viewer.userId && attempt.userId === viewer.userId) return true;
  return !!viewer.guestId && attempt.guestSessionId === viewer.guestId;
}

export async function hasActiveSubscription(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const rows = await db()
    .select({ id: t.subscriptions.id })
    .from(t.subscriptions)
    .where(and(eq(t.subscriptions.userId, userId), inArray(t.subscriptions.status, ACTIVE_SUB)))
    .limit(1);
  return rows.length > 0;
}

/**
 * Highest report level unlocked for an attempt:
 * - its owner has All-Access, or
 * - a paid Snapshot/Deep purchase for this attempt, or
 * - a paid bundle covering this quiz, bought by the same account or browser.
 * Matching is never by unverified email.
 */
export async function accessLevel(attempt: Attempt): Promise<AccessLevel> {
  if (await hasActiveSubscription(attempt.userId)) return "deep";

  const buyer = [
    attempt.userId ? eq(t.purchases.userId, attempt.userId) : undefined,
    attempt.guestSessionId ? eq(t.purchases.guestSessionId, attempt.guestSessionId) : undefined,
  ].filter((c) => c !== undefined);

  const rows = await db()
    .select({ product: t.purchases.product, variants: t.purchases.variants })
    .from(t.purchases)
    .where(
      and(
        eq(t.purchases.status, "paid"),
        or(
          eq(t.purchases.attemptId, attempt.id),
          buyer.length ? and(eq(t.purchases.product, "bundle"), or(...buyer)) : sql`false`,
        ),
      ),
    );

  let level: AccessLevel = "free";
  for (const p of rows) {
    let l: AccessLevel = "free";
    if (p.product === "deep") l = "deep";
    else if (p.product === "snapshot") l = "snapshot";
    else if (p.product === "bundle" && (p.variants?.bundleQuizzes ?? "").split(",").includes(attempt.quizSlug)) l = "deep";
    if (atLeast(l, level)) level = l;
  }
  return level;
}

/** Either person in a comparison, or anyone with its link. */
export function canViewComparison(c: Comparison, token: string | null | undefined, owned: { a: boolean; b: boolean }) {
  return owned.a || owned.b || (!!token && safeEqual(token, c.accessToken));
}

/** The full comparison report is unlocked by a comparison purchase or either person's All-Access. */
export async function comparisonUnlocked(c: Comparison, a: Attempt, b: Attempt | null): Promise<boolean> {
  if ((await hasActiveSubscription(a.userId)) || (b && (await hasActiveSubscription(b.userId)))) return true;
  const rows = await db()
    .select({ id: t.purchases.id })
    .from(t.purchases)
    .where(and(eq(t.purchases.comparisonId, c.id), eq(t.purchases.status, "paid")))
    .limit(1);
  return rows.length > 0;
}

/**
 * Attach guest data to an account: everything made in this browser, plus
 * everything bought or saved with one of the account's VERIFIED emails (P-05).
 */
export async function claimForUser(userId: string, verifiedEmails: string[], guestId: string | null) {
  const d = db();
  if (guestId) {
    await d.update(t.guestSessions).set({ userId }).where(and(eq(t.guestSessions.id, guestId), isNull(t.guestSessions.userId)));
    await d.update(t.attempts).set({ userId }).where(and(eq(t.attempts.guestSessionId, guestId), isNull(t.attempts.userId)));
    await d.update(t.purchases).set({ userId }).where(and(eq(t.purchases.guestSessionId, guestId), isNull(t.purchases.userId)));
  }
  if (verifiedEmails.length) {
    await d.update(t.attempts).set({ userId }).where(and(isNull(t.attempts.userId), inArray(t.attempts.email, verifiedEmails)));
    await d.update(t.purchases).set({ userId }).where(and(isNull(t.purchases.userId), inArray(t.purchases.email, verifiedEmails)));
    await d
      .update(t.guestSessions)
      .set({ userId })
      .where(and(isNull(t.guestSessions.userId), inArray(t.guestSessions.email, verifiedEmails)));
  }
}
