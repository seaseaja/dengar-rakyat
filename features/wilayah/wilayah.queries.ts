import { query } from "@/lib/db";

const WILAYAH_TYPES = new Set(["provinsi", "kota_kab", "kecamatan", "desa_kelurahan"]);

export async function listWilayah(tipe: string, parentId?: string) {
  if (!WILAYAH_TYPES.has(tipe)) return [];
  if (tipe === "provinsi") {
    const r = await query("SELECT id, nama FROM wilayah WHERE tipe = ? ORDER BY nama", [tipe]);
    return r.rows as { id: number; nama: string }[];
  }
  const parent = Number(parentId);
  if (!Number.isSafeInteger(parent) || parent <= 0) return [];
  const r = await query(
    "SELECT id, nama FROM wilayah WHERE tipe = ? AND parent_id = ? ORDER BY nama",
    [tipe, parent]
  );
  return r.rows as { id: number; nama: string }[];
}
