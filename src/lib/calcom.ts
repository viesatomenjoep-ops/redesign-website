/**
 * Cal.com booking config. `NEXT_PUBLIC_*` values are inlined at build time and
 * safe to read in client components.
 */
export const calcom = {
  /** "<handle>/<event-slug>" — override via NEXT_PUBLIC_CALCOM_LINK. */
  link: process.env.NEXT_PUBLIC_CALCOM_LINK ?? "tom-en-joep-viesa-ufyeh6/gratis-audit",
  /** Embed namespace — keep unique per event type on a page. */
  namespace: process.env.NEXT_PUBLIC_CALCOM_NAMESPACE ?? "gratis-audit",
} as const;

/** Hosted page — used as the progressive-enhancement fallback for the embed. */
export const calcomHostedUrl = `https://cal.com/${calcom.link}`;

/** Passed to the embed as `data-cal-config`. */
export const calcomEmbedConfig = { layout: "month_view", theme: "light" } as const;

/**
 * Cal.com CSS variables mapped to the site's design tokens (light theme).
 * Applied via `cal("ui", { cssVarsPerTheme: { light: calcomBrandVars } })`.
 * Keys are Cal's var names without the leading `--`.
 */
export const calcomBrandVars: Record<string, string> = {
  "cal-brand": "#E2603F",
  "cal-brand-emphasis": "#C9502F",
  "cal-brand-text": "#FFFFFF",
  "cal-brand-subtle": "#F1C9BD",
  "cal-bg": "#FFFFFF",
  "cal-bg-emphasis": "#EFECE4",
  "cal-bg-subtle": "#F7F5EF",
  "cal-bg-muted": "#F3F0E9",
  "cal-border": "#E4E1D8",
  "cal-border-emphasis": "#D8D3C6",
  "cal-border-subtle": "#EEEBE2",
  "cal-text-emphasis": "#111D36",
  "cal-text": "#22334D",
  "cal-text-subtle": "#55617A",
  "cal-text-muted": "#8A8FA0",
};
