import type { Outcome } from "@/lib/engine/types";
import { CLINICAL, LIMITS } from "./shared";

export const sharp: Outcome = {
  key: "sharp",
  name: "Sharp Reasoner",
  tagline: "You cracked most puzzles, including several multi-rule ones.",
  emoji: "🎯",
  summary:
    "You earned 50% to 70% of the test's points, solving most easy and medium items and some of the hard ones. That puts you in the Sharp band. Your skill bars show which kind of hard puzzle is your next step.",
  about: `Sharp Reasoner is the middle of five bands on our estimated IQ test. It means a taker earned roughly 50% to 70% of the test's difficulty-weighted points, usually by solving most of the easy and medium pattern, number, word and spatial items and a share of the hardest ones.

People in this band typically handle puzzles with two interacting rules, such as a grid where the shape changes across rows and the fill changes down columns, or a number series where two sequences take turns. The items that stay unsolved tend to be the hardest few: three rules at once, turns that add up across a row, or spatial problems that must be tracked step by step.

A Sharp result describes one 20-minute session. It isn't an IQ score, and it doesn't place anyone in the general population, since this test doesn't have norm data yet. Practice with this puzzle style, sleep, screen size and distractions can all move it.

The band is about abstract reasoning under time pressure. It doesn't capture memory, knowledge, creativity, practical skill or how someone works with others. The skill breakdown is the most useful part: even within this band, profiles vary a lot, and the strongest skill is usually the one to build on.`,
  snapshot: [
    "You earned 50% to 70% of the test's points, including some hard items.",
    "Two-rule puzzles are within your reach; three-rule puzzles are the next frontier.",
    "Your skill bars likely show one standout skill worth leaning on.",
    "Nearly-right answers on hard items point to a checking gap, not a reasoning gap.",
    "A few more hard items would move you up a band, and pacing helps most.",
    "This is an estimate from one session, not a clinical IQ score.",
  ],
  deep: [
    {
      title: "Your skill breakdown",
      teaser:
        "In the Sharp band, the most telling detail is which skill held up on the hardest items, because that's where profiles separate.",
      body: `At this level, most people solve the easy and medium items across all four skills. The differences show up on the level-4 and level-5 items, which are worth the most points. So your bars mostly reflect how far into the hard items each skill carried you.

A high bar (above about two thirds of that skill's points) means you solved at least some of the hardest items in that skill. A mid bar usually means you got through the medium items cleanly and missed the hard ones. A low bar in this band is unusual and worth a closer look: it may be a skill where unfamiliar vocabulary, a small screen or running out of time cost you points, rather than reasoning.

Common Sharp profiles:

- Pattern and spatial ahead. Strong visual reasoning with weaker verbal or number results. Often a hands-on or design-minded thinker.
- Number and pattern ahead. Comfortable with rules and structure. Spatial items that need step-by-step tracking are often the gap.
- Verbal ahead. Precise with language, slower on the abstract visual grids. Grid practice tends to pay off quickly here.
- All mid-range. Consistent, with the hardest items in every skill just out of reach. A sharper checking routine and better pacing usually help across the board.

Use the answer review to find the exact item where each skill stopped. If it was a level-4 item, the next step is learning one more rule type. If you got the level-4 items but missed level 5, the issue is usually holding three rules at once, which is about method more than insight.

Keep in mind that a single level-5 item is worth between about a sixth and a quarter of a skill's points. Treat small gaps between bars as noise and large ones as signal.`,
    },
    {
      title: "How you solve problems",
      teaser:
        "Your answers suggest you look for structure first, which is exactly why you solved items that stack two rules.",
      body: `Strong performance on medium and some hard items usually comes from a habit of asking "what's changing, and how?" before reaching for an answer. You probably noticed when a grid had more than one thing going on, and you likely tested your idea against more than one row.

Where people at this level lose points is subtler:

- Running out of working memory. Three rules at once means tracking three features across nine tiles. It's easy to solve two and let the third slip, then pick an option that's right on two counts and wrong on one.
- Settling for a rule that fits most of the evidence. A rule that works for two rows but not the third isn't the rule.
- Unfamiliar rule types. Turns that add up across a row, or gaps that are cube numbers, feel unfair until you've seen them once. After that, they're just another type to check.
- Time pressure at the end. The hardest items come last. If you spent a long time on a medium item, you may have rushed exactly where the points were.

Your next step is less about thinking harder and more about offloading. Put what you can on paper: jot down the features, note which ones are explained, and only then check the options. Skilled solvers do this almost automatically, which frees their attention for the genuinely new part of each problem.

You may recognize this style outside tests too. You like to understand how something works before using it, and you're good at seeing structure in messy information. The flip side can be impatience with detail once you think you've got the gist. Building a final check into your routine, every requirement and every row, keeps that from costing you.`,
    },
    {
      title: "Online estimates vs. clinical tests",
      teaser:
        "A Sharp band shows solid reasoning on these puzzles, but it can't be converted into a clinical score, in either direction.",
      body: `It's tempting to guess what this result would "be" on a professional test. Any such guess would be made up. Your band reflects the share of points you earned here, under conditions we can't see, and with no comparison group yet.

${CLINICAL}`,
    },
    {
      title: "Your practice plan",
      teaser:
        "Your practice plan focuses on the hardest item types, the ones worth 4 and 5 points, over four weeks of short sessions.",
      body: `Spend 15 to 20 minutes a day. Rotate skills, and keep a log of every rule type that surprised you. That log becomes your personal checklist.

Pattern grids

- Practice grids with three rules (shape, fill and number), each following its own pattern across rows and columns. Solve one feature at a time and write each rule down.
- Learn the less obvious rule types: one column equals the other two combined, turns that add up across a row, and values that appear exactly once in every row and column.

Number series

- Work on series where the gaps form their own pattern (squares, cubes, doubling) and series that alternate two operations.
- Write series of your own and try them on a friend. If they solve one immediately, add a second layer.

Word analogies

- Practice analogies built on degree (pebble and boulder), shortage (a blackout is a shortage of electricity) and part-to-whole at the right level (a brick makes a wall, not a city).
- Read widely and note precise opposites. Hard analogies often plant a near-synonym among the options.

Spatial reasoning

- Turn the whole picture, not just one shape: sketch a 3×3 grid of arrows and draw what it looks like after a half turn.
- Work painted-cube and paper-folding problems with real objects first, then in your head.

Pacing

- Each week, do a timed mixed set where the last third is the hardest. Practice banking the easy points quickly so the hard items get your best minutes.

After four weeks, retake and compare where each skill's correct answers stop. Pushing one skill's stopping point from level 4 to level 5 is a strong, realistic goal.`,
    },
    {
      title: "Study and work tips",
      teaser:
        "At the Sharp level, your biggest gains in study and work come from protecting your thinking time and catching the third requirement.",
      body: `You can clearly handle complex material. What tends to limit people at this level isn't understanding but bandwidth: too many open threads, too little time for the hardest part, and small misses on details once the big picture is clear.

- Front-load the hard part. Schedule your most demanding thinking for when you're freshest, and do routine work later. On a test, that means banking easy points fast; at work, it means guarding a daily block of focused time.
- Get it out of your head. Notes, diagrams and lists aren't crutches; they're how skilled people handle complexity. Write down the parts of a problem as you identify them.
- Do a final pass for the last condition. Before you hand anything in, reread the request and tick off every requirement. This catches the "right on two counts, wrong on one" error.
- Learn by contrast. When studying, put two similar ideas side by side and spell out exactly how they differ. That's the skill behind hard analogies, and it deepens understanding fast.
- Seek problems slightly beyond you. Growth comes from tasks you can do with effort, not from ones you can already do easily.
- Explain your reasoning. In meetings or study groups, saying how you reached an answer helps others and exposes gaps in your own logic.

Your strongest skill bar can hint at work you may enjoy. Strong pattern and spatial reasoning often suits design, engineering, trades and planning; strong number reasoning suits analysis and finance; strong verbal reasoning suits writing, law, teaching and communication. These are leanings, not limits, and most roles use all four.`,
    },
    {
      title: "Honest limits and next steps",
      teaser: "A Sharp band is a solid result, but it rests on 30 items taken once, so hold the exact band loosely.",
      body: `${LIMITS}

For a Sharp result in particular, the gap to the next band is often just two or three hard items. That's encouraging, but it also means your band can shift on a retake for reasons that have nothing to do with real change, so compare skill bars and specific items rather than band names.

What to do next

- In the answer review, list every level-4 and level-5 item you missed and name the rule type behind each.
- Practice those rule types for four weeks using your practice plan.
- Retake under good conditions and compare where each skill's correct answers stop.
- If you want a formal measure of your abilities, for example for an educational assessment, a licensed psychologist can give you a standardized test with proper norms.`,
    },
  ],
};
