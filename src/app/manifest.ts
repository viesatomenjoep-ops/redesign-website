import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#19445B",
    theme_color: "#19445B",
    icons: [
      { src: "/uploads/viesa-hex.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
