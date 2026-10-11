import { NextResponse } from "next/server";
import { z } from "zod";
import { countEvent } from "@/lib/analytics-server";

/**
 * Client funnel beacons for the admin metrics page. Purchases, refunds and
 * completions are counted on the server, so only top-of-funnel events come here.
 */
const Body = z.object({
  event: z.enum(["quiz_view", "quiz_start", "result_view", "paywall_view", "checkout_start", "account_created"]),
  slug: z.string().max(100).regex(/^[a-z0-9-_]+$/),
  variant: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  await countEvent(parsed.data.event, parsed.data.slug, parsed.data.variant ?? "");
  return NextResponse.json({ ok: true });
}
