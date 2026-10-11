import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, t } from "@/db";
import { verify } from "@/lib/links";

/** One-click unsubscribe (RFC 8058 POST from mail clients, or the form on /unsubscribe). */
export async function POST(req: Request) {
  const url = new URL(req.url);
  let email = url.searchParams.get("e");
  let sig = url.searchParams.get("sig");
  if (!email) {
    const form = await req.formData().catch(() => null);
    email = (form?.get("e") as string | null) ?? null;
    sig = (form?.get("sig") as string | null) ?? null;
  }
  const e = email?.toLowerCase() ?? "";
  if (!e || !verify("unsubscribe", e, sig)) return NextResponse.json({ error: "Invalid link" }, { status: 400 });

  await db().insert(t.unsubscribes).values({ email: e }).onConflictDoNothing();
  await db().update(t.attempts).set({ marketingConsent: false }).where(eq(t.attempts.email, e));
  if (req.headers.get("accept")?.includes("text/html")) return NextResponse.redirect(new URL("/unsubscribe?done=1", req.url), 303);
  return NextResponse.json({ ok: true });
}
