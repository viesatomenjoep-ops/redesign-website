import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden px-8 py-32 text-center xs:px-[22px]">
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M-60,300 C300,200 620,380 940,270 C1180,190 1360,250 1520,210"
          fill="none"
          stroke="#E2603F"
          strokeOpacity="0.13"
          strokeWidth="1.3"
        />
        <path
          d="M-60,350 C340,250 660,430 980,320 C1220,240 1380,300 1520,260"
          fill="none"
          stroke="#E2603F"
          strokeOpacity="0.08"
          strokeWidth="1.2"
        />
      </svg>

      <Reveal className="relative mx-auto max-w-[640px]">
        <Eyebrow className="mb-6">Gratis audit</Eyebrow>
        <h2 className="m-0 text-[clamp(2.125rem,5vw,3.625rem)] font-extrabold tracking-[-0.035em] text-paper">
          Klaar om uw bedrijf te automatiseren?
        </h2>
        <p className="mx-auto mb-10 mt-5 text-[17px] leading-relaxed text-muted">
          Vraag een gratis AI- &amp; automatiseringsaudit aan en ontdek binnen enkele dagen waar
          automatisering het meeste oplevert.
        </p>

        <div className="mx-auto max-w-[440px] rounded-card bg-paper p-6 text-left sm:p-8">
          <ContactForm variant="audit" />
        </div>
      </Reveal>
    </section>
  );
}
