# NEXT ACTIONS

Berdasarkan kondisi project yang **benar-benar ada** per 2026-10-22.

---

## 🟢 Selesai — Resend sudah aktif (2026-10-23)

### 1. Konfigurasi Resend — AC-21 ✅ TERBUKTI TERKIRIM

**Status: jalan.** API key sudah terpasang dan Resend menerima pengiriman.

Bukti:
- Submit form `/participate/find-a-club` → `200 { ok: true, providerId: "01a167d3-…" }`
- `node scripts/check-email.mjs --send` → `✓ accepted by Resend`
- Uji negatif (API key invalid) → `502 provider_error` (benar, tidak menipu)
- Probe ke alamat non-pemilik → `403`, membuktikan key milik `darapuspitanurani@gmail.com`

**Dua bug yang ditemukan & diperbaiki saat pengujian:**
1. `EMAIL_FROM=nboarding@resend.dev` (huruf `o` hilang) → semua kiriman akan ditolak. Sudah jadi `onboarding@resend.dev`.
2. `check-email.mjs` menganggap `restricted_api_key` sebagai fatal. Kini dilewati.

**Yang masih perlu dilakukan manusia (tidak bisa diotomasi):**
- Login ke `darapuspitanurani@gmail.com`, cek Inbox **dan Spam**, cari subject
  `New Lacrosse Victoria Club Enquiry — Brunswick Lacrosse Club`.
- Kalau tidak ada di Inbox maupun Spam, cek dashboard Resend → Emails untuk status
  `delivered` / `bounced`.

**Batasan yang tetap berlaku (Jalur A / sandbox):** dengan
`EMAIL_FROM=onboarding@resend.dev`, Resend **hanya** mengizinkan pengiriman ke
`darapuspitanurani@gmail.com`. Untuk kirim ke alamat lain (produksi), domain harus
diverifikasi (Jalur B) — lihat `email-setup-guide.md`.

> Batas free tier: **100 email/hari**.

---

## 🔴 Blocker tersisa

### 2. Deployment Vercel — memblokir AC-24

1. `vercel link` atau import repo di dashboard.
2. Set `RESEND_API_KEY`, `REGISTRATION_TO_EMAIL`, `EMAIL_FROM` di Project Settings.
3. Deploy, lalu uji journey Find a Club dari URL production (bukan localhost).
4. Catat URL deployment di `docs/PROJECT_LOG.md`.

---

## 🟡 Perlu konfirmasi klien

| # | Item | Pertanyaan |
|---|---|---|
| 1 | Age group options | Apakah `Under 10 / 12 / 14 / 16 / 18 / 18+` sesuai kebutuhan klub? Klien tidak memberi daftar; ini interpretasi. |
| 2 | Contoh email | Apakah ada screenshot contoh email yang harus ditiru? Saat ini memakai baseline prompt. |
| 3 | Nomor telepon header | Apakah ikon telepon perlu menampilkan nomor? Nomor tidak terlihat saat audit. |

---

## 🟢 Pekerjaan yang bisa dilanjutkan tanpa blocker

| # | Item | Prioritas |
|---|---|---|
| 1 | Uji responsive di tablet (768px) dengan screenshot nyata | Medium |
| 2 | Perbandingan visual side-by-side header implementasi vs referensi pada 1440px | High |
| 3 | Tambah `robots` meta untuk mencegah indexing prototype | Low |
| 4 | Uji keyboard-only pada dropdown & modal | Medium |
| 5 | Cek Lighthouse accessibility | Low |

---

## ❌ Jangan dikerjakan (melanggar scope)

- Halaman Schools / News / Competition / Club Resources / About
- Login, admin dashboard, pembayaran
- Newsletter system
- Database / CMS
- Email konfirmasi ke pendaftar
- Filter kategori tanpa data pendukung
