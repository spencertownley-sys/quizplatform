import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui";
import { clerkEnabled } from "@/lib/env";

export default async function Page({ searchParams }: { searchParams: Promise<{ redirect_url?: string }> }) {
  if (!clerkEnabled()) redirect(`/dev/sign-in?next=${encodeURIComponent((await searchParams).redirect_url ?? "/dashboard")}`);
  return (
    <Container>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </Container>
  );
}
