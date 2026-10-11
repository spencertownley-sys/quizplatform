import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, RichText } from "@/components/ui";
import { codeQuizzes } from "@/content/quizzes/_registry";
import { getQuiz, sellsReports } from "@/lib/quizzes";

export const revalidate = 300;

/** One indexable page per outcome ("Anxious attachment style"), for people searching after a result elsewhere. */
export function generateStaticParams() {
  return codeQuizzes.flatMap((q) => q.outcomes.map((o) => ({ slug: q.slug, outcome: o.key })));
}

async function load(params: Promise<{ slug: string; outcome: string }>) {
  const { slug, outcome } = await params;
  const quiz = await getQuiz(slug);
  const o = quiz?.outcomes.find((x) => x.key === outcome);
  return quiz && o ? { quiz, o } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; outcome: string }> }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const title = `${data.o.name}: ${data.quiz.title.replace(/\s*\(.*\)$/, "")} result`;
  return { title, description: data.o.summary.slice(0, 158), alternates: { canonical: `/quiz/${data.quiz.slug}/results/${data.o.key}` } };
}

export default async function OutcomePage({ params }: { params: Promise<{ slug: string; outcome: string }> }) {
  const data = await load(params);
  if (!data) notFound();
  const { quiz, o } = data;
  const others = quiz.outcomes.filter((x) => x.key !== o.key);

  return (
    <Container>
      <article className="space-y-8">
        <header>
          <Link href={`/quiz/${quiz.slug}`} className="text-xs uppercase tracking-wide text-muted hover:underline">
            {quiz.title}
          </Link>
          <h1 className="mt-1 font-serif text-4xl sm:text-5xl">
            {o.emoji && <span className="mr-2">{o.emoji}</span>}
            {o.name}
          </h1>
          <p className="mt-2 text-lg text-ink-soft">{o.tagline}</p>
        </header>
        <p className="text-lg">{o.summary}</p>
        <RichText text={o.about} />
        {o.deep.length > 0 && sellsReports(quiz) && (
          <section className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-serif text-2xl">Inside the {o.name} Deep Report</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {o.deep.map((s) => (
                <li key={s.title}>
                  <span className="font-semibold">{s.title}.</span> <span className="text-ink-soft">{s.teaser}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="rounded-2xl bg-ink p-6 text-paper">
          <p className="font-serif text-2xl">Is this you?</p>
          <p className="mt-1 text-sm opacity-80">Take the {quiz.title} to find out. Free result, about {quiz.minutes} minutes, no email.</p>
          <Link href={`/quiz/${quiz.slug}`} className="mt-4 inline-block rounded-full bg-paper px-5 py-2 text-ink">
            Take the quiz
          </Link>
        </div>
        <section>
          <h2 className="font-serif text-xl">Other results</h2>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {others.map((x) => (
              <li key={x.key}>
                <Link href={`/quiz/${quiz.slug}/results/${x.key}`} className="rounded-full border border-line bg-card px-3 py-1 hover:border-ink">
                  {x.emoji} {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Container>
  );
}
