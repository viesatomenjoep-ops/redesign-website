import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export const alt = "Viesa Automations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(locale);

  return renderOgImage({
    eyebrow: t.seo.ogEyebrow,
    title: t.hero.title,
  });
}
