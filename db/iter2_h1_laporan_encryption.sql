-- =====================================================
-- Iterasi 2 - H1: Laporan Encryption (GPS + Deskripsi)
-- =====================================================
-- Tambah kolom encrypted untuk koordinat GPS dan deskripsi laporan
-- (Spec: koordinat GPS dan isi keluhan harus dienkripsi)

USE dengar_rakyat;

-- Add encrypted columns for sensitive laporan data
ALTER TABLE laporan 
  ADD COLUMN latitude_enc TEXT AFTER longitude,
  ADD COLUMN longitude_enc TEXT AFTER latitude_enc,
  ADD COLUMN deskripsi_enc TEXT AFTER deskripsi;

-- Note: 
-- - latitude/longitude plaintext columns kept for backward compatibility (will be dropped in H6 cleanup)
-- - deskripsi_enc stores encrypted complaint description
-- - New reports should ONLY write to *_enc columns

SELECT 'Laporan encryption columns added successfully!' AS status;
