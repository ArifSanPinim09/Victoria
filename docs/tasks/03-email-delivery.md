# TASK 03 — Email Delivery Foundation

```
Task ID:        03
Task Title:     Server-side Email Delivery (Resend)
Priority:       CRITICAL
Status:         BLOCKED
Phase:          8
```

## Objective
Membangun pengiriman email nyata dari form registrasi ke `darapuspitanurani@gmail.com`, dan mendeteksi hambatan konfigurasi sedini mungkin.

## Requirements
- Route handler `POST /api/registrations`.
- Validasi server (otoritatif, bukan hanya client).
- Normalisasi + whitelist field.
- HTML email Gmail-safe + plain-text fallback.
- Resend SDK, API key server-only.
- Recipient tidak dapat diubah client.
- Success hanya jika provider mengembalikan `data.id`.
- Error mapping terstruktur, tanpa membocorkan raw provider error.

## Files Affected
- `app/api/registrations/route.ts`
- `lib/validation.ts`
- `lib/email-template.ts`
- `lib/clubs.ts` (CLUB_IDS)
- `.env.example`

## Dependencies
Task 02 (kontrak form & email requirements).

## Implementation Steps
1. Definisikan tipe payload & validator.
2. Buat template HTML tabel-based + text fallback.
3. Buat route handler: parse → validate → normalize → build → send.
4. Tambah rate limit in-memory + body size guard.
5. Tambah `.env.example`.
6. Uji negatif: tanpa credential harus `503 not_configured`, bukan sukses palsu.

## Acceptance Criteria
- [x] Route handler ada dan server-only
- [x] Validasi server menolak payload invalid
- [x] Template HTML + text
- [x] Recipient dikunci server-side
- [x] Tidak ada `NEXT_PUBLIC_*` untuk secret
- [x] Tanpa credential → 503, tidak ada success
- [ ] **Uji kirim nyata ke Gmail klien** ← BLOCKED

## Verification Method
- Kode dibaca ulang untuk memastikan tidak ada jalur success tanpa `data.id`.
- Uji `curl` tanpa env → harus `503 { ok:false, error:"not_configured" }`.

## Result
Implementasi selesai dan diuji untuk jalur gagal. Jalur sukses belum pernah dieksekusi terhadap API Resend nyata karena `RESEND_API_KEY` dan `EMAIL_FROM` tidak tersedia di environment.

## Issues / Blockers
**BLOCKER:** butuh `RESEND_API_KEY` + domain pengirim terverifikasi di Resend. Sandbox `onboarding@resend.dev` tidak dapat mengirim ke Gmail eksternal. Lihat `docs/email-delivery.md` §3 dan §8.
