import type { ReportModel } from "@/lib/report";
import { Cell, Matrix } from "./Figure";
import { RichText, ScoreBar } from "./ui";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Placeholder copy under the blur. Never the paid text: that isn't sent to unpaid viewers. */
const LOCKED_LINE = "This section continues in your Deep Report, written for your result and your exact scores.";

export function ScoresBlock({ model }: { model: ReportModel }) {
  if (!model.dims.length) return null;
  const unlocked = model.level !== "free";
  if (!unlocked) {
    // Decorative preview: a few blurred placeholder bars, then what the Snapshot adds.
    return (
      <section className="space-y-4">
        <h2 className="font-serif text-2xl">Your scores</h2>
        <div className="locked space-y-4" aria-hidden>
          {model.dims.slice(0, 4).map((d) => (
            <ScoreBar key={d.key} label={d.label} pct={d.pct} low={d.low} high={d.high} />
          ))}
        </div>
        <p className="text-sm text-muted">
          {model.dims.length > 1 ? `All ${model.dims.length} scores` : "Your score"}, with what each one means for you, are in the Snapshot and Deep Report.
        </p>
      </section>
    );
  }
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl">Your scores</h2>
      <div className="space-y-5">
        {model.dims.map((d) => (
          <div key={d.key}>
            <ScoreBar
              label={d.label}
              pct={d.pct}
              low={d.low}
              high={d.high}
              note={d.percentile !== undefined ? `higher than ${d.percentile}% of takers` : undefined}
            />
            {d.full ? <RichText text={d.full} className="mt-2 text-sm text-ink-soft" /> : d.first ? <p className="mt-2 text-sm text-ink-soft">{d.first}</p> : null}
            {d.facets && (
              <div className="mt-3 grid gap-3 border-l-2 border-line pl-4 sm:grid-cols-2">
                {d.facets.map((f) => (
                  <div key={f.key}>
                    <ScoreBar label={f.label} pct={f.pct} />
                    {f.full && <p className="mt-1 text-xs text-ink-soft">{f.full}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {!model.norms && model.quiz.structure !== "screener" && (
        <p className="text-xs text-muted">Percentages show where you fall on each scale. Comparisons with other takers appear once enough people have taken this quiz.</p>
      )}
    </section>
  );
}

export function QuadrantMap({ q }: { q: NonNullable<ReportModel["quadrant"]> }) {
  const corners: [string, string][] = [
    ["low_high", "top-left"],
    ["high_high", "top-right"],
    ["low_low", "bottom-left"],
    ["high_low", "bottom-right"],
  ];
  return (
    <figure className="space-y-2">
      <div className="relative mx-auto aspect-square w-full max-w-sm rounded-2xl border border-line bg-card">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {corners.map(([corner]) => (
            <div key={corner} className={`flex items-center justify-center p-3 text-center text-sm ${q.outcomeCorner === corner ? "bg-accent-soft font-semibold" : "text-muted"}`}>
              {q.corners[corner]}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 border-l border-dashed border-line" style={{ left: `${q.cutoff}%` }} />
        <div className="absolute inset-x-0 border-t border-dashed border-line" style={{ top: `${100 - q.cutoff}%` }} />
        {q.exact && (
          <div
            className="absolute h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-paper bg-ink shadow"
            style={{ left: `${q.x}%`, bottom: `${q.y}%` }}
            aria-label={`You: ${q.xLabel} ${q.x}%, ${q.yLabel} ${q.y}%`}
          />
        )}
      </div>
      <figcaption className="text-center text-xs text-muted">
        → {q.xLabel} · ↑ {q.yLabel}
        {q.exact ? ` · You: ${q.x}% and ${q.y}%` : " · Your exact position is in the Snapshot"}
      </figcaption>
    </figure>
  );
}

export function MatchesBlock({ model }: { model: ReportModel }) {
  if (!model.matches?.length) return null;
  const affiliate = model.matches.some((m) => m.links?.some((l) => l.affiliate));
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl">{model.matches.length > 1 ? "Your matches" : "Your top match"}</h2>
      <ol className="space-y-3">
        {model.matches.map((m, i) => (
          <li key={m.key} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">
                {i + 1}. {m.name}
              </p>
              <span className="text-sm tabular-nums text-muted">{m.pct}% match</span>
            </div>
            {m.colors && (
              <div className="mt-2 flex flex-wrap gap-1">
                {m.colors.map((c) => (
                  <span key={c} className="h-7 w-7 rounded-md ring-1 ring-line" style={{ background: c }} title={c} />
                ))}
              </div>
            )}
            {m.blurb && <p className="mt-2 text-sm text-ink-soft">{m.blurb}</p>}
            {m.facts && (
              <dl className="mt-2 grid gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                {Object.entries(m.facts).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {m.links && m.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                {m.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel={l.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"} className="underline">
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      {affiliate && <p className="text-xs text-muted">Some links are affiliate links: we may earn a small commission at no cost to you. It never changes your results.</p>}
    </section>
  );
}

export function RankingBlock({ model, title = "How you matched every result" }: { model: ReportModel; title?: string }) {
  if (!model.ranking || model.ranking.length < 2) return null;
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="space-y-3">
        {model.ranking.map((r) => (
          <ScoreBar key={r.key} label={r.name} pct={r.pct} />
        ))}
      </div>
      {model.runnerUp && (
        <p className="text-sm text-ink-soft">
          Runner-up: <strong>{model.runnerUp.name}</strong>
          {model.confidence !== undefined && <> · result clarity {model.confidence}%</>}
          {model.runnerUp.summary && <span className="mt-1 block">{model.runnerUp.summary}</span>}
        </p>
      )}
    </section>
  );
}

export function ExtrasBlock({ model }: { model: ReportModel }) {
  if (!model.extras.length && !(model.runnerUp && !model.ranking)) return null;
  return (
    <section className="space-y-4">
      {model.runnerUp && !model.ranking && (
        <p className="text-sm text-ink-soft">
          Runner-up: <strong>{model.runnerUp.name}</strong>
          {model.confidence !== undefined && <> · result clarity {model.confidence}%</>}
          {model.runnerUp.summary && <span className="mt-1 block">{model.runnerUp.summary}</span>}
        </p>
      )}
      {model.extras.map((e) => (
        <div key={e.key} className="rounded-2xl border border-line bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">{e.label}</p>
          <p className="font-serif text-xl">{e.value}</p>
          {e.block && (
            <>
              <h3 className="mt-3 font-semibold">{e.block.title}</h3>
              <RichText text={e.block.body} className="mt-1 text-sm" />
            </>
          )}
        </div>
      ))}
    </section>
  );
}

export function ChartBlock({ model }: { model: ReportModel }) {
  if (!model.chart?.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl">Your chart</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {model.chart.map((c) => (
          <div key={c.body} className="rounded-xl border border-line bg-card p-3">
            <p className="text-xs uppercase tracking-wide text-muted">{cap(c.body)}</p>
            <p className="font-serif text-xl">
              {cap(c.sign)}
              {c.degree !== undefined && <span className="ml-1 text-sm text-muted">{c.degree}°</span>}
            </p>
          </div>
        ))}
      </div>
      {model.chartNote && <p className="text-xs text-muted">{model.chartNote}</p>}
    </section>
  );
}

export function ScreenerBlock({ model, source }: { model: ReportModel; source: string }) {
  const s = model.screener;
  if (!s) return null;
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm text-muted">Your score</p>
        <p className="font-serif text-4xl tabular-nums">
          {s.total} <span className="text-lg text-muted">of {s.max}</span>
        </p>
        <div className="mt-3 h-2 rounded-full bg-line">
          <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.round((s.total / Math.max(1, s.max)) * 100)}%` }} />
        </div>
      </div>
      <SupportResources />
      <p className="text-xs text-muted">{source}</p>
    </section>
  );
}

export function CrisisBanner() {
  return (
    <div role="alert" className="rounded-2xl border-2 border-warn bg-warn-soft p-5">
      <p className="font-semibold text-warn">You mentioned thoughts of being better off dead or hurting yourself.</p>
      <p className="mt-2 text-sm">
        You deserve support right now. In the US, call or text <a href="tel:988" className="font-semibold underline">988</a> (Suicide &amp; Crisis Lifeline, 24/7, free and
        confidential), or text HOME to 741741. Outside the US, find a local helpline at{" "}
        <a href="https://findahelpline.com" className="underline" target="_blank" rel="noopener noreferrer">
          findahelpline.com
        </a>
        . If you might act on these thoughts, call your local emergency number.
      </p>
    </div>
  );
}

export function SupportResources() {
  return (
    <div className="rounded-2xl border border-line bg-card p-5 text-sm">
      <p className="font-semibold">Where to get support</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
        <li>Your primary care doctor or a licensed therapist. Bring this result with you.</li>
        <li>
          US: call or text <a href="tel:988" className="underline">988</a> any time to talk to a trained counselor, free.
        </li>
        <li>
          Outside the US:{" "}
          <a href="https://findahelpline.com" className="underline" target="_blank" rel="noopener noreferrer">
            findahelpline.com
          </a>{" "}
          lists free, confidential services by country.
        </li>
      </ul>
      <p className="mt-2 text-xs text-muted">A screen is not a diagnosis.</p>
    </div>
  );
}

export function PerformanceBlock({ model }: { model: ReportModel }) {
  const p = model.performance;
  if (!p) return null;
  const max = Math.max(...p.trials, 1);
  return (
    <section className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Your score (median)" value={`${p.median} ms`} />
        <Stat label="Best trial" value={`${p.best} ms`} />
        <Stat label="Valid trials" value={`${p.valid} of ${p.trials.length}`} />
      </div>
      <div className="flex h-32 items-end gap-2 rounded-2xl border border-line bg-card p-4" aria-label="Trial times">
        {p.trials.map((t, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t bg-accent" style={{ height: `${Math.max(6, (t / max) * 80)}px` }} />
            <span className="text-xs tabular-nums text-muted">{t}</span>
          </div>
        ))}
      </div>
      {model.norms?.agePercentile && (
        <p className="text-sm">
          Faster than {model.norms.agePercentile.percentile}% of takers aged {model.norms.agePercentile.band} ({model.norms.agePercentile.takers.toLocaleString("en-US")} people).
        </p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-serif text-2xl tabular-nums">{value}</p>
    </div>
  );
}

export function AbilityBlock({ model }: { model: ReportModel }) {
  const a = model.ability;
  if (!a) return null;
  return (
    <section className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Correct" value={`${a.correct} / ${a.total}`} />
        <Stat label="Answered" value={`${a.answered}`} />
        <Stat label="Weighted accuracy" value={`${a.accuracy}%`} />
      </div>
      {model.norms?.estimate ? (
        <p className="rounded-xl bg-accent-soft p-4 text-sm">
          Estimated score <strong>{model.norms.estimate.score}</strong>, likely range {model.norms.estimate.low}–{model.norms.estimate.high}, compared with{" "}
          {model.norms.takers.toLocaleString("en-US")} people who took this test. An online estimate, not a clinical IQ.
        </p>
      ) : (
        <p className="text-xs text-muted">
          We don&apos;t show an IQ-style number yet: an honest estimate needs about 1,000 takers to compare with, plus a stated margin of error. Your band is based on your
          accuracy.
        </p>
      )}
    </section>
  );
}

export function ReviewBlock({ model }: { model: ReportModel }) {
  if (!model.review?.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-2xl">Answer review</h2>
      <ol className="space-y-3">
        {model.review.map((r, i) => (
          <li key={r.id} className={`rounded-2xl border p-4 ${r.right ? "border-good/40 bg-good-soft/40" : "border-line bg-card"}`}>
            <p className="text-sm font-semibold">
              {i + 1}. {r.text} <span className={r.right ? "text-good" : "text-warn"}>{r.right ? "✓ Correct" : r.chosen ? "✗ Incorrect" : "— Skipped"}</span>
            </p>
            {r.figure && (
              <div className="mt-2">
                <Matrix figure={r.figure} size={44} uid={`r-${r.id}`} />
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {r.options.map((o) => (
                <span
                  key={o.id}
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 ring-1 ${o.id === r.correct ? "bg-good-soft ring-good" : o.id === r.chosen ? "bg-warn-soft ring-warn" : "ring-line"}`}
                >
                  {o.figure && <Cell shapes={o.figure} size={32} uid={`r-${r.id}-${o.id}`} />}
                  {o.label}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-ink-soft">{r.explanation}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DeepBlock({ model, previewLine }: { model: ReportModel; previewLine?: ReportModel["previewLine"] }) {
  if (!model.deep.length) return null;
  const full = model.deep.every((s) => s.body);
  return (
    <section className="space-y-6">
      <h2 className="font-serif text-2xl">Your Deep Report</h2>
      {full && model.deep.length > 3 && (
        <nav aria-label="Report contents" className="rounded-2xl border border-line bg-card p-4 text-sm">
          <p className="text-xs uppercase tracking-wide text-muted">In this report</p>
          <ol className="mt-2 list-decimal space-y-0.5 pl-5">
            {model.deep.map((s, i) => (
              <li key={s.title}>
                <a href={`#section-${i + 1}`} className="underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {previewLine && (
        <div className="rounded-xl bg-accent-soft p-4 text-sm">
          <p className="text-xs uppercase tracking-wide text-accent">From your {previewLine.label} score</p>
          <p className="mt-1">{previewLine.text}</p>
        </div>
      )}
      {model.deep.map((s, i) => (
        <div key={s.title} id={`section-${i + 1}`} className="scroll-mt-4">
          <h3 className="font-semibold">{s.title}</h3>
          <p className="mt-1">{s.teaser}</p>
          {s.body ? (
            <RichText text={s.body} className="mt-2 text-ink-soft" />
          ) : (
            <p className="locked mt-1 text-sm" aria-hidden>
              {LOCKED_LINE}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
