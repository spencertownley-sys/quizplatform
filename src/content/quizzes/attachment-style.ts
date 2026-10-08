import type { QuizDefinition } from "@/lib/engine/types";

/**
 * Attachment Style Quiz (T3, two-axis quadrant: anxiety × avoidance).
 * DRAFT: 12 original items for development. The launch version targets 36
 * items (18 per axis) and a cutoff set from our own taker data.
 */
export const attachmentStyle: QuizDefinition = {
  slug: "attachment-style",
  title: "Attachment Style Quiz",
  category: "Relationships",
  structure: "two_axis_quadrant",
  description:
    "Find out how you connect in close relationships. This quiz places you on two scales, worry about closeness and comfort with closeness, to show which of four attachment styles fits you best.",
  disclaimer:
    "This quiz is for self-reflection, not a clinical assessment. Attachment patterns can change over time and differ between relationships.",
  minutes: 4,
  paywall: "free_headline",
  minAge: 18,
  likertPoints: 7,
  status: "draft",
  dimensions: [
    { key: "anxiety", label: "Relationship worry", low: "Settled", high: "Worried" },
    { key: "avoidance", label: "Distance from closeness", low: "Comfortable close", high: "Prefers distance" },
  ],
  questions: [
    { id: "a1", kind: "likert", dimension: "anxiety", text: "I worry that partners won't care about me as much as I care about them." },
    { id: "a2", kind: "likert", dimension: "anxiety", text: "When my partner is quiet, I wonder if I did something wrong." },
    { id: "a3", kind: "likert", dimension: "anxiety", text: "I need a lot of reassurance that I'm loved." },
    { id: "a4", kind: "likert", dimension: "anxiety", text: "I rarely worry about a partner leaving me.", reverse: true },
    { id: "a5", kind: "likert", dimension: "anxiety", text: "A slow reply to a text can ruin my mood." },
    { id: "a6", kind: "likert", dimension: "anxiety", text: "I feel secure in my relationships even when we spend time apart.", reverse: true },
    { id: "v1", kind: "likert", dimension: "avoidance", text: "I get uncomfortable when a partner wants to be very close." },
    { id: "v2", kind: "likert", dimension: "avoidance", text: "I find it easy to depend on the people I'm close to.", reverse: true },
    { id: "v3", kind: "likert", dimension: "avoidance", text: "I prefer to keep my deepest feelings to myself." },
    { id: "v4", kind: "likert", dimension: "avoidance", text: "When things get serious, I feel an urge to pull back." },
    { id: "v5", kind: "likert", dimension: "avoidance", text: "I'm comfortable sharing my private thoughts with a partner.", reverse: true },
    { id: "v6", kind: "likert", dimension: "avoidance", text: "I'd rather handle problems alone than ask a partner for help." },
  ],
  quadrant: {
    x: "anxiety",
    y: "avoidance",
    cutoff: 0.5, // placeholder until we have norm data
    map: { low_low: "secure", high_low: "anxious", low_high: "avoidant", high_high: "fearful_avoidant" },
  },
  outcomes: [
    {
      key: "secure",
      name: "Secure",
      summary:
        "You're comfortable with closeness and don't spend much energy worrying about whether you're loved. You can ask for what you need and give partners room without feeling threatened.",
      snapshot: [
        "Low relationship worry and low avoidance",
        "You tend to handle conflict directly and recover quickly",
        "You're a steadying presence for anxious or avoidant partners",
      ],
      deep: [
        { title: "How security shows up for you", teaser: "Your answers suggest you trust partners by default, which shapes…", body: "TODO: writer content." },
        { title: "Where even secure people slip", teaser: "Under heavy stress, your pattern can shift toward…", body: "TODO: writer content." },
        { title: "Your best and hardest pairings", teaser: "With an anxious partner, your steadiness helps most when…", body: "TODO: writer content." },
      ],
    },
    {
      key: "anxious",
      name: "Anxious",
      summary:
        "You care deeply and invest fully in relationships, but you often worry about where you stand. Silence or distance can feel like a warning sign, so you look for reassurance.",
      snapshot: [
        "High relationship worry, low avoidance",
        "Common triggers: slow replies, plans changing, a partner seeming distracted",
        "Strength: you notice emotional shifts quickly and value connection",
      ],
      deep: [
        { title: "What sets off your worry", teaser: "Your highest-scoring items point to uncertainty as the main trigger, especially…", body: "TODO: writer content." },
        { title: "The protest cycle and how to break it", teaser: "When you feel a partner pulling away, the first move you tend to make is…", body: "TODO: writer content." },
        { title: "Steps toward feeling secure", teaser: "Three habits that lower relationship worry within weeks, starting with…", body: "TODO: writer content." },
      ],
    },
    {
      key: "avoidant",
      name: "Avoidant",
      summary:
        "You value independence and feel most comfortable with some distance. You rarely worry about being left, but deep closeness can feel like pressure, so you may pull back when things get serious.",
      snapshot: [
        "Low relationship worry, high avoidance",
        "Common triggers: a partner asking for more time, talk of the future",
        "Strength: self-reliance and calm under pressure",
      ],
      deep: [
        { title: "Why closeness can feel like pressure", teaser: "Your answers show the strongest pull-back around…", body: "TODO: writer content." },
        { title: "How partners experience your distance", teaser: "What feels like breathing room to you can read to a partner as…", body: "TODO: writer content." },
        { title: "Getting closer without losing yourself", teaser: "Small, low-pressure ways to build closeness, beginning with…", body: "TODO: writer content." },
      ],
    },
    {
      key: "fearful_avoidant",
      name: "Fearful-Avoidant",
      summary:
        "You want closeness and worry about losing it, yet closeness can also feel unsafe. That push and pull can make relationships feel intense and unpredictable.",
      snapshot: [
        "High relationship worry and high avoidance",
        "You may swing between seeking reassurance and needing space",
        "Strength: deep self-awareness once you can name the pattern",
      ],
      deep: [
        { title: "The push-pull pattern", teaser: "Your answers show both a strong need for reassurance and an urge to retreat when…", body: "TODO: writer content." },
        { title: "What helps you feel safe", teaser: "Predictability matters more for you than for any other style, especially…", body: "TODO: writer content." },
        { title: "When to get extra support", teaser: "Many people with this pattern find it easier to change with help, such as…", body: "TODO: writer content." },
      ],
    },
  ],
};
