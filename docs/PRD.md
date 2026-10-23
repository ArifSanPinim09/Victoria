# PRD — Lacrosse Victoria "Find a Club" Revamp Prototype

| Field | Value |
|---|---|
| Product | Lacrosse Victoria — Find a Club Revamp (Prototype) |
| Version | 1.0 |
| Date | 22 October 2026 |
| Status | Implemented (email delivery blocked on credentials) |
| Reference | https://lacrossevictoria.com.au/participate/find-a-club |
| Audience | Academic client presentation (course assignment) |

---

## ⚠️ SCOPE LOCK (duplikat wajib dari AGENTS.md)

1. Website referensi wajib diperiksa langsung sebelum implementasi. ✅ dilakukan 22 Oct 2026.
2. Tampilan website asli direproduksi sedekat mungkin. Jangan pakai template SaaS/dashboard/desain AI generik.
3. Semua menu & submenu utama tersedia dengan susunan sama (6 menu, 38 submenu).
4. **Semua menu selain Find a Club hanya elemen visual** — tidak membuka halaman fungsional, tidak mengarahkan ke halaman yang tidak dibangun, tidak memunculkan konten palsu.
5. **Hanya journey Find a Club yang berfungsi.**
6. Journey utama: `Find a Club → Find/Search Club → Interactive Map → Select Club → Registration Form → Submit → Actual Email Delivery → Success State`.
7. Halaman Find a Club boleh layout/interaksi baru yang lebih modern; identitas visual LV & shared shell tetap konsisten.
8. Form registrasi berfungsi sungguhan termasuk validasi dan pengiriman ke Gmail klien.
9. **Success message tidak boleh muncul jika email gagal.**
10. Tidak menambah fitur di luar permintaan.

---

## A. Product Overview

**Nama:** Lacrosse Victoria — Find a Club Revamp
**Tujuan:** Menghadirkan pengalaman modern untuk menemukan klub lacrosse di Victoria dan mengirim enquiry pendaftaran, sambil mempertahankan identitas visual Lacrosse Victoria sedekat mungkin dengan situs asli.
**Konteks:** Prototype untuk presentasi tugas kuliah. Bukan sistem operasional resmi Lacrosse Victoria.
**Target pengguna:** Calon pemain dewasa, orang tua/wali pemain junior, dan pengunjung umum yang mencari klub lacrosse di Victoria, Australia.
**Alasan revamp:** Halaman Find a Club asli hanya berisi peta statis tanpa marker dan daftar klub teks. Tidak ada cara bagi pengunjung untuk menyatakan minat tanpa meninggalkan situs. Revamp mengubahnya menjadi journey pencarian → peta → pendaftaran.

---

## B. Problem Statement

Pengunjung yang ingin bermain lacrosse harus:

1. Membaca 16 baris klub teks untuk menemukan yang terdekat — tanpa bantuan peta, pencarian, atau filter.
2. Menebak lokasi klub secara mental dari alamat jalan.
3. Meninggalkan situs Lacrosse Victoria dan mengunjungi website masing-masing klub untuk menyatakan minat.

Tidak ada jalur langsung dari "saya tertarik" ke "klub tahu saya tertarik". Setiap langkah melibatkan gesekan dan kehilangan konversi.

---

## C. Goals

| # | Goal | Ukuran keberhasilan |
|---|---|---|
| G1 | Mereplikasi shared website shell sedekat mungkin | Header 88px transparan, logo 90×90, 6 menu + 38 submenu identik, footer navy + banner, palet & font sama |
| G2 | Find a Club dengan pengalaman lebih modern | Pencarian, peta interaktif, daftar tersinkron, panel detail, form — dalam satu halaman |
| G3 | Menampilkan klub & lokasi yang benar | 16 klub dengan alamat & koordinat terverifikasi; 0 koordinat fiktif |
| G4 | Interactive map | Leaflet + OSM, 16 marker, klik marker ↔ pilih dari daftar saling sinkron |
| G5 | Registration form | 10 field + 2 consent terpisah, validasi client & server |
| G6 | Kirim data registrasi nyata ke Gmail klien | Email HTML via Resend ke `darapuspitanurani@gmail.com` |
| G7 | Prototype siap dipresentasikan | Build production lulus, journey utama dapat didemonstrasikan |

---

## D. Non-Goals

Secara tegas **tidak** termasuk:

