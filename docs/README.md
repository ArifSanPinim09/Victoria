# Documentation Index — Lacrosse Victoria Find a Club Revamp

## Cara menggunakan dokumentasi ini

Baca dengan urutan ini saat pertama kali:

1. **`../AGENTS.md`** — memori permanen, scope lock, design tokens, aturan kerja. **WAJIB dibaca sebelum task apa pun.**
2. **`reference-audit.md`** — hasil inspeksi langsung website asli (fakta mentah, screenshot, data klub).
3. **`client-requirements.md`** — permintaan klien vs interpretasi vs belum terkonfirmasi.
4. **`PRD.md`** — requirement terukur + acceptance criteria.
5. **`design-spec.md`** — angka visual yang harus ditiru (token, ukuran, komponen).
6. **`user-flow-and-form.md`** — journey, field form, state sukses/gagal.
7. **`email-delivery.md`** — arsitektur email + status konfigurasi.
8. **`email-setup-guide.md`** — langkah operasional mengaktifkan pengiriman ke Gmail klien.
9. **`implementation-plan.md`** — urutan task & dependency.
10. **`PROJECT_LOG.md`** — status nyata implementasi.
11. **`NEXT-ACTIONS.md`** — pekerjaan tersisa.

## Hubungan antar-dokumen

```
                  ┌─────────────────┐
                  │  promting.md    │  brief klien (input mentah)
                  └────────┬────────┘
                           │
                  ┌────────▼─────────────┐
                  │  reference-audit.md  │  fakta dari website asli
                  └────────┬─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐ ┌───────▼────────┐ ┌──────▼─────────┐
│client-require- │ │ design-spec.md │ │ PRD.md         │
│ments.md        │ │ (angka visual) │ │ (requirement)  │
└───────┬────────┘ └───────┬────────┘ └──────┬─────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
              ┌────────────▼─────────────┐
              │ user-flow-and-form.md    │
              │ email-delivery.md        │
              └────────────┬─────────────┘
                           │
              ┌────────────▼─────────────┐
              │ implementation-plan.md   │
              │ tasks/01..08.md          │
              └────────────┬─────────────┘
                           │
              ┌────────────▼─────────────┐
              │ PROJECT_LOG.md           │
              │ NEXT-ACTIONS.md          │
              └──────────────────────────┘
```

## Aturan dokumentasi

- Dokumentasi menggambarkan **kondisi aktual**, bukan rencana.
- Task hanya berstatus `DONE` setelah hasilnya diverifikasi.
- Jika dokumentasi dan kode tidak cocok, periksa kode, lalu rekonsiliasi dokumentasi **tanpa menutupi pekerjaan yang belum selesai**.
- Jangan menambah file hanya agar struktur terlihat besar.

## Peta file repo

```
victoria/
├── AGENTS.md                     memori permanen proyek
├── app/
│   ├── layout.tsx                root layout, font, metadata
│   ├── page.tsx                  homepage (shell + hero + popup)
│   ├── globals.css               token + CSS fidelity
│   ├── participate/find-a-club/  halaman Find a Club
│   └── api/registrations/        route handler email
├── components/                   shared shell + find-a-club + form
├── lib/                          data klub, tipe, validasi, email
├── public/images/brand/          aset resmi hasil audit
├── public/images/clubs/          16 logo klub
├── public/fonts/                 ProximaNova-Black
└── docs/                         dokumentasi ini
```
