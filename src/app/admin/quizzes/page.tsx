import Link from "next/link";
import { sql } from "drizzle-orm";
import { db, t } from "@/db";
import { catalog } from "@/content/catalog";
import { lintQuiz } from "@/lib/engine/lint";
import { listQuizzes } from "@/lib/quizzes";
import { StatusButtons } from "./StatusButtons";

export default async function AdminQuizzes() {
  const [quizzes, counts, overrides] = await Promise.all([
    listQuizzes(),
    db()
      .select({ slug: t.attempts.quizSlug, n: sql<number>`count(*)::int` })
      .from(t.attempts)
      .groupBy(t.attempts.quizSlug),
    db().select({ slug: t.quizOverrides.slug, updatedAt: t.quizOverrides.updatedAt, by: t.quizOverrides.updatedBy, def: sql<boolean>`${t.quizOverrides.definition} is not null` }).from(t.quizOverrides),
  ]);
  const built = new Set(quizzes.map((q) => q.n));
  const unbuilt = catalog.filter((c) => !built.has(c.n));

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-serif text-3xl">Quizzes</h1>
        <p className="text-sm text-muted">Only live quizzes sell reports. Review the copy, then publish. Edits apply within about 30 seconds, no deploy.</p>
      </header>

      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="py-2">#</th>
            <th>Quiz</th>
            <th>Status</th>
            <th>Takers</th>
            <th>Lint</th>
            <th>Edited</th>
            <th />
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {quizzes.map((q) => {
            const problems = lintQuiz(q);
            const o = overrides.find((x) => x.slug === q.slug);
            return (
              <tr key={q.slug}>
                <td className="py-2 text-muted">{q.n}</td>
                <td>
                  <Link href={`/admin/quizzes/${q.slug}`} className="font-semibold underline">
                    {q.title}
                  </Link>
                  <span className="ml-2 text-xs text-muted">{q.structure}</span>
                </td>
                <td>
                  <span className={q.status === "live" ? "text-good" : q.status === "reviewed" ? "text-accent" : "text-warn"}>{q.status}</span>
                </td>
                <td className="tabular-nums">{counts.find((c) => c.slug === q.slug)?.n ?? 0}</td>
                <td>{problems.length ? <span className="text-warn">{problems.length} problems</span> : <span className="text-good">clean</span>}</td>
                <td className="text-xs text-muted">{o ? `${o.def ? "edited" : "status"} · ${o.updatedAt.toLocaleDateString("en-US")}` : "code"}</td>
                <td>
                  <StatusButtons slug={q.slug} status={q.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <section>
        <h2 className="font-serif text-2xl">Start a new quiz</h2>
        <p className="mt-1 text-sm text-muted">Pick one from the 100-quiz catalog. You get a template for its structure to fill in; it stays a draft until it passes every check.</p>
        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {unbuilt.map((c) => (
            <li key={c.n}>
              <Link href={`/admin/quizzes/${c.slug}`} className="underline">
                {c.n}. {c.title}
              </Link>{" "}
              <span className="text-xs text-muted">
                {c.structure} · wave {c.wave}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
