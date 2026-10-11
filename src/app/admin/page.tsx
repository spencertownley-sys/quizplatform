import Link from "next/link";
import { and, gte, inArray, sql } from "drizzle-orm";
import { db, t } from "@/db";
import { formatCents } from "@/lib/products";
import { listQuizzes } from "@/lib/quizzes";

/**
 * "What to measure" from the requirements doc: start rate, completion rate,
 * paywall view-to-checkout, purchase conversion, AOV, subscription attach,
 * refund and chargeback rate. Funnel counts come from first-party daily counters;
 * money comes from the purchases table.
 */
export default async function AdminMetrics({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const days = Math.min(365, Math.max(1, Number((await searchParams).days ?? 30) || 30));
  const since = new Date(Date.now() - days * 86_400_000);
  const sinceDay = since.toISOString().slice(0, 10);

  const [funnel, money, subs, quizzes, byVariant] = await Promise.all([
    db()
      .select({ quiz: t.funnelDaily.quizSlug, event: t.funnelDaily.event, n: sql<number>`sum(${t.funnelDaily.count})::int` })
      .from(t.funnelDaily)
      .where(gte(t.funnelDaily.day, sinceDay))
      .groupBy(t.funnelDaily.quizSlug, t.funnelDaily.event),
    db()
      .select({
        quiz: t.purchases.quizSlug,
        status: t.purchases.status,
        product: t.purchases.product,
        n: sql<number>`count(*)::int`,
        cents: sql<number>`coalesce(sum(${t.purchases.amountCents}), 0)::int`,
        buyers: sql<number>`count(distinct coalesce(${t.purchases.userId}, ${t.purchases.guestSessionId}::text))::int`,
      })
      .from(t.purchases)
      .where(and(inArray(t.purchases.status, ["paid", "refunded", "disputed"]), gte(t.purchases.paidAt, since)))
      .groupBy(t.purchases.quizSlug, t.purchases.status, t.purchases.product),
    db()
      .select({ status: t.subscriptions.status, n: sql<number>`count(*)::int` })
      .from(t.subscriptions)
      .groupBy(t.subscriptions.status),
    listQuizzes(),
    db()
      .select({ variant: t.funnelDaily.variant, event: t.funnelDaily.event, n: sql<number>`sum(${t.funnelDaily.count})::int` })
      .from(t.funnelDaily)
      .where(and(gte(t.funnelDaily.day, sinceDay), inArray(t.funnelDaily.event, ["result_view", "paywall_view", "checkout_start", "purchase", "quiz_complete"])))
      .groupBy(t.funnelDaily.variant, t.funnelDaily.event),
  ]);

  const ev = (quiz: string | null, e: string) => funnel.filter((f) => (quiz === null || f.quiz === quiz) && f.event === e).reduce((s, f) => s + f.n, 0);
  const one = money.filter((m) => m.product !== "all_access");
  const paidRows = (quiz: string | null) => one.filter((m) => (quiz === null || m.quiz === quiz) && m.status !== "refunded" && m.status !== "disputed");
  const count = (rows: typeof money) => rows.reduce((s, m) => s + m.n, 0);
  const cents = (rows: typeof money) => rows.reduce((s, m) => s + m.cents, 0);
  const rate = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1)}%` : "—");
  const allPurchases = count(one);
  const refunds = count(one.filter((m) => m.status === "refunded"));
  const disputes = count(money.filter((m) => m.status === "disputed"));
  const buyers = one.reduce((s, m) => s + m.buyers, 0);
  const activeSubs = subs.filter((s) => ["active", "trialing", "past_due"].includes(s.status)).reduce((s, x) => s + x.n, 0);
  const newSubs = count(money.filter((m) => m.product === "all_access"));

  const rows = [...quizzes.map((q) => ({ slug: q.slug as string | null, title: q.title })), { slug: null, title: "All quizzes" }];
  const variants = [...new Set(byVariant.map((v) => v.variant))].sort();

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-serif text-3xl">Metrics, last {days} days</h1>
        <div className="flex gap-3 text-sm">
          {[7, 30, 90].map((d) => (
            <Link key={d} href={`/admin?days=${d}`} className={d === days ? "font-semibold underline" : "underline"}>
              {d} days
            </Link>
          ))}
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Revenue (one-time)" value={formatCents(cents(paidRows(null)))} />
        <Kpi label="Purchase conversion" value={rate(count(paidRows(null)), ev(null, "quiz_complete"))} hint="purchases / completions" />
        <Kpi label="Average order" value={allPurchases ? formatCents(Math.round(cents(paidRows(null)) / Math.max(1, count(paidRows(null))))) : "—"} />
        <Kpi label="Active All-Access" value={String(activeSubs)} hint={`${newSubs} new; attach ${rate(newSubs, buyers)}`} />
        <Kpi label="Refund rate" value={rate(refunds, allPurchases)} />
        <Kpi label="Chargeback rate" value={rate(disputes, allPurchases + newSubs)} hint="keep well under 0.5%" warn={allPurchases > 0 && disputes / (allPurchases + newSubs) >= 0.005} />
      </section>

      <section className="overflow-x-auto">
        <h2 className="mb-3 font-serif text-2xl">Funnel by quiz</h2>
        <table className="w-full min-w-[900px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2">Quiz</th>
              <th>Views</th>
              <th>Start rate</th>
              <th>Completion</th>
              <th>Paywall views</th>
              <th>View → checkout</th>
              <th>Purchases</th>
              <th>Conversion</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => {
              const views = ev(r.slug, "quiz_view");
              const starts = ev(r.slug, "quiz_start");
              const completes = ev(r.slug, "quiz_complete");
              const pw = ev(r.slug, "paywall_view");
              const co = ev(r.slug, "checkout_start");
              const p = paidRows(r.slug);
              return (
                <tr key={r.slug ?? "all"} className={r.slug === null ? "font-semibold" : ""}>
                  <td className="py-2">{r.title}</td>
                  <td>{views}</td>
                  <td>{rate(starts, views)}</td>
                  <td>{rate(completes, starts)}</td>
                  <td>{pw}</td>
                  <td>{rate(co, pw)}</td>
                  <td>{count(p)}</td>
                  <td>{rate(count(p), completes)}</td>
                  <td>{formatCents(cents(p))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="overflow-x-auto">
        <h2 className="mb-1 font-serif text-2xl">Experiments</h2>
        <p className="mb-3 text-sm text-muted">Rows are variant combinations (empty = control / no test). Turn tests on with the EXPERIMENTS env var; paywall tests are per quiz (paywall mode &quot;ab&quot;).</p>
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2">Variant</th>
              <th>Completions</th>
              <th>Paywall views</th>
              <th>Checkouts</th>
              <th>Purchases</th>
              <th>View → checkout</th>
              <th>Purchase / completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {variants.map((v) => {
              const n = (e: string) => byVariant.filter((x) => x.variant === v && x.event === e).reduce((s, x) => s + x.n, 0);
              return (
                <tr key={v}>
                  <td className="py-2 font-mono text-xs">{v || "(control)"}</td>
                  <td>{n("quiz_complete")}</td>
                  <td>{n("paywall_view")}</td>
                  <td>{n("checkout_start")}</td>
                  <td>{n("purchase")}</td>
                  <td>{rate(n("checkout_start"), n("paywall_view"))}</td>
                  <td>{rate(n("purchase"), n("quiz_complete"))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Kpi({ label, value, hint, warn }: { label: string; value: string; hint?: string; warn?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${warn ? "border-warn bg-warn-soft" : "border-line bg-card"}`}>
      <p className="text-xs text-muted">{label}</p>
      <p className="font-serif text-2xl tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

