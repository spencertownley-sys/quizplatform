import "server-only";
import { and, eq, inArray, isNull } from "drizzle-orm";
import type Stripe from "stripe";
import { db, t } from "@/db";
import type { Purchase } from "@/db/schema";
import { countEvent, serverEvent } from "./analytics-server";
import { receiptEmail, refundEmail } from "./email/templates";
import { sendEmail } from "./email/send";
import { appUrl, fakePayments } from "./env";
import { comparisonUrl, portalUrl, refundUrl, resultUrl } from "./links";
import { PRODUCTS, type ProductKey } from "./products";
import { getQuiz } from "./quizzes";
import { idOf, periodEnd, stripe } from "./stripe";

export const REFUND_DAYS = 30;

/**
 * Marks a checkout paid. Idempotent: Stripe retries webhooks and the dev fake
 * checkout calls this directly; only the first call sends the receipt.
 */
export async function markPaid(args: {
  stripeSessionId: string;
  email?: string | null;
  customerId?: string | null;
  paymentIntentId?: string | null;
  amountCents?: number | null;
  currency?: string | null;
}): Promise<Purchase | null> {
  const [row] = await db()
    .update(t.purchases)
    .set({
      status: "paid",
      paidAt: new Date(),
      ...(args.email ? { email: args.email.toLowerCase() } : {}),
      ...(args.customerId ? { stripeCustomerId: args.customerId } : {}),
      ...(args.paymentIntentId ? { stripePaymentIntentId: args.paymentIntentId } : {}),
      ...(args.amountCents != null ? { amountCents: args.amountCents } : {}),
      ...(args.currency ? { currency: args.currency } : {}),
    })
    .where(and(eq(t.purchases.stripeSessionId, args.stripeSessionId), inArray(t.purchases.status, ["pending", "expired"])))
    .returning();
  if (!row) return null;
  await afterPaid(row);
  return row;
}

async function afterPaid(p: Purchase) {
  const variant = p.variants?.experiments ?? "";
  await countEvent(p.product === "all_access" ? "subscription_started" : "purchase", p.quizSlug ?? "_all", variant);
  await serverEvent(p.product === "all_access" ? "subscription_started" : "purchase", {
    clientId: p.guestSessionId ?? p.id,
    consent: p.variants?.analytics === "1",
    quizSlug: p.quizSlug ?? undefined,
    value: (p.amountCents ?? 0) / 100,
    currency: p.currency ?? "usd",
    tier: p.product,
    variant,
  });
  await sendReceipt(p);
}

