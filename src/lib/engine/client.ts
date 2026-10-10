import { CITIES } from "./cities";
import { scaleOf } from "./score";
import type { FigureShape, MatrixFigure, QuizDefinition, Scale } from "./types";

/**
 * What the quiz runner needs, and nothing more: no weights, no correct answers,
 * no dimensions, no report text. Built on the server, passed to the client component.
 */
export type ClientQuestion =
  | { id: string; kind: "likert"; text: string; scale: Scale }
  | { id: string; kind: "attention"; text: string; scale: Scale }
  | { id: string; kind: "choice"; text: string; display: "list" | "tiles"; options: { id: string; label: string; emoji?: string }[] }
  | { id: string; kind: "multi"; text: string; max: number; options: { id: string; label: string; emoji?: string }[] }
  | { id: string; kind: "ability"; text: string; figure?: MatrixFigure; options: { id: string; label: string; figure?: FigureShape[] }[] };

export interface ClientQuiz {
  slug: string;
  title: string;
  structure: QuizDefinition["structure"];
  instructions?: string;
  questions: ClientQuestion[];
  timeLimitSec?: number;
  trials?: number;
  places?: { id: string; label: string }[];
  /** Show the "leaning toward…" reveal at the midpoint. */
  midpointReveal: boolean;
}

export function toClientQuiz(quiz: QuizDefinition): ClientQuiz {
  const questions: ClientQuestion[] = quiz.questions.map((q) => {
    switch (q.kind) {
      case "likert":
        return { id: q.id, kind: q.kind, text: q.text, scale: scaleOf(quiz, q) };
      case "attention":
        return { id: q.id, kind: q.kind, text: q.text, scale: scaleOf(quiz) };
      case "choice":
        return {
          id: q.id,
          kind: q.kind,
          text: q.text,
          display: q.display ?? "list",
          options: q.options.map((o) => ({ id: o.id, label: o.label, ...(o.emoji ? { emoji: o.emoji } : {}) })),
        };
      case "multi":
        return {
          id: q.id,
          kind: q.kind,
          text: q.text,
          max: q.max ?? q.options.length,
          options: q.options.map((o) => ({ id: o.id, label: o.label, ...(o.emoji ? { emoji: o.emoji } : {}) })),
        };
      case "ability":
        return {
          id: q.id,
          kind: q.kind,
          text: q.text,
          ...(q.figure ? { figure: q.figure } : {}),
          options: q.options.map((o) => ({ id: o.id, label: o.label, ...(o.figure ? { figure: o.figure } : {}) })),
        };
    }
  });
  return {
    slug: quiz.slug,
    title: quiz.title,
    structure: quiz.structure,
    ...(quiz.instructions ? { instructions: quiz.instructions } : {}),
    questions,
    ...(quiz.ability?.timeLimitSec ? { timeLimitSec: quiz.ability.timeLimitSec } : {}),
    ...(quiz.performance ? { trials: quiz.performance.trials } : {}),
    ...(quiz.structure === "chart" ? { places: CITIES.map((c) => ({ id: c.id, label: `${c.name}, ${c.country}` })) } : {}),
    midpointReveal: ["trait_profile", "typology", "two_axis_quadrant", "persona_match", "compare"].includes(quiz.structure) && questions.length >= 12,
  };
}
