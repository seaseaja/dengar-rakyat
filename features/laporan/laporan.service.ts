import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { insertLaporan } from "./laporan.queries";
import type { ServiceResult } from "./laporan.types";
import { encrypt } from "@/lib/crypto";
import { calculateFileHash, validateFileType, getFileExtension } from "@/lib/file-integrity";

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

  // Validate GPS coordinates if provided
  if (latitude && longitude) {
    const lat = Number(latitude);
    const lon = Number(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      return { ok: false, status: 400, error: "Koordinat GPS tidak valid" };
    }
    
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return { ok: false, status: 400, error: "Koordinat GPS di luar jangkauan valid" };
    }
  }

  let fotoPath: string | null = null;
  let fotoHash: string | null = null;

  if (file && file.size > 0) {
    // Validate file size (max 10MB for images)
    if (file.size > 10 * 1024 * 1024) {
      return { ok: false, status: 400, error: "Ukuran file maksimal 10MB" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate file type (magic bytes check)
    if (!validateFileType(buffer, file.type)) {
      return { ok: false, status: 400, error: "Tipe file tidak valid. Hanya JPEG dan PNG yang diperbolehkan" };
    }

    // RE-ENCODE IMAGE & STRIP EXIF (prevent EXIF-based GPS spoofing)
    try {
      const processedImage = await sharp(buffer)
        .resize(1920, 1920, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85,
          mozjpeg: true,
        })
        .rotate() // Auto-rotate based on EXIF orientation, then strip EXIF
        .withMetadata(false) // Remove ALL metadata including EXIF
        .toBuffer();

      // Calculate hash AFTER re-encoding (for integrity check)
      fotoHash = calculateFileHash(processedImage);

      // Generate UUID filename (prevent path traversal)
      const filename = `${crypto.randomUUID()}.jpg`; // Always .jpg after re-encoding
      
      await writeFile(path.join(UPLOAD_DIR, filename), processedImage);
      fotoPath = `/uploads/laporan/${filename}`;
    } catch (imageError) {
      console.error("[LAPORAN] Image processing error:", imageError);
      return { ok: false, status: 400, error: "Gagal memproses gambar. Pastikan file adalah gambar valid" };
    }
  }

  // ENCRYPT sensitive data (H1 implementation)
  const deskripsiEnc = encrypt(deskripsi);
  const latitudeEnc = latitude ? encrypt(latitude) : null;
  const longitudeEnc = longitude ? encrypt(longitude) : null;

  const id = await insertLaporan({
    userId,
    judul,
    deskripsi: null, // Don't store plaintext (will be dropped in H6 cleanup)
    deskripsiEnc,
    kategori,
    fotoPath,
    fotoHash,
    latitude: null, // Don't store plaintext
    longitude: null,
    latitudeEnc,
    longitudeEnc,
    wilayahId,
  });

  return { ok: true, id };
}