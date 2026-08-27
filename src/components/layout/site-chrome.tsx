import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type SiteChromeProps = {
  headerVariant?: "overlay" | "solid";
  children: React.ReactNode;
};

/** Header + <main> + Footer wrapper shared by every page. */
export function SiteChrome({ headerVariant = "solid", children }: SiteChromeProps) {
  return (
    <>
      <Header variant={headerVariant} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
