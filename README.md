# Quiz Platform

Personality, relationship and brain quizzes with a free result on every quiz and honest, optional paid reports:

| Tier | Price | What it unlocks |
| --- | --- | --- |
| Free | $0 | Headline result and summary |
| Snapshot | $0.99 one-time | Every dimension score + key traits |
| Deep Report | $2.99 one-time | Full personalized report |
| All-Access | $9.99/month | Every Deep Report on every quiz, dashboard |

Guests can buy without an account. Signing up with Clerk later attaches past guest purchases by verified email. **A one-time purchase never turns into a subscription.**

Full requirements, market research and conversion strategy: [Quiz Platform — Project Requirements](https://claude.ai/code/artifact/f3aab4ec-b3b1-4ba8-b0de-c09e33b34d70) (summary in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)).

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind 4 · Clerk (Core 3) · Stripe Checkout + Billing + Customer Portal · Postgres via Drizzle ORM · Vitest.

## What's built (Phase 1 starter)

- **Quiz engine** (`src/lib/engine`): one scorer for every quiz, driven by data. Implemented structures: trait profile (T1), typology (T2), two-axis quadrant (T3), persona match (T6), screener (T8). Others throw `NotImplementedError` until built. Answers are always re-validated and scored on the server.
- **Two sample quizzes** (`src/content/quizzes`): Attachment Style (T3) and Magic Academy House (T6). Both are `status: "draft"` with original items; report bodies are `TODO: writer content`.
- **Catalog of all 100 planned quizzes** with search data (`src/content/catalog.ts`, rendered in [docs/QUIZ_CATALOG.md](docs/QUIZ_CATALOG.md)).
- **Guest flow**: anonymous cookie session → take quiz (autosaves to the browser) → optional email → free result → paywall preview with blurred sections → Stripe Checkout as a guest → webhook unlocks the report. Result links carry an unguessable token so they work as magic links.
- **Accounts**: Clerk sign-in/up, protected `/dashboard`, Clerk webhook that claims guest attempts and purchases by verified email.
- **Payments**: Stripe Checkout for one-time reports and the All-Access subscription, webhook handling for paid / expired / subscription changes / refunds / disputes, Stripe Customer Portal for receipts and two-click cancel. Refunds relock the report.
- **Analytics hooks**: funnel events (`src/lib/analytics.ts`) forwarded to GA4 `gtag` and PostHog if their snippets are installed.

Not built yet (marked `TODO` in code): emails (receipts, magic links), PDF export, share cards, PayPal, admin CMS, SEO landing copy, age gate enforcement, retake trends and compare-with-friends, the remaining 98 quizzes.

## Run it locally

```bash
npm install
cp .env.example .env.local        # fill in the values below
npm run db:migrate                # creates tables in DATABASE_URL
npm run dev
```

1. **Database**: create a Postgres database (Supabase or Neon free tier works) and set `DATABASE_URL`.
2. **Clerk**: create an application, copy the publishable and secret keys. Add a webhook endpoint at `https://<your-domain>/api/webhooks/clerk` for `user.created` and `user.updated`, and copy its signing secret.
3. **Stripe** (test mode): copy the secret key, then run `STRIPE_SECRET_KEY=sk_test_... npm run stripe:setup` to create the three prices and paste the printed `STRIPE_PRICE_*` lines into `.env.local`. For local webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and use the `whsec_...` it prints. In the Stripe dashboard, enable the Customer Portal with subscription cancellation turned on.
4. To test checkout on the draft sample quizzes, set `ALLOW_DRAFT_SALES=true` (dev only).

Stripe test card: `4242 4242 4242 4242`, any future date, any CVC.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm test` | Engine tests, plus a lint pass over every quiz definition |
| `npm run lint` | TypeScript check |
| `npm run build` | Production build |
| `npm run db:generate` | Create a migration after editing `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations |
| `npm run stripe:setup` | Create Stripe products and prices |

## Adding a quiz

1. Pick its structure from [docs/QUIZ_STRUCTURES.md](docs/QUIZ_STRUCTURES.md) and its catalog number from [docs/QUIZ_CATALOG.md](docs/QUIZ_CATALOG.md).
2. Create `src/content/quizzes/<slug>.ts` exporting a `QuizDefinition` (copy a sample).
3. Register it in `src/content/index.ts` with its catalog number.
4. `npm test`: the lint checks catch unknown dimensions, missing outcomes, over-long items and too few reverse-keyed items.
5. Set `status: "live"` only after the items and report copy have been reviewed. Draft quizzes can't be bought.

## Project layout

```
src/
  app/                 pages and API routes
    api/attempts       score + save a finished quiz
    api/checkout       create a Stripe Checkout session
    api/webhooks/*     Stripe and Clerk webhooks
    api/billing-portal Stripe Customer Portal
    quiz/[slug]        quiz landing + runner
    result/[attemptId] free result, paywall, unlocked report
    dashboard          signed-in results + billing
  components/          QuizRunner, BuyButton
  content/             quiz definitions and the 100-quiz catalog
  db/                  Drizzle schema and client
  lib/engine/          scoring engine + tests
  lib/                 access rules, products, Stripe, viewer (guest/user)
  proxy.ts             Clerk (Next 16 renamed middleware to proxy)
drizzle/               SQL migrations
docs/                  requirements summary, catalog, structures
```
