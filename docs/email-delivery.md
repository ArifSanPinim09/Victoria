# Email Delivery Architecture

---

## 1. Ringkasan status (JUJUR)

| Komponen | Status |
|---|---|
| Route handler `POST /api/registrations` | ✅ Implemented |
| Server-side validation | ✅ Implemented |
| Normalisasi input | ✅ Implemented |
| HTML email template (Gmail-safe) | ✅ Implemented |
| Resend SDK integration | ✅ Implemented |
| Recipient dikunci ke `darapuspitanurani@gmail.com` | ✅ Implemented (server-side, tidak bisa dioverride) |
| Guard: tidak ada success tanpa provider ID | ✅ Implemented |
| **Pengiriman aktual teruji** | ❌ **BELUM** — `RESEND_API_KEY` & `EMAIL_FROM` tidak tersedia |

> **Tidak ada klaim bahwa email sudah masuk inbox.** Yang terverifikasi: kode memanggil Resend SDK, menerima `data.id`, dan hanya mengembalikan `ok: true` bila `data.id` ada. Tanpa credential, jalur ini belum pernah dieksekusi terhadap API nyata.

---

## 2. Arsitektur

> **Panduan langkah-demi-langkah untuk mengaktifkan pengiriman:** lihat
> [`email-setup-guide.md`](./email-setup-guide.md). Dokumen ini menjelaskan
> arsitektur dan kontraknya.

```
Browser (RegistrationForm.tsx)
   │  fetch POST /api/registrations  (JSON, no secrets)
   ▼
Next.js Route Handler  app/api/registrations/route.ts   [server-only]
   │  1. Parse JSON
   │  2. Validate (validateRegistration)
   │  3. Normalize (trim, lowercase email, strip phone formatting)
   │  4. Build HTML + plain-text fallback
   │  5. new Resend(process.env.RESEND_API_KEY).emails.send({...})
   ▼
Resend API  https://api.resend.com/emails
   │  → { data: { id: "..." }, error: null }
   ▼
Gmail inbox: darapuspitanurani@gmail.com
```

### Mengapa Route Handler, bukan Server Action

Route handler memberi kontrol penuh atas status code dan bentuk respons JSON, yang dibutuhkan untuk membedakan `validation_failed` / `not_configured` / `provider_error` di UI. Server Action akan menyulitkan pemetaan error terstruktur ini. Keduanya setara secara keamanan (server-only).

---

## 3. Konfigurasi environment

```env
# .env.local (JANGAN di-commit)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
REGISTRATION_TO_EMAIL=darapuspitanurani@gmail.com
EMAIL_FROM=Lacrosse Victoria Enquiries <enquiries@your-verified-domain.com>
```

| Variable | Wajib | Default jika kosong | Catatan |
|---|---|---|---|
| `RESEND_API_KEY` | ✅ | — | Tanpa ini route mengembalikan `not_configured` (503) |
| `REGISTRATION_TO_EMAIL` | ❌ | `darapuspitanurani@gmail.com` | Fallback hardcoded di server; **tidak** dibaca dari body request |
| `EMAIL_FROM` | ✅ | — | Harus alamat/domain terverifikasi di Resend. Tanpa ini route mengembalikan `not_configured` (503) |

`.env.example` disediakan tanpa secret.

### Persyaratan Resend yang harus dipenuhi pemilik akun

1. Buat akun Resend dan API key (`re_...`).
2. Verifikasi domain pengirim (tambah DNS record SPF + DKIM) **atau** gunakan `onboarding@resend.dev` untuk uji terbatas.
3. **Penting:** pada mode sandbox (`onboarding@resend.dev`), Resend hanya mengizinkan pengiriman ke alamat email pemilik akun. Untuk mengirim ke `darapuspitanurani@gmail.com`, **domain harus terverifikasi**.
4. Set ketiga env var di `.env.local` (lokal) dan di Vercel Project Settings → Environment Variables (production).

---

## 4. Kontrak API

### Request

```http
POST /api/registrations
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+61 412 345 678",
  "location": "Brunswick 3057",
  "clubId": "brunswick",
  "program": "Senior Women",
  "interest": "Trial / Come & Try",
  "ageGroup": "18+",
  "experience": "Beginner",
  "notes": "Played in high school.",
  "marketingConsent": false,
  "enquiryConsent": true
}
```

