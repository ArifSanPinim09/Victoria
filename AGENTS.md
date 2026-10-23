<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Permanent Project Memory

> **BACA FILE INI SEBELUM MEMULAI TASK APA PUN.**
> File ini adalah memori permanen proyek. Jangan menghapus aturan lama yang masih relevan.
> Setelah context compaction atau pergantian session, baca ulang: `AGENTS.md`, `docs/PROJECT_LOG.md`, `docs/NEXT-ACTIONS.md`, dan task yang sedang dikerjakan.

---

## 1. IDENTITAS PROYEK

| Field | Value |
|---|---|
| Nama | Lacrosse Victoria — Find a Club Revamp (Prototype) |
| Lokasi | `/home/about-you/Documents/Development/SanDevID/victoria` |
| Tujuan | Prototype revamp untuk presentasi tugas kuliah klien |
| Website referensi | https://lacrossevictoria.com.au/ |
| Halaman fokus | https://lacrossevictoria.com.au/participate/find-a-club |
| Bahasa antarmuka | **English only** (tidak ada opsi bahasa Indonesia) |
| Email penerima registrasi | `darapuspitanurani@gmail.com` |
| Deployment target | Vercel |

---

## 2. ⚠️ WARNING: SCOPE PROYEK TERKUNCI

Bagian ini WAJIB ada di `AGENTS.md`, `docs/PRD.md`, `docs/client-requirements.md`, dan `docs/PROJECT_LOG.md`. Jangan pernah menghapusnya.

1. Website referensi wajib diperiksa secara langsung sebelum implementasi.
2. Tampilan website asli harus direproduksi sedekat mungkin dengan referensi. **Jangan** menggunakan template SaaS, template dashboard generik, desain AI generik, atau kreativitas yang menyimpang dari visual aslinya.
3. Semua menu dan submenu utama website asli wajib tetap tersedia dengan susunan yang sama.
4. **Semua menu selain Find a Club hanya berupa elemen visual.** Ketika diklik, tidak boleh membuka halaman fungsional lain, mengarahkan ke halaman yang tidak dibangun, atau memunculkan konten palsu.
5. **Hanya journey Find a Club yang benar-benar berfungsi.**
6. Journey utama yang harus berfungsi:
   `Find a Club → Find/Search Club → Interactive Map → Select Club → Registration Form → Submit → Actual Email Delivery → Success State`
7. Halaman Find a Club boleh memiliki tata letak dan interaksi baru yang lebih modern. Namun identitas visual Lacrosse Victoria dan bagian website bersama harus tetap konsisten dengan website asli.
8. Seluruh form registrasi harus berfungsi sungguhan, termasuk validasi dan pengiriman ke alamat Gmail klien.
9. **Pesan sukses tidak boleh ditampilkan jika pengiriman email gagal.**
10. Semua perubahan harus berdasarkan kebutuhan klien, hasil audit, dan dokumentasi proyek. Jangan menambahkan fitur yang tidak diminta.

**Jika terjadi konflik antara keinginan menambah fitur baru dan batas scope, batas scope menang.**

---

## 3. ATURAN KERJA AGENT (WAJIB)

1. Jangan coding sebelum audit, PRD, dan plan selesai.
2. Jangan mengarang hasil inspeksi atau mengklaim sesuatu telah diuji tanpa benar-benar mengujinya.
3. Jangan menambah fitur di luar scope hanya untuk membuat prototype tampak lebih besar.
4. Jangan membangun halaman lain agar menu terlihat fungsional.
5. Jangan mengubah identitas visual website asli berdasarkan selera pribadi.
6. Jangan mengganti library atau framework tanpa alasan teknis.
7. Jangan menyimpan secret di source code.
8. Jangan menggunakan dummy response pada flow email final.
9. Jangan menandai task selesai ketika acceptance criteria belum terpenuhi.
10. Jangan menghilangkan kebutuhan klien dari dokumentasi.
11. Jangan membiarkan `AGENTS.md` dan `docs/PROJECT_LOG.md` kedaluwarsa setelah perubahan kode.
12. Jangan membuat klaim email terkirim hanya berdasarkan tampilan success message.
13. Jika menemukan ketidakjelasan kecil, ambil keputusan paling aman berdasarkan scope dan dokumentasikan.
14. Jika ada informasi yang benar-benar belum tersedia, tandai sebagai belum terkonfirmasi. Kerjakan bagian lain yang tidak bergantung pada informasi tersebut.
15. Setelah implementasi selesai, selalu bandingkan hasil UI dengan referensi asli.

