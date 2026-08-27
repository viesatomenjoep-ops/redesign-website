import type { Metadata } from "next";
import { site } from "@/lib/site";

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

const DEFAULT_KEYWORDS = [
  "automatisering",
  "workflow automatisering",
  "AI-agents",
  "AI calling agents",
  "AI chatbots",
  "maatwerk software",
  "webapplicaties",
  "KPI dashboards",
  "systeemintegraties",
  "Breda",
];

/** Compose per-route metadata on top of the site defaults. */
export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  noIndex = false,
}: BuildMetadataArgs = {}): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — Automatisering, AI-agents & maatwerk software`;

  return {
    title: fullTitle,
    description,
    keywords: DEFAULT_KEYWORDS,
    applicationName: site.name,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
