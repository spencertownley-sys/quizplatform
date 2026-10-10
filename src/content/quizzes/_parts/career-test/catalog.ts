import type { CatalogItem } from "@/lib/engine/types";

type Letter = "R" | "I" | "A" | "S" | "E" | "C";
type Outlook = "Faster than average" | "Average" | "Slower than average";

const DIM: Record<Letter, string> = {
  R: "realistic",
  I: "investigative",
  A: "artistic",
  S: "social",
  E: "enterprising",
  C: "conventional",
};

/** Holland's hexagon order: neighbors are related interests, opposites are the least related. */
const HEX: Letter[] = ["R", "I", "A", "S", "E", "C"];

/**
 * Target profile from a three-letter interest code: first letter 1.0, second 0.7,
 * third 0.5. The other three get 0.3 if they sit next to the first letter on the
 * hexagon, 0.1 if opposite it, 0.2 otherwise.
 */
function profileFor(code: string): Record<string, number> {
  const [first, second, third] = code.split("") as Letter[];
  const at = HEX.indexOf(first);
  return Object.fromEntries(
    HEX.map((letter) => {
      if (letter === first) return [DIM[letter], 1];
      if (letter === second) return [DIM[letter], 0.7];
      if (letter === third) return [DIM[letter], 0.5];
      const gap = Math.abs(HEX.indexOf(letter) - at);
      const steps = Math.min(gap, 6 - gap);
      return [DIM[letter], steps === 1 ? 0.3 : steps === 3 ? 0.1 : 0.2];
    }),
  );
}

const onet = (title: string) => `https://www.onetonline.org/find/quick?s=${encodeURIComponent(title)}`;

function job(key: string, name: string, code: string, education: string, pay: string, outlook: Outlook, blurb: string, search = name): CatalogItem {
  return {
    key,
    name,
    profile: profileFor(code),
    blurb,
    facts: {
      "Interest code": code,
      "Typical education": education,
      "Median pay (US)": pay,
      Outlook: outlook,
    },
    links: [{ label: "Explore on O*NET", url: onet(search) }],
  };
}

const HS_APPRENTICE = "High school diploma plus an apprenticeship";
const BACHELORS = "Bachelor's degree";

