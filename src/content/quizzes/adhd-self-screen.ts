import { ASRS_FREQUENCY } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";

/**
 * WHO Adult ADHD Self-Report Scale (ASRS v1.1), Part A screener, reproduced as published.
 * Published scoring: items 1–3 count at "Sometimes" or above, items 4–6 at "Often" or above;
 * four or more counted items means symptoms highly consistent with adult ADHD.
 * Always free; never sells reports.
 */
const quiz: QuizDefinition = {
  slug: "adhd-self-screen",
  n: 97,
  title: "ADHD Self-Screen (Adult)",
  tagline: "The WHO's 6-question adult ADHD screener. Free, 1 minute.",
  category: "Wellbeing (free)",
  structure: "screener",
  description:
    "Take the six-question WHO Adult ADHD Self-Report Scale (ASRS v1.1) screener. Free, no email, with your result explained and how to get evaluated.",
  disclaimer:
    "A screen is not a diagnosis. ADHD can only be diagnosed by a qualified clinician after a full evaluation. This screener is designed for adults 18 and over.",
  instructions: "How you have felt and conducted yourself over the past 6 months:",
  method:
    "This is Part A of the World Health Organization's Adult ADHD Self-Report Scale (ASRS v1.1), the six questions found to be most predictive of adult ADHD. Each question is answered on a five-point frequency scale. Following the published scoring, questions 1–3 count when you answer \"Sometimes\" or more often, and questions 4–6 count when you answer \"Often\" or \"Very often\". Four or more counted answers means your symptoms are highly consistent with ADHD in adults and a full evaluation is warranted.\n\nA screener is deliberately quick. It can't account for when symptoms started, whether they show up in more than one setting, or other explanations such as anxiety, depression, sleep problems, thyroid issues or substance use. Those are exactly the questions a clinician will explore in an evaluation. Your answers stay private; we never sell or share them.",
  minutes: 1,
  paywall: "free_headline",
  isScreener: true,
  sellsReports: false,
  minAge: 18,
  scale: ASRS_FREQUENCY,
  status: "draft",
  dimensions: [{ key: "total", label: "ASRS Part A", low: "0", high: "6" }],
  questions: [
    {
      id: "asrs1",
      kind: "likert",
      dimension: "total",
      threshold: 2,
      text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    },
    {
      id: "asrs2",
      kind: "likert",
      dimension: "total",
      threshold: 2,
      text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    },
    { id: "asrs3", kind: "likert", dimension: "total", threshold: 2, text: "How often do you have problems remembering appointments or obligations?" },
    {
      id: "asrs4",
      kind: "likert",
      dimension: "total",
      threshold: 3,
      text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    },
    {
      id: "asrs5",
      kind: "likert",
      dimension: "total",
      threshold: 3,
      text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    },
    {
      id: "asrs6",
      kind: "likert",
      dimension: "total",
      threshold: 3,
      text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    },
  ],
  bands: {
    on: "count_at_threshold",
    bands: [
      { min: 0, outcome: "not_consistent" },
      { min: 4, outcome: "consistent" },
    ],
  },
  screener: {
    source:
      "Adult ADHD Self-Report Scale (ASRS v1.1) Symptom Checklist, Part A. © World Health Organization. Kessler RC et al., Psychological Medicine, 2005.",
  },
  outcomes: [
    {
      key: "not_consistent",
      name: "Below the screening threshold",
      tagline: "Fewer than 4 of the 6 screening answers were in the shaded range.",
      emoji: "🧭",
      summary:
        "Fewer than four of your answers reached the screening threshold, so your responses are not strongly consistent with adult ADHD. If attention, organization or restlessness still get in the way of your life, that's worth raising with a clinician; a screen can miss things, and other causes are treatable too.",
      about:
        "On the ASRS Part A, a result below four counted answers means your responses over the past six months don't strongly match the pattern seen in adults with ADHD. Many people have some of these experiences some of the time: everyone procrastinates on hard tasks or forgets an appointment now and then.\n\nScreeners are designed to be quick, so they can miss people whose symptoms show up differently, especially women, adults who developed strong coping systems, and people whose main struggle is with emotions or time rather than the six areas asked about here. If you have a history of attention problems going back to childhood, or these difficulties are causing real problems at work, school or home, you can still ask a doctor or psychologist about a full evaluation.\n\nOther conditions can also affect focus and energy, including sleep problems, anxiety, depression, thyroid issues and the effects of stress or medications. A clinician can help sort out what's going on.",
      snapshot: [],
      deep: [],
    },
    {
      key: "consistent",
      name: "Consistent with adult ADHD",
      tagline: "4 or more of the 6 screening answers were in the shaded range.",
      emoji: "🧭",
      summary:
        "Four or more of your answers reached the screening threshold. On the WHO screener, this means your symptoms are highly consistent with ADHD in adults and a full evaluation is warranted. Only a clinician can diagnose ADHD, so the next step is to talk to a doctor, psychiatrist or psychologist.",
      about:
        "On the ASRS Part A, four or more counted answers means your symptoms over the past six months are highly consistent with ADHD in adults, and the screener's authors recommend further investigation. That's a signal to get a proper evaluation, not a diagnosis in itself.\n\nA full ADHD evaluation usually looks at your symptoms across different parts of life, when they started (ADHD begins in childhood, even if it's recognized later), how much they affect you, and whether something else could explain them, such as anxiety, depression, sleep problems or thyroid issues. Clinicians may use longer questionnaires, interviews, and sometimes input from people who know you well.\n\nTo get started, you can bring this result to a primary care doctor and ask for a referral, or contact a psychiatrist or psychologist who assesses adults for ADHD. Writing down concrete examples of how attention, organization or restlessness affect your work, studies and relationships will help. If ADHD is confirmed, effective options include medication, coaching, therapy and practical changes at work or school.",
      snapshot: [],
      deep: [],
    },
  ],
  seo: {
    intro:
      "This free adult ADHD test uses the World Health Organization's ASRS v1.1 screener: the six questions researchers found best at flagging adult ADHD. It takes about a minute, needs no email, and shows your result right away with a clear explanation of what it means and how to get a full evaluation. It's a screen, not a diagnosis, and it's always free.",
    measures:
      "The six questions ask how often, over the past six months, you've had trouble finishing the final details of projects, getting organized, remembering appointments, starting tasks that need a lot of thought, sitting still, or feeling driven by a motor. These map onto the two symptom groups clinicians look for in ADHD: inattention and hyperactivity-impulsivity.\n\nEach answer is on a five-point scale from \"Never\" to \"Very often\". The published scoring doesn't simply add the answers up: the first three questions count when you answer \"Sometimes\" or more, and the last three count at \"Often\" or more. Four or more counted answers means symptoms are highly consistent with adult ADHD and a full evaluation is warranted.\n\nBecause it's short, the screener is best used as a first step: a reason to have a conversation with a clinician, not a final answer.",
    origin:
      "The Adult ADHD Self-Report Scale was developed with the World Health Organization's workgroup on adult ADHD and published by Ronald Kessler and colleagues in 2005. Part A, the six-question screener, was chosen from the full 18-item symptom checklist because those questions best predicted a clinical diagnosis.\n\nLike any screener it has limits. It relies on self-report, can be affected by stress, sleep or mood, and may miss adults whose ADHD looks different from the classic pattern. A clinician will also want to know about childhood symptoms and how symptoms affect different parts of your life.",
    faqs: [
      {
        q: "Can this test tell me if I have ADHD?",
        a: "No online test can diagnose ADHD. This screener tells you whether your answers match the pattern that warrants a full evaluation. A doctor, psychiatrist or psychologist makes the diagnosis after a detailed assessment.",
      },
      {
        q: "Is this the real WHO ADHD screener?",
        a: "Yes. It's Part A of the WHO Adult ADHD Self-Report Scale (ASRS v1.1), with the published questions, answer options and scoring.",
      },
      {
        q: "I scored below the threshold but still struggle. What now?",
        a: "Screeners can miss people, especially adults who've developed strong coping strategies or whose symptoms look different. If attention or organization problems affect your life, it's still reasonable to talk to a clinician, who can also check for other causes like sleep problems, anxiety or depression.",
      },
      {
        q: "Is it free? Do I need to give my email?",
        a: "It's completely free, with no email and no paid upgrade. We never charge for mental health screens.",
      },
      {
        q: "Can teenagers take this screener?",
        a: "The ASRS is designed for adults 18 and over. For children and teens, ADHD evaluation works differently, usually involving parents and teachers, so a pediatrician or school psychologist is the best place to start.",
      },
    ],
    keywords: ["adhd test", "adhd quiz", "adult adhd test"],
  },
  related: ["depression-screen", "big-five-personality-test", "reaction-time-test"],
  reviewNotes:
    "ASRS v1.1 is © World Health Organization: confirm the terms for displaying the Part A screener on a website before launch (PRD open item). Wording, response options and the per-item thresholds must stay exactly as published.",
};

export default quiz;
