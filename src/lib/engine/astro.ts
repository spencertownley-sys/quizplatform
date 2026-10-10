/**
 * T10 chart calculator. Low-precision ephemeris, accurate to well under a degree
 * for 1900–2050, which is plenty for signs:
 * - Sun and Moon: Meeus, Astronomical Algorithms (2nd ed.), ch. 25 and 47 (main terms).
 * - Planets: JPL "Keplerian Elements for Approximate Positions of the Major Planets", table 1 (1800–2050).
 * - Ascendant from local sidereal time and obliquity.
 * Local birth time is converted to UTC with the birthplace's IANA time zone (historical DST included).
 */
import { CITIES } from "./cities";
import type { Answers, DimensionScore, QuizDefinition, ScoreResult } from "./types";

export const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
export type Sign = (typeof SIGNS)[number];

export const ELEMENT: Record<Sign, "fire" | "earth" | "air" | "water"> = {
  aries: "fire", leo: "fire", sagittarius: "fire",
  taurus: "earth", virgo: "earth", capricorn: "earth",
  gemini: "air", libra: "air", aquarius: "air",
  cancer: "water", scorpio: "water", pisces: "water",
};

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const norm360 = (d: number) => ((d % 360) + 360) % 360;

export function signOf(longitude: number): { sign: Sign; degree: number } {
  const l = norm360(longitude);
  return { sign: SIGNS[Math.floor(l / 30)], degree: Math.round((l % 30) * 10) / 10 };
}

export function julianDay(date: Date): number {
  return date.getTime() / 86_400_000 + 2440587.5;
}

/** Offset of `tz` from UTC at the instant `utc`, in minutes. */
function tzOffsetMinutes(tz: string, utc: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utc);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - utc.getTime()) / 60_000);
}

/** Wall-clock time in `tz` to a UTC instant. */
export function localToUtc(y: number, m: number, d: number, h: number, min: number, tz: string): Date {
  const guess = Date.UTC(y, m - 1, d, h, min);
  const off = tzOffsetMinutes(tz, new Date(guess));
  let utc = guess - off * 60_000;
  const off2 = tzOffsetMinutes(tz, new Date(utc));
  if (off2 !== off) utc = guess - off2 * 60_000;
  return new Date(utc);
}

export function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = rad(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);
  const omega = rad(125.04 - 1934.136 * T);
  return norm360(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
}

export function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T;
  const D = rad(297.8501921 + 445267.1114034 * T);
  const M = rad(357.5291092 + 35999.0502909 * T);
  const Mp = rad(134.9633964 + 477198.8675055 * T);
  const F = rad(93.272095 + 483202.0175233 * T);
  const terms: [number, number][] = [
    [6.288774, Mp], [1.274027, 2 * D - Mp], [0.658314, 2 * D], [0.213618, 2 * Mp],
    [-0.185116, M], [-0.114332, 2 * F], [0.058793, 2 * D - 2 * Mp], [0.057066, 2 * D - M - Mp],
    [0.053322, 2 * D + Mp], [0.045758, 2 * D - M], [-0.040923, M - Mp], [-0.03472, D],
    [-0.030383, M + Mp], [0.015327, 2 * D - 2 * F], [-0.012528, Mp + 2 * F], [0.01098, Mp - 2 * F],
    [0.010675, 4 * D - Mp], [0.010034, 3 * Mp], [0.008548, 4 * D - 2 * Mp], [-0.007888, 2 * D + M - Mp],
    [-0.006766, 2 * D + M], [-0.005163, D - Mp], [0.004987, D + M], [0.004036, 2 * D - M + Mp],
  ];
  return norm360(Lp + terms.reduce((s, [a, arg]) => s + a * Math.sin(arg), 0));
}

/** [a, e, I, L, longPeri, longNode] and per-century rates, J2000 ecliptic. */
const ELEMENTS: Record<string, [number[], number[]]> = {
  mercury: [[0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593], [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]],
  venus: [[0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255], [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418]],
  earth: [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0], [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0]],
  mars: [[1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891], [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]],
  jupiter: [[5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909], [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106]],
  saturn: [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448], [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]],
};

