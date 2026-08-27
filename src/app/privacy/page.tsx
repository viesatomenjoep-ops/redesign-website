import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacyverklaring",
  description:
    "Hoe Viesa Automations omgaat met persoonsgegevens die via deze website worden verwerkt.",
  path: "/privacy",
});

// NOTE: template based on how the site technically works. Have it reviewed by a
// lawyer / privacy advisor before launch (see IMPLEMENTATION_PLAN §5).

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Juridisch" title="Privacyverklaring" updated="2026-08-27">
      <p>
        Deze privacyverklaring legt uit welke persoonsgegevens {site.name} verwerkt wanneer je deze
        website bezoekt of contact met ons opneemt, met welk doel dat gebeurt en welke rechten je
        hebt.
      </p>

      <h2>1. Verwerkingsverantwoordelijke</h2>
      <p>
        {site.name}, gevestigd te {site.address.city} ({site.address.country}), ingeschreven bij de
        Kamer van Koophandel onder nummer {site.kvk}, is verantwoordelijk voor de verwerking van
        persoonsgegevens zoals beschreven in deze verklaring.
      </p>
      <p>
        Contact: <a href={`mailto:${site.email}`}>{site.email}</a> — {site.phone}
      </p>

      <h2>2. Welke gegevens wij verwerken</h2>
      <h3>Contactformulier</h3>
      <p>
        Wanneer je het contact- of auditformulier invult, verwerken wij je <strong>naam</strong>, je{" "}
        <strong>e-mailadres</strong>, je <strong>bericht</strong> en — indien ingevuld — het{" "}
        <strong>webadres</strong> van je organisatie. Deze gegevens gebruiken wij uitsluitend om je
        aanvraag te beantwoorden en op te volgen.
      </p>
      <h3>Technische gegevens</h3>
      <p>
        Onze hostingpartij legt technische gegevens vast die je browser automatisch meestuurt, zoals
        je IP-adres, het tijdstip van je bezoek en je browsertype. Deze gegevens worden gebruikt voor
        de werking, beveiliging en foutopsporing van de website.
      </p>
      <h3>Afspraken inplannen</h3>
      <p>
        Voor het inplannen van een gratis audit gebruiken wij <strong>Cal.com</strong>. Als je op
        &ldquo;Vraag gratis audit aan&rdquo; klikt, worden de gegevens die je in het boekingsformulier
        invult (naam, e-mailadres, tijdzone en eventuele antwoorden op vragen) door Cal.com verwerkt
        om de afspraak vast te leggen en bevestigings- en herinneringsmails te versturen. Wij
        ontvangen deze afspraakgegevens en verwerken ze om je audit voor te bereiden en uit te
        voeren.
      </p>
      <h3>Websitestatistieken</h3>
      <p>
        Wij meten het gebruik van de website met een privacyvriendelijke, cookieloze
        statistiekdienst. Hierbij worden geen tot personen herleidbare gegevens opgeslagen; de
        statistieken zijn geaggregeerd. Zie onze{" "}
        <Link href="/cookies">cookieverklaring</Link> voor meer informatie.
      </p>

      <h2>3. Doeleinden en grondslag</h2>
      <ul>
        <li>
          <strong>Afhandelen van je aanvraag</strong> — grondslag: uitvoering van of het nemen van
          precontractuele maatregelen op jouw verzoek, dan wel ons gerechtvaardigd belang bij het
          onderhouden van klantcontact.
        </li>
        <li>
          <strong>Beveiliging en goede werking van de website</strong> — grondslag: ons
          gerechtvaardigd belang.
        </li>
        <li>
          <strong>Verbeteren van de website</strong> op basis van anonieme statistieken — grondslag:
          ons gerechtvaardigd belang.
        </li>
      </ul>

      <h2>4. Bewaartermijnen</h2>
      <p>
        Correspondentie via het contactformulier bewaren wij zolang dat nodig is voor de afhandeling
        van je vraag en, indien dit tot een opdracht leidt, voor de duur van de samenwerking en de
        wettelijke bewaartermijnen die daarop van toepassing zijn. Technische logbestanden worden na
        korte tijd verwijderd of geanonimiseerd.
      </p>

      <h2>5. Verstrekking aan derden</h2>
      <p>
        Wij verkopen je gegevens niet. Voor de uitvoering van onze dienstverlening schakelen wij de
        volgende verwerkers in:
      </p>
      <ul>
        <li>
          <strong>Hostingprovider</strong> — voor het hosten en uitleveren van de website.
        </li>
        <li>
          <strong>E-maildienst</strong> — voor het bezorgen van berichten die via het
          contactformulier worden verstuurd.
        </li>
        <li>
          <strong>Automatiseringsplatform</strong> — indien van toepassing, om aanvragen door te
          zetten naar onze interne systemen.
        </li>
        <li>
          <strong>Cal.com</strong> (Cal.com, Inc., Verenigde Staten) — voor het inplannen en beheren
          van auditafspraken.
        </li>
      </ul>
      <p>
        Met deze partijen zijn verwerkersovereenkomsten gesloten. Voor zover gegevens buiten de
        Europese Economische Ruimte worden verwerkt — zoals bij Cal.com — gebeurt dit op basis van
        passende waarborgen zoals de standaardcontractbepalingen van de Europese Commissie en, waar
        van toepassing, het EU-VS Data Privacy Framework.
      </p>

      <h2>6. Beveiliging</h2>
      <p>
        Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen
        tegen verlies of onrechtmatige verwerking, waaronder versleutelde verbindingen (HTTPS) en
        toegangsbeperking.
      </p>

      <h2>7. Jouw rechten</h2>
      <p>
        Je hebt het recht op inzage, rectificatie en verwijdering van je persoonsgegevens, het recht
        op beperking van de verwerking, het recht van bezwaar en het recht op gegevensoverdraagbaarheid.
        Neem hiervoor contact op via <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        Je hebt daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via{" "}
        <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
          autoriteitpersoonsgegevens.nl
        </a>
        .
      </p>

      <h2>8. Wijzigingen</h2>
      <p>
        Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze
        pagina, met bovenaan de datum van de laatste wijziging.
      </p>

      <h2>9. Contact</h2>
      <p>
        Vragen over deze privacyverklaring? Mail ons via{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
