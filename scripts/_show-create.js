const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

async function main() {
  loadEnvConfig(process.cwd());
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const tables = ["users", "sessions", "laporan", "status_history", "password_resets", "wilayah"];
  for (const table of tables) {
    const [rows] = await connection.query(`SHOW CREATE TABLE \`${table}\``);
    console.log(`\n===== ${table} =====`);
    console.log(rows[0]["Create Table"]);
  }
  const [users] = await connection.query(
    "SELECT id, CHAR_LENGTH(password) AS password_len, CHAR_LENGTH(nik) AS nik_len, CHAR_LENGTH(alamat) AS alamat_len, role FROM users"
  );
  console.log("\n===== USER SHAPE =====");
  console.log(JSON.stringify(users, null, 2));
  await connection.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