function heliocentric(body: string, T: number): [number, number, number] {
  const [base, rate] = ELEMENTS[body];
  const [a, e, I, L, wbar, node] = base.map((v, i) => v + rate[i] * T);
  const w = rad(wbar - node);
  const O = rad(node);
  const inc = rad(I);
  let M = norm360(L - wbar);
  if (M > 180) M -= 360;
  const Mr = rad(M);
  let E = Mr + e * Math.sin(Mr);
  for (let i = 0; i < 20; i++) {
    const dE = (E - e * Math.sin(E) - Mr) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-10) break;
  }
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const x = (Math.cos(w) * Math.cos(O) - Math.sin(w) * Math.sin(O) * Math.cos(inc)) * xp + (-Math.sin(w) * Math.cos(O) - Math.cos(w) * Math.sin(O) * Math.cos(inc)) * yp;
  const y = (Math.cos(w) * Math.sin(O) + Math.sin(w) * Math.cos(O) * Math.cos(inc)) * xp + (-Math.sin(w) * Math.sin(O) + Math.cos(w) * Math.cos(O) * Math.cos(inc)) * yp;
  const z = Math.sin(w) * Math.sin(inc) * xp + Math.cos(w) * Math.sin(inc) * yp;
  return [x, y, z];
}

/** Geocentric tropical longitude of a planet, of date. */
export function planetLongitude(body: "mercury" | "venus" | "mars" | "jupiter" | "saturn", jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const p = heliocentric(body, T);
  const e = heliocentric("earth", T);
  const lonJ2000 = deg(Math.atan2(p[1] - e[1], p[0] - e[0]));
  return norm360(lonJ2000 + 1.396971 * T); // precess J2000 ecliptic to the equinox of date
}

export function ascendant(jd: number, latitude: number, longitudeEast: number): number {
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - (T * T * T) / 38710000;
  const ramc = rad(norm360(gmst + longitudeEast));
  const eps = rad(23.439291 - 0.0130042 * T);
  return norm360(deg(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(rad(latitude)) * Math.sin(eps)))));
}

const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function validateChartAnswers(answers: Answers): string | null {
  const keys = Object.keys(answers);
  if (keys.some((k) => !["date", "time", "place"].includes(k))) return "Unknown chart field";
  const { date, time, place } = answers;
  if (typeof date !== "string" || !DATE.test(date)) return "Birth date must be YYYY-MM-DD";
  const [, y, m, d] = date.match(DATE)!.map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d));
  if (y < 1900 || y > 2050 || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) return "Birth date is not a valid date between 1900 and 2050";
  if (time !== undefined && time !== "" && (typeof time !== "string" || !TIME.test(time))) return "Birth time must be HH:MM or blank";
  if (typeof place !== "string" || !CITIES.some((c) => c.id === place)) return "Pick a birthplace from the list";
  return null;
}

/** Chart quizzes: sun sign is the outcome; dimensions are element balance across placements. */
export function computeChart(quiz: QuizDefinition, answers: Answers): ScoreResult {
  const [y, m, d] = (answers.date as string).split("-").map(Number);
  const timeKnown = typeof answers.time === "string" && answers.time !== "";
  const [hh, mm] = timeKnown ? (answers.time as string).split(":").map(Number) : [12, 0];
  const city = CITIES.find((c) => c.id === answers.place)!;
  const utc = localToUtc(y, m, d, hh, mm, city.tz);
  const jd = julianDay(utc);

  const chart: Record<string, { sign: string; degree: number }> = {};
  const bodies = quiz.chart?.bodies ?? ["sun", "moon"];
  for (const b of bodies) {
    const lon = b === "sun" ? sunLongitude(jd) : b === "moon" ? moonLongitude(jd) : planetLongitude(b, jd);
    chart[b] = signOf(lon);
  }
  if (timeKnown) chart.rising = signOf(ascendant(jd, city.lat, city.lon));

  // Without a birth time the moon can change sign during the day; say so rather than guess.
  let moonUncertain = false;
  if (!timeKnown && chart.moon) {
    const early = signOf(moonLongitude(julianDay(localToUtc(y, m, d, 0, 0, city.tz)))).sign;
    const late = signOf(moonLongitude(julianDay(localToUtc(y, m, d, 23, 59, city.tz)))).sign;
    moonUncertain = early !== late;
  }

  const weights: Record<string, number> = { sun: 3, moon: 3, rising: 3 };
  const counts = { fire: 0, earth: 0, air: 0, water: 0 };
  let total = 0;
  for (const [body, p] of Object.entries(chart)) {
    const w = weights[body] ?? 1;
    counts[ELEMENT[p.sign as Sign]] += w;
    total += w;
  }
  const dimensions: Record<string, DimensionScore> = {};
  for (const dim of quiz.dimensions) {
    const raw = counts[dim.key as keyof typeof counts] ?? 0;
    dimensions[dim.key] = { raw, max: total, normalized: total ? raw / total : 0 };
  }

  const sun = chart.sun.sign;
  return {
    outcomeKey: sun,
    dimensions,
    ranking: [{ key: sun, score: 1 }],
    chart,
    extras: {
      moon: chart.moon?.sign ?? "",
      rising: chart.rising?.sign ?? "",
      timeKnown,
      moonUncertain,
      place: `${city.name}, ${city.country}`,
    },
  };
}
