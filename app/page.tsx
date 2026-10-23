import { SiteHeader } from "@/components/site-header";
import { SiteFooter, FooterBanner } from "@/components/site-footer";
import { HomeHero } from "@/components/home-hero";
import { WelcomePopup } from "@/components/welcome-popup";

export default function Home() {
  return (
    <>
      <a className="lv-skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <HomeHero />
      </main>
      <FooterBanner />
      <SiteFooter />
      <WelcomePopup />
    </>
  );
}
