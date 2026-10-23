# User Flow & Form Specification

---

## 1. Journey utama (end-to-end)

```
┌──────────────────────────────────────────────────────────────┐
│ 1. LANDING — /                                              │
│    Shared shell: header + nav + hero carousel               │
│    Popup welcome email muncul (sekali per sesi)             │
└───────────────────────────┬──────────────────────────────────┘
                            │ klik "Participate" → "Find a Club"
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. FIND A CLUB — /participate/find-a-club                   │
│    hero--sm "FIND A CLUB" 320px                             │
│    Search bar · Program filter · Club list · Leaflet map    │
└───────────────────────────┬──────────────────────────────────┘
                            │ ketik nama/suburb/postcode ATAU klik marker
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. SELECT CLUB                                              │
│    Kartu ter-highlight · marker membesar & jadi sky blue    │
│    Panel detail klub muncul di bawah peta                   │
└───────────────────────────┬──────────────────────────────────┘
                            │ klik "Continue to registration"
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. REGISTRATION FORM                                        │
│    Club terisi otomatis · email dari popup terisi otomatis  │
│    10 field + 2 consent                                     │
└───────────────────────────┬──────────────────────────────────┘
                            │ submit
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. POST /api/registrations                                  │
│    Server validasi → normalisasi → HTML → Resend            │
└───────────┬──────────────────────────────────┬───────────────┘
            │ provider error                   │ provider OK
            ▼                                  ▼
┌───────────────────────────┐    ┌──────────────────────────────┐
│ 6a. ERROR STATE           │    │ 6b. SUCCESS STATE            │
│ Input dipertahankan       │    │ "Enquiry sent"               │
│ Tombol "Try again"        │    │ Ringkasan klub + email       │
│ Tidak ada klaim sukses    │    │ Tombol "Find another club"   │
└───────────────────────────┘    └──────────────────────────────┘
```

---

## 2. Welcome email popup

### Perilaku

| Aspek | Keputusan |
|---|---|
| Trigger | mount homepage (delay 1200ms agar tidak menabrak paint pertama) |
| Frekuensi | sekali per sesi browser (`sessionStorage` key `lv-popup-dismissed`) |
| Field | 1 × email input, opsional diisi |
| Tombol utama | "Continue" → simpan email ke `sessionStorage` (`lv-prefill-email`), tutup popup |
| Tombol sekunder | "Skip for now" → tutup tanpa menyimpan |
| Tombol close | ikon × kanan atas → sama dengan skip |
| Escape key | menutup popup |
| Backdrop click | menutup popup |
| Fokus | trap fokus di dalam dialog; fokus awal ke input email |
| Pengiriman email | **tidak ada** — popup tidak memicu email apa pun |
| Prefill | email dipakai sebagai nilai awal field "Email address" di form registrasi |

### Mengapa sekali per sesi, bukan `localStorage`

`localStorage` akan menyembunyikan popup selamanya setelah kunjungan pertama, membuat demo presentasi kehilangan fitur ini. `sessionStorage` mempertahankan perilaku "tidak mengganggu" dalam satu sesi sambil memungkinkan popup muncul lagi di sesi/demo berikutnya. Ini keputusan UX yang didokumentasikan, bukan default library.

### Validasi popup

- Email tidak wajib valid untuk menutup popup (pengguna boleh skip).
- Jika diisi, format email divalidasi sebelum disimpan. Jika tidak valid, tampilkan pesan inline dan jangan simpan.
- Popup tidak pernah memblokir akses ke halaman.

---

## 3. Search & filter

### Search

| Aspek | Spesifikasi |
|---|---|
| Field | text input, placeholder "Search by club, suburb or postcode" |
| Cakupan | `name`, `displayName`, `searchAliases[]`, `suburb`, `postcode`, `address` |
| Matching | case-insensitive, substring, trim whitespace |
| Debounce | 150ms |
| Empty result | "No clubs match your search." + tombol "Clear search" |
| Reset | tombol × di dalam field |

### Filter Program

Hanya **satu** filter, dan hanya karena datanya ada:

