import { desc } from "drizzle-orm";
import { db, t } from "@/db";

export default async function AdminEmails() {
  const rows = await db()
    .select({ id: t.emails.id, to: t.emails.to, kind: t.emails.kind, subject: t.emails.subject, status: t.emails.status, error: t.emails.error, createdAt: t.emails.createdAt })
    .from(t.emails)
    .orderBy(desc(t.emails.createdAt))
    .limit(200);
  const failed = rows.filter((r) => r.status === "failed").length;
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Emails</h1>
      <p className="text-sm text-muted">
        Latest 200. {failed ? <span className="text-red-700">{failed} failed: check RESEND_API_KEY and the sending domain.</span> : "No failures."} &quot;logged&quot; means no email provider is configured.
      </p>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="py-2">When</th>
            <th>To</th>
            <th>Kind</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="py-2 whitespace-nowrap">{r.createdAt.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}</td>
              <td>{r.to}</td>
              <td>{r.kind}</td>
              <td>{r.subject}</td>
              <td className={r.status === "failed" ? "text-red-700" : ""} title={r.error ?? ""}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
