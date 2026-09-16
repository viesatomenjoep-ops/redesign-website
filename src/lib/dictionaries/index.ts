import type { Locale } from "@/lib/i18n";
import { nl, type Dictionary } from "@/lib/dictionaries/nl";
import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { nl, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

/**
 * Fill `{name}` placeholders in a dictionary string.
 * `interpolate("{count} reviews", { count: 12 })` → `"12 reviews"`.
 *
 * Unknown placeholders are left untouched rather than replaced with
 * "undefined", so a typo shows up as literal `{count}` in the UI instead of
 * silently rendering a broken sentence.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
