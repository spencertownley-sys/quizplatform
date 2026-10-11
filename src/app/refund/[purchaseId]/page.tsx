import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { RefundButton } from "@/components/actions";
import { Container } from "@/components/ui";
import { db, t } from "@/db";
import { REFUND_DAYS } from "@/lib/fulfill";
import { verify } from "@/lib/links";
import { PRODUCTS, type ProductKey, formatCents } from "@/lib/products";

export const metadata: Metadata = { title: "Request a refund", robots: { index: false } };

/** Refund link from the receipt email (P-13): one confirmation click, no form, no questions. */
export default async function RefundPage({ params, searchParams }: { params: Promise<{ purchaseId: string }>; searchParams: Promise<{ sig?: string }> }) {
  const [{ purchaseId }, { sig }] = await Promise.all([params, searchParams]);
  const valid = /^[0-9a-f-]{36}$/i.test(purchaseId) && verify("refund", purchaseId, sig);
  const [p] = valid ? await db().select().from(t.purchases).where(eq(t.purchases.id, purchaseId)).limit(1) : [];

  if (!p) {
    return (
      <Container>
        <h1 className="font-serif text-4xl">This refund link isn&apos;t valid</h1>
        <p className="mt-2 text-ink-soft">Use the link in your receipt email, or reply to the receipt and we&apos;ll sort it out.</p>
      </Container>
    );
  }
  const expired = !p.paidAt || Date.now() - p.paidAt.getTime() > REFUND_DAYS * 86_400_000;
  return (
    <Container>
      <h1 className="font-serif text-4xl">Request a refund</h1>
      <p className="mt-3">
        {PRODUCTS[p.product as ProductKey].name}, {formatCents(p.amountCents ?? 0, p.currency ?? "usd")}, bought {p.paidAt?.toLocaleDateString("en-US", { dateStyle: "medium" })}.
      </p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5">
        {p.status === "refunded" ? (
          <p className="text-good">This purchase has already been refunded.</p>
        ) : expired ? (
          <p>Refunds are available for {REFUND_DAYS} days after purchase. Reply to your receipt email and we&apos;ll take a look.</p>
        ) : (
          <>
            <p className="mb-3 text-sm text-ink-soft">You&apos;ll get a full refund to your original payment method, and the report will be locked again.</p>
            <RefundButton purchaseId={p.id} sig={sig} label="Refund my purchase" />
          </>
        )}
      </div>
    </Container>
  );
}
