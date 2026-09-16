import { notFound } from "next/navigation";
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { isLocale, locales } from "@/lib/i18n";
import { sectionFromSlug, sectionSlug } from "@/lib/route-slugs";
import { getCases, findCase } from "@/content/cases";
import { getServices, findService } from "@/content/services";

export const alt = "Viesa Automations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return locales.flatMap((lang) => [
    ...getCases(lang).map((study) => ({
      lang,
      section: sectionSlug("cases", lang),
      slug: study.slug,
    })),
    ...getServices(lang).map((service) => ({
      lang,
      section: sectionSlug("services", lang),
      slug: service.slug,
    })),
  ]);
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang, section: segment, slug } = await params;
  if (!isLocale(lang)) notFound();
  const section = sectionFromSlug(segment, lang);

  if (section === "cases") {
    const study = findCase(lang, slug);
    if (!study) notFound();
    return renderOgImage({ eyebrow: study.category, title: study.name });
  }

  if (section === "services") {
    const service = findService(lang, slug);
    if (!service) notFound();
    return renderOgImage({ eyebrow: service.label, title: service.title });
  }

  notFound();
}