Field penerima **tidak** ada di kontrak. Jika client mengirim `to`/`recipient`, server mengabaikannya.

### Response

| HTTP | Body | Kapan |
|---|---|---|
| `200` | `{ ok: true, providerId: "..." }` | Resend mengembalikan `data.id` |
| `400` | `{ ok: false, error: "validation_failed", fieldErrors: { email: "...", ... } }` | validasi server gagal |
| `405` | `{ ok: false, error: "method_not_allowed" }` | bukan POST |
| `429` | `{ ok: false, error: "rate_limited" }` | >5 request/menit per IP (in-memory) |
| `503` | `{ ok: false, error: "not_configured" }` | `RESEND_API_KEY` atau `EMAIL_FROM` kosong |
| `502` | `{ ok: false, error: "provider_error" }` | Resend mengembalikan `error` |

**Success hanya jika `ok: true` DAN `providerId` ada.** UI memeriksa keduanya.

---

## 5. Validasi server (otoritatif)

Validasi client hanya untuk UX. Server memvalidasi ulang seluruh field:

| Field | Aturan |
|---|---|
| `name` | string, trim, 2–100 |
| `email` | regex email, ≤254, lowercase |
| `phone` | 6–20 karakter, hanya `[0-9 +()\-\s]`, minimal 6 digit |
| `location` | string, trim, 2–60 |
| `clubId` | harus ada di `CLUB_IDS` (16 nilai) |
| `program` | ∈ {Junior, Senior Men, Senior Women} |
| `interest` | ∈ {Trial / Come & Try, Membership} |
| `ageGroup` | ∈ {Under 10, Under 12, Under 14, Under 16, Under 18, 18+} |
| `experience` | ∈ {Never played, Beginner, Experienced} |
| `notes` | string opsional, ≤1000 |
| `marketingConsent` | boolean (opsional) |
| `enquiryConsent` | boolean, **harus `true`** |

Field tak dikenal diabaikan (whitelist), mencegah injection field ke email.

---

## 6. Format email

**Subject:** `New Lacrosse Victoria Club Enquiry — {Club Name}`

**Struktur HTML** (tabel-based, inline CSS, max-width 600px):

1. Header navy `#002854` dengan wordmark "LACROSSE VICTORIA" (teks, bukan gambar — gambar eksternal sering diblokir Gmail).
2. Bar sky `#4AB7F3` 4px.
3. Judul "New club enquiry received" + timestamp (Australia/Melbourne).
4. Blok klub: nama klub besar, home ground, suburb + postcode.
5. Tabel detail: Program · I'm interested in · Player age group · Previous experience.
6. Blok pendaftar: Name · Email (mailto link) · Phone (tel link) · Suburb/Postcode.
7. Notes (jika ada) dalam blok abu `#F8F9FA`.
8. Blok consent: dua baris dengan tanda ✓ / ✗.
9. Footer abu: "Sent from the Lacrosse Victoria Find a Club prototype."

**Plain-text fallback** disertakan untuk klien yang memblokir HTML.

**Kompatibilitas Gmail:** tabel + inline style; tanpa `<style>` block, tanpa flexbox/grid, tanpa web font, tanpa background-image. Font stack: `Arial, Helvetica, sans-serif`.

---

## 7. Anti-abuse & keamanan

| Kontrol | Implementasi |
|---|---|
| Secret tidak ke client | `RESEND_API_KEY` hanya dibaca di route handler; tidak ada `NEXT_PUBLIC_*` |
| Recipient tidak bisa diubah | tidak ada field penerima di kontrak; server hardcode/fallback |
| Header injection | subject dibangun dari nama klub yang berasal dari **dataset**, bukan input bebas |
| Rate limit | in-memory Map, 5 request/menit/IP (cukup untuk prototype; bukan solusi produksi) |
| Body size | ditolak jika > 32KB |
| XSS di email | semua nilai di-escape (`escapeHtml`) sebelum masuk template |
| Double submit | guard `submitting` di client + rate limit di server |
| Error leakage | raw provider error **tidak** dikirim ke client; hanya kode terklasifikasi |

**Batasan yang diakui:** rate limiter in-memory tidak persisten antar-instance serverless. Untuk produksi perlu Upstash/Redis. Ini prototype, dan batasannya didokumentasikan.