export async function sendReceipt(p: Purchase) {
  if (!p.email || p.receiptSentAt) return;
  const claimed = await db()
    .update(t.purchases)
    .set({ receiptSentAt: new Date() })
    .where(and(eq(t.purchases.id, p.id), isNull(t.purchases.receiptSentAt)))
    .returning({ id: t.purchases.id });
  if (!claimed.length) return;

  const def = PRODUCTS[p.product as ProductKey];
  let what = def.blurb;
  let reportUrl: string | undefined;
  let pdfUrl: string | undefined;
  let productName = def.name;

  if ((p.product === "snapshot" || p.product === "deep") && p.attemptId) {
    const [a] = await db().select().from(t.attempts).where(eq(t.attempts.id, p.attemptId)).limit(1);
    const quiz = a ? await getQuiz(a.quizSlug) : undefined;
    if (a && quiz) {
      productName = `${quiz.title} ${def.name}`;
      what = `Your ${def.name} for the ${quiz.title} is unlocked. Your report link works forever, on any device.`;
      reportUrl = resultUrl(a.id, a.accessToken);
      pdfUrl = `${appUrl()}/api/report/${a.id}/pdf?k=${encodeURIComponent(a.accessToken)}`;
    }
  } else if (p.product === "comparison" && p.comparisonId) {
    const [c] = await db().select().from(t.comparisons).where(eq(t.comparisons.id, p.comparisonId)).limit(1);
    if (c) {
      reportUrl = comparisonUrl(c.id, c.accessToken);
      what = "Your comparison report is unlocked for both of you.";
    }
  } else if (p.product === "bundle") {
    const slugs = (p.variants?.bundleQuizzes ?? "").split(",").filter(Boolean);
    const titles = (await Promise.all(slugs.map((s) => getQuiz(s)))).filter(Boolean).map((q) => q!.title);
    productName = p.variants?.bundleName ?? def.name;
    what = `Deep Reports unlocked for: ${titles.join(", ")}. They unlock on results you've already got and on any of these quizzes you take later in the same browser or account.`;
    reportUrl = `${appUrl()}/dashboard`;
  } else if (p.product === "all_access") {
    reportUrl = `${appUrl()}/dashboard`;
  }

  let renewsOn: string | undefined;
  if (p.product === "all_access" && p.userId) {
    const [sub] = await db().select().from(t.subscriptions).where(eq(t.subscriptions.userId, p.userId)).limit(1);
    renewsOn = sub?.currentPeriodEnd?.toLocaleDateString("en-US", { dateStyle: "long" });
  }

  await sendEmail(
    receiptEmail({
      to: p.email,
      product: p.product as ProductKey,
      productName,
      amountCents: p.amountCents ?? def.cents,
      currency: p.currency ?? "usd",
      what,
      reportUrl,
      pdfUrl,
      ...(p.product === "all_access" ? (p.userId ? { portalUrl: portalUrl(p.userId), renewsOn } : {}) : { refundUrl: refundUrl(p.id) }),
    }),
  );
}

export async function upsertSubscription(sub: Stripe.Subscription) {
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
    canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
    updatedAt: new Date(),
  };
  const [before] = await db().select({ status: t.subscriptions.status }).from(t.subscriptions).where(eq(t.subscriptions.stripeSubscriptionId, sub.id)).limit(1);
  await db().insert(t.subscriptions).values(values).onConflictDoUpdate({ target: t.subscriptions.stripeSubscriptionId, set: values });
  if (before && before.status !== "canceled" && sub.status === "canceled") await countEvent("subscription_canceled", "_all");
}

export type RefundResult = { ok: true } | { ok: false; reason: string };

/** Self-serve refund for one-time purchases within 30 days (P-13). */
export async function refundPurchase(p: Purchase): Promise<RefundResult> {
  if (p.product === "all_access") return { ok: false, reason: "Subscriptions are cancelled, not refunded. Manage your plan from your dashboard." };
  if (p.status === "refunded") return { ok: false, reason: "This purchase has already been refunded." };
  if (p.status !== "paid" || !p.paidAt) return { ok: false, reason: "Only completed purchases can be refunded." };
  if (Date.now() - p.paidAt.getTime() > REFUND_DAYS * 86_400_000) {
    return { ok: false, reason: `Refunds are available for ${REFUND_DAYS} days after purchase. Contact support and we'll take a look.` };
  }

  if (!fakePayments()) {
    if (!p.stripePaymentIntentId) return { ok: false, reason: "We couldn't find the payment for this purchase. Contact support." };
    await stripe().refunds.create({ payment_intent: p.stripePaymentIntentId, reason: "requested_by_customer" });
  }
  await markRefunded(p.id);
  return { ok: true };
}

/** Called after our own refund and from the charge.refunded webhook; idempotent. */
export async function markRefunded(purchaseId: string) {
  const [row] = await db()
    .update(t.purchases)
    .set({ status: "refunded", refundedAt: new Date() })
    .where(and(eq(t.purchases.id, purchaseId), inArray(t.purchases.status, ["paid", "disputed"])))
    .returning();
  if (!row) return;
  await countEvent("refund", row.quizSlug ?? "_all");
  if (row.email) {
    await sendEmail(
      refundEmail({ to: row.email, productName: PRODUCTS[row.product as ProductKey].name, amountCents: row.amountCents ?? 0, currency: row.currency ?? "usd" }),
    );
  }
}
