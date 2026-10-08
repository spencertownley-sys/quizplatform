"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";

type Q =
  | { id: string; kind: "likert"; text: string }
  | { id: string; kind: "choice"; text: string; options: { id: string; label: string }[] };

const LIKERT_LABELS: Record<number, string[]> = {
  5: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
  7: ["Strongly disagree", "Disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Agree", "Strongly agree"],
};

export function QuizRunner({ slug, questions, likertPoints }: { slug: string; questions: Q[]; likertPoints: 5 | 7 }) {
  const router = useRouter();
  const storageKey = `qp:answers:${slug}`;
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"intro" | "quiz" | "email" | "submitting">("intro");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Restore autosaved answers (P-01: a refresh doesn't lose progress).
  useEffect(() => {
    track("quiz_view", { slug });
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (saved && typeof saved === "object") {
        setAnswers(saved);
        const firstOpen = questions.findIndex((q) => saved[q.id] === undefined);
        if (Object.keys(saved).length > 0) {
          setIndex(firstOpen === -1 ? questions.length - 1 : firstOpen);
          setStage("quiz");
        }
      }
    } catch {}
  }, [slug, storageKey, questions]);

  const q = questions[index];
  const answeredCount = useMemo(() => questions.filter((x) => answers[x.id] !== undefined).length, [answers, questions]);

  function answer(value: number | string) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
    track("question_answered", { slug, index });
    if (index < questions.length - 1) setIndex(index + 1);
    else {
      track("quiz_complete", { slug });
      setStage("email");
    }
  }

  async function submit(withEmail: boolean) {
    setStage("submitting");
    setError(null);
    if (withEmail && email) track("email_captured", { slug });
    const res = await fetch("/api/attempts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, answers, ...(withEmail && email ? { email } : {}) }),
    });
    if (!res.ok) {
      setError("Something went wrong saving your answers. Please try again.");
      setStage("email");
      return;
    }
    const { id, token } = await res.json();
    try { localStorage.removeItem(storageKey); } catch {}
    router.push(`/result/${id}?k=${encodeURIComponent(token)}`);
  }

  if (stage === "intro") {
    return (
      <button
        onClick={() => { setStage("quiz"); track("quiz_start", { slug }); }}
        className="rounded-full bg-ink px-6 py-3 text-paper hover:opacity-90"
      >
        Start the quiz
      </button>
    );
  }

  if (stage === "email" || stage === "submitting") {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <h2 className="font-serif text-2xl">Your result is ready.</h2>
        <p className="mt-2 text-sm text-muted">Want a copy in your inbox? Totally optional.</p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => { e.preventDefault(); submit(true); }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-line px-4 py-2"
          />
          <button disabled={stage === "submitting"} className="rounded-full bg-ink px-5 py-2 text-paper disabled:opacity-50">
            Email me and show result
          </button>
        </form>
        <button onClick={() => submit(false)} disabled={stage === "submitting"} className="mt-3 text-sm text-muted underline">
          Skip, just show my result
        </button>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </div>
    );
  }

  const pct = Math.round((answeredCount / questions.length) * 100);
  return (
    <section aria-live="polite" className="rounded-2xl border border-line bg-white p-6">
      <div className="h-1.5 w-full rounded-full bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-1.5 rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted">Question {index + 1} of {questions.length}</p>
      <h2 className="mt-2 font-serif text-2xl">{q.text}</h2>

      <div className="mt-6 grid gap-2">
        {q.kind === "likert"
          ? LIKERT_LABELS[likertPoints].map((label, i) => (
              <Option key={i} label={label} selected={answers[q.id] === i + 1} onClick={() => answer(i + 1)} />
            ))
          : q.options.map((o) => (
              <Option key={o.id} label={o.label} selected={answers[q.id] === o.id} onClick={() => answer(o.id)} />
            ))}
      </div>

      {index > 0 && (
        <button onClick={() => setIndex(index - 1)} className="mt-6 text-sm text-muted underline">Back</button>
      )}
    </section>
  );
}

function Option({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left transition ${
        selected ? "border-accent bg-accent-soft" : "border-line hover:border-ink"
      }`}
    >
      {label}
    </button>
  );
}
