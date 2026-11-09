-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 08, 2026 at 11:30 PM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dengar_rakyat`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `event_type` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_role` varchar(50) NOT NULL,
  `error_message` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `request_id` varchar(255) DEFAULT NULL,
  `metadata` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (`user_role` IN ('warga', 'petugas_pos', 'admin_pemda', 'pusat')),
  CHECK (`status` IN ('success', 'failure', 'blocked'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text,
  `kategori` varchar(100) NOT NULL,
  `status` enum('Diterima','Diverifikasi','Diproses','Selesai') NOT NULL DEFAULT 'Diterima',
  `wilayah_id` int DEFAULT NULL,
  `gps_lat` decimal(10,8) DEFAULT NULL,
  `gps_lng` decimal(11,8) DEFAULT NULL,
  `gps_lat_enc` longtext,
  `gps_lat_hash` varchar(255) DEFAULT NULL,
  `gps_lng_enc` longtext,
  `gps_lng_hash` varchar(255) DEFAULT NULL,
  `deskripsi_enc` longtext,
  `deskripsi_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (`status` IN ('Diterima','Diverifikasi','Diproses','Selesai')),
  CHECK (`kategori` IN ('Infrastruktur','Pelayanan','Keamanan','Lingkungan','Pendidikan','Kesehatan','Lainnya'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(64) NOT NULL PRIMARY KEY,
  `user_id` int NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status_history`
--

CREATE TABLE `status_history` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `laporan_id` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `changed_by` int DEFAULT NULL,
  `catatan` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (`status` IN ('Diterima','Diverifikasi','Diproses','Selesai'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `wilayah_id` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('warga','petugas_pos','admin_pemda','pusat') NOT NULL DEFAULT 'warga',
  `nik_enc` longtext NOT NULL,
  `nik_hash` varchar(255) NOT NULL UNIQUE,
  `alamat_enc` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (CHAR_LENGTH(`password`) >= 60),
  CHECK (`role` IN ('warga','petugas_pos','admin_pemda','pusat')),
  CHECK (CHAR_LENGTH(`email`) <= 100 AND `email` LIKE '%@%')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wilayah`
--

CREATE TABLE `wilayah` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nama` varchar(100) NOT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD KEY `idx_event_type` (`event_type`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_user_email` (`user_email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_ip_address` (`ip_address`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_audit_composite` (`user_id`, `event_type`, `created_at`),
  ADD KEY `idx_audit_email_status` (`user_email`, `status`, `created_at`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD KEY `idx_laporan_status` (`status`),
  ADD KEY `idx_laporan_user` (`user_id`),
  ADD KEY `idx_laporan_wilayah` (`wilayah_id`),
  ADD KEY `idx_laporan_created_at` (`created_at`),
  ADD KEY `idx_laporan_user_status` (`user_id`, `status`, `created_at`),
  ADD KEY `idx_laporan_wilayah_status` (`wilayah_id`, `status`, `created_at`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD UNIQUE KEY `uq_pr_token` (`token`),
  ADD KEY `idx_pr_expires_at` (`expires_at`),
  ADD KEY `fk_pr_user` (`user_id`),
  ADD KEY `idx_pr_token_expires` (`token`, `expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD KEY `idx_sessions_user` (`user_id`),
  ADD KEY `idx_sessions_expires` (`expires_at`),
  ADD KEY `idx_sessions_activity` (`last_activity_at`),
  ADD KEY `idx_sessions_user_expires` (`user_id`, `expires_at`);

--
-- Indexes for table `status_history`
--
ALTER TABLE `status_history`
  ADD KEY `idx_laporan_id` (`laporan_id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `fk_sh_changed_by` (`changed_by`),
  ADD KEY `idx_sh_laporan_status` (`laporan_id`, `status`, `created_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD UNIQUE KEY `uq_users_nik_hash` (`nik_hash`),
  ADD KEY `idx_users_role` (`role`),
  ADD KEY `idx_users_wilayah` (`wilayah_id`),
  ADD KEY `idx_users_role_wilayah` (`role`, `wilayah_id`);

--
-- Indexes for table `wilayah`
--
ALTER TABLE `wilayah`
  ADD UNIQUE KEY `unique_wilayah` (`nama`,`parent_id`),
  ADD KEY `fk_wilayah_parent` (`parent_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `fk_laporan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_laporan_wilayah` FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_pr_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `status_history`
--
ALTER TABLE `status_history`
  ADD CONSTRAINT `fk_sh_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sh_laporan` FOREIGN KEY (`laporan_id`) REFERENCES `laporan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_wilayah` FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah` (`id`);

--
-- Constraints for table `wilayah`
--
ALTER TABLE `wilayah`
  ADD CONSTRAINT `fk_wilayah_parent` FOREIGN KEY (`parent_id`) REFERENCES `wilayah` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
