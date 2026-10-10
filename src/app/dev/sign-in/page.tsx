import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { clerkEnabled, devToolsEnabled } from "@/lib/env";
import { DevSignInForm } from "./DevSignInForm";

/** Development only (no Clerk keys): sign in as any email to test accounts, All-Access and admin. */
export default async function DevSignIn({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (!devToolsEnabled() || clerkEnabled()) notFound();
  const { next } = await searchParams;
  return (
    <Container>
      <h1 className="font-serif text-4xl">Development sign-in</h1>
      <p className="mt-2 text-sm text-ink-soft">Clerk isn&apos;t configured, so this stands in for it locally. The email is treated as verified. Not available in production.</p>
      <div className="mt-6">
        <DevSignInForm next={next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard"} />
      </div>
    </Container>
  );
}
