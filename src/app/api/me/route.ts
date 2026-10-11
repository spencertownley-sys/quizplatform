import { NextResponse } from "next/server";
import { adminUser } from "@/lib/admin";
import { currentUser } from "@/lib/auth";

/** Who's signed in, for client components (header, runner). */
export async function GET() {
  const user = await currentUser();
  const admin = user ? !!(await adminUser()) : false;
  return NextResponse.json({ email: user?.primaryEmail ?? null, admin }, { headers: { "Cache-Control": "private, no-store" } });
}
