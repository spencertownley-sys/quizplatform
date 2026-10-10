import type { Dimension } from "@/lib/engine/types";

/**
 * Four colors on two underlying axes:
 * pace (bold/fast: Crimson, Sunflower; steady/careful: Ocean, Slate) and
 * focus (tasks: Crimson, Slate; people: Sunflower, Ocean).
 * Each score is the share of the 30 items where you picked that color, so most
 * people land "low" on two or three colors; the band text is written for that.
 */
export const dimensions: Dimension[] = [
  {
    key: "crimson",
    label: "Crimson",
    low: "Lets others lead",
    high: "Drives for results",
    description: "Your drive to take charge, decide quickly and push toward a goal.",
    report: {
      low: "Crimson plays a small part in your mix, so taking charge isn't usually your first move. You're more likely to let a plan form than to set one, and you rarely push people harder than they want to go. That makes you easier to work alongside. When a situation needs a fast, firm call, you may have to borrow Crimson on purpose.",
      mid: "You have a solid streak of Crimson: you can take the lead and make a quick call when it matters. It isn't your default in every situation, which means you can switch it on for a deadline and switch it off with friends. People may be surprised by how decisive you get when something important is on the line. Learning when to use this gear is one of your quiet strengths.",
      high: "Crimson runs strong in you, so you naturally take charge, decide fast and move toward the goal. You like a challenge and you'd rather act than wait. People rely on you to get things moving, especially when nobody else will. The cost can be speed: others may feel rushed or overruled, and slowing down to bring them along makes your drive far more effective.",
    },
  },
  {
    key: "sunflower",
    label: "Sunflower",
    low: "Low-key",
    high: "Lively",
    description: "Your energy for fun, new ideas, variety and bringing people together.",
    report: {
      low: "Sunflower plays a small part in your mix, so you're more low-key than lively in most settings. You probably prefer depth, focus or calm over constant novelty and big social energy. That steadiness helps you finish what you start. When a group needs a spark, though, you may need to bring some enthusiasm on purpose rather than waiting to feel it.",
      mid: "You have a healthy dose of Sunflower: you can be playful, curious and social when the moment invites it. You enjoy new ideas and good company without needing them all the time. That balance lets you lift a room and then get back to work. Notice which settings bring this side out, because they're often where you do your most creative thinking.",
      high: "Sunflower runs strong in you, so you bring energy, humor and fresh ideas wherever you go. You love variety, people and possibilities, and you're often the one who gets others excited. That spark is contagious and valuable. The cost can be follow-through: routine, details and long projects may drain you, and building simple systems helps your ideas actually land.",
    },
  },
  {
    key: "ocean",
    label: "Ocean",
    low: "Task-first",
    high: "People-first",
    description: "Your pull toward harmony, loyalty, patience and looking after other people.",
    report: {
      low: "Ocean plays a small part in your mix, so you tend to focus on the task or the idea before the mood in the room. You're not unkind, but keeping everyone comfortable isn't usually your first concern. That makes you good at saying hard things. It also means people may need you to slow down and check in more often than feels natural.",
      mid: "You have a steady current of Ocean: you care about how people feel and you notice when someone is left out. You can keep the peace without losing yourself in it. Friends likely see you as both kind and reliable. Your challenge is mainly timing, knowing when to smooth things over and when a disagreement actually needs to happen.",
      high: "Ocean runs strong in you, so harmony, loyalty and looking after people come first. You're patient, warm and steady, and others feel safe around you. That makes you the glue in many groups. The cost can be your own needs: you may say yes too often or avoid conflict that would help, and learning to speak up is your biggest growth step.",
    },
  },
  {
    key: "slate",
    label: "Slate",
    low: "Big-picture",
    high: "Detail-minded",
    description: "Your drive to understand, plan carefully and get things right.",
    report: {
      low: "Slate plays a small part in your mix, so you're more big-picture than detail-minded. You'd rather start and adjust than plan every step, and you trust your gut over a spreadsheet. That keeps you flexible and quick. On work where precision really matters, you may need a checklist or a careful partner to catch what you skip.",
      mid: "You have a useful vein of Slate: you like to understand things and you can be careful when the stakes are high. You don't need every detail nailed down to act, but you notice when something doesn't add up. That balance makes you a good judge of when to dig deeper. Trust it, especially when others want to rush.",
      high: "Slate runs strong in you, so accuracy, logic and doing things properly matter a great deal. You think before you speak, plan before you act and notice details others miss. People trust your judgment because it's careful. The cost can be speed and openness: you may hold back until you're sure, and sharing your thinking earlier helps others value it.",
    },
  },
];
