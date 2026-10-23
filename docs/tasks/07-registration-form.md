# TASK 07 — Registration Form

```
Task ID:        07
Task Title:     Form Registrasi Lengkap + Integrasi Email
Priority:       CRITICAL
Status:         DONE
Phase:          7
```

## Objective
Mengimplementasikan form registrasi dengan seluruh field klien, validasi, consent, dan integrasi ke endpoint email.

## Requirements
- 10 field sesuai daftar klien, label & opsi persis.
- 2 consent terpisah, tanpa default checked; C2 wajib.
- Prefill email (dari popup) & club (dari peta/list).
- Inline validation, loading state, cegah double submit.
- Error mempertahankan input.
- Success hanya setelah server `ok:true` + `providerId`.
- Layout 2 kolom desktop, 1 kolom mobile.

## Files Affected
- `components/find-a-club/registration-form.tsx`
- `lib/validation.ts`
- `app/api/registrations/route.ts`

## Dependencies
Task 03 (email foundation), Task 06 (halaman & pilihan klub).

## Implementation Steps
1. Definisikan tipe `RegistrationPayload` + pilihan enum.
2. Bangun form dengan state per field.
3. Validasi client (reuse aturan server).
4. Submit via `fetch` JSON.
5. Map status code → pesan UI.
6. Success panel dengan provider ID.
7. Reset / find another club.

## Acceptance Criteria
- [x] 10 field lengkap
- [x] Program: Junior / Senior Men / Senior Women
- [x] Interest: Trial / Come & Try, Membership
- [x] Experience: Never played, Beginner, Experienced
- [x] 2 consent terpisah, unchecked default
- [x] C2 wajib untuk submit
- [x] Validasi client + server
- [x] Loading, error, success state
- [x] Input dipertahankan saat error
- [x] Tidak ada data pribadi di URL

## Verification Method
Submit kosong → semua required error tampil; submit tanpa C2 → ditolak; submit valid tanpa API key → error 503, form utuh, tidak ada success.

## Result
Form selesai. Jalur sukses tidak dapat diuji end-to-end karena credential email belum ada; jalur gagal teruji.

## Issues / Blockers
Age group options belum dikonfirmasi klien (U3).
