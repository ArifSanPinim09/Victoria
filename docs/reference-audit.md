# Reference Audit — Lacrosse Victoria

**Tanggal audit:** 22 Oktober 2026
**Metode:** Inspeksi langsung via Chrome DevTools Protocol (headless Chrome 149), viewport desktop `1440×857` dan mobile `390×844`. Bukan hasil pencarian mesin pencari, bukan asumsi.

**URL referensi:**
- https://lacrossevictoria.com.au/
- https://lacrossevictoria.com.au/participate/find-a-club

---

## 1. Screenshot yang berhasil diambil

| File | Isi | Viewport |
|---|---|---|
| `docs/reference/screenshots/01-homepage-desktop-1440.png` | Homepage penuh, hero carousel | 1440×857 |
| `docs/reference/screenshots/02-find-a-club-desktop-1440.png` | Find a Club, hero + map | 1440×857 |
| `docs/reference/screenshots/03-dropdown-participate-desktop.png` | Dropdown Participate terbuka | 1440×857 |
| `docs/reference/screenshots/04-find-a-club-mobile-390.png` | Find a Club mobile | 390×844 |
| `docs/reference/screenshots/05-homepage-mobile-390.png` | Homepage mobile | 390×844 |
| `docs/reference/screenshots/06-find-a-club-clublist-desktop.png` | Daftar klub (setelah scroll) | 1440×857 |

Semua screenshot tersimpan di dalam repository (`docs/reference/screenshots/`), bukan hanya di memori sesi.

---

## 2. Analisis header dan navigasi

### Struktur DOM asli

```html
<nav id="navbar" class="full navbar navbar-expand-lg">
  <div class="container-fluid"><div class="col-12">
    <div class="row align-items-center justify-content-between">
      <button class="navbar-toggler navbar-toggler__menu">…</button>
      <a class="navbar-brand" href="/">
        <img src="/images/brand/team-primary.svg" class="navbar-brand--full">
        <img src="/images/brand/team-secondary.svg" class="navbar-brand--simple">
      </a>
      <a class="navbar-toggler navbar-toggler__search d-lg-none"></a>
      <div class="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
        <ul class="navbar-nav m-lg-auto"> … 6 <li class="dropdown"> … </ul>
      </div>
    </div>
  </div></div>
</nav>
```

### Pengukuran terukur (computed styles @1440)

| Properti | Nilai terukur |
|---|---|
| Tinggi `#navbar` | `88px` |
| `position` | `absolute` (menumpang di atas hero, bukan sticky) |
| `padding` | `5px 15px 9px` |
| `background-color` | `rgba(0,0,0,0)` (transparan) |
| Container `.col-12` | `x=142.5`, `width=1140`, `height=55` |
| Logo `.navbar-brand img` | `90×90px`, `top=9px`, `left=142.5px` |
| Logo sekunder (mobile) | `team-secondary.svg`, natural `66×84` |
| `.nav-link` | `font-size:14px`, `font-weight:600`, `color:#fff`, `padding:0 16px`, font `Poppins` |
| `.nav-link.active` | `color:#4AB7F3` (sky blue) |
| Jarak antar-menu | ~`32px` efektif (padding 16px kiri-kanan per link) |

**Penting:** header transparan dan menumpang di atas hero gelap. Nav link berwarna putih. Tidak ada border bawah, tidak ada box-shadow aktif (`rgba(0,0,0,0) 0px 4px 12px 0px` = tidak terlihat).

### Dropdown / mega-menu

Bukan mega-menu. Setiap menu utama adalah dropdown vertikal satu kolom.

| Properti | Nilai |
|---|---|
| Pemicu | hover + klik pada `.nav-link` (parent punya `role="button"`, `aria-haspopup="true"`) |
| Panel `.dropdown__menu` | background putih, border tipis abu terang, soft drop-shadow, caret segitiga di atas |
| Lebar | `224px` |
| Padding panel | `15px 0 0` |
| `.dropdown__item` | `14px / 600`, `#000`, `padding: 0 50px 13px 30px`, tinggi baris `34px` |
| Ikon toggle | `plus-light.svg` (tertutup) / `minus.svg` (terbuka), `24×24` |
| Posisi | rata kiri dengan parent link, muncul di bawah header |

### Hover / focus / active state