---

## 4. TECH STACK (FINAL, JANGAN DIGANTI TANPA ALASAN)

| Layer | Pilihan | Versi terpasang |
|---|---|---|
| Framework | Next.js (App Router) | 16.4.2 |
| UI runtime | React | 19.3.0 |
| Bahasa | TypeScript | ^5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/turbopack`) + CSS custom untuk fidelity | ^4 |
| Map | Leaflet + react-leaflet | 1.9.4 / 5.0.0 |
| Tile | OpenStreetMap standard tiles (`tile.openstreetmap.org`) — atribusi wajib | — |
| Email | Resend SDK (server-side only) | ^6.34.1 |
| Data klub | Static TypeScript dataset (terverifikasi) | — |

**Larangan teknis:**
- Tidak ada `NEXT_PUBLIC_*` untuk secret.
- Tidak ada API key di browser.
- Tidak ada geocoding saat render (koordinat sudah di-precompute).
- Tidak ada database eksternal.
- Tidak ada CMS, login, dashboard admin, pembayaran.

> Catatan Next.js 16: project ini memakai `cacheComponents: true`. Baca `node_modules/next/dist/docs/` sebelum mengubah konfigurasi caching/route. Route handler dinamis wajib eksplisit.

---

## 5. DESIGN TOKENS HASIL AUDIT (SUMBER KEBENARAN VISUAL)

Diambil langsung dari computed styles website live pada 22 Oktober 2026.

| Token | Value | Sumber |
|---|---|---|
| `--lv-navy` | `#002854` (`rgb(0,40,84)`) | footer + footer-banner background |
| `--lv-sky` | `#4AB7F3` (`rgb(74,183,243)`) | `.button--secondary` bg, `.nav-link.active` color |
| `--lv-grey` | `#9FA5AB` (`rgb(159,165,171)`) | `.button--tertiary` bg |
| `--lv-ink` | `#171717` | body + heading color |
| `--lv-white` | `#FFFFFF` | — |
| `--lv-border-light` | `#F8F9FA` | `.border-light` club row divider |
| Font body | `Poppins, "Helvetica Neue", Arial, sans-serif` | Google Fonts 400/400i/500/600/700 |
| Font display | `ProximaNova-Black` | `/fonts/font.woff2` (diunduh dari situs asli) |
| Header height | `88px` | `#navbar` |
| Header padding | `5px 15px 9px` | `#navbar` |
| Container width | `1140px` (max-width, centered) | `#navbar .col-12` @1440 |
| Logo | `90×90px`, top offset `9px` | `.navbar-brand img` |
| Nav link | `14px / 600`, white, `padding: 0 16px` | `.nav-link` |
| Nav link active | color `#4AB7F3` | `.nav-link.active` |
| Dropdown panel | white bg, 1px light border, soft shadow, caret di atas, lebar ~224px | hasil screenshot |
| Dropdown item | `14px / 600`, `#000`, `padding: 0 50px 13px 30px` | `.dropdown__item` |
| Hero (home) | tinggi `705px`, bg `#000` + `site-texture.webp` | `section.hero--lg` |
| Hero heading | `70px / 500`, uppercase, `letter-spacing:-2px`, `line-height:60px`, ProximaNova-Black | `.hero__heading` |
| Hero (Find a Club) | tinggi `320px` (`hero--sm`) | `section.hero--sm` |
| Button | radius `4px`, `padding: 12px 27px`, `14px / 600`, height `56px` | `.button` |
| Button secondary | bg `#4AB7F3`, text `#002854` | `.button--secondary` |
| Button tertiary | bg `#9FA5AB`, text `#fff`, border `1px solid #9FA5AB` | `.button--tertiary` |
| Footer | bg `#002854`, height `88px`, padding `28px 0`, link `12px` white | `footer.footer` |
| Footer banner | bg `#002854` + texture, padding `163px 0 78px`, `h5 14px/600`, `p 14px/23.94px` white | `.footer-banner` |
| Breakpoints | 0 / 576 / 768 / 992 / 1240 (Bootstrap 4 grid) | `:root` vars |

---

## 6. STRUKTUR NAVIGASI (HASIL AUDIT — 6 MENU, 38 SUBMENU)

