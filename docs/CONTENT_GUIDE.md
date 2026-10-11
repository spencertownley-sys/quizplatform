# Writing a quiz

Every quiz is one TypeScript file in `src/content/quizzes/<slug>.ts` that default-exports a `QuizDefinition` (types and comments: `src/lib/engine/types.ts`). The engine scores it, the site renders its landing page, runner, free result, Snapshot, Deep Report, PDF and share card from it. Nothing else needs code.

Admins can later edit any quiz in `/admin` without a deploy; the file is the starting point.

## Checklist

1. Find the quiz in `src/content/catalog.ts`. Use its `n`, its `slug` (also the file name), its `category`, and the structure code (T1–T10) from `docs/QUIZ_STRUCTURES.md`.
2. Write the file (template below).
3. Check it: `QUIZ=<slug> npx vitest run src/content` (lint + every outcome reachable) and `npm run check:content` (types; only errors in your own file matter).
4. `npm run content:registry` adds it to the site.
5. Leave `status: "draft"` and list anything a reviewer must confirm in `reviewNotes`. A person reviews the copy in `/admin` and publishes it; only `live` quizzes sell reports.

## Rules (from the requirements doc)

- **Original items.** Never copy items from commercial tests. Public-domain sources are fine: IPIP (Big Five and many traits), VVIQ (aphantasia), Rosenberg (self-esteem), PHQ-9, GAD-7, WHO ASRS (licence to confirm).
- **No licensed IP anywhere a taker can see:** no Harry Potter/Hogwarts/house names, Disney, Pokémon, MBTI or Myers-Briggs, 16Personalities type names, CliftonStrengths/StrengthsFinder, "5 Love Languages", "Everything DiSC". Lint blocks these. Target keywords that contain them go only in `seo.keywords` (never rendered).
- **One idea per question, under 20 words, 8th-grade reading level.** Lint fails over 25 words.
- **Balance the wording.** About a third of agree/disagree items reverse-keyed (`reverse: true`); lint fails under 20%.
- **Attention check on quizzes over 40 items:** `{ id: "check", kind: "attention", text: "To show you're reading, choose \"Agree\" for this one.", expect: 4 }` (`expect` is the scale value of "Agree": 4 on 5-point, 6 on 7-point). Put it past the middle. It flags, never blocks.
- **Show no result the data can't support.** Never write a percentile, "top 5%", an IQ number, or "research shows X%" in copy. Percentiles are added by the site only after ~1,000 takers.
- **Screeners (T8)** stay exactly as published, are always free (`isScreener: true`, `sellsReports: false`), cite their source, and say a screen is not a diagnosis.
- **Honest framing.** Self-reflection, not diagnosis. No medical, legal or financial advice. "Many people with this pattern…" beats "You are…". No fake statistics, no made-up studies, no invented quotes.
- **Famous examples** (where the blueprint asks for them): historical figures or public-domain fictional characters, framed as "often described as", never "is". No living private individuals.
- **Age:** `minAge: 18` for relationship and money quizzes, `13` otherwise.

## Fields and lengths

