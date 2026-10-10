import Link from "next/link";
import { Chip, Container, QuizCard } from "@/components/ui";
import { catalog } from "@/content/catalog";
import { PROMISES } from "@/lib/brand";
import { PRODUCTS } from "@/lib/products";
import { CATEGORIES, categorySlug, listQuizzes, plannedQuizzes } from "@/lib/quizzes";

export const revalidate = 300;

export default async function Home() {
  const [quizzes, planned] = await Promise.all([listQuizzes(), plannedQuizzes()]);
  const demand = new Map(catalog.map((c) => [c.n, c.searches ?? 0]));
  const popular = [...quizzes].sort((a, b) => (demand.get(b.n) ?? 0) - (demand.get(a.n) ?? 0));
  const counts = new Map<string, number>();
  for (const q of quizzes) counts.set(q.category, (counts.get(q.category) ?? 0) + 1);

  return (
    <Container wide>
      <section className="py-6 sm:py-10">
        <h1 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Find out what makes you, you.</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Personality, relationship and brain quizzes with a free result every time. Want the full picture? Reports start at {PRODUCTS.snapshot.priceLabel}, one-time. No
          account, no email, no surprise subscription.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {PROMISES.map((p) => (
            <Chip key={p} tone="good">
              ✓ {p}
            </Chip>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Popular right now</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((q) => (
            <QuizCard key={q.slug} quiz={q} emoji={q.outcomes[0]?.emoji} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl">Browse by topic</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-2xl border border-line bg-card p-4 hover:border-ink">
              <p className="text-2xl">{c.emoji}</p>
              <p className="mt-1 font-semibold">{c.name}</p>
              <p className="text-sm text-muted">{c.blurb}</p>
              <p className="mt-2 text-xs text-muted">{counts.get(c.name) ?? 0} live · more coming</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-4 rounded-3xl border border-line bg-card p-6 sm:grid-cols-3 sm:p-8">
        <div className="sm:col-span-3">
          <h2 className="font-serif text-2xl">What&apos;s free, and what isn&apos;t</h2>
          <p className="mt-1 text-sm text-muted">The price is on the page before you start. Nothing is billed again unless you choose a plan that says so.</p>
        </div>
        <div>
          <p className="font-semibold">Free, always</p>
          <p className="mt-1 text-sm text-ink-soft">Your result, a short summary and a share card on every quiz. Mental health screens are free in full.</p>
        </div>
        <div>
          <p className="font-semibold">
            Reports: {PRODUCTS.snapshot.priceLabel} or {PRODUCTS.deep.priceLabel}, once
          </p>
          <p className="mt-1 text-sm text-ink-soft">Every score explained, or a full personalized report with a PDF. One-time payment, 30-day refund.</p>
        </div>
        <div>
          <p className="font-semibold">All-Access: {PRODUCTS.all_access.priceLabel}</p>
          <p className="mt-1 text-sm text-ink-soft">
            Every Deep Report, your history and compare-with-friends. A separate plan you pick on its own; cancel in two clicks. <Link href="/pricing" className="underline">Details</Link>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl">Coming soon</h2>
        <p className="mt-1 text-sm text-muted">{planned.length} more quizzes on the way, a few each week.</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const items = planned.filter((p) => p.category === c.name);
            if (!items.length) return null;
            return (
              <div key={c.slug}>
                <h3 className="text-sm font-semibold">
                  <Link href={`/category/${categorySlug(c.name)}`} className="hover:underline">
                    {c.name}
                  </Link>
                </h3>
                <ul className="mt-1 space-y-0.5 text-sm text-muted">
                  {items.slice(0, 6).map((p) => (
                    <li key={p.n}>{p.title}</li>
                  ))}
                  {items.length > 6 && <li>+{items.length - 6} more</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
