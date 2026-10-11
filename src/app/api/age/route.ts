import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { AGE_COOKIE, ageFromBirthYear, parseAgeCookie, validBirthYear } from "@/lib/age";
import { ensureGuest } from "@/lib/viewer";

const Body = z.object({ birthYear: z.number().int() });

/** Neutral age screen (P-16). An under-13 answer is remembered and can't be changed from this browser. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !validBirthYear(parsed.data.birthYear)) return NextResponse.json({ error: "Pick your birth year" }, { status: 400 });

  const jar = await cookies();
  const viewer = await ensureGuest();
  const [session] = await db().select().from(t.guestSessions).where(eq(t.guestSessions.id, viewer.guestId)).limit(1);
  if (session?.underage || parseAgeCookie(jar.get(AGE_COOKIE)?.value).underage) {
    return NextResponse.json({ error: "underage" }, { status: 403 });
  }

  const age = ageFromBirthYear(parsed.data.birthYear);
  const underage = age < 13;
  await db()
    .update(t.guestSessions)
    .set(underage ? { underage: true, birthYear: null } : { birthYear: parsed.data.birthYear })
    .where(eq(t.guestSessions.id, viewer.guestId));
  jar.set(AGE_COOKIE, underage ? "under13" : String(parsed.data.birthYear), {
    httpOnly: false, // the runner reads it to skip the gate next time
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 400,
    path: "/",
  });
  return underage ? NextResponse.json({ error: "underage" }, { status: 403 }) : NextResponse.json({ ok: true, age });
}
