import type { Outcome } from "@/lib/engine/types";

/**
 * Magic Academy House Quiz outcomes: Lanternfall, Hearthwood.
 * Original lore only; see the lore bible at the top of magic-academy-house-quiz.ts.
 */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const lanternfall: Outcome = {
  key: "lanternfall",
  name: "Lanternfall",
  tagline: "Ask once more: the house for minds that need to understand.",
  emoji: "🏮",
  summary:
    "Lanternfall claims you. You need to understand how things work, you notice what others miss, and your best answers often arrive while everyone else is still guessing. Curiosity is your compass.",
  about: p(
    "Lanternfall is the house of wisdom at Larkspire Academy, the original magic school created for our Magic Academy House Quiz. On the Night of Embers, when the Old Hall burned, Lanternfall's first members went to the library. They carried out armfuls of books, and when the lantern tower collapsed, they caught the falling lanterns and used them to light the way out. Afterward, they worked out exactly how the fire had started and wrote the Rules of Kindling so it could never happen again.",
    "Lanternfall's symbol is the moth, always drawn toward light. Its colors are deep teal and candle-cream, and its motto is 'Ask once more.' Members gather on the Lantern Stair, a spiral tower lined with window seats and hundreds of lanterns, one hung by every student who has ever belonged to the house. On the Question Wall, anyone can pin a question and anyone can answer.",
    "People claimed by Lanternfall tend to be curious, observant and thoughtful. They're often the researchers, problem-solvers and quiet experts in a group. Their growth edge is action: sharing ideas before they're perfect and remembering that knowledge is most useful when it reaches people.",
    "Lanternfall's closest allies are the planners of Gildmere. Its oldest rivals are the bold students of Emberhold. Take the quiz to see whether the Lantern Stair would welcome you.",
  ),
  snapshot: [
    "Your house: Lanternfall, home of wisdom and the Question Wall",
    "You need to understand how things work before you decide",
    "You notice details and patterns others miss",
    "You'd rather ask a better question than give a quick answer",
    "Your growth edge: acting and sharing before you feel completely ready",
  ],
  deep: [
    {
      title: "The lore of Lanternfall",
      teaser:
        "On the Night of Embers, while others ran for the doors, a few students ran for the library. When the lantern tower came down around them, they caught the light.",
      body: p(
        "The Old Hall's library sat at the foot of its lantern tower, a tall, narrow column where the school's lamps were kept and trimmed. When the fire reached the east wing, a group of students in the library realized that centuries of books were about to burn. They started carrying them out in armfuls, passing them through the windows to anyone outside.",
        "Then the lantern tower began to fall. Lanterns tumbled down the stairwell, still lit. A student named Ilse Marrow caught one, then another, and set them along the floor to light the way. Her friends did the same. They finished emptying the library by the glow of falling lanterns, and the house they formed took its name from that moment: Lanternfall.",
        "What they did next mattered even more. While everyone else mourned, the Lanternfall students investigated. They interviewed every witness, studied the ashes and worked out exactly how the summoned light in the east wing had gone wrong. They wrote down what they learned as the Rules of Kindling, and every building at Larkspire has followed those rules since. In two hundred years, no fire at the academy has spread beyond a single room.",
        "Here's what Lanternfall looks like today:",
        list(
          "Symbol: the moth, always drawn toward light.",
          "Colors: deep teal and candle-cream.",
          "Motto: 'Ask once more.'",
          "Common room: the Lantern Stair, a spiral tower lined with window seats, reading nooks and hundreds of lanterns. Each student hangs one on their first night and takes it with them when they leave.",
          "The Question Wall: a cork wall at the top of the stair where anyone can pin a question, signed or unsigned, and anyone can answer. Some questions have hung there for decades.",
          "Moth Night: once a year, every lantern is lit at once, and the house stays up until dawn arguing about the hardest question on the wall.",
        ),
        "Lanternfall students say the library's oldest books still smell faintly of smoke. They say it with pride.",
      ),
    },
    {
      title: "Your Lanternfall traits",
      teaser:
        "Outside the academy, Lanternfall energy looks like the friend who reads the instructions, asks the question nobody thought of and remembers the strange fact that solves everything.",
      body: p(
        "The magic is invented, but the traits behind your result are real. People who land in Lanternfall tend to share a recognizable set of everyday habits.",
        list(
          "You need to understand. A rule or an answer isn't enough for you; you want to know why. 'Because I said so' drives you up the wall.",
          "You notice details. You spot the typo, the pattern, the thing that doesn't add up. Small inconsistencies jump out at you.",
          "You think before you act. You'd rather take a moment to understand a situation than rush in and make it worse.",
          "You love learning. Books, documentaries, rabbit holes, new hobbies: you're happiest when your mind has something to chew on.",
          "You think for yourself. You form your own views and aren't easily swayed by what's popular.",
          "You enjoy explaining. Once you understand something, you like helping others understand it too.",
        ),
        "In real life, this might look like being the person who researches before buying anything, the friend who fact-checks the group chat, or the student who disappears into a topic far beyond the assignment.",
        "These traits have a shadow when they run unchecked. Thinking first can become thinking forever. Noticing flaws can make you seem critical. A love of being right can make it hard to admit what you don't know. Lanternfall students often learn that the cleverest answer isn't always the kindest or the most useful one.",
        "The best Lanternfall students remember why Ilse Marrow caught those lanterns: to light the way out for everyone else. Knowledge, for them, isn't a trophy. It's a lamp you hold up so others can see. When you share what you know generously, patiently and without making people feel small, your wisdom becomes one of the most valuable things in any room.",
      ),
    },
    {
      title: "Your role in the house",
      teaser:
        "Every Lanternfall student grows into one of three roles, and the house you scored second decides which: the Seeker, the Cartographer or the Lamplighter.",
      body: p(
        "Wisdom shows up in different ways, and Lanternfall has always honored each one. Check your secondary house in your results to find your role.",
        "The Seeker (secondary house: Emberhold)",
        "Seekers test ideas in the real world. They combine Lanternfall curiosity with Emberhold courage, so they're the ones who climb the tower to check the theory or open the sealed room to see whether the old map was right. This is the rarest Lanternfall blend, since the two houses are rivals. Tradition says the Seeker leads Lanternfall's team in the Kindling Trials. In real life, you're likely the experimenter: the person who tries the new method, travels to learn and isn't afraid to be wrong. Watch out for taking risks just to prove a point.",
        "The Cartographer (secondary house: Gildmere)",
        "Cartographers map what's coming. They blend Lanternfall insight with Gildmere strategy, so they turn knowledge into plans. Tradition says the Cartographer keeps the house's copy of the Rules of Kindling and proposes new rules when something changes. In real life, you're likely the analyst, the planner who spots patterns and predicts what will happen next. Watch out for treating people like pieces on a map.",
        "The Lamplighter (secondary house: Hearthwood)",
        "Lamplighters share the light. They mix Lanternfall wisdom with Hearthwood warmth, so they're natural teachers, tutors and explainers. Tradition says the Lamplighter lights each new student's lantern on their first night. In real life, you're likely the friend who explains the homework, the patient one who makes hard ideas easy and the person others come to when they feel lost. Watch out for spending so much time helping others learn that you stop learning yourself.",
        "Whichever role is yours, the Lantern Stair needs all three. Seekers find the truth, Cartographers chart what it means and Lamplighters make sure everyone can see it.",
      ),
    },
    {
      title: "Rivals and allies",
      teaser:
        "Lanternfall's alliance with Gildmere was built over a table of blueprints. Its rivalry with Emberhold began with a single, very honest report.",
      body: p(
        "After the fire, the Lanternfall students wrote a careful report on how the Old Hall had burned. Most of it was about the experiment that started the blaze. But one paragraph noted that the fire had spread faster because rescuers kept opening doors, feeding the flames with fresh air. The report was accurate. It was also, as the Emberhold students pointed out at the top of their voices, written by people who had been in the library saving books while others were still trapped.",
        "Your rival: Emberhold",
        "Both sides were right, and that's what makes the rivalry last. Today it plays out in the Kindling Trials, the end-of-year contest where Emberhold usually wins the races and Lanternfall usually wins the riddles. In real life, Emberhold-type people may frustrate you with their habit of acting before thinking. But they often have the courage to try what you've only theorized. Some of the best partnerships at Larkspire are between a Lanternfall and an Emberhold who've learned to respect each other.",
        "Your ally: Gildmere",
        "When the academy was rebuilt, Lanternfall drew the plans and wrote the Rules of Kindling, and Gildmere raised every coin and beam to build them. That partnership became the Blueprint Supper, held every spring, where the two houses share a meal over the real plans of the academy and argue cheerfully about what to build next. In real life, Gildmere-type people are your natural partners. They bring drive and practical sense to your ideas, and you bring depth and care to their plans.",
        "The others",
        "Hearthwood is Lanternfall's cousin: quieter than Emberhold, warmer than Gildmere. Lanternfall and Hearthwood students often end up studying together late at night, one bringing the answers and the other bringing the tea.",
        "One more thing. The Rules of Kindling now include a line added by an Emberhold student a century ago: 'If someone is still inside, open the door.' Lanternfall kept it. They're proud of that too.",
      ),
    },
    {
      title: "Your secondary house",
      teaser:
        "Your secondary house is your second flame: the house whose door made your candle flicker before it caught. It shapes what kind of Lanternfall student you are.",
      body: p(
        "During the Claiming, every new student carries an unlit taper through the Hall of Four Doors. Most wicks light at one door. Some flicker at another first, and older students call that the second flame. Your results show which house came second for you. Here's what each one adds to your Lanternfall light.",
        "If your second flame is Emberhold",
        "Your curiosity is brave. You don't just want to understand the world; you want to go out and test it. You're likely adventurous for a thinker, happy to explore, experiment and occasionally fail spectacularly. This blend is rare, since the two houses are rivals, and it makes you a natural bridge between them. The risk is chasing answers into situations that aren't safe.",
        "If your second flame is Gildmere",
        "Your curiosity is strategic. You like knowledge that leads somewhere: a plan, a system, a goal. You probably enjoy designing better ways of doing things and seeing your ideas put into practice. The risk is valuing only useful knowledge and forgetting the joy of learning for its own sake.",
        "If your second flame is Hearthwood",
        "Your curiosity is kind. You learn so that you can help, and you're likely the friend who explains, tutors and patiently answers the same question twice. People feel smarter around you, not smaller. The risk is putting everyone else's questions ahead of your own.",
        "Whatever your second flame, it's what makes your wisdom personal. Many Lanternfall students say their second flame is the answer to the question 'what is all this knowing for?' Read about your secondary house too. It may explain more about you than you'd expect, and it might just be the next question you pin to the wall.",
      ),
    },
    {
      title: "Your first night at Larkspire",
      teaser:
        "By the time the carts reach the academy it's nearly dark, and you've already counted the windows in the old spire and wondered why one of them is lit when the tower is supposed to be empty.",
      body: p(
        "You keep your questions to yourself on the walk up the steps, but there are a lot of them. Why is the oldest doorway carved with names? Why do the larks still circle the spire after dark? Why does the stone under your feet look newer here than over there?",
        "In the Hall of Four Doors, a teacher in spectacles hands you an unlit taper. 'Walk past each door,' he says. 'The candle will tell you.' You want to ask how. He seems to know that, because he adds, 'Nobody's worked that out yet. Feel free to try.'",
        "You walk. Copper and charcoal: nothing. Plum and gold: a faint warmth, and then nothing. Then a door of deep teal with a moth carved above the frame, and the wick catches with a sound like a small breath. The flame is steady and pale and very bright.",
        "Behind the teal door, a stair spirals upward into the dark, and all along it hang lanterns: hundreds of them, in every shape, glass and brass and paper, each one glowing. Window seats are tucked into every turn, full of students reading, arguing or asleep on open books. Someone near the bottom looks up and says, 'Oh good. A new one.'",
        "A girl with ink on her fingers takes you up, and up, to an empty hook on the wall. She hands you a small brass lantern. 'Everyone hangs one,' she says. 'Yours stays here as long as you do. Light it with your taper.'",
        "You do. Your lantern joins the others, and somehow the whole stair seems a little brighter.",
        "At the very top is a cork wall covered in pinned scraps of paper: questions. Some are new. Some are yellow with age. You read one, 'Why do we dream?', and another, 'How did the Old Hall's hearth burn for so long?' Then you take a blank card, write the question you've wondered about longest and pin it up.",
        "That night, you fall asleep in a window seat, watching the lanterns sway, already planning to answer at least three questions on the wall before breakfast.",
      ),
    },
    {
      title: "Your first-year quest",
      teaser:
        "Every Lanternfall first-year pins one question to the Question Wall and promises to answer one too. Here's your quest, translated for life beyond the academy.",
      body: p(
        "On the Lantern Stair, the first-year quest has two halves: find the answer to one question that matters to you, and help someone else find theirs. Your answers suggest your curiosity is already well lit. This year's quest is about turning it outward, so your knowledge becomes action and your wisdom reaches people.",
        "Your quest, step by step:",
        list(
          "Pin your question. Write down one real question you want to answer this year. It could be practical, like how to fix something, or big, like what you want to do with your life.",
          "Research, then act. Give yourself a time limit for learning. When it's up, take one real step based on what you've found, even if you're not completely sure.",
          "Share before it's perfect. Once a week, share an idea, a finding or a half-formed thought with someone. Let other minds improve it.",
          "Answer someone else's question. Help a friend, classmate or sibling understand something they've struggled with. Be patient, and remember how it felt not to know.",
          "Get out of the tower. Do one hands-on thing each month: an experiment, a trip, a new activity. Knowledge sticks better when you live it.",
          "Make an Emberhold friend. Find the boldest person you know and say yes to one of their plans. You'll learn things no book could teach you.",
          "Keep a lantern log. Write down one thing you learned each week. At the end of the year, read it from the beginning.",
        ),
        "By the end of your first year, the Lantern Stair won't just know you as clever. It'll know you as wise: someone who asks good questions, acts on good answers and holds the light up so others can see. That's what Ilse Marrow was really doing when she caught those falling lanterns. She wasn't saving knowledge for herself. She was lighting the way out.",
      ),
    },
  ],
};

