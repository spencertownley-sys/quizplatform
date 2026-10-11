import { AGREE_5 } from "@/lib/engine/scales";
import type { Question, QuizDefinition } from "@/lib/engine/types";
import { agreeableness } from "./_parts/big-five-personality-test/agreeableness";
import { conscientiousness } from "./_parts/big-five-personality-test/conscientiousness";
import { dimensions } from "./_parts/big-five-personality-test/dimensions";
import { extraversion } from "./_parts/big-five-personality-test/extraversion";
import { facets } from "./_parts/big-five-personality-test/facets";
import { traitItems } from "./_parts/big-five-personality-test/items";
import { neuroticism } from "./_parts/big-five-personality-test/neuroticism";
import { openness } from "./_parts/big-five-personality-test/openness";

// Items rotate through the five traits so no two neighbors share a trait,
// and the two items of each facet sit about 30 positions apart.
const traitOrder = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"] as const;
const interleaved: Question[] = Array.from({ length: 12 }, (_, round) => traitOrder.map((t) => traitItems[t][round])).flat();
const attentionCheck: Question = {
  id: "check",
  kind: "attention",
  text: 'To show you\'re reading, choose "Agree" for this one.',
  expect: 4,
};

const quiz: QuizDefinition = {
  slug: "big-five-personality-test",
  n: 3,
  title: "Big Five Personality Test",
  tagline: "See where you land on the five traits psychologists study most.",
  category: "Personality",
  structure: "trait_profile",
  description:
    "A free 60-question Big Five test of openness, conscientiousness, extraversion, agreeableness and emotional sensitivity, with 30 facet scores.",
  disclaimer:
    "This test is a self-report snapshot for self-reflection. It is not a clinical, diagnostic or hiring assessment.",
  method: `The Big Five, also called the five-factor model, is the most widely researched model of personality in psychology. It describes personality with five broad traits, each made up of narrower facets. This test is a short 60-item version: two items for each of 30 facets, written by us in the plain style of the public-domain International Personality Item Pool (IPIP). It is not the official IPIP-NEO or any commercial inventory.

Each answer counts from 0 to 4 points, and about half the items are reverse-scored, so agreeing with them lowers the score. A trait score is the total of its 12 items as a share of the maximum. Facet scores use two items each. We describe scores below 35% of the maximum as low, 35–65% as mid-range and above 65% as high, and your result names your highest trait. One item only checks that you're paying attention and isn't scored.

Two items per facet gives a rough sketch, not a precise measurement, so treat facet scores as conversation starters. Your answers reflect how you see yourself today and can shift with mood and life stage. Comparisons with other takers will only be added once enough people have taken the test.`,
  minutes: 10,
  paywall: "free_headline",
  minAge: 13,
  scale: AGREE_5,
  status: "draft",
  dimensions,
  facets,
  questions: [...interleaved.slice(0, 35), attentionCheck, ...interleaved.slice(35)],
  outcomes: [openness, conscientiousness, extraversion, agreeableness, neuroticism],
  seo: {
    intro: `This free Big Five personality test measures the five broad traits psychologists use most often to describe personality: openness, conscientiousness, extraversion, agreeableness and emotional sensitivity (neuroticism). In about ten minutes you'll rate 60 short statements and get a score for each trait, plus 30 facet scores that show the finer detail, such as whether your conscientiousness is more about tidiness or ambition. You'll also see which trait stands out most in your profile. The items are written in the plain style of the public-domain IPIP item pool. It's a self-report snapshot for reflection, not a diagnosis or a hiring tool.`,
    measures: `The Big Five model describes personality along five broad dimensions. Openness to experience covers curiosity, imagination, artistic interests and a willingness to question convention. Conscientiousness covers organization, reliability, self-discipline and ambition. Extraversion covers sociability, assertiveness, energy and positive emotion. Agreeableness covers trust, honesty, generosity, cooperation, modesty and compassion. Emotional sensitivity, known in research as neuroticism, covers how strongly you feel worry, anger, low mood, self-consciousness, cravings and stress.

Each trait in this test is broken into six facets, using the facet names from the public-domain IPIP-NEO framework. Two people with the same Extraversion score can look very different: one might be a warm, cheerful friend who avoids the spotlight, the other a bold, busy leader who isn't especially bubbly. Facet scores capture those differences. With two items per facet they are rough, but they are often the most recognizable part of the results.

Unlike type-based tests, the Big Five doesn't sort you into a box. Everyone has a score on all five traits, and most people fall somewhere in the middle on most of them. Your result highlights your highest trait, but the full profile, including your lower scores, tells the real story. The free result shows your top trait. Paid reports add every trait and facet score with explanations, plus a Deep Report on how your traits combine at work, in relationships and under stress.`,
    origin: `The Big Five grew out of the "lexical hypothesis," the idea that the most important ways people differ are captured in everyday language. From the 1930s onward, researchers including Gordon Allport, Raymond Cattell and later Lewis Goldberg, Paul Costa and Robert McCrae sorted thousands of descriptive words and found that they kept clustering into five broad groups. Today it is the most widely used personality model in academic research. Goldberg's International Personality Item Pool made free, public-domain items available to everyone, and this test follows that style.

The model has limits. It describes traits, not values, motives or skills. Self-report is shaped by mood and self-image. Short tests trade precision for speed, so small differences between scores aren't meaningful. And no personality test should be used on its own for decisions like hiring or diagnosis.`,
    faqs: [
      {
        q: "What are the Big Five personality traits?",
        a: "They are openness to experience, conscientiousness, extraversion, agreeableness and neuroticism, which we call emotional sensitivity. Together they cover curiosity, self-discipline, sociability, warmth toward others and emotional reactivity. Some people remember them with the acronym OCEAN. Each trait is a continuum rather than a category, so everyone has a score on all five, and most people fall somewhere in the middle on most of them.",
      },
      {
        q: "Is this the official IPIP-NEO or NEO personality inventory?",
        a: "No. This is our own short 60-item version. The items are original but written in the style of the public-domain International Personality Item Pool, and the facet names follow the public IPIP-NEO framework. It is not the official IPIP-NEO, and it is not the commercial NEO inventory used by psychologists. Treat it as a well-built self-reflection tool rather than a professional assessment.",
      },
      {
        q: "How accurate is a 60-question Big Five test?",
        a: "Twelve items per trait is enough for a useful picture of your five broad traits, especially when one or two scores stand out clearly. Facet scores, with only two items each, are much rougher, so treat them as hints rather than verdicts. Your answers can also shift with mood, so if a result surprises you, retake the test on a different day or ask someone who knows you well whether it fits.",
      },
      {
        q: "Is a high neuroticism score bad?",
        a: "No. Neuroticism, which we call emotional sensitivity, describes how strongly you react to stress and negative emotions. A high score can come with worry and lingering stress, but also with alertness to risk, careful preparation and empathy. It is not a diagnosis. If worry or low mood is getting in the way of daily life, though, it's worth talking to a doctor or counselor, because effective help is available.",
      },
      {
        q: "Can my Big Five scores change?",
        a: "Yes, slowly. Traits are fairly stable from week to week, but they do shift over years. On average, many people become somewhat more conscientious and agreeable, and somewhat calmer emotionally, as they move through adulthood. Big life experiences, deliberate practice and support can also shift traits. Expect small differences if you retake the test, and bigger ones over many years.",
      },
      {
        q: "How is the Big Five different from personality type tests?",
        a: "Type tests sort you into one of a set number of categories, such as one of 16 types. The Big Five measures each trait on a continuous scale, so it can show that you are, say, slightly introverted rather than labeling you an introvert. That makes it better at capturing people near the middle, which is most of us. It is also the model most used in academic research.",
      },
    ],
    keywords: ["big five personality test"],
  },
  related: ["16-type-personality-test", "enneagram-test", "highly-sensitive-person-test"],
  reviewNotes: `Items: 60 original items written in the short IPIP style (2 per IPIP-NEO facet, 28 reverse-keyed); none is copied from the commercial NEO-PI-R/NEO-PI-3. Some may be close to public-domain IPIP wording, which is allowed; we never claim to be the official IPIP-NEO. Facet scores rest on 2 items each, so they are labeled as rough throughout.
Please check: (1) outcome name "The Explorer" (requested in the brief) is a generic word, but 16Personalities uses "Explorers" as a role-group label; confirm you're comfortable with it. (2) Facet label "Liberalism" is the IPIP-NEO name; band text explains it is about convention, not politics. (3) Research claims stated without numbers: Big Five is the most researched model; conscientiousness linked to school/work outcomes; Arthur Aron's couples research on shared novel activities; average maturation (more conscientious/agreeable, less neurotic with age); extraversion is the most visible trait to others; neuroticism responds well to intervention. (4) The Deep Feeler stress section and the neuroticism band text suggest professional help and give the US 988 line; confirm wording for a 13+ audience. (5) Attention check sits at position 36 of 61.`,
};

export default quiz;
