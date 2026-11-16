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
  latitudeHash: string;
  longitudeHash: string;
  wilayahId: number;
  isPublic?: boolean;
}) {
  const {
    userId, judul, deskripsi, deskripsiEnc, kategori,
    fotoPath, fotoHash, latitude, longitude,
    latitudeEnc, longitudeEnc, latitudeHash, longitudeHash, wilayahId,
  } = input;
  
  // Parameterized query (SQL injection prevention - A03/A05)
  const result = await query(`
    INSERT INTO laporan (
      user_id, judul, deskripsi, deskripsi_enc, kategori, 
      foto_path, foto_hash,
      gps_lat, gps_lng, latitude_enc, longitude_enc, gps_lat_hash, gps_lng_hash,
    wilayah_id, is_public, is_anonymous
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `, [
    userId, judul, deskripsi, deskripsiEnc, kategori,
    fotoPath, fotoHash,
    latitude, longitude, latitudeEnc, longitudeEnc, latitudeHash, longitudeHash,
    wilayahId, input.isPublic ? 1 : 0
  ]);
  
  // INSERT and id retrieval must use the same pooled connection. query() returns
  // mysql2's insertId directly; SELECT LAST_INSERT_ID() can hit another connection.
  return Number(result.insertId);
}

export async function findLaporanByUser(userId: number, wilayahId?: number, limit = 100, offset = 0) {
  // Filter by user AND wilayah (RBAC - A01 fixed)
  let sql = `
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama,
      sh.status_baru AS status_terakhir, sh.catatan AS catatan_status,
      sh.created_at AS status_diubah_at, actor.nama AS petugas_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    LEFT JOIN status_history sh ON sh.id = (
      SELECT sh2.id FROM status_history sh2 WHERE sh2.laporan_id = l.id
      ORDER BY sh2.created_at DESC, sh2.id DESC LIMIT 1
    )
    LEFT JOIN users actor ON actor.id = sh.diubah_oleh
    WHERE l.user_id = ?
  `;
  const params: any[] = [userId];
  
  // Additional wilayah filter for PEMDA/PUSAT roles
  if (wilayahId) {
    sql += ` AND l.wilayah_id = ?`;
    params.push(wilayahId);
  }
  
  sql += ` ORDER BY l.created_at DESC, l.id DESC LIMIT ${Math.min(Math.max(1, Math.trunc(limit)), 100)} OFFSET ${Math.max(0, Math.trunc(offset))}`;
  
  const r = await query(sql, params);
  return r.rows as Laporan[];
}

export async function findStatusHistory(laporanId: number) {
  const result = await query(`
    SELECT sh.id, sh.status_lama, sh.status_baru, sh.status, sh.catatan,
      sh.created_at, u.nama AS petugas_nama
    FROM status_history sh
    LEFT JOIN users u ON u.id = sh.diubah_oleh
    WHERE sh.laporan_id = ?
    ORDER BY sh.created_at ASC, sh.id ASC
  `, [laporanId]);
  return result.rows;
}

// Find laporan with wilayah filter (RBAC - A01 fixed)
export async function findAllLaporan(wilayahIds?: number[], limit = 100, offset = 0) {
  if (wilayahIds && wilayahIds.length === 0) return [];
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
  sql += ` LIMIT ${Math.min(Math.max(1, Math.trunc(limit)), 100)} OFFSET ${Math.max(0, Math.trunc(offset))}`;
  
  const r = await query(sql, params);
  return r.rows as Laporan[];
}

// Find laporan by ID with ownership check (IDOR fix - A01)
export async function findLaporanById(id: number, userId?: number, wilayahIds?: number[], allowAll = false) {
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
  if (allowAll) {
    // Explicit national-scope authorization is decided by the API route.
  } else if (authConditions.length > 0) {
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
    WITH RECURSIVE region_tree (id) AS (
      SELECT id FROM wilayah WHERE id = ?
      UNION DISTINCT
      SELECT child.id FROM wilayah child JOIN region_tree parent ON child.parent_id = parent.id
    )
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    JOIN region_tree tree ON tree.id = l.wilayah_id
    ORDER BY l.created_at DESC
  `, [kotaKabId]);
  
  return r.rows as Laporan[];
}

export async function countStatusByKotaKab(kotaKabId: number) {
  // Parameterized query
  const r = await query(`
    WITH RECURSIVE region_tree (id) AS (
      SELECT id FROM wilayah WHERE id = ?
      UNION DISTINCT
      SELECT child.id FROM wilayah child JOIN region_tree parent ON child.parent_id = parent.id
    )
    SELECT COALESCE(CASE WHEN w.tipe = 'kecamatan' THEN w.nama END, parent.nama, w.nama) AS kecamatan,
           l.status, COUNT(*) AS jumlah
    FROM laporan l
    JOIN region_tree tree ON tree.id = l.wilayah_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    LEFT JOIN wilayah parent ON parent.id = w.parent_id
    GROUP BY kecamatan, l.status
    ORDER BY kecamatan, l.status
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
