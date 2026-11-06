/**
 * Terms of Service Page - Iterasi 3 P6
 */

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Syarat & Ketentuan</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Penerimaan Syarat</h2>
        <p>Dengan menggunakan Dengar Rakyat, Anda menyetujui syarat dan ketentuan ini.</p>

        <h2 className="text-2xl font-semibold mt-6">2. Penggunaan Platform</h2>
        <p>Anda setuju untuk:</p>
        <ul className="list-disc ml-6">
          <li>Memberikan informasi akurat</li>
          <li>Tidak menyalahgunakan platform</li>
          <li>Menjaga kerahasiaan akun</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. Larangan</h2>
        <p>Dilarang:</p>
        <ul className="list-disc ml-6">
          <li>Spam atau abuse</li>
          <li>Laporan palsu</li>
          <li>Akses tidak sah</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Penghentian</h2>
        <p>Kami berhak menangguhkan akun yang melanggar ketentuan.</p>
      </section>
    </div>
  );
}
