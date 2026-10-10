import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { Chip, Container, QuizCard, RichText } from "@/components/ui";
import { codeQuizzes } from "@/content/quizzes/_registry";
import { toClientQuiz } from "@/lib/engine/client";
import { PRODUCTS } from "@/lib/products";
import { categorySlug, getQuiz, listQuizzes, reportMinAge, sellsReports } from "@/lib/quizzes";
import { itemCountLabel, tierCopy } from "@/lib/tiers";

export const revalidate = 300;

export function generateStaticParams() {
  return codeQuizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const quiz = await getQuiz((await params).slug);
  if (!quiz) return {};
  const title = `${quiz.title}: free, instant results`;
  return {
    title,
    description: quiz.description,
    alternates: { canonical: `/quiz/${quiz.slug}` },
    openGraph: { title, description: quiz.description, type: "website" },
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const quiz = await getQuiz((await params).slug);
  if (!quiz) notFound();
  const all = await listQuizzes();
  const related = (quiz.related ?? []).map((s) => all.find((q) => q.slug === s)).filter((q) => !!q);
  const tiers = tierCopy(quiz);
  const paid = sellsReports(quiz);
  const sampleQuestions = quiz.questions.filter((q) => q.kind !== "attention").slice(0, 3);
  const sampleOutcome = quiz.outcomes.find((o) => o.deep.length > 0);
  const sample = sampleOutcome?.deep[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: quiz.seo.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: quiz.category, item: `/category/${categorySlug(quiz.category)}` },
          { "@type": "ListItem", position: 2, name: quiz.title, item: `/quiz/${quiz.slug}` },
        ],
      },
    ],
  };

  return (
    <Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className="space-y-10">
        <header>
          <Link href={`/category/${categorySlug(quiz.category)}`} className="text-xs uppercase tracking-wide text-muted hover:underline">
            {quiz.category}
          </Link>
          <h1 className="mt-1 font-serif text-4xl leading-tight sm:text-5xl">{quiz.title}</h1>
          <p className="mt-3 text-lg text-ink-soft">{quiz.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li>
              <Chip>{itemCountLabel(quiz)}</Chip>
            </li>
            <li>
              <Chip>About {quiz.minutes} min</Chip>
            </li>
            <li>
              <Chip tone="good">Free result, no email needed</Chip>
            </li>
            {paid && (
              <li>
                <Chip>Optional reports from {PRODUCTS.snapshot.priceLabel}, one-time</Chip>
              </li>
            )}
            {quiz.isScreener && (
              <li>
                <Chip tone="good">Always free</Chip>
              </li>
            )}
          </ul>
          {quiz.minAge === 18 && <p className="mt-3 text-xs text-muted">For adults 18 and over.</p>}
          {quiz.minAge < 18 && paid && reportMinAge(quiz) === 18 && <p className="mt-3 text-xs text-muted">Paid reports for this quiz are for adults 18 and over.</p>}
        </header>

        <QuizRunner quiz={toClientQuiz(quiz)} minAge={quiz.minAge} />

        {quiz.disclaimer && <p className="rounded-xl bg-card p-4 text-sm text-ink-soft ring-1 ring-line">{quiz.disclaimer}</p>}

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-good">Free</p>
            <p className="mt-1 text-sm">{tiers.free}</p>
          </div>
          {paid ? (
            <>
              <div className="rounded-2xl border border-line bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Snapshot · {PRODUCTS.snapshot.priceLabel} once</p>
                <p className="mt-1 text-sm">{tiers.snapshot}</p>
              </div>
              <div className="rounded-2xl border-2 border-ink bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Deep Report · {PRODUCTS.deep.priceLabel} once</p>
                <p className="mt-1 text-sm">{tiers.deep}</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-line bg-card p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Nothing to buy</p>
              <p className="mt-1 text-sm">{quiz.isScreener ? "Mental health screens are always free, in full." : tiers.deep}</p>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <RichText text={quiz.seo.intro} className="text-lg" />
          <h2 className="font-serif text-2xl">What the {quiz.title.replace(/\s*\(.*\)$/, "")} measures</h2>
          <RichText text={quiz.seo.measures} />
        </section>

        {sampleQuestions.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl">Sample questions</h2>
            <ul className="mt-3 space-y-2">
              {sampleQuestions.map((q) => (
                <li key={q.id} className="rounded-xl border border-line bg-card px-4 py-3 text-sm">
                  {q.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {paid && sample && sampleOutcome && (
          <section className="rounded-2xl border border-line bg-card p-6">
            <p className="text-xs uppercase tracking-wide text-muted">Sample from a Deep Report ({sampleOutcome.name})</p>
            <h2 className="mt-1 font-serif text-2xl">{sample.title}</h2>
            <p className="mt-3">{sample.teaser}</p>
            <RichText text={sample.body} className="mt-2 text-sm text-ink-soft" />
            <p className="mt-3 text-xs text-muted">Every Deep Report has {sampleOutcome.deep.length}+ sections like this, written for your result and your scores.</p>
          </section>
        )}

        <section>
          <h2 className="font-serif text-2xl">Possible results</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {quiz.outcomes.map((o) => (
              <li key={o.key}>
                <Link href={`/quiz/${quiz.slug}/results/${o.key}`} className="flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-3 hover:border-ink">
                  {o.emoji && <span className="text-xl">{o.emoji}</span>}
                  <span>
                    <span className="block font-semibold">{o.name}</span>
                    <span className="block text-xs text-muted">{o.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl">Where it comes from</h2>
          <RichText text={quiz.seo.origin} />
        </section>

        <section>
          <h2 className="font-serif text-2xl">Questions people ask</h2>
          <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-card">
            {quiz.seo.faqs.map((f) => (
              <details key={f.q} className="group p-4">
                <summary className="cursor-pointer list-none font-semibold">
                  <span className="mr-2 inline-block transition group-open:rotate-90">›</span>
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

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
      </article>
    </Container>
  );
}
