import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { adminUser } from "@/lib/admin";

const Body = z.object({ status: z.enum(["approved", "rejected", "pending"]) });

/** Approve or reject a buyer review. Only approved reviews appear on result pages. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await adminUser())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { id } = await params;
  await db().update(t.reviews).set({ status: parsed.data.status }).where(eq(t.reviews.id, id));
  return NextResponse.json({ ok: true });
}