| Filter | Nilai | Dasar |
|---|---|---|
| Program | All / Junior / Senior Men / Senior Women | nilai ini persis sama dengan pilihan field "Program" pada form, sehingga filter benar-benar membantu mempersempit pilihan yang akan dipakai di form |

**Tidak** ada filter kategori lain (mis. "indoor/outdoor", "men/women only", "beginner friendly") karena dataset tidak memiliki data pendukung. Ini sesuai instruksi: "Jangan membuat filter kategori yang tidak memiliki data pendukung."

> Catatan: dataset tidak menyatakan program mana yang tersedia di tiap klub. Karena itu, filter Program di UI **tidak** menyaring klub berdasarkan data yang tidak ada. Keputusan: filter Program dihapus dari UI, dan hanya search yang diimplementasikan. Ini keputusan paling aman dan jujur terhadap data.

### Keputusan final

**Hanya search.** Tidak ada filter. Alasan: membuat filter Program akan berarti mengklaim klub X menyediakan program Y, dan data itu tidak tersedia di sumber. Menampilkan filter yang tidak menyaring apa pun adalah UI palsu.

---

## 4. Seleksi klub (sinkronisasi list ↔ map)

### Dari daftar

1. User klik kartu klub.
2. `selectedClubId` di-set.
3. Kartu mendapat `aria-selected="true"` + border sky.
4. Peta `flyTo(club.lat, club.lng, 13)`.
5. Marker klub tersebut berubah warna `#4AB7F3` dan `openPopup()`.
6. Panel detail klub di bawah peta ter-render.

### Dari peta

1. User klik marker.
2. Event `marker.click` → `selectedClubId` di-set.
3. Daftar di-scroll ke kartu klub tersebut (`scrollIntoView({block:'nearest'})`).
4. Kartu mendapat selected state.
5. Panel detail ter-render.

### Selected state

- Hanya satu klub terpilih pada satu waktu.
- Klik klub lain mengganti pilihan (tidak multi-select).
- Klik klub yang sama tidak melakukan apa-apa (tidak toggle off), agar panel detail tidak hilang tanpa sengaja.

---

## 5. Registration form — spesifikasi final

### Field

| # | Name | Label | Tipe | Placeholder | Wajib | Opsi / Validasi |
|---|---|---|---|---|---|---|
| 1 | `name` | Name | text | Your full name | ✅ | 2–100 karakter |
| 2 | `email` | Email address | email | you@example.com | ✅ | format email, ≤254 |
| 3 | `phone` | Phone number | tel | e.g. 04xx xxx xxx | ✅ | 6–20 karakter, `[0-9 +()\-\s]` |
| 4 | `location` | Suburb / postcode | text | e.g. Brunswick 3057 | ✅ | 2–60 karakter |
| 5 | `clubId` | Club | select | — | ✅ | harus salah satu dari 16 ID |
| 6 | `program` | Program | select | — | ✅ | `Junior` / `Senior Men` / `Senior Women` |
| 7 | `interest` | I'm interested in | select | — | ✅ | `Trial / Come & Try` / `Membership` |
| 8 | `ageGroup` | Player age / age group | select | — | ✅ | `Under 10` / `Under 12` / `Under 14` / `Under 16` / `Under 18` / `18+` |
| 9 | `experience` | Previous lacrosse experience | select | — | ✅ | `Never played` / `Beginner` / `Experienced` |
| 10 | `notes` | Notes (optional) | textarea | Anything we should know? | ❌ | ≤1000 karakter, `rows=4` |

### Consent

| # | Field | Teks persis | Wajib | Default |
|---|---|---|---|---|
| C1 | `marketingConsent` | "I agree to receive promotional, event and activity communications from Lacrosse Victoria." | ❌ | unchecked |
| C2 | `enquiryConsent` | "I agree to Lacrosse Victoria collecting and sharing my details with the selected club for the purpose of responding to my enquiry." | ✅ | unchecked |

Keduanya **terpisah**. Tidak ada default checked. C2 harus dicentang untuk submit; jika tidak, tombol submit menampilkan error dan tidak mengirim request.

