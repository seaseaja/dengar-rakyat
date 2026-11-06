import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { createLaporan } from "@/features/laporan/laporan.service";
import { findLaporanByUser, findAllLaporan } from "@/features/laporan/laporan.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { handleApiError, ApiError } from "@/lib/error-handler";
import { checkRateLimit, RateLimits } from "@/lib/rate-limiter";
import { logDataEvent } from "@/features/audit/audit.service";

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
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");

    // Get user's own reports
    if (mine) {
      const reports = await findLaporanByUser(user.id);
      return NextResponse.json(reports);
    }

    // RBAC: Filter by role and wilayah
    let reports;
    
    if (user.role === "PUSAT") {
      // PUSAT can see ALL reports nationwide
      reports = await findAllLaporan();
    } else if (user.role === "PEMDA") {
      // PEMDA can only see reports in their kota/kabupaten
      // Get all kecamatan under this kota/kabupaten
      // TODO: Query wilayah children, for now use single wilayah
      reports = await findAllLaporan(user.wilayah_id ? [user.wilayah_id] : undefined);
    } else {
      // POS can only see reports in their kecamatan
      reports = await findAllLaporan(user.wilayah_id ? [user.wilayah_id] : undefined);
    }

    return NextResponse.json(reports);
  } catch (error) {
    return handleApiError(error, "GET /api/laporan");
  }
}

export async function POST(req: Request) {
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
    const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

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

    const result = await createLaporan({
      userId: user.id,
      wilayahId: user.wilayah_id,
      judul,
      deskripsi,
      kategori,
      latitude,
      longitude,
      file,
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
      metadata: { judul, kategori, wilayah_id: user.wilayah_id },
    });

    return NextResponse.json(
      { message: "Laporan berhasil dikirim", id: result.id }, 
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "POST /api/laporan");
  }
}