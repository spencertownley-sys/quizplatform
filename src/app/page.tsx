import Link from "next/link";
import { plannedQuizzes, quizzes } from "@/content";

export default function Home() {
  const planned = plannedQuizzes();
  const byCategory = Map.groupBy(planned, (c) => c.category);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-serif text-4xl leading-tight">Find out what makes you, you.</h1>
        <p className="mt-3 max-w-xl text-muted">
          Every quiz gives you a free result. Want the full picture? Reports start at $0.99, one-time. No account needed.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {quizzes.map((q) => (
          <Link key={q.slug} href={`/quiz/${q.slug}`} className="rounded-2xl border border-line bg-white p-5 hover:border-ink">
            <p className="text-xs uppercase tracking-wide text-muted">{q.category}</p>
            <h2 className="mt-1 font-serif text-xl">{q.title}</h2>
            <p className="mt-2 text-sm text-muted">{q.questions.length} questions · about {q.minutes} min</p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-2xl">Coming soon</h2>
        <p className="mt-1 text-sm text-muted">{planned.length} more quizzes on the roadmap.</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {[...byCategory].map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-1 space-y-0.5 text-sm text-muted">
                {items.slice(0, 6).map((c) => <li key={c.n}>{c.title}</li>)}
                {items.length > 6 && <li>+{items.length - 6} more</li>}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
