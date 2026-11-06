-- =====================================================
-- Iterasi 2 - H6: Database Cleanup
-- =====================================================
-- Tanggal: 2026-11-06
-- Kategori OWASP: A02 (remove plaintext PII)
--
-- Perubahan:
-- 1. Drop kolom plaintext `nik` dan `alamat`
-- 2. Verifikasi semua data sudah ter-enkripsi
-- 
-- ⚠️ PERINGATAN: Backup database sebelum menjalankan!
-- ⚠️ Pastikan semua data sudah ter-migrate (nik_enc, alamat_enc terisi)
-- =====================================================

USE dengar_rakyat;

-- =====================================================
-- STEP 1: Verifikasi Data (WAJIB)
-- =====================================================

-- Check: Semua user harus punya nik_enc dan alamat_enc
SELECT 
    COUNT(*) AS total_users,
    SUM(CASE WHEN nik_enc IS NULL THEN 1 ELSE 0 END) AS users_without_nik_enc,
    SUM(CASE WHEN alamat_enc IS NULL THEN 1 ELSE 0 END) AS users_without_alamat_enc,
    SUM(CASE WHEN nik_hash IS NULL THEN 1 ELSE 0 END) AS users_without_nik_hash
FROM users;

-- ⚠️ STOP HERE jika ada users_without_* > 0
-- Jalankan ulang: npx tsx scripts/seed-hardened-users.ts

-- =====================================================
-- STEP 2: Backup Verification (Manual)
-- =====================================================

-- Pastikan Anda sudah backup:
-- mysqldump -u root -p dengar_rakyat > backup_before_h6_cleanup.sql

-- =====================================================
-- STEP 3: Drop Plaintext Columns
-- =====================================================

-- Drop NIK plaintext
ALTER TABLE users DROP COLUMN nik;

-- Drop alamat plaintext
ALTER TABLE users DROP COLUMN alamat;

-- =====================================================
-- STEP 4: Verify Final Schema
-- =====================================================

DESCRIBE users;

-- Expected columns:
-- - id (INT)
-- - nik_enc (TEXT) ✅
-- - nik_hash (VARCHAR(64)) ✅
-- - nama (VARCHAR(100))
-- - email (VARCHAR(100))
-- - alamat_enc (TEXT) ✅
-- - wilayah_id (INT)
-- - password (VARCHAR(255)) -- Argon2id hash
-- - role (ENUM)
-- - created_at (TIMESTAMP)

-- NO MORE plaintext nik or alamat! ✅

SELECT 'Cleanup H6 selesai! NIK dan alamat plaintext dihapus.' AS status;
