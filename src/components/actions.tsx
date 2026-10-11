"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { track } from "@/lib/analytics";

const post = (url: string, body: unknown) =>
  fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then(async (r) => ({
    ok: r.ok,
    data: (await r.json().catch(() => ({}))) as Record<string, string>,
  }));

/** "Email me a copy" on the result page (email-after-result variant, or later). */
export function EmailCapture({ attemptId, token }: { attemptId: string; token?: string }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  if (state === "done") return <p className="text-sm text-good">Sent. Check your inbox for a link to this result.</p>;
  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("busy");
        const r = await post(`/api/attempts/${attemptId}/email`, { token, email, consent });
        setState(r.ok ? "done" : "error");
        if (r.ok) track("email_captured");
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-full border border-line px-4 py-2" aria-label="Email" />
        <button disabled={state === "busy"} className="rounded-full border border-ink px-4 py-2 text-sm disabled:opacity-50">
          Email me this result
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        Also send a couple of follow-ups about my result (optional).
      </label>
      {state === "error" && <p className="text-xs text-red-700">That didn&apos;t work. Check the address and try again.</p>}
    </form>
  );
}

/** Share card links (P-10): copy link, native share, download story and square images. */
export function ShareButtons({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? `/s/${code}` : `${location.origin}/s/${code}`;
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <button
        className="rounded-full border border-line px-4 py-1.5 hover:border-ink"
        onClick={async () => {
          track("share", { method: "link" });
          if (navigator.share) {
            await navigator.share({ title, url }).catch(() => {});
          } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
          }
        }}
      >
        {copied ? "Link copied" : "Share"}
      </button>
      <a href={`/api/og/${code}?format=story`} download={`${code}-story.png`} className="rounded-full border border-line px-4 py-1.5 hover:border-ink" onClick={() => track("share", { method: "story" })}>
        Story image
      </a>
      <a href={`/api/og/${code}?format=square`} download={`${code}-square.png`} className="rounded-full border border-line px-4 py-1.5 hover:border-ink" onClick={() => track("share", { method: "square" })}>
        Square image
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-line px-4 py-1.5 hover:border-ink"
        onClick={() => track("share", { method: "x" })}
      >
        Post on X
      </a>
    </div>
  );
}

/** Compare mode invite (P-11). */
export function CompareInvite({ attemptId, other }: { attemptId: string; other: string }) {
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      {!link ? (
        <button
          className="rounded-full bg-ink px-5 py-2 text-sm text-paper"
          onClick={async () => {
            const r = await post("/api/compare", { attemptId });
            if (r.ok) setLink(r.data.inviteUrl);
            else setErr(r.data.error ?? "Couldn't create an invite.");
          }}
        >
          Invite your {other}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input readOnly value={link} className="flex-1 rounded-full border border-line bg-paper px-4 py-2 text-sm" onFocus={(e) => e.target.select()} aria-label="Invite link" />
            <button
              className="rounded-full border border-ink px-4 py-2 text-sm"
              onClick={async () => {
                if (navigator.share) await navigator.share({ url: link }).catch(() => {});
                else {
                  await navigator.clipboard.writeText(link);
                  setCopied(true);
                }
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted">Send this to your {other}. When they finish, you&apos;ll both see your results side by side. They&apos;ll see your headline result and scores, never your individual answers.</p>
        </div>
      )}
      {err && <p className="mt-2 text-xs text-red-700">{err}</p>}
    </div>
  );
}

export function RefundButton({ purchaseId, sig, label = "Refund this purchase" }: { purchaseId: string; sig?: string; label?: string }) {
  const [state, setState] = useState<"idle" | "confirm" | "busy" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  if (state === "done") return <p className="text-sm text-good">Refunded. A confirmation is on its way to your email.</p>;
  return (
    <div>
      {state === "confirm" ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span>Refund in full and lock the report again?</span>
          <button
            className="rounded-full bg-ink px-4 py-1.5 text-paper"
            onClick={async () => {
              setState("busy");
              const r = await post("/api/refunds", { purchaseId, sig });
              if (r.ok) {
                setState("done");
                router.refresh();
              } else {
                setErr(r.data.error ?? "Refund failed.");
                setState("idle");
              }
            }}
          >
            Yes, refund
          </button>
          <button className="underline" onClick={() => setState("idle")}>
            Cancel
          </button>
        </div>
      ) : (
        <button disabled={state === "busy"} className="text-sm underline" onClick={() => setState("confirm")}>
          {label}
        </button>
      )}
      {err && <p className="mt-1 text-xs text-red-700">{err}</p>}
    </div>
  );
}

