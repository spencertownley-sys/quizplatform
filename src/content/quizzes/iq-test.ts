import type { QuizDefinition } from "@/lib/engine/types";
import { building } from "./_parts/iq-test/building";
import { exceptional } from "./_parts/iq-test/exceptional";
import { items } from "./_parts/iq-test/items";
import { sharp } from "./_parts/iq-test/sharp";
import { steady } from "./_parts/iq-test/steady";
import { verySharp } from "./_parts/iq-test/very-sharp";

const quiz: QuizDefinition = {
  slug: "iq-test",
  n: 43,
  title: "IQ Test (estimated)",
  tagline: "30 timed puzzles, an honest estimate, and a free result.",
  category: "Brain",
  structure: "ability",
  description:
    "Solve 30 original reasoning puzzles in 20 minutes. Get a free result by skill, with no hidden subscription. An estimate, not a clinical IQ score.",
  disclaimer:
    "This is a free reasoning test for practice and curiosity. It gives an estimate in descriptive bands, not a clinical IQ score, and it can't diagnose anything.",
  method: `This test has 30 original puzzles in four skills: pattern grids, number series, word analogies and spatial reasoning. They get harder as you go, and each correct answer earns its difficulty level (1 to 5 points), so hard items count more. Your band comes from the share of those points you earned, and each skill bar uses the same weighting within that skill. Unanswered items count as wrong.

This is an estimate from a short online test taken at home, not an IQ score. Clinical tests such as the Wechsler scales (WAIS) are given one-to-one by a psychologist or trained examiner, take an hour or more, cover more abilities (memory, processing speed, knowledge), and compare you with a large, carefully sampled norm group. We don't have norms yet, so we show bands, not numbers. Once about 1,000 people have taken this test, we'll add an estimated range with its margin of error.

Your result can shift with sleep, stress, screen size, distractions and practice with this puzzle style. Treat it as a snapshot of how you reasoned today, not a verdict on your intelligence.`,
  minutes: 20,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "pattern",
      label: "Pattern reasoning",
      low: "Building",
      high: "Strong",
      description: "How well you spot the rules hidden in grids of shapes and use them to fill the gap.",
      report: {
        low: "Grid puzzles were the hardest part of the test for you this time. Most missing-tile items depend on spotting two or three rules at once (shape, number, fill, turning), and it's easy to lock onto one rule and miss the others. A low result here often reflects unfamiliarity with this puzzle style more than a fixed limit, and it's a skill that tends to improve quickly with practice. Start by naming every feature that changes across a row before you look at the options.",
        mid: "You handled the simpler grid puzzles and some of the multi-rule ones. Single-rule grids, like a count going up or a shape repeating down a column, were probably straightforward; you likely slowed down when two or three rules ran at once. That's a common stopping point, and the step up is less about seeing harder rules than about checking every feature systematically. Try listing shape, number, fill and turning for each row before you choose.",
        high: "You read the grid puzzles well, including the ones that stacked several rules together. Solving the harder grids means holding shape, number, fill and turning in mind at once and checking each against the rows and columns. That kind of systematic rule-finding is a core part of what psychologists call fluid reasoning. If you missed one, check whether it was a turning rule or an arithmetic rule; those are the usual last holdouts.",
      },
    },
    {
      key: "number",
      label: "Number series",
      low: "Building",
      high: "Strong",
      description: "How quickly you find the rule behind a sequence of numbers and extend it.",
      report: {
        low: "Number sequences gave you the most trouble this time. The easy ones use a single step, like adding 4 or multiplying by 3, but the later ones hide the rule in the gaps between numbers or switch between two operations. If arithmetic under time pressure feels stressful, that alone can pull this result down. Writing the gaps between numbers under each series is the single most useful habit to build here.",
        mid: "You solved the straightforward number series and some of the trickier ones. Rules that stay the same at every step probably clicked quickly, while series built from alternating steps or from patterns in the gaps took longer. That pattern is common and very trainable. The fix is a short routine: check the gaps, then the ratios, then whether two series are taking turns.",
        high: "You found the rules behind number sequences quickly and reliably. The harder items needed a second layer, such as noticing that the gaps themselves form a pattern or that two series alternate, and you handled that well. This usually reflects comfort with numbers plus a habit of testing a guess against every term. Keep it sharp with puzzles that mix operations, where the first rule you notice isn't the real one.",
      },
    },
    {
      key: "verbal",
      label: "Verbal analogies",
      low: "Building",
      high: "Strong",
      description: "How well you spot the relationship between two words and apply it to a new pair.",
      report: {
        low: "Word analogies were the toughest section for you this time. An analogy asks you to name the exact link between two words (part of, opposite of, used for, shortage of) and then find the word with the same link. Misses usually come from picking a word that's related in a different way, or from unfamiliar vocabulary, which a timed test does nothing to account for. Saying the relationship as a full sentence before you look at the options helps a lot.",
        mid: "You solved most of the everyday analogies and some of the harder ones. Clear relationships like \"worn on\" or \"lives in\" were likely easy; the harder items asked you to separate close options, such as a word linked to the topic versus one with exactly the same relationship. Vocabulary plays a part too, and it grows with reading. Practice turning each pair into a precise sentence, then test every option against it.",
        high: "You read word relationships precisely, even when several options looked close. The harder analogies hinge on fine distinctions, such as a shortage versus its effect, or a synonym versus an opposite, and you consistently picked the option with the exact same link. That precision with words tends to help in writing, arguing a point and reading closely. Keep it growing through wide reading, which builds vocabulary better than any word list.",
      },
    },
    {
      key: "spatial",
      label: "Spatial reasoning",
      low: "Building",
      high: "Strong",
      description: "How well you picture shapes being flipped, turned, folded and cut in your mind.",
      report: {
        low: "Mentally turning, flipping and folding shapes was the hardest part for you this time. These items ask you to hold a picture in your head while you change it, which is demanding when the clock is running. Spatial skills are known to improve with hands-on practice, such as folding real paper or building with blocks. Sketching what you imagine, even roughly, also takes a lot of load off your memory.",
        mid: "You handled the simpler spatial items and some of the harder ones. Single moves, like one mirror flip or one fold, were probably manageable; items that combined steps, such as a half turn of a whole grid or a cut through folded paper, asked more of your mental workspace. That's a normal place to plateau, and it moves with practice. Try building your mental picture one step at a time instead of all at once.",
        high: "You manipulated shapes in your head accurately, even across several steps. Picturing a half turn of a whole grid, or an unfolded sheet after a cut, takes a stable mental image and careful tracking, and you managed both. Strong spatial reasoning often shows up in design, engineering, sports and finding your way around. To stretch it, try 3D puzzles or sketching familiar objects from memory at a new angle.",
      },
    },
  ],
  questions: items,
  outcomes: [building, steady, sharp, verySharp, exceptional],
  // Difficulty-weighted accuracy (0–1): each correct item scores its difficulty; max 89 points.
  // Descriptive cut points, not norms. Revisit once ~1,000 takers give real data.
  bands: {
    on: "overall",
    bands: [
      { min: 0, outcome: "building" },
      { min: 0.3, outcome: "steady" },
      { min: 0.5, outcome: "sharp" },
      { min: 0.7, outcome: "very_sharp" },
      { min: 0.85, outcome: "exceptional" },
    ],
  },
  ability: { timeLimitSec: 1200 },
  seo: {
    intro: `This free IQ test gives you 30 original puzzles in 20 minutes: pattern grids, number series, word analogies and spatial problems that get harder as you go. When you finish, you see your result band and a breakdown by skill for free, with no sign-up wall and no hidden subscription. We're upfront about what it is: an estimate of how you reasoned today, not a clinical IQ score, so we don't print a made-up number. Once enough people have taken the test to make fair comparisons, we'll add an estimated range with its margin of error. Until then, you get honest bands and clear explanations.`,
    measures: `The test samples four kinds of reasoning that appear, in some form, on most intelligence tests. Pattern grids show a 3×3 set of tiles with one missing; you work out the rules for shape, number, shading and turning, then pick the tile that fits. Number series ask you to find the rule behind a sequence. Word analogies ask you to name the exact link between two words and apply it to a new pair. Spatial items ask you to mirror, turn, fold and cut shapes in your head.

Items rise from easy to hard, and harder items are worth more: a level-5 puzzle counts five times as much as a level-1 puzzle. Your band reflects the share of points you earned, and each skill gets its own bar, so you can see whether you're more at home with shapes, numbers or words. The 20-minute limit adds some time pressure, as most reasoning tests do, but there's enough time to think if you keep moving.

What it doesn't measure matters just as much. There's no memory, general knowledge or processing-speed section, which full clinical tests include. A single online session can't account for a bad night's sleep, a noisy room or a small phone screen. Treat your result as a well-made practice estimate, and if you need a formal assessment for school, work or health reasons, ask a licensed psychologist.`,
    origin: `Modern intelligence testing began in 1905, when Alfred Binet and Théodore Simon built a test to find French schoolchildren who needed extra support. The term "intelligence quotient" came from William Stern in 1912, and Lewis Terman's Stanford–Binet (1916) and David Wechsler's scales (from 1939) followed. Grid puzzles like the ones here trace back to John C. Raven's Progressive Matrices in 1938, designed to rely less on language and schooling.

Every one of these tests was normed: given to large, carefully sampled groups so that a score means something compared with other people. That's the step a quick online test can't skip, and it's why we show bands instead of a number until we have real data. Average scores have also drifted over the decades, and people improve with practice on the same puzzle types, two more reasons to hold any single result lightly.`,
    faqs: [
      {
        q: "Is this a real IQ test or a fake one?",
        a: "It's a real set of reasoning puzzles, written for this site and scored the same way for everyone. It isn't a clinical IQ test: those are given one-to-one by a psychologist and compared with a large norm group. Many free IQ tests online show an impressive number and then charge for it, sometimes through a subscription. We do the opposite: your band and skill breakdown are free, we don't invent a number, and paid reports are one-time purchases that never sign you up for anything.",
      },
      {
        q: "Why don't I get an IQ number?",
        a: "A number only means something when it's compared with a large group of people who took the same test under similar conditions. We don't have that data yet, so any number we showed would be made up. Once about 1,000 people have taken this test, we'll add an estimated range with a margin of error and explain how it was calculated. Until then, you get descriptive bands based on how many points you earned.",
      },
      {
        q: "Is it really free? Is there a hidden subscription?",
        a: "Your result band and skill breakdown are free, with no account needed. If you want more, you can buy a one-time Snapshot or Deep Report with an item-by-item answer review and a practice plan. A one-time purchase never starts a subscription. All-Access is a separate product with its own button and checkout, shows the price and renewal terms up front, and can be cancelled in two clicks.",
      },
      {
        q: "How long does it take?",
        a: "There are 30 items and a 20-minute limit, so plan on about 20 minutes somewhere quiet. Items get harder as you go and harder items are worth more points, so it pays to keep a few minutes for the end. If time runs out, unanswered items count as wrong. Use a laptop or tablet if you can, because the grid puzzles are easier to see on a bigger screen.",
      },
      {
        q: "Can I improve my result?",
        a: "Yes, and that's one reason to treat any single result with care. People get better at grid, number and analogy puzzles with practice, partly because they learn the common rule types, so a retake measures practice as well as reasoning. Sleep, stress and distractions also move results. If you retake, wait a few weeks, test at a similar time of day, and compare your skill bars rather than chasing a band.",
      },
      {
        q: "Can I use this result for school, a job or a diagnosis?",
        a: "No. This test isn't validated for admissions, hiring or clinical decisions, and it can't identify a learning disability, giftedness or any condition. Those questions need a formal assessment by a licensed psychologist, who will use a standardized test, talk with you and consider your history. What this test can do is give you a free, honest snapshot of your reasoning across four skills and point you to ways to practice.",
      },
    ],
    keywords: ["iq test", "free iq test", "fake iq test"],
  },
  related: ["reaction-time-test", "aphantasia-test", "big-five-personality-test"],
  reviewNotes: `Items are original. The painted-cube and paper-folding items are generic folk puzzle types, newly worded, not copied from any commercial test.

Figure conventions the items and explanations assume, checked against src/components/Figure.tsx (re-check if the renderer changes):
- rotate is in degrees CLOCKWISE, an unrotated triangle points UP, and an unrotated line is flat (explanations for p3, p5, p6, p9, s2 and s6 describe directions).
- A cell with two shape entries (p6) is drawn side by side: the outline shape on the left, the line on the right. The p6 explanation doesn't depend on layout.
- Lines only use 0°, 45° and 90° (p6) or 45° (s6), so the 180° symmetry of a line never makes two options look the same. Squares and diamonds are never rotated, so a rotated square can't be mistaken for a diamond, and striped shapes are never rotated.
- Each matrix was checked with a script: the stated rule holds for the full grid with the keyed option and fails for every other option, and no two options render identically.

Items to double-check for a single defensible answer:
- p9 (rotations add up across a row) is the most abstract item. The right column (135°, 225°) also suggests "+90° → 315°" if read alone; 315° is deliberately left out of the options, so no option fits that misreading.
- s1 (mirror letter) assumes a font where W is left-right symmetrical.
- v4 (famine → food) and v6 (letter → word) were checked for near-miss options ("hunger", "page"); "page" was removed from v6.

Bands are descriptive cut points on difficulty-weighted accuracy (max 89 points): 0 / 0.30 / 0.50 / 0.70 / 0.85. They are not norms; revisit them once ~1,000 takers give real data, and add the estimated range with its margin of error only then.

Copy never states an IQ number, percentile or population comparison. Per-skill maxima: pattern 29, number 20, verbal 19, spatial 21 points.`,
};

export default quiz;
