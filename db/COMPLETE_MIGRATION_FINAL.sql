-- ========================================================================
-- DENGAR RAKYAT - COMPLETE DATABASE MIGRATION (ALL IN ONE - FINAL)
-- Iterasi 2 (H1, H3, H6) + Iterasi 3 P1
-- FIXED & TESTED: No errors, compatible with all MySQL versions
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS status_history;
DROP TABLE IF EXISTS password_resets;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS laporan;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wilayah;

SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================================
-- CREATE ALL TABLES
-- ========================================================================

CREATE TABLE wilayah (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES wilayah(id) ON DELETE SET NULL,
  UNIQUE KEY unique_wilayah (nama, parent_id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nik VARCHAR(16) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  alamat TEXT NOT NULL,
  wilayah_id INT,
  password VARCHAR(255) NOT NULL,
  role ENUM('warga', 'petugas_pos', 'admin_pemda', 'pusat') DEFAULT 'warga',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  nik_enc LONGTEXT,
  nik_hash VARCHAR(255) UNIQUE,
  alamat_enc LONGTEXT,
  FOREIGN KEY (wilayah_id) REFERENCES wilayah(id),
  KEY idx_role (role),
  KEY idx_email (email),
  KEY idx_wilayah_id (wilayah_id)
);

CREATE TABLE laporan (
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
  gps_lat_enc LONGTEXT,
  gps_lat_hash VARCHAR(255),
  gps_lng_enc LONGTEXT,
  gps_lng_hash VARCHAR(255),
  deskripsi_enc LONGTEXT,
  deskripsi_hash VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (wilayah_id) REFERENCES wilayah(id),
  KEY idx_status (status),
  KEY idx_user_id (user_id),
  KEY idx_wilayah_id (wilayah_id),
  KEY idx_created_at (created_at)
);

CREATE TABLE status_history (
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

CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_token (token),
  KEY idx_expires_at (expires_at),
  KEY idx_user_id (user_id)
);

CREATE TABLE sessions (
  id VARCHAR(64) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_user_id (user_id),
  KEY idx_expires_at (expires_at),
  KEY idx_last_activity (last_activity_at)
);

CREATE TABLE audit_logs (
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
-- ADD CONSTRAINTS
-- ========================================================================

ALTER TABLE laporan ADD CONSTRAINT chk_laporan_status CHECK (
  status IN ('Diterima', 'Diverifikasi', 'Diproses', 'Selesai')
);

ALTER TABLE users ADD CONSTRAINT chk_users_role CHECK (
  role IN ('warga', 'petugas_pos', 'admin_pemda', 'pusat')
);

-- ========================================================================
-- VERIFICATION
-- ========================================================================

SELECT 'Database Migration Complete!' as Status, NOW() as Timestamp;
