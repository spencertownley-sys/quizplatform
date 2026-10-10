import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false } };

export default async function Unsubscribe({ searchParams }: { searchParams: Promise<{ e?: string; sig?: string; done?: string }> }) {
  const { e, sig, done } = await searchParams;
  return (
    <Container>
      <h1 className="font-serif text-4xl">Unsubscribe</h1>
      {done ? (
        <p className="mt-3 text-ink-soft">Done. You won&apos;t get follow-up emails from us. Receipts and links you ask for will still arrive.</p>
      ) : e && sig ? (
        <form action={`/api/unsubscribe`} method="post" className="mt-4">
          <input type="hidden" name="e" value={e} />
          <input type="hidden" name="sig" value={sig} />
          <p className="text-ink-soft">Stop follow-up emails to {e}?</p>
          <button className="mt-3 rounded-full bg-ink px-5 py-2 text-paper">Unsubscribe</button>
        </form>
      ) : (
        <p className="mt-3 text-ink-soft">Use the unsubscribe link at the bottom of any of our emails.</p>
      )}
    </Container>
  );
}
