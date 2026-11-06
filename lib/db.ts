import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as { mysqlPool?: mysql.Pool };

export const pool =
  globalForMysql.mysqlPool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") globalForMysql.mysqlPool = pool;

export async function query(text: string) {
  const [rows] = await pool.query(text);
  // Format response to match PostgreSQL structure (rows property)
  return { rows: rows as any[] };
}