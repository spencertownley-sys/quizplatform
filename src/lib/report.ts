import { CITIES } from "./engine/cities";
import { type Level, levelOf, scaleOf } from "./engine/score";
import { scaleStart } from "./engine/scales";
import type { Answers, CatalogItem, MatrixFigure, FigureShape, Outcome, QuizDefinition, ReportSection, ScoreResult } from "./engine/types";
import type { Norms } from "./norms";
import { type AccessLevel, atLeast } from "./products";

/**
 * Builds what a viewer at a given access level may see. Anything above their
 * level is left out of the model entirely (never blurred-but-present), so paid
 * text can't be read from the page source.
 */

export interface DimLine {
  key: string;
  label: string;
  low?: string;
  high?: string;
  description?: string;
  /** 0–100. Placeholder values when locked (the preview bars are decorative). */
  pct: number;
  level: Level;
  /** First sentence of the band text (Snapshot). */
  first?: string;
  /** Full band text (Deep Report). */
  full?: string;
  percentile?: number;
  facets?: DimLine[];
}

export interface ReportModel {
  quiz: Pick<QuizDefinition, "slug" | "title" | "structure" | "category" | "disclaimer"> & { method?: string };
  /** False when the quiz runs a full paywall and the viewer hasn't paid: even the headline is withheld. */
  headlineVisible: boolean;
  outcome: Pick<Outcome, "key" | "name" | "tagline" | "emoji" | "summary">;
  level: AccessLevel;
  locked: boolean;
  dims: DimLine[];
  snapshot: string[];
  /** Paywall preview: one real, personalized line from the band text of the taker's strongest dimension. */
  previewLine?: { label: string; text: string };
  extras: { key: string; label: string; value: string; block?: { title: string; body: string } }[];
  runnerUp?: { key: string; name: string; summary?: string };
  ranking?: { key: string; name: string; pct: number }[];
  confidence?: number;
  matches?: { key: string; name: string; pct: number; blurb?: string; facts?: Record<string, string>; colors?: string[]; links?: CatalogItem["links"] }[];
  review?: {
    id: string;
    text: string;
    figure?: MatrixFigure;
    options: { id: string; label: string; figure?: FigureShape[] }[];
    chosen: string | null;
    correct: string;
    right: boolean;
    explanation: string;
  }[];
  ability?: { correct: number; answered: number; total: number; accuracy: number };
  quadrant?: { x: number; y: number; exact: boolean; cutoff: number; xLabel: string; yLabel: string; corners: Record<string, string>; outcomeCorner: string };
  chart?: { body: string; sign: string; degree?: number }[];
  chartNote?: string;
  screener?: { total: number; max: number; risk: boolean; source: string };
  performance?: { median: number; best: number; valid: number; trials: number[] };
  /** Deep sections: titles + teasers for everyone; bodies only at Deep. */
  deep: (Pick<ReportSection, "title" | "teaser"> & { body?: string })[];
  norms: Norms | null;
  flags: string[];
}

const SENTENCE = /^[\s\S]*?[.!?](?=\s|$)/;
export const firstSentence = (text: string) => (text.match(SENTENCE)?.[0] ?? text).trim();
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Decorative, stable bar widths for locked previews. */
const placeholderPct = (i: number) => [62, 41, 77, 55, 48, 70, 36, 58, 66, 44, 52, 60][i % 12];

