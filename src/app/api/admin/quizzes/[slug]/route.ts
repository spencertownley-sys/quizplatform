import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { adminUser, checkQuiz, looksLikeQuiz } from "@/lib/admin";
import { getQuiz, invalidateQuizCache } from "@/lib/quizzes";

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("status"), status: z.enum(["draft", "reviewed", "live"]) }),
  z.object({ action: z.literal("save"), definition: z.unknown() }),
  z.object({ action: z.literal("reset") }),
]);

/**
 * Admin CMS (P-14): publish, edit or add a quiz without a deploy.
 * Edits are checked with the same linter and scoring simulation as the test suite;
 * a quiz can only go live with zero problems.
 */
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await adminUser();
  if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { slug } = await params;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const body = parsed.data;
  const by = admin.primaryEmail ?? admin.id;

  if (body.action === "reset") {
    await db().delete(t.quizOverrides).where(eq(t.quizOverrides.slug, slug));
    invalidateQuizCache();
    return NextResponse.json({ ok: true });
  }

  if (body.action === "status") {
    const quiz = await getQuiz(slug);
    if (!quiz) return NextResponse.json({ error: "Unknown quiz" }, { status: 404 });
    if (body.status === "live") {
      const check = checkQuiz(quiz);
      if (check.error || check.problems.length || check.unreachable.length) {
        return NextResponse.json({ error: "Fix these before publishing.", ...check }, { status: 400 });
      }
    }
    await db()
      .insert(t.quizOverrides)
      .values({ slug, status: body.status, updatedBy: by })
      .onConflictDoUpdate({ target: t.quizOverrides.slug, set: { status: body.status, updatedBy: by, updatedAt: new Date() } });
    invalidateQuizCache();
    return NextResponse.json({ ok: true });
  }

  const def = body.definition;
  if (!looksLikeQuiz(def)) return NextResponse.json({ error: "That isn't a quiz definition (needs slug, title, structure, dimensions, questions, outcomes, seo)." }, { status: 400 });
  if (def.slug !== slug) return NextResponse.json({ error: `The definition's slug must be "${slug}".` }, { status: 400 });
  const check = checkQuiz(def);
  if (check.error) return NextResponse.json({ error: check.error, ...check }, { status: 400 });
  if (def.status === "live" && (check.problems.length || check.unreachable.length)) {
    return NextResponse.json({ error: "Saved quizzes can only be live with zero problems. Save as draft, or fix these.", ...check }, { status: 400 });
  }
  await db()
    .insert(t.quizOverrides)
    .values({ slug, definition: def, status: def.status, updatedBy: by })
    .onConflictDoUpdate({ target: t.quizOverrides.slug, set: { definition: def, status: def.status, updatedBy: by, updatedAt: new Date() } });
  invalidateQuizCache();
  return NextResponse.json({ ok: true, ...check });
}
