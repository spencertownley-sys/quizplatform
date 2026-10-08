import type { QuizDefinition } from "@/lib/engine/types";
import { catalog } from "./catalog";
import { attachmentStyle } from "./quizzes/attachment-style";
import { magicAcademyHouse } from "./quizzes/magic-academy-house";

/** Built quizzes, keyed by slug, with the catalog number they fulfil. */
const built: { n: number; quiz: QuizDefinition }[] = [
  { n: 23, quiz: attachmentStyle },
  { n: 77, quiz: magicAcademyHouse },
];

export const quizzes: QuizDefinition[] = built.map((b) => b.quiz);

export function getQuiz(slug: string): QuizDefinition | undefined {
  return quizzes.find((q) => q.slug === slug);
}

/** Catalog entries that don't have a built quiz yet. */
export function plannedQuizzes() {
  const done = new Set(built.map((b) => b.n));
  return catalog.filter((c) => !done.has(c.n));
}