| Field | What to write |
| --- | --- |
| `title`, `tagline`, `description` | Catalog title; a one-line promise for cards (≤ 70 chars); 1–2 sentences for the landing page and meta description (≤ 160 chars). |
| `minutes` | Honest estimate: ~6 items a minute for agree/disagree, ~4 for scenarios. |
| `instructions` | Optional line shown above every item, e.g. a screener's time frame ("Over the last 2 weeks…") or "Pick the statement that sounds more like you." |
| `disclaimer` | One or two sentences on what the quiz is and isn't. Required for anything health- or relationship-adjacent. |
| `method` | 120–200 words: how scoring works in plain language, what the score can and can't tell you, and that it's a self-report snapshot. Closes the Deep Report. |
| `scale` | A preset from `src/lib/engine/scales.ts` (`AGREE_5`, `AGREE_7`, `LIKE_5`, `TRUE_5`, `VIVIDNESS_5`, `PHQ_FREQUENCY`, `ASRS_FREQUENCY`) or your own `{ labels }`. |
| `dimensions[]` | `key`, `label`, `low`/`high` pole labels, a one-sentence `description`, and `report: { low, mid, high }`: 3–5 sentences each, second person, specific. **The first sentence of each band is shown alone in the Snapshot**, so it must stand alone. Bands: low < 35%, mid 35–65%, high > 65%. |
| `facets[]` | Optional sub-scores (Big Five facets, HSP subscales) with the same `report` bands (2–3 sentences each). |
| `outcomes[]` | See below. |
| `seo` | The public landing page, 600–1,000 words total: `intro` (80–120 words), `measures` (2–3 paragraphs, ~250 words), `origin` (history and limits, 1–2 paragraphs, ~150 words), `faqs` (5–6, answers 50–100 words), `keywords` (the catalog's target keywords). |
| `related` | 2–4 slugs of other quizzes to suggest next. |

### Each outcome

| Field | Length | Shown |
| --- | --- | --- |
| `name` | 1–4 words | Free |
| `tagline` | ≤ 70 chars | Free, share card |
| `emoji` | one emoji | Free, share card (optional but nice) |
| `summary` | 2–3 sentences | Free result |
| `about` | 150–300 words | Public SEO page for this outcome (e.g. "Anxious attachment style"). Describes the outcome generally; never paste paid text here. |
| `snapshot` | 4–6 bullets, one line each | $0.99 Snapshot |
| `deep` | 6–8 sections, each `{ title, teaser, body }` | $2.99 Deep Report |

**Deep sections.** `teaser` is the first one or two sentences, shown unblurred as the paywall preview, so make it specific and intriguing ("Your answers point to uncertainty as your main trigger, especially…"). `body` continues from the teaser (don't repeat it), 250–450 words, plain paragraphs separated by a blank line; lines starting with `- ` render as bullets. Cover what the blueprint lists for the quiz (strengths, blind spots, relationships, work, stress, growth plan…). End the last section with concrete next steps.

The site assembles the Deep Report from: the summary, every dimension's band text for this taker's scores, your deep sections, structure extras (runner-up type, wing, ranked matches, answer review…), and `method`. That is what makes it 15–25 pages and personal: write the dimension band text with as much care as the sections.

### Structure-specific config

- **T1 trait profile** (`trait_profile`): outcome = top dimension (one outcome per dimension), or set `bands` to cut a score into levels (`on: "overall"`, `"mean"`, or `{ dimension }`; `min` values are 0–1 inclusive lower bounds, lowest must be 0).
- **T2 typology** (`typology`): `typology: { mode: "highest" }` with one outcome per competing dimension (`outcomeDimensions` limits which dimensions compete), or `{ mode: "axes", axes: [{ dimension, low: "I", high: "E" }, …] }` with one outcome per letter combination, keyed lowercase (`"intj"`). `extras` add wing (`kind: "wing"`), instinct (`kind: "top_of"`), modifiers (`kind: "pole"`). `extraBlocks[extraKey][value]` (or `[`${outcome}:${value}`]`) adds a Deep Report block per extra value.
- **T3 quadrant** (`two_axis_quadrant`): `quadrant: { x, y, cutoff: 0.5, map: { low_low, high_low, low_high, high_high } }`.
- **T4 ability** (`ability`): `kind: "ability"` items with `dimension` (skill), `difficulty` 1–5, `options`, `correct`, `explanation`, optional `figure` (3×3 matrix; see types). `ability: { timeLimitSec }`. `bands: { on: "overall", … }` cut the difficulty-weighted accuracy into honest descriptive bands.
- **T5 performance** (`performance`): a `speed` dimension, `performance` config, `bands` on `{ dimension: "speed" }`. No questions.
- **T6 persona** (`persona_match`): `choice` items (use `display: "tiles"` + `emoji` per option for image-style picks); each option adds points to 1–3 outcomes (`weights`). One outcome per dimension unless `bands`.
- **T7 recommender** (`recommender`): items feed dimensions; `recommender.catalog` items have a target `profile` (0–1 per dimension) plus `facts`, `colors`, `links`; `outcome: "top_item"` (one outcome per catalog item) or `"top_dimension"`; `similarity: "distance"` for attribute matching, `"correlation"` for interest inventories.
- **T8 screener** (`screener`): published items and scale, `bands` on `"raw_total"` or `"count_at_threshold"` (with per-item `threshold`), `screener: { source, riskItems }`.
- **T9 compare** (`compare`): scored like T1, plus `compare: { invite, other, dimensions: { [dim]: { match, differ, prompts[] } } }`. Any quiz can add `compare` to enable partner invites.
- **T10 chart** (`chart`): no questions; `chart: { bodies }`, dimensions `fire/earth/air/water`, one outcome per sun sign, `extraBlocks.moon[sign]` and `extraBlocks.rising[sign]`.

## Template

```ts
import { AGREE_5 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";

const quiz: QuizDefinition = {
  slug: "example-quiz",
  n: 0,
  title: "Example Quiz",
  tagline: "Find out …",
  category: "Personality",
  structure: "trait_profile",
  description: "…",
  disclaimer: "This quiz is for self-reflection, not a clinical assessment.",
  method: "…",
  minutes: 5,
  paywall: "free_headline",
  minAge: 13,
  scale: AGREE_5,
  status: "draft",
  dimensions: [
    {
      key: "warmth",
      label: "Warmth",
      low: "Reserved",
      high: "Warm",
      description: "How readily you show care and friendliness.",
      report: { low: "…", mid: "…", high: "…" },
    },
  ],
  questions: [
    { id: "w1", kind: "likert", dimension: "warmth", text: "I make new people feel welcome." },
    { id: "w2", kind: "likert", dimension: "warmth", text: "I keep my feelings to myself around strangers.", reverse: true },
  ],
  outcomes: [
    {
      key: "warmth",
      name: "The Host",
      tagline: "People relax around you.",
      emoji: "🫖",
      summary: "…",
      about: "…",
      snapshot: ["…", "…", "…", "…"],
      deep: [{ title: "…", teaser: "…", body: "…" }],
    },
  ],
  seo: { intro: "…", measures: "…", origin: "…", faqs: [{ q: "…", a: "…" }], keywords: ["…"] },
  related: ["big-five-personality-test"],
  reviewNotes: "…",
};

export default quiz;
```
