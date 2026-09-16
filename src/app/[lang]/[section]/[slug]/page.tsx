import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { ContactButton } from "@/components/contact/contact-button";
import { CaseCard } from "@/components/marketing/case-card";
import { ServiceCardVisual } from "@/components/marketing/service-card-visual";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { getCases, findCase, getOtherCases, caseAlternateSlugs } from "@/content/cases";
import { getServices, findService, serviceAlternateSlugs } from "@/content/services";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n";
import { detailPath, sectionFromSlug, sectionPath, sectionSlug } from "@/lib/route-slugs";

/**
 * Case and service detail pages share this route because both the section
 * segment and the slug are translated. `sectionFromSlug` decides which of the
 * two we are rendering; anything else 404s.
 */
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

function resolve(lang: string, segment: string) {
  if (!isLocale(lang)) return null;
  const section = sectionFromSlug(segment, lang);
  if (section !== "cases" && section !== "services") return null;
  return { locale: lang, section };
}

/** Public path of this detail page in every locale, for hreflang + switcher. */
function alternatesFor(
  section: "cases" | "services",
  id: string,
): Record<Locale, string> {
  const slugs = section === "cases" ? caseAlternateSlugs(id) : serviceAlternateSlugs(id);
  return Object.fromEntries(
    locales.map((l) => [l, detailPath(section, l, slugs[l])]),
  ) as Record<Locale, string>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, section: segment, slug } = await params;
  const resolved = resolve(lang, segment);
  if (!resolved) return {};
  const { locale, section } = resolved;

  if (section === "cases") {
    const study = findCase(locale, slug);
    if (!study) return {};
    return buildMetadata({
      locale,
      title: study.name,
      description: study.summary,
      alternates: alternatesFor("cases", study.id),
    });
  }

  const service = findService(locale, slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    title: service.title,
    description: service.intro,
    alternates: alternatesFor("services", service.id),
  });
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang, section: segment, slug } = await params;
  const resolved = resolve(lang, segment);
  if (!resolved) notFound();
  const { locale, section } = resolved;

  if (section === "cases") {
    const study = findCase(locale, slug);
    if (!study) notFound();
    return <CaseDetail locale={locale} study={study} />;
  }

  const service = findService(locale, slug);
  if (!service) notFound();
  return <ServiceDetail locale={locale} service={service} />;
}

