# Requirements summary

The full document (market research, competitor review, conversion tactics, sources) lives here: [Quiz Platform — Project Requirements](https://claude.ai/code/artifact/f3aab4ec-b3b1-4ba8-b0de-c09e33b34d70). This file is the engineering summary.

## Positioning
Competitors charge $0.99–$1.99 for "results" that silently roll into $25–$50/month subscriptions, and their reviews are full of complaints. We are the honest version: free headline result, paid depth, subscription always a separate explicit choice. The FTC still enforces ROSCA against negative-option traps and restarted click-to-cancel rulemaking in 2026; state auto-renewal laws also apply.

## Core flow
1. Land on a quiz page (item count, time, what's free vs. paid shown up front).
2. Take the quiz: one question per screen, progress bar, back button, browser autosave.
3. Optional "email me a copy"; never required.
4. Free result + preview of the paid report (real section titles, first lines, rest blurred).
5. Choose Snapshot $0.99, Deep $2.99, or All-Access $9.99/mo. Guest checkout by email.
6. Instant unlock + magic-link email.
7. Optional Clerk account; past guest purchases attach by verified email.

## Functional requirements
| ID | Requirement | Priority | Status |
| --- | --- | --- | --- |
| P-01 | Anonymous quiz-taking stored by guest session | Must | Done |
| P-02 | Free headline result; per-quiz full-paywall option for A/B | Must | Field exists; full-paywall rendering TODO |
| P-03 | Guest checkout by email via Stripe Checkout | Must | Done |
| P-04 | Magic-link access to purchased reports | Must | Token links done; email TODO |
| P-05 | Clerk accounts; claim guest purchases by verified email | Must | Done |
| P-06 | Dashboard: results, reports, retake trends, recommendations | Must | Results + billing done; rest TODO |
| P-07 | All-Access unlocks every Deep Report | Must | Done |
| P-08 | Two-click self-serve cancellation (Stripe Customer Portal) | Must | Done (enable portal in Stripe) |
| P-09 | PDF export of paid reports | Must | TODO |
| P-10 | Shareable result card (OG image) | Must | TODO |
| P-11 | Couples/compare mode with paid comparison report | Should | TODO |
| P-12 | Bundles ($4.99 for 4 reports) | Should | TODO |
| P-13 | Refund button; 30-day refund on one-time reports | Should | Refund webhook done; button TODO |
| P-14 | Admin CMS for quizzes without a deploy | Must | TODO (quizzes are code for now) |
| P-15 | Localization-ready strings | Could | TODO |
| P-16 | Age gate (13+, 18+ for relationship/money) | Must | `minAge` field + notice; enforcement TODO |

## Billing rules (non-negotiable)
- One-time purchases never create a subscription.
- Subscription checkout states price, renewal and how to cancel beside the pay button.
- Confirmation email repeats the terms with a cancel link.
- Cancellation as easy as sign-up; at most one dismissible save offer.
- Keep chargebacks well under 0.5%.
- Have a lawyer review checkout, subscription, refund and privacy terms before launch.

## Launch plan
1. Phase 1 (weeks 1–6): engine, structures, guest checkout, Clerk, Stripe, reports, analytics, CMS.
2. Phase 2 (weeks 7–10): 20 Wave 1 quizzes. Gate: purchase conversion and refund rate stable for two weeks.
3. Phase 3 (weeks 11–14): All-Access dashboard features, bundles, post-purchase add-ons.
4. Phase 4 (weeks 15–26): scale to 100 quizzes, outcome landing pages, Spanish for the top 10.

## Open questions
- Which processor did "chlorine" mean? (Assumed Klarna; not recommended for sub-$10 purchases.)
- Who writes report content?
- Brand name and domain.
- Ads on free pages, or ad-free as part of the trust positioning?
