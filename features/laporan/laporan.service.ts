import { writeFile } from "fs/promises";
import path from "path";
import { insertLaporan } from "./laporan.queries";
import type { ServiceResult } from "./laporan.types";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "laporan");

export async function createLaporan(input: {
  userId: number;
  wilayahId: number | null;
  judul: string;
  deskripsi: string;
  kategori: string;
  latitude: string | null;
  longitude: string | null;
  file: File | null;
}): Promise<ServiceResult<{ id: number }>> {
  const { userId, wilayahId, judul, deskripsi, kategori, latitude, longitude, file } = input;

  if (!judul || !deskripsi || !kategori) {
    return { ok: false, status: 400, error: "Judul, deskripsi, dan kategori wajib diisi" };
  }

  let fotoPath: string | null = null;

  if (file && file.size > 0) {
    // Sengaja TANPA validasi tipe/ukuran/isi file — celah A04/A06
    const buffer = Buffer.from(await file.arrayBuffer());
    // Sengaja pakai nama file asli dari user — celah path traversal (A05)
    const filename = `${Date.now()}-${file.name}`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    fotoPath = `/uploads/laporan/${filename}`;
  }

  const id = await insertLaporan({
    userId,
    judul,
    deskripsi,
    kategori,
    fotoPath,
    // Sengaja dipercaya mentah dari client — celah A06 (GPS bisa dipalsukan)
    latitude: latitude ? Number(latitude) : null,
    longitude: longitude ? Number(longitude) : null,
    wilayahId,
  });

  return { ok: true, id };
}