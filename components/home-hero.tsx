"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  cta: string;
  kicker: string;
  detail: string;
};

/**
 * Slide content mirrors the five campaign slides observed on the live
 * homepage during the audit (docs/reference-audit.md section 4).
 * Campaign artwork was not downloaded, so the media panel renders a typographic
 * card in brand colours instead of the original photograph.
 */
const SLIDES: Slide[] = [
  {
    title: "2026 LV Awards Announced",
    cta: "View Winners Here",
    kicker: "Lacrosse Victoria Awards",
    detail: "Season 2026",
  },
  {
    title: "5th Cup Anniversary",
    cta: "Read More",
    kicker: "Lacrosse Together Cup",
    detail: "Five years of pride, passion and community",
  },
  {
    title: "Top honours at U15 Nationals",
    cta: "Read More",
    kicker: "National Championships",
    detail: "Victoria at the 2026 U15 Nationals",
  },
  {
    title: "Come & Try Lacrosse",
    cta: "Resources",
    kicker: "PJ Lynch Reserve, Altona North",
    detail: "Sunday 18 October, 10am – 11am",
  },
  {
    title: "2026 winners revealed",
    cta: "See the winners",
    kicker: "Imagery Awards",
    detail: "The shots that defined the season",
  },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="lv-hero lv-hero--home"
      aria-roledescription="carousel"
      aria-label="Lacrosse Victoria highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lv-hero__scrim" aria-hidden="true" />
      <div className="lv-hero__inner">
        <div className="lv-container">
          <div className="lv-slider">
            <div className="lv-slide">
              <div>
                <h1 className="lv-slide__title">{slide.title}</h1>
                <Link href="/participate/find-a-club" className="lv-btn lv-btn--primary">
                  {slide.cta}
                </Link>
              </div>

              <div className="lv-slide__media">
                <div>
                  <div className="lv-slide__media-inner">{slide.kicker}</div>
                  <div className="lv-slide__media-sub">{slide.detail}</div>
                </div>
              </div>
            </div>

            <ul className="lv-slider__dots">
              {SLIDES.map((item, i) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className="lv-slider__dot"
                    aria-current={i === index}
                    aria-label={`${i + 1} of ${SLIDES.length}: ${item.title}`}
                    onClick={() => setIndex(i)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
