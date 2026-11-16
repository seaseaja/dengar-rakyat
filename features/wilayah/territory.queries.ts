import { query } from "@/lib/db";

/** Returns a region and all of its descendants for tenant-scoped reporting. */
export async function getWilayahTreeIds(rootId: number): Promise<number[]> {
  if (!Number.isSafeInteger(rootId) || rootId <= 0) return [];
  const result = await query(
    `WITH RECURSIVE region_tree (id) AS (
       SELECT id FROM wilayah WHERE id = ?
       UNION DISTINCT
       SELECT child.id
       FROM wilayah child
       INNER JOIN region_tree parent ON child.parent_id = parent.id
     )
     SELECT id FROM region_tree ORDER BY id`,
    [rootId]
  );
  return result.rows.map((row: { id: number }) => Number(row.id));
}
