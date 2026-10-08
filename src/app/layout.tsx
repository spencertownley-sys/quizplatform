import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Quiz Platform", template: "%s · Quiz Platform" },
  description: "Free personality, relationship and brain quizzes with honest, optional reports. No subscriptions hidden in the fine print.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen antialiased">
          <header className="border-b border-line">
            <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
              <Link href="/" className="font-serif text-xl">Quiz Platform</Link>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/pricing" className="text-muted hover:text-ink">All-Access</Link>
                <Show when="signed-in">
                  <Link href="/dashboard" className="text-muted hover:text-ink">Dashboard</Link>
                  <UserButton />
                </Show>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="rounded-full border border-line px-3 py-1 hover:bg-white">Sign in</button>
                  </SignInButton>
                </Show>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
          <footer className="mx-auto max-w-3xl px-4 pb-10 text-xs text-muted">
            One-time reports never turn into subscriptions. All-Access is a separate choice you can cancel in two clicks.
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
