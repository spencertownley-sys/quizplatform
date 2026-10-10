import type { Dimension } from "@/lib/engine/types";

export const dimensions: Dimension[] = [
  {
    key: "realistic",
    label: "Realistic",
    low: "Little interest",
    high: "Strong interest",
    description: "Hands-on work with tools, machines, materials, plants or animals, often outdoors.",
    report: {
      low: "Hands-on, physical work doesn't pull at you much right now. Building, repairing and operating equipment were mostly activities you rated as dislikes or shrugs. That's useful to know: jobs that are mostly physical labor or machine work are unlikely to hold your interest for long. If you've had little chance to try this kind of work, though, an \"unsure\" can hide a real interest, so a single hands-on project is a cheap way to double-check.",
      mid: "You have a moderate interest in hands-on work. Some practical activities appealed to you and others didn't, which often means you'd enjoy a job with a physical side but not one that is physical all day. Lab work, field research, design with prototypes or a trade with a strong problem-solving element can give you that balance. Look back at which Realistic activities you liked most: tools, outdoors and animals point in quite different directions.",
      high: "You have a strong interest in hands-on, practical work. You liked activities such as building, fixing, operating equipment and working outdoors, which usually means you enjoy seeing a concrete result from your effort. Careers that keep you moving, using tools or solving physical problems are likely to feel more natural than a job spent in meetings. Many of these paths, including the skilled trades, start with paid training rather than years of tuition.",
    },
  },
  {
    key: "investigative",
    label: "Investigative",
    low: "Little interest",
    high: "Strong interest",
    description: "Researching, analyzing and solving problems with science, math, data or logic.",
    report: {
      low: "Research and analysis aren't what draw you in right now. Activities like running experiments, studying data or solving logic problems mostly scored low for you. That doesn't mean you can't think analytically; it means you'd rather apply ideas than investigate them for their own sake. Careers built around long stretches of research, writing up findings or abstract problem solving are likely to feel slow to you.",
      mid: "You have a moderate interest in investigating and analyzing. You enjoy figuring things out when the problem matters to you, but you may not want to spend every day on research. Many jobs use this middle ground well: troubleshooting, diagnosing, planning or using data to support decisions rather than producing new research. Notice which topics excited you, such as health, computers or nature, since they can steer you toward the right field.",
      high: "You have a strong interest in investigating how things work. Experiments, data, puzzles and scientific questions appealed to you, which often signals curiosity that outlasts a quick answer. You'll likely enjoy work that rewards careful thinking, evidence and independence, such as science, medicine, engineering or technology. Many of these careers require years of study, so it helps that you find the learning itself rewarding.",
    },
  },
  {
    key: "artistic",
    label: "Artistic",
    low: "Little interest",
    high: "Strong interest",
    description: "Creating, designing and expressing ideas through art, writing, music, performance or design.",
    report: {
      low: "Creative and artistic activities aren't a strong pull for you right now. Writing, drawing, performing and designing mostly scored low, which suggests you prefer work with clearer rules and right answers over open-ended creative work. You can still be inventive; you just may not want your job to depend on self-expression. Roles with structure and concrete goals will probably suit you better than ones built around taste and originality.",
      mid: "You have a moderate creative streak. Some artistic activities appealed to you, though not all, which often means you'd enjoy a job with room for creativity inside a practical structure. Fields like technical writing, product design, marketing, teaching or architecture blend creativity with other skills. Pay attention to the specific activities you liked, such as words, visuals or performance, since each points toward different work.",
      high: "You have a strong interest in creating and expressing ideas. Writing, design, music, performance or visual art appealed to you, which usually means you value originality and freedom to do things your own way. You may feel boxed in by work with rigid rules and little room for your own ideas. Creative careers vary a lot in pay and stability, so it's worth exploring both the dream roles and the steady creative jobs nearby.",
    },
  },
  {
    key: "social",
    label: "Social",
    low: "Little interest",
    high: "Strong interest",
    description: "Helping, teaching, caring for and working closely with people.",
    report: {
      low: "Helping and teaching roles aren't a big draw for you right now. Activities like counseling, caregiving and teaching mostly scored low, which suggests you'd rather focus on tasks, ideas or things than on supporting people all day. That's a valid preference, not a character flaw. Careers where most of your energy goes into other people's needs may wear you out, while work with more independence may suit you better.",
      mid: "You have a moderate interest in helping and working with people. You enjoy some contact and some chances to make a difference, but you probably don't want every hour of your job to be about other people's needs. Many careers mix the two, such as healthcare roles with technical tasks, training jobs or team leadership. Notice whether you preferred teaching, caring or listening, since each fits different settings.",
      high: "You have a strong interest in helping, teaching and caring for people. You liked activities like supporting others, coaching and teaching, which usually means you find meaning in making a direct difference in someone's life. You'll likely thrive in work with lots of human contact, such as education, healthcare, counseling or community roles. Because these jobs can be emotionally demanding, it helps to plan for rest and boundaries from the start.",
    },
  },
  {
    key: "enterprising",
    label: "Enterprising",
    low: "Little interest",
    high: "Strong interest",
    description: "Leading, persuading, selling and starting things, often with goals and competition.",
    report: {
      low: "Leading, selling and persuading aren't a strong pull for you right now. Activities like pitching ideas, negotiating and managing others mostly scored low, which suggests you'd rather do the work itself than sell it or direct others. That can be a real strength in roles that reward expertise and focus. Jobs built around sales targets, office politics or constant persuasion are likely to feel draining.",
      mid: "You have a moderate interest in leading and persuading. You may enjoy taking charge of something you care about without wanting to be in sales or management all the time. Many careers let you lead projects while staying close to the actual work, such as senior roles in your field or small-team leadership. Watch for the activities you did like, such as starting things, speaking or negotiating, because they show where your influence comes from.",
      high: "You have a strong interest in leading, persuading and making things happen. Starting businesses, selling ideas and leading teams appealed to you, which usually means you enjoy influence, goals and a bit of competition. You may thrive in business, sales, law, management or entrepreneurship, where your energy turns into results. You'll likely want visible progress and rewards, so check how each career on your list measures success.",
    },
  },
  {
    key: "conventional",
    label: "Conventional",
    low: "Little interest",
    high: "Strong interest",
    description: "Organizing information, records, numbers and procedures so things run accurately.",
    report: {
      low: "Organizing data and following set procedures isn't what draws you in right now. Activities like keeping records, checking details and processing forms mostly scored low, which suggests you prefer variety and freedom over routine and precision. Jobs built around detailed paperwork or repetitive data work are likely to feel tedious. You may still want a role where someone else handles the systems you depend on.",
      mid: "You have a moderate interest in organizing and keeping things in order. You may appreciate clear systems and accurate records without wanting to manage them full time. That makes you well suited to roles that mix structure with other work, like project coordination, technical jobs with documentation, or healthcare and business roles that rely on careful records. Notice whether numbers, schedules or rules appealed to you most.",
      high: "You have a strong interest in organizing information and keeping things accurate. Activities like managing budgets, checking documents and tracking records appealed to you, which usually means you like clear expectations, order and getting the details right. You'll likely thrive in finance, accounting, administration, data or compliance roles, where precision is valued. These skills are needed in nearly every industry, which gives you a lot of choice about where to use them.",
    },
  },
];
