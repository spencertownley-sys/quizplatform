import { NextResponse } from "next/server";
import { portalSession } from "@/lib/billing";
import { appUrl } from "@/lib/env";
import { verify } from "@/lib/links";

/** "Manage or cancel your plan" link in receipt emails: opens the portal without signing in (P-08). */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("u") ?? "";
  if (!userId || !verify("portal", userId, url.searchParams.get("sig"))) {
    return NextResponse.redirect(`${appUrl()}/dashboard`, 303);
  }
  return NextResponse.redirect(await portalSession(userId, "cancel"), 303);
}
