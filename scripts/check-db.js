// Read-only check of the application's configured MySQL database.
const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd());

async function checkDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing. Set it in .env.local.");
    process.exitCode = 1;
    return;
  }

  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    const [databaseRows] = await connection.query("SELECT DATABASE() AS name");
    const databaseName = databaseRows[0]?.name;
    const [tables] = await connection.query("SHOW TABLES");
    const [reportColumns] = await connection.query(
      `SELECT COLUMN_NAME AS name
       FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'laporan'`
    );
    const availableColumns = new Set(reportColumns.map((column) => column.name));
    const requiredColumns = [
      "gps_lat", "gps_lng", "latitude_enc", "longitude_enc", "gps_lat_hash",
      "gps_lng_hash", "deskripsi_enc", "foto_path", "foto_hash", "is_public",
      "is_anonymous",
    ];
    const missingColumns = requiredColumns.filter((column) => !availableColumns.has(column));

    console.log(`Connected database: ${databaseName}`);
    console.log(`Tables found: ${tables.length}`);
    if (missingColumns.length) {
      console.error(`Missing laporan columns: ${missingColumns.join(", ")}`);
      process.exitCode = 1;
    } else {
      console.log("Laporan schema: ready for the current application.");
    }
  } catch (error) {
    console.error("Database check failed:", error.code || error.message);
    process.exitCode = 1;
  } finally {
    await connection?.end();
  }
}

checkDatabase();
