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
  // FIX: Using parameterized queries with mysql2 pool.query()
  // The text parameter is an SQL template, params are bound separately
  // This prevents SQL injection via prepared statements
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(text, params);
    return { rows: rows as any[] };
  } finally {
    connection.release();
  }
}