export function ReviewForm({ purchaseId }: { purchaseId: string }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);
  if (state === "done") return <p className="text-sm text-good">Thanks! We read every review before it goes up.</p>;
  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("busy");
        const r = await post("/api/reviews", { purchaseId, rating, body, displayName: name });
        if (r.ok) setState("done");
        else {
          setErr(r.data.error ?? "Couldn't save your review.");
          setState("idle");
        }
      }}
    >
      <div className="flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} role="radio" aria-checked={rating === n} onClick={() => setRating(n)} className={`text-2xl ${n <= rating ? "" : "opacity-30"}`}>
            ★
          </button>
        ))}
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={600} rows={3} placeholder="What did you think of your report?" className="w-full rounded-xl border border-line p-3 text-sm" />
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Name to show (e.g. Sam R.)" className="flex-1 rounded-full border border-line px-4 py-2 text-sm" />
        <button disabled={!rating || state === "busy"} className="rounded-full bg-ink px-4 py-2 text-sm text-paper disabled:opacity-40">
          Send review
        </button>
      </div>
      {err && <p className="text-xs text-red-700">{err}</p>}
    </form>
  );
}

export function DeleteResultButton({ attemptId }: { attemptId: string }) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  return confirm ? (
    <span className="text-xs">
      Delete this result for good?{" "}
      <button
        className="underline"
        onClick={async () => {
          await fetch(`/api/attempts/${attemptId}`, { method: "DELETE" });
          router.push("/");
        }}
      >
        Yes, delete
      </button>{" "}
      <button className="underline" onClick={() => setConfirm(false)}>
        Keep it
      </button>
    </span>
  ) : (
    <button className="text-xs underline" onClick={() => setConfirm(true)}>
      Delete this result
    </button>
  );
}

export function FindReportsForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  if (state === "done")
    return <p className="rounded-xl bg-good-soft p-4 text-sm text-good">If we have results or reports saved with {email}, a link to each is on its way. Check your inbox (and spam folder).</p>;
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("busy");
        await post("/api/reports/find", { email });
        setState("done");
      }}
    >
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-full border border-line px-4 py-2.5" aria-label="Email" />
      <button disabled={state === "busy"} className="rounded-full bg-ink px-5 py-2.5 text-paper disabled:opacity-50">
        Email me my links
      </button>
    </form>
  );
}

export function DeleteAccountButton() {
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      {confirm ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span>This deletes your results, comparisons and account. Purchases stay in our accounting records without your details.</span>
          <button
            className="rounded-full bg-red-700 px-4 py-1.5 text-white"
            onClick={async () => {
              const r = await post("/api/account/delete", {});
              if (r.ok) location.href = "/";
              else setErr(r.data.error ?? "Couldn't delete your account.");
            }}
          >
            Delete everything
          </button>
          <button className="underline" onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="text-sm text-red-700 underline" onClick={() => setConfirm(true)}>
          Delete my account and data
        </button>
      )}
      {err && <p className="mt-1 text-xs text-red-700">{err}</p>}
    </div>
  );
}

export function CertificateLink({ href }: { href: string }) {
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Name for your certificate (optional)" className="flex-1 rounded-full border border-line px-4 py-2 text-sm" />
      <a href={`${href}${name ? `&name=${encodeURIComponent(name)}` : ""}`} className="rounded-full border border-ink px-4 py-2 text-center text-sm">
        Download PDF with certificate
      </a>
    </div>
  );
}
