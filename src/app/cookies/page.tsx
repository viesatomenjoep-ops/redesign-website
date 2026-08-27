import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Cookieverklaring",
  description: "Welke cookies en lokale opslag deze website gebruikt — en waarom er geen cookiebanner is.",
  path: "/cookies",
});

// NOTE: accurate as long as analytics stays cookieless. If a cookie-based tool
// (e.g. GA4) is added later, this page and a consent banner both need revisiting.

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Juridisch" title="Cookieverklaring" updated="2026-08-27">
      <p>
        Deze verklaring beschrijft welke cookies en vergelijkbare technieken {site.name} op deze
        website gebruikt.
      </p>

      <h2>1. Gebruiken wij cookies?</h2>
      <p>
        Wij plaatsen <strong>geen tracking- of advertentiecookies</strong>. De website gebruikt
        alleen strikt noodzakelijke, functionele opslag die nodig is om de site correct te laten
        werken (bijvoorbeeld het onthouden van je voorkeur voor gereduceerde animatie). Voor dit soort
        functionele opslag is volgens de wet geen toestemming vereist, en daarom tonen wij geen
        cookiebanner.
      </p>

      <h2>2. Websitestatistieken</h2>
      <p>
        Om de website te verbeteren meten wij bezoekersaantallen en prestaties met een
        privacyvriendelijke, cookieloze statistiekdienst. Hierbij worden geen cookies geplaatst en
        geen tot personen herleidbare gegevens opgeslagen. De verzamelde gegevens zijn geaggregeerd en
        anoniem.
      </p>

      <h2>3. Externe content</h2>
      <p>
        Lettertypen worden vanaf onze eigen server geladen. De website laadt geen externe scripts of
        embeds die cookies plaatsen.
      </p>

      <h2>4. Wijzigingen</h2>
      <p>
        Mochten wij in de toekomst wel cookies gaan gebruiken die toestemming vereisen, dan passen wij
        deze verklaring aan en vragen wij vooraf je toestemming via een cookiebanner.
      </p>

      <h2>5. Meer informatie</h2>
      <p>
        Hoe wij met persoonsgegevens omgaan lees je in onze{" "}
        <Link href="/privacy">privacyverklaring</Link>. Vragen? Mail{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
