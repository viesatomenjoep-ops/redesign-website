import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { tech, aiStudio } from "@/content/tech";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export function TechStack({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const loop = [...tech, ...tech];

  return (
    <Container width="narrow" className="py-24">
      <SectionHeading
        eyebrow={t.techStack.eyebrow}
        title={t.techStack.title}
        lede={t.techStack.lede}
      />

      <div
        className="mt-9 overflow-hidden py-6"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max gap-[18px]" style={{ animationDuration: "45s" }}>
          {loop.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex w-[130px] flex-col items-center justify-center gap-3.5"
            >
              <div className="flex h-[70px] w-[70px] items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={46}
                  height={46}
                  className="h-[46px] w-[46px] object-contain"
                />
              </div>
              <span className="text-sm font-bold text-ink">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-6 border-t border-line pt-9 text-center">
        <p className="eyebrow mb-6 text-navy">{t.techStack.aiStudio}</p>
        <div className="flex flex-wrap items-center justify-center gap-11">
          {aiStudio.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-2.5 text-[17px] font-semibold text-[#333B48]"
            >
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              {item.name}
            </span>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
