import type { QuizDefinition } from "@/lib/engine/types";
import { confident } from "./_parts/narcissism-self-check/confident";
import { dimensions } from "./_parts/narcissism-self-check/dimensions";
import { grounded } from "./_parts/narcissism-self-check/grounded";
import { questions } from "./_parts/narcissism-self-check/questions";
import { selfFocused } from "./_parts/narcissism-self-check/self-focused";
import { seo } from "./_parts/narcissism-self-check/seo";
import { stronglySelfFocused } from "./_parts/narcissism-self-check/strongly-self-focused";

const quiz: QuizDefinition = {
  slug: "narcissism-self-check",
  n: 10,
  title: "Narcissism Self-Check",
  tagline: "An honest, kind look at how self-focused you really are.",
  category: "Personality",
  structure: "trait_profile",
  description:
    "40 quick either/or choices show where you sit on grandiosity, entitlement, need for admiration and empathy. Self-reflection, not a diagnosis.",
  disclaimer:
    "This quiz is for self-reflection and is not a diagnosis. Narcissistic personality disorder can only be assessed by a qualified clinician, and no online quiz can tell you whether you have it.",
  instructions: "Pick the statement that sounds more like you, even if neither fits perfectly. Go with your first honest reaction.",
  method: `Each of the 40 questions pairs two statements: one self-focused, one modest or other-aware. Ten questions cover each of four dimensions: grandiosity, entitlement, need for admiration and empathy gaps. Every self-focused choice adds one point to its dimension, and each dimension score is the share of self-focused choices you made in that area.

Your overall result is the average of the four dimension scores. Under 25% is Grounded, 25% to 44% is Confident, 45% to 64% is Self-Focused, and 65% or more is Strongly Self-Focused. These cut points are our own descriptive bands. They are not clinical thresholds and they have not been checked against research norms.

This is a self-report snapshot. It reflects how you saw yourself on the day you took it, and answers on a quiz about narcissism often lean modest. It mostly picks up the outgoing, grandiose side of self-focus rather than the quieter, insecure side. It cannot diagnose narcissistic personality disorder; only a qualified clinician can assess that.`,
  minutes: 7,
  paywall: "free_headline",
  minAge: 13,
  status: "draft",
  dimensions,
  outcomeDimensions: ["grandiosity", "entitlement", "admiration", "low_empathy"],
  questions,
  bands: {
    on: "mean",
    bands: [
      { min: 0, outcome: "grounded" },
      { min: 0.25, outcome: "confident" },
      { min: 0.45, outcome: "self_focused" },
      { min: 0.65, outcome: "strongly_self_focused" },
    ],
  },
  outcomes: [grounded, confident, selfFocused, stronglySelfFocused],
  seo,
  related: ["big-five-personality-test", "enneagram-test", "attachment-style-quiz"],
  reviewNotes: `All 40 forced-choice pairs are original. The format follows the forced-choice tradition of the Narcissistic Personality Inventory (Raskin & Hall, 1979), but no NPI wording is used. The brief's example pair ("I like being the center of attention" / "I'd rather blend in") was deliberately not used because it closely mirrors an NPI pair; please spot-check q1, q3, q17, q19 and q29 against the NPI-40 for any remaining near-matches.

Scoring: each self-focused option weighs 1 on its dimension; the other option carries an explicit 0 on the same dimension (lint needs a weight key on every option, and 0 adds nothing to raw or max). No extra "humility" dimension, so the result page shows only the four narcissism bars. Each dimension has exactly 10 items, so the "mean" band value is (self-focused picks) / 40. Cut points: Grounded 0–9 picks, Confident 10–17, Self-Focused 18–25, Strongly Self-Focused 26–40. These are judgment calls with no norm data; revisit once real score distributions exist.

The fourth dimension is keyed "low_empathy" (higher = more narcissistic) but labelled "Empathy gaps" on the score bar to avoid a stigmatizing "Low empathy 80%" display. Confirm the label.

Copy mentions historical facts only (Ovid's Narcissus, Freud 1914, NPD in the APA manual in 1980, the NPI in 1979). No statistics or studies are cited. The disclaimer, method, FAQs and the two higher bands all state that this is not a diagnosis. The Strongly Self-Focused and Self-Focused reports suggest a therapist for mood swings tied to praise or criticism; confirm that tone is acceptable for a 13+ audience.`,
};

export default quiz;
