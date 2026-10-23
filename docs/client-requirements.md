# Client Requirements — Source of Truth

Dokumen ini memisahkan **permintaan eksplisit klien**, **interpretasi**, **batas scope**, dan **hal yang belum terkonfirmasi**.

---

## ⚠️ SCOPE LOCK

1. Website referensi wajib diperiksa langsung sebelum implementasi. ✅
2. Tampilan direproduksi sedekat mungkin dengan referensi. **Tidak** boleh template SaaS / dashboard generik / desain AI generik.
3. Semua menu & submenu utama tersedia dengan susunan sama.
4. **Semua menu selain Find a Club hanya elemen visual.** Tidak membuka halaman fungsional, tidak mengarahkan ke halaman yang tidak dibangun, tidak memunculkan konten palsu.
5. **Hanya journey Find a Club yang berfungsi.**
6. Journey utama: `Find a Club → Find/Search Club → Interactive Map → Select Club → Registration Form → Submit → Actual Email Delivery → Success State`.
7. Halaman Find a Club boleh layout/interaksi baru yang lebih modern; identitas visual LV & shared shell tetap konsisten.
8. Form registrasi berfungsi sungguhan termasuk validasi dan pengiriman ke Gmail klien.
9. **Success message tidak boleh muncul jika pengiriman email gagal.**
10. Tidak menambah fitur yang tidak diminta.

---

## 1. Permintaan eksplisit klien (verbatim dari brief)

| # | Permintaan | Status | Bukti |
|---|---|---|---|
| R1 | Framework Next.js versi stable terbaru | ✅ | Next.js 16.4.2 (versi terpasang di repo) |
| R2 | Deployment target Vercel | ⏸️ | Project siap deploy; akses akun belum tersedia |
| R3 | Email penerima `darapuspitanurani@gmail.com` | ✅ | `REGISTRATION_TO_EMAIL` fallback di server |
| R4 | Map berisi lokasi asli klub lacrosse di Victoria | ✅ | 16 klub, koordinat dari Nominatim |
| R5 | Bahasa antarmuka English saja | ✅ | Semua string UI English |
| R6 | Prototype untuk presentasi, bukan sistem operasional | ✅ | Non-goals ditegakkan |
| R7 | Reverse engineering website asli lebih dulu | ✅ | `docs/reference-audit.md` + 6 screenshot |
| R8 | Menyusun PRD sebelum coding | ✅ | `docs/PRD.md` |
| R9 | Membuat AGENTS.md sebagai project memory | ✅ | `AGENTS.md` |
| R10 | Task breakdown per file markdown | ✅ | `docs/tasks/01..08.md` |
| R11 | Popup email registrasi saat website dibuka | ✅ | Welcome popup di homepage |
| R12 | Popup → email dibawa ke form sebagai nilai awal | ✅ | `sessionStorage['lv-prefill-email']` |
| R13 | Popup tidak boleh mengirim email | ✅ | Tidak ada network call dari popup |
| R14 | Interactive map (Leaflet + OSM) | ✅ | Leaflet 1.9.4 + react-leaflet 5 |
| R15 | Marker per klub + sinkron dengan daftar | ✅ | `selectedClubId` dua arah |
| R16 | Form 10 field sesuai daftar klien | ✅ | `docs/user-flow-and-form.md` §5 |
| R17 | 2 consent checkbox terpisah, tanpa default checked | ✅ | C1 opsional, C2 wajib |
| R18 | Tidak ada tombol "Register Interest" per kartu | ✅ | Hanya satu CTA form |
| R19 | Email HTML rapi di Gmail | ✅ | Template tabel + inline CSS |
| R20 | Subject `New Lacrosse Victoria Club Enquiry — [Club Name]` | ✅ | lihat route handler |
| R21 | API key tidak boleh di browser | ✅ | Server-only, tidak ada `NEXT_PUBLIC_*` |
| R22 | `.env.example` tanpa secret | ✅ | ada di root |
| R23 | Uji pengiriman nyata | ⏸️ | **BLOCKED** — credential belum tersedia |
| R24 | Responsive desktop/tablet/mobile | ✅ | 3 viewport diuji |
| R25 | Build production lulus | ✅ | `npm run build` |
| R26 | Dokumentasi jujur (tidak mengklaim yang belum diuji) | ✅ | status email ditulis eksplisit |

---

## 2. Interpretasi (keputusan yang saya ambil, bukan permintaan verbatim)

| # | Area | Interpretasi | Alasan |
|---|---|---|---|
| I1 | Age group options | `Under 10 / 12 / 14 / 16 / 18 / 18+` | Klien tidak memberi daftar. U10 & U15 terverifikasi dari menu Competition Info situs asli. **Belum dikonfirmasi klien.** |
| I2 | Filter di halaman Find a Club | **Tidak ada filter**, hanya search | Dataset tidak punya data program per klub; filter akan mengklaim data yang tidak ada |
| I3 | Popup frekuensi | Sekali per **sesi** (`sessionStorage`) | `localStorage` akan mematikan fitur untuk demo berikutnya |
| I4 | Peta referensi tanpa marker | Ditambah marker | Klien minta marker; referensi tidak punya |
| I5 | Header di halaman Find a Club | Navy solid, bukan transparan | Hero Find a Club memakai texture navy, nav putih tetap terbaca |
| I6 | "Visit Website" klub | Link eksternal `target="_blank" rel="noopener"` | Referensi membuka di tab sama; tab baru lebih aman untuk prototype |
| I7 | Klub dengan 2 lokasi (MCC) | Home Ground jadi lokasi utama, lokasi junior jadi info tambahan tanpa marker | Menghindari klaim cakupan yang tidak diverifikasi |
| I8 | Nama "Willamstown" | Dipertahankan sesuai sumber + alias "Williamstown" untuk search | Jangan mengoreksi data sumber secara diam-diam |
| I9 | Gambar hero homepage | Texture brand, bukan foto kampanye | Foto kampanye tidak diunduh (di luar journey) |
| I10 | Form: club bisa diubah | Ya, select tetap bisa diubah dan menyinkron ke peta | Pengguna harus bisa memperbaiki pilihan |

---

## 3. Batas scope (yang TIDAK dikerjakan)

- Halaman fungsional selain Find a Club (Schools, News, Competition, Club Resources, About)
- Login / akun pengguna
- Dashboard admin
- Pembayaran
- Database / CMS
- Pencarian global di header
- Newsletter system (popup bukan newsletter)
- Email konfirmasi ke pendaftar
- Multi-bahasa
- SEO/analytics

---

## 4. Belum terkonfirmasi (butuh keputusan klien/pemilik)

| # | Item | Dampak | Tindakan sementara |
|---|---|---|---|
| U1 | `RESEND_API_KEY` | email tidak bisa dikirim | Implementasi selesai; status dinyatakan blocked |
| U2 | `EMAIL_FROM` / domain terverifikasi Resend | sender belum final | `.env.example` menyediakan placeholder |
| U3 | Age group options | data form mungkin tidak sesuai kebutuhan klub | dipakai daftar U10–18+ |
| U4 | Contoh screenshot email | layout email mungkin beda dari ekspektasi | memakai baseline prompt |
| U5 | Akses Vercel | belum deploy | project siap deploy |
| U6 | Lisensi ProximaNova-Black | risiko legal jika dipublikasikan | prototype akademik saja |
| U7 | Nomor telepon di header | ikon tidak berfungsi penuh | dibiarkan visual only |
