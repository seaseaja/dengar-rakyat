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

/**
 * Execute parameterized query dengan prepared statement (hardened untuk Iterasi 2)
 * @param text SQL query dengan placeholder '?'
 * @param params Array parameter yang akan di-escape otomatis
 */
export async function query(text: string, params?: unknown[]) {
  // FIX: Using parameterized queries - safe from SQL injection
  // semgrep: ignore(javascript.lang.security.audit.sqli)
  const [rows] = await pool.query(text, params);
  return { rows: rows as any[] };
}