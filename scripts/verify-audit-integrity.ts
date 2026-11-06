/**
 * Verify Audit Log Integrity Script
 * 
 * Run with: npx tsx scripts/verify-audit-integrity.ts
 */

import { verifyAuditIntegrity } from "../features/audit/audit.service";

async function main() {
  console.log("🔍 Verifying audit log integrity...\n");

  try {
    const result = await verifyAuditIntegrity();

    if (result.valid) {
      console.log("✅ PASS: Audit log integrity verified");
      console.log("   No tampering detected\n");
      process.exit(0);
    } else {
      console.log("❌ FAIL: Audit log tampering detected\n");
      console.log(`   Found ${result.brokenLinks.length} broken link(s):\n`);

      for (const link of result.brokenLinks) {
        console.log(`   - Log ID ${link.id}:`);
        console.log(`     Expected hash: ${link.expected}`);
        console.log(`     Actual hash:   ${link.actual}`);
        console.log();
      }

      console.log("   Integrity: BROKEN\n");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ ERROR: Failed to verify audit log integrity");
    console.error(error);
    process.exit(1);
  }
}

main();
