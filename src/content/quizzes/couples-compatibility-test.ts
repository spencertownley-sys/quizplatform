import { AGREE_5 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { communication } from "./_parts/couples-compatibility-test/communication";
import { conflict } from "./_parts/couples-compatibility-test/conflict";
import { intimacy } from "./_parts/couples-compatibility-test/intimacy";
import { lifestyle } from "./_parts/couples-compatibility-test/lifestyle";
import { money } from "./_parts/couples-compatibility-test/money";
import { values } from "./_parts/couples-compatibility-test/values";

const quiz: QuizDefinition = {
  slug: "couples-compatibility-test",
  n: 25,
  title: "Couples Compatibility Test",
  tagline: "Take it together and see where you click and where you clash.",
  category: "Relationships",
  structure: "compare",
  description:
    "Answer 50 questions on values, talk, affection, money, lifestyle and conflict, then invite your partner and see how you match, area by area.",
  disclaimer:
    "This test is for reflection and conversation, not a prediction of whether a relationship will last. Differences are normal and often workable; the point is to talk about them.",
  method: `Each of you answers the same 50 statements on a five-point agree scale. The statements feed six areas: values and life vision, communication, affection and intimacy, money, lifestyle and conflict style. About a third are worded in the opposite direction and flipped before scoring, so agreeing with everything doesn't push your scores up. Each area gets a score from 0 to 100 showing where you sit between its two poles, for example between spender and saver. Your own result names the area where you scored highest.

When your partner finishes, each area gets a match score: how close your two scores are, where 100 means identical. Your overall match is the average of the six. A high match means you lean the same way in that area; a low one means it deserves a conversation, not that you're incompatible.

The test can't see your actual beliefs, your history or how you treat each other, and it can't predict whether a relationship will last. It's a self-report snapshot designed to start useful conversations.`,
  minutes: 9,
  paywall: "free_headline",
  minAge: 18,
  scale: AGREE_5,
  status: "draft",
  dimensions: [
    {
      key: "values",
      label: "Values & life vision",
      low: "Open-ended",
      high: "Rooted",
      description: "How much you want a settled, shared life vision: commitment, traditions, beliefs and long-term plans.",
      report: {
        low: "You prefer to keep life open-ended rather than locked into a set plan. You're comfortable with a partner whose beliefs or traditions differ from yours, and you may value flexibility and freedom over fixed milestones. That openness makes you adaptable and accepting. With a more rooted partner, it helps to talk about which big questions you're genuinely flexible on and which you'd simply rather not decide yet.",
        mid: "You value a shared direction, but you don't need every big question settled. Some traditions and commitments matter a lot to you, while others feel optional, and you can adjust your plans as life changes. This balance helps you meet a partner in the middle. The key is knowing which of your values are truly non-negotiable, so you can say so early.",
        high: "A clear, shared vision for life matters a lot to you. You want a partner who shares your big goals and core beliefs, and traditions, commitment and long-term plans give you a sense of security. That makes you steady and purposeful in a relationship. The watch-out is that differences on big questions can feel threatening, so it helps to separate true deal-breakers from preferences you could flex on.",
      },
    },
    {
      key: "communication",
      label: "Communication",
      low: "Reserved",
      high: "Expressive",
      description: "How much you want to talk things through: sharing feelings, daily catch-ups and conversations about the relationship.",
      report: {
        low: "You tend to keep your thoughts and feelings to yourself until you've sorted them out. You'd often rather show care through actions than long conversations, and frequent check-ins about the relationship may feel unnecessary. That makes you calm and low-drama to be around. With a more expressive partner, sharing a little more, even one sentence about what's on your mind, can keep them from feeling shut out.",
        mid: "You like to talk things through, but you don't need constant conversation. You can share feelings when it matters and enjoy comfortable silence the rest of the time. You probably adapt to how much a partner wants to talk. Making sure the important things get said, even when it's easier not to, is the main thing to watch.",
        high: "Talking is central to how you connect. You like to share your day, say what you're feeling soon after you feel it, and check in regularly about how the relationship is going. That openness builds trust and closeness quickly. The watch-out is that a more reserved partner may feel pressured, so it helps to agree on a rhythm of conversation that works for both of you.",
      },
    },
    {
      key: "intimacy",
      label: "Affection & intimacy",
      low: "Low-key",
      high: "Affectionate",
      description: "How central physical affection, romance and closeness are to feeling connected with a partner.",
      report: {
        low: "Affection and romance are less central to how you feel close to someone. You may feel connected through friendship, shared activities or conversation more than through physical closeness or grand gestures. That can make your relationships feel easy and grounded. With a more affectionate partner, it helps to talk openly about the kinds of closeness that feel good to you, so they don't read your style as a lack of interest.",
        mid: "Affection and romance matter to you in a balanced way. You enjoy closeness and the occasional romantic gesture, but you don't need constant displays to feel connected. Your needs may rise and fall with stress and life stage. Keeping a few small habits of affection going, even when life is busy, helps protect what you have.",
        high: "Affection and romance are a big part of how you feel loved and connected. Physical closeness, keeping the spark alive and making time for romance matter a great deal to you. That warmth can make a partner feel truly wanted. The watch-out is that a less affectionate partner may feel pressured while you feel rejected, so open, kind conversations about needs are especially important for you.",
      },
    },
    {
      key: "money",
      label: "Money",
      low: "Spender",
      high: "Saver",
      description: "How you lean with money: enjoying it now, or planning and saving for later.",
      report: {
        low: "You lean toward enjoying money now rather than saving it for later. You value experiences, spontaneity and not being boxed in by a budget, and you may worry less about money than many people do. That makes you generous and fun to be around. With a saver partner, a shared plan that still leaves room for guilt-free spending can prevent a lot of friction.",
        mid: "You balance saving with enjoying life. You probably keep an eye on your spending and have some savings, but you're also happy to spend on things that matter to you. This middle ground can help you bridge the gap with a partner who leans either way. Making sure you're aligned on big financial goals, not just day-to-day spending, is the main thing to check.",
        high: "You lean toward saving and planning with money. You like having a cushion for emergencies, keeping track of where money goes and saving for big goals, and debt can make you anxious. That brings stability and security to a relationship. The watch-out is that a spender partner may feel judged or restricted, so it helps to build in room for enjoyment and to talk about money without blame.",
      },
    },
    {
      key: "lifestyle",
      label: "Lifestyle",
      low: "Homebody",
      high: "Adventurer",
      description: "How much you crave novelty, travel, activity and a full social calendar.",
      report: {
        low: "You're a homebody at heart. Quiet evenings, familiar routines and a smaller social calendar are where you feel most comfortable, and too much activity can drain you. That makes you a calming, steady presence. With a more adventurous partner, agreeing on a balance, and staying open to the occasional new experience, keeps either of you from feeling stuck or dragged along.",
        mid: "You enjoy a mix of adventure and downtime. You like new experiences and social plans, but you also value quiet nights and routines. This flexibility helps you get along with partners at either end of the scale. Saying when you need more of one or the other is the main thing to watch.",
        high: "You crave novelty, activity and a full life. Travel, new places, social plans and trying new things give you energy, and too much routine can make you restless. That brings excitement and variety to a relationship. The watch-out is that a homebody partner may feel worn out or left behind, so it helps to balance shared adventures with time at home and some solo outings.",
      },
    },
    {
      key: "conflict",
      label: "Conflict style",
      low: "Space first",
      high: "Talk it out",
      description: "Whether you want to address disagreements right away and directly, or prefer time and calm first.",
      report: {
        low: "You prefer to take space and let things cool down before tackling a disagreement. You may let small issues go, and raised voices can make you go quiet. That calm can keep conflicts from escalating. The watch-out is that problems can go unaddressed and a partner who wants to talk may feel shut out, so naming when you'll come back to the issue really helps.",
        mid: "You can address conflict directly when it's needed, but you also see the value of a pause. Depending on the issue, you might raise it right away or wait for a calmer moment. That flexibility helps in many situations. Making sure the waiting doesn't quietly turn into avoiding is the main thing to watch.",
        high: "You prefer to face disagreements head-on and resolve them quickly. You'd rather raise a problem, even an awkward one, than let tension build, and it's hard for you to relax until things are talked through. That honesty keeps small issues from growing. The watch-out is that a partner who needs space may feel pressured, so it helps to agree on how and when to pause and come back.",
      },
    },
  ],
  questions: [
    // Round 1
    { id: "v1", kind: "likert", dimension: "values", text: "I want my partner and me to share the same big goals in life." },
    { id: "c1", kind: "likert", dimension: "communication", text: "I like to talk through my day with my partner most evenings." },
    { id: "i1", kind: "likert", dimension: "intimacy", text: "Physical affection, like hugs and holding hands, matters a lot to me." },
    { id: "m1", kind: "likert", dimension: "money", text: "I feel uneasy when there's no money set aside for emergencies." },
    { id: "l1", kind: "likert", dimension: "lifestyle", text: "I get restless when my weekends start to look the same." },
    { id: "f1", kind: "likert", dimension: "conflict", text: "I want to resolve a disagreement the same day it happens." },
    // Round 2
    { id: "v2", kind: "likert", dimension: "values", text: "Family traditions matter a lot to me." },
    { id: "c7", kind: "likert", dimension: "communication", text: "I'd rather show care through actions than talk about feelings.", reverse: true },
    { id: "i6", kind: "likert", dimension: "intimacy", text: "I can feel close to a partner without much physical affection.", reverse: true },
    { id: "m2", kind: "likert", dimension: "money", text: "I keep track of where my money goes each month." },
    { id: "l6", kind: "likert", dimension: "lifestyle", text: "My ideal evening is a quiet night at home.", reverse: true },
    { id: "f2", kind: "likert", dimension: "conflict", text: "I'd rather argue openly than let tension build." },
    // Round 3
    { id: "v7", kind: "likert", dimension: "values", text: "I'm happy for a partner to hold very different beliefs from mine.", reverse: true },
    { id: "c2", kind: "likert", dimension: "communication", text: "I say what I'm feeling soon after I notice it." },
    { id: "i2", kind: "likert", dimension: "intimacy", text: "I want romance to stay a priority even after years together." },
    { id: "m6", kind: "likert", dimension: "money", text: "I'd rather spend on experiences now than save for someday.", reverse: true },
    { id: "l2", kind: "likert", dimension: "lifestyle", text: "Regular travel is a big part of the life I want." },
    { id: "f6", kind: "likert", dimension: "conflict", text: "I need time alone to cool down before talking about a fight.", reverse: true },
    // Round 4
    { id: "v3", kind: "likert", dimension: "values", text: "I picture my future built around one long-term commitment." },
    { id: "c3", kind: "likert", dimension: "communication", text: "I want regular check-ins about how our relationship is going." },
    { id: "i3", kind: "likert", dimension: "intimacy", text: "Physical intimacy is a big part of how I feel close to a partner." },
    { id: "m3", kind: "likert", dimension: "money", text: "I'd rather save for a big goal than spend on something fun now." },
    { id: "l3", kind: "likert", dimension: "lifestyle", text: "A busy social calendar gives me energy." },
    { id: "f3", kind: "likert", dimension: "conflict", text: "I bring up problems even when it's awkward." },
    // Round 5
    { id: "v4", kind: "likert", dimension: "values", text: "My beliefs or values guide most of my big decisions." },
    { id: "c8", kind: "likert", dimension: "communication", text: "Talking about the relationship itself usually feels unnecessary to me.", reverse: true },
    { id: "i4", kind: "likert", dimension: "intimacy", text: "I like planning dates or surprises to keep the spark alive." },
    { id: "m7", kind: "likert", dimension: "money", text: "I often buy things on impulse without much worry.", reverse: true },
    { id: "l4", kind: "likert", dimension: "lifestyle", text: "I love trying new restaurants, hobbies and places." },
    { id: "f7", kind: "likert", dimension: "conflict", text: "I let small disagreements go rather than raise them.", reverse: true },
    // Round 6
    { id: "v8", kind: "likert", dimension: "values", text: "I'd rather keep life open than commit to a set plan.", reverse: true },
    { id: "c4", kind: "likert", dimension: "communication", text: "Long, deep conversations are one of my favorite parts of a relationship." },
    { id: "i7", kind: "likert", dimension: "intimacy", text: "In a relationship, friendship matters more to me than romance.", reverse: true },
    { id: "m4", kind: "likert", dimension: "money", text: "I think carefully about price before most purchases." },
    { id: "l7", kind: "likert", dimension: "lifestyle", text: "I prefer familiar routines to new experiences.", reverse: true },
    { id: "f4", kind: "likert", dimension: "conflict", text: "I can't relax until a conflict has been talked through." },
    // Attention check, past the middle
    { id: "check", kind: "attention", text: "To show you're reading, choose \"Agree\" for this one.", expect: 4 },
    // Round 7
    { id: "v5", kind: "likert", dimension: "values", text: "I want a partner whose views on family match mine." },
    { id: "c5", kind: "likert", dimension: "communication", text: "I share my worries out loud rather than keeping them in." },
    { id: "i5", kind: "likert", dimension: "intimacy", text: "I feel most connected when we're physically close, even just on the couch." },
    { id: "m5", kind: "likert", dimension: "money", text: "Debt makes me anxious, even when it's manageable." },
    { id: "l5", kind: "likert", dimension: "lifestyle", text: "I'd rather be out and about than stay in." },
    { id: "f8", kind: "likert", dimension: "conflict", text: "When voices rise, I tend to go quiet.", reverse: true },
    // Round 8
    { id: "v6", kind: "likert", dimension: "values", text: "I like having a clear plan for where my life is headed." },
    { id: "c9", kind: "likert", dimension: "communication", text: "I keep my feelings to myself until I've sorted them out.", reverse: true },
    { id: "i8", kind: "likert", dimension: "intimacy", text: "Big romantic gestures make me a little uncomfortable.", reverse: true },
    { id: "m8", kind: "likert", dimension: "money", text: "Budgets feel restrictive to me.", reverse: true },
    { id: "l8", kind: "likert", dimension: "lifestyle", text: "Big parties drain me more than they energize me.", reverse: true },
    { id: "f5", kind: "likert", dimension: "conflict", text: "I'd rather have a hard conversation now than wait for a better time." },
    // Round 9
    { id: "v9", kind: "likert", dimension: "values", text: "Traditions and rituals don't mean much to me.", reverse: true },
    { id: "c6", kind: "likert", dimension: "communication", text: "I'd rather hear too much about my partner's feelings than too little." },
  ],
  outcomes: [values, communication, intimacy, money, lifestyle, conflict],
  compare: {
    invite: "Invite your partner and see where you click and where you clash",
    other: "partner",
    dimensions: {
      values: {
        match:
          "You want a similarly rooted, shared vision for life, whether that means a lot of structure and tradition or a more open-ended path. That alignment makes big decisions, like where to live, how to mark holidays and what commitment looks like, feel less like negotiations. The test can't see which specific beliefs you hold, though, so it's still worth talking through the details.",
        differ:
          "One of you wants a more settled, shared vision than the other. The more rooted partner may want clear plans, traditions and agreement on big questions, while the more open-ended partner may feel boxed in by too much certainty. This gap is workable when you separate true non-negotiables from preferences and talk about them early.",
        prompts: [
          "Where do you picture us in five years, and what does an ordinary day look like?",
          "Which traditions from your family do you want to keep, and which would you happily drop?",
          "What's one belief or value you'd never want to compromise on?",
          "How do you feel about big commitments, like marriage, children or buying a home, right now?",
        ],
      },
      communication: {
        match:
          "You want a similar amount of talk in your relationship. If you're both expressive, you'll likely share freely and check in often; if you're both more reserved, you may enjoy an easy, low-pressure quiet. The watch-out for two reserved partners is letting important things go unsaid for too long.",
        differ:
          "One of you wants to talk things through much more than the other. The expressive partner may feel shut out by short answers, while the more reserved partner may feel pressured by frequent check-ins. Agreeing on a rhythm, such as a short daily catch-up and a longer weekly talk, often satisfies both.",
        prompts: [
          "When something's bothering you, how and when do you prefer to bring it up?",
          "Do you feel I listen well? What would help you feel more heard?",
          "How often would you like to check in about how we're doing as a couple?",
          "Is there something you've been holding back from saying?",
        ],
      },
      intimacy: {
        match:
          "You place a similar weight on affection and romance. If it's high for both of you, keeping the spark alive will feel natural and mutual; if it's lower for both, you may share a comfortable, friendship-first closeness. Needs here often shift with stress, health and life stage, so keep checking in.",
        differ:
          "One of you wants more affection and romance than the other. The more affectionate partner may feel unwanted, while the other may feel pressured. Talking openly and kindly about what kinds of closeness feel good to each of you usually helps far more than trying to match a number.",
        prompts: [
          "What makes you feel most wanted or cherished by me?",
          "What kind of everyday affection would you like more of?",
          "How can we keep romance alive when life gets busy?",
          "Is there anything about our physical relationship you've found hard to bring up?",
        ],
      },
      money: {
        match:
          "You lean the same way with money. Two savers will likely feel secure and aligned on big goals, though you may need to remind each other to enjoy life; two spenders will enjoy the present together but may need a shared plan for the future. Either way, matching attitudes make joint decisions much easier.",
        differ:
          "One of you is more of a saver and the other more of a spender. Money differences are a very common source of tension because money decisions carry feelings about security, freedom and fairness. A shared plan with some guilt-free personal spending for each of you can turn the difference into a strength.",
        prompts: [
          "What did money feel like in your home growing up?",
          "What's one financial goal you'd love us to work toward together?",
          "How much could either of us spend without checking with the other first?",
          "What would help you feel more secure about money right now?",
        ],
      },
      lifestyle: {
        match:
          "You want a similar pace of life. Two adventurers will happily fill weekends with travel and new experiences; two homebodies will treasure quiet nights in. Shared preferences make planning easy, though the occasional surprise keeps life from feeling stuck.",
        differ:
          "One of you craves novelty and activity, and the other prefers home and routine. The adventurer may feel held back, while the homebody may feel dragged along or worn out. Trading off, with some weekends out and some in, and letting each person do some things solo, usually keeps both of you happy.",
        prompts: [
          "What does your ideal weekend look like?",
          "Is there a trip or experience you've been dreaming about?",
          "How often do you want social plans, and how often time at home?",
          "Is there something you'd like to do on your own or with friends, without me feeling left out?",
        ],
      },
      conflict: {
        match:
          "You handle conflict in a similar way. If you both talk it out, problems get raised and resolved quickly, though arguments can get heated; if you both prefer space first, things stay calm, but issues can go unaddressed. Knowing your shared tendency helps you guard against its downside.",
        differ:
          "One of you wants to talk conflict through right away, and the other needs space first. That can create a painful loop where one pursues and the other withdraws. Agreeing that the person who needs space will name a time to come back, and that the other will honor the pause, turns the difference into a plan.",
        prompts: [
          "When we argue, what do you need from me most?",
          "How long do you usually need before you're ready to talk after a disagreement?",
          "What's one thing I do in arguments that makes it harder for you?",
          "How do you like to make up once things have calmed down?",
        ],
      },
    },
  },
  seo: {
    intro: `How compatible are you and your partner? This couples compatibility test looks at six areas that shape everyday life together: values and life vision, communication, affection and intimacy, money, lifestyle and how you handle conflict. You each answer 50 short statements on your own, then compare. You'll see a match score for every area, the statements where your answers differed most, and conversation prompts for each topic. Your own result is free and shows what you bring to a relationship. The optional reports go deeper into your relationship profile and what your matches and differences mean.`,
    measures: `The test looks at six areas that shape day-to-day life as a couple. Each one is a scale between two healthy styles, not a good end and a bad end.

- Values and life vision, from open-ended to rooted: how much you want shared goals, traditions, beliefs and long-term plans.
- Communication, from reserved to expressive: how much you want to talk through your day, your feelings and the relationship itself.
- Affection and intimacy, from low-key to affectionate: how central physical closeness and romance are to feeling connected.
- Money, from spender to saver: whether you lean toward enjoying money now or planning for later.
- Lifestyle, from homebody to adventurer: how much you crave travel, novelty and a full social calendar.
- Conflict style, from space first to talk it out: whether you want to address disagreements right away or need time to cool down.

Your own result names the area where you lean most strongly, framed as what you bring to a relationship. Once your partner finishes, you'll see a match score for each area, based on how close your two scores are, plus the statements where you answered most differently. Matching isn't everything: couples with different styles often do well when they understand each other. The point is to see where conversations will be easy and where they'll need more care.`,
    origin: `Questionnaires about compatibility have a long history, from the inventories used in premarital counseling to the quizzes in magazines. The six areas here reflect topics that couples and counselors commonly name as important: shared values, communication, affection, money, how free time is spent and how disagreements are handled.

People who study couples have long debated how much similarity matters, and the answer seems to depend on the area. Many counselors emphasize that how a couple handles differences, with curiosity, respect and a willingness to compromise, matters at least as much as the differences themselves. This test is original to this site and hasn't been validated as a predictor of relationship success. Use it as a map of conversations worth having, not as a verdict on your relationship.`,
    faqs: [
      {
        q: "How does the couples compatibility test work?",
        a: "You each answer the same 50 statements on your own, rating how much you agree with each. Your answers produce a score in six areas: values, communication, affection and intimacy, money, lifestyle and conflict style. Your individual result shows the area you lean toward most. When your partner finishes, the comparison shows how closely your scores match in each area, the statements where you differed most, and conversation prompts for every area.",
      },
      {
        q: "What does a low match score mean?",
        a: "A low match in an area means your scores were far apart: for example, one of you is a saver and the other a spender. It doesn't mean you're incompatible. Many couples with real differences do well because they understand each other and have agreed on how to handle them. Treat a low match as a topic worth discussing, and use the conversation prompts for that area to get started.",
      },
      {
        q: "Should we take it together or separately?",
        a: "Separately. Answer on your own, ideally without discussing your answers first, so the comparison reflects what each of you really thinks. When you finish, you can invite your partner, and the comparison appears once they've completed the test. Then sit down together somewhere relaxed and go through the results one area at a time, starting with your strongest matches.",
      },
      {
        q: "Can this test predict whether our relationship will last?",
        a: "No, and no questionnaire can. This test shows where your attitudes and preferences line up and where they differ, based on how each of you sees yourself today. It can't see how you treat each other, your shared history or the effort you put in. Its job is to start useful conversations about the areas that matter, not to deliver a verdict on your relationship.",
      },
      {
        q: "Can I take it if I'm single?",
        a: "Yes. Your own result shows the area you lean toward most and what you bring to a relationship, along with your full profile across all six areas. It can help you think about what matters to you in a future partner and which differences you'd be comfortable working with. If you start seeing someone later, you can invite them to take the test and compare.",
      },
      {
        q: "Is the intimacy section explicit?",
        a: "No. The affection and intimacy area asks general questions about physical affection, romance and closeness, such as hugs, holding hands and keeping the spark alive. It doesn't ask explicit questions. The test is for adults, and the comparison simply shows whether the two of you place a similar weight on affection and romance, with gentle prompts to help you talk about it.",
      },
    ],
    keywords: ["compatibility test", "love compatibility test"],
  },
  related: ["attachment-style-quiz", "love-language-quiz"],
  reviewNotes:
    "50 original items (values 9, communication 9, intimacy 8, money 8, lifestyle 8, conflict 8), 18 reverse-keyed (36%), plus one attention check after item 36 (expect 4 = 'Agree' on AGREE_5). Intimacy items are deliberately general (affection, romance, 'physical intimacy' once); confirm tone is acceptable for the brand. Individual outcome = highest-scoring dimension, framed as 'what you bring'; because every dimension is bipolar, a taker whose top score is still mid-range gets the high-pole outcome (e.g. 'The Steady Saver' at ~55% saver). Copy says 'your answers lean most strongly toward', and the per-dimension band text gives the nuance, but reviewers may want to check this reads honestly. FAQ 'Should we take it together or separately?' describes the planned partner-invite flow (P-11 is still TODO). Money outcome explicitly avoids financial advice and points to a qualified professional.",
};

export default quiz;
