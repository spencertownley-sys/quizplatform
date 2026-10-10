import { NextResponse } from "next/server";
import { variantLabel, variantsFor } from "@/lib/experiments";
import { getQuiz } from "@/lib/quizzes";
import { ensureGuest } from "@/lib/viewer";

/** Experiment variants for this browser on a quiz, so landing pages can stay static. */
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  const quiz = await getQuiz(slug);
  const viewer = await ensureGuest();
  const variants = variantsFor(viewer.guestId, quiz);
  return NextResponse.json({ variants, label: variantLabel(variants) }, { headers: { "Cache-Control": "private, no-store" } });
}
