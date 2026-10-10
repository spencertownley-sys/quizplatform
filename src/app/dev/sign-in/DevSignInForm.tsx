"use client";

import { useState } from "react";

export function DevSignInForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        const r = await fetch("/api/dev/sign-in", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
        if (r.ok) location.href = next;
      }}
    >
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-full border border-line px-4 py-2" aria-label="Email" />
      <button className="rounded-full bg-ink px-5 py-2 text-paper">Sign in</button>
    </form>
  );
}
