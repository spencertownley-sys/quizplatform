import type { QuizDefinition } from "@/lib/engine/types";
import { emberhold, gildmere } from "./_parts/magic-academy-house-quiz/houses-a";
import { hearthwood, lanternfall } from "./_parts/magic-academy-house-quiz/houses-b";

/**
 * Magic Academy House Quiz (T6 persona match). 20 scenario items, four ORIGINAL houses
 * of Larkspire Academy. Every option gives 2 points to one house; 16 options also give
 * 1 point to a second house (4 per house), so every house has the same ceiling.
 * The site shows ranking[1] as the secondary house.
 *
 * Lore bible (keep consistent across all copy):
 * - Larkspire Academy: rebuilt after the Night of Embers, when the Old Hall burned. At dawn,
 *   larks were singing on the one spire still standing, so the new school took its name.
 * - Emberhold (courage): students who ran into the smoke. Carried the last coal of the Old Hall's
 *   hearth; it still burns in the Long Hearth. Symbol: salamander. Colors: copper and charcoal.
 *   Common room: the Forge Loft. Motto: "Through, not around." Tradition: the Brave Bell.
 * - Gildmere (ambition): students who organized the bucket lines from the Mere, rallied the town
 *   and raised the money to rebuild. Symbol: heron. Colors: plum and gold. Common room: the
 *   Glass Gallery. Motto: "Build what lasts." Tradition: the Ledger of Intent.
 * - Lanternfall (wisdom): students who saved the library, caught the falling lanterns, then worked
 *   out how the fire started and wrote the Rules of Kindling. Symbol: moth. Colors: deep teal and
 *   candle-cream. Common room: the Lantern Stair. Motto: "Ask once more." Tradition: the Question Wall.
 * - Hearthwood (loyalty): students who led the youngest into the oak grove, kept them warm and
 *   singing all night, then rebuilt the dormitories from fallen oaks. Symbol: wren. Colors: moss
 *   green and oak brown. Common room: the Oak Lodge. Motto: "Room for one more." Tradition: the
 *   Quilt of Names.
 * - Allies: Emberhold + Hearthwood (the Frost Supper); Gildmere + Lanternfall (the Blueprint Supper).
 *   Rivals: Emberhold vs Lanternfall (act vs think; the Kindling Trials); Gildmere vs Hearthwood
 *   (rise vs stay together; the Harvest Market).
 * - The Claiming: each new student carries an unlit taper through the Hall of Four Doors; the wick
 *   lights at their house's door. Sometimes it flickers first at another door: the "second flame".
 * - Roles (primary + secondary house): Emberhold: Vanguard (+G), Pathfinder (+L), Shieldbearer (+H).
 *   Gildmere: Herald (+E), Architect (+L), Steward (+H). Lanternfall: Seeker (+E), Cartographer (+G),
 *   Lamplighter (+H). Hearthwood: Warden (+E), Quartermaster (+G), Confidant (+L).
 */

