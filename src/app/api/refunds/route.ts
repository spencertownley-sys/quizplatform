import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { currentUserId } from "@/lib/auth";
import { refundPurchase } from "@/lib/fulfill";
import { verify } from "@/lib/links";
import { getViewer } from "@/lib/viewer";

const Body = z.object({ purchaseId: z.uuid(), sig: z.string().max(100).optional() });

/**
 * Self-serve refund (P-13): from the signed link in the receipt email, or by the
 * buyer from their dashboard or the browser they bought in.
 */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { purchaseId, sig } = parsed.data;

  const [p] = await db().select().from(t.purchases).where(eq(t.purchases.id, purchaseId)).limit(1);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [viewer, userId] = await Promise.all([getViewer(), currentUserId()]);
  const allowed =
    verify("refund", p.id, sig) || (!!userId && p.userId === userId) || (!!viewer.guestId && p.guestSessionId === viewer.guestId);
  if (!allowed) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const result = await refundPurchase(p);
  if (!result.ok) return NextResponse.json({ error: result.reason }, { status: 400 });
  return NextResponse.json({ ok: true });
}
