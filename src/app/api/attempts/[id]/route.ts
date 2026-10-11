import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { isOwner } from "@/lib/access";
import { deleteAttempts } from "@/lib/deletion";
import { getViewer } from "@/lib/viewer";

/** "Delete this result": the person who took it (same browser or account) can remove it. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, id)).limit(1);
  if (!attempt || !isOwner(attempt, await getViewer())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await deleteAttempts([attempt.id]);
  return NextResponse.json({ ok: true });
}
