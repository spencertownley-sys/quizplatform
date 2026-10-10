/**
 * Neutral age screen (P-16): we ask for a birth year without hinting at the
 * "right" answer, and remember an under-13 answer so the gate can't simply be retried.
 */
export const AGE_COOKIE = "qp_age";

export function ageFromBirthYear(year: number, now = new Date()): number {
  // Without a birth date we assume the birthday hasn't happened yet this year (conservative).
  return now.getUTCFullYear() - year - 1;
}

export function ageBand(age: number): string {
  if (age < 18) return "13-17";
  if (age < 25) return "18-24";
  if (age < 35) return "25-34";
  if (age < 45) return "35-44";
  if (age < 55) return "45-54";
  if (age < 65) return "55-64";
  return "65+";
}

export const validBirthYear = (y: unknown, now = new Date()): y is number =>
  typeof y === "number" && Number.isInteger(y) && y >= now.getUTCFullYear() - 110 && y <= now.getUTCFullYear();

/** Cookie value: "<birthYear>" or "under13". */
export function parseAgeCookie(v: string | undefined): { birthYear: number | null; underage: boolean } {
  if (!v) return { birthYear: null, underage: false };
  if (v === "under13") return { birthYear: null, underage: true };
  const y = Number(v);
  return Number.isInteger(y) ? { birthYear: y, underage: false } : { birthYear: null, underage: false };
}
