import { notFound } from "next/navigation";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { sectionFromSlug, sectionSlug } from "@/lib/route-slugs";

export const alt = "Viesa Automations — cases";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Only the cases index gets a bespoke card; the legal and thank-you pages
 *  fall back to the locale-level image one directory up. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang, section: sectionSlug("cases", lang) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang, section: segment } = await params;
  if (!isLocale(lang)) notFound();
  if (sectionFromSlug(segment, lang) !== "cases") notFound();

  const t = getDictionary(lang);
  return renderOgImage({ eyebrow: t.casesPage.eyebrow, title: t.casesPage.title });
}
