-- Version the audit chain so verification can distinguish legacy link-only
-- records from records whose complete stored payload is checked.
ALTER TABLE audit_logs
  ADD COLUMN hash_version TINYINT UNSIGNED NOT NULL DEFAULT 1 AFTER current_hash;

ALTER TABLE audit_logs
  ALTER COLUMN hash_version SET DEFAULT 2;
