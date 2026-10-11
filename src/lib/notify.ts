import "server-only";
import type { Attempt } from "@/db/schema";
import type { QuizDefinition } from "./engine/types";
import { resultCopyEmail } from "./email/templates";
import { sendEmail } from "./email/send";
import { resultUrl } from "./links";
import { rateLimit } from "./ratelimit";
import { sellsReports } from "./quizzes";

/** "Email me a copy of my results." Rate-limited per address so the form can't be used to spam someone. */
export async function sendResultCopy(attempt: Attempt, quiz: QuizDefinition) {
  if (!attempt.email) return;
  if (!(await rateLimit(`copy:${attempt.email}`, 10, 3600))) return;
  const outcome = quiz.outcomes.find((o) => o.key === attempt.outcomeKey);
  if (!outcome) return;
  await sendEmail(
    resultCopyEmail({
      to: attempt.email,
      quizTitle: quiz.title,
      outcomeName: outcome.name,
      summary: outcome.summary,
      resultUrl: resultUrl(attempt.id, attempt.accessToken),
      sellsReports: sellsReports(quiz),
    }),
  );
}
