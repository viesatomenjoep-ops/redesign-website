import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { Reveal } from "@/components/motion/reveal";

const reasons = [
  {
    icon: "link-2",
    title: "Alles werkt samen",
    text: "Onze oplossingen sluiten direct aan op de systemen die u al gebruikt. Geen losse silo's, maar één werkend geheel.",
  },
  {
    icon: "search",
    title: "AI & SEO Geoptimaliseerd",
    text: "Websites en content die goed scoren in Google én zichtbaar zijn in AI-platforms zoals ChatGPT en Gemini.",
  },
  {
    icon: "target",
    title: "100% Maatwerk ROI-focus",
    text: "Elke oplossing wordt gebouwd met een concreet doel: meetbaar minder handmatig werk en meer rendement.",
  },
];

export function WhyViesa() {
  return (
    <Container width="content" className="py-24">
      <SectionHeading
        eyebrow="Waarom Viesa"
        title="Waarom bedrijven voor ons kiezen"
        className="mb-14"
      />

      <Reveal className="flex flex-col items-center justify-center gap-6 md:flex-row">
        {reasons.map((reason, i) => (
          <div
            key={reason.title}
            className="flex aspect-square w-[clamp(280px,30vw,380px)] flex-col items-center justify-center rounded-full border border-line bg-white p-[52px] text-center shadow-[0_34px_80px_-40px_rgba(17,29,54,0.28)] transition hover:-translate-y-2.5 md:-mx-6"
            style={{ zIndex: i === 1 ? 4 : 3 - i }}
          >
            <span className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-[#EEEBE2] bg-paper-2">
              <LucideIcon name={reason.icon} className="h-[22px] w-[22px] text-coral" />
            </span>
            <h3 className="mb-3 text-[19px] font-extrabold tracking-[-0.01em] text-ink">
              {reason.title}
            </h3>
            <p className="m-0 max-w-[250px] text-sm leading-relaxed text-muted-ink">{reason.text}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}
