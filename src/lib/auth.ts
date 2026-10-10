import "server-only";
import { auth, currentUser as clerkCurrentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clerkEnabled, devToolsEnabled } from "./env";

/**
 * Accounts are Clerk. In development without Clerk keys, a dev sign-in cookie
 * stands in so dashboards, All-Access and admin can be tested locally.
 */
export interface SessionUser {
  id: string;
  /** Verified email addresses only, lowercased. */
  emails: string[];
  primaryEmail: string | null;
  name: string | null;
}

export const DEV_USER_COOKIE = "qp_dev_user";
const devUserId = (email: string) => `dev_${email.toLowerCase()}`;

export async function currentUserId(): Promise<string | null> {
  if (clerkEnabled()) return (await auth()).userId ?? null;
  if (devToolsEnabled()) {
    const email = (await cookies()).get(DEV_USER_COOKIE)?.value;
    return email ? devUserId(email) : null;
  }
  return null;
}

export async function currentUser(): Promise<SessionUser | null> {
  if (clerkEnabled()) {
    const u = await clerkCurrentUser();
    if (!u) return null;
    const emails = u.emailAddresses
      .filter((e) => e.verification?.status === "verified")
      .map((e) => e.emailAddress.toLowerCase());
    const primary = u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress.toLowerCase() ?? emails[0] ?? null;
    return { id: u.id, emails, primaryEmail: primary, name: u.firstName ?? null };
  }
  if (devToolsEnabled()) {
    const email = (await cookies()).get(DEV_USER_COOKIE)?.value?.toLowerCase();
    if (!email) return null;
    return { id: devUserId(email), emails: [email], primaryEmail: email, name: email.split("@")[0] };
  }
  return null;
}

export const signInPath = (redirectTo = "/dashboard") =>
  clerkEnabled() ? `/sign-in?redirect_url=${encodeURIComponent(redirectTo)}` : `/dev/sign-in?next=${encodeURIComponent(redirectTo)}`;

export const signUpPath = (redirectTo = "/dashboard") =>
  clerkEnabled() ? `/sign-up?redirect_url=${encodeURIComponent(redirectTo)}` : `/dev/sign-in?next=${encodeURIComponent(redirectTo)}`;

/** For pages: the signed-in user, or a redirect to sign in. */
export async function requireUser(redirectTo: string): Promise<SessionUser> {
  const user = await currentUser();
  if (!user) redirect(signInPath(redirectTo));
  return user;
}

/** Admins are listed by verified email in ADMIN_EMAILS (comma-separated). */
export function isAdmin(user: SessionUser | null): boolean {
  if (!user) return false;
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return user.emails.some((e) => admins.includes(e));
}
