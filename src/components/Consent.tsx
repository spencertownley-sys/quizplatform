"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_COOKIE } from "@/lib/analytics";

/**
 * Analytics cookies only after a yes. Decline is as easy as accept, and the
 * choice can be changed from the footer ("Cookie settings").
 */
export function Consent({ gaId, posthogKey, posthogHost }: { gaId?: string; posthogKey?: string; posthogHost?: string }) {
  const [choice, setChoice] = useState<"yes" | "no" | null | undefined>(undefined);

  useEffect(() => {
    const v = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1];
    setChoice(v === "yes" || v === "no" ? v : null);
    const reopen = () => setChoice(null);
    window.addEventListener("qp:cookie-settings", reopen);
    return () => window.removeEventListener("qp:cookie-settings", reopen);
  }, []);

  const decide = (v: "yes" | "no") => {
    document.cookie = `${CONSENT_COOKIE}=${v}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setChoice(v);
    if (v === "no") location.reload(); // unload any analytics already running
  };

  const hasTools = !!gaId || !!posthogKey;
  return (
    <>
      {choice === "yes" && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === "yes" && posthogKey && (
        <Script id="posthog" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${posthogKey}',{api_host:'${posthogHost ?? "https://us.i.posthog.com"}',person_profiles:'identified_only'});`}
        </Script>
      )}
      {choice === null && hasTools && (
        <div role="dialog" aria-label="Cookie choice" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4">
          <p className="text-sm">
            Can we use analytics cookies to see which quizzes people finish? No ads, no selling data. Your quiz answers are never sent to analytics.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => decide("yes")} className="rounded-full bg-ink px-4 py-1.5 text-sm text-paper">
              Allow analytics
            </button>
            <button onClick={() => decide("no")} className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-ink">
              No thanks
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsLink() {
  return (
    <button onClick={() => window.dispatchEvent(new Event("qp:cookie-settings"))} className="underline hover:text-ink">
      Cookie settings
    </button>
  );
}
