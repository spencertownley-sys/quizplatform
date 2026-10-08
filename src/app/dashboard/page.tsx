import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db, t } from "@/db";
import { getQuiz } from "@/content";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ billing?: string }> }) {
  const { userId } = await auth.protect();
  const { billing } = await searchParams;

  const [mine, [sub]] = await Promise.all([
    db().select().from(t.attempts).where(eq(t.attempts.userId, userId)).orderBy(desc(t.attempts.completedAt)).limit(100),
    db().select().from(t.subscriptions).where(eq(t.subscriptions.userId, userId)).orderBy(desc(t.subscriptions.updatedAt)).limit(1),
  ]);

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-4xl">Your results</h1>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="font-semibold">Billing</h2>
        {sub ? (
          <p className="mt-1 text-sm">
            All-Access: {sub.status}
            {sub.currentPeriodEnd && (sub.cancelAtPeriodEnd ? ", ends " : ", renews ")}
            {sub.currentPeriodEnd?.toLocaleDateString("en-US", { dateStyle: "medium" })}
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">No subscription. <Link href="/pricing" className="underline">See All-Access</Link></p>
        )}
        {billing === "none" && <p className="mt-1 text-sm text-muted">No purchases on this account yet.</p>}
        <form action="/api/billing-portal" method="post" className="mt-3">
          <button className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-ink">Manage billing, receipts or cancel</button>
        </form>
      </section>

      <section>
        {mine.length === 0 ? (
          <p className="text-muted">No results yet. <Link href="/" className="underline">Take a quiz</Link></p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {mine.map((a) => {
              const quiz = getQuiz(a.quizSlug);
              const outcome = quiz?.outcomes.find((o) => o.key === a.outcomeKey);
              return (
                <li key={a.id}>
                  <Link href={`/result/${a.id}`} className="block rounded-2xl border border-line bg-white p-4 hover:border-ink">
                    <p className="text-xs text-muted">{quiz?.title ?? a.quizSlug}</p>
                    <p className="font-serif text-xl">{outcome?.name ?? a.outcomeKey}</p>
                    <p className="text-xs text-muted">{a.completedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {/* TODO(P-06): retake trends, compare-with-friends, recommended next quizzes. */}
    </div>
  );
}
