import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  /** ISO date, e.g. "2026-08-27" */
  updated: string;
  children: React.ReactNode;
};

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  const updatedLabel = new Date(updated).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SiteChrome headerVariant="solid">
      <Container width="text" className="pb-10 pt-[130px]">
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-paper">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11.5px] tracking-[0.14em] text-muted-2">
          Laatst bijgewerkt: {updatedLabel}
        </p>
      </Container>

      <section className="bg-paper text-ink">
        <Container width="text" className="py-20">
          <div className="legal-prose">{children}</div>
        </Container>
      </section>
    </SiteChrome>
  );
}
