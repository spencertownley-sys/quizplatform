import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { claimForUser } from "@/lib/access";
import { countEvent } from "@/lib/analytics-server";

/**
 * When a Clerk user is created or updated, attach every guest attempt and
 * purchase made with one of their VERIFIED email addresses (P-05).
 * Unverified emails are never used for matching. The dashboard also claims on
 * load, so accounts work even before this webhook is configured.
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
    await claimForUser(user.id, emails, null);
    if (evt.type === "user.created") await countEvent("account_created", "_all");
  }
  return new Response("ok");
}
