import { site } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function OrganizationJsonLd() {
  const live = await getGoogleReviews();
  const ratingValue = live?.rating ?? site.rating.value;
  const reviewCount = live?.count ?? site.rating.count;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        description: site.description,
        foundingDate: site.founded,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.city,
          addressCountry: site.address.countryCode,
        },
        sameAs: [site.social.instagram],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount,
          bestRating: 5,
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: new URL(item.path, site.url).toString(),
        })),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: new URL(path, site.url).toString(),
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Netherlands" },
      }}
    />
  );
}
