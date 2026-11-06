import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { findLaporanById } from "@/features/laporan/laporan.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { logDataEvent } from "@/features/audit/audit.service";
import { decrypt } from "@/lib/crypto";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Validate session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (!sessionId) {
      throw ApiError.unauthorized();
    }

    const sessionResult = await validateSession(sessionId);
    if (!sessionResult.valid || !sessionResult.user) {
      throw ApiError.unauthorized();
    }

    const user = sessionResult.user;
    const { id } = await params;
    const laporanId = parseInt(id);

    if (isNaN(laporanId)) {
      throw ApiError.badRequest("ID laporan tidak valid");
    }

    // RBAC: Check ownership OR wilayah access
    let wilayahIds: number[] | undefined = undefined;
    
    if (user.role === "PUSAT") {
      // PUSAT can see all reports (no wilayah filter)
      wilayahIds = undefined;
    } else if (user.role === "PEMDA") {
      // PEMDA can see reports in their kota/kabupaten
      wilayahIds = user.wilayah_id ? [user.wilayah_id] : undefined;
    } else {
      // POS/Regular user - only their own reports OR reports in their wilayah
      wilayahIds = user.wilayah_id ? [user.wilayah_id] : undefined;
    }

    // Find laporan with ownership/wilayah check
    const laporan = await findLaporanById(laporanId, user.id, wilayahIds);

    if (!laporan) {
      throw ApiError.notFound("Laporan tidak ditemukan atau Anda tidak memiliki akses");
    }

    // Decrypt sensitive fields if user has access
    let decryptedLaporan = { ...laporan };
    
    try {
      if (laporan.deskripsi_enc) {
        decryptedLaporan.deskripsi = decrypt(laporan.deskripsi_enc);
      }
      if (laporan.latitude_enc) {
        decryptedLaporan.latitude = parseFloat(decrypt(laporan.latitude_enc));
      }
      if (laporan.longitude_enc) {
        decryptedLaporan.longitude = parseFloat(decrypt(laporan.longitude_enc));
      }
    } catch (decryptError) {
      console.error("[LAPORAN] Decryption error:", decryptError);
      // Don't expose decryption errors to client
      // Return encrypted data as-is
    }

    // Audit log
    await logDataEvent({
      event_type: "laporan_read",
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      target_type: "laporan",
      target_id: id,
      ip_address: req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown",
    });

    return NextResponse.json(decryptedLaporan);
  } catch (error) {
    return handleApiError(error, `GET /api/laporan/${(await params).id}`);
  }
}
