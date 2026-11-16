import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { insertLaporan } from "./laporan.queries";
import type { ServiceResult } from "./laporan.types";
import { encrypt } from "@/lib/crypto";
import { calculateFileHash, validateFileType } from "@/lib/file-integrity";
import { analyzeReportImage } from "@/lib/ai-detector";
import { validateCoordinates } from "@/lib/geo-validation";
import { hmacHash } from "@/lib/crypto";
import { query } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "storage", "laporan");

export async function createLaporan(input: {
  userId: number;
  wilayahId: number;
  judul: string;
  deskripsi: string;
  kategori: string;
  latitude: string | null;
  longitude: string | null;
  file: File | null;
  isPublic?: boolean;
}): Promise<ServiceResult<{ id: number }>> {
  const { userId, wilayahId, judul, deskripsi, kategori, latitude, longitude, file, isPublic = false } = input;

  if (!judul?.trim() || !deskripsi?.trim() || !kategori) {
    return { ok: false, status: 400, error: "Judul, deskripsi, dan kategori wajib diisi" };
  }
  if (judul.trim().length > 255 || deskripsi.trim().length > 4000) {
    return { ok: false, status: 400, error: "Judul maksimal 255 karakter dan deskripsi maksimal 4000 karakter" };
  }
  if (!Number.isSafeInteger(wilayahId) || wilayahId <= 0) {
    return { ok: false, status: 400, error: "Akun warga belum memiliki wilayah yang valid" };
  }
  const assignedRegion = await query("SELECT id FROM wilayah WHERE id = ? AND tipe = 'kecamatan'", [wilayahId]);
  if (!assignedRegion.rows.length) {
    return { ok: false, status: 400, error: "Wilayah akun tidak valid. Perbarui data wilayah akun sebelum melapor." };
  }
  const allowedCategories = ["Infrastruktur", "Pelayanan", "Keamanan", "Lingkungan", "Pendidikan", "Kesehatan", "Lainnya"];
  if (!allowedCategories.includes(kategori)) {
    return { ok: false, status: 400, error: "Kategori laporan tidak valid" };
  }
  if (!file || file.size === 0) {
    return { ok: false, status: 400, error: "Foto bukti wajib disertakan" };
  }

  // Coordinates are required server-side; client-side GPS checks are not trusted.
  if (!latitude || !longitude) {
    return { ok: false, status: 400, error: "Koordinat GPS wajib disertakan" };
  }
  const lat = Number(latitude);
  const lon = Number(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return { ok: false, status: 400, error: "Koordinat GPS tidak valid" };
  }
  const geoResult = validateCoordinates(lat, lon);
  if (!geoResult.valid) {
    return { ok: false, status: 400, error: geoResult.error || "Koordinat lokasi tidak valid" };
  }
  // Hash coordinates rounded to ~1 m so the database can detect repeat submissions
  // without storing a searchable plaintext location.
  const latHash = hmacHash(lat.toFixed(5));
  const lonHash = hmacHash(lon.toFixed(5));
  const recentAtPoint = await query(
    `SELECT id FROM laporan WHERE user_id = ? AND gps_lat_hash = ? AND gps_lng_hash = ?
     AND created_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE) LIMIT 1`,
    [userId, latHash, lonHash]
  );
  if (recentAtPoint.rows.length) {
    return { ok: false, status: 429, error: "Laporan dari lokasi yang sama baru saja dikirim. Coba lagi setelah 30 menit." };
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

    // 3. AI Image Anti-Spam & Screen Capture Detector
    const metadata = await sharp(buffer, { limitInputPixels: 40_000_000 }).metadata();
    const imageCheck = analyzeReportImage(buffer, file.name, metadata.width, metadata.height);
    if (!imageCheck.isAuthentic) {
      return {
        ok: false,
        status: 400,
        error: imageCheck.warning || "Foto tidak memenuhi standar keaslian laporan",
      };
    }

    // RE-ENCODE IMAGE & STRIP EXIF (prevent EXIF-based GPS spoofing)
    try {
      const sharpInstance = sharp(buffer, { limitInputPixels: 40_000_000 });
      const metadata = await sharpInstance.metadata();

      const processedImage = await sharpInstance
        .resize(1920, 1920, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85,
          mozjpeg: true,
        })
        .rotate() // Auto-rotate based on EXIF orientation, strips EXIF metadata automatically
        .toBuffer();

      // Calculate hash AFTER re-encoding (for integrity check)
      fotoHash = calculateFileHash(processedImage);

      // Generate UUID filename (prevent path traversal)
      const filename = `${crypto.randomUUID()}.jpg`; // Always .jpg after re-encoding
      
      await mkdir(UPLOAD_DIR, { recursive: true });
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

  let id: number;
  try {
    id = await insertLaporan({
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
      latitudeHash: latHash,
      longitudeHash: lonHash,
      wilayahId,
      isPublic,
    });
  } catch (error) {
    if (fotoPath) {
      const filename = path.basename(fotoPath);
      await unlink(path.join(UPLOAD_DIR, filename)).catch(() => undefined);
    }
    throw error;
  }

  return { ok: true, id };
}