const quiz: QuizDefinition = {
  slug: "magic-academy-house-quiz",
  n: 77,
  title: "Magic Academy House Quiz",
  tagline: "Four houses, one candle. Find the house that would claim you.",
  category: "Fandom-style",
  structure: "persona_match",
  description:
    "Face 20 scenes from your first year at Larkspire Academy and find out which of four original houses would claim you, plus your secondary house.",
  disclaimer:
    "An original fantasy world made for fun. Larkspire Academy and its houses aren't connected to any book, film or franchise, and this isn't a personality test.",
  method:
    "Each of the 20 scenes offers four choices, and each choice belongs to one house: Emberhold for courage, Gildmere for ambition, Lanternfall for wisdom and Hearthwood for loyalty. Every choice gives two points to its house. Some choices also give one point to a second house that shares a little of the same spirit. Every house has exactly the same number of chances to score, so none is easier to land than another.\n\nAt the end, each house gets a score: the points you gave it, divided by the most it could have earned. The house with the highest score claims you, and the house in second place is your secondary house, which shapes your role and colors how you show up. If two houses tie, the earlier one in the list above wins.\n\nWhat this can tell you: which values (courage, ambition, wisdom or loyalty) came through most strongly in your choices today. What it can't tell you: anything fixed or clinical about your personality. It's a self-report snapshot dressed in a story, so your mood and season of life shape it.",
  minutes: 5,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "emberhold",
      label: "Emberhold",
      description: "How strongly courage and acting first show up in your choices.",
      report: {
        low: "Emberhold's fire burns low in your answers. You tend to pause, plan or check on others before charging in. Courage shows up for you in quieter, more considered ways.",
        mid: "You carry a steady Emberhold spark. When something truly matters, you'll step forward, but you don't go looking for danger for its own sake. Your courage is reliable rather than reckless.",
        high: "Emberhold's fire runs hot in your answers. You act when others hesitate and would rather face a problem head-on than wait for it. Courage is less something you summon than something you live by.",
      },
    },
    {
      key: "gildmere",
      label: "Gildmere",
      description: "How strongly ambition, strategy and building something lasting show up in your choices.",
      report: {
        low: "Gildmere's gold glints only faintly in your answers. Status, strategy and long-range plans don't drive many of your choices. You'd rather enjoy the moment than climb toward a distant prize.",
        mid: "There's a fair shine of Gildmere ambition in you. You like to make progress and leave a mark, but you won't trample people or principles to get there. You plan when it matters and relax when it doesn't.",
        high: "Gildmere's ambition gleams through your answers. You think several moves ahead, aim high and want your efforts to add up to something lasting. People often trust you to turn a vague idea into a real plan.",
      },
    },
    {
      key: "lanternfall",
      label: "Lanternfall",
      description: "How strongly curiosity, careful thought and the hunger to understand show up in your choices.",
      report: {
        low: "Lanternfall's lamps are dim in your answers. You'd rather act, connect or lead than puzzle over books and runes. You learn best by doing, not by studying first.",
        mid: "A steady Lanternfall light runs through your answers. You like to understand things before you decide, without getting lost in thought. Curiosity is one tool among several for you.",
        high: "Lanternfall's lanterns burn bright in your answers. You need to understand how things work, and you notice what others miss. When a problem looks impossible, your first instinct is to ask a better question.",
      },
    },
    {
      key: "hearthwood",
      label: "Hearthwood",
      description: "How strongly loyalty, fairness and keeping people together show up in your choices.",
      report: {
        low: "Hearthwood's hearth glows quietly in your answers. Your choices lean more toward your own goals, ideas or adventures than toward keeping the group together. Loyalty matters to you, but it isn't what drives you most.",
        mid: "You carry a warm measure of Hearthwood loyalty. You look out for your people and keep your promises, while still making room for your own path. Friends know you'll show up when it counts.",
        high: "Hearthwood's warmth fills your answers. Loyalty, fairness and making sure no one is left out sit at the center of your choices. You're the one who holds a group together when things fall apart.",
      },
    },
  ],
  questions: [
    {
      id: "h1",
      kind: "choice",
      text: "A sealed door blocks the corridor. What do you do?",
      options: [
        { id: "a", label: "Force it open", weights: { emberhold: 2 } },
        { id: "b", label: "Find a faster way around", weights: { gildmere: 2 } },
        { id: "c", label: "Study the runes carved into it", weights: { lanternfall: 2 } },
        { id: "d", label: "Wait for your friends so no one goes alone", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h2",
      kind: "choice",
      text: "You may take one prize from the Provost's vault. Which?",
      options: [
        { id: "a", label: "A blade that never dulls", weights: { emberhold: 2 } },
        { id: "b", label: "A ring that makes people listen", weights: { gildmere: 2 } },
        { id: "c", label: "A book that answers any question, once", weights: { lanternfall: 2 } },
        { id: "d", label: "A cloak big enough to shelter everyone", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h3",
      kind: "choice",
      text: "Your study group is falling behind. You:",
      options: [
        { id: "a", label: "Rally them with a speech and a plan", weights: { emberhold: 2, gildmere: 1 } },
        { id: "b", label: "Give each person the task they're best at", weights: { gildmere: 2 } },
        { id: "c", label: "Rewrite the notes so everyone finally gets it", weights: { lanternfall: 2, hearthwood: 1 } },
        { id: "d", label: "Bring snacks and keep everyone going", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h4",
      kind: "choice",
      text: "Which sound would you most like to fall asleep to?",
      options: [
        { id: "a", label: "A crackling fire", weights: { emberhold: 2, hearthwood: 1 } },
        { id: "b", label: "A distant city at night", weights: { gildmere: 2 } },
        { id: "c", label: "Rain on a library window", weights: { lanternfall: 2 } },
        { id: "d", label: "Friends talking softly in the next room", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h5",
      kind: "choice",
      text: "A rival house cheats in a contest. You:",
      options: [
        { id: "a", label: "Call them out in front of everyone", weights: { emberhold: 2 } },
        { id: "b", label: "Quietly make sure it backfires on them", weights: { gildmere: 2 } },
        { id: "c", label: "Gather proof and take it to the judges", weights: { lanternfall: 2, gildmere: 1 } },
        { id: "d", label: "Keep your own team fair and together", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h6",
      kind: "choice",
      text: "Choose a creature companion.",
      options: [
        { id: "a", label: "A young fire drake", weights: { emberhold: 2 } },
        { id: "b", label: "A silver fox who trades in secrets", weights: { gildmere: 2, lanternfall: 1 } },
        { id: "c", label: "A glowing moth that finds lost things", weights: { lanternfall: 2 } },
        { id: "d", label: "A big, patient mountain dog", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h7",
      kind: "choice",
      text: "What would you hate most to be called?",
      options: [
        { id: "a", label: "A coward", weights: { emberhold: 2 } },
        { id: "b", label: "Ordinary", weights: { gildmere: 2 } },
        { id: "c", label: "Foolish", weights: { lanternfall: 2 } },
        { id: "d", label: "Disloyal", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h8",
      kind: "choice",
      text: "After you graduate, you'd most like to:",
      options: [
        { id: "a", label: "Explore the uncharted north", weights: { emberhold: 2, lanternfall: 1 } },
        { id: "b", label: "Earn a seat on the High Council", weights: { gildmere: 2 } },
        { id: "c", label: "Invent a spell no one has ever cast", weights: { lanternfall: 2, gildmere: 1 } },
        { id: "d", label: "Open an inn where every traveler is welcome", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h9",
      kind: "choice",
      text: "A new student is lost and crying in a corridor. You:",
      options: [
        { id: "a", label: "Walk them to class and glare at anyone who laughs", weights: { emberhold: 2, hearthwood: 1 } },
        { id: "b", label: "Introduce them to the people worth knowing", weights: { gildmere: 2 } },
        { id: "c", label: "Teach them a trick for finding their way", weights: { lanternfall: 2 } },
        { id: "d", label: "Sit with them until they're ready", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h10",
      kind: "choice",
      text: "The academy holds a talent night. You:",
      options: [
        { id: "a", label: "Sign up for the riskiest act", weights: { emberhold: 2 } },
        { id: "b", label: "Host the whole show", weights: { gildmere: 2, emberhold: 1 } },
        { id: "c", label: "Rig the lights and effects backstage", weights: { lanternfall: 2 } },
        { id: "d", label: "Cheer the loudest for every single act", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h11",
      kind: "choice",
      text: "You find a map to the forbidden wing. You:",
      options: [
        { id: "a", label: "Go tonight", weights: { emberhold: 2 } },
        { id: "b", label: "Keep it secret. Maps are leverage.", weights: { gildmere: 2 } },
        { id: "c", label: "Check it against the old floor plans", weights: { lanternfall: 2 } },
        { id: "d", label: "Show your closest friends first", weights: { hearthwood: 2, emberhold: 1 } },
      ],
    },
    {
      id: "h12",
      kind: "choice",
      text: "Pick a class for this term.",
      options: [
        { id: "a", label: "Ember-craft: shaping living fire", weights: { emberhold: 2 } },
        { id: "b", label: "Persuasion and Diplomacy", weights: { gildmere: 2 } },
        { id: "c", label: "Star Charts and Old Languages", weights: { lanternfall: 2 } },
        { id: "d", label: "The Healing Arts", weights: { hearthwood: 2, lanternfall: 1 } },
      ],
    },
    {
      id: "h13",
      kind: "choice",
      text: "Your friend is blamed for something you did. You:",
      options: [
        { id: "a", label: "Confess right away, in front of everyone", weights: { emberhold: 2, hearthwood: 1 } },
        { id: "b", label: "Fix it quietly before the story spreads", weights: { gildmere: 2 } },
        { id: "c", label: "Prove what really happened, step by step", weights: { lanternfall: 2 } },
        { id: "d", label: "Stand beside them until it's cleared up", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h14",
      kind: "choice",
      text: "Pick a spot to study.",
      options: [
        { id: "a", label: "On the roof, where you're not allowed", weights: { emberhold: 2 } },
        { id: "b", label: "A private room you booked weeks ago", weights: { gildmere: 2 } },
        { id: "c", label: "The deepest corner of the library", weights: { lanternfall: 2 } },
        { id: "d", label: "A big table with friends and snacks", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h15",
      kind: "choice",
      text: "A spell goes wrong and your hair turns bright purple. You:",
      options: [
        { id: "a", label: "Own it. It's a look now.", weights: { emberhold: 2 } },
        { id: "b", label: "Start a trend before anyone can laugh", weights: { gildmere: 2, emberhold: 1 } },
        { id: "c", label: "Work out exactly which word you got wrong", weights: { lanternfall: 2 } },
        { id: "d", label: "Laugh, then help everyone else fix theirs", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h16",
      kind: "choice",
      text: "Which kind of magic would you master first?",
      options: [
        { id: "a", label: "Fire that answers to your voice", weights: { emberhold: 2 } },
        { id: "b", label: "Glamours that change how others see you", weights: { gildmere: 2 } },
        { id: "c", label: "Reading the history of any object you touch", weights: { lanternfall: 2 } },
        { id: "d", label: "Wards that keep a whole house safe", weights: { hearthwood: 2, emberhold: 1 } },
      ],
    },
    {
      id: "h17",
      kind: "choice",
      text: "Your house is losing the end-of-year Kindling Trials. You:",
      options: [
        { id: "a", label: "Volunteer for the hardest final challenge", weights: { emberhold: 2 } },
        { id: "b", label: "Find a loophole in the rules", weights: { gildmere: 2, lanternfall: 1 } },
        { id: "c", label: "Study the scoring to see where to gain", weights: { lanternfall: 2, gildmere: 1 } },
        { id: "d", label: "Keep everyone's spirits up, win or lose", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h18",
      kind: "choice",
      text: "What's in your bag on your first day?",
      options: [
        { id: "a", label: "Almost nothing. You'll figure it out.", weights: { emberhold: 2 } },
        { id: "b", label: "A planner, color-coded to the end of term", weights: { gildmere: 2 } },
        { id: "c", label: "Three books, one of them not on the list", weights: { lanternfall: 2 } },
        { id: "d", label: "Spares of everything, in case someone forgot", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h19",
      kind: "choice",
      text: "A stranger offers to sell you a secret. You:",
      options: [
        { id: "a", label: "Pay it. What's life without a little risk?", weights: { emberhold: 2 } },
        { id: "b", label: "Haggle the price down first", weights: { gildmere: 2 } },
        { id: "c", label: "Ask how they know it before anything else", weights: { lanternfall: 2 } },
        { id: "d", label: "Ask whether it could hurt anyone you love", weights: { hearthwood: 2 } },
      ],
    },
    {
      id: "h20",
      kind: "choice",
      text: "How do you want to be remembered at Larkspire?",
      options: [
        { id: "a", label: "As the one who never backed down", weights: { emberhold: 2 } },
        { id: "b", label: "With your name carved over a doorway", weights: { gildmere: 2 } },
        { id: "c", label: "As the one who solved the unsolvable", weights: { lanternfall: 2 } },
        { id: "d", label: "As the friend everyone could count on", weights: { hearthwood: 2 } },
      ],
    },
  ],
  outcomes: [emberhold, gildmere, lanternfall, hearthwood],
  seo: {
    intro:
      "Which house would a school of magic choose for you? This free quiz drops you into your first year at Larkspire Academy, an original world built for this quiz, and asks what you'd do: at a sealed door, a forbidden map, a cheating rival or a lost new student. Twenty scenes later, one of four houses claims you. Emberhold prizes courage, Gildmere ambition, Lanternfall wisdom and Hearthwood loyalty. You'll see your house right away for free, along with your secondary house, the one that came a close second. It takes about five minutes.",
    measures:
      "Under the story, the quiz looks at four values that show up in almost every tale of a magic school: courage, ambition, wisdom and loyalty. Each scene gives you four ways to respond, and each response leans toward one of those values. Charge the sealed door and you lean Emberhold. Find the faster route and you lean Gildmere. Study the runes and you lean Lanternfall. Wait for your friends and you lean Hearthwood. Some choices carry a little of a second value too, because real people are rarely just one thing.\n\nYour house is the value with the biggest share of the points it could have earned. Your secondary house is the runner-up, and it matters more than you might think. In Larkspire lore, the secondary house decides your role within your own house: an Emberhold student with a strong Hearthwood streak becomes a Shieldbearer, while one with Lanternfall leanings becomes a Pathfinder.\n\nThe free result names both houses. The Snapshot shows your score for all four. The Deep Report opens the full world: your house's history from the Night of Embers, its symbol, colors, common room and traditions; the real-life traits behind your result; your role in the house; your house's allies and rivals; what your secondary house adds; a second-person scene of your very first night at the academy; and a quest for your first year with concrete steps.",
    origin:
      "School-house stories have a long history, from real boarding schools that split students into houses for sports and pastoral care to the many fantasy novels that turned the idea into something magical. The appeal is easy to see. A house is a ready-made belonging, with a name to cheer for, a history to borrow and people who are on your side from the first night. Choosing between courage, ambition, wisdom and loyalty also makes you think about what you value most.\n\nLarkspire Academy and its four houses are original to this quiz. Their names, history, symbols, colors and traditions were written for it, and it isn't affiliated with or endorsed by any author, studio or franchise. Like any quiz built on a story, it's a playful mirror, not a scientific measure, and your result can shift with your mood.",
    faqs: [
      {
        q: "Which magic school house am I in?",
        a: "Take the quiz to find out. You'll face 20 short scenes from your first year at Larkspire Academy and choose how you'd respond. Each choice leans toward one of four houses: Emberhold (courage), Gildmere (ambition), Lanternfall (wisdom) or Hearthwood (loyalty). The house with the highest score claims you, and the runner-up becomes your secondary house. Both are shown free as soon as you finish.",
      },
      {
        q: "Is this connected to a famous book or film series?",
        a: "No. Larkspire Academy, its four houses and all of its history, symbols, colors and traditions were created for this quiz. It isn't affiliated with, based on or endorsed by any author, studio or franchise. If you love stories about magic schools and wondering where you'd belong, this is a brand-new world built for that same feeling, with its own lore to explore.",
      },
      {
        q: "What is a secondary house?",
        a: "Your secondary house is the house that scored second. Hardly anyone is purely one thing, and your secondary house shows which other value runs strongly through your choices. In Larkspire lore it also decides your role within your main house. A Gildmere student with Hearthwood second, for example, becomes a Steward who builds things for the good of the group.",
      },
      {
        q: "Can I choose my own house?",
        a: "In Larkspire lore, the candle chooses: during the Claiming, the wick lights at your house's door. In real life, your result simply reflects the choices you made today, so if you answered differently, you could land somewhere else. Many people find their secondary house feels just as true as their main one. Read about both, and see which one feels most like home.",
      },
      {
        q: "What's free, and what's in the paid reports?",
        a: "Your house, its summary and your secondary house are free. The Snapshot adds your score for all four houses and your key traits. The Deep Report is a long, story-rich read: your house's full lore, the real-life traits behind your result, your role in the house, your allies and rivals, what your secondary house adds, a scene of your first night at Larkspire and a quest for your first year.",
      },
      {
        q: "Why did my house change when I retook the quiz?",
        a: "Because most people carry more than one house's values, and small changes in mood or situation can tip a close result. If your top two houses were near each other, a retake can swap them. That doesn't mean either result is wrong. It means you have real strengths in both, which in Larkspire lore makes you exactly the kind of student the houses argue over.",
      },
    ],
    keywords: ["harry potter house quiz", "hogwarts house quiz", "patronus quiz"],
  },
  related: ["spirit-animal-quiz", "mental-age-test"],
  reviewNotes:
    "T6 persona match: 20 scenario items, four original houses of Larkspire Academy. Every option gives 2 points to its house; 16 options also give 1 point to a second house (exactly 4 per house), so every house has the same ceiling (40). IP check: no franchise names, characters, crests or colors are used anywhere visible; house colors were chosen to avoid known pairings (Emberhold copper/charcoal, Gildmere plum/gold, Lanternfall deep teal/candle-cream, Hearthwood moss/oak brown); symbols avoid lion, snake, badger, eagle and raven. We also avoided franchise-coded terms (no wands, sorting, house points, house cup, Great Hall, prefects, Head of House or arrival by train or boat). Please (1) run a trademark search on 'Larkspire Academy' and the four house names; (2) confirm the seo.faqs claim that the free result shows the secondary house (the brief says the site shows ranking[1] automatically); (3) confirm the 'Kindling Trials' name doesn't read as a stand-in for any franchise contest. The lore bible is at the top of this file; keep future edits consistent with it.",
};

export default quiz;
