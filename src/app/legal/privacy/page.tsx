import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacy" };

// Plain-language policy written from how the code actually behaves. Have a lawyer review before launch (PRD open item).
export default function Privacy() {
  return (
    <Container>
      <article className="prose-report space-y-4">
        <h1 className="font-serif text-4xl">Privacy</h1>
        <p className="text-sm text-muted">Last updated October 2026</p>
        <p>
          Your quiz answers are personal: they can say a lot about your personality, relationships and wellbeing. We collect as little as we can, never sell it, and let
          you delete it.
        </p>
        <h2 className="font-serif text-2xl">What we collect</h2>
        <ul>
          <li>
            <strong>Your answers and results</strong>, so we can score them and show your result and reports. They&apos;re tied to a random ID in a cookie, not to your name.
          </li>
          <li>
            <strong>Your birth year</strong>, asked once, to keep under-13s out and show age-appropriate quizzes and reports. If you say you&apos;re under 13, we don&apos;t
            collect anything else.
          </li>
          <li>
            <strong>Your email</strong>, only if you give it: to send your result, receipts, report links, and (only if you tick the box) a couple of follow-ups.
          </li>
          <li>
            <strong>Payment details</strong> are handled by Stripe. We never see or store your card number. We keep a record of what you bought, when and for how much.
          </li>
          <li>
            <strong>Account details</strong>, if you create an account, are handled by Clerk (email and sign-in method).
          </li>
          <li>
            <strong>Analytics</strong>, only if you allow analytics cookies: which pages and quizzes people use (Google Analytics and PostHog). Your answers are never sent
            to analytics. Without consent we only keep daily totals (for example, how many people started a quiz), with no cookies.
          </li>
        </ul>
        <h2 className="font-serif text-2xl">Cookies</h2>
        <p>
          A guest ID (so your results stay yours without an account), your age-gate answer, your cookie choice, and sign-in cookies if you have an account. Analytics
          cookies only with your consent; change your choice any time with &quot;Cookie settings&quot; at the bottom of every page.
        </p>
        <h2 className="font-serif text-2xl">Who can see your result</h2>
        <p>
          Only you, and anyone you give your private result link to. Share links show your headline result only, never your scores or answers. In compare mode, the
          other person sees your headline result and scores, never your individual answers.
        </p>
        <h2 className="font-serif text-2xl">Your choices</h2>
        <ul>
          <li>Delete a single result from its page, or delete your account and all results from your dashboard.</li>
          <li>Unsubscribe from follow-ups with the link in any email.</li>
          <li>Ask for a copy of your data, or for deletion if you don&apos;t have an account, by writing to {BRAND.supportEmail}.</li>
        </ul>
        <h2 className="font-serif text-2xl">Service providers</h2>
        <p>
          We use Stripe (payments), Clerk (accounts), Resend (email), our database host, and, with consent, Google Analytics and PostHog. They process data only to
          provide their service to us.
        </p>
        <h2 className="font-serif text-2xl">Contact</h2>
        <p>
          {BRAND.company}, {BRAND.supportEmail}
        </p>
      </article>
    </Container>
  );
}
