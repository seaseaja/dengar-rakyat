// Add the demo accounts shown in the local test credential table.
// The script only targets local dengar_rakyat and never modifies other users.
const { loadEnvConfig } = require("@next/env");
const argon2 = require("argon2");
const crypto = require("node:crypto");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd());

const demoUsers = [
  { email: "pusat@dengarrakyat.id", password: "pusat123", role: "pusat", nama: "Admin Pusat" },
  {
    email: "pemda.jakut@dengarrakyat.id", password: "pemda123", role: "admin_pemda", nama: "Admin Pemda Jakarta Utara",
    region: { name: "Kota Administrasi Jakarta Utara", type: "kota_kab" },
    nik: "9999999999999901", alamat: "Alamat uji, Jakarta Utara",
  },
  {
    email: "pos.koja@dengarrakyat.id", password: "pos123", role: "petugas_pos", nama: "Petugas Pos Koja",
    region: { name: "Koja", type: "kecamatan" },
    nik: "9999999999999902", alamat: "Alamat uji, Kecamatan Koja",
  },
  {
    email: "budi@example.com", password: "warga123", role: "warga", nama: "Budi Warga",
    region: { name: "Koja", type: "kecamatan" },
    nik: "9999999999999903", alamat: "Alamat uji, Kecamatan Koja",
  },
  {
    email: "siti@example.com", password: "warga123", role: "warga", nama: "Siti Warga",
    region: { name: "Koja", type: "kecamatan" },
    nik: "9999999999999904", alamat: "Alamat uji, Kecamatan Koja",
  },
];

function getKey(name) {
  const value = process.env[name];
  if (!value || !/^[a-f0-9]{64}$/i.test(value)) throw new Error(`${name} harus 64 karakter hex`);
  return Buffer.from(value, "hex");
}

function encrypt(value, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64");
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL belum diatur di .env.local");
  const target = new URL(process.env.DATABASE_URL);
  const databaseName = decodeURIComponent(target.pathname.replace(/^\//, ""));
  if (!new Set(["localhost", "127.0.0.1", "::1", "[::1]"]).has(target.hostname) || databaseName !== "dengar_rakyat") {
    throw new Error("Seed demo ditolak: target harus database lokal dengar_rakyat");
  }
  if (process.env.NODE_ENV === "production") throw new Error("Akun demo tidak boleh dibuat di production");

  const encryptionKey = getKey("ENCRYPTION_KEY");
  const hmacKey = getKey("HMAC_KEY");
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  let added = 0;
  let repaired = 0;
  let alreadyCorrect = 0;
  try {
    const [regions] = await connection.execute(
      `SELECT w.id, w.nama, w.tipe
       FROM wilayah w
       LEFT JOIN wilayah parent ON parent.id = w.parent_id
       WHERE w.tipe IN ('kota_kab', 'kecamatan') AND w.nama IN (?, ?)
         AND (w.tipe = 'kota_kab' OR parent.nama = ?)`,
      ["Kota Administrasi Jakarta Utara", "Koja", "Kota Administrasi Jakarta Utara"]
    );
    const regionIds = new Map(regions.map((row) => [`${row.tipe}:${row.nama}`, row.id]));
    const pemdaRegionId = regionIds.get("kota_kab:Kota Administrasi Jakarta Utara");
    const kojaRegionId = regionIds.get("kecamatan:Koja");
    if (!pemdaRegionId || !kojaRegionId) {
      throw new Error("Wilayah Jakarta Utara/Koja belum tersedia. Impor seed wilayah terlebih dahulu.");
    }

    await connection.beginTransaction();
    for (const user of demoUsers) {
      const wilayahId = user.region?.type === "kota_kab" ? pemdaRegionId
        : user.region?.type === "kecamatan" ? kojaRegionId
        : null;
      const [existingRows] = await connection.execute(
        "SELECT id, role, password, wilayah_id FROM users WHERE email = ? LIMIT 1",
        [user.email]
      );
      const existing = existingRows[0];
      if (existing) {
        if (existing.role !== user.role) throw new Error(`Role akun ${user.email} tidak cocok; seed dibatalkan.`);
        const passwordMatches = await argon2.verify(existing.password, user.password).catch(() => false);
        if (!passwordMatches || existing.wilayah_id !== wilayahId) {
          const passwordHash = passwordMatches ? existing.password : await argon2.hash(user.password, {
            type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1,
          });
          await connection.execute("UPDATE users SET password = ?, wilayah_id = ? WHERE id = ?", [passwordHash, wilayahId, existing.id]);
          repaired += 1;
        } else alreadyCorrect += 1;
        continue;
      }

      const passwordHash = await argon2.hash(user.password, {
        type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1,
      });
      const nikEnc = user.nik ? encrypt(user.nik, encryptionKey) : null;
      const nikHash = user.nik ? crypto.createHmac("sha256", hmacKey).update(user.nik).digest("hex") : null;
      const alamatEnc = user.alamat ? encrypt(user.alamat, encryptionKey) : null;
      await connection.execute(
        `INSERT INTO users (nik_enc, nik_hash, nama, email, alamat_enc, wilayah_id, password, role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nikEnc, nikHash, user.nama, user.email, alamatEnc, wilayahId, passwordHash, user.role]
      );
      added += 1;
    }
    await connection.commit();
    console.log(`Seed akun demo selesai: ${added} dibuat, ${repaired} diperbaiki, ${alreadyCorrect} sudah sesuai.`);
    console.log("Akun warga demo ditautkan ke Kecamatan Koja agar alur pengaduan dapat diuji.");
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Seed akun demo gagal:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
