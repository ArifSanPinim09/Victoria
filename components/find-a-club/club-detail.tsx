"use client";

import Image from "next/image";
import type { Club } from "@/lib/clubs";

export function ClubDetail({
  club,
  onContinue,
}: {
  club: Club;
  onContinue: () => void;
}) {
  return (
    <section className="lv-detail" aria-labelledby="selected-club-heading">
      <div className="lv-detail__head">
        <span className="lv-detail__logo">
          <Image
            src={club.logo}
            alt={`${club.displayName} logo`}
            width={88}
            height={88}
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </span>
        <div>
          <p className="lv-eyebrow">Selected club</p>
          <h2 className="lv-detail__name" id="selected-club-heading">
            {club.displayName}
          </h2>
          <p className="lv-detail__sub">
            {club.suburb}, {club.postcode}
          </p>
        </div>
      </div>

      <div className="lv-detail__grid">
        <div>
          <p className="lv-detail__label">Home ground</p>
          <p className="lv-detail__value">
            {club.address}
            <br />
            {club.suburb}, {club.postcode}
          </p>
        </div>

        <div>
          <p className="lv-detail__label">Location on map</p>
          <p className="lv-detail__value lv-detail__coords">
            {club.lat.toFixed(5)}, {club.lng.toFixed(5)}
          </p>
        </div>
      </div>

      {club.secondaryVenue && (
        <div className="lv-detail__secondary">
          <p className="lv-detail__label">{club.secondaryVenue.label}</p>
          <p className="lv-detail__value">
            {club.secondaryVenue.address}
            <br />
            {club.secondaryVenue.suburb}, {club.secondaryVenue.postcode}
          </p>
          <p className="lv-hint">
            Shown as published by Lacrosse Victoria. The map marker marks the main home
            ground only.
          </p>
        </div>
      )}

      <div className="lv-detail__actions">
        <button type="button" className="lv-btn lv-btn--primary" onClick={onContinue}>
          Continue to registration
        </button>
        <a
          className="lv-btn lv-btn--neutral"
          href={club.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit club website
        </a>
      </div>
    </section>
  );
}
