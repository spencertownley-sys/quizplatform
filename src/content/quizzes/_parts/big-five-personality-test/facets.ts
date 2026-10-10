import type { Facet } from "@/lib/engine/types";

/** 30 facets (6 per trait), named after the public-domain IPIP-NEO facet scales. */
export const facets: Facet[] = [
  // Openness
  {
    key: "imagination",
    label: "Imagination",
    dimension: "openness",
    report: {
      low: "You keep your mind on what is real and in front of you. Daydreams don't pull you away from the task at hand, which helps you stay focused and practical.",
      mid: "You can let your mind wander when you have time, but you return easily to the here and now. Imagination is a tool you pick up when it helps, not a place you live.",
      high: "Your mind easily drifts into daydreams, stories and what-ifs. That inner world is a rich source of ideas, though it can also pull your attention away from dull tasks.",
    },
  },
  {
    key: "artistic_interests",
    label: "Artistic interests",
    dimension: "openness",
    report: {
      low: "Art, music and design are not a big draw for you. You tend to judge things by how well they work rather than how they look or feel.",
      mid: "You enjoy beauty when you come across it, but you don't go out of your way to find it. A good song or view can lift your day without being central to who you are.",
      high: "Beauty matters to you, whether it's in art, music, nature or a well-made object. You notice details others pass by, and creative experiences can feel almost necessary.",
    },
  },
  {
    key: "emotionality",
    label: "Emotionality",
    dimension: "openness",
    report: {
      low: "You don't spend much time examining your own feelings. You tend to deal with situations directly rather than through how they make you feel.",
      mid: "You are aware of your emotions when they are strong, and less so when they are subtle. You can talk about feelings when needed without dwelling on them.",
      high: "You are closely tuned in to your inner emotional life and can name what you feel. That awareness helps you understand yourself, and it often makes you good at understanding others too.",
    },
  },
  {
    key: "adventurousness",
    label: "Adventurousness",
    dimension: "openness",
    report: {
      low: "You like routines and familiar places, and change has to prove its worth to you. Familiarity gives you comfort and lets you put your energy elsewhere.",
      mid: "You enjoy some variety but appreciate a home base. You will try a new place or activity now and then, especially if someone you trust suggests it.",
      high: "Novelty energizes you, whether it's a new food, a new route home or a new hobby. Routine can feel stale quickly, so you tend to keep shaking things up.",
    },
  },
  {
    key: "intellect",
    label: "Intellect",
    dimension: "openness",
    report: {
      low: "You prefer ideas that have a clear, practical use. Long theoretical debates tend to feel like a detour from getting things done.",
      mid: "You enjoy a good discussion or puzzle when it connects to something real. Abstract ideas interest you in moderate doses.",
      high: "You love playing with ideas, puzzles and big questions just for the pleasure of thinking. Complex topics draw you in rather than putting you off. Note that this facet is about enjoying ideas, not about how smart you are.",
    },
  },
  {
    key: "liberalism",
    label: "Liberalism",
    dimension: "openness",
    report: {
      low: "You place real value on tradition, custom and the ways things have been done. In personality research this facet is about your attitude to convention, not your politics.",
      mid: "You respect traditions that make sense to you and question the ones that don't. You weigh old and new ways case by case rather than leaning hard either way.",
      high: "You like to examine rules, customs and received wisdom and decide for yourself what holds up. In personality research this facet is about questioning convention, not about which party you support.",
    },
  },
  // Conscientiousness
  {
    key: "self_efficacy",
    label: "Self-efficacy",
    dimension: "conscientiousness",
    report: {
      low: "You often doubt whether you can handle what is in front of you. That doubt can make tasks feel bigger than they are, so small, early wins are especially helpful for you.",
      mid: "You feel capable in areas you know well and less sure in unfamiliar ones. Your confidence tends to grow with practice rather than arrive up front.",
      high: "You trust yourself to figure things out and get them done. That confidence helps you start hard tasks and keep going when they get messy.",
    },
  },
  {
    key: "orderliness",
    label: "Orderliness",
    dimension: "conscientiousness",
    report: {
      low: "You are comfortable with some mess and don't need everything in its place. You may lose time hunting for things, but you don't waste energy on tidying that doesn't matter to you.",
      mid: "You keep things organized enough to function, with occasional pileups. You tidy when the clutter starts to get in the way.",
      high: "You like order, lists and everything in its place. A neat space helps you think, though disorder you can't control may bother you more than it bothers others.",
    },
  },
  {
    key: "dutifulness",
    label: "Dutifulness",
    dimension: "conscientiousness",
    report: {
      low: "You treat many obligations as flexible and decide in the moment what really needs doing. This gives you freedom, but others may see you as less dependable than you intend.",
      mid: "You keep the promises that matter most to you and let smaller ones bend when life gets busy. People can usually rely on you for the big things.",
      high: "Your word is your bond. You keep promises and meet obligations even when it costs you, and you may feel real discomfort when you can't.",
    },
  },
  {
    key: "achievement_striving",
    label: "Achievement-striving",
    dimension: "conscientiousness",
    report: {
      low: "You don't feel a strong push to excel, and you are content doing what's needed. That can bring a healthy sense of balance, as long as it isn't holding back goals you care about.",
      mid: "You work hard on goals that matter to you and coast on the rest. Your drive switches on when something feels meaningful.",
      high: "You set high goals and push hard to reach them. Ambition is one of your engines, and it helps to check now and then that the goals are still truly yours.",
    },
  },
  {
    key: "self_discipline",
    label: "Self-discipline",
    dimension: "conscientiousness",
    report: {
      low: "Getting started is often the hardest part for you, and boring tasks tend to wait until the last minute. Deadlines and outside structure usually work better for you than willpower alone.",
      mid: "You can push through tasks you don't enjoy, though procrastination creeps in sometimes. Breaking work into small steps helps you keep moving.",
      high: "You can make yourself start and finish tasks even when you don't feel like it. That follow-through is one of the most useful traits for reaching long-term goals.",
    },
  },
  {
    key: "cautiousness",
    label: "Cautiousness",
    dimension: "conscientiousness",
    report: {
      low: "You tend to act first and think later. Quick decisions keep things moving, but some of them may need undoing afterward.",
      mid: "You think through big decisions and go with your gut on small ones. You can move fast when you need to without being reckless.",
      high: "You think carefully before you act and like to weigh the options. This helps you avoid mistakes, though it can slow you down when a quick call would do.",
    },
  },
  // Extraversion
  {
    key: "friendliness",
    label: "Friendliness",
    dimension: "extraversion",
    report: {
      low: "You tend to be reserved with people until you know them well. Others may read you as distant at first, even when you are simply taking your time.",
      mid: "You are friendly once things get going, but you don't always make the first move. Warmth comes more easily with people you already know.",
      high: "You warm up to people quickly and make friends easily. Others often feel welcome around you from the very first conversation.",
    },
  },
  {
    key: "gregariousness",
    label: "Gregariousness",
    dimension: "extraversion",
    report: {
      low: "Crowds and big gatherings tend to drain you. You prefer small groups or one-on-one time, where you can actually hear each other.",
      mid: "You enjoy a group outing now and then, but you don't need a packed social calendar. Smaller gatherings often suit you best.",
      high: "You love being part of a crowd and the buzz of a busy room. Parties, events and group plans tend to energize you rather than tire you out.",
    },
  },
  {
    key: "assertiveness",
    label: "Assertiveness",
    dimension: "extraversion",
    report: {
      low: "You usually let others take the lead and prefer to contribute from the side. Your ideas may be good, but they can go unheard if you don't find a way to voice them.",
      mid: "You can take charge when needed, but you are just as happy to follow a good leader. You speak up when you feel strongly.",
      high: "You naturally step up, speak your mind and steer groups. People often look to you for direction, which works best when you also leave room for quieter voices.",
    },
  },
  {
    key: "activity_level",
    label: "Activity level",
    dimension: "extraversion",
    report: {
      low: "You prefer a slower, unhurried pace of life. You like time to settle into things rather than rushing from one to the next.",
      mid: "You can handle busy stretches but also value downtime. Your pace shifts with the season and your mood.",
      high: "You like a fast pace and a full schedule. Staying busy keeps you energized, though rest may only happen when you plan for it.",
    },
  },
  {
    key: "excitement_seeking",
    label: "Excitement-seeking",
    dimension: "extraversion",
    report: {
      low: "You prefer calm, low-key experiences to loud or intense ones. Thrills hold little appeal when peace and quiet are on offer.",
      mid: "You enjoy some excitement in small doses, like a lively concert or a fun ride. Afterward, you are happy for things to settle down again.",
      high: "You crave stimulation, from loud events to adventurous activities. Boredom is your enemy, so it pays to find safe ways to get your thrills.",
    },
  },
  {
    key: "cheerfulness",
    label: "Cheerfulness",
    dimension: "extraversion",
    report: {
      low: "You are not one for big shows of happiness, and your good moods tend to be quiet ones. That can be read as seriousness, even when you are perfectly content.",
      mid: "You have your share of upbeat moments, especially with the right people. Your mood is mostly even, with some bright spots.",
      high: "You often feel joyful and full of energy, and you laugh easily. Your good mood tends to rub off on the people around you.",
    },
  },
  // Agreeableness
  {
    key: "trust",
    label: "Trust",
    dimension: "agreeableness",
    report: {
      low: "You are cautious about people's motives until they prove themselves. That protects you from being taken advantage of, though it can keep good people at arm's length.",
      mid: "You give people a reasonable amount of benefit of the doubt, but you watch for signs it isn't deserved. Your trust is earned and kept.",
      high: "You assume most people mean well and offer trust freely. This makes relationships easier to start, and it helps to keep an eye out for the occasional person who would misuse it.",
    },
  },
  {
    key: "morality",
    label: "Morality",
    dimension: "agreeableness",
    report: {
      low: "You see some strategic spin or flattery as a normal part of getting ahead. In this facet a low score means comfort with bending things socially, not a lack of values.",
      mid: "You are mostly straightforward, with occasional tact or polish when a situation calls for it. You rarely deceive, but you don't always say everything.",
      high: "You value plain honesty and dislike manipulation or spin. People tend to trust what you say because you say what you mean.",
    },
  },
  {
    key: "altruism",
    label: "Altruism",
    dimension: "agreeableness",
    report: {
      low: "You focus mainly on your own goals and expect others to look after theirs. You help when asked, but you rarely go looking for chances to do so.",
      mid: "You are happy to help when you can, especially for people close to you. You balance generosity with looking after your own load.",
      high: "Helping others is a real source of satisfaction for you. You often go out of your way for people, sometimes at the expense of your own time and energy.",
    },
  },
  {
    key: "cooperation",
    label: "Cooperation",
    dimension: "agreeableness",
    report: {
      low: "You don't back away from confrontation and can push hard when you disagree. That makes you a strong advocate, though the sharpness can sting.",
      mid: "You will compromise to keep the peace, but you can push back when it really matters. You choose your battles.",
      high: "You strongly prefer to avoid conflict and will often give ground to keep things smooth. Harmony is a gift, as long as your own needs still get heard.",
    },
  },
  {
    key: "modesty",
    label: "Modesty",
    dimension: "agreeableness",
    report: {
      low: "You are comfortable talking about your strengths and wins. Confidence like this can open doors, though it may come across as boastful to some.",
      mid: "You can own your achievements without making a show of them. You share credit and claim it in about equal measure.",
      high: "You downplay your achievements and dislike being in the spotlight. Others appreciate your humility, but you may undersell yourself when it counts.",
    },
  },
  {
    key: "sympathy",
    label: "Sympathy",
    dimension: "agreeableness",
    report: {
      low: "You tend to approach other people's troubles with logic rather than strong feeling. You may be good at practical help, even when you don't feel moved.",
      mid: "You feel for people who are struggling, especially those close to you. You can offer comfort without being swept away by their pain.",
      high: "Other people's pain touches you deeply, and you feel a strong pull to comfort them. This compassion is a strength, and it needs boundaries so it doesn't wear you out.",
    },
  },
  // Emotional sensitivity (neuroticism)
  {
    key: "anxiety",
    label: "Anxiety",
    dimension: "neuroticism",
    report: {
      low: "You rarely worry about what might go wrong. You tend to deal with problems when they arrive rather than in advance.",
      mid: "You worry about some things, especially when stakes are high, but it usually stays manageable. Your worry tends to fade once you take action.",
      high: "Your mind often jumps to what could go wrong, and worry can be hard to switch off. Planning, talking it through and grounding exercises tend to help people with this pattern.",
    },
  },
  {
    key: "anger",
    label: "Anger",
    dimension: "neuroticism",
    report: {
      low: "You rarely lose your temper, and frustration passes quickly. People find you easy to be around under pressure.",
      mid: "You get irritated now and then, usually for good reason, and you can usually calm yourself down. Certain pet peeves may reliably set you off.",
      high: "Frustration and irritation come on quickly for you. Noticing the early signs and giving yourself a pause before reacting can make a big difference.",
    },
  },
  {
    key: "low_mood",
    label: "Low mood",
    dimension: "neuroticism",
    report: {
      low: "You rarely feel down for long, and your mood bounces back after setbacks. You tend to keep a hopeful outlook.",
      mid: "You have low days like anyone, but they don't usually last. Connection, rest and small wins tend to lift you.",
      high: "You often feel down or discouraged, and low moods can linger. If this is affecting your daily life, it's worth talking with a doctor or counselor, because support helps.",
    },
  },
  {
    key: "self_consciousness",
    label: "Self-consciousness",
    dimension: "neuroticism",
    report: {
      low: "You don't embarrass easily and feel fairly at ease with new people. Social slip-ups tend to roll off you.",
      mid: "You feel awkward in some new situations but settle in after a while. Familiar faces help you relax.",
      high: "You are very aware of how others might see you, and new social situations can feel uncomfortable. Remember that most people are far more focused on themselves than on judging you.",
    },
  },
  {
    key: "immoderation",
    label: "Immoderation",
    dimension: "neuroticism",
    report: {
      low: "You can resist cravings and urges without much struggle. Moderation comes fairly naturally to you.",
      mid: "You give in to temptation now and then, mostly when you are tired or stressed. Planning ahead helps you stay on track.",
      high: "Cravings and urges can be hard for you to resist, especially when you're stressed. Changing your surroundings, like not keeping the temptation nearby, often works better than willpower.",
    },
  },
  {
    key: "vulnerability",
    label: "Vulnerability",
    dimension: "neuroticism",
    report: {
      low: "You stay calm under pressure and recover well from setbacks. You are often the steady one when others are shaken.",
      mid: "You cope with most pressure, though a big pileup can rattle you. A short break or some support helps you regroup.",
      high: "When pressure piles up you can feel overwhelmed or panicky. Breaking problems into small steps and asking for help early can make a real difference.",
    },
  },
];
