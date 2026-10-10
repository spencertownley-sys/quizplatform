import "server-only";
import { cookies } from "next/headers";
import { AGE_COOKIE, ageBand, ageFromBirthYear, parseAgeCookie } from "./age";
import { guestSession } from "./viewer";

/** The age this browser declared at the gate (server record first, cookie as fallback). */
export async function viewerAge(guestId: string | null): Promise<{ age: number | null; underage: boolean; band: string | null }> {
  const [session, jar] = await Promise.all([guestSession(guestId), cookies()]);
  const cookie = parseAgeCookie(jar.get(AGE_COOKIE)?.value);
  if (session?.underage || cookie.underage) return { age: null, underage: true, band: null };
  const year = session?.birthYear ?? cookie.birthYear;
  if (!year) return { age: null, underage: false, band: null };
  const age = ageFromBirthYear(year);
  return { age, underage: age < 13, band: ageBand(age) };
}
