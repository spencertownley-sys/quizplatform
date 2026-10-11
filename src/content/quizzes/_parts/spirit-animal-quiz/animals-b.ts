import type { Outcome } from "@/lib/engine/types";

/** Spirit Animal Quiz outcomes: Fox, Bear, Deer, Dolphin. Copy says "animal guide", never "spirit animal". */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const fox: Outcome = {
  key: "fox",
  name: "The Fox",
  tagline: "Clever, quick and impossible to pin down.",
  emoji: "🦊",
  summary:
    "Your animal guide is the Fox: clever, quick and wonderfully hard to pin down. You find the unexpected way through, charm your way out of trouble and keep life interesting for everyone around you.",
  about: p(
    "The Fox as an animal guide stands for cleverness, adaptability and playful wit. Foxes thrive almost everywhere, from forests and farmland to busy cities, by being resourceful and quick to adjust. In countless folk tales, the fox is the clever one who outsmarts bigger, stronger animals.",
    "People who get the Fox in this quiz tend to pick midnight, winding trails full of surprises, chess in the park, making a sad friend laugh and knowing everyone's secrets by the end of the party. They often think fast, read people well and enjoy a bit of harmless mischief. They're natural problem-solvers who'd rather find a clever shortcut than follow a rule that doesn't make sense.",
    "The Fox's strengths include quick thinking, adaptability, humor and social savvy. Its growth areas usually involve trust and depth: letting people see the real you behind the charm, and sticking with things after the novelty wears off.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Fox, clever, adaptable and witty",
    "You think on your feet and love an unexpected solution",
    "Your humor and charm open almost any door",
    "You read people and situations quickly",
    "Your growth edge: letting people past the clever surface",
  ],
  deep: [
    {
      title: "Your fox story",
      teaser:
        "A fox can trot through a forest at dawn and a city street at midnight and look perfectly at home in both. Your answers suggest you have that same talent for fitting in anywhere, on your own terms.",
      body: p(
        "Few animals are as adaptable as the fox. Foxes live in deep woods and city parks, in deserts and snowfields. They eat almost anything, sleep almost anywhere and find opportunities where other animals see dead ends. They're survivors, but they're also playful. Young foxes pounce, tumble and chase each other just for fun.",
        "Your picks suggest you share that blend of cleverness and play. You probably think fast. When a plan falls apart, you're already working on plan B, and maybe plan C. You might enjoy puzzles, strategy games, riddles or anything that lets you outsmart a problem.",
        "People who match the Fox often have a sharp sense of humor. You may be the one who makes everyone laugh with a perfectly timed comment or a harmless prank. You know how to read a room and say just the right thing, which makes you socially skilled and often very charming.",
        "There's an independent streak too. Foxes don't run in big packs. You may like company, but you also like the freedom to come and go. Rules that don't make sense annoy you, and you'd rather find your own way than follow the crowd.",
        "Under the cleverness, there's often a soft heart. Many fox types are fiercely loyal to the few people who see past their wit to the real person underneath. Earning that trust takes time, but it lasts.",
        "Your story is about resourcefulness. You turn obstacles into opportunities, boredom into games and tricky situations into stories you'll laugh about later. Life with you is never dull.",
      ),
    },
    {
      title: "Your fox strengths",
      teaser:
        "Your strength is a nimble mind. When everyone else sees a wall, you see three ways around it and a door nobody noticed.",
      body: p(
        "Fox types bring strengths that make them excellent problem-solvers, entertainers and social navigators. Here are the ones your answers highlight.",
        list(
          "Quick thinking. You take in information fast and react quickly. That makes you great when situations change by the minute.",
          "Adaptability. New school, new job, new city, new plan? You adjust faster than most people.",
          "Humor. You can lighten the mood, ease tension and make people feel relaxed with a well-timed joke.",
          "Social intelligence. You read people well. You sense what they want, what they're hiding and how to get through to them.",
          "Creative problem-solving. You find unusual solutions and enjoy bending the rules, kindly, to make things work.",
          "Resourcefulness. Give you a few odd materials and a tight deadline, and you'll make something happen.",
        ),
        "These strengths shine in fast-paced settings, creative projects, debate, sales, performance, teaching and any role where people skills and quick wits matter. Many fox types make great improvisers, storytellers and fixers.",
        "Your deepest strength may be your ability to make hard things feel lighter. Life is full of challenges, and you meet them with a grin and a clever idea. That attitude is contagious. People around you start to feel that problems are puzzles, not disasters.",
        "Use your cleverness for good. When you point your wit at helping people, solving real problems and bringing joy, you're unstoppable. And remember that being clever isn't the same as being alone: some of your best tricks will happen with a teammate who's in on the plan.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Fox's shadow is the clever mask: using charm and jokes to keep people at a safe distance from the real you.",
      body: p(
        "Every animal guide has a shadow side. For foxes, it often grows from the same cleverness that makes you shine. Here's how it can show up.",
        list(
          "Hiding behind humor. When conversations get serious or emotional, you might crack a joke to change the subject. It protects you, but it can also keep people from really knowing you.",
          "Restlessness. Once something stops being new or challenging, you might lose interest. Projects, hobbies and sometimes friendships can be left half-finished.",
          "Bending the truth. Foxes are good storytellers. Sometimes that turns into exaggerating, smoothing over facts or telling people what they want to hear.",
          "Trust issues. You read people well, and you know how easily people can be fooled. That can make you slow to trust or quick to suspect others' motives.",
          "Going it alone. You might prefer solving problems yourself rather than relying on others, even when teamwork would be easier.",
        ),
        "In real life, it might look like a friend saying, 'I never know when you're being serious.'",
        "None of this means you're sneaky or shallow. These are survival skills that sometimes overstay their welcome.",
        "The work for foxes is learning to be seen. Let a few people past the clever surface. Share a real feeling without immediately joking about it. Stick with one project after it stops being exciting, and discover the satisfaction that comes from depth.",
        "A useful question: 'Am I being clever right now, or am I hiding?' If it's hiding, try one honest sentence instead of a joke. You might be surprised by how much closer people feel.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You win people over with laughter, then keep them with surprising loyalty. Few people realize how deeply a fox can care.",
      body: p(
        "Fox types often have a wide social network and a small, trusted inner circle. You can chat with anyone, but only a few people get to see the real you.",
        "In friendships, you're the fun one, full of stories, jokes and plans. You keep things lively and make sure no one is bored. Once someone earns your trust, you're also fiercely loyal. You'll defend them, help them out of tricky situations and always have a clever idea when they're stuck.",
        "In close relationships, you need playfulness and freedom. Someone who can match your wit, laugh at your jokes and give you room to roam will win your heart. Clinginess or rigid rules can make you want to run.",
        "How you show love:",
        list(
          "Humor: making someone laugh when they need it most",
          "Clever help: finding a solution to a problem they couldn't crack",
          "Surprises: small, thoughtful, unexpected gestures",
          "Inside jokes and shared mischief",
        ),
        "What you need in return is trust, fun and freedom. You thrive with people who enjoy your playfulness but can also gently invite you to be serious when it matters.",
        "Your growth tip: let people care for you. Foxes are used to looking after themselves. Allow someone to help, comfort or support you, even if it feels unfamiliar. And show love with your attention as well as your wit: put the phone down, ask the second question and let a serious moment stay serious. The fox who lets someone in finds a den that feels like home.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Owl and the Octopus, but the steady Bear might be the friend who teaches you the most.",
      body: p(
        "Here's how fox energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Owl: A fellow clever mind. Owls are thoughtful where you're quick, but you share a love of puzzles and late-night conversations. They'll help you think deeper; you'll help them laugh more.",
          "Octopus: A fellow problem-solver. Octopuses are inventive and curious, and together you can dream up ideas nobody else would. Expect mischief and brilliance in equal measure.",
        ),
        "Your growth match",
        list(
          "Bear: Bears are steady, grounded and patient, everything a restless fox sometimes isn't. A bear friend can teach you the value of rest, stillness and staying put. You'll bring fun and spontaneity to their cozy den.",
        ),
        "Your spicy pairing",
        list(
          "Lion: Lions like to lead; foxes like to question. You might tease their pride or ignore their plans, and they might find you hard to wrangle. But a lion and a fox who respect each other make a brilliant team: courage plus cunning.",
        ),
        "Easy company",
        list(
          "Dolphins and butterflies: dolphins match your playfulness and butterflies match your love of change, so plans with either one tend to turn into something fun and unexpected.",
        ),
        "Other foxes",
        list(
          "Two foxes together can be hilarious, chaotic and unstoppable. You'll finish each other's jokes and egg each other on. Just make sure someone remembers the plan, and that you both tell the truth when it matters.",
        ),
        "The friendships that stretch you most will help you grow most. Keep your clever allies close for adventure, and lean on your steady friends for balance. A fox with both kinds of friends can go anywhere.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to go deep: to stay with one thing, one person or one dream long enough to see what grows.",
      body: p(
        "Foxes are brilliant at starting things. Your challenge this year is to finish one, and to discover the kind of satisfaction that only comes from depth.",
        "Your quick mind makes life exciting, but it can also make you leave before things get really good. Skills, friendships and projects often hit a boring middle before they become amazing. This year, practice staying through the middle.",
        "Here's your challenge plan:",
        list(
          "Choose one project, skill or hobby to stick with for the whole year. Track your progress monthly. Notice what happens after the novelty wears off.",
          "Have one honest, joke-free conversation each month about something that really matters to you.",
          "Keep a promise you'd normally wriggle out of. Notice how it feels to follow through.",
          "Pick one friendship to invest in deeply: regular check-ins, shared plans, real openness.",
          "Before you bend a rule, ask, 'Who does this help?' Use your cleverness for others as often as for yourself.",
          "Write down your proudest clever solution of the year, and share the story with someone who'll appreciate it.",
          "Pick one person to be fully honest with this year, even when a joke would be easier.",
          "Once a season, finish something you'd normally drop and show it to someone, rough edges and all.",
        ),
        "At the end of the year, look back at what you built by staying. It might be the thing you're proudest of. The cleverest foxes know when to dart and when to dig in. This year, you'll learn the second part.",
      ),
    },
  ],
};

export const bear: Outcome = {
  key: "bear",
  name: "The Bear",
  tagline: "Gentle strength, fierce protection, legendary naps.",
  emoji: "🐻",
  summary:
    "Your animal guide is the Bear: strong, grounded and fiercely protective of the people you love. You know the value of rest, comfort and a good den, and when it matters, nobody stands firmer than you.",
  about: p(
    "The Bear as an animal guide stands for grounded strength, protection and rest. Bears are powerful animals, yet much of their life revolves around patience: foraging, resting and, for many, slowing down through the long winter. Mother bears are famously protective of their cubs. That mix of strength and gentleness makes the bear a symbol of steady, protective power.",
    "People who get the Bear in this quiz tend to choose a den deep in the forest, rain on the roof, super strength, baking bread and hanging out in the kitchen with the dog at a party. They often value comfort, solitude and home, and they're loyal, calm and hard to push around. They might not seek attention, but people feel safe around them.",
    "The Bear's strengths include protectiveness, steadiness, resilience and a deep understanding of rest. Its growth areas usually involve opening up and coming out of the den: sharing feelings, saying yes to new experiences and not hibernating through things that need attention.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to find out which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Bear, strong, grounded and protective",
    "You recharge best in your own cozy den",
    "People feel safe around your calm, steady presence",
    "When someone you love needs defending, you stand firm",
    "Your growth edge: coming out of hibernation to share how you feel",
  ],
  deep: [
    {
      title: "Your bear story",
      teaser:
        "Imagine a bear stepping out of its den in early spring, blinking in the light, strong and unhurried. Your answers carry that same quiet power.",
      body: p(
        "Bears move through the world at their own pace. They don't rush, and they don't need to prove anything. They forage, rest, roam and return to their dens. But when something threatens what they care about, they become one of the most formidable creatures in the forest.",
        "Your picks suggest you share that energy. You likely value comfort and home deeply: a warm blanket, a good meal, rain against the window, time to recharge alone. You might not be the loudest person in the room, but people notice when you're there. You have a solid, steady presence that makes others feel safe.",
        "People who match the Bear tend to be protective in a quiet way. You might not talk about loyalty much, but you show it. You stand up for friends, help family and guard your inner circle carefully. If someone you love is threatened, you become surprisingly fierce.",
        "There's wisdom in how you rest, too. Many people treat rest as laziness. You understand it as a season. Many bears slow right down in winter because that's what getting through it requires. You know when to retreat, recharge and come back stronger.",
        "And there's tenderness in your story. Bears are famously devoted to their young. You might be the friend who looks after the whole group, offering snacks, advice and warm hugs.",
        "Your story is about strength that doesn't need to shout. In a world that often rewards noise, you show that real power can be calm, gentle and patient, right up until the moment it needs to roar.",
      ),
    },
    {
      title: "Your bear strengths",
      teaser:
        "Your greatest strength is your steadiness. When life gets wild, you're the solid ground other people stand on.",
      body: p(
        "Bear types bring strengths that make them reliable, protective and deeply comforting to be around. Here are the ones your answers point to.",
        list(
          "Grounded strength. You're hard to rattle. Stressful situations don't knock you over easily, and your calm helps others stay calm.",
          "Protectiveness. You look after your people, whether that means emotional support or practical help.",
          "Healthy rest. You understand the value of recharging. You know your limits and respect them, which helps you avoid burnout.",
          "Patience. You're willing to wait for the right moment, the right person or the right opportunity.",
          "Comfort-making. You know how to create cozy, welcoming spaces, and people relax around you.",
          "Resilience. Like a bear coming through a long winter, you can endure hard seasons and come out stronger.",
        ),
        "These strengths shine in caring roles, steady leadership, crafts and trades, cooking, coaching and any situation where people need a calm, reliable presence. Many bear types become the safe person in their families and friend groups.",
        "Your deepest strength may be the sense of safety you give others. Around you, people feel they can drop their guard. That's a rare and precious gift. It means you're not just strong; you're strong for others. Some of the most important things you'll ever do for people will look small from the outside: a warm meal, a steady voice, a door left open.",
        "Remember that your strength includes knowing when to rest. You don't have to be 'on' all the time to be valuable. Your calm presence is enough.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Bear's shadow is the long hibernation: retreating into your den so completely that the world, and the people who miss you, can't reach you.",
      body: p(
        "Every animal guide has a shadow side. For bears, it often comes from the same instinct that keeps you strong. Here's how it can show up.",
        list(
          "Withdrawing too long. When stressed, you might shut yourself away and stop answering messages. A little retreat helps; too much can leave you isolated.",
          "Bottled-up feelings. You may keep emotions to yourself until they become overwhelming, then they come out all at once as a growl.",
          "Resistance to change. You like your den the way it is. New situations, people or routines can feel like a threat, even when they might be good for you.",
          "Over-protecting. Your instinct to guard others can turn into hovering, or trying to shield people from experiences they need to have.",
          "Comfort as escape. Snacks, sleep, shows and blankets are lovely, but sometimes they become ways to avoid things that need facing.",
        ),
        "These patterns come from a deep need for safety. That's not a flaw. But too much safety can turn a den into a cave.",
        "The work for bears is learning to come out of hibernation on purpose. Share how you feel before it builds up. Say yes to something new, even if it's a little scary. Let the people you protect take their own small risks.",
        "A helpful question: 'Am I resting, or am I hiding?' Rest makes you stronger. Hiding keeps you stuck. When you can tell the difference, you'll know when to stay in and when to step out into the spring.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love like a warm den in winter: steady, safe and always there when someone needs to come in from the cold.",
      body: p(
        "Bear types love with quiet devotion. You might not be flashy about it, but your loyalty runs deep. Once someone is in your circle, you look after them for life.",
        "In friendships, you're the dependable one. You're there with soup when someone's sick, a couch when someone needs to crash and a calm voice when everything feels like too much. You may have fewer friends than some people, but your friendships tend to last for years. Friends often say your home is where they feel most relaxed, and the first place they think of when life gets hard.",
        "In close relationships, you're steady, protective and affectionate. You show love through acts of care: cooking, fixing, sheltering, hugging. You value comfort, routine and trust. Big dramatic gestures matter less to you than consistent kindness.",
        "How you show love:",
        list(
          "Creating comfort: cozy spaces, good food, warm blankets",
          "Protection: standing up for people and keeping them safe",
          "Practical help: fixing, carrying, building, sorting",
          "Presence: hugs, sitting close, simply being there",
          "Feeding people: a warm meal is one of your favorite ways to say 'I care'",
        ),
        "What you need in return is loyalty, patience and space to recharge. You thrive with people who don't take your quiet times personally and who trust that you'll come back stronger.",
        "Your growth tip: share your inner world. Bears can be so focused on protecting others that they forget to say what they need. Tell people when you're struggling. Let them bring you soup sometimes. The den is warmer when care flows both ways.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Wolf and the Turtle, and the playful Fox could be the friend who brings your den to life.",
      body: p(
        "Here's how bear energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Wolf: A fellow protector. Wolves share your loyalty and your instinct to guard the people you love. Together you're an unbeatable team for anyone who needs looking after.",
          "Turtle: A fellow homebody. Turtles share your love of calm, comfort and taking things slowly. Long evenings in, shared meals and comfortable silence make this friendship easy and restoring.",
        ),
        "Your growth match",
        list(
          "Fox: Foxes are quick, playful and endlessly curious. A fox friend might tempt you out of your den for adventures you'd never plan yourself. You'll teach them to rest; they'll teach you to play.",
        ),
        "Your spicy pairing",
        list(
          "Dolphin: Dolphins are social, energetic and always up for a party. Their constant invitations might wear you out, and your need for solitude might confuse them. But a dolphin can remind you how good it feels to laugh in a crowd, and you can give them a safe place to rest. Say yes to them sometimes, and they'll learn to respect your no.",
        ),
        "Easy company",
        list(
          "Deer and owls: both are gentle, quiet souls who understand the value of a peaceful evening, and both feel instantly safe in your den.",
        ),
        "Other bears",
        list(
          "Two bears together create the coziest den imaginable. Just make sure at least one of you occasionally suggests going outside.",
        ),
        "The animals that challenge you can help you grow. Keep your steady allies close, and say yes to the playful ones now and then. A bear with both kinds of friends knows how to rest deeply and live fully.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to wake up early from hibernation: to step out of your comfort zone a little sooner and a little more often than feels natural.",
      body: p(
        "Bears come out of their dens in spring hungry, curious and ready to explore. Your challenge this year is to practice that spring energy, even when part of you wants to stay curled up.",
        "You already know how to rest, and that's a strength many people lack. This year is about balancing it with gentle adventure, so your world keeps growing.",
        "Here's your challenge plan:",
        list(
          "Try one new thing each month: a class, a recipe, a walk somewhere unfamiliar, a new hobby. Keep it small and doable.",
          "Share one feeling a week with someone you trust. Practice naming emotions before they build up.",
          "When you feel the urge to withdraw, send one short message instead of going silent: 'I'm recharging, I'll reach out soon.'",
          "Let someone take care of you at least once a month. Accept the help, the meal, the favor.",
          "Invite one friend into your den for something cozy: a movie night, a shared meal, a board game.",
          "At the end of each season, ask yourself: did my den feel like a safe base this season, or a hiding place?",
          "Choose one 'spring' goal each season, something that gets you outside or meeting people, and put it on the calendar.",
        ),
        "By the end of the year, you'll likely find your world has gently expanded: more friends, more experiences, more stories. And your den will still be there, warm and waiting, whenever you need it. The strongest bears aren't the ones who never leave the den. They're the ones who know they can always come home.",
      ),
    },
  ],
};

export const deer: Outcome = {
  key: "deer",
  name: "The Deer",
  tagline: "Gentle, intuitive and quietly tuned to everyone's feelings.",
  emoji: "🦌",
  summary:
    "Your animal guide is the Deer: gentle, intuitive and quietly attuned to everyone around you. You sense moods before they're spoken and move through the world with grace, kindness and wide-open eyes.",
  about: p(
    "The Deer as an animal guide stands for gentleness, sensitivity and intuition. Deer are graceful, alert animals with keen senses, often noticing the slightest change in their surroundings long before others do. That combination of softness and awareness makes the deer a symbol for people who lead with kindness and feel the world deeply.",
    "People who get the Deer in this quiz tend to choose dawn, first snow, wildflower walks, sitting quietly with a friend who's struggling and the superpower of feeling what others feel. They're often empathetic, perceptive and gentle with others. They may be the friend who notices when someone's upset, or the one who brings calm to a tense room.",
    "The Deer's strengths include empathy, intuition, kindness and grace under pressure. Its growth areas usually involve boundaries and confidence: protecting your energy from other people's emotions, speaking up for what you need and trusting your strength as much as your softness.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Deer, gentle, intuitive and kind",
    "You sense moods and feelings before they're spoken",
    "You bring calm and grace into tense spaces",
    "Your kindness is quiet, steady and deeply felt",
    "Your growth edge: protecting your energy and speaking up for yourself",
  ],
  deep: [
    {
      title: "Your deer story",
      teaser:
        "At the edge of a clearing at dawn, a deer lifts its head, ears turning toward a sound nobody else has noticed yet. Your answers suggest you live with that same quiet alertness.",
      body: p(
        "Deer are some of the gentlest creatures in the forest, yet they're far from fragile. They notice everything: a snapped twig, a shift in the wind, a change in the light. That sensitivity keeps them safe and lets them move through the world with grace.",
        "Your picks suggest you share that awareness. You probably sense moods quickly: when a friend is upset, when tension is building, when someone needs a kind word. You may feel other people's emotions almost as strongly as your own. That's a gift, though sometimes a tiring one.",
        "People who match the Deer tend to be gentle in how they treat others. You likely avoid unnecessary conflict, speak kindly and try to make people comfortable. You might be the one who checks on the quiet person at the party or remembers that a friend had a hard week.",
        "Your intuition is often surprisingly accurate. You may have learned to trust your gut about people and situations, even when you can't explain why. If something feels off, it usually is. Friends may even ask for your read on a person or situation before they decide.",
        "There's real strength in your gentleness, too. Deer can run fast, leap high and come through harsh winters. You may be more resilient than you look, especially when someone you love needs you.",
        "Your story is about tenderness as power. In a world that often confuses loudness with strength, you show that noticing, caring and moving gently can change the atmosphere of a whole room. People feel safer, softer and more seen around you.",
      ),
    },
    {
      title: "Your deer strengths",
      teaser:
        "Your greatest strength is your sensitivity. Where others see a room, you see the people in it, and what each of them is quietly feeling.",
      body: p(
        "Deer types bring strengths that make them excellent friends, carers and peacemakers. Here are the ones your answers highlight.",
        list(
          "Empathy. You understand how others feel, often without them saying a word. People feel deeply understood around you.",
          "Intuition. Your gut instincts are strong and often right. You sense when something's off before the facts catch up.",
          "Gentleness. You treat people with care. Your kindness makes you safe to talk to.",
          "Awareness. You notice small details: a shift in tone, a look, a change in mood. That makes you thoughtful and perceptive.",
          "Grace under pressure. When things get tense, you often stay calm and soft, which helps cool conflict down.",
          "An eye for beauty. You may be moved by nature, music, art or a perfect quiet morning.",
          "Loyalty. Once you trust someone, your care for them is steady and long-lasting.",
        ),
        "These strengths shine in caring roles, creative work, teaching, counseling, animal care and any situation where people need to feel safe and understood. Many deer types are the emotional heart of their friend groups.",
        "Your deepest strength may be the way you make people feel seen. In a busy world, being truly noticed is rare. You give that gift freely, and people remember it. When you combine that awareness with a little courage, you become the person who says the kind, true thing nobody else dared to say.",
        "Remember: sensitivity isn't weakness. It's a kind of intelligence. The same awareness that sometimes overwhelms you is what lets you help, comfort and connect in ways others can't.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Deer's shadow is overwhelm: absorbing so much of what others feel that you lose track of what you feel.",
      body: p(
        "Every animal guide has a shadow side. For deer, it often grows from your greatest strength. Here's how it can show up.",
        list(
          "Emotional overload. You might absorb other people's stress, sadness or anger as if it were your own. After busy social days, you may feel drained.",
          "Avoiding conflict. Your dislike of tension can make you say yes when you mean no, or stay silent when you need to speak up.",
          "Freezing or fleeing. When something feels threatening, your instinct may be to go quiet, disappear or avoid the situation rather than face it.",
          "Self-doubt. Because you're gentle, you might underestimate your own strength or let louder people decide for you.",
          "People-pleasing. Keeping others happy can feel safer than risking their disappointment, even when it costs you.",
        ),
        "In real life, it might look like agreeing to plans you dread, or lying awake replaying a tense moment everyone else has already forgotten.",
        "These patterns come from a caring heart and finely tuned senses. They're not flaws. But they can leave you tired and unheard.",
        "The work for deer is learning that gentleness and boundaries can live together. You can be kind and still say no. You can care about someone's feelings and still share your own. You can step back from a draining situation without abandoning anyone.",
        "A helpful question when you feel overwhelmed: 'Whose feeling is this?' If it isn't yours, you can acknowledge it with kindness and set it down. Your sensitivity is a superpower when you protect it, not when you give it all away.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love softly and attentively, and the people in your life often say they've never felt so understood.",
      body: p(
        "Deer types love with tenderness and deep attention. You notice the small things: how someone takes their tea, what makes them anxious, which song makes them cry. You care for people in ways that make them feel truly known. Many deer types also love through small acts of beauty: flowers on a table, a playlist made for one person, a perfectly chosen card.",
        "In friendships, you're the comforter. You're the one people call when they need to talk, because you listen without judgment and respond with warmth. You prefer a few close, gentle friendships to large, loud groups.",
        "In close relationships, you're affectionate, loyal and emotionally present. You need to feel safe before you fully open up, and once you do, you love deeply. Harsh words and conflict can hurt you more than others realize, so you thrive with people who communicate kindly.",
        "How you show love:",
        list(
          "Deep listening and emotional support",
          "Noticing small details and remembering them",
          "Gentle gestures: a handwritten note, a favorite snack, a soft check-in",
          "Creating calm, peaceful moments together",
          "Protective kindness: quietly making sure the people you love are okay",
        ),
        "What you need in return is gentleness, patience and emotional safety. You flourish with people who are kind, consistent and willing to talk things through calmly.",
        "Your growth tip: share your needs as openly as you meet other people's. Deer types often give more care than they ask for. Tell people what helps you. Let them comfort you. The friendships where care flows both ways are the ones where you'll feel most at home.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Butterfly and the Horse, and the bold Lion could be the friend who helps you find your roar.",
      body: p(
        "Here's how deer energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Butterfly: A fellow gentle soul. Butterflies share your love of beauty and your sensitivity. Together you'll find magic in small things: flowers, music, sunsets and quiet conversations.",
          "Horse: A fellow free spirit with a soft heart. Horses share your alertness and grace, and they bring a sense of adventure. They'll invite you to run in open fields, and you'll help them slow down and notice.",
        ),
        "Your growth match",
        list(
          "Lion: Lions are bold, loud and confident, everything a deer might find intimidating at first. But a lion friend can help you find your voice and stand up for yourself. In return, you can teach them gentleness and emotional awareness.",
        ),
        "Your spicy pairing",
        list(
          "Wolf: In nature, wolf and deer are predator and prey, and at first a wolf's intensity can make you want to bolt. But wolves are loyal and protective. If you can trust them, they'll defend you fiercely, and you'll teach them tenderness.",
        ),
        "Easy company",
        list(
          "Turtles and bears: both move at a calm pace and offer the kind of steady, protective friendship that lets your gentle side relax.",
        ),
        "Other deer",
        list(
          "Two deer together can create a peaceful, deeply understanding friendship. Just make sure at least one of you is willing to speak up when something's wrong.",
        ),
        "The friends who challenge you most can help you grow brave. Keep your gentle allies close for comfort, and let the bold ones teach you that you're stronger than you think.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to stand your ground: to practice staying, speaking and holding your space, even when every instinct says to slip away.",
      body: p(
        "Deer are known for bolting, but they also stand their ground. A deer that holds still, head high, is making a choice. Your challenge this year is to practice that kind of brave stillness.",
        "You already know how to care for others. This year is about caring for yourself with the same gentleness, and learning that your voice matters as much as anyone else's.",
        "Here's your challenge plan:",
        list(
          "Say one honest 'no' each week. Keep it kind and simple: 'I can't this time.' Notice that the world doesn't end.",
          "Share one opinion in a group each month, even if your voice shakes.",
          "Create a recharge ritual for after busy social days: quiet time, a walk, music, a warm drink.",
          "When someone else's emotions start to overwhelm you, practice saying, 'I care about you, and I need a moment.'",
          "Spend time in nature regularly. Deer energy thrives among trees, fields and quiet mornings.",
          "Keep a short journal of your own feelings, separate from everyone else's. Ask yourself each day: 'What do I need?'",
          "Find one bold friend and ask them to cheer you on while you practice speaking up.",
          "Celebrate every time you hold your ground, however small. Courage grows when it's noticed.",
        ),
        "By the end of the year, you may notice that people respect you more, not less, when you speak up. You'll still be gentle. You'll still be kind. But you'll also be standing tall, fully present. That's the deer at its most powerful: soft, alert and unafraid to stay.",
      ),
    },
  ],
};

export const dolphin: Outcome = {
  key: "dolphin",
  name: "The Dolphin",
  tagline: "Joy is your language, and you speak it fluently.",
  emoji: "🐬",
  summary:
    "Your animal guide is the Dolphin: playful, social and fluent in joy. You lift every room you swim into, make friends easily and believe life is better when it's shared.",
  about: p(
    "The Dolphin as an animal guide stands for joy, connection and playful intelligence. Dolphins live in social groups called pods, communicate with a rich range of clicks and whistles and are famous for leaping, riding waves and playing. That makes the dolphin a natural symbol for people who thrive on connection and bring lightness wherever they go.",
    "People who get the Dolphin in this quiz tend to choose open water, keeping everyone laughing on a trip, starting the dance floor, friends singing badly in the car and group surf lessons. They're usually warm, sociable and emotionally intelligent, with a knack for making others feel welcome and happy.",
    "The Dolphin's strengths include warmth, communication, playfulness and emotional insight. Its growth areas usually involve depth and solitude: being okay with quiet, facing hard feelings instead of swimming past them and protecting your energy from too many social demands.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to see which animal guide mirrors you, and which ones came close behind.",
  ),
  snapshot: [
    "Your animal guide: the Dolphin, playful, social and joyful",
    "You make friends easily and lift every room you enter",
    "Connection and laughter are your favorite fuels",
    "You read emotions well and help people feel included",
    "Your growth edge: making peace with quiet and harder feelings",
  ],
  deep: [
    {
      title: "Your dolphin story",
      teaser:
        "Picture a pod of dolphins racing alongside a boat, leaping and twisting for no reason except the sheer joy of it. Your answers carry that same exuberant energy.",
      body: p(
        "Dolphins are some of the most playful animals on Earth. They ride waves, toss seaweed, chase each other and seem to enjoy company for its own sake. They're also clever and deeply social, staying in close contact with their pods through constant sound and movement.",
        "Your picks suggest you share that spirit. You likely feel most alive when you're with people: laughing, talking or doing something fun together. You may be the one who starts the game, gets everyone singing or turns an ordinary day into a memorable one.",
        "People who match the Dolphin often have strong emotional intelligence. You read moods quickly and know how to lift them. You might sense when someone feels left out and pull them into the conversation. You make people feel welcome without even trying.",
        "Communication is one of your gifts. You probably love talking, texting, sharing stories and keeping in touch. Your group chats are lively, and you're often the connector who introduces friends to each other. You might be the one who remembers everyone's birthday, starts the group chat and keeps it alive.",
        "There's also a deeper side to your story. Dolphins have been seen supporting injured pod members and staying close in difficult times. Under your playfulness, you're likely deeply caring and loyal.",
        "Your story is about joy as a way of life. Not shallow fun, but real delight in being alive and connected. In a world that often feels heavy, you remind people that lightness is possible, and that it's better when it's shared.",
      ),
    },
    {
      title: "Your dolphin strengths",
      teaser:
        "Your greatest strength is your ability to connect. You make strangers feel like friends and friends feel like family.",
      body: p(
        "Dolphin types bring strengths that make them excellent friends, teammates and community builders. Here are the ones your answers highlight.",
        list(
          "Warmth. People feel comfortable around you almost instantly. You make others feel welcome and liked.",
          "Playfulness. You bring fun into ordinary moments, which keeps groups energized and happy.",
          "Emotional intelligence. You read feelings well and respond with kindness. You know when to joke and when to listen.",
          "Communication. You express yourself clearly and enjoy sharing ideas, stories and encouragement.",
          "Team spirit. You love working and playing with others, and you bring out the best in groups.",
          "Optimism. You tend to see the bright side and help others see it too.",
          "Inclusion. You notice who's on the edges and bring them into the middle.",
        ),
        "These strengths shine in teams, events, teaching, hospitality, performing, community work and any setting where people need to feel connected. Many dolphin types are natural hosts, organizers and morale-boosters.",
        "Your deepest strength may be the way you make people feel they belong. You notice the newcomer, include the quiet one and celebrate everyone's wins. Groups with a dolphin in them tend to be kinder and happier.",
        "Your joy is not a small thing. Laughter, play and connection help people cope with stress, build friendships and enjoy life. Many dolphin types underestimate this because it comes so easily. But ask the people around you, and they'll tell you the room is different when you're in it. Your energy is a resource, and it's worth using wisely.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Dolphin's shadow is the surface: staying in the bright, sparkly shallows so you never have to dive into deeper, darker water.",
      body: p(
        "Every animal guide has a shadow side. For dolphins, it often comes from your love of lightness and connection. Here's how it can show up.",
        list(
          "Avoiding hard feelings. You might use fun, busyness or socializing to avoid sadness, fear or conflict. The feelings don't go away; they just wait.",
          "Fear of being alone. Solitude can feel uncomfortable or even scary. You might fill every quiet moment with people or noise.",
          "Spreading yourself thin. With so many friends and invitations, you might say yes to everything and end up exhausted.",
          "Needing approval. Because you care so much about connection, rejection can sting. You may change yourself to keep people happy.",
          "Wide but shallow. You know lots of people, but you might feel that few of them truly know you.",
        ),
        "In real life, it might look like a packed calendar, and a strange emptiness on the rare night when nothing is planned.",
        "These patterns come from a heart that loves people. That's beautiful. But even dolphins need to dive deep sometimes.",
        "The work for dolphins is learning to stay with the quiet and the difficult. Let yourself feel sad without rushing to cheer up. Spend time alone and discover that you're good company. Choose a few friendships to deepen rather than many to maintain.",
        "A helpful question when you feel restless: 'Am I looking for connection, or avoiding something?' If it's avoidance, try sitting with the feeling for five minutes. You might find that what's under the surface is less scary, and more interesting, than you thought.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love out loud and in good company. Your friends feel celebrated, included and never, ever bored.",
      body: p(
        "Dolphin types love with enthusiasm and warmth. You make the people in your life feel special, and you love shared experiences: trips, parties, adventures and late-night talks.",
        "In friendships, you're the connector and the fun one. You organize meetups, keep group chats lively and remember to invite everyone. You're also a good emotional support, because you read feelings well and respond with kindness and humor.",
        "In close relationships, you want fun, affection and lots of communication. You thrive with someone who enjoys a social life with you but also offers a calm, safe place to come home to. Long silences or emotional distance can make you anxious.",
        "How you show love:",
        list(
          "Quality time: doing things together and making memories",
          "Words: encouragement, compliments, check-in messages",
          "Play: inside jokes, games, spontaneous fun",
          "Inclusion: bringing people into your circle and making them part of it",
          "Celebration: making a big, happy fuss over other people's wins",
        ),
        "What you need in return is warmth, responsiveness and shared joy. You flourish with people who match your playfulness but also help you feel safe enough to show your deeper emotions.",
        "Your growth tip: invite people into your quieter side. Share your worries and sadness as well as your laughter. And when a friend needs quiet, try to see it as something they need, not a rejection. Sometimes the most loving thing a dolphin can do is float calmly beside someone. The friends who see all of you, bright and deep, will become your truest pod.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Lion and the Wolf, and the solitary Octopus might teach you more than you'd ever expect.",
      body: p(
        "Here's how dolphin energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Lion: A fellow sun-lover. Lions share your warmth and love of being with people. Together you can light up any party, team or adventure.",
          "Wolf: A fellow group animal. Wolves live in packs the way you live in pods. They share your loyalty and add steady protection to your playful spirit.",
        ),
        "Your growth match",
        list(
          "Octopus: Octopuses are solitary, curious and inventive, happy alone in a way you might find puzzling. An octopus friend can teach you the joy of independent exploration and deep focus. You can show them how good it feels to share discoveries with others.",
        ),
        "Your spicy pairing",
        list(
          "Bear: Bears love their dens and their quiet. Your constant invitations might overwhelm them, and their need for solitude might feel like rejection to you. But a bear can teach you the comfort of rest, and you can coax them into a little more fun. Respect their 'no', and they'll say 'yes' more often.",
        ),
        "Easy company",
        list(
          "Foxes and butterflies: foxes match your humor and butterflies match your sense of fun and color, so you'll rarely run out of things to laugh about.",
        ),
        "Other dolphins",
        list(
          "Two dolphins together will have endless fun and plenty to talk about. Just make sure someone occasionally suggests a quiet night in.",
        ),
        "The animals that challenge you most can help you grow deeper. Keep your sunny allies close for joy, and let the quieter ones show you the beauty of stillness. A dolphin who can enjoy both the party and the quiet swim home will never feel lost at sea.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to dive deep: to explore the quieter, stiller waters of your own mind and heart.",
      body: p(
        "Dolphins spend most of their time near the surface, but they can dive surprisingly deep when they need to. Your challenge this year is to practice that kind of diving, both emotionally and creatively.",
        "You're already brilliant at connection and joy. This year is about adding depth, so your relationships, your interests and your sense of self have roots as well as sparkle.",
        "Here's your challenge plan:",
        list(
          "Spend one evening a week alone, on purpose. Read, create, walk or reflect. Notice what you enjoy when no one else is around.",
          "Choose three friendships to deepen. Have at least one heart-to-heart with each of them this year.",
          "When a hard feeling comes up, give it five minutes before reaching for a distraction. Name it. Write it down if you can.",
          "Pick one solo project or hobby, like an instrument, drawing or writing, and commit to it for three months.",
          "Practice saying no to some invitations so you have energy for the ones that matter most.",
          "At the end of each month, reflect: what did I discover about myself when it was quiet?",
          "Try one activity you can only do alone, like a solo walk, journaling or learning a song, and notice how it feels.",
        ),
        "By the end of the year, you'll likely find that your joy has grown richer, not smaller. You'll still be the life of the party, but you'll also know how to float peacefully on your own. That's the dolphin at its best: playful on the surface, deep below and at home in both.",
      ),
    },
  ],
};
