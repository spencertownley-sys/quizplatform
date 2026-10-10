"use client";

import { useMemo, useState } from "react";

/** Birth date, time (optional) and place for chart calculators (T10). */
export function ChartForm({ places, onDone, error }: { places: { id: string; label: string }[]; onDone: (a: Record<string, string>) => void; error?: string | null }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [placeText, setPlaceText] = useState("");
  const place = useMemo(() => places.find((p) => p.label.toLowerCase() === placeText.trim().toLowerCase()), [places, placeText]);
  const ready = !!date && (unknownTime || !!time) && !!place;

  return (
    <form
      className="space-y-4 rounded-2xl border border-line bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onDone({ date, time: unknownTime ? "" : time, place: place!.id });
      }}
    >
      <label className="block">
        <span className="text-sm">Birth date</span>
        <input type="date" min="1900-01-01" max="2050-12-31" required value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <div>
        <label className="block">
          <span className="text-sm">Birth time (local time where you were born)</span>
          <input type="time" disabled={unknownTime} value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full rounded-xl border border-line px-3 py-2 disabled:opacity-40" />
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={unknownTime} onChange={(e) => setUnknownTime(e.target.checked)} /> I don&apos;t know my birth time (no rising sign)
        </label>
      </div>
      <label className="block">
        <span className="text-sm">Birthplace (nearest city)</span>
        <input list="qp-places" value={placeText} onChange={(e) => setPlaceText(e.target.value)} placeholder="Start typing a city" className="mt-1 block w-full rounded-xl border border-line px-3 py-2" />
        <datalist id="qp-places">
          {places.map((p) => (
            <option key={p.id} value={p.label} />
          ))}
        </datalist>
        {placeText && !place && <span className="mt-1 block text-xs text-muted">Pick a city from the list; choose the nearest one if yours isn&apos;t there.</span>}
      </label>
      <button disabled={!ready} className="rounded-full bg-ink px-6 py-2.5 text-paper disabled:opacity-40">
        Calculate my chart
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
