# Cara Setup Agar Form Registrasi Masuk ke Gmail Klien

Panduan operasional. Untuk arsitektur teknis lihat `email-delivery.md`.

**Tujuan akhir:** pengunjung mengisi form di halaman *Find a Club*, klik Submit, lalu email berisi data pendaftaran masuk ke inbox `darapuspitanurani@gmail.com`.

---

## 0. Ringkasan: mengapa belum jalan sekarang

Kode sudah selesai dan teruji sampai tahap pemanggilan Resend, tetapi berhenti karena dua hal yang **tidak bisa dibuat oleh kode**:

| Yang kurang | Sifat |
|---|---|
| `RESEND_API_KEY` | akun milik pemilik email penerima |
| Domain pengirim terverifikasi (untuk `EMAIL_FROM`) | butuh akses DNS domain |

Tanpa keduanya, route handler sengaja mengembalikan `503 not_configured` — form menampilkan panel error, **bukan** pesan sukses palsu (aturan scope #9).

---

## 1. Pilih jalur setup

Ada dua jalur. Pilih sesuai situasi presentasi.

| | Jalur A — Sandbox (cepat, ±5 menit) | Jalur B — Domain sendiri (±30 menit + biaya domain) |
|---|---|---|
| Butuh domain? | Tidak | Ya |
| Butuh akses DNS? | Tidak | Ya |
| Bisa kirim ke `darapuspitanurani@gmail.com`? | **Hanya jika API key dibuat dari akun Resend milik `darapuspitanurani@gmail.com`** | Ya, ke alamat mana pun |
| Cocok untuk | demo kuliah, uji cepat | produksi / presentasi tanpa batasan |
| Batas | 100 email/hari, penerima terbatas | 100 email/hari (free tier) |

> **Penting soal Jalur A:** Resend menolak pengiriman dengan HTTP 403 jika `from` memakai domain `resend.dev` dan penerima bukan alamat pemilik akun. Jadi kuncinya: **buat akun Resend memakai `darapuspitanurani@gmail.com`**. Dengan begitu penerima = pemilik akun = diizinkan.

---

## 2. Jalur A — Sandbox (rekomendasi untuk demo)

### Langkah 1 — Buat akun Resend dengan email klien

1. Buka https://resend.com/signup
2. Daftar memakai **`darapuspitanurani@gmail.com`** (bukan email lain).
3. Verifikasi email konfirmasi yang masuk ke Gmail tersebut.

Akun ini menjadi pemilik API key, sekaligus penerima yang diizinkan.

### Langkah 2 — Ambil API key

1. Buka https://resend.com/api-keys
2. **Create API Key**
   - Name: `lacrosse-victoria-prototype`
   - Permission: **Sending access** (jangan Full access)
   - Domain: `All domains` atau biarkan default
3. Copy key `re_...` — hanya ditampilkan sekali.

### Langkah 3 — Isi `.env.local`

File `.env.local` sudah disediakan di root proyek. Isi dua baris:

```env
RESEND_API_KEY=re_paste_your_key_here
REGISTRATION_TO_EMAIL=darapuspitanurani@gmail.com
EMAIL_FROM=onboarding@resend.dev
```

Simpan. File ini sudah masuk `.gitignore` — tidak akan ter-commit.

### Langkah 4 — Verifikasi konfigurasi

```bash
node scripts/check-email.mjs
```

Yang diharapkan:

```
RESEND_API_KEY    re_a…xxxx (36 chars)
EMAIL_FROM        onboarding@resend.dev
TO                darapuspitanurani@gmail.com
── Sender analysis ──
  from=resend.dev → SANDBOX MODE
```

### Langkah 5 — Kirim satu email uji

```bash
node scripts/check-email.mjs --send
```

Sukses ditandai:

```
✓ accepted by Resend, provider id: xxxxxxxx-xxxx-...
```

Lalu **buka Gmail `darapuspitanurani@gmail.com` dan cek Inbox + Spam**. Ini langkah yang membuktikan email benar-benar masuk — bukan sekadar "provider menerima".

### Langkah 6 — Restart server

Env var dibaca saat proses start, jadi server harus di-restart:

```bash
# hentikan proses lama, lalu
npm run start -- -p 3000
```

### Langkah 7 — Uji dari form sungguhan

1. Buka `http://localhost:3000/participate/find-a-club`
2. Cari klub → pilih klub → isi form lengkap → centang kedua consent → Submit
3. Harus muncul panel **"Enquiry sent"** dengan Reference ID
4. Cek Gmail: email dengan subjek `New Lacrosse Victoria Club Enquiry — <Nama Klub>`

Kalau langkah 5 sukses tapi langkah 7 gagal, masalahnya di server belum restart atau `.env.local` tidak terbaca.

---

## 3. Jalur B — Domain sendiri

Dipakai bila ingin pengirim terlihat profesional (mis. `enquiries@lacrossevictoria-prototype.com`) atau ingin mengirim ke penerima mana pun.

### Langkah 1 — Punya domain

Beli/gunakan domain yang Anda kuasai. Anda butuh akses ke DNS-nya (Cloudflare, Namecheap, Niagahoster, dll).

### Langkah 2 — Tambah domain di Resend

1. https://resend.com/domains → **Add Domain**
2. Masukkan domain, pilih region terdekat (mis. `ap-northeast-1` untuk Asia-Pasifik)
3. Resend menampilkan beberapa DNS record. Yang wajib:

| Tipe | Nama (contoh) | Fungsi |
|---|---|---|
| `MX` | `send` | feedback loop |
| `TXT` | `send` | SPF |
| `TXT` | `resend._domainkey` | DKIM |
| `TXT` | `_dmarc` | DMARC (disarankan) |

### Langkah 3 — Pasang record di DNS

Salin nilai **persis** dari dashboard Resend. Kesalahan umum:

- Nama record ditambahkan domain dua kali (`send.domain.com.domain.com`)
- TXT value terpotong saat copy
- Record lama dengan nama sama masih ada (konflik)

### Langkah 4 — Tunggu verifikasi

Klik **Verify DNS Records**. Propagasi biasanya 5–30 menit, kadang sampai 24 jam. Status harus **Verified** untuk semua record.

Cek mandiri:

```bash
dig +short TXT resend._domainkey.yourdomain.com
dig +short TXT send.yourdomain.com
```

### Langkah 5 — Isi env

```env
RESEND_API_KEY=re_paste_your_key_here
REGISTRATION_TO_EMAIL=darapuspitanurani@gmail.com
EMAIL_FROM=Lacrosse Victoria Enquiries <enquiries@yourdomain.com>
```

`EMAIL_FROM` boleh berbentuk `Nama <alamat@domain>` atau alamat polos.

### Langkah 6 — Verifikasi & uji

Sama seperti Jalur A langkah 4–7.

---

## 4. Verifikasi cepat: apakah sudah benar-benar masuk?

| Tingkat klaim | Cara membuktikan |
|---|---|
| Kode memanggil Resend | `providerId` muncul di respons API |
| Provider menerima | `node scripts/check-email.mjs --send` → `✓ accepted by Resend` |
| **Email masuk inbox** | **buka Gmail dan lihat sendiri** |
| Email dibuka | tidak dilacak (di luar scope) |

Jangan pernah menganggap "panel sukses muncul" sebagai bukti email terkirim. Panel sukses hanya muncul bila `ok: true` **dan** `providerId` ada — itu bukti provider menerima, bukan bukti masuk inbox.

---

## 5. Kalau gagal — tabel diagnosis

Jalankan `node scripts/check-email.mjs --send` dulu; pesan errornya menunjukkan penyebab.

| Gejala | Penyebab | Perbaikan |
|---|---|---|
| `503 not_configured` di form | `RESEND_API_KEY` atau `EMAIL_FROM` kosong / server belum restart | isi `.env.local`, restart `npm run start` |
| `API key is invalid` | key salah copy / sudah dihapus | buat key baru di dashboard |
| `403` + "can only send testing emails to your own email address" | pakai `onboarding@resend.dev` tapi penerima bukan pemilik akun | buat akun Resend dengan email penerima, **atau** pakai Jalur B |
| `403` + "domain is not verified" | `EMAIL_FROM` memakai domain yang belum Verified | selesaikan verifikasi DNS |
| `422` validation error | `from` bukan format email valid | pakai `Nama <alamat@domain>` |
| `502 provider_error` di form | Resend menolak (lihat log server) | `npm run start` menampilkan `[registrations] Resend rejected…` |
| `429 rate_limited` | >5 submit/menit dari satu IP | tunggu 1 menit (proteksi prototype) |
| Email tidak ada di Inbox | masuk Spam/Promotions, atau ditolak diam-diam | cek Spam; di Jalur A pastikan akun Resend = alamat penerima |
| Email masuk tapi field kosong | template lama / cache | rebuild: `npm run build` |

Log server saat submit menampilkan penyebab persisnya:

```
[registrations] Email delivery is not configured (RESEND_API_KEY / EMAIL_FROM missing).
[registrations] Resend rejected the send: { name: 'validation_error', message: '...' }
```

---

## 6. Setelah berhasil — jangan lupa

1. **Catat hasil uji** di `docs/email-delivery.md` §8 (tanggal, provider ID, status).
2. **Update** `AGENTS.md` §9 dan `docs/PROJECT_LOG.md` — status `BELUM` → `TERVERIFIKASI`.
3. **Untuk production (Vercel):** tambahkan `RESEND_API_KEY`, `REGISTRATION_TO_EMAIL`, `EMAIL_FROM` di *Project Settings → Environment Variables*, lalu redeploy. Env var tidak ikut ter-deploy dari `.env.local`.

---

## 7. Catatan keamanan

| Aturan | Alasan |
|---|---|
| Jangan pakai prefix `NEXT_PUBLIC_` | akan ter-bundle ke browser dan bisa dicuri |
| Jangan commit `.env.local` | sudah di-`.gitignore`; jangan di-force add |
| API key permission cukup *Sending access* | minimal privilege |
| Jangan bagikan key lewat chat/screenshot | kalau bocor, hapus dan buat baru di dashboard |
| Alamat penerima dikunci di server | client tidak bisa mengubah `to` lewat request |

---

## 8. Batasan yang diakui

- **100 email/hari** pada free tier Resend.
- **Rate limit in-memory** 5 submit/menit/IP — tidak persisten antar-instance serverless. Untuk produksi perlu Redis/Upstash.
- **Tidak ada email konfirmasi ke pendaftar** — di luar scope (hanya notifikasi ke klien).
- **Tidak ada retry otomatis** bila Resend sedang gangguan; pengunjung melihat error dan bisa submit ulang.