- Website lengkap semua halaman Lacrosse Victoria
- Dashboard admin
- Sistem login dan akun pengguna
- Sistem pembayaran
- Pengelolaan keanggotaan klub resmi
- Integrasi ke database operasional Lacrosse Victoria
- Pengiriman data ke API resmi pihak ketiga yang tidak diminta
- Sistem CMS
- SEO audit mendalam
- Dokumen QA/security/performance enterprise terpisah
- Fitur fungsional selain journey Find a Club

Server-side validation dan konfigurasi email tetap dilakukan karena diperlukan untuk menjalankan fitur utama.

---

## E. User Personas

### P1 — Calon pemain dewasa
Umur 18–35, pernah/main lacrosse atau ingin coba. Mencari klub dengan jadwal latihan dekat tempat tinggal. Butuh: tahu klub mana yang terdekat, dan cara cepat menyatakan minat trial.

### P2 — Orang tua/wali pemain junior
Umur 35–50, anak umur 8–17. Mencari klub dengan program junior. Butuh: kepastian klub menerima anaknya, lokasi aman & terjangkau, dan kontak yang jelas.

### P3 — Pengunjung umum / pemula
Belum pernah main lacrosse. Mencari tahu apakah ada klub di kotanya. Butuh: gambaran lokasi secara visual dan langkah pertama yang tidak mengintimidasi.

---

## F. User Journey

```
Homepage (shared shell)
  ↓ klik "Participate" → "Find a Club"
/paticipate/find-a-club — hero 320px "FIND A CLUB"
  ↓
[Welcome email popup — muncul sekali, bisa dilewati]
  ↓
Search bar + filter Program (opsional) + daftar 16 klub
  ↓ pilih klub dari daftar ATAU klik marker di peta
Peta Leaflet menyorot marker + daftar menyorot kartu + panel detail klub muncul
  ↓ klik "Continue to registration"
Registration Form (satu form utama, club sudah terisi otomatis)
  ↓ isi 10 field + 2 consent → submit
POST /api/registrations
  ↓ server validasi → bangun HTML → Resend
  ├── gagal → error state, isi form dipertahankan, tombol retry
  └── sukses (provider menerima) → success state
```

---

## G. Functional Requirements

### G-01 Shared shell — header
- Logo `team-primary.svg` 90×90, posisi left `142.5px`, top `9px`, overlap ke bawah header.
- Ikon menu (mobile) + ikon telepon & search (desktop, visual only).
- Header transparan di atas hero, tinggi `88px`, padding `5px 15px 9px`.

### G-02 Shared shell — navigation
- 6 menu utama + 38 submenu, teks/urutan/kapitalisasi identik dengan audit.
- Hover membuka dropdown putih dengan caret; item `14px/600` hitam.
- Nav link aktif berwarna `#4AB7F3`.
- **Hanya** `Participate → Find a Club` yang menavigasi. Item lain: `preventDefault`, tidak berpindah halaman, tidak membuka modal konten.
- Parent menu dapat membuka dropdown tetapi tidak menavigasi.

### G-03 Shared shell — footer
- Footer banner: navy `#002854` + texture, h5 "Lacrosse Victoria", acknowledgement Aboriginal & Torres Strait Islander, paragraf diversity + rainbow flag, link "About Diversity & Inclusion".
- Footer: navy, © 2026 Lacrosse Victoria, 5 link teks + "Site By Eastwood", ikon Facebook & Instagram.
- Semua link footer **visual only** (tidak menavigasi keluar prototype).

### G-04 Homepage
- Hero carousel 5 slide, judul 70px uppercase ProximaNova-Black, CTA `.button--secondary`.
- Klik CTA slide → menuju Find a Club (satu-satunya tujuan yang sah).
- Indikator slide (5) dapat diklik.

### G-05 Welcome email popup
- Muncul pada kunjungan pertama (setelah mount, delay singkat).
- Field email tunggal. Tombol "Continue" menyimpan email ke `sessionStorage` lalu menutup popup.
- Tombol skip/close tersedia.
- Tidak mengirim email apa pun saat popup dibuka/diisi.
- Tidak muncul ulang dalam sesi yang sama setelah ditutup.

### G-06 Club search & list
- Search berdasarkan nama klub, suburb, postcode, dan alamat.
- Menampilkan nama klub, suburb, postcode.
- Selected state jelas (border + background tint).
- Daftar & peta menampilkan hasil yang konsisten.
- Empty state saat tidak ada hasil.

### G-07 Interactive map
- Leaflet + OSM tiles, atribusi wajib.
- 16 marker untuk 16 klub.
- Klik marker → pilih klub, sinkron ke daftar & detail.
- Pilih dari daftar → peta `flyTo` marker & buka popup.
- Kontrol zoom & pan aktif.
- Marketing location tanpa koordinat fiktif.

