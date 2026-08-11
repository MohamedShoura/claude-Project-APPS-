"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "generate_lead"
  | "whatsapp_click";

const META_EVENT_MAP: Partial<Record<AnalyticsEvent, string>> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  search: "Search",
  generate_lead: "Lead",
  whatsapp_click: "Contact",
};

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  const metaEvent = META_EVENT_MAP[event];
  if (metaEvent) window.fbq?.("track", metaEvent, params);
  window.ttq?.track(event, params);
}
