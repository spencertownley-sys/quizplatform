import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/env";
import { CATEGORIES, listQuizzes } from "@/lib/quizzes";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = appUrl();
  const quizzes = await listQuizzes();
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/quizzes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...CATEGORIES.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...quizzes.flatMap((q) => [
      { url: `${base}/quiz/${q.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
      ...q.outcomes.map((o) => ({ url: `${base}/quiz/${q.slug}/results/${o.key}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ]),
  ];
}
