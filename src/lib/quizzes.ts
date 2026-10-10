import "server-only";
import { db, hasDatabase, t } from "@/db";
import { catalog } from "@/content/catalog";
import { codeQuizzes } from "@/content/quizzes/_registry";
import type { Category, QuizDefinition } from "./engine/types";

/**
 * The live quiz set: code definitions with admin edits (quiz_overrides) on top.
 * Admin edits take effect within CACHE_MS on every server instance, no deploy.
 */
const CACHE_MS = 30_000;
let cache: { at: number; quizzes: QuizDefinition[] } | null = null;

type OverrideRow = typeof t.quizOverrides.$inferSelect;

export function mergeOverrides(base: QuizDefinition[], rows: OverrideRow[]): QuizDefinition[] {
  const bySlug = new Map(base.map((q) => [q.slug, q]));
  for (const row of rows) {
    const def = (row.definition as QuizDefinition | null) ?? bySlug.get(row.slug);
    if (!def) continue;
    const status = (row.status as QuizDefinition["status"] | null) ?? def.status;
    bySlug.set(row.slug, { ...def, slug: row.slug, status });
  }
  return [...bySlug.values()].sort((a, b) => a.n - b.n);
}

async function load(): Promise<QuizDefinition[]> {
  if (!hasDatabase()) return codeQuizzes;
  try {
    const rows = await db().select().from(t.quizOverrides);
    return mergeOverrides(codeQuizzes, rows);
  } catch (err) {
    // Builds and cold starts must not fail because the database is unreachable.
    console.error("quiz overrides unavailable; using code definitions", err);
    return codeQuizzes;
  }
}

export async function listQuizzes(): Promise<QuizDefinition[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.quizzes;
  const quizzes = await load();
  cache = { at: Date.now(), quizzes };
  return quizzes;
}

export function invalidateQuizCache() {
  cache = null;
}

export async function getQuiz(slug: string): Promise<QuizDefinition | undefined> {
  return (await listQuizzes()).find((q) => q.slug === slug);
}

/** Quizzes a visitor can take. Drafts are takeable (free result) but don't sell reports. */
export async function publicQuizzes() {
  return listQuizzes();
}

export const sellsReports = (q: QuizDefinition) => !q.isScreener && q.sellsReports !== false;

/** Only live quizzes sell reports (ALLOW_DRAFT_SALES=true lets drafts sell in development). */
export const onSale = (q: QuizDefinition) =>
  sellsReports(q) && (q.status === "live" || (process.env.ALLOW_DRAFT_SALES === "true" && process.env.NODE_ENV !== "production"));

/** Relationship and money reports are 18+ to buy, whatever age can take the quiz (P-16). */
export const reportMinAge = (q: QuizDefinition) =>
  Math.max(q.minAge, q.category === "Relationships" || q.category === "Career & money" ? 18 : 13);

export const CATEGORIES: { slug: string; name: Category; blurb: string; emoji: string }[] = [
  { slug: "personality", name: "Personality", emoji: "🧭", blurb: "Type, traits and what drives you." },
  { slug: "relationships", name: "Relationships", emoji: "💞", blurb: "How you love, attach and connect." },
  { slug: "brain", name: "Brain", emoji: "🧠", blurb: "Reasoning, reaction time and how your mind works." },
  { slug: "career", name: "Career & money", emoji: "🧰", blurb: "Work that fits and how you handle money." },
  { slug: "style", name: "Style", emoji: "🎨", blurb: "Colors, looks and taste, matched to you." },
  { slug: "spiritual", name: "Spiritual", emoji: "✨", blurb: "Animal guides, charts and symbols." },
  { slug: "fandom", name: "Fandom-style", emoji: "🏰", blurb: "Houses, heroes and worlds of your own." },
  { slug: "wellbeing", name: "Wellbeing (free)", emoji: "🌱", blurb: "Validated screens, always free." },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categorySlug = (name: Category) => CATEGORIES.find((c) => c.name === name)?.slug ?? "personality";

/** Catalog entries not built yet, for "coming soon". */
export async function plannedQuizzes() {
  const built = new Set((await listQuizzes()).map((q) => q.n));
  return catalog.filter((c) => !built.has(c.n));
}
