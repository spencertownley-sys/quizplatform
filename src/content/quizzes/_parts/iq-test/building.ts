import type { Outcome } from "@/lib/engine/types";
import { CLINICAL, LIMITS } from "./shared";

export const building: Outcome = {
  key: "building",
  name: "Building Reasoner",
  tagline: "Today's puzzles were tough, and every skill here can grow.",
  emoji: "🌱",
  summary:
    "You earned less than 30% of the test's points, mostly on the easier items. That puts you in the Building band, which describes how today's 20 minutes went, not how capable you are. Your skill breakdown shows where to start practicing.",
  about: `Building Reasoner is the first of five bands on our estimated IQ test. It means a taker earned less than 30% of the test's difficulty-weighted points: usually a handful of the easier pattern, number, word and spatial items, with the harder ones left unsolved or unanswered when the 20 minutes ran out.

A Building result describes one session, not a person. Timed reasoning puzzles are sensitive to things that have nothing to do with ability: a small phone screen, a noisy room, poor sleep, test nerves, or simply never having seen a grid puzzle before. People who are new to this puzzle style often improve noticeably once they learn the common rule types, such as counts that go up across a row or shapes that turn a fixed amount at each step.

The band also says nothing about creativity, practical skill, knowledge, kindness or the many other things that matter at school, at work and in life. And because this test doesn't have norm data yet, it doesn't compare anyone with the general population.

The most useful part of the result is the skill breakdown. One or two of the four skills are usually stronger than the rest, and that is where practice tends to pay off fastest.`,
  snapshot: [
    "You earned less than 30% of the test's points, mostly on the easier items.",
    "This band describes one 20-minute session, not your overall ability.",
    "Your strongest skill bar is the best place to build confidence first.",
    "Most misses at this level come from tracking one rule when an item uses two.",
    "Sleep, screen size, distractions and test nerves can all pull this result down.",
    "Retake after a few weeks of practice and compare skill bars, not just bands.",
  ],
  deep: [
    {
      title: "Your skill breakdown",
      teaser:
        "In the Building band, the four skill bars rarely sit at the same height, and the gaps between them are the most useful part of your result.",
      body: `Look at your bars before you look at your band. Most people who land here solved at least a few items in one or two skills and very few in the others. That unevenness is good news: it shows where your reasoning already works and where a small amount of practice could change your result.

Each bar counts points the same way the overall band does. Easier items are worth 1 or 2 points and the hardest are worth 5, so a bar can stay low even when you got several easy items right. A bar in the low range usually means the harder items in that skill went unsolved or unanswered, not that you got nothing right.

Here is how to read common patterns at this level:

- A stronger verbal bar with weaker pattern and spatial bars often means you're comfortable with words but new to visual puzzles. Visual puzzles respond quickly to practice.
- A stronger number bar suggests you're at ease with arithmetic and spotting steps. Use that: many grid puzzles hide a counting rule.
- Low bars across the board are common when time runs out early or the test is taken on a phone. Check whether you reached the last items.
- A stronger spatial bar with weaker verbal and number bars can reflect a hands-on, visual thinker, or someone reading in a second language.

Also check how many items you answered. Unanswered items count as wrong, so a low band can simply mean you spent too long on a few early puzzles. That's a pacing problem, and pacing is the easiest thing on this test to fix.

Finally, remember that the bars describe one sitting. They are a starting map for practice, not a ranking of your abilities.`,
    },
    {
      title: "How you solve problems",
      teaser:
        "At this level, the most common pattern isn't \"can't solve it\" but \"stopped at the first rule that seemed to fit.\"",
      body: `Reasoning puzzles are designed so that an obvious rule explains part of the picture. Many misses in the Building band come from seizing that rule, picking an option that matches it, and moving on. In a grid, that might mean noticing that the shapes repeat down each column but missing that they also get more numerous across each row. In a number series, it might mean seeing that the numbers rise without checking by how much.

Another common pattern is spending a long time on one difficult item and then running out of time. On a timed test this costs twice: you lose the hard item and the easier ones you never reached.

A third is answer-first thinking: looking at the options before forming your own idea, then choosing whichever looks most familiar. Wrong options are built to look plausible, so this habit tends to lead to near-misses.

None of these are fixed traits. They're habits, and habits change with a simple routine:

- Describe before you decide. Say what changes across a row and down a column, feature by feature: shape, number, fill, rotation.
- Predict, then check. Form your answer before you look at the options, then find the match.
- Test against everything. A rule has to work for every row, or every number in a series, not just one.
- Set a time budget. If an item takes more than about a minute, make your best guess, move on and come back if there's time.

You may also find that you solve problems better out loud, on paper or with your hands than silently in your head. That's useful self-knowledge. Many strong thinkers work things out on paper. A timed screen test doesn't let you do that easily, so practicing with scrap paper nearby is a fair way to close the gap.`,
    },
    {
      title: "Online estimates vs. clinical tests",
      teaser:
        "A Building result on a short online test tells you very little about how you would do on a clinical intelligence test.",
      body: `That isn't a polite reassurance; it follows from how different the two are. Clinical tests start with easy items and adjust to you, give clear spoken instructions and practice examples, and are scored by an examiner who can see whether you were tired, anxious or confused by the format. A timed online test does none of that, and a low result is exactly where those factors weigh most.

${CLINICAL}`,
    },
    {
      title: "Your practice plan",
      teaser:
        "Your practice plan starts small: 10 to 15 minutes a day, rotating through the four skills, with one habit to build in each.",
      body: `Aim for four weeks. Spend each session on one skill, and finish by noting one thing you learned.

Pattern grids

- Draw your own 3×3 grids with one rule, such as a count going up across each row. Then add a second rule, such as the fill changing down each column. Making puzzles teaches you how they're built.
- For every practice grid, list what changes (shape, number, fill, rotation) before you pick an answer.

Number series

- Write the gaps between numbers under every series. If the gaps don't form a pattern, write the gaps between the gaps.
- Practice times tables and doubling until they feel automatic. Most series rules use them.

Word analogies

- Turn each pair into a full sentence, such as "A key opens a lock." Then try each option in the same sentence.
- Read something slightly above your comfort level for 10 minutes a day and look up one unfamiliar word.

Spatial reasoning

- Fold and punch real paper. Predict the result, then unfold and check.
- Hold letters and simple drawings up to a mirror. Predict what you'll see first.

Pacing

- Once a week, do a timed set of 10 puzzles with a one-minute limit per item.

Keep sessions short and regular rather than long and occasional. A tired brain mostly practices mistakes, and a few focused minutes on most days build habits faster than a weekend cram.

After four weeks, retake the test at a similar time of day and compare your skill bars. Your weakest skill often moves the most, because that's where practice has the most room to help.`,
    },
    {
      title: "Study and work tips",
      teaser:
        "The habits that lift a Building result are the same ones that make studying and work tasks feel less overwhelming.",
      body: `Timed puzzles reward breaking a problem into parts, checking each part and managing time. You can practice all three in everyday tasks, and they pay off far beyond any test.

- Break big tasks into visible steps. Write them down. Everyone's working memory is limited, and paper or a checklist frees it up for thinking.
- Use worked examples. When you learn something new, study a fully solved example before trying one yourself. It's often faster than struggling from scratch.
- Explain it back. After reading a page or a set of instructions, say the main point in one sentence. If you can't, reread the part where you lost the thread.
- Draw it. Sketches, diagrams and tables turn a wordy problem into a visual one, which many people find easier to reason about.
- Protect your focus. Short, distraction-free blocks of 20 to 25 minutes beat long, interrupted sessions.
- Practice the format, not just the content. If a test or task has a particular style (multiple choice, case study, timed), practice that style specifically. Familiarity alone lifts performance.

At work, notice where you already solve problems well: fixing a process, reading people, handling a tricky customer, finding a workaround. These are real reasoning skills that a 30-item puzzle test doesn't measure. Build on them, and use the habits above for tasks that feel abstract.

If timed tests make you anxious, that's worth tackling directly. Practice under gentle time pressure, take a few slow breaths before you start, and remind yourself that no single item decides the outcome. Anxiety uses up the same mental workspace you need for reasoning, so easing it often frees up more than you'd expect.`,
    },
    {
      title: "Honest limits and next steps",
      teaser:
        "A Building band is the result most affected by everything this test can't control, so read it with extra caution.",
      body: `${LIMITS}

What to do next

- In your answer review, sort your misses into two groups: items you got wrong and items you never reached.
- Pick your weakest skill and follow its part of the practice plan for four weeks.
- Retake at the same time of day, on a larger screen, in a quiet room, and compare skill bars.
- If you have real concerns about learning, attention or memory, talk to a doctor, a school psychologist or a licensed psychologist. They can arrange a proper assessment; this test can't.`,
    },
  ],
};