### Prefill

| Field | Sumber prefill |
|---|---|
| `email` | `sessionStorage['lv-prefill-email']` dari popup |
| `clubId` | `selectedClubId` dari peta/daftar |

Prefill tidak menimpa nilai yang sudah diketik pengguna. Jika pengguna mengubah club di form, pilihan di peta/daftar ikut berubah (dua arah).

### Layout

- Desktop ≥768px: 2 kolom (`name`+`email`, `phone`+`location`, `clubId` full, `program`+`interest`, `ageGroup`+`experience`, `notes` full).
- Mobile <768px: 1 kolom.
- Consent di bawah field, full width.
- Tombol submit full width pada mobile, lebar auto (`min 220px`) pada desktop.

### State machine form

```
idle ──submit──> validating ──invalid──> idle (dengan error per field)
                    │
                    └──valid──> submitting (tombol disabled, spinner)
                                    │
                        ┌───────────┴───────────┐
                        │ 2xx + ok:true         │ error / network / 4xx / 5xx
                        ▼                       ▼
                    success                 error
                    (form diganti          (form tetap, nilai utuh,
                     panel sukses)          panel error + Try again)
```

Aturan:
- `submitting` tidak dapat diulang (guard boolean).
- Idempotency: setelah sukses, tombol tidak ada lagi (panel sukses menggantikan form).
- Nilai form **tidak** dikosongkan pada error.
- Success hanya jika body respons memuat `ok: true` **dan** `providerId` dari Resend.

---

## 6. Kondisi sukses & gagal

### Success (hanya setelah provider menerima)

Ditampilkan jika dan hanya jika:

1. Respons HTTP 2xx, **dan**
2. Body JSON memuat `ok: true`, **dan**
3. Body JSON memuat `providerId` (ID dari Resend) — bukti provider menerima permintaan.

Isi panel sukses:
- Judul: "Enquiry sent"
- Teks: "Thanks, {name}. Your enquiry for {club} has been sent to Lacrosse Victoria. The club will be in touch to follow up."
- Meta: "Reference: {providerId}" — traceable.
- Tombol: "Find another club" → reset pilihan & scroll ke peta.

### Error

Ditampilkan jika provider gagal, jaringan gagal, atau validasi server menolak.

Isi panel error:
- Judul: "We couldn't send your enquiry"
- Teks: pesan ramah yang dipetakan dari kode error (bukan raw provider error).
- Tombol: "Try again" → kembali ke state `idle` dengan nilai utuh.

Pemetaan pesan:

| Kondisi server | Pesan UI |
|---|---|
| `validation_failed` | "Please check the highlighted fields and try again." + error per field |
| `not_configured` | "Enquiry delivery is not configured yet. Please contact Lacrosse Victoria directly." |
| `provider_error` | "Something went wrong while sending your enquiry. Please try again." |
| network failure | "We couldn't reach the server. Check your connection and try again." |

### Larangan

- Tidak ada `alert()` palsu yang mengklaim email terkirim.
- Tidak ada success page yang muncul hanya karena validasi browser lolos.
- Tidak ada pesan "email telah masuk inbox" — status yang diklaim hanya "provider menerima permintaan pengiriman".

---

## 7. Accessibility

| Aspek | Implementasi |
|---|---|
| Label | setiap input punya `<label for>` |
| Required | `aria-required="true"` + tanda `*` visual |
| Error | `aria-invalid` + `aria-describedby` ke pesan error |
| Live region | panel success/error memakai `role="status"` / `role="alert"` |
| Fokus | terlihat jelas (ring sky) |
| Keyboard | dropdown dapat dibuka dengan Enter/Space, ditutup Escape |
| Modal | focus trap, Escape menutup, `aria-modal="true"` |
| Kontras | teks putih di `#002854` = 12.6:1; `#171717` di putih = 16.1:1 |
| Skip link | "Skip to main content" tersembunyi sampai fokus |
| Map | marker punya `title`/`alt`; peta punya fallback list (daftar klub selalu tersedia) |
