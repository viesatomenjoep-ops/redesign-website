import Link from "next/link";
import { site } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { sectionPath } from "@/lib/route-slugs";

// NOTE: accurate as long as analytics stays cookieless. If a cookie-based tool
// (e.g. GA4) is added later, this page and a consent banner both need revisiting.

/** Prose only — see the note in `privacy-body.tsx` about staying Dutch. */
export function CookiesBody({ locale }: { locale: Locale }) {
  return (
    <>
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

      <h2>3. Afspraken inplannen (Cal.com)</h2>
      <p>
        Wanneer je op &ldquo;Vraag gratis audit aan&rdquo; klikt, laden wij de planningsmodule van{" "}
        <strong>Cal.com</strong>. Pas op dat moment — dus alleen na jouw klik — wordt de Cal.com-code
        geladen en kan Cal.com functionele opslag plaatsen op het domein <code>cal.com</code> om de
        boekingskalender te laten werken. Meer informatie staat in de{" "}
        <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
          privacyverklaring van Cal.com
        </a>
        . Klik je niet op de knop, dan wordt er niets van Cal.com geladen.
      </p>

      <h2>4. Overige externe content</h2>
      <p>
        Lettertypen worden vanaf onze eigen server geladen. Op de reviewsectie tonen wij Google-
        beoordelingen; de profielfoto&rsquo;s daarbij worden als afbeelding vanaf de servers van
        Google geladen. Dit plaatst geen cookies. Afgezien van de planningsmodule hierboven laadt de
        website geen externe scripts of embeds die cookies plaatsen.
      </p>

      <h2>5. Wijzigingen</h2>
      <p>
        Mochten wij in de toekomst wel cookies gaan gebruiken die toestemming vereisen, dan passen wij
        deze verklaring aan en vragen wij vooraf je toestemming via een cookiebanner.
      </p>

      <h2>6. Meer informatie</h2>
      <p>
        Hoe wij met persoonsgegevens omgaan lees je in onze{" "}
        <Link href={sectionPath("privacy", locale)}>privacyverklaring</Link>. Vragen? Mail{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
