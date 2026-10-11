import type { QuizDefinition } from "@/lib/engine/types";
import { crimson } from "./_parts/color-personality-test/crimson";
import { dimensions } from "./_parts/color-personality-test/dimensions";
import { ocean } from "./_parts/color-personality-test/ocean";
import { questions } from "./_parts/color-personality-test/questions";
import { seo } from "./_parts/color-personality-test/seo";
import { slate } from "./_parts/color-personality-test/slate";
import { sunflower } from "./_parts/color-personality-test/sunflower";

const quiz: QuizDefinition = {
  slug: "color-personality-test",
  n: 7,
  title: "Color Personality Test",
  tagline: "Crimson, Sunflower, Ocean or Slate: which color are you?",
  category: "Personality",
  structure: "typology",
  description:
    "Answer 30 quick questions to find your primary and secondary personality colors, and learn how to connect with people of every color.",
  disclaimer:
    "This test is for self-reflection and conversation. It describes preferred styles, not abilities, and it isn't a validated psychological assessment.",
  instructions: "Pick the answer that sounds most like you. If more than one fits, choose the one that's true most often.",
  method: `Each of the 30 questions offers four answers, one for each color. Every answer you pick adds a point to that color, so each color's score is the share of questions where you chose it. Your primary color is the one you picked most often, and your secondary color is the runner-up. If two colors tie, the result goes to the one listed first in your score breakdown, so read both descriptions. Close scores mean you're a blend.

The four colors rest on two underlying questions: whether you tend to move boldly and fast or steadily and carefully, and whether you focus first on tasks or on people. Crimson is bold and task-focused, Sunflower bold and people-focused, Ocean steady and people-focused, and Slate steady and task-focused.

The test describes preferences, not abilities, and your answers can shift with your mood, your role and the people around you. It is a self-report snapshot built for self-reflection and conversation, not a validated psychological assessment, and it shouldn't be used for hiring, grading or other decisions about people.`,
  minutes: 7,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions,
  questions,
  typology: { mode: "highest" },
  outcomes: [crimson, sunflower, ocean, slate],
  seo,
  related: ["16-type-personality-test", "big-five-personality-test", "enneagram-test"],
  reviewNotes: `Trademark check: the color names (Crimson, Sunflower, Ocean, Slate), descriptions and all 30 items are original. They avoid the True Colors set (Orange, Gold, Green, Blue) and The Color Code set (Red, Blue, White, Yellow), and none of those names appear in visible copy. Note that the driver = red-family and spark = yellow-family associations are common to several commercial four-color systems (for example Insights Discovery's "Fiery Red" and "Sunshine Yellow"); we use Ocean (blue) for the harmonizer and Slate (gray) for the analyst, which breaks that system's pattern. Please confirm you're comfortable with Crimson/Sunflower.

Scoring: typology "highest"; every option weighs 1 on exactly one color, and each item has one option per color. Option ids are a–d in display order and the color order varies by item (each color appears 6–9 times in each position). Ties go to the first-listed dimension (crimson, sunflower, ocean, slate); the method text says so in plain words.

Secondary color: there's no extra kind for "runner-up", so it relies on ranking[1] and the score bars. The second deep section ("Your primary and secondary colors") tells the reader to find their second-highest bar and gives a paragraph for each of the three possible secondaries. If the report template shows the runner-up type by name, that will reinforce this; if not, consider adding it.

History in the origin copy (the four Greek temperaments) is public domain. No statistics or studies are cited. Example careers are framed as "often do well in", not as findings.`,
};

export default quiz;
