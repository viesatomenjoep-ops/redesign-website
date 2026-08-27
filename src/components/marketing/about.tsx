import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * TODO(content): founder portraits are not in the prototype export (they were
 * fillable <image-slot> placeholders). Drop real photos at
 * /public/uploads/portret-tom.jpg and /public/uploads/portret-joep.jpg.
 */
const founders = [
  { name: "Tom", role: "MEDE-OPRICHTER", photo: "/uploads/portret-tom.jpg" },
  { name: "Joep", role: "MEDE-OPRICHTER", photo: "/uploads/portret-joep.jpg" },
];

export function About() {
  return (
    <Container width="text" id="over-ons" className="py-24">
      <Reveal className="border-t border-line pt-[60px] text-center">
        <Eyebrow tone="navy" className="mb-5">
          Over ons
        </Eyebrow>
        <h2 className="mb-6 text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold text-ink">
          Gebouwd in Breda, draait door heel Nederland
        </h2>
        <p className="mb-4 text-left text-base leading-[1.75] text-muted-ink">
          Van maatwerksoftware en mobiele applicaties tot AI-agents, workflowautomatisering en
          complete digitale platformen — wij bouwen end-to-end oplossingen die aansluiten op de
          manier waarop jouw bedrijf werkt.
        </p>
        <p className="mb-9 text-left text-base leading-[1.75] text-muted-ink">
          Met 10+ jaar softwarekennis combineren we bewezen technologie met de kracht van AI. We
          houden de lijnen kort, werken in fases en blijven ook na de livegang betrokken. Eén partij
          voor software, automatisering en AI — van idee tot werkende oplossing.
        </p>

        <div className="grid max-w-[680px] grid-cols-2 gap-5">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col gap-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-navy shadow-[0_30px_70px_-30px_rgba(25,68,91,0.5)]">
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, medeoprichter van Viesa Automations`}
                  fill
                  sizes="(max-width: 640px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-[14.5px] font-bold text-ink">{founder.name}</div>
                <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#8A8FA0]">
                  {founder.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