---

## 8. Rencana pengujian (belum dieksekusi)

Urutan yang harus dijalankan pemilik akun setelah credential tersedia:

1. Isi `.env.local` dengan `RESEND_API_KEY`, `EMAIL_FROM`.
2. `npm run dev`.
3. Buka `/participate/find-a-club`, pilih klub, isi form lengkap, submit.
4. Cek respons jaringan: harus `200 { ok: true, providerId: "..." }`.
5. Cek inbox `darapuspitanurani@gmail.com` (dan folder Spam).
6. Verifikasi seluruh field muncul benar di email.
7. Verifikasi render di Gmail desktop & mobile.
8. Uji negatif: kirim dengan `RESEND_API_KEY` salah → harus `502 provider_error`, UI menampilkan error, **tidak** ada panel sukses.
9. Uji negatif: submit tanpa C2 → harus ditolak, tidak ada request terkirim.
10. Catat timestamp, provider ID, dan status di tabel di bawah.

### Log pengujian

| Tanggal | Konfigurasi | Provider response | Status |
|---|---|---|---|
| 2026-10-23 15:1x | `from=onboarding@resend.dev` → `darapuspitanurani@gmail.com` (sending-only key) | `200 { ok: true, providerId: "01a167d3-24be-74e7-9bba-0cf5f3bed19e" }` (submit via UI) + `01a167d5-b8ce-7158-a778-169c93290a15` (check-email --send) | **Diterima Resend ✅ — inbox Gmail belum dikonfirmasi visual (perlu login)** |
| 2026-10-23 15:1x | Negative: `RESEND_API_KEY` invalid | `502 { ok: false, error: "provider_error" }`, log: `API key is invalid` | **PASS ✅** |
| 2026-10-23 15:1x | Negative: tanpa `enquiryConsent` | `400 validation_failed` → `fieldErrors.enquiryConsent` | **PASS ✅** |
| 2026-10-23 15:1x | Negative: email tidak valid | `400 validation_failed` → `fieldErrors.email` | **PASS ✅** |
| 2026-10-23 15:1x | Negative: `GET /api/registrations` | `405 method_not_allowed` | **PASS ✅** |
| 2026-10-23 15:1x | Batas sandbox: kirim ke alamat bukan pemilik | `403 validation_error` "You can only send testing emails to your own email address (darapuspitanurani@gmail.com)" | **Terkonfirmasi: key milik `darapuspitanurani@gmail.com`** |

**Temuan penting saat pengujian:**

1. `EMAIL_FROM` di `.env.local` sebelumnya berisi `nboarding@resend.dev` (huruf `o` hilang). Sudah diperbaiki menjadi `onboarding@resend.dev`. Dengan nilai lama, Resend akan menolak setiap pengiriman.
2. `scripts/check-email.mjs` gagal (exit 2) pada API key bertipe *sending-only*, karena `resend.domains.list()` mengembalikan `restricted_api_key`. Sudah diperbaiki: kondisi itu kini dilewati, bukan dianggap error.
3. Form tidak lagi bisa diklaim "terkirim" hanya dari `ok:true` — `ok:true` hanya muncul bila Resend mengembalikan message id. Sudah diverifikasi dengan message id nyata.
4. Untuk konfirmasi visual di inbox, perlu login ke `darapuspitanurani@gmail.com` (sesi browser di mesin ini tidak ada). Buka Inbox + folder Spam, cari subject `New Lacrosse Victoria Club Enquiry — Brunswick Lacrosse Club`.

**Batasan sandbox yang masih berlaku:** dengan `from=onboarding@resend.dev`, pengiriman *hanya* diizinkan ke `darapuspitanurani@gmail.com` (pemilik API key). Untuk produksi ke alamat lain, domain harus diverifikasi di Resend dan `EMAIL_FROM` diganti.

---

## 9. Perbedaan status yang harus dipahami

| Status | Arti |
|---|---|
| "Provider menerima permintaan" | Resend mengembalikan `data.id`. Ini yang diklaim UI. |
| "Email masuk inbox" | Tidak dapat diklaim tanpa membuka inbox. Di luar jangkauan kode. |
| "Email dibuka" | Tidak dilacak. |

UI menampilkan "Enquiry sent" dengan referensi provider ID — bukan "email delivered to inbox".
