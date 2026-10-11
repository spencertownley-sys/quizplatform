import type { ChoiceQuestion, QuizDefinition } from "@/lib/engine/types";
import { acts } from "./_parts/love-language-quiz/acts";
import { gifts } from "./_parts/love-language-quiz/gifts";
import { time } from "./_parts/love-language-quiz/time";
import { touch } from "./_parts/love-language-quiz/touch";
import { words } from "./_parts/love-language-quiz/words";

type Lang = "words" | "time" | "gifts" | "acts" | "touch";

/** A forced-choice pair: option a adds 1 to one language, option b to another. */
const pair = (id: string, text: string, a: [Lang, string], b: [Lang, string]): ChoiceQuestion => ({
  id,
  kind: "choice",
  text,
  options: [
    { id: "a", label: a[1], weights: { [a[0]]: 1 } },
    { id: "b", label: b[1], weights: { [b[0]]: 1 } },
  ],
});

/**
 * 30 pairs: each of the 10 language pairs appears 3 times, so every language
 * has exactly 12 chances to be picked and is listed first (option a) 6 times.
 */
const questions: ChoiceQuestion[] = [
  // Round 1
  pair("q1", "Which would make you feel more loved?", ["words", "Hearing exactly what they admire about me"], ["time", "An evening they've cleared just for the two of us"]),
  pair("q2", "You're home sick for a few days. What would mean more?", ["gifts", "A small get-well gift chosen just for me"], ["acts", "Someone taking over my chores until I'm better"]),
  pair("q3", "Which would comfort you more after bad news?", ["words", "Hearing \"We'll get through this, and I believe in you\""], ["touch", "Being held in a long, tight hug"]),
  pair("q4", "Which would make a weekend feel special?", ["time", "A whole day together with no plans or distractions"], ["gifts", "A small surprise present waiting for me"]),
  pair("q5", "You get home after an exhausting day. What would you appreciate more?", ["acts", "Dinner already made so I can put my feet up"], ["touch", "A long, warm hug at the door"]),
  pair("q6", "It's your birthday. What would you treasure more?", ["words", "A heartfelt message saying exactly why I'm loved"], ["gifts", "A small gift that shows they really know my taste"]),
  pair("q7", "Which would mean more on a busy weekday?", ["time", "Sitting down together for a real, unhurried talk"], ["acts", "Them running an errand I've been putting off"]),
  pair("q8", "Which would brighten a gloomy day more?", ["gifts", "A small surprise left on my pillow"], ["touch", "A spontaneous back rub"]),
  pair("q9", "Which would make you feel more appreciated?", ["words", "Being thanked out loud for something I did"], ["acts", "Finding a chore I dread already done"]),
  pair("q10", "Which would make a quiet evening feel loving?", ["time", "Talking for hours, fully focused on each other"], ["touch", "Sitting close with my head on their shoulder"]),
  // Round 2
  pair("q11", "Which would mean more on your anniversary?", ["acts", "They handle all the planning so I can just relax"], ["gifts", "A keepsake that marks our time together"]),
  pair("q12", "Which would mean more as you head out the door?", ["touch", "A kiss and a squeeze of the hand"], ["words", "\"Good luck today, you've got this\""]),
  pair("q13", "Your partner gets back from a trip. What would you value more?", ["gifts", "A souvenir they picked out with me in mind"], ["time", "Them clearing the next evening just to be with me"]),
  pair("q14", "Which would feel more loving on a lazy Sunday morning?", ["touch", "Staying curled up together a while longer"], ["acts", "Breakfast in bed so I can relax"]),
  pair("q15", "Which would make you smile more on an ordinary day?", ["gifts", "They bring home a treat I mentioned once"], ["words", "They tell me out of the blue how great I am"]),
  pair("q16", "Which feels more like love to you?", ["acts", "Someone fixing the thing that's been bugging me"], ["time", "Doing an activity together, just the two of us"]),
  pair("q17", "Which would feel more romantic?", ["touch", "Being pulled in for a hug for no reason"], ["gifts", "Flowers or a little gift for no reason"]),
  pair("q18", "You're stressed about a deadline. What helps more?", ["acts", "They handle dinner and the dishes without asking"], ["words", "They remind me how capable I am"]),
  pair("q19", "Which would you choose for a date?", ["touch", "Holding hands the whole time, whatever we do"], ["time", "Trying something new together, phones put away"]),
  pair("q20", "After a long, hard week, what would you want more?", ["time", "A slow walk together with our phones left at home"], ["words", "Hearing \"I'm proud of how you handled this week\""]),
  // Round 3
  pair("q21", "Which would you miss more if it stopped?", ["acts", "Practical help when life gets busy"], ["touch", "Hugs, cuddles and holding hands"]),
  pair("q22", "Which would sting more?", ["words", "They rarely say anything kind about me"], ["gifts", "They forget my birthday entirely"]),
  pair("q23", "Which would you miss more if it stopped?", ["time", "Our regular one-on-one time"], ["acts", "Them pitching in without being asked"]),
  pair("q24", "Which would stay with you longer?", ["gifts", "A gift they clearly spent time choosing"], ["touch", "Holding hands the whole evening"]),
  pair("q25", "Which would hurt more?", ["acts", "Being left to handle every chore alone"], ["words", "Never hearing praise, even for big wins"]),
  pair("q26", "Which would hurt more?", ["touch", "They rarely reach for my hand or hug me"], ["time", "They rarely make time just for us"]),
  pair("q27", "Which would stay with you longer?", ["words", "A message telling me what I mean to them"], ["time", "A long, unhurried catch-up together"]),
  pair("q28", "Which would mean more during a stressful month?", ["gifts", "Little surprises that show they're thinking of me"], ["acts", "Help with the daily load at home"]),
  pair("q29", "Which would you miss more if it stopped?", ["touch", "Cuddling up together on the couch"], ["words", "Hearing \"I love you\" and why"]),
  pair("q30", "Which would hurt more?", ["time", "They're always half-listening, eyes on their phone"], ["gifts", "They never mark special days, even with something small"]),
];

