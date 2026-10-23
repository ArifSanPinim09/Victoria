# TASK 06 — Find a Club Interface

```
Task ID:        06
Task Title:     Revamp Find a Club (search + map + list + detail)
Priority:       HIGH
Status:         DONE
Phase:          6
```

## Objective
Membangun halaman Find a Club yang lebih modern tanpa menyimpang dari identitas visual Lacrosse Victoria.

## Requirements
- Hero `hero--sm` 320px, H1 70px uppercase.
- Search nama/suburb/postcode/alamat.
- Daftar klub dengan selected state jelas.
- Peta interaktif tersinkron.
- Panel detail klub: nama, home ground, suburb/postcode, alamat, logo, link website, CTA ke form.
- **Tidak** ada tombol "Register Interest" per kartu.
- Pilihan klub diteruskan ke form.

## Files Affected
- `app/participate/find-a-club/page.tsx`
- `components/find-a-club/find-a-club-client.tsx`
- `components/find-a-club/club-search.tsx`
- `components/find-a-club/club-list.tsx`
- `components/find-a-club/club-detail.tsx`
- `components/find-a-club/club-map.tsx`

## Dependencies
Task 04 (dataset + map), Task 05 (shell).

## Implementation Steps
1. Buat hero + heading.
2. Buat state `query`, `selectedClubId`.
3. Filter klub case-insensitive.
4. Render list + map berdampingan (desktop) / stacked (mobile).
5. Detail panel muncul saat ada pilihan.
6. CTA "Continue to registration" scroll ke form.
7. Empty state + clear search.

## Acceptance Criteria
- [x] Search bekerja pada nama/suburb/postcode/alamat
- [x] Selected state jelas (border sky + bar kiri)
- [x] List ↔ map sinkron
- [x] Detail panel lengkap
- [x] CTA tunggal ke form
- [x] Tidak ada Register Interest per kartu
- [x] Tidak ada horizontal overflow di mobile

## Verification Method
Cari "brunswick" → 1 hasil; klik marker → kartu ter-highlight; pilih klub → form Club terisi.

## Result
Halaman Find a Club dengan search, peta, list, detail. Tanpa filter kategori (data tidak mendukung).

## Issues / Blockers
Tidak ada.
