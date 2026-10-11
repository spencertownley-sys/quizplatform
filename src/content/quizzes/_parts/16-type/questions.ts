import type { Question } from "@/lib/engine/types";

/**
 * 70 items on the 7-point agree/disagree scale.
 * energy (I/E), information (S/N), decisions (T/F), structure (J/P): 15 each.
 * Items for the low pole (I, S, T, J) are reverse-keyed, so agreeing pulls the score toward that letter.
 * composure: 9 items, 3 reverse-keyed (Striving). One attention check after item 40.
 */
const en = (id: string, text: string, reverse = false): Question => ({ id, kind: "likert", dimension: "energy", text, ...(reverse ? { reverse } : {}) });
const inf = (id: string, text: string, reverse = false): Question => ({ id, kind: "likert", dimension: "information", text, ...(reverse ? { reverse } : {}) });
const de = (id: string, text: string, reverse = false): Question => ({ id, kind: "likert", dimension: "decisions", text, ...(reverse ? { reverse } : {}) });
const st = (id: string, text: string, reverse = false): Question => ({ id, kind: "likert", dimension: "structure", text, ...(reverse ? { reverse } : {}) });
const co = (id: string, text: string, reverse = false): Question => ({ id, kind: "likert", dimension: "composure", text, ...(reverse ? { reverse } : {}) });
const R = true;

export const questions: Question[] = [
  // 1–10
  en("en1", "After a long day with people, I want time alone to recharge.", R),
  inf("in1", "I often notice patterns or hidden meanings that other people miss."),
  st("st1", "I like to have my week planned out by Sunday night.", R),
  de("de1", "When a friend shares a problem, I jump straight to solving it.", R),
  en("en2", "I start conversations with strangers in lines or waiting rooms."),
  inf("in2", "When I give directions, I mention landmarks and exact turns.", R),
  co("co1", "When something goes wrong, I bounce back quickly."),
  de("de2", "I can usually tell how someone feels before they say a word."),
  st("st2", "I do my best work right before a deadline."),
  en("en3", "I prefer one deep conversation to a room full of small talk.", R),

  // 11–20
  inf("in3", "My mind jumps from one idea to a related one, then another."),
  de("de3", "I think rules should apply the same way to everyone, even friends.", R),
  st("st3", "I keep a to-do list and enjoy crossing things off.", R),
  co("co2", "I often replay conversations, wondering if I said the wrong thing.", R),
  en("en4", "I feel more awake after spending time in a lively crowd."),
  inf("in4", "I trust methods I've seen work more than new, untested ideas.", R),
  de("de4", "When I make a decision, I think first about how it will affect people."),
  st("st4", "A free day with no plans sounds exciting to me."),
  en("en5", "I would rather send a text than make a phone call.", R),
  inf("in5", "I enjoy imagining how everyday things could be completely different."),

  // 21–30
  de("de5", "I can point out a mistake without worrying much about hurting feelings.", R),
  co("co3", "I feel sure of myself even when others disagree with me."),
  st("st5", "Being late bothers me, even by a few minutes.", R),
  en("en6", "I figure out what I think by talking it through with someone."),
  inf("in6", "I prefer instructions with clear, step-by-step details.", R),
  de("de6", "I soften bad news so it's easier for the other person to hear."),
  st("st6", "I'd rather keep my options open than commit to a plan early."),
  en("en7", "At parties, I usually end up talking with just one or two people.", R),
  inf("in7", "I quickly notice small physical changes, like a friend's new haircut.", R),
  co("co4", "I can make a mistake without being hard on myself for long."),

  // 31–40
  de("de7", "I'm more convinced by facts and numbers than by personal stories.", R),
  st("st7", "I finish my work before I let myself relax.", R),
  en("en8", "When plans fall through, I text around to find something else to do."),
  inf("in8", "I read between the lines more than I read the lines."),
  de("de8", "I put a lot of thought into gifts that feel personal."),
  st("st8", "I often start a new project before finishing the last one."),
  en("en9", "A weekend at home by myself sounds restful, not boring.", R),
  inf("in9", "I like to learn a skill by doing it, not by reading about it.", R),
  co("co5", "I stay calm when I'm under pressure at school or work."),
  de("de9", "I make big decisions by weighing pros and cons on paper.", R),

  // attention check, past the middle
  { id: "check", kind: "attention", text: "To show you're reading, choose \"Agree\" for this one.", expect: 6 },

  // 42–51
  st("st9", "I pack for a trip days before I leave.", R),
  en("en10", "I'm usually one of the first to speak up in a group."),
  inf("in10", "I like talking about big \"what if\" questions."),
  de("de10", "A choice feels wrong to me if it goes against my values, even when it's logical."),
  co("co6", "I push myself hard because I worry I'm not doing enough.", R),
  st("st10", "I change plans on the spot if something better comes up."),
  en("en11", "I let calls go to voicemail when I'm not in the mood to talk.", R),
  inf("in11", "I care more about what's happening now than what could happen someday.", R),
  de("de11", "I'd rather be respected than liked.", R),
  st("st11", "Once I make a decision, I like to stick with it.", R),

  // 52–61
  en("en12", "I enjoy being introduced to a group of people I don't know."),
  inf("in12", "I get bored once I understand how something works."),
  co("co7", "I feel comfortable with who I am."),
  de("de12", "When friends argue, I'm usually the one who helps them make up."),
  st("st12", "My desk or room tends to be a creative mess."),
  en("en13", "I get restless if I spend a whole day by myself."),
  inf("in13", "When someone explains an idea, I want a concrete example.", R),
  de("de13", "In a disagreement, I care more about being correct than keeping the peace.", R),
  st("st13", "I put things back in the same place every time.", R),
  co("co8", "Small setbacks can shake my confidence for days.", R),

  // 62–70
  en("en14", "I like working in a place where people are around and chatting."),
  inf("in14", "When I describe something, I often use comparisons and metaphors."),
  de("de14", "Stories about small acts of kindness really move me."),
  st("st14", "I see schedules as rough guides, not promises."),
  en("en15", "I need some quiet time before I share my opinion in a meeting.", R),
  inf("in15", "I'd rather improve a proven method than invent a new one.", R),
  de("de15", "I'm the person friends call when they need someone to listen."),
  st("st15", "I feel uneasy when a decision is left hanging.", R),
  co("co9", "I trust that things will work out, even when I'm unsure how."),
];
