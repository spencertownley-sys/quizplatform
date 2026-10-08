import type { Category } from "@/lib/engine/types";

/**
 * The 100 planned quizzes. Search data: OpenSEO / DataForSEO, US monthly
 * searches across each quiz's target keywords, pulled 2026-10-07.
 * Full keyword lists and notes: docs/QUIZ_CATALOG.md.
 */

export type StructureTag = "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8" | "T9" | "T10";
export type PaidOffer = "full" | "full+comparison" | "comparison" | "snapshot+deep" | "snapshot" | "free+all-access" | "free+snapshot" | "full+affiliate" | "affiliate" | "free-only";

export interface CatalogEntry {
  n: number;
  slug: string;
  title: string;
  category: Category;
  structure: StructureTag;
  searches: number | null;
  kd: number | null;
  offer: PaidOffer;
  wave: 1 | 2 | 3 | 4;
}

type Row = [number, string, Category, StructureTag, number | null, number | null, PaidOffer, 1 | 2 | 3 | 4];

const rows: Row[] = [
  [1, "16-Type Personality Test", "Personality", "T2", 589200, 31, "full", 1],
  [2, "Enneagram Test", "Personality", "T2", 165000, 54, "full", 1],
  [3, "Big Five Personality Test", "Personality", "T1", 27100, 27, "full", 1],
  [4, "DISC Style Assessment", "Personality", "T3", 71700, 50, "full", 2],
  [5, "Strengths Finder", "Personality", "T1", 2400, 30, "full", 3],
  [6, "Four Temperaments Test", "Personality", "T2", 3600, 9, "full", 3],
  [7, "Color Personality Test", "Personality", "T2", 12100, 13, "full", 1],
  [8, "Introvert, Extrovert or Ambivert", "Personality", "T1", 6800, 8, "full", 2],
  [9, "Dark Triad Test", "Personality", "T1", 3600, 0, "full", 3],
  [10, "Narcissism Self-Check", "Personality", "T1", 14870, 7, "full", 1],
  [11, "Jungian Archetype Quiz", "Personality", "T2", 5800, 0, "full", 2],
  [12, "Feminine Archetype Quiz", "Personality", "T2", 5400, 5, "full", 2],
  [13, "Highly Sensitive Person Test", "Personality", "T1", 10800, 22, "full", 1],
  [14, "Empath Test", "Personality", "T1", 3670, 10, "full", 3],
  [15, "Emotional Intelligence (EQ) Test", "Personality", "T1", 19800, 37, "full", 2],
  [16, "Cognitive Functions Test", "Personality", "T1", null, 34, "full", 4],
  [17, "Thinking Style Test", "Personality", "T3", 3600, 9, "full", 4],
  [18, "Mental Age Test", "Personality", "T6", 12100, 0, "full", 1],
  [19, "Chronotype Quiz", "Personality", "T2", 4480, 7, "full", 3],
  [20, "Creativity Style Test", "Personality", "T1", 720, 25, "full", 4],
  [21, "Humor Style Quiz", "Personality", "T2", 20, 26, "full", 4],
  [22, "Decision-Making Style Quiz", "Personality", "T2", 30, 0, "full", 4],
  [23, "Attachment Style Quiz", "Relationships", "T3", 59400, 41, "full", 1],
  [24, "Love Language Quiz", "Relationships", "T2", 140000, 19, "full", 1],
  [25, "Couples Compatibility Test", "Relationships", "T9", 20500, 9, "full+comparison", 1],
  [26, "Couples Attachment Match", "Relationships", "T9", null, null, "comparison", 2],
  [27, "Relationship Health Check", "Relationships", "T1", 2900, 18, "full", 2],
  [28, "Does He Like Me?", "Relationships", "T6", 6600, 0, "snapshot+deep", 1],
  [29, "Does She Like Me?", "Relationships", "T6", 1600, 0, "snapshot+deep", 2],
  [30, "Friendship Test", "Relationships", "T9", 4400, 0, "full+comparison", 2],
  [31, "How Well Do You Know Me?", "Relationships", "T9", 1600, 0, "free+all-access", 2],
  [32, "Communication Style Quiz", "Relationships", "T2", 1600, 7, "full", 3],
  [33, "Conflict Style Quiz", "Relationships", "T3", 390, 0, "full", 3],
  [34, "Love Style Quiz", "Relationships", "T2", 390, 28, "full", 3],
  [35, "Codependency Quiz", "Relationships", "T1", 390, 0, "full", 4],
  [36, "Toxic Relationship Check", "Relationships", "T8", 210, 0, "free-only", 4],
  [37, "Red Flag Quiz", "Relationships", "T1", 480, 1, "full", 3],
  [38, "Flirting Style Quiz", "Relationships", "T2", 30, 4, "full", 4],
  [39, "Dating Style Quiz", "Relationships", "T2", 40, 0, "full", 4],
  [40, "People Pleaser Quiz", "Relationships", "T1", 90, 0, "full", 4],
  [41, "Relationship Trust Check", "Relationships", "T1", 70, 0, "snapshot", 4],
  [42, "Manipulation Warning Signs", "Relationships", "T8", 80, 0, "free-only", 4],
  [43, "IQ Test (estimated)", "Brain", "T4", 458640, 52, "full", 1],
  [44, "Vocabulary Test", "Brain", "T4", 12100, 46, "full", 3],
  [45, "Memory Test", "Brain", "T5", 9900, 41, "full", 3],
  [46, "Reaction Time Test", "Brain", "T5", 110000, 12, "free+all-access", 1],
  [47, "Typing Speed Test", "Brain", "T5", 673000, 71, "free+all-access", 3],
  [48, "Logical Reasoning Test", "Brain", "T4", 480, 0, "full", 3],
  [49, "General Knowledge Quiz", "Brain", "T4", 8100, 7, "free+all-access", 2],
  [50, "Geography Quiz", "Brain", "T4", 40500, 49, "free+all-access", 3],
  [51, "Daily Trivia Quiz", "Brain", "T4", 9900, 38, "free+all-access", 2],
  [52, "Aphantasia (Mind's Eye) Test", "Brain", "T1", 14800, 4, "full", 1],
  [53, "Color Vision Test", "Brain", "T5", 201000, 34, "free-only", 3],
  [54, "Learning Style Quiz", "Brain", "T2", 7480, 26, "full", 3],
  [55, "Brain Type Quiz", "Brain", "T2", 90, 4, "full", 4],
  [56, "Career Test", "Career & money", "T7", 95800, 32, "full", 1],
  [57, "What Job Should I Have?", "Career & money", "T7", 2900, 50, "full", 3],
  [58, "College Major Quiz", "Career & money", "T7", 1600, 4, "full", 2],
  [59, "Leadership Style Quiz", "Career & money", "T2", 2400, 29, "full", 2],
  [60, "Work Style Assessment", "Career & money", "T2", 390, 5, "full", 3],
  [61, "Entrepreneur Personality Quiz", "Career & money", "T1", 140, 8, "full", 3],
  [62, "Money Personality Quiz", "Career & money", "T2", 390, 6, "full", 2],
  [63, "Money Mindset Quiz", "Career & money", "T1", 30, 0, "full", 4],
  [64, "Burnout Test", "Career & money", "T8", 590, 17, "free+snapshot", 3],
  [65, "Procrastination Style Quiz", "Career & money", "T2", 70, 0, "full", 4],
  [66, "Impostor Syndrome Test", "Career & money", "T1", 30, 27, "full", 4],
  [67, "Political Values Map", "Career & money", "T3", 57600, 30, "free+snapshot", 2],
  [68, "Birth Chart Calculator", "Spiritual", "T10", 246000, 65, "full", 2],
  [69, "Human Design Chart", "Spiritual", "T10", 33100, 42, "full", 3],
  [70, "Spirit Animal Quiz", "Spiritual", "T6", 51300, 0, "full", 1],
  [71, "Spiritual Gifts Test", "Spiritual", "T1", 20500, 52, "full", 2],
  [72, "Aura Color Quiz", "Spiritual", "T6", 1110, 0, "full", 3],
  [73, "Element Quiz", "Spiritual", "T6", 2600, 0, "full", 3],
  [74, "Greek God or Goddess Quiz", "Spiritual", "T6", 1600, 0, "full", 3],
  [75, "Crystal Match Quiz", "Spiritual", "T7", 110, 0, "affiliate", 4],
  [76, "Tarot Card Quiz", "Spiritual", "T6", null, 14, "full", 4],
  [77, "Magic Academy House Quiz", "Fandom-style", "T6", 258600, 12, "full", 1],
  [78, "Fairy-Tale Heroine Quiz", "Fandom-style", "T6", 9500, 1, "full", 2],
  [79, "Creature Companion Quiz", "Fandom-style", "T6", 2900, 4, "full", 3],
  [80, "Friend-Group Role Quiz", "Fandom-style", "T6", 1900, 0, "full", 3],
  [81, "What Cat Are You?", "Fandom-style", "T6", 390, 0, "full", 4],
  [82, "Which Decade Do You Belong In?", "Fandom-style", "T6", 20, 0, "full", 4],
  [83, "Color Season Analysis", "Style", "T7", 10490, 0, "full+affiliate", 1],
  [84, "Fashion Style Quiz", "Style", "T7", 7300, 3, "full+affiliate", 2],
  [85, "Aesthetic Quiz", "Style", "T6", 1350, 2, "full", 2],
  [86, "Body Shape Styling Quiz", "Style", "T7", 1600, 0, "full+affiliate", 3],
  [87, "Face Shape Quiz", "Style", "T7", 480, 0, "full+affiliate", 3],
  [88, "Hair Type Quiz", "Style", "T7", 5400, 20, "full+affiliate", 2],
  [89, "Skin Type Quiz", "Style", "T7", 1300, 23, "full+affiliate", 3],
  [90, "Fragrance Finder", "Style", "T7", 5800, 0, "affiliate", 2],
  [91, "Interior Design Style Quiz", "Style", "T7", 5800, 6, "full+affiliate", 2],
  [92, "Wedding Style Quiz", "Style", "T7", 1300, 0, "full+affiliate", 3],
  [93, "Dog Breed Matcher", "Style", "T7", 5400, 10, "affiliate", 2],
  [94, "Cat Breed Matcher", "Style", "T7", 590, 0, "affiliate", 3],
  [95, "Travel Destination Matcher", "Style", "T7", 830, 0, "full+affiliate", 3],
  [96, "Parenting Style Quiz", "Style", "T3", 880, 2, "full", 3],
  [97, "ADHD Self-Screen", "Wellbeing (free)", "T8", 144900, 37, "free-only", 1],
  [98, "Depression Screen", "Wellbeing (free)", "T8", 110000, 39, "free-only", 1],
  [99, "Anxiety Screen", "Wellbeing (free)", "T8", 22500, 32, "free-only", 2],
  [100, "Self-Esteem Check", "Wellbeing (free)", "T1", 790, 13, "free+snapshot", 3],
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const catalog: CatalogEntry[] = rows.map(([n, title, category, structure, searches, kd, offer, wave]) => ({
  n,
  slug: slugify(title),
  title,
  category,
  structure,
  searches,
  kd,
  offer,
  wave,
}));
