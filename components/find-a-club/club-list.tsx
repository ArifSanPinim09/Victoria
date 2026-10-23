"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Club } from "@/lib/clubs";

type Props = {
  clubs: Club[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  totalCount: number;
  onClear: () => void;
};

export function ClubSearch({
  query,
  onQueryChange,
  totalCount,
  resultCount,
  onClear,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  totalCount: number;
  resultCount: number;
  onClear: () => void;
}) {
  return (
    <div className="lv-search">
      <label className="lv-label" htmlFor="club-search">
        Search clubs
      </label>
      <div className="lv-search__control">
        <svg
          className="lv-search__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          id="club-search"
          className="lv-input lv-search__input"
          type="search"
          placeholder="Club, suburb or postcode"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="lv-search__clear"
            aria-label="Clear search"
            onClick={onClear}
          >
            ×
          </button>
        )}
      </div>
      <p className="lv-search__meta" role="status" aria-live="polite">
        {resultCount === totalCount
          ? `${totalCount} clubs in Victoria`
          : `${resultCount} of ${totalCount} clubs ${
              resultCount === 1 ? "matches" : "match"
            } “${query.trim()}”`}
      </p>
    </div>
  );
}

export function ClubList({ clubs, selectedId, onSelect }: Props) {
  const listRef = useRef<HTMLUListElement | null>(null);

  // When the selection changes (e.g. from a map click), bring the matching
  // row into view inside the scrollable list.
  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(
      `[data-club-id="${selectedId}"]`,
    );
    row?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  if (clubs.length === 0) {
    return (
      <div className="lv-empty">
        <p className="lv-empty__title">No clubs match your search.</p>
        <p className="lv-empty__body">
          Try a suburb, a postcode, or part of a club name.
        </p>
      </div>
    );
  }

  return (
    <ul className="lv-club-list" aria-label="Lacrosse clubs" ref={listRef}>
      {clubs.map((club) => {
        const selected = club.id === selectedId;
        return (
          <li key={club.id}>
            <button
              type="button"
              className={`lv-club-card${selected ? " lv-club-card--selected" : ""}`}
              onClick={() => onSelect(club.id)}
              data-club-id={club.id}
              aria-current={selected ? "true" : undefined}
              aria-label={`${club.displayName}, ${club.suburb} ${club.postcode}${
                selected ? ", selected" : ""
              }`}
            >
              <span className="lv-club-card__logo">
                <Image
                  src={club.logo}
                  alt=""
                  width={56}
                  height={56}
                  loading="eager"
                  unoptimized
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="lv-club-card__text">
                <span className="lv-club-card__name">{club.displayName}</span>
                <span className="lv-club-card__meta">
                  {club.suburb} {club.postcode}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
