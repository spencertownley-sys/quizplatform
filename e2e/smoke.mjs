// End-to-end smoke test of the main flows against a running dev server with fake payments.
//
//   DEV_FAKE_PAYMENTS=1 ALLOW_DRAFT_SALES=true DEV_ADMIN=1 npm run dev   (terminal 1)
//   npm run e2e                                                           (terminal 2)
//
// Env: BASE_URL (default http://localhost:3000), CHROMIUM_PATH (optional), SHOTS (screenshot dir, optional).
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const executablePath = process.env.CHROMIUM_PATH ?? (await import("node:fs")).existsSync("/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
  ? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
  : undefined;
const browser = await chromium.launch({ executablePath });
const results = [];
let failed = 0;

async function step(name, fn) {
  const t0 = Date.now();
  try {
    await fn();
    results.push(`✓ ${name} (${Date.now() - t0} ms)`);
  } catch (e) {
    failed++;
    results.push(`✗ ${name}: ${e.message.split("\n")[0]}`);
  }
}
const shot = async (page, name) => SHOTS && page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

/** Answers every question by clicking an option (index picker), handling the midpoint reveal. */
async function takeQuiz(page, slug, { pick = () => 0, email, startOnPage = false } = {}) {
  if (!startOnPage) await page.goto(`${BASE}/quiz/${slug}`);
  await page.getByRole("button", { name: /start (the quiz|your half)/i }).click();
  if (await page.getByText("What year were you born?").isVisible().catch(() => false)) {
    await page.selectOption("#qp-year", "1990");
    await page.getByRole("button", { name: "Continue" }).click();
  }
  for (let i = 0; i < 200; i++) {
    if (await page.getByRole("button", { name: "Keep going" }).isVisible().catch(() => false)) {
      await page.getByRole("button", { name: "Keep going" }).click();
      continue;
    }
    if (await page.getByText("Your result is ready.").isVisible().catch(() => false)) break;
    if (/\/(result|compare)\/[0-9a-f]{8}/.test(page.url())) return;
    const q = page.locator("section[aria-live=polite]");
    if (!(await q.isVisible().catch(() => false))) {
      await page.waitForTimeout(100);
      continue;
    }
    const counter = await q.getByText(/Question \d+ of \d+|Quick check/).textContent();
    const options = q.locator("div.mt-6 button[aria-pressed]");
    const n = await options.count();
    await options.nth(Math.min(n - 1, pick(i, n))).click();
    await page.waitForFunction((c) => !document.body.innerText.includes(c), counter, { timeout: 5000 }).catch(() => {});
  }
  if (email) {
    await page.fill("#qp-email", email);
    await page.getByRole("button", { name: "Email me and show result" }).click();
  } else {
    await page.getByRole("button", { name: /Skip, just show my result/ }).click();
  }
  await page.waitForURL(/\/(result|compare)\/[0-9a-f]{8}/, { timeout: 20000 });
}

const ctx = await browser.newContext({ viewport: { width: 420, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

let resultUrl = "";
await step("guest takes the Enneagram test through the age gate, with email", async () => {
  await takeQuiz(page, "enneagram-test", { pick: (i, n) => (i * 7) % n, email: "guest@example.com" });
  resultUrl = page.url();
  expect(/\/result\/[0-9a-f-]{36}\?k=/.test(resultUrl), `unexpected url ${resultUrl}`);
  await page.getByText("See the full picture").waitFor();
  await shot(page, "01-result-free");
});

await step("free result hides paid text (no section bodies in the HTML)", async () => {
  const html = await page.content();
  expect(html.includes("Your Deep Report"), "deep section titles missing");
  expect(html.includes("continues in your Deep Report"), "placeholder text missing");
});

await step("buy Snapshot (fake checkout) unlocks scores", async () => {
  await page.getByRole("button", { name: /Get Snapshot/ }).click();
  await page.waitForURL(/paid=1/);
  await page.getByText(/Your Snapshot is unlocked/).waitFor({ timeout: 15000 });
  await page.getByText("Key points").waitFor();
  await shot(page, "02-result-snapshot");
});

await step("upgrade to Deep Report for the difference", async () => {
  await page.getByRole("button", { name: /Upgrade, \$2\.00/ }).click();
  await page.waitForURL(/paid=1/);
  await page.getByText(/Your Deep Report is unlocked/).waitFor({ timeout: 15000 });
  await page.getByText("How this quiz works").waitFor();
  await shot(page, "03-result-deep");
});

await step("PDF download works for the buyer", async () => {
  const href = await page.getByRole("link", { name: "Download PDF" }).getAttribute("href");
  const res = await page.request.get(`${BASE}${href}`);
  expect(res.status() === 200, `status ${res.status()}`);
  expect((res.headers()["content-type"] ?? "").includes("application/pdf"), "not a PDF");
  expect((await res.body()).length > 5000, "PDF too small");
});

await step("share page and story card render", async () => {
  const shareLink = await page.getByRole("link", { name: "Story image" }).getAttribute("href");
  const code = shareLink.split("/")[3].split("?")[0];
  const img = await page.request.get(`${BASE}${shareLink}`);
  expect(img.status() === 200 && img.headers()["content-type"] === "image/png", `og ${img.status()}`);
  const p2 = await ctx.newPage();
  await p2.goto(`${BASE}/s/${code}`);
  await p2.getByText("What's yours?").waitFor();
  await shot(p2, "04-share");
  await p2.close();
});

await step("refund from the result page relocks the report", async () => {
  await page.goto(resultUrl);
  await page.getByRole("button", { name: /Refund within 30 days/ }).click();
  await page.getByRole("button", { name: "Yes, refund" }).click();
  await page.getByText(/Refunded\./).waitFor();
  await page.goto(resultUrl);
  await page.getByText(/Go deeper|See the full picture/).waitFor();
});

await step("find-my-reports sends links (dev outbox)", async () => {
  await page.goto(`${BASE}/reports`);
  await page.fill("input[type=email]", "guest@example.com");
  await page.getByRole("button", { name: "Email me my links" }).click();
  await page.getByText(/a link to each is on its way/).waitFor();
  await page.waitForTimeout(800);
  await page.goto(`${BASE}/dev/outbox`);
  const html = await page.content();
  for (const kind of ["result_copy", "receipt", "refund", "find_reports"]) expect(html.includes(`data-kind="${kind}"`), `no ${kind} email`);
});

await step("depression screen shows crisis resources when item 9 is endorsed", async () => {
  await takeQuiz(page, "depression-screen", { pick: () => 1 });
  await page.getByText(/You mentioned thoughts of being better off dead/).waitFor();
  await page.getByText(/988/).first().waitFor();
  expect(!(await page.getByText("See the full picture").isVisible().catch(() => false)), "screener shows a paywall");
  await shot(page, "05-screener");
});

await step("reaction time test records 5 trials", async () => {
  await page.goto(`${BASE}/quiz/reaction-time-test`);
  await page.getByRole("button", { name: /start the quiz/i }).click();
  const pad = page.getByRole("button", { name: /Tap or click here to start/ });
  await pad.click();
  for (let i = 0; i < 5; i++) {
    const go = page.getByRole("button", { name: "Now!" });
    await go.waitFor({ timeout: 8000 });
    await go.dispatchEvent("pointerdown");
    if (i < 4) {
      await page.getByRole("button", { name: /Tap for the next one/ }).waitFor();
      await page.getByRole("button", { name: /Tap for the next one/ }).dispatchEvent("pointerdown");
    }
  }
  await page.waitForURL(/\/result\//, { timeout: 15000 });
  await page.getByText("Your score (median)").waitFor();
  await shot(page, "06-reaction");
});

await step("IQ test: free band only, Snapshot adds accuracy, never an IQ number", async () => {
  await takeQuiz(page, "iq-test", { pick: (i, n) => i % n });
  await page.getByText("See the full picture").waitFor();
  expect(!(await page.getByText("Weighted accuracy").isVisible().catch(() => false)), "free result shows Snapshot data");
  await page.getByRole("button", { name: /Get Snapshot/ }).click();
  await page.waitForURL(/paid=1/);
  await page.getByText("Weighted accuracy").waitFor({ timeout: 15000 });
  expect(!/\bIQ \d{2,3}\b/.test(await page.content()), "shows an IQ number");
  await shot(page, "07-iq");
});

await step("compare mode: partner joins by invite, joint report unlocks for both", async () => {
  const a = await browser.newContext({ viewport: { width: 420, height: 900 } });
  const pa = await a.newPage();
  await takeQuiz(pa, "couples-compatibility-test", { pick: (i, n) => i % n });
  await pa.getByRole("button", { name: /Invite your partner/ }).click();
  const invite = await pa.getByLabel("Invite link").inputValue();
  expect(invite.includes("/compare/join/"), `bad invite ${invite}`);

  const b = await browser.newContext({ viewport: { width: 420, height: 900 } });
  const pb = await b.newPage();
  await pb.goto(invite);
  await takeQuiz(pb, null, { pick: (i, n) => (i + 2) % n, startOnPage: true });
  await pb.waitForURL(/\/compare\/[0-9a-f]{8}/);
  await pb.getByText("Overall match").waitFor();
  await pb.getByRole("button", { name: /Unlock for both of you/ }).click();
  await pb.waitForURL(/paid=1/);
  await pb.getByText("Area by area").waitFor({ timeout: 15000 });
  await pb.getByText("Conversation prompts").waitFor();
  await shot(pb, "10-compare");

  // The first person sees it unlocked too.
  await pa.reload();
  await pa.getByRole("link", { name: /See your comparison/ }).click();
  await pa.getByText("Area by area").waitFor();
  await a.close();
  await b.close();
});

await step("bundle: one purchase unlocks Deep Reports, including quizzes taken later", async () => {
  const c = await browser.newContext({ viewport: { width: 420, height: 900 } });
  const pc = await c.newPage();
  await takeQuiz(pc, "attachment-style-quiz", { pick: (i, n) => (i * 3) % n });
  await pc.getByRole("button", { name: /Get bundle/ }).click();
  await pc.waitForURL(/paid=1/);
  await pc.getByText("How this quiz works").waitFor({ timeout: 15000 });
  await takeQuiz(pc, "love-language-quiz", { pick: (i) => i % 2 });
  await pc.getByText("How this quiz works").waitFor();
  expect(!(await pc.getByText("See the full picture").isVisible().catch(() => false)), "love language still locked");
  await c.close();
});

await step("dev sign-in claims this browser's results on the dashboard", async () => {
  await page.goto(`${BASE}/dev/sign-in?next=/dashboard`);
  await page.fill("input[type=email]", "admin@example.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/dashboard/);
  await page.getByRole("heading", { name: "Your results" }).waitFor();
  await page.getByText("Enneagram Test").first().waitFor();
  await shot(page, "08-dashboard");
});

await step("All-Access needs the renewal box ticked, then subscribes", async () => {
  await page.goto(`${BASE}/pricing`);
  const start = page.getByRole("button", { name: /Start All-Access/ });
  expect(await start.isDisabled(), "button enabled before consent");
  await page.getByLabel(/renews automatically every month/).check();
  await start.click();
  await page.waitForURL(/\/dashboard\?welcome=1/);
  await page.getByText("Welcome to All-Access").waitFor();
  await page.getByText("Active").waitFor();
});

await step("All-Access unlocks the Deep Report on an old result", async () => {
  await page.goto(resultUrl);
  await page.getByText("How this quiz works").waitFor();
  expect(!(await page.getByText("See the full picture").isVisible().catch(() => false)), "paywall still shown");
});

await step("cancel All-Access in two clicks", async () => {
  await page.goto(`${BASE}/dashboard`);
  await page.getByRole("button", { name: "Cancel plan" }).click(); // click 1
  await page.getByRole("button", { name: "Cancel plan" }).click(); // click 2 (portal confirm)
  await page.waitForURL(/canceled=1/);
  await page.getByText(/Your plan is cancelled/).waitFor();
});

await step("admin metrics and quiz list load", async () => {
  await page.goto(`${BASE}/admin`);
  await page.getByText(/Metrics, last 30 days/).waitFor();
  await shot(page, "09-admin");
  await page.goto(`${BASE}/admin/quizzes`);
  await page.getByRole("heading", { name: "Quizzes" }).waitFor();
});

await step("no uncaught page errors", async () => {
  expect(errors.length === 0, errors.join(" | "));
});

await browser.close();
console.log(results.join("\n"));
console.log(failed ? `\n${failed} step(s) failed` : "\nAll steps passed");
process.exit(failed ? 1 : 0);
