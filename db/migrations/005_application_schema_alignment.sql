-- Align the supplied MySQL dump with columns and hierarchy used by the app.
-- Run once after the base schema and 004_iteration_4.sql.

ALTER TABLE audit_logs
  MODIFY user_email VARCHAR(255) NULL,
  MODIFY user_role VARCHAR(50) NULL,
  ADD COLUMN event_category VARCHAR(30) NULL AFTER event_type,
  ADD COLUMN action VARCHAR(255) NULL AFTER event_category,
  ADD COLUMN target_type VARCHAR(100) NULL AFTER user_role,
  ADD COLUMN target_id VARCHAR(100) NULL AFTER target_type,
  ADD COLUMN previous_hash CHAR(64) NULL AFTER metadata,
  ADD COLUMN current_hash CHAR(64) NULL AFTER previous_hash,
  ADD KEY idx_audit_hash_chain (id, current_hash);

ALTER TABLE password_resets
  MODIFY token VARCHAR(255) NULL,
  ADD COLUMN token_hash CHAR(64) NULL AFTER token,
  ADD COLUMN used_at TIMESTAMP NULL DEFAULT NULL AFTER expires_at;

UPDATE password_resets
SET token_hash = SHA2(token, 256)
WHERE token_hash IS NULL AND token IS NOT NULL;

UPDATE password_resets SET token = NULL WHERE token_hash IS NOT NULL;

ALTER TABLE password_resets
  MODIFY token_hash CHAR(64) NOT NULL,
  ADD UNIQUE KEY uq_password_resets_token_hash (token_hash);

ALTER TABLE wilayah
  ADD COLUMN tipe VARCHAR(30) NOT NULL DEFAULT 'kecamatan' AFTER nama,
  ADD KEY idx_wilayah_tipe_parent (tipe, parent_id);

UPDATE wilayah w
LEFT JOIN wilayah parent ON parent.id = w.parent_id
LEFT JOIN wilayah grandparent ON grandparent.id = parent.parent_id
SET w.tipe = CASE
  WHEN w.parent_id IS NULL THEN 'provinsi'
  WHEN parent.parent_id IS NULL THEN 'kota_kab'
  WHEN grandparent.parent_id IS NULL THEN 'kecamatan'
  ELSE 'desa_kelurahan'
END;

DELIMITER $$
CREATE TRIGGER audit_logs_reject_update
BEFORE UPDATE ON audit_logs
FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only';
END$$

CREATE TRIGGER audit_logs_reject_delete
BEFORE DELETE ON audit_logs
FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only';
END$$
DELIMITER ;