Semua item di bawah WAJIB tampil dengan urutan & kapitalisasi ini. Hanya **Participate → Find a Club** yang berfungsi.

1. **Participate** — Play, Find a Club, Schools, Coaches, Officials, Volunteers, Diversity & Inclusion, State & Rep teams, Rules of Lacrosse
2. **News & Events** — News, Calendar
3. **Competition Info** — Senior Mens, Senior Womens, Juniors, U10 Lightning Carnival #2, 2026 Olympic Cup Sixes, Tribunal & Investigation Results
4. **Club Resources** — Grants, Club Forms, Club Management, Live Scoring Information, National Integrity Framework, Accidents, Injuries and Insurance, Club Fines, Finals Outline
5. **Schools Resources** — School Rules, School Competitions, Professional Development, School Clinics, Quick Stix Lacrosse, TriBall Lacrosse
6. **About** — Lacrosse Victoria, LV Merchandise, Board of Directors and Staff, Governance, The Victorian Lacrosse Foundation, The Game of Lacrosse, Insurance Information

Header juga memiliki ikon telepon dan search (visual only) di kanan.

---

## 7. STATUS IMPLEMENTASI

Lihat `docs/PROJECT_LOG.md` untuk timeline lengkap dan `docs/NEXT-ACTIONS.md` untuk pekerjaan tersisa. Ringkasan status terkini ada di bagian 9.

---

## 8. CATATAN PERUBAHAN

### 2026-10-22 — Sesi 1: Audit, Dokumentasi, Implementasi
- **Audit langsung** `lacrossevictoria.com.au` dan `/participate/find-a-club` via Chrome DevTools Protocol (bukan asumsi). Screenshot tersimpan di `docs/reference/screenshots/`.
- Mengekstrak 6 menu utama + 38 submenu persis dari DOM live.
- Mengekstrak design tokens dari computed styles (lihat bagian 5).
- Mengunduh aset resmi: `team-primary.svg`, `team-secondary.svg`, `site-texture.webp`, `plus-light.svg`, `minus.svg`, `flags_small.png`, rainbow flag, `font.woff2` (ProximaNova-Black), dan 16 logo klub.
- Mengaudit **16 klub** (prompt menyebut 17 — di situs live hanya ada 16 baris; nama "Williamstown Lacrosse Club" di situs tertulis "Willamstown Lacrosse Club", typo asli dipertahankan agar sesuai sumber).
- Geocode 16 alamat home ground via Nominatim (OSM). Semua koordinat berasal dari sumber; tidak ada yang dibuat-buat.
- Menyusun dokumentasi lengkap di `docs/` + `docs/tasks/*.md`.
- Implementasi: shared shell (header/nav/dropdown/footer/footer-banner), homepage hero carousel, Find a Club page (search + Leaflet map + club list + detail), registration form, welcome email popup, dan route handler `/api/registrations` memakai Resend.
- **Blocker email:** `RESEND_API_KEY` dan `EMAIL_FROM` belum tersedia di environment. Implementasi selesai dan tervalidasi sampai tahap pemanggilan provider; pengiriman aktual belum dapat diuji. Status ditulis jujur di `docs/email-delivery.md`.

---

## 9. STATUS EMAIL & DEPLOYMENT (UPDATE SETIAP PERUBAHAN)

> **Cara mengaktifkan pengiriman email:** lihat `docs/email-setup-guide.md`
> (panduan langkah-demi-langkah, termasuk diagnosis kegagalan).
> Alat bantu verifikasi: `node scripts/check-email.mjs --send`.

| Item | Status |
|---|---|
| Route handler `/api/registrations` | Implemented |
| Server-side validation | Implemented |
| HTML email template (Gmail-safe) | Implemented |
| Resend SDK integration | Implemented |
| `REGISTRATION_TO_EMAIL` | `darapuspitanurani@gmail.com` (fallback di server, tidak bisa dioverride client) |
| `.env.local` | **Sudah dibuat** (template kosong, siap diisi) |
| `scripts/check-email.mjs` | **Sudah dibuat** — cek config + domain + kirim uji |
| Pembacaan env terbukti | **Ya** — dengan key palsu, API balas `502 provider_error` (bukan `503`), artinya env var terbaca |
| `RESEND_API_KEY` | **BELUM TERSEDIA** — harus diisi pemilik akun |
| `EMAIL_FROM` | **BELUM TERSEDIA** — butuh domain terverifikasi di Resend |
| Uji kirim aktual | **BELUM DILAKUKAN** (blocked oleh credential) |
| Build production | Terverifikasi (lihat `docs/PROJECT_LOG.md`) |
| Deployment Vercel | **BELUM** — butuh akses akun Vercel |