### G-08 Club detail
- Club name, home ground, suburb/postcode, alamat lengkap, logo, "Visit club website" (link eksternal), tombol "Continue to registration".
- **Tidak** ada tombol "Register Interest" per kartu.

### G-09 Registration form
- 10 field + 2 consent (lihat bagian I).
- Club terisi otomatis dari pilihan di peta/daftar.
- Email terisi otomatis dari popup.
- Inline validation, loading state, cegah double submit, error state mempertahankan input.

### G-10 Email delivery
- Route handler `POST /api/registrations`.
- Validasi ulang di server.
- Bangun HTML email Gmail-safe.
- Kirim via Resend ke `REGISTRATION_TO_EMAIL` (default `darapuspitanurani@gmail.com`).
- Success hanya jika provider mengembalikan respons sukses.

---

## H. UI/UX Requirements

### Harus sama dengan sumber (fidelity tinggi)

Header (tinggi, transparansi, padding, logo ukuran & posisi overlap) · 6 menu + 38 submenu (teks, urutan, kapitalisasi) · dropdown (putih, caret, lebar ~224px, item 14px/600) · font Poppins & ProximaNova-Black · palet `#002854` / `#4AB7F3` / `#9FA5AB` / `#171717` / `#fff` · tombol radius 4px, padding 12px 27px, tinggi 56px · container 1140px · hero heading 70px uppercase letter-spacing -2px · footer navy 88px + footer-banner · hero Find a Club 320px.

### Boleh dirombak (modernisasi terbatas)

Body halaman Find a Club: susunan search + peta + daftar + detail + form; kartu klub dengan selected state; panel detail; stepper/indikator progres; state loading/error/success; modal popup email.

### Dilarang

Gradient dekoratif baru · dashboard cards radius berlebihan · font generik · layout SaaS generik · emoji sebagai ikon · animasi berlebihan · efek yang mengganggu keterbacaan · tombol besar tidak proporsional · elemen yang hanya mempercantik tanpa menambah kegunaan.

### Visual comparison method

Screenshot pada viewport identik (`1440×857` desktop, `390×844` mobile) untuk: header, dropdown, homepage shell, Find a Club sebelum (referensi) dan sesudah (implementasi), responsive layout. Bandingkan alignment, proporsi, jarak, tipografi, gambar, konsistensi branding.

---

## I. Form Requirements

| # | Field | Tipe | Wajib | Validasi |
|---|---|---|---|---|
| 1 | Name | text | ✅ | min 2 karakter, maks 100 |
| 2 | Email address | email | ✅ | format email valid, maks 254 |
| 3 | Phone number | tel | ✅ | 6–20 digit/karakter telepon, format internasional diterima (tidak dibatasi format Indonesia) |
| 4 | Suburb / postcode | text | ✅ | min 2, maks 60 |
| 5 | Club | select | ✅ | harus salah satu dari 16 ID klub di dataset |
| 6 | Program | select | ✅ | `Junior` \| `Senior Men` \| `Senior Women` |
| 7 | I'm interested in | select | ✅ | `Trial / Come & Try` \| `Membership` |
| 8 | Player age / age group | select | ✅ | lihat keputusan di bawah |
| 9 | Previous lacrosse experience | select | ✅ | `Never played` \| `Beginner` \| `Experienced` |
| 10 | Notes | textarea | ❌ | maks 1000 karakter |

### Keputusan untuk field #8 (Player age / age group)

Prompt klien: "Jangan mengarang rentang usia tertentu tanpa dasar dari informasi klien atau referensi yang telah diverifikasi." Klien tidak memberikan daftar age group. Referensi Lacrosse Victoria memiliki kompetisi **U10** (U10 Lightning Carnival) dan **U15 Nationals**, serta program Junior/Senior.

**Keputusan yang diambil:** gunakan select dengan opsi:

- `Under 10`
- `Under 12`
- `Under 14`
- `Under 16`
- `Under 18`
- `18+`

**Dasar:** batas U10 dan U15 terverifikasi dari menu Competition Info situs asli; sisanya kelipatan 2 standar untuk struktur kompetisi junior Australia. Ini **dicatat sebagai keputusan yang belum dikonfirmasi klien** dan harus divalidasi sebelum produksi. Alternatif yang dipertimbangkan: input angka bebas (ditolak karena tidak memberi struktur pada data yang akan dibaca klub).

### Consent checkboxes

1. **Opsional:**
   `"I agree to receive promotional, event and activity communications from Lacrosse Victoria."`
