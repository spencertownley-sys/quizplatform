import type { FigureShape, MatrixFigure } from "@/lib/engine/types";

/** Draws one cell of a pattern matrix: 1–4 copies of a shape with fill and rotation. */
/** `uid` must be unique on the page; it namespaces the stripe pattern. */
export function Cell({ shapes, size = 72, label, uid }: { shapes: FigureShape[] | null; size?: number; label?: string; uid: string }) {
  if (!shapes) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Missing tile">
        <rect x="2" y="2" width="96" height="96" rx="8" fill="none" stroke="currentColor" strokeDasharray="6 6" opacity="0.5" />
        <text x="50" y="62" textAnchor="middle" fontSize="36" fill="currentColor" opacity="0.6">
          ?
        </text>
      </svg>
    );
  }
  const items = shapes.flatMap((s) => Array.from({ length: Math.max(1, Math.min(4, s.count ?? 1)) }, () => s));
  const n = items.length;
  const pos = n === 1 ? [[50, 50]] : n === 2 ? [[30, 50], [70, 50]] : n === 3 ? [[50, 28], [28, 70], [72, 70]] : [[30, 30], [70, 30], [30, 70], [70, 70]];
  const scale = n === 1 ? 1 : 0.55;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label ?? describe(shapes)}>
      <defs>
        <pattern id={`stripes-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="3" />
        </pattern>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="8" fill="none" stroke="currentColor" opacity="0.15" />
      {items.slice(0, 4).map((s, i) => {
        const [cx, cy] = pos[i] ?? [50, 50];
        const r = 30 * scale * (s.size ?? 0.8);
        const fill = s.fill === "solid" ? "currentColor" : s.fill === "striped" ? `url(#stripes-${uid})` : "none";
        const common = { fill, stroke: "currentColor", strokeWidth: 4, transform: `rotate(${s.rotate ?? 0} ${cx} ${cy})` };
        switch (s.shape) {
          case "circle":
            return <circle key={i} cx={cx} cy={cy} r={r} {...common} />;
          case "square":
            return <rect key={i} x={cx - r} y={cy - r} width={r * 2} height={r * 2} {...common} />;
          case "diamond":
            return <polygon key={i} points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} {...common} />;
          case "triangle":
            return <polygon key={i} points={`${cx},${cy - r} ${cx + r * 0.95},${cy + r * 0.75} ${cx - r * 0.95},${cy + r * 0.75}`} {...common} />;
          case "star": {
            const pts = Array.from({ length: 10 }, (_, k) => {
              const a = (Math.PI / 5) * k - Math.PI / 2;
              const rr = k % 2 === 0 ? r : r * 0.45;
              return `${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`;
            }).join(" ");
            return <polygon key={i} points={pts} {...common} />;
          }
          case "line":
            return <line key={i} x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="currentColor" strokeWidth={6} transform={common.transform} />;
        }
      })}
    </svg>
  );
}

export function Matrix({ figure, size = 72, uid }: { figure: MatrixFigure; size?: number; uid: string }) {
  return (
    <div className="inline-grid grid-cols-3 gap-1.5 rounded-xl bg-paper p-2 text-ink" role="group" aria-label="Pattern grid, last tile missing">
      {figure.cells.map((c, i) => (
        <Cell key={i} shapes={c} size={size} uid={`${uid}-${i}`} />
      ))}
    </div>
  );
}

function describe(shapes: FigureShape[]) {
  return shapes.map((s) => `${s.count ?? 1} ${s.fill ?? "outline"} ${s.shape}${(s.count ?? 1) > 1 ? "s" : ""}${s.rotate ? ` rotated ${s.rotate}°` : ""}`).join(", ");
}
