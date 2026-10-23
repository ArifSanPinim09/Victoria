# TASK 05 — Original Website Shell

```
Task ID:        05
Task Title:     Header, Navigation, Dropdown, Footer
Priority:       HIGH
Status:         DONE
Phase:          4.1
```

## Objective
Mereproduksi shared website shell sedekat mungkin dengan referensi.

## Requirements
- Header 88px, padding 5px 15px 9px, transparan di atas hero.
- Logo `team-primary.svg` 90×90, top 9px, overlap header.
- 6 menu + 38 submenu, teks & urutan identik.
- Dropdown putih + caret, item 14px/600.
- Nav active `#4AB7F3`.
- Hanya `Participate → Find a Club` yang menavigasi.
- Footer navy 88px + footer-banner dengan acknowledgement & diversity.
- Mobile: logo sekunder, hamburger 2 garis.

## Files Affected
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/footer-banner.tsx`
- `components/nav-data.ts`
- `app/globals.css`

## Dependencies
Task 01 (token & struktur menu), Task 02 (scope lock menu).

## Implementation Steps
1. Definisikan `NAV` array dari hasil audit.
2. Bangun header: logo, nav, ikon, mobile toggle.
3. Bangun dropdown (hover + klik, Escape menutup).
4. Non-Find-a-Club item: `aria-disabled`, `preventDefault`.
5. Bangun footer-banner + footer.
6. Samakan ukuran dengan token di design-spec.

## Acceptance Criteria
- [x] Tinggi header 88px
- [x] Logo 90×90 overlap header
- [x] 6 menu, 38 submenu, teks identik
- [x] Dropdown putih + caret
- [x] Menu lain tidak menavigasi
- [x] Footer + banner sesuai token
- [x] Mobile hamburger + logo sekunder

## Verification Method
Screenshot 1440px dibandingkan dengan `docs/reference/screenshots/01` dan `03`; hitung jumlah item menu di DOM (44 total).

## Result
Shell selesai dengan CSS custom untuk fidelity (bukan utility-only).

## Issues / Blockers
Ikon telepon & search dibiarkan visual only (nomor tidak terverifikasi).
