type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: string;
};

const storageKey = "nort-plan-builder-events";

export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean | undefined>,
) {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as AnalyticsEvent[];
    localStorage.setItem(storageKey, JSON.stringify([...existing.slice(-49), event]));
  } catch {
    localStorage.setItem(storageKey, JSON.stringify([event]));
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nort_analytics_event", { detail: event }));

    const gtag = (window as typeof window & {
      gtag?: (type: "event", eventName: string, params?: Record<string, unknown>) => void;
    }).gtag;

    gtag?.("event", name, properties);
  }
}