export const careers: CatalogItem[] = [
  // Realistic
  job("electrician", "Electrician", "RCI", HS_APPRENTICE, "about $62,000", "Faster than average",
    "Installs and repairs wiring, lighting and power systems in homes, businesses and factories. Paid apprenticeships let you earn while you learn."),
  job("plumber", "Plumber", "RCI", HS_APPRENTICE, "about $63,000", "Average",
    "Installs and fixes the pipes and fixtures that bring water in and carry waste out. Steady demand, hands-on problem solving and a licensed trade."),
  job("hvac-technician", "HVAC technician", "RCI", "Postsecondary certificate or apprenticeship", "about $60,000", "Faster than average",
    "Installs and services heating, cooling and refrigeration systems. Part mechanic, part troubleshooter, often on the move between job sites.",
    "HVAC mechanic"),
  job("carpenter", "Carpenter", "RCE", "High school diploma plus an apprenticeship or on-the-job training", "about $58,000", "Average",
    "Builds and repairs frameworks, stairs, cabinets and other structures from wood and other materials. Many carpenters go on to run their own crews."),
  job("auto-technician", "Automotive service technician", "RIC", "Postsecondary certificate", "about $49,000", "Average",
    "Diagnoses and repairs cars and light trucks, more and more with computer diagnostics as well as wrenches."),
  job("aircraft-mechanic", "Aircraft mechanic", "RIC", "FAA-approved maintenance program", "about $78,000", "Average",
    "Inspects, maintains and repairs airplanes and helicopters to strict safety standards. Precise, high-stakes, hands-on work."),
  job("wind-turbine-technician", "Wind turbine technician", "RIC", "Postsecondary certificate", "about $62,000", "Faster than average",
    "Climbs, inspects and repairs wind turbines. Outdoor, physical work at height in one of the fastest-growing trades."),
  job("welder", "Welder", "RCI", "High school diploma plus technical training", "about $51,000", "Slower than average",
    "Joins and cuts metal for buildings, bridges, ships and machinery. Specialized welders, such as pipeline or underwater welders, can earn much more."),
  job("firefighter", "Firefighter", "RSE", "Postsecondary EMT training plus fire academy", "about $59,000", "Average",
    "Responds to fires, medical calls and rescues. Physical, team-based work for people who want their hands-on skills to protect others."),
  job("forester", "Forester or conservation scientist", "RIE", BACHELORS, "about $70,000", "Average",
    "Manages forests, parks and rangeland to keep land healthy and productive. Much of the work is outdoors, with planning and data back at the office.",
    "Forester"),
  job("vet-tech", "Veterinary technician", "RIS", "Associate degree", "about $46,000", "Faster than average",
    "Helps veterinarians examine, test and treat animals. Hands-on care with a science base and plenty of human contact, too.",
    "Veterinary technician"),
  job("civil-engineer", "Civil engineer", "RIC", BACHELORS, "about $99,000", "Faster than average",
    "Designs and oversees roads, bridges, water systems and buildings. Combines math and design with time on real construction sites."),
  job("pilot", "Airline or commercial pilot", "REC", "Flight training and FAA certificates; airlines often want a bachelor's", "about $198,000", "Average",
    "Flies passengers or cargo, or works in charter, survey or firefighting flights. Long training path, strong pay at major airlines.",
    "Airline pilot"),

  // Investigative
  job("software-developer", "Software developer", "ICR", BACHELORS, "about $133,000", "Faster than average",
    "Designs and builds the apps, systems and tools people use every day. Rewards logical thinking and patient debugging."),
  job("data-scientist", "Data scientist", "ICE", BACHELORS, "about $112,000", "Faster than average",
    "Uses statistics and code to find patterns in data and help organizations decide what to do next."),
  job("infosec-analyst", "Information security analyst", "ICR", BACHELORS, "about $125,000", "Faster than average",
    "Protects computer networks and data from attacks. Part detective, part engineer, in a field with very strong demand.",
    "Information security analyst"),
  job("medical-scientist", "Medical scientist", "IRS", "Doctoral or professional degree", "about $101,000", "Faster than average",
    "Researches diseases and tests new treatments, usually in universities, hospitals or drug companies."),
  job("chemist", "Chemist", "IRC", BACHELORS, "about $85,000", "Average",
    "Studies substances at the molecular level to create new materials, medicines and products, or to test their quality."),
  job("environmental-scientist", "Environmental scientist", "IRC", BACHELORS, "about $80,000", "Average",
    "Studies pollution, water, soil and ecosystems, then helps protect people and the environment. Mixes fieldwork with lab and data work."),
  job("wildlife-biologist", "Wildlife biologist", "IRA", BACHELORS, "about $73,000", "Slower than average",
    "Studies animals and their habitats, often outdoors, to guide conservation and wildlife management.",
    "Zoologist and wildlife biologist"),
  job("physician", "Physician", "ISR", "Medical degree plus residency", "about $240,000 or more", "Average",
    "Diagnoses and treats illness and injury. One of the longest training paths, with deep science and daily contact with patients."),
  job("veterinarian", "Veterinarian", "IRS", "Doctor of Veterinary Medicine (DVM)", "about $126,000", "Faster than average",
    "Diagnoses and treats animals, from pets to livestock. Medical problem solving plus working with worried owners."),
  job("pharmacist", "Pharmacist", "ICS", "Doctor of Pharmacy (PharmD)", "about $137,000", "Average",
    "Dispenses medicines and advises patients and doctors on safe use. Precise, science-heavy and people-facing."),
  job("psychologist", "Psychologist", "ISA", "Doctoral degree for most roles", "about $94,000", "Faster than average",
    "Studies how people think, feel and behave, and often uses that research to help clients or organizations."),
  job("mechanical-engineer", "Mechanical engineer", "IRC", BACHELORS, "about $102,000", "Faster than average",
    "Designs and tests machines, engines, tools and devices. A broad field that touches nearly every industry."),
  job("market-research-analyst", "Market research analyst", "IEC", BACHELORS, "about $77,000", "Faster than average",
    "Studies customers, competitors and trends so companies know what to sell and to whom. Data work with a business edge."),

  // Artistic
  job("graphic-designer", "Graphic designer", "AER", BACHELORS, "about $61,000", "Slower than average",
    "Creates logos, layouts, packaging and visuals that communicate an idea at a glance. Many work freelance."),
  job("writer", "Writer or author", "AIE", BACHELORS, "about $73,000", "Average",
    "Writes books, articles, scripts, copy or content. Income varies widely, and many writers combine several kinds of work.",
    "Writers and authors"),
  job("technical-writer", "Technical writer", "AIC", BACHELORS, "about $81,000", "Average",
    "Turns complex information into clear manuals, guides and help articles. A good fit for people who love both words and how things work."),
  job("musician", "Musician or singer", "AES", "No formal credential; years of practice", "about $40 per hour", "Slower than average",
    "Performs, records or composes music. Most build a career from several sources, such as gigs, teaching and session work.",
    "Musicians and singers"),
  job("actor", "Actor", "AES", "Some college or training; no set path", "about $23 per hour", "Average",
    "Performs in theater, film, TV, commercials and games. Work is often irregular, so many actors hold other jobs too."),
  job("photographer", "Photographer", "ARE", "High school diploma; skills and portfolio matter most", "about $42,000", "Average",
    "Captures images for clients, media, events or art. Many run their own business, so selling matters as much as shooting."),
  job("film-editor", "Film and video editor", "ARC", BACHELORS, "about $70,000", "Average",
    "Assembles raw footage into a finished story for film, TV, online video or ads. Patient, detailed and highly creative.",
    "Film and video editors"),
  job("interior-designer", "Interior designer", "AER", BACHELORS, "about $63,000", "Average",
    "Plans spaces that look good and work well, from homes to offices and hospitals. Combines taste, client skills and technical detail."),
  job("fashion-designer", "Fashion designer", "AER", BACHELORS, "about $80,000", "Average",
    "Designs clothing, shoes and accessories, from sketch to sample to production. Competitive, with many jobs in a few big cities."),
  job("architect", "Architect", "AIR", "Bachelor's degree (often 5 years) plus license", "about $96,000", "Average",
    "Designs buildings and the spaces around them, balancing beauty, function, budget and building codes."),
  job("animator", "Animator or special effects artist", "ARI", BACHELORS, "about $100,000", "Average",
    "Creates animation and visual effects for film, TV, games and ads. Artistic skill paired with serious software know-how.",
    "Special effects artists and animators"),
  job("web-designer", "Web and digital designer", "AIC", BACHELORS, "about $95,000", "Faster than average",
    "Designs websites and app interfaces that look good and are easy to use. Blends visual design with research and testing.",
    "Web and digital interface designers"),
  job("hairstylist", "Hairstylist or cosmetologist", "ASE", "Cosmetology program plus state license", "about $36,000", "Average",
    "Cuts, colors and styles hair and offers beauty services. Creative, social and often self-employed; tips add to pay.",
    "Hairdressers, hairstylists and cosmetologists"),

  // Social
  job("elementary-teacher", "Elementary school teacher", "SAC", "Bachelor's degree plus state license", "about $64,000", "Slower than average",
    "Teaches young children reading, math and much more, and helps them grow socially. Demand varies a lot by region and subject."),
  job("high-school-teacher", "High school teacher", "SAE", "Bachelor's degree plus state license", "about $66,000", "Slower than average",
    "Teaches a subject to teenagers and helps them prepare for life after school. Math, science and special education teachers are often in short supply."),
  job("special-ed-teacher", "Special education teacher", "SAI", "Bachelor's degree plus state license", "about $66,000", "Slower than average",
    "Adapts lessons for students with learning, emotional or physical disabilities. Many districts struggle to fill these roles.",
    "Special education teacher"),
  job("school-counselor", "School counselor", "SEA", "Master's degree", "about $65,000", "Average",
    "Helps students with academic plans, college and career choices, and personal challenges."),
  job("mental-health-counselor", "Mental health counselor", "SIA", "Master's degree plus license", "about $59,000", "Faster than average",
    "Helps people manage stress, mental health conditions and substance use. Strong, growing demand.",
    "Mental health counselor"),
  job("social-worker", "Social worker", "SIE", "Bachelor's degree; clinical roles need a master's", "about $62,000", "Faster than average",
    "Connects people with resources and support through hard times, in schools, hospitals, agencies and communities."),
  job("occupational-therapist", "Occupational therapist", "SIR", "Master's degree plus license", "about $99,000", "Faster than average",
    "Helps people recover or build the skills for daily life and work after injury, illness or disability."),
  job("physical-therapist", "Physical therapist", "SIR", "Doctor of Physical Therapy plus license", "about $101,000", "Faster than average",
    "Helps people move better and manage pain after injury or surgery. Hands-on, active and science-based."),
  job("speech-pathologist", "Speech-language pathologist", "SIA", "Master's degree plus license", "about $96,000", "Faster than average",
    "Helps children and adults with speech, language and swallowing problems, in schools, clinics and hospitals."),
  job("registered-nurse", "Registered nurse", "SIC", "Nursing degree (associate or bachelor's) plus license", "about $94,000", "Faster than average",
    "Cares for patients, gives treatments and coordinates with the medical team. Many specialties and settings to choose from."),
  job("physician-assistant", "Physician assistant", "SIR", "Master's degree plus license", "about $133,000", "Faster than average",
    "Examines, diagnoses and treats patients as part of a medical team. A shorter path into medicine than becoming a physician."),
  job("dental-hygienist", "Dental hygienist", "SRC", "Associate degree plus license", "about $94,000", "Faster than average",
    "Cleans teeth, takes X-rays and teaches patients how to care for their oral health. Strong pay for a two-year degree."),
  job("paramedic", "EMT or paramedic", "SRI", "Postsecondary certificate", "about $42,000", "Faster than average",
    "Responds to emergencies and gives medical care on the scene and on the way to the hospital.",
    "Paramedic"),
  job("fitness-trainer", "Fitness trainer", "SRE", "High school diploma plus certification", "about $47,000", "Faster than average",
    "Coaches individuals or groups through exercise programs. Many build a client base and work flexible hours.",
    "Fitness trainers and instructors"),

  // Enterprising
  job("sales-manager", "Sales manager", "ECS", "Bachelor's degree plus experience", "about $138,000", "Average",
    "Leads a sales team, sets goals and builds key customer relationships. Pay often rises with results."),
  job("marketing-manager", "Marketing manager", "EAC", "Bachelor's degree plus experience", "about $161,000", "Faster than average",
    "Plans how a company reaches customers, from research to campaigns. Mixes creativity, data and leadership."),
  job("lawyer", "Lawyer", "EIS", "Law degree (JD) plus bar exam", "about $151,000", "Average",
    "Advises clients and argues for them in negotiations or in court. Heavy reading and writing, high stakes, wide range of specialties."),
  job("real-estate-agent", "Real estate agent", "ECS", "High school diploma plus state license", "about $56,000", "Slower than average",
    "Helps people buy, sell and rent property. Mostly commission-based, so income depends on hustle and the local market.",
    "Real estate sales agent"),
  job("management-analyst", "Management consultant", "EIC", BACHELORS, "about $101,000", "Faster than average",
    "Studies how organizations work and recommends ways to run them better. Analytical, persuasive and often project-based.",
    "Management analyst"),
  job("health-services-manager", "Health services manager", "ECS", BACHELORS, "about $118,000", "Faster than average",
    "Runs hospital departments, clinics or practices, keeping care, staff and budgets on track.",
    "Medical and health services manager"),
  job("food-service-manager", "Restaurant or food service manager", "ECR", "High school diploma plus experience", "about $66,000", "Average",
    "Keeps a restaurant or cafeteria running: staff, suppliers, budgets and happy guests. A fast-paced path you can start from an entry-level job.",
    "Food service manager"),
  job("event-planner", "Event planner", "ECS", BACHELORS, "about $59,000", "Faster than average",
    "Plans conferences, weddings and other events, juggling vendors, budgets and timelines.",
    "Meeting, convention and event planner"),
  job("chef", "Chef or head cook", "ERA", "High school diploma plus experience; culinary school helps", "about $60,000", "Faster than average",
    "Creates menus, runs a kitchen team and keeps food quality high. Creative, physical and fast-paced.",
    "Chefs and head cooks"),
  job("construction-manager", "Construction manager", "ERC", BACHELORS, "about $106,000", "Faster than average",
    "Plans and runs building projects from start to finish, coordinating crews, budgets and schedules."),
  job("financial-advisor", "Personal financial advisor", "ECS", BACHELORS, "about $102,000", "Faster than average",
    "Helps people plan for goals like buying a home, paying for school and retiring. Relationship-building matters as much as numbers.",
    "Personal financial advisor"),
  job("pr-specialist", "Public relations specialist", "EAS", BACHELORS, "about $69,000", "Average",
    "Shapes how the public sees a person, company or cause through media, events and messaging.",
    "Public relations specialist"),
  job("hr-specialist", "Human resources specialist", "ESC", BACHELORS, "about $72,000", "Average",
    "Recruits, hires and supports employees, and helps an organization treat people fairly.",
    "Human resources specialist"),

  // Conventional
  job("accountant", "Accountant", "CEI", BACHELORS, "about $82,000", "Faster than average",
    "Prepares and checks financial records and taxes for people and organizations. Steady demand and a clear path to certification (CPA)."),
  job("bookkeeper", "Bookkeeper", "CEI", "Some college; on-the-job training", "about $50,000", "Slower than average",
    "Records transactions and keeps a business's books in order. Software is changing the role, so tech skills help.",
    "Bookkeeping, accounting and auditing clerks"),
  job("financial-analyst", "Financial analyst", "CIE", BACHELORS, "about $102,000", "Faster than average",
    "Studies financial data to guide investment and business decisions. Precise, analytical work with real money at stake."),
  job("actuary", "Actuary", "CIE", "Bachelor's degree plus professional exams", "about $126,000", "Faster than average",
    "Uses math and statistics to measure risk for insurers, pension plans and businesses. A long exam path with excellent pay."),
  job("paralegal", "Paralegal", "CEI", "Associate degree or certificate", "about $62,000", "Slower than average",
    "Researches, drafts and organizes legal documents for lawyers. A way into law without law school.",
    "Paralegals and legal assistants"),
  job("medical-records-specialist", "Medical records specialist", "CIS", "Postsecondary certificate", "about $51,000", "Faster than average",
    "Organizes and codes patient health information for care, billing and research. Detail work behind the scenes of healthcare.",
    "Medical records specialist"),
  job("logistician", "Logistician", "CEI", BACHELORS, "about $81,000", "Faster than average",
    "Plans how goods move from suppliers to customers, keeping supply chains on time and on budget."),
  job("database-administrator", "Database administrator or architect", "CIR", BACHELORS, "about $123,000", "Faster than average",
    "Organizes, secures and maintains the databases organizations depend on. Careful, technical and in demand.",
    "Database administrator"),
  job("computer-support-specialist", "Computer support specialist", "CRI", "Certificate, associate degree or some college", "about $61,000", "Average",
    "Helps people and companies solve computer and network problems. A common entry point into an IT career.",
    "Computer user support specialist"),
  job("pharmacy-technician", "Pharmacy technician", "CRS", "High school diploma plus training; certification", "about $44,000", "Faster than average",
    "Measures, packages and labels medicines and helps pharmacists serve customers. A quick entry into healthcare."),
  job("administrative-assistant", "Administrative assistant", "CES", "High school diploma", "about $47,000", "Slower than average",
    "Keeps an office running: schedules, documents, communication and records. Skills transfer to almost any industry.",
    "Secretaries and administrative assistants"),
  job("air-traffic-controller", "Air traffic controller", "CRE", "Associate degree or FAA academy training", "about $144,000", "Slower than average",
    "Directs aircraft safely through the skies and on runways. Intense focus, strict procedures and excellent pay."),
];
