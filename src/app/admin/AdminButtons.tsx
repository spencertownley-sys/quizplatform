"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminAction({ url, body, label, confirmText }: { url: string; body: object; label: string; confirmText?: string }) {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <span className="inline-flex flex-col">
      <button
        disabled={busy}
        className="rounded-full border border-line px-3 py-0.5 text-xs hover:border-ink disabled:opacity-50"
        onClick={async () => {
          if (confirmText && !confirm(confirmText)) return;
          setBusy(true);
          const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
          const d = await r.json().catch(() => ({}));
          setBusy(false);
          if (!r.ok) setErr(d.error ?? "Failed");
          else router.refresh();
        }}
      >
        {label}
      </button>
      {err && <span className="text-xs text-red-700">{err}</span>}
    </span>
  );
}
