/**
 * Checks every quiz file in src/content/quizzes. Run one quiz with:
 *   QUIZ=attachment-style-quiz npx vitest run src/content
 */
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { lintQuiz } from "@/lib/engine/lint";
import { exploreOutcomes } from "@/lib/engine/simulate";
import type { QuizDefinition } from "@/lib/engine/types";
import { catalog } from "./catalog";

const dir = fileURLToPath(new URL("./quizzes/", import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.startsWith("_") && !f.endsWith(".test.ts"));
const only = process.env.QUIZ;

const loaded: { file: string; quiz: QuizDefinition }[] = [];
for (const file of files) {
  if (only && file !== `${only}.ts`) continue;
  const mod = await import(`./quizzes/${file}`);
  loaded.push({ file, quiz: mod.default as QuizDefinition });
}

describe("catalog", () => {
  it("has 100 unique entries", () => {
    expect(catalog).toHaveLength(100);
    expect(new Set(catalog.map((c) => c.slug)).size).toBe(100);
  });
});

for (const { file, quiz } of loaded) {
  describe(quiz?.slug ?? file, () => {
    it("default-exports a quiz whose slug matches the file name and catalog", () => {
      expect(quiz, `${file} needs \`export default\``).toBeTruthy();
      expect(`${quiz.slug}.ts`).toBe(file);
      const entry = catalog.find((c) => c.n === quiz.n);
      expect(entry?.slug, "n must be this quiz's catalog number").toBe(quiz.slug);
      expect(quiz.category).toBe(entry?.category);
    });

    it("passes lint", () => expect(lintQuiz(quiz)).toEqual([]));

    it("can reach every outcome", () => {
      const seen = exploreOutcomes(quiz, quiz.structure === "chart" ? 1500 : 4000);
      const missing = quiz.outcomes.map((o) => o.key).filter((k) => !seen.has(k));
      expect(missing, `never produced: ${missing.join(", ")}`).toEqual([]);
    });

    // Writers check one quiz at a time (QUIZ=slug) before it's registered.
    it.skipIf(!!only)("is registered", async () => {
      const { codeQuizzes } = await import("./quizzes/_registry");
      expect(codeQuizzes.some((q) => q.slug === quiz.slug), "run npm run content:registry").toBe(true);
    });
  });
}