function CaseDetail({
  locale,
  study,
}: {
  locale: Locale;
  study: NonNullable<ReturnType<typeof findCase>>;
}) {
  const t = getDictionary(locale);
  const alternates = alternatesFor("cases", study.id);
  const more = getOtherCases(locale, study.id, 3);
  const casesIndex = sectionPath("cases", locale);

  return (
    <SiteChrome locale={locale} alternates={alternates} headerVariant="solid">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: localePath(locale, "/") },
          { name: t.casesPage.metaTitle, path: casesIndex },
          { name: study.name, path: alternates[locale] },
        ]}
      />

      <Container width="content" className="pt-[120px]">
        <Link
          href={casesIndex}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-3 transition hover:text-coral"
        >
          <ArrowLeft className="h-[15px] w-[15px]" /> {t.detail.backToPortfolio}
        </Link>
      </Container>

      <Container width="content" className="pb-12 pt-14">
        <p className="mb-5 font-mono text-[11.5px] tracking-[0.22em] text-coral">{study.category}</p>
        <h1 className="m-0 max-w-[760px] text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold tracking-[-0.035em] text-paper">
          {study.name}
        </h1>
        <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-muted">{study.summary}</p>
      </Container>

      <Container width="content" className="pb-20">
        {/* Capped at 780px and object-contain: several sources are small
            (robeco 340px, schippers 558px) — stretching them to the full
            1160px container is what made them blurry. */}
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[780px] overflow-hidden rounded-[28px] bg-navy-700">
          {study.image ? (
            <Image
              src={study.image}
              alt={study.name}
              fill
              sizes="(max-width: 820px) 100vw, 780px"
              quality={90}
              className="object-contain"
              priority
            />
          ) : null}
        </div>

        {study.gallery.length > 0 ? (
          <div className="mx-auto mt-4 grid max-w-[780px] gap-4 sm:grid-cols-2">
            {study.gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-navy-700"
              >
                <Image
                  src={src}
                  alt={`${study.name} — ${i + 2}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  quality={90}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ) : null}
      </Container>

      <section className="bg-paper text-ink">
        <Container width="text" className="py-24">
          <h2 className="mb-5 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em]">
            {t.detail.aboutProject}
          </h2>
          <p className="m-0 text-base leading-[1.75] text-muted-ink">{study.description}</p>
        </Container>
      </section>

      <section className="bg-navy">
        <Container width="content" className="py-24">
          <h2 className="mb-7 text-[22px] font-extrabold tracking-[-0.02em] text-paper">
            {t.detail.moreProjects}
          </h2>
          <div className="grid gap-4 nav:grid-cols-3">
            {more.map((other) => (
              <CaseCard key={other.id} study={other} locale={locale} />
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}

function ServiceDetail({
  locale,
  service,
}: {
  locale: Locale;
  service: NonNullable<ReturnType<typeof findService>>;
}) {
  const t = getDictionary(locale);
  const alternates = alternatesFor("services", service.id);
  const others = getServices(locale).filter((s) => s.id !== service.id);
  const home = localePath(locale, "/");
  const servicesAnchor = `${home === "/" ? "" : home}/#diensten`;

  return (
    <SiteChrome locale={locale} alternates={alternates} headerVariant="solid">
      <ServiceJsonLd
        name={service.title}
        description={service.intro}
        path={alternates[locale]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: home },
          { name: t.nav.services, path: servicesAnchor },
          { name: service.title, path: alternates[locale] },
        ]}
      />

      <Container width="content" className="pt-[120px]">
        <Link
          href={servicesAnchor}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-3 transition hover:text-coral"
        >
          <ArrowLeft className="h-[15px] w-[15px]" /> {t.detail.backToServices}
        </Link>
      </Container>

      <Container width="content" className="pb-16 pt-14">
        <Eyebrow className="mb-5">{service.label}</Eyebrow>
        <h1 className="m-0 max-w-[800px] text-[clamp(2.125rem,5.2vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-paper">
          {service.title}
        </h1>
        <p className="mb-9 mt-6 max-w-[640px] text-lg leading-relaxed text-muted">
          {service.intro}
        </p>
        <ContactButton variant="coral" size="lg" />
      </Container>

      <Container width="content" className="pb-20">
        <div className="overflow-hidden rounded-[32px] border border-line-dark">
          {/* keyed on the stable id — the visual map predates translated slugs */}
          <ServiceCardVisual slug={service.id} locale={locale} />
        </div>
      </Container>

      <section className="bg-paper text-ink">
        <Container width="content" className="py-24">
          <h2 className="mb-11 text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em]">
            {t.detail.whatThisMeans}
          </h2>
          <div className="grid gap-5 nav:grid-cols-3">
            {service.features.map((feature) => (
              <div key={feature.title} className="rounded-[22px] border border-line bg-white p-7">
                <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[linear-gradient(150deg,#EE9A66,#E2603F)]">
                  <LucideIcon name={feature.icon} className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-[16.5px] font-extrabold text-ink">{feature.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-muted-ink">{feature.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy">
        <Container width="content" className="py-20">
          <h2 className="mb-7 text-[22px] font-extrabold tracking-[-0.02em] text-paper">
            {t.detail.otherServices}
          </h2>
          <div className="grid gap-4 nav:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.id}
                href={detailPath("services", locale, other.slug)}
                className="flex items-center gap-3 rounded-2xl border border-line-dark bg-navy-700 px-5 py-[18px] text-paper transition hover:border-coral"
              >
                <LucideIcon name={other.icon} className="h-[18px] w-[18px] shrink-0 text-coral" />
                <span className="text-[14.5px] font-bold">{other.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