- Hover: link berubah warna (menjadi sky blue pada item aktif); dropdown terbuka.
- Active: `.nav-link.active` → `#4AB7F3`.
- Focus: outline bawaan browser dipertahankan (tidak di-custom).
- Mobile: dua ikon garis (bukan tiga) di kiri, logo di tengah, panel menu full-screen.

### Breadcrumb

`<ol class="breadcrumbs">` **ada di DOM** tetapi **kosong** (tidak ada `<li>` terisi) pada halaman Find a Club. Secara visual tidak terlihat. Ini dicatat sebagai temuan, bukan sesuatu yang perlu direplikasi secara visual.

### Ikon utilitas kanan

Dua ikon outline putih di kanan header: telepon (handset) dan search (magnifier). Keduanya dekoratif pada referensi (tidak membuka panel pencarian yang terlihat pada audit ini).

---

## 3. Analisis daftar menu (6 menu utama, 38 submenu)

Diekstrak langsung dari DOM `#navbarNav`. Urutan dan kapitalisasi **persis** seperti di bawah.

| # | Menu utama | Href asli | Submenu |
|---|---|---|---|
| 1 | Participate | `/participate` | Play · Find a Club · Schools · Coaches · Officials · Volunteers · Diversity & Inclusion · State & Rep teams · Rules of Lacrosse |
| 2 | News & Events | `/news-events` | News · Calendar |
| 3 | Competition Info | `/competition` | Senior Mens · Senior Womens · Juniors · U10 Lightning Carnival #2 · 2026 Olympic Cup Sixes · Tribunal & Investigation Results |
| 4 | Club Resources | `/club-information` | Grants · Club Forms · Club Management · Live Scoring Information · National Integrity Framework · Accidents, Injuries and Insurance · Club Fines · Finals Outline |
| 5 | Schools Resources | `/schools` | School Rules · School Competitions · Professional Development · School Clinics · Quick Stix Lacrosse · TriBall Lacrosse |
| 6 | About | `/about` | Lacrosse Victoria · LV Merchandise · Board of Directors and Staff · Governance · The Victorian Lacrosse Foundation · The Game of Lacrosse · Insurance Information |

**Jumlah submenu: 9 + 2 + 6 + 8 + 6 + 7 = 38.**

### Perbedaan terhadap checklist di prompt klien

| Prompt | Temuan live | Tindakan |
|---|---|---|
| "State & Rep Teams" | `State & Rep teams` (huruf kecil "t") | Ikuti sumber live |
| "2026 Olympic Cup Sixes" | sama | — |
| "U10 Lightning Carnival #2" | sama | — |
| 6 menu, 38 submenu | **cocok** | — |

Tidak ada menu yang hilang atau bertambah dibanding checklist prompt. Checklist prompt akurat.

---

## 4. Analisis homepage

### Struktur

```
section.hero.hero--lg.hero--hype.hero--season-two   (705px, bg #000 + site-texture.webp)
  └── #slider (Slick carousel, 5 slide, infinite, autoplay)
        └── .slide__content
              ├── <h1><a>Judul slide</a></h1>
              ├── <a class="button button--secondary">CTA</a>
              └── .slide__wrap (background-image, 750×456, cover/center)
  └── ul.slick-dots (5 indikator berupa thumbnail kecil)

section.footer-banner   (497px, bg #002854 + texture)
  ├── hr
  ├── h5 "Lacrosse Victoria"
  ├── flag Aboriginal + paragraf acknowledgement
  ├── rainbow flag + paragraf diversity
  └── link "About Diversity & Inclusion"

footer.footer   (88px, bg #002854)
  ├── © 2026 Lacrosse Victoria
  ├── Contacts · Terms Of Use · Privacy Policy · Support Lacrosse Victoria · Lacrosse Australia
  ├── Site By Eastwood
  └── ikon Facebook + Instagram (SVG 80×80)
```

### Slide yang teramati saat audit

| # | H1 | CTA | Background image |
|---|---|---|---|
| 1 | 2026 LV Awards Announced | View Winners Here | `2026-awards-night-web-banner.png` |
| 2 | 5th Cup Anniversary | Read More | `LacrosseTogetherCup-website-section.png` |
| 3 | Top honours at U15 Nationals | Read More | `U15-2026-wrap-up-web-image.png` |
| 4 | Come & Try Lacrosse | Resources | `Come-Try-LTC-2026-Website-article-photo.png` |
| 5 | 2026 winners revealed | See the winners | `2026-LV-Imagery-Awards-Winners-Web.png` |

### Tipografi hero

