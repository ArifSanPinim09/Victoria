# Implementation Plan

---

## 1. Urutan pengerjaan & dependency

```
TASK 01  Reference Audit                 [DONE]
   │
   ├──> TASK 02  PRD & Planning          [DONE]
   │       │
   │       ├──> TASK 03  Email Foundation        [IMPLEMENTED / BLOCKED on credentials]
   │       │
   │       ├──> TASK 04  Club Data & Map         [DONE]
   │       │        │
   │       │        └──> TASK 05  Original Shell [DONE]
   │       │                 │
   │       │                 └──> TASK 06  Find a Club UI   [DONE]
   │       │                          │
   │       │                          └──> TASK 07  Registration Form [DONE]
   │       │                                   │
   │       │                                   └──> TASK 08  Verification & Deploy [PARTIAL]
```

Dependency kritis:

- Audit → spesifikasi visual final (tidak bisa design tanpa token terukur).
- PRD → implementasi utama.
- Email foundation diuji **sebelum** integrasi form (agar hambatan credential diketahui awal).
- Dataset klub valid → marker final.
- Shared shell + Find a Club konsisten dengan audit.
- Submission + email terintegrasi → success state.
- Build lulus → deployment.

---

## 2. Definisi "Done" per task

| Task | Definisi selesai |
|---|---|
| 01 Audit | `docs/reference-audit.md` lengkap + screenshot tersimpan + menu & klub terverifikasi |
| 02 Planning | PRD, scope, task list, journey, keputusan teknis konsisten |
| 03 Email | Route handler memanggil Resend, validasi server, template HTML, error mapping. **Done hanya jika uji kirim nyata berhasil** → saat ini `BLOCKED` |
| 04 Data & Map | 16 klub dengan koordinat terverifikasi, marker render, sinkron dua arah |
| 05 Shell | Header 88px, logo 90×90, 6 menu + 38 submenu, dropdown, footer + banner sesuai token |
| 06 Find a Club | Search, list, map, selected state, detail panel, CTA form |
| 07 Form | 10 field + 2 consent, validasi, loading/error/success, integrasi endpoint |
| 08 Verify | Build lulus, journey diuji, responsive diuji, deploy terverifikasi |

---

## 3. Prioritas (tidak boleh ditukar)

1. Akurasi reverse engineering terhadap website asli
2. Visual fidelity shared shell & navigasi
3. Find a Club lebih modern dengan lokasi klub yang benar
4. Form registrasi lengkap
5. Pengiriman email sungguhan ke Gmail klien
6. Verifikasi & deployment prototype
7. Dokumentasi perubahan yang akurat

---

## 4. Estimasi vs aktual

| Task | Estimasi | Aktual | Catatan |
|---|---|---|---|
| 01 Audit | 1 sesi | 1 sesi | 6 screenshot, 16 klub, token terukur |
| 02 Planning | 1 sesi | 1 sesi | 10 dokumen |
| 03 Email | 0.5 sesi | 0.5 sesi (kode) | uji nyata blocked |
| 04 Data & Map | 1 sesi | 1 sesi | geocoding Nominatim, 16/16 berhasil |
| 05 Shell | 1 sesi | 1 sesi | CSS custom untuk fidelity |
| 06 Find a Club | 1 sesi | 1 sesi | |
| 07 Form | 1 sesi | 1 sesi | |
| 08 Verify | 0.5 sesi | 0.5 sesi | deploy blocked |

---

## 5. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Resend butuh domain terverifikasi untuk kirim ke Gmail eksternal | email tidak terkirim di sandbox | didokumentasikan sebagai prasyarat wajib; `.env.example` menjelaskan |
| API key tidak tersedia saat pengerjaan | AC-21 tidak terpenuhi | status ditulis jujur, bukan diklaim sukses |
| Geocoding tidak presisi (level jalan, bukan lapangan) | marker bergeser puluhan meter | dicatat di audit; dapat diperbaiki manual oleh klien |
| Dua klub berbagi lokasi (Williamstown) | marker bertumpuk | offset visual kecil + label pembeda |
| Font ProximaNova lisensi tidak jelas | risiko legal jika dipublikasikan | prototype akademik; dicatat |
| Rate limiter in-memory tidak persisten | abuse di serverless | cukup untuk prototype; dicatat batasannya |
| `cacheComponents: true` di Next 16 | perilaku caching tak terduga | route handler POST dinamis; tidak ada GET ter-cache |

---

## 6. Yang TIDAK termasuk plan

Tidak ada task untuk: halaman lain, login, admin, pembayaran, CMS, database, newsletter, analytics, multi-bahasa. Menambahkannya melanggar scope lock.
