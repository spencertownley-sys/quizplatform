import type { QuizDefinition } from "@/lib/engine/types";
import { age35, age50, age80 } from "./_parts/mental-age-test/older";
import { age12, age19, age27 } from "./_parts/mental-age-test/young";

/**
 * Mental Age Test (T6 persona match). 15 image-choice items, six age bands.
 * Each option adds 2 points to the age it fits best and usually 1 to a neighbor.
 * Every age is the main pick in exactly 10 items, so no band has an easier ceiling.
 */

const quiz: QuizDefinition = {
  slug: "mental-age-test",
  n: 18,
  title: "Mental Age Test",
  tagline: "How old is your soul, really? Fifteen quick picks will tell.",
  category: "Personality",
  structure: "persona_match",
  description:
    "Pick snacks, Saturdays and nap policies to find your mental age, from 12 at heart to an 80-year-old soul. Fifteen quick taps, no wrong answers.",
  disclaimer:
    "A playful quiz about your tastes and habits. It doesn't measure maturity, intelligence or development, and no result is better than another.",
  method:
    "This quiz matches your everyday tastes to one of six mental ages. Each of the 15 picture questions offers four options. Each option adds two points to the mental age it fits best and, usually, one point to a neighboring age. At the end, every mental age gets a score: the points you gave it, divided by the most it could have earned. Your result is the age with the highest score, and ties go to the younger age.\n\nYour full mix matters as much as the winner. Most people are a blend of two or three ages, and a close second place is common.\n\nWhat this can tell you: which life-stage habits and tastes you lean toward right now, in a playful, mirror-like way. What it can't tell you: anything about your intelligence, maturity, development or health. 'Mental age' here is a fun label, not the old testing term. It's a self-report snapshot, so your mood, energy and season of life all shape it, and your result may change when you retake it.",
  minutes: 3,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions: [
    {
      key: "age12",
      label: "12 at Heart",
      description: "How much playful, wonder-first energy shows up in your picks.",
      report: {
        low: "Your inner 12-year-old is mostly off duty in these answers. You tend to choose comfort, quality or calm over sugar rushes and chaos. That kid still visits now and then, usually when a friend drags you onto a ride you secretly love.",
        mid: "Your inner 12-year-old shows up when invited. You can be sensible all week and still lose it over a bouncy castle at a party. That balance lets you take fun seriously without letting it run your life.",
        high: "Your inner 12-year-old has a loud vote in your choices. Play, novelty and snacks pull hard on you, and boredom feels almost physically painful. This energy makes you fun to be around and quick to find joy where others see nothing special.",
      },
    },
    {
      key: "age19",
      label: "Forever 19",
      description: "How much late-night, all-in, big-feelings energy shows up in your picks.",
      report: {
        low: "The 19-year-old in you keeps a low profile. Late nights, loud music and last-minute plans don't tempt you much, and you'd rather know where you're sleeping tonight. You get your excitement in steadier ways.",
        mid: "Your inner 19-year-old comes out for the right occasion. A spontaneous trip or a concert can still pull you in, as long as you get a recovery day after. You keep some of that all-in spirit without letting it wreck your sleep.",
        high: "Your inner 19-year-old is wide awake and ready to go. You lean toward intensity: big plans, big feelings, loud playlists and nights that turn into stories. It keeps your life vivid, though your sleep schedule might file a complaint.",
      },
    },
    {
      key: "age27",
      label: "Thriving at 27",
      description: "How much self-building, brunch-and-ambition energy shows up in your picks.",
      report: {
        low: "The 27-year-old urge to build a curated life isn't loud in your answers. You're less drawn to trends, upgrades and five-year plans than many people are. You'd rather enjoy things as they are than optimize them.",
        mid: "Some 27-year-old energy runs through your choices. You like a little polish, like a good breakfast, a plant that's still alive or a plan that mostly works, without obsessing over it. You're building something, at your own pace.",
        high: "Your picks are full of 27-year-old energy: ambitious, curious and busy building a life you actually like. You enjoy upgrades, new skills and nice things in small doses. You're figuring it out, and mostly enjoying the process.",
      },
    },
    {
      key: "age35",
      label: "Steady at 35",
      description: "How much practical, routine-loving, home-by-ten energy shows up in your picks.",
      report: {
        low: "The steady 35-year-old in you is relaxed about routines. A good frying pan or a scheduled power nap doesn't thrill you much, and that's fine. Your life runs on other fuel: spontaneity, play or a slower kind of peace.",
        mid: "You carry a fair share of steady 35-year-old energy. You appreciate a plan, a clean kitchen and an early night, but you can still be talked into something fun. You're practical when it counts and flexible when it doesn't.",
        high: "Your inner 35-year-old runs a tight, comfortable ship. You value routines, quality over quantity and evenings that end on time. People rely on you because you tend to have the plan, the spare charger and the snacks.",
      },
    },
    {
      key: "age50",
      label: "Unbothered at 50",
      description: "How much calm, capable, unbothered energy shows up in your picks.",
      report: {
        low: "Unbothered 50-year-old energy is quiet in your answers. You still care quite a lot about what's new, what's next and what other people think. That's normal, since calm perspective usually grows with time and practice.",
        mid: "A good dose of unbothered 50-year-old energy shows in your picks. You have some perspective, and the small stuff bothers you less than it used to. You still like a little novelty, but you know what you actually enjoy.",
        high: "Your picks are full of unbothered 50-year-old energy. You know what you like, you own the right tools, and trends mostly wash past you. People often find your calm reassuring and your dry humor underrated.",
      },
    },
    {
      key: "age80",
      label: "80-Year-Old Soul",
      description: "How much gentle, tea-and-perspective, old-soul energy shows up in your picks.",
      report: {
        low: "The 80-year-old soul in you is mostly asleep, probably by choice. Slow mornings, crosswords and early nights aren't your main source of joy right now. You're living at a faster tempo.",
        mid: "There's a gentle old soul in your mix. You appreciate small comforts, like tea, a blanket or a handwritten card, and you're happy to skip a party for a quiet night. That calm gives you a steady center.",
        high: "Your inner 80-year-old is wise, cozy and fully in charge of bedtime. Small comforts, slow pleasures and real conversation matter more to you than anything trendy. Many people find your presence calming, as if time slows down around you.",
      },
    },
  ],
  questions: [
    {
      id: "m1",
      kind: "choice",
      display: "tiles",
      text: "Pick your perfect Saturday.",
      options: [
        { id: "a", emoji: "🎢", label: "A whole day at a theme park", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🥞", label: "A long brunch with friends", weights: { age27: 2, age35: 1 } },
        { id: "c", emoji: "🎲", label: "Board games and takeout at home", weights: { age35: 2, age27: 1 } },
        { id: "d", emoji: "🌷", label: "Puttering around the garden", weights: { age50: 2, age80: 1 } },
      ],
    },
    {
      id: "m2",
      kind: "choice",
      display: "tiles",
      text: "It's 11 p.m. on a Friday. Where are you?",
      options: [
        { id: "a", emoji: "🌃", label: "Out, and the night's just starting", weights: { age19: 2, age27: 1 } },
        { id: "b", emoji: "📺", label: "On the couch, third episode in", weights: { age35: 2, age27: 1 } },
        { id: "c", emoji: "📖", label: "In bed with a book, 'one more chapter'", weights: { age50: 2, age12: 1 } },
        { id: "d", emoji: "😴", label: "Asleep. Happily. Since nine.", weights: { age80: 2, age35: 1 } },
      ],
    },
    {
      id: "m3",
      kind: "choice",
      display: "tiles",
      text: "Pick a snack.",
      options: [
        { id: "a", emoji: "🍬", label: "Sour gummy worms", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🌮", label: "Late-night tacos", weights: { age19: 2, age27: 1 } },
        { id: "c", emoji: "🧀", label: "A fancy cheese board", weights: { age27: 2, age50: 1 } },
        { id: "d", emoji: "🫖", label: "Tea and a biscuit", weights: { age80: 2, age35: 1 } },
      ],
    },
    {
      id: "m4",
      kind: "choice",
      display: "tiles",
      text: "Your phone rings. Unknown number. You:",
      options: [
        { id: "a", emoji: "😱", label: "Panic and let it ring out", weights: { age19: 2, age12: 1 } },
        { id: "b", emoji: "📵", label: "Ignore it. Real people text first.", weights: { age27: 2, age19: 1 } },
        { id: "c", emoji: "💼", label: "Answer in your polite 'work voice'", weights: { age35: 2, age27: 1 } },
        { id: "d", emoji: "☎️", label: "Answer right away. Could be important!", weights: { age50: 2, age80: 1 } },
      ],
    },
    {
      id: "m5",
      kind: "choice",
      display: "tiles",
      text: "Choose a vacation.",
      options: [
        { id: "a", emoji: "🏕️", label: "Summer camp: lakes, games and s'mores", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🎒", label: "Backpacking on a tiny budget", weights: { age19: 2, age27: 1 } },
        { id: "c", emoji: "🧖", label: "A nice hotel with a real spa", weights: { age35: 2, age80: 1 } },
        { id: "d", emoji: "🚢", label: "A slow cruise and a big book", weights: { age80: 2, age50: 1 } },
      ],
    },
    {
      id: "m6",
      kind: "choice",
      display: "tiles",
      text: "Pick a gift you'd secretly love.",
      options: [
        { id: "a", emoji: "🧸", label: "A giant plush toy", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🪴", label: "A trendy houseplant", weights: { age27: 2, age35: 1 } },
        { id: "c", emoji: "🍳", label: "A really good frying pan", weights: { age35: 2, age50: 1 } },
        { id: "d", emoji: "🧶", label: "A hand-knit blanket", weights: { age80: 2, age35: 1 } },
      ],
    },
    {
      id: "m7",
      kind: "choice",
      display: "tiles",
      text: "How do you feel about naps?",
      options: [
        { id: "a", emoji: "🙅", label: "Naps are for babies", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🌀", label: "Accidental three-hour nap, woke up confused", weights: { age19: 2, age27: 1 } },
        { id: "c", emoji: "⏰", label: "A 20-minute power nap, scheduled", weights: { age35: 2, age27: 1 } },
        { id: "d", emoji: "😌", label: "A daily nap is a basic right", weights: { age80: 2, age50: 1 } },
      ],
    },
    {
      id: "m8",
      kind: "choice",
      display: "tiles",
      text: "How do you listen to music?",
      options: [
        { id: "a", emoji: "🔁", label: "One song on repeat, 40 times", weights: { age12: 2, age19: 1 } },
        { id: "b", emoji: "🎧", label: "Headphones, volume way too loud", weights: { age19: 2, age12: 1 } },
        { id: "c", emoji: "💿", label: "Vinyl, on a real record player", weights: { age50: 2, age27: 1 } },
        { id: "d", emoji: "📻", label: "The radio, whatever's on", weights: { age80: 2, age35: 1 } },
      ],
    },
    {
      id: "m9",
      kind: "choice",
      display: "tiles",
      text: "Your dream home has…",
      options: [
        { id: "a", emoji: "🛝", label: "A slide instead of stairs", weights: { age12: 2 } },
        { id: "b", emoji: "🏙️", label: "A tiny apartment close to everything", weights: { age27: 2, age19: 1 } },
        { id: "c", emoji: "🛋️", label: "A huge sofa that fits everyone", weights: { age35: 2, age12: 1 } },
        { id: "d", emoji: "🪟", label: "A sunroom full of plants", weights: { age50: 2, age80: 1 } },
      ],
    },
    {
      id: "m10",
      kind: "choice",
      display: "tiles",
      text: "Something breaks. What's your move?",
      options: [
        { id: "a", emoji: "🙋", label: "Ask someone else to fix it", weights: { age12: 2 } },
        { id: "b", emoji: "🩹", label: "Tape. Tape fixes everything.", weights: { age19: 2, age12: 1 } },
        { id: "c", emoji: "📹", label: "Find a video tutorial and fix it", weights: { age27: 2, age50: 1 } },
        { id: "d", emoji: "🧰", label: "Grab the exact tool you already own", weights: { age50: 2, age35: 1 } },
      ],
    },
    {
      id: "m11",
      kind: "choice",
      display: "tiles",
      text: "Pick a new hobby.",
      options: [
        { id: "a", emoji: "🛹", label: "Skateboarding", weights: { age19: 2, age12: 1 } },
        { id: "b", emoji: "🏃", label: "A running club", weights: { age27: 2, age35: 1 } },
        { id: "c", emoji: "🐦", label: "Bird-watching", weights: { age50: 2, age80: 1 } },
        { id: "d", emoji: "🧩", label: "A 1,000-piece jigsaw puzzle", weights: { age80: 2, age35: 1 } },
      ],
    },
    {
      id: "m12",
      kind: "choice",
      display: "tiles",
      text: "How do you text?",
      options: [
        { id: "a", emoji: "🤪", label: "ALL CAPS and nine emojis", weights: { age12: 2, age50: 1 } },
        { id: "b", emoji: "😶", label: "lowercase, no punctuation, very calm", weights: { age19: 2, age27: 1 } },
        { id: "c", emoji: "👍", label: "Short, clear, one thumbs-up", weights: { age35: 2, age80: 1 } },
        { id: "d", emoji: "✉️", label: "Full sentences, signed with your name", weights: { age80: 2, age50: 1 } },
      ],
    },
    {
      id: "m13",
      kind: "choice",
      display: "tiles",
      text: "Pick your ride.",
      options: [
        { id: "a", emoji: "🚲", label: "A bike with streamers", weights: { age12: 2 } },
        { id: "b", emoji: "🛴", label: "An electric scooter for getting around", weights: { age27: 2, age19: 1 } },
        { id: "c", emoji: "🚙", label: "A sensible car with great mileage", weights: { age35: 2, age50: 1 } },
        { id: "d", emoji: "🚗", label: "A classic car you polish on Sundays", weights: { age50: 2, age80: 1 } },
      ],
    },
    {
      id: "m14",
      kind: "choice",
      display: "tiles",
      text: "Where do you get your news?",
      options: [
        { id: "a", emoji: "📱", label: "Short videos, mostly", weights: { age19: 2, age12: 1 } },
        { id: "b", emoji: "🎙️", label: "Podcasts on a walk", weights: { age27: 2, age35: 1 } },
        { id: "c", emoji: "📡", label: "The evening news on TV", weights: { age50: 2, age80: 1 } },
        { id: "d", emoji: "🗞️", label: "A real newspaper, unfolded", weights: { age80: 2, age50: 1 } },
      ],
    },
    {
      id: "m15",
      kind: "choice",
      display: "tiles",
      text: "Pick a birthday party.",
      options: [
        { id: "a", emoji: "🍽️", label: "Dinner at a new restaurant", weights: { age27: 2, age19: 1 } },
        { id: "b", emoji: "🌭", label: "A backyard barbecue you host", weights: { age35: 2, age12: 1 } },
        { id: "c", emoji: "🕯️", label: "A quiet dinner with old friends", weights: { age50: 2, age80: 1 } },
        { id: "d", emoji: "🤫", label: "No fuss, please. Truly.", weights: { age80: 2, age50: 1 } },
      ],
    },
  ],
  outcomes: [age12, age19, age27, age35, age50, age80],
  seo: {
    intro:
      "What's your mental age? This free mental age test skips the trick questions and asks about real life instead: your perfect Saturday, your nap policy, how you text and what you do when an unknown number calls. Fifteen quick picture picks place you in one of six mental ages, from 12 at heart to an 80-year-old soul. You'll see your result right away, for free. It takes about three minutes, there are no wrong answers, and plenty of people discover their mental age is wildly different from the number on their birthday cake.",
    measures:
      "In this quiz, mental age means the life stage your tastes and habits most resemble. It isn't the old term from early intelligence testing, and it says nothing about how smart, mature or capable you are. Instead, it looks at the everyday choices people often link with different stages of life: how much you crave novelty, how you feel about routines, what you do with a free evening and how much you care about trends.\n\nEach answer adds points to one or two of six mental ages. 12 at Heart leans toward play and wonder. Forever 19 is about intensity, big nights and big plans. Thriving at 27 is busy building a life with a little polish. Steady at 35 loves routines and a good night's sleep. Unbothered at 50 has perspective and the right tool for everything. The 80-Year-Old Soul treasures small comforts, slow mornings and real conversation.\n\nYour result is the mental age with the biggest share of the points it could have earned. Most people are a blend, so the Snapshot shows your full mix across all six ages. The Deep Report turns that into a story: the traits you share with real people of that age, what keeps you young or old, how you show up with friends, which mental ages you click with, and an honest twist about what your result says about your real priorities.",
    origin:
      "The phrase 'mental age' first appeared in early 1900s intelligence testing, where it compared a child's test performance with what was typical at each age. That use is outdated, and this quiz has nothing to do with it. Today the phrase lives on mostly as a playful idea: the sense that some people are old souls and others stay young at heart.\n\nOur version is built on that playful meaning. The questions are original, and the six age bands are lighthearted portraits of life stages rather than research categories. Real people of any age are far more varied than any stereotype, so treat the descriptions as a mirror for fun and reflection. Your answers can shift with your mood, your season of life and how much sleep you got, which is part of the charm.",
    faqs: [
      {
        q: "What is a mental age test?",
        a: "A mental age test is a light quiz that matches your tastes and habits to a life stage. Ours asks 15 picture questions about everyday life, like snacks, naps, music and weekends, and places you in one of six mental ages, from 12 at heart to an 80-year-old soul. It's for fun and self-reflection. It doesn't measure intelligence, maturity or development, and there's no better or worse result.",
      },
      {
        q: "Is mental age the same as maturity?",
        a: "No. In this quiz, mental age is about preferences, not maturity. A responsible adult can be 12 at heart because they love games and surprises, and a teenager can be an 80-year-old soul because they love tea, quiet and long talks. Both are completely fine. The result describes the life stage your current tastes most resemble, and nothing more.",
      },
      {
        q: "Why is my mental age so different from my real age?",
        a: "Because tastes and age are only loosely linked. Your result reflects what you pick today: how much you crave novelty, comfort, routine or calm. Lots of things shift those picks, including your personality, where you grew up, your stress level and simply how tired you are this week. A big gap between your real age and your mental age is common, and it's often the most fun part of the result.",
      },
      {
        q: "Can my result change if I retake it?",
        a: "Yes, and it often does. Your answers depend on mood and season, and most people are a blend of two or three mental ages. If your top two were close, a retake might flip them. That doesn't make either result wrong. It just shows which parts of you are loudest right now. Comparing results a few months apart is a fun way to notice how you're changing.",
      },
      {
        q: "What's free, and what's in the paid reports?",
        a: "Your mental age and its summary are free. The Snapshot adds your score for all six mental ages and your key traits. The Deep Report is a longer, personal read: your mental age story, the traits you share with real people of that age, what keeps you young or old, how you show up with friends, your most compatible mental ages and an honest twist about your real priorities.",
      },
      {
        q: "Is this quiz okay for teens?",
        a: "Yes. The quiz is made for anyone 13 and up, and the questions are about everyday tastes, not anything personal or sensitive. Teens often get a kick out of landing as an 80-year-old soul, and grown-ups love finding out they're still 12 at heart. Every result is written to be kind, funny and true to life, and no result is treated as better than another.",
      },
    ],
    keywords: ["mental age test"],
  },
  related: ["spirit-animal-quiz", "magic-academy-house-quiz", "color-personality-test"],
  reviewNotes:
    "T6 persona match: 15 tile items, six age-band outcomes. Each option gives 2 points to its main age and usually 1 to a neighboring age; every age is the main pick in exactly 10 items. Please check: (1) tone toward real age groups stays affectionate, never mocking; (2) content suits 13+ (no alcohol, dating or adult themes); (3) seo.origin's general note that 'mental age' began in early-1900s intelligence testing (no names, dates or figures given); (4) the 80-Year-Old Soul 'honest twist' gently suggests talking to someone if a taker feels worn out. That's deliberate, but confirm it reads well.",
};

export default quiz;