| Properti | Nilai |
|---|---|
| Font | `ProximaNova-Black, sans-serif` (di-load dari `/fonts/font.woff2`) |
| Size | `70px` |
| Weight | `500` |
| Transform | `uppercase` |
| Letter-spacing | `-2px` |
| Line-height | `60px` |
| Color | `#fff` |

### Warna dominan (dihitung dari seluruh elemen)

| Warna | Jumlah elemen | Peran |
|---|---|---|
| `rgb(23,23,23)` `#171717` | 161 | teks body/heading |
| `rgb(159,165,171)` `#9FA5AB` | 58 | tombol tertiary, teks muted |
| `rgb(0,0,0)` | 38 | teks sekunder |
| `rgb(255,255,255)` | 37 | teks di atas gelap |
| `rgb(74,183,243)` `#4AB7F3` | 2 | aksen (tombol secondary, nav active) |
| `rgb(0,40,84)` `#002854` | 2 (bg) | navy brand |

Palet inti: **navy `#002854` + putih + sky `#4AB7F3` + abu `#9FA5AB`**. Tidak ada gradient dekoratif.

### Tombol

| Varian | Background | Teks | Radius | Padding | Font | Tinggi |
|---|---|---|---|---|---|---|
| `.button--secondary` | `#4AB7F3` | `#002854` | `4px` | `12px 27px` | `14px/600` | `56px` |
| `.button--tertiary` | `#9FA5AB` | `#fff`, border `1px solid #9FA5AB` | `4px` | `12px 27px` | `14px/600` | `56px` |

Tidak ada tombol pill/rounded penuh. Tidak ada tombol besar disproportionate.

---

## 5. Analisis halaman Find a Club

### URL dan struktur

`https://lacrossevictoria.com.au/participate/find-a-club`
`<title>` = `🐴 Lacrosse Victoria | Find a Club` (emoji kuda di title asli)

```
section.hero.hero--sm                       (320px, bg #000, banner-image = site-texture.webp)
  └── ol.breadcrumbs (KOSONG)
  └── h1.hero__heading "Find a Club"        (70px / 500 / uppercase / ls -2px)

section.container.standard-content
  └── .col-12.col-lg-10.col-xl-8.ml-auto.mr-auto   (width 786.66px @1440)
        ├── #map                            (height 600px, Apple MapKit statis, TANPA marker)
        └── .clubs
              ├── h3 "Our Clubs"            (20px / 600 / mb 23px)
              └── 16 × baris klub
                    .d-flex.flex-column.flex-md-row.justify-content-between.border-bottom.border-light.mt-5
                      ├── .col → h4 (18px/700) + img logo (100px wide)
                      ├── .col → <strong>Home Ground</strong> (16px/700) + <p> alamat (18px, lh 28px)
                      └── .col → <a class="button button--tertiary">Visit Website</a>
```

### Pengukuran terukur

| Properti | Nilai |
|---|---|
| Hero height | `320px` |
| H1 | `70px / 500 / uppercase / -2px` |
| Container konten | `786.66px` (col-xl-8 dari 1140 container, centered) |
| Map height | `600px` |
| Map provider asli | **Apple MapKit** (tile statis via CDN, `mk-map-view`, `mk-disable-all-gestures`) |
| Map marker | **TIDAK ADA marker klub** pada referensi |
| h3 "Our Clubs" | `20px / 600`, `margin-bottom: 23px` |
| h4 nama klub | `18px / 700`, `margin-bottom: 23px` |
| Logo klub | lebar `100px`, tinggi mengikuti rasio asli |
| `<strong>Home Ground` | `16px / 700` |
| Alamat `<p>` | `18px`, `line-height: 28px` |
| Tombol Visit Website | `.button--tertiary` (`#9FA5AB`), `148×56px` |
| Divider antar-baris | `border-bottom: 1px solid rgb(248,249,250)` |
| Jarak antar-baris | `margin-top: 1.5rem` (24px) + tinggi baris ~230–285px |
| Layout baris | 3 kolom sama lebar (`248.9px` masing-masing) pada desktop, stack vertikal pada mobile |
| Grid/list | **List vertikal satu kolom**, bukan grid kartu |

### Perilaku klik

- Baris klub **tidak** clickable. Tidak ada link pada `h4` atau baris.
- Satu-satunya aksi adalah tombol **"Visit Website"** → membuka website klub eksternal (`target` tidak di-set, jadi navigasi di tab yang sama).
- **Tidak ada tombol "Register Interest"** di referensi. Ini konsisten dengan instruksi klien agar registrasi hanya lewat satu form utama.

