import { query } from "@/lib/db";
import type { RegisterInput, Role, User } from "./auth.types";

export async function findUserByEmail(email: string) {
  const r = await query(`SELECT * FROM users WHERE email = '${email}'`);
  return r.rows as User[];
}

export async function findUserByCredentials(email: string, password: string) {
  const r = await query(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
  );
  return r.rows as User[];
}

export async function insertUser(input: RegisterInput & { role: Role }) {
  const { nik, nama, email, alamat, wilayah_id, password, role } = input;
  await query(
    `INSERT INTO users (nik, nama, email, alamat, wilayah_id, password, role)
     VALUES ('${nik}', '${nama}', '${email}', '${alamat}', ${wilayah_id}, '${password}', '${role}')`
  );
  // MySQL doesn't support RETURNING, get last inserted ID
  const r = await query(`SELECT id, email, role FROM users WHERE email = '${email}'`);
  return r.rows[0] as { id: number; email: string; role: string };
}

export async function insertSession(userId: number) {
  await query(
    `INSERT INTO sessions (user_id) VALUES (${userId})`
  );
  // MySQL doesn't support RETURNING, get last inserted ID
  const r = await query(`SELECT LAST_INSERT_ID() as id`);
  return r.rows[0].id as number;
}

export async function findUserBySessionId(sessionId: string) {
  const r = await query(
    `SELECT u.*, w.nama AS wilayah_nama
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN wilayah w ON w.id = u.wilayah_id
     WHERE s.id = ${sessionId}`
  );
  return (r.rows[0] as User) ?? null;
}

export async function insertResetToken(userId: number, token: string) {
  await query(
    `INSERT INTO password_resets (user_id, token) VALUES (${userId}, '${token}')`
  );
}

export async function findResetToken(token: string) {
  const r = await query(`SELECT * FROM password_resets WHERE token = '${token}'`);
  return r.rows as { id: number; user_id: number; token: string }[];
}

export async function updatePassword(userId: number, password: string) {
  await query(`UPDATE users SET password = '${password}' WHERE id = ${userId}`);
}