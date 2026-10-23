# PROJECT LOG

Sumber kebenaran status implementasi dan riwayat pekerjaan.

---

## ⚠️ SCOPE PROYEK TERKUNCI

1. Website referensi wajib diperiksa langsung sebelum implementasi.
2. Tampilan direproduksi sedekat mungkin; **tidak** template SaaS/dashboard/desain AI generik.
3. Semua menu & submenu utama tersedia dengan susunan sama.
4. **Semua menu selain Find a Club hanya elemen visual** — tidak membuka halaman fungsional, tidak mengarahkan ke halaman yang tidak dibangun, tidak memunculkan konten palsu.
5. **Hanya journey Find a Club yang berfungsi.**
6. Journey utama: `Find a Club → Find/Search Club → Interactive Map → Select Club → Registration Form → Submit → Actual Email Delivery → Success State`.
7. Halaman Find a Club boleh layout/interaksi baru; identitas visual & shared shell tetap konsisten.
8. Form registrasi berfungsi sungguhan termasuk validasi & pengiriman ke Gmail klien.
9. **Success message tidak boleh muncul jika pengiriman email gagal.**
10. Tidak menambah fitur yang tidak diminta.

---

## Timeline

### 2026-10-22 — Sesi 1

#### Phase 0 — Inspeksi project
- Repo: Next.js 16.4.2 + React 19.3.0 + TS + Tailwind v4, hasil `create-next-app` (default template, belum dimodifikasi).
- `git log`: 1 commit ("Initial commit from Create Next App"). Tidak ada remote.
- `app/`: hanya `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico` (semua boilerplate).
- `public/`: hanya 5 SVG boilerplate Vercel.
- `docs/`: hanya `promting.md` (brief klien).
- **Kesimpulan:** project praktis kosong. Tidak ada implementasi sebelumnya untuk dipertahankan. Baseline screenshot diambil dari template default (tidak diperlukan karena tidak ada UI yang perlu dibandingkan).
- Dependency ditambahkan: `leaflet@1.9.4`, `react-leaflet@5.0.0`, `resend@6.34.1`, `@types/leaflet@1.9.22`.

#### Phase 1 — Reverse engineering (audit langsung)
- Browser automation (Chrome 149 headless, CDP) membuka `lacrossevictoria.com.au` dan `/participate/find-a-club`.
- 6 screenshot disimpan ke `docs/reference/screenshots/`.
- Design tokens diekstrak dari computed styles (bukan perkiraan).
- 6 menu utama + 38 submenu diekstrak dari DOM.
- 16 klub + alamat + logo + website diekstrak dari DOM.
- Aset diunduh: 2 logo SVG, texture, 2 ikon, 2 gambar bendera, font ProximaNova, 16 logo klub.
- Output: `docs/reference-audit.md`.

#### Phase 2 — Dokumentasi & planning
- `AGENTS.md` diperbarui (memori permanen + scope lock + token + status).
- Dibuat: `docs/README.md`, `PRD.md`, `client-requirements.md`, `reference-audit.md`, `design-spec.md`, `user-flow-and-form.md`, `email-delivery.md`, `implementation-plan.md`, `PROJECT_LOG.md`, `NEXT-ACTIONS.md`, `docs/tasks/01..08.md`.

#### Phase 3 — Implementasi
- Shared shell: `SiteHeader` (logo 90×90, 6 menu, dropdown, ikon), `SiteFooter`, `FooterBanner`.
- Homepage: hero carousel 5 slide + welcome email popup.
- Find a Club: search, Leaflet map 16 marker, club list, detail panel, form.
- Form: 10 field + 2 consent, validasi client, loading/error/success.
- API: `POST /api/registrations` + Resend + HTML email template.

#### Phase 4 — Verifikasi
- `npm run build` → lihat bagian Verifikasi.
- Journey diuji di browser lokal (lihat bagian Verifikasi).

---

## Status per task

