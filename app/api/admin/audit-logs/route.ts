import { NextResponse } from "next/server";
import { getCurrentUser } from "@/features/auth/session.service";
import { getAuditLogs, verifyAuditIntegrity } from "@/features/audit/audit.service";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (user.role || "").toLowerCase();
    if (role !== "pusat") {
      return NextResponse.json(
        { error: "Akses terlarang: Hanya Admin Pusat yang dapat mengakses Audit Trail Keamanan" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const requestedLimit = Number(searchParams.get("limit"));
    const limit = Number.isSafeInteger(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, 100) : 25;
    const checkIntegrity = searchParams.get("checkIntegrity") === "1";

    const logs = await getAuditLogs({ limit });

    let integrityResult = null;
    if (checkIntegrity) {
      integrityResult = await verifyAuditIntegrity();
    }

    return NextResponse.json({
      logs,
      integrity: integrityResult ?? { checked: false, valid: null, brokenLinks: [], legacyCount: null },
    });
  } catch (error) {
    console.error("[AUDIT API] Error:", error);
    return NextResponse.json({ error: "Gagal memuat audit log" }, { status: 500 });
  }
}
