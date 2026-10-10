import { and, desc, eq, inArray, isNotNull } from "drizzle-orm";
import { NextResponse, after } from "next/server";
import { z } from "zod";
import { db, t } from "@/db";
import { findReportsEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { appUrl } from "@/lib/env";
import { comparisonUrl, resultUrl } from "@/lib/links";
import { PRODUCTS, type ProductKey } from "@/lib/products";
import { getQuiz } from "@/lib/quizzes";
import { rateLimit } from "@/lib/ratelimit";

const Body = z.object({ email: z.email().max(254) });

/**
 * "Find my reports" (P-04): emails magic links for every result and purchase saved
 * with this address. The response is the same whether or not we have anything,
 * so the form can't be used to check who has taken which quiz.
 */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  const email = parsed.data.email.toLowerCase();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!(await rateLimit(`find:${email}`, 3, 3600)) || !(await rateLimit(`find-ip:${ip}`, 20, 3600))) {
    return NextResponse.json({ ok: true }); // same answer; just don't send more
  }

  after(async () => {
    const [attemptRows, purchaseRows] = await Promise.all([
      db().select().from(t.attempts).where(eq(t.attempts.email, email)).orderBy(desc(t.attempts.completedAt)).limit(50),
      db()
        .select()
        .from(t.purchases)
        .where(and(eq(t.purchases.email, email), inArray(t.purchases.status, ["paid", "refunded"]), isNotNull(t.purchases.paidAt)))
        .orderBy(desc(t.purchases.paidAt))
        .limit(50),
    ]);

    // Results bought with this email but taken without one.
    const boughtIds = purchaseRows.map((p) => p.attemptId).filter((id): id is string => !!id && !attemptRows.some((a) => a.id === id));
    const extraAttempts = boughtIds.length ? await db().select().from(t.attempts).where(inArray(t.attempts.id, boughtIds)) : [];

    const items: { label: string; url: string }[] = [];
    for (const a of [...attemptRows, ...extraAttempts]) {
      const quiz = await getQuiz(a.quizSlug);
      const outcome = quiz?.outcomes.find((o) => o.key === a.outcomeKey);
      const date = a.completedAt.toLocaleDateString("en-US", { dateStyle: "medium" });
      items.push({ label: `${quiz?.title ?? a.quizSlug}: ${outcome?.name ?? "result"} (${date})`, url: resultUrl(a.id, a.accessToken) });
    }
    const comparisonIds = purchaseRows.map((p) => p.comparisonId).filter((id): id is string => !!id);
    if (comparisonIds.length) {
      for (const c of await db().select().from(t.comparisons).where(inArray(t.comparisons.id, comparisonIds))) {
        items.push({ label: `Comparison report (${c.quizSlug})`, url: comparisonUrl(c.id, c.accessToken) });
      }
    }
    const bundles = purchaseRows.filter((p) => p.product === "bundle" || p.product === "all_access");
    for (const p of bundles) items.push({ label: `${PRODUCTS[p.product as ProductKey].name}: open your dashboard`, url: `${appUrl()}/dashboard` });

    await sendEmail(findReportsEmail({ to: email, items }));
  });

  return NextResponse.json({ ok: true });
}
