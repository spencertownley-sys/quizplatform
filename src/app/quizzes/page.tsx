import type { Metadata } from "next";
import Link from "next/link";
import { Container, QuizCard } from "@/components/ui";
import { CATEGORIES, listQuizzes } from "@/lib/quizzes";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "All quizzes",
  description: "Every personality, relationship, brain and style quiz, each with a free result. Optional reports from $0.99, one-time.",
  alternates: { canonical: "/quizzes" },
};

export default async function AllQuizzes() {
  const quizzes = await listQuizzes();
  return (
    <Container wide>
      <h1 className="font-serif text-4xl">All quizzes</h1>
      <p className="mt-2 text-ink-soft">Every one gives you a free result. No email, no account.</p>
      <div className="mt-10 space-y-12">
        {CATEGORIES.map((c) => {
          const items = quizzes.filter((q) => q.category === c.name);
          if (!items.length) return null;
          return (
            <section key={c.slug}>
              <h2 className="font-serif text-2xl">
                <Link href={`/category/${c.slug}`} className="hover:underline">
                  {c.emoji} {c.name}
                </Link>
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((q) => (
                  <QuizCard key={q.slug} quiz={q} emoji={q.outcomes[0]?.emoji} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
