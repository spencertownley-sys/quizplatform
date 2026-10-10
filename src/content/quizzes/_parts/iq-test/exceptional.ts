import type { Outcome } from "@/lib/engine/types";
import { CLINICAL, LIMITS } from "./shared";

export const exceptional: Outcome = {
  key: "exceptional",
  name: "Exceptional Reasoner",
  tagline: "You solved almost every puzzle, the hardest ones included.",
  emoji: "🌟",
  summary:
    "You earned 85% or more of the test's points, solving nearly every item, including the hardest. That puts you in the Exceptional band, the highest on this test. It describes an outstanding performance on these 30 puzzles, not a clinical IQ score.",
  about: `Exceptional Reasoner is the highest of five bands on our estimated IQ test. It means a taker earned 85% or more of the test's difficulty-weighted points, which takes solving nearly every item, including most or all of the hardest pattern grids, number series, word analogies and spatial problems, within 20 minutes.

The hardest items combine several rules at once: grids where shape, fill and number each follow their own arrangement, turns that add up across a row, series where the gaps themselves form a sequence, and spatial problems that need several mental steps. Solving most of them takes careful, systematic reasoning as well as speed.

Even so, an Exceptional result describes one session on one short test. It isn't an IQ score, and because the test has no norm data yet, it doesn't say how rare the result is in the general population. A 30-item test also has a ceiling: it can't tell apart people who all solve nearly everything.

The band covers abstract reasoning under time pressure. It doesn't measure creativity, knowledge, wisdom, practical skill or persistence, and it doesn't predict what anyone will achieve. The skill breakdown shows which kinds of reasoning were strongest, and the answer review shows any items that got away.`,
  snapshot: [
    "You earned 85% or more of the test's points, hard items included.",
    "You held several rules in mind at once and checked them carefully.",
    "The test has a ceiling, so it can't show how far your reasoning extends.",
    "Any miss is worth studying; it likely points to one unusual rule type.",
    "Puzzle reasoning is one slice of ability and doesn't predict achievement alone.",
    "This is an estimate from one session, not a clinical IQ score.",
  ],
  deep: [
    {
      title: "Your skill breakdown",
      teaser:
        "With an Exceptional result, your skill bars are likely all high, which means the details behind them matter more than their height.",
      body: `When nearly every item is correct, the bars mostly confirm consistency across shapes, numbers, words and space. That consistency is informative in itself: it suggests your reasoning isn't tied to one format, and that you can move between visual, numerical and verbal problems without losing accuracy.

Still, look for the bar that's slightly lower and the item behind it. A single level-5 item is worth between about a sixth and a quarter of a skill's points, so a bar that dips toward the middle almost always traces back to one item. Ask what kind of item it was:

- A verbal miss often comes down to one word's exact meaning, which reflects vocabulary exposure more than reasoning.
- A spatial miss often involves a multi-step transformation, like a half turn of a whole grid, where one step was tracked in your head instead of checked.
- A pattern miss at this level is usually an unusual rule type, such as turns that add up across a row.
- A number miss usually means a second-layer pattern, like gaps that are cube numbers, that wasn't tested to the end.

Also look at the answer review for items you got right but found hard. They tell you as much about your reasoning as any miss.

Be aware of the ceiling. This test has only a handful of very hard items, so it can show that you solved nearly everything, but not how much further your reasoning could go. Two people with the same Exceptional result may differ a lot on longer, harder tests. If you want to know more, the honest route is a longer, properly normed assessment rather than another short quiz.`,
    },
    {
      title: "How you solve problems",
      teaser:
        "Your answers point to a systematic, model-building approach: you seem to form a full picture of each problem before committing to an answer.",
      body: `Solving nearly all of the hardest items usually takes more than quick insight. It takes a reliable process: noticing every feature that changes, finding a rule for each, combining them into a prediction, and checking that prediction across every row and column. Doing that consistently under time pressure suggests the process has become close to automatic for you.

People who reason this way often:

- Hold several partial ideas at once and drop the ones the evidence rules out.
- Move flexibly between strategies: rows versus columns, differences versus ratios, the shape versus the space around it.
- Notice when a problem resembles one they've seen before and reuse its structure.

The trade-offs at this level are worth knowing:

- Speed can become a habit. Fast reasoners sometimes skip the slow check on the rare problem where the obvious structure is a trap.
- Abstract problems can feel more satisfying than messy real ones. Real problems rarely have one right answer, and they often depend on people, priorities and incomplete information.
- Reasoning isn't persuasion. Seeing a solution quickly doesn't mean others will. Explaining the steps at the listener's pace is a separate skill.

In daily life, this style often shows up as enjoying puzzles, systems and strategy, spotting flaws in arguments quickly, and getting bored by repetition. The most useful direction for growth is usually not more puzzles. It's applying this reasoning to harder, open-ended problems where the rules aren't given and have to be discovered or negotiated. Those problems reward the same habits you showed here: patience before committing, checking every part, and a willingness to drop an idea that doesn't fit.`,
    },
    {
      title: "Online estimates vs. clinical tests",
      teaser:
        "An Exceptional band is where online tests most often overreach, so it's worth being clear about what this result can and can't support.",
      body: `Many websites print a striking number for results like yours, with no comparison group behind it. We don't, because a 30-item test without norms, taken once at home, can't place anyone precisely at the high end. A short test also has a ceiling, so it can't tell strong performances apart.

${CLINICAL}`,
    },
    {
      title: "Your practice plan",
      teaser:
        "At your level, useful practice isn't more of the same puzzles; it's harder formats, longer problems and work that genuinely stretches you.",
      body: `You've shown you can solve this test's item types. To keep growing, change the challenge rather than repeating it. Try this over four weeks, 20 minutes on most days.

Pattern grids

- Design your own grids with three or four interacting rules, including arithmetic and turning. Writing items with exactly one correct answer is much harder than solving them, and it deepens your feel for rules.
- Try logic puzzles on larger grids, such as nonograms and other grid-based logic puzzles.

Number series

- Explore sequences with two hidden layers, and sequences that depend on both position and value. Then move to puzzles that ask for a reason, not just a pattern: why must the next term be what it is?

Word analogies

- Work on precise distinctions in an area you care about, such as legal terms, scientific vocabulary or a second language. Analogies across two languages are an excellent stretch.
- Write analogies with exactly one defensible answer and test them on others. It's a fine-grained exercise in meaning.

Spatial reasoning

- Move to 3D: cube nets, cross-sections, rotations of solids, and building models from flat plans. Physical puzzles and construction sets help.

Real-world reasoning

- Pick one open-ended problem a week (a decision at work, a design choice, an argument in the news) and write a one-page analysis: the facts, the competing explanations, and what evidence would settle it.

If you retake this test, expect little change, because you're near its ceiling. Measure your progress on the harder formats instead.`,
    },
    {
      title: "Study and work tips",
      teaser:
        "Strong reasoning gives you a head start in study and work; the people who make the most of it pair it with persistence, communication and judgment.",
      body: `A very high result on reasoning puzzles suggests you can pick up complex, rule-based material quickly. It doesn't guarantee that you'll enjoy that material, stick with it or turn it into results. Those depend on habits.

- Choose difficulty on purpose. If school or work feels easy, find a harder class, project or problem. Being under-challenged for long stretches can wear down motivation and study habits.
- Build the habit of effort. People who solve things quickly sometimes never learn to persist through long, confusing stretches. Practice staying with a problem for longer than feels comfortable.
- Communicate your reasoning. Write clear explanations, use examples, and check that others follow you. Ideas that aren't understood rarely get used.
- Seek feedback from people who know more. Expertise in any field takes years of practice and feedback, however quickly you reason.
- Respect other kinds of ability. Colleagues who are better at reading people, managing projects or making things work in practice will often see what you miss.
- Stay humble about one test. Your band says you solved these puzzles very well. It doesn't settle questions about your future, your worth or how you compare with any particular person.

Your skill bars can point to work you might find satisfying, but at this level all four are likely strong, so let interest lead. Choose problems you'd happily think about in your spare time; that's where strong reasoning compounds.

Finally, be patient with the gap between solving puzzles and producing work. Puzzles end the moment you find the answer. Real projects keep going through drafts, setbacks and feedback, and that long middle is where most achievement actually happens.`,
    },
    {
      title: "Honest limits and next steps",
      teaser:
        "An Exceptional result is a genuinely strong performance on these puzzles, and it comes with the same limits as every other band, plus two of its own.",
      body: `${LIMITS}

Two more apply at the top. First, the ceiling: with only a few very hard items, this test can't show how much further your reasoning goes, or tell strong performances apart. Second, high results invite numbers and comparisons that a short test without norms can't support. We'll add an estimated range with its margin of error once we have enough data, and even then it will be an estimate.

What to do next

- Check your answer review for any miss and name its rule type.
- Stretch yourself with harder formats: design your own items, try 3D spatial puzzles and work through open-ended problems.
- Try other tests on this site for a fuller picture of how you think, such as the personality and mental imagery tests.
- If you need a formal, normed assessment, for example for school placement, ask a licensed psychologist.`,
    },
  ],
};
