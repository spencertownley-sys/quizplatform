import "server-only";
import { eq } from "drizzle-orm";
import { db, t } from "@/db";

export type EmailKind =
  | "result_copy"
  | "receipt"
  | "find_reports"
  | "comparison_ready"
  | "winback_sample"
  | "winback_offer"
  | "refund"
  | "account_deleted";

/** Follow-up emails people can opt out of. Receipts and links they asked for always send. */
const MARKETING: EmailKind[] = ["winback_sample", "winback_offer"];

export interface OutgoingEmail {
  to: string;
  kind: EmailKind;
  subject: string;
  html: string;
  text: string;
  /** One-click unsubscribe target for marketing emails. */
  unsubscribeUrl?: string;
}

/**
 * Sends through Resend when RESEND_API_KEY is set; otherwise records the email
 * as "logged" (visible at /dev/outbox in development). Never throws: a failed
 * email must not fail a payment webhook or a quiz submission.
 */
export async function sendEmail(email: OutgoingEmail): Promise<{ ok: boolean }> {
  const to = email.to.toLowerCase();
  if (MARKETING.includes(email.kind)) {
    const [unsub] = await db().select().from(t.unsubscribes).where(eq(t.unsubscribes.email, to)).limit(1);
    if (unsub) return { ok: false };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    await record(email, to, "logged", null, null);
    console.info(`[email:${email.kind}] to=${to} subject="${email.subject}" (logged, RESEND_API_KEY not set)`);
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "Quiz Platform <hello@example.com>",
        to: [to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.unsubscribeUrl
          ? { headers: { "List-Unsubscribe": `<${email.unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } }
          : {}),
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      await record(email, to, "failed", null, body.message ?? `HTTP ${res.status}`);
      return { ok: false };
    }
    await record(email, to, "sent", body.id ?? null, null);
    return { ok: true };
  } catch (err) {
    await record(email, to, "failed", null, String(err));
    return { ok: false };
  }
}

async function record(email: OutgoingEmail, to: string, status: string, providerId: string | null, error: string | null) {
  try {
    await db().insert(t.emails).values({ to, kind: email.kind, subject: email.subject, html: email.html, status, providerId, error });
  } catch (err) {
    console.error("could not record email", err);
  }
}
