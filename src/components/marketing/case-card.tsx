import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/schema";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { detailPath } from "@/lib/route-slugs";

type CaseCardProps = {
  study: CaseStudy;
  locale: Locale;
  className?: string;
  imageFit?: "cover" | "contain";
};

export function CaseCard({ study, locale, className, imageFit = "cover" }: CaseCardProps) {
  return (
    <Link
      href={detailPath("cases", locale, study.slug)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_18px_44px_-26px_rgba(17,29,54,0.3)] transition duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-26px_rgba(17,29,54,0.4)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE4]">
        {study.image ? (
          <Image
            src={study.image}
            alt={study.name}
            fill
            sizes="(max-width: 900px) 50vw, 300px"
            className={cn(imageFit === "cover" ? "object-cover object-top" : "object-contain")}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-muted-ink/60">
            {study.name}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-2.5 border-t border-[#EEEBE2] px-5 py-4">
        <span className="flex flex-col gap-[3px]">
          <span className="font-mono text-[9px] tracking-[0.14em] text-coral">{study.category}</span>
          <span className="text-base font-extrabold tracking-[-0.01em] text-ink">{study.name}</span>
        </span>
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-line text-navy transition group-hover:border-coral group-hover:text-coral">
          <ArrowUpRight className="h-[15px] w-[15px]" />
        </span>
      </div>
    </Link>
  );
}
