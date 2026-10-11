"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Account area of the header. Client-side so marketing pages stay static and cacheable. */
export function AccountLinks({ clerk }: { clerk: boolean }) {
  if (clerk) {
    return (
      <>
        <Show when="signed-in">
          <Link href="/dashboard" className="text-muted hover:text-ink">
            Dashboard
          </Link>
          <UserButton />
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="rounded-full border border-line px-3 py-1 hover:border-ink">Sign in</button>
          </SignInButton>
        </Show>
      </>
    );
  }
  return <DevAccountLinks />;
}

function DevAccountLinks() {
  const [me, setMe] = useState<{ email: string | null; admin: boolean } | null>(null);
  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then(setMe)
      .catch(() => setMe({ email: null, admin: false }));
  }, []);
  if (!me) return null;
  if (!me.email) {
    return (
      <Link href="/dev/sign-in" className="rounded-full border border-line px-3 py-1 hover:border-ink">
        Sign in
      </Link>
    );
  }
  return (
    <>
      {me.admin && (
        <Link href="/admin" className="hidden text-muted hover:text-ink sm:inline">
          Admin
        </Link>
      )}
      <Link href="/dashboard" className="text-muted hover:text-ink">
        Dashboard
      </Link>
      <form action="/api/dev/sign-out" method="post">
        <button className="rounded-full border border-line px-3 py-1 text-xs hover:border-ink" title={me.email}>
          Sign out
        </button>
      </form>
    </>
  );
}
