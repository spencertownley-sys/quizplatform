import { AGREE_7 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { anxious } from "./_parts/attachment-style-quiz/anxious";
import { avoidant } from "./_parts/attachment-style-quiz/avoidant";
import { fearfulAvoidant } from "./_parts/attachment-style-quiz/fearful-avoidant";
import { secure } from "./_parts/attachment-style-quiz/secure";

const quiz: QuizDefinition = {
  slug: "attachment-style-quiz",
  n: 23,
  title: "Attachment Style Quiz",
  tagline: "See how you connect, worry and pull back in close relationships.",
  category: "Relationships",
  structure: "two_axis_quadrant",
  description:
    "Find your attachment style in 36 questions. See where you fall on relationship worry and comfort with closeness, and what it means for how you love.",
  disclaimer:
    "This quiz is for self-reflection, not a clinical assessment or diagnosis. Attachment patterns can shift over time and can differ from one relationship to the next.",
  method: `Each of the 36 statements feeds one of two scores: relationship worry (18 statements) or discomfort with closeness (18 statements). About a third are worded in the opposite direction and flipped before scoring, so agreeing with everything doesn't push you toward any one style. Each score is the share of the possible points you reached, from 0 to 100.

Your style comes from where the two scores fall relative to the midpoint of the scale: below it on both is secure, high worry alone is anxious, high discomfort alone is avoidant, and high on both is fearful-avoidant. The further a score sits from the line, the clearer the pattern. Scores near the line mean you share traits with a neighboring style, so read the result more softly.

This is a self-report snapshot of how you see yourself right now. It can't observe how you act in the moment, it isn't a diagnosis, and it can shift with a new relationship, a hard season or deliberate practice. The statements are original to this site and follow the two-dimension model used in adult attachment research; they haven't been validated against published scales.`,
  minutes: 6,
  paywall: "free_headline",
  minAge: 18,
  scale: AGREE_7,
  status: "draft",
  dimensions: [
    {
      key: "anxiety",
      label: "Relationship worry",
      low: "Settled",
      high: "Worried",
      description: "How much you worry about being loved, being left or not being enough in close relationships.",
      report: {
        low: "You rarely spend energy worrying about where you stand with a partner. A slow reply or a quiet evening usually reads to you as just that, not as a sign of fading interest. This gives you room to enjoy a relationship instead of monitoring it. The one thing to watch is that a partner who worries more than you may need you to say out loud what feels obvious to you.",
        mid: "You worry about your relationships sometimes, mostly when something feels uncertain. In steady stretches you feel settled, but a mixed signal, a tense conversation or a long silence can set your mind racing for a while. Where you land in this range often depends on how reliable your current or most recent partner has been. Noticing which situations tip you into worry will tell you more than the number itself.",
        high: "Worry about the relationship takes up a lot of your attention. You notice small shifts in tone, timing and warmth quickly, and your mind tends to fill gaps with the worst explanation. That sensitivity comes from caring a great deal, and it can make you a deeply attuned partner. The cost is that reassurance tends to wear off fast, so you can end up asking for more of it while feeling worse.",
      },
    },
    {
      key: "avoidance",
      label: "Discomfort with closeness",
      low: "Comfortable close",
      high: "Prefers distance",
      description: "How uneasy you feel depending on a partner, opening up and letting someone all the way in.",
      report: {
        low: "You're comfortable letting a partner in. Leaning on someone, sharing what's really going on and planning a future together feel natural to you rather than risky. Partners usually experience you as open and easy to reach. If your worry score is also low, closeness is simply a source of comfort for you; if it's high, your openness may come with a strong need to be met halfway.",
        mid: "You like closeness, up to a point. You can open up and rely on a partner, but you also guard some space, and you may pull back a little when things move fast or get intense. This middle range often looks different with different people: easy with a partner who respects your pace, harder with one who pushes. Paying attention to the moments when you reach for distance will tell you a lot.",
        high: "Closeness tends to feel like pressure to you. You value your independence, keep your deeper feelings private, and may feel an urge to step back just as a relationship gets serious. This often grows out of a long habit of handling things on your own, and that self-reliance is a genuine strength. The cost is that partners can feel shut out, and you can miss support you'd actually find helpful.",
      },
    },
  ],
  questions: [
    { id: "anx1", kind: "likert", dimension: "anxiety", text: "If a partner takes hours to text back, I start imagining reasons why." },
    { id: "avd1", kind: "likert", dimension: "avoidance", text: "When a partner starts leaning on me emotionally, I feel an urge to step back." },
    { id: "anx13", kind: "likert", dimension: "anxiety", text: "When a partner wants a night to themselves, I don't take it personally.", reverse: true },
    { id: "avd13", kind: "likert", dimension: "avoidance", text: "I like it when a partner knows the small details of my day.", reverse: true },
    { id: "anx2", kind: "likert", dimension: "anxiety", text: "I replay conversations with a partner, looking for signs that something was off." },
    { id: "avd2", kind: "likert", dimension: "avoidance", text: "I'd rather get through a hard week alone than lean on a partner." },
    { id: "anx3", kind: "likert", dimension: "anxiety", text: "When a partner seems a bit distant, I assume it's about me." },
    { id: "avd14", kind: "likert", dimension: "avoidance", text: "Asking a partner for help comes naturally to me.", reverse: true },
    { id: "anx14", kind: "likert", dimension: "anxiety", text: "I trust that a partner's feelings won't change over one bad day.", reverse: true },
    { id: "avd3", kind: "likert", dimension: "avoidance", text: "Talk about moving in or the long-term future makes me tense." },
    { id: "anx4", kind: "likert", dimension: "anxiety", text: "I need to hear that I'm loved fairly often to feel sure of it." },
    { id: "avd4", kind: "likert", dimension: "avoidance", text: "I keep parts of my life separate, even from a serious partner." },
    { id: "anx15", kind: "likert", dimension: "anxiety", text: "I can go a day without hearing from a partner and feel fine.", reverse: true },
    { id: "avd15", kind: "likert", dimension: "avoidance", text: "I enjoy imagining a shared future with someone I love.", reverse: true },
    { id: "anx5", kind: "likert", dimension: "anxiety", text: "I sometimes test a partner's feelings to see how they'll react." },
    { id: "avd5", kind: "likert", dimension: "avoidance", text: "Big displays of emotion from a partner make me want to leave the room." },
    { id: "anx6", kind: "likert", dimension: "anxiety", text: "If a partner cancels plans, I wonder if they're losing interest." },
    { id: "avd16", kind: "likert", dimension: "avoidance", text: "When a relationship gets serious, I feel relaxed rather than trapped.", reverse: true },
    { id: "anx16", kind: "likert", dimension: "anxiety", text: "After a disagreement, I feel confident we'll be okay.", reverse: true },
    { id: "avd6", kind: "likert", dimension: "avoidance", text: "After a very close weekend together, I need extra time on my own." },
    { id: "anx7", kind: "likert", dimension: "anxiety", text: "When things are going well, I still brace for them to go wrong." },
    { id: "avd7", kind: "likert", dimension: "avoidance", text: "The closer I get to someone, the more I notice their flaws." },
    { id: "anx8", kind: "likert", dimension: "anxiety", text: "I hold back my needs so I won't seem like too much." },
    { id: "avd17", kind: "likert", dimension: "avoidance", text: "When I'm upset, I want my partner close by.", reverse: true },
    { id: "anx17", kind: "likert", dimension: "anxiety", text: "I usually feel settled about where I stand with a partner.", reverse: true },
    { id: "avd8", kind: "likert", dimension: "avoidance", text: "Saying \"I need you\" to a partner feels uncomfortable." },
    { id: "anx9", kind: "likert", dimension: "anxiety", text: "A small argument can leave me worried about the whole relationship." },
    { id: "avd9", kind: "likert", dimension: "avoidance", text: "I'm slow to tell a partner what's really bothering me." },
    { id: "anx10", kind: "likert", dimension: "anxiety", text: "When a relationship feels uncertain, it's hard to focus on anything else." },
    { id: "avd10", kind: "likert", dimension: "avoidance", text: "In a relationship, my independence matters more to me than closeness." },
    { id: "anx18", kind: "likert", dimension: "anxiety", text: "If a partner is quiet, I figure they're tired, not upset with me.", reverse: true },
    { id: "avd18", kind: "likert", dimension: "avoidance", text: "Letting a partner see my weak spots feels okay to me.", reverse: true },
    { id: "anx11", kind: "likert", dimension: "anxiety", text: "I notice who reached out first and read meaning into it." },
    { id: "avd11", kind: "likert", dimension: "avoidance", text: "When I'm hurt, I tend to go quiet instead of saying so." },
    { id: "anx12", kind: "likert", dimension: "anxiety", text: "I feel a jolt of worry when a partner is excited about plans without me." },
    { id: "avd12", kind: "likert", dimension: "avoidance", text: "A partner who often wants to talk about \"us\" wears me out." },
  ],
  quadrant: {
    x: "anxiety",
    y: "avoidance",
    cutoff: 0.5,
    map: { low_low: "secure", high_low: "anxious", low_high: "avoidant", high_high: "fearful_avoidant" },
  },
  outcomes: [secure, anxious, avoidant, fearfulAvoidant],
  compare: {
    invite: "See how your attachment styles fit together",
    other: "partner",
    dimensions: {
      anxiety: {
        match:
          "You sit at a similar level of relationship worry, so you probably read silences, delays and reassurance in similar ways. If you're both low, you give each other easy room; if you're both high, you understand each other's fears but can also feed them when you're both stressed. Either way, it helps to agree on how you'll reassure each other on hard days.",
        differ:
          "One of you worries about the relationship much more than the other. The more settled partner may see reassurance requests as unnecessary, while the more worried partner may read calm as indifference. The gap closes fastest when the settled partner offers reassurance before it's asked for and the worried partner names the worry instead of testing.",
        prompts: [
          "What's one small thing I do that instantly makes you feel more secure with me?",
          "When you haven't heard from me for a while, what story does your mind tend to tell?",
          "How would you most like to be reassured: words, a quick check-in text, a hug, or something else?",
          "Is there a moment from a past relationship that still makes you brace for the worst?",
        ],
      },
      avoidance: {
        match:
          "You have a similar comfort level with closeness, so you likely agree on how much togetherness, sharing and space feels right. If you're both comfortable close, intimacy comes easily; if you both prefer distance, the relationship may feel calm but can drift without either of you noticing. Building in deliberate time to connect keeps a shared preference from turning into parallel lives.",
        differ:
          "One of you wants more closeness than the other is comfortable with. This is the classic setup for a chase-and-retreat loop: the closer partner reaches, the more private partner steps back, and both feel misunderstood. Naming space needs in advance, with a clear time to reconnect, usually breaks the loop better than either of you simply giving in.",
        prompts: [
          "When do you most want closeness from me, and when do you most need space?",
          "How could you tell me you need space so that I don't read it as rejection?",
          "What's one thing about yourself you've found hard to share with me?",
          "What would a good balance of together time and alone time look like in a normal week?",
        ],
      },
    },
  },
  seo: {
    intro: `Attachment style describes the way you tend to handle closeness, distance and reassurance in your closest relationships. This free attachment style quiz asks 36 short questions about how you think, feel and act with a partner, then places you on two scales: how much you worry about the relationship, and how comfortable you are with closeness. Together they point to one of four styles: secure, anxious, avoidant or fearful-avoidant. Your headline result is free. The optional Deep Report explains your triggers, the cycle you fall into under stress, how you pair with each other style, and word-for-word ways to start hard conversations.`,
    measures: `The quiz measures two things, each with 18 statements you rate from strongly disagree to strongly agree.

Relationship worry, which researchers call attachment anxiety, is about how much attention goes to whether you're loved and whether it will last. People high on this scale tend to notice small shifts in a partner's mood, feel unsettled by slow replies or changed plans, and look for reassurance. People low on it tend to take a partner's quiet evening at face value.

Discomfort with closeness, or attachment avoidance, is about how easy it is to depend on someone, open up, and let them depend on you. People high on this scale tend to value independence, keep feelings private and feel an urge to step back when things get serious. People low on it find leaning on a partner natural.

Your two scores place you on a map with four corners: secure (low on both), anxious (high worry, lower discomfort), avoidant (lower worry, high discomfort) and fearful-avoidant (high on both). Because the scores are continuous, two people with the same style can sit in very different spots, and your result shows your exact position. Answer for how you generally are in close relationships. If you're single, think about recent partners or how you tend to feel when dating.`,
    origin: `Attachment theory began with the British psychiatrist John Bowlby and the psychologist Mary Ainsworth, who studied how infants bond with their caregivers. In 1987, Cindy Hazan and Phillip Shaver proposed that adult romantic love follows similar patterns. Kim Bartholomew later described four adult styles, and researchers came to measure adult attachment on two continuous dimensions, anxiety and avoidance, which is the approach this quiz follows.

A few honest limits. The statements here are original to this site and haven't been tested against published research scales, so treat your result as a starting point for reflection. Attachment is better described as a set of tendencies than a fixed type, and many people sit near a dividing line. Your style can also differ between relationships and change over time.`,
    faqs: [
      {
        q: "What are the four attachment styles?",
        a: "Secure (comfortable with closeness and not very worried about being left), anxious (wants closeness but worries about where they stand), avoidant (rarely worried about being left but uneasy with a lot of closeness) and fearful-avoidant (worried about being left and uneasy with closeness). They come from crossing two scales, worry and discomfort with closeness, so each style is really a region on a map rather than a box. That's why two people with the same label can feel quite different.",
      },
      {
        q: "Can your attachment style change?",
        a: "Yes. Attachment patterns are fairly stable, but they aren't fixed. Many adults move toward security over time through steady relationships, close friendships, therapy or simply practicing new habits, which researchers sometimes call earned security. Patterns can also shift for a while with stress, loss or a particular partner. Retaking the quiz after a few months, or after a big change, can show you how your scores move.",
      },
      {
        q: "What if I'm not in a relationship right now?",
        a: "You can still take the quiz. Answer for how you generally feel and act with romantic partners, thinking about recent relationships or how you tend to be while dating. If you haven't had a serious relationship, think about how you are with the people you're closest to. Your result reflects general tendencies, so it's still useful for understanding what you bring to a future relationship.",
      },
      {
        q: "Is fearful-avoidant the same as disorganized attachment?",
        a: "They're closely related, and popular writing often uses the terms interchangeably. \"Disorganized\" comes from research on infants whose responses to a caregiver seemed contradictory. \"Fearful-avoidant\" comes from research on adults and describes people high on both relationship worry and discomfort with closeness. This quiz uses the adult term. Either way, it describes a pattern of wanting closeness and fearing it at the same time, not a diagnosis.",
      },
      {
        q: "How accurate is an online attachment style test?",
        a: "A self-report quiz can give a useful picture of how you see yourself in relationships, but it has limits. Your answers depend on your mood, your recent relationships and how well you know your own patterns. The statements in this quiz are original and haven't been validated against published research scales. Use your result as a starting point for reflection and conversation, not as a fixed label or a diagnosis.",
      },
      {
        q: "Can two people with insecure styles have a good relationship?",
        a: "Yes. Style shapes the emotional weather of a relationship, but it doesn't decide the outcome. Couples with anxious, avoidant or mixed styles build strong relationships all the time, usually by understanding their patterns, communicating clearly and showing up reliably. What matters most is whether both people are willing to notice their loops and change their part. Comparing results with a partner is a good way to start that conversation.",
      },
    ],
    keywords: ["attachment style quiz", "attachment style test"],
  },
  related: ["love-language-quiz", "couples-compatibility-test", "big-five-personality-test"],
  reviewNotes:
    "All 36 items are newly written for this site and deliberately avoid ECR-R / ECR wording; please spot-check for unintended similarity to published attachment scales. 6 of 18 items per dimension are reverse-keyed. The 0.5 cutoff is the scale midpoint, not a norm; revisit once taker data exists (borderline takers are common). Origin section names Bowlby, Ainsworth, Hazan & Shaver (1987) and Bartholomew: confirm the phrasing is accurate. Deep Reports mention helplines and crisis lines generically; decide whether to link a locale-specific resource page. Outcome names carry the 'Attachment' suffix to match outcome SEO pages (e.g. 'Anxious Attachment').",
};

export default quiz;