### Perbedaan desktop vs mobile

| Aspek | Desktop | Mobile |
|---|---|---|
| Baris klub | 3 kolom horizontal | stack vertikal |
| Container | `786px` centered | full width, padding 20px |
| Hero | `320px` | lebih pendek, proporsional |
| Header | nav horizontal penuh | hamburger 2-garis + logo tengah |

---

## 6. Analisis layout desktop dan mobile

### Breakpoint yang dipakai referensi (Bootstrap 4)

`0 / 576px (sm) / 768px (md) / 992px (lg) / 1240px (xl)`

### Desktop (1440×857)

- Container efektif `1140px` centered.
- Header transparan 88px, logo 90×90 menonjol keluar dari tinggi header (bottom = 99px, header 88px) — logo **overlap ke bawah header**. Ini detail visual penting.
- Hero homepage 705px, hero Find a Club 320px.
- Footer banner 497px + footer 88px.

### Mobile (390×844)

- Header putih (bukan transparan) — berubah warna pada mobile.
- Logo `team-secondary.svg` (66×84 natural) di tengah.
- Hamburger 2 garis di kiri.
- Nav horizontal disembunyikan, diganti panel.
- Hero homepage tampil sebagai gambar penuh dengan judul slide di bawah/overlay.
- Tidak ada horizontal overflow.

---

## 7. Hasil identifikasi aset

| Aset | URL asli | Disimpan sebagai | Status |
|---|---|---|---|
| Logo utama | `/images/brand/team-primary.svg` | `public/images/brand/team-primary.svg` | ✅ terunduh (17.202 B) |
| Logo sekunder | `/images/brand/team-secondary.svg` | `public/images/brand/team-secondary.svg` | ✅ terunduh (4.431 B) |
| Texture background | `/images/brand/site-texture.webp` | `public/images/brand/site-texture.webp` | ✅ terunduh (23.092 B) |
| Ikon plus | `/svg/plus-light.svg` | `public/images/brand/plus-light.svg` | ✅ |
| Ikon minus | `/svg/minus.svg` | `public/images/brand/minus.svg` | ✅ |
| Bendera Aboriginal/Torres Strait | `/images/content/flags_small.png` | `public/images/brand/flags_small.png` | ✅ |
| Bendera rainbow | `/images/content/LGBTQ_rainbow_flag_...jpg` | `public/images/brand/LGBTQ_rainbow_flag_...jpg` | ✅ |
| Font display | `/fonts/font.woff2` | `public/fonts/proximanova-black.woff2` | ✅ terunduh (85.536 B) |
| Font body | Google Fonts `Poppins` 400/400i/500/600/700 | via `next/font/google` | ✅ |
| 16 logo klub | `/images/content/*` | `public/images/clubs/<slug>.<ext>` | ✅ semua terunduh |

**Catatan lisensi:** seluruh aset berasal dari situs publik Lacrosse Victoria dan digunakan hanya untuk prototype akademik non-komersial. Ini dicatat sebagai batasan, bukan klaim kepemilikan.

**Aset yang TIDAK dapat diverifikasi:** gambar hero carousel (`2026-awards-night-web-banner.png`, dll.) dan foto-foto klub tidak diunduh karena ukuran besar dan tidak diperlukan untuk journey Find a Club. Prototype menggunakan texture + palet brand sebagai gantinya, dan ini didokumentasikan sebagai penyimpangan yang disengaja.

---

## 8. Daftar klub dan alamat (hasil verifikasi live)

**16 klub** ditemukan pada halaman live. Prompt menyebut 17 nama; jumlah sebenarnya di halaman adalah **16**.