| Task | Status | Bukti |
|---|---|---|
| 01 Reference Audit | `DONE` | `docs/reference-audit.md`, 6 screenshot |
| 02 PRD & Planning | `DONE` | 10 dokumen + 8 task file |
| 03 Email Delivery Foundation | `BLOCKED` | kode selesai; uji kirim nyata butuh `RESEND_API_KEY` + `EMAIL_FROM` |
| 04 Club Data & Map | `DONE` | 16 klub, koordinat Nominatim, marker render |
| 05 Original Website Shell | `DONE` | header/nav/dropdown/footer sesuai token |
| 06 Find a Club Interface | `DONE` | search + map + list + detail |
| 07 Registration Form | `DONE` | 10 field + 2 consent + state |
| 08 Final Verification & Deployment | `BLOCKED` | build, journey, responsive, visual terverifikasi; email + deploy perlu credential/akun |

---

## Verifikasi

| Item | Hasil |
|---|---|
| `npm run build` | Lihat output di bawah |
| TypeScript check | strict, lulus |
| Journey lokal (localhost) | diuji via CDP: buka Find a Club, search, pilih klub, form terisi, submit |
| Email kirim nyata | **BELUM** — blocked |
| Deployment Vercel | **BELUM** — butuh akun |

---

## Bug ditemukan & diperbaiki

| # | Bug | Perbaikan |
|---|---|---|
| 1 | Geocoding MCC "2 Roy St Melbourne 3004" salah ke Glenroy 3046 | query diperbaiki menjadi "Roy Street, Melbourne, Victoria 3004" → `-37.8462570, 144.9778840` |
| 2 | Geocoding Paisley Park gagal (query terlalu spesifik) | query disederhanakan → `-37.8401929, 144.8576436` |
| 3 | Footer link membuka halaman yang tidak ada | dijadikan elemen visual non-navigasi |

---

## Issue belum selesai

| # | Issue | Dampak |
|---|---|---|
| 1 | `RESEND_API_KEY` belum ada | email tidak dapat dikirim/diuji |
| 2 | `EMAIL_FROM` belum ada | sender belum final |
| 3 | Akses Vercel belum ada | belum deploy |
| 4 | Age group belum dikonfirmasi klien | data form mungkin perlu disesuaikan |

---

## Task berikutnya

Lihat `docs/NEXT-ACTIONS.md`. Untuk mengaktifkan pengiriman email ke Gmail klien,
ikuti `docs/email-setup-guide.md`.

---

## 2026-10-22 — Sesi 2: Verifikasi aksesibilitas, perbaikan fidelity, tooling email

#### Aksesibilitas & kualitas kode
- axe-core dijalankan pada homepage + Find a Club. Awal: 2 dan 3 violation
  (termasuk `nested-interactive` impact *serious*). Setelah perbaikan: **0 violation**.
- `npx eslint .` awal: 3 error + 1 warning → **0 / 0**.
- Perbaikan: `role="listbox"/"option"` bersarang di club-list diganti list semantik
  + `aria-current`; `<h5>` footer banner → `<h2>` (style 14px/600 dipertahankan);
  footer banner diberi landmark label; 3× `react-hooks/set-state-in-effect`
  diperbaiki; ref cleanup di `club-map.tsx`.

#### Bug fidelity yang ditemukan & diperbaiki (diukur ulang terhadap situs live)

Dokumentasi sesi 1 mengklaim header "identik"; pengukuran ulang membuktikan sebaliknya.

| Elemen | Referensi | Sebelum | Sesudah |
|---|---|---|---|
| Nav item pertama | x=315 | x=225 | **x=315** |
| Padding header | `0 15px`, inner penuh 88px | `5px 15px 9px`, inner 55px | **`0 15px`, inner 100%** |
| Logo | y=9 | y=9 (via `top:4px` + padding) | **y=9** |
| Nav link box | 21px, y=33.5 | 55px | **21px, y=33.5** |
| Ikon kanan | x=1214/1250, 24×24, y=32 | x=1192/1236, 38×38 | **x=1214/1250, 24×24** |
| Dropdown | tanpa border, tanpa caret, radius 8px, shadow `2px 2px 26px rgba(0,0,0,.2)`, wrapper `15px 0 0`, panel 224px `20px 0`, item terakhir tanpa padding bawah | border + caret + shadow salah | **identik** (panel y=69.5 h=333, item 1 y=89.5 h=34, terakhir y=361.5 h=21) |

