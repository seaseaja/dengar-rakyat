import { query } from "@/lib/db";

export async function listWilayah(tipe: string, parentId?: string) {
  const parent = parentId ? `AND parent_id = ${Number(parentId)}` : "";
  const r = await query(
    `SELECT id, nama FROM wilayah
     WHERE tipe = '${tipe}' ${parent}
     ORDER BY nama`
  );
  return r.rows as { id: number; nama: string }[];
}