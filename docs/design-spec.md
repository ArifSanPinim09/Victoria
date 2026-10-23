# Design Specification — Visual Fidelity Rules

Sumber: audit langsung 22 Oct 2026 (`docs/reference-audit.md`). Tidak ada nilai di dokumen ini yang berasal dari preferensi desain pribadi.

---

## 1. Palet warna

```css
--lv-navy:        #002854;  /* footer, footer-banner, teks di tombol secondary */
--lv-navy-deep:   #001c3a;  /* turunan navy untuk overlay hero (bukan warna baru brand) */
--lv-sky:         #4AB7F3;  /* aksen: button secondary, nav active */
--lv-grey:        #9FA5AB;  /* button tertiary, teks muted */
--lv-ink:         #171717;  /* body text, heading */
--lv-white:       #FFFFFF;
--lv-border:      #F8F9FA;  /* divider baris klub (border-light) */
--lv-border-mid:  #E4E7EA;  /* border input & panel (turunan netral, bukan brand baru) */
```

| Warna | Boleh dipakai untuk |
|---|---|
| `#002854` | background footer/banner, teks di atas sky, aksen heading |
| `#4AB7F3` | tombol utama, nav active, marker terpilih, focus ring |
| `#9FA5AB` | tombol netral, teks muted, border marker default |
| `#171717` | teks body |
| `#F8F9FA` | background section alternatif, divider |

Tidak ada gradient dekoratif. Satu-satunya "gradient" yang diizinkan adalah overlay gelap di atas hero image agar teks putih terbaca — ini meniru referensi.

---

## 2. Tipografi

| Peran | Family | Size | Weight | Line-height | Letter-spacing | Transform |
|---|---|---|---|---|---|---|
| Display / hero H1 | `ProximaNova-Black` | 70px | 500 | 60px | -2px | uppercase |
| H1 (halaman) | `ProximaNova-Black` | 70px | 500 | 60px | -2px | uppercase |
| H2 section | Poppins | 32px | 600 | 1.25 | normal | none |
| H3 section | Poppins | 20px | 600 | 1.4 | normal | none |
| H4 (nama klub) | Poppins | 18px | 700 | 1.4 | normal | none |
| Nav link | Poppins | 14px | 600 | normal | normal | none |
| Dropdown item | Poppins | 14px | 600 | normal | normal | none |
| Button | Poppins | 14px | 600 | normal | normal | none |
| Body | Poppins | 16px | 400 | 1.6 | normal | none |
| Body besar (alamat klub di referensi) | Poppins | 18px | 400 | 28px | normal | none |
| Small / meta | Poppins | 12px | 400 | 1.5 | normal | none |
| Footer link | Poppins | 12px | 400 | normal | normal | none |
| Footer banner h5 | Poppins | 14px | 600 | normal | normal | none |

**Mobile scaling:**

| Elemen | Desktop | Mobile |
|---|---|---|
| Hero H1 | 70px / lh 60px | 38px / lh 36px |
| H2 | 32px | 24px |
| H4 | 18px | 17px |
| Body | 16px | 16px |

`ProximaNova-Black` di-load dari `public/fonts/proximanova-black.woff2` via `@font-face`. `Poppins` via `next/font/google` (400, 500, 600, 700).

---

## 3. Spacing scale

