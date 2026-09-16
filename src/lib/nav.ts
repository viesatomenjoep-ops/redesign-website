import { localePath, type Locale } from "@/lib/i18n";
import { sectionPath } from "@/lib/route-slugs";
import { getDictionary } from "@/lib/dictionaries";

export type NavItem = { label: string; href: string };

/**
 * Primary navigation for a locale.
 *
 * The `#diensten` / `#contact` fragments stay Dutch on purpose — they are DOM
 * ids on the homepage, not user-facing copy, and translating them per locale
 * would mean three sets of section ids to keep in sync for no visible gain.
 */
export function getNav(locale: Locale): NavItem[] {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");

  return [
    { label: t.nav.services, href: `${home === "/" ? "" : home}/#diensten` },
    { label: t.nav.cases, href: sectionPath("cases", locale) },
    { label: t.nav.contact, href: `${home === "/" ? "" : home}/#contact` },
  ];
}