export function buildReport(args: {
  quiz: QuizDefinition;
  scores: ScoreResult;
  answers: Answers;
  level: AccessLevel;
  paywall: "free_headline" | "full";
  norms: Norms | null;
  /** Deep sections given away in the preview (experiment "preview_depth": first full section). */
  freeSections?: number;
}): ReportModel {
  const { quiz, scores, answers, norms } = args;
  const free = quiz.isScreener || quiz.sellsReports === false;
  // Free tools show everything they have; there's nothing to buy.
  const level: AccessLevel = free ? "deep" : args.level;
  const snap = atLeast(level, "snapshot");
  const deep = atLeast(level, "deep");
  const headlineVisible = args.paywall === "free_headline" || snap;

  const outcome = quiz.outcomes.find((o) => o.key === scores.outcomeKey) ?? quiz.outcomes[0];
  const outcomeName = (key: string) => quiz.outcomes.find((o) => o.key === key)?.name ?? cap(key);
  const dimLabel = (key: string) => quiz.dimensions.find((d) => d.key === key)?.label ?? key;

  const dims: DimLine[] = quiz.dimensions
    .filter((d) => scores.dimensions[d.key])
    .map((d, i) => {
      const n = scores.dimensions[d.key].normalized;
      const lvl = levelOf(n);
      const text = d.report?.[lvl];
      const facets = (quiz.facets ?? [])
        .filter((f) => f.dimension === d.key && scores.facets?.[f.key])
        .map((f, j) => {
          const fn = scores.facets![f.key].normalized;
          const fl = levelOf(fn);
          return {
            key: f.key,
            label: f.label,
            pct: snap ? Math.round(fn * 100) : placeholderPct(i + j),
            level: fl,
            ...(deep && f.report ? { full: f.report[fl] } : {}),
          };
        });
      return {
        key: d.key,
        label: d.label,
        low: d.low,
        high: d.high,
        description: d.description,
        pct: snap ? Math.round(n * 100) : placeholderPct(i),
        level: snap ? lvl : "mid",
        ...(snap && text ? { first: firstSentence(text) } : {}),
        ...(deep && text ? { full: text } : {}),
        ...(snap && norms?.percentiles[d.key] !== undefined ? { percentile: norms.percentiles[d.key] } : {}),
        ...(facets.length && deep ? { facets } : {}),
      };
    });

  // One real, personalized line for the paywall preview (strongest dimension's band text).
  const top = [...quiz.dimensions]
    .filter((d) => d.report && scores.dimensions[d.key])
    .sort((a, b) => scores.dimensions[b.key].normalized - scores.dimensions[a.key].normalized)[0];
  const previewLine =
    !snap && top?.report && headlineVisible
      ? { label: top.label, text: firstSentence(top.report[levelOf(scores.dimensions[top.key].normalized)]) }
      : undefined;

  const extras: ReportModel["extras"] = [];
  if (snap) {
    for (const ex of quiz.extras ?? []) {
      const raw = scores.extras?.[ex.key];
      if (raw === undefined || raw === "") continue;
      const value = String(raw);
      const display = ex.kind === "wing" || ex.kind === "top_of" ? dimLabel(value) : value;
      const blocks = quiz.extraBlocks?.[ex.key];
      const block = deep ? (blocks?.[`${outcome.key}:${value}`] ?? blocks?.[value]) : undefined;
      extras.push({ key: ex.key, label: ex.label, value: display, ...(block ? { block } : {}) });
    }
  }

  const model: ReportModel = {
    quiz: {
      slug: quiz.slug,
      title: quiz.title,
      structure: quiz.structure,
      category: quiz.category,
      disclaimer: quiz.disclaimer,
      ...(deep ? { method: quiz.method } : {}),
    },
    headlineVisible,
    outcome: headlineVisible
      ? { key: outcome.key, name: outcome.name, tagline: outcome.tagline, emoji: outcome.emoji, summary: outcome.summary }
      : { key: "", name: "Your result is ready", tagline: "", summary: "" },
    level,
    locked: !free && !deep,
    dims: headlineVisible ? dims : [],
    snapshot: snap ? outcome.snapshot : [],
    previewLine,
    extras,
    deep: headlineVisible ? outcome.deep.map((s, i) => ({ title: s.title, teaser: s.teaser, ...(deep || i < (args.freeSections ?? 0) ? { body: s.body } : {}) })) : [],
    norms: snap ? norms : null,
    flags: scores.flags ?? [],
  };

  switch (quiz.structure) {
    case "typology":
    case "persona_match":
    case "trait_profile":
    case "compare": {
      // Persona quizzes name the runner-up ("secondary house") on the free result; the % breakdown is Snapshot.
      if (!snap && headlineVisible && quiz.structure === "persona_match" && !quiz.bands && scores.ranking.length > 1) {
        const ro = quiz.outcomes.find((o) => o.key === scores.ranking[1].key);
        if (ro) model.runnerUp = { key: ro.key, name: ro.name };
      }
      if (snap && scores.ranking.length > 1 && !quiz.bands) {
        const ru = scores.ranking[1];
        const ro = quiz.outcomes.find((o) => o.key === ru.key);
        if (ro) model.runnerUp = { key: ro.key, name: ro.name, ...(deep ? { summary: ro.summary } : {}) };
        if (quiz.typology?.mode !== "axes") {
          model.ranking = scores.ranking.map((r) => ({ key: r.key, name: outcomeName(r.key), pct: Math.round(r.score * 100) }));
        }
        if (scores.confidence !== undefined) model.confidence = Math.round(scores.confidence * 100);
      }
      break;
    }
    case "two_axis_quadrant": {
      const q = quiz.quadrant!;
      model.quadrant = {
        x: snap ? Math.round(scores.dimensions[q.x].normalized * 100) : 0,
        y: snap ? Math.round(scores.dimensions[q.y].normalized * 100) : 0,
        exact: snap,
        cutoff: Math.round(q.cutoff * 100),
        xLabel: dimLabel(q.x),
        yLabel: dimLabel(q.y),
        corners: Object.fromEntries(Object.entries(q.map).map(([corner, key]) => [corner, outcomeName(key)])),
        outcomeCorner: headlineVisible ? (Object.entries(q.map).find(([, key]) => key === outcome.key)?.[0] ?? "") : "",
      };
      if (snap && scores.confidence !== undefined) model.confidence = Math.round(scores.confidence * 100);
      break;
    }
    case "ability": {
      const ex = scores.extras ?? {};
      if (snap) model.ability = { correct: Number(ex.correct), answered: Number(ex.answered), total: Number(ex.total), accuracy: Number(ex.accuracy) };
      if (deep) {
        model.review = quiz.questions.flatMap((q) =>
          q.kind === "ability"
            ? [
                {
                  id: q.id,
                  text: q.text,
                  ...(q.figure ? { figure: q.figure } : {}),
                  options: q.options,
                  chosen: typeof answers[q.id] === "string" ? (answers[q.id] as string) : null,
                  correct: q.correct,
                  right: !!scores.items?.[q.id],
                  explanation: q.explanation,
                },
              ]
            : [],
        );
      }
      break;
    }
    case "recommender": {
      const cfg = quiz.recommender!;
      const size = deep ? Math.max(cfg.listSize ?? 10, 10) : snap ? 5 : 1;
      const showTop = headlineVisible;
      model.matches = showTop
        ? (scores.matches ?? []).slice(0, size).flatMap((m) => {
            const item = cfg.catalog.find((c) => c.key === m.key);
            if (!item) return [];
            return [
              {
                key: item.key,
                name: item.name,
                pct: Math.round(m.score * 100),
                ...(snap ? { blurb: item.blurb, facts: item.facts } : {}),
                ...(item.colors ? { colors: item.colors } : {}),
                ...(deep ? { links: item.links } : {}),
              },
            ];
          })
        : [];
      if (snap && cfg.outcome === "top_dimension") {
        model.ranking = scores.ranking.map((r) => ({ key: r.key, name: dimLabel(r.key), pct: Math.round(r.score * 100) }));
      }
      break;
    }
    case "screener": {
      const scored = quiz.questions.filter((q) => q.kind === "likert" && q.scored !== false);
      const max =
        quiz.bands?.on === "count_at_threshold"
          ? scored.filter((q) => q.kind === "likert" && q.threshold !== undefined).length
          : scored.reduce((s, q) => {
              if (q.kind !== "likert") return s;
              const sc = scaleOf(quiz, q);
              return s + scaleStart(sc) + sc.labels.length - 1;
            }, 0);
      model.screener = { total: scores.total ?? 0, max, risk: (scores.flags ?? []).includes("risk_item"), source: quiz.screener?.source ?? "" };
      model.dims = [];
      break;
    }
    case "performance": {
      const trials = Object.keys(answers)
        .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
        .map((k) => Number(answers[k]));
      model.performance = { median: scores.total ?? 0, best: Number(scores.extras?.best ?? 0), valid: Number(scores.extras?.validTrials ?? 0), trials };
      break;
    }
    case "chart": {
      const placements = scores.chart ?? {};
      const order = ["sun", "moon", "rising", "mercury", "venus", "mars", "jupiter", "saturn"];
      const bigThree = ["sun", "moon", "rising"];
      model.chart = order
        .filter((b) => placements[b] && (snap || bigThree.includes(b)))
        .map((b) => ({ body: b, sign: placements[b].sign, ...(snap ? { degree: placements[b].degree } : {}) }));
      const notes = [];
      if (!scores.extras?.timeKnown) notes.push("Without a birth time, the rising sign can't be calculated.");
      if (scores.extras?.moonUncertain) notes.push("The Moon changed signs on your birth date, so your Moon sign depends on your birth time.");
      if (scores.extras?.place) notes.push(`Calculated for ${scores.extras.place}.`);
      model.chartNote = notes.join(" ");
      if (deep) {
        for (const body of ["moon", "rising"]) {
          const sign = placements[body]?.sign;
          const block = sign ? quiz.extraBlocks?.[body]?.[sign] : undefined;
          if (block) model.extras.push({ key: body, label: cap(body), value: cap(sign!), block });
        }
      }
      break;
    }
  }
  return model;
}

/** Plain text of the free result, for emails and share descriptions. */
export const cityLabel = (id: string) => {
  const c = CITIES.find((x) => x.id === id);
  return c ? `${c.name}, ${c.country}` : id;
};
