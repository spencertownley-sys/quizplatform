import type { ChoiceQuestion } from "@/lib/engine/types";

/**
 * 20 original items about behavior the taker has observed. Every option
 * carries an explicit weight (0–3) on the single "interest" dimension, so each
 * item's maximum is 3 and the normalized score is raw / 60.
 * "Doesn't apply" options (we don't text, not connected online) weigh 1:
 * no evidence either way, scored a little under the midpoint.
 * Mean or controlling behavior (stinging jokes) is never scored as interest.
 * Option ids are a–e in display order; the order of strong and weak signals varies.
 */

function item(id: string, text: string, opts: [number, string][]): ChoiceQuestion {
  return {
    id,
    kind: "choice",
    text,
    options: opts.map(([w, label], i) => ({ id: "abcde"[i], label, weights: { interest: w } })),
  };
}

export const questions: ChoiceQuestion[] = [
  item("q1", "When you text him, he usually…", [
    [3, "replies fast and asks you questions back"],
    [1, "replies late, with short answers"],
    [2, "replies within a few hours with real answers"],
    [0, "leaves you on read or doesn't reply"],
    [1, "we don't really text"],
  ]),
  item("q2", "Who usually starts your conversations?", [
    [1, "Mostly me"],
    [3, "He does, a lot of the time"],
    [0, "Always me, and he keeps it short"],
    [2, "It's about half and half"],
  ]),
  item("q3", "When you're both in the same place, he…", [
    [2, "chats if you happen to be near each other"],
    [0, "doesn't seem to notice you're there"],
    [3, "finds a reason to come over and talk"],
    [1, "says hi but stays with his friends"],
  ]),
  item("q4", "When you tell him something about your life, he…", [
    [3, "remembers small details and brings them up later"],
    [2, "remembers the big things"],
    [0, "rarely seems to remember"],
    [1, "sometimes forgets what you told him"],
  ]),
  item("q5", "When you catch his eye, he…", [
    [1, "gives a quick, friendly nod"],
    [3, "smiles and holds your gaze"],
    [0, "looks right past you"],
    [2, "looks away quickly, a little flustered"],
  ]),
  item("q6", "When you're the one talking, he…", [
    [0, "cuts it short or walks off"],
    [2, "listens and responds, but keeps it light"],
    [3, "turns toward you and asks follow-up questions"],
    [1, "seems half there, often checking his phone"],
  ]),
  item("q7", "Compared with how he acts around other people, with you he's…", [
    [1, "pretty much the same as with everyone"],
    [3, "a little different: nervous, extra funny or softer"],
    [2, "a bit more attentive than with most people"],
    [0, "more distant than with others"],
  ]),
  item("q8", "When it comes to making plans, he…", [
    [2, "says yes when you invite him"],
    [1, "says \"we should hang out\" but never sets it up"],
    [3, "suggests hanging out and follows through"],
    [0, "turns down or ignores invitations"],
  ]),
  item("q9", "Does he bring up doing things together in the future?", [
    [3, "Yes, like a show, an event or a place he wants to go with you"],
    [1, "Only when you bring it up"],
    [2, "Sometimes he asks what you're up to this weekend"],
    [0, "Never"],
  ]),
  item("q10", "How does he joke around with you?", [
    [1, "He jokes with you the way he does with everyone"],
    [0, "He makes jokes at your expense that sting"],
    [3, "He teases you playfully, and it always feels kind"],
    [1, "He keeps things polite and fairly serious"],
  ]),
  item("q11", "When you're having a bad day, he…", [
    [2, "is kind once you tell him"],
    [3, "notices without being told and checks in"],
    [0, "brushes it off or makes it about himself"],
    [1, "doesn't really notice"],
  ]),
  item("q12", "When his friends are around you, they…", [
    [3, "tease him or act like they know something"],
    [1, "don't really react to you"],
    [2, "are friendly and include you"],
    [0, "seem to keep you at a distance"],
  ]),
  item("q13", "Online, he…", [
    [2, "reacts to your posts sometimes"],
    [0, "rarely or never interacts, even though he's active"],
    [1, "isn't connected with you, or neither of you posts much"],
    [3, "reacts to or replies to a lot of what you post"],
  ]),
  item("q14", "In a group, he usually…", [
    [0, "seems to keep his distance from you"],
    [3, "ends up sitting or standing near you"],
    [1, "sticks to his own corner"],
    [2, "talks to you as part of the group"],
  ]),
  item("q15", "When you compliment him, he…", [
    [2, "says thanks with a real smile"],
    [3, "lights up, maybe gets flustered, and says something nice back"],
    [1, "brushes it off casually"],
    [0, "seems uninterested or ignores it"],
  ]),
  item("q16", "Does he try to impress you?", [
    [1, "Not that I can tell"],
    [3, "Yes, he shows off a little or talks up things he's good at"],
    [0, "He doesn't seem to care what I think of him"],
    [2, "He sometimes shares things he's proud of"],
  ]),
  item("q17", "Has he asked about your crushes or whether you're seeing anyone?", [
    [0, "He talks to me about someone else he likes"],
    [2, "It came up once, in passing"],
    [3, "Yes, casually, like he's curious whether I'm single"],
    [1, "Never"],
  ]),
  item("q18", "Does he do small favors for you?", [
    [3, "Yes, without being asked, like saving me a seat"],
    [1, "Sometimes, if it's easy for him"],
    [2, "He helps if I ask"],
    [0, "Rarely, even when I ask"],
  ]),
  item("q19", "What have you heard from other people about how he sees you?", [
    [1, "I haven't heard anything"],
    [0, "I've heard he sees me as just a friend"],
    [3, "Friends say he talks about me or likes me"],
    [2, "Someone said he thinks I'm cool"],
  ]),
  item("q20", "When a conversation is ending, he…", [
    [2, "says a friendly goodbye"],
    [0, "seems eager to wrap it up"],
    [3, "drags it out, or says \"talk later\" and actually does"],
    [1, "just stops replying or drifts away"],
  ]),
];
