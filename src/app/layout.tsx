import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { AccountLinks } from "@/components/AccountLinks";
import { Consent, CookieSettingsLink } from "@/components/Consent";
import { BRAND, PROMISES } from "@/lib/brand";
import { appUrl, clerkEnabled } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl()),
  title: { default: `${BRAND.name}: free personality, relationship and brain quizzes`, template: `%s · ${BRAND.name}` },
  description:
    "Free personality, relationship and brain quizzes with a free result every time. Optional reports from $0.99, one-time. No subscriptions hidden in the fine print.",
  openGraph: { siteName: BRAND.name, type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#faf7f2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerk = clerkEnabled();
  const page = (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded focus:bg-card focus:px-3 focus:py-2">
          Skip to content
        </a>
        <header className="border-b border-line">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="whitespace-nowrap font-serif text-xl">
              {BRAND.name}
            </Link>
            <div className="flex items-center gap-3 text-sm sm:gap-4">
              <Link href="/quizzes" className="text-muted hover:text-ink">
                Quizzes
              </Link>
              <Link href="/pricing" className="hidden text-muted hover:text-ink sm:inline">
                All-Access
              </Link>
              <Link href="/reports" className="hidden text-muted hover:text-ink md:inline">
                Find my reports
              </Link>
              <AccountLinks clerk={clerk} />
            </div>
          </nav>
        </header>

        <main id="main" className="w-full flex-1">
          {children}
        </main>

        <footer className="mt-16 border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-ink-soft">
              {PROMISES.map((p) => (
                <li key={p}>✓ {p}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/quizzes" className="underline hover:text-ink">
                All quizzes
              </Link>
              <Link href="/pricing" className="underline hover:text-ink">
                Pricing
              </Link>
              <Link href="/reports" className="underline hover:text-ink">
                Find my reports
              </Link>
              <Link href="/legal/privacy" className="underline hover:text-ink">
                Privacy
              </Link>
              <Link href="/legal/terms" className="underline hover:text-ink">
                Terms
              </Link>
              <Link href="/legal/refunds" className="underline hover:text-ink">
                Refunds and cancellation
              </Link>
              <CookieSettingsLink />
              <a href={`mailto:${BRAND.supportEmail}`} className="underline hover:text-ink">
                Contact
              </a>
            </div>
            <p className="mt-6 max-w-2xl text-xs">
              Quizzes here are for self-reflection and fun. They are not medical, psychological or professional assessments. If you are in crisis, call or text 988 in the
              US, or your local emergency number.
            </p>
            <p className="mt-2 text-xs">© {new Date().getFullYear()} {BRAND.company}</p>
          </div>
        </footer>
        <Consent gaId={process.env.NEXT_PUBLIC_GA_ID} posthogKey={process.env.NEXT_PUBLIC_POSTHOG_KEY} posthogHost={process.env.NEXT_PUBLIC_POSTHOG_HOST} />
      </body>
    </html>
  );
  return clerk ? <ClerkProvider>{page}</ClerkProvider> : page;
}
