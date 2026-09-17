import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/** Portraits are deliberately not shown; only the names are credited.
 *  The images still live in /public/uploads if they are ever reinstated. */
const founders = ["Joep Hellemons", "Tom van Biene"];

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

        <div className="border-t border-line pt-7">
          <p className="m-0 text-[15px] font-bold text-ink">{founders.join(" & ")}</p>
          <p className="m-0 mt-1 font-mono text-[9.5px] tracking-[0.14em] text-[#8A8FA0]">
            {t.about.foundersRole}
          </p>
        </div>
      </Reveal>
    </Container>
  );
}
