import { desc, ne } from "drizzle-orm";
import { db, t } from "@/db";
import { PRODUCTS, type ProductKey, formatCents } from "@/lib/products";
import { AdminAction } from "../AdminButtons";

export default async function AdminPurchases() {
  const rows = await db().select().from(t.purchases).where(ne(t.purchases.status, "pending")).orderBy(desc(t.purchases.createdAt)).limit(200);
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Purchases</h1>
      <p className="text-sm text-muted">Latest 200 completed, refunded, disputed or expired checkouts. Refunds follow the same 30-day rule as self-serve; use the Stripe dashboard for exceptions.</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2">Paid</th>
              <th>Product</th>
              <th>Quiz</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Variant</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="py-2 whitespace-nowrap">{(p.paidAt ?? p.createdAt).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}</td>
                <td>{p.variants?.bundleName ?? PRODUCTS[p.product as ProductKey].name}</td>
                <td>{p.quizSlug ?? "—"}</td>
                <td>{p.email ?? <span className="text-muted">guest</span>}</td>
                <td className="tabular-nums">{formatCents(p.amountCents ?? 0, p.currency ?? "usd")}</td>
                <td className={p.status === "paid" ? "text-good" : p.status === "disputed" ? "text-red-700" : "text-muted"}>{p.status}</td>
                <td className="font-mono text-xs">{p.variants?.experiments ?? ""}</td>
                <td>
                  {p.status === "paid" && p.product !== "all_access" && (
                    <AdminAction url="/api/admin/refund" body={{ purchaseId: p.id }} label="Refund" confirmText="Refund this purchase in full?" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
