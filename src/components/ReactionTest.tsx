"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "waiting" | "go" | "early" | "shown";

/**
 * Click or tap when the panel turns green. Uses pointerdown and performance.now()
 * for the lowest latency a browser allows; clicking early restarts the trial.
 */
export function ReactionTest({ trials, onDone, error }: { trials: number; onDone: (ms: number[]) => void; error?: string | null }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const goAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function arm() {
    setPhase("waiting");
    const delay = 1500 + Math.random() * 3000;
    timer.current = setTimeout(() => {
      goAt.current = performance.now();
      setPhase("go");
    }, delay);
  }

  function press() {
    if (phase === "idle" || phase === "early" || phase === "shown") return arm();
    if (phase === "waiting") {
      if (timer.current) clearTimeout(timer.current);
      return setPhase("early");
    }
    if (phase === "go") {
      const ms = Math.round(performance.now() - goAt.current);
      const next = [...times, ms];
      setTimes(next);
      setPhase("shown");
      if (next.length >= trials) onDone(next);
    }
  }

  const done = times.length >= trials;
  const colors: Record<Phase, string> = {
    idle: "bg-ink text-paper",
    waiting: "bg-[#b23a32] text-white",
    go: "bg-[#2f7d4f] text-white",
    early: "bg-warn-soft text-warn",
    shown: "bg-accent-soft text-ink",
  };
  const text: Record<Phase, string> = {
    idle: "Tap or click here to start",
    waiting: "Wait for green…",
    go: "Now!",
    early: "Too soon! Tap to try that one again",
    shown: done ? "All done, scoring…" : `${times[times.length - 1]} ms. Tap for the next one`,
  };

  return (
    <div>
      <button
        onPointerDown={(e) => {
          e.preventDefault();
          if (!done) press();
        }}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !done) {
            e.preventDefault();
            press();
          }
        }}
        className={`flex h-72 w-full select-none items-center justify-center rounded-2xl px-6 text-center font-serif text-3xl transition-colors sm:h-80 ${colors[phase]}`}
        style={{ touchAction: "manipulation" }}
        aria-live="assertive"
      >
        {text[phase]}
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">
          Trial {Math.min(times.length + 1, trials)} of {trials}
        </span>
        {times.map((t, i) => (
          <span key={i} className="rounded-full bg-card px-3 py-1 tabular-nums ring-1 ring-line">
            {t} ms
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Tip: a mouse or keyboard (space bar) is faster than a touchscreen. Device lag is part of every online score.</p>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
