-- ========================================================================
-- DENGAR RAKYAT - COMPLETE DATABASE MIGRATION (ALL IN ONE)
-- Iterasi 2 (H1, H3, H6) + Iterasi 3 P1
-- 
-- INSTRUCTIONS:
-- 1. Copy semua SQL ini
-- 2. Buka phpMyAdmin
-- 3. Pilih database "dengar_rakyat"
-- 4. Paste di SQL tab
-- 5. Click "Execute"
-- 
-- WARNING: DESTRUCTIVE OPERATION - Akan menghapus existing data!
-- ========================================================================

-- ========================================================================
-- STEP 1: BASE SCHEMA (mysql_migration.sql)
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- Create wilayah table
CREATE TABLE IF NOT EXISTS wilayah (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES wilayah(id) ON DELETE SET NULL,
  UNIQUE KEY unique_wilayah (nama, parent_id)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nik VARCHAR(16) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  alamat TEXT NOT NULL,
  wilayah_id INT,
  password VARCHAR(255) NOT NULL,
  role ENUM('warga', 'petugas_pos', 'admin_pemda', 'pusat') DEFAULT 'warga',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wilayah_id) REFERENCES wilayah(id),
  KEY idx_role (role),
  KEY idx_email (email)
);

-- Create laporan table
CREATE TABLE IF NOT EXISTS laporan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  judul VARCHAR(255) NOT NULL,
  deskripsi TEXT NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  status ENUM('Diterima', 'Diverifikasi', 'Diproses', 'Selesai') DEFAULT 'Diterima',
  wilayah_id INT,
  gps_lat DECIMAL(10, 8),
  gps_lng DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (wilayah_id) REFERENCES wilayah(id),
  KEY idx_status (status),
  KEY idx_user_id (user_id),
  KEY idx_created_at (created_at)
);

-- Create status_history table
CREATE TABLE IF NOT EXISTS status_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  laporan_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  changed_by INT,
  catatan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (laporan_id) REFERENCES laporan(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL,
  KEY idx_laporan_id (laporan_id),
  KEY idx_created_at (created_at)
);

-- Create password_resets table
CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_token (token),
  KEY idx_expires_at (expires_at)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(64) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_user_id (user_id),
  KEY idx_expires_at (expires_at)
);

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================================
-- STEP 2: ITERASI 2 H1 - USER ENCRYPTION SCHEMA (iter2_h1_schema_migration.sql)
-- ========================================================================

-- Add encryption columns for NIK
ALTER TABLE users ADD COLUMN nik_enc LONGTEXT COMMENT 'Encrypted NIK using AES-256-GCM';
ALTER TABLE users ADD COLUMN nik_hash VARCHAR(255) UNIQUE COMMENT 'HMAC hash for NIK (no decryption)';

-- Add encryption columns for Alamat
ALTER TABLE users ADD COLUMN alamat_enc LONGTEXT COMMENT 'Encrypted alamat using AES-256-GCM';

-- ========================================================================
-- STEP 3: ITERASI 2 H1 - LAPORAN ENCRYPTION (iter2_h1_laporan_encryption.sql)
-- ========================================================================

-- Add encryption columns for GPS Latitude
ALTER TABLE laporan ADD COLUMN gps_lat_enc LONGTEXT COMMENT 'Encrypted GPS latitude';
ALTER TABLE laporan ADD COLUMN gps_lat_hash VARCHAR(255) COMMENT 'HMAC hash for GPS latitude';

-- Add encryption columns for GPS Longitude
ALTER TABLE laporan ADD COLUMN gps_lng_enc LONGTEXT COMMENT 'Encrypted GPS longitude';
ALTER TABLE laporan ADD COLUMN gps_lng_hash VARCHAR(255) COMMENT 'HMAC hash for GPS longitude';

-- Add encryption columns for Deskripsi
ALTER TABLE laporan ADD COLUMN deskripsi_enc LONGTEXT COMMENT 'Encrypted deskripsi';
ALTER TABLE laporan ADD COLUMN deskripsi_hash VARCHAR(255) COMMENT 'HMAC hash for deskripsi';

-- ========================================================================
-- STEP 4: ITERASI 2 H3 - SESSION TIMEOUT (iter2_h3_session_timeout.sql)
-- ========================================================================

-- Add last_activity_at for idle timeout tracking
ALTER TABLE sessions ADD COLUMN last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Track session activity for idle timeout';

-- Add indices for performance
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
CREATE INDEX idx_sessions_activity ON sessions(last_activity_at);

-- ========================================================================
-- STEP 5: ITERASI 2 H6 - CLEANUP & OPTIMIZATION (iter2_h6_cleanup.sql)
-- ========================================================================

-- Remove plaintext NIK (after H1 migration & seed script encrypted data)
UPDATE users SET nik = NULL WHERE nik IS NOT NULL;
ALTER TABLE users DROP COLUMN nik;

-- Remove plaintext Alamat (after H1 migration & seed script encrypted data)
UPDATE users SET alamat = NULL WHERE alamat IS NOT NULL;
ALTER TABLE users DROP COLUMN alamat;

-- Add CHECK constraints for data validation
ALTER TABLE laporan ADD CONSTRAINT chk_status CHECK (
  status IN ('Diterima', 'Diverifikasi', 'Diproses', 'Selesai')
);

ALTER TABLE users ADD CONSTRAINT chk_role CHECK (
  role IN ('warga', 'petugas_pos', 'admin_pemda', 'pusat')
);

-- Add missing indices for query optimization
CREATE INDEX idx_laporan_status ON laporan(status);
CREATE INDEX idx_laporan_wilayah ON laporan(wilayah_id);
CREATE INDEX idx_laporan_user ON laporan(user_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_wilayah ON users(wilayah_id);

-- Add foreign key constraints (if not already exists)
ALTER TABLE laporan ADD CONSTRAINT fk_laporan_user 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE laporan ADD CONSTRAINT fk_laporan_wilayah 
  FOREIGN KEY (wilayah_id) REFERENCES wilayah(id);

-- ========================================================================
-- STEP 6: ITERASI 3 P1 - AUDIT LOGGING SCHEMA (iter3_p1_audit_schema.sql)
-- ========================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  user_id INT,
  user_email VARCHAR(255),
  user_role VARCHAR(50),
  error_message TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  request_id VARCHAR(255),
  metadata LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  KEY idx_event_type (event_type),
  KEY idx_user_id (user_id),
  KEY idx_user_email (user_email),
  KEY idx_status (status),
  KEY idx_ip_address (ip_address),
  KEY idx_created_at (created_at)
);

-- ========================================================================
-- STEP 7: VERIFICATION STATUS
-- ========================================================================

-- Check tables created
SELECT 'STEP 1: Base Schema Tables' as Step;
SHOW TABLES;

-- Check encryption columns
SELECT 'STEP 2-3: Encryption Columns' as Step;
DESCRIBE users;
DESCRIBE laporan;

-- Check audit_logs
SELECT 'STEP 6: Audit Logging Table' as Step;
DESCRIBE audit_logs;

-- Print completion message
SELECT '✅ ALL MIGRATIONS COMPLETE!' as Status, 
       'Database is ready for use' as Message,
       NOW() as CompletedAt;

-- ========================================================================
-- NEXT STEPS:
-- ========================================================================
-- 1. Seed test users with: npx tsx scripts/seed-hardened-users.ts
-- 2. Verify database: node scripts/check-db.js
-- 3. Start server: npm run dev
-- 4. Test login: http://localhost:3000
-- ========================================================================
