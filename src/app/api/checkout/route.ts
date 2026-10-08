import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { db, t } from "@/db";
import { getQuiz } from "@/content";
import { canViewAttempt } from "@/lib/access";
import { appUrl } from "@/lib/env";
import { PRODUCTS, stripePriceId } from "@/lib/products";
import { stripe } from "@/lib/stripe";
import { ensureGuest } from "@/lib/viewer";

const Body = z.object({
  product: z.enum(["snapshot", "deep", "all_access"]),
  attemptId: z.uuid().optional(),
  token: z.string().max(100).optional(),
});

/**
 * Start a Stripe Checkout session.
 * One-time reports are guest-friendly and tied to one attempt.
 * All-Access needs a signed-in account so the dashboard and cancellation work.
 * A one-time purchase never creates a subscription.
 */
export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { product, attemptId, token } = parsed.data;
  const viewer = await ensureGuest();
  const def = PRODUCTS[product];

  const metadata: Record<string, string> = { product, guestSessionId: viewer.guestId };
  if (viewer.userId) metadata.userId = viewer.userId;

  let returnPath = "/dashboard";
  let customerEmail: string | undefined;

  if (product === "all_access") {
    if (!viewer.userId) {
      return NextResponse.json({ error: "sign_in_required", signInUrl: "/sign-in?redirect_url=/pricing" }, { status: 401 });
    }
  } else {
    if (!attemptId) return NextResponse.json({ error: "attemptId is required" }, { status: 400 });
    const [attempt] = await db().select().from(t.attempts).where(eq(t.attempts.id, attemptId)).limit(1);
    if (!attempt || !canViewAttempt(attempt, viewer, token)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const quiz = getQuiz(attempt.quizSlug);
    if (!quiz || quiz.isScreener) return NextResponse.json({ error: "No paid report for this quiz" }, { status: 400 });
    if (quiz.status === "draft" && process.env.ALLOW_DRAFT_SALES !== "true") {
      return NextResponse.json({ error: "This report isn't on sale yet" }, { status: 400 });
    }
    metadata.attemptId = attempt.id;
    returnPath = `/result/${attempt.id}?k=${encodeURIComponent(attempt.accessToken)}`;
    customerEmail = attempt.email ?? undefined;
  }

  const sep = returnPath.includes("?") ? "&" : "?";
  const params: Stripe.Checkout.SessionCreateParams = {
    line_items: [{ price: stripePriceId(product), quantity: 1 }],
    customer_email: customerEmail,
    success_url: `${appUrl()}${returnPath}${sep}paid=1`,
    cancel_url: `${appUrl()}${returnPath}`,
    metadata,
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
    ...(def.recurring
      ? {
          mode: "subscription",
          subscription_data: { metadata },
          custom_text: {
            submit: {
              message: `${def.priceLabel}, renews monthly until you cancel. Cancel anytime in two clicks from your dashboard.`,
            },
          },
        }
      : {
          mode: "payment",
          customer_creation: "always",
          payment_intent_data: { metadata },
          custom_text: { submit: { message: "One-time payment. No subscription. 30-day refund if you're not happy." } },
        }),
  };

  const session = await stripe().checkout.sessions.create(params);
  await db().insert(t.purchases).values({
    product,
    attemptId: metadata.attemptId ?? null,
    guestSessionId: viewer.guestId,
    userId: viewer.userId,
    email: customerEmail ?? null,
    amountCents: def.cents,
    currency: "usd",
    status: "pending",
    stripeSessionId: session.id,
  });

  return NextResponse.json({ url: session.url });
}
