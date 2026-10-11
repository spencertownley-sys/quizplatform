import Link from "next/link";
import type { ReactNode } from "react";
import type { QuizDefinition } from "@/lib/engine/types";
import { richBlocks } from "@/lib/richtext";

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`prose-report ${className}`}>
      {richBlocks(text).map((b, i) =>
        b.type === "ul" ? (
          <ul key={i}>
            {b.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
    </div>
  );
}

export function ScoreBar({ label, pct, low, high, note }: { label: string; pct: number; low?: string; high?: string; note?: string }) {
  return (
    <div>
      <div className="flex justify-between gap-3 text-sm">
        <span>{label}</span>
        <span className="tabular-nums text-muted">
          {pct}%{note ? ` · ${note}` : ""}
        </span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-line" role="meter" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(2, pct)}%` }} />
      </div>
      {(low || high) && (
        <div className="mt-0.5 flex justify-between text-xs text-muted">
          <span>{low}</span>
          <span>{high}</span>
        </div>
      )}
    </div>
  );
}

export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "good" | "warn" | "accent" }) {
  const tones = {
    plain: "bg-card ring-1 ring-line",
    good: "bg-good-soft text-good",
    warn: "bg-warn-soft text-warn",
    accent: "bg-accent-soft text-accent",
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${tones[tone]}`}>{children}</span>;
}

export function Section({ title, children, id, className = "" }: { title?: ReactNode; children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`space-y-4 ${className}`}>
      {title && <h2 className="font-serif text-2xl">{title}</h2>}
      {children}
    </section>
  );
}

export function QuizCard({ quiz, emoji }: { quiz: Pick<QuizDefinition, "slug" | "title" | "tagline" | "category" | "minutes" | "questions" | "structure" | "isScreener">; emoji?: string }) {
  const count =
    quiz.structure === "performance" ? "5 trials" : quiz.structure === "chart" ? "3 details" : `${quiz.questions.filter((q) => q.kind !== "attention").length} questions`;
  return (
    <Link href={`/quiz/${quiz.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition hover:border-ink">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-muted">{quiz.category}</p>
        {emoji && <span className="text-2xl leading-none">{emoji}</span>}
      </div>
      <h3 className="mt-1 font-serif text-xl group-hover:underline">{quiz.title}</h3>
      <p className="mt-1 flex-1 text-sm text-ink-soft">{quiz.tagline}</p>
      <p className="mt-3 text-xs text-muted">
        {count} · about {quiz.minutes} min{quiz.isScreener ? " · always free" : ""}
      </p>
    </Link>
  );
}

export function Container({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`mx-auto w-full px-4 py-10 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>{children}</div>;
}
