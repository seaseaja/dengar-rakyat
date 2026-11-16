/**
 * Import the official 2025 Indonesian province/regency/district hierarchy.
 * Source: https://wilayah.id/ (Kepmendagri No. 300.2.2-2138 Tahun 2025).
 * Run once with: npx tsx scripts/seed-wilayah.ts
 */
import fs from "node:fs";
import path from "node:path";

function loadLocalEnvironment() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) throw new Error(".env.local belum tersedia");
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const name = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[name]) process.env[name] = value;
  }
}

interface RegionItem {
  code: string;
  name: string;
}

interface RegionResponse {
  data: RegionItem[];
  meta: { updated_at?: string };
}

interface RegionRow {
  id: number;
  nama: string;
  tipe: "provinsi" | "kota_kab" | "kecamatan";
  parent_id: number | null;
}

function numericId(code: string): number {
  const id = Number(code.replaceAll(".", ""));
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error(`Kode wilayah tidak valid: ${code}`);
  return id;
}

async function fetchJson(endpoint: string): Promise<RegionResponse> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`https://wilayah.id/api/${endpoint}.json`, {
        headers: { Accept: "application/json", "User-Agent": "Dengar-Rakyat-local-region-seed/1.0" },
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${endpoint}`);
      const body = await response.json() as RegionResponse;
      if (!Array.isArray(body.data)) throw new Error(`Format data salah untuk ${endpoint}`);
      return body;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`Gagal mengambil ${endpoint}`);
}

async function mapLimited<T, R>(items: T[], concurrency: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index]);
    }
  }));
  return results;
}

async function main() {
  loadLocalEnvironment();
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL belum diatur");

  const provinceResponse = await fetchJson("provinces");
  const provinces = provinceResponse.data;
  if (!provinces.length) throw new Error("Sumber data tidak mengembalikan provinsi");

  const rows: RegionRow[] = provinces.map((province) => ({
    id: numericId(province.code),
    nama: province.name.trim(),
    tipe: "provinsi",
    parent_id: null,
  }));

  const regenciesByProvince = await mapLimited(provinces, 8, async (province) => ({
    province,
    regencies: (await fetchJson(`regencies/${province.code}`)).data,
  }));
  const regencies = regenciesByProvince.flatMap(({ province, regencies: children }) => {
    const parentId = numericId(province.code);
    return children.map((regency) => ({ province, regency, parentId }));
  });
  rows.push(...regencies.map(({ regency, parentId }) => ({
    id: numericId(regency.code),
    nama: regency.name.trim(),
    tipe: "kota_kab" as const,
    parent_id: parentId,
  })));

  const districtsByRegency = await mapLimited(regencies, 12, async ({ regency }) => ({
    regency,
    parentId: numericId(regency.code),
    districts: (await fetchJson(`districts/${regency.code}`)).data,
  }));
  rows.push(...districtsByRegency.flatMap(({ districts, parentId }) => districts.map((district) => ({
    id: numericId(district.code),
    nama: district.name.trim(),
    tipe: "kecamatan" as const,
    parent_id: parentId,
  }))));

  const ids = new Set<number>();
  for (const row of rows) {
    if (!row.nama || ids.has(row.id)) throw new Error(`Data wilayah duplikat/tidak valid pada id ${row.id}`);
    ids.add(row.id);
  }
  if (districtsByRegency.some(({ districts }) => districts.length === 0)) {
    throw new Error("Ada kabupaten/kota tanpa kecamatan; import dibatalkan agar seed tidak parsial");
  }

  const { pool } = await import("../lib/db");
  const connection = await pool.getConnection();
  try {
    const [countRows] = await connection.query("SELECT COUNT(*) AS total FROM wilayah");
    const count = Number((countRows as Array<{ total: number }>)[0]?.total ?? 0);
    if (count > 0) throw new Error(`Tabel wilayah sudah berisi ${count} baris; seed aman hanya berjalan pada tabel kosong`);

    await connection.beginTransaction();
    for (let offset = 0; offset < rows.length; offset += 400) {
      const batch = rows.slice(offset, offset + 400);
      const placeholders = batch.map(() => "(?, ?, ?, ?)").join(",");
      const values = batch.flatMap((row) => [row.id, row.nama, row.tipe, row.parent_id]);
      await connection.execute(
        `INSERT INTO wilayah (id, nama, tipe, parent_id) VALUES ${placeholders}`,
        values
      );
    }
    await connection.commit();
    console.log(`Seed berhasil: ${provinces.length} provinsi, ${regencies.length} kota/kabupaten, ${rows.length - provinces.length - regencies.length} kecamatan.`);
    console.log(`Sumber data diperbarui: ${provinceResponse.meta.updated_at ?? "tidak dicantumkan"}.`);
  } catch (error) {
    await connection.rollback().catch(() => undefined);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Seed wilayah gagal:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
