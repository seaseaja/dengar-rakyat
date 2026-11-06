-- =====================================================
-- Iterasi 2 - H1: Schema Migration (Hardening Auth)
-- =====================================================
-- Tanggal: 2026-11-06
-- Kategori OWASP: A01 (Broken Access Control), A02 (Cryptographic Failures)
--
-- Perubahan:
-- 1. Ubah kolom password jadi VARCHAR(255) untuk Argon2id hash
-- 2. Tambah kolom nik_enc (NIK terenkripsi AES-256-GCM)
-- 3. Tambah kolom nik_hash (HMAC-SHA256 untuk indexing/pencarian)
-- 4. Tambah kolom alamat_enc (alamat terenkripsi)
-- 5. Buat ulang tabel sessions dengan struktur aman
-- 6. Buat ulang tabel password_resets dengan token hashing
-- =====================================================

USE dengar_rakyat;

-- 1. Alter tabel users untuk kolom enkripsi
ALTER TABLE users
  MODIFY COLUMN password VARCHAR(255) NOT NULL,
  ADD COLUMN nik_enc TEXT AFTER nik,
  ADD COLUMN nik_hash VARCHAR(64) AFTER nik_enc,
  ADD COLUMN alamat_enc TEXT AFTER alamat;

-- 2. Drop dan buat ulang tabel sessions
-- PERINGATAN: Ini akan logout semua user aktif
DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id VARCHAR(64) PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Drop dan buat ulang tabel password_resets
-- PERINGATAN: Ini akan hapus semua token reset yang belum terpakai
DROP TABLE IF EXISTS password_resets;

CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token_hash (token_hash),
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verifikasi perubahan
SELECT 'Migration H1 selesai. Jalankan seed-hardened-users.ts untuk migrasi data.' AS status;