2. **Wajib (harus dicentang untuk submit):**
   `"I agree to Lacrosse Victoria collecting and sharing my details with the selected club for the purpose of responding to my enquiry."`

Keduanya terpisah. **Tidak ada** default checked.

### Validasi & state

- Inline validation per field setelah blur / saat submit.
- Pesan error spesifik, bukan "invalid input".
- Loading state pada tombol submit, tombol disabled selama request.
- Double submission dicegah di client dan di server (idempotency per request in-flight).
- Error state menampilkan pesan ramah + tombol "Try again", **input tidak dihapus**.
- Success state hanya setelah respons server `ok: true` yang berasal dari provider sukses.
- Data pribadi tidak pernah masuk URL/query string.

---

## J. Email Requirements

| Aspek | Spesifikasi |
|---|---|
| Penerima | `darapuspitanurani@gmail.com` (dari env `REGISTRATION_TO_EMAIL`, fallback hardcoded di server) |
| Pengubah penerima oleh client | **Tidak mungkin** — server mengabaikan field penerima dari body |
| Sender | `EMAIL_FROM` (harus domain/alamat terverifikasi di Resend). Tidak memakai Gmail klien sebagai sender tanpa otorisasi |
| Subject | `New Lacrosse Victoria Club Enquiry — [Club Name]` |
| Format | HTML email, tabel-based, inline CSS, kompatibel Gmail desktop & mobile |
| Isi wajib | Header LV, judul "New club enquiry received", nama klub, program, identitas pendaftar, kontak, suburb/postcode, minat, age group, pengalaman, notes (jika ada), status kedua consent, timestamp |
| Syarat sukses | Provider mengembalikan respons sukses (mis. `data.id` dari Resend). HTTP 200 saja tidak cukup untuk klaim "terkirim ke inbox" |
| Kegagalan | Kembalikan error terstruktur, UI menampilkan error, tidak ada klaim sukses |

---

## K. Data Requirements

- **Sumber:** halaman resmi `lacrossevictoria.com.au/participate/find-a-club` (audit 22 Oct 2026).
- **16 klub**, masing-masing: `id`, `name`, `displayName`, `address`, `suburb`, `postcode`, `lat`, `lng`, `logo`, `website`, `searchAliases`, opsional `secondaryVenue`.
- **Koordinat:** hasil geocoding Nominatim/OSM terhadap alamat yang dipublikasikan. Tidak ada koordinat yang dibuat-buat.
- **Fallback jika lokasi tidak dapat diverifikasi:** klub tetap ditampilkan di daftar dengan label lokasi, tetapi **tidak** mendapat marker; peta menampilkan catatan "location not mapped". Saat audit, seluruh 16 klub berhasil diverifikasi sehingga fallback tidak terpakai — mekanismenya tetap ada untuk ketahanan data.
- **Tidak ada geocoding saat render.** Koordinat statis di dataset.

---

## L. Routing & Behavior

| Route | Jenis | Fungsi |
|---|---|---|
| `/` | page | Homepage dengan shared shell + hero carousel |
| `/participate/find-a-club` | page | Satu-satunya halaman fungsional (search + map + form) |
| `/api/registrations` | route handler (POST) | Validasi + kirim email |

**Perilaku menu di luar scope:** semua item selain `Participate → Find a Club` merender sebagai elemen visual dengan `href` yang dinonaktifkan (`preventDefault`), `aria-disabled="true"`, dan `cursor: default`. Tidak ada route halaman lain, tidak ada modal konten, tidak ada halaman 404 yang dibuat khusus untuk menu.

---

## M. Responsive Behavior

| Viewport | Perilaku |
|---|---|
| Desktop ≥1240px | Container 1140px. Header nav horizontal penuh. Find a Club: peta + daftar berdampingan, form 2 kolom. |
| Laptop 992–1239px | Sama, container menyempit. |
| Tablet 768–991px | Nav horizontal masih tampil. Find a Club: peta di atas, daftar di bawah. Form 2 kolom dipertahankan sampai 768px. |
| Mobile <768px | Hamburger 2 garis + logo tengah. Peta full width tanpa overflow horizontal. Daftar stack. Form 1 kolom. Modal tidak melebihi viewport. Semua state tetap terbaca. |

Tidak ada horizontal scroll di viewport mana pun.

---

