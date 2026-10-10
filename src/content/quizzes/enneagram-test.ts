import { AGREE_5 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { dimensions } from "./_parts/enneagram/dimensions";
import { instinctBlocks } from "./_parts/enneagram/instincts";
import { questions } from "./_parts/enneagram/questions";
import { t1 } from "./_parts/enneagram/t1";
import { t2 } from "./_parts/enneagram/t2";
import { t3 } from "./_parts/enneagram/t3";
import { t4 } from "./_parts/enneagram/t4";
import { t5 } from "./_parts/enneagram/t5";
import { t6 } from "./_parts/enneagram/t6";
import { t7 } from "./_parts/enneagram/t7";
import { t8 } from "./_parts/enneagram/t8";
import { t9 } from "./_parts/enneagram/t9";
import { md } from "./_parts/enneagram/text";
import { wingBlocks } from "./_parts/enneagram/wings";

const quiz: QuizDefinition = {
  slug: "enneagram-test",
  n: 2,
  title: "Enneagram Test",
  tagline: "Find your core type, wing and instinct in about 15 minutes.",
  category: "Personality",
  structure: "typology",
  description:
    "Take a free Enneagram test with 90 original questions. Find your core type, your wing and your strongest instinct, with honest, practical insight.",
  disclaimer:
    "This Enneagram test is for self-reflection, not a scientific or clinical assessment. Use your result as a starting point for curiosity, not a fixed label.",
  method: md(
    "Each of the 90 statements is linked to one of the nine Enneagram types (nine statements per type) or to one of the three instincts (three statements each). About a third are worded in reverse, describing the opposite of a type's usual pattern, so simply agreeing with everything doesn't push you toward any result. Each score is the share of the possible points for that type or instinct, from 0 to 100 percent.",
    "Your core type is the type with the highest score. Your wing is whichever of its two neighbors on the Enneagram circle scored higher; Type 1's neighbors, for example, are 9 and 2. Your instinct is the highest of the three instinct scores. One question only checks that you're reading carefully and isn't scored.",
    "This is a self-report snapshot of how you see yourself today. The Enneagram is about motivation, which is hard to observe in ourselves, so close scores are worth exploring rather than ignoring. Read the descriptions of your top two or three types and trust your own judgment about which fits best. Results can shift with mood, stress and self-awareness.",
  ),
  minutes: 15,
  paywall: "free_headline",
  minAge: 13,
  scale: AGREE_5,
  status: "draft",
  dimensions,
  outcomeDimensions: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"],
  typology: { mode: "highest" },
  extras: [
    { key: "wing", label: "Wing", kind: "wing" },
    { key: "instinct", label: "Instinct", kind: "top_of", dimensions: ["sp", "so", "sx"] },
  ],
  extraBlocks: {
    wing: wingBlocks,
    instinct: instinctBlocks,
  },
  questions,
  outcomes: [t1, t2, t3, t4, t5, t6, t7, t8, t9],
  seo: {
    intro:
      "This free Enneagram test helps you discover which of the nine Enneagram types best matches what drives you. In about 15 minutes you'll rate 90 original statements about your habits, motivations and reactions. You'll get your core type, your wing (the neighboring type that colors your style) and your strongest instinct: self-preservation, social or one-to-one. You'll also see how strongly each of the nine patterns shows up in your answers. Think of the result as a mirror for self-reflection rather than a verdict. It can give you words for patterns you've sensed for years, plus practical ideas for growth.",
    measures: md(
      "The Enneagram describes nine personality types, each organized around a core motivation: what a person most wants and most wants to avoid. Type 1 is driven to be good and to do things right; Type 2 to be loved and needed; Type 3 to feel valuable and successful; Type 4 to be authentic and significant; Type 5 to understand and be capable; Type 6 to feel safe and supported; Type 7 to be free and satisfied; Type 8 to stay strong and in charge of their own life; and Type 9 to keep the peace, inside and out. Because the system focuses on why people act, two people can behave the same way for very different reasons.",
      "This test scores all nine types, so you see your full profile rather than a single label. Your highest score is your core type. Your wing is the stronger of your type's two neighbors on the Enneagram circle; a Type 4, for example, might lean toward Type 3 or Type 5. The test also measures the three instincts many Enneagram teachers describe: self-preservation (comfort, health and resources), social (groups and belonging) and one-to-one (intense, close connection).",
      "Your free result names your type. The Snapshot shows every score, and the Deep Report explores your core desire and fear, how you tend to change under stress and in growth, your relationships, work and blind spots, and concrete growth practices, along with your wing and instinct.",
    ),
    origin: md(
      "The nine-pointed Enneagram symbol was introduced to Western audiences in the early 20th century by the teacher G. I. Gurdjieff, though not as a personality system. The nine personality types as most people know them today come mainly from the work of Oscar Ichazo in the 1950s and 1960s and the psychiatrist Claudio Naranjo in the 1970s, and they spread widely through books and workshops from the 1980s on. Claims that the types are ancient, or that they come from one particular spiritual tradition, are often repeated but poorly documented.",
      "Scientific research on the Enneagram is still limited, and its findings are mixed. It is not a clinical tool and shouldn't be used for hiring, medical or relationship decisions. Many people find it a rich language for self-reflection and growth, and this test is offered in that spirit, with original questions written for this site.",
    ),
    faqs: [
      {
        q: "How accurate is this Enneagram test?",
        a: "No Enneagram test can tell you your type with certainty, because the system is about inner motivation and self-reports have limits. This test uses 90 original statements, balanced wording and nine items per type, which gives a fair picture of how you see yourself right now. If two or three types score close together, read all of them. Many people recognize their type most clearly in the core fears and desires rather than in the everyday behaviors.",
      },
      {
        q: "What is an Enneagram wing?",
        a: "Your wing is one of the two types next to your core type on the Enneagram circle, whichever scored higher for you. It doesn't change your core type, but it adds a distinct flavor. A Type 9 with an 8 wing, for example, tends to be more grounded and assertive, while a 9 with a 1 wing tends to be more idealistic and orderly. Some people relate to both wings fairly equally.",
      },
      {
        q: "What are the three instincts?",
        a: "Many Enneagram teachers describe three instincts everyone uses: self-preservation (health, comfort and resources), social (groups, belonging and contribution) and one-to-one (intense, close connection and chemistry). Most people lean on one more than the others, and that focus shapes how their type shows up. This test reports the instinct that scored highest for you, based on a short set of nine statements, so treat it as a first look rather than a final answer.",
      },
      {
        q: "Can my Enneagram type change?",
        a: "Most Enneagram teachers say your core type stays the same throughout life, while the way you express it changes a lot with growth, stress and circumstances. In practice, test results can shift, especially if you're going through a hard time or answer as the person you wish you were. If your result changes on a retake, compare the types and notice which core motivation feels most true over the long run.",
      },
      {
        q: "Is the Enneagram scientifically proven?",
        a: "No. The Enneagram has much less research behind it than trait models like the Big Five, and the studies that exist are limited and mixed. That doesn't mean it can't be useful. Many people find it a helpful vocabulary for reflecting on their motives, relationships and growth. Treat it as a lens rather than a measurement, and don't use it to make important decisions about yourself or others.",
      },
      {
        q: "What if my top two scores are very close?",
        a: "Close scores are common, especially between types that can look alike from the outside, such as 1 and 6, 4 and 5, or 3 and 7. Read the core desire and fear for each of your top types and ask which one best explains what you do, especially when you're stressed. A friend who knows you well can offer a useful outside view. In the end, the most useful type is the one that helps you grow.",
      },
    ],
    keywords: ["enneagram test"],
  },
  related: ["16-type-personality-test", "big-five-personality-test", "attachment-style-quiz"],
  reviewNotes: [
    "Outcome names are original (Improver, Supporter, Go-Getter, Original, Thinker, Safekeeper, Free Spirit, Powerhouse, Harmonizer) to avoid the Riso-Hudson/Enneagram Institute names (Reformer, Helper, Achiever, Individualist, Investigator, Loyalist, Enthusiast, Challenger, Peacemaker) and Palmer's names; confirm none conflicts with a protected mark. Wing blocks deliberately avoid the well-known per-wing nicknames.",
    "Stress/growth lines follow the standard Enneagram arrows (1→4/7, 2→8/4, 3→9/6, 4→2/1, 5→7/8, 6→3/9, 7→1/5, 8→5/2, 9→6/3), described as tendencies, not rules.",
    "Passions (anger, pride, vanity/self-deception, envy, avarice, fear, gluttony, lust, sloth) are mentioned in plain-language terms; check the tone of the Type 8 'lust' explanation for a 13+ audience.",
    "seo.origin names Gurdjieff, Ichazo and Naranjo (all deceased) and says research is limited and mixed; no studies or numbers are cited. Please confirm the history wording.",
    "Instinct is decided by only 3 items per instinct (9 total), so it is the least reliable result; FAQ and instinct copy say so. Type 4/6 Deep Reports include a gentle 'talk to a counselor or doctor if…' note.",
    "Items are original. Reverse-keyed: 30/90 (items _7–_9 per type, _3 per instinct). Attention check is item 46.",
    "Ties: the engine picks the lower-numbered type, and a wing tie goes to the counter-clockwise neighbor (e.g. t1 → t9). Not mentioned in copy.",
    "Uses a few curly quotes (“ ”) inside copy; check they render well in the PDF font.",
  ].join("\n"),
};

export default quiz;
