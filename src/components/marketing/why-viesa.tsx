import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/** Icons are locale-independent; the copy comes from `t.whyViesa.reasons`,
 *  which is ordered to match this list. */
const reasonIcons = ["link-2", "search", "target"];

export function WhyViesa({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const reasons = t.whyViesa.reasons.map((reason, i) => ({
    ...reason,
    icon: reasonIcons[i] ?? "target",
  }));

  return (
    <section
      id="waarom"
      data-screen-label={t.sectionLabels.whyViesa}
      className="relative overflow-hidden bg-navy"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 420px at 12% 0%, rgba(226,96,63,0.10), transparent 60%), radial-gradient(680px 460px at 92% 100%, rgba(18,60,84,0.6), transparent 60%)",
        }}
      />

      <Container width="content" className="relative py-24">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow className="mb-5">{t.whyViesa.eyebrow}</Eyebrow>
          <h2 className="m-0 text-[clamp(1.875rem,3.8vw,2.75rem)] font-extrabold text-paper">
            {t.whyViesa.title}
          </h2>
        </Reveal>

        <div className="grid gap-5 nav:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal
              key={reason.icon}
              as="article"
              delay={i * 80}
              className="group flex flex-col rounded-[20px] border border-line-dark bg-navy-700/60 p-8 backdrop-blur-sm transition duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1.5 hover:border-coral"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#EE9A66,#E2603F)]">
                  <LucideIcon name={reason.icon} className="h-5 w-5 text-white" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted-2">
                  0{i + 1} / 03
                </span>
              </div>
              <h3 className="mb-3 text-[19px] font-extrabold tracking-[-0.01em] text-paper">
                {reason.title}
              </h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-muted">{reason.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
