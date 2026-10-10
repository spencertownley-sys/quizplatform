import type { Outcome } from "@/lib/engine/types";

/**
 * Magic Academy House Quiz outcomes: Emberhold, Gildmere.
 * Original lore only; see the lore bible at the top of magic-academy-house-quiz.ts.
 */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const emberhold: Outcome = {
  key: "emberhold",
  name: "Emberhold",
  tagline: "First through the smoke, last to leave a friend behind.",
  emoji: "🔥",
  summary:
    "Emberhold claims you. You act when others hesitate, face problems head-on and would walk through smoke for the people you care about. Your courage is the spark that gets everyone else moving.",
  about: p(
    "Emberhold is the house of courage at Larkspire Academy, the original magic school created for our Magic Academy House Quiz. Its story begins on the Night of Embers, when the Old Hall caught fire and a group of students ran into the smoke instead of away from it. They pulled their classmates out, and one of them carried the last living coal of the Old Hall's hearth out in her charm-wrapped hands. That coal still burns in Emberhold's Long Hearth today.",
    "Emberhold's symbol is the salamander, the creature old stories say can live in fire. Its colors are copper and charcoal, and its motto is 'Through, not around.' Members gather in the Forge Loft, a round room above the academy's old smithy, where a brass bell hangs by the door. Ring it after doing something that scared you, and the whole room cheers.",
    "People claimed by Emberhold tend to be bold, direct and protective. They're often the first to volunteer, the first to speak up and the first to defend a friend. Their growth edge is patience: learning that courage sometimes means waiting, listening or asking for help.",
    "Emberhold's closest allies are the loyal students of Hearthwood. Its fiercest rivals are the thinkers of Lanternfall. Take the quiz to see whether the Long Hearth would light for you.",
  ),
  snapshot: [
    "Your house: Emberhold, home of courage and the Long Hearth",
    "You act when others hesitate and face problems head-on",
    "You protect your people fiercely, especially the underdog",
    "Your honesty is direct, sometimes a little too direct",
    "Your growth edge: pausing to plan before you charge",
  ],
  deep: [
    {
      title: "The lore of Emberhold",
      teaser:
        "Two centuries ago, on the night the Old Hall burned, a handful of students ran into the smoke instead of away from it. Emberhold was born in those few minutes, and it has never quite cooled down.",
      body: p(
        "The Old Hall was a rambling stone school on the hill where Larkspire stands now. On a cold autumn night, a late experiment with summoned light went badly wrong in the east wing. By the time the alarm bells rang, the stairs were full of smoke.",
        "Most students did the sensible thing and ran for the doors. A few did the other thing. They wrapped wet cloaks around their faces, went back up the burning stairs and came down again carrying classmates who couldn't find their way. The last of them, a student named Maren Ashby, stopped in the great kitchen on her way out. The Old Hall's hearth had burned since the school was founded, and she couldn't stand to let it die. She wrapped her hands in a cooling charm, scooped up the last living coal and carried it out into the night.",
        "When Larkspire was built on the ashes, that coal lit its first fire. The students who had gone back into the smoke asked to keep it, and the house they formed took its name from what Maren did. They were the ones who held the ember: Emberhold.",
        "Here's what Emberhold looks like today:",
        list(
          "Symbol: the salamander, the creature old stories say can live in fire.",
          "Colors: copper and charcoal, the colors of a coal at its hottest.",
          "Motto: 'Through, not around.'",
          "Common room: the Forge Loft, a round room above the academy's old smithy. Its beams are still dark with soot, left unpainted on purpose, and the Long Hearth in the middle has never been allowed to go out.",
          "The Brave Bell: a small brass bell by the door. Any member who does something that scared them may ring it once, and the whole room stops to cheer. Nobody asks what it was unless you want to tell.",
          "The Ember Watch: each night, one student sits up with the Long Hearth until midnight. It's considered an honor, and the best conversations in the house happen there.",
        ),
        "Emberhold students say the fire in the Long Hearth burns a little brighter whenever someone in the house does something brave. Nobody has ever proved it. Nobody has tried very hard to disprove it, either.",
      ),
    },
    {
      title: "Your Emberhold traits",
      teaser:
        "Outside the academy walls, Emberhold energy looks like the friend who says the hard thing, tries the scary thing and stands up for whoever's being picked on.",
      body: p(
        "The magic is made up, but the traits behind your result are real. People who land in Emberhold tend to share a recognizable set of everyday habits.",
        list(
          "You act first. When a problem appears, your instinct is to do something about it, now. Waiting feels worse to you than trying and failing.",
          "You're direct. You say what you think, and you'd rather have an honest argument than a polite silence.",
          "You protect the underdog. Unfairness makes you angry, especially when someone smaller, newer or quieter is on the receiving end.",
          "You like a challenge. The harder or scarier a task looks, the more interested you get.",
          "You recover fast. Mistakes sting, but you tend to dust yourself off and go again.",
          "You're loyal in action. You show you care by turning up, stepping in and backing people up when it counts.",
        ),
        "In real life, this might look like being the first to volunteer for the presentation, the friend who calls out a mean joke, or the person who tries the new sport, the hard class or the big trip while others are still thinking about it.",
        "These traits have a cost when they run unchecked. Acting first can mean acting before you have the full picture. Directness can land as harshness. A love of challenge can tip into taking risks that aren't worth it, just to prove you can. Emberhold students often learn the hard way that courage and recklessness look alike from a distance.",
        "The best Emberhold students develop a second kind of bravery: the courage to pause, to say 'I don't know', to ask for help and to change their mind. Combine that with your natural boldness, and you become the kind of person others would follow into any corridor, however dark.",
      ),
    },
    {
      title: "Your role in the house",
      teaser:
        "Every Emberhold student grows into one of three roles, and the house you scored second decides which: the Vanguard, the Pathfinder or the Shieldbearer.",
      body: p(
        "Courage takes different shapes, and Emberhold has always known it. Since the Night of Embers, the house has recognized three roles. Check your secondary house in your results to find yours.",
        "The Vanguard (secondary house: Gildmere)",
        "Vanguards lead the charge. They combine Emberhold daring with Gildmere ambition, so their bravery has a direction. In house tradition, the Vanguard stands up at the start of the Kindling Trials and tells everyone exactly what Emberhold is going to win. In real life, you're likely the person who takes charge in a crisis, pitches the bold idea and doesn't just face the challenge but aims to come out on top. Watch out for turning every situation into a contest.",
        "The Pathfinder (secondary house: Lanternfall)",
        "Pathfinders go first into the unknown. They mix courage with curiosity, so they're drawn to unmapped corridors, unanswered questions and untried ideas. Tradition says the Pathfinder carries the lantern on the Ember Watch's midnight walk. In real life, you're likely the explorer: first to try a new place, a new subject or a new way of doing things, and quick to learn from what you find. Watch out for wandering off without telling anyone where you've gone.",
        "The Shieldbearer (secondary house: Hearthwood)",
        "Shieldbearers stand between their friends and harm. They blend Emberhold courage with Hearthwood loyalty, and they're the heart of the house's protective streak. Tradition says the Shieldbearer walks last whenever the house moves together, so no one is left behind. In real life, you're likely the friend who defends others, walks people home and quietly takes the heat to protect someone smaller. Watch out for carrying everyone's battles as if they were your own.",
        "Whichever role is yours, the Long Hearth needs all three. Vanguards set the pace, Pathfinders find the way and Shieldbearers make sure everyone arrives.",
      ),
    },
    {
      title: "Rivals and allies",
      teaser:
        "Emberhold's oldest friendship and its fiercest rivalry were both born on the Night of Embers, in the same hour, on the same smoky stairs.",
      body: p(
        "When the Emberhold students came down the burning stairs with their rescued classmates, the first people they handed them to were the students of Hearthwood, who wrapped them in blankets and led them to the oak grove. That handoff became the bond between the two houses. Emberhold runs in; Hearthwood takes care of whoever comes out.",
        "Your ally: Hearthwood",
        "Every year at the first frost, the two houses hold the Frost Supper, a long outdoor meal around a bonfire lit from the Long Hearth. Emberhold students cook; Hearthwood students set the tables and make sure everyone has a seat. In real life, Hearthwood-type people are your natural teammates. They share your protective instinct and add patience, kindness and staying power. When you're about to charge, they're the ones who remind you to bring snacks and a friend.",
        "Your rival: Lanternfall",
        "After the fire, Lanternfall's scholars studied what had happened. Their report said the fire spread faster because brave students kept opening doors and feeding the flames with air. Emberhold pointed out, loudly, that Lanternfall had been busy saving books while people were still trapped. Both were right, and neither has quite forgiven the other. Today the rivalry lives on in the Kindling Trials, the end-of-year contest where Emberhold usually wins the races and Lanternfall usually wins the riddles.",
        "In real life, Lanternfall-type people may frustrate you with their need to think everything through. But they often see the trap you were about to run into. Rivals who respect each other make each other better.",
        "The others",
        "Gildmere is Emberhold's cousin. Both houses like to lead, and they get along well as long as they agree on who's in charge. Expect shared ambitions and the occasional argument about who gets the credit.",
        "Most Emberhold students end up with at least one close Lanternfall friend by their final year. Nobody in the Forge Loft admits it out loud.",
      ),
    },
    {
      title: "Your secondary house",
      teaser:
        "Your secondary house is your second flame: the house whose door made your candle flicker before it caught. It changes what kind of Emberhold student you are.",
      body: p(
        "During the Claiming, every new student carries an unlit taper through the Hall of Four Doors. For most, the wick lights at one door. For some, it flickers at another door first, just for a breath. Older students call that the second flame, and it says a great deal about who you'll become. Your results show which house came second for you. Here's what each one adds to your Emberhold fire.",
        "If your second flame is Gildmere",
        "Your courage has ambition behind it. You don't just want to face the challenge; you want to win it and build something from the victory. You're likely confident, competitive and good at rallying people toward a goal. The risk is that you start choosing fights for the glory rather than the cause. Keep asking who your bravery is for.",
        "If your second flame is Lanternfall",
        "Your courage is curious. You're drawn to mysteries, unexplored places and questions nobody has answered. This is the rarest Emberhold blend, since the two houses are rivals, and it makes you unusually thoughtful for someone so bold. You may find yourself defending Lanternfall in the Forge Loft. The risk is getting so absorbed in a puzzle that you forget the people waiting for you.",
        "If your second flame is Hearthwood",
        "Your courage is protective. You're brave for others more than for yourself, and you're likely the one who steps in when someone is being treated unfairly. Friends feel safe around you. The risk is overextending: fighting everyone's battles and forgetting to let others fight for you.",
        "Whatever your second flame, it isn't a lesser part of you. Many Larkspire students say it's the part that makes their main house feel like their own. Read about your secondary house too. You may recognize yourself there more than you expected.",
      ),
    },
    {
      title: "Your first night at Larkspire",
      teaser:
        "The cart crests the last hill at dusk, and there it is: Larkspire, its single old spire black against a copper sky, the larks still circling as the lamps come on.",
      body: p(
        "You climb down stiff from the long ride, your bag over one shoulder, and follow the line of new students up the stone steps. Nobody talks much. Inside, the Hall of Four Doors is colder than you expected and taller than seems possible, and every sound comes back to you twice.",
        "Someone hands you a taper. It's plain white wax, unlit, about the length of your hand. 'Walk past each door,' a tall teacher says. 'Slowly. Don't try to choose.'",
        "You walk. The first door is plum and gold, and the wick does nothing. The second is teal and cream, with a moth carved above the frame. Nothing. You're halfway to the third door, copper bands on charcoal wood, when you feel heat against your fingers. You look down. The wick is burning, steady and bright, and you never felt it catch.",
        "The copper door swings open before you reach it.",
        "Behind it, a stair spirals upward, warm air rolling down to meet you. You climb toward voices and firelight and come out into a round room under sooty beams. In the middle burns the biggest fire you have ever seen indoors: the Long Hearth. Thirty faces turn toward you, and someone at the back starts clapping, and then they all are.",
        "A girl with a burn scar across one knuckle hands you a splinter of kindling. 'Tradition,' she says. 'Throw it in, and tell the fire one thing you're scared of. Out loud. Then it's not yours to carry alone anymore.'",
        "Your throat goes tight. You say it anyway, quietly, and throw the splinter in. The fire flares, and the room cheers as if you'd done something heroic. Maybe you have.",
        "Later, someone shows you a bunk under the eaves, and you lie awake listening to the fire settle and the bell by the door creak in the draft. You think about home, about the copper door that opened before you touched it, and about tomorrow.",
        "Just before you fall asleep, you hear someone ring the Brave Bell, once, softly. You don't know who it was or why. You find you're smiling anyway.",
      ),
    },
    {
      title: "Your first-year quest",
      teaser:
        "Every Emberhold first-year is given a quest: one act of real courage, chosen by you and finished by midsummer. Here's yours, translated for the world outside the academy.",
      body: p(
        "In the Forge Loft, the first-year quest is simple: do the brave thing you've been avoiding. Not the flashy brave thing, the real one. In everyday life, that often means a quieter kind of courage than charging through doors. Your answers suggest you already have plenty of the charging kind. This year, practice the others.",
        "Your quest, step by step:",
        list(
          "Name it. Write down one thing you've been avoiding because it scares you: a conversation, an apology, an audition, a question you've never asked. That's your quest.",
          "Plan before you charge. Spend 20 minutes working out how you'll do it. Courage with a plan is still courage, and it's far more likely to work.",
          "Pause once a day. Before you react to something that annoys you, count to five. Notice how often the pause changes what you say.",
          "Ask for help. Pick one challenge this term and deliberately bring someone in. For an Emberhold, letting others help is a brave act.",
          "Defend someone quietly. The next time you see someone being left out or picked on, step in, in a way that makes them feel stronger rather than rescued.",
          "Ring your own bell. Each time you do something that scared you, mark it: a note in your phone, a tally on your wall, a message to a friend. Watch the list grow.",
          "Make a Lanternfall friend. Find the most thoughtful, careful person you know and ask their advice on something real. Listen to the whole answer.",
        ),
        "By the end of your first year, the Long Hearth won't just know you as bold. It'll know you as brave in every way that counts: bold enough to act, wise enough to wait and strong enough to ask. That's what Maren Ashby was doing when she stopped in the kitchen for the coal. She wasn't just running into danger. She was choosing what was worth carrying out.",
      ),
    },
  ],
};

