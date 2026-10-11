# Quiz Platform

Personality, relationship and brain quizzes with a free result on every quiz and honest, optional paid reports:

| Tier | Price | What it unlocks |
| --- | --- | --- |
| Free | $0 | Headline result, summary, share card. Mental health screens in full. |
| Snapshot | $0.99 one-time | Every score with what it means, key points, PDF |
| Deep Report | $2.99 one-time | Full personalized report (score-by-score interpretation + 6–8 written sections), PDF |
| Comparison | $1.99 one-time | Joint report for two people who took the same quiz, unlocked for both |
| Bundle | $4.99 one-time | Deep Reports for 3–4 related quizzes, including ones taken later |
| All-Access | $9.99/month | Every Deep Report, history and trends, comparisons |

Guests can buy without an account. Signing up later attaches past guest purchases (same browser, or verified email). **A one-time purchase never turns into a subscription.**

Requirements, market research and conversion strategy: [Quiz Platform — Project Requirements](https://claude.ai/code/artifact/f3aab4ec-b3b1-4ba8-b0de-c09e33b34d70) (engineering summary and status in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind 4 · Clerk (Core 3) · Stripe Checkout, Billing, Customer Portal · Postgres via Drizzle · Resend · @react-pdf/renderer · `next/og` share cards · Vitest · Playwright.

## What's built

- **Quiz engine** (`src/lib/engine`): one data-driven scorer for all 10 structures (trait profile, typology incl. 16-type axes and enneagram wings, two-axis quadrant, timed ability tests with pattern matrices, reaction-time trials, persona match, recommenders, published screeners, couples comparison, birth chart with an ephemeris). Scoring always runs on the server; ties are broken without favoring any outcome; a linter and a simulator check every quiz (every outcome reachable).
- **The 20 Wave 1 quizzes** (`src/content/quizzes`), with items, per-score interpretation, Deep Report sections and 600–1,000 words of SEO copy each. All ship as **draft**: free results work, and reports go on sale once a person reviews and publishes each quiz in `/admin`.
- **Guest flow:** quiz landing page (what's free vs. paid up front) → neutral age gate → one question per screen with autosave, back button and a midpoint "leaning toward…" reveal → optional email → free result with a personalized preview → price card (Snapshot / Deep "Most popular" / bundle) → Stripe Checkout → instant unlock, receipt with report link, PDF and refund link.
- **Accounts:** Clerk sign-in; dashboard with results, retake trends, comparisons, recommendations, billing (two-click cancel), receipts, refunds and account deletion.
- **Payments:** Checkout for every product, Snapshot-to-Deep upgrade for the difference, subscription consent box, Customer Portal, idempotent webhooks (paid, expired, subscription changes, refunds, disputes), self-serve 30-day refunds, signed email links (refund, cancel, unsubscribe).
- **Compare mode:** invite a partner or friend by link; side-by-side results free, joint report paid once for both.
- **Share cards** in four sizes (link preview, X, story, square) and a public share page that shows only the headline.
- **SEO:** quiz landing pages with FAQ structured data, one page per outcome, category hubs, sitemap, robots.
- **Admin CMS** (`/admin`): metrics from the requirements doc (start rate, completion, paywall→checkout, conversion, AOV, subscription attach, refund and chargeback rates, experiment breakdown); quiz editor (publish, edit, or add quizzes from the catalog without a deploy, checked by the same linter); purchases with refunds; review moderation; email log.
- **Conversion features from the doc, done honestly:** real social proof only (purchase counts and approved buyer reviews, shown only above thresholds), "No subscription" beside every one-time button, All-Access pitched after a purchase, win-back emails only to people who opted in, and A/B tests (paywall, $0.99 vs $1.99, preview depth, email timing, subscription offer timing). No fake timers, counters or pre-checked boxes.
- **Safety:** screeners are always free and unchanged, with crisis resources when a risk item is endorsed; age gate (13+, 18+ for relationship and money reports); cookie consent before analytics; privacy, terms and refund pages.

Not built: localization (P-15, a "Could"), PayPal as its own integration (it comes through Stripe's payment methods where your account supports it), and the remaining 80 quizzes (the engine and CMS are ready for them).

## Run it locally (no accounts needed)

```bash
npm install
cp .env.example .env.local      # set DATABASE_URL; leave Clerk/Stripe/Resend blank
npm run db:migrate
npm run dev                     # http://localhost:3000
```

With the defaults in `.env.example`, local development needs only Postgres:
- **Payments** succeed instantly (`DEV_FAKE_PAYMENTS=1`) through the same fulfilment code as the Stripe webhook; `/dev/portal` stands in for the Customer Portal.
- **Accounts** use a dev sign-in (`/dev/sign-in`, any email) when the Clerk keys are blank. Set `DEV_ADMIN=1` to make it an admin.
- **Emails** are recorded and viewable at `/dev/outbox`.
- Set `ALLOW_DRAFT_SALES=true` to test buying reports before quizzes are published.

None of these work in production.

## Going live

1. **Database:** a Postgres database (Supabase or Neon), pooled URL in `DATABASE_URL`, then `npm run db:migrate`.
2. **Secret:** `APP_SECRET` (32+ random characters) signs the links in emails.
3. **Clerk:** create an app and set both keys. Add a webhook at `https://<domain>/api/webhooks/clerk` for `user.created` and `user.updated` → `CLERK_WEBHOOK_SIGNING_SECRET`. (The dashboard also claims purchases on load, so the webhook is a backstop.)
4. **Stripe:** `STRIPE_SECRET_KEY=sk_... APP_URL=https://<domain> npm run stripe:setup` creates every price, a Customer Portal configuration with cancellation, and the webhook; paste the printed lines into your env. Turn on Stripe Tax and set `STRIPE_AUTOMATIC_TAX=true`. Enable Apple Pay, Google Pay, Link, Cash App Pay and PayPal (where available) under Payment methods; Checkout shows whatever is enabled.
5. **Email:** a Resend account with a verified domain → `RESEND_API_KEY`, `EMAIL_FROM`.
6. **Hosting (Vercel):** import the repo, add the env vars and set `NEXT_PUBLIC_APP_URL`. `vercel.json` runs the win-back cron daily; set `CRON_SECRET` (and `WINBACK_PROMO_CODE` for the second email).
   **Or Railway:** add a Postgres service and connect the repo; `railway.json` runs `npm run db:deploy` (migrations) before `npm start`. Set `DATABASE_URL=${{Postgres.DATABASE_URL}}`, `APP_SECRET` and `NEXT_PUBLIC_APP_URL` before the first build (`NEXT_PUBLIC_*` values are baked in at build time). Railway has no `vercel.json` cron: add a cron service that calls `/api/cron/winback` with `Authorization: Bearer $CRON_SECRET`.
7. **Analytics (optional):** `NEXT_PUBLIC_GA_ID` + `GA_API_SECRET`, and/or `NEXT_PUBLIC_POSTHOG_KEY`. Loaded only after cookie consent.
8. **Admin:** put your email in `ADMIN_EMAILS`.

### Launch checklist (reviews and decisions only a person can make)
- [ ] Read each quiz in `/admin/quizzes`, check its reviewer notes, then **Publish**. Only live quizzes sell reports.
- [ ] Verify the career test's pay and outlook figures against bls.gov/ooh.
- [ ] Confirm the WHO terms for showing the ASRS v1.1 screener (PHQ-9 is free to reproduce).
- [ ] Have a lawyer review the terms, privacy policy, refund policy and subscription checkout (state auto-renewal laws).
- [ ] Pick the brand name and domain (`NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_SUPPORT_EMAIL`).
- [ ] In Stripe test mode, buy one of each product, refund one, and cancel All-Access from a receipt email.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm test` | Engine and library tests, plus lint and reachability checks for every quiz |
| `npm run lint` | TypeScript check |
| `npm run build` | Production build (no secrets needed) |
| `npm run e2e` | Browser walk-through of the main flows against a running dev server (fake payments) |
| `npm run content:registry` | Register quiz files after adding one |
| `npm run check:content` | Type-check quiz content only |
| `npm run db:generate` / `db:migrate` | Create / apply migrations |
| `npm run db:deploy` | Apply migrations without dev dependencies (used on deploy) |
| `npm run stripe:setup` | Create Stripe prices, portal configuration and webhook |

## Adding a quiz

Read [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md). In short: write `src/content/quizzes/<catalog-slug>.ts`, run `QUIZ=<slug> npx vitest run src/content`, then `npm run content:registry`. Or start one in `/admin/quizzes` from the catalog template, with no deploy.

## Project layout

```
src/
  app/                    pages and API routes
    quiz/[slug]           landing page + runner; /results/[outcome] SEO pages
    result/[attemptId]    free result, preview, price card, Snapshot/Deep report
    compare/              invite landing and comparison report
    s/[code]              public share page (images from api/og/[code])
    dashboard, pricing, reports (find my reports), refund, legal, admin, dev
    api/                  attempts, checkout, webhooks, billing portal, refunds, compare, PDF, cron, admin
  components/             runner, reaction test, chart form, report blocks, actions
  content/                the 100-quiz catalog and the quiz definitions
  db/                     Drizzle schema and client
  lib/engine/             scoring engine, linter, simulator, ephemeris, tests
  lib/                    access rules, products, payments, emails, reports, PDF, experiments, norms
drizzle/                  SQL migrations
e2e/                      Playwright smoke test
docs/                     requirements summary, catalog, structures, content guide
```
