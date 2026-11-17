const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL tidak ditemukan di .env.local");
    console.log("DATABASE_URL yang dikonfigurasi:", process.env.DATABASE_URL);
    return;
  }

  console.log("🔗 Menguji koneksi database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("✅ Koneksi database berhasil");
    
    // Cek tables
    const [tables] = await connection.execute("SHOW TABLES");
    console.log(`\n📊 Tabel yang tersedia (${tables.length}):`);
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });
    
    // Cek jumlah data
    console.log("\n📈 Jumlah data per tabel:");
    
    const tableChecks = [
      "SELECT COUNT(*) as count FROM users",
      "SELECT COUNT(*) as count FROM wilayah",
      "SELECT COUNT(*) as count FROM laporan",
      "SELECT COUNT(*) as count FROM sessions",
      "SELECT COUNT(*) as count FROM audit_logs"
    ];
    
    for (const query of tableChecks) {
      try {
        const [result] = await connection.execute(query);
        const tableName = query.match(/FROM (\w+)/)[1];
        const count = result[0]?.count || 0;
        console.log(`  - ${tableName}: ${count} records`);
      } catch (err) {
        // Table mungkin tidak ada
      }
    }
    
    // Cek beberapa user
    console.log("\n👤 Contoh data users:");
    const [users] = await connection.execute("SELECT id, email, role, nama FROM users LIMIT 5");
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.role}) - ${user.nama}`);
    });
    
    // Cek beberapa laporan
    console.log("\n📝 Contoh data laporan:");
    const [laporans] = await connection.execute("SELECT id, judul, kategori, status, created_at FROM laporan LIMIT 5");
    laporans.forEach(laporan => {
      console.log(`  - #${laporan.id}: ${laporan.judul} (${laporan.status})`);
    });
    
    // Cek sessions aktif
    console.log("\n🔐 Sessions aktif:");
    const [sessions] = await connection.execute(
      "SELECT id, user_id, expires_at, created_at FROM sessions WHERE expires_at > NOW()"
    );
    console.log(`  - ${sessions.length} session aktif`);
    
    await connection.end();
    console.log("\n✅ Check database selesai");
    
  } catch (error) {
    console.error("❌ Error koneksi database:", error.message);
    console.error("Pastikan:");
    console.error("1. Laragon MySQL berjalan");
    console.error("2. Database 'dengar_rakyat' sudah dibuat");
    console.error("3. Port 3306 terbuka");
    console.error("4. User root bisa akses tanpa password");
  }
}

main().catch(console.error);