export const gildmere: Outcome = {
  key: "gildmere",
  name: "Gildmere",
  tagline: "Aim high, plan well and build something that outlasts you.",
  emoji: "🪙",
  summary:
    "Gildmere claims you. You see where things are heading, plan several moves ahead and want your work to add up to something that lasts. Ambition, for you, is a way of caring about the future.",
  about: p(
    "Gildmere is the house of ambition at Larkspire Academy, the original magic school created for our Magic Academy House Quiz. On the Night of Embers, when the Old Hall caught fire, Gildmere's first members didn't run in or run away. They organized. They formed bucket lines from the Mere, sent runners to wake the town and, in the weeks that followed, raised the money and timber to build a new school on the ashes. Their name comes from that night, when the firelight turned the surface of the Mere to gold.",
    "Gildmere's symbol is the heron, the bird that stands perfectly still in the shallows until the right moment. Its colors are plum and gold, and its motto is 'Build what lasts.' Members gather in the Glass Gallery, a long room of tall windows above the Mere, where every student writes one goal a year in the Ledger of Intent.",
    "People claimed by Gildmere tend to be strategic, driven and resourceful. They're often the planners, organizers and persuaders in a group. Their growth edge is generosity of spirit: remembering that people matter more than plans, and that not everything worth doing can be measured.",
    "Gildmere's closest allies are the scholars of Lanternfall. Its oldest rivals are the loyal students of Hearthwood. Take the quiz to see whether the heron would claim you.",
  ),
  snapshot: [
    "Your house: Gildmere, home of ambition and the Ledger of Intent",
    "You plan several moves ahead and like turning ideas into results",
    "You're persuasive, resourceful and good at rallying support",
    "You want your efforts to build something that lasts",
    "Your growth edge: valuing people and rest as much as progress",
  ],
  deep: [
    {
      title: "The lore of Gildmere",
      teaser:
        "While the Old Hall burned, a few students stood at the edge of the Mere and did the least dramatic, most important thing anyone did that night: they organized.",
      body: p(
        "When the bells rang on the Night of Embers, an older student named Tobias Vale was on the lawn above the Mere. He saw the smoke, saw students running in every direction and saw that nobody was in charge. So he took charge. He lined up everyone he could grab between the water and the burning wing, passing buckets hand to hand. He sent the two fastest runners down the hill road to wake the town. By the time the town's carts arrived with ladders and barrels, there was a plan waiting for them.",
        "Students who were there remembered the strangest thing: the fire's light on the still water turned the Mere the color of gold, and in the shallows a single heron stood perfectly still all night, watching. Tobias's group became known as the ones who worked by the gilded mere. Gildmere.",
        "The fire was only the beginning. The Old Hall was gone, and the school had no money to rebuild. Gildmere students spent the next two years writing letters, persuading merchants, trading favors and raising every coin and beam that built Larkspire. The academy's oldest doorway still carries the names of everyone who gave, carved in gold leaf.",
        "Here's what Gildmere looks like today:",
        list(
          "Symbol: the heron, patient and precise.",
          "Colors: plum and gold.",
          "Motto: 'Build what lasts.'",
          "Common room: the Glass Gallery, a long hall of tall windows overlooking the Mere, with a great map table in the middle and gold-leaf stars on the ceiling.",
          "The Ledger of Intent: a huge leather book by the fireplace. On their first night, and on the first night of every year after, each member writes one goal in it. At the end of the year, they come back and write what happened. Older students say reading the Ledger is like reading two hundred years of hope.",
          "The Heron's Hour: on the last evening of each term, members stand in silence at the windows for one minute, watching the Mere, to remember that patience is part of every plan.",
        ),
        "Gildmere students like to say Larkspire wouldn't exist without them. They're not entirely wrong.",
      ),
    },
    {
      title: "Your Gildmere traits",
      teaser:
        "Outside the academy, Gildmere energy looks like the friend who has a plan, a backup plan and a quiet idea about how to make the whole thing bigger.",
      body: p(
        "The magic is invented, but the traits behind your result are real. People who land in Gildmere tend to share a recognizable set of everyday habits.",
        list(
          "You think ahead. You naturally consider where things are going, what could go wrong and how to get the best result.",
          "You're resourceful. You know how to find what you need: the right person, the right tool, the shortcut nobody noticed.",
          "You're persuasive. You can explain an idea in a way that gets people on board, and you enjoy a good negotiation.",
          "You set goals. You like having something to aim for, and you feel restless when life lacks direction.",
          "You care about quality and reputation. You want your work to be good and your name to mean something.",
          "You turn ideas into reality. Plenty of people dream; you're the one who makes the list and starts working through it.",
        ),
        "In real life, this might look like organizing the group trip, running for a student role, starting a small side project, or quietly planning your next three steps while others are still deciding on the first.",
        "These traits have a shadow when they run unchecked. Thinking ahead can turn into never enjoying the present. Persuasion can slide into manipulation if you're not careful. Ambition can tempt you to measure people by what they can do for your plans. Gildmere students often learn that the best-laid plans still need people who trust you, and that trust is built slowly.",
        "The best Gildmere students learn to aim their ambition at something bigger than themselves. Tobias Vale didn't organize the bucket lines to become famous. He did it because someone had to, and because he could see how. When your drive is pointed at building something that helps others, ambition stops being about status and becomes a kind of care.",
      ),
    },
    {
      title: "Your role in the house",
      teaser:
        "Every Gildmere student grows into one of three roles, and the house you scored second decides which: the Herald, the Architect or the Steward.",
      body: p(
        "Ambition takes many forms, and Gildmere has always given each form a name. Check your secondary house in your results to find your role.",
        "The Herald (secondary house: Emberhold)",
        "Heralds are the voice of the house. They combine Gildmere strategy with Emberhold boldness, so they're confident, persuasive and unafraid of the spotlight. Tradition says the Herald speaks for Gildmere at the start of each term, announcing the house's goals to the whole academy. In real life, you're likely the person who pitches the idea, leads the meeting or gives the speech. Watch out for promising more than you can deliver, or talking over quieter people.",
        "The Architect (secondary house: Lanternfall)",
        "Architects design the future. They blend Gildmere ambition with Lanternfall curiosity, so they're strategic thinkers who love a complex plan. Tradition says the Architect keeps the great map table in the Glass Gallery, updating it with every project the house is working on. In real life, you're likely the planner who sees the whole system: the one who builds the schedule, the budget or the master plan. Watch out for planning so thoroughly that you never launch.",
        "The Steward (secondary house: Hearthwood)",
        "Stewards build for others. They mix Gildmere drive with Hearthwood loyalty, so their ambition serves the group. This is the rarest Gildmere blend, since the two houses are old rivals. Tradition says the Steward manages the house's shared fund, making sure every member has what they need. In real life, you're likely the organizer who makes sure the team has resources, the club runs smoothly and nobody is left out. Watch out for taking on so much responsibility that you burn out.",
        "Whichever role is yours, the Glass Gallery needs all three. Heralds win support, Architects design the path and Stewards make sure the house is strong enough to walk it.",
      ),
    },
    {
      title: "Rivals and allies",
      teaser:
        "Gildmere's closest alliance and its oldest grudge both began with the same question after the fire: what should Larkspire build first?",
      body: p(
        "When the money finally came in to rebuild the school, the four houses had to decide what to build first. Gildmere wanted a grand new spire: something tall and beautiful that would draw new students and new donors. Lanternfall wanted a safe design that could never burn again. Hearthwood wanted dormitories, so that no student would spend another winter sleeping in tents.",
        "Your ally: Lanternfall",
        "Gildmere and Lanternfall worked together on the plans, with Gildmere raising the money and Lanternfall drawing the designs and writing the Rules of Kindling to keep the new school safe. That partnership became the Blueprint Supper, held every spring, where the two houses share a meal over the actual plans of the academy and argue happily about what to build next. In real life, Lanternfall-type people are your natural partners. They bring depth and careful thinking to your big goals, and you bring the drive that makes their ideas real.",
        "Your rival: Hearthwood",
        "Hearthwood won the argument about the dormitories, and the spire had to wait three years. Gildmere has never entirely let it go. Today the rivalry plays out at the Harvest Market each autumn, where every house runs stalls. Gildmere aims to make the most money. Hearthwood gives half its goods away. Every year, both claim victory.",
        "In real life, Hearthwood-type people may seem too focused on keeping everyone comfortable to get anything ambitious done. But they're often right about what people actually need, and they'll remind you that a great plan is worthless if it leaves people behind.",
        "The others",
        "Emberhold is Gildmere's cousin. Both houses like to lead, and they make a strong team as long as they agree on who's in charge.",
        "Quietly, many Gildmere graduates admit that the best thing the house ever did was lose the argument about the dormitories. The spire is beautiful. But the dormitories are why students stayed.",
      ),
    },
    {
      title: "Your secondary house",
      teaser:
        "Your secondary house is your second flame: the house whose door made your candle flicker before it caught. It shapes what kind of Gildmere student you are.",
      body: p(
        "During the Claiming, every new student carries an unlit taper through the Hall of Four Doors. Most wicks light at one door. Some flicker at another first, just for a breath, and older students call that the second flame. Your results show which house came second for you. Here's what each one adds to your Gildmere drive.",
        "If your second flame is Emberhold",
        "Your ambition has fire in it. You're bold, quick to act and willing to take risks for big rewards. You probably enjoy leading from the front and winning people over with sheer energy. The risk is impatience: wanting results so fast that you skip the planning that makes them last.",
        "If your second flame is Lanternfall",
        "Your ambition is thoughtful. You love strategy, research and designing smart systems. You're likely the one who reads the rules carefully before finding the loophole. The risk is overthinking: planning so carefully that the moment to act slips past.",
        "If your second flame is Hearthwood",
        "Your ambition is generous. You want success, but you want it for your people as much as for yourself. This is the rarest Gildmere blend, since the two houses are rivals, and it often produces the house's best leaders. The risk is treating everyone's needs as your personal project and running yourself ragged.",
        "Whatever your second flame, it's not a footnote. Many Gildmere students say their second flame is what keeps their ambition honest: it answers the question of what all that building is for. Read about your secondary house too, and notice which parts of it feel familiar. You may find that the house you nearly joined explains the goals you've never quite said out loud.",
      ),
    },
    {
      title: "Your first night at Larkspire",
      teaser:
        "The cart rounds the last bend at dusk, and below the academy the Mere catches the sunset and turns, for one long moment, the color of gold.",
      body: p(
        "You notice everything on the walk up from the carts: which students already know each other, which teachers stand closest to the doors, the names carved in gold over the oldest doorway. You file it all away. You're not sure why yet.",
        "In the Hall of Four Doors, a teacher with silver rings on every finger hands you an unlit taper. 'Walk past each door,' she says. 'Slowly. The candle decides, not you.'",
        "You've never liked not deciding. You walk anyway. Copper and charcoal: nothing. Moss green and oak: nothing. Teal and cream: the wick seems to warm, just for a heartbeat, and then cools. And then the fourth door, plum wood banded with gold, and the taper bursts into a clean, tall flame as if it had been waiting for you all along.",
        "Beyond the door is a long room made almost entirely of windows. The Mere lies below, dark now, with the academy's lights reflected in it. Gold stars glitter on the ceiling. A great table in the middle is covered in maps, and around it a dozen students look up at you with frank, measuring interest. Then one of them grins. 'Another one,' he says. 'Welcome to the Glass Gallery.'",
        "By the fireplace sits the biggest book you've ever seen, bound in plum leather. An older student opens it to a fresh page and hands you a pen. 'The Ledger of Intent,' she says. 'Write one thing you want to have done by the end of the year. Something real. Next summer, you'll come back and write what happened.'",
        "You hold the pen for a long time. Then you write it down in small, clear letters: a goal you've never said out loud. When you look up, she's nodding, as if she can read it upside down.",
        "Later, in a narrow bed by a tall window, you lie awake watching the Mere. Somewhere below, a heron stands in the shallows, perfectly still, waiting for its moment. You know exactly how it feels. Tomorrow, you think, it begins.",
      ),
    },
    {
      title: "Your first-year quest",
      teaser:
        "Every Gildmere first-year writes a goal in the Ledger of Intent on their first night. Here's yours, translated for the world beyond the academy, with a plan to match.",
      body: p(
        "In the Glass Gallery, the first-year quest is to write one goal and actually finish it. Not the biggest goal you can imagine; the one that matters most. Your answers suggest you already have ambition to spare. This year, the quest is to use it well: with patience, with people and with a clear sense of what you're building and why.",
        "Your quest, step by step:",
        list(
          "Write your Ledger entry. Choose one goal for the next twelve months, specific enough that you'll know when it's done. Put it somewhere you'll see it.",
          "Ask why. Next to your goal, write who it's really for. If the answer is 'to impress people', look for the deeper reason underneath. That reason will carry you further.",
          "Plan like an Architect. Break the goal into monthly steps and put the first one on your calendar this week.",
          "Keep the Heron's Hour. Once a week, stop for a few minutes and do nothing. Watch, think, breathe. Plans improve when you pause.",
          "Bring someone with you. Share your goal with one person and invite them to help, or to chase a goal of their own alongside you.",
          "Build for others too. Use your skills for someone else this term: organize something, raise money for a cause, help a friend plan.",
          "Make a Hearthwood friend. Find the kindest, most loyal person you know and ask what they think matters most. Their answer may change your plans for the better.",
          "Return to the Ledger. At the end of the year, write what happened, including what didn't go to plan. Gildmere honors honest entries most of all.",
        ),
        "By the end of your first year, the Glass Gallery won't just know you as ambitious. It'll know you as someone who builds what lasts: plans with a purpose, goals with a heart and success that lifts others with you. That's what Tobias Vale was really doing at the water's edge.",
      ),
    },
  ],
};
