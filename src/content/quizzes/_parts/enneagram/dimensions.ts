import type { Dimension } from "@/lib/engine/types";

/**
 * t1–t9 compete for the type (in numeric order; the wing calculation relies on it).
 * sp/so/sx only feed the "instinct" extra.
 * Band rule: the first sentence of each band is shown alone in the Snapshot.
 */
export const dimensions: Dimension[] = [
  {
    key: "t1",
    label: "Type 1",
    low: "Relaxed standards",
    high: "Exacting standards",
    description: "How strongly you're driven by integrity, high standards and the urge to make things right.",
    report: {
      low: "Type 1's drive to get everything exactly right plays only a small part in your answers. You can usually let a small mistake slide, yours or someone else's, without it nagging at you all day. That flexibility makes you easier on yourself and easier to work with. When a task truly needs precision, you can borrow some Type 1 structure on purpose, such as a short checklist, without having to live by it.",
      mid: "You carry a real but balanced share of Type 1's conscientiousness. On the things you care about, you want the job done properly and you notice when it isn't; on everything else, you can shrug. You probably have a few areas, maybe your work, your space or your values, where your standards are firm. Watching which areas wake up your inner critic can show you what you hold most sacred.",
      high: "Type 1's principled, high-standards pattern runs strongly through your answers. You notice what could be better, you feel responsible for fixing it, and you hold yourself to rules others may not even see. That gives you an integrity people can count on. The cost is an inner critic that rarely takes a day off, so learning to tell “important” from “merely imperfect” is one of your most useful skills. If Type 1 isn't your main type, it's still a strong second voice in how you work and judge yourself.",
    },
  },
  {
    key: "t2",
    label: "Type 2",
    low: "Self-contained",
    high: "Others-focused",
    description: "How strongly you're oriented toward caring for others, being needed and staying close.",
    report: {
      low: "Type 2's pull toward helping and being needed shows up only lightly in your answers. You care about people, but your sense of worth doesn't hang on how useful you are to them. You probably find it fairly easy to say no or to ask for what you need. If there's a growth edge here, it's showing your warmth out loud, since people may not guess how much you care.",
      mid: "You share a moderate amount of Type 2's warmth and attentiveness. You enjoy helping and often notice when someone is struggling, yet you can usually keep your own needs in view as well. There may be one or two relationships, often family or a close friend, where you give more than you can comfortably afford. Noticing when you say “yes” but mean “maybe” is a useful habit for you.",
      high: "Type 2's caring, people-focused pattern stands out strongly in your answers. You read needs quickly, give generously and feel most like yourself when you're close to people and making a difference to them. That warmth is a real gift to everyone around you. The risk is giving until you're empty and then feeling quietly unappreciated, so naming your own needs plainly is your key practice. If Type 2 isn't your main type, it still shapes how you show up for the people you love.",
    },
  },
  {
    key: "t3",
    label: "Type 3",
    low: "Process-focused",
    high: "Goal-driven",
    description: "How strongly you're driven by goals, achievement and how you come across to others.",
    report: {
      low: "Type 3's focus on achievement and image plays a small role in your answers. You're probably not very motivated by status, titles or being seen as impressive, and you may care more about the process than the scoreboard. That can make you refreshingly genuine. When a goal really matters, you may need to add deadlines or a little friendly competition to keep your momentum up.",
      mid: "You have a balanced dose of Type 3's drive. You like making progress and it feels good when your work is recognized, but you don't need to win every round. In some settings, perhaps work or school, your ambition switches on strongly; in others you're happy to coast. Noticing when you start performing instead of simply being yourself can be revealing.",
      high: "Type 3's goal-driven, success-focused pattern is strong in your answers. You set targets, move fast and know how to present yourself well, which makes you effective in almost any setting. People often see you as capable and polished. The risk is tying your worth to your output, so unstructured time, like rest or play, may feel strangely uncomfortable. If Type 3 isn't your main type, it still adds real drive to whatever your core pattern is.",
    },
  },
  {
    key: "t4",
    label: "Type 4",
    low: "Even-keeled",
    high: "Deeply individual",
    description: "How strongly you're driven by authenticity, emotional depth and a search for identity.",
    report: {
      low: "Type 4's search for identity and emotional depth plays a small role in your answers. You probably don't spend much time analyzing your moods or wondering what makes you different, and your feelings tend to pass without much drama. That steadiness is a strength. When people close to you are more emotionally intense, asking about their feelings, rather than trying to fix them, tends to help.",
      mid: "You carry a moderate share of Type 4's depth and individuality. You value being genuine, you can be moved by music or art, and you sometimes feel a quiet longing for something more. Most of the time you balance that inner world with practical life. Giving your creative or reflective side a regular outlet, even a small one, keeps it healthy rather than heavy.",
      high: "Type 4's emotionally rich, identity-seeking pattern is strong in your answers. You feel things deeply, you want your life to be authentic and meaningful, and you notice what's missing as sharply as what's there. That gives you real creative and emotional insight. The risk is comparing yourself with others and sinking into moods that feel like the whole truth about you, so steady routines matter. If Type 4 isn't your main type, it still colors your inner life in a big way.",
    },
  },
  {
    key: "t5",
    label: "Type 5",
    low: "Hands-on and open",
    high: "Private and analytical",
    description: "How strongly you're driven to understand, observe and protect your time and energy.",
    report: {
      low: "Type 5's need for privacy and deep analysis shows up only lightly in your answers. You're likely comfortable jumping into new things before you've studied them, and you share your time and energy fairly freely. That openness helps you connect and act quickly. When a decision is complex, it may be worth slowing down and gathering a little more information than feels natural.",
      mid: "You have a balanced portion of Type 5's curiosity and need for space. You enjoy learning and sometimes need time alone to think, but you don't usually cut yourself off from people. You may notice a pull to withdraw when you feel drained or out of your depth. Planning short, deliberate breaks can help you stay engaged without running on empty.",
      high: "Type 5's observing, knowledge-seeking pattern is strong in your answers. You want to understand how things work before you act, you guard your time and energy, and you need real solitude to recharge. That makes you a clear, independent thinker. The risk is staying in your head too long, watching life rather than joining it, so small, low-stakes steps into action help. If Type 5 isn't your main type, it still shapes how you think things through.",
    },
  },
  {
    key: "t6",
    label: "Type 6",
    low: "Trusting and at ease",
    high: "Vigilant and loyal",
    description: "How strongly you're driven by security, loyalty and preparing for what could go wrong.",
    report: {
      low: "Type 6's watchfulness and worry play a small role in your answers. You probably trust people and plans fairly easily and don't spend much energy on worst-case thinking. That lets you act with confidence and ease. Every so often, a quick “what could go wrong here?” check before a big decision may save you some trouble.",
      mid: "You carry a moderate share of Type 6's caution and loyalty. You like having a plan B and you're careful with trust, but worry doesn't usually run the show. Under pressure, you may notice your doubts getting louder and decisions getting harder. Talking a choice through with one trusted person often helps you settle it and move on.",
      high: "Type 6's vigilant, loyal pattern is strong in your answers. You scan for risks, prepare for problems and stay deeply committed to the people and groups you trust. That makes you reliable and hard to blindside. The risk is doubt that keeps reopening settled decisions and anxiety that treats every “what if” as a “when”, so building trust in your own judgment is key. If Type 6 isn't your main type, it still adds a strong protective streak to your personality.",
    },
  },
  {
    key: "t7",
    label: "Type 7",
    low: "Content with depth",
    high: "Hungry for options",
    description: "How strongly you're driven by freedom, variety and keeping life exciting.",
    report: {
      low: "Type 7's hunger for variety and new experiences plays a small role in your answers. You're probably comfortable with routine and can stay with one project, or one feeling, for a long time. That depth and patience are real strengths. When life starts to feel flat, adding something new on purpose, like a new route, recipe or hobby, can lift your energy.",
      mid: "You have a balanced dose of Type 7's enthusiasm. You enjoy new ideas and fun plans, but you can also follow through and sit with harder moments. Boredom may nudge you toward distractions more often than you notice. Finishing one thing before starting the next keeps your best ideas from scattering.",
      high: "Type 7's upbeat, options-loving pattern is strong in your answers. You light up around new plans, ideas and experiences, and you have a gift for finding the positive in almost anything. People often find your energy contagious. The risk is moving on so quickly that you skip feelings you need to feel or projects you need to finish, so building staying power is your growth edge. If Type 7 isn't your main type, it still brings lightness and curiosity to your core style.",
    },
  },
  {
    key: "t8",
    label: "Type 8",
    low: "Yielding",
    high: "Assertive and protective",
    description: "How strongly you're driven by strength, directness and keeping control of your own life.",
    report: {
      low: "Type 8's assertive, take-charge energy plays a small role in your answers. You likely prefer cooperation over confrontation and are comfortable letting others lead. That makes you easy to work with and good at collaboration. When something truly matters, practicing a clear, direct “no” or “here's what I need” can help you hold your ground.",
      mid: "You have a moderate share of Type 8's strength and directness. You can stand up for yourself and others when it counts, but you don't need to be in charge all the time. When someone crosses a line, your firmer side shows up quickly. Knowing your triggers helps you choose when to push and when to let something go.",
      high: "Type 8's strong, protective, direct pattern stands out in your answers. You say what you think, take charge when needed and refuse to be pushed around, and you're often the first to defend someone being treated unfairly. That gives you real presence. The risk is coming on stronger than you realize and hiding your softer side, so letting trusted people see you vulnerable is a big growth step. If Type 8 isn't your main type, it still gives your personality a firm backbone.",
    },
  },
  {
    key: "t9",
    label: "Type 9",
    low: "Stirs things up",
    high: "Keeps the peace",
    description: "How strongly you're driven by peace, harmony and keeping conflict at bay.",
    report: {
      low: "Type 9's peace-keeping, go-with-the-flow pattern plays a small role in your answers. You likely know what you want and say so, and conflict doesn't make you freeze or tune out. That clarity helps you act decisively. Sometimes, pausing to hear every side before you push forward will bring people along more easily.",
      mid: "You carry a moderate share of Type 9's calm and adaptability. You can see different points of view and like things to run smoothly, but you can usually still speak up for yourself. In tense moments you may go quiet or let something slide that you later wish you'd raised. Asking yourself “what do I actually want here?” is a useful habit.",
      high: "Type 9's easygoing, harmony-seeking pattern is strong in your answers. You see every side, calm the people around you and prefer to keep things comfortable, which makes you a natural peacemaker. The risk is losing track of your own wants and going along to get along, so naming your own preferences is your growth edge. Putting off what matters most, while staying busy with small things, is another sign to watch. If Type 9 isn't your main type, it still softens and steadies your core style.",
    },
  },
  {
    key: "sp",
    label: "Self-preservation",
    low: "Loose with basics",
    high: "Security-minded",
    description: "How much your attention goes to comfort, resources, health and practical security.",
    report: {
      low: "Self-preservation is not where your attention naturally goes. You may skip meals, put off budgeting or push through tiredness when something more interesting has your focus. That frees you to pour energy into people and passions. It can also mean the basics slip until they become urgent, so a few simple routines for sleep, food and money will protect your energy.",
      mid: "You give practical security a moderate amount of attention. You look after your health, home and money reasonably well without making them the center of life. Under stress, you may lean harder on comfort and on controlling your surroundings. Noticing when “taking care of myself” turns into “hiding at home” helps you keep the balance.",
      high: "Self-preservation is a strong focus for you. You naturally keep an eye on resources, comfort, health and safety, and you feel steadier when the basics are handled. That makes you prepared and self-sufficient, often the person with a snack, a charger and a plan. The risk is playing it so safe that you hold back from risks and relationships that would enrich you, so now and then choose connection over comfort.",
    },
  },
  {
    key: "so",
    label: "Social",
    low: "Group-indifferent",
    high: "Group-attuned",
    description: "How much your attention goes to groups, belonging and your place in a community.",
    report: {
      low: "Group dynamics and social roles don't draw much of your attention. You probably relate to people one at a time and may find networking, office politics or group rituals tiring or beside the point. That keeps you free of a lot of social pressure. It can also mean you miss how a group sees you, so occasionally asking “how is this landing with everyone?” can help.",
      mid: "You pay a moderate amount of attention to groups and belonging. You enjoy being part of teams or communities and you notice social dynamics, but you don't define yourself by them. You can move between group settings and one-on-one time fairly easily. Under stress, you might notice yourself either over-focusing on how you fit in or pulling away from groups altogether.",
      high: "Social awareness is a strong focus for you. You naturally notice where people stand in a group, what the group needs and how you can contribute or belong. That makes you a valuable team member, organizer or connector. The risk is caring so much about your role and reputation that your own needs and your closest one-on-one bonds get less attention than they deserve.",
    },
  },
  {
    key: "sx",
    label: "One-to-one",
    low: "Calm connections",
    high: "Intense connections",
    description: "How much your attention goes to intense, one-to-one connection and chemistry.",
    report: {
      low: "Intense one-to-one connection isn't where your attention naturally goes. You likely prefer relationships that feel steady and calm over ones that feel electric, and very intense people may wear you out. That steadiness can make you a reliable friend and partner. Now and then, letting a connection go deeper, by sharing more or asking more, can bring new life into close relationships.",
      mid: "You give a moderate amount of attention to intensity and one-on-one chemistry. You value close bonds and enjoy a strong spark, but you don't need every relationship to feel electric. You can balance deep connections with practical life and group belonging. Under stress, you may notice yourself either chasing intensity or pulling back from closeness.",
      high: "One-to-one intensity is a strong focus for you. You're drawn to deep, absorbing connections, whether with a partner, a best friend or a passion project, and you sense chemistry quickly. That gives your relationships energy and depth. The risk is neglecting practical needs or the wider community while you chase the next strong bond, so steady routines help keep you grounded.",
    },
  },
];
