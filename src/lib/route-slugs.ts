import { locales, localePath, type Locale } from "@/lib/i18n";

/**
 * Localised URL segments. The `Section` key is the stable internal name; the
 * strings below are what actually appears in the address bar per locale.
 *
 * Adding a locale means adding a column here — nothing else routes on raw
 * strings, so a missing entry is a type error rather than a 404 in production.
 */
export const sections = ["cases", "services", "thankYou", "privacy", "cookies"] as const;

export type Section = (typeof sections)[number];

export const sectionSlugs: Record<Section, Record<Locale, string>> = {
  cases: { nl: "cases", en: "cases", es: "casos" },
  services: { nl: "diensten", en: "services", es: "servicios" },
  thankYou: { nl: "bedankt", en: "thank-you", es: "gracias" },
  privacy: { nl: "privacy", en: "privacy", es: "privacidad" },
  cookies: { nl: "cookies", en: "cookies", es: "cookies" },
};

/** The URL segment for `section` in `locale` — e.g. ("services", "es") → "servicios". */
export function sectionSlug(section: Section, locale: Locale): string {
  return sectionSlugs[section][locale];
}

/**
 * Reverse lookup: which section does this URL segment name in this locale?
 * Returns undefined for an unknown segment, which callers turn into a 404.
 */
export function sectionFromSlug(slug: string, locale: Locale): Section | undefined {
  return sections.find((s) => sectionSlugs[s][locale] === slug);
}

/** Public path for a section index, e.g. ("cases", "es") → "/es/casos". */
export function sectionPath(section: Section, locale: Locale): string {
  return localePath(locale, `/${sectionSlug(section, locale)}`);
}

/** Public path for a detail page, e.g. ("services", "en", "workflow-automation"). */
export function detailPath(section: Section, locale: Locale, slug: string): string {
  return localePath(locale, `/${sectionSlug(section, locale)}/${slug}`);
}

/**
 * Every locale variant of a section index, keyed by locale — feeds the
 * `alternates.languages` metadata and the language switcher.
 */
export function sectionAlternates(section: Section): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, sectionPath(section, l)]),
  ) as Record<Locale, string>;
}
