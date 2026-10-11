import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { QuizRunner } from "@/components/QuizRunner";
import { Container } from "@/components/ui";
import { db, t } from "@/db";
import { toClientQuiz } from "@/lib/engine/client";
import { getQuiz } from "@/lib/quizzes";

export const metadata: Metadata = { title: "You've been invited to compare", robots: { index: false } };

/** Second person's landing page for a comparison invite (P-11). */
export default async function JoinPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const [c] = /^[A-Za-z0-9_-]{10,40}$/.test(token) ? await db().select().from(t.comparisons).where(eq(t.comparisons.inviteToken, token)).limit(1) : [];
  const quiz = c ? await getQuiz(c.quizSlug) : undefined;

  if (!c || !quiz) {
    return (
      <Container>
        <h1 className="font-serif text-4xl">This invite link isn&apos;t valid</h1>
        <p className="mt-2 text-ink-soft">Ask the person who sent it for a new link.</p>
      </Container>
    );
  }
  if (c.attemptB) {
    return (
      <Container>
        <h1 className="font-serif text-4xl">This invite has already been used</h1>
        <p className="mt-2 text-ink-soft">Each invite pairs two people. Ask for a new link, or take the quiz on your own.</p>
        <Link href={`/quiz/${quiz.slug}`} className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-paper">
          Take the {quiz.title}
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-wide text-muted">You&apos;ve been invited</p>
        <h1 className="font-serif text-4xl">Take the {quiz.title} and compare</h1>
        <p className="text-ink-soft">
          Someone invited you to take the {quiz.title} so you can see your results side by side. When you finish, you&apos;ll both see each other&apos;s headline results and
          scores, and how closely you match. Your individual answers stay private. About {quiz.minutes} minutes, free.
        </p>
        <QuizRunner quiz={toClientQuiz(quiz)} minAge={quiz.minAge} compareToken={token} />
        {quiz.disclaimer && <p className="text-xs text-muted">{quiz.disclaimer}</p>}
      </div>
    </Container>
  );
}
