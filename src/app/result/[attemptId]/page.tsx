import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq, gte, inArray, or, sql } from "drizzle-orm";
import { BuyButton } from "@/components/BuyButton";
import { PaymentPoller } from "@/components/PaymentPoller";
import { TrackOnMount } from "@/components/TrackOnMount";
import { CertificateLink, CompareInvite, DeleteResultButton, EmailCapture, RefundButton, ReviewForm, ShareButtons } from "@/components/actions";
import {
  AbilityBlock,
  ChartBlock,
  CrisisBanner,
  DeepBlock,
  ExtrasBlock,
  MatchesBlock,
  PerformanceBlock,
  QuadrantMap,
  RankingBlock,
  ReviewBlock,
  ScoresBlock,
  ScreenerBlock,
} from "@/components/report";
import { Container, QuizCard, RichText } from "@/components/ui";
import { db, t } from "@/db";
import { viewerAge } from "@/lib/age-server";
import { signUpPath } from "@/lib/auth";
import { variantLabel } from "@/lib/experiments";
import { REFUND_DAYS } from "@/lib/fulfill";
import { PRODUCTS, SNAPSHOT_TEST, atLeast, formatCents, sellableBundles } from "@/lib/products";
import { listQuizzes, onSale, reportMinAge, sellsReports } from "@/lib/quizzes";
import { loadResult } from "@/lib/results";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<{ k?: string; paid?: string }>;
}) {
  const [{ attemptId }, { k, paid }] = await Promise.all([params, searchParams]);
  const loaded = await loadResult(attemptId, k);
  if (!loaded) notFound();
  const { attempt, quiz, viewer, owner, model, variants } = loaded;
  const token = k ?? attempt.accessToken; // owners can always build links; others came with k
  const level = model.level;
  const paidQuiz = sellsReports(quiz);
  const selling = paidQuiz && onSale(quiz);
  const waitingForPayment = paid === "1" && paidQuiz && level === "free";
  const variant = variantLabel(variants);

  const age = await viewerAge(viewer.guestId);
  const oldEnough = age.age !== null && age.age >= reportMinAge(quiz);

  // Buyer context: this attempt's purchases, and how much this person has bought before.
  const buyer = [viewer.userId ? eq(t.purchases.userId, viewer.userId) : undefined, viewer.guestId ? eq(t.purchases.guestSessionId, viewer.guestId) : undefined].filter(
    (c) => c !== undefined,
  );
  const [mine, monthCount, reviews, all] = await Promise.all([
    buyer.length
      ? db()
          .select()
          .from(t.purchases)
          .where(and(or(...buyer), inArray(t.purchases.status, ["paid", "refunded"])))
          .orderBy(desc(t.purchases.paidAt))
      : Promise.resolve([]),
    db()
      .select({ n: sql<number>`count(*)::int` })
      .from(t.purchases)
      .where(and(eq(t.purchases.status, "paid"), gte(t.purchases.paidAt, new Date(Date.now() - 30 * 86_400_000))))
      .then((r) => r[0]?.n ?? 0),
    db()
      .select()
      .from(t.reviews)
      .where(and(eq(t.reviews.quizSlug, quiz.slug), eq(t.reviews.status, "approved")))
      .orderBy(desc(t.reviews.createdAt))
      .limit(3),
    listQuizzes(),
  ]);
  const thisPurchase = mine.find((p) => p.attemptId === attempt.id && p.status === "paid");
  const paidCount = mine.filter((p) => p.status === "paid" && p.product !== "all_access").length;
  const spent = mine.filter((p) => p.status === "paid" && p.product !== "all_access").reduce((s, p) => s + (p.amountCents ?? 0), 0);
  const hasReview = thisPurchase ? (await db().select({ id: t.reviews.id }).from(t.reviews).where(eq(t.reviews.purchaseId, thisPurchase.id)).limit(1)).length > 0 : true;
  const comparisons = owner ? await db().select().from(t.comparisons).where(or(eq(t.comparisons.attemptA, attempt.id), eq(t.comparisons.attemptB, attempt.id))) : [];

  const onSaleSlugs = new Set(all.filter(onSale).map((q) => q.slug));
  const bundle = sellableBundles(onSaleSlugs).find((b) => b.included.includes(quiz.slug));
  const related = (quiz.related ?? []).map((s) => all.find((q) => q.slug === s)).filter((q) => !!q);
  const showAllAccessOffer = variants.sub_offer === "first" || paidCount >= 1;
  const snapshotPrice = variants.snapshot_price === "199" ? SNAPSHOT_TEST.priceLabel : PRODUCTS.snapshot.priceLabel;
  const pdfHref = `/api/report/${attempt.id}/pdf?k=${encodeURIComponent(token)}`;
  const shareTitle = model.headlineVisible ? `I got ${model.outcome.name} on the ${quiz.title}` : `I took the ${quiz.title}`;
  const risk = model.flags.includes("risk_item");

  // Price card: right after the personalized preview for free results; an upgrade card after Snapshot content.
  const paywall = paidQuiz && level !== "deep" && !waitingForPayment && (
          <section id="unlock" className="scroll-mt-4 rounded-3xl border border-line bg-card p-6">
            <TrackOnMount event="paywall_view" params={{ slug: quiz.slug, level, variant }} />
            {!selling ? (
              <>
                <h2 className="font-serif text-2xl">Reports for this quiz are coming soon</h2>
                <p className="mt-1 text-sm text-muted">We&apos;re reviewing the report copy before we sell it. Your free result is yours to keep.</p>
              </>
            ) : !oldEnough ? (
              <>
                <h2 className="font-serif text-2xl">Reports for this quiz are for adults</h2>
                <p className="mt-1 text-sm text-muted">Paid reports here are for people {reportMinAge(quiz)} and over. Your free result is yours to keep.</p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-2xl">{level === "snapshot" ? "Go deeper" : "See the full picture"}</h2>
                <p className="mt-1 text-sm text-muted">One-time payment. No subscription. {REFUND_DAYS}-day refund if you&apos;re not happy.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {level === "free" && (
                    <div className="flex flex-col rounded-2xl border border-line p-4">
                      <p className="font-semibold">
                        {PRODUCTS.snapshot.name} · {snapshotPrice}
                      </p>
                      <p className="mt-1 flex-1 text-sm text-muted">{PRODUCTS.snapshot.blurb}</p>
                      <p className="mt-2 text-xs text-muted">One-time payment. No subscription.</p>
                      <div className="mt-3">
                        <BuyButton product="snapshot" attemptId={attempt.id} token={token} slug={quiz.slug} label={`Get Snapshot, ${snapshotPrice}`} />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col rounded-2xl border-2 border-ink p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">Most popular</p>
                    <p className="font-semibold">
                      {PRODUCTS.deep.name} · {level === "snapshot" ? formatCents(PRODUCTS.deep.cents - PRODUCTS.snapshot.cents) : PRODUCTS.deep.priceLabel}
                    </p>
                    <p className="mt-1 flex-1 text-sm text-muted">
                      {level === "snapshot" ? "Upgrade for the difference: your full personalized report and PDF." : PRODUCTS.deep.blurb}
                    </p>
                    <p className="mt-2 text-xs text-muted">One-time payment. No subscription.</p>
                    <div className="mt-3">
                      <BuyButton
                        product="deep"
                        attemptId={attempt.id}
                        token={token}
                        slug={quiz.slug}
                        primary
                        label={level === "snapshot" ? `Upgrade, ${formatCents(PRODUCTS.deep.cents - PRODUCTS.snapshot.cents)}` : `Get Deep Report, ${PRODUCTS.deep.priceLabel}`}
                      />
                    </div>
                  </div>
                </div>
                {bundle && level === "free" && (
                  <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-paper p-4 sm:flex-row sm:items-center">
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">
                        {bundle.name} · {PRODUCTS.bundle.priceLabel} once
                      </p>
                      <p className="text-muted">
                        Deep Reports for {bundle.included.length} quizzes:{" "}
                        {bundle.included.map((s) => all.find((q) => q.slug === s)?.title ?? s).join(", ")}. Take the others whenever you like.
                      </p>
                    </div>
                    <div className="sm:w-44">
                      <BuyButton product="bundle" bundleKey={bundle.key} slug={quiz.slug} returnTo={`/result/${attempt.id}?k=${encodeURIComponent(token)}`} label={`Get bundle, ${PRODUCTS.bundle.priceLabel}`} />
                    </div>
                  </div>
                )}
                <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs text-muted">
                  {monthCount >= 25 && <p>{monthCount.toLocaleString("en-US")} reports bought in the last 30 days.</p>}
                  {reviews.length >= 3 && (
                    <ul className="space-y-2">
                      {reviews.map((r) => (
                        <li key={r.id}>
                          <span className="text-ink">{"★".repeat(r.rating)}</span> “{r.body}” — {r.displayName}
                        </li>
                      ))}
                    </ul>
                  )}
                  {showAllAccessOffer && (
                    <p>
                      {paidCount >= 1 ? `You've spent ${formatCents(spent)} on reports. ` : "Taking lots of quizzes? "}
                      <Link href="/pricing" className="underline">
                        All-Access
                      </Link>{" "}
                      is {PRODUCTS.all_access.priceLabel} for every Deep Report on every quiz. It&apos;s a separate plan you choose on its own.
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        );

  return (
    <Container>
      <article className="space-y-10">
        <TrackOnMount event="result_view" params={{ slug: quiz.slug, outcome: model.outcome.key, variant }} />
        {risk && <CrisisBanner />}

        <header>
          <Link href={`/quiz/${quiz.slug}`} className="text-xs uppercase tracking-wide text-muted hover:underline">
            {quiz.title}
          </Link>
          {model.headlineVisible ? (
            <>
              {model.outcome.emoji && <p className="mt-3 text-6xl">{model.outcome.emoji}</p>}
              <h1 className="mt-2 font-serif text-5xl leading-tight">{model.outcome.name}</h1>
              {model.outcome.tagline && <p className="mt-2 text-lg text-ink-soft">{model.outcome.tagline}</p>}
              <p className="mt-4 text-lg">{model.outcome.summary}</p>
              {level === "free" && model.runnerUp && <p className="mt-3 text-sm text-ink-soft">Runner-up: <strong>{model.runnerUp.name}</strong></p>}
            </>
          ) : (
            <>
              <h1 className="mt-2 font-serif text-5xl leading-tight">Your result is ready</h1>
              <p className="mt-4 text-lg text-ink-soft">Your full result for this quiz is part of the report. Choose an option below to see it.</p>
            </>
          )}
          {quiz.disclaimer && <p className="mt-4 text-xs text-muted">{quiz.disclaimer}</p>}
          {paidQuiz && level === "free" && selling && !waitingForPayment && (
            <a href="#unlock" className="mt-4 inline-block text-sm underline">
              See your full report ↓
            </a>
          )}
        </header>

        {waitingForPayment && <PaymentPoller />}

        {paid === "1" && level !== "free" && paidQuiz && (
          <section className="rounded-2xl border border-good/40 bg-good-soft p-5">
            <p className="font-semibold text-good">Thank you! Your {level === "deep" ? "Deep Report" : "Snapshot"} is unlocked below.</p>
            <p className="mt-1 text-sm">
              Your receipt has a permanent link to this report.{" "}
              {!viewer.userId && (
                <>
                  <Link href={signUpPath(`/result/${attempt.id}?k=${encodeURIComponent(token)}`)} className="underline">
                    Save it to a free dashboard
                  </Link>{" "}
                  to keep all your results in one place.
                </>
              )}
            </p>
          </section>
        )}

        {model.headlineVisible && (
          <section className="space-y-3">
            <ShareButtons code={attempt.shareCode} title={shareTitle} />
          </section>
        )}

        {model.screener && <ScreenerBlock model={model} source={model.screener.source} />}
        {model.performance && <PerformanceBlock model={model} />}
        {model.quadrant && model.headlineVisible && <QuadrantMap q={model.quadrant} />}
        {model.chart && <ChartBlock model={model} />}
        {model.ability && <AbilityBlock model={model} />}
        <MatchesBlock model={model} />
        {level === "free" ? (
          <>
            {paidQuiz && <DeepBlock model={model} previewLine={model.previewLine} />}
            {paywall}
            {paidQuiz && <ScoresBlock model={model} />}
          </>
        ) : (
          <>
            {paidQuiz && <ScoresBlock model={model} />}
            <RankingBlock model={model} />
            <ExtrasBlock model={model} />
            {model.snapshot.length > 0 && (
              <section className="space-y-2">
                <h2 className="font-serif text-2xl">Key points</h2>
                <ul className="list-disc space-y-1 pl-5">
                  {model.snapshot.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            )}
            {paidQuiz && <DeepBlock model={model} />}
            <ReviewBlock model={model} />
            {paywall}
          </>
        )}

        {level !== "free" && paidQuiz && (
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5">
            <p className="font-semibold">Keep your report</p>
            {quiz.structure === "ability" && level === "deep" ? (
              <CertificateLink href={pdfHref} />
            ) : (
              <a href={pdfHref} className="self-start rounded-full border border-ink px-4 py-2 text-sm">
                Download PDF
              </a>
            )}
            {thisPurchase && owner && (
              <div className="space-y-3 border-t border-line pt-3">
                {!hasReview && (
                  <details>
                    <summary className="cursor-pointer text-sm underline">Leave a review</summary>
                    <div className="mt-3">
                      <ReviewForm purchaseId={thisPurchase.id} />
                    </div>
                  </details>
                )}
                {thisPurchase.paidAt && Date.now() - thisPurchase.paidAt.getTime() < REFUND_DAYS * 86_400_000 && (
                  <RefundButton purchaseId={thisPurchase.id} label={`Not happy? Refund within ${REFUND_DAYS} days`} />
                )}
              </div>
            )}
          </section>
        )}

        {quiz.compare && owner && model.headlineVisible && (
          <section className="rounded-2xl border border-line bg-card p-5">
            <h2 className="font-serif text-xl">{quiz.compare.invite}</h2>
            <p className="mt-1 text-sm text-muted">
              They take the same quiz; you both see your results side by side for free. The full comparison report is {PRODUCTS.comparison.priceLabel}, once, for both of you.
            </p>
            <div className="mt-3">
              <CompareInvite attemptId={attempt.id} other={quiz.compare.other} />
            </div>
            {comparisons.filter((c) => c.attemptB).length > 0 && (
              <ul className="mt-3 space-y-1 text-sm">
                {comparisons
                  .filter((c) => c.attemptB)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={`/compare/${c.id}?k=${encodeURIComponent(c.accessToken)}`} className="underline">
                        See your comparison ({c.completedAt?.toLocaleDateString("en-US", { dateStyle: "medium" })})
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        )}

        {owner && !attempt.email && (
          <section className="rounded-2xl border border-line bg-card p-5">
            <p className="mb-3 text-sm">Want a link to this result in your inbox? Optional.</p>
            <EmailCapture attemptId={attempt.id} token={token} />
          </section>
        )}

        {model.quiz.method && (
          <section className="space-y-2">
            <h2 className="font-serif text-2xl">How this quiz works</h2>
            <RichText text={model.quiz.method} className="text-sm text-ink-soft" />
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl">Try next</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {related.map((q) => (
                <QuizCard key={q!.slug} quiz={q!} emoji={q!.outcomes[0]?.emoji} />
              ))}
            </div>
          </section>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted">
          <span>
            Taken {attempt.completedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}. This page is private: only you and people you give the link to can see it.
          </span>
          {owner && <DeleteResultButton attemptId={attempt.id} />}
        </footer>
      </article>
    </Container>
  );
}