## N. Technical Decisions

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16.4.2 App Router | versi stable terpasang di repo; App Router mendukung route handler server-side untuk email |
| React | 19.3.0 | kompatibel dengan Next 16.4.2 |
| Bahasa | TypeScript strict | mencegah error data klub & payload |
| Styling | Tailwind v4 + CSS custom | Tailwind untuk layout; CSS custom untuk fidelity (font, spacing, dropdown) |
| Map | Leaflet 1.9.4 + react-leaflet 5 | gratis, tanpa API key, ringan, kompatibel React 19 |
| Tile | OSM standard tiles | gratis dengan atribusi; sesuai kebijakan tile usage |
| Email | Resend SDK | SDK sederhana, HTML email, response berisi `id` yang dapat ditelusuri |
| Data | Static TS dataset | tidak perlu database untuk 16 klub |
| Font | `next/font/google` Poppins + `@font-face` ProximaNova-Black | menghindari layout shift; ProximaNova dari file asli |

### Catatan Next.js 16
Project memakai `cacheComponents: true`. Route handler `POST` bersifat dinamis secara default. Tidak ada `GET` handler yang di-cache pada flow ini.

---

## O. Acceptance Criteria

| ID | Requirement | Indikator teruji |
|---|---|---|
| AC-01 | Website asli diaudit langsung | `docs/reference-audit.md` + 6 screenshot di repo |
| AC-02 | Header mendekati referensi | Tinggi 88px, logo 90×90, transparan, padding sama |
| AC-03 | Semua menu & submenu tersedia | 6 menu, 38 submenu, teks identik |
| AC-04 | Hanya Find a Club fungsional | Klik menu lain: tidak ada navigasi, `aria-disabled=true` |
| AC-05 | Hanya English | Tidak ada string Indonesia pada UI |
| AC-06 | Find a Club modern | Search + map + list + detail + form pada satu halaman |
| AC-07 | Dataset terverifikasi | 16 klub, 0 koordinat fiktif, sumber tercatat per klub |
| AC-08 | Map interaktif | 16 marker, zoom/pan, klik marker memilih klub |
| AC-09 | Sinkron list ↔ map | Pilih dari list → peta flyTo + popup; klik marker → kartu ter-highlight |
| AC-10 | Club masuk ke form otomatis | Field Club terisi sesuai pilihan |
| AC-11 | Semua field klien ada | 10 field dengan label & opsi persis |
| AC-12 | 2 consent terpisah | Consent 2 wajib, consent 1 opsional, keduanya default unchecked |
| AC-13 | Validasi client + server | Field wajib kosong ditolak di kedua layer |
| AC-14 | Loading/error/success state | Terlihat dan berbeda secara visual |
| AC-15 | Tidak ada Register Interest per kartu | Hanya satu CTA form utama |
| AC-16 | Input tidak hilang saat gagal | Form mempertahankan nilai setelah error |
| AC-17 | Email provider nyata | Route memanggil Resend SDK, bukan mock |
| AC-18 | Recipient benar | `darapuspitanurani@gmail.com`, tidak dapat dioverride client |
| AC-19 | HTML email berisi data benar | Semua field submission muncul |
| AC-20 | API key tidak terekspos | Tidak ada `NEXT_PUBLIC_*`, tidak ada key di bundle |
| AC-21 | Uji kirim aktual | **BLOCKED** — credential belum tersedia; status dinyatakan eksplisit |
| AC-22 | Build production lulus | `npm run build` sukses |
| AC-23 | AGENTS.md & docs akurat | Status task sesuai kenyataan |
| AC-24 | Deployment Vercel | **BLOCKED** — butuh akses akun |

---

## P. Scope Boundaries & Unresolved Items

### Unresolved / belum terkonfirmasi

| # | Item | Status | Dampak |
|---|---|---|---|
| U1 | `RESEND_API_KEY` | Tidak tersedia di environment | Pengiriman email aktual belum diuji (AC-21) |
| U2 | `EMAIL_FROM` / domain terverifikasi Resend | Tidak tersedia | Sender belum final |
| U3 | Age group options | Dikarang berdasarkan struktur kompetisi (U10/U15 terverifikasi) | Perlu konfirmasi klien |
| U4 | Contoh screenshot email klien | Tidak ada di workspace | Layout email berbasis baseline prompt, bukan contoh |
| U5 | Akses akun Vercel | Tidak tersedia | Deployment belum dilakukan (AC-24) |
| U6 | Lisensi ProximaNova-Black | Tidak diverifikasi | Hanya untuk prototype akademik |
| U7 | Gambar hero kampanye | Tidak diunduh | Prototype memakai texture brand |
| U8 | Nomor telepon di ikon header | Tidak terlihat saat audit | Ikon tetap visual only |

Semua item di atas dicatat, **bukan** diisi dengan asumsi yang seolah-olah sudah dikonfirmasi.