Basis 4px: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 88`.

| Penggunaan | Nilai |
|---|---|
| Gap antar field form | 20px |
| Padding card | 24px |
| Padding section vertikal (desktop) | 64px |
| Padding section vertikal (mobile) | 40px |
| Gap antar baris klub | 24px (`mt-5` di referensi) |
| Jarak logo ke nav | auto (nav di tengah via `margin: auto`) |

---

## 4. Layout & container

| Breakpoint | Container | Catatan |
|---|---|---|
| ≥1240px | `1140px` | ukuran terukur di referensi |
| 992–1239px | `960px` | Bootstrap xl→lg |
| 768–991px | `720px` | Bootstrap md |
| 576–767px | `540px` | Bootstrap sm |
| <576px | `100%` − 40px padding | `20px` kiri-kanan |

Find a Club layout desktop:

```
┌─────────────────────────────────────────────────────┐
│ header 88px (transparent, overlaps hero)            │
├─────────────────────────────────────────────────────┤
│ hero--sm 320px: "FIND A CLUB" 70px uppercase        │
├─────────────────────────────────────────────────────┤
│ ┌───────────────────────┬─────────────────────────┐ │
│ │ Map (Leaflet)         │ Club list (scroll)      │ │
│ │ height 560px          │ width 380–420px         │ │
│ │ sticky di desktop     │ search + hasil          │ │
│ └───────────────────────┴─────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Selected club detail panel (muncul saat dipilih)│ │
│ │ logo · nama · alamat · program · CTA form        │ │
│ └─────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Registration form (2 kolom desktop, 1 kolom mob)│ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ footer-banner (navy + texture)                      │
│ footer 88px (navy)                                  │
└─────────────────────────────────────────────────────┘
```

---

## 5. Komponen

### 5.1 Header

| Properti | Nilai |
|---|---|
| Height | `88px` |
| Position | absolute di atas hero (homepage), static + navy solid di halaman Find a Club agar nav terbaca |
| Background | transparan (di atas hero gelap) |
| Padding | `5px 15px 9px` |
| Logo | `90×90px`, `top: 9px`, `left: 142.5px` (container-aligned) |
| Logo overlap | ya — logo lebih tinggi dari header (99px vs 88px) |
| Nav gap | padding `0 16px` per link |
| Ikon kanan | telepon + search, stroke putih, `24×24`, `aria-hidden` |

**Mobile:** background putih, logo `team-secondary.svg` centered, hamburger 2 garis di kiri, tinggi `64px`.

> **Catatan implementasi (2026-10-23):** `team-primary.svg` berwarna **putih** sehingga tidak
> terlihat di header mobile yang putih. Karena itu header merender dua crest dan CSS
> menampilkan tepat satu per breakpoint: `.lv-brand__full` (primary, 90×90) untuk
> ≥992px dan `.lv-brand__simple` (secondary, height 44px) untuk ≤991px.
> `team-secondary.svg` juga di-crop viewBox-nya ke area tinta asli
> (`3.6 2.4 48.8 62.3`) karena kanvas 66×84 menyisakan ruang kosong 19px di bawah
> dan 13.6px di kanan — tanpa crop logo terlihat kecil dan mentok atas.
> Backup SVG asli: `docs/assets-backup/team-secondary.original.svg`.

### 5.2 Dropdown

| Properti | Nilai |
|---|---|
| Trigger | hover (desktop) + klik |
| Panel bg | `#fff` |
| Border | `1px solid #E4E7EA` |
| Shadow | `0 8px 24px rgba(0,0,0,.10)` |
| Radius | `0` (referensi tidak membulatkan) |
| Width | `224px` |
| Padding | `15px 0 0` |
| Item | `14px/600`, `#171717`, `padding: 0 50px 13px 30px` |
| Item hover | text `#4AB7F3`, background `#F8F9FA` |
| Caret | segitiga 8px di atas panel, terpusat pada item pemicu |

### 5.3 Tombol

| Varian | BG | Text | Border | Hover |
|---|---|---|---|---|
| `btn-primary` (secondary di referensi) | `#4AB7F3` | `#002854` | `1px solid #4AB7F3` | bg `#2FA5E8` |
| `btn-neutral` (tertiary di referensi) | `#9FA5AB` | `#fff` | `1px solid #9FA5AB` | bg `#8C9299` |
| `btn-outline` | transparent | `#002854` | `1px solid #E4E7EA` | border `#002854`, bg `#F8F9FA` |

Semua: `radius: 4px`, `padding: 12px 27px`, `font: 600 14px Poppins`, `min-height: 56px`, `transition: 150ms`.
Disabled: `opacity: .55`, `cursor: not-allowed`.

### 5.4 Input form

| Properti | Nilai |
|---|---|
| Height | `52px` (textarea auto) |
| Border | `1px solid #E4E7EA` |
| Radius | `4px` |
| Padding | `12px 14px` |
| Font | `16px Poppins` (16px mencegah zoom iOS) |
| Focus | `border-color: #4AB7F3`, `box-shadow: 0 0 0 3px rgba(74,183,243,.15)` |
| Error | `border-color: #C0392B`, pesan `13px` di bawah field |
| Label | `13px / 600`, `#171717`, `margin-bottom: 6px`, required ditandai `*` warna `#C0392B` |

