import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
import { getDictionary, interpolate } from "@/lib/dictionaries";

const founders = [
  { name: "Tom van Biene", photo: "/uploads/portret-tom.jpg" },
  { name: "Joep Hellemons", photo: "/uploads/portret-joep.jpg" },
];

export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Container width="text" id="over-ons" className="py-24">
      <Reveal className="border-t border-line pt-[60px] text-center">
        <Eyebrow tone="navy" className="mb-5">
          {t.about.eyebrow}
        </Eyebrow>
        <h2 className="mb-6 text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold text-ink">
          {t.about.title}
        </h2>
        <p className="mb-4 text-left text-base leading-[1.75] text-muted-ink">{t.about.body1}</p>
        <p className="mb-9 text-left text-base leading-[1.75] text-muted-ink">{t.about.body2}</p>

        <div className="mx-auto grid max-w-[440px] grid-cols-2 gap-5">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col gap-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-navy shadow-[0_30px_70px_-30px_rgba(25,68,91,0.5)]">
                <Image
                  src={founder.photo}
                  alt={interpolate(t.about.photoAlt, { name: founder.name })}
                  fill
                  sizes="(max-width: 640px) 50vw, 210px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-[14.5px] font-bold text-ink">{founder.name}</div>
                <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#8A8FA0]">
                  {t.about.roleCofounder}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
