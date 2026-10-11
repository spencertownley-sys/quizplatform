import type { Metadata } from "next";
import Link from "next/link";
import { and, asc, desc, eq, inArray, or } from "drizzle-orm";
import { DeleteAccountButton, RefundButton } from "@/components/actions";
import { Sparkline } from "@/components/Sparkline";
import { Chip, Container, QuizCard } from "@/components/ui";
import { db, t } from "@/db";
import { claimForUser } from "@/lib/access";
import { requireUser } from "@/lib/auth";
import { activeSubscription } from "@/lib/billing";
import type { ScoreResult } from "@/lib/engine/types";
import { fakePayments } from "@/lib/env";
import { REFUND_DAYS } from "@/lib/fulfill";
import { PRODUCTS, type ProductKey, formatCents } from "@/lib/products";
import { listQuizzes } from "@/lib/quizzes";
import { catalog } from "@/content/catalog";
import { getViewer } from "@/lib/viewer";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

const fmt = (d: Date | null | undefined) => d?.toLocaleDateString("en-US", { dateStyle: "medium" }) ?? "";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ billing?: string; welcome?: string; canceled?: string }> }) {
  const user = await requireUser("/dashboard");
  const { billing, welcome, canceled } = await searchParams;
  // Attach anything made in this browser or bought with a verified email (P-05).
  await claimForUser(user.id, user.emails, (await getViewer()).guestId);

  const [attempts, purchases, sub, quizzes] = await Promise.all([
    db().select().from(t.attempts).where(eq(t.attempts.userId, user.id)).orderBy(asc(t.attempts.completedAt)).limit(500),
    db()
      .select()
      .from(t.purchases)
      .where(and(eq(t.purchases.userId, user.id), inArray(t.purchases.status, ["paid", "refunded", "disputed"])))
      .orderBy(desc(t.purchases.paidAt)),
    activeSubscription(user.id),
    listQuizzes(),
  ]);
  const comparisons = attempts.length
    ? await db()
        .select()
        .from(t.comparisons)
        .where(
          or(
            inArray(
              t.comparisons.attemptA,
              attempts.map((a) => a.id),
            ),
            inArray(
              t.comparisons.attemptB,
              attempts.map((a) => a.id),
            ),
          ),
        )
    : [];

  const quizBySlug = new Map(quizzes.map((q) => [q.slug, q]));
  const bySlug = new Map<string, typeof attempts>();
  for (const a of attempts) bySlug.set(a.quizSlug, [...(bySlug.get(a.quizSlug) ?? []), a]);
  const latest = [...bySlug.values()].map((list) => list[list.length - 1]).sort((x, y) => y.completedAt.getTime() - x.completedAt.getTime());

  // Discover: related quizzes of what you've taken, then most-searched, skipping ones you've done.
  const taken = new Set(bySlug.keys());
  const demand = new Map(catalog.map((c) => [c.n, c.searches ?? 0]));
  const suggestions = [
    ...new Set([...latest.flatMap((a) => quizBySlug.get(a.quizSlug)?.related ?? []), ...[...quizzes].sort((x, y) => (demand.get(y.n) ?? 0) - (demand.get(x.n) ?? 0)).map((q) => q.slug)]),
  ]
    .filter((s) => !taken.has(s) && quizBySlug.has(s))
    .slice(0, 3)
    .map((s) => quizBySlug.get(s)!);

  const trendQuizzes = [...bySlug.entries()].filter(([slug, list]) => list.length >= 2 && quizBySlug.get(slug)?.structure !== "performance");
  const reaction = bySlug.get("reaction-time-test") ?? [];

  return (
    <Container wide>
      <div className="space-y-12">
        <header>
          <h1 className="font-serif text-4xl">Your dashboard</h1>
          <p className="mt-1 text-sm text-muted">{user.primaryEmail}</p>
          {welcome && <p className="mt-4 rounded-xl bg-good-soft p-4 text-sm text-good">Welcome to All-Access. Every Deep Report is now unlocked on every quiz you take.</p>}
          {canceled && <p className="mt-4 rounded-xl bg-accent-soft p-4 text-sm">Your plan is cancelled. You keep access until the end of the period you&apos;ve paid for, and you won&apos;t be charged again.</p>}
        </header>

        <section className="rounded-2xl border border-line bg-card p-5">
          <h2 className="font-serif text-2xl">Billing</h2>
          {sub ? (
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <strong>All-Access</strong> · {PRODUCTS.all_access.priceLabel}{" "}
                {sub.cancelAtPeriodEnd ? <Chip tone="warn">Cancels {fmt(sub.currentPeriodEnd)}</Chip> : <Chip tone="good">Active</Chip>}
              </p>
              {!sub.cancelAtPeriodEnd && sub.currentPeriodEnd && (
                <p className="text-muted">
                  Next charge: {PRODUCTS.all_access.priceLabel.replace("/month", "")} on {fmt(sub.currentPeriodEnd)}.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">
              No plan. Reports you buy are one-time. <Link href="/pricing" className="underline">See All-Access</Link>
            </p>
          )}
          {billing === "none" && <p className="mt-2 text-sm text-muted">There are no payments on this account yet.</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {sub && !sub.cancelAtPeriodEnd && (
              <form action={fakePayments() ? "/dev/portal" : "/api/billing-portal"} method={fakePayments() ? "get" : "post"}>
                <input type="hidden" name="intent" value="cancel" />
                <button className="rounded-full border border-ink px-4 py-1.5 text-sm">Cancel plan</button>
              </form>
            )}
            <form action={fakePayments() ? "/dev/portal" : "/api/billing-portal"} method={fakePayments() ? "get" : "post"}>
              <input type="hidden" name="intent" value="manage" />
              <button className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-ink">Receipts and payment method</button>
            </form>
          </div>
          {purchases.length > 0 && (
            <ul className="mt-5 divide-y divide-line border-t border-line text-sm">
              {purchases.map((p) => {
                const q = p.quizSlug ? quizBySlug.get(p.quizSlug) : undefined;
                const refundable = p.status === "paid" && p.product !== "all_access" && p.paidAt && Date.now() - p.paidAt.getTime() < REFUND_DAYS * 86_400_000;
                return (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                    <span>
                      {fmt(p.paidAt)} · {p.variants?.bundleName ?? PRODUCTS[p.product as ProductKey].name}
                      {q ? ` · ${q.title}` : ""} · {formatCents(p.amountCents ?? 0, p.currency ?? "usd")}
                      {p.status !== "paid" && <span className="ml-2 text-muted">({p.status})</span>}
                    </span>
                    {refundable && <RefundButton purchaseId={p.id} label="Refund" />}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-serif text-2xl">Your results</h2>
          {latest.length === 0 ? (
            <p className="mt-2 text-muted">
              No results yet. <Link href="/quizzes" className="underline">Take a quiz</Link>; results from this browser and from your email attach automatically.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((a) => {
                const q = quizBySlug.get(a.quizSlug);
                const o = q?.outcomes.find((x) => x.key === a.outcomeKey);
                const n = bySlug.get(a.quizSlug)!.length;
                return (
                  <li key={a.id}>
                    <Link href={`/result/${a.id}?k=${encodeURIComponent(a.accessToken)}`} className="block h-full rounded-2xl border border-line bg-card p-4 hover:border-ink">
                      <p className="text-xs text-muted">{q?.title ?? a.quizSlug}</p>
                      <p className="mt-1 font-serif text-xl">
                        {o?.emoji} {o?.name ?? a.outcomeKey}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {fmt(a.completedAt)}
                        {n > 1 ? ` · taken ${n} times` : ""}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {trendQuizzes.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl">How you&apos;ve changed</h2>
            <p className="mt-1 text-sm text-muted">Your scores across retakes, oldest to newest.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {trendQuizzes.map(([slug, list]) => {
                const q = quizBySlug.get(slug)!;
                return (
                  <div key={slug} className="rounded-2xl border border-line bg-card p-4">
                    <p className="font-semibold">{q.title}</p>
                    <p className="text-xs text-muted">
                      {fmt(list[0].completedAt)} → {fmt(list[list.length - 1].completedAt)}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {q.dimensions.slice(0, 8).map((d) => {
                        const values = list.map((a) => Math.round(((a.scores as ScoreResult).dimensions[d.key]?.normalized ?? 0) * 100));
                        return (
                          <li key={d.key} className="flex items-center justify-between gap-3 text-sm">
                            <span className="flex-1">{d.label}</span>
                            <Sparkline values={values} label={d.label} />
                            <span className="w-16 text-right tabular-nums text-muted">
                              {values[0]}→{values[values.length - 1]}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {reaction.length > 0 && (
          <section className="rounded-2xl border border-line bg-card p-5">
            <h2 className="font-serif text-2xl">Reaction time history</h2>
            {sub ? (
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <Sparkline values={reaction.map((a) => Math.max(0, Math.min(100, Math.round(((500 - ((a.scores as ScoreResult).total ?? 500)) / 350) * 100))))} label="Speed" width={220} height={48} />
                <span className="text-muted">
                  Best median {Math.min(...reaction.map((a) => (a.scores as ScoreResult).total ?? 9999))} ms over {reaction.length} sessions
                </span>
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Your reaction time history is part of <Link href="/pricing" className="underline">All-Access</Link>. Your latest score is in Your results.
              </p>
            )}
          </section>
        )}

        {comparisons.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl">Compare</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {comparisons.map((c) => (
                <li key={c.id}>
                  <Link href={`/compare/${c.id}?k=${encodeURIComponent(c.accessToken)}`} className="underline">
                    {quizBySlug.get(c.quizSlug)?.title ?? c.quizSlug}
                  </Link>{" "}
                  <span className="text-muted">{c.attemptB ? `· compared ${fmt(c.completedAt)}` : "· waiting for the other person"}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {suggestions.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl">Discover</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {suggestions.map((q) => (
                <QuizCard key={q.slug} quiz={q} emoji={q.outcomes[0]?.emoji} />
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-line pt-6">
          <h2 className="font-serif text-xl">Your data</h2>
          <p className="mt-1 text-sm text-muted">You can delete your account and every result at any time.</p>
          <div className="mt-3">
            <DeleteAccountButton />
          </div>
        </section>
      </div>
    </Container>
  );
}
