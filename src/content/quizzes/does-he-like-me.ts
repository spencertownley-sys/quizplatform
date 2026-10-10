import type { QuizDefinition } from "@/lib/engine/types";
import { hardToRead } from "./_parts/does-he-like-me/hard-to-read";
import { maybeMore } from "./_parts/does-he-like-me/maybe-more";
import { notYet } from "./_parts/does-he-like-me/not-yet";
import { promising } from "./_parts/does-he-like-me/promising";
import { questions } from "./_parts/does-he-like-me/questions";
import { seo } from "./_parts/does-he-like-me/seo";
import { strongSignals } from "./_parts/does-he-like-me/strong-signals";

const quiz: QuizDefinition = {
  slug: "does-he-like-me",
  n: 28,
  title: "Does He Like Me?",
  tagline: "Read the signs honestly, then learn how to find out for sure.",
  category: "Relationships",
  structure: "persona_match",
  description:
    "20 questions about how he acts around you show how many signs of interest are there, and how to find out for sure. Honest, not hype.",
  disclaimer:
    "This quiz reads common signs of interest from what you've noticed. It can't read his mind or promise anything, and the only way to know how he feels is to ask him.",
  instructions: "Think about how he's acted toward you over the last few weeks. Pick the answer closest to what you've actually seen, not what you hope.",
  method: `Each of the 20 questions describes something you may have noticed about how he acts. Every answer has a score from 0 to 3, based on how strongly that behavior usually points to romantic interest. Effort-based behavior, like starting conversations and making plans, scores highest. Answers that don't apply, like not texting at all, score a little below the middle, since they don't give evidence either way. Hurtful jokes never count as interest.

Your total is turned into a share of the highest possible score and placed in one of five bands: under 30% is Not Showing Interest Yet; 30% to 47% is Hard to Read; 48% to 63% is "Friendly, Maybe More"; 64% to 79% is Promising Signs; and 80% or more is Strong Signals. These bands are our own judgment, not research norms.

The quiz only reflects what you've noticed, seen through your own hopes and worries. It can't account for shyness, culture, family rules or what's happening in his life, and it can't tell you how he feels. The only way to know is to ask.`,
  minutes: 5,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "interest",
      label: "Interest signals",
      low: "Few signs",
      high: "Many signs",
      description: "How many common signs of romantic interest you've noticed in the way he treats you.",
      report: {
        low: "You've noticed few of the common signs of romantic interest so far. He may be friendly in passing, but he isn't often seeking you out, following up or treating you differently from anyone else. That says nothing about what he thinks of you as a person, and it can change. For now, the most honest reading is that he isn't showing romantic interest in ways you can see.",
        mid: "You've noticed a mix: some real signs of interest alongside neutral or cooler ones. That's the most common place to be and often the most confusing. It can mean he's shy, unsure how you feel, simply friendly, or interested but holding back. Signals alone can't settle it, which is why a low-pressure way to find out is your best next step.",
        high: "You've noticed many of the common signs of interest: he seeks you out, remembers what you say and treats you a little differently from everyone else. Those are meaningful signals, especially the ones that take real effort. They still aren't a guarantee, because a few people are this warm with close friends too. This is usually a good moment to show some interest of your own and see how he responds.",
      },
    },
  ],
  questions,
  bands: {
    on: { dimension: "interest" },
    bands: [
      { min: 0, outcome: "not_yet" },
      { min: 0.3, outcome: "hard_to_read" },
      { min: 0.48, outcome: "maybe_more" },
      { min: 0.64, outcome: "promising" },
      { min: 0.8, outcome: "strong_signals" },
    ],
  },
  outcomes: [notYet, hardToRead, maybeMore, promising, strongSignals],
  seo,
  related: ["attachment-style-quiz", "love-language-quiz"],
  reviewNotes: `Age: minAge is 13 as the brief asked, because teens are a core audience for this quiz. The content guide's default for relationship quizzes is 18, so please confirm 13. All copy is written to be age-appropriate: no sexual content, dating framed as hanging out and getting to know someone, and teens are told to follow family rules and keep a trusted adult in the loop. Every outcome's "Protecting your self-respect" section, plus one FAQ, says that an adult showing romantic interest in someone under 18 is not okay and tells them to talk to a trusted adult. Those sections also mention never feeling pressured to "send photos, keep secrets or do anything you're not comfortable with". That's a non-explicit safety line; please confirm the wording works for a 13+ audience.

Scoring: one dimension, "interest". Every option carries an explicit weight from 0 to 3 (low-signal options have { interest: 0 }), so each item's max is 3 and the score is raw / 60. "Doesn't apply" options ("we don't really text", "isn't connected with you online") weigh 1, a little under the midpoint. Hurtful teasing weighs 0. Jealousy and possessiveness are deliberately not scored as interest anywhere, and the reports name them as warning signs. Option order is varied so the strongest signal isn't always first.

Band cut points (normalized interest score, inclusive lower bounds): Not Showing Interest Yet 0, Hard to Read 0.30, Friendly, Maybe More 0.48, Promising Signs 0.64, Strong Signals 0.80. Raw equivalents out of 60: 0–17, 18–28, 29–38, 39–47, 48–60. Answering every item with its "weak but friendly" (1) option lands in Hard to Read, and all-2s land in Promising Signs. These are judgment calls; revisit them with real data.

Every outcome says plainly that signs aren't certainty and that the only way to know is to ask. Every outcome includes example words for asking. No statistics or studies are cited. The copy assumes the person being asked about is a "he" but never assumes the taker's gender. The sibling quiz #29 (Does She Like Me?) could reuse this structure.`,
};

export default quiz;
