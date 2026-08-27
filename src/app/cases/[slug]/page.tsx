import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Container } from "@/components/ui/container";
import { CaseCard } from "@/components/marketing/case-card";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { caseSlugs, getCase, otherCases } from "@/content/cases";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.name,
    description: study.summary,
    path: `/cases/${study.slug}`,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const more = otherCases(study.slug, 3);

  return (
    <SiteChrome headerVariant="solid">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Cases", path: "/cases" },
          { name: study.name, path: `/cases/${study.slug}` },
        ]}
      />

      <Container width="content" className="pt-[120px]">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-3 transition hover:text-coral"
        >
          <ArrowLeft className="h-[15px] w-[15px]" /> Terug naar portfolio
        </Link>
      </Container>

      <Container width="content" className="pb-12 pt-14">
        <p className="mb-5 font-mono text-[11.5px] tracking-[0.22em] text-coral">{study.category}</p>
        <h1 className="m-0 max-w-[760px] text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold tracking-[-0.035em] text-paper">
          {study.name}
        </h1>
        <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-muted">{study.summary}</p>
      </Container>

      <Container width="content" className="pb-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-navy-700">
          {study.image ? (
            <Image
              src={study.image}
              alt={study.name}
              fill
              sizes="(max-width: 1160px) 100vw, 1160px"
              className="object-cover object-top"
              priority
            />
          ) : null}
        </div>
      </Container>

      <section className="bg-paper text-ink">
        <Container width="text" className="py-24">
          <h2 className="mb-5 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em]">
            Over dit project
          </h2>
          <p className="m-0 text-base leading-[1.75] text-muted-ink">{study.description}</p>
        </Container>
      </section>

      <section className="bg-navy">
        <Container width="content" className="py-24">
          <h2 className="mb-7 text-[22px] font-extrabold tracking-[-0.02em] text-paper">
            Meer projecten
          </h2>
          <div className="grid gap-4 nav:grid-cols-3">
            {more.map((other) => (
              <CaseCard key={other.slug} study={other} />
            ))}
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
