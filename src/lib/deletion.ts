import "server-only";
import { inArray, or } from "drizzle-orm";
import { db, t } from "@/db";

/**
 * Deletes results and everything that reveals them. Purchase records are kept
 * for accounting and refunds, but stripped of email, account and result links.
 */
export async function deleteAttempts(attemptIds: string[]) {
  if (attemptIds.length === 0) return;
  await db().transaction(async (tx) => {
    const comps = await tx
      .select({ id: t.comparisons.id })
      .from(t.comparisons)
      .where(or(inArray(t.comparisons.attemptA, attemptIds), inArray(t.comparisons.attemptB, attemptIds)));
    const compIds = comps.map((c) => c.id);
    if (compIds.length) {
      await tx.update(t.purchases).set({ comparisonId: null }).where(inArray(t.purchases.comparisonId, compIds));
      await tx.delete(t.comparisons).where(inArray(t.comparisons.id, compIds));
    }
    await tx.update(t.purchases).set({ attemptId: null }).where(inArray(t.purchases.attemptId, attemptIds));
    await tx.delete(t.attempts).where(inArray(t.attempts.id, attemptIds));
  });
}
