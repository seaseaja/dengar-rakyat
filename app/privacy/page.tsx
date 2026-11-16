/**
 * Informasi privasi berdasarkan fitur yang saat ini tersedia.
 */

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Pengumpulan Data</h2>
        <p>Kami mengumpulkan data pribadi berikut:</p>
        <ul className="list-disc ml-6">
          <li>NIK (terenkripsi)</li>
          <li>Nama lengkap</li>
          <li>Email</li>
          <li>Alamat (terenkripsi)</li>
          <li>Wilayah</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">2. Penggunaan Data</h2>
        <p>Data Anda digunakan untuk:</p>
        <ul className="list-disc ml-6">
          <li>Autentikasi dan otorisasi</li>
          <li>Pemrosesan laporan</li>
          <li>Komunikasi terkait laporan</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. Keamanan Data</h2>
        <p>Kami menggunakan:</p>
        <ul className="list-disc ml-6">
          <li>Enkripsi AES-256-GCM untuk NIK dan alamat</li>
          <li>Argon2id hashing untuk password</li>
          <li>HTTPS untuk transmisi data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Akses dan pengelolaan data</h2>
        <ul className="list-disc ml-6">
          <li>Anda dapat meminta salinan data akun melalui endpoint ekspor; ekspor saat ini belum mencakup seluruh laporan dan komentar.</li>
          <li>Anda dapat memperbarui nama dan alamat melalui halaman profil.</li>
          <li>Permintaan penghapusan akun/data belum tersedia otomatis; hubungi pengelola untuk proses manual.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">5. Kontak</h2>
        <p>Pertanyaan privasi: privacy@dengarrakyat.id</p>
      </section>
    </div>
  );
}
