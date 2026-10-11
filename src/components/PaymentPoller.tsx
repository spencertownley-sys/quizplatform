"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** After checkout the webhook usually lands within seconds; refresh until the report unlocks (P-03). */
export function PaymentPoller() {
  const router = useRouter();
  const [tries, setTries] = useState(0);
  useEffect(() => {
    if (tries >= 20) return;
    const id = setTimeout(() => {
      router.refresh();
      setTries((t) => t + 1);
    }, 2000);
    return () => clearTimeout(id);
  }, [tries, router]);
  return (
    <p className="rounded-xl bg-accent-soft px-4 py-3 text-sm" role="status">
      {tries < 20 ? "Payment received. Unlocking your report…" : "This is taking longer than usual. Your receipt email has a link to your report; it will unlock as soon as the payment confirms."}
    </p>
  );
}
