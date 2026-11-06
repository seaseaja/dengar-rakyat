-- Buat dan gunakan database
CREATE DATABASE IF NOT EXISTS dengar_rakyat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dengar_rakyat;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- CREATE TABLES
-- ============================================

-- Table: wilayah
CREATE TABLE `wilayah` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `kode` VARCHAR(10) NULL,
    `nama` VARCHAR(100) NOT NULL,
    `tipe` ENUM('provinsi', 'kota_kab', 'kecamatan') NOT NULL,
    `parent_id` INT NULL,
    INDEX `idx_wilayah_parent` (`parent_id`),
    INDEX `idx_wilayah_tipe` (`tipe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: users
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nik` VARCHAR(16) NOT NULL UNIQUE,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `alamat` TEXT NOT NULL,
    `wilayah_id` INT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('warga', 'petugas_pos', 'admin_pemda', 'pusat') NOT NULL DEFAULT 'warga',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah`(`id`) ON DELETE SET NULL,
    INDEX `idx_users_role` (`role`),
    INDEX `idx_users_wilayah` (`wilayah_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: laporan
CREATE TABLE `laporan` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `judul` VARCHAR(150) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `kategori` VARCHAR(50) NOT NULL,
    `foto_path` VARCHAR(255) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Diterima',
    `wilayah_id` INT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `foto_hasil_path` VARCHAR(255) NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah`(`id`) ON DELETE SET NULL,
    INDEX `idx_laporan_user` (`user_id`),
    INDEX `idx_laporan_status` (`status`),
    INDEX `idx_laporan_wilayah` (`wilayah_id`),
    INDEX `idx_laporan_kategori` (`kategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: password_resets
CREATE TABLE `password_resets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `token` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_password_resets_token` (`token`),
    INDEX `idx_password_resets_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: sessions
CREATE TABLE `sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_sessions_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: status_history
CREATE TABLE `status_history` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `laporan_id` INT NOT NULL,
    `status_lama` VARCHAR(20) NULL,
    `status_baru` VARCHAR(20) NOT NULL,
    `diubah_oleh` INT NULL,
    `catatan` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`laporan_id`) REFERENCES `laporan`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`diubah_oleh`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_status_history_laporan` (`laporan_id`),
    INDEX `idx_status_history_user` (`diubah_oleh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- SAMPLE DATA (dari backup PostgreSQL)
-- ============================================

-- Insert admin users (wilayah_id set NULL karena data wilayah belum diimport)
INSERT INTO `users` (`id`, `nik`, `nama`, `email`, `alamat`, `wilayah_id`, `password`, `role`, `created_at`) VALUES
(1, '3100000000000001', 'Admin Pusat', 'pusat@dengarrakyat.id', 'Gedung Pusat, Jakarta', NULL, 'pusat123', 'pusat', '2026-10-29 06:46:04'),
(2, '3100000000000002', 'Admin Pemda Jakut', 'pemda.jakut@dengarrakyat.id', 'Kantor Walikota Jakarta Utara', NULL, 'pemda123', 'admin_pemda', '2026-10-29 06:46:04'),
(3, '3100000000000003', 'Petugas Pos Koja', 'pos.koja@dengarrakyat.id', 'Kantor Kecamatan Koja', NULL, 'pos12345', 'petugas_pos', '2026-10-29 06:46:04'),
(4, '3100000000000004', 'Budi Santoso', 'budi@example.com', 'Jl. Contoh No. 1, Koja', NULL, 'budi1234', 'warga', '2026-10-29 06:46:04'),
(5, '3100000000000005', 'Siti Aminah', 'siti@example.com', 'Jl. Contoh No. 2, Penjaringan', NULL, 'siti1234', 'warga', '2026-10-29 06:46:04');