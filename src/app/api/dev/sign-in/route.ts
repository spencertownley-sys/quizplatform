import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { claimForUser } from "@/lib/access";
import { DEV_USER_COOKIE } from "@/lib/auth";
import { clerkEnabled, devToolsEnabled } from "@/lib/env";
import { getViewer } from "@/lib/viewer";

/** Development only, when Clerk isn't configured: sign in as any email (treated as verified). */
export async function POST(req: Request) {
  if (!devToolsEnabled() || clerkEnabled()) return new Response("Not found", { status: 404 });
  const parsed = z.object({ email: z.email() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter an email" }, { status: 400 });
  const email = parsed.data.email.toLowerCase();
  (await cookies()).set(DEV_USER_COOKIE, email, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  const viewer = await getViewer();
  await claimForUser(`dev_${email}`, [email], viewer.guestId);
  return NextResponse.json({ ok: true });
}
