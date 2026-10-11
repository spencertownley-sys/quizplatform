import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { adminUser } from "@/lib/admin";
import { refundPurchase } from "@/lib/fulfill";

/** Support refunds from the admin purchases list (same rules as self-serve). */
export async function POST(req: Request) {
  if (!(await adminUser())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const parsed = z.object({ purchaseId: z.uuid() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const [p] = await db().select().from(t.purchases).where(eq(t.purchases.id, parsed.data.purchaseId)).limit(1);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const r = await refundPurchase(p);
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: r.reason }, { status: 400 });
}
