import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { CaseCard } from "@/components/marketing/case-card";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { LegalPage } from "@/components/legal/legal-page";
import { PrivacyBody } from "@/components/legal/privacy-body";
import { CookiesBody } from "@/components/legal/cookies-body";
import { buildMetadata } from "@/lib/seo";
import { getCases } from "@/content/cases";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n";
import {
  sectionAlternates,
  sectionFromSlug,
  sectionSlug,
  type Section,
} from "@/lib/route-slugs";

/**
 * One route for every top-level section, because the URL segment is translated
 * (`/cases`, `/es/casos`, `/es/privacidad`, …). `sectionFromSlug` turns the
 * incoming segment back into a stable `Section` key and anything unrecognised
 * 404s.
 *
 * Detail pages live one level down in `[slug]/page.tsx`.
 */
const SECTIONS = ["cases", "privacy", "cookies", "thankYou"] as const;

/** The subset of `Section` this route serves — narrow enough that the switches
 *  below are exhaustive and TypeScript can prove it. */
type TopLevelSection = (typeof SECTIONS)[number];

const isTopLevel = (section: Section): section is TopLevelSection =>
  (SECTIONS as readonly Section[]).includes(section);

/** Legal prose is Dutch-only; en/es visitors get a notice explaining that. */
const LEGAL_UPDATED = "2026-08-27";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    SECTIONS.map((section) => ({ lang, section: sectionSlug(section, lang) })),
  );
}

function resolve(lang: string, segment: string) {
  if (!isLocale(lang)) return null;
  const section = sectionFromSlug(segment, lang);
  if (!section || !isTopLevel(section)) return null;
  return { locale: lang, section };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}): Promise<Metadata> {
  const { lang, section: segment } = await params;
  const resolved = resolve(lang, segment);
  if (!resolved) return {};

  const { locale, section } = resolved;
  const t = getDictionary(locale);
  const alternates = sectionAlternates(section);

  switch (section) {
    case "cases":
      return buildMetadata({
        locale,
        title: t.casesPage.metaTitle,
        description: t.casesPage.lede,
        alternates,
      });
    case "thankYou":
      return buildMetadata({
        locale,
        title: t.thankYouPage.metaTitle,
        description: t.thankYouPage.metaDescription,
        alternates,
        noIndex: true,
      });
    case "privacy":
      return buildMetadata({
        locale,
        title: "Privacyverklaring",
        description:
          "Hoe Viesa Automations omgaat met persoonsgegevens die via deze website worden verwerkt.",
        alternates,
      });
    case "cookies":
      return buildMetadata({
        locale,
        title: "Cookieverklaring",
        description:
          "Welke cookies en lokale opslag deze website gebruikt — en waarom er geen cookiebanner is.",
        alternates,
      });
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang, section: segment } = await params;
  const resolved = resolve(lang, segment);
  if (!resolved) notFound();

  const { locale, section } = resolved;
  const alternates = sectionAlternates(section);

  switch (section) {
    case "cases":
      return <CasesIndex locale={locale} alternates={alternates} />;
    case "thankYou":
      return <ThankYou locale={locale} alternates={alternates} />;
    case "privacy":
      return (
        <LegalPage
          locale={locale}
          alternates={alternates}
          eyebrow="Juridisch"
          title="Privacyverklaring"
          updated={LEGAL_UPDATED}
          showDutchOnlyNotice={locale !== "nl"}
        >
          <PrivacyBody />
        </LegalPage>
      );
    case "cookies":
      return (
        <LegalPage
          locale={locale}
          alternates={alternates}
          eyebrow="Juridisch"
          title="Cookieverklaring"
          updated={LEGAL_UPDATED}
          showDutchOnlyNotice={locale !== "nl"}
        >
          <CookiesBody locale={locale} />
        </LegalPage>
      );
  }
}

function CasesIndex({
  locale,
  alternates,
}: {
  locale: Locale;
  alternates: Record<Locale, string>;
}) {
  const t = getDictionary(locale);

  return (
    <SiteChrome locale={locale} alternates={alternates} headerVariant="solid">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: localePath(locale, "/") },
          { name: t.casesPage.metaTitle, path: alternates[locale] },
        ]}
      />

      <Container width="content" className="pb-16 pt-[130px] text-center">
        <Eyebrow className="mb-5">{t.casesPage.eyebrow}</Eyebrow>
        <h1 className="m-0 text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold tracking-[-0.035em] text-paper">
          {t.casesPage.title}
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-muted">
          {t.casesPage.lede}
        </p>
      </Container>

      <section className="bg-paper">
        <Container width="content" className="py-24">
          <div className="grid gap-6 nav:grid-cols-3">
            {getCases(locale).map((study, i) => (
              <Reveal key={study.id} delay={i * 40}>
                <CaseCard study={study} locale={locale} imageFit="contain" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}

function ThankYou({
  locale,
  alternates,
}: {
  locale: Locale;
  alternates: Record<Locale, string>;
}) {
  const t = getDictionary(locale);

  return (
    <SiteChrome locale={locale} alternates={alternates} headerVariant="solid">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-coral/15 text-coral">
          <CalendarCheck className="h-7 w-7" />
        </span>
        <Eyebrow>{t.thankYouPage.eyebrow}</Eyebrow>
        <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-paper">
          {t.thankYouPage.title}
        </h1>
        <p className="mt-4 max-w-md text-muted">{t.thankYouPage.body}</p>
        <ButtonLink href={localePath(locale, "/")} variant="coral" size="lg" className="mt-8">
          <ArrowLeft className="h-4 w-4" /> {t.common.backHome}
        </ButtonLink>
      </Container>
    </SiteChrome>
  );
}
