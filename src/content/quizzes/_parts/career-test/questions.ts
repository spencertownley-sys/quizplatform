import type { AttentionQuestion, LikertQuestion, Question } from "@/lib/engine/types";

type Area = "realistic" | "investigative" | "artistic" | "social" | "enterprising" | "conventional";

/** Ten activities per RIASEC area, rated on LIKE_5. Original wording. */
const activities: Record<Area, string[]> = {
  realistic: [
    "Build or repair furniture",
    "Fix a bike, lawn mower or small engine",
    "Install a light fixture or ceiling fan",
    "Plant trees or tend crops outdoors",
    "Operate heavy machinery, like a forklift or excavator",
    "Care for horses, cattle or other farm animals",
    "Assemble a computer or other electronics from parts",
    "Tile a floor or renovate a room",
    "Weld or cut metal to make parts",
    "Clear and repair hiking trails in a forest or park",
  ],
  investigative: [
    "Run experiments in a science lab",
    "Track down why a computer program keeps crashing",
    "Study how diseases spread through a community",
    "Analyze a large set of data to find patterns",
    "Read about new discoveries in physics or space",
    "Solve tricky math or logic problems",
    "Examine rocks or fossils to learn about Earth's history",
    "Research how memory works in the brain",
    "Use a microscope to study cells or tiny organisms",
    "Design a study to test whether a treatment works",
  ],
  artistic: [
    "Write short stories, poems or song lyrics",
    "Draw, paint or sketch",
    "Play an instrument in a band or orchestra",
    "Act in a play or film",
    "Design a poster, logo or website layout",
    "Take and edit photographs",
    "Choreograph or perform a dance",
    "Design clothing or costumes",
    "Plan the colors, furniture and style of a room",
    "Animate characters or edit a short film",
  ],
  social: [
    "Teach a child to read",
    "Listen to people and help them work through problems",
    "Care for patients in a hospital or clinic",
    "Coach a youth sports team",
    "Serve meals at a shelter or food bank",
    "Help a new student or coworker feel at home",
    "Lead a workshop that teaches adults a new skill",
    "Help students plan their classes and future",
    "Help an older adult with errands and daily tasks",
    "Help two people settle a disagreement fairly",
  ],
  enterprising: [
    "Start your own business",
    "Convince customers to buy a product",
    "Lead a team to hit a deadline",
    "Negotiate the price of a deal or contract",
    "Give a speech to win people over to an idea",
    "Run for student council or local office",
    "Manage a store or restaurant",
    "Pitch a new idea to investors",
    "Plan a marketing campaign for a new product",
    "Buy items and resell them for a profit",
  ],
  conventional: [
    "Keep a budget up to date in a spreadsheet",
    "Organize files so anything can be found fast",
    "Check a document for errors and missing details",
    "Process invoices and payments for a business",
    "Enter information into a database accurately",
    "Follow a step-by-step procedure to process applications",
    "Manage the schedule and calendar for a busy office",
    "Track inventory in a warehouse or store",
    "Prepare tax forms",
    "Make sure a project follows rules and regulations",
  ],
};

const order: Area[] = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];

const attention: AttentionQuestion = {
  id: "check",
  kind: "attention",
  text: 'To show you\'re reading, choose "Like" for this one.',
  expect: 4,
};

/** Interleaved R, I, A, S, E, C so no area comes in a block; the attention check sits past the middle. */
export const questions: Question[] = (() => {
  const out: Question[] = [];
  for (let i = 0; i < 10; i++) {
    for (const area of order) {
      const item: LikertQuestion = { id: `${area[0]}${i + 1}`, kind: "likert", dimension: area, text: activities[area][i] };
      out.push(item);
    }
    if (i === 5) out.push(attention);
  }
  return out;
})();
