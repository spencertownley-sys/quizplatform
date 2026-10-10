import { PHQ_FREQUENCY } from "@/lib/engine/scales";
import type { Outcome, QuizDefinition } from "@/lib/engine/types";

/**
 * PHQ-9, reproduced exactly as published. Scoring and severity bands are the
 * published ones (Kroenke, Spitzer & Williams, 2001). Always free; never sells reports.
 * Item 9 above zero shows crisis resources (handled by the result page via the "risk_item" flag).
 */

const ADVICE_ALL =
  "Whatever your score, if something on this list is getting in the way of your life, it's worth talking to a doctor, nurse practitioner or licensed therapist. Bring your answers with you; the PHQ-9 is the same questionnaire many clinics use.";

function band(key: string, name: string, tagline: string, summary: string, about: string): Outcome {
  return { key, name, tagline, emoji: "🌱", summary, about, snapshot: [], deep: [] };
}

const quiz: QuizDefinition = {
  slug: "depression-screen",
  n: 98,
  title: "Depression Screen (PHQ-9)",
  tagline: "The 9-question screen doctors use. Free, private, 2 minutes.",
  category: "Wellbeing (free)",
  structure: "screener",
  description:
    "Take the PHQ-9, the nine-question depression screen used in clinics worldwide. Free, no email, with your score explained and where to get support.",
  disclaimer:
    "A screen is not a diagnosis. Only a qualified health professional can diagnose depression. If you are in crisis or thinking about harming yourself, call or text 988 in the US, or your local emergency number, now.",
  instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
  method:
    "This is the Patient Health Questionnaire-9 (PHQ-9), unchanged. Each of the first nine questions is scored from 0 (\"Not at all\") to 3 (\"Nearly every day\"), and the total runs from 0 to 27. The published severity ranges are 0–4 minimal, 5–9 mild, 10–14 moderate, 15–19 moderately severe and 20–27 severe. The tenth question, about how much these problems affect daily life, isn't part of the score but helps a clinician understand your situation.\n\nThe PHQ-9 is a screening tool: it tells you whether symptoms are worth a closer look, not what is causing them. Thyroid problems, medications, grief, sleep disorders and other conditions can produce similar symptoms, which is why a professional assessment matters. Your answers stay private; we never sell or share them.",
  minutes: 2,
  paywall: "free_headline",
  isScreener: true,
  sellsReports: false,
  minAge: 13,
  scale: PHQ_FREQUENCY,
  status: "draft",
  dimensions: [{ key: "total", label: "PHQ-9 score", low: "0", high: "27" }],
  questions: [
    { id: "phq1", kind: "likert", dimension: "total", text: "Little interest or pleasure in doing things" },
    { id: "phq2", kind: "likert", dimension: "total", text: "Feeling down, depressed, or hopeless" },
    { id: "phq3", kind: "likert", dimension: "total", text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: "phq4", kind: "likert", dimension: "total", text: "Feeling tired or having little energy" },
    { id: "phq5", kind: "likert", dimension: "total", text: "Poor appetite or overeating" },
    {
      id: "phq6",
      kind: "likert",
      dimension: "total",
      text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    },
    {
      id: "phq7",
      kind: "likert",
      dimension: "total",
      text: "Trouble concentrating on things, such as reading the newspaper or watching television",
    },
    {
      id: "phq8",
      kind: "likert",
      dimension: "total",
      text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
    },
    { id: "phq9", kind: "likert", dimension: "total", text: "Thoughts that you would be better off dead or of hurting yourself in some way" },
    {
      id: "phq10",
      kind: "likert",
      dimension: "total",
      scored: false,
      text: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      scale: { start: 0, labels: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"] },
    },
  ],
  bands: {
    on: "raw_total",
    bands: [
      { min: 0, outcome: "minimal" },
      { min: 5, outcome: "mild" },
      { min: 10, outcome: "moderate" },
      { min: 15, outcome: "moderately_severe" },
      { min: 20, outcome: "severe" },
    ],
  },
  screener: {
    riskItems: [{ questionId: "phq9", minValue: 1 }],
    source:
      "Patient Health Questionnaire-9 (PHQ-9). Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.",
  },
  outcomes: [
    band(
      "minimal",
      "Minimal symptoms",
      "Your score is in the minimal range (0–4).",
      `Your answers suggest few or no symptoms of depression over the last two weeks. ${ADVICE_ALL}`,
      "A PHQ-9 score from 0 to 4 falls in the minimal range. Most people score here at any given time, and a few low-level symptoms, like a stretch of poor sleep or a flat week, are part of ordinary life rather than a sign of depression.\n\nA minimal score is a snapshot of the last two weeks, not a guarantee about the future. Mood can shift after a loss, a move, a new baby, a breakup, a health change or a long period of stress. If you notice that low mood or loss of interest is lasting most days for two weeks or more, retaking the screen and talking with a clinician is a sensible next step.\n\nIf you took this screen because someone you care about is struggling, the most helpful things are usually simple: check in, listen without fixing, and offer to help them find a professional to talk to.",
    ),
    band(
      "mild",
      "Mild symptoms",
      "Your score is in the mild range (5–9).",
      `Your answers suggest mild symptoms of depression over the last two weeks. That's worth paying attention to, especially if it has lasted a while. ${ADVICE_ALL}`,
      "A PHQ-9 score from 5 to 9 falls in the mild range. Mild symptoms can still make life feel heavier: harder mornings, less enjoyment, more effort to do ordinary things. Clinicians often suggest watching how symptoms change over a few weeks, along with steps that help many people, such as regular sleep and wake times, daily movement, time outdoors, and staying connected with people.\n\nA mild score doesn't mean you have to cope alone or wait until things get worse. Talking with a primary care doctor or therapist is reasonable at any score, and is especially worth doing if symptoms last more than a couple of weeks, keep returning, or affect work, school or relationships.\n\nThe PHQ-9 can't tell what's behind your symptoms. Medical issues, medications, grief and stress can all play a part, which is why a conversation with a professional is the best next step.",
    ),
    band(
      "moderate",
      "Moderate symptoms",
      "Your score is in the moderate range (10–14).",
      "Your answers suggest moderate symptoms of depression. A score of 10 or more is the level at which clinicians usually recommend a full assessment, so please consider talking to a doctor or licensed therapist soon. Effective help exists, and reaching out is a strong first step.",
      "A PHQ-9 score from 10 to 14 falls in the moderate range. In clinical practice, a score of 10 or above is commonly used as the point where a full evaluation is recommended, because many people at this level are dealing with a depressive episode that responds well to treatment.\n\nTreatment for depression works for most people. Depending on what a clinician finds, options can include talking therapy (such as cognitive behavioral therapy), medication, or both, alongside practical support with sleep, activity and stress. A primary care doctor is a good place to start; you can show them your answers to this questionnaire.\n\nIf finding care feels overwhelming, you can ask someone you trust to help you make the call. In the US, 988 (call or text) also offers free, confidential support any time, not only in emergencies.",
    ),
    band(
      "moderately_severe",
      "Moderately severe symptoms",
      "Your score is in the moderately severe range (15–19).",
      "Your answers suggest moderately severe symptoms of depression. Please talk with a doctor or licensed mental health professional soon; this level of symptoms usually needs active treatment, and treatment helps. If you're struggling to get through the day, call or text 988 (US) for support now.",
      "A PHQ-9 score from 15 to 19 falls in the moderately severe range. Symptoms at this level usually affect daily life in a real way: work, school, relationships, sleep and the ability to enjoy things. Clinicians generally recommend starting active treatment rather than waiting to see if things improve on their own.\n\nPlease reach out to a doctor or licensed mental health professional soon, ideally this week. If it helps, bring this result and your answers. Many people find it easier to ask a friend or family member to help book the appointment or come along.\n\nYou don't have to be in danger to use a crisis line. In the US, you can call or text 988 any time to talk with a trained counselor for free. Outside the US, findahelpline.com lists free, confidential services in your country.",
    ),
    band(
      "severe",
      "Severe symptoms",
      "Your score is in the severe range (20–27).",
      "Your answers suggest severe symptoms of depression. Please contact a doctor or mental health professional as soon as you can, and if you are thinking about harming yourself, call or text 988 (US) or your local emergency number right now. You deserve support, and help is available today.",
      "A PHQ-9 score from 20 to 27 falls in the severe range. Symptoms at this level are heavy and exhausting, and they are also treatable. The most important step is to connect with care quickly: a primary care doctor, a mental health clinic, or an urgent care or emergency service if you feel unsafe.\n\nIf you are having thoughts of suicide or of hurting yourself, call or text 988 in the US to reach the 988 Suicide & Crisis Lifeline, available 24 hours a day, or call your local emergency number. Outside the US, findahelpline.com lists crisis services by country. If you can, tell someone near you how you're feeling and ask them to stay with you.\n\nDepression can make it feel like nothing will help. That feeling is a symptom, not a fact. Many people who once scored in this range feel much better with treatment.",
    ),
  ],
  seo: {
    intro:
      "The PHQ-9 is the nine-question depression screen used by doctors and clinics around the world. This is the full questionnaire, unchanged, with instant scoring and a plain-language explanation of what your score means. It's free, takes about two minutes, needs no email, and we never sell your answers. A screen can't diagnose depression, but it can help you decide whether to talk to a professional, and give you something concrete to bring to that conversation.",
    measures:
      "The PHQ-9 asks how often, over the last two weeks, you've been bothered by nine problems that match the symptoms clinicians use to recognize a depressive episode: low interest or pleasure, low mood, sleep changes, tiredness, appetite changes, feelings of worthlessness or guilt, trouble concentrating, slowed or restless movement, and thoughts of death or self-harm.\n\nEach answer is scored from 0 to 3, so the total runs from 0 to 27. The published ranges are minimal (0–4), mild (5–9), moderate (10–14), moderately severe (15–19) and severe (20–27). A final question asks how much these problems affect your daily life; it isn't scored, but it matters to a clinician.\n\nBecause the PHQ-9 tracks severity, clinicians also use it over time to see whether treatment is helping. Retaking it every few weeks can show you the same thing.",
    origin:
      "The PHQ-9 was developed by Drs. Robert Spitzer, Janet Williams and Kurt Kroenke and colleagues as part of the Patient Health Questionnaire, and published in 2001. It is free to use and has been studied in many countries and languages, which is one reason it became a standard first step in primary care.\n\nIts limits are worth knowing: it relies on how you describe the last two weeks, it doesn't rule out other causes of the same symptoms (such as thyroid conditions, medications, grief or sleep disorders), and it can't replace a conversation with a professional who knows your history.",
    faqs: [
      {
        q: "Is this an official depression test?",
        a: "It's the official PHQ-9 questionnaire, reproduced exactly, with the published scoring. But no questionnaire can diagnose depression on its own. A doctor or licensed mental health professional makes a diagnosis after talking with you, often using the PHQ-9 as one part of the picture.",
      },
      {
        q: "What PHQ-9 score means I should get help?",
        a: "Clinicians commonly recommend a full assessment at a score of 10 or more, and active treatment at 15 or more. But you can and should reach out at any score if symptoms are affecting your life, and right away if you have any thoughts of harming yourself.",
      },
      {
        q: "Why does it ask about thoughts of being better off dead?",
        a: "Because it's an important symptom that people often don't mention unless asked. If you answered anything other than \"Not at all\" on that question, we show crisis resources with your result. In the US you can call or text 988 at any time to talk to a trained counselor for free.",
      },
      {
        q: "Is this test free? Will I be charged later?",
        a: "Yes, it's completely free, with no email required and no paid upgrade. We never charge for mental health screens. Your result is shown on the page right away.",
      },
      {
        q: "How often can I take it?",
        a: "The PHQ-9 asks about the last two weeks, so retaking it every two to four weeks is a reasonable way to track changes. If you create a free account, your results are saved so you can see the trend.",
      },
    ],
    keywords: ["depression test", "phq-9", "depression quiz"],
  },
  related: ["adhd-self-screen", "highly-sensitive-person-test", "big-five-personality-test"],
  reviewNotes:
    "PHQ-9 wording, response options and bands must stay exactly as published. Copyright notice states no permission is required to reproduce or display. Crisis copy references 988 (US) and findahelpline.com; confirm both before launch.",
};

export default quiz;
