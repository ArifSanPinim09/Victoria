# TASK 04 — Club Data and Map

```
Task ID:        04
Task Title:     Dataset Klub Terverifikasi + Interactive Map
Priority:       HIGH
Status:         DONE
Phase:          6.2–6.3
```

## Objective
Menyiapkan dataset 16 klub dengan koordinat terverifikasi dan peta Leaflet yang tersinkron dengan daftar klub.

## Requirements
- 16 klub: id, name, displayName, address, suburb, postcode, lat, lng, logo, website, aliases.
- Tidak ada koordinat fiktif.
- Marker untuk setiap klub; klik marker memilih klub.
- Pilih dari daftar → peta flyTo + popup.
- Zoom & pan aktif; atribusi OSM.
- Klub tanpa koordinat tidak diberi marker (fallback tersedia).

## Files Affected
- `lib/clubs.ts`
- `components/find-a-club/club-map.tsx`
- `components/find-a-club/club-list.tsx`
- `public/images/clubs/*`

## Dependencies
Task 01 (alamat & logo), Task 02 (spesifikasi map).

## Implementation Steps
1. Geocode 16 alamat via Nominatim; verifikasi postcode cocok.
2. Bangun `lib/clubs.ts` dengan tipe `Club`.
3. Buat `ClubMap` (react-leaflet, dynamic import `ssr:false`).
4. Custom divIcon: default abu, selected sky.
5. Sinkronisasi `selectedClubId` dua arah.
6. Tangani dua klub berbagi lokasi (offset visual).

## Acceptance Criteria
- [x] 16 klub, semua punya lat/lng bersumber
- [x] Marker render untuk 16 klub
- [x] Klik marker → klub terpilih
- [x] Pilih dari list → flyTo + popup
- [x] Zoom/pan aktif
- [x] Atribusi OSM tampil
- [x] Tidak ada koordinat dibuat-buat

## Verification Method
Bandingkan setiap lat/lng dengan hasil Nominatim; cek marker count di DOM = 16; klik marker dan pastikan kartu ter-highlight.

## Result
Dataset 16 klub lengkap. Peta Leaflet dengan marker custom, sinkron dua arah, offset untuk Williamstown ganda.

## Issues / Blockers
Akurasi koordinat level jalan/reserve, bukan titik lapangan. Dicatat sebagai keterbatasan.
