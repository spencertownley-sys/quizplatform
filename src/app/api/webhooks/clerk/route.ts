import { and, inArray, isNull } from "drizzle-orm";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { db, t } from "@/db";

/**
 * When a Clerk user is created or updated, attach every guest attempt and
 * purchase made with one of their VERIFIED email addresses (P-05).
 * Unverified emails are never used for matching.
 */
export async function POST(req: NextRequest) {
  let evt;
  try {
    evt = await verifyWebhook(req); // uses CLERK_WEBHOOK_SIGNING_SECRET
  } catch (err) {
    console.error("Clerk webhook verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const user = evt.data;
    const emails = user.email_addresses
      .filter((e) => e.verification?.status === "verified")
      .map((e) => e.email_address.toLowerCase());

    if (emails.length > 0) {
      await db()
        .update(t.attempts)
        .set({ userId: user.id })
        .where(and(isNull(t.attempts.userId), inArray(t.attempts.email, emails)));
      await db()
        .update(t.purchases)
        .set({ userId: user.id })
        .where(and(isNull(t.purchases.userId), inArray(t.purchases.email, emails)));
      await db()
        .update(t.guestSessions)
        .set({ userId: user.id })
        .where(and(isNull(t.guestSessions.userId), inArray(t.guestSessions.email, emails)));
    }
  }
  return new Response("ok");
}
