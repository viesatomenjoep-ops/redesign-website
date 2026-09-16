/**
 * Locale primitives. Dutch is the default and lives at the root of the domain
 * (`/cases`); the other locales are prefixed (`/en/cases`, `/es/casos`).
 *
 * Internally every route still resolves under `src/app/[lang]/...` — middleware
 * rewrites unprefixed requests to `/nl/...`, so the `[lang]` param is always
 * present in page components even when the visitor sees a bare path.
 */

export const locales = ["nl", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

/** Locales that carry a URL prefix. Dutch is served from the root. */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `""` for Dutch, `"/en"` / `"/es"` for the rest. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Turn a locale-agnostic path into a public URL for `locale`.
 * `path` must start with "/" and must not already carry a prefix.
 */
export function localePath(locale: Locale, path = "/"): string {
  const prefix = localePrefix(locale);
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

/** `lang` / `hreflang` attribute values. */
export const htmlLang: Record<Locale, string> = {
  nl: "nl-NL",
  en: "en",
  es: "es-ES",
};

/** OpenGraph `og:locale` values. */
export const ogLocale: Record<Locale, string> = {
  nl: "nl_NL",
  en: "en_GB",
  es: "es_ES",
};

/** Native language names, for the switcher. */
export const localeName: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  es: "Español",
};

/** Short labels for the compact switcher in the header. */
export const localeShortName: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
  es: "ES",
};
