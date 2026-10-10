import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import { db, t } from "@/db";
import type { Attempt } from "@/db/schema";
import { accessLevel, canViewAttempt, isOwner } from "./access";
import type { Answers, QuizDefinition, ScoreResult } from "./engine/types";
import { type Variants, paywallMode } from "./experiments";
import { normsFor } from "./norms";
import { buildReport, type ReportModel } from "./report";
import { getQuiz } from "./quizzes";
import { type Viewer, getViewer } from "./viewer";

const UUID = /^[0-9a-f-]{36}$/i;

export interface LoadedResult {
  attempt: Attempt;
  quiz: QuizDefinition;
  viewer: Viewer;
  owner: boolean;
  model: ReportModel;
  variants: Variants;
}

/** Load a result for whoever is asking, or null if they can't see it. */
export async function loadResult(attemptId: string, token: string | null | undefined): Promise<LoadedResult | null> {
  if (!UUID.test(attemptId)) return null;
  const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, attemptId)).limit(1);
  const viewer = await getViewer();
  if (!attempt || !canViewAttempt(attempt, viewer, token)) return null;
  const quiz = await getQuiz(attempt.quizSlug);
  if (!quiz) return null;

  // A signed-in person viewing a result from their own browser claims it.
  if (viewer.userId && !attempt.userId && viewer.guestId && attempt.guestSessionId === viewer.guestId) {
    await db().update(t.attempts).set({ userId: viewer.userId }).where(and(eq(t.attempts.id, attempt.id), isNull(t.attempts.userId)));
    attempt.userId = viewer.userId;
  }

  const scores = attempt.scores as ScoreResult;
  const variants = (attempt.variants ?? {}) as Variants;
  const level = await accessLevel(attempt);
  const norms = level === "free" ? null : await normsFor(quiz, scores, attempt.ageBand);
  const model = buildReport({
    quiz,
    scores,
    answers: attempt.answers as Answers,
    level,
    paywall: paywallMode(quiz, variants),
    norms,
    freeSections: variants.preview_depth === "section" ? 1 : 0,
  });
  return { attempt, quiz, viewer, owner: isOwner(attempt, viewer), model, variants };
}
