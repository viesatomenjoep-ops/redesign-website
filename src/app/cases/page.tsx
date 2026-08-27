import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CaseCard } from "@/components/marketing/case-card";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { cases } from "@/content/cases";

export const metadata: Metadata = buildMetadata({
  title: "Cases",
  description:
    "Echte projecten voor echte bedrijven — van e-commerce tot agri, finance en dienstverlening.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <SiteChrome headerVariant="solid">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Cases", path: "/cases" },
        ]}
      />

      <Container width="content" className="pb-16 pt-[130px] text-center">
        <Eyebrow className="mb-5">Portfolio</Eyebrow>
        <h1 className="m-0 text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold tracking-[-0.035em] text-paper">
          Gebouwd voor elk bedrijf
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-relaxed text-muted">
          Echte projecten voor echte bedrijven — van e-commerce tot agri, finance en dienstverlening.
        </p>
      </Container>

      <section className="bg-paper">
        <Container width="content" className="py-24">
          <div className="grid gap-6 nav:grid-cols-3">
            {cases.map((study, i) => (
              <Reveal key={study.slug} delay={i * 40}>
                <CaseCard study={study} imageFit="contain" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
