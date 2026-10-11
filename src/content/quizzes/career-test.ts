import { LIKE_5 } from "@/lib/engine/scales";
import type { QuizDefinition } from "@/lib/engine/types";
import { careers } from "./_parts/career-test/catalog";
import { dimensions } from "./_parts/career-test/dimensions";
import { artistic, social } from "./_parts/career-test/outcomes-as";
import { conventional, enterprising } from "./_parts/career-test/outcomes-ec";
import { investigative, realistic } from "./_parts/career-test/outcomes-ri";
import { questions } from "./_parts/career-test/questions";
import { md } from "./_parts/career-test/text";

const quiz: QuizDefinition = {
  slug: "career-test",
  n: 56,
  title: "Career Test",
  tagline: "Find careers that match what you actually enjoy doing.",
  category: "Career & money",
  structure: "recommender",
  description:
    "Rate 60 everyday activities to get your Holland (RIASEC) interest code and a ranked list of careers with pay, training and outlook.",
  disclaimer:
    "This is an interest inventory, not an aptitude or ability test. It shows the kinds of work you're likely to enjoy, not what you'd be good at, and it's a starting point for exploring, not a verdict on your future.",
  method: md(
    "This career test is an interest inventory based on psychologist John Holland's RIASEC model. You rated 60 activities from \"Strongly dislike\" to \"Strongly like,\" ten for each of six interest areas: Realistic, Investigative, Artistic, Social, Enterprising and Conventional. Each area's score is the average of its ten ratings, and your interest code is the first letters of your three highest areas.",
    "To rank careers, we compare the shape of your profile, meaning which areas sit higher or lower than your others, with a target profile built from each career's typical interest code. Matching on shape means people who rate everything high or everything low still get useful matches. Education, pay and outlook come from US Bureau of Labor Statistics data, rounded; real pay varies by location, employer and experience.",
    "What it can tell you: the kinds of work you're likely to enjoy right now. What it can't: your abilities, your odds of success, or how a specific job will feel. It's a self-report snapshot, and interests often shift with experience, especially before your mid-twenties.",
  ),
  minutes: 9,
  paywall: "free_headline",
  minAge: 13,
  scale: LIKE_5,
  status: "draft",
  dimensions,
  questions,
  outcomes: [realistic, investigative, artistic, social, enterprising, conventional],
  extras: [
    {
      key: "code",
      label: "Your interest code",
      kind: "code",
      length: 3,
      letters: { realistic: "R", investigative: "I", artistic: "A", social: "S", enterprising: "E", conventional: "C" },
    },
  ],
  recommender: {
    outcome: "top_dimension",
    similarity: "correlation",
    listSize: 30,
    catalog: careers,
  },
  seo: {
    intro:
      "This free career test helps you find work you'd actually enjoy. You'll rate 60 everyday activities, like fixing an engine, teaching a child to read or planning a marketing campaign, on a simple scale from \"Strongly dislike\" to \"Strongly like.\" Your answers are scored across the six interest areas of Holland's RIASEC model to produce your three-letter interest code and a ranked list of careers that fit it, each with typical education, median US pay, job outlook and a link to explore further. It takes about nine minutes. It's an interest inventory, not an aptitude test: it shows what you're likely to enjoy, not what you're good at.",
    measures: md(
      "The test measures your interest in six broad kinds of work. Realistic means hands-on work with tools, machines, plants or animals. Investigative means researching, analyzing and solving problems with science or data. Artistic means creating and expressing ideas through art, writing, music or design. Social means helping, teaching and caring for people. Enterprising means leading, persuading and starting things. Conventional means organizing information, numbers and procedures so things run accurately.",
      "Each area gets a score from your ten ratings in it, and your top three areas form your interest code, such as \"SAE\" or \"RIC.\" Your code matters more than your top letter alone: two people who both score highest on Social might thrive in very different careers if one leans Investigative (healthcare) and the other leans Enterprising (school leadership).",
      "Your career matches come from comparing the shape of your whole profile with the typical interest profile of about 80 occupations, from skilled trades to medicine, design, business and finance, across every education level. Each match shows the typical education, median US pay and job outlook, plus a link to O*NET, the US Department of Labor's free occupation database, where you can read about daily tasks and work settings in depth. Because the match uses your whole profile, careers that share your top two or three areas usually rank near the top, even when their first letter differs from yours.",
    ),
    origin: md(
      "The six interest areas come from the work of psychologist John Holland, who developed his theory of vocational personalities from the 1950s onward. His central idea is that people are happier and more likely to stay in work environments that match their interests. He arranged the six areas in a hexagon, with similar interests next to each other, and the model remains a common framework in career counseling and in O*NET's occupation profiles.",
      "Interest inventories have real limits. They measure what you like, not what you can do, and they predict satisfaction better than success. Your answers depend on what you've had a chance to try, and on how you felt that day. Use your results to choose what to explore next, not to rule out a path you care about.",
    ),
    faqs: [
      {
        q: "Is this a career aptitude test?",
        a: "No. Many people search for a career aptitude test, but this is an interest inventory. Aptitude tests measure abilities, like spatial reasoning or verbal skill. Interest inventories measure what kinds of work you'd enjoy. Both are useful, but interests are often the better starting point, because people tend to build skill in work they find engaging. If you want to know whether you'd be good at a career, combine these results with your grades, real experience and feedback from people in the field.",
      },
      {
        q: "What is a RIASEC or Holland code?",
        a: "It's a short code made from the first letters of your three strongest interest areas, in order: Realistic, Investigative, Artistic, Social, Enterprising and Conventional. For example, \"SIA\" means Social first, then Investigative, then Artistic. Occupations have codes too, based on the interests of people who do that work. Comparing your code with occupation codes is a quick way to spot careers worth exploring, which is how the ranked list in your results is built.",
      },
      {
        q: "How accurate is this career test?",
        a: "It's as accurate as your answers and your experience allow. If you rate activities honestly, your top areas usually reflect real preferences. But it's a self-report snapshot: if you haven't tried many of the activities, or you answered on a low-energy day, your scores can shift. Interests also change with experience, especially in your teens and twenties. Treat the results as a well-informed list of ideas to test, not a final answer.",
      },
      {
        q: "What if my results don't match the career I want?",
        a: "That's useful information, not a stop sign. Look at which parts of the career you want match your interests and which don't. Many jobs have niches that fit different codes; for example, a Realistic person in medicine might enjoy surgery or emergency care more than research. Talk to people in the field, try the work in small ways and see how it feels. Interests describe what you enjoy, and you're the one who decides what you're willing to work hard for.",
      },
      {
        q: "Why are my scores all similar?",
        a: "A flat profile, where your six areas score close together, is common. It can mean you have broad interests, that you haven't tried many of the activities yet, that you avoid extreme ratings, or that you answered on a tired day. Your ranked careers are still useful as a list of ideas, but look at the individual activities you rated highest and try a few hands-on experiments. Retaking the test after a few months of new experience often gives a clearer picture.",
      },
      {
        q: "Where do the pay and outlook figures come from?",
        a: "Typical education, median pay and job outlook are based on the US Bureau of Labor Statistics Occupational Outlook Handbook, rounded for easy reading. Median pay means half of workers earn more and half earn less; your actual pay will depend on location, employer, experience and specialty. Outlook compares projected job growth over the next decade with the average for all occupations. For full details and the latest figures, follow the O*NET links in your results or visit bls.gov/ooh.",
      },
    ],
    keywords: ["career quiz", "career test", "career aptitude test"],
  },
  related: ["big-five-personality-test", "16-type-personality-test", "iq-test"],
  reviewNotes: [
    "PAY AND OUTLOOK MUST BE VERIFIED: every \"Median pay (US)\" and \"Outlook\" figure in the career catalog (_parts/career-test/catalog.ts) was written from memory of recent BLS Occupational Outlook Handbook editions and must be checked against bls.gov/ooh before publishing. Outlook is collapsed to three bins: much faster / faster than average -> \"Faster than average\"; as fast as average -> \"Average\"; slower / little or no change / decline -> \"Slower than average\". Least certain: pilot (combined airline + commercial median), database administrator or architect, actor and musician (BLS reports hourly medians), physician (BLS reports a floor, shown as \"about $240,000 or more\"), and the outlook bins for plumber, pharmacist, psychologist, social worker and dental hygienist, which sit near a bin edge.",
    "Interest codes (\"Interest code\" fact, and the profiles built from them in profileFor) approximate O*NET interest profiles from memory; spot-check a sample on onetonline.org. The \"Interest code\" fact is an addition beyond the brief, shown so takers can see why a career matched; drop it if unwanted.",
    "Items are original wording, not taken from the O*NET Interest Profiler or any commercial inventory. The method and FAQ say figures come from BLS, which will be true once verified.",
    "O*NET links use the quick-search URL with a URL-encoded title; check a few resolve to the intended occupation.",
  ].join(" "),
};

export default quiz;
