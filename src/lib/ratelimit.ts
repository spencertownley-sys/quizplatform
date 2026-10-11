import "server-only";
import { sql } from "drizzle-orm";
import { db, t } from "@/db";

/**
 * Fixed-window limiter in Postgres: returns true if this hit is allowed.
 * Good enough for low-volume abuse protection (find-my-reports, email sends).
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const [row] = await db()
    .insert(t.rateLimits)
    .values({ key, windowStart: new Date(), count: 1 })
    .onConflictDoUpdate({
      target: t.rateLimits.key,
      set: {
        count: sql`case when ${t.rateLimits.windowStart} < now() - make_interval(secs => ${windowSeconds}) then 1 else ${t.rateLimits.count} + 1 end`,
        windowStart: sql`case when ${t.rateLimits.windowStart} < now() - make_interval(secs => ${windowSeconds}) then now() else ${t.rateLimits.windowStart} end`,
      },
    })
    .returning({ count: t.rateLimits.count });
  return row.count <= limit;
}
