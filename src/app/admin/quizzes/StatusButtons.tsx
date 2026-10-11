"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StatusButtons({ slug, status }: { slug: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = async (next: string) => {
    setBusy(true);
    setErr(null);
    const r = await fetch(`/api/admin/quizzes/${slug}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "status", status: next }) });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) setErr([d.error, ...(d.problems ?? []), ...(d.unreachable?.length ? [`Unreachable: ${d.unreachable.join(", ")}`] : [])].filter(Boolean).join(" · "));
    else router.refresh();
  };
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2 text-xs">
        {status !== "live" && (
          <button disabled={busy} onClick={() => set("live")} className="rounded-full bg-ink px-3 py-1 text-paper disabled:opacity-50">
            Publish
          </button>
        )}
        {status === "draft" && (
          <button disabled={busy} onClick={() => set("reviewed")} className="rounded-full border border-line px-3 py-1">
            Mark reviewed
          </button>
        )}
        {status === "live" && (
          <button disabled={busy} onClick={() => set("draft")} className="rounded-full border border-line px-3 py-1">
            Unpublish
          </button>
        )}
      </div>
      {err && <p className="max-w-xs text-right text-xs text-red-700">{err}</p>}
    </div>
  );
}
