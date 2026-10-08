"use client";

/** Funnel events from the requirements doc. Server-side purchase events are sent from the Stripe webhook. */
export type FunnelEvent =
  | "quiz_view"
  | "quiz_start"
  | "question_answered"
  | "quiz_complete"
  | "email_captured"
  | "result_view"
  | "paywall_view"
  | "checkout_start";

type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export function track(event: FunnelEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; posthog?: { capture: (e: string, p: object) => void } };
  w.gtag?.("event", event, params);
  w.posthog?.capture(event, params);
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}
