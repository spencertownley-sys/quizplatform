"use client";

import { useEffect, useRef } from "react";
import { type FunnelEvent, track } from "@/lib/analytics";

/** Fires one funnel event when a server-rendered page mounts. */
export function TrackOnMount({ event, params }: { event: FunnelEvent; params?: { slug?: string; variant?: string; [k: string]: unknown } }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(event, params);
  }, [event, params]);
  return null;
}
