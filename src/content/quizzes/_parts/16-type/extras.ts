import type { CompareConfig, QuizDefinition } from "@/lib/engine/types";

/** Deep Report blocks for the composure modifier, keyed by the pole label the engine returns. */
export const modifierBlocks: NonNullable<QuizDefinition["extraBlocks"]>["modifier"] = {
  Composed: {
    title: "Your modifier: Composed",
    body: `Your four letters describe how you prefer to live. Your modifier describes how you feel while you're doing it, and your answers point to a composed style: steady under pressure, fairly quick to recover from setbacks, and secure enough in yourself that criticism stings without knocking you over.

In everyday life this often looks like the person who stays level when the flight is canceled, who can hear "this draft needs work" and get on with fixing it, and who doesn't need everyone to agree before they feel okay about a choice. Many people with this pattern sleep reasonably well after a hard day and don't spend long replaying conversations.

That calm is a real asset. It lets you take sensible risks, ask for what you want and stay useful when others are rattled. In relationships, it can make you a reassuring presence. At work, it often means people trust you with high-stakes moments.

It also has blind spots worth knowing:

- Calm can read as indifference. When a partner or coworker is anxious, your "it'll be fine" can sound like "your worry doesn't matter." Name the feeling before you offer the reassurance.
- Low self-doubt can mean low self-checking. Because mistakes don't haunt you, you may not always go back and learn from them. A short review after big decisions helps.
- You may underestimate other people's stress. What feels like a small bump to you can feel like a cliff to someone else.

How your type wears this modifier matters too. Composed planners often come across as unflappable organizers; composed explorers tend to look easygoing and brave. Composed feelers can be the steady shoulder for everyone; composed thinkers can seem cool and certain. Notice which version sounds like you.

One practice to try this month: when someone brings you a worry, ask one more question than you normally would before you offer a solution or a reassurance. Your steadiness is most helpful when people feel it's on their side.`,
  },
  Striving: {
    title: "Your modifier: Striving",
    body: `Your four letters describe how you prefer to live. Your modifier describes how you feel while you're doing it, and your answers point to a striving style: a high bar for yourself, a sharp eye for your own mistakes, and a tendency to feel setbacks and criticism more strongly than most.

In everyday life this can look like rereading a message three times before sending it, replaying a conversation on the drive home, or finishing a project and immediately noticing what could have been better. Many people with this pattern are hard workers and careful thinkers, partly because "good enough" rarely feels good enough.

That drive is not a flaw. Striving often powers real growth: you take feedback seriously, you prepare, and you care about getting things right. People around you may rely on your thoroughness and your sensitivity to what could go wrong.

The cost shows up in a few predictable places:

- Rest feels unearned. You may struggle to relax until everything is done, and everything is never done.
- One bad moment can color a good day. A single critical comment can outweigh ten kind ones.
- You may assume others are judging you as harshly as you judge yourself. Usually they aren't.

How your type wears this modifier matters too. Striving planners often turn worry into extra preparation; striving explorers may swing between bursts of effort and stretches of avoidance. Striving feelers tend to worry about relationships; striving thinkers tend to worry about competence. Notice which version sounds like you.

A few practices that help many people with this pattern:

- Set a "done" line before you start. Decide what finished looks like, then stop there.
- Keep a short record of what went well each week. Your brain already tracks what went wrong.
- When you replay a conversation, ask: "Would I judge a friend this harshly for the same thing?"
- If self-doubt is constant, heavy or getting in the way of daily life, talking with a counselor or doctor is a sensible step, not a dramatic one.

Your high standards are a gift. The goal is to make them work for you rather than against you.`,
  },
};

/** Partner and friend comparison copy, one entry per dimension. */
export const compare: CompareConfig = {
  invite: "See how your type compares with a partner or friend",
  other: "partner or friend",
  dimensions: {
    energy: {
      match:
        "You recharge in similar ways, so you probably agree on how full a weekend should be and how much time together feels right. The risk is a shared blind spot: two homebodies can drift into isolation, and two social butterflies can forget to slow down.",
      differ:
        "One of you recharges with people and the other recharges alone. Neither is wrong. Many friction points, like who wants to leave the party first or why one person goes quiet after work, come down to this difference rather than to how much you care about each other.",
      prompts: [
        "What does a perfect free Saturday look like for each of us, hour by hour?",
        "How can I tell when you need time alone, and how can you tell when I need company?",
        "Is there an event coming up where we should agree on a leaving time in advance?",
      ],
    },
    information: {
      match:
        "You take in the world in a similar way, so conversations tend to flow and you rarely feel the other person is missing the point. Watch for the shared blind spot: two big-picture people can skip the details, and two detail people can miss the bigger change coming.",
      differ:
        "One of you starts with facts and specifics, and the other starts with patterns and possibilities. This can make one of you feel the other is either nitpicking or living in the clouds. Used well, it's a strong team: one of you spots the idea, the other makes it real.",
      prompts: [
        "When we plan something together, who usually thinks about the details and who thinks about the big picture?",
        "Tell me about a time my way of seeing things helped you, or frustrated you.",
        "What's an idea you've been sitting on that you'd like me to take seriously?",
      ],
    },
    decisions: {
      match:
        "You weigh decisions in a similar way, so you'll often agree on what's fair and what matters. The shared blind spot: two logic-first people can forget to check how everyone feels, and two people-first people can avoid a hard but necessary conversation.",
      differ:
        "One of you leads with logic and the other leads with people and values. In an argument, one may want to solve the problem while the other wants to feel heard first. Saying which one you need, out loud, can turn a frustrating fight into a short conversation.",
      prompts: [
        "When I'm upset, do you want me to help fix it, or just listen first?",
        "What's a decision we made where one of us felt overruled? How would we handle it now?",
        "How do you prefer to hear criticism from me: straight, or with some cushioning?",
      ],
    },
    structure: {
      match:
        "You like a similar amount of planning, so daily life probably runs without much friction over schedules and chores. Watch for the shared blind spot: two planners can become rigid, and two explorers can let bills, bookings and deadlines slide.",
      differ:
        "One of you likes things decided and scheduled, and the other likes to keep options open. This often shows up around travel, chores and money. Agreeing on which decisions need a plan and which can stay flexible usually works better than trying to change each other.",
      prompts: [
        "Which parts of our life together should be planned, and which can stay spontaneous?",
        "How much notice do you need before a change of plans feels okay?",
        "What's one routine we could build that would make both of us feel freer?",
      ],
    },
    composure: {
      match:
        "You handle pressure in a similar way. If you're both composed, you'll stay calm together but should check you aren't brushing past real problems. If you're both striving, you'll understand each other's worries but may feed them, so take turns being the steady one.",
      differ:
        "One of you tends to stay calm under pressure and the other feels setbacks more sharply. The calmer person can offer steadiness, but 'don't worry about it' rarely helps. The more striving person can offer foresight, since worry often spots problems early.",
      prompts: [
        "What helps you most when you're stressed: advice, distraction, or just company?",
        "Is there something one of us worries about that the other brushes off too quickly?",
        "How can we tell the difference between useful concern and spiraling?",
      ],
    },
  },
};