| # | Nama di situs | Home Ground | Suburb | Postcode | Lat | Lng | Sumber koordinat |
|---|---|---|---|---|---|---|---|
| 1 | Altona Lacrosse Club | Paisley Park, Mason Street | Altona | 3025 | -37.8401929 | 144.8576436 | Nominatim: "Paisley Park, Altona North" |
| 2 | Bendigo Lacrosse Club | 19 Lower Beckhams Rd | Maiden Gully | 3551 | -36.7489038 | 144.2043318 | Nominatim: alamat persis |
| 3 | Brunswick Lacrosse Club | 6 Cross St | Brunswick East | 3057 | -37.7692981 | 144.9745840 | Nominatim: "Cross Street, Brunswick East" |
| 4 | Camberwell Lacrosse Club | Estella St | Glen Iris | 3146 | -37.8623604 | 145.0634519 | Nominatim: "Estella Street, Glen Iris" |
| 5 | Caulfield Lacrosse Club | 280 Balaclava Rd | Caulfield North | 3161 | -37.8729676 | 145.0282577 | Nominatim: alamat persis |
| 6 | Chadstone Lacrosse Club | 32A Chadstone Rd | Malvern East | 3145 | -37.8858131 | 145.0784828 | Nominatim: "Chadstone Road, Malvern East" |
| 7 | Eltham Lacrosse Club | The Pavilion, Eltham Lower Park, 570 Main Rd | Eltham | 3095 | -37.7340848 | 145.1415689 | Nominatim: "Eltham Lower Park" |
| 8 | Footscray Lacrosse Club | Corner of Francis & Roberts Street | Yarraville | 3013 | -37.8120642 | 144.8694294 | Nominatim: "Roberts Street, Yarraville" |
| 9 | Malvern Lacrosse Club | 1251 High St | Malvern | 3144 | -37.8562867 | 145.0298052 | Nominatim: "1251 High Street, Malvern" |
| 10 | MCC Lacrosse Club | 2 Roy St | Melbourne | 3004 | -37.8462570 | 144.9778840 | Nominatim: "Roy Street, Melbourne 3004" |
| 11 | Melbourne University Lacrosse Club | Park St | Parkville | 3052 | -37.7758457 | 144.9413790 | Nominatim: "Park Street, Parkville" |
| 12 | Newport Lacrosse Club | 257 Mason St | Altona North | 3025 | -37.8400874 | 144.8558591 | Nominatim: alamat persis |
| 13 | Surrey Park Lacrosse Club | Braemar St | Mont Albert North | 3129 | -37.8110416 | 145.1090205 | Nominatim: "Braemar Street" |
| 14 | Willamstown Lacrosse Club | Fearon Reserve, Garden Street, 27, Esplanade | Williamstown | 3016 | -37.8669328 | 144.8952879 | Nominatim: "Fearon Reserve" |
| 15 | Williamstown Womens Lacrosse Club | Fearon Reserve, 27 Esplanade | Williamstown | 3016 | -37.8669328 | 144.8952879 | Nominatim: "Fearon Reserve" |
| 16 | Wyndham Lacrosse Club | 257 McGrath Road | Wyndham Vale | 3024 | -37.8969958 | 144.6284702 | Nominatim: alamat persis |

### Klub dengan lebih dari satu lokasi

**MCC Lacrosse Club** memiliki dua lokasi di halaman referensi:

- `Home Ground`: 2 Roy St, Melbourne, 3004
- `Beaumaris Secondary College (Juniors Lacrosse) 136 Reserve Road, Beaumaris, 3193`

Prototype menampilkan **Home Ground (2 Roy St)** sebagai lokasi utama. Lokasi junior dicatat di dataset sebagai `secondaryVenue` dan ditampilkan sebagai informasi tambahan pada detail klub, tanpa marker kedua (agar tidak mengklaim cakupan peta yang tidak diverifikasi).

### Klub yang berbagi lokasi

Williamstown Lacrosse Club dan Williamstown Womens Lacrosse Club sama-sama berbasis di **Fearon Reserve, 27 Esplanade, Williamstown 3016**. Marker keduanya akan bertumpuk; prototype menangani ini dengan *offset* visual kecil pada marker dan label yang membedakan, bukan dengan memalsukan koordinat.

### Catatan kejujuran data

- Nama klub #14 tertulis **"Willamstown"** (tanpa huruf "i" kedua) di situs live. Dataset memakai `displayName: "Willamstown Lacrosse Club"` sesuai sumber dan `searchAliases` mencakup "Williamstown" agar pencarian tetap menemukan klub ini.
- Tidak ada koordinat yang dibuat-buat. Semua berasal dari hasil geocoding Nominatim terhadap alamat yang dipublikasikan Lacrosse Victoria.
- Tingkat presisi: geocoding alamat jalan/reserve, **bukan** titik lapangan. Ini dicatat sebagai keterbatasan.

---

## 9. Hasil pengamatan interaksi

