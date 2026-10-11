import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { SHARE_FORMATS, type ShareFormat, shareInfo } from "@/lib/share";

/** Share card image (P-10): ?format=og (1200×630), x (1200×675), story (1080×1920), square (1080×1080). */
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const f = new URL(req.url).searchParams.get("format") as ShareFormat | null;
  const format: ShareFormat = f && f in SHARE_FORMATS ? f : "og";
  const { width, height } = SHARE_FORMATS[format];
  const info = await shareInfo(code);
  if (!info) return new Response("Not found", { status: 404 });

  const tall = format === "story";
  const square = format === "square";
  const big = tall ? 120 : square ? 104 : 84;
  const name = info.outcome?.name ?? info.quiz.title;
  const nameSize = Math.min(big, Math.floor((tall || square ? 1800 : 2000) / Math.max(8, name.length)));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #faf7f2 0%, #efe7da 100%)",
          color: "#1d1a17",
          padding: tall ? "140px 90px" : "70px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: tall ? 40 : 30, letterSpacing: 2, textTransform: "uppercase", color: "#6f675e" }}>{BRAND.name}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: tall || square ? "center" : "flex-start", textAlign: tall || square ? "center" : "left" }}>
          {info.outcome && <div style={{ display: "flex", fontSize: tall ? 220 : square ? 170 : 120, lineHeight: 1 }}>{info.outcome.emoji}</div>}
          <div style={{ display: "flex", fontSize: tall ? 44 : 34, color: "#6f675e", marginTop: 24 }}>
            {info.outcome ? `My ${info.quiz.title} result` : `I took the ${info.quiz.title}`}
          </div>
          <div style={{ display: "flex", fontSize: nameSize, lineHeight: 1.05, marginTop: 12, fontWeight: 700 }}>{name}</div>
          {info.outcome?.tagline && (
            <div style={{ display: "flex", fontSize: tall ? 46 : 34, marginTop: 20, color: "#3d3833", maxWidth: tall ? 880 : 1000 }}>{info.outcome.tagline}</div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: tall ? 38 : 28, color: "#6f675e" }}>
          <span>What's yours? Free result, no email.</span>
          <span style={{ display: "flex", background: "#1d1a17", color: "#faf7f2", borderRadius: 999, padding: "10px 26px" }}>Take the quiz</span>
        </div>
      </div>
    ),
    { width, height, emoji: "twemoji", headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
