# Notes for Claude

Quiz platform: free result on every quiz, paid reports ($0.99 Snapshot, $2.99 Deep, $1.99 comparison, $4.99 bundles, $9.99/mo All-Access). See README.md and docs/REQUIREMENTS.md. Writing quiz content: docs/CONTENT_GUIDE.md.

## Non-negotiables
- A one-time purchase must never enroll anyone in a subscription. All-Access is its own product, its own button, its own checkout.
- Subscription checkout must show price, monthly renewal and how to cancel next to the pay button, with an unchecked consent box. Cancel stays two clicks (dashboard or receipt email → Stripe Customer Portal).
- No dark patterns: no fake timers, fake viewer counts or reviews, pre-checked boxes, or hidden cancellation. Social proof shows real numbers only.
- Screeners (structure "screener", isScreener) are always free, never paywalled, published wording unchanged, crisis resources on risk items.
- No licensed IP in quizzes or reports: no Harry Potter/Hogwarts, Disney, Pokémon, MBTI, CliftonStrengths or "5 Love Languages" names (`lintQuiz` blocks them). Original items; public-domain scales (IPIP, VVIQ, Rosenberg, PHQ-9, GAD-7) are fine.
- Score on the server only (`scoreQuiz` validates answers). Never trust client-computed results.
- Paid text is never sent to a browser that hasn't paid: `buildReport` leaves it out of the model (blur is decoration over placeholder copy). Keep it that way; `src/lib/lib.test.ts` checks it.
- Don't show percentiles or IQ-style estimates until a quiz has ~1,000 takers (`NORM_MIN`).
- Only `live` quizzes sell reports; content ships as `draft` until a person publishes it in /admin.

## Stack quirks
- Next.js 16: middleware is `src/proxy.ts`; `params`/`searchParams`/`cookies()` are async. Docs ship in `node_modules/next/dist/docs`.
- Clerk Core 3 (`@clerk/nextjs` v7): `<SignedIn>`/`<SignedOut>` are removed; use `<Show when="signed-in">`. Route matchers are deprecated: check access in pages and routes (`requireUser`, `adminUser`, ownership checks).
- Clerk is optional in development: without keys, `src/lib/auth.ts` uses a dev sign-in cookie. Always go through `currentUser()`/`currentUserId()`, never Clerk's `auth()` directly.
- Drizzle, not Prisma. Edit `src/db/schema.ts`, then `npm run db:generate` and check the SQL (backfill before NOT NULL).
- `db()` and `stripe()` connect lazily so `next build` works without secrets. The quiz registry falls back to code definitions when the database is unreachable.
- Quiz files are registered in a generated `src/content/quizzes/_registry.ts` (`npm run content:registry`).
- Payment fulfilment lives in `src/lib/fulfill.ts` and is shared by the Stripe webhook and dev fake payments; keep handlers idempotent.

## Checks before committing
`npm test && npm run lint && npm run build`. For flow changes, also run `npm run e2e` against `npm run dev` with `DEV_FAKE_PAYMENTS=1 ALLOW_DRAFT_SALES=true DEV_ADMIN=1` (truncate the dev database first).
