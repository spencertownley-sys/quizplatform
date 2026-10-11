import { desc } from "drizzle-orm";
import { db, t } from "@/db";
import { AdminAction } from "../AdminButtons";

/** Buyer reviews. Only approved ones are shown on result pages, and only once a quiz has three. */
export default async function AdminReviews() {
  const rows = await db().select().from(t.reviews).orderBy(desc(t.reviews.createdAt)).limit(200);
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Reviews</h1>
      <p className="text-sm text-muted">Every review comes from a real purchase. Approve the ones that are genuine and relevant; never edit their words.</p>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.id} className="rounded-xl border border-line bg-card p-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span>{"★".repeat(r.rating)}</span>
              <span className="font-semibold">{r.displayName}</span>
              <span className="text-muted">{r.quizSlug}</span>
              <span className={r.status === "approved" ? "text-good" : r.status === "rejected" ? "text-red-700" : "text-warn"}>{r.status}</span>
              <span className="ml-auto flex gap-2">
                {r.status !== "approved" && <AdminAction url={`/api/admin/reviews/${r.id}`} body={{ status: "approved" }} label="Approve" />}
                {r.status !== "rejected" && <AdminAction url={`/api/admin/reviews/${r.id}`} body={{ status: "rejected" }} label="Reject" />}
              </span>
            </div>
            <p className="mt-2 text-sm">{r.body}</p>
          </li>
        ))}
        {rows.length === 0 && <li className="text-sm text-muted">No reviews yet.</li>}
      </ul>
    </div>
  );
}
