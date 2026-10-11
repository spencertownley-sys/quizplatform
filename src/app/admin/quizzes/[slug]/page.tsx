import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, t } from "@/db";
import { catalog } from "@/content/catalog";
import { codeQuizzes } from "@/content/quizzes/_registry";
import { checkQuiz } from "@/lib/admin";
import { getQuiz } from "@/lib/quizzes";
import { quizTemplate } from "@/lib/templates";
import { QuizEditor } from "./QuizEditor";

export default async function EditQuiz({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const existing = await getQuiz(slug);
  const entry = catalog.find((c) => c.slug === slug);
  if (!existing && !entry) notFound();
  const definition = existing ?? quizTemplate(entry!);
  const [override] = await db().select().from(t.quizOverrides).where(eq(t.quizOverrides.slug, slug)).limit(1);
  const check = checkQuiz(definition);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <Link href="/admin/quizzes" className="text-sm text-muted underline">
            ← Quizzes
          </Link>
          <h1 className="mt-1 font-serif text-3xl">{definition.title}</h1>
          <p className="text-sm text-muted">
            {definition.structure} · {definition.status}
            {existing ? "" : " · new (not saved yet)"}
            {override ? ` · edited by ${override.updatedBy ?? "admin"} on ${override.updatedAt.toLocaleString("en-US")}` : " · code version"}
          </p>
        </div>
        {existing && (
          <Link href={`/quiz/${slug}`} target="_blank" className="text-sm underline">
            Open the live page ↗
          </Link>
        )}
      </header>
      {definition.reviewNotes && (
        <div className="rounded-xl bg-warn-soft p-4 text-sm">
          <p className="font-semibold text-warn">Reviewer notes</p>
          <p className="mt-1 whitespace-pre-line">{definition.reviewNotes}</p>
        </div>
      )}
      <QuizEditor
        initial={definition}
        hasOverride={!!override?.definition}
        hasCode={codeQuizzes.some((q) => q.slug === slug)}
        initialProblems={[...check.problems, ...(check.unreachable.length ? [`Never produced in simulation: ${check.unreachable.join(", ")}`] : []), ...(check.error ? [check.error] : [])]}
      />
    </div>
  );
}