export const hearthwood: Outcome = {
  key: "hearthwood",
  name: "Hearthwood",
  tagline: "Room for one more: the house that never leaves anyone behind.",
  emoji: "🌳",
  summary:
    "Hearthwood claims you. You hold groups together, keep your word and make people feel they belong. Loyalty, for you, isn't a rule; it's the way you love.",
  about: p(
    "Hearthwood is the house of loyalty at Larkspire Academy, the original magic school created for our Magic Academy House Quiz. On the Night of Embers, when the Old Hall burned, Hearthwood's first members gathered the youngest and most frightened students and led them into the oak grove beyond the walls. They kept them warm, fed and singing until dawn. Later, they rebuilt the dormitories with their own hands, from oaks the fire had brought down.",
    "Hearthwood's symbol is the wren, the small bird that sang back to them at dawn. Its colors are moss green and oak brown, and its motto is 'Room for one more.' Members gather in the Oak Lodge, a timber hall at the edge of the grove with one long table and a door that is never locked. On the wall hangs the Quilt of Names, stitched with a patch from every member the house has ever had.",
    "People claimed by Hearthwood tend to be loyal, fair-minded and warm. They're often the glue in their friend groups, the ones who notice who's missing and make sure everyone has a seat. Their growth edge is speaking up for themselves: saying no, naming their own needs and letting others care for them.",
    "Hearthwood's closest allies are the brave students of Emberhold. Its oldest rivals are the ambitious planners of Gildmere. Take the quiz to see whether the Oak Lodge would set a place for you.",
  ),
  snapshot: [
    "Your house: Hearthwood, home of loyalty and the Quilt of Names",
    "You hold groups together and notice who's being left out",
    "Your word is your bond, and people know it",
    "You're steady, fair and warm when things fall apart",
    "Your growth edge: standing up for your own needs, not just others'",
  ],
  deep: [
    {
      title: "The lore of Hearthwood",
      teaser:
        "On the Night of Embers, the youngest students had nowhere to go. A handful of older students took their hands, led them into the dark oak grove and promised not to let go until morning.",
      body: p(
        "Nobody made a plan. When the alarm sounded, the dormitory for the youngest students emptied into the courtyard in a confused, frightened crowd. An older student named Edda Thorne looked at them, barefoot and crying in the smoke, and simply started counting. Then she said, 'Everyone hold hands. We're going to the trees.'",
        "Her friends took the ends of the line. They led more than forty children into the oak grove beyond the walls, built a fire well away from the burning hall, wrapped them in every cloak they could find and kept them singing through the worst of the night, so nobody would hear the roof come down. At dawn, a wren in the oaks began to sing back. The children never forgot it.",
        "The Old Hall was gone, and in the long argument about what to rebuild first, Edda's group refused to give way: before anything else, the youngest students needed somewhere warm to sleep. They won. Then they built the dormitories themselves, from the oaks the fire had brought down, with help from anyone who would pick up a saw. The house that grew from that work was named for the wood and the warmth: Hearthwood.",
        "Here's what Hearthwood looks like today:",
        list(
          "Symbol: the wren, small, warm and loud for its size.",
          "Colors: moss green and oak brown.",
          "Motto: 'Room for one more.'",
          "Common room: the Oak Lodge, a timber hall at the edge of the grove, built from those same fallen oaks. One long table runs its whole length, and its door has never been locked.",
          "The Quilt of Names: a vast patchwork covering one wall. Every member sews in a patch on their first night, and the house adds a thread to it on their last.",
          "The Counting: at the start of every gathering, someone counts heads out loud. If anyone is missing, someone goes to find them.",
        ),
        "Hearthwood students say the Oak Lodge always has exactly one more chair than it needs. Nobody has ever caught anyone adding them.",
      ),
    },
    {
      title: "Your Hearthwood traits",
      teaser:
        "Outside the academy, Hearthwood energy looks like the friend who remembers your birthday, saves you a seat and turns up with soup before you've even said you're sick.",
      body: p(
        "The magic is invented, but the traits behind your result are real. People who land in Hearthwood tend to share a recognizable set of everyday habits.",
        list(
          "You keep your word. If you say you'll be there, you're there. Reliability matters enormously to you.",
          "You notice who's left out. In any group, you're aware of the person on the edge, and you often pull them in.",
          "You value fairness. You want everyone to have a turn, a voice and a share. Unfairness bothers you deeply.",
          "You're steady in a crisis. When things fall apart, you tend to stay calm and focus on taking care of people.",
          "You build lasting bonds. Your friendships tend to be few, deep and long. People who get close to you stay close.",
          "You show love through care. Cooking, helping, listening, remembering details: your love is practical and warm.",
        ),
        "In real life, this might look like being the one who organizes the group gift, checks in on a friend after a bad day or refuses to leave a party until everyone has a ride home.",
        "These traits have a shadow when they run unchecked. Loyalty can keep you in friendships or groups that no longer treat you well. Caring for everyone can mean neglecting yourself. A love of harmony can make it hard to speak up or disagree. Hearthwood students often learn that 'room for one more' should include room for their own needs.",
        "The best Hearthwood students remember what Edda Thorne did on the Night of Embers: she didn't just comfort the children. She led them. Loyalty, at its strongest, isn't passive. It's the courage to stand up, take charge and protect people, including yourself. When your warmth is matched by that kind of strength, you become the person everyone trusts with what matters most.",
      ),
    },
    {
      title: "Your role in the house",
      teaser:
        "Every Hearthwood student grows into one of three roles, and the house you scored second decides which: the Warden, the Quartermaster or the Confidant.",
      body: p(
        "Loyalty takes different forms, and Hearthwood has always made room for each one. Check your secondary house in your results to find your role.",
        "The Warden (secondary house: Emberhold)",
        "Wardens guard the door. They combine Hearthwood loyalty with Emberhold courage, so they're protective, brave and quick to step in. Tradition says the Warden leads the Counting and is the one who goes out into the dark to find anyone missing. In real life, you're likely the friend who stands up for others, walks people home and won't tolerate anyone being treated badly. Watch out for taking on fights that aren't yours to carry alone.",
        "The Quartermaster (secondary house: Gildmere)",
        "Quartermasters make sure everyone has what they need. They blend Hearthwood care with Gildmere organization, which is rare, since the two houses are rivals. Tradition says the Quartermaster runs Hearthwood's stall at the Harvest Market and decides what's sold and what's given away. In real life, you're likely the organizer behind the scenes: planning the event, managing the budget, making sure the team has supplies and nobody goes without. Watch out for being so busy providing that you never enjoy what you've built.",
        "The Confidant (secondary house: Lanternfall)",
        "Confidants hold the house's secrets and its hearts. They mix Hearthwood warmth with Lanternfall insight, so they're deep listeners and wise advisors. Tradition says the Confidant sits by the fire after everyone else has gone to bed, available to anyone who needs to talk. In real life, you're likely the friend people bring their problems to, because you listen without judging and offer thoughtful advice. Watch out for absorbing everyone's worries and never sharing your own.",
        "Whichever role is yours, the Oak Lodge needs all three. Wardens keep the house safe, Quartermasters keep it supplied and Confidants keep it whole.",
      ),
    },
    {
      title: "Rivals and allies",
      teaser:
        "Hearthwood's oldest friendship was sealed with a blanket on the Night of Embers. Its oldest rivalry began with a stubborn argument about dormitories.",
      body: p(
        "When Emberhold students came out of the smoke carrying classmates, the first people they handed them to were Hearthwood students, waiting with blankets at the edge of the grove. Emberhold went in; Hearthwood took care of whoever came out. That handoff became one of the strongest bonds at Larkspire.",
        "Your ally: Emberhold",
        "Every year at the first frost, the two houses hold the Frost Supper, a long outdoor meal around a bonfire lit from Emberhold's Long Hearth. Emberhold cooks; Hearthwood sets the tables and makes sure everyone has a seat. In real life, Emberhold-type people are your natural partners. They bring boldness to your loyalty, and you bring patience and care to their courage. Together, you protect people from every angle.",
        "Your rival: Gildmere",
        "When the money came in to rebuild, Gildmere wanted to build a grand new spire first, to impress donors and attract new students. Hearthwood insisted the dormitories come first, so no one would spend another winter in tents. Hearthwood won. Gildmere waited three years for its spire and has never quite forgotten it. Today the rivalry plays out at the Harvest Market each autumn: Gildmere's stalls aim for profit, Hearthwood gives half its goods away, and both claim victory every year.",
        "In real life, Gildmere-type people might seem too focused on status or success. But they often see possibilities you'd miss, and they can help your care reach further than you could manage alone.",
        "The others",
        "Lanternfall is Hearthwood's cousin. The two houses often study together late at night, one bringing the answers and the other bringing the tea. Quiet friendships between them are common, and deep.",
        "Many Gildmere graduates eventually admit that the dormitories were the right call. Hearthwood has never once said 'I told you so.' That, Gildmere says, is what makes it so annoying.",
      ),
    },
    {
      title: "Your secondary house",
      teaser:
        "Your secondary house is your second flame: the house whose door made your candle flicker before it caught. It shapes what kind of Hearthwood student you are.",
      body: p(
        "During the Claiming, every new student carries an unlit taper through the Hall of Four Doors. Most wicks light at one door. Some flicker at another first, and older students call that the second flame. Your results show which house came second for you. Here's what each one adds to your Hearthwood warmth.",
        "If your second flame is Emberhold",
        "Your loyalty is fierce. You don't just care for people; you defend them. You're likely the friend who steps in when someone is mistreated and stands firm when things get scary. The risk is fighting everyone's battles and forgetting that you deserve protecting too.",
        "If your second flame is Gildmere",
        "Your loyalty is ambitious. You want your people to thrive, not just get by, and you're good at organizing plans, resources and support to make that happen. This blend is rare, since the two houses are rivals, and it often produces the house's most effective leaders. The risk is turning care into a never-ending project and running yourself into the ground.",
        "If your second flame is Lanternfall",
        "Your loyalty is thoughtful. You understand people deeply and offer wise, patient support. Friends trust you with their secrets because you listen carefully and never judge. The risk is spending so much time understanding others that you never let anyone understand you.",
        "Whatever your second flame, it's part of what makes your loyalty yours. Many Hearthwood students say their second flame taught them that caring for people takes many forms. Read about your secondary house too, and notice which parts feel like home. Then sew a little of it into your own patch.",
      ),
    },
    {
      title: "Your first night at Larkspire",
      teaser:
        "The carts reach the top of the hill just as the sun goes down, and the first thing you notice isn't the spire or the towers. It's the smell of woodsmoke and something baking, drifting out of the trees.",
      body: p(
        "You help the kid next to you with their trunk, because they're struggling and nobody else has noticed. They whisper thanks. You walk up the steps together, and somehow that makes it easier for both of you.",
        "In the Hall of Four Doors, a teacher with flour on her sleeve hands you an unlit taper. 'Walk past each door,' she says gently. 'Take your time. It always finds you.'",
        "You walk. Plum and gold: nothing. Teal and cream: nothing. Copper and charcoal: a flicker, warm and sudden, then gone. And then a door of dark oak, bound in moss-green iron, with a small bird carved over the frame. The wick lights so gently you almost miss it, a soft golden flame that doesn't waver at all.",
        "The oak door opens onto a path. It leads out of the hall, across a lantern-lit lawn and to the edge of the grove, where a long timber lodge glows between the trees. Its door stands open. Inside, a single table runs the length of the hall, crowded with students, plates and candles, and every one of them seems to look up at once.",
        "'Count!' someone calls. 'Thirty-one,' someone answers, and then, looking at you and grinning, 'Thirty-two.'",
        "There's already a place set for you. You don't know how. An older boy pulls out the chair and pushes a plate of warm bread toward you. Halfway through dinner, a girl hands you a square of moss-green cloth and a needle. 'For the Quilt of Names,' she says, nodding at the enormous patchwork on the far wall. 'Stitch your name, or a symbol, or anything. Then you're part of it. Always.'",
        "You sew slowly, carefully. When you're done, they hang your patch near the bottom of the quilt, next to someone who left fifty years ago. The whole table raises a cup to you.",
        "Later, in a bunk built from old oak, you lie listening to the trees creak and the low murmur of someone still talking by the fire. Just before dawn, a wren starts singing outside your window. You fall back asleep feeling, for the first time in a long time, completely at home.",
      ),
    },
    {
      title: "Your first-year quest",
      teaser:
        "Every Hearthwood first-year makes a promise when they sew their patch into the Quilt of Names. Here's yours, translated for life beyond the academy.",
      body: p(
        "In the Oak Lodge, the first-year quest is to keep one promise to someone else and one to yourself. Your answers suggest you're already brilliant at the first kind. This year's quest is about the second: making sure your loyalty includes you, and that your warmth is matched by strength.",
        "Your quest, step by step:",
        list(
          "Make two promises. Write down one promise to someone you care about and one promise to yourself. Treat the second as seriously as the first.",
          "Practice saying no. Once a week, decline something you'd normally agree to out of obligation. Keep it kind and short. Notice that the people who truly care about you don't leave.",
          "Do your own Counting. Once a month, check in on yourself the way you'd check on a friend: How am I sleeping? What do I need? Who haven't I seen?",
          "Lead once. Like Edda Thorne on the Night of Embers, step up and take charge of something this term: a project, a plan, a group outing. Loyalty can lead.",
          "Make a Gildmere friend. Find the most ambitious person you know and ask about their goals. Offer your help, and let them help you think bigger about your own.",
          "Let someone care for you. Accept help, a meal or a favor without rushing to repay it.",
          "Stitch your year. Keep a small record of the moments you were there for someone, and the moments someone was there for you. Read it when you're tired.",
        ),
        "By the end of your first year, the Oak Lodge won't just know you as loyal. It'll know you as strong: someone who keeps their word, protects their people and has learned to leave room for one more, including themselves. That's what Edda Thorne was really doing in the grove. She wasn't just holding hands. She was showing everyone, herself included, that no one gets left behind.",
      ),
    },
  ],
};