Dropdown direstrukturisasi menjadi wrapper + panel agar cocok dengan
`.dropdown__menu > ul` di situs asli.

#### Tooling email (baru)
- `.env.local` dibuat (template kosong, sudah di-`.gitignore`).
- `scripts/check-email.mjs` — cek config, daftar domain terverifikasi, kirim 1 email uji.
- `docs/email-setup-guide.md` — panduan operasional 2 jalur + tabel diagnosis.
- **Pembacaan env terbukti:** dengan API key palsu, route membalas
  `502 provider_error` (bukan `503 not_configured`) → `.env.local` benar-benar dibaca
  saat `npm run start`. Setelah uji, file dikembalikan ke kondisi kosong.

#### Yang masih terbuka
- Pengiriman email aktual (butuh `RESEND_API_KEY` + `EMAIL_FROM`).
- Deployment Vercel.
- Hero Find a Club: referensi memakai `#banner-image` + container 1180px/padding 20px
  (`h1` x=150, y=200); implementasi masih container 1140px + scrim (`h1` x=165, y=228).

---

## 2026-10-22 — Sesi 3: Revisi client (consent, auto-scroll, QR)

Tiga permintaan client dari chat WhatsApp.

#### R1 — Consent wajib diberi bintang
- Consent kedua (`enquiryConsent`, wajib) kini punya `<span class="lv-label__req">*</span>`
  + `<span class="sr-only">(required)</span>` untuk pembaca layar.
- Consent pertama (`marketingConsent`, opsional) diberi label `(optional)` agar
  tidak ambigu — sebelumnya dua checkbox tanpa penanda apa pun.
- Warna bintang `rgb(192,57,43)` (`--lv-error`), konsisten dengan field wajib lain.
- Terverifikasi desktop + mobile 390px.

#### R2 — Setelah klik klub langsung ke Step 2
- Pilih klub (dari list **atau** marker peta) → halaman otomatis scroll ke form.
- Implementasi: `pendingScrollRef` + `useEffect` pada `selectedId`, hitung
  `getBoundingClientRect().top + window.scrollY - 24` lalu `window.scrollTo`.
- **Dua bug ditemukan saat implementasi:**
  1. `requestAnimationFrame` **tidak pernah jalan** di tab headless/background →
     scroll dilewati tanpa error. Diganti `setTimeout(60)`.
  2. `scrollIntoView` + `scroll-behavior: smooth` saling mengganggu saat pengukuran;
     diganti `window.scrollTo` dengan offset absolut.
- Anchor `tabIndex={-1}` + `focus({preventScroll:true})` agar pembaca layar ikut
  pindah tanpa membuka keyboard virtual di HP.
- Menghormati `prefers-reduced-motion` (lompat instan).
- Terukur: desktop `scrollY 0 → 1430` (form top 24px), mobile `0 → 1588` (top 24px).

#### R3 — QR code untuk presentasi
- `scripts/make-qr.mjs` — deteksi otomatis URL ngrok (`127.0.0.1:4040`) atau terima
  URL manual; keluarkan `public/qr-presentation.png` (1024px, navy `#002854`) +
  file label berisi instruksi.
- **QR diverifikasi dengan decoder sungguhan** (OpenCV `QRCodeDetector`), bukan
  diasumsikan dari tampilan:
  `https://2a38-103-179-248-121.ngrok-free.app/participate/find-a-club`
- Catatan penting: QR hanya valid selama tunnel ngrok hidup.

#### Status pemeriksaan
- Build lulus, ESLint 0 error / 0 warning.
- axe mobile: 1 sisa isu `color-contrast` pada `.lv-btn--neutral`
  ("Visit club website", putih di `#9FA5AB` = 2.48:1). **Sengaja tidak diubah** —
  `#9FA5AB` adalah token `.button--tertiary` dari situs asli (AGENTS.md §5);
  mengubahnya akan melanggar aturan fidelity. Dicatat sebagai trade-off.
