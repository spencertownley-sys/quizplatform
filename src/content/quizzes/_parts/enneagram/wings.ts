import { md } from "./text";

/**
 * extraBlocks.wing, keyed `${outcome}:${wing}`. The wing is the higher-scoring
 * of the two neighbors on the circle (t1's neighbors are t9 and t2; t9's are t8 and t1).
 */
export const wingBlocks: Record<string, { title: string; body: string }> = {
  "t1:t9": {
    title: "Your wing: 1 with a 9 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 9. It adds calm, reserve and a quieter kind of idealism to your principled core.",
      "Ones with a 9 wing often seem cooler and more composed than other Ones. You may prefer to improve things through careful thought, writing or patient example rather than open debate. Many people with this blend have a clear vision of how the world could be, along with a strong wish to avoid messy conflict on the way there.",
      "Your strengths include fairness, steadiness and the ability to stay level-headed when others get heated. People often see you as wise and trustworthy, someone who takes the long view.",
      "The watch-out is that your anger can go even further underground. Instead of saying “that bothers me”, you might withdraw, go quiet or become distant and a little superior. Your ideals can also stay ideals, admired from a distance rather than acted on, because acting would mean stirring things up.",
      "Growth tip: say small frustrations out loud while they're still small, and pick one cause where you move from thinking about change to doing something concrete.",
    ),
  },
  "t1:t2": {
    title: "Your wing: 1 with a 2 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 2. It adds warmth, people-focus and a strong urge to help to your principled core.",
      "Ones with a 2 wing often channel their high standards into improving other people's lives. You may be drawn to teaching, mentoring, healthcare or advocacy, anywhere you can make things fairer and kinder at the same time. You're usually more outgoing and expressive than Ones with a 9 wing, and quicker to speak up for a cause or a person.",
      "Your strengths include a big heart backed by real follow-through. You don't just care about people; you organize, fix and stand up for them.",
      "The watch-out is that your helpfulness can come with a firm opinion about how others should live. Advice can turn into pressure, and caring can turn into managing. You may also feel deeply hurt, and quietly resentful, when your efforts aren't appreciated.",
      "Growth tip: before offering help or advice, ask whether it's wanted. Let people make their own choices, even ones you'd make differently, and notice how much lighter that feels.",
    ),
  },
  "t2:t1": {
    title: "Your wing: 2 with a 1 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 1. It adds principle, duty and a quieter, more serious tone to your caring core.",
      "Twos with a 1 wing often help out of a strong sense of what's right, not only out of affection. You might be the person who quietly takes care of a sick relative, volunteers week after week or keeps a team running behind the scenes. You're often more reserved than Twos with a 3 wing, and less interested in being noticed for your kindness.",
      "Your strengths include reliability, integrity and service that's genuinely selfless. People trust you because your care is steady and consistent.",
      "The watch-out is that your own needs can feel not just inconvenient but wrong. Wanting rest or attention may feel selfish, so you push through. You may also become critical of people who don't help as much as you do, and that judgment can leak out as sharp comments or silent disapproval.",
      "Growth tip: remind yourself that rest and receiving are not moral failings. Practice one small act of care for yourself each day, and treat it as part of doing the right thing.",
    ),
  },
  "t2:t3": {
    title: "Your wing: 2 with a 3 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 3. It adds charm, social energy and a dash of ambition to your caring core.",
      "Twos with a 3 wing are often warm, outgoing and great at bringing people together. You might love hosting, introducing friends to each other or being the person everyone feels close to. Many people with this blend are skilled at relationships in work settings too, from sales to leadership, because they genuinely enjoy people and know how to make them feel valued.",
      "Your strengths include charisma, generosity and a talent for making everyone feel welcome. You often have a wide circle of friends and a lot of goodwill.",
      "The watch-out is that helping can become tied to being admired. You may notice that it matters a lot whether people see your kindness, or that you adjust yourself to be liked by each group. When appreciation is missing, you might feel deflated or overlooked.",
      "Growth tip: try doing a few kind things anonymously each month. Noticing how they feel without any recognition can show you the generous core underneath the charm.",
    ),
  },
  "t3:t2": {
    title: "Your wing: 3 with a 2 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 2. It adds warmth, charm and people-focus to your driven, goal-oriented core.",
      "Threes with a 2 wing often succeed through relationships. You may be naturally likable, good at motivating others and skilled at reading what people need from you. Many people with this blend excel in roles like sales, teaching, coaching, leadership or anything public-facing, where connection and achievement go hand in hand.",
      "Your strengths include charisma, encouragement and a talent for helping others succeed alongside you. People often enjoy working with you and feel energized by your attention.",
      "The watch-out is a strong need to be liked as well as successful. You may shape-shift to win approval, struggle with disappointing anyone or feel shaken when someone doesn't warm to you. Being admired can quietly start to stand in for being known.",
      "Growth tip: let a few trusted people see you struggle or fail. Notice that the relationships that matter most don't depend on your performance, and let that knowledge loosen the need to win everyone over.",
    ),
  },
  "t3:t4": {
    title: "Your wing: 3 with a 4 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 4. It adds introspection, artistry and a desire for authenticity to your driven, goal-oriented core.",
      "Threes with a 4 wing often care deeply about the quality and meaning of their work, not just the results. You may be more reserved and serious than Threes with a 2 wing, focused on becoming truly excellent at something that expresses who you are. Many people with this blend are drawn to creative careers, design, writing or professional craft.",
      "Your strengths include depth, a strong sense of taste and an ambition anchored in personal meaning. You want to achieve something that feels real, not just impressive.",
      "The watch-out is an inner tension between performing and being authentic. You may compare yourself sharply with others, swing between confidence and self-doubt, or feel like an impostor even when things go well. Image can matter a lot, but in a more private, perfectionistic way.",
      "Growth tip: share some of your inner life with people you trust, including doubts. Let your work express you without needing it to prove you.",
    ),
  },
  "t4:t3": {
    title: "Your wing: 4 with a 3 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 3. It adds drive, polish and a desire to be seen to your expressive, identity-seeking core.",
      "Fours with a 3 wing often want their uniqueness to be recognized and to make an impact. You may be more social, stylish and ambitious than Fours with a 5 wing, eager to create things and share them. Many people with this blend are drawn to performance, design, fashion, writing or any creative field with an audience.",
      "Your strengths include expressiveness, creativity and the energy to turn feelings into finished work. You can bring depth into spaces that usually value only results.",
      "The watch-out is that envy and comparison can get sharper. Seeing others succeed may sting, and you might swing between feeling special and feeling not good enough. Wanting to be seen can sometimes pull you away from what you truly want to express.",
      "Growth tip: create some things just for meaning, with no plan to share them. Measure success by how true the work feels, not only by how it's received.",
    ),
  },
  "t4:t5": {
    title: "Your wing: 4 with a 5 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 5. It adds introspection, intellect and a love of privacy to your expressive, identity-seeking core.",
      "Fours with a 5 wing often have a rich, deep and somewhat private inner world. You may be more reserved and unconventional than Fours with a 3 wing, less interested in being seen and more interested in understanding yourself and life. Many people with this blend are original thinkers, writers, musicians or quiet artists with very personal styles.",
      "Your strengths include depth, originality and the ability to explore emotions with insight as well as feeling. You often see things nobody else sees.",
      "The watch-out is withdrawal. You may retreat into your own world for long stretches, feel so different that connection seems impossible, or keep your best work hidden. Isolation can deepen moods and make life feel heavier than it is.",
      "Growth tip: share your inner world in small, safe doses, like one piece of writing, one honest conversation or one creative project shown to a friend. Connection often turns out to be easier than you feared.",
    ),
  },
  "t5:t4": {
    title: "Your wing: 5 with a 4 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 4. It adds imagination, emotional depth and a creative streak to your observing, knowledge-seeking core.",
      "Fives with a 4 wing often combine sharp thinking with an artistic or unconventional outlook. You may be drawn to ideas that are original and a bit outside the mainstream, and you might express them through art, music, writing, design or inventive problem-solving. You're often more emotionally attuned than you appear, even if you rarely show it.",
      "Your strengths include creativity, independent thought and the ability to see the world from unusual angles. Your inner life is likely vivid and full of ideas.",
      "The watch-out is retreating into imagined worlds, whether in your head, in fiction, games or projects, and losing touch with practical life and other people. You may feel like an outsider and assume others wouldn't understand you.",
      "Growth tip: ground your ideas in something tangible. Finish and share one project, however small, and let someone respond to it. Your unusual way of seeing is a gift worth giving.",
    ),
  },
  "t5:t6": {
    title: "Your wing: 5 with a 6 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 6. It adds practicality, loyalty and a bit of caution to your observing, knowledge-seeking core.",
      "Fives with a 6 wing often put their knowledge to work solving real-world problems. You may be drawn to science, engineering, technology, analysis or any field where careful thinking prevents trouble. You're often more cooperative and team-minded than Fives with a 4 wing, especially with people you've come to trust.",
      "Your strengths include systematic thinking, reliability and a sharp eye for risks and flaws. People count on your clear, well-researched view.",
      "The watch-out is anxiety layered on top of your need for preparation. You may over-research to feel safe, struggle to trust your conclusions, or become skeptical of anyone you haven't fully figured out. Worry can keep you in planning mode long after it's time to act.",
      "Growth tip: set a clear point where research ends and action begins. Trust the knowledge you already have, and let a trusted colleague or friend help you check your thinking instead of researching alone.",
    ),
  },
  "t6:t5": {
    title: "Your wing: 6 with a 5 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 5. It adds independence, analysis and a more reserved style to your loyal, security-seeking core.",
      "Sixes with a 5 wing often look for security in knowledge and competence. You may research thoroughly, think things through on your own and trust systems and ideas that have proven themselves. You're often more serious and private than Sixes with a 7 wing, and loyal to causes, principles and a small circle of trusted people.",
      "Your strengths include careful judgment, persistence and the ability to spot weaknesses in a plan. You're often the person who asks the question that saves everyone trouble.",
      "The watch-out is withdrawal and suspicion. When worried, you may keep your fears to yourself, analyze threats alone and become wary of others' motives. That can make you seem distant and leave you carrying more anxiety than you need to.",
      "Growth tip: share your concerns early with someone you trust, rather than thinking them through alone. Talking a worry out loud often shrinks it faster than any amount of research.",
    ),
  },
  "t6:t7": {
    title: "Your wing: 6 with a 7 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 7. It adds playfulness, sociability and humor to your loyal, security-seeking core.",
      "Sixes with a 7 wing are often warm, friendly and fun to be around. You may use humor to ease tension and connect with people, and you probably enjoy being part of a lively group. Many people with this blend are loyal friends and great team members who make hard work feel lighter.",
      "Your strengths include approachability, loyalty and a talent for bringing people together. You can combine responsibility with a sense of fun.",
      "The watch-out is anxiety hiding behind the fun. You may keep busy, joke or seek distraction to avoid worrying, and seek reassurance from many people at once. You might also overcommit to keep everyone happy and then feel stretched and uneasy.",
      "Growth tip: notice when you reach for fun or company to escape a worry, and try naming the worry first instead. Pick a few trusted people to lean on, rather than everyone, and practice saying no when your plate is full.",
    ),
  },
  "t7:t6": {
    title: "Your wing: 7 with a 6 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 6. It adds loyalty, warmth and a sense of responsibility to your adventurous, upbeat core.",
      "Sevens with a 6 wing are often playful and sociable, with a strong attachment to friends and community. You may love planning fun for the group, keeping everyone connected and making sure nobody is left out. Many people with this blend are charming, funny and more anxious underneath than they let on.",
      "Your strengths include warmth, enthusiasm and an ability to combine fun with genuine loyalty. People enjoy you and also know they can count on you.",
      "The watch-out is people-pleasing and scattered energy. You may say yes to too many plans so you don't disappoint anyone, and use activity to quiet worries you'd rather not face. When anxiety rises, you might bounce between options without settling.",
      "Growth tip: practice saying no to one plan each week to protect time for yourself. When you feel restless, ask whether there's a worry underneath, and talk it through with someone you trust.",
    ),
  },
  "t7:t8": {
    title: "Your wing: 7 with an 8 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 8. It adds boldness, assertiveness and drive to your adventurous, upbeat core.",
      "Sevens with an 8 wing are often go-getters who chase big experiences and big goals. You may be confident, quick to act and comfortable taking charge when an idea excites you. Many people with this blend are entrepreneurial, persuasive and full of energy, combining vision with the push to make it real.",
      "Your strengths include decisiveness, confidence and an infectious belief that anything is possible. You make things happen and bring others along for the ride.",
      "The watch-out is excess and impatience. You may push too hard for what you want, overlook other people's feelings in the rush, or go big on spending, work or fun without counting the cost. Slowing down can feel like losing.",
      "Growth tip: before a big decision, pause and ask who else it affects and what you might be avoiding. Practice savoring what you have before reaching for more.",
    ),
  },
  "t8:t7": {
    title: "Your wing: 8 with a 7 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 7. It adds energy, adventure and a big appetite for life to your strong, protective core.",
      "Eights with a 7 wing are often bold, outgoing and expansive. You may love taking risks, starting new ventures and living life at full volume. Many people with this blend are natural entrepreneurs and leaders with a contagious, larger-than-life presence.",
      "Your strengths include drive, confidence and the courage to go after big goals. You can rally people around a vision and make it happen quickly.",
      "The watch-out is impulsiveness and excess. You may act before thinking it through, push yourself and others too hard, or seek intensity, whether in work, fun or conflict, to avoid slowing down. People may find your energy exciting and also exhausting.",
      "Growth tip: build in pauses before major decisions and check in with people affected by them. Make space for quieter moments, and notice what you feel when you're not in motion.",
    ),
  },
  "t8:t9": {
    title: "Your wing: 8 with a 9 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 9. It adds calm, patience and steadiness to your strong, protective core.",
      "Eights with a 9 wing often show strength in a quieter, more grounded way. You may seem relaxed and easygoing until someone crosses a line, and then your power appears all at once. Many people with this blend are protective, steady leaders whom others find reassuring rather than intimidating.",
      "Your strengths include calm authority, patience and a deep protectiveness toward the people and places you care about. People often feel safe around you.",
      "The watch-out is stubbornness and sudden eruptions. Because you can absorb a lot before reacting, frustration may build quietly until it explodes. You might also resist change and dig in rather than discuss.",
      "Growth tip: speak up earlier, while frustrations are still small. Let people know what you need before it becomes a battle, and stay open to being moved by a good argument.",
    ),
  },
  "t9:t8": {
    title: "Your wing: 9 with an 8 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 8. It adds groundedness, practicality and a firmer edge to your peaceful core.",
      "Nines with an 8 wing are often easygoing but solid. You may be relaxed and comfortable most of the time, yet surprisingly assertive when someone pushes too hard. Many people with this blend are practical, down to earth and strongly connected to comfort, home and the people they love.",
      "Your strengths include steadiness, protectiveness and a calm confidence that others find reassuring. You can stand your ground when it really matters.",
      "The watch-out is stubbornness and buried anger. You may resist quietly rather than disagree openly, then blow up when you've had enough. You might also settle into comfort routines that make it hard to start anything new.",
      "Growth tip: say “I disagree” early and calmly, instead of waiting until you're fed up. Use some of your natural strength to go after one goal of your own.",
    ),
  },
  "t9:t1": {
    title: "Your wing: 9 with a 1 wing",
    body: md(
      "Your wing is the neighboring type that scored higher for you, and for you that's Type 1. It adds idealism, order and quiet principle to your peaceful core.",
      "Nines with a 1 wing are often gentle, conscientious and guided by a strong sense of right and wrong. You may care about fairness and doing things properly, while preferring to work for change calmly and without conflict. Many people with this blend are thoughtful, orderly and quietly idealistic.",
      "Your strengths include kindness, integrity and a calm, principled presence. People trust you to be fair and to treat everyone with respect.",
      "The watch-out is hidden criticism. You may hold opinions and judgments you never voice, feel quietly frustrated when things aren't done right, and be harder on yourself than you let on. Avoiding conflict can mean your ideals stay unspoken.",
      "Growth tip: share your opinions, especially about things you care about. Let your inner sense of right and wrong guide action, even if it creates a little friction.",
    ),
  },
};
