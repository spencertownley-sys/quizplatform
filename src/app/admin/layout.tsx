import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminUser } from "@/lib/admin";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

/** Admin area: verified emails in ADMIN_EMAILS only. Everyone else gets a 404. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await adminUser();
  if (!admin) notFound();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <nav className="mb-8 flex flex-wrap gap-4 border-b border-line pb-3 text-sm">
        <Link href="/admin" className="font-semibold">
          Metrics
        </Link>
        <Link href="/admin/quizzes">Quizzes</Link>
        <Link href="/admin/purchases">Purchases</Link>
        <Link href="/admin/reviews">Reviews</Link>
        <Link href="/admin/emails">Emails</Link>
        <span className="ml-auto text-muted">{admin.primaryEmail}</span>
      </nav>
      {children}
    </div>
  );
}
