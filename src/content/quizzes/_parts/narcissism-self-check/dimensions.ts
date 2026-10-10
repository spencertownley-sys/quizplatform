import type { Dimension } from "@/lib/engine/types";

/** Higher = more self-focused on every dimension. */
export const dimensions: Dimension[] = [
  {
    key: "grandiosity",
    label: "Grandiosity",
    low: "Down-to-earth",
    high: "Larger than life",
    description: "How special, superior or destined for greatness you see yourself.",
    report: {
      low: "You see yourself as a regular person with real strengths and real limits. You rarely need to be the most impressive person in the room to feel okay, and you hold your opinions loosely enough to change them when someone makes a good point. That steadiness makes you easy to trust. The one risk at this end is underselling yourself: people with very low scores sometimes let louder people take chances they could have handled well.",
      mid: "You have a solid sense that you're capable, with the occasional flash of feeling a cut above. Most of the time your confidence matches your track record, which is the healthy middle. On a few topics you may trust your own judgment faster than anyone else's. That's useful where you've earned it and costly where you haven't, so it's worth noticing which subjects bring out the \"I know better\" feeling.",
      high: "You see yourself as unusually capable, and you often feel meant for something bigger than an ordinary life. That belief can fuel ambition, courage and the drive to start things other people only talk about. The cost shows up when the self-image runs ahead of the evidence: feedback stings, disagreement feels like an insult, and other people's ideas get less airtime than they deserve. The healthiest version of this trait keeps the big goals but checks them against honest feedback from people who aren't afraid of you.",
    },
  },
  {
    key: "entitlement",
    label: "Entitlement",
    low: "Easygoing",
    high: "Expects more",
    description: "How strongly you feel you deserve special treatment, and how you react when you don't get it.",
    report: {
      low: "You expect to be treated fairly, not specially, and you take most inconveniences in stride. Waiting your turn, doing the dull part of a shared job and hearing \"no\" don't feel like attacks on your worth. People find you easy to live, work and travel with. If anything, watch for the opposite trap: some people at this end accept less than they've earned because asking feels selfish.",
      mid: "You usually play by the same rules as everyone else, but some situations make you feel you're owed a little more. That might show up as irritation when you're kept waiting, or a sense that your effort deserves more credit than it gets. Some of that is a fair sense of your own worth. The useful test is whether you'd grant the same \"I deserve better\" to someone else standing in your shoes.",
      high: "You often feel you deserve more than you get, and it frustrates you when the world doesn't adjust. Rules, waits and favors that don't go your way can feel personal. That sense of deserving can help you negotiate, hold high standards and refuse to be walked over. It turns into a problem when other people start to feel like tools for your plans, or when every \"no\" becomes a grudge. Asking \"would I accept this from someone else?\" keeps the healthy part and drops the rest.",
    },
  },
  {
    key: "admiration",
    label: "Need for admiration",
    low: "Content unseen",
    high: "Seeks the spotlight",
    description: "How much you look for attention, praise and an audience to feel good about yourself.",
    report: {
      low: "You don't need an audience to feel good about what you do. Praise is pleasant, but it isn't fuel, and you're comfortable letting your work speak quietly. That makes you steady when nobody is watching. The flip side is that your contributions can go unnoticed, and people can't value what they never see.",
      mid: "You enjoy attention and praise and you notice when they're missing, but you don't depend on them. Like most people, you sometimes check how a post or a story landed. On good days that's a healthy wish to be seen. On rough days it can turn into quiet scorekeeping of who noticed you and who didn't, which is worth catching early.",
      high: "Being seen, admired and appreciated matters a lot to you, and you work to make it happen. You may light up a room, tell stories well and draw people in, and that pull is a real gift. The catch is dependence: when your mood rises and falls with other people's reactions, a missing compliment or someone else's moment in the spotlight can feel like a loss. Building a few sources of worth that don't need an audience makes the spotlight fun again instead of necessary.",
    },
  },
  {
    key: "low_empathy",
    label: "Empathy gaps",
    low: "Tuned in to others",
    high: "Self-first",
    description: "How often your own needs crowd out other people's feelings, especially when caring costs you something.",
    report: {
      low: "Other people's feelings weigh heavily in your choices, and you usually notice when someone is struggling. You give time and attention without needing a payoff, and you're quick to repair things when you've hurt someone. That's the quality that makes people trust you with the hard stuff. Just make sure it doesn't tip into ignoring your own needs completely.",
      mid: "You care about how others feel, but when you're busy, stressed or sure you're right, your own needs can push theirs aside. Plenty of people sit here: kind when there's room for it, less patient when there isn't. What usually separates a middle score from a high one is repair, meaning whether you go back and make things right once the pressure is off. Building that habit is the most direct way to move this score.",
      high: "When your goals and other people's feelings collide, your goals usually win. You may find long venting sessions boring, read hurt feelings as oversensitivity, or value some relationships mainly for what they bring you. Sometimes that's a protective habit learned early rather than a lack of caring. Either way, the people around you may feel unheard, and that costs you trust you'd probably like to keep. Empathy works like a muscle here, and asking one more question about how someone feels is where it starts.",
    },
  },
];
