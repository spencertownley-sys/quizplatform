import type { Outcome } from "@/lib/engine/types";
import { CLINICAL, LIMITS } from "./shared";

export const steady: Outcome = {
  key: "steady",
  name: "Steady Reasoner",
  tagline: "You solved the core puzzles and some harder ones. Room to climb.",
  emoji: "🧭",
  summary:
    "You earned 30% to 50% of the test's points, solving most of the easier items and some of the medium ones. That puts you in the Steady band: a solid base with clear room to grow. Your skill bars show which kind of puzzle is holding you back.",
  about: `Steady Reasoner is the second of five bands on our estimated IQ test. It means a taker earned roughly 30% to 50% of the test's difficulty-weighted points, typically by solving most of the easier pattern, number, word and spatial items and some of the medium ones.

This band usually reflects reliable reasoning on clear, single-rule problems, with more trouble once items stack two or three rules together or hide the rule somewhere less obvious, such as in the gaps between numbers. Time often plays a part too: the hardest items come last, and they are worth the most points.

A Steady result describes one 20-minute session. It isn't an IQ score, and it doesn't compare anyone with the general population, because this test doesn't have norm data yet. Results like this can move with sleep, screen size, distractions and familiarity with the puzzle style. People who practice the common rule types often move up a band on a retake, which says as much about the test as about them.

The band also leaves out much of what matters day to day, including memory, knowledge, creativity, practical judgment and persistence. The most useful part of the result is the skill breakdown, which usually shows one or two clear strengths to build on.`,
  snapshot: [
    "You earned 30% to 50% of the test's points, a solid base on the core items.",
    "Single-rule puzzles are likely comfortable; stacked rules are where you slow down.",
    "Your highest skill bar shows the kind of reasoning you can lean on.",
    "A checking routine (every row, every feature) is your quickest gain.",
    "Pacing matters: the hardest items come last and are worth the most.",
    "This is an estimate from one session, not a clinical IQ score.",
  ],
  deep: [
    {
      title: "Your skill breakdown",
      teaser:
        "In the Steady band, one or two skill bars usually stand clearly above the rest, and that shape tells you more than the band does.",
      body: `Your band is an average across four quite different kinds of reasoning. Two people in the Steady band can have very different profiles: one strong on words and weak on grids, another the reverse. So start with your bars.

Read each bar in two ways. First, its level. A bar in the high range means you solved some of the hardest items in that skill, not just the easy ones. A mid-range bar usually means the easy and some medium items, and a low bar means the harder items went unsolved or unanswered. Second, the gaps between bars. A gap of a whole band or more is a real signal about where your reasoning feels most at home.

Common Steady profiles:

- Words ahead of shapes. Comfortable with analogies, less so with grids and spatial items. Visual puzzles usually respond well to practice, so this profile often climbs fastest.
- Numbers ahead of words. Quick with sequences, less sure with analogies. Vocabulary and precise wording of relationships are the levers here.
- Shapes ahead of numbers and words. A visual thinker who may find symbol-based problems slower. Writing things down helps bridge the gap.
- Even bars, all mid-range. Consistent, but not yet reaching into the hardest items in any skill. A checking routine and better pacing usually lift all four at once.

Then use the answer review to see where your correct answers stop. If they thin out around the middle of the test, the issue is likely difficulty. If you answered fewer than 30 items, it may be time. Those two problems have different fixes, and your practice plan covers both.`,
    },
    {
      title: "How you solve problems",
      teaser:
        "Your answers suggest you solve problems reliably when one clear rule is in play, and slow down when two rules have to be tracked at once.",
      body: `That's the most common stopping point on reasoning tests, and it has a specific cause. When a puzzle has one rule, finding it is most of the work. When it has two or three, the work shifts to bookkeeping: keeping track of which features you've already explained and which you haven't. Most mid-level misses come from explaining one feature, finding an option that matches it, and not checking the rest.

You can see this in the wrong options. On the harder grids, most wrong options differ from the right answer in only one feature: the right shape and fill, say, but the wrong number. If your misses in the answer review cluster on these nearly-right options, that's a bookkeeping gap, not a reasoning gap.

Three habits close it:

- Inventory first. Before looking for rules, list every feature that changes across the grid: shape, number, fill, rotation. For number series, note the gaps and whether they grow.
- One rule per feature. Find a rule for each feature separately, then combine them into a prediction.
- Check across and down. A true rule works for every row and every column, not just the first.

You may also notice that you reason well in the moment but second-guess yourself. If you changed several answers from right to wrong, trust your first well-checked answer more. If you changed answers from wrong to right, your checking works and you just need more time for it.

Outside tests, this style often looks like someone who is dependable on routine problems and does best on complex ones with a clear structure, such as a checklist, a template or a worked example. That isn't a weakness; it's a strategy, and you can use it on purpose.`,
    },
    {
      title: "Online estimates vs. clinical tests",
      teaser:
        "A Steady result online doesn't translate into any particular score on a clinical test, and the reasons are worth knowing.",
      body: `Clinical tests and this one share some item types, but almost everything around the items is different, from who gives the test to how the score is built. Those differences matter most in the middle of the range, where a few items either way can change a band.

${CLINICAL}`,
    },
    {
      title: "Your practice plan",
      teaser:
        "Your practice plan targets the step from single-rule to multi-rule problems, using 15 minutes a day over four weeks.",
      body: `Rotate skills by day and keep a short log of what tripped you up. The log is where most of the learning happens.

Pattern grids

- Practice two-rule grids: one feature changes across rows, another down columns. Name both rules aloud before choosing.
- Make one grid of your own each week with three rules. Building puzzles shows you how test makers hide rules.

Number series

- Learn five common series types: constant step, growing step, multiplying, alternating operations, and two series taking turns. For each new series, test the types in that order.
- Write the gaps, and the gaps between gaps, every time, even when you think you've already seen the rule.

Word analogies

- For each pair, write the relationship as a sentence, such as "X is a shortage of Y." Then reject every option that doesn't fit the sentence exactly, even if it's related to the topic.
- Collect pairs of opposites and near-synonyms from your reading. Many harder analogies turn on that difference.

Spatial reasoning

- Fold paper into quarters, cut a corner or punch a hole, and predict the unfolded result before you open it.
- Sketch simple shapes after a quarter turn and after a mirror flip. Check with a real mirror or by turning the paper.

Pacing

- Once a week, do a timed set of 12 mixed puzzles at about 40 seconds each. Skip anything that stalls you and return to it at the end.

After four weeks, retake and compare each bar. A one-band rise in your weakest skill is a realistic, worthwhile target.`,
    },
    {
      title: "Study and work tips",
      teaser:
        "The bookkeeping habit that would lift your result, tracking every part of a problem rather than the first one, pays off in study and work too.",
      body: `Many mistakes at school and at work aren't failures of understanding. They're misses on a second condition: the assignment had two requirements and the answer met one, or the email asked three questions and the reply answered two. That's the everyday version of a two-rule puzzle.

- Make requirement lists. Before starting a task, list everything it needs. Check your work against the list before you call it done.
- Use templates and checklists for recurring work. They do the bookkeeping for you and leave your attention for the hard part.
- Teach it to learn it. Explaining a concept to someone else, even an imaginary student, shows you which parts you can't yet connect.
- Space your practice. Several short sessions spread over days beat one long session, for puzzles and for any subject.
- Mix problem types. Practicing different kinds of problems in one session feels harder, but it builds the skill of choosing the right approach, which is what tests and real work demand.
- Give hard problems a time box. Set 20 minutes, then step away or ask for help. Fresh eyes often spot the second rule straight away.

At work, lean on your strongest skill bar. If words are your strength, volunteer for writing, documentation and explaining. If numbers, take on tracking and analysis. If shapes and space, try layout, design, planning and hands-on problem solving. Meanwhile, build your weaker areas with low-stakes practice rather than high-pressure tasks.

A Steady result is a very workable starting point. Most of the gains open to you come from method, not raw speed, and method is entirely learnable.`,
    },
    {
      title: "Honest limits and next steps",
      teaser:
        "A Steady band sits close to two boundaries, so a few items either way could have placed you differently.",
      body: `${LIMITS}

Being near a boundary also means one or two extra items on a retake could move you up a band, or down one, without any real change in your reasoning. Judge progress by your skill bars and by which items you solve, not by the band name alone.

What to do next

- In your answer review, find the first medium-level item you missed in each skill. That's your starting point.
- Follow the practice plan for your lowest bar for four weeks, with a shorter weekly session on the others.
- Retake under good conditions: rested, in a quiet room, on a larger screen, at a similar time of day.
- If you need a formal result for school, work or health reasons, ask a licensed psychologist about a standardized assessment.`,
    },
  ],
};
