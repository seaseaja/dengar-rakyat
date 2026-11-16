import { readFile } from "fs/promises";
import path from "path";
import { calculateFileHash, verifyFileHash } from "@/lib/file-integrity";

const REPORT_UPLOAD_DIR = path.resolve(process.cwd(), "storage", "laporan");

export async function inspectReportFile(
  storedPath: string | null | undefined,
  expectedHash?: string | null
): Promise<{ buffer: Buffer; contentType: "image/jpeg" | "image/png"; integrityValid: boolean } | null> {
  if (!storedPath || !storedPath.startsWith("/uploads/laporan/")) return null;
  const filename = storedPath.slice("/uploads/laporan/".length);
  if (!filename || filename === "." || filename === ".." || filename.includes("/") || filename.includes("\\")) return null;

  const target = path.resolve(REPORT_UPLOAD_DIR, filename);
  if (!target.startsWith(`${REPORT_UPLOAD_DIR}${path.sep}`)) return null;

  try {
    const buffer = await readFile(target);
    let contentType: "image/jpeg" | "image/png";
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) contentType = "image/jpeg";
    else if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) contentType = "image/png";
    else return null;

    const integrityValid = expectedHash ? verifyFileHash(calculateFileHash(buffer), expectedHash) : false;
    return { buffer, contentType, integrityValid };
  } catch {
    return null;
  }
}
