import Image from "next/image";
import { FOOTER_LINKS } from "./nav-data";

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8.1v2.8h2.4V21h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0ZM12 3.6c-2.3 0-2.6 0-3.5.05-.9.04-1.5.18-2 .38a4 4 0 0 0-1.5 1 4 4 0 0 0-1 1.5c-.2.5-.34 1.1-.38 2C3.6 9.4 3.6 9.7 3.6 12s0 2.6.05 3.5c.04.9.18 1.5.38 2a4 4 0 0 0 1 1.5 4 4 0 0 0 1.5 1c.5.2 1.1.34 2 .38.9.05 1.2.05 3.5.05s2.6 0 3.5-.05c.9-.04 1.5-.18 2-.38a4 4 0 0 0 1.5-1 4 4 0 0 0 1-1.5c.2-.5.34-1.1.38-2 .05-.9.05-1.2.05-3.5s0-2.6-.05-3.5c-.04-.9-.18-1.5-.38-2a4 4 0 0 0-1-1.5 4 4 0 0 0-1.5-1c-.5-.2-1.1-.34-2-.38C14.6 3.6 14.3 3.6 12 3.6Zm0 1.5c2.26 0 2.53 0 3.42.05.82.04 1.27.17 1.57.29.4.15.68.33.98.63.3.3.48.58.63.98.12.3.25.75.29 1.57.05.89.05 1.16.05 3.42s0 2.53-.05 3.42c-.04.82-.17 1.27-.29 1.57a2.6 2.6 0 0 1-.63.98c-.3.3-.58.48-.98.63-.3.12-.75.25-1.57.29-.89.05-1.16.05-3.42.05s-2.53 0-3.42-.05c-.82-.04-1.27-.17-1.57-.29a2.6 2.6 0 0 1-.98-.63 2.6 2.6 0 0 1-.63-.98c-.12-.3-.25-.75-.29-1.57C5.1 14.53 5.1 14.26 5.1 12s0-2.53.05-3.42c.04-.82.17-1.27.29-1.57.15-.4.33-.68.63-.98.3-.3.58-.48.98-.63.3-.12.75-.25 1.57-.29C9.47 5.1 9.74 5.1 12 5.1Z" />
    </svg>
  );
}

export function FooterBanner() {
  return (
    <section
      className="lv-footer-banner"
      aria-label="Acknowledgement of Country and diversity statement"
    >
      <div className="lv-container">
        <hr />
        <h2 className="lv-footer-banner__heading">Lacrosse Victoria</h2>

        <div className="lv-footer-banner__row">
          <span className="lv-footer-banner__flag">
            <Image
              src="/images/brand/flags_small.png"
              alt="Aboriginal and Torres Strait Islander flags"
              width={100}
              height={25}
            />
          </span>
          <p>
            Lacrosse Victoria acknowledges the Traditional Owners and Custodians of the
            lands throughout Victoria and pays respect to the Elders past, present and
            emerging.
          </p>
        </div>

        <div className="lv-footer-banner__row">
          <span className="lv-footer-banner__flag">
            <Image
              src="/images/brand/LGBTQ_rainbow_flag_Quasar__Progress__variant_web_v2.jpg"
              alt="Progress Pride flag"
              width={100}
              height={25}
            />
          </span>
          <p>
            Lacrosse Victoria is committed to embracing diversity and eliminating all
            forms of discrimination in the provision of its services. Lacrosse Victoria
            welcomes all people irrespective of ethnicity, faith, sexual orientation and
            gender identity.
          </p>
        </div>

        <span className="lv-footer-banner__link" aria-disabled="true">
          About Diversity &amp; Inclusion
        </span>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="lv-footer" role="contentinfo">
      <div className="lv-container">
        <div className="lv-footer__inner">
          <div className="lv-footer__links">
            <span>© 2026 Lacrosse Victoria</span>
            {FOOTER_LINKS.map((label) => (
              <span key={label} aria-disabled="true">
                {label}
              </span>
            ))}
            <span>Site By Eastwood</span>
          </div>
          <div className="lv-footer__social" aria-hidden="true">
            <span>
              <FacebookIcon />
            </span>
            <span>
              <InstagramIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
