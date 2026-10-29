import { query } from "@/lib/db";

export interface KecamatanWithPetugas {
  id: number;
  nama: string;
  petugas_nama: string | null;
  petugas_email: string | null;
}

export async function listKecamatanByKotaKab(kotaKabId: string) {
  const r = await query(`
    SELECT k.id, k.nama,
           u.nama AS petugas_nama, u.email AS petugas_email
    FROM wilayah k
    LEFT JOIN users u ON u.wilayah_id = k.id AND u.role = 'petugas_pos'
    WHERE k.parent_id = ${kotaKabId} AND k.tipe = 'kecamatan'
    ORDER BY k.nama
  `);
  return r.rows as KecamatanWithPetugas[];
}

export interface KotaKabWithAdmin {
  id: number;
  nama: string;
  provinsi_nama: string;
  admin_nama: string | null;
  admin_email: string | null;
}

export async function listKotaKabWithAdmin() {
  const r = await query(`
    SELECT k.id, k.nama, p.nama AS provinsi_nama,
           u.nama AS admin_nama, u.email AS admin_email
    FROM wilayah k
    JOIN wilayah p ON p.id = k.parent_id
    LEFT JOIN users u ON u.wilayah_id = k.id AND u.role = 'admin_pemda'
    WHERE k.tipe = 'kota_kab'
    ORDER BY p.nama, k.nama
  `);
  return r.rows as KotaKabWithAdmin[];
}