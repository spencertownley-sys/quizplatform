"use client";

/**
 * Funnel events from the requirements doc. Every event carries the quiz slug,
 * traffic source, device and experiment variant. Top-of-funnel events also go to
 * our own counters (/api/events) for the admin metrics page; purchases, refunds and
 * subscriptions are recorded on the server so ad blockers can't hide revenue.
 */
export type FunnelEvent =
  | "quiz_view"
  | "quiz_start"
  | "question_answered"
  | "quiz_complete"
  | "email_captured"
  | "result_view"
  | "paywall_view"
  | "checkout_start"
  | "account_created"
  | "share";

const COUNTED: FunnelEvent[] = ["quiz_view", "quiz_start", "result_view", "paywall_view"];
export const CONSENT_COOKIE = "qp_consent";

type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export function analyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === `${CONSENT_COOKIE}=yes`);
}

function context() {
  const ref = document.referrer ? new URL(document.referrer).hostname : "direct";
  const params = new URLSearchParams(location.search);
  return {
    source: params.get("utm_source") ?? (ref === location.hostname ? "internal" : ref),
    device: matchMedia("(max-width: 640px)").matches ? "mobile" : "desktop",
  };
}

export function track(event: FunnelEvent, params: { slug?: string; variant?: string; [k: string]: unknown } = {}) {
  if (typeof window === "undefined") return;
  const full = { ...context(), ...params };
  if (analyticsConsent()) {
    const w = window as unknown as { gtag?: Gtag; posthog?: { capture: (e: string, p: object) => void } };
    w.gtag?.("event", event, full);
    w.posthog?.capture(event, full);
  }
  // First-party aggregate counters: no cookies, no personal data, just daily counts per quiz.
  if (COUNTED.includes(event) && params.slug) {
    const body = JSON.stringify({ event, slug: params.slug, variant: params.variant ?? "" });
    if (!navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }))) {
      fetch("/api/events", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
    }
  }
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, full);
}