---

## 10. HASIL VERIFIKASI TERAKHIR (2026-10-22)

### Visual fidelity vs referensi (terukur, desktop 1440)

| Elemen | Referensi | Implementasi |
|---|---|---|
| Header height | 88px | 88px |
| Logo | x=142.5, y=9, 90×90 | x=142.5, y=9, 90×90 |
| Nav first item x | 217.5 | 217.5 |
| Nav link | 14px/600 #fff | 14px/600 #fff |
| Dropdown width | 224px | 226px |
| Hero H1 | 70px/500, ls -2px, lh 60px | identik |
| Button | r4, 12px 27px, h56 | identik |
| Footer bg | rgb(0,40,84) | rgb(0,40,84) |

### Struktur & scope
- 6 menu utama, **38 submenu**, hanya **1 item fungsional** (`Participate → Find a Club`).
- Item non-fungsional: `<span aria-disabled="true">`, `cursor: default`, tidak menavigasi.
- 16 klub, 16 marker, 16 logo termuat.

### Journey teruji (localhost, production build)
popup → prefill email → nav → search → select → map popup → form club → submit kosong (9 error) → submit tanpa consent (ditolak) → submit dengan consent (503, error panel, **tanpa success**, form utuh).

### Responsive teruji
390×844 / 768×1024 / 1440×900 — tanpa overflow horizontal. Mobile: search+list di atas map.

### Belum terverifikasi
- Pengiriman email aktual (butuh credential)
- Deployment Vercel (butuh akun)

---

## 11. ATURAN UNTUK AGENT BERIKUTNYA

1. Baca `AGENTS.md` ini + `docs/PROJECT_LOG.md` + `docs/NEXT-ACTIONS.md` sebelum menyentuh kode.
2. Jangan mengubah `components/nav-data.ts` tanpa audit ulang situs asli — teks & urutan harus persis.
3. Jangan menambah halaman fungsional untuk menu lain. Scope lock #4 & #5.
4. Jangan menampilkan success panel kecuali `ok: true` **dan** `providerId` ada.
5. Jangan menaruh `RESEND_API_KEY` di variabel `NEXT_PUBLIC_*` atau di client component.
6. Setelah mengubah CSS, jalankan `npm run build` lalu ukur ulang computed style terhadap token di bagian 5.
7. Setelah mengubah apa pun, perbarui `docs/PROJECT_LOG.md` dan bagian 8/9/10 file ini.
8. Untuk mengaktifkan email, ikuti `docs/email-setup-guide.md`. Verifikasi dengan
   `node scripts/check-email.mjs --send` — jangan mengklaim terkirim tanpa cek inbox.
9. Untuk QR presentasi, jalankan `node scripts/make-qr.mjs` **setelah** ngrok hidup;
   QR hanya valid selama tunnel aktif.

---

## 12. REVISI CLIENT (2026-10-22, sesi 3)

| # | Permintaan client | Status | Bukti |
|---|---|---|---|
| R1 | Consent wajib diberi bintang | `DONE` | bintang `rgb(192,57,43)` pada `enquiryConsent`; `(optional)` pada marketing |
| R2 | Klik klub → langsung ke Step 2 | `DONE` | scrollY 0→1430 (desktop), 0→1588 (mobile), form top 24px |
| R3 | QR code untuk presentasi | `DONE` | `public/qr-presentation.png`, terdekode via OpenCV |

**Catatan implementasi R2:** jangan pakai `requestAnimationFrame` untuk scroll —
tidak jalan di tab background/headless dan gagal tanpa error. Pakai `setTimeout`.
Jangan pakai `scrollIntoView` bersama `scroll-behavior: smooth`; ukur offset absolut
lalu `window.scrollTo`.

**Known trade-off:** `.lv-btn--neutral` ("Visit club website") gagal kontras
(2.48:1) karena memakai token asli `#9FA5AB`. Sengaja dipertahankan demi fidelity;
jika klien mengeluh soal aksesibilitas, ubah token + catat sebagai deviasi.
