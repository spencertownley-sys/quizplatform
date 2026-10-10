import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, QuizCard } from "@/components/ui";
import { catalog } from "@/content/catalog";
import { CATEGORIES, categoryBySlug, listQuizzes } from "@/lib/quizzes";

export const revalidate = 300;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = categoryBySlug((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} quizzes`,
    description: `${c.blurb} Free results on every ${c.name.toLowerCase()} quiz, no email needed.`,
    alternates: { canonical: `/category/${c.slug}` },
  };
}

/** Category hub (SEO): live quizzes plus what's coming. */
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = categoryBySlug((await params).slug);
  if (!c) notFound();
  const quizzes = (await listQuizzes()).filter((q) => q.category === c.name);
  const built = new Set(quizzes.map((q) => q.n));
  const upcoming = catalog.filter((e) => e.category === c.name && !built.has(e.n));

  return (
    <Container wide>
      <p className="text-4xl">{c.emoji}</p>
      <h1 className="mt-2 font-serif text-4xl">{c.name} quizzes</h1>
      <p className="mt-2 max-w-xl text-ink-soft">{c.blurb}</p>
      {quizzes.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((q) => (
            <QuizCard key={q.slug} quiz={q} emoji={q.outcomes[0]?.emoji} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted">The first quizzes in this category are on the way.</p>
      )}
      {upcoming.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-xl">Coming soon</h2>
          <ul className="mt-2 grid gap-1 text-sm text-muted sm:grid-cols-2">
            {upcoming.map((u) => (
              <li key={u.n}>{u.title}</li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
