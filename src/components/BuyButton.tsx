"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import type { ProductKey } from "@/lib/products";

export function BuyButton({
  product,
  attemptId,
  token,
  label,
  primary,
}: {
  product: ProductKey;
  attemptId?: string;
  token?: string;
  label: string;
  primary?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setBusy(true);
    setError(null);
    track("checkout_start", { product });
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product, attemptId, token }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && data.signInUrl) return void (window.location.href = data.signInUrl);
    if (!res.ok || !data.url) {
      setError(data.error ?? "Checkout isn't available right now.");
      setBusy(false);
      return;
    }
    window.location.href = data.url;
  }

  return (
    <div>
      <button
        onClick={buy}
        disabled={busy}
        className={`w-full rounded-full px-4 py-2.5 text-sm disabled:opacity-50 ${
          primary ? "bg-ink text-paper hover:opacity-90" : "border border-line hover:border-ink"
        }`}
      >
        {busy ? "Opening checkout…" : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
