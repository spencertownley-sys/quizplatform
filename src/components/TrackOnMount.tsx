"use client";

import { useEffect } from "react";
import { type FunnelEvent, track } from "@/lib/analytics";

export function TrackOnMount({ event, params }: { event: FunnelEvent; params?: Record<string, unknown> }) {
  useEffect(() => track(event, params), [event, params]);
  return null;
}
