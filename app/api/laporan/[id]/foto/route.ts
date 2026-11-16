import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/features/auth/session.service";
import { findLaporanById } from "@/features/laporan/laporan.queries";
import { getWilayahTreeIds } from "@/features/wilayah/territory.queries";
import { SESSION_COOKIE_NAME } from "@/lib/cookies";
import { inspectReportFile } from "@/lib/report-files";
import { logDataEvent } from "@/features/audit/audit.service";
import { getClientIP } from "@/lib/request-context";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await validateSession(sessionId);
  if (!session.valid || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const reportId = Number(id);
  if (!Number.isSafeInteger(reportId) || reportId <= 0) {
    return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
  }

  const user = session.user;
  const role = (user.role || "").toLowerCase();
  const isPusat = role === "pusat";
  const isStaff = ["petugas_pos", "pos", "admin_pemda", "pemda"].includes(role);
  if (role !== "warga" && !isStaff && !isPusat) {
    return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });
  }

  const wilayahIds = isStaff && user.wilayah_id
    ? await getWilayahTreeIds(user.wilayah_id)
    : role === "warga" ? [] : undefined;
  const report = await findLaporanById(reportId, user.id, wilayahIds, isPusat);
  if (!report) return NextResponse.json({ error: "Laporan tidak ditemukan" }, { status: 404 });

  const slot = new URL(req.url).searchParams.get("slot");
  const storedPath = slot === "before" ? report.foto_path : slot === "after" ? report.foto_hasil_path : null;
  const expectedHash = slot === "before" ? report.foto_hash : slot === "after" ? report.foto_hasil_hash : null;
  if (!storedPath) return NextResponse.json({ error: "Foto tidak ditemukan" }, { status: 404 });

  const image = await inspectReportFile(storedPath, expectedHash);
  if (!image) return NextResponse.json({ error: "Berkas foto tidak tersedia atau formatnya tidak valid" }, { status: 404 });
  if (expectedHash && !image.integrityValid) {
    return NextResponse.json({ error: "Integritas berkas foto gagal diverifikasi" }, { status: 409 });
  }

  await logDataEvent({
    event_type: "laporan_read",
    user_id: user.id,
    user_email: user.email,
    user_role: user.role,
    target_type: "laporan_foto",
    target_id: `${reportId}:${slot}`,
    ip_address: getClientIP(req),
    metadata: { slot },
  });

  return new NextResponse(new Uint8Array(image.buffer), {
    status: 200,
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.buffer.byteLength),
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Report-Image-Integrity": image.integrityValid ? "verified" : "unverified",
    },
  });
}
