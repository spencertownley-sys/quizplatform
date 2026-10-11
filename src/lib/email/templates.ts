import { BRAND } from "../brand";
import { appUrl } from "../env";
import { PRODUCTS, type ProductKey, formatCents } from "../products";
import type { EmailKind, OutgoingEmail } from "./send";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

interface Block {
  heading?: string;
  paragraphs?: string[];
  button?: { label: string; url: string };
  links?: { label: string; url: string }[];
  small?: string[];
}

function layout(title: string, blocks: Block[], footer: string[]): { html: string; text: string } {
  const html = `<!doctype html><html><body style="margin:0;background:#faf7f2;font-family:Georgia,'Iowan Old Style',serif;color:#1d1a17">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<p style="font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#6f675e;margin:0 0 24px">${esc(BRAND.name)}</p>
<h1 style="font-size:26px;line-height:1.25;margin:0 0 16px">${esc(title)}</h1>
${blocks
  .map(
    (b) => `${b.heading ? `<h2 style="font-size:18px;margin:24px 0 8px">${esc(b.heading)}</h2>` : ""}
${(b.paragraphs ?? []).map((p) => `<p style="font-size:16px;line-height:1.55;margin:0 0 12px">${esc(p)}</p>`).join("")}
${b.button ? `<p style="margin:20px 0"><a href="${esc(b.button.url)}" style="display:inline-block;background:#1d1a17;color:#faf7f2;text-decoration:none;padding:12px 22px;border-radius:999px;font-family:Arial,sans-serif;font-size:15px">${esc(b.button.label)}</a></p>` : ""}
${b.links?.length ? `<ul style="padding-left:18px;margin:0 0 12px">${b.links.map((l) => `<li style="margin:6px 0;font-size:15px"><a href="${esc(l.url)}" style="color:#3f5bd8">${esc(l.label)}</a></li>`).join("")}</ul>` : ""}
${(b.small ?? []).map((s) => `<p style="font-size:13px;line-height:1.5;color:#6f675e;margin:0 0 8px">${esc(s)}</p>`).join("")}`,
  )
  .join("\n")}
<hr style="border:none;border-top:1px solid #e6dfd4;margin:28px 0 16px">
${footer.map((f) => `<p style="font-size:12px;line-height:1.5;color:#6f675e;margin:0 0 6px">${f}</p>`).join("")}
</div></body></html>`;

  const text = [
    title,
    "",
    ...blocks.flatMap((b) => [
      ...(b.heading ? [b.heading.toUpperCase()] : []),
      ...(b.paragraphs ?? []),
      ...(b.button ? [`${b.button.label}: ${b.button.url}`] : []),
      ...(b.links ?? []).map((l) => `- ${l.label}: ${l.url}`),
      ...(b.small ?? []),
      "",
    ]),
    "--",
    ...footer.map((f) => f.replace(/<[^>]+>/g, "")),
  ].join("\n");
  return { html, text };
}

const baseFooter = (extra: string[] = []) => [
  ...extra,
  `${esc(BRAND.company)} · Questions? Reply to this email or write to <a href="mailto:${esc(BRAND.supportEmail)}" style="color:#6f675e">${esc(BRAND.supportEmail)}</a>.`,
  `Lost a link? <a href="${appUrl()}/reports" style="color:#6f675e">Find all your reports</a>.`,
];

function make(kind: EmailKind, to: string, subject: string, title: string, blocks: Block[], footer: string[], unsubscribeUrl?: string): OutgoingEmail {
  return { to, kind, subject, ...layout(title, blocks, footer), ...(unsubscribeUrl ? { unsubscribeUrl } : {}) };
}

export function resultCopyEmail(a: {
  to: string;
  quizTitle: string;
  outcomeName: string;
  summary: string;
  resultUrl: string;
  sellsReports: boolean;
}): OutgoingEmail {
  return make(
    "result_copy",
    a.to,
    `Your ${a.quizTitle} result: ${a.outcomeName}`,
    a.outcomeName,
    [
      { paragraphs: [`Here's your ${a.quizTitle} result, as you asked.`, a.summary], button: { label: "View your result", url: a.resultUrl } },
      {
        small: [
          "This link is private to you: anyone with it can see this result, so share it only if you want to.",
          ...(a.sellsReports ? ["Want the full picture? Reports start at $0.99, one-time. No subscription."] : []),
        ],
      },
    ],
    baseFooter(),
  );
}

