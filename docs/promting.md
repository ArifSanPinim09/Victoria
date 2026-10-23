# MASTER PROMPT — LACROSSE VICTORIA FIND A CLUB REVAMP

## 1. ROLE DAN MISI UTAMA

Anda bertindak sebagai Senior Full-Stack Developer, UI Reverse Engineer, UI/UX Designer, dan Technical Planner yang bertanggung jawab membangun prototype revamp website Lacrosse Victoria untuk kebutuhan presentasi tugas kuliah klien.

Website referensi utama:

- Website asli: https://lacrossevictoria.com.au/
- Halaman yang menjadi fokus utama: https://lacrossevictoria.com.au/participate/find-a-club
- Framework wajib: Next.js menggunakan versi stable terbaru yang kompatibel pada saat pengerjaan.
- Deployment target: Vercel.
- Email penerima hasil registrasi: \`darapuspitanurani@gmail.com\`.
- Map: lokasi asli klub lacrosse di Victoria, Australia.
- Bahasa antarmuka: English saja.
- Tujuan: prototype modern untuk presentasi, bukan sistem operasional resmi Lacrosse Victoria.

Tugas Anda bukan sekadar membuat website yang terinspirasi dari Lacrosse Victoria. Anda harus melakukan reverse engineering terhadap website referensi terlebih dahulu, memahami tampilan dan struktur aslinya, mendokumentasikan hasil temuan, menyusun PRD, membuat rencana implementasi, lalu mengembangkan prototype sesuai spesifikasi tersebut.

Jangan langsung melakukan coding hanya karena sudah memahami sebagian kebutuhan dari prompt ini.

\*\*Urutan wajib: AUDIT WEBSITE ASLI → DOKUMENTASI KEBUTUHAN → PRD → PLANNING DAN TASK BREAKDOWN → IMPLEMENTASI → VERIFIKASI ALUR UTAMA.\*\*

Jangan melewati tahapan tersebut.

---

## 2. ATURAN PALING PENTING — WAJIB DICATAT DALAM AGENTS.MD

Buat atau perbarui file \`AGENTS.md\` di root project sebelum melakukan perubahan kode.

File ini merupakan permanent project memory yang wajib dibaca kembali sebelum memulai setiap task. Catat seluruh ketentuan berikut di dalamnya dan jangan pernah menghilangkannya ketika melakukan revisi dokumentasi.

### WARNING: SCOPE PROYEK TERKUNCI

1. Website referensi wajib diperiksa secara langsung sebelum implementasi.
2. Tampilan website asli harus direproduksi sedekat mungkin dengan referensi. Jangan menggunakan template SaaS, template dashboard generik, desain AI generik, atau kreativitas yang menyimpang dari visual aslinya.
3. Semua menu dan submenu utama website asli wajib tetap tersedia dengan susunan yang sama.
4. Semua menu selain Find a Club hanya berupa elemen visual. Ketika diklik, tidak boleh membuka halaman fungsional lain, mengarahkan ke halaman yang tidak dibangun, atau memunculkan konten palsu.
5. Hanya journey Find a Club yang benar-benar berfungsi.
6. Journey utama yang harus berfungsi adalah:

   \`Find a Club → Find/Search Club → Interactive Map → Select Club → Registration Form → Submit → Actual Email Delivery → Success State\`

7. Halaman Find a Club boleh memiliki tata letak dan interaksi baru yang lebih modern. Namun, identitas visual Lacrosse Victoria dan bagian website bersama harus tetap konsisten dengan website asli.
8. Seluruh form registrasi harus berfungsi sungguhan, termasuk validasi dan pengiriman ke alamat Gmail klien.
9. Pesan sukses tidak boleh ditampilkan jika pengiriman email gagal.
10. Semua perubahan harus berdasarkan kebutuhan klien, hasil audit, dan dokumentasi proyek. Jangan menambahkan fitur yang tidak diminta.

\*\*Peringatan ini harus tercatat minimal di \`AGENTS.md\`, \`docs/PRD.md\`, \`docs/client-requirements.md\`, dan \`docs/PROJECT\_LOG.md\`.\*\*

Jika terdapat konflik antara keinginan menambahkan fitur baru dan batas scope tersebut, batas scope proyek menjadi prioritas.

---

# PHASE 0 — INSPEKSI PROJECT DAN KONDISI AWAL

Sebelum mulai mengembangkan apa pun, periksa project yang sedang tersedia.

Lakukan langkah berikut:

1. Periksa struktur direktori.
2. Periksa \`package.json\`, lockfile, framework, komponen, konfigurasi, assets, route, API, dan fitur yang sudah ada.
3. Identifikasi bagian yang sudah jadi, belum jadi, mengalami bug, atau tidak sesuai dengan feedback klien.
4. Jangan menghapus hasil implementasi yang masih benar hanya karena Anda ingin membangun ulang dengan pendekatan berbeda.
5. Jangan melakukan reset project atau mengganti teknologi tanpa alasan yang terdokumentasi.
6. Jika project sudah memiliki tampilan preview, ambil screenshot sebelum revisi sebagai baseline perbandingan.
7. Catat seluruh temuan di project documentation.

Jika project kosong, lanjutkan menggunakan stack yang ditentukan di bawah.

Jangan membuat asumsi bahwa seluruh pekerjaan harus dimulai dari nol.

# PHASE 1 — REVERSE ENGINEERING WEBSITE VICTORIA

## 1.1. Wajib memeriksa website asli melalui browser

Buka kedua URL berikut:

- https://lacrossevictoria.com.au/
- https://lacrossevictoria.com.au/participate/find-a-club

Gunakan browser dan inspeksi visual langsung. Jangan hanya membaca teks hasil search engine atau menebak tampilan dari nama website.

Jika tersedia browser automation, gunakan untuk mengamati interaksi, mengambil screenshot, dan memeriksa ukuran serta perilaku komponen.

Jika website tidak dapat dibuka atau terdapat hambatan akses, catat hambatannya dan gunakan sumber alternatif yang benar-benar tersedia. Jangan mengarang hasil inspeksi yang belum dilakukan.

## 1.2. Audit halaman utama dan shared website shell

Periksa dan dokumentasikan:

- Header dan posisi logo.
- Dimensi serta alignment logo.
- Warna utama dan warna pendukung.
- Tipografi, weight, ukuran font, dan line-height.
- Tinggi header serta jarak antarbagian.
- Susunan navigation menu.
- Dropdown atau mega-menu.
- Hover, focus, dan active state.
- Jarak antar-menu dan submenu.
- Bentuk tombol serta ukuran elemen interaktif.
- Breadcrumb jika tersedia.
- Footer dan susunannya.
- Border, shadow, radius, divider, dan background.
- Penggunaan gambar, icon, serta aset resmi.
- Tampilan desktop dan mobile.
- Struktur halaman home yang terlihat saat pengguna membuka website.

Perhatikan bahwa targetnya adalah kesesuaian visual. Jangan mengganti layout yang sudah khas dengan navbar generik hanya karena implementasinya lebih mudah.

## 1.3. Audit khusus halaman Find a Club

Periksa halaman referensi dan catat:

- URL serta struktur halaman.
- Heading dan teks yang tampil.
- Struktur kartu klub.
- Nama dan logo atau gambar klub.
- Alamat/home ground.
- Tombol atau link setiap klub.
- Susunan list dan grid.
- Jarak antar-kartu.
- Ukuran gambar.
- Background dan separator.
- Breadcrumb dan footer.
- Perilaku ketika kartu atau link diklik.
- Informasi klub yang benar-benar tersedia.
- Perbedaan layout desktop dan mobile.

Ambil screenshot halaman pada viewport desktop dan mobile.

Jangan mengandalkan ingatan setelah membuka halaman. Simpan bukti audit di folder dokumentasi project.

Jika tools memungkinkan, simpan screenshot referensi dan implementasi lokal dalam folder:

\`docs/reference/screenshots/\`

Jika screenshot tidak dapat disimpan karena keterbatasan tools, tuliskan hasil pengamatan dengan detail di dokumen audit.

## 1.4. Audit menu website asli

Catat seluruh menu utama dan submenu berdasarkan website asli yang sedang live.

Daftar awal yang harus diperiksa meliputi:

\*\*Participate\*\*
- Play
- Find a Club
- Schools
- Coaches
- Officials
- Volunteers
- Diversity &amp; Inclusion
- State &amp; Rep Teams
- Rules of Lacrosse

\*\*News &amp; Events\*\*
- News
- Calendar

\*\*Competition Info\*\*
- Senior Mens
- Senior Womens
- Juniors
- U10 Lightning Carnival #2
- 2026 Olympic Cup Sixes
- Tribunal &amp; Investigation Results

\*\*Club Resources\*\*
- Grants
- Club Forms
- Club Management
- Live Scoring Information
- National Integrity Framework
- Accidents, Injuries and Insurance
- Club Fines
- Finals Outline

\*\*Schools Resources\*\*
- School Rules
- School Competitions
- Professional Development
- School Clinics
- Quick Stix Lacrosse
- TriBall Lacrosse

\*\*About\*\*
- Lacrosse Victoria
- LV Merchandise
- Board of Directors and Staff
- Governance
- The Victorian Lacrosse Foundation
- The Game of Lacrosse
- Insurance Information

Daftar ini merupakan checklist awal berdasarkan struktur website yang ditemukan, bukan alasan untuk mengabaikan kondisi website live.

Verifikasi nama, urutan, kapitalisasi, grouping, dan item terbaru ketika Anda melakukan audit.

Semua menu yang ditemukan harus direpresentasikan dalam prototype. Jangan menghilangkan menu hanya karena halaman tujuannya tidak termasuk scope.

### Aturan interaksi menu

- Pertahankan susunan menu dan submenu seperti website asli.
- Jika menu asli memiliki dropdown atau mega-menu, reproduksi perilaku visualnya.
- Menu dan submenu boleh memiliki hover/focus state.
- Seluruh item non-Find a Club tidak boleh menavigasikan pengguna ke halaman konten baru.
- Jangan membuat halaman palsu untuk Schools, News, Competition Info, dan menu lainnya.
- Item Find a Club merupakan satu-satunya pengecualian dan harus membuka alur yang berfungsi.
- Jika parent menu diperlukan untuk membuka dropdown, interaksi itu boleh tetap berjalan. Namun, jangan biarkan kliknya mengarahkan pengguna ke halaman lain.

## 1.5. Audit aset visual

Temukan dan identifikasi aset yang dapat digunakan secara sah dan sesuai kebutuhan prototype, termasuk:

- Logo Lacrosse Victoria.
- Logo dan gambar klub.
- Foto pemain atau olahraga.
- Icon.
- Font yang digunakan.
- Banner.
- Gambar dekoratif yang terlihat pada referensi.

Jangan mengganti aset penting dengan emoji, placeholder generik, atau icon yang tidak cocok apabila aset asli dapat diperoleh dan digunakan.

Jika aset gambar asli tidak dapat diakses, catat aset yang hilang dan cari pengganti yang paling mendekati secara visual.

Jangan mengklaim suatu aset sebagai logo atau foto resmi jika asalnya belum terverifikasi.

## 1.6. Audit lokasi klub

Halaman resmi Find a Club merupakan sumber utama untuk data lokasi.

Verifikasi setidaknya klub yang ditemukan di halaman referensi, antara lain:

- Altona Lacrosse Club.
- Bendigo Lacrosse Club.
- Brunswick Lacrosse Club.
- Camberwell Lacrosse Club.
- Caulfield Lacrosse Club.
- Chadstone Lacrosse Club.
- Eltham Lacrosse Club.
- Footscray Lacrosse Club.
- Malvern Lacrosse Club.
- MCC Lacrosse Club.
- Melbourne University Lacrosse Club.
- Newport Lacrosse Club.
- Surrey Park Lacrosse Club.
- Williamstown Lacrosse Club.
- Williamstown Women's Lacrosse Club.
- Wyndham Lacrosse Club.

Periksa apakah daftar klub saat audit masih sama. Jangan menganggap daftar tersebut pasti lengkap atau tidak berubah.

Untuk setiap klub, simpan:

- ID unik.
- Nama resmi.
- Alamat home ground.
- Suburb.
- Postcode.
- Latitude.
- Longitude.
- Sumber alamat atau koordinat.
- Informasi pendukung yang benar-benar tersedia.

Khusus klub yang mempunyai lebih dari satu lokasi, catat dengan jelas lokasi mana yang sedang ditampilkan.

Jangan membuat koordinat palsu atau menempatkan marker secara acak hanya untuk membuat peta terlihat penuh.

## 1.7. Hasil wajib fase reverse engineering

Sebelum melanjutkan ke implementasi, hasilkan dokumen:

\`docs/reference-audit.md\`

Dokumen minimal mencakup:

1. URL referensi.
2. Tanggal audit.
3. Screenshot yang berhasil diambil.
4. Analisis header dan navigasi.
5. Analisis daftar menu.
6. Analisis homepage.
7. Analisis halaman Find a Club.
8. Analisis layout desktop dan mobile.
9. Hasil identifikasi aset.
10. Daftar klub beserta alamat yang ditemukan.
11. Hasil pengamatan interaksi.
12. Temuan yang belum dapat dipastikan.
13. Pedoman apa yang harus ditiru dan apa yang sengaja diubah.

Jangan memulai implementasi UI utama sebelum dokumen ini selesai.

---

# PHASE 2 — DOKUMENTASI, PRD, DAN PLANNING

Setelah reverse engineering selesai, susun dokumentasi yang cukup untuk mengarahkan pekerjaan tanpa menghasilkan dokumen berlebihan.

Tidak perlu membuat puluhan dokumen generik yang tidak berhubungan dengan kebutuhan klien.

Gunakan struktur berikut sebagai struktur awal yang dapat disesuaikan berdasarkan hasil audit:

\`\`\`text
AGENTS.md

docs/
├── README.md
├── PRD.md
├── client-requirements.md
├── reference-audit.md
├── design-spec.md
├── user-flow-and-form.md
├── email-delivery.md
├── implementation-plan.md
├── PROJECT\_LOG.md
├── NEXT-ACTIONS.md
└── tasks/
    ├── README.md
    ├── 01-reference-audit.md
    ├── 02-prd-and-planning.md
    ├── 03-email-delivery.md
    ├── 04-club-data-and-map.md
    ├── 05-original-site-shell.md
    ├── 06-find-club-interface.md
    ├── 07-registration-form.md
    └── 08-final-verification.md
\`\`\`

Struktur boleh dikembangkan apabila hasil audit membuktikan ada kebutuhan nyata. Jangan menambahkan file semata-mata agar struktur terlihat besar atau profesional.

### Ketentuan dokumentasi

\*\*\`AGENTS.md\`\*\*

Menjadi instruksi permanen bagi AI agent. Berisi scope, batasan fitur, standar desain, stack, aturan implementasi, cara melanjutkan task, dan catatan setiap perubahan.

\*\*\`docs/README.md\`\*\*

Menjelaskan proyek, tujuan, hubungan antar-dokumen, dan cara menggunakan dokumentasi.

\*\*\`docs/PRD.md\`\*\*

Menjadi product requirement yang lengkap untuk proyek ini. Isinya harus menjawab kebutuhan klien secara terukur, bukan menggunakan template PRD generik yang tidak relevan.

\*\*\`docs/client-requirements.md\`\*\*

Memisahkan permintaan eksplisit klien, interpretasi kebutuhan, batas scope, dan hal yang belum terkonfirmasi.

\*\*\`docs/reference-audit.md\`\*\*

Menjadi sumber hasil pengamatan terhadap website asli.

\*\*\`docs/design-spec.md\`\*\*

Berisi visual specification, screenshot referensi, layout, ukuran, warna, tipografi, komponen, interaksi, serta aturan perbandingan visual.

\*\*\`docs/user-flow-and-form.md\`\*\*

Berisi journey pengguna, struktur form final, pilihan input, validasi, consent, dan kondisi sukses/gagal.

\*\*\`docs/email-delivery.md\`\*\*

Menjelaskan arsitektur email, format email, target inbox, konfigurasi lingkungan, proses pengiriman, hasil pengujian, dan batasan konfigurasi yang masih diperlukan.

\*\*\`docs/implementation-plan.md\`\*\*

Berisi urutan pengerjaan, ketergantungan antar-task, definisi selesai, dan prioritas.

\*\*\`docs/PROJECT\_LOG.md\`\*\*

Menjadi sumber kebenaran status implementasi dan riwayat pekerjaan.

\*\*\`docs/NEXT-ACTIONS.md\`\*\*

Mencatat task berikutnya berdasarkan kondisi project yang benar-benar ada.

\*\*\`docs/tasks/\*.md\`\*\*

Setiap task menjelaskan ruang lingkup, file terkait, instruksi, acceptance criteria, dependency, hasil implementasi, dan status.

Dokumentasi harus menggambarkan kondisi aktual. Jangan menuliskan suatu task sebagai selesai jika belum diimplementasikan dan diverifikasi.

---

# PHASE 3 — SUSUN PRD YANG TERUKUR

PRD wajib selesai sebelum coding utama dimulai.

Minimal mencakup bagian berikut.

## A. Product overview

Nama produk, tujuan, konteks tugas kuliah, target pengguna, website referensi, dan alasan dilakukan revamp.

## B. Problem statement

Jelaskan perjalanan pengguna yang ingin ditingkatkan: mencari klub, mengenali lokasinya, memilih klub, mengisi pendaftaran, dan mengirim enquiry.

## C. Goals

- Mereplikasi shared website shell sedekat mungkin dengan website asli.
- Menghadirkan Find a Club dengan pengalaman yang lebih modern.
- Menampilkan klub dan lokasi yang benar.
- Menyediakan interactive map.
- Menyediakan registration form.
- Mengirim data registrasi secara nyata ke Gmail klien.
- Memastikan prototype siap digunakan ketika dipresentasikan.

## D. Non-goals

Secara tegas menetapkan bahwa proyek tidak mencakup:

- Website lengkap semua halaman Lacrosse Victoria.
- Dashboard admin.
- Sistem login dan akun pengguna.
- Sistem pembayaran.
- Pengelolaan keanggotaan klub resmi.
- Integrasi ke database operasional Lacrosse Victoria.
- Pengiriman data ke API resmi pihak ketiga yang tidak diminta.
- Sistem CMS.
- SEO audit yang mendalam.
- Dokumen QA, security, dan performance yang terpisah secara berlebihan.
- Fitur fungsional selain journey Find a Club.

Validasi server dan konfigurasi pengiriman email tetap harus dilakukan karena diperlukan untuk menjalankan fitur utama.

## E. User personas

Cukup untuk konteks calon pemain, orang tua/wali pemain junior, dan pengunjung yang mencari klub di Victoria.

## F. User journey

Jelaskan journey utama dari homepage sampai email diterima.

## G. Functional requirements

Dokumentasikan kebutuhan menu, pop-up email, pencarian klub, filter yang relevan, map, marker, detail lokasi, form, validasi, submit, email, dan success/error state.

## H. UI/UX requirements

Jelaskan secara detail bagian yang harus sama dengan sumber dan bagian yang diperbolehkan untuk dirombak.

## I. Form requirements

Cantumkan seluruh field, pilihan, aturan wajib/opsional, consent, serta validasi sesuai kebutuhan di bagian berikut.

## J. Email requirements

Menjelaskan penerima, sender, subject, format HTML, informasi yang dikirim, serta syarat keberhasilan.

## K. Data requirements

Menjelaskan sumber data klub, alamat, koordinat, dan fallback jika lokasi tidak dapat diverifikasi.

## L. Routing dan behavior

Menetapkan hanya route yang diperlukan dan perilaku semua menu di luar scope.

## M. Responsive behavior

Menjelaskan hasil yang diharapkan pada desktop, tablet, dan mobile.

## N. Technical decisions

Mencatat versi framework, pilihan map, email provider, dan alasan pemilihannya.

## O. Acceptance criteria

Setiap requirement memiliki indikator yang dapat diuji.

## P. Scope boundaries dan unresolved items

Semua hal yang belum diketahui harus dicatat, bukan diisi menggunakan asumsi yang seolah-olah sudah dikonfirmasi.

Tidak perlu memaksakan PRD menjadi 29 bagian. Jumlah dan struktur mengikuti kebutuhan proyek sebenarnya.

---

# PHASE 4 — DESIGN SPECIFICATION DAN VISUAL FIDELITY

Visual fidelity adalah prioritas terbesar dalam proyek ini.

## 4.1. Prinsip utama

Jangan memulai dengan preferensi desain Anda sendiri. Mulailah dengan meniru hasil audit.

Website bukan proyek untuk memamerkan desain paling trendi. Kualitas utamanya adalah seberapa meyakinkan hasil revamp jika diperlihatkan berdampingan dengan website Lacrosse Victoria yang asli.

Bagian bersama yang harus sedekat mungkin dengan referensi:

- Logo dan branding.
- Header.
- Navigation menu.
- Nama menu dan submenu.
- Dropdown atau mega-menu.
- Font dan hierarki heading.
- Warna.
- Spacing dan alignment.
- Border dan bentuk elemen.
- Footer.
- Penggunaan gambar dan aset.

Jangan mengganti bagian tersebut menggunakan navbar baru yang tidak berhubungan dengan referensi.

## 4.2. Hanya Find a Club yang dirombak

Pada body halaman Find a Club, buat pengalaman yang lebih modern dengan mengintegrasikan pencarian, peta, informasi klub, dan form.

Modernisasi harus tetap memakai bahasa visual Lacrosse Victoria. Ambil warna, tipografi, aset, serta karakter desain dari hasil audit.

Jangan menggunakan:

- Gradient dekoratif yang tidak ada pada referensi dan tidak mendukung desain.
- Dashboard cards dengan radius berlebihan.
- Font generik yang mengubah identitas visual.
- Layout SaaS generik.
- Emoji sebagai pengganti icon profesional.
- Animasi berlebihan.
- Efek visual yang mengganggu keterbacaan.
- Tombol besar yang tidak proporsional.
- Elemen visual yang hanya mempercantik tetapi mengurangi kegunaan.

Modern bukan berarti seluruh komponen harus diubah. Modernisasi hanya diterapkan ketika membantu alur pencarian dan registrasi.

## 4.3. Design tokens

Setelah audit, simpan design tokens yang didasarkan pada hasil pengamatan:

- Primary dan secondary colors.
- Text colors.
- Surface/background colors.
- Border colors.
- Font family dan typography scale.
- Spacing scale.
- Button heights.
- Border radius.
- Shadow jika memang diperlukan.
- Breakpoints.
- Container width.

Hindari menebak warna dari preferensi pribadi jika warna asli dapat diidentifikasi.

Jangan membuat terlalu banyak token yang tidak digunakan.

## 4.4. Visual comparison

Sediakan metode untuk membandingkan hasil lokal dengan referensi.

Gunakan ukuran viewport yang sama ketika membandingkan:

1. Header.
2. Dropdown/menu.
3. Homepage shell.
4. Find a Club sebelum perubahan sebagai referensi.
5. Find a Club setelah redesign.
6. Responsive layout.

Evaluasi alignment, proporsi, jarak, tipografi, gambar, dan konsistensi branding.

Perbaiki perbedaan visual yang jelas sebelum menganggap UI selesai.

---

# PHASE 5 — REGISTRATION POP-UP

Klien meminta kemungkinan pop-up untuk mengisi email registrasi ketika website dibuka. Masukkan kebutuhan tersebut ke dalam prototype dengan tetap mempertahankan fokus journey.

Implementasikan pop-up email yang sederhana dan selaras dengan website asli.

Perilaku yang diharapkan:

1. Pop-up muncul pada kunjungan awal sesuai desain hasil audit dan keputusan UX yang didokumentasikan.
2. Pengunjung dapat memasukkan email.
3. Pengunjung dapat melanjutkan ke alur Find a Club.
4. Email yang telah diisi dibawa ke registration form sebagai nilai awal.
5. Pengunjung tetap dapat menutup atau melewati pop-up agar tidak terjebak di sana.
6. Pop-up tidak boleh merusak menu, layout, atau responsivitas website.
7. Jangan mengirim email registrasi hanya karena pop-up dibuka atau alamat dimasukkan.
8. Email registrasi lengkap baru dikirim ke klien setelah form utama berhasil disubmit.

Gunakan state atau mekanisme penyimpanan ringan bila diperlukan agar pop-up tidak muncul berulang kali secara mengganggu. Pilihan perilaku harus didokumentasikan di \`docs/design-spec.md\` dan \`docs/user-flow-and-form.md\`.

Jangan membuat pop-up tersebut menjadi newsletter system, login system, atau fitur lain yang tidak diminta.

---

# PHASE 6 — FIND A CLUB JOURNEY

## 6.1. Overview

Halaman Find a Club adalah satu-satunya area yang membutuhkan interaksi end-to-end.

Struktur journey:

\`\`\`text
Website Homepage
       |
       v
Open Find a Club
       |
       v
Search / Browse Clubs
       |
       v
Interactive Map + Club Information
       |
       v
Select a Club
       |
       v
Registration Form
       |
       v
Validate Input
       |
       v
Submit to Next.js Server
       |
       v
Send Email through Email Provider
       |
       +------ Failed ------&gt; Error State / Retry
       |
       v
Email Accepted by Provider
       |
       v
Success State
\`\`\`

Email dianggap berhasil dikirim hanya ketika layanan email mengembalikan respons sukses untuk permintaan pengiriman. Jangan mengklaim bahwa email pasti sudah masuk inbox hanya berdasarkan respons tersebut.

## 6.2. Search dan daftar klub

Pengunjung dapat menemukan klub yang sesuai.

Minimal:

- Tampilkan nama klub.
- Tampilkan suburb atau alamat.
- Sediakan pencarian berdasarkan nama klub dan lokasi.
- Sediakan daftar klub yang dapat dipilih.
- Hubungkan setiap klub dengan marker lokasi yang benar.
- Tampilkan selected state yang jelas.
- Pastikan daftar dan map menampilkan pilihan klub yang konsisten.

Tambahkan filter hanya jika filter tersebut benar-benar membantu kebutuhan yang sudah disepakati. Jangan membuat filter kategori yang tidak memiliki data pendukung.

## 6.3. Interactive map

Gunakan Leaflet dan OpenStreetMap atau alternatif gratis yang sesuai dan kompatibel.

Kebutuhan map:

- Tampilkan peta Victoria/Melbourne dengan cakupan yang sesuai data klub.
- Tampilkan marker untuk setiap lokasi klub yang valid.
- Ketika marker diklik, tampilkan informasi klub.
- Ketika klub dipilih dari daftar, sinkronkan selected state dan tampilan marker.
- Berikan kontrol zoom dan pan.
- Berikan pengalaman yang layak di desktop maupun mobile.
- Jika alamat tidak dapat diverifikasi, jangan mengarang koordinat.
- Periksa izin penggunaan tile dan layanan geocoding yang digunakan.

Jangan melakukan geocoding seluruh alamat pada setiap render. Verifikasi koordinat pada tahap persiapan data dan gunakan dataset yang stabil selama prototype.

Jangan bergantung pada API berbayar tanpa persetujuan. Gunakan solusi yang tidak memerlukan langganan wajib, dengan tetap menghormati kebijakan layanan peta yang dipakai.

## 6.4. Detail klub

Ketika pengguna memilih klub, tampilkan informasi yang membantu mereka memahami pilihan tersebut:

- Club name.
- Home ground.
- Suburb/postcode.
- Marker yang dipilih.
- Alamat lengkap yang tersedia.
- Aksi untuk melanjutkan ke form registrasi.

Jangan menambahkan tombol “Register Interest” pada setiap kartu atau lokasi klub sebagai aksi terpisah.

\*\*Registrasi harus dilakukan melalui satu form utama, bukan melalui tombol registrasi yang tersebar di setiap club card.\*\*

Pilihan klub dari map atau daftar harus diteruskan otomatis ke field Club pada form utama.

---

# PHASE 7 — FORM REGISTRASI FINAL

Gunakan field yang diberikan langsung oleh klien.

Semua label, opsi, checkbox, dan pesan validasi yang dilihat pengunjung harus menggunakan bahasa Inggris karena website hanya memiliki opsi English.

## 7.1. Daftar field

### 1. Name
Jenis: text input.

Wajib diisi.

### 2. Email address
Jenis: email input.

Wajib diisi. Validasi format email.

Jika pengguna telah memasukkan email pada pop-up, gunakan sebagai nilai awal form.

### 3. Phone number
Jenis: telephone input atau text input dengan validasi yang sesuai.

Wajib diisi.

Jangan membatasi input hanya ke format nomor Indonesia karena pengunjung berada di Australia.

### 4. Suburb / postcode
Jenis: text input.

Wajib diisi.

### 5. Club
Jenis: select atau komponen pilihan klub yang sesuai dengan UI.

Wajib diisi.

Pilihan harus terhubung dengan dataset klub dan otomatis terisi ketika pengguna sebelumnya memilih klub pada peta/list.

### 6. Program
Jenis: select atau radio group.

Pilihan persis:

- Junior
- Senior Men
- Senior Women

Wajib diisi.

### 7. I'm interested in
Jenis: select atau radio group.

Pilihan persis:

- Trial / Come &amp; Try
- Membership

Wajib diisi.

### 8. Player age / age group
Gunakan kontrol input yang sesuai dengan kebutuhan pilihan umur.

Wajib diisi.

Jangan mengarang rentang usia tertentu tanpa dasar dari informasi klien atau referensi yang telah diverifikasi.

Jika pilihan age group belum diberikan secara spesifik, catat keputusan yang diambil dan gunakan implementasi sederhana yang paling sesuai untuk prototype.

### 9. Previous lacrosse experience
Jenis: radio group atau select.

Pilihan persis:

- Never played
- Beginner
- Experienced

Wajib diisi.

### 10. Notes (optional)
Jenis: textarea.

Opsional.

Sediakan ruang yang proporsional dan tidak terlalu besar.

## 7.2. Consent checkboxes

Tampilkan dua checkbox dengan teks persis seperti yang diberikan klien.

Checkbox pertama:

"I agree to receive promotional, event and activity communications from Lacrosse Victoria."

Checkbox ini bersifat opsional karena menyangkut persetujuan komunikasi promosi.

Checkbox kedua:

"I agree to Lacrosse Victoria collecting and sharing my details with the selected club for the purpose of responding to my enquiry."

Checkbox ini wajib dicentang sebelum submit karena merupakan persetujuan yang berkaitan dengan pemrosesan enquiry sesuai flow yang disepakati.

Jangan menggabungkan dua consent tersebut menjadi satu checkbox.

Jangan memberikan nilai default checked.

## 7.3. Form UI

Gunakan form yang selaras dengan shared visual style website, tetapi lebih modern dan mudah diisi.

Perhatikan:

- Label harus jelas.
- Required field ditandai secara konsisten.
- Gunakan input yang mudah dibaca.
- Susun field secara logis.
- Berikan inline validation.
- Pertahankan nilai input ketika terjadi kegagalan pengiriman.
- Tampilkan loading state ketika submit sedang diproses.
- Cegah double submission.
- Tampilkan error yang bisa dimengerti pengguna.
- Success state hanya muncul setelah provider menerima permintaan pengiriman secara sukses.
- Jangan menampilkan seluruh data pribadi di URL atau query string.
- Jangan membuat form terlalu panjang secara visual jika layout dua kolom desktop lebih sesuai.
- Pastikan layout satu kolom pada layar sempit.

Semua state ini harus dirancang sebagai bagian dari komponen form, bukan ditambahkan seadanya setelah backend selesai.

---

# PHASE 8 — EMAIL SUNGGUHAN KE GMAIL KLIEN

Bagian ini merupakan salah satu acceptance criteria paling penting.

\*\*Tujuannya bukan hanya membuat tombol Submit terlihat bekerja. Data yang dikirim harus benar-benar mencapai proses pengiriman email dan target penerima harus sesuai.\*\*

## 8.1. Target penerima

Alamat penerima utama:

\`darapuspitanurani@gmail.com\`

Gunakan alamat tersebut sebagai konfigurasi penerima default melalui environment variable, misalnya:

\`REGISTRATION\_TO\_EMAIL=darapuspitanurani@gmail.com\`

Jangan mengizinkan input dari pengunjung untuk mengubah alamat penerima utama.

## 8.2. Arsitektur pengiriman

Gunakan Next.js App Router dan server-side Route Handler atau Server Action yang sesuai.

Pilihan utama layanan email: \*\*Resend\*\*.

Integrasikan SDK layanan email di sisi server, misalnya melalui:

- Next.js Route Handler.
- Server-side input validation.
- Resend SDK.
- Template email HTML.
- Environment variables di development dan Vercel.

Alur:

\`\`\`text
Registration Form
       |
       v
POST /api/registrations
       |
       v
Validate and Normalize Data
       |
       v
Build HTML Email
       |
       v
Resend Email API
       |
       v
Recipient: darapuspitanurani@gmail.com
       |
       v
Handle Success / Failure
\`\`\`

Endpoint adalah contoh struktur, bukan keharusan jika arsitektur lain yang setara lebih tepat. Jangan membuat arsitektur rumit tanpa alasan.

\*\*Penting:\*\* jangan mengirim API key dari browser, jangan menaruh secret pada variabel \`NEXT\_PUBLIC\_\*\`, dan jangan mengirim email hanya menggunakan simulasi state di frontend.

Jika konfigurasi provider memerlukan domain pengirim terverifikasi, API key, atau aktivasi layanan tambahan, identifikasi persyaratan tersebut sejak awal. Jangan menganggap email bisa dikirim ke semua alamat eksternal hanya dengan memasang SDK.

## 8.3. Email yang diterima klien

Email harus berupa HTML email yang rapi, profesional, dan mudah dibaca melalui Gmail di desktop maupun mobile.

Bukan hanya email teks mentah yang menampilkan objek JSON.

Subjek email yang disarankan:

\`New Lacrosse Victoria Club Enquiry — \[Club Name\]\`

Susunan email minimal:

1. Header Lacrosse Victoria yang konsisten dengan identitas visual referensi.
2. Judul yang menjelaskan bahwa sebuah club enquiry baru telah diterima.
3. Nama klub yang dipilih.
4. Program yang dipilih.
5. Identitas pendaftar.
6. Kontak pendaftar.
7. Suburb/postcode.
8. Minat pendaftar.
9. Player age / age group.
10. Previous lacrosse experience.
11. Notes jika ada.
12. Status kedua persetujuan checkbox.
13. Waktu pengajuan jika tersedia dan akurat.

Semua informasi harus berasal dari submission aktual.

Jika email contoh yang dimaksud klien tersedia sebagai screenshot atau asset di dalam workspace, periksa dan cocokkan layout email dengan contoh tersebut.

Jika screenshot tidak tersedia, jangan mengklaim sudah meniru contoh secara persis. Gunakan format di atas sebagai baseline dan dokumentasikan keterbatasannya.

Gunakan HTML email yang kompatibel dengan Gmail. Jangan mengasumsikan stylesheet website biasa akan bekerja identik di dalam email client.

## 8.4. Pengirim dan domain

Tentukan sender menggunakan alamat/domain yang dapat digunakan secara sah oleh layanan email.

Jangan memasukkan alamat Gmail klien sebagai pengirim tanpa otorisasi yang sesuai.

Jangan mengandalkan sender testing/sandbox apabila layanan tersebut hanya mengizinkan pengiriman ke penerima terverifikasi tertentu.

Pastikan API key dan alamat pengirim dikonfigurasi sebagai environment variables.

Contoh:

\`\`\`env
RESEND\_API\_KEY=
REGISTRATION\_TO\_EMAIL=darapuspitanurani@gmail.com
EMAIL\_FROM=
\`\`\`

Jangan commit \`.env.local\` atau kredensial asli.

Sediakan \`.env.example\` tanpa secret, dan dokumentasikan variabel yang harus diisi.

## 8.5. Perilaku saat submit

Ketika pengguna mengirim form:

1. Validasi semua field wajib di client.
2. Validasi kembali data di server.
3. Normalisasi input seperlunya.
4. Susun email berdasarkan data yang telah tervalidasi.
5. Kirim email menggunakan provider.
6. Periksa respons provider.
7. Jika pengiriman diterima dengan sukses, kembalikan success response.
8. Jika terjadi kegagalan, kembalikan error yang dapat ditangani di UI.
9. Pertahankan isi form agar pengunjung tidak perlu mengulang dari awal.
10. Jangan menampilkan API error mentah kepada pengunjung.

Jangan menggunakan alert palsu yang mengklaim email telah terkirim.

Jangan menampilkan success page hanya karena validasi browser lolos.

Jika provider menerima permintaan pengiriman tetapi pengiriman belum terbukti masuk inbox, jelaskan perbedaan status tersebut dalam dokumentasi.

## 8.6. Apakah perlu mengirim email ke pendaftar?

Prioritas utama adalah mengirim detail enquiry ke Gmail klien.

Jangan menambahkan email otomatis kepada pendaftar jika belum diperlukan oleh flow final. Apabila fitur konfirmasi kepada pendaftar ditambahkan, dokumentasikan sebagai keputusan tambahan dan pastikan tidak menghambat email utama ke klien.

Jangan menggunakan input pengunjung untuk mengirimkan notifikasi ke alamat yang tidak diinginkan.

## 8.7. Pengujian nyata

Jangan berhenti setelah endpoint memberikan HTTP 200.

Lakukan pengujian menggunakan alamat penerima yang diizinkan dan konfigurasi yang benar.

Verifikasi:

- API key valid.
- Sender diizinkan.
- Recipient benar.
- Payload email benar.
- Email berisi data yang dikirim.
- HTML email tampil layak.
- Kegagalan pengiriman tidak menghasilkan klaim sukses.
- Tidak ada duplikasi pengiriman karena double-click atau retry yang tidak terkontrol.
- Hasil pengiriman dapat ditelusuri menggunakan provider response/ID jika tersedia.

Catat waktu pengujian, konfigurasi yang digunakan tanpa membocorkan secret, provider response, dan status pengiriman dalam \`docs/email-delivery.md\`.

\*\*Jangan menyatakan fitur email selesai jika hanya diuji menggunakan mock provider atau fake success response.\*\*

Jika memerlukan konfigurasi dari pemilik proyek, tulis secara jelas tindakan apa yang belum dilakukan dan bagaimana menyelesaikannya. Selesaikan implementasi yang dapat dilakukan tanpa menunggu credential tambahan.

---

# PHASE 9 — TECH STACK

Gunakan stack yang sederhana dan sesuai dengan kebutuhan prototype.

### Framework

- Next.js versi stable terbaru yang kompatibel pada waktu pengerjaan.
- React yang kompatibel dengan versi Next.js tersebut.
- TypeScript.

Sebelum instalasi, verifikasi release stable terbaru melalui sumber resmi. Jangan menggunakan canary, nightly, atau experimental release sebagai default.

### Deployment

- Vercel.
- Next.js App Router jika sesuai dengan struktur project.

### Styling

- Tailwind CSS versi yang kompatibel dengan framework.
- CSS khusus bila diperlukan untuk mempertahankan tampilan referensi.

Jangan memaksakan seluruh desain menggunakan utility classes jika CSS biasa memberikan kontrol visual yang lebih akurat.

### Map

- Leaflet.
- React Leaflet apabila diperlukan.
- OpenStreetMap atau tile provider gratis yang sesuai ketentuannya.

### Email

- Resend.
- Server-side API.
- HTML email template.
- React Email boleh digunakan jika membantu menghasilkan email yang kompatibel.

### Data

Untuk mockup ini, dataset klub statis yang terverifikasi dapat disimpan dalam TypeScript/JSON. Tidak perlu database eksternal jika tidak memberikan manfaat nyata.

### Komponen

Gunakan komponen reusable untuk kebutuhan seperti:

- Header dan navigation.
- Dropdown menu.
- Club list.
- Club detail.
- Map.
- Registration form.
- Consent checkbox.
- Loading, error, dan success state.

Jangan membangun design system besar yang tidak diperlukan.

Jika repository sudah menggunakan stack yang cocok, pertahankan dependency dan konfigurasi yang masih relevan.

---

# PHASE 10 — TASK BREAKDOWN DAN IMPLEMENTATION PLAN

Setiap task harus disusun dalam file Markdown tersendiri.

Jangan membuat satu task besar bernama "Buat Website".

Setiap task harus menyertakan:

\`\`\`text
Task ID:
Task Title:
Priority:
Status:
Phase:
Objective:
Requirements:
Files Affected:
Dependencies:
Implementation Steps:
Acceptance Criteria:
Verification Method:
Result:
Issues / Blockers:
\`\`\`

Gunakan status yang jelas, misalnya \`NOT\_STARTED\`, \`IN\_PROGRESS\`, \`BLOCKED\`, dan \`DONE\`.

Status hanya boleh menjadi \`DONE\` setelah hasil yang relevan telah diverifikasi.

## Urutan task minimum

### TASK 01 — Reference Audit

Wajib dilakukan sebelum task coding utama.

Output: reference audit, screenshot, analisis menu, desain, data klub.

### TASK 02 — PRD and Planning

Menyelesaikan PRD, batasan scope, task list, user journey, dan keputusan teknis.

Output: dokumentasi yang konsisten serta dependency antar-task.

### TASK 03 — Email Delivery Foundation

Verifikasi kelayakan pengiriman email ke target Gmail dan implementasikan server-side email delivery beserta template.

Tujuannya adalah mendeteksi hambatan API key, sender domain, dan konfigurasi lebih awal, bukan menunggu seluruh UI selesai.

### TASK 04 — Club Data and Map

Siapkan dataset klub yang sudah diverifikasi, koordinat, marker, serta interaksi sinkron dengan daftar klub.

### TASK 05 — Original Website Shell

Implementasikan header, logo, navigasi, dropdown, menu items, dan footer mengikuti hasil audit.

### TASK 06 — Find a Club Interface

Bangun layout Find a Club yang direvamp, termasuk list/search/filter yang relevan, peta, selected state, detail klub, dan entry point form.

### TASK 07 — Registration Form

Implementasikan seluruh field, opsi, consent, validasi, loading state, error handling, dan integrasi endpoint email.

### TASK 08 — Final Verification and Deployment

Verifikasi visual, journey pengguna, pengiriman email, dan hasil deployment Vercel.

Setiap task boleh memiliki subtask apabila memang diperlukan. Jangan membuat ratusan task kecil tanpa manfaat.

## Dependency antar-task

- Audit harus selesai sebelum spesifikasi visual final.
- PRD harus selesai sebelum implementasi utama.
- Email foundation harus diuji sebelum integrasi final dengan form.
- Dataset klub yang valid harus tersedia sebelum marker final.
- Shared shell dan Find a Club harus konsisten dengan hasil audit.
- Submission dan email harus diintegrasikan sebelum menyelesaikan success state.
- Deployment perlu diverifikasi dengan environment variables yang sesuai.

Sesuaikan dependency jika menemukan kendala teknis yang nyata, dan catat alasannya.

---

# PHASE 11 — AGENTS.MD SEBAGAI PROJECT MEMORY

\`AGENTS.md\` bukan sekadar file instruksi awal yang dibuat sekali dan kemudian dilupakan.

Setiap kali sebuah task selesai, lakukan pembaruan pada file ini.

Catat:

- Apa yang telah diselesaikan.
- Perubahan penting pada UI.
- Komponen atau route yang ditambahkan atau diubah.
- File penting yang disentuh.
- Keputusan teknis yang diambil.
- Perubahan terhadap requirement.
- Bug yang ditemukan.
- Bug yang diperbaiki.
- Issue yang belum selesai.
- Status email dan konfigurasi deployment.
- Task berikutnya.
- Batas scope yang harus dipatuhi oleh agent selanjutnya.

Untuk perubahan kecil, gunakan catatan perubahan yang ringkas. Jangan menghapus aturan lama yang masih relevan hanya untuk mempersingkat file.

\`docs/PROJECT\_LOG.md\` harus mencatat timeline dan status implementasi yang lebih terstruktur.

\*\*Setelah context compaction, pergantian session, atau ketika agent melanjutkan pekerjaan, baca kembali \`AGENTS.md\`, \`docs/PROJECT\_LOG.md\`, \`docs/NEXT-ACTIONS.md\`, dan task yang sedang dikerjakan.\*\*

Jangan mengasumsikan pekerjaan sebelumnya selesai hanya berdasarkan riwayat percakapan.

Jika ada ketidaksesuaian antara dokumentasi dan kode, periksa kondisi aktual, lalu rekonsiliasi dokumentasi tanpa menutupi pekerjaan yang belum selesai.

---

# PHASE 12 — RESPONSIVE BEHAVIOR

Prototype harus tampil baik pada desktop dan mobile.

## Desktop

- Header dan menu mengikuti referensi.
- Dropdown memiliki posisi dan lebar yang wajar.
- Find a Club memanfaatkan ruang dengan proporsi yang seimbang.
- Peta mudah dibaca dan tidak terlalu kecil.
- Detail klub dan form terintegrasi dengan alur yang logis.
- Tidak ada alignment atau spacing yang terlihat rusak.

## Mobile

- Navigasi tetap mudah diakses tanpa merusak identitas visual.
- Peta tidak menyebabkan horizontal overflow.
- List klub dan detail tidak saling menumpuk.
- Form mudah digunakan dengan keyboard mobile.
- Semua input dapat dijangkau dan diisi.
- Modal tidak keluar dari viewport.
- Tidak ada tombol penting yang tertutup.
- Loading, error, dan success state tetap terbaca.

Periksa setidaknya satu viewport desktop, satu tablet, dan satu mobile.

Jangan membuat desain mobile yang secara visual menyimpang tanpa alasan dari karakter website asli.

---

# PHASE 13 — VERIFIKASI MINIMAL YANG WAJIB

Fokus pengujian hanya pada hal yang diperlukan agar prototype bisa dipresentasikan dengan percaya diri.

Tidak perlu membuat rangkaian dokumen QA enterprise yang besar.

Namun, jangan mengabaikan pengujian fitur inti.

## Visual

- Logo dan header konsisten dengan referensi.
- Semua menu dan submenu yang telah diaudit tersedia.
- Bahasa yang tampil hanya English.
- Tidak ada halaman fungsional di luar Find a Club.
- Halaman Find a Club telah direvamp.
- Layout desktop dan mobile layak.
- Tidak ada broken image atau tampilan overflow.

## Journey

- Pengunjung dapat membuka Find a Club.
- Pencarian klub bekerja.
- Pilihan klub dapat disinkronkan dengan map.
- Marker mewakili lokasi valid.
- Pemilihan klub meneruskan nilai ke form.
- Form memvalidasi field wajib.
- Consent ditangani sesuai spesifikasi.
- Submission berhasil diproses.
- Error tidak menghapus seluruh input.
- Success state tidak muncul jika provider gagal menerima permintaan.

## Email

- Penerima utama menggunakan \`darapuspitanurani@gmail.com\`.
- Seluruh field dikirim dengan benar.
- Format email rapi di Gmail.
- Tidak ada secret yang bocor di browser atau repository.
- Pengiriman aktual telah diuji atau status blocker konfigurasi dinyatakan secara jujur.
- Tidak ada klaim bahwa Gmail telah menerima email tanpa bukti yang memadai.

## Build dan deployment

- Build production berhasil.
- Tidak ada error runtime yang menghalangi flow utama.
- Environment variables terdokumentasi.
- Deployment Vercel berhasil atau hambatan yang nyata didokumentasikan.
- Alur Find a Club diuji kembali di deployment, bukan hanya localhost.

Buat dokumentasi ringkas hasil verifikasi di task terkait dan \`docs/PROJECT\_LOG.md\`.

---

# PHASE 14 — KETENTUAN DEPLOYMENT VERCEL

Pastikan project siap di-deploy ke Vercel.

Sebelum deployment:

1. Pastikan Next.js dan dependency kompatibel.
2. Pastikan perintah build berhasil.
3. Pastikan API email berjalan di runtime yang kompatibel dengan provider.
4. Pastikan semua environment variables telah didokumentasikan.
5. Jangan memasukkan API key ke Git.
6. Pastikan route utama berfungsi pada URL production atau preview.
7. Uji form dari deployment menggunakan data uji.
8. Periksa status response email provider.
9. Pastikan UI tidak bergantung pada konfigurasi localhost.
10. Catat URL deployment yang benar-benar tersedia.

Jika akses Vercel belum tersedia, siapkan project agar dapat di-deploy, lalu catat tindakan yang masih memerlukan pemilik akun.

Jangan mengklaim deployment selesai jika belum berhasil dilakukan.

---

# PHASE 15 — ACCEPTANCE CRITERIA FINAL

Project hanya dapat dinyatakan selesai apabila seluruh kriteria inti berikut terpenuhi.

### A. Design

- \[ \] Website asli sudah diaudit secara langsung.
- \[ \] Bukti audit dan hasil pengamatan tersedia.
- \[ \] Header, logo, navigasi, dan elemen bersama mendekati website referensi.
- \[ \] Semua item menu dan submenu yang ditemukan tersedia.
- \[ \] Hanya Find a Club yang memiliki alur fungsional.
- \[ \] Identitas visual Lacrosse Victoria tetap dipertahankan.
- \[ \] Find a Club telah dimodernisasi tanpa menyimpang dari branding.
- \[ \] Tidak ada pilihan bahasa Indonesia.
- \[ \] Tidak ada menu atau tombol palsu yang terlihat seolah-olah menawarkan fitur operasional lain.

### B. Club discovery

- \[ \] Dataset klub berasal dari sumber yang diverifikasi.
- \[ \] Alamat dan koordinat tidak dibuat-buat.
- \[ \] Map dapat digunakan.
- \[ \] Marker dan daftar klub saling sinkron.
- \[ \] Pengguna dapat memilih klub.
- \[ \] Pilihan klub masuk secara otomatis ke form utama.

### C. Registration

- \[ \] Seluruh field dari klien tersedia.
- \[ \] Seluruh pilihan Program dan Previous lacrosse experience sesuai instruksi.
- \[ \] Kedua consent checkbox terpisah.
- \[ \] Validasi client dan server bekerja.
- \[ \] Ada loading state.
- \[ \] Ada error state.
- \[ \] Ada success state yang mengikuti hasil proses pengiriman.
- \[ \] Tidak ada tombol Register Interest yang tersebar di setiap club card.
- \[ \] Tidak ada data form yang sengaja dibuang ketika terjadi kegagalan pengiriman.

### D. Email

- \[ \] Backend pengiriman email terintegrasi dengan provider nyata.
- \[ \] Recipient utama dikonfigurasi ke \`darapuspitanurani@gmail.com\`.
- \[ \] HTML email berisi informasi form yang benar.
- \[ \] API key tidak terekspos.
- \[ \] Pengiriman aktual telah diuji.
- \[ \] Bukti atau hasil provider dicatat.
- \[ \] Tidak ada fake success.
- \[ \] Jika ada konfigurasi yang belum tersedia, statusnya dinyatakan secara eksplisit, bukan ditutupi.

### E. Project management

- \[ \] \`AGENTS.md\` berisi batasan proyek dan riwayat perubahan.
- \[ \] PRD dan planning telah dibuat.
- \[ \] Setiap task memiliki status yang sesuai kenyataan.
- \[ \] Project log diperbarui.
- \[ \] Next actions mencerminkan pekerjaan tersisa.
- \[ \] Build telah diverifikasi.
- \[ \] Deployment telah diverifikasi atau hambatannya dijelaskan.

---

# PHASE 16 — ATURAN KERJA AGENT

Ikuti aturan ini sepanjang proyek.

1. Jangan coding sebelum audit, PRD, dan plan selesai.
2. Jangan mengarang hasil inspeksi atau mengklaim sesuatu telah diuji tanpa benar-benar mengujinya.
3. Jangan menambah fitur di luar scope hanya untuk membuat prototype tampak lebih besar.
4. Jangan membangun halaman lain agar menu terlihat fungsional.
5. Jangan mengubah identitas visual website asli berdasarkan selera pribadi.
6. Jangan mengganti library atau framework tanpa alasan teknis.
7. Jangan menyimpan secret di source code.
8. Jangan menggunakan dummy response pada flow email final.
9. Jangan menandai task selesai ketika acceptance criteria belum terpenuhi.
10. Jangan menghilangkan kebutuhan klien dari dokumentasi.
11. Jangan membiarkan \`AGENTS.md\` dan \`PROJECT\_LOG.md\` kedaluwarsa setelah perubahan kode.
12. Jangan membuat klaim email terkirim hanya berdasarkan tampilan success message.
13. Jika menemukan ketidakjelasan kecil, ambil keputusan paling aman berdasarkan scope dan dokumentasikan.
14. Jika ada informasi yang benar-benar belum tersedia, tandai sebagai belum terkonfirmasi. Kerjakan bagian lain yang tidak bergantung pada informasi tersebut.
15. Setelah implementasi selesai, selalu bandingkan hasil UI dengan referensi asli.

Utamakan hasil yang benar, bukan sekadar cepat menghasilkan banyak file.

---

# PHASE 17 — FORMAT LAPORAN SETELAH SETIAP TASK

Setelah setiap task selesai, rangkum hasilnya dengan format berikut dan simpan pembaruan terkait pada dokumentasi.

\`\`\`text
TASK ID:
TASK NAME:
STATUS:

1. HASIL
- Ringkasan perubahan yang benar-benar selesai.

2. FILE BERUBAH
- Daftar file yang ditambah, diubah, atau dihapus.
- Alasan perubahan.

3. VISUAL / FUNCTIONAL RESULT
- Bagian yang telah diverifikasi.

4. VERIFICATION
- Command, build, manual test, atau provider result yang digunakan.
- Status aktual.

5. ISSUES
- Bug, blocker, atau hal yang belum terkonfirmasi.

6. PROJECT MEMORY
- Pembaruan AGENTS.md.
- Pembaruan PROJECT\_LOG.md.

7. NEXT ACTIONS
- Task berikutnya yang logis dan belum selesai.
\`\`\`

Jangan menuliskan hasil pengujian yang tidak pernah dilakukan.

---

# PERINTAH EKSEKUSI PERTAMA

Mulai dari PHASE 0 dan PHASE 1 sekarang.

Lakukan inspeksi repository dan buka website Lacrosse Victoria secara langsung. Audit tampilan halaman utama, seluruh navigation menu, serta halaman Find a Club. Ambil bukti visual yang memungkinkan dan verifikasi daftar klub beserta lokasinya.

Setelah itu, buat \`AGENTS.md\`, dokumentasi hasil audit, PRD, dan task plan yang benar-benar sesuai dengan temuan aktual.

Jangan melakukan implementasi UI utama sebelum tahapan dokumentasi tersebut selesai.

Setelah planning selesai, lanjutkan task implementasi secara berurutan. Uji kemampuan email lebih awal agar kebutuhan pengiriman ke Gmail tidak baru diketahui bermasalah pada akhir proyek.

\*\*Prioritas yang tidak boleh ditukar:\*\*
1. Akurasi reverse engineering terhadap website asli.
2. Visual fidelity shared website shell dan navigasi.
3. Find a Club yang lebih modern dengan lokasi klub yang benar.
4. Form registrasi lengkap.
5. Pengiriman email sungguhan ke Gmail klien.
6. Verifikasi dan deployment prototype.
7. Dokumentasi perubahan yang akurat.

Jangan memperluas scope. Jangan menciptakan fitur yang tidak diminta. Jangan mengorbankan kesamaan visual demi desain generik. Pastikan setiap keputusan memiliki dasar dan setiap status sesuai dengan kondisi nyata project.

Mulai kerjakan secara sistematis sekarang.