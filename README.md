# Dengar Rakyat

Platform pengaduan warga berbasis Next.js dan MySQL. Status ini mencatat pemeriksaan Iterasi 4 per 17 November 2026; aplikasi **belum dinyatakan siap produksi**.

## Menjalankan lokal

1. Gunakan Node.js versi yang didukung Next.js 16 dan MySQL 8.
2. Buat database `dengar_rakyat`, impor `db/dengar_rakyat.sql`, lalu jalankan migrasi `db/migrations/004_iteration_4.sql` sampai `007_audit_payload_hashes.sql` satu kali dan berurutan.
3. Isi `.env.local`:

   ```env
   DATABASE_URL=mysql://user:password@127.0.0.1:3306/dengar_rakyat
   ENCRYPTION_KEY=<64-digit-hex>
   HMAC_KEY=<64-digit-hex>
   CSRF_SECRET=<random-secret-minimum-32-characters>
   TRUST_PROXY_HEADERS=false
   ```

   Buat dua key hex independen masing-masing 32 byte. Jangan pakai akun MySQL `root` di deployment.
4. Impor master wilayah resmi sebelum registrasi atau membuat akun demo: `npx tsx scripts/seed-wilayah.ts` hanya cocok untuk data seed pengembangan yang disediakan script.
5. Jalankan `npm install`, `npm run dev`, lalu buka `http://localhost:3000`.

Seed akun untuk mencoba semua role di database lokal:

```powershell
node scripts/seed-demo-users.js
```

| Role | Email | Password | Wilayah |
|---|---|---|---|
| Admin Pusat | `pusat@dengarrakyat.id` | `pusat123` | Nasional |
| Admin Pemda | `pemda.jakut@dengarrakyat.id` | `pemda123` | Jakarta Utara |
| Petugas Pos | `pos.koja@dengarrakyat.id` | `pos123` | Kecamatan Koja |
| Warga | `budi@example.com` | `warga123` | Kecamatan Koja |
| Warga | `siti@example.com` | `warga123` | Kecamatan Koja |

Akun ini hanya untuk pengembangan lokal. Script aman dijalankan ulang: hanya akun demo pada daftar tersebut yang diperbaiki, dan ia menolak database selain `dengar_rakyat` di localhost.

Di deployment belakang reverse proxy, set `TRUST_PROXY_HEADERS=true` hanya jika proxy membuang header forwarding dari klien dan menulis nilainya sendiri. Rate limiter masih berada di memori proses dan tidak cukup untuk beberapa instance.

## Alur dan cakupan

- Warga membuat laporan dan melihat laporan sendiri; laporan masuk ke wilayah akun warga. Berbagi ke feed bersifat opt-in dan bisa dicabut.
- Petugas Pos dan Admin Pemda melihat/mengelola laporan dalam pohon wilayah yang menjadi cakupannya. Admin Pusat memiliki cakupan nasional.
- Perubahan status dicatat dalam histori. Perubahan status dan histori memakai transaksi.
- Foto disimpan di `storage/laporan` dan disajikan melalui endpoint dengan pemeriksaan autentikasi/cakupan.
- Feed warga menampilkan laporan yang dibagikan, komentar, dan tidak menampilkan NIK, email, koordinat, atau foto privat.

## Verifikasi yang tersedia

- `npx tsc --noEmit`
- `npm run lint`
- `npm audit --offline` hanya memakai cache lokal; lakukan audit registry terbaru sebelum rilis.
- `npm run build` untuk build produksi. Pastikan proses dev tidak menggunakan direktori build yang sama; dukungan build terisolasi tersedia melalui `NEXT_DIST_DIR=.next-audit`.

Lihat [LAPORAN_ITERASI_4_DAST_PENTEST.md](./LAPORAN_ITERASI_4_DAST_PENTEST.md) untuk temuan, batas verifikasi, dan daftar retest. Pemeriksaan kode, lint, atau typecheck bukan bukti keamanan; jalankan pengujian fungsional, otorisasi lintas akun/wilayah, DAST, dan uji pemulihan sebelum rilis.

## Batas keamanan yang diketahui

- Reset password belum mengirim email/token karena mailer belum dikonfigurasi; jangan menganggap alur lupa password siap digunakan.
- Rate limit per proses dapat diakali dengan beberapa instance/restart; gunakan store bersama dan limit di ingress.
- ID sesi mentah tersimpan di tabel sesi; migrasikan ke hash sesi sebelum menghadapi risiko kebocoran database.
- Verifikasi hash audit baru mencakup payload untuk versi 2. Baris versi 1 belum dapat diverifikasi penuh; hash chain di database bukan anchor eksternal terhadap DBA berhak tinggi.
- Kegagalan penulisan audit dicatat tetapi tidak menghentikan aksi aplikasi; alert operasional belum dijamin.
- CSP masih mengizinkan inline script/style; siapkan nonce/hash yang kompatibel dengan Next sebelum mengencangkannya.
- TLS, rotasi dan backup key, DB least privilege, retensi/penghapusan data, pemantauan, serta pemulihan backup harus dikonfigurasi dan diuji per deployment.
- `eslint-config-next` yang terkunci masih versi 15 sementara Next versi 16. Lint berjalan dengan rule Next core-web-vitals; rule TypeScript khusus Next tidak aktif sampai versi dependensi diselaraskan.

## Data pribadi

Kebijakan privasi aplikasi perlu disesuaikan dengan proses operasional sebenarnya. Endpoint ekspor saat ini bukan ekspor lengkap semua laporan/komentar; permintaan penghapusan belum diimplementasikan. Jangan tampilkan klaim hak/proses yang belum tersedia sebagai fitur aktif.