| Interaksi | Perilaku teramati |
|---|---|
| Hover menu utama | dropdown terbuka, link berubah warna |
| Klik parent menu | menavigasi ke halaman section (mis. `/participate`) — **tidak boleh ditiru** sesuai scope |
| Klik "Find a Club" | navigasi ke `/participate/find-a-club` |
| Klik "Visit Website" pada klub | navigasi ke website klub eksternal |
| Klik baris klub | tidak ada aksi |
| Map | **statis**, `mk-disable-all-gestures`, tanpa marker, tanpa zoom/pan |
| Hero carousel | autoplay, 5 slide, indikator thumbnail, infinite loop |
| Scroll | scrollbar native, bukan scroll-jacking |
| Mobile menu | hamburger membuka panel; logo berubah ke versi sekunder |

**Temuan penting:** peta referensi **tidak interaktif dan tidak punya marker**. Instruksi klien meminta interactive map dengan marker — ini adalah peningkatan yang diminta, bukan regresi.

---

## 10. Temuan yang belum dapat dipastikan

| # | Item | Alasan |
|---|---|---|
| 1 | Font `ProximaNova-Black` lisensi | Diunduh dari `/fonts/font.woff2`; lisensi komersial tidak diverifikasi. Digunakan hanya untuk prototype akademik. |
| 2 | Gambar hero carousel | Tidak diunduh (ukuran besar, di luar journey utama). Prototype memakai texture brand. |
| 3 | Perilaku search ikon header | Ikon ada tetapi panel pencarian tidak teramati terbuka saat audit. Tidak direplikasi sebagai fitur. |
| 4 | Breadcrumb kosong | `<ol class="breadcrumbs">` kosong di DOM; tidak jelas apakah bug situs atau disengaja. Tidak direplikasi. |
| 5 | Apakah daftar 16 klub lengkap | Halaman live menampilkan 16; tidak ada paginasi/load-more yang teramati. Diasumsikan lengkap per tanggal audit. |
| 6 | Contoh screenshot email klien | Tidak tersedia di workspace. Format email dibangun dari baseline di prompt, bukan dari contoh visual. |
| 7 | Nomor telepon di ikon header | Ikon ada, nomor tidak terlihat tanpa interaksi. |

---

## 11. Pedoman: apa yang ditiru dan apa yang sengaja diubah

### DITIRU (harus sangat mirip)

| Elemen | Alasan |
|---|---|
| Logo (SVG asli, 90×90, overlap header) | identitas brand |
| Tinggi header 88px, transparan di atas hero | struktur khas |
| Warna navy `#002854` / sky `#4AB7F3` / abu `#9FA5AB` / ink `#171717` | brand palette |
| Font Poppins (body) + ProximaNova-Black (display) | tipografi khas |
| 6 menu utama + 38 submenu, urutan & kapitalisasi | instruksi klien #3 |
| Dropdown putih dengan caret, lebar ~224px, item 14px/600 | perilaku khas |
| Hero heading 70px uppercase, letter-spacing -2px | karakter visual |
| Tombol radius 4px, padding 12px 27px, tinggi 56px | bentuk elemen |
| Footer navy 88px + footer-banner dengan acknowledgement & diversity | konten wajib brand |
| Container 1140px | grid |
| Halaman Find a Club hero `hero--sm` 320px + h1 70px | kesinambungan halaman |

### SENGAJA DIUBAH (dan alasannya)

| Elemen | Perubahan | Alasan |
|---|---|---|
| Body halaman Find a Club | Ditata ulang: search + peta interaktif + daftar klub + panel detail + form | instruksi klien #7: "boleh memiliki tata letak dan interaksi baru yang lebih modern" |
| Peta | Dari Apple MapKit statis tanpa marker → Leaflet + OSM dengan marker & sinkronisasi | instruksi klien Phase 6.3 |
| Kartu klub | Dari baris list statis → kartu terpilih dengan state jelas | kebutuhan "selected state yang jelas" |
| Navigasi menu | Dari link fungsional → elemen visual non-navigasi (kecuali Find a Club) | instruksi klien #4 & #5 |
| Ikon header | Tetap visual, tidak membuka panel | tidak ada data pendukung |
| Gambar hero | Menggunakan texture brand, bukan foto kampanye | aset kampanye tidak tersedia/di luar scope |

### DILARANG (tidak boleh muncul di hasil)

Gradient dekoratif baru · kartu dashboard radius berlebihan · font generik pengganti Poppins/ProximaNova · layout SaaS generik · emoji sebagai ikon · animasi berlebihan · tombol besar tidak proporsional · bahasa Indonesia pada UI.
