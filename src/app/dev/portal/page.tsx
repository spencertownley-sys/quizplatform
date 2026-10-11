import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { fakePayments } from "@/lib/env";

/** Development stand-in for the Stripe Customer Portal when payments are faked. */
export default async function DevPortal({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  if (!fakePayments()) notFound();
  const { intent } = await searchParams;
  return (
    <Container>
      <p className="text-xs uppercase tracking-wide text-muted">Stripe Customer Portal (development stand-in)</p>
      {intent === "cancel" ? (
        <>
          <h1 className="mt-2 font-serif text-4xl">Cancel your plan</h1>
          <p className="mt-2 text-ink-soft">Your plan will be cancelled, but is still available until the end of your billing period.</p>
          <form action="/api/dev/cancel-subscription" method="post" className="mt-6 flex gap-3">
            <button className="rounded-full bg-ink px-5 py-2 text-paper">Cancel plan</button>
            <Link href="/dashboard" className="rounded-full border border-line px-5 py-2">
              Go back
            </Link>
          </form>
        </>
      ) : (
        <>
          <h1 className="mt-2 font-serif text-4xl">Billing</h1>
          <p className="mt-2 text-ink-soft">In production this is Stripe&apos;s portal: receipts, payment method and cancellation.</p>
          <Link href="/dashboard" className="mt-6 inline-block rounded-full border border-line px-5 py-2">
            Back to dashboard
          </Link>
        </>
      )}
    </Container>
  );
}
