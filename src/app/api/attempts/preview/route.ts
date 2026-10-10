import { NextResponse } from "next/server";
import { z } from "zod";
import { AnswerValidationError, scorePartial } from "@/lib/engine/score";
import { getQuiz } from "@/lib/quizzes";

const Body = z.object({
  slug: z.string().min(1).max(100),
  answers: z.record(z.string().max(100), z.union([z.number(), z.string().max(200), z.array(z.string().max(100)).max(50), z.null()])),
});

/** Midpoint micro-reveal: "You're leaning toward …". Uses the same server-side scorer; nothing is saved. */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const quiz = await getQuiz(parsed.data.slug);
  if (!quiz) return NextResponse.json({ error: "Unknown quiz" }, { status: 404 });
  try {
    const key = scorePartial(quiz, parsed.data.answers);
    const outcome = key ? quiz.outcomes.find((o) => o.key === key) : undefined;
    return NextResponse.json({ leaning: outcome ? { name: outcome.name, emoji: outcome.emoji ?? null } : null });
  } catch (e) {
    if (e instanceof AnswerValidationError) return NextResponse.json({ leaning: null });
    throw e;
  }
}
