"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Club } from "@/lib/clubs";

const DEFAULT_CENTER: [number, number] = [-37.8136, 144.9631];

function markerIcon(selected: boolean) {
  const size = selected ? 34 : 28;
  const color = selected ? "#4AB7F3" : "#002854";
  const ring = selected ? "#002854" : "#ffffff";
  return L.divIcon({
    className: "lv-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    html: `<span style="
      display:block;width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:${color};
      border:2px solid ${ring};
      box-shadow:0 3px 8px rgba(0,0,0,.35);
    "></span>`,
  });
}

type Props = {
  clubs: Club[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  focusToken: number;
};

export function ClubMap({ clubs, selectedId, onSelect, focusToken }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const visibleIds = useMemo(() => clubs.map((c) => c.id).join(","), [clubs]);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 9,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;
    const markers = markersRef.current;

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  // Rebuild markers whenever the visible club set changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    clubs.forEach((club) => {
      const marker = L.marker([club.lat, club.lng], {
        icon: markerIcon(club.id === selectedId),
        title: club.displayName,
        alt: `${club.displayName}, ${club.suburb}`,
        keyboard: true,
      })
        .addTo(map)
        .bindPopup(
          `<strong style="font-size:13px;">${club.displayName}</strong><br><span style="font-size:12px;color:#5b6570;">${club.suburb}, ${club.postcode}</span>`,
          { closeButton: false, autoPan: true },
        );

      marker.on("click", () => onSelectRef.current(club.id));
      markersRef.current.set(club.id, marker);
    });
    // selectedId intentionally excluded: icon swap is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleIds]);

  // Swap icon on selection change without rebuilding the layer.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.setIcon(markerIcon(id === selectedId));
    });
  }, [selectedId, visibleIds]);

  // Fly to the selected marker when the selection comes from outside the map.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId || focusToken === 0) return;
    const club = clubs.find((c) => c.id === selectedId);
    const marker = markersRef.current.get(selectedId);
    if (!club || !marker) return;
    map.flyTo([club.lat, club.lng], 13, { duration: 0.7 });
    marker.openPopup();
  }, [focusToken, selectedId, clubs]);

  return (
    <div className="lv-map-wrap">
      <div
        ref={containerRef}
        className="lv-map"
        role="region"
        aria-label="Map of lacrosse clubs"
      />
      {clubs.length === 0 && (
        <div className="lv-map__empty">No clubs to show on the map.</div>
      )}
    </div>
  );
}
