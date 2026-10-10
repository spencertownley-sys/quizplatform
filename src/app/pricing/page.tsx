import type { Metadata } from "next";
import Link from "next/link";
import { AllAccessCheckout } from "@/components/AllAccessCheckout";
import { BuyButton } from "@/components/BuyButton";
import { Container } from "@/components/ui";
import { REFUND_DAYS } from "@/lib/fulfill";
import { PRODUCTS, sellableBundles } from "@/lib/products";
import { listQuizzes, onSale } from "@/lib/quizzes";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Pricing",
  description: "Free results on every quiz. Optional one-time reports from $0.99. All-Access is $9.99/month, a separate plan you can cancel in two clicks.",
};

export default async function Pricing() {
  const quizzes = await listQuizzes();
  const live = quizzes.filter(onSale);
  const bundles = sellableBundles(new Set(live.map((q) => q.slug)));
  const title = (slug: string) => quizzes.find((q) => q.slug === slug)?.title ?? slug;

  return (
    <Container wide>
      <h1 className="font-serif text-4xl">Simple, honest pricing</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Every quiz gives you a free result. Pay only if you want more, and only once, unless you choose the monthly plan below. One-time purchases never turn into a
        subscription.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        <Tier name="Free" price="$0" points={["Your result on every quiz", "A short summary", "A share card", "Mental health screens, in full"]} />
        <Tier name={PRODUCTS.snapshot.name} price={`${PRODUCTS.snapshot.priceLabel} once`} points={["Every score, explained", "Key points about your result", "PDF to keep"]} />
        <Tier
          name={PRODUCTS.deep.name}
          price={`${PRODUCTS.deep.priceLabel} once`}
          highlight
          points={["Everything in Snapshot", "Your full personalized report", "Relationships, work, stress, growth plan", "PDF to keep"]}
        />
        <Tier name={PRODUCTS.comparison.name} price={`${PRODUCTS.comparison.priceLabel} once`} points={["For two people who took the same quiz", "Side-by-side, friction points, prompts", "Unlocks for both of you"]} />
      </div>
      <p className="mt-3 text-sm text-muted">Buy reports from your result page. {REFUND_DAYS}-day refund on every one-time purchase, no questions asked.</p>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border-2 border-ink bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Monthly plan</p>
          <h2 className="mt-1 font-serif text-3xl">All-Access</h2>
          <p className="mt-1 font-serif text-2xl">{PRODUCTS.all_access.priceLabel}</p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>✓ The Deep Report on every quiz, including retakes</li>
            <li>✓ Your dashboard with history and trends over time</li>
            <li>✓ Comparison reports with friends and partners</li>
            <li>✓ New quizzes every month</li>
          </ul>
          <div className="mt-5 rounded-2xl bg-paper p-4 text-sm">
            <p>
              <strong>{PRODUCTS.all_access.priceLabel}</strong>, billed monthly, renews automatically until you cancel.
            </p>
            <p className="mt-1">Cancel anytime in two clicks from your dashboard or any receipt email; you keep access until the end of the month you paid for.</p>
            <p className="mt-1 text-muted">Needs a free account, so your reports and billing live in one place.</p>
          </div>
          <div className="mt-4">
            <AllAccessCheckout priceLabel={PRODUCTS.all_access.priceLabel} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl">Bundles</h2>
          {bundles.length === 0 ? (
            <p className="text-sm text-muted">Bundles of three or more Deep Reports appear here once their quizzes are live.</p>
          ) : (
            bundles.map((b) => (
              <div key={b.key} className="rounded-2xl border border-line bg-card p-5">
                <p className="font-semibold">
                  {b.name} · {PRODUCTS.bundle.priceLabel} once
                </p>
                <p className="mt-1 text-sm text-muted">Deep Reports for: {b.included.map(title).join(", ")}.</p>
                <p className="mt-1 text-xs text-muted">Unlocks results you already have and any of these quizzes you take later, in this browser or your account.</p>
                <div className="mt-3 max-w-xs">
                  <BuyButton product="bundle" bundleKey={b.key} label={`Get the ${b.name}, ${PRODUCTS.bundle.priceLabel}`} returnTo="/quizzes" />
                </div>
              </div>
            ))
          )}
          <p className="text-sm text-muted">
            Questions about billing? See <Link href="/legal/refunds" className="underline">refunds and cancellation</Link>.
          </p>
        </div>
      </section>
    </Container>
  );
}

function Tier({ name, price, points, highlight }: { name: string; price: string; points: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl bg-card p-5 ${highlight ? "border-2 border-ink" : "border border-line"}`}>
      {highlight && <p className="text-xs font-semibold uppercase tracking-wide text-accent">Most popular</p>}
      <p className="font-semibold">{name}</p>
      <p className="font-serif text-2xl">{price}</p>
      <ul className="mt-3 space-y-1 text-sm text-ink-soft">
        {points.map((p) => (
          <li key={p}>✓ {p}</li>
        ))}
      </ul>
    </div>
  );
}
