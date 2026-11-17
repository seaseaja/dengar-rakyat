import { readFile } from "fs/promises";
import path from "path";
import { calculateFileHash, verifyFileHash } from "@/lib/file-integrity";

const REPORT_UPLOAD_DIR = path.resolve(process.cwd(), "storage", "laporan");

/**
 * Safely inspect a report file with strict path traversal prevention.
 * Only allows alphanumeric filenames with dots, underscores, and hyphens.
 * No path separators or traversal sequences permitted.
 */
export async function inspectReportFile(
  storedPath: string | null | undefined,
  expectedHash?: string | null
): Promise<{ buffer: Buffer; contentType: "image/jpeg" | "image/png"; integrityValid: boolean } | null> {
  // Early rejection for invalid inputs
  if (!storedPath || typeof storedPath !== "string") return null;
  if (!storedPath.startsWith("/uploads/laporan/")) return null;
  
  // Extract filename from path prefix
  const filename = storedPath.slice("/uploads/laporan/".length);
  
  // Validate filename: must be non-empty, single component, safe characters only
  if (!filename || !filename.length) return null;
  if (filename === "." || filename === "..") return null;
  
  // Reject if contains path separators (both Unix and Windows)
  if (filename.includes("/") || filename.includes("\\")) return null;
  
  // Whitelist: only alphanumeric, dots, underscores, hyphens allowed
  // This prevents ANY traversal attempt in the filename itself
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return null;
  
  // Build safe path - filename is already validated as safe
  const safeName = filename;
  const target = `${REPORT_UPLOAD_DIR}/${safeName}`;
  
  try {
    const buffer = await readFile(target);
    let contentType: "image/jpeg" | "image/png";
    
    // Validate file magic bytes
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      contentType = "image/jpeg";
    } else if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) {
      contentType = "image/png";
    } else {
      return null;
    }

    const integrityValid = expectedHash ? verifyFileHash(calculateFileHash(buffer), expectedHash) : false;
    return { buffer, contentType, integrityValid };
  } catch {
    return null;
  }
}
