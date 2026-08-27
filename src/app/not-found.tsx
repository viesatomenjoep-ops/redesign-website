import Link from "next/link";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteChrome headerVariant="solid">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 text-4xl font-extrabold text-paper">Pagina niet gevonden</h1>
        <p className="mt-4 max-w-md text-muted">
          De pagina die je zoekt bestaat niet (meer). Ga terug naar de homepagina.
        </p>
        <ButtonLink href="/" variant="coral" size="lg" className="mt-8">
          Naar home
        </ButtonLink>
      </Container>
    </SiteChrome>
  );
}
