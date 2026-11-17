# Implementation Plan: Path Traversal in Report File Access

## Overview
Fix the path traversal vulnerability in `lib/report-files.ts` by replacing `path.normalize()` prefix matching with `path.relative()` check to satisfy security scanners while preserving all existing functionality.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "tasks": [1]
    },
    {
      "tasks": [2]
    },
    {
      "tasks": [3, 4]
    }
  ]
}
```

**Task Flow:**
1. Write bug condition exploration test
2. Write preservation property tests
3. Fix path traversal vulnerability
   - 3.1 Implement the fix using path.relative() containment check
   - 3.2 Verify bug condition exploration test now passes
   - 3.3 Verify preservation tests still pass
4. Checkpoint - Ensure all tests pass

## Tasks

---

## Phase 1: Exploration Tests

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Path Traversal Detection
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the vulnerability is exploitable
  - **GOAL**: Demonstrate that path traversal sequences can escape the upload directory with current implementation
  - Test implementation details from Bug Condition in design (1.1, 1.2)
  - The test assertions should verify current behavior allows directory escape (expected: FAIL)
  - Run test on UNFIXED code in `lib/report-files.ts`
  - **EXPECTED OUTCOME**: Test FAILS (this confirms the vulnerability exists)
  - Document counterexamples found:
    - `storedPath="/uploads/laporan/../../../etc/passwd"` - attempt to escape directory
    - `storedPath="/uploads/laporan/..\\..\\..\\windows\\system32\\drivers\\etc\\hosts"` - Windows-style escape
    - `storedPath="/uploads/laporan/.."` - parent directory reference
  - _Requirements: 1.1, 1.2_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Valid File Access
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for valid, non-traversal filenames:
    - `storedPath="/uploads/laporan/report-123.jpg"` → returns buffer with content type
    - `storedPath="/uploads/laporan/photo_2024_01_15.png"` → returns buffer with content type
    - `storedPath="/uploads/laporan/file-name_v2.jpg"` → returns buffer (alphanumeric, dots, underscores, hyphens allowed)
  - Write property-based tests capturing observed behavior from Preservation Requirements (3.1-3.5)
  - Test that valid filenames matching regex pattern continue to work after fix
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (confirms baseline behavior to preserve)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

---

## Phase 2: Implementation

- [ ] 3. Fix path traversal vulnerability in `lib/report-files.ts`

  - [ ] 3.1 Implement the fix using path.relative() containment check
    - Replace line 17-18 (path.normalize() + startsWith check) with path.relative() validation
    - Add guard clause: compute `relative = path.relative(REPORT_UPLOAD_DIR, target)`
    - Reject if relative contains ".." prefix (indicates escape attempt)
    - Reject if relative is absolute path (isAbsolute check)
    - Keep regex validation `/^[a-zA-Z0-9_.-]+$/` as first-pass filter
    - Return null when path containment check fails
    - _Bug_Condition: storedPath contains traversal sequences like "../", "..", or absolute paths_
    - _Expected_Behavior: path.relative() returns string starting with ".." when escape is attempted; reject and return null_
    - _Preservation: Valid filenames continue to work; null returns for invalid paths unchanged_
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Path Traversal is Rejected
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encoded the expected behavior (traversal attempts return null)
    - When this test passes, it confirms traversal attempts are properly rejected
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms path traversal is mitigated)
    - Verify all counterexamples from step 1 now return null:
      - `inspectReportFile("/uploads/laporan/../../../etc/passwd")` → null
      - `inspectReportFile("/uploads/laporan/..\\..\\..\\windows\\system32\\drivers\\etc\\hosts")` → null
      - `inspectReportFile("/uploads/laporan/..")` → null
    - _Requirements: 2.1, 2.2_

  - [ ] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Valid Files Still Accessible
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Verify all valid filenames from step 2 still work:
      - `inspectReportFile("/uploads/laporan/report-123.jpg")` → returns buffer
      - `inspectReportFile("/uploads/laporan/photo_2024_01_15.png")` → returns buffer
      - `inspectReportFile("/uploads/laporan/file-name_v2.jpg")` → returns buffer
    - Confirm all edge cases still pass:
      - Null/undefined storedPath returns null
      - Wrong path prefix returns null
      - Non-existent files return null
      - Non-JPEG/PNG files return null
      - Integrity hash validation works correctly

---

## Phase 3: Validation & Testing


## Notes

- Security scanner (Semgrep) currently flags path traversal vulnerability due to path.normalize() approach
- Using path.relative() is the standard Go/Python approach for path containment verification
- All regex validation and content-type checks preserved
- No changes to file integrity validation or hash verification
- All edge cases (null paths, missing files, invalid types) remain unchanged