const band = (subject: string) => ({ low: "Nice to have", high: "Core need", description: subject });

const quiz: QuizDefinition = {
  slug: "love-language-quiz",
  n: 24,
  title: "Love Language Quiz",
  tagline: "Find the kind of care that makes you feel most loved.",
  category: "Relationships",
  structure: "typology",
  description:
    "Find your love language in 30 quick either-or choices. See all five kinds of care ranked, and what your top one means for your relationships.",
  disclaimer:
    "This quiz is for self-reflection, not a scientific or clinical assessment. Most people value all five kinds of care; your result shows which ones you lean on most right now.",
  method: `The quiz has 30 either-or questions. Each one offers two kinds of care, and every pair of languages appears three times, so all five languages get exactly 12 chances to be chosen. Your score for a language is the share of those 12 chances where you picked it, from 0 to 100. Your top language is the one you picked most often. When two languages tie, the headline goes to one of them, so treat them as joint leaders.

Because every question forces a choice, the scores share a fixed total. That makes this a ranking of priorities, not a measure of how much affection you need overall. A low score means another kind of care usually wins when you have to choose, not that you don't value it. Close scores mean a blended profile, so read your top two or three together.

This is a self-report snapshot, shaped by your current relationship, recent stress and what you've been missing lately. It isn't a scientific or clinical measure, and the questions are original to this site.`,
  minutes: 6,
  paywall: "free_headline",
  minAge: 18,
  status: "draft",
  dimensions: [
    {
      key: "words",
      label: "Affirming words",
      ...band("How much spoken and written appreciation, encouragement and kind words make you feel loved."),
      report: {
        low: "Affirming words sit near the bottom of your list right now. Compliments and kind messages are pleasant, but they don't land as deeply for you as other kinds of care, and you may trust what people do more than what they say. That can make you hard to flatter and easy to reassure with action. A partner who's naturally wordy may need to hear that their actions matter more to you than their speeches.",
        mid: "Affirming words matter to you, but they aren't the main way you feel loved. A sincere compliment or a thoughtful message can lift your day, especially when it comes at the right moment. You probably notice kind words most when they're missing, such as during a stressful stretch or after you've worked hard on something. Specific praise tends to reach you better than general praise.",
        high: "Kind, specific words are one of the main ways you feel loved. Sincere praise, a heartfelt message or a partner telling you what they admire can stay with you for days. The flip side is that harsh words, sarcasm or long silences can cut deeper for you than for most people. It helps to tell partners plainly that words are how love reaches you, since many people assume their actions speak for themselves.",
      },
    },
    {
      key: "time",
      label: "Quality time",
      ...band("How much undivided attention and unhurried time together make you feel loved."),
      report: {
        low: "Quality time ranks low for you right now. You enjoy time together, but you don't need a lot of focused one-on-one attention to feel loved, and you may be comfortable with a partner who has a busy, independent life. That can make you easygoing about schedules. Watch that a partner who values time highly doesn't read your relaxed attitude as a lack of interest.",
        mid: "Quality time matters to you in moderation. You value focused time together, but you don't need it every day to feel secure, and you can feel close even during busy weeks. Distracted time, like a partner half-listening while scrolling, probably bothers you more than short time does. A few unhurried hours on a regular basis tend to keep you feeling connected.",
        high: "Undivided attention is one of the main ways you feel loved. Long talks, shared activities and time when a partner is fully present feel like proof that you matter. Phones at dinner, canceled plans or always being squeezed in between other things can hurt more for you than for others. Telling partners that their presence matters to you more than their presents is one of the most useful things you can do.",
      },
    },
    {
      key: "gifts",
      label: "Thoughtful gifts",
      ...band("How much meaningful tokens, surprises and keepsakes make you feel loved."),
      report: {
        low: "Thoughtful gifts rank low for you right now. You may appreciate a present, but it's not where you look for proof that someone cares, and fuss around occasions can feel unnecessary. That makes you low-maintenance about birthdays and holidays. A partner who loves giving, though, may feel deflated if their gifts don't seem to register, so a warm thank-you goes a long way.",
        mid: "Thoughtful gifts matter to you, especially when they show that someone was paying attention. Price usually doesn't matter much; the thought behind a gift does. You probably remember small, well-chosen things more than expensive ones. Forgotten occasions may sting a little, even if you wouldn't make a fuss.",
        high: "A well-chosen gift is one of the main ways you feel loved. It's not about money: a small token that shows someone remembered, noticed or thought of you when you weren't there means a great deal. You likely keep cards, ticket stubs and little mementos long after others would have thrown them away. Forgotten occasions or careless gifts can hurt more than you let on, so it helps to explain to partners what makes a gift meaningful to you.",
      },
    },
    {
      key: "acts",
      label: "Helpful actions",
      ...band("How much practical help and someone sharing your load make you feel loved."),
      report: {
        low: "Helpful actions rank low for you right now. You appreciate help, but you don't need someone to share your chores to feel loved, and you may prefer handling tasks your own way. That independence makes you easy to live with in some ways. Just know that a partner who shows love by doing things for you may need you to notice it and say so.",
        mid: "Helpful actions matter to you, especially when life gets busy. Someone taking a task off your plate without being asked registers as real care, though you don't need it every day. You probably notice an unfair split of chores more than a lack of grand gestures. A partner who pitches in during stressful weeks earns a lot of goodwill with you.",
        high: "Practical help is one of the main ways you feel loved. When someone takes a chore off your list, fixes what's broken or handles a hassle so you don't have to, it lands as a clear message: I see you, and I've got you. Broken promises to help, or a partner who leaves everything to you, can feel like a real lack of care. It helps to name the specific tasks that would mean the most, since partners often guess wrong.",
      },
    },
    {
      key: "touch",
      label: "Physical affection",
      ...band("How much hugs, hand-holding and physical closeness make you feel loved."),
      report: {
        low: "Physical affection ranks low for you right now. You may enjoy a hug, but touch isn't the main way you feel loved, and you may need more personal space than some partners. That's a perfectly valid preference. With a partner who values affection highly, talking openly about comfortable amounts and kinds of closeness keeps either of you from feeling rejected.",
        mid: "Physical affection matters to you in a balanced way. A hug at the right time, holding hands or sitting close helps you feel connected, though you don't need constant contact. You may want more affection during stressful times and less when you're overwhelmed. Small, casual touches through the day probably matter more to you than big displays.",
        high: "Physical closeness is one of the main ways you feel loved. Hugs, hand-holding, sitting close and casual touches through the day tell you that you're wanted in a way words often can't. A partner who's physically distant, or pulls away when you reach for them, can leave you feeling lonely even when everything else is fine. Telling a partner which kinds of affection mean the most to you, and when, makes it much easier for them to show up.",
      },
    },
  ],
  questions,
  typology: { mode: "highest" },
  outcomes: [words, time, gifts, acts, touch],
  compare: {
    invite: "See how your love languages line up",
    other: "partner",
    dimensions: {
      words: {
        match:
          "You place a similar weight on affirming words. If you both rank them high, kind and specific words are a fast, easy way to keep each other topped up; if you both rank them low, you probably show love mainly in other ways and rarely miss praise. Just check that a shared low ranking doesn't quietly turn into never saying it at all.",
        differ:
          "One of you needs to hear love much more than the other. The partner who ranks words low may assume their actions speak for themselves, while the one who ranks them high may feel unappreciated despite plenty of care. A small daily habit, like one specific compliment or thank-you, usually closes this gap quickly.",
        prompts: [
          "What's the nicest thing I've ever said to you, and why did it stick?",
          "Is there something you wish I said more often?",
          "Do you prefer appreciation in private, in front of others or in writing?",
          "Which of my words hurt the most when we argue?",
        ],
      },
      time: {
        match:
          "You value quality time to a similar degree. If it's high for both of you, protecting regular one-on-one time will feel natural and rewarding; if it's low for both, you're likely comfortable with independent schedules. Either way, agree on what counts as real time together so busy seasons don't slowly squeeze it out.",
        differ:
          "One of you craves focused time together much more than the other. The time-focused partner may feel lonely or low on the list during busy weeks, while the other may feel that being in the same house should be enough. Spelling out what quality means to you, such as phones away, one-on-one or a set night, turns a vague complaint into a plan.",
        prompts: [
          "What does a perfect evening together look like to you?",
          "When do you feel I'm with you but not really present?",
          "How much one-on-one time in a normal week would feel right to you?",
          "What's something new you'd like us to try together?",
        ],
      },
      gifts: {
        match:
          "You place a similar value on gifts. If you both rank them high, marking occasions and trading small surprises will feel like a shared joy; if you both rank them low, you may happily skip the fuss. Just make sure you agree on which occasions still matter, so nobody is caught out on a birthday.",
        differ:
          "Gifts mean much more to one of you than to the other. The partner who ranks them low may see gifts as optional or even materialistic, while the one who ranks them high experiences a thoughtful token as proof of being remembered. It's rarely about cost: a small, well-chosen item with a note usually matters far more than spending.",
        prompts: [
          "What's the most meaningful gift you've ever received, and why?",
          "Which occasions really matter to you, and which could we skip?",
          "Do you love surprises, or would you rather I ask what you want?",
          "Is there a small everyday thing I could bring you that would feel special?",
        ],
      },
      acts: {
        match:
          "You weight practical help similarly. If you both rank it high, sharing chores fairly will be one of your strongest ways of showing love; if you both rank it low, you may each prefer to handle your own tasks. Even so, check the split of household work now and then, since unspoken imbalances build up quietly.",
        differ:
          "One of you feels loved through practical help far more than the other. The helpful-actions partner may read every undone chore as a sign of not being cared for, while the other may not realize chores carry that much emotional weight. Agreeing on the two or three tasks that matter most is often the fastest fix.",
        prompts: [
          "Which chore, if I took it off your plate, would feel most like love?",
          "Is there anything I do to help that actually makes more work for you?",
          "How do you feel about the way we split household work right now?",
          "When you're stressed, what practical help do you want most?",
        ],
      },
      touch: {
        match:
          "You place a similar weight on physical affection. If it's high for both of you, everyday closeness, like hugs, hand-holding and sitting close, will come easily and keep you connected; if it's low for both, you may both be comfortable with more personal space. Keep checking in, since needs for affection can change with stress, health and life stage.",
        differ:
          "One of you needs physical affection much more than the other. The more affectionate partner may feel rejected when closeness is rare, while the other may feel pressured or crowded. Talking openly about which kinds of affection feel good, and when, lets you find a comfortable middle without either person feeling unwanted.",
        prompts: [
          "What kind of affection makes you feel most loved: hugs, holding hands, sitting close or something else?",
          "Are there times when you'd rather not be touched?",
          "How do you like to be comforted when you're upset?",
          "Is there a small daily habit of affection you'd like us to start?",
        ],
      },
    },
  },
  seo: {
    intro: `A love language is the way you most naturally give and receive care. This free love language quiz asks 30 quick either-or questions, each pitting two kinds of care against each other, then ranks all five: affirming words, quality time, thoughtful gifts, helpful actions and physical affection. Your top language is free to see. The optional Deep Report explains your full ranking, how you give love versus how you like to receive it, what drains you, a translation guide for your partner, 30 specific ideas for your top language, and how it plays out with friends, family and during conflict.`,
    measures: `The quiz looks at five kinds of care. Affirming words means compliments, encouragement and hearing "I love you." Quality time means undivided, unhurried attention. Thoughtful gifts means tokens and surprises that show someone was thinking of you. Helpful actions means practical help that lightens your load. Physical affection means hugs, hand-holding and closeness.

Each question asks you to choose between two of them. Every language is paired with every other language three times, so each one gets the same 12 chances. Your score for a language is how often you picked it when it was on offer. Because you always have to choose, the result is a ranking of priorities rather than a measure of how much love you need overall. Some questions come at it from the other side, asking which absence would hurt more or which habit you'd miss. The care you'd miss most is often the care that matters most.

A low rank doesn't mean you don't care about that kind of care; it means something else usually wins when you have to pick. Most people value all five. The useful part is the order, and especially the gap between your top language and the rest. Answer for what actually makes you feel loved, not what you think you should prefer. If you're single, think of past partners or the people closest to you.`,
    origin: `The idea that people express and receive love in different "languages" was popularized by a 1992 self-help book written by a marriage counselor, and it has since become a common way for couples to talk about their needs. This quiz uses its own names for the five kinds of care and its own questions.

Relationship researchers have put the idea to the test, and the evidence for its strongest claims is limited. Most people value all five kinds of care, preferences can shift with circumstances, and matching languages hasn't consistently been shown to predict a happier relationship. What many couples do find useful is the conversation the idea starts: naming what makes each of you feel cared for, and noticing when you're showing love in a way your partner doesn't register.`,
    faqs: [
      {
        q: "What are the main love languages?",
        a: "This quiz uses five: affirming words (compliments, encouragement and kind messages), quality time (undivided attention), thoughtful gifts (meaningful tokens and surprises), helpful actions (practical help with your load) and physical affection (hugs, hand-holding and closeness). Other versions of the idea use slightly different names for similar categories. Most people value all of them to some degree; the quiz shows which ones matter most to you when you have to choose.",
      },
      {
        q: "Can you have more than one love language?",
        a: "Yes, and many people do. Your result ranks all five, and it's common for the top two or three to be close together. That's a blended profile: several kinds of care work well for you. The headline result names your top language, but the full ranking in your report shows the bigger picture. If two languages tie, treat them as joint leaders rather than picking one.",
      },
      {
        q: "Can your love language change?",
        a: "It can. Preferences often shift with life circumstances. People in demanding jobs or with young children often rank helpful actions higher, while people in long-distance relationships may rank time or affection higher, simply because that's what they're missing. Your result is a snapshot of right now. Retaking the quiz after a big life change can show you how your priorities have moved.",
      },
      {
        q: "What if my partner and I have different love languages?",
        a: "That's very common, and it doesn't mean you're incompatible. It means you'll each need to learn to show love in a way that may not come naturally. The first step is knowing each other's top languages, so invite your partner to take the quiz and compare. Then pick one or two small, regular habits in each other's language. Small and consistent tends to matter more than grand and rare.",
      },
      {
        q: "Is the gift love language materialistic?",
        a: "Not usually. For most people who rank thoughtful gifts highly, price has little to do with it. What matters is the evidence that someone was thinking of them: a favorite snack picked up on the way home, a souvenir from a trip, a card with a personal note. A small, well-chosen gift often means far more than an expensive one chosen in a hurry.",
      },
      {
        q: "How accurate is a love language quiz?",
        a: "It's a useful starting point for reflection and conversation, not a scientific measurement. Your answers reflect how you feel right now, including what you've been missing lately. The idea of love languages is popular but has limited research support for its strongest claims. Use your result to start a conversation with your partner about what makes each of you feel cared for, and treat it as one helpful lens among many.",
      },
    ],
    keywords: ["love languages test", "love language quiz"],
  },
  related: ["attachment-style-quiz", "couples-compatibility-test"],
  reviewNotes:
    "Trademark check: visible copy uses generic names only (Affirming words, Quality time, Thoughtful gifts, Helpful actions, Physical affection) and never the book title, author name or the phrases 'words of affirmation', 'acts of service', 'receiving gifts' or 'physical touch'. The origin section refers to 'a 1992 self-help book written by a marriage counselor'; confirm legal is comfortable with that description. 'Quality time' is a generic phrase but also one of the book's category names; confirm it's acceptable. The origin/FAQ claims about limited research support are general statements, not citations; a reviewer may want to confirm wording. Items: 30 forced-choice pairs, each of the 10 language pairs 3 times, each language 12 appearances and listed first 6 times. minAge 18 per the brief (relationship quiz), though most items would suit younger takers.",
};

export default quiz;
