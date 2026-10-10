import { AGREE_7 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { dimensions } from "./_parts/16-type/dimensions";
import { enfj } from "./_parts/16-type/enfj";
import { enfp } from "./_parts/16-type/enfp";
import { entj } from "./_parts/16-type/entj";
import { entp } from "./_parts/16-type/entp";
import { esfj } from "./_parts/16-type/esfj";
import { esfp } from "./_parts/16-type/esfp";
import { estj } from "./_parts/16-type/estj";
import { estp } from "./_parts/16-type/estp";
import { compare, modifierBlocks } from "./_parts/16-type/extras";
import { infj } from "./_parts/16-type/infj";
import { infp } from "./_parts/16-type/infp";
import { intj } from "./_parts/16-type/intj";
import { intp } from "./_parts/16-type/intp";
import { isfj } from "./_parts/16-type/isfj";
import { isfp } from "./_parts/16-type/isfp";
import { istj } from "./_parts/16-type/istj";
import { istp } from "./_parts/16-type/istp";
import { questions } from "./_parts/16-type/questions";

const quiz: QuizDefinition = {
  slug: "16-type-personality-test",
  n: 1,
  title: "16-Type Personality Test",
  tagline: "Find your four-letter type and what it says about how you live.",
  category: "Personality",
  structure: "typology",
  description:
    "A free 16-type personality test with 70 original questions. Get your four-letter type, a composure modifier and honest, practical insight.",
  disclaimer:
    "This test is for self-reflection, not a clinical, hiring or diagnostic assessment. It's an original questionnaire and isn't affiliated with any other personality test or publisher.",
  method: `You rated 70 statements on a seven-point scale from "Strongly disagree" to "Strongly agree." Sixty of them feed the four letter axes, 15 each: energy (I or E), information (S or N), decisions (T or F) and structure (J or P). About half of each axis is worded toward each letter, so agreeing with everything doesn't push you toward one result. Nine more statements measure composure, which becomes your Composed or Striving modifier. One statement only checks that you were reading and isn't scored.

Each axis score is the share of possible points on that axis, from 0 to 100 percent. At 50 percent or above you get the second letter (E, N, F or P); below 50 you get the first (I, S, T or J). Scores near the middle mean that letter was a close call, so the neighboring type is worth reading too.

This is a self-report snapshot of how you see yourself today. It describes preferences, not abilities, and it can shift with mood, stress and life changes. Types are a useful shorthand for real differences, but people don't fall neatly into 16 boxes. Use your result as a starting point for reflection, not a verdict.`,
  minutes: 12,
  paywall: "free_headline",
  minAge: 13,
  scale: AGREE_7,
  status: "draft",
  dimensions,
  outcomeDimensions: ["energy", "information", "decisions", "structure"],
  questions,
  outcomes: [intj, intp, entj, entp, infj, infp, enfj, enfp, istj, isfj, estj, esfj, istp, isfp, estp, esfp],
  typology: {
    mode: "axes",
    axes: [
      { dimension: "energy", low: "I", high: "E" },
      { dimension: "information", low: "S", high: "N" },
      { dimension: "decisions", low: "T", high: "F" },
      { dimension: "structure", low: "J", high: "P" },
    ],
  },
  extras: [{ key: "modifier", label: "Modifier", kind: "pole", dimension: "composure", low: "Striving", high: "Composed" }],
  extraBlocks: { modifier: modifierBlocks },
  compare,
  seo: {
    intro: `Some people leave a party buzzing, and others leave it craving a quiet evening. Some trust the facts in front of them, while others chase the pattern behind them. This free 16-type personality test sorts those everyday differences into four letters, giving you one of 16 types, plus a modifier that shows how steady you tend to feel under pressure. It takes about 12 minutes and uses 70 original questions about real situations, from packing for a trip to handling a friend's bad news. You'll get your type, a plain-language summary and ideas you can actually use.`,
    measures: `The test looks at four preferences, each on a scale between two poles. Energy asks where you recharge: alone and in quiet (I) or with people and activity (E). Information asks what you trust first: concrete facts and experience (S) or patterns and possibilities (N). Decisions asks what you weigh most: logic and consistency (T) or people and values (F). Structure asks how you like to live: planned and settled (J) or open and flexible (P).

Your four letters combine into one of 16 types, each with its own name here, such as the Cartographer (INTJ) or the Bonfire (ESFP). Every letter is a preference, not a skill. An introvert can give a great speech, and a planner can enjoy a spontaneous weekend. The letters describe what feels natural and what takes more effort.

The test also measures a fifth trait, composure. A Composed result means you tend to stay steady under pressure and recover fairly quickly from setbacks. A Striving result means you hold yourself to a high bar and feel criticism and mistakes more sharply. Composure isn't one of the four letters. It's a modifier that changes how your type tends to show up, especially when life gets hard.`,
    origin: `The idea of psychological types goes back to the Swiss psychiatrist Carl Jung, who wrote about introversion, extraversion and different ways of perceiving and judging in 1921. Later in the 20th century, several questionnaires turned his ideas into four-letter codes, and the format became one of the most popular ways people talk about personality.

It's worth knowing the limits. Most personality researchers prefer trait models, such as the Big Five, which measure each trait on a continuous scale rather than sorting people into categories. Many people score near the middle on at least one axis, and a close score can flip on a retake. Treat your type as a helpful lens for understanding yourself and others, not a box or a prediction of what you can achieve.`,
    faqs: [
      {
        q: "Is this the same as other four-letter personality tests?",
        a: "It uses the same widely known four-letter format, which grew out of Carl Jung's work on psychological types, but every question, type name and description here is original. It isn't affiliated with, endorsed by or a copy of any commercial assessment. Your four-letter code will often line up with what you've seen elsewhere, but because the questions differ, a close letter could come out differently. If one of your scores was near the middle, read both neighboring types and see which fits better.",
      },
      {
        q: "What does the Composed or Striving modifier mean?",
        a: "The modifier comes from nine questions about how you handle pressure, mistakes and criticism. Composed means you tend to stay steady and bounce back fairly quickly. Striving means you hold yourself to a high bar and feel setbacks more sharply. Neither is better. Composed people can miss warning signs, and Striving people often grow fast because they care so much. The modifier is shown with your type because the same four letters can look quite different depending on how steady you feel.",
      },
      {
        q: "Can my type change over time?",
        a: "Your core preferences tend to be fairly stable in adulthood, but your scores can move. Stress, a new job, a big life change or simply growing older can shift how you answer, especially on axes where you're close to the middle. Many people also develop their less natural side over time, so a strong planner might become more comfortable improvising. If you retake the test after a year and get a different letter, that's useful information, not a mistake.",
      },
      {
        q: "How accurate is a 16-type test?",
        a: "It's a self-report questionnaire, so it can only reflect how you see yourself, and it describes preferences rather than abilities. Researchers have pointed out that sorting people into types loses detail, since most traits run on a continuum. That's why the reports show how strongly you leaned on each axis. The test is best used for reflection and conversation, not for hiring, diagnosis or big life decisions. If your result doesn't fit, trust your own judgment and read the neighboring types.",
      },
      {
        q: "Why did I get a type that doesn't feel like me?",
        a: "A few things can cause this. You may be close to the middle on one or more axes, so a single answer tipped the letter. You might have answered as the person you want to be, or as you act at work rather than at home. Stress can also change how you respond. Try reading the type that differs by your closest letter. Many people find the best fit by reading two or three nearby types and noticing which one feels most familiar.",
      },
      {
        q: "Is the test free?",
        a: "Yes. Taking the test and seeing your four-letter type, type name and summary are free. If you want more depth, you can choose to buy an optional report with your scores on every axis and a longer, personalized write-up covering relationships, work, stress and growth. You can also invite a partner or friend to take the test and compare your results side by side.",
      },
    ],
    keywords: ["16 personalities test", "mbti test", "personality test", "personality type test"],
  },
  related: ["big-five-personality-test", "enneagram-test", "color-personality-test"],
  reviewNotes: `Original items and type names; no commercial type names, no "MBTI"/"Myers-Briggs" in visible copy (only in seo.keywords). Please confirm:
- Trademark check on the 16 type names (Cartographer, Model Maker, Expedition Leader, Maverick, Lantern, Poet, Bridge Builder, Spark, Keystone, Hearthkeeper, Standard-Bearer, Gatherer, Troubleshooter, Wildflower, Live Wire, Bonfire) and the seo.keywords strategy (keywords contain a trademark; they are never rendered).
- Famous examples are framed as "often described as" and reflect common fan typings, not tested results. Recently deceased public figures used: Elizabeth II (d. 2022), Chuck Yeager (d. 2020), Fred Rogers, Bob Ross, Johnny Cash, Audrey Hepburn, Bruce Lee, Maya Angelou, Richard Feynman. Fictional examples are from works public domain in the US (Austen, Brontë, Dickens, Dumas, Verne, Hugo, Twain, Alcott, Montgomery, Grahame, Defoe, Doyle, Barrie, Shakespeare). Peter Pan has a special UK performance-royalty arrangement; confirm it's fine to name in text.
- Pairing sections describe common dynamics, not compatibility claims; check tone.
- The FAQ "Is the test free?" describes the paid report generically; confirm it matches the live offer (catalog offer: "full").
- Engine notes: a taker scoring exactly 50% on an axis gets the second letter (E/N/F/P). compareResults uses outcomeDimensions, so with outcomeDimensions set to the four axes the composure compare copy is not shown in comparisons unless the engine changes.`,
};

export default quiz;
