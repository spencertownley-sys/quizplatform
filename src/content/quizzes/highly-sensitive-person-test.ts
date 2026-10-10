import { AGREE_7 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { dimensions } from "./_parts/highly-sensitive-person-test/dimensions";
import { highlySensitive } from "./_parts/highly-sensitive-person-test/highly";
import { questions } from "./_parts/highly-sensitive-person-test/items";
import { moderatelySensitive } from "./_parts/highly-sensitive-person-test/moderately";
import { notEspeciallySensitive } from "./_parts/highly-sensitive-person-test/not-especially";
import { veryHighlySensitive } from "./_parts/highly-sensitive-person-test/very-highly";

/** Cut points are set on the average answer (1–7, reverse items flipped) and converted to the 0–1 overall score. */
const fromAverage = (avg: number) => (avg - 1) / 6;

const quiz: QuizDefinition = {
  slug: "highly-sensitive-person-test",
  n: 13,
  title: "Highly Sensitive Person Test",
  tagline: "Find out how deeply you take in sights, sounds and feelings.",
  category: "Personality",
  structure: "trait_profile",
  description:
    "Free HSP test: 27 original questions measure your overall sensitivity plus ease of overwhelm, aesthetic sensitivity and sensory threshold.",
  disclaimer:
    "This quiz is for self-reflection. High sensitivity is a normal temperament trait, not a diagnosis, and this is not the published HSP Scale.",
  method: `You rated 27 original statements on a 7-point scale from "Strongly disagree" to "Strongly agree." Eight are worded the opposite way, so agreeing with them lowers your score, which stops a habit of agreeing from inflating the result. Each item belongs to one subscale: ease of overwhelm (11 items), aesthetic sensitivity (8) or low sensory threshold (8). A subscale score shows where your answers fell between the lowest and highest possible score.

Your overall level pools all 27 items. Researchers have not agreed on an official cutoff for being highly sensitive, so we use descriptive ranges based on your average answer after reverse items are flipped. Below 3.5, between "Somewhat disagree" and "Neutral," is not especially sensitive. From 3.5 to just under 4.75 is moderately sensitive. From 4.75, close to "Somewhat agree," to just under 5.75 is highly sensitive. From 5.75, close to "Agree," upward is very highly sensitive.

This is a self-report snapshot for self-reflection, not a diagnosis, and its scores are not comparable to the published HSP Scale.`,
  minutes: 5,
  paywall: "free_headline",
  minAge: 13,
  scale: AGREE_7,
  status: "draft",
  dimensions,
  questions,
  bands: {
    on: "overall",
    bands: [
      { min: 0, outcome: "not_especially_sensitive" },
      { min: fromAverage(3.5), outcome: "moderately_sensitive" },
      { min: fromAverage(4.75), outcome: "highly_sensitive" },
      { min: fromAverage(5.75), outcome: "very_highly_sensitive" },
    ],
  },
  outcomes: [notEspeciallySensitive, moderatelySensitive, highlySensitive, veryHighlySensitive],
  seo: {
    intro: `Are you deeply moved by music, quick to notice when something is off, and worn out by noisy, busy days sooner than the people around you? This free highly sensitive person test measures sensory processing sensitivity, the temperament trait behind the term "highly sensitive person," or HSP. In about five minutes you'll rate 27 original statements and get an overall sensitivity level plus three subscale scores: ease of overwhelm, aesthetic sensitivity and low sensory threshold. Your result is a tool for self-reflection, not a diagnosis. Sensitivity is a normal trait with real strengths as well as challenges.`,
    measures: `Sensory processing sensitivity describes how deeply a person's nervous system takes in and processes information, from sights and sounds to emotions and ideas. People high in it tend to notice subtle details, think things through carefully, respond strongly to emotions and become overstimulated more easily in intense environments.

This test looks at three parts of sensitivity that researchers have identified when analyzing sensitivity questionnaires. Ease of overwhelm, called ease of excitation in research, covers how quickly demands, pressure, change and other people's moods fill you up. Aesthetic sensitivity covers how strongly you notice and are moved by beauty, art, nature and fine detail. Low sensory threshold covers how easily noise, light, smells, temperature and other physical input become uncomfortable. Each part gets its own score, because two people with the same overall level can be sensitive in very different ways.

Your overall result places you in one of four ranges: not especially sensitive, moderately sensitive, highly sensitive or very highly sensitive. The free result shows your range. Paid reports add your subscale scores with explanations, plus a Deep Report with practical ideas for setting up your work and home, handling relationships, building recovery routines and making the most of your sensitivity's strengths.`,
    origin: `Psychologists Elaine Aron and Arthur Aron introduced the concept of the highly sensitive person in a 1997 research paper, and Elaine Aron's popular books brought it to a wide audience. Later analyses, including a 2006 study by Smolewska and colleagues, suggested that sensitivity has several related components, which this test reflects in its three subscales. More recent work has proposed that people fall along a spectrum, with low, medium and high sensitivity groups, rather than being simply sensitive or not.

This test uses original items written for this site. It is not the published HSP Scale, and its scores aren't directly comparable to it. There is no official cutoff for being "highly sensitive." Sensitivity is also not a diagnosis: it overlaps with, but differs from, introversion, anxiety and sensory processing difficulties.`,
    faqs: [
      {
        q: "What is a highly sensitive person?",
        a: "A highly sensitive person, or HSP, is someone high in sensory processing sensitivity, a temperament trait described by psychologist Elaine Aron. People with this trait tend to process information deeply, notice subtle details, feel emotions strongly and get overstimulated more easily by noise, crowds, pressure or change. It's a normal variation in temperament, not a disorder, and it comes with strengths such as empathy, careful thinking and a deep appreciation of beauty.",
      },
      {
        q: "Is being highly sensitive a disorder?",
        a: "No. High sensitivity is considered a normal temperament trait, not a mental health condition or diagnosis. It can, however, overlap with experiences such as anxiety or sensory processing difficulties. If sensitivity is causing serious distress, or making school, work or relationships very hard, it's worth talking to a doctor or counselor who can look at the whole picture and suggest support.",
      },
      {
        q: "Is this the official HSP Scale?",
        a: "No. The published HSP Scale is copyrighted, so this test uses original items written for this site. It measures the same general trait and the three components that researchers have described, but the wording and scoring are our own. Your score here can't be compared directly with a score on the published scale. Treat it as a well-structured self-reflection tool rather than a research instrument.",
      },
      {
        q: "Is high sensitivity the same as introversion or anxiety?",
        a: "No, although they can overlap. Many highly sensitive people are introverts, but a sizable minority are extraverts who love people yet still need recovery time after stimulation. Sensitivity can also make stress and anxiety more likely in difficult conditions, but many sensitive people are calm and content, especially in supportive environments. Sensitivity is about how deeply you process input, not about shyness or worry.",
      },
      {
        q: "What score counts as highly sensitive?",
        a: "There is no official cutoff. Researchers often compare people with higher and lower scores within a study, or split participants into low, medium and high groups. On this test we use descriptive ranges based on your average answer after reverse-worded items are flipped. If your answers lean clearly toward agreeing with sensitive statements, you'll land in the highly or very highly sensitive range. The method section explains the exact ranges.",
      },
      {
        q: "Can I become less sensitive?",
        a: "Sensitivity seems to be a fairly stable part of temperament, so the goal usually isn't to change it but to work with it. Shaping your environment, building recovery routines, managing stress and setting boundaries can make overwhelm much less frequent. Your scores, especially ease of overwhelm, can also rise during stressful periods and fall when life is calmer, so retaking the test at different times can be revealing.",
      },
    ],
    keywords: ["hsp test", "highly sensitive person test"],
  },
  related: ["big-five-personality-test", "aphantasia-test", "attachment-style-quiz"],
  reviewNotes: `Please confirm no item resembles the copyrighted HSP Scale (Aron & Aron, 1997). All 27 items (hs1–hs27) are original. I checked each against the published 27 items: none reuses its wording, question form ("Do you…/Are you…") or example lists. Concepts overlap where the construct requires it; closest to double-check: hs7 (strong perfume) and hs26 (bright overhead lights) vs the published item on lights/smells/fabrics/sirens; hs1 and hs4 (busy places/days) vs the item on withdrawing during busy days; hs5 and hs9 (view; music, art, nature) vs the item on being moved by the arts or music; hs13 and hs15 (changes) vs the item on life changes; hs8 and hs11 (juggling tasks, deadlines) vs the items on doing many things at once and having a lot to do in a short time; hs24 (empty space in the week) vs the item on arranging life to avoid overwhelm. Deliberately avoided topics: caffeine, hunger, pain, violent media, startling, being observed while performing, childhood shyness, coarse fabrics, darkened rooms, conscientiousness/avoiding mistakes. Subscale split (11 EOE / 8 AES / 8 LST) is ours, loosely following the three-factor structure reported by Smolewska et al. (2006).
Cut points are our own (average answer 3.5 / 4.75 / 5.75 on the 1–7 scale); there is no official cutoff, and method says so. Research references to verify: Aron & Aron 1997; Smolewska, McCabe & Woody 2006; low/medium/high sensitivity groups (Lionetti et al., 2018; not named in copy); differential susceptibility and vantage sensitivity (Belsky, Pluess); orchid/dandelion metaphor (Boyce & Ellis); "similar variation in many animal species" (Highly Sensitive about text); "a sizable minority of HSPs are extraverts" (FAQ, from Aron's work). No percentages anywhere. The Very Highly Sensitive outcome suggests a doctor or occupational therapist when sensory discomfort is severe.`,
};

export default quiz;
