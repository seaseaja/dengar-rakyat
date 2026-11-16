import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { findLaporanById, findStatusHistory } from "@/features/laporan/laporan.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { logDataEvent } from "@/features/audit/audit.service";
import { decrypt } from "@/lib/crypto";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { inspectReportFile } from "@/lib/report-files";
import { getClientIP } from "@/lib/request-context";

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
    const laporanId = Number.parseInt(id);

    if (Number.isNaN(laporanId)) {
      throw ApiError.badRequest("ID laporan tidak valid");
    }

    // RBAC: Check ownership OR wilayah access
    let wilayahIds: number[] | undefined = undefined;
    const role = (user.role || "").toLowerCase();
    
    const isPusat = role === "pusat";
    if (isPusat) {
      // PUSAT can see all reports (no wilayah filter)
      wilayahIds = undefined;
    } else if (role === "admin_pemda" || role === "pemda") {
      wilayahIds = user.wilayah_id ? await getWilayahTreeIds(user.wilayah_id) : [];
    } else if (role === "petugas_pos" || role === "pos") {
      // Staff roles can access reports in their assigned wilayah.
      wilayahIds = user.wilayah_id ? await getWilayahTreeIds(user.wilayah_id) : [];
    } else {
      // Warga can only access their own reports.
      wilayahIds = undefined;
    }

    // Find laporan with ownership/wilayah check
    const laporan = await findLaporanById(laporanId, user.id, wilayahIds, isPusat);

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
        decryptedLaporan.latitude = Number.parseFloat(decrypt(laporan.latitude_enc));
      }
      if (laporan.longitude_enc) {
        decryptedLaporan.longitude = Number.parseFloat(decrypt(laporan.longitude_enc));
      }
    } catch (decryptError) {
      console.error("[LAPORAN] Decryption error:", decryptError);
      // Don't expose decryption errors to client
      // Return encrypted data as-is
    }

    Object.assign(decryptedLaporan, {
      foto_integrity_valid: (await inspectReportFile(laporan.foto_path, laporan.foto_hash))?.integrityValid ?? false,
      foto_hasil_integrity_valid: (await inspectReportFile(laporan.foto_hasil_path, laporan.foto_hasil_hash))?.integrityValid ?? false,
    });

    // Audit log
    await logDataEvent({
      event_type: "laporan_read",
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      target_type: "laporan",
      target_id: id,
      ip_address: getClientIP(req),
    });

    const statusHistory = await findStatusHistory(laporanId);
    return NextResponse.json({ ...decryptedLaporan, status_history: statusHistory });
  } catch (error) {
    return handleApiError(error, `GET /api/laporan/${(await params).id}`);
  }
}
