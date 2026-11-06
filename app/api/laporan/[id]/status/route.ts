import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { updateLaporanStatus } from "@/features/laporan/laporan.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { logDataEvent } from "@/features/audit/audit.service";
import { validateCSRFToken, extractCsrfToken } from "@/lib/csrf";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Validate session
    const cookieStore = await cookies();
    const headersList = await headers();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (!sessionId) {
      throw ApiError.unauthorized();
    }

    const sessionResult = await validateSession(sessionId);
    if (!sessionResult.valid || !sessionResult.user) {
      throw ApiError.unauthorized();
    }

    const user = sessionResult.user;

    // RBAC: Only PEMDA and PUSAT can update status
    if (!["PEMDA", "PUSAT"].includes(user.role)) {
      throw ApiError.forbidden("Hanya PEMDA dan PUSAT yang dapat mengubah status laporan");
    }

    // CSRF validation
    const csrfToken = extractCsrfToken(headersList, undefined);
    if (!csrfToken) {
      throw ApiError.forbidden("CSRF token missing");
    }

    const csrfResult = validateCSRFToken(csrfToken, sessionId);
    if (!csrfResult.valid) {
      throw ApiError.forbidden(`CSRF token invalid: ${csrfResult.reason}`);
    }

    const { id } = await params;
    const laporanId = parseInt(id);

    if (isNaN(laporanId)) {
      throw ApiError.badRequest("ID laporan tidak valid");
    }

    const body = await req.json();
    const { status } = body;

    // Validate status value
    const validStatuses = ["BARU", "DIPROSES", "SELESAI", "DITOLAK"];
    if (!validStatuses.includes(status)) {
      throw ApiError.badRequest(`Status tidak valid. Pilihan: ${validStatuses.join(", ")}`);
    }

    // RBAC: Filter by wilayah (PEMDA can only update reports in their wilayah)
    let wilayahIds: number[] | undefined = undefined;
    
    if (user.role === "PEMDA") {
      // PEMDA can only update reports in their kota/kabupaten
      wilayahIds = user.wilayah_id ? [user.wilayah_id] : undefined;
    }
    // PUSAT can update any report (no wilayah filter)

    // Update status (with wilayah check for PEMDA)
    const updated = await updateLaporanStatus(laporanId, status, wilayahIds);

    if (!updated) {
      throw ApiError.notFound("Laporan tidak ditemukan atau Anda tidak memiliki akses");
    }

    // Audit log
    await logDataEvent({
      event_type: "status_update",
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      target_type: "laporan",
      target_id: id,
      ip_address: headersList.get("x-forwarded-for")?.split(",")[0].trim() || "unknown",
      metadata: { old_status: "unknown", new_status: status }, // TODO: Get old status
    });

    return NextResponse.json({ 
      message: "Status laporan berhasil diperbarui",
      status 
    });
  } catch (error) {
    return handleApiError(error, `PUT /api/laporan/${(await params).id}/status`);
  }
}