export function receiptEmail(a: {
  to: string;
  product: ProductKey;
  productName: string;
  amountCents: number;
  currency: string;
  what: string;
  reportUrl?: string;
  pdfUrl?: string;
  refundUrl?: string;
  portalUrl?: string;
  renewsOn?: string;
}): OutgoingEmail {
  const amount = formatCents(a.amountCents, a.currency);
  const isSub = a.product === "all_access";
  const blocks: Block[] = [
    {
      paragraphs: [
        isSub
          ? `Thanks for joining All-Access. You were charged ${amount} today.`
          : `Thanks for your purchase. You were charged ${amount}, once. This is not a subscription and you will not be charged again.`,
        a.what,
      ],
      ...(a.reportUrl ? { button: { label: isSub ? "Go to your dashboard" : "Open your report", url: a.reportUrl } } : {}),
      links: [...(a.pdfUrl ? [{ label: "Download the PDF", url: a.pdfUrl }] : [])],
    },
  ];
  if (isSub) {
    blocks.push({
      heading: "Your plan",
      paragraphs: [
        `All-Access costs ${PRODUCTS.all_access.priceLabel} and renews automatically every month${a.renewsOn ? `; your next charge is on ${a.renewsOn}` : ""} until you cancel.`,
        "Cancel anytime in two clicks: open the link below and choose Cancel plan. You keep access until the end of the month you've paid for.",
      ],
      ...(a.portalUrl ? { button: { label: "Manage or cancel your plan", url: a.portalUrl } } : {}),
    });
  } else if (a.refundUrl) {
    blocks.push({
      heading: "30-day refund",
      paragraphs: ["Not happy with your report? Get a full refund within 30 days, no questions asked."],
      links: [{ label: "Request a refund", url: a.refundUrl }],
    });
  }
  return make(
    "receipt",
    a.to,
    isSub ? "Your All-Access receipt and how to cancel" : `Your receipt: ${a.productName}`,
    isSub ? "Welcome to All-Access" : `Your ${a.productName} is ready`,
    blocks,
    baseFooter([`Receipt for ${esc(a.productName)}, ${esc(amount)}.`]),
  );
}

export function findReportsEmail(a: { to: string; items: { label: string; url: string }[]; dashboardUrl?: string }): OutgoingEmail {
  return make(
    "find_reports",
    a.to,
    "Your quiz results and reports",
    "Here are your results",
    [
      a.items.length
        ? { paragraphs: ["Someone (hopefully you) asked for links to the results and reports saved with this email address."], links: a.items }
        : { paragraphs: ["Someone asked for results saved with this email address, but we don't have any. If you took a quiz without giving an email, your results are saved in the browser you used."] },
      { small: ["These links are private. If you didn't ask for this email, you can ignore it."] },
    ],
    baseFooter(),
  );
}

export function comparisonReadyEmail(a: { to: string; quizTitle: string; other: string; url: string }): OutgoingEmail {
  return make(
    "comparison_ready",
    a.to,
    `Your ${a.other} finished the ${a.quizTitle}`,
    "Your comparison is ready",
    [{ paragraphs: [`Your ${a.other} has taken the ${a.quizTitle}. See how your results line up.`], button: { label: "See your comparison", url: a.url } }],
    baseFooter(),
  );
}

export function winbackSampleEmail(a: { to: string; quizTitle: string; outcomeName: string; section: { title: string; teaser: string; body: string }; resultUrl: string; unsubscribeUrl: string }): OutgoingEmail {
  const paragraphs = [a.section.teaser, ...a.section.body.split(/\n\s*\n/).slice(0, 3)].map((p) => p.replace(/^- /gm, "• "));
  return make(
    "winback_sample",
    a.to,
    `A free section of your ${a.outcomeName} report`,
    a.section.title,
    [
      { paragraphs: [`Here's one section of your ${a.quizTitle} Deep Report, free, so you can see what's inside.`] },
      { heading: a.section.title, paragraphs },
      { button: { label: "See your full result", url: a.resultUrl } },
    ],
    baseFooter([`You're getting this because you asked us to email your result and agreed to follow-up emails. <a href="${esc(a.unsubscribeUrl)}" style="color:#6f675e">Unsubscribe</a>.`]),
    a.unsubscribeUrl,
  );
}

export function winbackOfferEmail(a: { to: string; quizTitle: string; outcomeName: string; code: string; resultUrl: string; unsubscribeUrl: string }): OutgoingEmail {
  return make(
    "winback_offer",
    a.to,
    `One-time offer for your ${a.quizTitle} report`,
    "Your report, for less",
    [
      {
        paragraphs: [
          `Your ${a.outcomeName} Deep Report is still waiting. Use code ${a.code} at checkout for a one-time discount.`,
          "One-time payment, no subscription, 30-day refund. This is the last email we'll send about it.",
        ],
        button: { label: "Open your result", url: a.resultUrl },
      },
    ],
    baseFooter([`You're getting this because you agreed to follow-up emails. <a href="${esc(a.unsubscribeUrl)}" style="color:#6f675e">Unsubscribe</a>.`]),
    a.unsubscribeUrl,
  );
}

export function refundEmail(a: { to: string; productName: string; amountCents: number; currency: string }): OutgoingEmail {
  return make(
    "refund",
    a.to,
    `Refund confirmed: ${a.productName}`,
    "Your refund is on its way",
    [
      {
        paragraphs: [
          `We've refunded ${formatCents(a.amountCents, a.currency)} for your ${a.productName}. Depending on your bank it can take 5–10 business days to appear.`,
          "Thanks for giving us a try. Your free results stay available.",
        ],
      },
    ],
    baseFooter(),
  );
}
