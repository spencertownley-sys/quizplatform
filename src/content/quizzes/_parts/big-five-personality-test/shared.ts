import type { ReportSection } from "@/lib/engine/types";

/**
 * "How your scores compare to typical ranges": a trait-specific opening plus
 * shared guidance on reading scores. Words only, never percentiles.
 */
const RANGES_GUIDE = `Here is how to read the numbers in your profile.

Each trait score shows where your answers fell between the lowest and highest possible score on that trait. It is not a ranking against other people, and it is not a percentile. In this report, "low" means your answers fell in roughly the bottom third of the possible range, "mid" means the middle third, and "high" means the top third.

In large studies of the Big Five, most people land somewhere in the middle on most traits, and very extreme scores on several traits at once are less common. So two or three mid-range scores are normal, not bland. They usually mean you can flex in either direction depending on the situation.

A few things to keep in mind:

- Small gaps don't mean much. A difference of a few points between two traits is within the normal wobble of a short test. Your top trait tells you the most when it stands clearly above the others.
- Scores move a little. Mood, stress and recent events can shift your answers. If you retake the test in a few months, expect small changes.
- People change slowly over a lifetime. On average, many people become somewhat more conscientious and agreeable, and somewhat calmer emotionally, as they move through adulthood.
- Self-report shows how you see yourself. Asking someone who knows you well to describe you on these five traits can be eye-opening, especially where their view differs from yours.`;

export function rangesSection(teaser: string, intro: string): ReportSection {
  return { title: "How your scores compare to typical ranges", teaser, body: `${intro}\n\n${RANGES_GUIDE}` };
}
