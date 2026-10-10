import { desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { db, t } from "@/db";
import { devToolsEnabled } from "@/lib/env";

export const dynamic = "force-dynamic";

/** Development only: every email the app sent or logged (RESEND_API_KEY unset), newest first. */
export default async function Outbox() {
  if (!devToolsEnabled()) notFound();
  const rows = await db().select().from(t.emails).orderBy(desc(t.emails.createdAt)).limit(50);
  return (
    <Container wide>
      <h1 className="font-serif text-4xl">Email outbox (dev)</h1>
      <p className="mt-1 text-sm text-muted">{rows.length} most recent</p>
      <div className="mt-6 space-y-6">
        {rows.map((r) => (
          <details key={r.id} className="rounded-2xl border border-line bg-card p-4" data-kind={r.kind}>
            <summary className="cursor-pointer text-sm">
              <strong>{r.subject}</strong> → {r.to} · {r.kind} · {r.status} · {r.createdAt.toLocaleString("en-US")}
            </summary>
            <iframe title={r.subject} srcDoc={r.html} className="mt-3 h-[600px] w-full rounded-xl border border-line bg-white" sandbox="" />
          </details>
        ))}
      </div>
    </Container>
  );
}
