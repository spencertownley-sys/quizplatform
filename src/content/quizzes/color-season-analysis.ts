import type { QuizDefinition } from "@/lib/engine/types";
import { coolSummer, lightSummer, softSummer } from "./_parts/color-season-analysis/summers";
import { deepAutumn, softAutumn, warmAutumn } from "./_parts/color-season-analysis/autumns";
import { clearSpring, lightSpring, warmSpring } from "./_parts/color-season-analysis/springs";
import { clearWinter, coolWinter, deepWinter } from "./_parts/color-season-analysis/winters";
import { seasons } from "./_parts/color-season-analysis/catalog";
import { dimensions } from "./_parts/color-season-analysis/dimensions";
import { questions } from "./_parts/color-season-analysis/questions";
import { md } from "./_parts/color-season-analysis/text";

const quiz: QuizDefinition = {
  slug: "color-season-analysis",
  n: 83,
  title: "Color Season Analysis",
  tagline: "Find your color season and the shades that make you glow.",
  category: "Style",
  structure: "recommender",
  description:
    "Answer 15 questions about your undertone, contrast, eyes and hair to find your season in the 12-season system, plus the palette that flatters you.",
  disclaimer:
    "This quiz is a self-assessment for style ideas, not a professional color analysis. Lighting, screens and how you see yourself all affect your answers, so treat your season as a starting point; an in-person draping is more precise.",
  method: md(
    "This quiz uses the 12-season system of color analysis. Each of your 15 answers adds to three scores: undertone (cool to warm), depth (light to deep) and clarity (soft to clear). Some questions, like jewelry or veins, feed one score; others, like your natural hair color or the lip shade that suits you, feed two or three. Popular tests such as the vein check count for less, because they're less reliable. We then compare your three scores with the typical profile of each season and rank all 12 by how closely they match. Your top match is your season; the next ones are neighbors whose colors may also work.",
    "What it can tell you: a likely starting palette. What it can't: a precise result. Self-assessment is strongly affected by lighting, screen settings, makeup, hair dye, a tan and how you see your own coloring. An in-person draping, where a trained analyst holds fabric colors to your face in controlled light, is more precise. Treat this as a self-report snapshot and test the colors in real life.",
  ),
  minutes: 5,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions,
  questions,
  outcomes: [
    lightSpring,
    warmSpring,
    clearSpring,
    lightSummer,
    coolSummer,
    softSummer,
    softAutumn,
    warmAutumn,
    deepAutumn,
    deepWinter,
    coolWinter,
    clearWinter,
  ],
  recommender: {
    outcome: "top_item",
    similarity: "distance",
    listSize: 5,
    catalog: seasons,
  },
  seo: {
    intro:
      "Which colors make you look healthy and rested, and which make you look tired? This free color analysis quiz asks 15 quick questions about your undertone, natural hair and eye color, contrast and how you look in different colors, then matches you to one of the 12 seasons, from Light Spring to Clear Winter. You'll see your season's signature colors, best neutrals and metals, and the neighbor seasons you can borrow from. It takes about five minutes. For the best results, answer in natural daylight, with a bare face, thinking about your natural hair color.",
    measures: md(
      "The quiz measures three qualities of your natural coloring. Undertone is whether your skin leans cool (pink, rosy or blue-red) or warm (golden, peachy or yellow), which is different from how light or deep your skin is. Depth is how light or deep your overall coloring is, combining skin, hair and eyes. Clarity is whether your coloring is soft and blended, so muted colors suit you, or clear and high-contrast, so saturated colors suit you.",
      "The 12-season system groups people into four families. Springs are warm and clear, Summers are cool and soft, Autumns are warm and soft, and Winters are cool and clear. Each family splits into three seasons named after the trait that dominates: Light, Warm or Clear Spring; Light, Cool or Soft Summer; Soft, Warm or Deep Autumn; and Deep, Cool or Clear Winter. A Deep Autumn, for example, is defined first by depth and second by warmth.",
      "Your three scores are compared with the typical profile of each season, and the closest match becomes your result. You'll also see your next-closest seasons, which often share colors with yours. Each season comes with 12 palette swatches, its best neutrals, whites and metals, and practical guidance on makeup, hair color and building a wardrobe around your palette.",
    ),
    origin: md(
      "Seasonal color analysis grew out of color theory used by artists. Johannes Itten, a teacher at the Bauhaus art school, noticed that his students tended to favor color schemes that echoed their own coloring, and the idea that certain colors harmonize with certain people was later developed by image consultants. Bestselling books in the 1980s popularized a four-season version, and analysts later split each season into three to create the more detailed 12-season system used here.",
      "Color analysis is a style framework, not a science, and early versions focused heavily on lighter skin tones. Modern analysts apply it to every skin tone, but results still depend on lighting and judgment. Use your season as a guide, and trust what you see in the mirror.",
    ),
    faqs: [
      {
        q: "How accurate is an online color analysis quiz?",
        a: "It's a useful starting point, but less precise than an in-person draping. Your answers depend on lighting, screen settings, makeup, hair dye and how you see your own coloring, and two people can describe the same skin differently. To get the most from this quiz, answer in natural daylight near a window, without makeup, and think about your natural hair color. Then test your palette in real life by holding colors under your chin in daylight and comparing.",
      },
      {
        q: "What are the 12 color seasons?",
        a: "They are Light Spring, Warm Spring and Clear (or Bright) Spring; Light Summer, Cool Summer and Soft Summer; Soft Autumn, Warm Autumn and Deep Autumn; and Deep Winter, Cool Winter and Clear (or Bright) Winter. Each season is defined by its dominant trait, such as lightness or warmth, plus a secondary trait. Seasons that share a trait, like Light Spring and Light Summer, sit next to each other, which is why neighbors often share colors.",
      },
      {
        q: "What if I'm between two seasons?",
        a: "That's common. Your ranked list shows how close each season came, and if your top two are nearly tied, you probably sit on the border between them. Neighbor seasons share a trait, so many colors from both palettes will work for you. Start with the colors the two palettes have in common, then test the rest in daylight to see which side you lean toward. An in-person draping can settle the question if you want a firm answer.",
      },
      {
        q: "Does color analysis work for all skin tones?",
        a: "Yes. Every season includes people with a wide range of skin depths and backgrounds, because a season describes the relationship between your undertone, depth and contrast, not your skin color alone. Some traditional tests, like checking vein color, work less well on deeper skin, so this quiz includes other clues and lets you say when something is hard to see. If a question doesn't fit you well, choose the closest answer or the neutral option.",
      },
      {
        q: "Should I take the quiz with dyed hair or makeup?",
        a: "Answer based on your natural coloring. For hair, choose the color your hair grows in naturally, or what it was before going gray. For skin, look at a bare face in daylight, since foundation, bronzer and self-tanner can change how your undertone looks. A deep tan can also shift results, so consider your usual coloring. Once you know your season, you can use it to choose hair dye and makeup that harmonize with your natural features.",
      },
      {
        q: "What's the difference between undertone and skin tone?",
        a: "Skin tone, or depth, is how light or deep your skin is. Undertone is the hue beneath the surface: cool (pink, rosy, blue-red), warm (golden, peachy, yellow), or neutral and olive in between. Two people with the same skin depth can have different undertones, and two people with the same undertone can have very different depths. Color analysis looks at both, along with clarity, which is why it uses three scores instead of one.",
      },
    ],
    keywords: ["color analysis quiz", "color season test"],
  },
  related: ["magic-academy-house-quiz", "spirit-animal-quiz"],
  reviewNotes: [
    "Palette swatches (12 hex values per season in _parts/color-season-analysis/catalog.ts) are the writer's representative picks for each season; have a stylist or color analyst eyeball them on a calibrated screen.",
    "Scoring: each choice item feeds 1–3 of warmth/depth/clarity with explicit weights (see the item() helper in questions.ts); the vein and sun items are down-weighted because they're unreliable, especially on deeper skin. Season profiles were tuned by simulation: all 12 seasons come up for the content test's simulated takers, and textbook answer sets for each season land on that season. Known borderlines: an all-cool, very soft answer set lands on Cool Summer with Soft Summer second, and a deep-skinned, high-clarity cool set lands on Deep Winter with Clear Winter a close second; both are neighbor-season calls a human analyst could also make.",
    "Origin text credits Johannes Itten (Bauhaus) with the observation that students favored colors echoing their own coloring, the commonly cited origin story; confirm the wording. 1980s books are mentioned generically; no book or brand names are used. \"True Summer/True Winter/True Spring/True Autumn\" and \"Bright Spring/Winter\" are generic aliases, not trademarks.",
    "No shopping links were added (no affiliate IDs exist yet). Catalog facts per season: Defining trait, Best neutrals, Best white, Best metals, Neighbor seasons.",
  ].join(" "),
};

export default quiz;
