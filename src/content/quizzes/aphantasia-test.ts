import { VIVIDNESS_5 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { aphantasia } from "./_parts/aphantasia-test/aphantasia";
import { dimensions } from "./_parts/aphantasia-test/dimensions";
import { hyperphantasia } from "./_parts/aphantasia-test/hyperphantasia";
import { hypophantasia } from "./_parts/aphantasia-test/hypophantasia";
import { questions } from "./_parts/aphantasia-test/items";
import { typicalImagery } from "./_parts/aphantasia-test/typical";
import { vividImagery } from "./_parts/aphantasia-test/vivid";

/** VVIQ-style total (16 items x 1–5 = 16–80) converted to the engine's 0–1 overall score. */
const fromTotal = (total: number) => (total - 16) / 64;

const quiz: QuizDefinition = {
  slug: "aphantasia-test",
  n: 52,
  title: "Aphantasia (Mind's Eye) Test",
  tagline: "Discover how vividly you can see pictures in your mind's eye.",
  category: "Brain",
  structure: "trait_profile",
  description:
    "Free aphantasia test: imagine 16 scenes and rate how vivid they are to see where you fall from aphantasia to hyperphantasia. Built on the VVIQ.",
  disclaimer:
    "This test describes where you fall on a self-reported imagery spectrum. Aphantasia and hyperphantasia are not diagnoses, and this is not a medical assessment.",
  method: `You rated how vivid 16 imagined scenes were, from "No image at all" (1) to "Perfectly clear, as vivid as real seeing" (5). The items follow the structure of the Vividness of Visual Imagery Questionnaire (VVIQ), published by David Marks in 1973: four scenes, a familiar person, a sunrise, a familiar shop and a countryside scene, with four items each. The wording is our own.

Adding up your 16 answers gives a total from 16 to 80. Your overall score is that total rescaled from 0 to 100%. Researchers commonly describe a VVIQ total of 23 or below as aphantasia and 75 or above as hyperphantasia, and we use the same cutoffs. There's no agreed cutoff for the ranges in between, so we use our own descriptive bands: 24 to 39 is hypophantasia, 40 to 63 is typical imagery and 64 to 74 is vivid imagery. Scene scores show your vividness for each of the four scenes.

This is a self-report spectrum, not a diagnosis. People judge words like "clear" and "vivid" differently, so treat your result as a starting point for reflection.`,
  minutes: 4,
  paywall: "free_headline",
  minAge: 13,
  scale: VIVIDNESS_5,
  status: "draft",
  dimensions,
  questions,
  bands: {
    on: "overall",
    bands: [
      { min: 0, outcome: "aphantasia" },
      { min: fromTotal(24), outcome: "hypophantasia" },
      { min: fromTotal(40), outcome: "typical" },
      { min: fromTotal(64), outcome: "vivid" },
      { min: fromTotal(75), outcome: "hyperphantasia" },
    ],
  },
  outcomes: [aphantasia, hypophantasia, typicalImagery, vividImagery, hyperphantasia],
  seo: {
    intro: `Can you picture a friend's face, a sunrise or your front door in your mind's eye? Some people see a vivid image, some see a faint one, and some see nothing at all, a difference called aphantasia. This free aphantasia test asks you to imagine 16 everyday scenes and rate how clear each image is. It's built on the structure of the Vividness of Visual Imagery Questionnaire (VVIQ), the standard research measure of imagery. In about four minutes you'll see where you fall on the spectrum from aphantasia to hyperphantasia, with scores for four kinds of scenes. It's a self-report spectrum, not a diagnosis.`,
    measures: `The test measures the vividness of voluntary visual imagery: how clearly you can call up pictures in your mind when you try. Each item asks you to imagine part of a scene, such as the shape of a familiar face, a rainbow after a storm, the door of a shop you know, or wind making waves on a lake, and to rate the image from "No image at all" to "Perfectly clear, as vivid as real seeing." Read each item, close your eyes for a moment if that helps, and rate what you actually experienced rather than what you know the scene looks like.

The 16 items are grouped into four scenes: a familiar person, a sunrise, a familiar shop and a countryside scene. Your scene scores show whether your imagery is stronger for people, changing skies, places or landscapes. Your total places you in one of five ranges: aphantasia, hypophantasia, typical imagery, vivid imagery or hyperphantasia.

The free result shows your range. Paid reports add your scene-by-scene scores and a Deep Report on what your imagery means for memory and learning, how you think, creativity, and communicating with people whose minds work differently. Whatever your result, imagery differences are a normal part of human variation, and every point on the spectrum comes with its own strengths.`,
    origin: `In 1880, Francis Galton asked people to describe their mental image of that morning's breakfast table and found striking differences. In 1973, psychologist David Marks published the Vividness of Visual Imagery Questionnaire, which became the standard way to measure imagery. The term aphantasia was coined in 2015 by neurologist Adam Zeman and colleagues, and hyperphantasia followed for the other extreme.

This test follows the VVIQ's structure but uses our own wording. Like all self-report imagery measures, it depends on how you interpret words like "clear" and "vivid," which differ between people. Lab studies have found objective differences that line up with self-reports, but no questionnaire can capture exactly what you see. Aphantasia isn't a medical diagnosis, and this test is for self-reflection only.`,
    faqs: [
      {
        q: "What is aphantasia?",
        a: "Aphantasia is having little or no voluntary visual imagery. People with aphantasia know what things look like, but when they try to picture a face, a place or an object, no image appears in their mind's eye. The term was coined in 2015 by neurologist Adam Zeman and colleagues. It's thought to be a lifelong difference for most people who have it, and many only discover it as adults.",
      },
      {
        q: "How is this aphantasia test scored?",
        a: "You rate 16 imagined scenes from 1, no image at all, to 5, as vivid as real seeing, for a total between 16 and 80. Following cutoffs commonly used in research, 23 or below is described as aphantasia and 75 or above as hyperphantasia. We use our own descriptive ranges in between: 24 to 39 for hypophantasia, 40 to 63 for typical imagery and 64 to 74 for vivid imagery.",
      },
      {
        q: "Is aphantasia a disorder?",
        a: "No. Aphantasia isn't classed as a disorder or a medical condition. It's a difference in how people experience their own thoughts. Many people with aphantasia live full lives and work in every field, including creative and visual ones. Some people do lose imagery after a brain injury or illness; if your imagery has changed suddenly, it's worth mentioning to a doctor.",
      },
      {
        q: "Can people with aphantasia dream in pictures?",
        a: "Often, yes. Many people with aphantasia report visual dreams, even though they can't create images on purpose while awake. Others report dreams with little or no imagery, or dreams that are mostly thoughts and feelings. This suggests that voluntary imagery and dream imagery work at least partly differently. If you have aphantasia but dream in pictures, you're far from alone.",
      },
      {
        q: "Can you train your mind's eye to be more vivid?",
        a: "There's limited research on training imagery, and no proven way to switch it on for people with aphantasia. Some people report small improvements from practice, like focusing on one detail at a time or trying when relaxed. Many people with aphantasia aren't interested in changing it, and find that words, concepts and spatial thinking serve them well. Your result is a description, not a problem to fix.",
      },
      {
        q: "Is this the official VVIQ?",
        a: "No. This test follows the structure of the Vividness of Visual Imagery Questionnaire, with four scenes and four items each rated for vividness, but the wording is our own and the items are written to stand alone. Scores are on the same 16-to-80 range and should be broadly comparable, but they aren't identical to the published questionnaire. Treat your result as a self-reflection tool.",
      },
    ],
    keywords: ["aphantasia test"],
  },
  related: ["highly-sensitive-person-test", "iq-test", "big-five-personality-test"],
  reviewNotes: `Items: 16 items in our own wording, following the public VVIQ structure (Marks, 1973): four scenes x four items in VVIQ order, each made self-contained because scene instructions aren't supported. Scale is VIVIDNESS_5 (higher = more vivid), so totals run 16–80 like the commonly used reversed VVIQ scoring. Cut points: ≤23 aphantasia and ≥75 hyperphantasia follow the cutoffs commonly cited in research (e.g., Zeman et al., 2015/2020); 24–39 hypophantasia, 40–63 typical and 64–74 vivid are our own descriptive bands, and method says so. Scene scores rest on 4 items each.
Famous people (shared section in _parts/aphantasia-test/shared.ts) please verify: Blake Ross, Firefox co-creator, 2016 essay on aphantasia; Ed Catmull, Pixar co-founder, said publicly in 2019 he has aphantasia; Nikola Tesla, autobiography "My Inventions" (1919), building and running devices in his mind; Temple Grandin, "Thinking in Pictures" (1995); Francis Galton's 1880 breakfast-table survey. Living people are named only for their own public statements, framed as "has described/has spoken about."
Research claims (no numbers) to verify: 2022 pupil-response study (Kay, Keogh, Andrillon & Pearson, eLife); drawing study with fewer objects but accurate placement, fewer false additions and more text labels (Bainbridge et al., 2021); weaker physical response to frightening stories in aphantasia (Wicken, Keogh & Pearson, 2021); career association (Zeman et al., 2020); many with aphantasia still dream visually; reduced sensory detail in autobiographical memory; dual coding.`,
};

export default quiz;
