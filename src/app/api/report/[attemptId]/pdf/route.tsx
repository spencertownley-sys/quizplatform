import { renderToBuffer } from "@react-pdf/renderer";
import { BRAND } from "@/lib/brand";
import { ReportPdf } from "@/lib/pdf/ReportPdf";
import { loadResult } from "@/lib/results";

export const runtime = "nodejs";

/** PDF of a paid report (P-09). The PDF contains exactly what the viewer has unlocked. */
export async function GET(req: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const url = new URL(req.url);
  const loaded = await loadResult(attemptId, url.searchParams.get("k"));
  if (!loaded) return new Response("Not found", { status: 404 });
  const { model, quiz } = loaded;
  const free = quiz.isScreener || quiz.sellsReports === false;
  if (model.level === "free" && !free) return new Response("Buy a report to download the PDF.", { status: 402 });

  const name = (url.searchParams.get("name") ?? "").replace(/[^\p{L}\p{N} .'-]/gu, "").slice(0, 60) || undefined;
  const date = new Date().toLocaleDateString("en-US", { dateStyle: "long" });
  const pdf = await renderToBuffer(<ReportPdf model={model} brand={BRAND.name} date={date} certificateName={name} />);
  const file = `${quiz.slug}-${model.level === "deep" ? "deep-report" : "snapshot"}.pdf`;
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
