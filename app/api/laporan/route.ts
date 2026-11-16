import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { createLaporan } from "@/features/laporan/laporan.service";
import { findLaporanByUser, findAllLaporan } from "@/features/laporan/laporan.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { checkRateLimit, RateLimits } from "@/lib/rate-limiter";
import { logDataEvent } from "@/features/audit/audit.service";
import { validateCsrfToken } from "@/lib/csrf";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { getClientIP } from "@/lib/request-context";

export async function GET(req: Request) {
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
    const role = (user.role || "").toLowerCase();
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");
    const requestedLimit = Number(searchParams.get("limit"));
    const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 100)
      : 100;
    const requestedOffset = Number(searchParams.get("offset"));
    const offset = Number.isSafeInteger(requestedOffset) && requestedOffset > 0 ? Math.min(requestedOffset, 1_000_000) : 0;

    // Get user's own reports
    if (mine && role !== "warga") {
      throw ApiError.forbidden("Daftar laporan pribadi hanya tersedia untuk akun warga");
    }
    if (role === "warga") {
      const reports = await findLaporanByUser(user.id, undefined, limit, offset);
      return NextResponse.json(reports);
    }

    // RBAC: Filter by role and wilayah
    let reports: Awaited<ReturnType<typeof findAllLaporan>> = [];
    if (role === "pusat") {
      // PUSAT can see ALL reports nationwide
      reports = await findAllLaporan(undefined, limit, offset);
    } else if (role === "admin_pemda" || role === "pemda") {
      const scope = user.wilayah_id ? await getWilayahTreeIds(user.wilayah_id) : [];
      reports = await findAllLaporan(scope, limit, offset);
    } else if (role === "petugas_pos" || role === "pos") {
      const scope = user.wilayah_id ? await getWilayahTreeIds(user.wilayah_id) : [];
      reports = await findAllLaporan(scope, limit, offset);
    } else {
      reports = [];
    }

    return NextResponse.json(reports);
  } catch (error) {
    return handleApiError(error, "GET /api/laporan");
  }
}

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > 12 * 1024 * 1024) {
      throw ApiError.badRequest("Ukuran permintaan maksimal 12MB");
    }
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

    const csrfResult = validateCsrfToken(req.headers.get("x-csrf-token") || "", sessionId);
    if (!csrfResult.valid) throw ApiError.forbidden(`CSRF token invalid: ${csrfResult.reason}`);

    const user = sessionResult.user;
    if (user.role !== "warga") {
      throw ApiError.forbidden("Hanya akun warga yang dapat membuat laporan");
    }
    if (!user.wilayah_id) {
      throw ApiError.badRequest("Akun warga belum terhubung ke kecamatan. Lengkapi wilayah akun sebelum membuat laporan.");
    }
    const ip = getClientIP(req);

    // Rate limit: Max 10 reports per day per user (prevent spam)
    try {
      const rateLimit = checkRateLimit(
        `laporan:create:${user.id}`,
        RateLimits.LAPORAN_CREATE.maxAttempts,
        RateLimits.LAPORAN_CREATE.windowMs
      );

      if (!rateLimit.allowed) {
        throw new ApiError(
          `Batas pembuatan laporan tercapai (maksimal 10 per hari). Coba lagi besok.`,
          429,
          "RATE_LIMITED"
        );
      }
    } catch (rateLimitError) {
      // FAIL-CLOSED: If rate limiter fails, deny request
      if (rateLimitError instanceof ApiError) throw rateLimitError;
      throw ApiError.internal("Layanan tidak tersedia");
    }

    const formData = await req.formData();
    const judul = String(formData.get("judul") ?? "");
    const deskripsi = String(formData.get("deskripsi") ?? "");
    const kategori = String(formData.get("kategori") ?? "");
    const latitude = formData.get("latitude") as string | null;
    const longitude = formData.get("longitude") as string | null;
    const file = formData.get("foto") as File | null;
    const isPublic = formData.get("is_public") === "true";

    const result = await createLaporan({
      userId: user.id,
      wilayahId: user.wilayah_id,
      judul,
      deskripsi,
      kategori,
      latitude,
      longitude,
      file,
      isPublic,
    });

    if (!result.ok) {
      throw new ApiError(result.error || "Gagal membuat laporan", result.status || 400);
    }

    // Audit log
    await logDataEvent({
      event_type: "laporan_create",
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      target_type: "laporan",
      target_id: String(result.id),
      ip_address: ip,
      metadata: { kategori, wilayah_id: user.wilayah_id },
    });

    return NextResponse.json(
      { message: "Laporan berhasil dikirim", id: result.id }, 
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "POST /api/laporan");
  }
}
