-- Optional citizen feed and comments. Existing reports remain private by default.
ALTER TABLE laporan
  ADD COLUMN is_public TINYINT(1) NOT NULL DEFAULT 0 AFTER status,
  ADD COLUMN is_anonymous TINYINT(1) NOT NULL DEFAULT 1 AFTER is_public,
  ADD KEY idx_laporan_public_created (is_public, created_at);

CREATE TABLE laporan_komentar (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  laporan_id INT NOT NULL,
  user_id INT NOT NULL,
  isi VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_komentar_laporan_created (laporan_id, created_at),
  CONSTRAINT fk_komentar_laporan FOREIGN KEY (laporan_id) REFERENCES laporan(id) ON DELETE CASCADE,
  CONSTRAINT fk_komentar_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
