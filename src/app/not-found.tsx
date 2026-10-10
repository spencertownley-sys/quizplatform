import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container>
      <h1 className="font-serif text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-ink-soft">
        If you&apos;re looking for a result or report, <Link href="/reports" className="underline">we can email you your links</Link>.
      </p>
      <Link href="/quizzes" className="mt-6 inline-block rounded-full bg-ink px-5 py-2 text-paper">
        Browse quizzes
      </Link>
    </Container>
  );
}
