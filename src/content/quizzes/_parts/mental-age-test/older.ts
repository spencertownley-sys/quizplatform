import type { Outcome } from "@/lib/engine/types";

/** Mental Age Test outcomes: Steady at 35, Unbothered at 50, 80-Year-Old Soul. */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const age35: Outcome = {
  key: "age35",
  name: "Steady at 35",
  tagline: "You know what you like, and you're home by ten.",
  emoji: "🏡",
  summary:
    "Your mental age is 35: practical, warm and quietly in charge of the group chat. You value routines, good sleep and the kind of fun that ends on time.",
  about: p(
    "A mental age of 35 describes people whose tastes lean toward comfort, competence and reliable routines. It's the life stage where many people stop chasing every new thing and start enjoying what they've built. People with this result often choose board games over clubs, a great frying pan over a gadget, a scheduled power nap over an accidental three-hour one, and texts that say exactly what they mean.",
    "Steady at 35 energy is grounded and generous. Many people with this result are the organizers and caretakers in their circles: the ones with a spare charger, a sensible plan and snacks for everyone. They tend to value quality over quantity, in friendships as much as in things.",
    "Their growing edges often involve rigidity and overload. When you're good at keeping things running, people lean on you a lot, and routines can turn from comfort into a cage. Leaving room for spontaneity and rest helps this energy stay warm instead of weary.",
    "This is one of six results in our mental age test, from 12 at heart to an 80-year-old soul. Your result reflects your current tastes and habits, not your maturity, intelligence or real age. Plenty of teens land here because they're the responsible one in their family or friend group. Retake it anytime to see how your mix changes.",
  ),
  snapshot: [
    "Your mental age: Steady at 35, practical, warm and organized",
    "You love a routine that makes life run smoothly",
    "Quality matters more to you than trends or novelty",
    "Friends rely on you for plans, advice and the spare charger",
    "Your growth edge: making room for surprise and letting others help",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Your answers sound like someone who has learned what actually makes them happy, and stopped apologizing for it.",
      body: p(
        "There's a moment many people reach when they realize they don't have to go to the party just because they were invited. They can stay in, make a good dinner, play a board game with people they love and be in bed by ten. Instead of feeling like they're missing out, they feel relieved. Your picks suggest you've reached that moment, whatever age you are.",
        "Steady at 35 is a mental age built on self-knowledge. You know which foods agree with you, which friends refill your energy and which kinds of evenings leave you happy rather than drained. You probably own at least one thing you'd describe, with genuine passion, as 'really good quality': a frying pan, a pair of boots, a pillow. You've learned that comfort isn't boring. It's a choice.",
        "There's competence here too. People with this mental age tend to get things done without making a fuss. You fix things, plan things, remember birthdays and show up on time. Others may not notice all the small ways you keep life running, but they'd notice right away if you stopped.",
        "And yet this isn't a rigid mental age. You still love fun; you just like it with a start time and an end time. A games night, a backyard barbecue, a weekend away somewhere with a comfortable bed: these are your kind of adventures. You'd rather have a great time you'll remember than a wild time you'll regret.",
        "Your story is one of settling into yourself. Not settling for less, but settling in, like a house that finally feels like home. That steadiness is something many people spend years looking for.",
      ),
    },
    {
      title: "Traits you share with real 35-year-olds",
      teaser:
        "Real 35-year-olds are known for owning a favorite pan, getting excited about a good night's sleep and having strong opinions about the right way to load a dishwasher.",
      body: p(
        "Thirty-five is often a time of quiet confidence. Many people at this stage have tried enough things to know what works for them. Here are life-stage traits people with this result tend to share with real 35-year-olds:",
        list(
          "Routines as a superpower. A morning routine, a weekly meal plan, a regular workout. You've learned that structure frees up energy for the things you care about.",
          "The joy of good tools. A sharp knife, a reliable bag, a really comfortable sofa. You'd rather buy once and buy well.",
          "Protective of evenings. Late nights have to be worth it. A good night's sleep is a treasure, not a waste of time.",
          "Clear communication. Short, clear messages and a thumbs-up. Why send twenty texts when one will do?",
          "Hosting over going out. A backyard barbecue or games night at home beats a crowded place with nowhere to sit.",
          "Being the responsible one. In your family, team or friend group, people tend to look to you when something needs sorting.",
          "Low tolerance for drama. You've seen enough of it to know it's rarely worth the energy.",
        ),
        "There's also a deeper trait real 35-year-olds often share: they're learning to balance caring for others with caring for themselves. Many are juggling work, family, friends and their own needs at once. If you feel that juggle, even as a teen helping out at home or a student with a packed schedule, you're living the 35-year-old experience in your own way.",
        "These traits make you reliable and kind. People feel safe around you because you're consistent. That's a rare and underrated gift in a world that often celebrates the loudest person in the room.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Small, reliable pleasures keep you young: a good meal, a game night, fresh sheets. What ages you is carrying everyone else's load without anyone noticing.",
      body: p(
        "Your energy comes from stability. People with this mental age tend to feel best when life has rhythm: regular meals, good sleep, time with a few close people and a home that feels calm. You don't need constant excitement. You need a foundation that lets you enjoy the moments that matter.",
        "What keeps your inner 35-year-old thriving:",
        list(
          "A weekly ritual you look forward to, like a games night, a long walk or a favorite meal",
          "A tidy, comfortable space to come home to",
          "Friends who show up consistently, not just when it's convenient",
          "A hobby you're slowly getting better at, like cooking, gardening or a sport",
        ),
        "What ages you is invisible work. People with this result are often the ones who remember, plan, organize and fix, and it can be exhausting when nobody notices. You may find yourself feeling older and more tired, not because of the work itself, but because you're doing it alone.",
        "Rigidity can age you too. Routines are wonderful until they become rules you can't break. If a change of plans makes you tense, or you've stopped trying new things because the old ones are safer, your world can quietly shrink.",
        "The fix is twofold. First, share the load. Ask for help out loud, specifically and early, before you're frazzled. Second, plan small surprises into your routine: a new recipe on Thursday, a different walk on Sunday, a spontaneous day off once a season. Steadiness is your strength; a little novelty keeps it fresh. When you look after yourself as carefully as you look after everyone else, you stay warm instead of worn out.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "You're the friend who has the plan, the spare charger and the snacks, and people feel safer just knowing you're coming.",
      body: p(
        "In friendships, you're the anchor. You organize the trip, remember the allergies, book the table and check that everyone got home. Friends may tease you for being the 'parent' of the group, but they'd be lost without you.",
        "You're also deeply loyal in a quiet way. Steady at 35 people don't usually make grand speeches about friendship; they show it through actions. You help friends move, drop off soup when they're sick and remember the anniversaries of hard days. When you say you'll be there, you mean it.",
        "How you tend to show up:",
        list(
          "The organizer: plans made, logistics handled",
          "The host: the comfy sofa, good food and board games",
          "The advisor: calm, practical advice that actually helps",
          "The constant: the friend who's still around years later",
        ),
        "The watch-outs are mostly about balance. You might end up doing more than your share of the planning, and then quietly resent it. Some friends may see you as less spontaneous and forget to invite you to last-minute plans, even though you might have said yes. You may also find it hard to ask for support because you're so used to giving it.",
        "Your friendships work best as two-way streets. Let others take a turn planning, even if they do it differently. Say yes to a last-minute invitation now and then; you might be surprised by how much fun you have. And when you're struggling, tell someone. The people who love you want the chance to show up for you the way you show up for them.",
        "You make friendships feel safe. That's the foundation everything else is built on, and your friends know it.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You pair beautifully with someone Unbothered at 50, but the friend who might change your life is someone who is still 12 at heart.",
      body: p(
        "Steady at 35 people get along with almost everyone because they're reliable and kind. Still, the chemistry varies. Here's what to expect:",
        list(
          "12 at Heart: The life-changer. They pull you out of your routine and remind you how to play. You'll probably find them exhausting at first, then realize you've laughed more this month than all year.",
          "Forever 19: A learning curve. Their spontaneity may clash with your plans, but they bring color and energy. You'll keep them safe; they'll keep you young.",
          "Thriving at 27: A strong match. They're building toward the stability you value, and they appreciate your advice. You'll swap recipes, plans and encouragement.",
          "Steady at 35: Comfortable and easy. You'll host the best game nights in town. Just make sure someone occasionally suggests something new.",
          "Unbothered at 50: A beautiful pairing. They've been where you are and can help you relax the rules you don't need. Their calm makes your steadiness feel less like work.",
          "80-Year-Old Soul: Peaceful company. You both love comfort, ritual and real conversation. They'll show you how to slow down even further, and you'll make sure they always have a ride home.",
        ),
        "If you want to grow, lean into the friendships that stretch you. The people who make you a little nervous with their spontaneity are often the ones who bring the most joy. Keep the calm, wise ones close too. They remind you that a good life isn't just well organized. It's well enjoyed, and you deserve to enjoy it as much as anyone you look after.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: Steady at 35 isn't really about routines. It's about safety, and your answers suggest you've made yourself responsible for everyone else's.",
      body: p(
        "People with this result tend to choose the sensible car, the sofa that fits everyone, the clear thumbs-up text. It's easy to read that as 'boring'. It isn't. Underneath is a priority: you want the people you care about, including yourself, to feel safe and looked after. That's a beautiful value, and the world needs more of it.",
        "The honest part is that when safety becomes your main job, you can lose track of your own wants. You might say no to adventures because they're inconvenient, not because you don't want them. You may hold things together so well that nobody realizes you're tired. And you might be postponing something you really want, like a trip, a change or a creative project, until everything else is sorted, which can mean forever.",
        "Steadiness is your gift. Just make sure you're also on the list of people you look after.",
        "Your next steps:",
        list(
          "This week, ask for help with one task you'd normally do alone. Be specific: 'Can you handle dinner on Friday?'",
          "Say yes to one spontaneous invitation in the next month, even if it breaks your routine.",
          "Write down one thing you've been postponing 'until things calm down', and take the first small step now.",
          "Swap one routine for something new: a different walk, a new recipe, a new game.",
          "Plan a treat that's just for you, not for the household or the group.",
          "Retake the quiz later this year. If a younger age climbs up your mix, that's a sign you've let a little more play in.",
        ),
      ),
    },
  ],
};

export const age50: Outcome = {
  key: "age50",
  name: "Unbothered at 50",
  tagline: "Calm, capable and done pretending to care about trends.",
  emoji: "😎",
  summary:
    "Your mental age is 50: calm, capable and pleasantly unbothered by what anyone else thinks. You know what you like, you own the right tool for the job, and your dry humor is wildly underrated.",
  about: p(
    "A mental age of 50 describes people whose tastes lean toward perspective, competence and quiet confidence. It's the life stage where many people stop caring about trends and start caring about what genuinely works for them. People with this result often pick vinyl records, a sunroom full of plants, bird-watching, a classic car polished on Sundays and a quiet dinner with old friends.",
    "Unbothered at 50 energy is calm and grounded. Many people with this result are the steady voices in their circles: hard to rattle, slow to judge and surprisingly funny once you get to know them. They tend to value long friendships, good tools, real expertise and time outdoors.",
    "Their growing edges usually involve curiosity and change. Knowing what you like is a gift, but it can slide into 'I've always done it this way'. The best version of this energy stays open, keeps learning and lets new people in.",
    "This is one of six results in our mental age test, from 12 at heart to an 80-year-old soul. Your result reflects your current tastes and habits, not your maturity, intelligence or real age. Many teens and twenty-somethings land here because they've always been calm, practical and a little old-fashioned in the best way. Retake the quiz anytime and see how your mix shifts.",
  ),
  snapshot: [
    "Your mental age: Unbothered at 50, calm, capable and confident",
    "You know what you like and don't need trends to tell you",
    "You prefer real skill and good tools to quick fixes",
    "Friends value your perspective and your dry sense of humor",
    "Your growth edge: staying curious when 'my way' already works",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Your answers have the relaxed confidence of someone who stopped trying to impress anyone a while ago, and found it incredibly freeing.",
      body: p(
        "There's a particular kind of calm that comes from having lived through a few storms. You've seen trends come and go, plans fall apart and come back together, and worries that seemed huge turn out to be tiny. People with a mental age of 50 often carry that calm, even when they're much younger. Your picks suggest you're one of them.",
        "Unbothered at 50 is about perspective. You probably don't panic when something breaks. You grab the right tool, or you know who to call. You don't feel the need to answer every message instantly or chase every new thing. You'd rather spend a Saturday in the garden, flipping through records at a market or out with binoculars spotting birds than squeezed into a crowded spot that everyone says is amazing.",
        "You also have a dry, quiet humor that sneaks up on people. You might not be the loudest voice in the room, but you're often the funniest, usually with one well-timed comment.",
        "There's warmth here too. People with this mental age tend to be generous with their time and experience. You're the one people come to when they need a calm second opinion. You don't judge easily, because you've made enough mistakes of your own to know how life goes.",
        "Your story is about freedom of a different kind. Not the freedom of having no responsibilities, but the freedom of not caring what anyone thinks. You've decided what matters to you, and you live by it. That's a rare and steady kind of confidence, and many people spend decades trying to reach it.",
      ),
    },
    {
      title: "Traits you share with real 50-year-olds",
      teaser:
        "Real 50-year-olds are known for owning the exact tool you need, answering unknown numbers without fear and caring very little about what's trending.",
      body: p(
        "Fifty is often called the age of not caring, in the most liberating sense. Here are life-stage traits people with this result tend to share with real 50-year-olds:",
        list(
          "Earned calm. Small problems stay small. You tend to meet drama with a shrug and a solution.",
          "The right tool for every job. Whether it's a toolbox, a kitchen drawer or a good pair of gardening gloves, you like being prepared.",
          "Answering the phone. Unknown number? You'll pick up. It might be important, and you can handle whatever it is.",
          "Loyalty to what works. Your favorite boots, your favorite mug, your favorite route. Trends rarely tempt you away.",
          "A love of the outdoors. Gardens, walks, birds, long drives. Time outside restores you.",
          "Long friendships. You've kept friends for years, maybe decades, and you value people who know your whole story.",
          "Know-how worth sharing. You've gotten good at a few things and enjoy teaching others, when they ask.",
        ),
        "There's another trait real 50-year-olds often share: they're reinventing themselves more than people realize. Many start new hobbies, return to old passions or make big changes at this life stage, now with the confidence to do it on their own terms. If you have an 'I've always wanted to…' list, you're right on brand.",
        "Being unbothered doesn't mean you don't care. It means you've learned where to put your care. You save your energy for the people and things that matter and let the rest wash past. That's a skill many people wish they'd learned sooner, and you seem to have it already.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Time outdoors, real conversations and the satisfaction of a job done properly keep you young. What ages you is quietly closing the door on new things.",
      body: p(
        "Your energy comes from depth and calm. People with this mental age tend to feel best when they're doing something they're good at, spending time in nature or connecting with people they've known for years. A walk with a friend, an afternoon in the garden or a long drive with the right music can recharge you more than any party.",
        "What keeps your inner 50-year-old thriving:",
        list(
          "Regular time outdoors: gardening, walking, bird-watching, long drives",
          "Mastering a craft: woodwork, cooking, music, restoring something old",
          "Long conversations with people who know you well",
          "Teaching or mentoring someone who's eager to learn",
        ),
        "What ages you is a closed door. The confidence that comes with knowing what you like can slowly turn into not trying anything new. If you catch yourself dismissing new music, new technology or new ideas before giving them a chance, that's the moment your mental age starts creeping past 50 for the wrong reasons.",
        "Isolation is another quiet ager. Unbothered people can be so self-sufficient that they forget to reach out. Weeks can pass without real connection, and life can start to feel smaller.",
        "The fix is to pair your calm with curiosity. Pick one new thing each season, whether a hobby, a kind of music or a cuisine, and give it a real try. Make new friends, especially younger ones; they'll keep you current and you'll give them perspective. Say yes to the occasional unfamiliar invitation. Your confidence means you can enjoy new things without needing to be good at them right away. That's the secret: being unbothered is even better when you're also still curious.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "You're the friend people call when everything is going wrong, because your calm voice makes the whole thing feel smaller.",
      body: p(
        "In friendships, you're the steady presence. You're not usually the one shouting the loudest at a party, but you're the one people seek out for a real conversation. Friends trust your judgment because you don't overreact, you don't gossip and you've usually seen something similar before.",
        "You're also loyal for the long haul. Unbothered at 50 people often keep friendships for decades. You remember the old stories, you show up for the important things and you don't hold small grudges. If a friend disappears for a while, you'll pick up right where you left off.",
        "How you tend to show up:",
        list(
          "The calm one: steady when things get stressful",
          "The dry wit: quiet one-liners that make everyone laugh",
          "The fixer: practical help, the right tool, sensible advice",
          "The keeper of history: you remember how far everyone has come",
        ),
        "The watch-outs are subtle. You might come across as distant or hard to read, especially to newer friends who mistake your calm for disinterest. You may offer advice when someone just wants to vent. And because you're comfortable on your own, you might let friendships drift without meaning to.",
        "Your friendships thrive when you make your warmth visible. Tell people what they mean to you; they may not know. Reach out first sometimes, even with a short message. Share your own struggles instead of only helping with theirs. It makes you more relatable, not less.",
        "And make room for new people. You have so much to offer someone who's still figuring things out, and they have energy and fresh ideas to offer you. Some of your best friendships may still be ahead of you.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You and someone Steady at 35 make a great team, but you might have the most fun with someone who is Forever 19.",
      body: p(
        "Your calm makes you easy to be around, so you can connect with any mental age. Here's how the chemistry usually plays out:",
        list(
          "12 at Heart: Delightful. Their playfulness brings out your hidden silliness, and your calm makes their chaos feel safe. You'll be the cool aunt or uncle figure in their life, whatever your actual ages.",
          "Forever 19: The most fun. Their big energy and big feelings remind you of your own wild moments. You'll listen without judging, and they'll drag you to things you'd never pick yourself. Everyone wins.",
          "Thriving at 27: A natural mentorship. They're building their life and value your perspective. You'll help them worry less; they'll keep you current.",
          "Steady at 35: A great team. You share a love of quality and calm, and together you'll host the best dinners and fix anything that breaks.",
          "Unbothered at 50: Easy company. Long silences are comfortable, and the jokes are dry. Just make sure one of you suggests something new now and then.",
          "80-Year-Old Soul: A gentle match. They'll share stories and slow wisdom, and you'll appreciate their perspective more than most. Sunday mornings were made for this friendship.",
        ),
        "The friendships that will do you the most good are the ones that pull you slightly out of your comfort zone. A younger-at-heart friend keeps you curious and laughing. A fellow calm soul gives you a place to rest. Keep both kinds close, and your circle will stay warm, interesting and wonderfully unbothered.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: Unbothered at 50 isn't really about not caring. It's about choosing exactly what to care about, and your answers suggest you've chosen well, if maybe a little narrowly.",
      body: p(
        "People with this result tend to pick the sunroom, the vinyl, the classic car, the quiet dinner. These choices aren't about being old-fashioned. They're about depth over breadth. You'd rather have a few things you truly love than many you barely notice. That's a powerful priority: it protects your energy and lets you enjoy life deeply.",
        "The honest part is that the same instinct can make your world quietly smaller. When you already know what you like, it's easy to stop exploring. New music, new places and new people can start to feel like too much effort. Over time, you might find you've been unbothered for so long that you've also become a little unmoved.",
        "The best version of this mental age is calm and curious at the same time. You don't need to chase trends. You just need to leave the door open a crack.",
        "Your next steps:",
        list(
          "This month, try one thing you'd normally dismiss: a new kind of music, a new food, a new app. Give it a fair shot.",
          "Reach out to one old friend you haven't spoken to in a while. A short message is enough.",
          "Offer to teach someone a skill you're proud of. Teaching keeps your mind sharp and your heart open.",
          "Spend one weekend morning somewhere new outdoors: a different trail, park or beach.",
          "Write a short 'I've always wanted to…' list and pick one item to start this season.",
          "Retake the quiz in a few months. If a younger age shows up stronger, your curiosity is working.",
        ),
      ),
    },
  ],
};

export const age80: Outcome = {
  key: "age80",
  name: "80-Year-Old Soul",
  tagline: "Tea, perspective and a bedtime you defend with pride.",
  emoji: "🫖",
  summary:
    "Your mental age is 80: gentle, wise and in no hurry at all. You treasure small comforts, real conversation and early nights, and people feel calmer just being around you.",
  about: p(
    "An 80-year-old soul describes people whose tastes lean toward slowness, comfort and meaning. It's the mental age of tea and biscuits, jigsaw puzzles, handwritten cards, the radio playing softly and being happily asleep by nine. People with this result often pick the slow cruise with a big book, the hand-knit blanket and a birthday with 'no fuss, please'.",
    "This energy is gentle and wise. Many people with this result are excellent listeners who notice small details, value tradition and have a strong sense of what really matters. They tend to be patient, kind and calm, often with a sharp, unexpected sense of humor. People often describe old souls as empathetic and good at seeing the bigger picture.",
    "The growing edges usually involve energy and openness. A love of quiet and comfort can sometimes slide into avoiding new experiences or feeling out of step with friends. Finding a few adventures that suit your pace keeps this energy bright.",
    "This is one of six results in our mental age test, from 12 at heart to an 80-year-old soul. It reflects your current tastes and habits, not your maturity, intelligence or real age. Many teens land here and wear it proudly, and so do plenty of grandparents. Retake the quiz anytime to see whether your inner old soul is still in charge.",
  ),
  snapshot: [
    "Your mental age: an 80-year-old soul, gentle, wise and unhurried",
    "Small comforts like tea, blankets and puzzles bring you real joy",
    "You prefer deep conversation to big crowds",
    "People find your calm and perspective deeply reassuring",
    "Your growth edge: saying yes to new things at your own pace",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Your answers have the unhurried, cozy wisdom of someone who figured out long ago that the best things in life are small.",
      body: p(
        "Picture a quiet kitchen in the late afternoon. The kettle is on. The radio is murmuring. There's a half-finished puzzle on the table and a cardigan over the back of a chair. Somebody is about to tell a story you've heard before, and you're going to enjoy it just as much. That's the world your picks describe, and it's a lovely one.",
        "People with an 80-year-old soul tend to live at a different tempo. While others rush, you savor. You'd rather read the whole article than skim the headlines. You'd rather write a proper message, with full sentences and your name at the end, than fire off a string of emojis. You'd rather spend an evening with one good friend than a night with a hundred acquaintances.",
        "This isn't about being slow. It's about paying attention. Old souls often notice what others miss: the bird at the feeder, the friend who's gone quiet, the beauty in an ordinary day. You probably have a strong sense of what's worth your time and what isn't.",
        "There's humor in this mental age too, the dry, twinkly kind. Many 80-year-old souls have a wicked sense of fun hiding under the knitted blanket. You might be the person who delivers a perfectly timed comment and then sips your tea as if nothing happened.",
        "Your story is one of wisdom that arrived early, or maybe never needed to arrive, because it was always there. In a fast, loud world, you're a reminder that life doesn't have to be rushed to be full. That's a gift to everyone around you.",
      ),
    },
    {
      title: "Traits you share with real 80-year-olds",
      teaser:
        "Real 80-year-olds are known for strong opinions about tea, early bedtimes and a total refusal to pretend they care about things they don't.",
      body: p(
        "Eighty is an age of perspective, and many people at this stage carry a freedom that younger people envy. Here are life-stage traits people with this result tend to share with real 80-year-olds:",
        list(
          "Treasuring routine. A morning cup of tea, a daily walk, a favorite chair. Small rituals make life feel steady and good.",
          "Early nights, no apology. You know sleep is precious, and you're not embarrassed about leaving early.",
          "Old-fashioned communication. Full sentences, phone calls, handwritten cards. You believe in saying things properly.",
          "Puzzles and patience. Crosswords, jigsaws, card games. You enjoy activities that reward slow, steady attention.",
          "Stories as currency. You love hearing stories and telling them: family history, old friends, the time something wonderful went wrong.",
          "Not sweating the small stuff. You've seen enough to know which worries matter. Most don't.",
          "Honesty with a twinkle. You'll tell the truth, often with a gentle joke attached.",
        ),
        "There's one more trait real 80-year-olds often share: gratitude. Many people at this life stage talk about appreciating simple things, like a sunny day, a phone call from someone they love or a good meal. If you notice small blessings and say thank you often, you've got the heart of an 80-year-old soul.",
        "None of this means you're out of touch. Real 80-year-olds learn new technology, take classes, travel and make new friends. Being an old soul means holding on to what's timeless while still living in the present. That's a balance most people never quite master, and you seem to have a head start.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Gentle routines, good company and a little daily movement keep you young. What ages you is letting the quiet turn into isolation.",
      body: p(
        "Your energy comes from peace. People with an 80-year-old soul tend to feel best when life is calm, predictable and full of small pleasures: a favorite mug, a crossword, a walk around the block, a long chat with someone who listens. You don't need constant stimulation. You need moments of real connection and comfort.",
        "What keeps your old soul bright:",
        list(
          "A daily ritual that grounds you, like tea, a walk or a few pages of a book",
          "Gentle movement, like stretching, gardening or a slow stroll outdoors",
          "Regular contact with people you love, ideally in person or on the phone",
          "Hobbies that use your hands and mind, like puzzles, knitting, baking or bird-watching",
        ),
        "What ages you is withdrawal. A love of quiet can, over time, become a habit of staying in. If you notice you're turning down invitations because it's easier, not because you truly want to, or that whole weeks go by without a real conversation, that's the moment your old soul starts to feel heavy instead of wise.",
        "Another ager is the feeling of being left behind. When friends are rushing around chasing new things, you might feel out of step, and that can make you pull back even more.",
        "The fix is gentle. Keep a few connections on a regular schedule, like a weekly call, a monthly lunch or a standing walk. Say yes to new things at your own pace. A class, a club or a volunteer role can bring new people into your life without overwhelming you. And remember: being an old soul is not the same as being done. Some of the most interesting chapters of life are written slowly.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "You're the friend people visit when they need to feel calm again, and they usually leave with a cup of tea and a better perspective.",
      body: p(
        "In friendships, you're the safe harbor. Your friends know that with you, they can slow down, be honest and be heard. You don't rush to fix things or fill silences. You listen, and when you do speak, it tends to matter.",
        "You're also wonderfully thoughtful. You might be the friend who sends real birthday cards, remembers how someone takes their tea or keeps a box of photos from years ago. You make people feel seen in small, lasting ways.",
        "How you tend to show up:",
        list(
          "The listener: patient, calm and genuinely interested",
          "The host: tea, a cozy chair and no rush to leave",
          "The wise one: gentle perspective when someone is spiraling",
          "The storyteller: the right story at the right time",
        ),
        "The watch-outs are mostly about energy and pace. Friends with younger mental ages may sometimes find you hard to persuade, especially for late nights or spontaneous plans. You might feel left out when the group does things that don't suit you, and quietly withdraw rather than suggest an alternative. And because you're comfortable on your own, you might go a while without reaching out.",
        "Your friendships do best when you invite people into your world. Suggest the things you love: a card game night, a walk through the park, a baking afternoon. Many of your friends will be grateful for a slower, more meaningful plan. And say yes to their world now and then too, with a clear plan to leave early if you need to.",
        "Never underestimate what you give people. In a busy, loud world, being the person who makes others feel calm and heard is a rare and precious kind of friendship.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You'll feel right at home with a fellow old soul, but your most magical match is someone who is still 12 at heart.",
      body: p(
        "Old souls are patient and kind, which makes them easy to love. Here's how you're likely to get along with each mental age:",
        list(
          "12 at Heart: The magical match. Think of the way grandparents and grandkids often adore each other. You both live in the moment, love simple pleasures and don't care about looking cool. They'll make you laugh; you'll teach them card games and old songs.",
          "Forever 19: Unexpectedly lovely. They bring stories of adventure, and you're the perfect audience. You'll offer the calm perspective they secretly need, and they'll show you new music you might even like.",
          "Thriving at 27: Warm and useful. They're busy building their lives and will treasure your advice. They'll help you with technology; you'll help them slow down.",
          "Steady at 35: Comfortable company. You share a love of routine and quality. Expect cozy dinners and conversations that wander pleasantly for hours.",
          "Unbothered at 50: A natural fit. Both calm, both wise, both happy with long silences. Sunday mornings with this friend are pure peace.",
          "80-Year-Old Soul: Kindred spirits. Tea, crosswords and stories. Just make sure one of you occasionally suggests going somewhere new.",
        ),
        "For a full and joyful circle, keep at least one younger-at-heart friend close. They'll bring energy and new experiences into your life, and you'll give them a sense of calm that's hard to find elsewhere. Your gentle presence is a gift to every age, and the right friendships will make sure that gift comes back to you.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: an 80-year-old soul isn't really about slowing down. It's about meaning, and your answers suggest you'd rather have a small life that matters than a big one that doesn't.",
      body: p(
        "People with this result tend to pick the quiet dinner, the handwritten message, the puzzle that takes a week. These choices point to a deep priority: you want life to feel meaningful, not just busy. You'd rather spend time on things that last, like relationships, rituals and real attention, than on things that disappear by tomorrow.",
        "The honest part is that meaning sometimes needs a little risk. A love of comfort can make new experiences feel like more trouble than they're worth. You might be passing up conversations, adventures or opportunities that could become some of your most meaningful memories, simply because they're unfamiliar. Old souls are wise, and wisdom also means knowing when to step outside the warm kitchen.",
        "One more honest note: if you landed here while feeling tired a lot lately, check whether your calm comes from contentment or from being worn out. Sometimes people choose the quiet options because they're running on empty. Rest is wise, and it's also worth talking to someone you trust about how you've been feeling.",
        "Your next steps:",
        list(
          "This week, call or visit someone you love instead of texting. Notice how it feels.",
          "Say yes to one new experience this month, at your pace: a class, a walk with a new friend, a new recipe.",
          "Start a small notebook of daily gratitudes or favorite moments. It suits your soul.",
          "Teach someone younger something you love, like a card game, a recipe or a family story.",
          "Plan one gentle adventure: a day trip somewhere you've never been.",
          "Retake the quiz later in the year and see whether your old soul has picked up a few new tricks.",
        ),
      ),
    },
  ],
};
