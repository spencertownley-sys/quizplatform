"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ClientQuiz } from "@/lib/engine/client";
import { track } from "@/lib/analytics";
import { Cell, Matrix } from "./Figure";
import { ChartForm } from "./ChartForm";
import { ReactionTest } from "./ReactionTest";

type AnswerValue = number | string | string[] | null;
type Answers = Record<string, AnswerValue>;
type Stage = "intro" | "age" | "blocked" | "too_young" | "quiz" | "reveal" | "email" | "submitting";

const AGE_COOKIE = "qp_age";
const readAgeCookie = () => document.cookie.split("; ").find((c) => c.startsWith(`${AGE_COOKIE}=`))?.split("=")[1];

export function QuizRunner({ quiz, minAge, compareToken }: { quiz: ClientQuiz; minAge: number; compareToken?: string }) {
  const router = useRouter();
  // Experiments (email capture before vs. after the result) are assigned per browser on the server.
  const [emailTiming, setEmailTiming] = useState<"before" | "after">("before");
  const [variant, setVariant] = useState("");
  useEffect(() => {
    fetch(`/api/variants?slug=${encodeURIComponent(quiz.slug)}`)
      .then((r) => r.json())
      .then((d: { variants?: { email_timing?: string }; label?: string }) => {
        if (d.variants?.email_timing === "after") setEmailTiming("after");
        setVariant(d.label ?? "");
      })
      .catch(() => {});
  }, [quiz.slug]);
  const storageKey = `qp:answers:${quiz.slug}`;
  const startKey = `qp:start:${quiz.slug}`;
  const total = quiz.questions.length;
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("intro");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leaning, setLeaning] = useState<{ name: string; emoji: string | null } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const submitting = useRef(false);

  // Restore autosaved answers (P-01: a refresh doesn't lose progress).
  useEffect(() => {
    track("quiz_view", { slug: quiz.slug, variant });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as Answers | null;
      const start = Number(localStorage.getItem(startKey));
      if (saved && typeof saved === "object" && Object.keys(saved).length > 0 && total > 0) {
        setAnswers(saved);
        const firstOpen = quiz.questions.findIndex((q) => saved[q.id] === undefined);
        setIndex(firstOpen === -1 ? total - 1 : firstOpen);
        setRevealed(firstOpen > total / 2);
        if (start) setStartedAt(start);
        setStage("quiz");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.slug]);

  const persist = useCallback(
    (next: Answers) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
    },
    [storageKey],
  );

  function begin() {
    const age = readAgeCookie();
    if (age === "under13") return setStage("blocked");
    if (!age) return setStage("age");
    const years = new Date().getFullYear() - Number(age) - 1;
    if (years < minAge) return setStage("too_young");
    startQuiz();
  }

  function startQuiz() {
    setStage("quiz");
    track("quiz_start", { slug: quiz.slug, variant });
    if (quiz.timeLimitSec && !startedAt) {
      const t = Date.now();
      setStartedAt(t);
      setNow(t);
      try {
        localStorage.setItem(startKey, String(t));
      } catch {}
    }
  }

  const submit = useCallback(
    async (final: Answers, withEmail: boolean) => {
      if (submitting.current) return;
      submitting.current = true;
      setStage("submitting");
      setError(null);
      if (withEmail && email) track("email_captured", { slug: quiz.slug, variant });
      track("quiz_complete", { slug: quiz.slug, variant });
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: quiz.slug, answers: final, ...(withEmail && email ? { email, consent } : {}), ...(compareToken ? { compareToken } : {}) }),
      }).catch(() => null);
      const data = res ? await res.json().catch(() => ({})) : {};
      submitting.current = false;
      if (res?.status === 403 && data.error === "age_required") return setStage("age");
      if (res?.status === 403 && data.error === "underage") return setStage("blocked");
      if (!res || !res.ok) {
        setError(data.error ?? "Something went wrong saving your answers. Please try again.");
        setStage(emailTiming === "before" && quiz.questions.length ? "email" : "quiz");
        return;
      }
      try {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(startKey);
      } catch {}
      router.push(data.comparison?.url ?? `/result/${data.id}?k=${encodeURIComponent(data.token)}`);
    },
    [compareToken, consent, email, emailTiming, quiz.questions.length, quiz.slug, router, startKey, storageKey, variant],
  );

  const finish = useCallback(
    (final: Answers) => {
      if (emailTiming === "before") setStage("email");
      else void submit(final, false);
    },
    [emailTiming, submit],
  );

  // Timed tests: a real limit, shown honestly; unanswered items count as wrong.
  const remaining = quiz.timeLimitSec && startedAt ? Math.max(0, quiz.timeLimitSec - Math.floor((now - startedAt) / 1000)) : null;
  useEffect(() => {
    if (!quiz.timeLimitSec || !startedAt || stage !== "quiz") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [quiz.timeLimitSec, startedAt, stage]);
  useEffect(() => {
    if (remaining === 0 && stage === "quiz") finish(answers);
  }, [remaining, stage, answers, finish]);

  const q = quiz.questions[index];
  const answeredCount = useMemo(() => quiz.questions.filter((x) => answers[x.id] !== undefined).length, [answers, quiz.questions]);

  const advancing = useRef(false);
  async function answer(value: AnswerValue) {
    if (advancing.current) return;
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    persist(next);
    track("question_answered", { slug: quiz.slug, index });
    if (index >= total - 1) return finish(next);
    const nextIndex = index + 1;
    // Midpoint micro-reveal: once, right before the long middle. Fetch it before moving on,
    // so it never pops up over a question the taker has already started reading.
    if (quiz.midpointReveal && !revealed && nextIndex === Math.floor(total / 2)) {
      advancing.current = true;
      setRevealed(true);
      const res = await fetch("/api/attempts/preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: quiz.slug, answers: next }),
      }).catch(() => null);
      const data = await res?.json().catch(() => null);
      advancing.current = false;
      if (data?.leaning) {
        setLeaning(data.leaning);
        setStage("reveal");
      }
    }
    setIndex(nextIndex);
  }

  // Number keys pick options on desktop.
  useEffect(() => {
    if (stage !== "quiz" || !q) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.metaKey || e.ctrlKey) return;
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1) return;
      if (q.kind === "likert" || q.kind === "attention") {
        const start = q.scale.start ?? 1;
        if (n <= q.scale.labels.length) void answer(start + n - 1);
      } else if (q.kind === "choice" || q.kind === "ability") {
        const o = q.options[n - 1];
        if (o) void answer(o.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (stage === "intro") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={begin} className="rounded-full bg-ink px-7 py-3.5 text-lg text-paper hover:opacity-90">
          {compareToken ? "Start your half" : "Start the quiz"}
        </button>
        <span className="text-sm text-muted">Free result · no email needed</span>
      </div>
    );
  }

  if (stage === "age") return <AgeGate onDone={(ok) => (ok ? begin() : setStage("blocked"))} />;

  if (stage === "blocked" || stage === "too_young") {
    return (
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-serif text-2xl">Sorry, this one isn&apos;t available to you</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {stage === "blocked" ? "Our quizzes are for people 13 and older." : `This quiz is for people ${minAge} and older. There are plenty of others you can take.`}
        </p>
      </div>
    );
  }

  if (stage === "reveal" && leaning) {
    return (
      <div className="rounded-2xl border border-line bg-card p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">Halfway there</p>
        <p className="mt-3 text-5xl">{leaning.emoji ?? "🔍"}</p>
        <h2 className="mt-3 font-serif text-2xl">So far you&apos;re leaning toward {leaning.name}…</h2>
        <p className="mt-2 text-sm text-ink-soft">The second half often changes things. Keep going to find out for sure.</p>
        <button onClick={() => setStage("quiz")} className="mt-5 rounded-full bg-ink px-6 py-2.5 text-paper">
          Keep going
        </button>
      </div>
    );
  }

  if (stage === "email" || stage === "submitting") {
    return (
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-serif text-2xl">Your result is ready.</h2>
        <p className="mt-2 text-sm text-muted">Want a copy in your inbox? Totally optional.</p>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            void submit(answers, true);
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="qp-email">
              Email
            </label>
            <input
              id="qp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-line px-4 py-2"
            />
            <button disabled={stage === "submitting" || !email} className="rounded-full bg-ink px-5 py-2 text-paper disabled:opacity-50">
              Email me and show result
            </button>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>Also send me a couple of follow-up emails about my result (optional; unsubscribe anytime).</span>
          </label>
        </form>
        <button onClick={() => void submit(answers, false)} disabled={stage === "submitting"} className="mt-4 text-sm text-ink underline">
          {stage === "submitting" ? "Scoring your answers…" : "Skip, just show my result"}
        </button>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>
    );
  }

  // Tools without questions.
  if (quiz.structure === "performance") {
    return <ReactionTest trials={quiz.trials ?? 5} onDone={(t) => void submit(Object.fromEntries(t.map((ms, i) => [`t${i + 1}`, ms])), false)} error={error} />;
  }
  if (quiz.structure === "chart") {
    return <ChartForm places={quiz.places ?? []} onDone={(a) => void submit(a, false)} error={error} />;
  }
  if (!q) return null;

  const pct = Math.round(100 * Math.pow(answeredCount / total, 0.8)); // moves faster early
  // The attention check isn't numbered, so counts match the landing page.
  const shownTotal = quiz.questions.filter((x) => x.kind !== "attention").length;
  const shownNumber = quiz.questions.slice(0, index + 1).filter((x) => x.kind !== "attention").length;
  const selected = answers[q.id];

  return (
    <section aria-live="polite" className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="h-1.5 w-full rounded-full bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progress">
        <div className="h-1.5 rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted">
        <span>{q.kind === "attention" ? "Quick check" : `Question ${shownNumber} of ${shownTotal}`}</span>
        {remaining !== null && (
          <span className={`tabular-nums ${remaining < 60 ? "text-warn" : ""}`} aria-label="Time remaining">
            ⏱ {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
          </span>
        )}
      </div>
      {quiz.instructions && <p className="mt-3 text-sm text-muted">{quiz.instructions}</p>}
      <h2 className="mt-2 font-serif text-2xl leading-snug">{q.text}</h2>
      {q.kind === "ability" && q.figure && (
        <div className="mt-4">
          <Matrix figure={q.figure} size={64} uid={`q-${q.id}`} />
        </div>
      )}

      <div className="mt-6">
        {(q.kind === "likert" || q.kind === "attention") && (
          <div className="grid gap-2">
            {q.scale.labels.map((label, i) => {
              const v = (q.scale.start ?? 1) + i;
              return <Option key={v} label={label} selected={selected === v} onClick={() => void answer(v)} hint={String(i + 1)} />;
            })}
          </div>
        )}
        {q.kind === "choice" && q.display === "tiles" && (
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((o) => (
              <button
                key={o.id}
                onClick={() => void answer(o.id)}
                aria-pressed={selected === o.id}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition ${
                  selected === o.id ? "border-accent bg-accent-soft" : "border-line hover:border-ink"
                }`}
              >
                <span className="text-5xl leading-none">{o.emoji}</span>
                <span className="text-sm">{o.label}</span>
              </button>
            ))}
          </div>
        )}
        {q.kind === "choice" && q.display !== "tiles" && (
          <div className="grid gap-2">
            {q.options.map((o, i) => (
              <Option key={o.id} label={o.label} emoji={o.emoji} selected={selected === o.id} onClick={() => void answer(o.id)} hint={String(i + 1)} />
            ))}
          </div>
        )}
        {q.kind === "multi" && <MultiPick key={q.id} options={q.options} max={q.max} initial={Array.isArray(selected) ? selected : []} onDone={(ids) => void answer(ids)} />}
        {q.kind === "ability" && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {q.options.map((o) => (
              <button
                key={o.id}
                onClick={() => void answer(o.id)}
                aria-pressed={selected === o.id}
                className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${selected === o.id ? "border-accent bg-accent-soft" : "border-line hover:border-ink"}`}
              >
                {o.figure && <Cell shapes={o.figure} size={56} uid={`q-${q.id}-${o.id}`} />}
                <span className="text-sm">{o.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        {index > 0 ? (
          <button onClick={() => setIndex(index - 1)} className="text-muted underline">
            Back
          </button>
        ) : (
          <span />
        )}
        {q.kind === "ability" && (
          <button onClick={() => void answer(null)} className="text-muted underline">
            Skip
          </button>
        )}
      </div>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  );
}

function Option({ label, emoji, selected, onClick, hint }: { label: string; emoji?: string; selected: boolean; onClick: () => void; hint?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${selected ? "border-accent bg-accent-soft" : "border-line hover:border-ink"}`}
    >
      {emoji && <span className="text-xl">{emoji}</span>}
      <span className="flex-1">{label}</span>
      {hint && <kbd className="hidden text-xs text-muted sm:inline">{hint}</kbd>}
    </button>
  );
}

function MultiPick({
  options,
  max,
  initial,
  onDone,
}: {
  options: { id: string; label: string; emoji?: string }[];
  max: number;
  initial: string[];
  onDone: (ids: string[]) => void;
}) {
  const [picked, setPicked] = useState<string[]>(initial);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= max ? p : [...p, id]));
  return (
    <div>
      <p className="mb-2 text-xs text-muted">Pick up to {max}.</p>
      <div className="grid gap-2">
        {options.map((o) => (
          <Option key={o.id} label={o.label} emoji={o.emoji} selected={picked.includes(o.id)} onClick={() => toggle(o.id)} />
        ))}
      </div>
      <button disabled={picked.length === 0} onClick={() => onDone(picked)} className="mt-4 rounded-full bg-ink px-5 py-2 text-paper disabled:opacity-40">
        Next
      </button>
    </div>
  );
}

/** Neutral age screen: a birth-year picker with no hint of the "right" answer. */
function AgeGate({ onDone }: { onDone: (ok: boolean) => void }) {
  const [year, setYear] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => thisYear - i);
  return (
    <form
      className="rounded-2xl border border-line bg-card p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!year) return;
        setBusy(true);
        const res = await fetch("/api/age", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ birthYear: Number(year) }) });
        setBusy(false);
        if (res.ok) return onDone(true);
        if (res.status === 403) return onDone(false);
        setErr("Please pick a year.");
      }}
    >
      <h2 className="font-serif text-2xl">One quick question first</h2>
      <label htmlFor="qp-year" className="mt-2 block text-sm text-ink-soft">
        What year were you born?
      </label>
      <div className="mt-3 flex gap-3">
        <select id="qp-year" value={year} onChange={(e) => setYear(e.target.value)} className="rounded-full border border-line bg-card px-4 py-2">
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button disabled={!year || busy} className="rounded-full bg-ink px-5 py-2 text-paper disabled:opacity-40">
          Continue
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">We ask once, so we can show you quizzes and reports suited to your age. It&apos;s never shown to anyone.</p>
      {err && <p className="mt-2 text-sm text-red-700">{err}</p>}
    </form>
  );
}
