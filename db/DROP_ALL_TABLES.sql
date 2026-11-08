-- ========================================================================
-- DROP ALL TABLES - CLEAN SLATE
-- ========================================================================
-- WARNING: DESTRUCTIVE! Menghapus semua data!
-- Gunakan hanya untuk reset database
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables if exist
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS status_history;
DROP TABLE IF EXISTS password_resets;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS laporan;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wilayah;

SET FOREIGN_KEY_CHECKS = 1;

SELECT '✅ ALL TABLES DROPPED! Database is clean.' as Status;

-- ========================================================================
-- NEXT: Run COMPLETE_MIGRATION_ALL_IN_ONE.sql untuk create semua tables
-- ========================================================================
