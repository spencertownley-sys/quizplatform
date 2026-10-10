import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { REFUND_DAYS } from "@/lib/fulfill";

export const metadata: Metadata = { title: "Refunds and cancellation" };

export default function Refunds() {
  return (
    <Container>
      <article className="prose-report space-y-4">
        <h1 className="font-serif text-4xl">Refunds and cancellation</h1>
        <h2 className="font-serif text-2xl">One-time reports: {REFUND_DAYS}-day refund</h2>
        <p>If you&apos;re not happy with a report, bundle or comparison, get a full refund within {REFUND_DAYS} days. No questions, no form.</p>
        <ul>
          <li>Use the &quot;Request a refund&quot; link in your receipt email, or</li>
          <li>Use &quot;Refund&quot; next to the purchase on your result page or dashboard.</li>
        </ul>
        <p>The money goes back to your original payment method, usually within 5–10 business days. The report locks again; your free result stays.</p>
        <h2 className="font-serif text-2xl">All-Access: cancel in two clicks</h2>
        <p>
          Go to your <Link href="/dashboard">dashboard</Link>, click <strong>Cancel plan</strong>, then confirm. Or use the &quot;Manage or cancel your plan&quot; link in any
          receipt email, no sign-in needed. No phone call, no retention form. You keep access until the end of the month you&apos;ve paid for and won&apos;t be charged
          again.
        </p>
        <p>Monthly charges aren&apos;t refunded for partial months, except where the law requires it. If something went wrong, write to us and we&apos;ll make it right.</p>
        <h2 className="font-serif text-2xl">Questions</h2>
        <p>Reply to any receipt or write to {BRAND.supportEmail}.</p>
      </article>
    </Container>
  );
}
