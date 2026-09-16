import Image from "next/image";
import { clients } from "@/content/tech";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/** Infinite logo marquee. The track is duplicated so the -50% keyframe loops seamlessly. */
export function ClientMarquee({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const loop = [...clients, ...clients];

  return (
    <div className="pt-14">
      <p className="eyebrow mb-8 text-center text-[#7A8699]">{t.clientMarquee.title}</p>
      <div
        className="flex w-full justify-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div
          className="animate-marquee flex w-max items-center gap-[100px] px-[50px]"
          style={{ animationDuration: "26s" }}
        >
          {loop.map((client, i) => (
            <Image
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              width={150}
              height={client.height}
              style={{ height: client.height, width: "auto" }}
              className="max-w-[150px] object-contain opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
