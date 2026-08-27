import type { Metadata } from "next";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Bedankt",
  description: "Je audit is ingepland.",
  path: "/bedankt",
  noIndex: true,
});

export default function BedanktPage() {
  return (
    <SiteChrome headerVariant="solid">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-coral/15 text-coral">
          <CalendarCheck className="h-7 w-7" />
        </span>
        <Eyebrow>Ingepland</Eyebrow>
        <h1 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-paper">
          Je audit staat in de agenda
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Je ontvangt een bevestiging per e-mail met de afspraakdetails en een agenda-uitnodiging.
          Tot snel — dan bespreken we waar automatisering bij jou het meeste oplevert.
        </p>
        <ButtonLink href="/" variant="coral" size="lg" className="mt-8">
          <ArrowLeft className="h-4 w-4" /> Terug naar home
        </ButtonLink>
      </Container>
    </SiteChrome>
  );
}
