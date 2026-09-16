import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { CaseCard } from "@/components/marketing/case-card";
import { Reveal } from "@/components/motion/reveal";
import { getCases } from "@/content/cases";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { sectionPath } from "@/lib/route-slugs";

export function FeaturedCases({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const cases = getCases(locale);

  return (
    <div id="werk">
      <Container width="narrow" className="py-24 pb-8">
        <SectionHeading
          eyebrow={t.featuredCases.eyebrow}
          title={t.featuredCases.title}
          lede={t.featuredCases.lede}
        />
      </Container>

      <Reveal className="mx-auto max-w-[900px] px-5">
        <Carousel
          ariaLabel={t.featuredCases.carouselLabel}
          slideClassName="basis-1/2 sm:basis-1/4"
          options={{ align: "start" }}
        >
          {cases.map((study) => (
            <CaseCard key={study.slug} study={study} locale={locale} imageFit="contain" />
          ))}
        </Carousel>
      </Reveal>

      <div className="py-16 text-center">
        <Link
          href={sectionPath("cases", locale)}
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition hover:text-coral"
        >
          {t.featuredCases.viewAll} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
