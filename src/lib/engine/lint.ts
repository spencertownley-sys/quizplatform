import { scaleOf } from "./score";
import { scaleMax, scaleStart } from "./scales";
import type { QuizDefinition } from "./types";

/** Names we must not use anywhere a taker can see (trademarks and licensed IP). */
const BANNED = [
  /hogwarts/i, /harry potter/i, /gryffindor/i, /slytherin/i, /hufflepuff/i, /ravenclaw/i, /patronus/i,
  /\bmbti\b/i, /myers[- ]briggs/i, /16 ?personalities/i, /cliftonstrengths/i, /strengthsfinder/i,
  /\b(5|five) love languages\b/i, /disney/i, /pok[eé]mon/i, /everything disc/i,
];

const TOP_MODE = (q: QuizDefinition) =>
  !q.bands &&
  (["trait_profile", "persona_match", "compare"].includes(q.structure) ||
    (q.structure === "typology" && (q.typology?.mode ?? "highest") === "highest") ||
    (q.structure === "recommender" && q.recommender?.outcome === "top_dimension"));

/** Every visible string in a quiz, with a path for error messages. SEO keywords are internal and skipped. */
function* strings(value: unknown, path: string): Generator<[string, string]> {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`);
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (path === "seo" && k === "keywords") continue;
      if (k === "reviewNotes") continue;
      yield* strings(v, path ? `${path}.${k}` : k);
    }
  }
}

/** Content and config checks run in tests for every quiz definition. Returns problems; empty means clean. */
export function lintQuiz(quiz: QuizDefinition): string[] {
  const problems: string[] = [];
  const p = (msg: string) => problems.push(msg);
  const dimKeys = new Set(quiz.dimensions.map((d) => d.key));
  const facetKeys = new Map((quiz.facets ?? []).map((f) => [f.key, f.dimension]));
  const outcomeKeys = new Set(quiz.outcomes.map((o) => o.key));
  const outcomeDims = quiz.outcomeDimensions ?? quiz.dimensions.map((d) => d.key);
  const free = quiz.isScreener || quiz.sellsReports === false;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(quiz.slug)) p("slug must be kebab-case");
  if (outcomeKeys.size !== quiz.outcomes.length) p("duplicate outcome keys");
  for (const k of outcomeDims) if (!dimKeys.has(k)) p(`outcomeDimensions has unknown dimension ${k}`);
  for (const f of quiz.facets ?? []) if (!dimKeys.has(f.dimension)) p(`facet ${f.key} has unknown dimension ${f.dimension}`);

  // Questions
  const ids = new Set<string>();
  let scoredItems = 0;
  let attention = 0;
  for (const q of quiz.questions) {
    if (ids.has(q.id)) p(`duplicate question id ${q.id}`);
    ids.add(q.id);
    const words = q.text.trim().split(/\s+/).length;
    if (words > 25 && !quiz.isScreener) p(`${q.id} is ${words} words; keep items under 20`);
    switch (q.kind) {
      case "likert": {
        if (!dimKeys.has(q.dimension)) p(`${q.id} unknown dimension ${q.dimension}`);
        if (q.facet && facetKeys.get(q.facet) !== q.dimension) p(`${q.id} facet ${q.facet} is not under ${q.dimension}`);
        const s = scaleOf(quiz, q);
        if (s.labels.length < 2) p(`${q.id} scale needs at least 2 labels`);
        if (q.threshold !== undefined && (q.threshold < scaleStart(s) || q.threshold > scaleMax(s))) p(`${q.id} threshold off the scale`);
        if (q.scored !== false) scoredItems++;
        break;
      }
      case "choice":
      case "multi": {
        if (q.options.length < 2) p(`${q.id} needs at least 2 options`);
        const oids = new Set(q.options.map((o) => o.id));
        if (oids.size !== q.options.length) p(`${q.id} has duplicate option ids`);
        for (const o of q.options) {
          if (Object.keys(o.weights).length === 0 && quiz.structure !== "recommender") p(`${q.id}/${o.id} has no weights`);
          for (const k of Object.keys(o.weights)) if (!dimKeys.has(k)) p(`${q.id}/${o.id} unknown dimension ${k}`);
        }
        if (q.kind === "choice" && q.display === "tiles" && q.options.some((o) => !o.emoji)) p(`${q.id} tiles need an emoji on every option`);
        scoredItems++;
        break;
      }
      case "ability":
        if (!dimKeys.has(q.dimension)) p(`${q.id} unknown dimension ${q.dimension}`);
        if (q.options.length < 3) p(`${q.id} needs at least 3 options`);
        if (!q.options.some((o) => o.id === q.correct)) p(`${q.id} correct option ${q.correct} missing`);
        if (!q.explanation.trim()) p(`${q.id} needs an explanation`);
        if (q.figure && q.figure.cells.length !== 9) p(`${q.id} matrix needs 9 cells`);
        scoredItems++;
        break;
      case "attention":
        attention++;
        {
          const s = scaleOf(quiz);
          if (q.expect < scaleStart(s) || q.expect > scaleMax(s)) p(`${q.id} expects a value off the scale`);
        }
        break;
    }
  }
  if (scoredItems > 40 && !quiz.isScreener && attention === 0) p("quizzes over 40 items need one attention check");

  // Reverse keying: about a third of trait items, at least 20%, so yes-saying doesn't produce a result.
  // Only agree/disagree items can be reverse-worded; vividness or frequency ratings can't.
  if (["trait_profile", "two_axis_quadrant", "typology", "compare"].includes(quiz.structure) && !quiz.isScreener) {
    const likert = quiz.questions.filter((q) => q.kind === "likert" && scaleOf(quiz, q).labels.some((l) => /agree/i.test(l)));
    const reversed = likert.filter((q) => q.kind === "likert" && q.reverse).length;
    if (likert.length >= 8 && reversed / likert.length < 0.2) p(`only ${reversed}/${likert.length} items are reverse-keyed (need ≥20%)`);
  }

  // Outcomes reachable from the scoring config
  if (TOP_MODE(quiz)) for (const k of outcomeDims) if (!outcomeKeys.has(k)) p(`no outcome for dimension ${k}`);
  if (quiz.bands) {
    for (const b of quiz.bands.bands) if (!outcomeKeys.has(b.outcome)) p(`band maps to missing outcome ${b.outcome}`);
    if (!quiz.bands.bands.some((b) => b.min <= 0)) p("lowest band must start at 0 or below");
    const on = quiz.bands.on;
    if (typeof on === "object" && !dimKeys.has(on.dimension)) p(`bands use unknown dimension ${on.dimension}`);
  }
  if (quiz.structure === "two_axis_quadrant") {
    if (!quiz.quadrant) p("two_axis_quadrant needs quadrant config");
    else {
      for (const k of [quiz.quadrant.x, quiz.quadrant.y]) if (!dimKeys.has(k)) p(`quadrant uses unknown dimension ${k}`);
      for (const k of Object.values(quiz.quadrant.map)) if (!outcomeKeys.has(k)) p(`quadrant maps to missing outcome ${k}`);
    }
  }
  if (quiz.structure === "typology" && quiz.typology?.mode === "axes") {
    const axes = quiz.typology.axes ?? [];
    let combos = [""];
    for (const ax of axes) {
      if (!dimKeys.has(ax.dimension)) p(`axis uses unknown dimension ${ax.dimension}`);
      combos = combos.flatMap((c) => [c + ax.low, c + ax.high]);
    }
    for (const c of combos) if (!outcomeKeys.has(c.toLowerCase())) p(`no outcome for type ${c}`);
  }
  if (["ability", "screener", "performance"].includes(quiz.structure) && !quiz.bands) p(`${quiz.structure} needs bands`);
  if (quiz.structure === "performance") {
    if (!quiz.performance) p("performance needs a performance config");
    if (!dimKeys.has("speed")) p("performance quizzes need a 'speed' dimension");
  }
  if (quiz.structure === "recommender") {
    const r = quiz.recommender;
    if (!r || r.catalog.length === 0) p("recommender needs a catalog");
    else {
      const keys = new Set<string>();
      for (const item of r.catalog) {
        if (keys.has(item.key)) p(`duplicate catalog key ${item.key}`);
        keys.add(item.key);
        for (const d of Object.keys(item.profile)) if (!dimKeys.has(d)) p(`catalog ${item.key} unknown dimension ${d}`);
        if (r.outcome === "top_item" && !outcomeKeys.has(item.key)) p(`no outcome for catalog item ${item.key}`);
      }
    }
  }
  if (quiz.structure === "chart" && !quiz.chart) p("chart needs a chart config");
  for (const ex of quiz.extras ?? []) {
    if (ex.kind === "top_of") for (const d of ex.dimensions) if (!dimKeys.has(d)) p(`extra ${ex.key} unknown dimension ${d}`);
    if (ex.kind === "pole" && !dimKeys.has(ex.dimension)) p(`extra ${ex.key} unknown dimension ${ex.dimension}`);
    if (ex.kind === "code") for (const d of Object.keys(ex.letters)) if (!dimKeys.has(d)) p(`extra ${ex.key} unknown dimension ${d}`);
  }
  if (quiz.compare) for (const k of Object.keys(quiz.compare.dimensions)) if (!dimKeys.has(k)) p(`compare copy for unknown dimension ${k}`);

  // Screeners: free, unchanged, sourced
  if (quiz.isScreener) {
    if (quiz.paywall !== "free_headline") p("screeners must not be paywalled");
    if (quiz.sellsReports !== false) p("screeners must set sellsReports: false");
    if (!quiz.screener?.source) p("screeners need a source citation");
  }

  // Content completeness
  for (const o of quiz.outcomes) {
    const where = `outcome ${o.key}`;
    if (!o.name.trim() || !o.tagline.trim() || !o.summary.trim()) p(`${where} needs name, tagline and summary`);
    if (o.about.trim().split(/\s+/).length < 80) p(`${where} about text is under 80 words`);
    if (!free) {
      if (o.snapshot.length < 3) p(`${where} needs at least 3 snapshot points`);
      if (o.deep.length < 3) p(`${where} needs at least 3 deep sections`);
      for (const s of o.deep) if (!s.title.trim() || !s.teaser.trim() || s.body.trim().split(/\s+/).length < 60) p(`${where} section "${s.title}" is incomplete (body under 60 words)`);
    }
  }
  if (!quiz.method.trim()) p("method text missing");
  if (quiz.seo.faqs.length < 3) p("need at least 3 FAQs");
  for (const k of ["intro", "measures", "origin"] as const) if (!quiz.seo[k].trim()) p(`seo.${k} missing`);

  for (const [path, s] of strings(quiz, "")) {
    if (/\bTODO\b/.test(s)) p(`${path} still has TODO`);
    for (const re of BANNED) if (re.test(s)) p(`${path} uses a trademarked or licensed name (${re.source})`);
  }
  return problems;
}