> `#C0392B` adalah satu-satunya warna di luar palet brand, khusus untuk state error (kebutuhan fungsional aksesibilitas). Dicatat sebagai penyimpangan yang disengaja.

### 5.5 Club card

| Properti | Nilai |
|---|---|
| Layout | logo 56×56 (object-fit contain, bg putih, border `#F8F9FA`) + nama + suburb/postcode |
| Padding | `14px 16px` |
| Border | `1px solid #F8F9FA` |
| Radius | `4px` |
| Default bg | `#fff` |
| Hover | border `#9FA5AB` |
| Selected | border `2px solid #4AB7F3`, bg `rgba(74,183,243,.06)` |
| Selected indicator | bar 3px `#4AB7F3` di sisi kiri |

### 5.6 Map

| Properti | Nilai |
|---|---|
| Provider | Leaflet 1.9.4 + OSM tiles |
| Tinggi | `560px` desktop, `380px` mobile |
| Default view | center `-37.8136, 144.9631`, zoom `9` (cakupan Victoria/Melbourne) |
| Marker | custom divIcon: pin 28×28 dengan warna `#9FA5AB` (default) / `#4AB7F3` (selected) |
| Popup | nama klub + suburb, `14px Poppins` |
| Atribusi | `© OpenStreetMap contributors` (wajib, tidak boleh dihapus) |
| Interaction | zoom, pan, klik marker |
| Selected sync | `flyTo(lat, lng, 13)` + `openPopup()` |

### 5.7 State

| State | Visual |
|---|---|
| Loading (submit) | Spinner 16px putih di dalam tombol + label "Sending…", tombol disabled |
| Error | Panel `border-left: 3px solid #C0392B`, bg `#FDF3F2`, judul "We couldn't send your enquiry", pesan, tombol "Try again" |
| Success | Panel `border-left: 3px solid #4AB7F3`, bg `rgba(74,183,243,.06)`, judul "Enquiry sent", ringkasan klub + email, tombol "Find another club" |
| Empty (search) | Teks "No clubs match your search." + tombol "Clear search" |

Success panel **hanya** dirender setelah respons server `ok: true` yang berasal dari provider.

---

## 6. Aturan perbandingan visual

Saat membandingkan implementasi dengan referensi:

1. Gunakan viewport identik: `1440×857` dan `390×844`.
2. Bandingkan pada 6 titik: header, dropdown terbuka, homepage shell, Find a Club hero, body Find a Club, footer + banner.
3. Periksa: tinggi header, ukuran & posisi logo, ukuran font nav, warna nav active, lebar dropdown, radius/padding tombol, warna footer, urutan menu.
4. Toleransi: ±2px untuk tinggi/padding, warna harus persis (hex sama), font harus sama family-nya.
5. Perbedaan yang jelas harus diperbaiki sebelum UI dianggap selesai.

---

## 7. Penyimpangan yang didokumentasikan

| # | Penyimpangan | Alasan | Dampak |
|---|---|---|---|
| D1 | Body Find a Club ditata ulang total | Diminta klien (Phase 6) | Disengaja |
| D2 | Peta interaktif menggantikan Apple MapKit statis | Diminta klien (Phase 6.3) | Disengaja |
| D3 | Hero homepage memakai texture brand, bukan foto kampanye | Foto kampanye tidak diunduh (di luar journey) | Visual lebih polos dari asli |
| D4 | `#C0392B` untuk error state | Aksesibilitas state error | 1 warna tambahan, hanya untuk error |
| D5 | Header Find a Club memakai navy solid, bukan transparan di atas foto | Hero Find a Club memakai texture navy; nav putih tetap terbaca | Tidak terlihat berbeda secara signifikan |
| D6 | Menu non-Find-a-Club dinonaktifkan (`aria-disabled`) | Scope lock #4 | Disengaja — mencegah halaman palsu |
