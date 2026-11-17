// One-time bridge from the pre-encryption local schema to the schema this app queries.
const crypto = require("crypto");
const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd());

function requireHexKey(name) {
  const hex = process.env[name];
  if (!hex || !/^[a-f0-9]{64}$/i.test(hex)) {
    throw new Error(`${name} harus 64 karakter hex di .env.local`);
  }
  return Buffer.from(hex, "hex");
}

function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", requireHexKey("ENCRYPTION_KEY"), iv);
  const encrypted = Buffer.concat([cipher.update(String(plain), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
}

function hmacHash(value) {
  return crypto.createHmac("sha256", requireHexKey("HMAC_KEY")).update(String(value)).digest("hex");
}

async function columnExists(connection, table, column) {
  const [rows] = await connection.query(
    "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
    [table, column]
  );
  return rows.length > 0;
}

async function tableExists(connection, table) {
  const [rows] = await connection.query(
    "SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
    [table]
  );
  return rows.length > 0;
}

async function indexExists(connection, table, index) {
  const [rows] = await connection.query(
    "SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?",
    [table, index]
  );
  return rows.length > 0;
}

async function triggerExists(connection, name) {
  const [rows] = await connection.query(
    "SELECT 1 FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = DATABASE() AND TRIGGER_NAME = ?",
    [name]
  );
  return rows.length > 0;
}

async function alignUsers(connection) {
  if (!(await columnExists(connection, "users", "nik_enc"))) {
    await connection.query(
      "ALTER TABLE users ADD COLUMN nik_enc LONGTEXT NULL, ADD COLUMN nik_hash VARCHAR(255) NULL, ADD COLUMN alamat_enc LONGTEXT NULL"
    );
  }

  if (await columnExists(connection, "users", "nik")) {
    const [users] = await connection.query("SELECT id, nik, alamat FROM users");
    for (const user of users) {
      await connection.query(
        "UPDATE users SET nik_enc = ?, nik_hash = ?, alamat_enc = ? WHERE id = ?",
        [encrypt(user.nik), hmacHash(user.nik), encrypt(user.alamat), user.id]
      );
    }
    await connection.query("ALTER TABLE users DROP INDEX nik, DROP COLUMN nik, DROP COLUMN alamat");
  }

  await connection.query(
    "ALTER TABLE users MODIFY nik_enc LONGTEXT NOT NULL, MODIFY nik_hash VARCHAR(255) NOT NULL, MODIFY alamat_enc LONGTEXT NOT NULL, MODIFY password VARCHAR(255) NOT NULL"
  );
  
  if (!(await indexExists(connection, "users", "uq_users_nik_hash"))) {
    await connection.query("ALTER TABLE users ADD UNIQUE KEY uq_users_nik_hash (nik_hash)");
  }
}

async function alignSessions(connection) {
  const [idColumn] = await connection.query(
    "SELECT DATA_TYPE AS dataType FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
    ["sessions", "id"]
  );
  if (idColumn[0]?.dataType === "int") {
    await connection.query("DELETE FROM sessions");
    await connection.query("ALTER TABLE sessions MODIFY id INT NOT NULL");
    await connection.query("ALTER TABLE sessions DROP PRIMARY KEY, MODIFY id VARCHAR(64) NOT NULL, ADD PRIMARY KEY (id)");
  }
  if (!(await columnExists(connection, "sessions", "expires_at"))) {
    await connection.query("ALTER TABLE sessions ADD COLUMN expires_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP");
  }
  if (!(await columnExists(connection, "sessions", "last_activity_at"))) {
    await connection.query("ALTER TABLE sessions ADD COLUMN last_activity_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP");
  }
  if (!(await indexExists(connection, "sessions", "idx_sessions_expires"))) {
    await connection.query("ALTER TABLE sessions ADD KEY idx_sessions_expires (expires_at)");
  }
  if (!(await indexExists(connection, "sessions", "idx_sessions_activity"))) {
    await connection.query("ALTER TABLE sessions ADD KEY idx_sessions_activity (last_activity_at)");
  }
}

async function alignLaporan(connection) {
  if (!(await columnExists(connection, "laporan", "foto_hash"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN foto_hash CHAR(64) NULL");
  }
  if (!(await columnExists(connection, "laporan", "foto_hasil_hash"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN foto_hasil_hash CHAR(64) NULL");
  }
  if (!(await columnExists(connection, "laporan", "gps_lat"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN gps_lat DECIMAL(10,8) NULL");
  }
  if (!(await columnExists(connection, "laporan", "gps_lng"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN gps_lng DECIMAL(11,8) NULL");
  }
  if (!(await columnExists(connection, "laporan", "latitude_enc"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN latitude_enc LONGTEXT NULL");
  }
  if (!(await columnExists(connection, "laporan", "longitude_enc"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN longitude_enc LONGTEXT NULL");
  }
  if (!(await columnExists(connection, "laporan", "gps_lat_hash"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN gps_lat_hash VARCHAR(255) NULL");
  }
  if (!(await columnExists(connection, "laporan", "gps_lng_hash"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN gps_lng_hash VARCHAR(255) NULL");
  }
  if (!(await columnExists(connection, "laporan", "deskripsi_enc"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN deskripsi_enc LONGTEXT NULL");
  }
  if (!(await columnExists(connection, "laporan", "deskripsi_hash"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN deskripsi_hash VARCHAR(255) NULL");
  }
  if (!(await columnExists(connection, "laporan", "is_public"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN is_public TINYINT(1) NOT NULL DEFAULT 0");
  }
  if (!(await columnExists(connection, "laporan", "is_anonymous"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN is_anonymous TINYINT(1) NOT NULL DEFAULT 1");
  }
  if (!(await columnExists(connection, "laporan", "updated_at"))) {
    await connection.query("ALTER TABLE laporan ADD COLUMN updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
  }

  if (await columnExists(connection, "laporan", "latitude")) {
    await connection.query("UPDATE laporan SET gps_lat = latitude, gps_lng = longitude WHERE gps_lat IS NULL AND latitude IS NOT NULL");
  }

  await connection.query(
    "ALTER TABLE laporan MODIFY judul VARCHAR(255) NOT NULL, MODIFY deskripsi TEXT NULL, MODIFY kategori VARCHAR(100) NOT NULL, MODIFY foto_path VARCHAR(500) NULL, MODIFY foto_hasil_path VARCHAR(500) NULL, MODIFY status VARCHAR(50) NOT NULL DEFAULT ?"
  );
  
  if (!(await indexExists(connection, "laporan", "idx_laporan_geo_repeat"))) {
    await connection.query("ALTER TABLE laporan ADD KEY idx_laporan_geo_repeat (user_id, gps_lat_hash, gps_lng_hash, created_at)");
  }
  if (!(await indexExists(connection, "laporan", "idx_laporan_public_created"))) {
    await connection.query("ALTER TABLE laporan ADD KEY idx_laporan_public_created (is_public, created_at)");
  }
}

async function alignStatusHistory(connection) {
  if (!(await columnExists(connection, "status_history", "status"))) {
    await connection.query("ALTER TABLE status_history ADD COLUMN status VARCHAR(50) NULL AFTER laporan_id");
  }
  if (!(await columnExists(connection, "status_history", "changed_by"))) {
    await connection.query("ALTER TABLE status_history ADD COLUMN changed_by INT NULL");
  }
  await connection.query("ALTER TABLE status_history MODIFY status VARCHAR(50) NULL, MODIFY status_lama VARCHAR(50) NULL, MODIFY status_baru VARCHAR(50) NULL");
  
  if (!(await indexExists(connection, "status_history", "idx_status_history_report_created"))) {
    await connection.query("ALTER TABLE status_history ADD KEY idx_status_history_report_created (laporan_id, created_at)");
  }
}

async function alignPasswordResets(connection) {
  await connection.query("ALTER TABLE password_resets MODIFY token VARCHAR(255) NULL");
  if (!(await columnExists(connection, "password_resets", "token_hash"))) {
    await connection.query("ALTER TABLE password_resets ADD COLUMN token_hash CHAR(64) NULL AFTER token");
  }
  if (!(await columnExists(connection, "password_resets", "expires_at"))) {
    await connection.query("ALTER TABLE password_resets ADD COLUMN expires_at TIMESTAMP NULL DEFAULT NULL");
  }
  if (!(await columnExists(connection, "password_resets", "used_at"))) {
    await connection.query("ALTER TABLE password_resets ADD COLUMN used_at TIMESTAMP NULL DEFAULT NULL");
  }
  await connection.query("UPDATE password_resets SET token_hash = SHA2(token, 256) WHERE token_hash IS NULL AND token IS NOT NULL");
  
  const [missing] = await connection.query("SELECT COUNT(*) AS total FROM password_resets WHERE token_hash IS NULL");
  if (Number(missing[0].total) === 0) {
    await connection.query("ALTER TABLE password_resets MODIFY token_hash CHAR(64) NOT NULL");
  }
  
  if (!(await indexExists(connection, "password_resets", "uq_password_resets_token_hash"))) {
    await connection.query("ALTER TABLE password_resets ADD UNIQUE KEY uq_password_resets_token_hash (token_hash)");
  }
}

async function alignWilayah(connection) {
  await connection.query("ALTER TABLE wilayah MODIFY tipe VARCHAR(30) NOT NULL");
  if (!(await indexExists(connection, "wilayah", "idx_wilayah_tipe_parent"))) {
    await connection.query("ALTER TABLE wilayah ADD KEY idx_wilayah_tipe_parent (tipe, parent_id)");
  }
}

async function createAuditLogs(connection) {
  if (await tableExists(connection, "audit_logs")) return;
  await connection.query("CREATE TABLE audit_logs (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, event_type VARCHAR(50) NOT NULL, event_category VARCHAR(30) NULL, action VARCHAR(255) NULL, status VARCHAR(50) NOT NULL, user_id INT DEFAULT NULL, user_email VARCHAR(255) NULL, user_role VARCHAR(50) NULL, target_type VARCHAR(100) NULL, target_id VARCHAR(100) NULL, error_message TEXT NULL, ip_address VARCHAR(45) DEFAULT NULL, user_agent TEXT NULL, request_id VARCHAR(255) DEFAULT NULL, metadata LONGTEXT NULL, previous_hash CHAR(64) NULL, current_hash CHAR(64) NULL, hash_version TINYINT UNSIGNED NOT NULL DEFAULT 2, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, KEY idx_event_type (event_type), KEY idx_user_id (user_id), KEY idx_created_at (created_at), KEY idx_audit_hash_chain (id, current_hash), CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

async function createComments(connection) {
  if (await tableExists(connection, "laporan_komentar")) return;
  await connection.query("CREATE TABLE laporan_komentar (id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, laporan_id INT NOT NULL, user_id INT NOT NULL, isi VARCHAR(1000) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, KEY idx_komentar_laporan_created (laporan_id, created_at), CONSTRAINT fk_komentar_laporan FOREIGN KEY (laporan_id) REFERENCES laporan(id) ON DELETE CASCADE, CONSTRAINT fk_komentar_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

async function main() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    await alignUsers(connection);
    await alignSessions(connection);
    await alignLaporan(connection);
    await alignStatusHistory(connection);
    await alignPasswordResets(connection);
    await alignWilayah(connection);
    await createAuditLogs(connection);
    await createComments(connection);
    
    if (!(await triggerExists(connection, "status_history_reject_update"))) {
      await connection.query("CREATE TRIGGER status_history_reject_update BEFORE UPDATE ON status_history FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only'; END");
    }
    if (!(await triggerExists(connection, "status_history_reject_delete"))) {
      await connection.query("CREATE TRIGGER status_history_reject_delete BEFORE DELETE ON status_history FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only'; END");
    }
    if (!(await triggerExists(connection, "audit_logs_reject_update"))) {
      await connection.query("CREATE TRIGGER audit_logs_reject_update BEFORE UPDATE ON audit_logs FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only'; END");
    }
    if (!(await triggerExists(connection, "audit_logs_reject_delete"))) {
      await connection.query("CREATE TRIGGER audit_logs_reject_delete BEFORE DELETE ON audit_logs FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only'; END");
    }
    
    const [users] = await connection.query("SELECT COUNT(*) AS total FROM users");
    const [wilayah] = await connection.query("SELECT COUNT(*) AS total FROM wilayah");
    console.log(`Schema aligned. Users kept: ${users[0].total}. Wilayah rows: ${wilayah[0].total}.`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Schema alignment failed:", error.code || error.message);
  process.exit(1);
});

