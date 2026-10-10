import type { Outcome } from "@/lib/engine/types";

/** Spirit Animal Quiz outcomes: Wolf, Lion, Eagle, Owl. Copy says "animal guide", never "spirit animal". */

const p = (...paras: string[]) => paras.join("\n\n");
const list = (...items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const wolf: Outcome = {
  key: "wolf",
  name: "The Wolf",
  tagline: "Loyal to the pack, fierce for the people you love.",
  emoji: "🐺",
  summary:
    "Your animal guide is the Wolf: loyal, protective and happiest when your people are close. You give your whole heart to the pack, and you'd walk through a storm for the ones you love.",
  about: p(
    "The Wolf as an animal guide stands for loyalty, belonging and fierce protection. Real wolves live and hunt in family groups called packs, and they stay in constant touch through howls, body language and play. That makes the wolf a natural symbol for people whose lives revolve around the bonds they've chosen.",
    "People who get the Wolf in this quiz tend to pick options about teamwork, keeping the group together and making sure no one is left behind. They're often the dependable friend, the teammate who covers for others and the person who remembers everyone's birthday. They trust their instincts about people and can be slow to let new members into their inner circle, but once you're in, you're in for life.",
    "The Wolf's strengths include loyalty, courage on behalf of others, endurance and a strong sense of fairness. Its growth areas usually involve independence and boundaries: learning to stand alone when needed, and not carrying the whole pack on your back.",
    "This is one of twelve animal guides in our quiz. It's a playful mirror for your personality based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Wolf, loyal, protective and pack-minded",
    "You feel most like yourself when your people are close",
    "You trust your instincts, especially about who to let in",
    "Friends know you'll show up, whatever the weather",
    "Your growth edge: standing alone sometimes, and asking for help",
  ],
  deep: [
    {
      title: "Your wolf story",
      teaser:
        "Picture a winter forest at dusk, and somewhere a howl that's answered from three directions at once. That call and answer is the heart of your wolf story.",
      body: p(
        "A howl isn't really about being alone. For wolves, it's a way of saying 'I'm here, where are you?' and waiting for the reply. Your answers carry that same instinct. You want to know where your people are, and you want to be the one who answers when they call.",
        "People who match the Wolf tend to build their lives around a pack, even if they'd never use that word. It might be your family, a team, a group chat that's been running for years, or two friends who know everything about you. When you're with them, you're at your best: funny, brave, generous and completely yourself. When you're cut off from them, something in you gets restless.",
        "You probably have strong instincts about people. You may size up someone new quickly and quietly decide whether they're safe. That can make you seem reserved at first. But once someone earns your trust, you're fiercely devoted. You'll defend them in rooms they're not in, and show up with whatever they need, often before they ask.",
        "There's a wildness in you too. Wolves aren't pets. They roam, they test limits and they don't back down easily. You may have a stubborn streak, a strong sense of justice and a temper that flares when someone in your circle is treated unfairly. That fire isn't a flaw. It's protection.",
        "Your story, at its core, is about belonging. Not fitting in, which means changing yourself to match a group, but belonging, which means being fully yourself among people who've chosen you back. You know the difference, and you guard it.",
      ),
    },
    {
      title: "Your wolf strengths",
      teaser:
        "Your greatest strength is one people feel more than see: the deep, steady certainty that you've got their back.",
      body: p(
        "Wolf people bring a set of strengths that make teams work, families hold together and friendships survive hard seasons. Here are the ones your answers point to.",
        list(
          "Loyalty that lasts. You don't drift away when things get difficult. If anything, you lean in. Friends who've known you for years often say you're the one constant.",
          "Protective courage. You may not seek out conflict for yourself, but when someone you love is threatened, you find a bravery you didn't know you had.",
          "Team instinct. You understand how groups work: who needs encouragement, who needs space, who's quietly struggling. You often hold the group together without anyone noticing.",
          "Endurance. Wolves can travel long distances day after day. You have a similar stamina for long projects, long friendships and long, hard weeks.",
          "Clear instincts. You read people and situations fast. Your gut is usually right, especially about who can be trusted.",
          "Fairness. You notice when someone's left out or treated unfairly, and you're likely to say something.",
        ),
        "These strengths shine wherever people depend on each other: teams, families, group projects, close friend circles and any role where you look after others. Many wolf types make great captains, organizers, carers and loyal right hands, the person who makes the leader's vision actually happen.",
        "The power underneath all of them is this: you make people feel they belong. In a world where lots of people feel lonely or overlooked, that's no small thing. When someone joins your circle, they suddenly have a whole pack behind them. That changes lives, even when you don't see it.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "Every animal guide has a shadow, and the Wolf's is the flip side of loyalty: you can hold on so tightly to your people that you forget to look after yourself.",
      body: p(
        "Shadows aren't flaws. They're your strengths pushed too far or pointed in the wrong direction. Here's how wolf energy can tip over.",
        list(
          "Carrying the whole pack. You might take on everyone's problems as your own. Over time, that can leave you tired, resentful or quietly burned out, especially if no one notices how much you're carrying.",
          "Us versus them. Strong loyalty can sometimes become suspicion of outsiders. You might be slow to welcome new people, or quick to see disagreement as betrayal.",
          "Losing yourself in the group. If your identity is tied to your pack, it can be hard to make choices just for you. You might stay in a group or friendship that no longer fits, because leaving feels disloyal.",
          "Protective anger. When someone you love is hurt, your fire can come out fast and hot. Sometimes that's exactly what's needed. Sometimes it makes things worse.",
          "Difficulty asking for help. You're the one who shows up. Letting someone show up for you can feel uncomfortable, even weak.",
        ),
        "If any of these feel familiar, you're in good company. These patterns come from caring, not from coldness. The work is to bring a little balance. Loyalty to others works best when it includes loyalty to yourself.",
        "A useful question when you feel stretched thin: 'Am I helping because they need it, or because I'm afraid of what happens if I don't?' The first is love. The second is often worry dressed up as love. Wolves are strongest when they hunt together and rest together. Make sure you're doing both.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You don't do casual. When you let someone in, they get your full loyalty, your inside jokes and a seat at your table for life.",
      body: p(
        "Wolf types tend to love in a steady, devoted way. You're not usually the person with a hundred acquaintances. You'd rather have a small circle of people you'd do anything for, and who'd do anything for you.",
        "In friendships, you're the dependable one. You show up for birthdays, moves and bad days. You remember details. You keep the group chat alive and make sure the quiet friend gets invited. Your friends often describe you as the glue.",
        "In close relationships, you're protective and committed. You want to know where you stand, and you offer the same clarity in return. Trust matters enormously to you. You may take a while to open up, but once you do, you're all in. Betrayal, or even something that feels like it, can hit you very hard.",
        "How you show love:",
        list(
          "Showing up: being there, helping out, sitting in the waiting room",
          "Defending people when they're not around to defend themselves",
          "Rituals and traditions: the annual trip, the weekly call, the shared joke",
          "Practical protection: walking someone home, checking they got back safely",
        ),
        "What you need in return is loyalty, honesty and a sense of belonging. You thrive with people who make you feel chosen, who notice your effort and who let you rest sometimes instead of always being the strong one.",
        "A growth tip for your relationships: let people love you in their own style. Not everyone shows loyalty the way you do. Some people show it through words, some through space, some through humor. Widen your definition of loyalty, and you may find your pack is bigger than you thought.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Bear and the Dolphin, but the animal that could change your life is the Butterfly.",
      body: p(
        "Animal guides aren't fixed rules about who you'll get along with. Still, the way you answered tends to click with some animals and rub against others. Here's your likely map.",
        "Natural allies",
        list(
          "Bear: A fellow protector. Bears share your instinct to guard the people you love, and they bring a calm, grounded strength that steadies your fire. Together you make a safe place for everyone else.",
          "Dolphin: A fellow group animal. Dolphins live in pods the way wolves live in packs. They bring play and lightness to your loyalty, and you bring depth and steadiness to their fun.",
        ),
        "Your growth match",
        list(
          "Butterfly: The Butterfly is all about change and reinvention, the very things wolves sometimes resist. A butterfly friend can help you see that growing doesn't mean leaving your pack behind. You'll give them roots; they'll give you wings.",
        ),
        "Your spicy pairing",
        list(
          "Deer: Predator and prey, at least in nature. In real life, deer types are gentle and sensitive, and your intensity can feel like a lot to them at first. With patience, this becomes one of the most tender pairings: your protection plus their gentleness.",
        ),
        "Other wolves",
        list(
          "Two wolves understand each other instantly and stay loyal to the end. Just watch for a shared stubbornness when you disagree about which way the pack should go.",
        ),
        "The animals that challenge you most often teach you the most. Keep your allies close, but make space for at least one friend who sees the world differently. That's how your pack grows strong.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to practice being a lone wolf on purpose: not to leave your pack, but to find out who you are when you're not looking after it.",
      body: p(
        "Young wolves often leave the pack they were born into and go on to start one of their own. It isn't abandonment; it's how packs grow and stay healthy. Your challenge borrows from that idea. This year, explore the version of you that exists outside your role in the group.",
        "You've spent a lot of energy being there for others. That's beautiful, and it doesn't need to stop. But you may have dreams, interests or opinions you've set aside because they didn't fit the group. Some of your best growth might come from following them, even a little.",
        "Here's your challenge plan:",
        list(
          "Do one thing alone each month that you genuinely want to do: a walk, a film, a class, a trip somewhere nearby. Notice how it feels to choose for yourself.",
          "Say no once a week to a request you'd normally accept out of duty. Do it kindly, without overexplaining.",
          "Ask for help with something real at least once this season. Let someone in your pack carry something for you.",
          "Write down three things you want for yourself, not for the group. Pick one and take a first step.",
          "Invite one new person into your circle, like a classmate, coworker or neighbor. New members keep packs strong.",
          "At the end of the year, look back. Has your loyalty to others grown to include loyalty to yourself?",
        ),
        "Remember: the strongest wolves aren't the ones who never leave the pack. They're the ones who know they could make it on their own, and choose to come back anyway. Your loyalty means even more when it's a choice made from strength, not fear.",
      ),
    },
  ],
};

export const lion: Outcome = {
  key: "lion",
  name: "The Lion",
  tagline: "Brave heart, warm roar, natural center of gravity.",
  emoji: "🦁",
  summary:
    "Your animal guide is the Lion: brave, warm and naturally at the center of things. You lead with heart, protect your people and light up the room when you walk in.",
  about: p(
    "The Lion as an animal guide stands for courage, confidence and warm-hearted leadership. Lions are the most social of the big cats, living in groups called prides where they share the care of cubs and rest together in the sun. That mix of strength and warmth makes the lion a symbol for people who lead from the heart.",
    "People who get the Lion in this quiz tend to choose options about stepping up, taking the stage and protecting their people: the crown that fits just right, the castle doors, the crowd cheering their name, the toast at the party. They're often the ones who take charge in a crisis or speak up when something is unfair. They tend to be generous, expressive and loyal, with big laughs and a big presence.",
    "The Lion's strengths include courage, charisma, generosity and the ability to rally others. Its growth areas usually involve pride and rest: learning to share the spotlight, admit mistakes and take a break without feeling you've lost your place.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to discover which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Lion, brave, warm and confident",
    "You step forward when others hesitate",
    "Your generosity and big presence make people feel included",
    "You protect your people fiercely and proudly",
    "Your growth edge: sharing the spotlight and admitting when you're tired",
  ],
  deep: [
    {
      title: "Your lion story",
      teaser:
        "Lions spend much of the day resting in golden light, and then, when it matters, they move with total commitment. Your answers have that same rhythm: warmth first, courage when it counts.",
      body: p(
        "People sometimes picture lions as constantly roaring and fighting. In reality, lions spend a lot of their time lying together in the shade, grooming each other and keeping their cubs safe. Their strength isn't constant noise. It's the certainty that when it's needed, they'll rise.",
        "Your picks suggest you carry that kind of strength. You likely have a natural confidence people feel the moment you walk in. You might not always feel brave inside, but you tend to act brave when it matters: when someone needs defending, when a decision must be made, when the room needs energy.",
        "People who match the Lion often end up in charge, even when they didn't ask to be. Friends turn to you to choose the plan, settle the argument or give the speech. You enjoy that trust, and you usually take it seriously.",
        "You're also more tender than people realize. Lions are devoted to their pride. You probably care deeply about your family and friends, and you show it in big ways: generous gifts, loud cheers, fierce loyalty. When someone you love succeeds, you're the first to celebrate. When they're hurt, you're the first to stand up.",
        "There's a sunny side to your story too. Lions are creatures of warmth and light. You may love being outdoors, being active and being seen. Life feels best when it has color and energy.",
        "Your story is about courage with a heart. Not the cold courage of someone who doesn't care, but the warm courage of someone who cares so much they're willing to go first. That's what makes people follow you.",
      ),
    },
    {
      title: "Your lion strengths",
      teaser:
        "Your strength isn't just bravery. It's the way your bravery makes other people braver too.",
      body: p(
        "Lion people have a set of strengths that make them natural leaders, motivators and protectors. Here are the ones your answers highlight.",
        list(
          "Courage under pressure. When things get tense, you tend to get steady. You'd rather act than freeze, and your calm in a crisis reassures others.",
          "Warm charisma. People are drawn to your energy. You can lift a mood, start a conversation and make strangers feel like friends.",
          "Generosity. You give freely: your time, your praise, your help, sometimes your last snack. You believe in sharing what you have.",
          "Protective loyalty. You stand up for your people. If someone in your circle is treated unfairly, you'll speak up.",
          "Decisiveness. While others are still discussing options, you're ready to choose. That keeps groups moving.",
          "Expressiveness. You show what you feel. People rarely have to guess whether you're happy, proud or annoyed.",
        ),
        "These strengths shine in roles where people need direction and encouragement: captain, organizer, performer, presenter, the friend who plans the celebration. Lions often thrive on stages of every kind, from sports fields to school plays to the head of the dinner table.",
        "But the deepest lion strength is this: you make people feel they matter. When you cheer for someone, they feel seen. When you include someone, they feel chosen. Many people remember a lion type who believed in them before they believed in themselves. You may already be that person for someone, even if you don't know it.",
        "Keep using your roar for others. It's the most powerful sound you make.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Lion's shadow is pride: the part of you that finds it hard to back down, say sorry or admit you're running on empty.",
      body: p(
        "Every strength has a shadow. For lions, the same confidence that makes you a leader can sometimes get in your way. Here's how it can show up.",
        list(
          "Needing to be right. Admitting a mistake can feel like losing face. You might defend a choice longer than you should, simply because you made it.",
          "Filling all the space. You don't mean to, but your big presence can leave quieter people without room to speak. Sometimes the best leadership is stepping back.",
          "Hidden exhaustion. Lions are expected to be strong. You might hide tiredness, sadness or fear because you think others need you to be okay. Eventually, that catches up with you.",
          "Sensitivity to criticism. Under the confidence, you can be easily hurt by feedback, especially if it feels public or unfair.",
          "Taking over. When something isn't going well, you might jump in and take control instead of letting someone else learn.",
        ),
        "None of this makes you arrogant or bad. It makes you human. Many of the bravest people struggle most with vulnerability, because they've spent so long being the strong one.",
        "The work for lions is learning that real strength includes softness. Saying 'I was wrong' is brave. Saying 'I'm tired' is brave. Letting someone else lead while you support them is brave. These moments don't shrink you. They make your courage more trustworthy.",
        "A question to carry with you: 'Am I roaring because this matters, or because I'm afraid of looking small?' When you can tell the difference, your roar becomes even more powerful, because people know you only use it when it counts.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You love out loud. Your friends never have to wonder how you feel, because you tell them, show them and celebrate them at full volume.",
      body: p(
        "Lion types love generously and visibly. You're the friend who throws the surprise party, gives the heartfelt toast and hugs people like you mean it. You want the people you love to feel special, and you're not shy about making it happen.",
        "In friendships, you're often the center of the group, the one who brings people together. You're loyal and protective, with a gift for making everyone feel included. You might also be the friend people come to for a pep talk, because you believe in them so strongly.",
        "In close relationships, you're passionate, warm and committed. You like big gestures and shared adventures. You need to feel appreciated, not in a shallow way, but in the sense of being truly seen. When someone notices your effort, you glow.",
        "How you show love:",
        list(
          "Celebrations: birthdays, wins and milestones, done big",
          "Encouragement: believing in people out loud",
          "Protection: standing up for them in any room",
          "Generosity: gifts, treats, your time and attention",
        ),
        "What you need in return is appreciation, loyalty and honesty delivered with kindness. You also need people who can handle your big feelings and who aren't intimidated by your strength.",
        "Your growth tip: practice receiving as well as giving. Lions are often better at being the generous one than at being cared for. Let people take care of you sometimes. Let them see you when you're not at your strongest. The friends who love you at your quietest are the ones who'll stay for life.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Eagle and the Dolphin, and the animal with the most to teach you might be the gentle Deer.",
      body: p(
        "Your answers suggest you click with some animal guides and clash with others. Here's your likely map.",
        "Natural allies",
        list(
          "Eagle: A fellow high achiever. Eagles share your ambition and your love of a big goal. You bring warmth and people skills; they bring focus and long-range vision. Together, you can build something impressive.",
          "Dolphin: A fellow sun-lover. Dolphins share your warmth and love of company. They keep the mood playful and remind you that not everything has to be a mission.",
        ),
        "Your growth match",
        list(
          "Deer: Deer types are gentle, sensitive and intuitive, the opposite of your bold, outward energy. A deer friend can teach you to notice the quiet feelings in a room and to lead with softness. In return, you can help them find their voice.",
        ),
        "Your spicy pairing",
        list(
          "Fox: Foxes are clever, playful and allergic to being told what to do. They may tease you, question your plans and refuse to follow your lead, which can drive you up the wall. But if you can laugh at yourself, a fox friend keeps you honest and humble in the best way.",
        ),
        "Other lions",
        list(
          "Two lions can be a dream team or a battle of the roars. You'll inspire each other and push each other to be braver. Just agree early on who's leading what.",
        ),
        "The animal guides that challenge you most can make you a better leader. A lion who has learned from a deer and laughed with a fox is a lion people will follow anywhere.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to lead from behind: to help someone else shine, and discover how strong it feels to be the one who makes it possible.",
      body: p(
        "In a pride, the loudest lion isn't always the one who matters most. Some of the most important work happens quietly: guarding the cubs, keeping watch, sharing the hunt. Your challenge this year is to practice that quieter kind of leadership.",
        "You're already good at stepping up. Now try stepping aside, on purpose, so someone else can step up. This isn't about shrinking. It's about growing a different muscle: the ability to lift others without needing the spotlight yourself.",
        "Here's your challenge plan:",
        list(
          "Each month, find one chance to hand the lead to someone else: a project, a plan, a decision. Support them fully, even if you'd have done it differently.",
          "Practice saying 'I was wrong' or 'I don't know' at least once a week. Notice how people respond. Often, they trust you more.",
          "Schedule real rest. Lions spend long hours resting, and you need recovery too. Protect at least one slow day a week.",
          "Mentor someone younger or newer than you. Teach them what you know, then let them surpass you.",
          "Ask a trusted friend for honest feedback about how you come across. Listen without defending yourself.",
          "Celebrate someone else's win as loudly as you would your own.",
        ),
        "By the end of the year, you'll likely find that your influence has grown, not shrunk. People will follow you not just because you're brave, but because you make them brave too. That's the mark of a lion at full strength: not the loudest roar, but the strongest pride.",
      ),
    },
  ],
};

export const eagle: Outcome = {
  key: "eagle",
  name: "The Eagle",
  tagline: "You see the big picture, then fly straight at it.",
  emoji: "🦅",
  summary:
    "Your animal guide is the Eagle: focused, independent and always looking toward the horizon. You see the big picture before others do, and once you set your sights on something, you fly straight at it.",
  about: p(
    "The Eagle as an animal guide stands for vision, focus and independence. Eagles are known for their sharp eyesight and for soaring high above wide landscapes before diving with precision. That makes the eagle a natural symbol for people who think big, plan ahead and chase their goals with determination.",
    "People who get the Eagle in this quiz tend to pick options about high places, clear plans and ambitious goals: the mountain ledge, the power of flight, 'Aim higher' and being known as someone who sees what's coming. They often have a strong sense of where they're headed, and they're comfortable spending time alone to get there. In any group, they're often the planner and the big-picture thinker.",
    "The Eagle's strengths include clear vision, discipline, independence and high standards. Its growth areas usually involve connection and rest: coming down from the heights to enjoy the people and moments right in front of you, and being gentle with yourself when things don't go to plan.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects how you answered today, and most people carry a little of several animals. Take the quiz to see which animal guide mirrors you.",
  ),
  snapshot: [
    "Your animal guide: the Eagle, focused, independent and far-seeing",
    "You spot the big picture and plan several moves ahead",
    "You hold high standards, especially for yourself",
    "You're comfortable going solo to reach a goal",
    "Your growth edge: slowing down to enjoy the view, and the people in it",
  ],
  deep: [
    {
      title: "Your eagle story",
      teaser:
        "High above a valley, an eagle can ride the wind almost without moving, watching everything below. Your answers suggest you know that feeling: the calm, clear focus of seeing the whole picture at once.",
      body: p(
        "Most people live at ground level, dealing with whatever is right in front of them. Eagles live differently. They rise, they watch, they wait, and then they act with precision. Your picks suggest you share that way of moving through the world.",
        "People who match the Eagle often have a sense of where they're going, even if they don't talk about it much. You may have long-term goals that feel exciting to you and slightly intimidating to others. You probably like having a plan, and you're not afraid to work alone to make it happen.",
        "There's freedom in your story too. Eagles need open sky. You may feel restless with small spaces, small talk or small ambitions. You'd rather aim high and miss than aim low and hit.",
        "Your clear sight extends to people and situations. You may notice patterns others miss: where a project is heading, what a friend really needs, how a problem will unfold if nobody acts. Sometimes you say these things and people don't believe you, until later. You'd rather see clearly than settle for a comforting blur.",
        "But eagles aren't cold. Many return to the same huge nest year after year, adding to it over time. You may be the same: fiercely independent, yet deeply committed to the few places and people you call home.",
        "Your story is about vision. Not just seeing far, but having the courage to fly toward what you see. That combination of clarity and courage is rare, and when you use it well, it lifts other people's sights too.",
      ),
    },
    {
      title: "Your eagle strengths",
      teaser:
        "Your greatest strength is clarity: when everyone else is lost in the details, you can see where the path leads.",
      body: p(
        "Eagle types bring strengths that make them excellent planners, leaders and independent thinkers. Here are the ones your answers point to.",
        list(
          "Big-picture vision. You can zoom out and see how things connect. That makes you good at planning, strategy and spotting problems early.",
          "Focus. Once you decide on a goal, you can block out distractions and keep going when others give up.",
          "Independence. You don't need constant approval or company to get things done. You trust your own judgment.",
          "High standards. You care about quality. You'd rather do something well than do it fast and sloppy.",
          "Calm under pressure. Like an eagle riding the wind, you can stay steady when things get turbulent.",
          "Honesty. You tend to say what you see, even when it's not what people want to hear.",
        ),
        "These strengths shine in situations that need direction: leading a project, planning a trip, preparing for something big, building a skill over years. Many eagle types are drawn to roles where they can think strategically and work with some independence.",
        "Your deepest strength, though, might be the way you inspire others to aim higher. When you talk about what's possible, people start to believe it. Your vision gives them a horizon to fly toward.",
        "Use that gift generously. Share your plans, explain what you see and invite others to rise with you. An eagle who brings others along becomes a leader people remember, and the sky is big enough for more than one eagle.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Eagle's shadow is height: when you spend too long above it all, you can lose touch with the warmth down on the ground.",
      body: p(
        "Every animal guide has a shadow, the place where strengths tip into struggles. Here's how eagle energy can go too far.",
        list(
          "Perfectionism. High standards are great until nothing is ever good enough, especially your own work. You might put off starting, or finishing, because it isn't perfect yet.",
          "Isolation. Independence can slide into loneliness. You might work alone so much that you forget to let people in, or assume no one else can keep up.",
          "Impatience with others. When you see the path clearly, it's frustrating when others don't. You may come across as cold or critical, even if you don't mean to.",
          "All goals, no rest. Eagles soar, but they also perch. You might forget to rest, celebrate or enjoy the moment because you're already thinking about the next peak.",
          "Fear of failure. Under the confidence, there can be a big fear of falling short. That fear can make you avoid risks where you might look less than excellent.",
        ),
        "These patterns usually come from caring deeply about doing things well. They're not character flaws; they're signals that you need balance.",
        "The work for eagles is learning to come down from the heights sometimes: to sit with people, enjoy small moments, accept 'good enough' and let others help. Your vision becomes more powerful when it's shared, and your goals mean more when you enjoy the journey.",
        "A helpful question: 'Will this matter in five years, or am I chasing perfect?' If it won't matter, let it go. Save your laser focus for what really counts.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You're not the friend who texts every day, but you're the one who remembers exactly what someone needs and shows up with it at the perfect moment.",
      body: p(
        "Eagle types love with loyalty and intention. You may not have a huge circle, but the people you choose matter enormously to you. You show love through presence and action more than constant chatter.",
        "In friendships, you're often the advisor, the planner or the one who gives honest perspective. Friends value your insight and your reliability. You might go weeks without talking, then pick up as if no time has passed.",
        "In close relationships, you need both connection and space. You want someone who supports your goals and has goals of their own. Someone who tries to clip your wings won't last long, but someone who flies alongside you will have your loyalty for life.",
        "How you show love:",
        list(
          "Helping people plan for and reach their goals",
          "Honest advice, even when it's hard to hear",
          "Remembering the things that truly matter to someone",
          "Steady presence in a crisis",
          "Long-range support: checking in on someone's goal months after they first mentioned it",
        ),
        "What you need in return is respect for your independence, honesty and someone who understands that your quiet doesn't mean you don't care. You also need people who can gently pull you out of your head and into the moment.",
        "Your growth tip: share more of your inner world. People can't always see how much you care, because you're private about your feelings. Say it out loud sometimes. Tell people what they mean to you, and let them see your doubts as well as your plans. It will deepen every bond you have.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Lion and the Horse, and your most surprising teacher could be the slow and steady Turtle.",
      body: p(
        "Here's how eagle energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Lion: A fellow leader. Lions share your ambition and courage, and they bring warmth and people skills to your clear vision. Together you make a powerful team: you see the path, they rally everyone to walk it.",
          "Horse: A fellow free spirit. Horses share your love of open space and movement. You'll understand each other's need for freedom, and your adventures together will be epic.",
        ),
        "Your growth match",
        list(
          "Turtle: Turtles are patient, steady and in no hurry. Where you dive, they wade. A turtle friend can teach you that slow progress is still progress and that rest is part of the journey. You can help them dream bigger.",
        ),
        "Your spicy pairing",
        list(
          "Butterfly: Butterflies flit from idea to idea, chasing beauty and change. Your focus may clash with their love of variety; you might find them scattered, and they might find you rigid. But a butterfly can show you the joy of exploring without a plan, and you can help them land their dreams.",
        ),
        "Easy company",
        list(
          "Owls and octopuses: both respect your independence and love a hard problem, so you can work side by side in comfortable quiet and swap ideas when you surface.",
        ),
        "Other eagles",
        list(
          "Two eagles can soar together brilliantly, as long as there's enough sky for both. Respect each other's independence, and don't turn every goal into a competition.",
        ),
        "The best flock for an eagle includes a few birds of a feather and a few creatures who move completely differently. They'll keep you grounded, curious and connected while you chase your horizon.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to land: to spend more time on the ground, in the moment, with the people who make the journey worth it.",
      body: p(
        "Eagles are famous for flight, but they spend a great deal of time perched, resting, watching and tending their nests. Your challenge this year is to practice the perching side of eagle life.",
        "You've likely got plenty of goals already. This challenge isn't about dropping them. It's about balancing them with presence, so you don't reach the summit and realize you missed the view.",
        "Here's your challenge plan:",
        list(
          "Once a week, do something with no goal at all: a walk, a meal with a friend, a hobby you're not trying to master.",
          "Celebrate every milestone, even small ones. Write them down. Tell someone. Let yourself enjoy the progress before chasing the next peak.",
          "Pick one project and let it be 'good enough'. Finish it, share it and move on.",
          "Invite someone into one of your goals. Study with a friend, train with a partner, plan a trip together. Shared flight is lighter.",
          "Practice listening without solving. When a friend shares a problem, ask, 'Do you want advice, or just someone to listen?'",
          "Choose one evening a week to put your phone and plans away and simply be present.",
          "Once a month, ask someone you trust, 'What am I missing?' Eagles see far, but a friend on the ground sees different things.",
        ),
        "At the end of the year, look back at what you achieved, and also at what you enjoyed. If the second list is as long as the first, you'll have mastered the hardest part of being an eagle: knowing when to soar and when to stay.",
      ),
    },
  ],
};

export const owl: Outcome = {
  key: "owl",
  name: "The Owl",
  tagline: "Quiet eyes, deep thoughts and wisdom after dark.",
  emoji: "🦉",
  summary:
    "Your animal guide is the Owl: observant, thoughtful and wise beyond the moment. You notice what others miss, think before you speak and do some of your best thinking when the world goes quiet.",
  about: p(
    "The Owl as an animal guide stands for wisdom, observation and quiet insight. Many owls hunt at night, flying almost silently and relying on sharp hearing and keen eyesight. In stories and sayings across much of the world, the owl has become a symbol of wisdom and of seeing what's hidden.",
    "People who get the Owl in this quiz tend to choose options about books, libraries, secret doors, treetops and starlit paths. They often prefer depth over speed and listening over talking. They may be introverted, or simply selective about when and where they share their thoughts.",
    "The Owl's strengths include careful thinking, perceptiveness, calm and the ability to give wise advice. Its growth areas usually involve action and connection: turning thoughts into steps, sharing ideas before they're perfect, and stepping into the daylight to be seen.",
    "This is one of twelve animal guides in our quiz. It's a playful personality mirror based on widely shared animal symbolism, not a spiritual practice. Your result reflects your answers today, and most people carry a mix of animals. Take the quiz to find out which animal guide mirrors you, and which ones came close.",
  ),
  snapshot: [
    "Your animal guide: the Owl, wise, observant and thoughtful",
    "You notice details, patterns and feelings others overlook",
    "Quiet time and good books recharge you",
    "Friends come to you for calm, considered advice",
    "Your growth edge: acting on your ideas before they feel perfect",
  ],
  deep: [
    {
      title: "Your owl story",
      teaser:
        "When the house is quiet and everyone else is asleep, your mind often comes alive. Your answers suggest that's when the owl in you does its best work.",
      body: p(
        "Owls are creatures of the in-between hours. While the world sleeps, they watch, listen and wait. Many fly so quietly that their prey never hears them coming. There's something deeply calm about that kind of power: no noise, no rush, just attention.",
        "Your picks suggest you share that energy. You probably notice things others miss: a change in someone's voice, a pattern in a problem, a detail in a story that doesn't add up. You may not always say what you've noticed, but you file it away. Later, it often turns out to matter.",
        "People who match the Owl tend to have rich inner lives. You might love books, puzzles, documentaries, deep conversations or late-night thinking sessions. You may feel more at home in a quiet library than at a loud party. Not because you dislike people, but because you like your thoughts to have room to breathe.",
        "Your wisdom isn't just about knowing facts. It's about perspective. Friends may come to you when they're confused or upset, because you don't overreact. You take a breath, ask a good question and help them see the situation more clearly.",
        "There's also a playful side to owls that people often miss. Many owl types have a dry, clever sense of humor, the kind that sneaks up on you. You might be the one who makes a quiet comment that has everyone laughing a beat later.",
        "Your story is about seeing in the dark: finding clarity where others feel lost. It's a quiet kind of magic, and the world needs more of it.",
      ),
    },
    {
      title: "Your owl strengths",
      teaser:
        "Your strength is attention. In a loud, fast world, you're the one who actually notices what's happening.",
      body: p(
        "Owl types bring strengths that make them excellent thinkers, listeners and advisors. Here are the ones your answers highlight.",
        list(
          "Deep observation. You see details, patterns and connections. That makes you good at solving problems and reading people.",
          "Thoughtfulness. You think before you speak. When you do share an opinion, it's usually well considered.",
          "Calm perspective. You don't panic easily. Your steady presence helps others think more clearly too.",
          "Love of learning. You enjoy understanding how things work, why people do what they do and what lies beneath the surface.",
          "Good listening. People feel heard around you, because you're actually paying attention instead of waiting for your turn to talk.",
          "Independent thinking. You form your own opinions instead of following the crowd.",
        ),
        "These strengths shine in research, writing, problem-solving, strategy, teaching and any role where careful thought matters. Many owl types are the trusted quiet experts in their groups: the friend who can fix your essay, the teammate who catches the mistake, the person everyone quietly consults.",
        "Your deepest strength may be the safety you create. People often feel they can be honest with you because you listen without judging. In a world full of quick reactions, your patience is a gift.",
        "Many owl types underestimate these strengths because they come so naturally. If you've ever been surprised that someone found your advice life-changing, that's why. What feels obvious to you is often a revelation to others. You don't have to be the loudest voice to be one of the most valuable.",
      ),
    },
    {
      title: "Your shadow side",
      teaser:
        "The Owl's shadow is overthinking: the habit of circling a decision so long that the moment to act quietly passes.",
      body: p(
        "Every animal guide has a shadow side. For owls, it's often the other face of a thoughtful nature. Here's how it can show up.",
        list(
          "Overthinking. You might weigh every option so carefully that you struggle to decide, or replay conversations long after they've ended.",
          "Waiting for perfect. Your ideas may stay in your head because they don't feel ready. Meanwhile, louder people share half-finished ideas and get the credit.",
          "Withdrawal. When you're overwhelmed, you may retreat into your inner world and go quiet for days. Friends might not realize anything's wrong.",
          "Seeming distant. Because you observe more than you share, some people may find you hard to read or assume you're judging them.",
          "Night-owl burnout. If you do your best thinking late, your sleep may suffer, which ironically makes thinking harder.",
        ),
        "These patterns come from a mind that cares about getting things right. That's admirable. But wisdom isn't just knowing; it's also doing.",
        "The work for owls is learning to act before you feel completely sure. Try 'good enough to start' instead of 'perfect enough to share'. Speak up in the class or meeting before you've fully polished your thought. Tell a friend you're struggling before you've figured it all out.",
        "You might notice this as a drafts folder full of unsent messages, or a brilliant idea you mention months later, after someone else has already done it.",
        "A useful question when you feel stuck: 'What's the smallest step I can take with what I know right now?' Owls don't wait for perfect light to fly. They trust their senses and move. You can too.",
      ),
    },
    {
      title: "How you love and befriend",
      teaser:
        "You don't need a crowd. One real conversation that runs past midnight means more to you than a hundred small chats.",
      body: p(
        "Owl types love deeply but quietly. You're selective about who you let in, and you value depth over breadth. A few close friends who truly understand you are worth more to you than any number of acquaintances.",
        "In friendships, you're the listener and the wise counsel. People bring you their problems because you take them seriously. You remember what they told you weeks ago. You offer thoughtful advice, or simply a calm space to think out loud. You may also show love by remembering, months later, the small thing someone mentioned once.",
        "In close relationships, you need both mental and emotional connection. You want someone you can talk with about anything, who respects your need for quiet and doesn't take your silences personally. Shared interests, long talks and comfortable silence are your love language.",
        "How you show love:",
        list(
          "Deep listening and remembering details",
          "Thoughtful advice and honest perspective",
          "Sharing books, articles or ideas you think they'll love",
          "Quiet companionship: being together without needing to fill the silence",
          "Writing things down: a thoughtful message or letter that says what you couldn't say out loud",
        ),
        "What you need in return is patience, depth and respect for your inner world. You thrive with people who are curious about your thoughts and who give you space to recharge.",
        "Your growth tip: share your feelings as clearly as your thoughts. Owls can be brilliant at analyzing emotions and less practiced at expressing them. Try saying 'I feel…' instead of 'I think…' now and then. The people who love you want to know your heart, not just your mind.",
      ),
    },
    {
      title: "Your most compatible animal guides",
      teaser:
        "Your natural allies are the Turtle and the Fox, while the Horse could be the friend who finally gets you out of your head and into the world.",
      body: p(
        "Here's how owl energy tends to mix with the other animal guides.",
        "Natural allies",
        list(
          "Turtle: A fellow deep thinker. Turtles share your patience and calm. Together you can sit in comfortable silence, talk for hours and take life at a thoughtful pace.",
          "Fox: A fellow night-time mind. Foxes are clever and curious like you, but quicker and more playful. They'll spark your ideas and make you laugh, and you'll help them think things through.",
        ),
        "Your growth match",
        list(
          "Horse: Horses are all motion, energy and open fields. They might drag you outside when you'd rather stay in with a book. But a horse friend can teach you the joy of moving your body and acting on impulse, and you can teach them the power of pausing.",
        ),
        "Your spicy pairing",
        list(
          "Octopus: This is the 'too alike' pairing. Octopuses are curious, independent and brilliant, just like you. You'll have amazing conversations, but you might both vanish into your own projects and forget to reach out. Set reminders to stay in touch.",
        ),
        "Easy company",
        list(
          "Eagles and deer: eagles share your habit of seeing what's coming, and deer share your quiet attentiveness. Both make calm, thoughtful companions who never mind a comfortable silence.",
        ),
        "Other owls",
        list(
          "Two owls can share an incredibly deep bond. You'll understand each other's need for quiet. Just make sure at least one of you occasionally suggests leaving the library.",
        ),
        "For an owl, the best friendships combine depth and adventure. Keep the quiet friends who understand you, and welcome the lively ones who stretch you. Your wisdom grows when it meets the world.",
      ),
    },
    {
      title: "Your challenge for the year",
      teaser:
        "Your challenge this year is to fly in daylight: to share your ideas, your voice and your wisdom before you feel completely ready.",
      body: p(
        "Most owls hunt at night, but some, like the snowy owl in the long summer days of the far north, hunt in full daylight. Your challenge borrows from them. This year, practice being seen. Bring your thoughtful mind into the open, where it can help more people and open more doors.",
        "You've likely gathered a lot of wisdom in your quiet hours: ideas, opinions, insights about people and problems. Some of it may never have left your head. This year is about letting it out, one small step at a time.",
        "Here's your challenge plan:",
        list(
          "Share one idea a week before it's perfect: in class, at work, in your group chat or with a friend.",
          "Start a 'done is better than perfect' project. Write, build or make something and finish it, flaws and all.",
          "Say a feeling out loud once a week, like 'I feel happy about…' or 'I'm worried that…'. It gets easier with practice.",
          "Get outside more. A daily walk in daylight can lift your mood and give your mind new things to notice.",
          "Protect your sleep. Try going to bed 30 minutes earlier for a month and see how your thinking changes.",
          "Teach something you know to someone who wants to learn it. Wisdom grows when it's shared.",
        ),
        "At the end of the year, look at what changed. You may find that people see you more clearly, value your ideas more and come to you more often. Your wisdom was always there. This year, you let it fly.",
      ),
    },
  ],
};
