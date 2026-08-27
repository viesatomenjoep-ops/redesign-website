import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCardVisual } from "@/components/marketing/service-card-visual";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <Container width="wide" className="py-24">
      <SectionHeading
        eyebrow="Wat wij doen"
        title="Onze diensten"
        lede="Zes pijlers, één aanspreekpunt: van AI-agents en automatisering tot maatwerk software en digitale platformen."
        className="mb-14"
      />

      <div className="mx-auto grid max-w-[900px] gap-[18px] nav:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 40}>
            <Link
              href={`/diensten/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_18px_44px_-30px_rgba(17,29,54,0.25)] transition duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgba(17,29,54,0.38)]"
            >
              <div className="flex items-center justify-between px-5 py-[15px]">
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-coral">
                  {service.label}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#C9C4B4]">
                  {String(i + 1).padStart(2, "0")} / 06
                </span>
              </div>

              <ServiceCardVisual slug={service.slug} />

              <div className="flex items-center justify-between gap-3 px-5 pb-[17px] pt-4">
                <h3 className="m-0 text-[17px] font-extrabold tracking-[-0.015em] text-ink">
                  {service.title}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-navy transition group-hover:border-coral group-hover:text-coral">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
