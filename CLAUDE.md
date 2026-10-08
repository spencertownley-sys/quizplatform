# Notes for Claude

Quiz platform: free result on every quiz, paid reports ($0.99 Snapshot, $2.99 Deep, $9.99/mo All-Access). See README.md and docs/REQUIREMENTS.md.

## Non-negotiables
- A one-time purchase must never enroll anyone in a subscription. All-Access is its own product, its own button, its own checkout.
- Subscription checkout must show price, monthly renewal and how to cancel next to the pay button. Cancel stays two clicks (Stripe Customer Portal).
- No dark patterns: no fake timers, fake viewer counts, pre-checked boxes, or hidden cancellation.
- Screeners (structure "screener", isScreener) are always free and never sell reports.
- No licensed IP in quizzes or reports: no Harry Potter/Hogwarts, Disney, Pokémon, MBTI, CliftonStrengths or "5 Love Languages" names. Write original items; public-domain scales (IPIP, VVIQ, Rosenberg, PHQ-9, GAD-7) are fine.
- Score on the server only (`scoreQuiz` validates answers). Never trust client-computed results.
- Don't show percentiles until a quiz has ~1,000 takers of norm data.

## Stack quirks
- Next.js 16: middleware is `src/proxy.ts`; `params`/`searchParams`/`cookies()` are async. Docs ship in `node_modules/next/dist/docs`.
- Clerk Core 3 (`@clerk/nextjs` v7): `<SignedIn>`/`<SignedOut>` are removed; use `<Show when="signed-in">`.
- Drizzle, not Prisma. Edit `src/db/schema.ts`, then `npm run db:generate`.
- `db()` and `stripe()` connect lazily so `next build` works without secrets.

## Checks before committing
`npm test && npm run lint && npm run build` (build needs NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY set; any well-formed test key works).
