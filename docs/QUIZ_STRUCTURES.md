# Quiz structures

All 100 quizzes fit 10 reusable structures, so the engine needs 10 scorers and 10 report templates, not 100. Engine name in brackets. All ten are implemented in `src/lib/engine` (T10's ephemeris is `astro.ts`). How to configure each one: [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

| Code | Structure | How it works | Items | Answer format | Scoring | Free | $0.99 Snapshot | $2.99 Deep Report | Examples |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Trait profile [`trait_profile`] | 1–6 continuous traits | 20–120 | 5- or 7-point agree/disagree | Sum per trait, reverse-score some items | Top trait + one line | Every trait score | Facet breakdown, work/love/stress, growth plan | Big Five, EQ, HSP, aphantasia |
| T2 | Typology [`typology`] | One of 4–16 types | 30–90 | Agree/disagree or forced choice | Points per type; highest wins | Type + summary | Score for every type, runner-up | Full type profile, pairings, careers | 16-type, enneagram, love language |
| T3 | Two-axis quadrant [`two_axis_quadrant`] | Two scores on a 2×2 map | 20–40 | 7-point agree/disagree | Two sums vs. cutoff | Quadrant name | Exact position on both axes | Quadrant profile, partner pairings, growth | Attachment, DISC, conflict, political values |
| T4 | Ability test [`ability`] | Right/wrong, rising difficulty | 20–40 | Multiple choice, often timed | Weighted correct answers vs. our norms | Score band | Estimate, per-skill breakdown | Answer review, practice plan, certificate | IQ, vocabulary, logic, trivia |
| T5 | Performance tool [`performance`] | Measures speed or perception | 5–20 trials | Clicks, taps, typing | Median of trials | Score | Percentile by age | History, drills (All-Access) | Reaction time, typing, memory |
| T6 | Persona match [`persona_match`] | One of 6–16 fun outcomes | 10–20 | Pick one of 4 | Options add points to outcomes | Outcome + share card | % match to every outcome | Persona story, compatible personas | Magic academy house, spirit animal |
| T7 | Recommender [`recommender`] | Preferences → ranked list | 10–25 | Single/multi-select, sliders | Filters, then weighted similarity | Top match | Top 5 with reasons | Full ranked list + next steps | Career, color season, dog breed |
| T8 | Screener [`screener`] | Published instrument, fixed scoring | 6–20 | Frequency scale | Published bands, unchanged | Full result, free | Not sold | Not sold | ADHD, depression, anxiety |
| T9 | Compare / couples [`compare`] | Two people take the same quiz | Base quiz | Same as base | Each scored, then compared | Own result + invite | Side-by-side | Joint report, conversation prompts | Compatibility, friendship |
| T10 | Chart calculator [`chart`] | Chart from birth data | 3 inputs | Date, time, place | Ephemeris calculation | Big three | Full chart | Interpretation of every placement | Birth chart, human design |

## Rules for every quiz
- Original items only. Public-domain scales (IPIP, VVIQ, Rosenberg, PHQ-9, GAD-7; confirm WHO ASRS terms) are fine.
- About a third of trait items reverse-keyed (`lintQuiz` warns under 20%).
- One idea per question, under 20 words, 8th-grade reading level (`lintQuiz` flags over 25 words).
- One attention check on quizzes over 40 items; flag, don't block.
- No percentile before ~1,000 takers. No precise IQ number from a short quiz without a stated margin.
- Screeners stay exactly as published, show crisis resources when a risk item is endorsed (988 in the US), and always say a screen isn't a diagnosis.
- Every outcome needs a 3-sentence free summary, Snapshot bullets and Deep Report sections.

Detailed blueprints for the 20 Wave 1 quizzes are in the "Quiz Structures" tab of the requirements doc.
