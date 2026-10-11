import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { currentUserId } from "@/lib/auth";
import { getViewer } from "@/lib/viewer";

const Body = z.object({
  purchaseId: z.uuid(),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(10).max(600),
  displayName: z.string().trim().min(1).max(40),
});

/** Reviews come only from real buyers and are shown only after an admin approves them. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Add a rating and a few words (10–600 characters)." }, { status: 400 });
  const { purchaseId, rating, body, displayName } = parsed.data;

  const [p] = await db().select().from(t.purchases).where(eq(t.purchases.id, purchaseId)).limit(1);
  const [viewer, userId] = await Promise.all([getViewer(), currentUserId()]);
  const mine = p && ((userId && p.userId === userId) || (viewer.guestId && p.guestSessionId === viewer.guestId));
  if (!p || !mine || p.status !== "paid") return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db()
    .insert(t.reviews)
    .values({ purchaseId, quizSlug: p.quizSlug ?? "_all", rating, body, displayName })
    .onConflictDoUpdate({ target: t.reviews.purchaseId, set: { rating, body, displayName, status: "pending" } });
  return NextResponse.json({ ok: true });
}
