/** Run with: npx tsx scripts/verify-audit-integrity.ts */
import { verifyAuditIntegrity } from "../features/audit/audit.service";

async function main() {
  try {
    const result = await verifyAuditIntegrity();
    if (result.valid) {
      console.log("PASS: Audit payloads and chain links verified.");
      process.exit(0);
    }
    console.error("FAIL: Audit integrity is incomplete or a mismatch was found.");
    console.error(`Broken links or payload hashes: ${result.brokenLinks.length}`);
    console.error(`Legacy rows without payload-hash verification: ${result.legacyCount}`);
    for (const link of result.brokenLinks) {
      console.error(`Log ${link.id}: expected ${link.expected}, found ${link.actual}`);
    }
    process.exit(1);
  } catch (error) {
    console.error("ERROR: Audit integrity verification failed to run.", error);
    process.exit(1);
  }
}

void main();
