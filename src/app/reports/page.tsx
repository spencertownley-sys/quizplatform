import type { Metadata } from "next";
import Link from "next/link";
import { FindReportsForm } from "@/components/actions";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Find my reports", description: "Get an email with links to every result and report saved with your email address." };

export default function FindReports() {
  return (
    <Container>
      <h1 className="font-serif text-4xl">Find my reports</h1>
      <p className="mt-2 text-ink-soft">
        Enter the email you used when you bought a report or asked for a copy of your result. We&apos;ll send a link to each one. Links never expire.
      </p>
      <div className="mt-6">
        <FindReportsForm />
      </div>
      <p className="mt-6 text-sm text-muted">
        Took a quiz without giving an email? Your results are saved in the browser you used. <Link href="/dashboard" className="underline">Create a free account</Link> there
        to keep them everywhere.
      </p>
    </Container>
  );
}
