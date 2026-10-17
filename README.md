# Undangan Digital Syukuran Permandian — Hereun & Michelete

Website undangan digital *mobile-first* untuk acara **Syukuran Permandian** kedua putri terkasih:
- **Hereun Sintikhe Balubun** (*Keluarga Besar Balubun-Kwando*)
- **Michelete Miska Noya** (*Keluarga Besar Noya-Ngabalin*)

## Jadwal & Lokasi Acara
- **Hari / Tanggal**: Minggu, 18 Oktober 2026
- **Waktu**: Pukul 13:00 (Jam 1 Siang) – Selesai
- **Tempat**: Kediaman Bapak Dr. Daniel Balubun - Tisay, Belakang POM
- **Google Maps**: [https://maps.app.goo.gl/f7eLwaeYmprcdi9L9?g_st=aw](https://maps.app.goo.gl/f7eLwaeYmprcdi9L9?g_st=aw)

## Kutipan Ayat Alkitab
- **Markus 10:14**: *"Biarkan anak-anak itu datang kepada-Ku, jangan menghalang-halangi mereka, sebab orang-orang yang seperti itulah yang empunya Kerajaan Allah."*
- **Mazmur 23:1**: *"Tuhan adalah Gembalaku, takkan kekurangan aku"*

## Struktur File (Siap Hosting di GitHub Pages Gratis)
- `index.html` — Halaman utama undangan digital (dilengkapi *Cover Gate*, *Twin Arch Hero*, Hitung Mundur, Kutipan Ayat Alkitab Markus 10:14 & Mazmur 23:1, Profil Putri Terkasih, Jadwal & Peta, Galeri Filterable, dan *Touch-Swipe Lightbox*).
- `styles.css` — Desain editorial anggun (*Sacred Ivory, Warm Champagne Gold & Soft Blush*) dengan optimasi layar smartphone (`100dvh`, `viewport-fit=cover`, `safe-area-inset-bottom`).
- `script.js` — Animasi kanvas HTML5 (kelopak bunga, bintang berkilau, efek sentuhan), filter galeri, *swipe lightbox*, serta pemutar musik latar `Piano.mp3`.
- `Piano.mp3` — Musik latar instrumental piano yang otomatis berputar saat tombol **Buka Undangan** ditekan.
- `img/` — Koleksi foto asli beresolusi tinggi (tanpa kompresi) dari folder `Hereun` dan `Michelete`.
- `.nojekyll` — Memastikan GitHub Pages menyajikan seluruh file statis secara langsung tanpa pemrosesan Jekyll.

## Cara Hosting Gratis di GitHub Pages
1. Buat repositori baru (Public) di GitHub, misalnya `undangan-permandian`.
2. Unggah file `index.html`, `styles.css`, `script.js`, `Piano.mp3`, `.nojekyll`, dan folder `img/` ke repositori tersebut.
3. Buka menu **Settings** > **Pages** pada repositori GitHub Anda.
4. Pada bagian **Build and deployment** > **Branch**, pilih `main` (atau `master`) dan folder `/ (root)`, lalu klik **Save**.
5. Dalam 1–2 menit, website undangan dapat diakses pada tautan `https://<username-github-anda>.github.io/undangan-permandian/`.