- Journey publik via ngrok: 16 kartu, 16 marker, auto-scroll jalan, submit tetap
  `503 not_configured` (tanpa success palsu), overflowX 0.
- Screenshot: `rev-desktop-consent-asterisk.png`, `rev-mobile-autoscroll-step2.png`.

---

## Verifikasi (2026-10-22, build production)

### Build
```
> next build
▲ Next.js 16.4.2 (Turbopack)
✓ Compiled successfully
✓ Running TypeScript ... Finished TypeScript
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/registrations
└ ○ /participate/find-a-club
```

### Pengukuran visual vs referensi (desktop 1440×857)

| Elemen | Referensi | Implementasi | Status |
|---|---|---|---|
| Tinggi header | 88px | 88px | ✅ |
| Logo posisi | x=142.5, y=9, 90×90 | x=142.5, y=9, 90×90 | ✅ |
| Nav mulai | x=217.5 | x=217.5 | ✅ |
| Nav link | 14px / 600 / #fff | 14px / 600 / #fff | ✅ |
| Nav active | #4AB7F3 | #4AB7F3 | ✅ |
| Dropdown lebar | 224px | 226px | ✅ (±2px) |
| Dropdown item | 14px/600, pad 0 50px 13px 30px | sama | ✅ |
| Hero H1 | 70px/500, ls -2px, lh 60px, uppercase | sama | ✅ |
| Button | radius 4px, pad 12px 27px, h 56px | sama | ✅ |
| Footer bg | rgb(0,40,84) | rgb(0,40,84) | ✅ |
| Container | 1140px | 1140px | ✅ |

### Struktur menu
- 6 menu utama ✅
- 38 submenu ✅ (9 + 2 + 6 + 8 + 6 + 7)
- Item fungsional: **1** (`Participate → Find a Club`) ✅
- Item lain: `<span aria-disabled="true">`, tidak menavigasi ✅

### Journey (diuji di localhost, build production)
1. Homepage memuat, judul benar ✅
2. Popup email muncul ✅
3. Email popup → `sessionStorage` ✅
4. Nav dropdown → Find a Club berpindah halaman ✅
5. Email ter-prefill di form registrasi ✅
6. Search "eltham" → 1 hasil ✅
7. Pilih klub → detail panel + marker popup + form Club terisi ✅
8. Submit kosong → 9 field error tampil ✅
9. Submit tanpa consent C2 → ditolak, pesan consent tampil ✅
10. Submit dengan consent (tanpa credential email) → HTTP 503, panel error tampil, **tidak ada panel sukses**, data form utuh ✅
11. Map: 16 marker, tile OSM termuat, zoom control berfungsi ✅
12. 16/16 logo klub termuat ✅

### Responsive

| Viewport | Overflow X | Layout | Form kolom |
|---|---|---|---|
| 390×844 | tidak | search+list di atas map (order 1/2) | 1 kolom |
| 768×1024 | tidak | search+list di atas map | 2 kolom |
| 1440×900 | tidak | map kiri, list kanan | 2 kolom |

### API (uji negatif)

| Test | Hasil |
|---|---|
| POST valid, tanpa `RESEND_API_KEY` | `503 {"ok":false,"error":"not_configured"}` ✅ |
| POST invalid (semua field salah) | `400 validation_failed` + 10 fieldErrors ✅ |
| GET /api/registrations | `405 method_not_allowed` ✅ |
| Success tanpa provider id | tidak mungkin — kode mensyaratkan `data.id` ✅ |

### Yang BELUM diverifikasi
- Pengiriman email aktual ke `darapuspitanurani@gmail.com` (butuh `RESEND_API_KEY` + `EMAIL_FROM`)
- Deployment Vercel (butuh akses akun)

### Screenshot implementasi tersimpan
`docs/reference/screenshots/impl-01..impl-10*.png`
