import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceSlugs } from "@/content/services";
import { caseSlugs } from "@/content/cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => new URL(path, site.url).toString();

  return [
    { url: abs("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: abs("/cases"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/cookies"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...serviceSlugs.map((slug) => ({
      url: abs(`/diensten/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseSlugs.map((slug) => ({
      url: abs(`/cases/${slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
