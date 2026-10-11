import type { QuizDefinition } from "@/lib/engine/types";
import { eagle, lion, owl, wolf } from "./_parts/spirit-animal-quiz/animals-a";
import { bear, deer, dolphin, fox } from "./_parts/spirit-animal-quiz/animals-b";
import { butterfly, horse, octopus, turtle } from "./_parts/spirit-animal-quiz/animals-c";

/**
 * Spirit Animal Quiz (T6 persona match). 15 image-choice items, 12 animal guides.
 * Each option adds 2 points to one animal and 1 point to another; an animal never
 * appears twice in one item. Copy says "animal guide"; the catalog title keeps the
 * search term. See seo.origin for the note on Indigenous traditions.
 */

const quiz: QuizDefinition = {
  slug: "spirit-animal-quiz",
  n: 70,
  title: "Spirit Animal Quiz",
  tagline: "Fifteen picture picks reveal the animal guide that mirrors you.",
  category: "Spiritual",
  structure: "persona_match",
  description:
    "Fifteen quick picture choices reveal which of 12 animal guides mirrors your personality, from the loyal wolf to the endlessly curious octopus.",
  disclaimer:
    "A playful personality mirror that uses widely shared animal symbolism. It isn't a spiritual practice and doesn't represent any Indigenous tradition.",
  method:
    "Each of the 15 picture questions has four options. Every option adds two points to the animal guide it fits best and one point to a second animal that shares some of its spirit. No animal appears twice in the same question, and every animal has the same number of chances to score, so none of them is easier to land than another.\n\nAt the end, each animal gets a score: the points you gave it, divided by the most it could have earned. Your animal guide is the one with the highest score. Most people carry a strong second and third animal too, which the Snapshot shows.\n\nWhat this can tell you: which personality themes, like loyalty, curiosity, calm or adventure, came through most strongly in your choices today. What it can't tell you: anything spiritual, fixed or diagnostic. The animal meanings come from broad, everyday symbolism in fables and folklore, not from any one culture's teachings. It's a self-report snapshot, so your mood and season of life shape it.",
  minutes: 3,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "wolf",
      label: "Wolf",
      description: "How strongly loyalty, belonging and protecting your people show up in your picks.",
      report: {
        low: "Wolf energy is quiet in your answers. You're less driven by belonging to a tight group, and you may prefer moving through the world on your own terms. When you do commit to a team, it's by choice rather than instinct.",
        mid: "You carry a steady thread of wolf energy. Your people matter to you, and you show up when it counts, without needing the group to define you. You can run with the pack or go solo as the moment needs.",
        high: "Wolf energy runs strong in you. Loyalty, belonging and protecting your people sit near the center of your choices. You're the one who makes sure no one gets left behind.",
      },
    },
    {
      key: "lion",
      label: "Lion",
      description: "How strongly courage, warmth and stepping forward show up in your picks.",
      report: {
        low: "Lion energy keeps a low profile in your answers. You don't usually seek the spotlight, and you'd rather lead from the side or not at all. Your courage tends to show up quietly.",
        mid: "There's a warm streak of lion energy in you. You can step forward and take charge when it's needed, then happily hand the stage to someone else. Your confidence is real but not loud.",
        high: "Lion energy shines through your picks. Courage, warmth and a natural pull toward leading the way shape how you move through the world. People often look to you when a room needs energy or direction.",
      },
    },
    {
      key: "eagle",
      label: "Eagle",
      description: "How strongly vision, focus and big goals show up in your picks.",
      report: {
        low: "Eagle energy is light in your answers. You're more interested in enjoying the present than mapping out the far horizon. Big long-term goals matter less to you than how today feels.",
        mid: "You carry some eagle energy. You can zoom out and see the bigger picture when you need to, then come back down to enjoy the details. Your goals guide you without ruling you.",
        high: "Eagle energy soars through your picks. You see far, think big and set your sights on goals other people find too high. Focus and independence come naturally to you.",
      },
    },
    {
      key: "owl",
      label: "Owl",
      description: "How strongly quiet wisdom, observation and reflection show up in your picks.",
      report: {
        low: "Owl energy is quiet in your answers. You'd usually rather act, talk or move than sit and reflect for long. Your wisdom tends to come from doing rather than from thinking things through in silence.",
        mid: "There's a thoughtful streak of owl energy in you. You like to understand things before you decide, but you don't get lost in your own head. Quiet time recharges you in small, regular doses.",
        high: "Owl energy runs deep in your picks. You observe before you speak, think before you act and notice what others miss. People often come to you when they need a calm, wise second opinion.",
      },
    },
    {
      key: "fox",
      label: "Fox",
      description: "How strongly wit, adaptability and playful cleverness show up in your picks.",
      report: {
        low: "Fox energy is faint in your answers. You prefer straight paths and clear plans over clever shortcuts and improvising. Mischief isn't really your style.",
        mid: "You've got a sly streak of fox energy. You can think on your feet and charm your way out of a jam, though you don't rely on it. A little mischief keeps your life interesting.",
        high: "Fox energy sparkles through your picks. You're quick, adaptable and clever, and you love finding the unexpected way through. People rarely predict your next move, and that's half the fun.",
      },
    },
    {
      key: "bear",
      label: "Bear",
      description: "How strongly grounded strength, rest and protectiveness show up in your picks.",
      report: {
        low: "Bear energy rests lightly in your answers. You're less drawn to cozy retreats and long recharges than many people, and you'd rather stay on the move. Your strength shows up in faster, lighter ways.",
        mid: "There's a steady dose of bear energy in you. You value rest, comfort and your own space, and you'll stand firm when someone you love needs protecting. You know when to hibernate and when to come out swinging.",
        high: "Bear energy is strong and grounded in your picks. You protect fiercely, rest deeply and need your own den to recharge. People feel safe around your calm, solid presence.",
      },
    },
    {
      key: "deer",
      label: "Deer",
      description: "How strongly gentleness, sensitivity and intuition show up in your picks.",
      report: {
        low: "Deer energy is quiet in your answers. You tend to lead with logic or boldness more than sensitivity, and you're not easily rattled. Your gentleness shows up in other, less obvious ways.",
        mid: "There's a gentle thread of deer energy in you. You notice moods and atmospheres and you trust your gut, without being overwhelmed by everything you sense. Your kindness is steady and quiet.",
        high: "Deer energy runs through your picks like a soft current. You're intuitive, gentle and tuned to what others feel, often before they say it. That sensitivity is a strength, even when it feels like a lot.",
      },
    },
    {
      key: "dolphin",
      label: "Dolphin",
      description: "How strongly playfulness, connection and joy show up in your picks.",
      report: {
        low: "Dolphin energy is faint in your answers. Big groups and constant social play aren't your main source of joy. You connect in quieter, more selective ways.",
        mid: "There's a bright splash of dolphin energy in you. You enjoy people, laughter and play, but you also value your downtime. You can light up a room and still slip away to recharge.",
        high: "Dolphin energy leaps through your picks. You're playful, social and fluent in joy, and people feel lighter around you. Connection is your native language.",
      },
    },
    {
      key: "turtle",
      label: "Turtle",
      description: "How strongly patience, steadiness and the long game show up in your picks.",
      report: {
        low: "Turtle energy is light in your answers. You prefer speed, change and momentum over slow, steady progress. Waiting is not your favorite activity.",
        mid: "You carry a calm dose of turtle energy. You can be patient when it matters and steady when things get rough, without being stuck in your ways. You know some things are worth waiting for.",
        high: "Turtle energy is strong and steady in your picks. You're patient, grounded and in it for the long game. When others rush and burn out, you're still calmly moving forward.",
      },
    },
    {
      key: "butterfly",
      label: "Butterfly",
      description: "How strongly change, creativity and reinvention show up in your picks.",
      report: {
        low: "Butterfly energy is quiet in your answers. You value stability and continuity more than constant reinvention. Change is something you handle when needed, not something you chase.",
        mid: "There's a colorful streak of butterfly energy in you. You enjoy change and creativity in healthy doses, and you're open to growing in new directions. You can reinvent yourself without losing your roots.",
        high: "Butterfly energy flutters all through your picks. You love change, beauty and the thrill of becoming someone new. Transformation doesn't scare you; it feels like home.",
      },
    },
    {
      key: "horse",
      label: "Horse",
      description: "How strongly freedom, energy and adventure show up in your picks.",
      report: {
        low: "Horse energy is calm in your answers. You don't feel a strong pull toward open roads and constant motion. You'd rather put down roots than run for the horizon.",
        mid: "You've got a healthy run of horse energy. You need some freedom and movement in your life, but you're also happy to come home to a familiar field. Adventure is a treat, not a requirement.",
        high: "Horse energy gallops through your picks. Freedom, movement and adventure feel close to essential for you. When life feels fenced in, you feel it in your whole body.",
      },
    },
    {
      key: "octopus",
      label: "Octopus",
      description: "How strongly curiosity, inventiveness and solo problem-solving show up in your picks.",
      report: {
        low: "Octopus energy is quiet in your answers. You're less drawn to tinkering, puzzling and solving things alone. You'd rather work things out with people or go with what's known.",
        mid: "There's a curious streak of octopus energy in you. You like figuring out how things work and finding creative fixes, but you don't vanish into your projects. Your curiosity is a tool, not an obsession.",
        high: "Octopus energy wraps around your picks. You're endlessly curious, inventive and happiest when you're figuring something out on your own terms. You see solutions in places others never think to look.",
      },
    },
  ],
  questions: [
    {
      id: "s1",
      kind: "choice",
      display: "tiles",
      text: "Pick a place to rest.",
      options: [
        { id: "a", emoji: "⛰️", label: "A high mountain ledge", weights: { eagle: 2, horse: 1 } },
        { id: "b", emoji: "🌲", label: "A den deep in the forest", weights: { bear: 2, wolf: 1 } },
        { id: "c", emoji: "🌊", label: "Floating on open water", weights: { dolphin: 2, octopus: 1 } },
        { id: "d", emoji: "🌳", label: "The top branch of a tall tree", weights: { owl: 2, butterfly: 1 } },
      ],
    },
    {
      id: "s2",
      kind: "choice",
      display: "tiles",
      text: "Pick a time of day.",
      options: [
        { id: "a", emoji: "🌙", label: "Midnight, wide awake", weights: { fox: 2, owl: 1 } },
        { id: "b", emoji: "☀️", label: "High noon, full sun", weights: { lion: 2, dolphin: 1 } },
        { id: "c", emoji: "🌄", label: "Dawn, before anyone's up", weights: { deer: 2, eagle: 1 } },
        { id: "d", emoji: "🌆", label: "Dusk, when things get interesting", weights: { wolf: 2, octopus: 1 } },
      ],
    },
    {
      id: "s3",
      kind: "choice",
      display: "tiles",
      text: "Pick a superpower.",
      options: [
        { id: "a", emoji: "🕊️", label: "Flying", weights: { eagle: 2, butterfly: 1 } },
        { id: "b", emoji: "🫥", label: "Turning invisible", weights: { octopus: 2, fox: 1 } },
        { id: "c", emoji: "💪", label: "Super strength", weights: { bear: 2, lion: 1 } },
        { id: "d", emoji: "💞", label: "Feeling what others feel", weights: { deer: 2, dolphin: 1 } },
      ],
    },
    {
      id: "s4",
      kind: "choice",
      display: "tiles",
      text: "Friends are planning a trip. What's your job?",
      options: [
        { id: "a", emoji: "🗺️", label: "Plan the route, plus a backup", weights: { turtle: 2, owl: 1 } },
        { id: "b", emoji: "🎉", label: "Keep everyone laughing", weights: { dolphin: 2, butterfly: 1 } },
        { id: "c", emoji: "🛡️", label: "Make sure no one gets left behind", weights: { wolf: 2, bear: 1 } },
        { id: "d", emoji: "🚗", label: "Drive. Obviously.", weights: { horse: 2, lion: 1 } },
      ],
    },
    {
      id: "s5",
      kind: "choice",
      display: "tiles",
      text: "Pick a treasure to find.",
      options: [
        { id: "a", emoji: "👑", label: "A crown that fits just right", weights: { lion: 2, wolf: 1 } },
        { id: "b", emoji: "🗝️", label: "An old key to a locked door", weights: { octopus: 2, fox: 1 } },
        { id: "c", emoji: "🐚", label: "A perfect, unbroken seashell", weights: { turtle: 2, deer: 1 } },
        { id: "d", emoji: "📜", label: "A map to somewhere unexplored", weights: { horse: 2, eagle: 1 } },
      ],
    },
    {
      id: "s6",
      kind: "choice",
      display: "tiles",
      text: "Pick a sound you love.",
      options: [
        { id: "a", emoji: "🌧️", label: "Rain on the roof", weights: { bear: 2, turtle: 1 } },
        { id: "b", emoji: "📚", label: "Pages turning in a quiet library", weights: { owl: 2, octopus: 1 } },
        { id: "c", emoji: "🏟️", label: "A crowd cheering your name", weights: { lion: 2, horse: 1 } },
        { id: "d", emoji: "🎶", label: "Friends singing badly in the car", weights: { dolphin: 2, wolf: 1 } },
      ],
    },
    {
      id: "s7",
      kind: "choice",
      display: "tiles",
      text: "Someone you love is having a hard day. You:",
      options: [
        { id: "a", emoji: "🫂", label: "Sit with them quietly", weights: { deer: 2, turtle: 1 } },
        { id: "b", emoji: "😂", label: "Make them laugh until they forget", weights: { fox: 2, dolphin: 1 } },
        { id: "c", emoji: "📝", label: "Make a plan to fix it", weights: { eagle: 2, owl: 1 } },
        { id: "d", emoji: "🚙", label: "Take them somewhere new", weights: { horse: 2, butterfly: 1 } },
      ],
    },
    {
      id: "s8",
      kind: "choice",
      display: "tiles",
      text: "Pick a door to open.",
      options: [
        { id: "a", emoji: "🚪", label: "A secret door behind a bookshelf", weights: { owl: 2, octopus: 1 } },
        { id: "b", emoji: "🌸", label: "A garden gate covered in flowers", weights: { butterfly: 2, deer: 1 } },
        { id: "c", emoji: "🛖", label: "A cabin door, smoke curling from the chimney", weights: { turtle: 2, bear: 1 } },
        { id: "d", emoji: "🏰", label: "Huge castle doors", weights: { lion: 2, eagle: 1 } },
      ],
    },
    {
      id: "s9",
      kind: "choice",
      display: "tiles",
      text: "Pick a free afternoon.",
      options: [
        { id: "a", emoji: "🧪", label: "Taking something apart to see how it works", weights: { octopus: 2, fox: 1 } },
        { id: "b", emoji: "🏞️", label: "A long walk with no plan", weights: { horse: 2, deer: 1 } },
        { id: "c", emoji: "📖", label: "A book in a quiet corner", weights: { owl: 2, turtle: 1 } },
        { id: "d", emoji: "🏐", label: "A pickup game with friends", weights: { wolf: 2, lion: 1 } },
      ],
    },
    {
      id: "s10",
      kind: "choice",
      display: "tiles",
      text: "Pick the weather.",
      options: [
        { id: "a", emoji: "⛈️", label: "A wild thunderstorm", weights: { wolf: 2, horse: 1 } },
        { id: "b", emoji: "❄️", label: "First snow, totally silent", weights: { deer: 2, bear: 1 } },
        { id: "c", emoji: "🌈", label: "Sun and rain at the same time", weights: { butterfly: 2, dolphin: 1 } },
        { id: "d", emoji: "🌬️", label: "A clear, windy day", weights: { eagle: 2, owl: 1 } },
      ],
    },
    {
      id: "s11",
      kind: "choice",
      display: "tiles",
      text: "At a party, you're the one who…",
      options: [
        { id: "a", emoji: "🎤", label: "Ends up giving a toast", weights: { lion: 2, wolf: 1 } },
        { id: "b", emoji: "🃏", label: "Knows everyone's secrets by the end", weights: { fox: 2, octopus: 1 } },
        { id: "c", emoji: "🐕", label: "Is in the kitchen with the dog", weights: { bear: 2, deer: 1 } },
        { id: "d", emoji: "💃", label: "Starts the dance floor", weights: { dolphin: 2, butterfly: 1 } },
      ],
    },
    {
      id: "s12",
      kind: "choice",
      display: "tiles",
      text: "Pick words for your bedroom wall.",
      options: [
        { id: "a", emoji: "✨", label: "Begin again.", weights: { butterfly: 2, horse: 1 } },
        { id: "b", emoji: "🌿", label: "No rush.", weights: { turtle: 2, bear: 1 } },
        { id: "c", emoji: "🎯", label: "Aim higher.", weights: { eagle: 2, lion: 1 } },
        { id: "d", emoji: "🔍", label: "Stay curious.", weights: { octopus: 2, fox: 1 } },
      ],
    },
    {
      id: "s13",
      kind: "choice",
      display: "tiles",
      text: "Pick a new hobby to try.",
      options: [
        { id: "a", emoji: "🍞", label: "Baking bread", weights: { bear: 2, turtle: 1 } },
        { id: "b", emoji: "🌼", label: "Wildflower walks", weights: { deer: 2, horse: 1 } },
        { id: "c", emoji: "🏄", label: "Group surf lessons", weights: { dolphin: 2, wolf: 1 } },
        { id: "d", emoji: "♟️", label: "Chess in the park", weights: { fox: 2, owl: 1 } },
      ],
    },
    {
      id: "s14",
      kind: "choice",
      display: "tiles",
      text: "What do you hope people say about you?",
      options: [
        { id: "a", emoji: "🔭", label: "\"They see what's coming.\"", weights: { eagle: 2, lion: 1 } },
        { id: "b", emoji: "🤝", label: "\"They never let us down.\"", weights: { wolf: 2, turtle: 1 } },
        { id: "c", emoji: "💡", label: "\"They can figure out anything.\"", weights: { octopus: 2, fox: 1 } },
        { id: "d", emoji: "🌱", label: "\"They keep growing.\"", weights: { butterfly: 2, deer: 1 } },
      ],
    },
    {
      id: "s15",
      kind: "choice",
      display: "tiles",
      text: "Choose a path.",
      options: [
        { id: "a", emoji: "🛣️", label: "A straight road to the horizon", weights: { horse: 2, eagle: 1 } },
        { id: "b", emoji: "🌀", label: "A winding trail full of surprises", weights: { fox: 2, dolphin: 1 } },
        { id: "c", emoji: "🌌", label: "A path lit only by stars", weights: { owl: 2, butterfly: 1 } },
        { id: "d", emoji: "🏡", label: "The quiet path home", weights: { turtle: 2, bear: 1 } },
      ],
    },
  ],
  outcomes: [wolf, lion, eagle, owl, fox, bear, deer, dolphin, turtle, butterfly, horse, octopus],
  seo: {
    intro:
      "What animal are you? This free quiz turns that question into fifteen quick picture choices: where you'd rest, what sound you love, which superpower you'd pick and which path you'd take. Your answers point to one of twelve animal guides, from the loyal wolf and the wise owl to the clever fox and the endlessly curious octopus. Each one is a playful mirror for your personality, and you'll see your result right away, for free. It takes about three minutes, and every animal comes with its own strengths, quirks and story.",
    measures:
      "This quiz looks for the personality themes that come through most strongly in your choices, then matches them to an animal guide. Each animal stands for a familiar trait from fables and folklore. The wolf is loyalty and belonging. The lion is courage and warmth. The eagle is vision and focus. The owl is quiet wisdom. The fox is wit and adaptability. The bear is grounded strength and rest. The deer is gentleness and intuition. The dolphin is joy and connection. The turtle is patience and the long game. The butterfly is change and creativity. The horse is freedom and adventure. The octopus is curiosity and invention.\n\nEvery answer adds points to two animals: one that fits it best and one that shares some of its spirit. Your result is the animal with the biggest share of the points it could have earned. Most people carry two or three animals strongly, so the Snapshot shows how much of all twelve came through in your answers.\n\nThe Deep Report tells your animal's story in full: what your animal guide says about you, your strengths, your shadow side, how you love and befriend, which animal guides you click or clash with, and a challenge for the year ahead with concrete steps.",
    origin:
      "People have linked animals with human qualities for thousands of years, in fables, folk tales, heraldry and everyday sayings like 'wise as an owl' or 'sly as a fox'. This quiz draws on that broad, shared symbolism.\n\nThe phrase 'spirit animal' itself has a specific meaning in some Indigenous traditions, where relationships with animals can be sacred, personal and tied to community, ceremony and teachings that belong to those communities. Many Indigenous people have asked others not to use the term casually, which is why we call your result an animal guide. This quiz is a playful personality mirror, not a spiritual practice, and it doesn't represent or borrow from any Indigenous tradition. If you'd like to learn about those traditions, the best place to start is with Indigenous voices themselves.",
    faqs: [
      {
        q: "What animal am I?",
        a: "That's what this quiz is for. Answer 15 quick picture questions about places, sounds, habits and choices, and your answers point to one of twelve animal guides: wolf, lion, eagle, owl, fox, bear, deer, dolphin, turtle, butterfly, horse or octopus. Each animal mirrors a set of personality traits, like loyalty, curiosity or calm. Your free result shows your top animal and what it says about you.",
      },
      {
        q: "Why does the quiz say 'animal guide' instead of 'spirit animal'?",
        a: "In some Indigenous traditions, spirit animals have a specific, sacred meaning, and many Indigenous people have asked that the term not be used casually. Our quiz is a light personality mirror built on everyday animal symbolism from fables and folklore, so we use 'animal guide' to describe your result. It's our way of keeping the fun while being respectful about where the phrase comes from.",
      },
      {
        q: "Can I have more than one animal guide?",
        a: "In a way, yes. Most people's answers point strongly to two or three animals, with one coming out on top. Your free result names your top match. The Snapshot shows your score for all twelve, so you can see which animals came close, and the Deep Report explains which animal guides you naturally click with and which ones challenge you to grow.",
      },
      {
        q: "Is this quiz based on a real spiritual tradition?",
        a: "No. It's a playful personality quiz. The traits linked to each animal come from broad, widely shared symbolism, the kind you'd find in fables and common sayings, not from any culture's sacred teachings. It isn't a spiritual practice, a reading or a prediction. Think of it as a fun, reflective mirror for your strengths, habits and relationships.",
      },
      {
        q: "What's free, and what's in the paid reports?",
        a: "Your animal guide and its summary are free. The Snapshot adds your score for all twelve animals and your key traits. The Deep Report is a longer, personal read: your animal's story, your strengths, your shadow side, how you love and befriend, your most compatible animal guides, and a challenge for the year with concrete next steps.",
      },
      {
        q: "Can my animal guide change?",
        a: "Yes. Your answers reflect your mood, energy and season of life, so a retake can shift the result, especially if your top two animals were close. That doesn't make one result wrong. It shows which parts of your personality are loudest right now. Many people enjoy retaking it after a big change, like a new school, job or home, to see which animal shows up.",
      },
    ],
    keywords: ["spirit animal quiz", "what is my spirit animal", "what animal am i"],
  },
  related: ["mental-age-test", "magic-academy-house-quiz"],
  reviewNotes:
    "T6 persona match: 15 tile items, 12 animal guides. Each option gives 2 points to one animal and 1 to another; every animal is a main pick in about 5 items and a secondary in about 5. Cultural sensitivity: the phrase 'spirit animal' appears only in the title, seo.origin, one FAQ question/answer and seo.keywords; all other copy says 'animal guide'. Please have the seo.origin note on Indigenous traditions reviewed by someone with relevant cultural knowledge before publishing. Animal facts are kept general (wolves in packs, octopus three hearts and color change, monarch multi-generation migration, sea turtles returning to their birth beaches, lions as the most social big cat); please spot-check. Compatibility map is symmetric: allies form a ring (wolf-bear-turtle-owl-fox-octopus-butterfly-deer-horse-eagle-lion-dolphin-wolf); growth pairs lion/deer, eagle/turtle, horse/owl, wolf/butterfly, fox/bear, dolphin/octopus; friction pairs lion/fox, eagle/butterfly, bear/dolphin, turtle/horse, wolf/deer, owl/octopus.",
};

export default quiz;
