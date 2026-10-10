import "server-only";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, t } from "@/db";
import { currentUserId } from "./auth";

export const GUEST_COOKIE = "qp_guest";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface Viewer {
  userId: string | null;
  guestId: string | null;
}

/** Who is looking: the signed-in user (if any) and/or the anonymous guest cookie. Read-only. */
export async function getViewer(): Promise<Viewer> {
  const [userId, jar] = await Promise.all([currentUserId(), cookies()]);
  const g = jar.get(GUEST_COOKIE)?.value;
  return { userId, guestId: g && UUID.test(g) ? g : null };
}

/**
 * For route handlers and server actions only (they may set cookies):
 * returns the guest session id, creating the cookie and row on first use.
 */
export async function ensureGuest(): Promise<Viewer & { guestId: string }> {
  const viewer = await getViewer();
  if (viewer.guestId) {
    // The cookie may outlive a database reset; make sure the row exists.
    await db().insert(t.guestSessions).values({ id: viewer.guestId, userId: viewer.userId }).onConflictDoNothing();
    return viewer as Viewer & { guestId: string };
  }

  const id = randomUUID();
  await db().insert(t.guestSessions).values({ id, userId: viewer.userId }).onConflictDoNothing();
  (await cookies()).set(GUEST_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 400, // ~13 months, the browser maximum
    path: "/",
  });
  return { ...viewer, guestId: id };
}

export async function guestSession(guestId: string | null) {
  if (!guestId) return null;
  const [row] = await db().select().from(t.guestSessions).where(eq(t.guestSessions.id, guestId)).limit(1);
  return row ?? null;
}
