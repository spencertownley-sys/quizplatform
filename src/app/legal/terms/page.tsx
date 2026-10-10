import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = { title: "Terms" };

// Plain-language terms. Have a lawyer review before launch (PRD open item), especially the subscription section and state auto-renewal laws.
export default function Terms() {
  return (
    <Container>
      <article className="prose-report space-y-4">
        <h1 className="font-serif text-4xl">Terms</h1>
        <p className="text-sm text-muted">Last updated October 2026</p>
        <h2 className="font-serif text-2xl">What our quizzes are</h2>
        <p>
          Our quizzes are for self-reflection and entertainment. They are not medical, psychological, career, legal or financial advice, and no result is a diagnosis.
          Mental health screens are validated questionnaires that can suggest talking to a professional; only a qualified clinician can diagnose a condition.
        </p>
        <h2 className="font-serif text-2xl">Who can use them</h2>
        <p>You must be 13 or older. Some quizzes and all relationship and money reports are for adults 18 and over.</p>
        <h2 className="font-serif text-2xl">One-time purchases</h2>
        <p>
          Snapshots ({PRODUCTS.snapshot.priceLabel}), Deep Reports ({PRODUCTS.deep.priceLabel}), comparison reports ({PRODUCTS.comparison.priceLabel}) and bundles (
          {PRODUCTS.bundle.priceLabel}) are single payments. They never start a subscription. You can request a full refund within 30 days; see{" "}
          <Link href="/legal/refunds">refunds and cancellation</Link>.
        </p>
        <h2 className="font-serif text-2xl">All-Access subscription</h2>
        <p>
          All-Access costs {PRODUCTS.all_access.priceLabel}. It renews automatically each month, charging the card you used, until you cancel. You can cancel at any
          time in two clicks from your dashboard or from the link in any receipt email; you keep access until the end of the month you&apos;ve paid for and won&apos;t be
          charged again. We&apos;ll tell you before any price change, and you can cancel before it applies.
        </p>
        <h2 className="font-serif text-2xl">Your content and ours</h2>
        <p>
          Your answers and results are yours. Quiz questions, reports and designs are ours: you may share your own results and share cards, but please don&apos;t copy or
          resell our content.
        </p>
        <h2 className="font-serif text-2xl">Fair use</h2>
        <p>Don&apos;t misuse the site: no scraping, no automated quiz taking, no attempts to access other people&apos;s results.</p>
        <h2 className="font-serif text-2xl">Liability</h2>
        <p>
          We work hard to make quizzes thoughtful and accurate, but results are estimates based on what you tell us. To the extent the law allows, we aren&apos;t liable
          for decisions you make based on them.
        </p>
        <h2 className="font-serif text-2xl">Contact</h2>
        <p>
          {BRAND.company}, {BRAND.supportEmail}
        </p>
      </article>
    </Container>
  );
}
