import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { CaseCard } from "@/components/marketing/case-card";
import { Reveal } from "@/components/motion/reveal";
import { cases } from "@/content/cases";

export function FeaturedCases() {
  return (
    <div id="werk">
      <Container width="narrow" className="py-24 pb-8">
        <SectionHeading
          eyebrow="Cases"
          title="Gebouwd voor elk bedrijf"
          lede="Echte projecten voor echte bedrijven — van e-commerce tot dienstverlening en alles daartussenin."
        />
      </Container>

      <Reveal className="mx-auto max-w-[900px] px-5">
        <Carousel
          ariaLabel="Uitgelichte cases"
          slideClassName="basis-full sm:basis-1/2"
          options={{ align: "start" }}
        >
          {cases.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </Carousel>
      </Reveal>

      <div className="py-16 text-center">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition hover:text-coral"
        >
          Bekijk volledig portfolio <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
