import type { Metadata } from "next";
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
import { faqItems } from "@/content/faq";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <SiteChrome headerVariant="overlay">
      <Hero />

      <SectionTile label="Testimonial">
        <Reviews />
      </SectionTile>

      <SectionTile label="Diensten" id="diensten">
        <ClientMarquee />
        <ServicesGrid />
      </SectionTile>

      <SectionTile label="Waarom Viesa" id="waarom">
        <WhyViesa />
      </SectionTile>

      <SectionTile label="Tech stack" id="stack">
        <TechStack />
      </SectionTile>

      <SectionTile label="Cases" id="cases">
        <FeaturedCases />
      </SectionTile>

      <SectionTile label="Over ons">
        <About />
      </SectionTile>

      <SectionTile label="FAQ">
        <Faq />
      </SectionTile>

      <ContactCta />

      <FaqJsonLd items={faqItems} />
    </SiteChrome>
  );
}
