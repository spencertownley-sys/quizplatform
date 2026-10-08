import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuiz, quizzes } from "@/content";
import { QuizRunner } from "@/components/QuizRunner";
import { PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const quiz = getQuiz((await params).slug);
  return quiz ? { title: `${quiz.title}: free, instant results`, description: quiz.description } : {};
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const quiz = getQuiz((await params).slug);
  if (!quiz) notFound();

  // The runner only needs what it renders; outcome reports stay on the server.
  const questions = quiz.questions.map((q) =>
    q.kind === "likert"
      ? { id: q.id, kind: q.kind, text: q.text }
      : { id: q.id, kind: q.kind, text: q.text, options: q.options.map((o) => ({ id: o.id, label: o.label })) },
  );

  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-wide text-muted">{quiz.category}</p>
        <h1 className="mt-1 font-serif text-4xl">{quiz.title}</h1>
        <p className="mt-3 text-muted">{quiz.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          <li className="rounded-full bg-white px-3 py-1 ring-1 ring-line">{quiz.questions.length} questions</li>
          <li className="rounded-full bg-white px-3 py-1 ring-1 ring-line">About {quiz.minutes} minutes</li>
          <li className="rounded-full bg-white px-3 py-1 ring-1 ring-line">Free result, no email needed</li>
          {!quiz.isScreener && (
            <li className="rounded-full bg-white px-3 py-1 ring-1 ring-line">
              Optional reports from {PRODUCTS.snapshot.priceLabel}, one-time
            </li>
          )}
        </ul>
        {quiz.minAge === 18 && <p className="mt-3 text-xs text-muted">For adults 18 and over.</p>}
      </header>

      <QuizRunner slug={quiz.slug} questions={questions} likertPoints={quiz.likertPoints ?? 5} />

      {quiz.disclaimer && <p className="text-xs text-muted">{quiz.disclaimer}</p>}
      {/* TODO(SEO): 600–1,000 words on what the test measures, sample questions, FAQ + FAQPage structured data. */}
    </article>
  );
}
