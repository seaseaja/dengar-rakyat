/**
 * Iterasi 2 - H1: Data Migration Script
 * Migrasi user dummy dari plaintext ke Argon2id hash + AES-256-GCM encryption
 * 
 * CATATAN: Password dummy TETAP SAMA untuk testing, cuma disimpan dengan cara aman
 */

import fs from "fs";
import path from "path";
import argon2 from "argon2";

/**
 * Load .env.local secara manual (karena Next.js env loader tidak jalan di script Node)
 */
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local tidak ditemukan!");
    return;
  }
  
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

/**
 * Mapping password dummy untuk 5 user test
 * Password ini TIDAK akan berubah, cuma cara penyimpanannya yang aman
 */
const DUMMY_PASSWORDS: { email: string; password: string }[] = [
  { email: "pusat@dengarrakyat.id", password: "pusat123" },
  { email: "pemda.jakut@dengarrakyat.id", password: "pemda123" },
  { email: "pos.koja@dengarrakyat.id", password: "pos12345" },
  { email: "budi@example.com", password: "budi1234" },
  { email: "siti@example.com", password: "siti1234" },
];

async function main() {
  console.log("🔄 Memulai migrasi data user ke format hardened...\n");
  
  // Load environment variables
  loadEnvLocal();
  
  // Dynamic import setelah env loaded
  const { query } = await import("../lib/db");
  const { encrypt, hmacHash } = await import("../lib/crypto");
  
  // Ambil semua user yang belum di-migrate (nik_hash NULL)
  const result = await query(
    "SELECT id, email, nik, alamat FROM users WHERE nik_hash IS NULL"
  );
  
  if (!result || !result.rows || result.rows.length === 0) {
    console.log("✅ Semua user sudah ter-migrate. Tidak ada yang perlu diubah.");
    process.exit(0);
  }
  
  console.log(`📋 Ditemukan ${result.rows.length} user yang perlu di-migrate:\n`);
  
  for (const row of result.rows as { id: number; email: string; nik: string; alamat: string }[]) {
    // Cari password dummy, fallback ke password default
    const dummy = DUMMY_PASSWORDS.find((d) => d.email === row.email);
    const plainPassword = dummy?.password ?? "GantiSegera123!";
    
    // Hash password dengan Argon2id
    const passwordHash = await argon2.hash(plainPassword, {
      type: argon2.argon2id,
      memoryCost: 19456, // 19 MB
      timeCost: 2,
      parallelism: 1,
    });
    
    // Enkripsi NIK dan alamat
    const nikEnc = encrypt(row.nik);
    const nikHash = hmacHash(row.nik);
    const alamatEnc = encrypt(row.alamat);
    
    // Update database
    await query(
      `UPDATE users 
       SET password = ?, nik_enc = ?, nik_hash = ?, alamat_enc = ? 
       WHERE id = ?`,
      [passwordHash, nikEnc, nikHash, alamatEnc, row.id]
    );
    
    console.log(`  ✓ ${row.email} → password: ${plainPassword} (hashed)`);
  }
  
  console.log("\n✅ Migrasi selesai!");
  console.log("\n📝 CATATAN:");
  console.log("   - Password dummy TETAP SAMA untuk testing");
  console.log("   - Sekarang disimpan dengan Argon2id hash (aman)");
  console.log("   - NIK & alamat dienkripsi dengan AES-256-GCM");
  console.log("   - NIK hash tersedia untuk pencarian tanpa decrypt");
  
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
