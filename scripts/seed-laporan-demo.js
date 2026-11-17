const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd());

const demoLaporan = [
  {
    judul: "Jalan Berlubang di Perumahan Sederhana",
    kategori: "Infrastruktur",
    deskripsi: "Ada lubang besar di jalan masuk perumahan, berbahaya untuk kendaraan terutama malam hari.",
    status: "Diterima"
  },
  {
    judul: "Lampu Jalan Mati di Gang 5",
    kategori: "Infrastruktur",
    deskripsi: "Lampu jalan di gang 5 sudah mati 3 hari, warga takut berjalan malam hari.",
    status: "Diverifikasi"
  },
  {
    judul: "Sampah Menumpuk di TPS",
    kategori: "Lingkungan",
    deskripsi: "Sampah di TPS sudah 5 hari tidak diangkut, bau menyengat dan mengganggu warga sekitar.",
    status: "Diproses"
  },
  {
    judul: "Pelayanan Puskesmas Lambat",
    kategori: "Pelayanan",
    deskripsi: "Antrian di puskesmas sangat panjang, pelayanan lambat, perlu penambahan tenaga medis.",
    status: "Selesai"
  },
  {
    judul: "Banjir Ringan saat Hujan Deras",
    kategori: "Lingkungan",
    deskripsi: "Saluran air tersumbat sampah plastik, menyebabkan genangan air saat hujan deras.",
    status: "Diverifikasi"
  },
  {
    judul: "Fasilitas Olahraga Rusak",
    kategori: "Infrastruktur",
    deskripsi: "Peralatan olahraga di lapangan umum rusak, perlu perbaikan atau penggantian.",
    status: "Diterima"
  },
  {
    judul: "Keamanan Malam Hari di Kompleks",
    kategori: "Keamanan",
    deskripsi: "Penerangan kurang dan tidak ada patroli keamanan, beberapa kasus pencurian terjadi.",
    status: "Diproses"
  },
  {
    judul: "Air PDAM Keruh",
    kategori: "Kesehatan",
    deskripsi: "Air PDAM yang keluar keruh dan berbau, dikhawatirkan tidak layak konsumsi.",
    status: "Diverifikasi"
  },
  {
    judul: "Fasilitas Umum Tidak Aksesibel",
    kategori: "Pelayanan",
    deskripsi: "Tempat ibadah dan kantor kelurahan tidak memiliki akses untuk disabilitas.",
    status: "Selesai"
  },
  {
    judul: "Kebisingan dari Pabrik",
    kategori: "Lingkungan",
    deskripsi: "Suara mesin pabrik terlalu bising, mengganggu istirahat warga terutama malam hari.",
    status: "Diterima"
  }
];

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL belum diatur di .env.local");
  
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    // Cari user warga untuk dijadikan sebagai pelapor
    const [users] = await connection.execute(
      "SELECT id FROM users WHERE role = 'warga' LIMIT 2"
    );
    
    if (users.length === 0) {
      console.error("Tidak ada user warga ditemukan. Jalankan seed-demo-users.js terlebih dahulu.");
      return;
    }
    
    // Cari wilayah kecamatan Koja
    const [wilayah] = await connection.execute(
      "SELECT id FROM wilayah WHERE nama = 'Koja' AND tipe = 'kecamatan' LIMIT 1"
    );
    
    if (wilayah.length === 0) {
      console.error("Wilayah Koja tidak ditemukan. Jalankan seed-wilayah.ts terlebih dahulu.");
      return;
    }
    
    const wilayahId = wilayah[0].id;
    const wargaIds = users.map(u => u.id);
    
    await connection.beginTransaction();
    
    let inserted = 0;
    for (let i = 0; i < demoLaporan.length; i++) {
      const laporan = demoLaporan[i];
      const userId = wargaIds[i % wargaIds.length];
      
      // Hitung tanggal created_at yang berbeda-beda (30 hari terakhir)
      const daysAgo = 30 - Math.floor(i * 3);
      const created_at = new Date();
      created_at.setDate(created_at.getDate() - daysAgo);
      
      await connection.execute(
        `INSERT INTO laporan (
          user_id, judul, deskripsi, kategori, status, wilayah_id,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          laporan.judul,
          laporan.deskripsi,
          laporan.kategori,
          laporan.status,
          wilayahId,
          created_at,
          created_at
        ]
      );
      
      inserted++;
      
      // Juga tambahkan ke status_history
      await connection.execute(
        `INSERT INTO status_history (laporan_id, status, changed_by, created_at)
         VALUES (LAST_INSERT_ID(), ?, ?, ?)`,
        [laporan.status, userId, created_at]
      );
    }
    
    await connection.commit();
    
    console.log(`✅ ${inserted} data laporan demo berhasil dibuat`);
    console.log(`📍 Wilayah: Koja (ID: ${wilayahId})`);
    console.log(`👤 Pelapor: ${wargaIds.length} user warga`);
    console.log(`📊 Status: Diterima (${demoLaporan.filter(l => l.status === 'Diterima').length}) | Diverifikasi (${demoLaporan.filter(l => l.status === 'Diverifikasi').length}) | Diproses (${demoLaporan.filter(l => l.status === 'Diproses').length}) | Selesai (${demoLaporan.filter(l => l.status === 'Selesai').length})`);
    
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("❌ Seed laporan demo gagal:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});