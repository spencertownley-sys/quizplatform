import type { Outcome } from "@/lib/engine/types";
import { CLINICAL, LIMITS } from "./shared";

export const verySharp: Outcome = {
  key: "very_sharp",
  name: "Very Sharp Reasoner",
  tagline: "You solved nearly everything, including most of the hardest items.",
  emoji: "🔭",
  summary:
    "You earned 70% to 85% of the test's points, solving the easy and medium items and most of the hard ones. That puts you in the Very Sharp band. Your skill bars show where your last few points went.",
  about: `Very Sharp Reasoner is the fourth of five bands on our estimated IQ test. It means a taker earned roughly 70% to 85% of the test's difficulty-weighted points, which usually takes solving nearly all of the easy and medium items and most of the hardest ones across pattern grids, number series, word analogies and spatial problems.

People in this band typically juggle several rules at once: a grid where shape, fill and number each follow their own pattern, or a series where the gaps between numbers form a second sequence. The few misses tend to be on the very hardest items, or in one skill that's a little less practiced than the others.

A Very Sharp result describes one 20-minute session. It isn't an IQ score, and it doesn't rank anyone in the general population, because the test has no norm data yet. Familiarity with puzzles like these can lift results, and fatigue or distractions can lower them.

The band covers abstract reasoning under time pressure, which is one useful slice of thinking. It doesn't measure knowledge, memory, creativity, judgment or persistence, all of which shape what people actually achieve. The skill breakdown shows which kinds of reasoning carried the result.`,
  snapshot: [
    "You earned 70% to 85% of the test's points, including most of the hard items.",
    "You can track several rules at once, the main skill the hardest items test.",
    "Your remaining misses likely cluster in one skill or one unusual rule type.",
    "Speed is rarely the issue at this level; a final check on hard items is the edge.",
    "Strong puzzle reasoning is one slice of ability, not the whole picture.",
    "This is an estimate from one session, not a clinical IQ score.",
  ],
  deep: [
    {
      title: "Your skill breakdown",
      teaser:
        "At the Very Sharp level, your bars are likely all mid-to-high, so the interesting question is which skill gave up the last few points.",
      body: `When overall accuracy is this high, the bars often look similar at a glance. Look closer. A single level-5 item is worth between about a sixth and a quarter of a skill's points, so one miss can pull a bar from the top of the high range toward the middle. That makes your lowest bar, and the specific item behind it, the most informative part of your result.

Common Very Sharp profiles:

- One skill clearly lower. Often verbal (vocabulary is learned, not reasoned out) or spatial (multi-step mental transformations are demanding). This is a common pattern and the easiest to act on.
- All four high, with misses spread out. Usually one hard item in each of two skills. That points to time pressure or a lapse in checking rather than a skill gap.
- Pattern grids lower than the rest. The hardest grids add up turns across a row or give shape, fill and number separate rules at once, which is unusual unless you've practiced grid puzzles. A little exposure tends to close this quickly.
- Number series lower than the rest. The hardest series hide the rule two layers down. Writing out the gaps between the gaps usually reveals it.

In the answer review, check whether your misses were nearly-right options (one feature wrong) or unrelated ones. Nearly-right misses mean you found the structure but dropped a detail under time pressure. Unrelated misses mean the rule type itself was unfamiliar.

Either way, the differences between your bars at this level are smaller than they look. Use them as pointers to specific item types rather than as a verdict on what you're good at.`,
    },
    {
      title: "How you solve problems",
      teaser:
        "Your results suggest you hold several pieces of a problem in mind and check them against each other, the core of hard reasoning items.",
      body: `The hardest items on this test aren't hard because any single rule is obscure. They're hard because three things change at once, or because the rule only appears when you compare tiles that aren't next to each other. Solving most of them suggests you naturally build a picture of the whole problem and test it, rather than matching options against one feature.

People who reason this way often share a few habits:

- They pause before answering to form a prediction.
- They notice when an explanation fits most of the evidence but not all of it, and keep looking.
- They switch strategies when stuck: from rows to columns, from differences to ratios, from the shape to the space around it.

The risks at this level differ from those in lower bands:

- Overthinking simple items. Hunting for a hidden twist that isn't there wastes time and can talk you out of the right answer.
- Easing off on the last check. When most of the structure is clear, the final detail (a fill, a direction) gets less attention than it deserves.
- Fatigue. Sustained, high-effort reasoning tires anyone. If your misses cluster near the end, that may be the cause.

Outside tests, this style tends to show up as comfort with complex, unfamiliar problems and impatience with tasks that feel repetitive. You may be the person who sees how the pieces of a project fit together. The counterweight is deliberate attention to execution: the last bit of detail that turns a correct idea into a finished result.`,
    },
    {
      title: "Online estimates vs. clinical tests",
      teaser:
        "A Very Sharp result is a strong performance on these puzzles, but it can't be turned into a clinical score, and it's worth understanding why.",
      body: `High results on short online tests are where unjustified numbers do the most harm. Many sites print an impressive figure with no comparison group behind it. We won't, because a band on 30 items, taken once, at home, can't support that kind of precision.

${CLINICAL}`,
    },
    {
      title: "Your practice plan",
      teaser:
        "Your practice plan is about the last few points: rare rule types, multi-step spatial tracking and finishing strong under time pressure.",
      body: `Spend 15 to 20 minutes, four or five days a week, for four weeks. Put most of your time into the skill with the lowest bar.

Pattern grids

- Practice grids where each feature follows its own arrangement (every value once per row and column) and grids built on arithmetic, such as counts or turns that add up across a row.
- Time yourself on grids with three or more rules. The goal is a fixed routine (features, rules, prediction, check) that runs quickly.

Number series

- Work with second-layer patterns: gaps that are squares or cubes, gaps that double, and series that interleave two rules. Write out the gaps between the gaps every time.
- Invent two-layer series and test them on someone else. Designing hard items sharpens your eye for them.

Word analogies

- Focus on precise relationships: degree, shortage, part-to-whole at the right level, and opposites versus near-synonyms. For each, write a sentence that fits only one option.
- Read challenging nonfiction and note words with close neighbors, such as sparse, rare and meager. Hard analogies live in those distinctions.

Spatial reasoning

- Practice transformations of whole arrangements: a 3×3 grid after a half turn, a mirror flip, or both in sequence. Sketch, then check.
- Try 3D puzzles: cube nets, painted-cube counts for larger cubes, and cross-sections of simple solids.

Finishing under pressure

- Do a weekly timed set where the hardest items come last, and practice reserving a third of your time for them.

Retake after four weeks. At this level, gains are small and noisy; one or two more hard items is a real improvement.`,
    },
    {
      title: "Study and work tips",
      teaser:
        "Strong abstract reasoning is a real advantage in study and work, and it pays off most when you pair it with structure and follow-through.",
      body: `People who reason well under pressure often find that understanding comes easily and the friction lies elsewhere: sustaining effort on routine tasks, communicating their reasoning to others, and finishing the details.

- Go deep, not just fast. When something clicks quickly, push one level further: ask why it works, where it breaks and how it connects to what you already know. Quick understanding can stay shallow without that step.
- Show your work. Write out the steps of your reasoning in reports, notes or comments. It helps others follow you and catches the leaps you made without checking.
- Use deliberate practice. Choose tasks just past your current skill, get feedback quickly and repeat. This beats piling up easy practice.
- Plan for the boring parts. Build checklists and routines for repetitive work so it doesn't drain the attention you need for hard problems.
- Work with different strengths. People who are strong on detail, people skills or execution complement fast reasoners well. The best teams mix these on purpose.
- Watch for overconfidence. Being right often makes it easy to skip the check on the one occasion you're wrong. A short review step protects you.

Your skill bars can hint at satisfying directions. Strong pattern and spatial reasoning suits design, engineering, architecture and many trades; strong number reasoning suits analysis, science and finance; strong verbal reasoning suits law, writing, teaching and research. Reasoning helps in all of them, but interest, persistence and practice matter at least as much as any test result.`,
    },
    {
      title: "Honest limits and next steps",
      teaser:
        "A Very Sharp band is a strong result on these puzzles, and the limits matter more, not less, at the high end.",
      body: `${LIMITS}

At the high end, two more limits matter. First, a short test has a ceiling: with only a few very hard items, it can't separate strong reasoners from one another precisely. Second, high results are the ones people most want to turn into a number, and that's exactly where a short test without norms is least able to support one.

What to do next

- Review the hard items you missed and name the rule type behind each.
- Practice those types for four weeks, especially in your lowest skill.
- Retake under good conditions and compare item by item, not just band by band.
- If you want a formal, normed assessment, for example for an educational or professional reason, ask a licensed psychologist.`,
    },
  ],
};
