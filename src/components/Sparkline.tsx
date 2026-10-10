/** Tiny trend line for retake history (values 0–100, oldest first). */
export function Sparkline({ values, width = 120, height = 32, label }: { values: number[]; width?: number; height?: number; label: string }) {
  if (values.length < 2) return null;
  const step = width / (values.length - 1);
  const y = (v: number) => height - 3 - (v / 100) * (height - 6);
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label}: ${values.join(", ")}`} className="text-accent">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {values.map((v, i) => (
        <circle key={i} cx={i * step} cy={y(v)} r={2.5} fill="currentColor" />
      ))}
    </svg>
  );
}
