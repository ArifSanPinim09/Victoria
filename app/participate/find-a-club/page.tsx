import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, FooterBanner } from "@/components/site-footer";
import { FindAClubClient } from "@/components/find-a-club/find-a-club-client";
import "@/app/find-a-club.css";

export const metadata: Metadata = {
  title: "Lacrosse Victoria | Find a Club",
  description:
    "Find a lacrosse club in Victoria, view its home ground on the map, and send an enquiry.",
};

export default function FindAClubPage() {
  return (
    <>
      <a className="lv-skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader variant="solid" />
      <main id="main" className="flex-1">
        <section className="lv-hero lv-hero--sm">
          <div className="lv-hero__scrim" aria-hidden="true" />
          <div className="lv-hero__inner lv-container lv-hero__inner--sm">
            <h1 className="lv-hero__heading">Find a Club</h1>
          </div>
        </section>
        <FindAClubClient />
      </main>
      <FooterBanner />
      <SiteFooter />
    </>
  );
}
