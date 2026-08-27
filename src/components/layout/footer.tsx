import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-navy-800 px-8 pb-10 pt-20 xs:px-[22px]">
      <Container width="wide" className="flex flex-wrap justify-between gap-10 px-0">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/uploads/viesa-hex.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-base font-extrabold tracking-tight text-paper">
              VIESA<span className="font-medium text-muted-2"> AUTOMATIONS</span>
            </span>
          </div>
          <span className="eyebrow text-[10.5px] text-[#68788F]">
            {site.address.city.toUpperCase()}, {site.address.countryCode}
          </span>
        </div>

        <div className="flex flex-wrap gap-14 text-sm leading-8 text-muted-2">
          <div>
            <div className="mb-2 font-bold text-paper">Contact</div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:text-coral">
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <a href={site.phoneHref} className="hover:text-coral">
                {site.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>
                {site.address.city}, {site.address.country}
              </span>
            </div>
            <div>KVK {site.kvk}</div>
          </div>

          <div>
            <div className="mb-2 font-bold text-paper">Sitemap</div>
            {nav.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="hover:text-coral">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 font-bold text-paper">Social</div>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>

      <Container
        width="wide"
        className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line-dark px-0 pt-6 text-[13px] text-[#4E5D75]"
      >
        <span>
          © {new Date().getFullYear()} {site.name}. Alle rechten voorbehouden.
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="hover:text-coral">
            Privacy
          </Link>
          <Link href="/cookies" className="hover:text-coral">
            Cookies
          </Link>
          <span className="eyebrow text-[10.5px]">{site.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
