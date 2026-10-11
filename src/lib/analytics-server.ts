import "server-only";
import { sql } from "drizzle-orm";
import { db, t } from "@/db";

/** Funnel events from the requirements doc, in order. */
export const FUNNEL_EVENTS = [
  "quiz_view",
  "quiz_start",
  "question_answered",
  "quiz_complete",
  "email_captured",
  "result_view",
  "paywall_view",
  "checkout_start",
  "purchase",
  "account_created",
  "subscription_started",
  "subscription_canceled",
  "refund",
] as const;
export type FunnelEventName = (typeof FUNNEL_EVENTS)[number];

/** Daily counter for the admin metrics page. Never throws. */
export async function countEvent(event: FunnelEventName, quizSlug: string, variant = "", by = 1) {
  try {
    const day = new Date().toISOString().slice(0, 10);
    await db()
      .insert(t.funnelDaily)
      .values({ day, quizSlug, event, variant, count: by })
      .onConflictDoUpdate({
        target: [t.funnelDaily.day, t.funnelDaily.quizSlug, t.funnelDaily.event, t.funnelDaily.variant],
        set: { count: sql`${t.funnelDaily.count} + ${by}` },
      });
  } catch (err) {
    console.error("countEvent failed", err);
  }
}

/**
 * Server-side events (purchases, refunds, subscriptions) so ad blockers can't hide
 * revenue. Sent to GA4's Measurement Protocol and PostHog when configured, and only
 * for people who accepted analytics cookies.
 */
export async function serverEvent(
  name: FunnelEventName,
  params: { clientId: string; consent: boolean; quizSlug?: string; value?: number; currency?: string; tier?: string; variant?: string },
) {
  if (!params.consent) return;
  const props = {
    quiz_slug: params.quizSlug,
    tier: params.tier,
    value: params.value,
    currency: params.currency?.toUpperCase(),
    variant: params.variant,
  };
  const jobs: Promise<unknown>[] = [];
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const secret = process.env.GA_API_SECRET;
  if (ga && secret) {
    jobs.push(
      fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${ga}&api_secret=${secret}`, {
        method: "POST",
        body: JSON.stringify({ client_id: params.clientId, events: [{ name, params: props }] }),
      }),
    );
  }
  const ph = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (ph) {
    jobs.push(
      fetch(`${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"}/capture/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: ph, event: name, distinct_id: params.clientId, properties: props }),
      }),
    );
  }
  await Promise.allSettled(jobs);
}
