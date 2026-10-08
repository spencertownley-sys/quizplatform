import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db, t } from "@/db";
import { getQuiz } from "@/content";
import { BuyButton } from "@/components/BuyButton";
import { TrackOnMount } from "@/components/TrackOnMount";
import { accessLevel, canViewAttempt } from "@/lib/access";
import type { ScoreResult } from "@/lib/engine/types";
import { PRODUCTS, atLeast } from "@/lib/products";
import { getViewer } from "@/lib/viewer";

export const metadata: Metadata = { robots: { index: false } };

const UUID = /^[0-9a-f-]{36}$/i;

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<{ k?: string; paid?: string }>;
}) {
  const [{ attemptId }, { k, paid }] = await Promise.all([params, searchParams]);
  if (!UUID.test(attemptId)) notFound();

  const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, attemptId)).limit(1);
  const viewer = await getViewer();
  if (!attempt || !canViewAttempt(attempt, viewer, k)) notFound();

  const quiz = getQuiz(attempt.quizSlug);
  const outcome = quiz?.outcomes.find((o) => o.key === attempt.outcomeKey);
  if (!quiz || !outcome) notFound();

  const scores = attempt.scores as ScoreResult;
  const level = await accessLevel(attempt, viewer);
  const waitingForPayment = paid === "1" && level === "free";
  const sellsReports = !quiz.isScreener;

  return (
    <article className="space-y-10">
      <TrackOnMount event="result_view" params={{ slug: quiz.slug, outcome: outcome.key }} />
      {/* Webhook usually lands within seconds; refresh until it does. */}
      {waitingForPayment && <meta httpEquiv="refresh" content="3" />}

      <header>
        <p className="text-xs uppercase tracking-wide text-muted">{quiz.title}</p>
        <h1 className="mt-1 font-serif text-5xl">{outcome.name}</h1>
        <p className="mt-4 text-lg">{outcome.summary}</p>
        {quiz.disclaimer && <p className="mt-3 text-xs text-muted">{quiz.disclaimer}</p>}
        {/* TODO(P-10): share card (Open Graph image) for Stories, TikTok and X. */}
      </header>

      {waitingForPayment && (
        <p className="rounded-xl bg-accent-soft px-4 py-3 text-sm">Payment received. Unlocking your report…</p>
      )}

      {sellsReports && (
        <section className="space-y-4">
          <h2 className="font-serif text-2xl">Your score breakdown</h2>
          <div className={atLeast(level, "snapshot") ? "" : "locked"} aria-hidden={!atLeast(level, "snapshot")}>
            <ul className="space-y-3">
              {quiz.dimensions.map((d) => {
                const pct = Math.round((scores.dimensions[d.key]?.normalized ?? 0) * 100);
                return (
                  <li key={d.key}>
                    <div className="flex justify-between text-sm"><span>{d.label}</span><span>{pct}%</span></div>
                    <div className="mt-1 h-2 rounded-full bg-line"><div className="h-2 rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
                    {(d.low || d.high) && (
                      <div className="mt-0.5 flex justify-between text-xs text-muted"><span>{d.low}</span><span>{d.high}</span></div>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
              {outcome.snapshot.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </section>
      )}

      {sellsReports && (
        <section className="space-y-6">
          <h2 className="font-serif text-2xl">Your Deep Report</h2>
          {outcome.deep.map((s) => (
            <div key={s.title}>
              <h3 className="font-semibold">{s.title}</h3>
              {atLeast(level, "deep") ? (
                <p className="mt-1 text-sm">{s.body}</p>
              ) : (
                <p className="mt-1 text-sm">
                  {s.teaser} <span className="locked">This section is written for your exact scores and continues here.</span>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {sellsReports && level !== "deep" && !waitingForPayment && (
        <section className="rounded-2xl border border-line bg-white p-6">
          <TrackOnMount event="paywall_view" params={{ slug: quiz.slug, level }} />
          <h2 className="font-serif text-2xl">See the full picture</h2>
          <p className="mt-1 text-sm text-muted">One-time payment. No subscription. 30-day refund if you're not happy.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {level === "free" && (
              <div className="rounded-xl border border-line p-4">
                <p className="font-semibold">{PRODUCTS.snapshot.name} · {PRODUCTS.snapshot.priceLabel}</p>
                <p className="mt-1 text-sm text-muted">Every score, your key traits, PDF.</p>
                <div className="mt-4">
                  <BuyButton product="snapshot" attemptId={attempt.id} token={k} label={`Get Snapshot, ${PRODUCTS.snapshot.priceLabel}`} />
                </div>
              </div>
            )}
            <div className="rounded-xl border-2 border-ink p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Most popular</p>
              <p className="font-semibold">{PRODUCTS.deep.name} · {PRODUCTS.deep.priceLabel}</p>
              <p className="mt-1 text-sm text-muted">Everything in Snapshot plus the full personalized report.</p>
              <div className="mt-4">
                <BuyButton product="deep" attemptId={attempt.id} token={k} label={`Get Deep Report, ${PRODUCTS.deep.priceLabel}`} primary />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            Taking lots of quizzes? <a href="/pricing" className="underline">All-Access</a> unlocks every Deep Report for {PRODUCTS.all_access.priceLabel}. It's a separate plan you choose on its own.
          </p>
        </section>
      )}
    </article>
  );
}
