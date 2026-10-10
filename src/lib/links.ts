import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { appSecret, appUrl } from "./env";

/**
 * Signed links for actions people take from an email without signing in:
 * refund a purchase, open the billing portal, unsubscribe, see all reports for an email.
 * The signature binds the purpose and the subject, so one link can't be reused for another.
 */
export function sign(purpose: string, subject: string): string {
  return createHmac("sha256", appSecret()).update(`${purpose}:${subject}`).digest("base64url").slice(0, 32);
}

export function verify(purpose: string, subject: string, sig: string | null | undefined): boolean {
  if (!sig) return false;
  const expected = sign(purpose, subject);
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export const resultUrl = (attemptId: string, token: string) => `${appUrl()}/result/${attemptId}?k=${encodeURIComponent(token)}`;
export const refundUrl = (purchaseId: string) => `${appUrl()}/refund/${purchaseId}?sig=${sign("refund", purchaseId)}`;
export const portalUrl = (userId: string) =>
  `${appUrl()}/api/billing-portal/link?u=${encodeURIComponent(userId)}&sig=${sign("portal", userId)}`;
export const unsubscribeUrl = (email: string) =>
  `${appUrl()}/unsubscribe?e=${encodeURIComponent(email)}&sig=${sign("unsubscribe", email.toLowerCase())}`;
export const comparisonUrl = (id: string, token: string) => `${appUrl()}/compare/${id}?k=${encodeURIComponent(token)}`;
