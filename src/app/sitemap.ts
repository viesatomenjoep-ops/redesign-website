import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { defaultLocale, htmlLang, locales, localePath, type Locale } from "@/lib/i18n";
import { detailPath, sectionPath } from "@/lib/route-slugs";
import { getServices, serviceAlternateSlugs } from "@/content/services";
import { getCases, caseAlternateSlugs } from "@/content/cases";

type Entry = {
  /** Public path per locale — one URL each, cross-linked via `alternates`. */
  paths: Record<Locale, string>;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const byLocale = (fn: (locale: Locale) => string): Record<Locale, string> =>
  Object.fromEntries(locales.map((l) => [l, fn(l)])) as Record<Locale, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => new URL(path, site.url).toString();

  const entries: Entry[] = [
    { paths: byLocale((l) => localePath(l, "/")), changeFrequency: "monthly", priority: 1 },
    { paths: byLocale((l) => sectionPath("cases", l)), changeFrequency: "monthly", priority: 0.8 },
    { paths: byLocale((l) => sectionPath("privacy", l)), changeFrequency: "yearly", priority: 0.2 },
    { paths: byLocale((l) => sectionPath("cookies", l)), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Detail pages are enumerated from the Dutch set; `*AlternateSlugs` maps each
  // stable id onto its slug in the other locales.
  for (const service of getServices(defaultLocale)) {
    const slugs = serviceAlternateSlugs(service.id);
    entries.push({
      paths: byLocale((l) => detailPath("services", l, slugs[l])),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const study of getCases(defaultLocale)) {
    const slugs = caseAlternateSlugs(study.id);
    entries.push({
      paths: byLocale((l) => detailPath("cases", l, slugs[l])),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries.flatMap((entry) => {
    const languages = Object.fromEntries(
      locales.map((l) => [htmlLang[l], abs(entry.paths[l])]),
    );

    return locales.map((locale) => ({
      url: abs(entry.paths[locale]),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    }));
  });
}
