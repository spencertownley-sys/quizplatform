import type { Dimension } from "@/lib/engine/types";

/** Low pole = first letter (I, S, T, J); high pole = second letter (E, N, F, P). Composure is a modifier, not an axis. */
export const dimensions: Dimension[] = [
  {
    key: "energy",
    label: "Energy",
    low: "Introverted (I)",
    high: "Extraverted (E)",
    description: "Where you tend to get your energy: from quiet and your own thoughts, or from people and activity.",
    report: {
      low: "You recharge in quiet and spend your social energy on purpose rather than by default. A full calendar of people, even people you love, can leave you drained in a way that only time alone fixes. You likely think before you speak, which means your first answer is often your considered answer, and you may get talked over by faster voices. Protecting alone time isn't antisocial; it's how you show up well for the people who matter.",
      mid: "Your energy score sits near the middle, so where you recharge depends on the day, the company and the setting. You can enjoy a lively dinner and still want the next evening to yourself. Because your letter on this axis was a close call, read the descriptions of the neighboring type too and see which fits your recent weeks better. Many people in this range notice that small, familiar groups energize them while large crowds or long stretches alone both wear them out.",
      high: "You get energy from people and activity, and long stretches alone can leave you flat or restless. You often work out what you think by saying it out loud, and conversation sharpens your ideas rather than interrupting them. You're likely the one who starts the group chat, suggests the plan or says hello first. The trade-off is that quiet people can feel rushed by your pace, so leaving a pause after your questions helps them join in.",
    },
  },
  {
    key: "information",
    label: "Information",
    low: "Sensing (S)",
    high: "Intuitive (N)",
    description: "What kind of information you trust first: concrete facts and experience, or patterns and possibilities.",
    report: {
      low: "You trust what is concrete and proven: facts, details, and what you've seen with your own eyes. You tend to notice what's actually in front of you, like a price that changed, a step someone skipped or a friend who looks tired. Instructions, examples and real experience help you more than theories. Your gift is keeping plans grounded; the stretch is giving a new idea a fair hearing before it has a track record.",
      mid: "You move between details and big-picture thinking, depending on what the task needs. You can follow a recipe exactly one night and invent your own the next. Because your letter on this axis was a close call, both the Sensing and Intuitive descriptions will ring partly true, and it's worth reading the neighboring type. People in this range often make good translators between dreamers and doers, because they speak both languages.",
      high: "You're drawn to patterns, possibilities and the meaning behind the facts. You often see where something could go before you've fully described where it is, and you may skip steps that feel obvious to you. Metaphors, theories and 'what if' questions energize you, while repetitive detail work can drain you fast. Your gift is spotting what others miss; the stretch is checking your bright ideas against the plain facts before you commit.",
    },
  },
  {
    key: "decisions",
    label: "Decisions",
    low: "Thinking (T)",
    high: "Feeling (F)",
    description: "What you weigh most when you decide: logic and consistency, or people and values.",
    report: {
      low: "You make decisions by stepping back and weighing logic, fairness and consequences. You can separate a problem from the people involved, which makes you useful in a crisis and clear in a negotiation. Honest feedback feels like respect to you, so you may not always notice when your directness lands harder than you meant. Your feelings are real and they matter; they just tend to arrive after the analysis rather than before it.",
      mid: "You weigh both logic and people's feelings, and neither one automatically wins. In some situations you're the calm analyst, and in others you're the one checking that everyone is okay. Because your letter on this axis was a close call, read the neighboring type's profile too. People in this range often notice that they decide with their head at work and with their heart at home, or the other way round.",
      high: "You decide by asking what matters to the people involved and what fits your values. You're quick to notice when someone is left out, hurt or quietly unhappy, and you often adjust your plans to help. A choice that is efficient but unkind rarely feels like a good choice to you. Your strength is keeping the human side in view; the stretch is saying a hard truth plainly when softening it would hide the message.",
    },
  },
  {
    key: "structure",
    label: "Structure",
    low: "Planning (J)",
    high: "Exploring (P)",
    description: "How you like to run your life: settled, scheduled and decided, or flexible, open and spontaneous.",
    report: {
      low: "You like life settled: plans made, decisions closed and work finished before play. Lists, calendars and routines free your mind rather than boxing you in. Other people can rely on you to show up on time and follow through, and you notice quickly when they don't. The stretch for you is leaving a little room for surprises, because the best part of a trip or a project is sometimes the part nobody planned.",
      mid: "You can plan when it counts and improvise when it doesn't. You might keep a careful budget but pick a holiday on a whim, or run a tight ship at work and a loose one at home. Because your letter on this axis was a close call, read the neighboring type's profile as well. Many people in this range are good at sensing which situations need a plan and which ones need a shrug.",
      high: "You like to keep your options open and decide close to the moment. Deadlines wake you up, new information excites you, and a fixed schedule can feel like a cage. You often do your sharpest work in a late burst of focus, and you adapt well when plans fall apart. The stretch is finishing what you start and giving planners in your life enough notice that they can relax.",
    },
  },
  {
    key: "composure",
    label: "Composure",
    low: "Striving",
    high: "Composed",
    description: "How steady you feel under pressure: calm and self-assured, or self-questioning and driven to improve.",
    report: {
      low: "You hold yourself to a high bar, and you feel setbacks and criticism sharply. You probably replay conversations, double-check your work and notice your own mistakes long before anyone else does. That restlessness often powers real growth, but it can also cost you sleep and joy. The aim isn't to stop caring; it's to treat yourself with the same patience you would give a friend who was trying hard.",
      mid: "You're steady most of the time, but certain situations can still knock your confidence. You might handle a crisis at work calmly, then lie awake over a careless remark from a friend. Paying attention to which situations shake you is useful information, because it usually points to what you care about most. You have both the calm to recover and the drive to improve, which is a good mix.",
      high: "You tend to stay steady under pressure and recover from setbacks fairly quickly. Criticism stings, but it rarely shakes your sense of who you are, and you can make a mistake without spiraling. People often find you reassuring in a crisis. The one thing to watch is that calm can look like indifference to people who are struggling, so say out loud that you care, even when you feel fine.",
    },
  },
];
