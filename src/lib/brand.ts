/** Brand name and contact details live here and in env, so a rename is one change. */
export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Quiz Platform",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
  /** Legal entity shown in the footer and receipts. */
  company: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Quiz Platform",
};

/** The promises shown across the site. Keep them true. */
export const PROMISES = [
  "Free result on every quiz",
  "No email required",
  "One-time reports never turn into subscriptions",
  "30-day refund, no questions",
  "Cancel All-Access in two clicks",
];
