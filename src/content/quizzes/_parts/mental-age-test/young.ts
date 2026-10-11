import type { Outcome } from "@/lib/engine/types";

/** Mental Age Test outcomes: 12 at Heart, Forever 19, Thriving at 27. */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const age12: Outcome = {
  key: "age12",
  name: "12 at Heart",
  tagline: "Wonder first, snacks second, schedule never.",
  emoji: "🎈",
  summary:
    "Your answers put your mental age at 12. You chase fun, notice wonder in small things and would take the slide over the stairs every time. That's a gift, not a flaw.",
  about: p(
    "A mental age of 12 at heart describes people whose tastes and habits lean toward play, novelty and wonder. It's the age of sleepovers, secret handshakes, inside jokes that last for years, and the honest belief that a Tuesday could turn into an adventure. People with this result tend to pick the theme park over the brunch, the gummy worms over the cheese board, and the giant plush toy over the sensible gift.",
    "None of this means immaturity. Many people who land here are responsible, hard-working adults (or teens) who simply never lost their appetite for fun. They are often the first to suggest a game, the last to leave the pool and the friend who turns a boring errand into a story. They tend to be curious, quick to laugh and refreshingly honest about what they like.",
    "The 12-at-heart mindset has real strengths: openness to new things, an easy relationship with joy, and creativity that comes from not overthinking. Its growing edges are usually around patience, routines and the less exciting parts of life, like chores, admin and waiting.",
    "This result is one of six mental ages in our quiz, which runs from 12 at heart to an 80-year-old soul. It describes your tastes today, not your intelligence, maturity or worth. Take it again in a year and you may land somewhere new.",
  ),
  snapshot: [
    "Your mental age: 12 at heart, led by play and wonder",
    "You pick fun first and figure out the logistics later",
    "Small joys (snacks, games, a good slide) still land hard for you",
    "Friends see you as the spark who turns plans into adventures",
    "Your growth edge: patience with routines and boring-but-useful tasks",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Somewhere inside you is a kid who still runs to the window when it snows, and your answers say that kid has a loud vote.",
      body: p(
        "Think about the version of you at twelve. Old enough to ride your bike across town, young enough that nobody expected you to have a five-year plan. Every summer felt endless. A new pack of markers could fix a bad week. Your best friend's house had better cereal than yours, and that mattered. That kid didn't disappear when the birthdays kept coming. Your picks suggest they're still very much in the room, sitting on the counter, swinging their legs.",
        "People with a mental age of 12 tend to meet the world with a question rather than a verdict. 'What happens if I press this?' 'Can we go a different way home?' 'Is there dessert?' You likely notice the funny sign, the dog across the street, the weird cloud. Where other people see an errand, you see a side quest.",
        "This isn't about being childish. Plenty of people who score 12 at heart hold real jobs, care for others and pay attention in class or at work. The difference is in what refuels you. Many people recharge with quiet, routine or polish. You recharge with novelty, laughter and a little bit of chaos. A free afternoon with no plan sounds like a gift, not a threat.",
        "There's also a softness here that people sometimes miss. Twelve is the age when you feel things with your whole chest, when a friend's betrayal stings for weeks and a kind teacher can change your year. If you still feel that way, you probably care hard about fairness, about being included, and about the people who make you laugh.",
        "Your story, in short, is one of keeping the door open. The world keeps asking everyone to get serious. You've decided to get serious about the right things and stay light about the rest.",
      ),
    },
    {
      title: "Traits you share with real 12-year-olds",
      teaser:
        "Real 12-year-olds are known for boundless curiosity, wildly honest opinions and the ability to get excited about almost anything. You probably share more of that than you let on.",
      body: p(
        "Twelve is a fascinating age. It sits right between childhood and the teenage years, so it borrows from both: the wonder of a little kid and the growing independence of a teenager. Here are the life-stage traits people with this result often share with real 12-year-olds.",
        list(
          "Deep-dive obsessions. One month it's a game, the next it's sharks, volcanoes or a band. You tend to go all in on whatever has your attention, and you can talk about it for an hour.",
          "A strong sense of fairness. Twelve-year-olds will argue about the rules for longer than the game lasts. You may feel genuinely bothered when something isn't fair, even when it doesn't affect you.",
          "Honest opinions. You probably say what you think about food, films and plans, sometimes before checking whether it's the moment.",
          "Loyalty to your people. At twelve, your best friend is your whole world. You tend to bond hard and stay loyal.",
          "Restlessness. Sitting still in a waiting room can feel like a punishment. You like to move, fidget, explore or at least scroll.",
          "Imagination on tap. Twelve-year-olds can turn a cardboard box into a spaceship. You may still daydream vividly and invent games or stories on the spot.",
        ),
        "There's one more shared trait that's easy to miss: twelve is the age when people start to notice they're being watched. Real 12-year-olds can swing between total silliness and sudden self-consciousness. If you sometimes feel that tug, wanting to be goofy but wondering how it looks, you're right on brand. The good news is that you seem to have picked a side. More often than not, you choose fun over looking cool.",
        "None of these traits are childish in a bad way. Curiosity, fairness, loyalty and imagination are qualities many grown-ups spend years trying to get back.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Play, surprises and people who laugh at your jokes keep you young. What ages you is sneakier: long stretches of sameness that quietly drain your spark.",
      body: p(
        "Let's start with your fuel. People with a mental age of 12 tend to come alive with novelty: a new place, a new game, a ridiculous challenge, a snack you've never tried. Movement matters too. Walking somewhere new, dancing badly in the kitchen, jumping on any trampoline in sight. And laughter works on you like a battery charge. One good laugh with a friend can reset a whole bad day.",
        "Here's what tends to keep your inner 12-year-old thriving:",
        list(
          "Saying yes to small adventures, like a new route home or an unplanned stop",
          "Hobbies with a playful edge: games, building things, drawing, sports just for fun",
          "Friends who are silly with you instead of rolling their eyes",
          "A little unscheduled time every week, with no goal at all",
        ),
        "Now the sneaky part. What ages you isn't birthdays. It's monotony. Weeks that look exactly the same, piles of admin, long lessons or meetings with no break, and being told to 'act your age' can make you feel twice as old. You might notice your energy drops, you get snappy, or you start scrolling for something, anything, to feel a spark.",
        "Another thing that ages you: cynical people. If someone around you treats every idea as stupid and every joy as cringe, you may start hiding the very part of you that makes you you.",
        "The fix isn't avoiding all responsibility. That would age you in a different way, through stress and last-minute panic. The fix is to sneak play into the boring parts. Put on music while you clean. Race a timer through your homework or inbox. Reward yourself with something small and silly when the dull job is done. You don't have to choose between being reliable and being fun. You just have to refuse to let the dull stuff take the whole day.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "In a group, you're usually the one who says 'wait, what if we…' and then everyone ends up with a story they tell for years.",
      body: p(
        "Friends tend to see you as the spark. You suggest the detour, the game, the late-afternoon snack run, the ridiculous costume theme. Without you, plans would still happen, but they'd be a bit beige. You make ordinary hangouts feel like events.",
        "You're also a generous friend in ways that are easy to overlook. You get excited about other people's wins. You remember the inside joke from three years ago. You'll happily play the game someone else picked, as long as everyone is having fun. And when a friend is sad, you're often the one who gets them out of the house and laughing again.",
        "Here's how you tend to show up:",
        list(
          "The instigator: the first to suggest something new",
          "The hype person: loud, sincere cheers for everyone else",
          "The memory keeper: inside jokes, nicknames, the story of that one trip",
          "The mood lifter: good at breaking tension with a joke",
        ),
        "Every superpower has a flip side. Because you live in the moment, you might sometimes forget plans, run late or get distracted mid-conversation by something shiny. Some friends may wish you'd sit with a serious feeling a little longer before trying to cheer it up. And if your group gets busier, with exams, jobs or packed calendars, you might feel left behind when no one has time for spontaneous fun.",
        "The best friendships for you mix playfulness with a bit of steadiness. You bring the spark; a calmer friend helps the plan actually happen. Try saying out loud what you appreciate about your steadier friends. They might secretly worry that you find them boring, when in fact you need them as much as they need your fire. And when a friend brings you something heavy, try staying in it with them for one extra minute before reaching for the joke.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You click instantly with fellow 12-at-hearts, but your secret best match might be someone with an 80-year-old soul.",
      body: p(
        "Mental ages aren't star signs, and you can be close with anyone. Still, people with different results tend to bring out different sides of you. Here's how you're likely to get along with each one.",
        list(
          "12 at Heart: Instant chemistry. You'll invent games, laugh until it hurts and forget to eat lunch. The catch is that nobody remembers the tickets. Pair up, but set one alarm.",
          "Forever 19: Your adventure partner. They take your playful ideas and make them bigger and louder. Great for trips and festivals; just know they'll want to stay out later than you.",
          "Thriving at 27: A great match in practice. They plan, you play. They'll book the table; you'll make the night memorable. They might nudge you to grow up a little, which helps in small doses.",
          "Steady at 35: Grounding, sometimes frustrating. They love a routine you find dull, but they're the ones with the first-aid kit when you scrape your knee, literally or not. Respect is the key here.",
          "Unbothered at 50: Surprisingly easy. Their calm makes your chaos feel charming, and their dry humor matches your silliness better than you'd expect. Think of the cool aunt or uncle you didn't know you needed.",
          "80-Year-Old Soul: The secret best match. Think of how grandkids and grandparents often get along brilliantly. You both live in the present, love simple pleasures and don't care about looking cool. They'll teach you card games; you'll make them laugh until their tea goes cold.",
        ),
        "If you want friendships that last, look for at least one person who is older in spirit than you. They'll help you turn your bright ideas into actual plans, and in return you'll remind them that life is supposed to be fun.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: a mental age of 12 isn't really about fun. It's about freedom, and your answers suggest you protect yours more fiercely than you might admit.",
      body: p(
        "Look closely at what 12-at-heart people tend to choose: the open afternoon, the playful option, the thing with no rules. Underneath the gummy worms is a value. You want to be free to be yourself, without having to perform being serious, polished or impressive. That's a real priority, and a healthy one.",
        "The honest part is this. Sometimes the love of freedom turns into avoiding things that feel 'grown-up', not because they're bad, but because they feel boring or scary. That might be a conversation you keep putting off, a skill you never quite start, or a goal that would mean committing to something for longer than a few weeks. Being 12 at heart is wonderful. Staying 12 about everything can quietly hold you back.",
        "The goal isn't to lose your spark. It's to protect it by getting the hard stuff handled, so it stops hanging over you. People who manage this tend to feel freer, not less free.",
        "Your next steps:",
        list(
          "This week, pick one boring task you've been dodging and turn it into a game: set a 15-minute timer, put on your loudest playlist and give yourself a silly reward.",
          "Block one unplanned afternoon in the next two weeks. No goals, and no screens if you can manage it. Follow your curiosity.",
          "Tell a friend about your current obsession, in full detail. Sharing your enthusiasm is a gift.",
          "Write down one grown-up goal you secretly want, and take the smallest possible first step today.",
          "Retake this quiz in six months and see whether your inner 12-year-old is still in charge, or just enjoying the ride.",
        ),
      ),
    },
  ],
};

export const age19: Outcome = {
  key: "age19",
  name: "Forever 19",
  tagline: "Big feelings, big plans and a playlist for every mood.",
  emoji: "⚡",
  summary:
    "Your mental age is 19: bold, social and always up for one more adventure. You feel things deeply, dream big and suspect the best night of your life might be tonight.",
  about: p(
    "A mental age of 19 describes people whose tastes lean toward intensity, freedom and possibility. Nineteen is the age of first big leaps: new places, new friends, late nights, loud music and the feeling that your real life is just beginning. People with this result tend to pick the night out over the couch, backpacking over the spa, and headphones turned up just a little too loud.",
    "Forever 19 energy is magnetic. Many people with this result are adventurous, passionate and quick to say yes. They care deeply about authenticity, fairness and their friends, and they often have strong opinions about music, style and the state of the world. They're the people who make spontaneous plans actually happen.",
    "The growing edges are about balance. Big feelings can mean big swings, and a love of freedom can make routines, sleep and long-term planning feel like a drag. None of that is a flaw; it's simply where this kind of energy tends to need care.",
    "This is one of six results in our mental age test, which runs from 12 at heart to an 80-year-old soul. Your mental age describes your current tastes and habits, not your maturity, intelligence or real age. Many grown-ups land here, and so do plenty of thoughtful teens. Retake the quiz in a few months and see whether your inner 19-year-old is still running the playlist.",
  ),
  snapshot: [
    "Your mental age: Forever 19, powered by intensity and possibility",
    "You say yes first and figure out the details on the way",
    "Music, friends and freedom are your three main fuels",
    "You feel things strongly, which makes you loyal and a little dramatic",
    "Your growth edge: rest, routines and plans longer than a weekend",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Your answers have the restless, electric feel of a 19-year-old standing at the edge of something new, and it suits you.",
      body: p(
        "Nineteen is the age of the open road. For many people, it's the first time life feels truly their own. Nobody is checking whether you went to bed. The world feels huge, the future feels wide open, and every week brings someone new who might become a lifelong friend. Your picks carry that same energy: a hunger for experience and a sense that something exciting could happen at any moment.",
        "People with this mental age tend to live in high definition. Music isn't background noise; it's a soundtrack. A conversation at 1 a.m. can feel more meaningful than a month of small talk. When you love something, whether it's a song, a person or an idea, you love it loudly.",
        "That intensity comes with real courage. Many Forever 19 people are the ones who move to a new place, change direction, start the band, book the trip or ask the question. You may not always have a plan, but you trust that you'll figure it out. Often, you do.",
        "There's tenderness in this result too. Nineteen is an age of big questions: Who am I? What do I believe? Where do I belong? If you still ask those questions, you're probably someone who refuses to settle for a life that doesn't feel like yours. You may change your mind a lot, and that's not flakiness. It's how people who care about authenticity find their way.",
        "Your story is about momentum. You'd rather try and fail than wonder 'what if'. The world can be cautious; you'd rather feel alive. The adventure ahead is learning how to keep that fire burning without letting it burn you out.",
      ),
    },
    {
      title: "Traits you share with real 19-year-olds",
      teaser:
        "Real 19-year-olds are known for chaotic sleep, fierce opinions and friendships that form in a single night. You'll recognize yourself in more of this than you'd like to admit.",
      body: p(
        "Nineteen is a hinge between being a teenager and being an adult, and it shows. Here are the life-stage traits people with this result often share with real 19-year-olds:",
        list(
          "A flexible relationship with sleep. Bedtime is a suggestion. Naps can happen at any hour and last any length. Your best ideas may arrive at midnight.",
          "Strong opinions, freshly formed. Nineteen-year-olds are figuring out what they believe and saying it with conviction. You probably care about fairness, honesty and doing things your own way.",
          "Friendships that move fast. One great night can turn a stranger into a close friend. You likely trust your gut about people and bond through shared experiences.",
          "Budget creativity. Living on very little forces resourcefulness: cheap meals, borrowed clothes, the free event. You may still enjoy making a little go a long way.",
          "Music as identity. What you listen to says something about who you are, and you probably have a playlist for every mood and season.",
          "Big emotional weather. Highs feel like flying; lows feel like the end of the world, at least for an afternoon. You feel things fully.",
          "Hunger for independence. Being told what to do is annoying at nineteen. You'd rather learn by doing, even if that means a few spectacular mistakes.",
        ),
        "Real 19-year-olds also share something less obvious: they are often braver than they feel. Moving out, starting over, saying what you think while your voice still shakes. If that sounds familiar, you've kept one of the best parts of the age.",
        "These traits aren't about being reckless. At their best, they add up to someone who is open, honest and willing to grow, which is a pretty good way to be at any age.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Movement, music and new faces keep you young. Feeling stuck is what ages you fastest, and it can creep in without much warning.",
      body: p(
        "Your energy comes from momentum. People with this mental age tend to feel most alive when something is happening: a trip, a project, a new crowd, a fresh start. Music is a major fuel, and so are friends who are up for anything. Even small changes, like rearranging your room or trying a new route, can give you a lift.",
        "What tends to keep your inner 19-year-old thriving:",
        list(
          "Live music, dancing or any kind of shared, loud joy",
          "Travel, even short trips to nearby places you've never been",
          "Learning something where you can see yourself improve quickly",
          "People who challenge your ideas and make you think",
        ),
        "What ages you is the feeling of being stuck. Repetitive weeks, a class or job that doesn't use your talents, or being surrounded by people who say 'that's just how it is' can make you feel decades older. You may notice yourself getting restless, impulsive or flat. Sometimes that restlessness leads to sudden big decisions, like quitting something or cutting your own hair at midnight, which are exciting but not always wise.",
        "The other thing that ages you, ironically, is burnout. Forever 19 energy often runs on adrenaline. Late nights, packed weekends and emotional highs feel great until your body sends the bill. Exhaustion is the quickest way to feel old.",
        "The trick is building a little structure that protects your freedom instead of fighting it. Sleep becomes the thing that lets you say yes to the next adventure. A small savings habit becomes your future ticket somewhere. A weekly routine becomes the launch pad, not the cage. You don't need to slow down. You need to refuel more often, so the fire keeps burning for years instead of weeks.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "You're the friend who texts 'are you awake?' at midnight and means it as an invitation, not a worry.",
      body: p(
        "In friendships, you bring energy, loyalty and a talent for making memories. You're often the one who gets the group out the door, suggests the concert, turns a quiet evening into an adventure, or says the honest thing everyone else was thinking. People tend to feel more alive around you.",
        "You're also deeply loyal. Forever 19 people often treat their friends like chosen family. If someone hurts a friend of yours, you take it personally. You'll show up with snacks and a plan when it matters, and you'll defend your people fiercely.",
        "How you tend to show up:",
        list(
          "The adventure starter: plans, trips and spontaneous nights out",
          "The honest one: you say what you think, kindly most of the time",
          "The DJ: music is how you set the mood and share feelings",
          "The ride-or-die: loyal, protective and all in",
        ),
        "The flip side is that intensity can be a lot for some people. You may expect friends to match your energy and feel hurt when they choose an early night. You might move fast in new friendships and feel let down when they don't deepen as quickly. Sometimes big feelings come out as drama, especially when you're tired.",
        "Your friendships work best with a mix of people. You need at least one friend who matches your appetite for adventure, and at least one calmer friend who can talk you down when the emotional weather turns stormy. Let your quieter friends love you in their own way: a check-in text, a cup of tea, a calm voice. That's loyalty too, just at a lower volume.",
        "One small practice can deepen everything: ask more questions than you answer. You already bring the fun. Curiosity about your friends' inner worlds will bring the depth.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You'll have the most fun with a 12-at-heart, but someone who is Unbothered at 50 may understand you better than anyone.",
      body: p(
        "Every mental age can be a good friend to you, but each one brings out something different. Here's the likely chemistry:",
        list(
          "12 at Heart: Pure fun. They bring the silliness; you bring the bigger plans. You'll end up somewhere unexpected, probably with a story. Just make sure someone checks the bus times.",
          "Forever 19: Two flames in one room. Your nights will be legendary and your conversations deep. The risk is that nobody slows down and you both crash at once. Take turns being the sensible one.",
          "Thriving at 27: A great guide. They've recently walked the path you're on and can show you shortcuts without lecturing. They'll help you turn passion into progress.",
          "Steady at 35: Potential friction. Their love of routine may feel like a brake. But they're the ones you'll call when life gets messy, and they'll answer. Give them credit for being reliable; it's rarer than it looks.",
          "Unbothered at 50: The surprising best match. They've been through the big feelings and come out calm. They won't judge your chaos, and their perspective can feel like a warm hand on your shoulder.",
          "80-Year-Old Soul: Unexpectedly sweet. They love stories, and you have plenty. They'll listen to your latest adventure with real interest and offer one line of wisdom you'll remember for years.",
        ),
        "In your inner circle, aim for balance. Keep your fellow adventurers, but invite in a couple of calmer souls. They'll help you see that the steady things, like sleep, savings and a long-term plan, aren't the opposite of freedom. They're what keep it going.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: Forever 19 isn't really about late nights. It's about possibility, and your answers suggest you're wary of any life where the doors start to close.",
      body: p(
        "Look at what people with this result tend to pick: the night that's just starting, the trip with no fixed plan, the playlist that changes every week. The common thread isn't recklessness. It's keeping options open. Underneath the loud music is a real priority: you want a life that still feels full of possibility.",
        "That's a beautiful value. It keeps you curious, brave and open to people. But the honest part is this: keeping every door open can mean never walking all the way through one. Some of the best things in life, like deep friendships, real skill and a place that feels like home, come from choosing and staying. Commitment can feel like losing freedom, but often it's what turns a fun life into a meaningful one.",
        "You don't have to give up your spark. You just get to decide which adventures deserve your full energy.",
        "Your next steps:",
        list(
          "This week, pick one thing you've been dabbling in, whether a skill, a project or a friendship, and commit to it for 30 days. Notice how depth feels compared to novelty.",
          "Protect your sleep for one week. Treat it like training for your next big adventure, not a punishment.",
          "Start a tiny 'freedom fund', even a small amount a week, labeled for a future trip or bold move.",
          "Write a letter to yourself five years from now. What do you want to have built, not just experienced?",
          "Plan one adventure small enough to actually happen this month, and go.",
        ),
      ),
    },
  ],
};

export const age27: Outcome = {
  key: "age27",
  name: "Thriving at 27",
  tagline: "Building a life you actually like, one houseplant at a time.",
  emoji: "🪴",
  summary:
    "Your mental age is 27: curious, ambitious and busy building a life that feels like yours. You like nice things in small doses, new skills, and plans flexible enough to enjoy.",
  about: p(
    "A mental age of 27 describes people whose tastes blend freedom with intention. It's the life stage where many people start building something on purpose: a direction, a space that reflects them, a circle of friends they've chosen and habits they actually want. People with this result often pick the long brunch, the trendy houseplant, the fancy cheese board and the video tutorial that lets them fix it themselves.",
    "Thriving at 27 energy is curious and forward-looking without being stuffy. Many people with this result enjoy learning, exploring new places, trying new food and upgrading the small details of daily life. They're often the friends who know a good podcast, a good recipe and a good place for breakfast.",
    "Their growing edges tend to involve comparison and pressure. When you're busy building, it's easy to measure your life against everyone else's highlights or to feel you should be further along. Rest and self-kindness matter as much as hustle.",
    "This is one of six results in our mental age test, from 12 at heart to an 80-year-old soul. It reflects your current tastes and habits, not your maturity, intelligence or real age. Teens who are busy planning their futures often land here, and so do older adults in a season of reinvention. Retake the quiz anytime and see how your mix shifts.",
  ),
  snapshot: [
    "Your mental age: Thriving at 27, curious and quietly ambitious",
    "You love a good upgrade, from breakfast to skills to your space",
    "You balance fun and responsibility better than most",
    "Friends come to you for recommendations and practical help",
    "Your growth edge: comparison, and feeling you should be further along",
  ],
  deep: [
    {
      title: "Your mental age story",
      teaser:
        "Your answers sound like someone in the middle of building something, and enjoying the work more than they expected.",
      body: p(
        "Twenty-seven has a particular feeling to it. The chaos of the late teens has settled a little, but nothing is set in stone. Many people at this stage have just enough experience to know what they like and just enough freedom to go after it. Your picks capture that sweet spot: one foot in adventure, one foot in a life that's starting to take shape.",
        "People with this mental age often treat life like a project they're genuinely excited about. You might be the kind of person who learns a new dish from a video, keeps a plant alive through sheer determination and has opinions about which café has the best light. You care about the details because the details are where life happens.",
        "There's ambition here, but it isn't cold. Thriving at 27 people usually want to grow because they're curious about what they could become, not because they want to beat anyone. You may have a running list of things to learn, places to visit and ideas to try. Some will happen, some won't, and you're mostly fine with that.",
        "You also have a talent for balance. You can enjoy a lazy Sunday and still get the laundry done. You can go out and still make the morning class or meeting. Friends might describe you as someone who 'has it together', even when you feel like you're improvising.",
        "The heart of your story is intention. You're not drifting, and you're not rigid. You're making choices, one small decision at a time, that add up to a life that fits. That's a quietly powerful way to live at any age.",
      ),
    },
    {
      title: "Traits you share with real 27-year-olds",
      teaser:
        "Real 27-year-olds are famous for houseplants, group chats about brunch and one quiet, constant question: am I doing this right? Sound familiar?",
      body: p(
        "Twenty-seven is often the age when people stop pretending to have everything figured out and start actually figuring it out. Here are life-stage traits people with this result tend to share with real 27-year-olds:",
        list(
          "Self-improvement as a hobby. Podcasts, books, courses, a new fitness routine. You enjoy learning how to do things better, and you may have a few half-finished projects that prove it.",
          "Small luxuries. A good drink in a nice mug, decent sheets, a candle that smells like a forest. You've learned that small upgrades make daily life better.",
          "DIY confidence. Something breaks? There's a tutorial for that. You like being able to handle things yourself.",
          "A curated social life. Fewer, better friends. You've stopped saying yes to everything and started choosing people who make you feel good.",
          "Direction on the brain. Even if you're not obsessed with success, you think about where you're heading and what you're building.",
          "The comparison trap. Real 27-year-olds often scroll past friends' big news and wonder if they're behind. You may feel this pull too.",
          "Brunch as a sacred ritual. Long, slow, social and slightly overpriced. Totally worth it.",
        ),
        "There's another trait that sits under all of these: hope. Twenty-seven-year-olds often believe their best years are ahead, and they're working toward them. That forward-looking energy makes you resilient. When something goes wrong, you're more likely to ask 'what can I learn?' than 'why me?'",
        "Being Thriving at 27 at heart doesn't mean you have a certain job or lifestyle. It means you approach life with curiosity, care and a willingness to keep improving. That's a mindset you can carry into any decade.",
      ),
    },
    {
      title: "What keeps you young (and what ages you)",
      teaser:
        "Learning new things keeps you young, especially when you can see your progress. What ages you is the pressure to have it all figured out by now.",
      body: p(
        "Your energy comes from growth. People with this mental age tend to light up when they're learning something new, whether that's a language, a recipe, a sport or a skill for school or work. Seeing progress, even small, is deeply satisfying for you. New places help too. A day in a town you don't know or a restaurant you've never tried can refresh you for weeks.",
        "What keeps your inner 27-year-old thriving:",
        list(
          "A learning project with visible milestones",
          "A space you enjoy being in, however small",
          "Friends who swap recommendations and celebrate each other's wins",
          "Exercise you actually like, not the kind you force yourself through",
        ),
        "What ages you is pressure. The sense that you should have a certain grade, job, home or relationship by a certain age can make you feel ancient and behind at the same time. Social media can turn this up to full volume. You might notice yourself feeling tired, comparing constantly or turning hobbies into side hustles until nothing feels fun anymore.",
        "Overcommitment is another age accelerator. Thriving at 27 people often say yes to too many good things: one more course, one more project, one more plan. Each one is reasonable. Together, they leave no room to breathe.",
        "The antidote is to remember why you started building in the first place: because it felt good. Give yourself permission to enjoy things without optimizing them. Keep at least one hobby you're happily mediocre at. Mute the accounts that make you feel behind. And measure your progress against your own past, not someone else's highlight reel. You're right on time for your own life, even when it doesn't feel that way.",
      ),
    },
    {
      title: "How you show up with friends",
      teaser:
        "You're the friend with the restaurant recommendation, the spare phone charger and surprisingly good advice about everything from big decisions to houseplants.",
      body: p(
        "In friendships, you're a connector and a quiet helper. You might be the one who organizes the birthday dinner, finds the cool new spot or sends a friend the exact article they needed. People come to you when they want practical help delivered with warmth.",
        "You're also a good blend of fun and dependable. You'll stay for one more round of games or karaoke, and you'll also remember to text your friend good luck before their big day. That mix makes you someone people trust with both their plans and their problems.",
        "How you tend to show up:",
        list(
          "The planner: table booked, group chat organized",
          "The recommender: the best podcast, café, show or skill",
          "The coach: encouraging friends to go for the goal",
          "The steady fun one: up for adventure, but you'll get everyone home",
        ),
        "There are a few watch-outs. Because you care about growth, you may slip into fixing mode when a friend just wants to vent. You might also feel quietly hurt when you put a lot of effort into plans and others don't match it. And the comparison trap can sneak into friendships too: celebrating a friend's big win while wondering why it isn't happening for you.",
        "Your friendships work best when you let yourself be helped, too. You're used to being the capable one. Try telling a friend when you're struggling before you've already solved it. It deepens trust and gives others the chance to show up for you.",
        "One more thing: keep making new friends. Thriving at 27 people sometimes close their circle too early because they're busy. A new friend can bring fresh ideas and fresh fun into the life you're building.",
      ),
    },
    {
      title: "Your most compatible mental ages",
      teaser:
        "You get along with almost every mental age, but your most natural partner in crime is Steady at 35, and your best teacher might be an 80-year-old soul.",
      body: p(
        "Thriving at 27 sits near the middle of the range, so you can usually find common ground with anyone. Here's how the chemistry tends to work:",
        list(
          "12 at Heart: They remind you to play. You plan the day; they make it unforgettable. Time with them is the perfect cure for taking life too seriously.",
          "Forever 19: Fun with a side of déjà vu. You see a younger version of yourself in their energy and may feel a pull to mentor them. Let them teach you something too: their boldness is contagious.",
          "Thriving at 27: Excellent teammates. You'll swap recommendations, cheer each other on and plan ambitious trips. Just watch for quiet competition creeping in.",
          "Steady at 35: Natural partners. They share your love of a good plan but add calm and stability. They're often who you grow into when the building phase settles.",
          "Unbothered at 50: Wise company. They've built and rebuilt more than once and know which worries really matter. Their perspective can take the pressure off your timeline.",
          "80-Year-Old Soul: Your best teacher. They remind you that the point of building a life is to actually live in it. Time with them slows you down in the best way.",
        ),
        "If you're looking to strengthen your circle, add an older soul and a younger heart. The older one helps you worry less; the younger one helps you enjoy more. Between them, you'll find the sweet spot you're always aiming for: a life that's growing and a life that feels good right now.",
      ),
    },
    {
      title: "The honest twist",
      teaser:
        "Here's the twist: Thriving at 27 isn't really about ambition. It's about wanting your life to feel like your own, and your answers hint that you sometimes measure it with other people's rulers.",
      body: p(
        "Look at the things people with this result tend to choose: the curated space, the new skill, the long brunch with friends. On the surface, it's about upgrades. Underneath, it's about authorship. You want a life you've chosen on purpose, not one that just happened to you. That's a strong, healthy priority.",
        "The honest part is that the thing you value most, choosing your own path, can get hijacked by comparison. When you scroll past someone's big announcement, perfect room or dream trip, it's easy to quietly swap your goals for theirs. Then you're building someone else's life with your own energy. Thriving at 27 people are especially prone to this because they care so much about doing life well.",
        "The fix isn't to stop striving. It's to check that the ladder you're climbing is leaning against your own wall. Ambition aimed at your own goals feels like energy. Ambition aimed at someone else's feels like pressure.",
        "Your next steps:",
        list(
          "This week, write down three things you're working toward. Next to each, write who it's really for: you, or an imagined audience.",
          "Unfollow or mute five accounts that leave you feeling behind.",
          "Choose one hobby to keep purely for fun. No goals, no tracking, no posting.",
          "Celebrate a recent win, however small, with someone who cares about you.",
          "Set a 'good enough' date: one project you'll call finished, even if it isn't perfect.",
          "Retake the quiz in a few months. If you've rested more, an older, calmer age may creep into your mix, and that's a good sign.",
        ),
      ),
    },
  ],
};
