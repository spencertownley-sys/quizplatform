import type { Dimension } from "@/lib/engine/types";

export const dimensions: Dimension[] = [
  {
    key: "openness",
    label: "Openness",
    low: "Practical",
    high: "Curious",
    description: "How drawn you are to new ideas, imagination, art and unfamiliar experiences.",
    report: {
      low: "You prefer the familiar and the practical over the new and the abstract. You tend to trust methods that have already proven themselves, and you would rather get to the point than explore every possibility. That makes you grounded and easy to rely on when a job needs doing the tried-and-true way. The trade-off is that unfamiliar ideas can feel like a waste of time at first, so it helps to give new things a short, fair trial before deciding.",
      mid: "You are open to new ideas when they have a clear purpose, but you don't chase novelty for its own sake. You can enjoy a thought-provoking film or a fresh way of working and still feel at home with routines that work. People in this range often act as translators between the dreamers and the doers around them. Your best results come when you pick a few areas to explore deeply rather than sampling everything.",
      high: "You are curious, imaginative and drawn to ideas, art and experiences that stretch your thinking. You notice patterns and possibilities, enjoy questions without easy answers, and get restless when life becomes too predictable. This curiosity fuels creativity and learning, and it often makes you an interesting person to talk to. The watch-out is follow-through: when the next fascinating idea arrives, finishing the last one can lose its shine.",
    },
  },
  {
    key: "conscientiousness",
    label: "Conscientiousness",
    low: "Spontaneous",
    high: "Disciplined",
    description: "How organized, dependable and goal-driven you tend to be.",
    report: {
      low: "You are flexible and spontaneous, and you would rather respond to the moment than follow a strict plan. You tend to work in bursts when something grabs you, and rigid rules or schedules can feel like a cage. That adaptability helps in fast-changing situations and makes you good at improvising. The cost usually shows up in deadlines, clutter and promises that slip, so simple outside structure, like reminders, checklists or a study buddy, can do a lot of heavy lifting for you.",
      mid: "You can be organized and dependable when it matters, without needing everything planned. You probably keep on top of important commitments while letting smaller things slide, and you can switch between structured and relaxed modes. This balance often makes you easy to work with: reliable, but not rigid. Your challenge is noticing when \"good enough\" is quietly turning into \"not done.\"",
      high: "You are organized, reliable and driven to finish what you start. You plan ahead, keep your word, and feel uneasy when things are left half-done or messy. People tend to count on you, and over time this steadiness adds up to real achievements. The risk is that high standards turn into pressure, so you may find it hard to rest, delegate, or accept work that is good but not perfect.",
    },
  },
  {
    key: "extraversion",
    label: "Extraversion",
    low: "Reserved",
    high: "Outgoing",
    description: "How much you seek out people, activity and stimulation, and how much energy you get from them.",
    report: {
      low: "You recharge in quiet and tend to prefer a few close connections over a busy social scene. You are often more comfortable listening than holding the floor, and you like to think before you speak. This is not the same as shyness or disliking people; it is a preference for calmer settings and deeper conversations. You will do your best work and socializing when you plan for recovery time instead of apologizing for needing it.",
      mid: "You sit near the middle of the introvert-to-extravert range, a pattern often called being an ambivert. You can enjoy a lively evening out and also look forward to a quiet night in, and your energy depends a lot on the people and the setting. This flexibility lets you adapt to many roles, from leading a group project to working alone. Noticing which situations recharge you and which drain you will help you plan your weeks.",
      high: "You draw energy from people, activity and excitement. You tend to speak up, start conversations, and feel most alive when something is happening. Others often experience you as warm, upbeat and fun to be around, and you can lift the mood of a whole group. The flip side is that too much quiet can feel flat, and you may jump in to talk or act before others have had their turn.",
    },
  },
  {
    key: "agreeableness",
    label: "Agreeableness",
    low: "Challenging",
    high: "Accommodating",
    description: "How much you prioritize trust, kindness and cooperation in dealing with others.",
    report: {
      low: "You are direct and skeptical, and you are willing to put your own view first when it counts. You don't take people's claims at face value, and you are comfortable with disagreement if it gets closer to the truth. This can make you a strong negotiator, critic or advocate for a cause. The trade-off is that others may experience you as blunt or hard to win over, so warmth shown on purpose goes a long way.",
      mid: "You are generally kind and cooperative, but you can stand your ground when something matters. You will compromise to keep the peace without letting yourself be walked over, and you tend to trust people once they have earned it. This balance helps you be both caring and fair. Your growth edge is noticing whether you are defaulting to pleasing or to pushing back, and then choosing on purpose.",
      high: "You are warm, trusting and quick to help, and you care a lot about getting along. You tend to see the best in people, avoid needless conflict, and feel others' troubles almost as your own. People feel safe and valued around you, which makes you a natural teammate and friend. The risk is saying yes too often, because your own needs can get lost if you rarely push back.",
    },
  },
  {
    key: "neuroticism",
    label: "Emotional sensitivity (neuroticism)",
    low: "Steady",
    high: "Reactive",
    description: "How strongly you feel stress, worry, anger and low moods, and how quickly they pass.",
    report: {
      low: "You tend to stay calm and steady, even when things get stressful. Setbacks usually roll off you fairly quickly, and you don't spend much time worrying about what might go wrong. That steadiness is a real asset in a crisis, and other people may lean on you when they feel shaken. The watch-out is that you can underestimate stress in yourself or others, or miss early warning signs that a little worry would have caught.",
      mid: "You feel stress, worry and frustration at everyday levels, and you usually recover once the pressure passes. Some situations get under your skin, often ones that touch your relationships or your sense of being good at things, while others barely register. This middle range gives you enough of an inner alarm to take problems seriously without being swamped by them. Learning your specific triggers is the most useful next step.",
      high: "You feel emotions strongly, especially worry, frustration and self-doubt. Your inner alarm system is sensitive, so small problems can feel big and bad moods can linger. That same sensitivity often makes you alert to risks and tuned in to how things could go wrong, which has real value. With steady habits like sleep, movement, talking things through and questioning worst-case thinking, many people with this pattern feel noticeably calmer. If worry or low mood is getting in the way of daily life, talking with a doctor or counselor is a smart step.",
    },
  },
];
