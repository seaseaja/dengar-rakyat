const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

async function main() {
  loadEnvConfig(process.cwd());
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const [tables] = await connection.query("SHOW TABLES");
  for (const table of tables) {
    const name = Object.values(table)[0];
    console.log(`\n===== ${name} =====`);
    const [columns] = await connection.query(`SHOW COLUMNS FROM \`${name}\``);
    for (const column of columns) {
      console.log(
        `${column.Field}\t${column.Type}\t${column.Null}\t${column.Key}\t${column.Default ?? ""}`
      );
    }
  }
  const [triggers] = await connection.query(
    "SELECT TRIGGER_NAME, EVENT_OBJECT_TABLE, EVENT_MANIPULATION FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = DATABASE()"
  );
  console.log("\n===== TRIGGERS =====");
  console.log(JSON.stringify(triggers, null, 2));
  const [counts] = await connection.query(
    "SELECT TABLE_NAME AS name, TABLE_ROWS AS rows_estimate FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()"
  );
  console.log("\n===== ROW ESTIMATES =====");
  console.log(JSON.stringify(counts, null, 2));
  await connection.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
