import type { Scale } from "./types";

/** Common rating scales. Screener scales match their published wording exactly. */
export const AGREE_5: Scale = { labels: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"] };

export const AGREE_7: Scale = {
  labels: ["Strongly disagree", "Disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Agree", "Strongly agree"],
};

export const LIKE_5: Scale = { labels: ["Strongly dislike", "Dislike", "Unsure", "Like", "Strongly like"] };

export const TRUE_5: Scale = { labels: ["Not at all true", "Slightly true", "Moderately true", "Very true", "Completely true"] };

/** VVIQ-style vividness ratings, lowest to highest. */
export const VIVIDNESS_5: Scale = {
  labels: [
    "No image at all, I only know I'm thinking of it",
    "Vague and dim",
    "Moderately clear and lively",
    "Clear and reasonably vivid",
    "Perfectly clear, as vivid as real seeing",
  ],
};

/** PHQ-9 and GAD-7 response options, scored 0–3. */
export const PHQ_FREQUENCY: Scale = {
  start: 0,
  labels: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
};

/** WHO ASRS v1.1 response options, scored 0–4. */
export const ASRS_FREQUENCY: Scale = {
  start: 0,
  labels: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
};

export const scaleStart = (s: Scale) => s.start ?? 1;
export const scaleMax = (s: Scale) => scaleStart(s) + s.labels.length - 1;
