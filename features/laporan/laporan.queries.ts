import { query } from "@/lib/db";
import type { Laporan } from "./laporan.types";

export async function insertLaporan(input: {
  userId: number;
  judul: string;
  deskripsi: string | null;
  deskripsiEnc: string;
  kategori: string;
  fotoPath: string | null;
  fotoHash: string | null;
  latitude: number | null;
  longitude: number | null;
  latitudeEnc: string | null;
  longitudeEnc: string | null;
  wilayahId: number | null;
}) {
  const { 
    userId, judul, deskripsi, deskripsiEnc, kategori, 
    fotoPath, fotoHash, latitude, longitude, 
    latitudeEnc, longitudeEnc, wilayahId 
  } = input;
  
  // Parameterized query (SQL injection prevention - A03/A05)
  await query(`
    INSERT INTO laporan (
      user_id, judul, deskripsi, deskripsi_enc, kategori, 
      foto_path, foto_hash,
      latitude, longitude, latitude_enc, longitude_enc, 
      wilayah_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    userId, judul, deskripsi, deskripsiEnc, kategori,
    fotoPath, fotoHash,
    latitude, longitude, latitudeEnc, longitudeEnc,
    wilayahId
  ]);
  
  // Get last inserted ID
  const r = await query(`SELECT LAST_INSERT_ID() as id`);
  return r.rows[0].id as number;
}

export async function findLaporanByUser(userId: number, wilayahId?: number) {
  // Filter by user AND wilayah (RBAC - A01 fixed)
  let sql = `
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE l.user_id = ?
  `;
  const params: any[] = [userId];
  
  // Additional wilayah filter for PEMDA/PUSAT roles
  if (wilayahId) {
    sql += ` AND l.wilayah_id = ?`;
    params.push(wilayahId);
  }
  
  sql += ` ORDER BY l.created_at DESC`;
  
  const r = await query(sql, params);
  return r.rows as Laporan[];
}

// Find laporan with wilayah filter (RBAC - A01 fixed)
export async function findAllLaporan(wilayahIds?: number[]) {
  let sql = `
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
  `;
  const params: any[] = [];
  
  // Filter by wilayah if provided (for PEMDA role)
  if (wilayahIds && wilayahIds.length > 0) {
    const placeholders = wilayahIds.map(() => '?').join(',');
    sql += ` WHERE l.wilayah_id IN (${placeholders})`;
    params.push(...wilayahIds);
  }
  
  sql += ` ORDER BY l.created_at DESC`;
  
  const r = await query(sql, params);
  return r.rows as Laporan[];
}

// Find laporan by ID with ownership check (IDOR fix - A01)
export async function findLaporanById(id: number, userId?: number, wilayahIds?: number[]) {
  let sql = `
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE l.id = ?
  `;
  const params: any[] = [id];
  
  // Authorization check: must match ONE of the conditions
  const authConditions: string[] = [];
  
  // Condition 1: Ownership (user can see their own laporan)
  if (userId) {
    authConditions.push(`l.user_id = ?`);
    params.push(userId);
  }
  
  // Condition 2: Wilayah membership (PEMDA/PUSAT can see laporan in their wilayah)
  if (wilayahIds && wilayahIds.length > 0) {
    const placeholders = wilayahIds.map(() => '?').join(',');
    authConditions.push(`l.wilayah_id IN (${placeholders})`);
    params.push(...wilayahIds);
  }
  
  // Combine with OR only if BOTH conditions exist, otherwise require at least one
  if (authConditions.length > 0) {
    sql += ` AND (${authConditions.join(' OR ')})`;
  } else {
    // No authorization params provided - deny access
    return null;
  }
  
  const r = await query(sql, params);
  return (r.rows[0] as Laporan) ?? null;
}

export async function findLaporanByKotaKab(kotaKabId: number) {
  // Parameterized query
  const r = await query(`
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE w.parent_id = ?
    ORDER BY l.created_at DESC
  `, [kotaKabId]);
  
  return r.rows as Laporan[];
}

export async function countStatusByKotaKab(kotaKabId: number) {
  // Parameterized query
  const r = await query(`
    SELECT w.nama AS kecamatan, l.status, COUNT(*) AS jumlah
    FROM laporan l
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE w.parent_id = ?
    GROUP BY w.nama, l.status
    ORDER BY w.nama
  `, [kotaKabId]);
  
  return r.rows as { kecamatan: string; status: string; jumlah: string }[];
}

export async function countStatusNasional() {
  const r = await query(`
    SELECT status, COUNT(*) AS jumlah FROM laporan GROUP BY status
  `);
  return r.rows as { status: string; jumlah: string }[];
}

// Update laporan status (with wilayah check)
export async function updateLaporanStatus(
  id: number, 
  status: string, 
  wilayahIds?: number[]
): Promise<boolean> {
  let sql = `UPDATE laporan SET status = ? WHERE id = ?`;
  const params: any[] = [status, id];
  
  // Only allow update if laporan is in user's wilayah
  if (wilayahIds && wilayahIds.length > 0) {
    const placeholders = wilayahIds.map(() => '?').join(',');
    sql += ` AND wilayah_id IN (${placeholders})`;
    params.push(...wilayahIds);
  }
  
  const r = await query(sql, params);
  return r.affectedRows > 0;
}