"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChoiceOption, Dimension, Outcome, Question, QuizDefinition } from "@/lib/engine/types";

type Tab = "basics" | "questions" | "dimensions" | "outcomes" | "seo" | "json";

const input = "w-full rounded-lg border border-line bg-card px-3 py-1.5 text-sm";
const area = `${input} min-h-[80px] font-[inherit]`;

/**
 * Admin CMS editor (P-14). Edits a copy of the definition; Save runs the same lint
 * and scoring simulation as the test suite on the server. Structure-specific config
 * (bands, catalogs, axes, figures) is edited in the JSON tab.
 */
export function QuizEditor({ initial, hasOverride, hasCode, initialProblems }: { initial: QuizDefinition; hasOverride: boolean; hasCode: boolean; initialProblems: string[] }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizDefinition>(initial);
  const [tab, setTab] = useState<Tab>("basics");
  const [json, setJson] = useState(() => JSON.stringify(initial, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [problems, setProblems] = useState<string[]>(initialProblems);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  const edit = (fn: (q: QuizDefinition) => void) => {
    setQuiz((prev) => {
      const next = structuredClone(prev);
      fn(next);
      setJson(JSON.stringify(next, null, 2));
      return next;
    });
    setDirty(true);
  };

  async function call(body: object) {
    setBusy(true);
    setMessage(null);
    const r = await fetch(`/api/admin/quizzes/${initial.slug}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    const list = [...(d.problems ?? []), ...(d.unreachable?.length ? [`Never produced in simulation: ${d.unreachable.join(", ")}`] : [])];
    setProblems(list);
    if (!r.ok) setMessage(d.error ?? "Save failed");
    else {
      setMessage(list.length ? "Saved as draft. Fix the problems below before publishing." : "Saved. No problems found.");
      setDirty(false);
      router.refresh();
    }
  }

  const dimKeys = quiz.dimensions.map((d) => d.key);

  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-line bg-paper py-3">
        {(["basics", "questions", "dimensions", "outcomes", "seo", "json"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-sm capitalize ${tab === t ? "bg-ink text-paper" : "border border-line"}`}>
            {t === "json" ? "JSON (advanced)" : t}
          </button>
        ))}
        <span className="ml-auto flex gap-2">
          <button disabled={busy} onClick={() => call({ action: "save", definition: quiz })} className="rounded-full bg-ink px-4 py-1.5 text-sm text-paper disabled:opacity-50">
            {busy ? "Saving…" : dirty ? "Save changes" : "Save"}
          </button>
          {hasOverride && hasCode && (
            <button
              disabled={busy}
              onClick={() => confirm("Discard admin edits and go back to the version in code?") && call({ action: "reset" })}
              className="rounded-full border border-line px-4 py-1.5 text-sm"
            >
              Reset to code
            </button>
          )}
        </span>
      </div>

      {message && <p className="rounded-xl bg-accent-soft p-3 text-sm">{message}</p>}
      {problems.length > 0 && (
        <details open className="rounded-xl bg-warn-soft p-3 text-sm">
          <summary className="cursor-pointer font-semibold text-warn">{problems.length} problems (a quiz can go live only with none)</summary>
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {problems.slice(0, 80).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </details>
      )}

      {tab === "basics" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <input className={input} value={quiz.title} onChange={(e) => edit((q) => void (q.title = e.target.value))} />
          </Field>
          <Field label="Tagline (cards)">
            <input className={input} value={quiz.tagline} onChange={(e) => edit((q) => void (q.tagline = e.target.value))} />
          </Field>
          <Field label="Description (landing page, search results)" wide>
            <textarea className={area} value={quiz.description} onChange={(e) => edit((q) => void (q.description = e.target.value))} />
          </Field>
          <Field label="Disclaimer" wide>
            <textarea className={area} value={quiz.disclaimer ?? ""} onChange={(e) => edit((q) => void (q.disclaimer = e.target.value || undefined))} />
          </Field>
          <Field label="Instructions above every item (optional)" wide>
            <input className={input} value={quiz.instructions ?? ""} onChange={(e) => edit((q) => void (q.instructions = e.target.value || undefined))} />
          </Field>
          <Field label="Minutes">
            <input type="number" min={1} className={input} value={quiz.minutes} onChange={(e) => edit((q) => void (q.minutes = Number(e.target.value)))} />
          </Field>
          <Field label="Minimum age to take">
            <select className={input} value={quiz.minAge} onChange={(e) => edit((q) => void (q.minAge = Number(e.target.value) as 13 | 18))}>
              <option value={13}>13+</option>
              <option value={18}>18+</option>
            </select>
          </Field>
          <Field label="Paywall mode">
            <select className={input} value={quiz.paywall} onChange={(e) => edit((q) => void (q.paywall = e.target.value as QuizDefinition["paywall"]))} disabled={quiz.isScreener}>
              <option value="free_headline">Free headline result + paid depth (default)</option>
              <option value="full">Full paywall (result behind purchase)</option>
              <option value="ab">A/B test: half get each</option>
            </select>
          </Field>
          <Field label="Status (Publish from the list or here, then Save)">
            <select className={input} value={quiz.status} onChange={(e) => edit((q) => void (q.status = e.target.value as QuizDefinition["status"]))}>
              <option value="draft">Draft (free results only)</option>
              <option value="reviewed">Reviewed</option>
              <option value="live">Live (sells reports)</option>
            </select>
          </Field>
          <Field label="How scoring works (closes the Deep Report)" wide>
            <textarea className={`${area} min-h-[140px]`} value={quiz.method} onChange={(e) => edit((q) => void (q.method = e.target.value))} />
          </Field>
          <Field label="Reviewer notes (internal)" wide>
            <textarea className={area} value={quiz.reviewNotes ?? ""} onChange={(e) => edit((q) => void (q.reviewNotes = e.target.value || undefined))} />
          </Field>
        </div>
      )}

      {tab === "questions" && (
        <div className="space-y-3">
          {quiz.questions.length === 0 && <p className="text-sm text-muted">This structure has no questions (tool or calculator).</p>}
          {quiz.questions.map((qq, i) => (
            <div key={`${qq.id}-${i}`} className="rounded-xl border border-line bg-card p-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="font-mono">{qq.id}</span>
                <span>{qq.kind}</span>
                <span className="ml-auto flex gap-2">
                  <button disabled={i === 0} onClick={() => edit((q) => void q.questions.splice(i - 1, 0, ...q.questions.splice(i, 1)))}>
                    ↑
                  </button>
                  <button disabled={i === quiz.questions.length - 1} onClick={() => edit((q) => void q.questions.splice(i + 1, 0, ...q.questions.splice(i, 1)))}>
                    ↓
                  </button>
                  <button className="text-red-700" onClick={() => edit((q) => void q.questions.splice(i, 1))}>
                    Delete
                  </button>
                </span>
              </div>
              <input className={`${input} mt-2`} value={qq.text} onChange={(e) => edit((q) => void (q.questions[i].text = e.target.value))} />
              <p className="mt-1 text-xs text-muted">{qq.text.trim().split(/\s+/).length} words</p>
              {qq.kind === "likert" && (
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <select className="rounded-lg border border-line px-2 py-1" value={qq.dimension} onChange={(e) => edit((q) => void ((q.questions[i] as typeof qq).dimension = e.target.value))}>
                    {dimKeys.map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" checked={!!qq.reverse} onChange={(e) => edit((q) => void ((q.questions[i] as typeof qq).reverse = e.target.checked || undefined))} /> reverse-keyed
                  </label>
                </div>
              )}
              {(qq.kind === "choice" || qq.kind === "multi") && <OptionsEditor options={qq.options} dims={dimKeys} onChange={(opts) => edit((q) => void ((q.questions[i] as typeof qq).options = opts))} />}
              {(qq.kind === "ability" || qq.kind === "attention") && <p className="mt-2 text-xs text-muted">Edit options, answers and figures for this item in the JSON tab.</p>}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              className="rounded-full border border-line px-3 py-1 text-sm"
              onClick={() => edit((q) => void q.questions.push({ id: nextId(q.questions), kind: "likert", text: "New statement", dimension: dimKeys[0] ?? "" } as Question))}
            >
              + Agree/disagree item
            </button>
            <button
              className="rounded-full border border-line px-3 py-1 text-sm"
              onClick={() =>
                edit((q) =>
                  void q.questions.push({
                    id: nextId(q.questions),
                    kind: "choice",
                    text: "New question",
                    options: [
                      { id: "a", label: "Option A", weights: { [dimKeys[0] ?? "a"]: 1 } },
                      { id: "b", label: "Option B", weights: { [dimKeys[1] ?? dimKeys[0] ?? "a"]: 1 } },
                    ],
                  }),
                )
              }
            >
              + Pick-one item
            </button>
          </div>
        </div>
      )}

      {tab === "dimensions" && (
        <div className="space-y-3">
          {quiz.dimensions.map((d, i) => (
            <DimensionEditor key={`${d.key}-${i}`} d={d} onChange={(nd) => edit((q) => void (q.dimensions[i] = nd))} />
          ))}
          <p className="text-xs text-muted">Add or rename dimensions in the JSON tab (keys are referenced by items, outcomes and config).</p>
        </div>
      )}

      {tab === "outcomes" && (
        <div className="space-y-4">
          {quiz.outcomes.map((o, i) => (
            <OutcomeEditor key={`${o.key}-${i}`} o={o} onChange={(no) => edit((q) => void (q.outcomes[i] = no))} />
          ))}
        </div>
      )}

      {tab === "seo" && (
        <div className="grid gap-4">
          {(["intro", "measures", "origin"] as const).map((k) => (
            <Field key={k} label={k === "intro" ? "Intro paragraph" : k === "measures" ? "What it measures" : "Origin and limits"} wide>
              <textarea className={`${area} min-h-[120px]`} value={quiz.seo[k]} onChange={(e) => edit((q) => void (q.seo[k] = e.target.value))} />
            </Field>
          ))}
          <div className="space-y-2">
            <p className="text-sm font-semibold">FAQs</p>
            {quiz.seo.faqs.map((f, i) => (
              <div key={i} className="grid gap-2 rounded-xl border border-line bg-card p-3">
                <input className={input} value={f.q} onChange={(e) => edit((q) => void (q.seo.faqs[i].q = e.target.value))} />
                <textarea className={area} value={f.a} onChange={(e) => edit((q) => void (q.seo.faqs[i].a = e.target.value))} />
                <button className="justify-self-end text-xs text-red-700" onClick={() => edit((q) => void q.seo.faqs.splice(i, 1))}>
                  Delete
                </button>
              </div>
            ))}
            <button className="rounded-full border border-line px-3 py-1 text-sm" onClick={() => edit((q) => void q.seo.faqs.push({ q: "New question?", a: "Answer." }))}>
              + FAQ
            </button>
          </div>
          <Field label="Target keywords (comma-separated; internal, never shown)" wide>
            <input className={input} value={quiz.seo.keywords.join(", ")} onChange={(e) => edit((q) => void (q.seo.keywords = e.target.value.split(",").map((s) => s.trim()).filter(Boolean)))} />
          </Field>
        </div>
      )}

      {tab === "json" && (
        <div className="space-y-2">
          <textarea
            className="h-[70vh] w-full rounded-xl border border-line bg-card p-3 font-mono text-xs"
            value={json}
            spellCheck={false}
            onChange={(e) => {
              setJson(e.target.value);
              setJsonError(null);
            }}
          />
          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-ink px-4 py-1.5 text-sm"
              onClick={() => {
                try {
                  const parsed = JSON.parse(json) as QuizDefinition;
                  setQuiz(parsed);
                  setDirty(true);
                  setJsonError(null);
                  setMessage("JSON applied. Save to check and store it.");
                } catch (e) {
                  setJsonError((e as Error).message);
                }
              }}
            >
              Apply JSON
            </button>
            {jsonError && <span className="text-sm text-red-700">{jsonError}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

const nextId = (qs: Question[]) => {
  let n = qs.length + 1;
  while (qs.some((q) => q.id === `q${n}`)) n++;
  return `q${n}`;
};

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`block space-y-1 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

function OptionsEditor({ options, dims, onChange }: { options: ChoiceOption[]; dims: string[]; onChange: (o: ChoiceOption[]) => void }) {
  const set = (i: number, patch: Partial<ChoiceOption>) => onChange(options.map((o, j) => (j === i ? { ...o, ...patch } : o)));
  return (
    <div className="mt-2 space-y-1">
      {options.map((o, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2 text-sm">
          <span className="w-5 font-mono text-xs text-muted">{o.id}</span>
          <input className="w-12 rounded-lg border border-line px-2 py-1" value={o.emoji ?? ""} placeholder="🙂" onChange={(e) => set(i, { emoji: e.target.value || undefined })} />
          <input className="min-w-[200px] flex-1 rounded-lg border border-line px-2 py-1" value={o.label} onChange={(e) => set(i, { label: e.target.value })} />
          <WeightsInput weights={o.weights} dims={dims} onChange={(w) => set(i, { weights: w })} />
          <button className="text-xs text-red-700" onClick={() => onChange(options.filter((_, j) => j !== i))}>
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-xs underline"
        onClick={() => onChange([...options, { id: String.fromCharCode(97 + options.length), label: "New option", weights: { [dims[0] ?? "a"]: 1 } }])}
      >
        + option
      </button>
    </div>
  );
}

/** "dim:points, dim:points" */
function WeightsInput({ weights, dims, onChange }: { weights: Record<string, number>; dims: string[]; onChange: (w: Record<string, number>) => void }) {
  const [text, setText] = useState(() => Object.entries(weights).map(([k, v]) => `${k}:${v}`).join(", "));
  const [bad, setBad] = useState(false);
  return (
    <input
      className={`w-56 rounded-lg border px-2 py-1 font-mono text-xs ${bad ? "border-red-700" : "border-line"}`}
      value={text}
      title={`Weights as dimension:points. Dimensions: ${dims.join(", ")}`}
      onChange={(e) => {
        setText(e.target.value);
        const entries = e.target.value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => s.split(":").map((x) => x.trim()));
        const ok = entries.every(([k, v]) => dims.includes(k) && v !== undefined && !Number.isNaN(Number(v)));
        setBad(!ok);
        if (ok) onChange(Object.fromEntries(entries.map(([k, v]) => [k, Number(v)])));
      }}
    />
  );
}

function DimensionEditor({ d, onChange }: { d: Dimension; onChange: (d: Dimension) => void }) {
  const report = d.report ?? { low: "", mid: "", high: "" };
  return (
    <div className="grid gap-2 rounded-xl border border-line bg-card p-3 sm:grid-cols-4">
      <p className="font-mono text-xs text-muted sm:col-span-4">{d.key}</p>
      <input className={input} value={d.label} placeholder="Label" onChange={(e) => onChange({ ...d, label: e.target.value })} />
      <input className={input} value={d.low ?? ""} placeholder="Low pole" onChange={(e) => onChange({ ...d, low: e.target.value || undefined })} />
      <input className={input} value={d.high ?? ""} placeholder="High pole" onChange={(e) => onChange({ ...d, high: e.target.value || undefined })} />
      <input className={input} value={d.description ?? ""} placeholder="What it measures" onChange={(e) => onChange({ ...d, description: e.target.value || undefined })} />
      {(["low", "mid", "high"] as const).map((b) => (
        <label key={b} className="block sm:col-span-4">
          <span className="text-xs text-muted">Report text when the score is {b}</span>
          <textarea className={area} value={report[b]} onChange={(e) => onChange({ ...d, report: { ...report, [b]: e.target.value } })} />
        </label>
      ))}
    </div>
  );
}

function OutcomeEditor({ o, onChange }: { o: Outcome; onChange: (o: Outcome) => void }) {
  return (
    <details className="rounded-xl border border-line bg-card p-3">
      <summary className="cursor-pointer font-semibold">
        {o.emoji} {o.name} <span className="font-mono text-xs text-muted">{o.key}</span>
      </summary>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <input className={input} value={o.name} placeholder="Name" onChange={(e) => onChange({ ...o, name: e.target.value })} />
        <input className={input} value={o.emoji ?? ""} placeholder="Emoji" onChange={(e) => onChange({ ...o, emoji: e.target.value || undefined })} />
        <input className={input} value={o.tagline} placeholder="Tagline" onChange={(e) => onChange({ ...o, tagline: e.target.value })} />
        <label className="sm:col-span-3">
          <span className="text-xs text-muted">Free summary (2–3 sentences)</span>
          <textarea className={area} value={o.summary} onChange={(e) => onChange({ ...o, summary: e.target.value })} />
        </label>
        <label className="sm:col-span-3">
          <span className="text-xs text-muted">Public SEO description (150–300 words)</span>
          <textarea className={`${area} min-h-[120px]`} value={o.about} onChange={(e) => onChange({ ...o, about: e.target.value })} />
        </label>
        <label className="sm:col-span-3">
          <span className="text-xs text-muted">Snapshot points (one per line)</span>
          <textarea className={area} value={o.snapshot.join("\n")} onChange={(e) => onChange({ ...o, snapshot: e.target.value.split("\n").filter((l) => l.trim()) })} />
        </label>
      </div>
      <div className="mt-3 space-y-2">
        <p className="text-xs font-semibold text-muted">Deep Report sections</p>
        {o.deep.map((s, i) => (
          <div key={i} className="space-y-1 rounded-lg border border-line p-2">
            <input className={input} value={s.title} placeholder="Title" onChange={(e) => onChange({ ...o, deep: o.deep.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
            <textarea className={area} value={s.teaser} placeholder="Teaser (shown unblurred)" onChange={(e) => onChange({ ...o, deep: o.deep.map((x, j) => (j === i ? { ...x, teaser: e.target.value } : x)) })} />
            <textarea className={`${area} min-h-[160px]`} value={s.body} placeholder="Body" onChange={(e) => onChange({ ...o, deep: o.deep.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)) })} />
            <button className="text-xs text-red-700" onClick={() => onChange({ ...o, deep: o.deep.filter((_, j) => j !== i) })}>
              Delete section
            </button>
          </div>
        ))}
        <button className="text-xs underline" onClick={() => onChange({ ...o, deep: [...o.deep, { title: "New section", teaser: "", body: "" }] })}>
          + section
        </button>
      </div>
    </details>
  );
}
