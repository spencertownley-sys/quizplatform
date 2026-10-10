import type { ChoiceQuestion } from "@/lib/engine/types";

/**
 * 40 original forced-choice pairs, 10 per dimension, interleaved G/E/A/L.
 * The self-focused statement adds 1 to its dimension. The other statement
 * carries an explicit 0 on the same dimension: lint needs a weight key on
 * every option, and a 0 adds nothing to the score or to the maximum.
 * The self-focused statement sits in position a on 20 items and b on 20.
 */

type Dim = "grandiosity" | "entitlement" | "admiration" | "low_empathy";

/** `self` is the self-focused statement; `selfFirst` puts it in position a. */
function pair(id: string, dim: Dim, text: string, self: string, other: string, selfFirst: boolean): ChoiceQuestion {
  const s = { label: self, weights: { [dim]: 1 } };
  const o = { label: other, weights: { [dim]: 0 } };
  const [a, b] = selfFirst ? [s, o] : [o, s];
  return { id, kind: "choice", text, options: [{ id: "a", ...a }, { id: "b", ...b }] };
}

export const questions: ChoiceQuestion[] = [
  pair("q1", "grandiosity", "Thinking about your abilities:", "I can do most things better than the people around me.", "I'm good at some things, and other people are better at plenty.", false),
  pair("q2", "entitlement", "When you're kept waiting in a line or at a restaurant:", "My time matters more than this, and I let them know.", "I wait like everyone else, even if I'm annoyed.", false),
  pair("q3", "admiration", "At a party or in a big group:", "I'm happiest when the whole group is listening to me.", "I'm happiest as one voice among many.", true),
  pair("q4", "low_empathy", "When a friend talks about a problem for a long time:", "I get bored and steer the talk back to me.", "I listen, even when it drags on.", true),

  pair("q5", "grandiosity", "When you picture your future:", "I'm pretty sure I'm meant for something big.", "I'd be happy with a good, ordinary life.", true),
  pair("q6", "entitlement", "About rules:", "Some rules are for other people, not for me.", "Rules can be annoying, but they apply to me too.", false),
  pair("q7", "admiration", "When someone pays you a compliment:", "I replay it later and hope for more.", "I enjoy it, then forget about it.", false),
  pair("q8", "low_empathy", "If you hurt someone's feelings by accident:", "They're probably being too sensitive.", "I feel bad and want to make it right.", false),

  pair("q9", "grandiosity", "When a group needs a leader:", "I usually end up in charge, and that feels right.", "I'd rather the best person for the job leads, even if it's not me.", true),
  pair("q10", "entitlement", "When it comes to what you deserve:", "I deserve more than I usually get.", "I usually get about what I've earned.", true),
  pair("q11", "admiration", "After you post something online:", "I check often to see who has reacted.", "I post it and mostly move on.", true),
  pair("q12", "low_empathy", "When someone near you is upset about something unrelated to you:", "It's not really my problem.", "I want to know if they're okay.", false),

  pair("q13", "grandiosity", "When someone disagrees with you:", "I've usually thought it through better than they have.", "I'm open to the idea that they might be right.", false),
  pair("q14", "entitlement", "If a friend can't do a favor you asked for:", "I feel let down. A real friend would make it work.", "I get it. They have their own life.", true),
  pair("q15", "admiration", "When you walk into a room:", "I like people to notice that I've arrived.", "I'd rather slip in quietly.", false),
  pair("q16", "low_empathy", "When you make a decision:", "Other people's feelings shouldn't slow me down.", "I think about how it will land for the people involved.", true),

  pair("q17", "grandiosity", "Compared with the people around you:", "I've always felt a step above most people.", "I'm different in some ways, the way everyone is.", true),
  pair("q18", "entitlement", "In group projects or shared chores:", "Others can do the dull parts so I can do the important ones.", "I do my share, including the dull parts.", false),
  pair("q19", "admiration", "When there's a chance to show what you can do:", "I make sure people are watching.", "I'd rather just do it and let it speak for itself.", true),
  pair("q20", "low_empathy", "When a classmate or coworker is struggling:", "I figure they should sort it out themselves.", "I offer to help if I can.", false),

  pair("q21", "grandiosity", "About your talents:", "There's not much I couldn't be great at if I tried.", "I have real strengths and plenty of weak spots.", false),
  pair("q22", "entitlement", "When something goes wrong in a shared plan:", "It's usually someone else's fault.", "I look at what I could have done differently.", true),
  pair("q23", "admiration", "When someone else gets praised:", "It stings a little that it wasn't me.", "I'm glad for them.", false),
  pair("q24", "low_empathy", "When someone asks for your time:", "I think about what's in it for me.", "I give it if I can, even without a payoff.", true),

  pair("q25", "grandiosity", "When you daydream:", "I often picture myself famous, admired or powerful.", "I mostly picture ordinary things, like trips or time with friends.", true),
  pair("q26", "entitlement", "When you want something from someone:", "I know how to get people to give me what I want.", "I ask, and I accept it if they say no.", false),
  pair("q27", "admiration", "When you tell a story about yourself:", "I like to come out of it looking impressive.", "I tell it as it happened, even if I look silly.", false),
  pair("q28", "low_empathy", "When someone says you treated them badly:", "I usually think they need to toughen up.", "I try to see it from their side first.", false),

  pair("q29", "grandiosity", "How you see yourself, honestly:", "I'm more impressive than most people realize.", "I'm a decent person who's still figuring things out.", true),
  pair("q30", "entitlement", "If plans change at the last minute because of someone else:", "I'm irritated they didn't think of me first.", "I adjust. Things come up.", true),
  pair("q31", "admiration", "Being admired:", "Matters a lot to me.", "Is nice, but I don't need it.", true),
  pair("q32", "low_empathy", "When a friend shares good news:", "I often end up turning the talk to my own news.", "I get excited with them.", false),

  pair("q33", "grandiosity", "When you meet very successful people:", "I feel like I'm one of them, or soon will be.", "I'm curious about them, but I don't measure myself against them.", false),
  pair("q34", "entitlement", "Being treated exactly like everyone else feels:", "A little insulting.", "Fair.", false),
  pair("q35", "admiration", "When nobody notices something good you did:", "I find a way to make sure they notice.", "That's fine. I know I did it.", true),
  pair("q36", "low_empathy", "In an argument:", "Winning matters more than how the other person feels.", "I care how they feel, even when I'm right.", true),

  pair("q37", "grandiosity", "When it comes to mistakes:", "I make fewer of them than most people.", "I make them about as often as anyone.", true),
  pair("q38", "entitlement", "When you've helped someone out:", "I expect them to pay me back, one way or another.", "I don't keep score.", false),
  pair("q39", "admiration", "Your clothes and style:", "I put real effort into being noticed.", "I dress more for comfort than for attention.", false),
  pair("q40", "low_empathy", "About your friendships:", "I keep some people around mainly because they're useful.", "I stay close to people because I like them.", true),
];
