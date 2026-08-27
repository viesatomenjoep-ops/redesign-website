import { Archivo, IBM_Plex_Mono, Outfit } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
  variable: "--font-outfit",
});

export const fontVariables = `${archivo.variable} ${plexMono.variable} ${outfit.variable}`;
