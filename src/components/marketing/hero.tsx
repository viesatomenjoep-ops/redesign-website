"use client";

import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { Typewriter } from "@/components/motion/typewriter";
import { useContactDialog } from "@/components/contact/contact-dialog";
import { site } from "@/lib/site";

const pillars = [
  { n: "01", title: "AI-Calling agents", tag: "Telefonie" },
  { n: "02", title: "AI-Chatbots", tag: "Klantenservice" },
  { n: "03", title: "Workflow-automatisering", tag: "Integraties" },
  { n: "04", title: "Software & dashboards", tag: "Maatwerk" },
];

export function Hero() {
  const { open } = useContactDialog();

  return (
    <section
      id="top"
      className="relative flex min-h-[96vh] flex-col justify-center overflow-hidden bg-navy"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 12%, rgba(15,92,102,.4), transparent 65%), radial-gradient(700px 500px at 8% 88%, rgba(18,60,84,.5), transparent 60%)",
        }}
      />

      <Container width="wide" className="relative pb-16 pt-[170px]">
        <div className="grid items-center gap-12 nav:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <h1 className="m-0 max-w-[12ch] text-[clamp(2.875rem,7vw,6rem)] font-extrabold leading-[0.99] tracking-[-0.035em] text-paper">
              <Typewriter text="Wij maken werkprocessen slimmer en mobieler." speed={62} />
            </h1>
            <p className="mb-11 mt-8 max-w-[560px] text-lg leading-relaxed text-muted">
              <Typewriter
                text="Met combinatie van 10+ jaar softwarekennis met de kracht van AI om bedrijven slimmer, sneller en efficiënter te laten werken."
                speed={16}
                startDelay={900}
              />
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Button type="button" variant="coral" size="lg" onClick={open}>
                Plan een strategiegesprek
              </Button>
              <ButtonLink href="#werk" variant="outline" size="lg">
                Bekijk ons werk
              </ButtonLink>
            </div>
          </div>

          <ul className="flex flex-col">
            {pillars.map((p) => (
              <li
                key={p.n}
                className="flex items-baseline gap-[18px] border-b border-paper/15 px-3 py-5 first:border-t"
              >
                <span className="font-mono text-[11px] text-[#5E8CA0]">{p.n}</span>
                <span className="flex-1 text-[19px] font-bold tracking-[-0.01em] text-paper">
                  {p.title}
                </span>
                <span className="text-[12.5px] text-[#8899B0]">{p.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container width="wide" className="relative pb-10">
        <div className="flex flex-wrap items-center justify-center gap-3.5 border-t border-paper/10 pt-6 text-center font-mono text-[13.5px] tracking-[0.18em] text-[#8899B0]">
          <span>AI-AGENTS · AUTOMATISERING · SAAS en APPS · E-COMMERCE · STRATEGIE</span>
          <span className="text-[#5C6C84]">· EST. {site.founded}</span>
        </div>
      </Container>
    </section>
  );
}
