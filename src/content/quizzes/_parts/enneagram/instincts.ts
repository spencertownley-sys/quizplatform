import { list, md } from "./text";

/** extraBlocks.instinct, keyed by the top of sp / so / sx. */
export const instinctBlocks: Record<string, { title: string; body: string }> = {
  sp: {
    title: "Your instinct: Self-preservation",
    body: md(
      "Many Enneagram teachers describe three basic instincts that everyone has: self-preservation, social and one-to-one. Most people lean on one more than the others. Your answers suggest that self-preservation, the instinct for safety, comfort and resources, is the one you lean on most.",
      "People with this focus tend to keep a quiet eye on the basics. You probably notice when money, food, sleep or energy are running low, and you feel steadier when your home, health and finances are in order. You may be the one with a well-stocked pantry, a sensible budget or a bag that holds exactly what everyone forgets.",
      "This instinct shapes how your core type shows up. Your type's main concern tends to get channeled into practical security. A Type 2 with this focus might care for others through food and comfort; a Type 7 might focus on creating a pleasant, well-resourced life; a Type 4 might feel their longing through their body and surroundings.",
      "Strengths and watch-outs to keep in mind:",
      list(
        "Strengths: preparedness, self-reliance, steadiness and a gift for making life comfortable.",
        "Watch-outs: playing it too safe, worrying about scarcity and putting comfort ahead of connection or adventure.",
      ),
      "Growth tip: every so often, choose connection or a healthy risk over comfort. Invite someone over before the house is perfect, say yes to a trip that stretches you or spend a little on an experience rather than a safety net.",
    ),
  },
  so: {
    title: "Your instinct: Social",
    body: md(
      "Many Enneagram teachers describe three basic instincts that everyone has: self-preservation, social and one-to-one. Most people lean on one more than the others. Your answers suggest that the social instinct, the instinct for belonging, groups and your place in a community, is the one you lean on most.",
      "People with this focus tend to read the room. You probably notice who's in and who's out, what a group needs and where you fit. You may feel energized by teams, causes, clubs or communities, and care about contributing something meaningful to them. Recognition and respect from your groups can matter a lot.",
      "This instinct shapes how your core type shows up. Your type's main concern tends to get channeled into the group. A Type 1 with this focus might work to improve how organizations run; a Type 6 might be a deeply loyal member of a team or cause; a Type 8 might become a protective leader of their community.",
      "Strengths and watch-outs to keep in mind:",
      list(
        "Strengths: team spirit, awareness of others, leadership and a strong sense of responsibility to the wider world.",
        "Watch-outs: worrying about status or reputation, over-committing to groups and neglecting your own needs or closest relationships.",
      ),
      "Growth tip: protect time for your body and for your closest one-on-one bonds. Your community will benefit from a version of you that is rested and personally connected, not just well positioned.",
    ),
  },
  sx: {
    title: "Your instinct: One-to-one",
    body: md(
      "Many Enneagram teachers describe three basic instincts that everyone has: self-preservation, social and one-to-one, sometimes called the intimacy instinct. Most people lean on one more than the others. Your answers suggest that the one-to-one instinct, the instinct for intense connection and chemistry, is the one you lean on most.",
      "People with this focus tend to seek depth and intensity. You may be drawn to absorbing friendships, powerful creative passions or a close partner who truly gets you. When you connect with someone or something, it can feel electric, and ordinary, low-energy interactions may leave you a little flat.",
      "This instinct shapes how your core type shows up. Your type's main concern tends to get channeled into close bonds. A Type 5 with this focus might share their inner world intensely with one trusted person; a Type 9 might merge deeply with a partner; a Type 3 might put a lot of energy into being attractive and compelling to someone special.",
      "Strengths and watch-outs to keep in mind:",
      list(
        "Strengths: passion, depth, magnetism and the ability to bring energy to relationships and projects.",
        "Watch-outs: chasing intensity, neglecting practical needs and losing touch with wider friendships or community.",
      ),
      "Growth tip: build steady routines for sleep, money and health so your intense focus has a stable base. Invest in a few friendships that are calm and ongoing, not only ones that spark.",
    ),
  },
};
