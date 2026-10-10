import type { ChoiceQuestion } from "@/lib/engine/types";

/**
 * 30 original forced-choice items, 4 options each. Every option adds 1 point
 * to exactly one color. Option ids are a–d in display order (so ids never
 * reveal the color), and the color order is varied from item to item.
 */

type Color = "crimson" | "sunflower" | "ocean" | "slate";

function item(id: string, text: string, opts: [Color, string][]): ChoiceQuestion {
  return {
    id,
    kind: "choice",
    text,
    options: opts.map(([color, label], i) => ({ id: "abcd"[i], label, weights: { [color]: 1 } })),
  };
}

export const questions: ChoiceQuestion[] = [
  item("q1", "In a group project, you're usually the one who…", [
    ["crimson", "sets the deadline and keeps everyone moving"],
    ["ocean", "makes sure everyone feels included"],
    ["slate", "checks the details before it's handed in"],
    ["sunflower", "pitches the big idea"],
  ]),
  item("q2", "Your ideal free Saturday:", [
    ["sunflower", "a last-minute adventure with friends"],
    ["slate", "a quiet project you can get lost in"],
    ["crimson", "crossing a big goal off your list"],
    ["ocean", "a slow day with people you love"],
  ]),
  item("q3", "Friends usually come to you for…", [
    ["slate", "a careful second opinion"],
    ["sunflower", "a laugh and a lift"],
    ["ocean", "a listening ear"],
    ["crimson", "a push to get it done"],
  ]),
  item("q4", "When plans suddenly fall apart, you…", [
    ["ocean", "check that everyone's okay"],
    ["slate", "figure out what went wrong"],
    ["crimson", "make a new plan fast"],
    ["sunflower", "turn it into an adventure"],
  ]),
  item("q5", "The compliment that means the most to you:", [
    ["sunflower", "\"You light up the room.\""],
    ["crimson", "\"You get things done.\""],
    ["slate", "\"You really know your stuff.\""],
    ["ocean", "\"You make people feel safe.\""],
  ]),
  item("q6", "Your biggest pet peeve:", [
    ["slate", "sloppy work"],
    ["ocean", "people being unkind"],
    ["sunflower", "being bored"],
    ["crimson", "wasting time"],
  ]),
  item("q7", "In a disagreement, you tend to…", [
    ["crimson", "say exactly what you think"],
    ["sunflower", "lighten the mood with a joke"],
    ["slate", "lay out the facts"],
    ["ocean", "look for a middle ground"],
  ]),
  item("q8", "Your room or desk is usually…", [
    ["sunflower", "colorful and a little chaotic"],
    ["ocean", "cozy, with photos and keepsakes"],
    ["crimson", "set up for getting things done fast"],
    ["slate", "organized, with a place for everything"],
  ]),
  item("q9", "When you learn something new, you like to…", [
    ["ocean", "have a patient teacher who encourages you"],
    ["sunflower", "talk it through with other people"],
    ["slate", "read up and understand how it works first"],
    ["crimson", "jump in and figure it out by doing"],
  ]),
  item("q10", "On a team, what bugs you most?", [
    ["slate", "vague instructions"],
    ["crimson", "slow decisions"],
    ["ocean", "tension between people"],
    ["sunflower", "too many rules"],
  ]),
  item("q11", "At a party, you're probably…", [
    ["sunflower", "meeting everyone and telling stories"],
    ["slate", "finding the one person who shares your niche interest"],
    ["crimson", "starting a game, and playing to win"],
    ["ocean", "having a deep talk with one or two friends"],
  ]),
  item("q12", "When a decision needs making, you…", [
    ["crimson", "decide quickly and move on"],
    ["ocean", "think about how it affects everyone"],
    ["sunflower", "go with what feels most exciting"],
    ["slate", "weigh the pros and cons carefully"],
  ]),
  item("q13", "Which word fits you best?", [
    ["ocean", "Caring"],
    ["crimson", "Bold"],
    ["slate", "Precise"],
    ["sunflower", "Playful"],
  ]),
  item("q14", "What drains you fastest?", [
    ["slate", "chaos and guesswork"],
    ["sunflower", "doing the same thing every day"],
    ["ocean", "conflict with people you care about"],
    ["crimson", "feeling powerless"],
  ]),
  item("q15", "How do you usually show you care?", [
    ["sunflower", "plan something fun"],
    ["crimson", "solve their problem"],
    ["ocean", "spend time and really listen"],
    ["slate", "remember the small details that matter to them"],
  ]),
  item("q16", "Under deadline pressure, you…", [
    ["ocean", "quietly pick up the slack"],
    ["slate", "make a careful checklist"],
    ["sunflower", "rally people with energy"],
    ["crimson", "take charge and push everyone"],
  ]),
  item("q17", "Your favorite kind of movie:", [
    ["crimson", "a high-stakes action or sports story"],
    ["slate", "a clever mystery or a documentary"],
    ["ocean", "a heartfelt story about friends or family"],
    ["sunflower", "a comedy or a musical"],
  ]),
  item("q18", "When you join a new group, you…", [
    ["slate", "watch first and talk later"],
    ["crimson", "figure out who's in charge"],
    ["sunflower", "introduce yourself to everyone"],
    ["ocean", "look for someone who seems left out"],
  ]),
  item("q19", "In most conversations, your goal is to…", [
    ["ocean", "connect"],
    ["sunflower", "have fun"],
    ["crimson", "get to the point"],
    ["slate", "understand"],
  ]),
  item("q20", "When someone breaks a rule, you…", [
    ["sunflower", "shrug, since rules can bend"],
    ["crimson", "call it out right away"],
    ["slate", "figure the rule probably exists for a reason"],
    ["ocean", "wonder if they're okay"],
  ]),
  item("q21", "If you could have one superpower, you'd pick…", [
    ["slate", "knowing the answer to any question"],
    ["ocean", "healing people"],
    ["crimson", "unstoppable strength"],
    ["sunflower", "teleporting anywhere"],
  ]),
  item("q22", "The feedback you hear most often:", [
    ["crimson", "\"Slow down. You can be too blunt.\""],
    ["ocean", "\"Speak up. You put others first too much.\""],
    ["sunflower", "\"Focus. You start too many things.\""],
    ["slate", "\"Relax. It doesn't have to be perfect.\""],
  ]),
  item("q23", "When you take on a big goal, you…", [
    ["ocean", "do it alongside people you care about"],
    ["crimson", "set a target and go hard"],
    ["slate", "plan every step before starting"],
    ["sunflower", "dive in while the excitement is fresh"],
  ]),
  item("q24", "On a road trip, you're the…", [
    ["sunflower", "DJ"],
    ["slate", "navigator"],
    ["ocean", "snack and comfort person"],
    ["crimson", "driver"],
  ]),
  item("q25", "In an emergency, you're the one who…", [
    ["slate", "gets the facts straight"],
    ["crimson", "gives directions"],
    ["sunflower", "keeps spirits up"],
    ["ocean", "comforts people"],
  ]),
  item("q26", "What would you most like people to say about you?", [
    ["ocean", "\"They were always there for me.\""],
    ["slate", "\"They always got it right.\""],
    ["sunflower", "\"They made life more fun.\""],
    ["crimson", "\"They made things happen.\""],
  ]),
  item("q27", "Your texting style:", [
    ["sunflower", "lots of emojis and exclamation points"],
    ["ocean", "warm check-ins asking how people are"],
    ["slate", "full sentences, proper punctuation"],
    ["crimson", "short and to the point"],
  ]),
  item("q28", "When you're really stressed, you get…", [
    ["crimson", "bossy and impatient"],
    ["slate", "critical and closed off"],
    ["ocean", "quiet, and you say yes to everything"],
    ["sunflower", "scattered and restless"],
  ]),
  item("q29", "The best part of a group trip is…", [
    ["slate", "a well-planned schedule that actually works"],
    ["sunflower", "the unplanned adventures"],
    ["crimson", "tackling a big hike or challenge"],
    ["ocean", "the late-night talks"],
  ]),
  item("q30", "You feel proudest when you…", [
    ["ocean", "help someone through a hard time"],
    ["crimson", "win or hit a big goal"],
    ["sunflower", "make people laugh or inspire them"],
    ["slate", "solve a tricky problem"],
  ]),
];
