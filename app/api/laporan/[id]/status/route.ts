import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { updateStatusLaporan } from "@/features/laporan/status.service";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { logDataEvent } from "@/features/audit/audit.service";
import { validateCsrfToken, extractCsrfToken } from "@/lib/csrf";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { getClientIP } from "@/lib/request-context";

async function handleStatusUpdate(
  req: Request,
  params: Promise<{ id: string }>
) {
  try {
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
    const role = (user.role || "").toLowerCase();

    // RBAC: Only admin_pemda, petugas_pos, and pusat can update report status
    if (!["admin_pemda", "pemda", "petugas_pos", "pos", "pusat"].includes(role)) {
      throw ApiError.forbidden("Hanya Petugas Pos, Pemda, dan Pusat yang berwenang mengubah status laporan");
    }

    // CSRF validation
    const csrfToken = extractCsrfToken(headersList);
    const csrfResult = validateCsrfToken(csrfToken || "", sessionId);
    if (!csrfResult.valid) {
      throw ApiError.forbidden(`CSRF token invalid: ${csrfResult.reason}`);
    }

    const { id } = await params;
    const laporanId = Number.parseInt(id, 10);
    if (Number.isNaN(laporanId)) {
      throw ApiError.badRequest("ID laporan tidak valid");
    }
    const contentLength = Number(req.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > 6 * 1024 * 1024) {
      throw ApiError.badRequest("Ukuran permintaan maksimal 6MB");
    }

    // Parse either FormData or JSON
    let statusBaru = "";
    let catatan = "";
    let fotoHasil: File | null = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const statusValue = formData.get("status");
      const noteValue = formData.get("catatan");
      statusBaru = typeof statusValue === "string" ? statusValue : "";
      catatan = typeof noteValue === "string" ? noteValue : "";
      const file = formData.get("fotoHasil");
      if (file instanceof File) {
        fotoHasil = file;
      }
    } else {
      const body = await req.json();
      statusBaru = typeof body?.status === "string" ? body.status : "";
      catatan = typeof body?.catatan === "string" ? body.catatan : "";
    }

    // Normalize common statuses if uppercase sent
    const statusMap: Record<string, string> = {
      BARU: "Diterima",
      DITERIMA: "Diterima",
      DIVERIFIKASI: "Diverifikasi",
      DIPROSES: "Diproses",
      SELESAI: "Selesai",
    };
    if (statusMap[statusBaru.toUpperCase()]) {
      statusBaru = statusMap[statusBaru.toUpperCase()];
    }

    const result = await updateStatusLaporan({
      laporanId,
      statusBaru,
      diubahOleh: user.id,
      catatan,
      fotoHasil,
      wilayahIds: role === "pusat" ? undefined : (user.wilayah_id ? await getWilayahTreeIds(user.wilayah_id) : []),
      allowAllWilayah: role === "pusat",
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    // Audit log
    await logDataEvent({
      event_type: "status_update",
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      target_type: "laporan",
      target_id: id,
      ip_address: getClientIP(req),
      metadata: { status: statusBaru },
    });

    return NextResponse.json({
      message: result.message,
      status: statusBaru,
      fotoHasilPath: result.fotoHasilPath,
    });
  } catch (error) {
    return handleApiError(error, `Status update for report`);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return handleStatusUpdate(req, params);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return handleStatusUpdate(req, params);
}
