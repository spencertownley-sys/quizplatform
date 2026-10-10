import "server-only";
import { currentUser, isAdmin, type SessionUser } from "./auth";
import { devToolsEnabled } from "./env";
import { lintQuiz } from "./engine/lint";
import { exploreOutcomes } from "./engine/simulate";
import type { QuizDefinition } from "./engine/types";

/** Admins: verified emails in ADMIN_EMAILS. In development, DEV_ADMIN=1 makes any dev sign-in an admin. */
export async function adminUser(): Promise<SessionUser | null> {
  const user = await currentUser();
  if (!user) return null;
  if (isAdmin(user)) return user;
  if (devToolsEnabled() && process.env.DEV_ADMIN === "1") return user;
  return null;
}

export interface QuizCheck {
  problems: string[];
  /** Fatal: the definition would crash the engine. */
  error?: string;
  unreachable: string[];
}

/** The same checks the test suite runs, for edits made in the admin. */
export function checkQuiz(def: QuizDefinition): QuizCheck {
  let problems: string[] = [];
  try {
    problems = lintQuiz(def);
  } catch (e) {
    return { problems: [], unreachable: [], error: `Invalid definition: ${(e as Error).message}` };
  }
  try {
    const seen = exploreOutcomes(def, 400);
    const unreachable = def.outcomes.map((o) => o.key).filter((k) => !seen.has(k));
    return { problems, unreachable };
  } catch (e) {
    return { problems, unreachable: [], error: `Scoring failed: ${(e as Error).message}` };
  }
}

/** Minimal shape check before deeper checks (admin JSON can be anything). */
export function looksLikeQuiz(v: unknown): v is QuizDefinition {
  if (!v || typeof v !== "object") return false;
  const q = v as Record<string, unknown>;
  return (
    typeof q.slug === "string" &&
    typeof q.title === "string" &&
    typeof q.structure === "string" &&
    Array.isArray(q.dimensions) &&
    Array.isArray(q.questions) &&
    Array.isArray(q.outcomes) &&
    !!q.seo &&
    typeof q.seo === "object"
  );
}
