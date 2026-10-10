import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEV_USER_COOKIE } from "@/lib/auth";
import { appUrl, devToolsEnabled } from "@/lib/env";

/** Development only: sign out of the dev account. */
export async function POST() {
  if (!devToolsEnabled()) return new Response("Not found", { status: 404 });
  (await cookies()).delete(DEV_USER_COOKIE);
  return NextResponse.redirect(`${appUrl()}/`, 303);
}
