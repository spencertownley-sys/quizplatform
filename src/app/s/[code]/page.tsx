import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { shareInfo } from "@/lib/share";

/** Public share page: the headline result only (never scores or answers), with the share card as its preview image. */
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const info = await shareInfo(code);
  if (!info) return {};
  const title = info.outcome ? `${info.outcome.name}: my ${info.quiz.title} result` : `I took the ${info.quiz.title}`;
  const description = info.outcome?.tagline ?? info.quiz.tagline;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { title, description, images: [{ url: `/api/og/${code}?format=og`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [`/api/og/${code}?format=x`] },
  };
}

export default async function SharePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const info = await shareInfo(code);
  if (!info) notFound();
  return (
    <Container>
      <div className="py-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">Someone shared their {info.quiz.title} result</p>
        {info.outcome ? (
          <>
            <p className="mt-6 text-7xl">{info.outcome.emoji}</p>
            <h1 className="mt-3 font-serif text-5xl">{info.outcome.name}</h1>
            <p className="mt-3 text-lg text-ink-soft">{info.outcome.tagline}</p>
            <p className="mx-auto mt-4 max-w-xl">{info.outcome.summary}</p>
          </>
        ) : (
          <h1 className="mt-6 font-serif text-5xl">{info.quiz.title}</h1>
        )}
        <div className="mt-10 rounded-3xl bg-ink p-8 text-paper">
          <p className="font-serif text-3xl">What&apos;s yours?</p>
          <p className="mt-2 opacity-80">
            {info.quiz.tagline} Free result, no email needed.
          </p>
          <Link href={`/quiz/${info.quiz.slug}`} className="mt-5 inline-block rounded-full bg-paper px-6 py-3 text-ink">
            Take the {info.quiz.title}
          </Link>
        </div>
      </div>
    </Container>
  );
}
