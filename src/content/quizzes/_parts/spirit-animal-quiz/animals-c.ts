import type { Outcome } from "@/lib/engine/types";

/** Spirit Animal Quiz outcomes: Turtle, Butterfly, Horse, Octopus. Copy says "animal guide", never "spirit animal". */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const turtle: Outcome = {
  key: "turtle",
  name: "The Turtle",
  tagline: "Slow, steady and carrying home wherever you go.",
  emoji: "🐢",
  summary:
    "Your animal guide is the Turtle: patient, steady and carrying a calm sense of home wherever you go. You play the long game, protect your inner world and keep moving forward when others burn out.",
  about: p(
    "The Turtle as an animal guide stands for patience, steadiness and resilience. Turtles are known for their slow, deliberate movement and their protective shells, which let them carry a kind of home wherever they go. Some species live remarkably long lives, and many sea turtles travel vast distances across the oceans. That makes the turtle a symbol of endurance, quiet wisdom and the long game.",
    "People who get the Turtle in this quiz tend to pick planning the route with a backup, a perfect seashell, a cabin with smoke curling from the chimney, 'No rush' and the quiet path home. They tend to be calm, reliable and thoughtful, preferring steady progress to quick wins.",
    "The Turtle's strengths include patience, persistence, calm and quiet wisdom. Its growth areas usually involve openness and pace: coming out of your shell to share yourself, embracing change when it's needed and not letting caution stop you from taking good risks.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Turtle, patient, steady and resilient",
    "You prefer steady progress to quick, flashy wins",
    "You carry a calm sense of home wherever you go",
    "People trust your reliability and quiet wisdom",
    "Your growth edge: coming out of your shell to try new things",
  ],
  deep: [
    {
      title: "Your turtle story",
      teaser:
        "Somewhere on a moonlit beach, a sea turtle is making its way back toward the water: slowly, steadily, never stopping. Your answers carry that same unhurried determination.",
      body: p(
        "In the old fable, the tortoise wins the race not by being fast but by never stopping. The story has lasted for thousands of years because it captures something true: steady effort often beats bursts of speed.",
        "Your picks suggest you live by that truth. You probably prefer to take your time, think things through and make progress step by step. You might not be the first to finish, but you're rarely the one who gives up halfway.",
        "People who match the Turtle often carry a strong sense of inner home. Like a turtle's shell, you have a calm center you can retreat into when the world gets loud. You likely value routines, familiar places and people you've known for a long time.",
        "There's quiet wisdom in your story. Turtles have been around since the age of the dinosaurs, and they've lasted by being patient and adaptable. You may have a long-term perspective that helps you stay calm when others panic. You know that most storms pass.",
        "You're also more adventurous than people assume. Sea turtles cross whole oceans, and many return to the very beaches where they hatched. You might have big journeys in you too, taken at your own pace, with a strong sense of where home is.",
        "Your story is about endurance and calm. In a world obsessed with speed, you show that slow and steady isn't just okay; it's powerful. People trust you because you're consistent, and your quiet persistence often gets you further than anyone expected.",
      ),
    },
    {
      title: "Your turtle strengths",
      teaser:
        "Your greatest strength is staying power. You keep going long after the excitement fades, and that's where real results are made.",
      body: p(
        "Turtle types bring strengths that make them reliable, wise and deeply resilient. Here are the ones your answers point to.",
        list(
          "Patience. You can wait for the right moment without getting frustrated. That helps you make better decisions.",
          "Persistence. You keep going when others quit. Long projects, slow skills and lasting friendships are your specialty.",
          "Calm. You stay steady in stressful situations, which helps the people around you relax.",
          "Reliability. When you say you'll do something, you do it. People know they can count on you.",
          "Self-protection. You know how to guard your energy and retreat when you need to recharge.",
          "Long-term thinking. You consider consequences and plan for the future, not just the present.",
          "Resilience. Setbacks slow you down, but they rarely stop you. Like a shell, your calm protects you through hard seasons.",
        ),
        "These strengths shine in anything that rewards consistency: crafts, research, gardening, long-distance sports, music practice, caregiving and any long-term project. Many turtle types become quietly excellent at things simply because they never stopped practicing.",
        "Your deepest strength may be the stability you give others. In a changing world, you're a fixed point people can rely on. Friends come back to you because you're always there, always steady, always yourself.",
        "Some of the most impressive things in the world, from old forests to great cathedrals, were built slowly. You understand that kind of patience in your bones. Trust it, especially when the world tells you to hurry. Slow progress is still progress, and you're further along than you think.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Turtle's shadow is the shell: the habit of pulling inside and staying there, even when the world outside is safe and full of good things.",
      body: p(
        "Every animal guide has a shadow side. For turtles, it often comes from your love of safety and steadiness. Here's how it can show up.",
        list(
          "Retreating too quickly. When things feel uncomfortable, you might pull into your shell and stay there, avoiding people or problems.",
          "Resisting change. You like what's familiar. New situations, ideas or routines can feel threatening, even when they'd be good for you.",
          "Overcaution. You might miss opportunities because you're waiting for the perfect moment or more certainty.",
          "Hiding feelings. You may keep your emotions tucked away, so people don't know when you're struggling.",
          "Stubbornness. Your steady nature can harden into rigidity. Once you've decided something, it can be hard to change course.",
        ),
        "In real life, it might look like turning down an exciting invitation because it feels like a lot, then wondering later what you missed. Or saying 'I'm fine' long after you stopped being fine.",
        "These patterns come from a deep need for safety. That's understandable and human. But a shell is meant to protect you, not to trap you.",
        "The work for turtles is learning to poke your head out a bit more often. Share how you feel before it builds up. Say yes to something new, even if it makes you nervous. Change your mind when new information arrives.",
        "A helpful question: 'Am I being patient, or am I avoiding?' Patience waits for the right time. Avoidance waits forever. When you can tell the difference, you'll find the courage to move forward at your own steady pace.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love slowly and steadily, and once someone's in your life, they tend to stay there for decades.",
      body: p(
        "Turtle types love with loyalty and consistency. You may take a while to open up to someone new, but once you do, your affection is deep and lasting. You're the friend people still call twenty years later.",
        "In friendships, you're dependable and calm. You show up, listen, offer gentle advice and stay steady when others are going through chaos. You prefer a few close friends to big, busy social circles. You may also be the keeper of your friend group's history, the one who remembers how everyone met.",
        "In close relationships, you value trust, routine and emotional safety. You show love through consistency: being there, keeping promises and building shared rituals over time. Grand gestures matter less to you than knowing you can count on each other.",
        "How you show love:",
        list(
          "Consistency: being reliably present over months and years",
          "Patience: giving people time to grow and change",
          "Shared routines: the weekly walk, the regular call, the favorite meal",
          "Quiet support: sitting with someone without needing to fix anything",
          "Keeping memories: photos, old notes and stories from years ago",
        ),
        "What you need in return is patience, trust and respect for your pace. You thrive with people who don't rush you and who value long-term connection over quick excitement.",
        "Your growth tip: share your inner world more often. Turtles can be so private that people don't know what's going on inside. Let the people you love see your feelings, your hopes and your worries. The shell can open, and the relationship will be stronger for it.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Bear and the Owl, and the high-flying Eagle might be the friend who helps you dream bigger.",
      body: p(
        "Here's how turtle energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Bear: A fellow homebody. Bears share your love of comfort, calm and rest. Together you'll enjoy slow evenings, good food and easy, deep companionship.",
          "Owl: A fellow deep thinker. Owls share your patience and thoughtfulness. Your conversations will be long, rich and unhurried.",
        ),
        "Your growth match",
        list(
          "Eagle: Eagles soar high and dream big. An eagle friend can help you see the bigger picture and set bolder goals, and might even help you notice how far you've already come. In return, you'll teach them the power of patience and steady progress.",
        ),
        "Your spicy pairing",
        list(
          "Horse: Horses love speed, freedom and constant motion. Their restlessness might stress you out, and your pace might frustrate them. But a horse can show you the thrill of running free, and you can teach them the peace of slowing down. Agree on a pace before any trip, and you'll both enjoy it more.",
        ),
        "Easy company",
        list(
          "Deer and wolves: deer share your gentle, unhurried way of caring, and wolves share your deep loyalty. Both appreciate how steady and reliable you are.",
        ),
        "Other turtles",
        list(
          "Two turtles together create a calm, loyal and lasting friendship. Just make sure at least one of you occasionally suggests trying something new.",
        ),
        "The animals that challenge you most can help you grow. Keep your steady allies close for comfort, and let the faster, bolder animals pull you gently out of your shell. A turtle with both kinds of friends moves slowly but goes far.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to swim toward something new: one brave, deliberate journey beyond your familiar shore.",
      body: p(
        "Sea turtles are slow on land but graceful in the water, where they can travel enormous distances. Your challenge this year is to find your water: the place where your steady nature carries you further than you thought possible.",
        "You're already patient and resilient. This year is about using those strengths for a bigger adventure, one you choose, plan and take at your own pace.",
        "Here's your challenge plan:",
        list(
          "Choose one goal that feels a little bigger than usual, like a new skill, a trip or a creative project. Break it into small monthly steps.",
          "Say yes to one new experience each season, even if it makes you nervous.",
          "Share one personal feeling or hope with someone you trust each month.",
          "When you notice yourself retreating into your shell, ask: 'Is this rest or avoidance?' If it's avoidance, take one small step forward.",
          "Update one old habit that no longer serves you. Change can be slow and still be real.",
          "Find a pace partner: someone who'll walk, study or practice with you regularly, so your steady progress has company.",
          "Keep a list of small wins and read it when you feel stuck.",
          "Once a season, look back at where you were three months ago. Turtles rarely notice how far they've traveled until they look behind them.",
        ),
        "By the end of the year, you may find you've traveled further than you ever expected: not in a rush, but step by step. That's the turtle's secret. Slow and steady doesn't just win the race. It crosses oceans.",
      ),
    },
  ],
};

export const butterfly: Outcome = {
  key: "butterfly",
  name: "The Butterfly",
  tagline: "Always becoming, and beautiful at every stage.",
  emoji: "🦋",
  summary:
    "Your animal guide is the Butterfly: creative, changeable and always becoming something new. You see beauty everywhere, embrace reinvention and remind everyone that transformation can be gorgeous.",
  about: p(
    "The Butterfly as an animal guide stands for transformation, creativity and lightness. Butterflies go through one of nature's most dramatic changes, from caterpillar to chrysalis to winged adult, and some, like the monarch, make migrations so long they take several generations to complete. That makes the butterfly a natural symbol for change, growth and the beauty of becoming.",
    "People who get the Butterfly in this quiz tend to choose a garden gate covered in flowers, sun and rain at the same time, 'Begin again' and hoping people say they keep growing. They often love creativity, change and new experiences, and they tend to be open-minded, expressive and quick to see beauty in small things.",
    "The Butterfly's strengths include adaptability, creativity, optimism and a gift for growth. Its growth areas usually involve grounding and follow-through: staying with things long enough to see them bloom, and finding a steady center amid constant change.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Butterfly, creative, changeable and hopeful",
    "You embrace change and love reinventing yourself",
    "You notice beauty in small, everyday things",
    "Your optimism helps others believe in new beginnings",
    "Your growth edge: staying with things long enough to see them bloom",
  ],
  deep: [
    {
      title: "Your butterfly story",
      teaser:
        "Every butterfly begins as something completely different, rebuilds itself inside a chrysalis and emerges with wings. Your answers suggest you understand that kind of change from the inside.",
      body: p(
        "The life of a butterfly is one of the most remarkable stories in nature. A caterpillar eats and grows, then wraps itself in a chrysalis, where its body is broken down and rebuilt. What comes out looks nothing like what went in. Change isn't a side effect of its life. Change is its life.",
        "Your picks suggest you share that relationship with transformation. You may love new beginnings, fresh starts and the thrill of becoming someone new. Haircuts, rearranged rooms, new hobbies, new looks, new ideas: you're drawn to the energy of reinvention. Your style may change with the seasons, and that's not fickleness. It's how you explore who you are.",
        "People who match the Butterfly often have a strong creative streak. You might love art, fashion, music, design, writing or anything that lets you play with color and beauty. You notice details others miss: the way light falls on a wall, the pattern on a leaf, the mood of a song.",
        "There's optimism in your story too. You may naturally believe things can get better. When friends are stuck, you're the one who says, 'What if you tried something completely different?'",
        "You're also stronger than you seem. Monarch butterflies fly thousands of miles on their migration, a journey so long it takes several generations to complete. Behind the delicacy, there's resilience.",
        "Your story is about becoming. You're not finished, and you don't want to be. You see life as a series of transformations, each one revealing a new version of yourself. That openness is rare and beautiful, and it gives others permission to grow too.",
      ),
    },
    {
      title: "Your butterfly strengths",
      teaser:
        "Your greatest strength is your openness to change. Where others cling to the familiar, you're ready to spread new wings.",
      body: p(
        "Butterfly types bring strengths that make them creative, adaptable and inspiring. Here are the ones your answers point to.",
        list(
          "Adaptability. You handle change well, often better than the people around you. New situations feel exciting rather than scary.",
          "Creativity. You see possibilities, play with ideas and express yourself through color, style, art or imagination.",
          "Optimism. You believe things can improve, and that belief helps you and others keep going.",
          "An eye for beauty. You notice and create beauty in everyday life, from a well-arranged shelf to a perfectly chosen outfit.",
          "A growth mindset. You see mistakes and endings as part of the journey, not the end of the story.",
          "Lightness. You bring a gentle, uplifting energy that makes heavy moments feel easier.",
          "Encouragement. You help people believe they can change, because you've done it yourself.",
        ),
        "These strengths shine in creative fields, design, fashion, the arts, teaching, coaching and any role involving change or new ideas. Many butterfly types become the friend who helps others through big transitions, like moves, breakups or new chapters.",
        "Your deepest strength may be the hope you carry. When someone thinks they're stuck forever, you remind them that change is possible. That message can be life-changing.",
        "Use your gift for transformation generously. Help others see that endings can be beginnings, and that the chrysalis, uncomfortable as it is, leads somewhere beautiful. And remember that your own changes count too. Every time you reinvent yourself with kindness and courage, you show someone else they're allowed to do the same.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Butterfly's shadow is restlessness: flitting from flower to flower so quickly that nothing has time to take root.",
      body: p(
        "Every animal guide has a shadow side. For butterflies, it often grows from your love of change. Here's how it can show up.",
        list(
          "Restlessness. Once something feels familiar, you might want to move on, leaving projects, hobbies or plans unfinished.",
          "Skipping the chrysalis. Transformation involves an uncomfortable middle stage. You might love the idea of change but avoid the slow, messy work it takes.",
          "Scattered energy. With so many interests and ideas, it can be hard to focus on one long enough to see it through.",
          "Shape-shifting identity. You might change yourself so often to match new places or people that you lose track of who you really are.",
          "Sensitivity to criticism. Harsh words can sting deeply, and you might reinvent yourself just to escape them.",
        ),
        "In real life, it might look like a drawer of half-finished projects, or a new look every month and a quiet worry that none of them is really you.",
        "These patterns come from a curious, open heart. That's a gift. But constant change without roots can leave you feeling unsettled.",
        "The work for butterflies is learning to stay in the chrysalis long enough. Pick one project and see it through the boring middle. Notice the parts of yourself that stay the same through every reinvention; those are your roots. Let some things be stable, so other things can change freely.",
        "A helpful question: 'Am I growing, or am I running?' Growth moves toward something. Running moves away. When you can tell the difference, your transformations will become more meaningful, and more lasting.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love with color and curiosity. Your friends never stay quite the same around you, because you inspire them to grow.",
      body: p(
        "Butterfly types love with lightness, creativity and encouragement. You bring fresh energy into people's lives and help them see new possibilities for themselves.",
        "In friendships, you're the inspirer and the one who suggests new adventures. You might introduce friends to new music, styles, places and ideas. You're also a wonderful support during big life changes, because you understand transformation from the inside. You're often the first to notice when a friend is ready for something new.",
        "In close relationships, you need freedom, creativity and growth. You thrive with people who support your changes and enjoy evolving alongside you. Rigid expectations, or someone who wants you to stay exactly the same, can make you feel trapped.",
        "How you show love:",
        list(
          "Encouragement: helping people believe in who they could become",
          "Creativity: thoughtful gifts, handmade things, beautiful experiences",
          "Adventure: suggesting new places, activities and experiences",
          "Lightness: humor and joy that make hard times easier",
          "Celebrating growth: noticing and naming how much someone has changed",
        ),
        "What you need in return is acceptance, room to grow and appreciation for your creativity. You flourish with people who celebrate your changes rather than resist them.",
        "Your growth tip: show up consistently, even through the dull seasons. Butterflies can drift when things feel routine, but the deepest relationships often grow in quiet, ordinary moments. Stay through those, and you'll discover a different kind of beauty. It also helps to tell the people you love which parts of you will never change: your loyalty, your care, your favorite silly joke. It helps them feel safe while you keep growing.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Octopus and the Deer, and the steady Wolf might be the friend who gives your wings somewhere to come home to.",
      body: p(
        "Here's how butterfly energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Octopus: A fellow shape-shifter. Octopuses can change color and texture in an instant, and they're endlessly inventive. Together you'll explore, experiment and reimagine everything. They'll make your dreams work; you'll make their inventions beautiful.",
          "Deer: A fellow gentle soul. Deer share your sensitivity and love of beauty. You'll find magic in quiet mornings, flower fields and long, heartfelt conversations.",
        ),
        "Your growth match",
        list(
          "Wolf: Wolves value loyalty, routine and belonging, which may feel restrictive to you at first. But a wolf friend can show you the beauty of staying and building something that lasts, and you can help them embrace change without fear. In time, you may each realize the other was exactly what you needed.",
        ),
        "Your spicy pairing",
        list(
          "Eagle: Eagles are focused, goal-driven and sometimes impatient with flitting. They might find you scattered; you might find them rigid. But an eagle can help you land your dreams, and you can show them the joy of exploring without a fixed plan.",
        ),
        "Easy company",
        list(
          "Dolphins and foxes: both love play and surprises as much as you do, and they're always up for trying the new idea you just had.",
        ),
        "Other butterflies",
        list(
          "Two butterflies together create a world of color, ideas and change. Just make sure at least one of you finishes the project you started together.",
        ),
        "The animals that challenge you most can help you grow roots to match your wings. A butterfly with both can go anywhere and still know where home is.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to stay in the chrysalis: to commit to one transformation fully, through the messy middle, until it's complete.",
      body: p(
        "Butterflies don't skip the chrysalis. That quiet, enclosed stage, when nothing seems to be happening on the outside, is where the real transformation takes place. Your challenge this year is to honor that stage in your own life.",
        "You love beginnings, and you're brilliant at fresh starts. This year is about finishing: choosing one change and seeing it all the way through, even when it gets slow, uncomfortable or boring.",
        "Here's your challenge plan:",
        list(
          "Choose one meaningful transformation, like a skill, a habit, a creative project or a personal goal, and commit to it for the whole year.",
          "Break it into seasons: one season to start, one to build, one to deepen and one to finish.",
          "When you feel the urge to switch to something new, write the idea on a 'later' list instead of acting on it right away.",
          "Notice the parts of yourself that stay constant through all your changes. Write them down. They're your roots.",
          "Share your progress with a friend every month. A little accountability helps butterflies stay the course.",
          "At the end of the year, celebrate the finished transformation and look at how far you've come.",
          "Pick one anchor habit, like a morning walk or a weekly call, that stays the same all year while everything else changes.",
        ),
        "By the end of the year, you'll know something many people never learn: the deepest changes take time, patience and trust. And you'll have proof that you can stay with something long enough to see it bloom. That's a butterfly at full strength: not just beautiful, but truly transformed.",
      ),
    },
  ],
};

export const horse: Outcome = {
  key: "horse",
  name: "The Horse",
  tagline: "Wild heart, open road and a need to run free.",
  emoji: "🐎",
  summary:
    "Your animal guide is the Horse: free-spirited, energetic and made for the open road. You need room to run, you love the thrill of the journey, and you're loyal to anyone who earns your trust.",
  about: p(
    "The Horse as an animal guide stands for freedom, energy and adventure. Horses are powerful, fast animals that live in herds and have a strong instinct to move. Across much of the world, the horse has symbolized freedom, travel and wild spirit, as well as loyalty and partnership.",
    "People who get the Horse in this quiz tend to pick a map to somewhere unexplored, a long walk with no plan, a straight road to the horizon, being the driver on the trip and taking a sad friend somewhere new. They're often adventurous, active and restless, with a strong need for independence and new experiences.",
    "The Horse's strengths include energy, courage, loyalty and a talent for movement and adventure. Its growth areas usually involve stillness and commitment: learning to rest without guilt, staying put long enough to build roots and handling the feeling of being fenced in with patience.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you, and which came close behind.",
  ),
  snapshot: [
    "Your animal guide: the Horse, free-spirited, energetic and adventurous",
    "You need room to move, explore and breathe",
    "Road trips, open spaces and new places recharge you",
    "Once someone earns your trust, you're loyal for life",
    "Your growth edge: resting without guilt and staying through the slow parts",
  ],
  deep: [
    {
      title: "Your horse story",
      teaser:
        "Picture a herd of wild horses racing across an open plain, manes flying, the ground drumming beneath them. Your answers carry that same restless, joyful energy.",
      body: p(
        "There's something about horses that stirs people. Maybe it's their power, their speed or the sense of freedom they bring to mind. Wild horses roam wide spaces, and even horses that live with people seem happiest when they can run.",
        "Your picks suggest you share that spirit. You probably feel most alive when you're moving: traveling, exploring, walking, dancing, riding with the windows down. Stillness can feel uncomfortable, and being stuck in one place for too long might make you restless. Fences, whether they're schedules, rules or expectations, tend to make you want to jump them.",
        "People who match the Horse tend to crave adventure. You might be the first to suggest a road trip, the one who loves trying new places and the friend with a 'let's just go' attitude. Maps, open roads and horizons call to you. Even on ordinary days, you may take the long way home just to see something different.",
        "You're also more loyal than people might expect. Horses live in herds and form strong bonds. Once someone earns your trust, you're steady and devoted. You'll carry friends through hard times and run alongside them toward their goals.",
        "There's sensitivity under your energy, too. Horses are alert, perceptive animals that pick up on moods and changes quickly. You may be more emotionally tuned in than your adventurous side suggests.",
        "Your story is about freedom with heart. You need space to run, but you also need a herd to run with. When you have both, you're unstoppable: energetic, joyful and ready to carry yourself and others toward something new.",
      ),
    },
    {
      title: "Your horse strengths",
      teaser:
        "Your greatest strength is momentum. When life needs someone to get moving, you're already halfway down the road.",
      body: p(
        "Horse types bring strengths that make them energetic, adventurous and dependable companions. Here are the ones your answers point to.",
        list(
          "Energy. You have a natural drive that gets things moving, and you bring enthusiasm to plans, trips and projects.",
          "Adventurousness. New places and experiences excite you. You're willing to try things others might avoid.",
          "Independence. You trust yourself to find your way, even on unfamiliar roads.",
          "Loyalty. Once you've bonded with someone, you're steady and devoted. Your friends know you'll show up.",
          "Courage. You're willing to leap fences, literally or not, to reach something you want.",
          "Physical vitality. Many horse types love sports, hiking, dancing or anything that gets the body moving.",
        ),
        "These strengths shine in travel, outdoor work, sports, exploring, starting new things and any role that needs energy, courage and a willingness to go first. Many horse types become the adventurous friend who makes everyone's world bigger.",
        "Your deepest strength may be the way you inspire others to move. When someone feels stuck, your energy can get them going. When a group is hesitating, your 'let's go' breaks the spell. And because you're loyal, your adventures are rarely solo for long. People want to come along, because they trust you'll get everyone there, and back again.",
        "Remember that your energy is a gift, not a demand. You don't have to be on the move every moment to matter. Some of your best strength shows up when you choose where to run, and who to run with.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Horse's shadow is the bolt: the urge to run the moment things feel fenced in, uncomfortable or too still.",
      body: p(
        "Every animal guide has a shadow side. For horses, it often comes from your love of freedom and movement. Here's how it can show up.",
        list(
          "Restlessness. When life feels routine, you might get bored, irritable or desperate for change.",
          "Running from problems. When things get uncomfortable, your instinct might be to leave rather than stay and work it out.",
          "Trouble resting. Stillness can feel like wasted time. You might push through tiredness until you burn out.",
          "Fear of commitment. Long-term commitments, like a team, a place or a relationship, can feel like fences closing in.",
          "Impulsiveness. You might make big decisions quickly and deal with the consequences later.",
        ),
        "In real life, it might look like quitting a club the moment it gets dull, or planning an escape trip instead of having a hard conversation.",
        "These patterns come from a spirit that values freedom. That's beautiful. But freedom isn't only about running. Sometimes it's about choosing to stay.",
        "The work for horses is learning that rest, roots and commitment can make you stronger, not weaker. A well-rested horse can run further. A horse with a trusted herd feels safer to explore. A horse that stays through a hard moment often finds a better path than running would.",
        "A helpful question when you feel the urge to bolt: 'Am I running toward something, or away from something?' If it's toward, go with joy. If it's away, pause and ask what you might be avoiding. The answer might set you freer than any open road.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love with energy and loyalty. Your friends are your herd, and you'd run through anything to stay by their side.",
      body: p(
        "Horse types love actively and adventurously. You show affection through shared experiences, loyalty and energy. You're happiest when the people you love are on the journey with you. Your friends may not always know where you're headed next, but they know you'll come back for them.",
        "In friendships, you're the adventure-starter. You suggest trips, outings and new experiences. You're loyal and supportive, and you'll show up in person when someone needs help, whether that's crossing town, helping someone move or joining them for a run.",
        "In close relationships, you need freedom and partnership. You thrive with someone who loves adventure but also respects your independence. Feeling controlled or trapped can make you pull away, but feeling trusted and free makes you incredibly devoted.",
        "How you show love:",
        list(
          "Shared adventures: trips, outings, new experiences together",
          "Showing up: helping out, being there in person",
          "Loyalty: standing by people through thick and thin",
          "Energy: lifting people's spirits and getting them moving",
          "Spontaneity: the surprise day trip or the 'get in, we're going' text",
          "Movement together: walks, runs or rides side by side",
        ),
        "What you need in return is freedom, trust and companionship. You flourish with people who enjoy movement and exploring, and who give you space to roam while staying connected.",
        "Your growth tip: learn to love in stillness as well as motion. Some of the deepest moments in any relationship happen during quiet evenings, slow mornings and ordinary routines. Let yourself enjoy those too. Your herd will feel even closer when you're willing to rest beside them.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Eagle and the Deer, and the quiet Owl might be the friend who helps you find stillness.",
      body: p(
        "Here's how horse energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Eagle: A fellow lover of open space. Eagles share your need for freedom and horizons. Together you'll plan big adventures and chase ambitious goals.",
          "Deer: A fellow gentle, alert spirit. Deer share your sensitivity and grace. They'll help you notice the beauty along the way, and you'll encourage them to run free.",
        ),
        "Your growth match",
        list(
          "Owl: Owls love stillness, books and quiet reflection. An owl might seem like your opposite, but they can teach you the power of pausing, thinking and resting. You'll get them out into the fresh air, and you may be surprised how much you enjoy their calm company after a long run.",
        ),
        "Your spicy pairing",
        list(
          "Turtle: Turtles love a slow, steady pace and familiar routines. Their caution might frustrate you, and your restlessness might stress them out. But a turtle can show you the beauty of slowing down, and you can help them take brave new steps. Agree on a pace before a trip and you'll both enjoy it more.",
        ),
        "Other horses",
        list(
          "Two horses together make for endless adventures and energy. Just make sure at least one of you remembers to rest and plan.",
        ),
        "The animals that challenge you most can help you grow. Keep your adventurous allies close for joy, and let the calmer ones teach you the strength of stillness. A horse with both kinds of friends knows when to gallop and when to graze.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to stay in the field: to find freedom not in running away, but in fully committing to where you are.",
      body: p(
        "Horses are famous for running, but they also spend long, peaceful hours grazing, resting and bonding with their herd. Your challenge this year is to explore that quieter side of horse life.",
        "You already know how to move. This year is about learning how to stay: to rest, commit and build something that lasts, without losing your wild spirit.",
        "Here's your challenge plan:",
        list(
          "Choose one commitment, like a skill, a team, a project or a place, and stay with it through the whole year, even when it feels slow.",
          "Build rest into every week: a slow morning, a lazy afternoon or an early night. Treat it like training, not wasted time.",
          "When you feel the urge to run from something uncomfortable, wait one day before deciding. Ask what you might be avoiding.",
          "Plan one big adventure for the year, and make the planning part of the fun.",
          "Invest deeply in one friendship: regular check-ins, shared rituals and honest conversations.",
          "Try a still hobby, like meditation, drawing, reading or stretching, for one month.",
          "Learn to enjoy the journey as much as the destination. On your next trip, plan one long stop with nothing to do.",
          "Keep a restless list of places and ideas, so the urge to run has somewhere to go besides away.",
        ),
        "By the end of the year, you'll likely feel more grounded and still just as free. You'll have proof that commitment doesn't cage you. It gives you a home base to run from and return to. That's the horse at its strongest: wild at heart, steady in spirit and free by choice.",
      ),
    },
  ],
};

export const octopus: Outcome = {
  key: "octopus",
  name: "The Octopus",
  tagline: "Curious, inventive and one step ahead of the puzzle.",
  emoji: "🐙",
  summary:
    "Your animal guide is the Octopus: curious, inventive and endlessly resourceful. You love figuring things out, see solutions others miss and adapt to almost any situation with surprising creativity.",
  about: p(
    "The Octopus as an animal guide stands for curiosity, creativity and clever problem-solving. Octopuses are famous for their intelligence: they can solve puzzles, open jars, slip out of tanks and change color and texture to blend into their surroundings. Their flexible bodies and inventive minds make them a symbol of adaptability and ingenuity.",
    "People who get the Octopus in this quiz tend to choose taking something apart to see how it works, an old key to a locked door, turning invisible, 'Stay curious' and being known as someone who can figure out anything. They're often independent thinkers, tinkerers and creative problem-solvers who enjoy exploring ideas on their own terms.",
    "The Octopus's strengths include curiosity, inventiveness, adaptability and focus. Its growth areas usually involve connection and sharing: letting people into your world, collaborating instead of always going solo and not disappearing into projects for too long.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Octopus, curious, inventive and resourceful",
    "You love figuring out how things work",
    "You see creative solutions others miss",
    "You recharge with solo projects and deep focus",
    "Your growth edge: sharing your world and collaborating more",
  ],
  deep: [
    {
      title: "Your octopus story",
      teaser:
        "Deep in a rocky reef, an octopus is quietly unscrewing a jar lid just to see what's inside. Your answers suggest you know that kind of curiosity well.",
      body: p(
        "Octopuses are some of the most surprising creatures on the planet. They have three hearts and blue blood, and their arms can explore and react with remarkable independence. They solve puzzles, use tools, escape enclosures and change color in a flash. Everything about them says: curious, inventive, impossible to box in.",
        "Your picks suggest you share that spirit. You probably love figuring things out, whether it's a gadget, a game, a mystery or a tricky problem at school or work. When something doesn't make sense, you want to take it apart, understand it and maybe improve it. You might be the kind of person who reads the manual for fun, or ignores it entirely and works it out yourself.",
        "People who match the Octopus are often independent thinkers. You may enjoy working alone, getting lost in a project or exploring ideas without anyone looking over your shoulder. You might have hobbies others don't quite understand but that make perfect sense to you.",
        "There's a shape-shifting quality to your story too. Octopuses can blend into almost any background. You may be good at adapting as well: adjusting to new situations, people or challenges with quiet flexibility.",
        "Under your independence, there's often a playful streak. Octopuses have been seen playing with objects for no obvious reason, and you might bring a similar sense of experimental fun to everything you do.",
        "Your story is about curiosity without limits. You don't accept 'that's just how it is'. You want to know why, how and what if. That questioning mind can lead you to discoveries, inventions and ideas that change the way others see the world.",
      ),
    },
    {
      title: "Your octopus strengths",
      teaser:
        "Your greatest strength is your curiosity. Where others see a closed door, you see a lock waiting to be figured out.",
      body: p(
        "Octopus types bring strengths that make them excellent problem-solvers, inventors and independent thinkers. Here are the ones your answers point to.",
        list(
          "Curiosity. You want to understand how things work, why people behave the way they do and what's behind the obvious answer.",
          "Inventiveness. You come up with creative solutions, often using whatever's at hand in unexpected ways.",
          "Adaptability. You adjust to new situations and surroundings with quiet skill.",
          "Focus. When something captures your interest, you can concentrate deeply for long stretches.",
          "Independence. You trust your own judgment and enjoy working through problems on your own.",
          "Juggling. Like an octopus with eight arms, you can keep several projects or ideas going at once.",
          "Resourcefulness. You can make something useful out of almost anything.",
        ),
        "These strengths shine in science, engineering, technology, design, research, crafts and any field that rewards curiosity and creative problem-solving. Many octopus types become the person everyone calls when something is broken, confusing or 'impossible'.",
        "Your deepest strength may be your refusal to accept limits. When someone says it can't be done, you start wondering how it could be. That mindset leads to breakthroughs, big and small. And you don't need a lab or a workshop to be an inventor. Every time you find a smarter way to pack a bag, fix a glitch or explain a tricky idea, you're using your octopus gift.",
        "Share your discoveries generously. Your ideas can help others see new possibilities, and your curiosity can inspire people to start asking better questions.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Octopus's shadow is the hidden den: disappearing so deep into your own projects and thoughts that the people around you can't find you.",
      body: p(
        "Every animal guide has a shadow side. For octopuses, it often comes from your love of independence and focus. Here's how it can show up.",
        list(
          "Disappearing into projects. When you're absorbed, you might forget to eat, sleep or reply to messages for days.",
          "Going solo too often. You might prefer to solve everything yourself, even when teamwork would be faster or more fun.",
          "Camouflage. Like an octopus blending into rocks, you might hide your true thoughts and feelings to avoid attention or conflict.",
          "Too many arms in too many pots. Your curiosity can lead you to start lots of projects and finish few.",
          "Impatience with slower thinkers. When you see the solution quickly, it can be frustrating to wait for others.",
          "Treating people like puzzles. You may analyze friendships instead of simply enjoying them. Not everything needs solving.",
        ),
        "In real life, it might look like a friend saying, 'I haven't heard from you in weeks,' and realizing you've been deep in a project the whole time.",
        "These patterns come from a mind that loves to explore. That's a wonderful thing. But exploration is richer when it's shared.",
        "The work for octopuses is learning to come out of the den. Share your ideas before they're finished. Invite someone into your project. Let people see your real colors, not just your camouflage.",
        "A helpful question when you feel yourself disappearing: 'Who would I love to share this with?' Then send them a message. Connection doesn't have to interrupt your curiosity. Often, it sparks ideas you'd never find alone.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love through curiosity: asking the questions nobody else asks and remembering every strange, wonderful detail about the people you care about.",
      body: p(
        "Octopus types love in a thoughtful, inventive way. You might not be the most outwardly emotional person, but you show affection through attention, creativity and help.",
        "In friendships, you're the fascinating one, full of ideas, facts and projects. You enjoy deep, nerdy conversations and shared interests. You might show love by fixing a friend's laptop, sending them an article they'd love or making them something. Your friends know that when you get excited about something, they're about to learn something new.",
        "In close relationships, you need both a meeting of minds and personal space. You thrive with someone who's curious about your world and respects your need for solo time. Feeling pressured to be constantly available can make you retreat.",
        "How you show love:",
        list(
          "Solving problems: fixing, building, researching",
          "Sharing discoveries: articles, ideas, hobbies, strange facts",
          "Thoughtful, creative gifts made or chosen just for them",
          "Deep, curious conversations",
          "Problem-solving sessions: sitting with someone until their tricky thing finally makes sense",
        ),
        "What you need in return is respect for your independence, interest in your ideas and patience when you vanish into a project. You flourish with people who are curious too.",
        "Your growth tip: make your care visible. Octopus types often feel deeply but express it indirectly. Tell people what they mean to you in plain words. Check in even when you're busy; a quick message can mean as much to them as hours of help. And invite people into your projects. Teaching someone your favorite hobby, or building something side by side, can be one of the most loving things you do.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Fox and the Butterfly, and the social Dolphin might be the friend who draws you out of your den.",
      body: p(
        "Here's how octopus energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Fox: A fellow clever mind. Foxes share your love of puzzles and creative solutions. Together you'll invent, scheme and laugh, probably all at once. Just agree on who's cleaning up after the experiment.",
          "Butterfly: A fellow shape-shifter. Butterflies share your love of change and creativity. You'll make their dreams work, and they'll make your inventions beautiful.",
        ),
        "Your growth match",
        list(
          "Dolphin: Dolphins are social, playful and always surrounded by friends. A dolphin can teach you the joy of sharing ideas with a group, and you can show them the magic of deep focus and solo exploring. Say yes to one of their group plans, and bring something you made to share.",
        ),
        "Your spicy pairing",
        list(
          "Owl: This is the 'too alike' pairing. Owls are thoughtful, independent and brilliant, just like you. You'll have amazing conversations, but you might both retreat into your own projects and forget to reach out. Plan one standing hangout a month, or you might not see each other until next year.",
        ),
        "Other octopuses",
        list(
          "Two octopuses together can create incredible things. Just make sure you actually tell each other what you're working on.",
        ),
        "The animals that challenge you most can help you grow. Keep your clever allies close for inspiration, and let the social ones remind you that ideas grow best when they're shared. An octopus with friends all over the reef has more to explore than one alone ever could.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to build something with others: one project where your curiosity meets someone else's, and the result is bigger than either of you.",
      body: p(
        "Most octopuses live alone, but in a few places they've been found living close together in surprising little communities. Your challenge this year borrows from those rare gatherings: practice combining your inventive mind with other people's ideas.",
        "You're already brilliant at exploring alone. This year is about discovering what happens when you share the process, not just the results.",
        "Here's your challenge plan:",
        list(
          "Choose one shared project, like a club, a team build, a group creation or a challenge with friends, and commit to it for at least three months.",
          "Share one idea a week before it's finished. Ask for feedback, and really listen.",
          "Teach someone a skill you love. Explaining it will deepen your own understanding.",
          "Set a 'surface time' reminder: when you've been absorbed in a project for hours, take a break to connect with someone.",
          "Finish one project you've started before beginning a new one.",
          "Keep a curiosity journal of questions, ideas and experiments, and share your favorites with a friend each month.",
          "Join one group built around a curious hobby, like a coding club, a maker space or a puzzle group.",
          "Once a month, show someone a half-finished project and ask what they'd add.",
        ),
        "By the end of the year, you'll likely find that your ideas have grown in directions you couldn't have reached alone. You'll still love your solo time, but you'll know how much more is possible when you let others in. That's the octopus at its best: endlessly curious, wonderfully inventive and connected to the reef around it.",
      ),
    },
  ],
};
