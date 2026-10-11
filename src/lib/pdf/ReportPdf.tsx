import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReportModel } from "../report";
import { richBlocks } from "../richtext";

/** Built-in PDF fonts only cover Latin-1 plus a few typographic marks; drop emoji, map common symbols. */
const KEEP = /[ -~ -ÿ–—‘’“”•…€™]/;
export function pdfSafe(s: string): string {
  return [...s.replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/→/g, "->").replace(/×/g, "x").replace(/−/g, "-")]
    .filter((ch) => KEEP.test(ch) || ch === "\n")
    .join("")
    .replace(/[ \t]{2,}/g, " ");
}

const ink = "#1d1a17";
const muted = "#6f675e";
const line = "#e6dfd4";
const accent = "#3f5bd8";

const s = StyleSheet.create({
  page: { padding: 48, fontSize: 10.5, fontFamily: "Helvetica", color: ink, lineHeight: 1.45 },
  brand: { fontSize: 9, color: muted, textTransform: "uppercase", letterSpacing: 1 },
  title: { fontSize: 28, fontFamily: "Times-Roman", marginTop: 6 },
  h2: { fontSize: 16, fontFamily: "Times-Roman", marginTop: 18, marginBottom: 6 },
  h3: { fontSize: 11.5, fontFamily: "Helvetica-Bold", marginTop: 10, marginBottom: 3 },
  muted: { color: muted },
  p: { marginBottom: 6 },
  bullet: { flexDirection: "row", marginBottom: 3 },
  dot: { width: 10 },
  barTrack: { height: 6, backgroundColor: line, borderRadius: 3, marginTop: 3 },
  barFill: { height: 6, backgroundColor: accent, borderRadius: 3 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  footer: { position: "absolute", bottom: 24, left: 48, right: 48, fontSize: 8, color: muted, flexDirection: "row", justifyContent: "space-between" },
  box: { borderWidth: 1, borderColor: line, borderRadius: 6, padding: 10, marginTop: 8 },
  swatch: { width: 18, height: 18, marginRight: 4, borderRadius: 3 },
});

function Rich({ text }: { text: string }) {
  return (
    <View>
      {richBlocks(text).map((b, i) =>
        b.type === "ul" ? (
          <View key={i} style={{ marginBottom: 6 }}>
            {b.items.map((item, j) => (
              <View key={j} style={s.bullet}>
                <Text style={s.dot}>•</Text>
                <Text style={{ flex: 1 }}>{pdfSafe(item)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text key={i} style={s.p}>
            {pdfSafe(b.text)}
          </Text>
        ),
      )}
    </View>
  );
}

function Bar({ label, pct, low, high, note }: { label: string; pct: number; low?: string; high?: string; note?: string }) {
  return (
    <View style={{ marginBottom: 8 }} wrap={false}>
      <View style={s.row}>
        <Text>{pdfSafe(label)}</Text>
        <Text>
          {pct}%{note ? `  ·  ${note}` : ""}
        </Text>
      </View>
      <View style={s.barTrack}>
        <View style={[s.barFill, { width: `${Math.max(2, pct)}%` }]} />
      </View>
      {(low || high) && (
        <View style={s.row}>
          <Text style={[s.muted, { fontSize: 8 }]}>{pdfSafe(low ?? "")}</Text>
          <Text style={[s.muted, { fontSize: 8 }]}>{pdfSafe(high ?? "")}</Text>
        </View>
      )}
    </View>
  );
}

export function ReportPdf({ model, brand, date, certificateName }: { model: ReportModel; brand: string; date: string; certificateName?: string }) {
  const deep = model.level === "deep";
  const footer = (
    <View style={s.footer} fixed>
      <Text>{pdfSafe(`${brand} · ${model.quiz.title}`)}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );

  return (
    <Document title={pdfSafe(`${model.quiz.title}: ${model.outcome.name}`)} author={brand}>
      <Page size="LETTER" style={s.page}>
        <Text style={s.brand}>{pdfSafe(`${brand} · ${deep ? "Deep Report" : "Snapshot"}`)}</Text>
        <Text style={[s.muted, { marginTop: 18 }]}>{pdfSafe(model.quiz.title)}</Text>
        <Text style={s.title}>{pdfSafe(model.outcome.name)}</Text>
        {model.outcome.tagline ? <Text style={[s.muted, { fontSize: 12, marginTop: 2 }]}>{pdfSafe(model.outcome.tagline)}</Text> : null}
        <Text style={{ marginTop: 14, fontSize: 12 }}>{pdfSafe(model.outcome.summary)}</Text>
        <Text style={[s.muted, { marginTop: 8, fontSize: 9 }]}>Prepared {date}</Text>

        {model.screener && (
          <View style={s.box}>
            <Text>
              Score: {model.screener.total} of {model.screener.max}
            </Text>
            <Text style={[s.muted, { fontSize: 9 }]}>{pdfSafe(model.screener.source)}</Text>
          </View>
        )}

        {model.dims.length > 0 && (
          <>
            <Text style={s.h2}>Your scores</Text>
            {model.dims.map((d) => (
              <View key={d.key}>
                <Bar label={d.label} pct={d.pct} low={d.low} high={d.high} note={d.percentile !== undefined ? `higher than ${d.percentile}% of takers` : undefined} />
                {d.full ? <Rich text={d.full} /> : d.first ? <Text style={s.p}>{pdfSafe(d.first)}</Text> : null}
                {d.facets?.map((f) => (
                  <View key={f.key} style={{ marginLeft: 12 }}>
                    <Bar label={f.label} pct={f.pct} />
                    {f.full ? <Text style={[s.p, s.muted]}>{pdfSafe(f.full)}</Text> : null}
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {model.quadrant && (
          <View style={s.box}>
            <Text>
              {pdfSafe(`${model.quadrant.xLabel}: ${model.quadrant.x}%   ·   ${model.quadrant.yLabel}: ${model.quadrant.y}%`)}
            </Text>
            <Text style={s.muted}>Cutoff between low and high: {model.quadrant.cutoff}%</Text>
          </View>
        )}

        {model.ability && (
          <View style={s.box}>
            <Text>
              {model.ability.correct} of {model.ability.total} correct ({model.ability.answered} answered). Difficulty-weighted accuracy {model.ability.accuracy}%.
            </Text>
            {model.norms?.estimate && (
              <Text>
                Estimated score {model.norms.estimate.score} (likely range {model.norms.estimate.low}–{model.norms.estimate.high}), compared with{" "}
                {model.norms.takers.toLocaleString("en-US")} takers. Not a clinical IQ.
              </Text>
            )}
          </View>
        )}

        {model.chart && (
          <>
            <Text style={s.h2}>Your chart</Text>
            {model.chart.map((c) => (
              <Text key={c.body}>{pdfSafe(`${cap(c.body)}: ${cap(c.sign)}${c.degree !== undefined ? ` ${c.degree}°` : ""}`)}</Text>
            ))}
            {model.chartNote ? <Text style={[s.muted, { marginTop: 4 }]}>{pdfSafe(model.chartNote)}</Text> : null}
          </>
        )}

        {model.snapshot.length > 0 && (
          <>
            <Text style={s.h2}>Key points</Text>
            {model.snapshot.map((p, i) => (
              <View key={i} style={s.bullet}>
                <Text style={s.dot}>•</Text>
                <Text style={{ flex: 1 }}>{pdfSafe(p)}</Text>
              </View>
            ))}
          </>
        )}

        {model.extras.length > 0 && (
          <>
            <Text style={s.h2}>More about your result</Text>
            {model.extras.map((e) => (
              <View key={e.key}>
                <Text style={s.h3}>{pdfSafe(`${e.label}: ${e.value}`)}</Text>
                {e.block && (
                  <>
                    <Text style={s.p}>{pdfSafe(e.block.title)}</Text>
                    <Rich text={e.block.body} />
                  </>
                )}
              </View>
            ))}
          </>
        )}

        {model.runnerUp && (
          <Text style={{ marginTop: 10 }}>
            {pdfSafe(`Runner-up: ${model.runnerUp.name}${model.confidence !== undefined ? ` (result clarity ${model.confidence}%)` : ""}`)}
          </Text>
        )}

        {model.ranking && model.ranking.length > 1 && (
          <>
            <Text style={s.h2}>Every result, ranked</Text>
            {model.ranking.map((r) => (
              <Bar key={r.key} label={r.name} pct={r.pct} />
            ))}
          </>
        )}

        {model.matches && model.matches.length > 0 && (
          <>
            <Text style={s.h2}>Your matches</Text>
            {model.matches.map((m, i) => (
              <View key={m.key} style={{ marginBottom: 6 }} wrap={false}>
                <Text style={s.h3}>{pdfSafe(`${i + 1}. ${m.name}  ·  ${m.pct}% match`)}</Text>
                {m.blurb ? <Text>{pdfSafe(m.blurb)}</Text> : null}
                {m.facts ? <Text style={s.muted}>{pdfSafe(Object.entries(m.facts).map(([k, v]) => `${k}: ${v}`).join("  ·  "))}</Text> : null}
                {m.colors ? (
                  <View style={{ flexDirection: "row", marginTop: 4 }}>
                    {m.colors.map((c) => (
                      <View key={c} style={[s.swatch, { backgroundColor: c }]} />
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </>
        )}

        {deep &&
          model.deep.map((sec) => (
            <View key={sec.title}>
              <Text style={s.h2}>{pdfSafe(sec.title)}</Text>
              <Text style={s.p}>{pdfSafe(sec.teaser)}</Text>
              {sec.body ? <Rich text={sec.body} /> : null}
            </View>
          ))}

        {model.review && (
          <>
            <Text style={s.h2}>Answer review</Text>
            {model.review.map((r, i) => (
              <View key={r.id} style={{ marginBottom: 6 }} wrap={false}>
                <Text style={s.h3}>{pdfSafe(`${i + 1}. ${r.text}`)}</Text>
                <Text>
                  {pdfSafe(
                    `Your answer: ${r.options.find((o) => o.id === r.chosen)?.label ?? "No answer"} (${r.right ? "correct" : "incorrect"}). Correct: ${r.options.find((o) => o.id === r.correct)?.label ?? r.correct}.`,
                  )}
                </Text>
                <Text style={s.muted}>{pdfSafe(r.explanation)}</Text>
              </View>
            ))}
          </>
        )}

        {model.quiz.method && (
          <>
            <Text style={s.h2}>How this quiz works</Text>
            <Rich text={model.quiz.method} />
          </>
        )}
        {model.quiz.disclaimer ? <Text style={[s.muted, { marginTop: 10, fontSize: 9 }]}>{pdfSafe(model.quiz.disclaimer)}</Text> : null}
        {footer}
      </Page>

      {deep && model.ability && (
        <Page size="LETTER" orientation="landscape" style={[s.page, { justifyContent: "center", alignItems: "center", textAlign: "center" }]}>
          <View style={{ borderWidth: 2, borderColor: ink, padding: 40, width: "100%", alignItems: "center" }}>
            <Text style={s.brand}>{pdfSafe(brand)}</Text>
            <Text style={[s.title, { marginTop: 20 }]}>Certificate of completion</Text>
            {certificateName ? <Text style={{ fontSize: 18, marginTop: 18 }}>{pdfSafe(certificateName)}</Text> : null}
            <Text style={{ marginTop: 14, fontSize: 12 }}>{pdfSafe(`completed the ${model.quiz.title} with a result of`)}</Text>
            <Text style={{ fontSize: 22, fontFamily: "Times-Roman", marginTop: 8 }}>{pdfSafe(model.outcome.name)}</Text>
            <Text style={{ marginTop: 8 }}>
              {model.ability.correct} of {model.ability.total} correct · {date}
            </Text>
            <Text style={[s.muted, { marginTop: 18, fontSize: 9 }]}>An online estimate for personal interest. Not a clinical or professional assessment.</Text>
          </View>
        </Page>
      )}
    </Document>
  );
}

const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
