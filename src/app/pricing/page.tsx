import type { Metadata } from "next";
import { BuyButton } from "@/components/BuyButton";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = { title: "All-Access" };

export default function Pricing() {
  return (
    <article className="space-y-6">
      <h1 className="font-serif text-4xl">All-Access</h1>
      <p className="text-muted">Every Deep Report on every quiz, your results dashboard, retake history and compare-with-friends.</p>
      <div className="max-w-sm rounded-2xl border border-line bg-white p-6">
        <p className="font-serif text-3xl">{PRODUCTS.all_access.priceLabel}</p>
        <ul className="mt-4 space-y-1 text-sm">
          <li>Renews monthly at {PRODUCTS.all_access.priceLabel} until you cancel.</li>
          <li>Cancel anytime in two clicks from your dashboard.</li>
          <li>Requires a free account so your reports stay in one place.</li>
        </ul>
        <div className="mt-6"><BuyButton product="all_access" label="Start All-Access" primary /></div>
      </div>
      <p className="text-sm text-muted">Only want one report? Buy it on its result page. One-time purchases never become a subscription.</p>
    </article>
  );
}
