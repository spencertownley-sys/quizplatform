import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import { BuyButton } from "@/components/BuyButton";
import { PaymentPoller } from "@/components/PaymentPoller";
import { CompareInvite } from "@/components/actions";
import { Container } from "@/components/ui";
import { db, t } from "@/db";
import { canViewComparison, comparisonUnlocked, isOwner } from "@/lib/access";
import { viewerAge } from "@/lib/age-server";
import { compareResults } from "@/lib/engine/compare";
import type { Answers, ScoreResult } from "@/lib/engine/types";
import { PRODUCTS } from "@/lib/products";
import { getQuiz, onSale, reportMinAge } from "@/lib/quizzes";
import { getViewer } from "@/lib/viewer";

export const metadata: Metadata = { title: "Your comparison", robots: { index: false } };

const pct = (n: number) => Math.round(n * 100);

export default async function ComparePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ k?: string; paid?: string }> }) {
  const [{ id }, { k, paid }] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [c] = await db().select().from(t.comparisons).where(eq(t.comparisons.id, id)).limit(1);
  if (!c) notFound();
  const pair = await db()
    .select()
    .from(t.attempts)
    .where(inArray(t.attempts.id, [c.attemptA, c.attemptB].filter((x): x is string => !!x)));
  const a = pair.find((p) => p.id === c.attemptA);
  const b = pair.find((p) => p.id === c.attemptB) ?? null;
  const viewer = await getViewer();
  if (!a) notFound();
  const ownsA = isOwner(a, viewer);
  const ownsB = !!b && isOwner(b, viewer);
  if (!canViewComparison(c, k, { a: ownsA, b: ownsB })) notFound();
  const quiz = await getQuiz(c.quizSlug);
  if (!quiz?.compare) notFound();
  const other = quiz.compare.other;
  const token = k ?? c.accessToken;

  if (!b) {
    return (
      <Container>
        <h1 className="font-serif text-4xl">Waiting for your {other}</h1>
        <p className="mt-2 text-ink-soft">As soon as they finish the {quiz.title}, your comparison appears here.</p>
        {ownsA && (
          <div className="mt-6">
            <CompareInvite attemptId={a.id} other={other} />
          </div>
        )}
      </Container>
    );
  }

  // From the viewer's side: "you" is whichever half they own.
  const [me, them] = ownsB ? [b, a] : [a, b];
  const meLabel = ownsA || ownsB ? "You" : "Person 1";
  const themLabel = ownsA || ownsB ? `Your ${other}` : "Person 2";
  const outcomeOf = (key: string) => quiz.outcomes.find((o) => o.key === key);
  const cmp = compareResults(quiz, { answers: me.answers as Answers, scores: me.scores as ScoreResult }, { answers: them.answers as Answers, scores: them.scores as ScoreResult });
  const unlocked = await comparisonUnlocked(c, a, b);
  const age = await viewerAge(viewer.guestId);
  const canBuy = onSale(quiz) && age.age !== null && age.age >= reportMinAge(quiz);
  const sorted = [...cmp.dimensions].sort((x, y) => y.match - x.match);
  const strengths = sorted.slice(0, 2);
  const friction = sorted.slice(-2).reverse();

  return (
    <Container>
      <article className="space-y-10">
        <header>
          <Link href={`/quiz/${quiz.slug}`} className="text-xs uppercase tracking-wide text-muted hover:underline">
            {quiz.title}
          </Link>
          <h1 className="mt-1 font-serif text-4xl">Your comparison</h1>
        </header>

        {paid === "1" && !unlocked && <PaymentPoller />}

        <section className="grid gap-4 sm:grid-cols-2">
          {[
            [meLabel, me],
            [themLabel, them],
          ].map(([label, att]) => {
            const at = att as typeof me;
            const o = outcomeOf(at.outcomeKey);
            return (
              <div key={at.id} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs uppercase tracking-wide text-muted">{label as string}</p>
                <p className="mt-2 text-4xl">{o?.emoji}</p>
                <p className="font-serif text-2xl">{o?.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{o?.tagline}</p>
              </div>
            );
          })}
        </section>

        <section className="rounded-3xl bg-ink p-6 text-center text-paper">
          <p className="text-sm opacity-80">Overall match</p>
          <p className="font-serif text-6xl tabular-nums">{pct(cmp.overall)}%</p>
          <p className="mt-1 text-sm opacity-80">{cmp.sameOutcome ? "You got the same result." : "You got different results, which is common and often useful."}</p>
        </section>

        {unlocked ? (
          <>
            <section className="space-y-5">
              <h2 className="font-serif text-2xl">Area by area</h2>
              {cmp.dimensions.map((d) => {
                const copy = quiz.compare!.dimensions[d.key];
                return (
                  <div key={d.key} className="rounded-2xl border border-line bg-card p-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-semibold">{d.label}</h3>
                      <span className="text-sm tabular-nums text-muted">{pct(d.match)}% match</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      {[
                        [meLabel, d.a],
                        [themLabel, d.b],
                      ].map(([l, v]) => (
                        <div key={l as string} className="flex items-center gap-3">
                          <span className="w-28 shrink-0 text-muted">{l as string}</span>
                          <div className="h-2 flex-1 rounded-full bg-line">
                            <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(2, pct(v as number))}%` }} />
                          </div>
                          <span className="w-10 text-right tabular-nums">{pct(v as number)}%</span>
                        </div>
                      ))}
                    </div>
                    {copy && <p className="mt-3 text-sm text-ink-soft">{d.match >= 0.7 ? copy.match : copy.differ}</p>}
                  </div>
                );
              })}
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-good/40 bg-good-soft p-5">
                <h2 className="font-serif text-xl">Where you match</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {strengths.map((d) => (
                    <li key={d.key}>
                      {d.label} ({pct(d.match)}%)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-warn/40 bg-warn-soft p-5">
                <h2 className="font-serif text-xl">Likely friction points</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {friction.map((d) => (
                    <li key={d.key}>
                      {d.label} ({pct(d.match)}%)
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {cmp.gaps.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-serif text-2xl">Statements you see most differently</h2>
                <ul className="space-y-2">
                  {cmp.gaps.slice(0, 6).map((g) => (
                    <li key={g.id} className="rounded-xl border border-line bg-card px-4 py-3 text-sm">
                      “{g.text}”
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted">We don&apos;t show who answered what; ask each other.</p>
              </section>
            )}

            <section className="space-y-3">
              <h2 className="font-serif text-2xl">Conversation prompts</h2>
              {[...friction, ...sorted.filter((d) => !friction.includes(d))].map((d) => {
                const prompts = quiz.compare!.dimensions[d.key]?.prompts ?? [];
                if (!prompts.length) return null;
                return (
                  <div key={d.key}>
                    <h3 className="text-sm font-semibold">{d.label}</h3>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                      {prompts.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          </>
        ) : (
          <section className="rounded-3xl border border-line bg-card p-6">
            <h2 className="font-serif text-2xl">Your full comparison report</h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li>✓ Side-by-side scores on all {cmp.dimensions.length} areas, with what each gap means</li>
              <li>✓ Where you match and your likely friction points</li>
              <li>✓ The statements you see most differently</li>
              <li>✓ Conversation prompts for every area</li>
            </ul>
            {canBuy ? (
              <div className="mt-5 max-w-xs">
                <BuyButton product="comparison" comparisonId={c.id} token={token} slug={quiz.slug} primary label={`Unlock for both of you, ${PRODUCTS.comparison.priceLabel}`} />
                <p className="mt-2 text-xs text-muted">One-time payment. No subscription. Unlocks it for both of you.</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">Comparison reports for this quiz aren&apos;t on sale yet.</p>
            )}
          </section>
        )}
      </article>
    </Container>
  );
}
