import { NextResponse } from "next/server";
import { currentUserId, signInPath } from "@/lib/auth";
import { portalSession } from "@/lib/billing";
import { appUrl } from "@/lib/env";

/**
 * Stripe Customer Portal from the dashboard: receipts, payment method and cancellation.
 * `intent=cancel` opens the portal straight on the cancel screen, so cancelling is
 * two clicks: "Cancel plan" here, "Cancel" there (P-08).
 */
export async function POST(req: Request) {
  const userId = await currentUserId();
  if (!userId) return NextResponse.redirect(`${appUrl()}${signInPath("/dashboard")}`, 303);
  const form = await req.formData().catch(() => null);
  const intent = form?.get("intent") === "cancel" ? "cancel" : "manage";
  return NextResponse.redirect(await portalSession(userId, intent), 303);
}
