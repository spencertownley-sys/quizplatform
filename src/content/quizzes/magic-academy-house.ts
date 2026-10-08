import type { Outcome, QuizDefinition } from "@/lib/engine/types";

/**
 * Magic Academy House Quiz (T6, persona match).
 * Original houses and lore. Do not use Harry Potter or Hogwarts names,
 * crests or colors anywhere in this quiz or its paid reports.
 * DRAFT: 8 items for development; launch target is 20.
 */

const houses = {
  emberhold: "emberhold",
  gildmere: "gildmere",
  lanternfall: "lanternfall",
  hearthwood: "hearthwood",
} as const;

const E = { [houses.emberhold]: 1 };
const G = { [houses.gildmere]: 1 };
const L = { [houses.lanternfall]: 1 };
const H = { [houses.hearthwood]: 1 };

function outcome(key: string, name: string, summary: string, snapshot: string[]): Outcome {
  return {
    key,
    name,
    summary,
    snapshot,
    deep: [
      { title: `The lore of ${name}`, teaser: `Founded on the night the old academy burned, ${name} took its name from…`, body: "TODO: writer content." },
      { title: "Your role in the house", teaser: "Your answers point to one of three roles every house needs…", body: "TODO: writer content." },
      { title: "Allies and rivals", teaser: "Your house's oldest friendship and fiercest rivalry both began when…", body: "TODO: writer content." },
    ],
  };
}

export const magicAcademyHouse: QuizDefinition = {
  slug: "magic-academy-house",
  title: "Magic Academy House Quiz",
  category: "Fandom-style",
  structure: "persona_match",
  description:
    "Four houses, four ways of facing the unknown. Answer eight scenario questions and find out which house at the Academy would claim you.",
  minutes: 2,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    { key: houses.emberhold, label: "Emberhold" },
    { key: houses.gildmere, label: "Gildmere" },
    { key: houses.lanternfall, label: "Lanternfall" },
    { key: houses.hearthwood, label: "Hearthwood" },
  ],
  questions: [
    {
      id: "m1",
      kind: "choice",
      text: "A sealed door blocks the corridor. What do you do?",
      options: [
        { id: "a", label: "Force it open", weights: E },
        { id: "b", label: "Find another route that gets you there first", weights: G },
        { id: "c", label: "Study the runes carved into it", weights: L },
        { id: "d", label: "Wait for your friends so no one goes alone", weights: H },
      ],
    },
    {
      id: "m2",
      kind: "choice",
      text: "Pick a prize from the headmaster's vault.",
      options: [
        { id: "a", label: "A blade that never dulls", weights: E },
        { id: "b", label: "A crown that makes people listen", weights: G },
        { id: "c", label: "A book that answers any question once", weights: L },
        { id: "d", label: "A cloak big enough to shelter everyone", weights: H },
      ],
    },
    {
      id: "m3",
      kind: "choice",
      text: "Your study group is failing. You:",
      options: [
        { id: "a", label: "Rally them with a speech and a plan", weights: E },
        { id: "b", label: "Reassign tasks to the people who'll get it done", weights: G },
        { id: "c", label: "Rewrite the notes so they finally make sense", weights: L },
        { id: "d", label: "Bring snacks and keep everyone going", weights: H },
      ],
    },
    {
      id: "m4",
      kind: "choice",
      text: "Which sound would you most like to fall asleep to?",
      options: [
        { id: "a", label: "A crackling fire", weights: E },
        { id: "b", label: "A distant city at night", weights: G },
        { id: "c", label: "Rain on a library window", weights: L },
        { id: "d", label: "Friends talking quietly in the next room", weights: H },
      ],
    },
    {
      id: "m5",
      kind: "choice",
      text: "A rival house cheats in the tournament. You:",
      options: [
        { id: "a", label: "Call them out in front of everyone", weights: E },
        { id: "b", label: "Quietly make sure it backfires on them", weights: G },
        { id: "c", label: "Gather proof and take it to the judges", weights: L },
        { id: "d", label: "Make sure your own team stays fair and together", weights: H },
      ],
    },
    {
      id: "m6",
      kind: "choice",
      text: "Choose a creature companion.",
      options: [
        { id: "a", label: "A young fire drake", weights: E },
        { id: "b", label: "A silver fox who trades in secrets", weights: G },
        { id: "c", label: "An owl that remembers everything", weights: L },
        { id: "d", label: "A big, patient mountain dog", weights: H },
      ],
    },
    {
      id: "m7",
      kind: "choice",
      text: "What would you hate most to be called?",
      options: [
        { id: "a", label: "A coward", weights: E },
        { id: "b", label: "Ordinary", weights: G },
        { id: "c", label: "Foolish", weights: L },
        { id: "d", label: "Disloyal", weights: H },
      ],
    },
    {
      id: "m8",
      kind: "choice",
      text: "After graduation you'd most like to:",
      options: [
        { id: "a", label: "Explore the uncharted north", weights: E },
        { id: "b", label: "Sit on the High Council", weights: G },
        { id: "c", label: "Invent a spell no one has cast before", weights: L },
        { id: "d", label: "Open an inn where every traveler is welcome", weights: H },
      ],
    },
  ],
  outcomes: [
    outcome(houses.emberhold, "Emberhold", "Emberhold claims the bold. You act when others hesitate, and you'd rather face a problem head-on than wait for it to come to you.", ["Courage over caution", "First through the door", "Fiercely protective of the people you choose"]),
    outcome(houses.gildmere, "Gildmere", "Gildmere claims the ambitious. You see where things are heading, plan several moves ahead, and aim to leave a mark.", ["Strategy over impulse", "Natural leader and negotiator", "You make plans that actually happen"]),
    outcome(houses.lanternfall, "Lanternfall", "Lanternfall claims the curious. You need to understand how things work, and your answers often arrive while everyone else is still guessing.", ["Knowledge over force", "Patient problem-solver", "You notice what others miss"]),
    outcome(houses.hearthwood, "Hearthwood", "Hearthwood claims the loyal. You hold groups together, keep your word, and make people feel they belong.", ["People over prizes", "The friend everyone calls first", "Steady when things fall apart"]),
  ],
};
