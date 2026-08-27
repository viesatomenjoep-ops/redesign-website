import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { ContactButton } from "@/components/contact/contact-button";
import { ServiceCardVisual } from "@/components/marketing/service-card-visual";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { getService, services, serviceSlugs } from "@/content/services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.intro,
    path: `/diensten/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <SiteChrome headerVariant="solid">
      <ServiceJsonLd
        name={service.title}
        description={service.intro}
        path={`/diensten/${service.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Diensten", path: "/#diensten" },
          { name: service.title, path: `/diensten/${service.slug}` },
        ]}
      />

      <Container width="content" className="pt-[120px]">
        <Link
          href="/#diensten"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-3 transition hover:text-coral"
        >
          <ArrowLeft className="h-[15px] w-[15px]" /> Terug naar diensten
        </Link>
      </Container>

      <Container width="content" className="pb-16 pt-14">
        <Eyebrow className="mb-5">{service.label}</Eyebrow>
        <h1 className="m-0 max-w-[800px] text-[clamp(2.125rem,5.2vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-paper">
          {service.title}
        </h1>
        <p className="mb-9 mt-6 max-w-[640px] text-lg leading-relaxed text-muted">
          {service.intro}
        </p>
        <ContactButton variant="coral" size="lg" />
      </Container>

      <Container width="content" className="pb-20">
        <div className="overflow-hidden rounded-[32px] border border-line-dark">
          <ServiceCardVisual slug={service.slug} />
        </div>
      </Container>

      <section className="bg-paper text-ink">
        <Container width="content" className="py-24">
          <h2 className="mb-11 text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em]">
            Wat dit voor u betekent
          </h2>
          <div className="grid gap-5 nav:grid-cols-3">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[22px] border border-line bg-white p-7"
              >
                <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[linear-gradient(150deg,#EE9A66,#E2603F)]">
                  <LucideIcon name={feature.icon} className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-[16.5px] font-extrabold text-ink">{feature.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-muted-ink">{feature.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy">
        <Container width="content" className="py-20">
          <h2 className="mb-7 text-[22px] font-extrabold tracking-[-0.02em] text-paper">
            Andere diensten
          </h2>
          <div className="grid gap-4 nav:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/diensten/${other.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-line-dark bg-navy-700 px-5 py-[18px] text-paper transition hover:border-coral"
              >
                <LucideIcon name={other.icon} className="h-[18px] w-[18px] shrink-0 text-coral" />
                <span className="text-[14.5px] font-bold">{other.title}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
