import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SectionTile } from "@/components/ui/section-tile";
import { Hero } from "@/components/marketing/hero";
import { Reviews } from "@/components/marketing/reviews";
import { ClientMarquee } from "@/components/marketing/client-marquee";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { WhyViesa } from "@/components/marketing/why-viesa";
import { TechStack } from "@/components/marketing/tech-stack";
import { FeaturedCases } from "@/components/marketing/featured-cases";
import { About } from "@/components/marketing/about";
import { Faq } from "@/components/marketing/faq";
import { ContactCta } from "@/components/marketing/contact-cta";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { getFaqItems } from "@/content/faq";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n";

const homeAlternates: Partial<Record<Locale, string>> = Object.fromEntries(
  locales.map((l) => [l, localePath(l, "/")]),
);

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata({ locale: lang, alternates: homeAlternates });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);

  return (
    <SiteChrome locale={lang} alternates={homeAlternates} headerVariant="overlay">
      <Hero />

      <SectionTile label={t.sectionLabels.testimonial}>
        <Reviews locale={lang} />
      </SectionTile>

      <SectionTile label={t.sectionLabels.services} id="diensten">
        <ClientMarquee locale={lang} />
        <ServicesGrid locale={lang} />
      </SectionTile>

      <WhyViesa locale={lang} />

      <SectionTile label={t.sectionLabels.techStack} id="stack">
        <TechStack locale={lang} />
      </SectionTile>

      <SectionTile label={t.sectionLabels.cases} id="cases">
        <FeaturedCases locale={lang} />
      </SectionTile>

      <SectionTile label={t.sectionLabels.about}>
        <About locale={lang} />
      </SectionTile>

      <SectionTile label={t.sectionLabels.faq}>
        <Faq />
      </SectionTile>

      <ContactCta locale={lang} />

      <FaqJsonLd items={getFaqItems(lang)} />
    </SiteChrome>
  );
}
