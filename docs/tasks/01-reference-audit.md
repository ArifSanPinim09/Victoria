# TASK 01 — Reference Audit

```
Task ID:        01
Task Title:     Reference Audit (Reverse Engineering)
Priority:       CRITICAL
Status:         DONE
Phase:          1
```

## Objective
Menginspeksi langsung website Lacrosse Victoria dan mendokumentasikan semua fakta visual, struktural, dan data yang diperlukan untuk implementasi.

## Requirements
- Buka `https://lacrossevictoria.com.au/` dan `/participate/find-a-club` lewat browser.
- Ekstrak header, navigasi, dropdown, tipografi, warna, tombol, footer.
- Ekstrak seluruh menu & submenu (teks, urutan, kapitalisasi).
- Ekstrak seluruh klub + alamat + logo + website.
- Verifikasi koordinat tiap klub dari sumber (bukan dibuat).
- Simpan screenshot desktop & mobile.
- Unduh aset brand yang dapat digunakan.

## Files Affected
- `docs/reference-audit.md` (dibuat)
- `docs/reference/screenshots/*.png` (6 file)
- `public/images/brand/*` (7 file)
- `public/images/clubs/*` (16 file)
- `public/fonts/proximanova-black.woff2`

## Dependencies
Tidak ada. Task pertama.

## Implementation Steps
1. Jalankan Chrome headless dengan remote debugging.
2. Navigasi ke homepage; ekstrak computed styles + DOM.
3. Buka dropdown; screenshot; ukur panel.
4. Navigasi ke Find a Club; ekstrak baris klub.
5. Set viewport mobile 390×844; screenshot.
6. Geocode 16 alamat via Nominatim; verifikasi hasil.
7. Unduh aset brand + logo klub.
8. Tulis `docs/reference-audit.md`.

## Acceptance Criteria
- [x] Kedua URL dibuka langsung (bukan dari ingatan/search engine)
- [x] 6 screenshot tersimpan di repo
- [x] Design token terukur (bukan perkiraan)
- [x] 6 menu + 38 submenu terverifikasi
- [x] 16 klub dengan alamat terverifikasi
- [x] Semua koordinat punya sumber
- [x] Aset brand terunduh
- [x] Temuan yang belum pasti didokumentasikan

## Verification Method
Perbandingan jumlah menu (6/38) dan klub (16) terhadap DOM live; setiap koordinat punya baris `Sumber koordinat` di tabel audit.

## Result
Audit selesai. 6 screenshot, 6 menu, 38 submenu, 16 klub, 7 aset brand, 16 logo klub, 1 font. Design token lengkap (header 88px, logo 90×90, navy #002854, sky #4AB7F3, dll).

## Issues / Blockers
- Gambar hero kampanye tidak diunduh (ukuran besar, di luar journey).
- Lisensi ProximaNova-Black tidak diverifikasi.
