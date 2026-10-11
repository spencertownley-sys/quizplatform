"use client";

import { useState } from "react";
import { BuyButton } from "./BuyButton";

/** Subscription checkout: price, renewal and how to cancel sit next to the button, with an unchecked consent box. */
export function AllAccessCheckout({ priceLabel }: { priceLabel: string }) {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="space-y-3">
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
        <span>
          I understand All-Access costs {priceLabel}, renews automatically every month until I cancel, and that I can cancel anytime in two clicks from my dashboard
          or any receipt email.
        </span>
      </label>
      <BuyButton product="all_access" label={`Start All-Access, ${priceLabel}`} primary renewalConsent={agreed} disabled={!agreed} />
    </div>
  );
}
