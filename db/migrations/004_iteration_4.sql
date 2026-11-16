-- Iterasi 4 compatibility and audit hardening.
-- Apply once to databases created from earlier schema revisions.
ALTER TABLE laporan
  ADD COLUMN foto_path VARCHAR(500) NULL,
  ADD COLUMN foto_hash CHAR(64) NULL,
  ADD COLUMN foto_hasil_path VARCHAR(500) NULL,
  ADD COLUMN foto_hasil_hash CHAR(64) NULL,
  ADD COLUMN latitude_enc LONGTEXT NULL,
  ADD COLUMN longitude_enc LONGTEXT NULL,
  ADD KEY idx_laporan_geo_repeat (user_id, gps_lat_hash, gps_lng_hash, created_at);

ALTER TABLE status_history
  ADD COLUMN status_lama VARCHAR(50) NULL AFTER laporan_id,
  ADD COLUMN status_baru VARCHAR(50) NULL AFTER status_lama,
  ADD COLUMN diubah_oleh INT NULL AFTER status_baru;

ALTER TABLE status_history
  MODIFY status VARCHAR(50) NULL;

-- Preserve the old schema's event data in the new before/after representation.
UPDATE status_history SET status_baru = status WHERE status_baru IS NULL;
UPDATE status_history SET status_lama = status_baru WHERE status_lama IS NULL;
UPDATE status_history SET diubah_oleh = changed_by WHERE diubah_oleh IS NULL;

ALTER TABLE status_history
  ADD KEY idx_status_history_report_created (laporan_id, created_at);

DELIMITER $$
CREATE TRIGGER status_history_reject_update
BEFORE UPDATE ON status_history
FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only';
END$$

CREATE TRIGGER status_history_reject_delete
BEFORE DELETE ON status_history
FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only';
END$$
DELIMITER ;
