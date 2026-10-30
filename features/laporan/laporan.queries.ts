import { query } from "@/lib/db";
import type { Laporan } from "./laporan.types";

export async function insertLaporan(input: {
  userId: number;
  judul: string;
  deskripsi: string;
  kategori: string;
  fotoPath: string | null;
  latitude: number | null;
  longitude: number | null;
  wilayahId: number | null;
}) {
  const { userId, judul, deskripsi, kategori, fotoPath, latitude, longitude, wilayahId } = input;
  const r = await query(`
    INSERT INTO laporan (user_id, judul, deskripsi, kategori, foto_path, latitude, longitude, wilayah_id)
    VALUES (${userId}, '${judul}', '${deskripsi}', '${kategori}',
            ${fotoPath ? `'${fotoPath}'` : "NULL"},
            ${latitude ?? "NULL"}, ${longitude ?? "NULL"}, ${wilayahId ?? "NULL"})
    RETURNING id
  `);
  return r.rows[0].id as number;
}

export async function findLaporanByUser(userId: number) {
  const r = await query(`
    SELECT * FROM laporan WHERE user_id = ${userId} ORDER BY created_at DESC
  `);
  return r.rows as Laporan[];
}

// Sengaja TANPA filter wilayah/role — celah A01 (dipakai dashboard Pos)
export async function findAllLaporan() {
  const r = await query(`
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    ORDER BY l.created_at DESC
  `);
  return r.rows as Laporan[];
}

// Sengaja TANPA cek kepemilikan — celah IDOR (A01)
export async function findLaporanById(id: string) {
  const r = await query(`
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE l.id = ${id}
  `);
  return (r.rows[0] as Laporan) ?? null;
}

export async function findLaporanByKotaKab(kotaKabId: string) {
  const r = await query(`
    SELECT l.*, u.nama AS pelapor_nama, w.nama AS wilayah_nama
    FROM laporan l
    JOIN users u ON u.id = l.user_id
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE w.parent_id = ${kotaKabId}
    ORDER BY l.created_at DESC
  `);
  return r.rows as Laporan[];
}

export async function countStatusByKotaKab(kotaKabId: string) {
  const r = await query(`
    SELECT w.nama AS kecamatan, l.status, COUNT(*) AS jumlah
    FROM laporan l
    LEFT JOIN wilayah w ON w.id = l.wilayah_id
    WHERE w.parent_id = ${kotaKabId}
    GROUP BY w.nama, l.status
    ORDER BY w.nama
  `);
  return r.rows as { kecamatan: string; status: string; jumlah: string }[];
}

export async function countStatusNasional() {
  const r = await query(`
    SELECT status, COUNT(*) AS jumlah FROM laporan GROUP BY status
  `);
  return r.rows as { status: string; jumlah: string }[];
}