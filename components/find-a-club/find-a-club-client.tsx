"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CLUBS, searchClubs } from "@/lib/clubs";
import { ClubSearch, ClubList } from "./club-list";
import { ClubDetail } from "./club-detail";
import { RegistrationForm } from "./registration-form";

/** Space kept above the form when we auto-scroll to Step 2 (matches CSS). */
const SCROLL_MARGIN_PX = 24;

const ClubMap = dynamic(
  () => import("./club-map").then((mod) => mod.ClubMap),
  {
    ssr: false,
    loading: () => (
      <div className="lv-map-wrap">
        <div className="lv-map lv-map--loading">
          <span className="lv-map__loading-text">Loading map…</span>
        </div>
      </div>
    ),
  },
);

export function FindAClubClient() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusToken, setFocusToken] = useState(0);
  const formRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollRef = useRef(false);

  const results = useMemo(() => searchClubs(query), [query]);

  const selectedClub = useMemo(
    () => CLUBS.find((club) => club.id === selectedId) ?? null,
    [selectedId],
  );

  /**
   * Client revision (2026-10-22): clicking a club goes straight to Step 2.
   *
   * Sequencing notes:
   *  - the scroll runs on a timer, not requestAnimationFrame: rAF is throttled
   *    or suspended in background/headless tabs, which would silently skip the
   *    scroll;
   *  - the target position is measured inside the timer, after the detail panel
   *    and the prefilled Club field are in the DOM, otherwise the anchor is
   *    measured too high;
   *  - `html { scroll-behavior: smooth }` already animates the move, so plain
   *    `window.scrollTo` is enough; reduced-motion users get an instant jump.
   */
  useEffect(() => {
    if (!pendingScrollRef.current || !selectedId) return;
    pendingScrollRef.current = false;
    const target = formRef.current;
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timer = setTimeout(() => {
      const top =
        target.getBoundingClientRect().top + window.scrollY - SCROLL_MARGIN_PX;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduced ? "auto" : "smooth",
      });

      // Move focus so assistive tech follows the page, without stealing the
      // caret into an input (which would open the mobile keyboard).
      target.focus({ preventScroll: true });
    }, 60);

    return () => clearTimeout(timer);
  }, [selectedId]);

  const selectFromList = useCallback((id: string) => {
    setSelectedId(id);
    setFocusToken((token) => token + 1);
    pendingScrollRef.current = true;
  }, []);

  const selectFromMap = useCallback((id: string) => {
    setSelectedId(id);
    pendingScrollRef.current = true;
  }, []);

  const handleClubChange = useCallback((id: string) => {
    setSelectedId(id);
    setFocusToken((token) => token + 1);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const firstInput = formRef.current?.querySelector<HTMLElement>("input, select");
    setTimeout(() => firstInput?.focus({ preventScroll: true }), 420);
  }, []);

  return (
    <div className="lv-find">
      <div className="lv-container">
        <div className="lv-find__intro">
          <p className="lv-eyebrow">Step 1</p>
          <h2 className="lv-h2">Find a club near you</h2>
          <p className="lv-find__lede">
            Search by club name, suburb or postcode, then pick a club on the map or in
            the list. Your choice carries straight into the enquiry form.
          </p>
        </div>

        <div className="lv-find__layout">
          <div className="lv-find__map-col">
            <ClubMap
              clubs={results}
              selectedId={selectedId}
              onSelect={selectFromMap}
              focusToken={focusToken}
            />
            <p className="lv-find__map-note">
              Map data © OpenStreetMap contributors. Markers show each club&apos;s
              published home ground.
            </p>
          </div>

          <div className="lv-find__list-col">
            <ClubSearch
              query={query}
              onQueryChange={setQuery}
              totalCount={CLUBS.length}
              resultCount={results.length}
              onClear={() => setQuery("")}
            />
            <div className="lv-find__list-scroll">
              <ClubList
                clubs={results}
                selectedId={selectedId}
                onSelect={selectFromList}
                query={query}
                onQueryChange={setQuery}
                totalCount={CLUBS.length}
                onClear={() => setQuery("")}
              />
            </div>
          </div>
        </div>

        {selectedClub ? (
          <ClubDetail club={selectedClub} onContinue={scrollToForm} />
        ) : (
          <div className="lv-prompt">
            <p className="lv-prompt__title">Select a club to continue</p>
            <p className="lv-prompt__body">
              Pick a club from the list or tap a marker on the map and we&apos;ll show
              its home ground and the enquiry form.
            </p>
          </div>
        )}

        <div
          ref={formRef}
          className="lv-find__form-anchor"
          tabIndex={-1}
          aria-live="off"
        >
          <RegistrationForm
            clubId={selectedId}
            onClubChange={handleClubChange}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
