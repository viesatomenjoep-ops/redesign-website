import type { Metadata } from "next";
import { site } from "@/lib/site";
import { defaultLocale, htmlLang, ogLocale, type Locale } from "@/lib/i18n";
import { getDictionary, interpolate } from "@/lib/dictionaries";

type BuildMetadataArgs = {
  locale: Locale;
  title?: string;
  description?: string;
  /**
   * Public path of this page in every locale, e.g.
   * `{ nl: "/cases", en: "/en/cases", es: "/es/casos" }`.
   * The canonical is taken from `alternates[locale]`, and the whole map becomes
   * `<link rel="alternate" hreflang>`. Defaults to the three home pages.
   */
  alternates?: Partial<Record<Locale, string>>;
  noIndex?: boolean;
};

const HOME_ALTERNATES: Record<Locale, string> = { nl: "/", en: "/en", es: "/es" };

/** Compose per-route, per-locale metadata on top of the site defaults. */
export function buildMetadata({
  locale,
  title,
  description,
  alternates,
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const t = getDictionary(locale);
  const paths = { ...HOME_ALTERNATES, ...alternates };
  const abs = (path: string) => new URL(path, site.url).toString();

  const url = abs(paths[locale]);
  const fullTitle = title
    ? interpolate(t.seo.titleTemplate, { title, name: site.name })
    : t.seo.defaultTitle;
  const desc = description ?? t.seo.description;

  /**
   * `x-default` points at the Dutch page: it is the primary market, and
   * sending unmatched locales there is better than letting Google pick.
   */
  const languages: Record<string, string> = { "x-default": abs(paths[defaultLocale]) };
  for (const [l, path] of Object.entries(paths)) {
    languages[htmlLang[l as Locale]] = abs(path);
  }

  return {
    title: fullTitle,
    description: desc,
    keywords: t.seo.keywords,
    applicationName: site.name,
    alternates: { canonical: url, languages },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: site.name,
      url,
      title: fullTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
