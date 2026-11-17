# Path Traversal Mitigation Design

## Overview

The `inspectReportFile()` function in `lib/report-files.ts` currently validates filenames using regex and `path.normalize()` checks to prevent path traversal attacks. However, security scanners flag this pattern as unsafe because path manipulation functions are inherently complex and error-prone. This design specifies a more explicit, scanner-recognizable approach using `path.relative()` to guarantee that accessed files are contained within the upload directory.

## Glossary

- **Bug_Condition (C)**: An attack attempt to access files outside the intended upload directory through path traversal (e.g., `../../../etc/passwd`)
- **Property (P)**: The fixed function SHALL only allow reading files that are demonstrably within `REPORT_UPLOAD_DIR`
- **Preservation**: Legitimate report file access must continue working identically; JPEG and PNG detection must remain unchanged; hash verification must function as before
- **REPORT_UPLOAD_DIR**: The base directory (`storage/laporan`) where all report files are stored
- **path.relative()**: Node.js path utility that returns the relative path between two paths; if target is outside base, path starts with `..`
- **Containment Check**: Verification that a resolved absolute path is within the permitted directory by confirming the relative path does not escape

## Bug Details

### Current Vulnerability

The current implementation uses multiple checks:
1. Whitelist validation: Only `[a-zA-Z0-9_.-]` characters allowed
2. Reject dots: Reject `.` and `..` as complete filenames
3. Path normalization: Compare normalized paths with prefix matching

**Problem**: Security scanners recognize `path.normalize()` as a weak defense because:
- Path normalization alone is insufficient (Windows vs Unix differences, symlinks)
- Prefix matching with `path.sep` can be bypassable in edge cases
- The combination of regex + normalize + prefix creates multiple attack surfaces

### Bug Condition

The bug manifests when an attacker provides input that bypasses the regex whitelist while still accessing files outside the directory. Although current safeguards make this difficult, scanners flag the pattern as architecturally unsound.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type string (filename from path)
  OUTPUT: boolean
  
  RETURN resolvedFilePath is outside REPORT_UPLOAD_DIR
         AND input passed all current validation checks
         AND file was successfully read from outside directory
END FUNCTION
```

### Examples

- **Example 1**: Input `../../../../etc/passwd` should be rejected (relative path escapes)
- **Example 2**: Input `valid-file.jpg` should be allowed and read correctly (legitimate file)
- **Example 3**: Input `file-with-../path.jpg` should be rejected by regex (already caught, but demonstrate non-containment)
- **Example 4**: Edge case - symlink pointing outside directory should not be followed (symlink resolution)

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Legitimate report files (JPEG/PNG) must continue to be read correctly
- Filename validation must still reject suspicious patterns
- Hash verification must work identically
- ContentType detection (JPEG vs PNG) must work as before
- Null safety: null/undefined inputs must return null as before
- Error handling: file read errors must return null as before

**Scope:**
All inputs that represent legitimate, non-traversal filenames should be completely unaffected by this fix. This includes:
- Valid JPEG report files with names like `report-123.jpg`
- Valid PNG report files with names like `evidence_abc.png`
- All existing legitimate requests should continue working

## Hypothesized Root Cause

The root cause is not a functional bug but a **recognition gap**: the current code is safe in practice, but uses a pattern (combining multiple weak checks) that security scanners do not recognize as safe. The fix is to adopt a **canonical containment approach** that:

1. **Eliminates ambiguity**: Use `path.relative()` explicitly to prove containment
2. **Scanners recognize**: The `path.relative()` pattern is a well-known, idiomatic way to verify containment
3. **Handles edge cases**: `path.relative()` naturally handles symlinks, platform differences, and normalization

## Correctness Properties

Property 1: Bug Condition - Path Traversal Prevention

_For any_ file access attempt where the requested path would resolve outside `REPORT_UPLOAD_DIR` (detected by `path.relative()` returning a path starting with `..`), the fixed `inspectReportFile()` function SHALL reject the request and return `null`, preventing unauthorized file access.

**Validates: Requirements 1.1, 1.2, 1.3**

Property 2: Preservation - Legitimate File Access

_For any_ legitimate filename that passes the whitelist regex and represents a file within `REPORT_UPLOAD_DIR`, the fixed function SHALL read the file, detect its content type, and return the buffer with metadata exactly as the original function does, preserving all working functionality.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

## Fix Implementation

### Changes Required

**File**: `lib/report-files.ts`

**Function**: `inspectReportFile()`

**Specific Changes**:

1. **Import path.relative()**: Already available through `path` module (no new imports needed)

2. **Strengthen Containment Check**:
   ```typescript
   // After path.resolve(REPORT_UPLOAD_DIR, filename)
   const relPath = path.relative(REPORT_UPLOAD_DIR, target);
   
   // Reject if relative path escapes the directory
   if (relPath.startsWith("..") || path.isAbsolute(relPath)) {
     return null;
   }
   ```

3. **Replace normalize + prefix check**:
   - Remove the `normalizedTarget.startsWith(normalizedDir + path.sep)` check
   - Replace with explicit `path.relative()` check as above

4. **Maintain regex validation**:
   - Keep the whitelist regex `/^[a-zA-Z0-9_.-]+$/` as first line of defense
   - The regex provides immediate rejection of obviously bad inputs

5. **Optional Enhancement - Prevent symlink escape** (if strict mode desired):
   ```typescript
   // Use realpath to resolve symlinks before containment check
   const realTarget = path.resolve(await fs.realpath(target));
   const realDir = path.resolve(await fs.realpath(REPORT_UPLOAD_DIR));
   const relPath = path.relative(realDir, realTarget);
   if (relPath.startsWith("..") || path.isAbsolute(relPath)) {
     return null;
   }
   ```
   Note: This requires async realpath; use with caution for performance.

### Advantages of This Approach

- **Scanner Recognition**: `path.relative()` is the canonical idiomatic approach security tools expect
- **Explicit Intent**: The check directly proves containment through relative path inspection
- **Platform-Safe**: Handles Windows/Unix path differences naturally
- **Symlink-Safe** (optional): realpath version prevents symlink-based escape
- **Simple Logic**: Easier to reason about than combining multiple checks
- **No Regex Bypass Risk**: Even if regex were bypassed, containment check catches it

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate path traversal attacks on the original code (to confirm the scanner's concern is valid), then verify the fix works correctly and preserves legitimate file access.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate path traversal vulnerabilities (or confirm current safety) before implementing the fix. This validates whether the vulnerability is theoretical or practical.

**Test Plan**: Write tests that attempt path traversal attacks (using `..` sequences, absolute paths, symlinks) and verify that the function rejects them. Run these on the current code to confirm rejection.

**Test Cases**:
1. **Direct Traversal Attack**: Input `/uploads/laporan/../../etc/passwd` (will be rejected by regex)
2. **Encoded Traversal**: Input `/uploads/laporan/..%2Fetc%2Fpasswd` (will be rejected by regex)
3. **Double-Encoded**: Input `/uploads/laporan/....//etc/passwd` (will be rejected by regex)
4. **Null Byte Injection**: Input `/uploads/laporan/file.jpg\x00../../../etc/passwd` (will be rejected by regex)
5. **Symlink Escape** (edge case): Create symlink pointing outside directory, try to access it

**Expected Counterexamples**:
- Current code rejects all traversal attempts through regex (as expected)
- Confirms the current code is functionally safe
- Scanner concern is about pattern recognition, not actual vulnerability

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds (traversal attempts), the fixed function produces the expected behavior (rejection).

**Pseudocode:**
```
FOR ALL traversalAttempt IN ["/uploads/laporan/../../etc/passwd", symlink pointing outside] DO
  result := inspectReportFile_fixed(traversalAttempt)
  ASSERT result == null
END FOR
```

### Preservation Checking

**Goal**: Verify that for all legitimate filenames, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL legitimateFile IN [valid JPEG paths, valid PNG paths] DO
  originalResult := inspectReportFile_original(legitimateFile)
  fixedResult := inspectReportFile_fixed(legitimateFile)
  ASSERT originalResult.buffer == fixedResult.buffer
  ASSERT originalResult.contentType == fixedResult.contentType
  ASSERT originalResult.integrityValid == fixedResult.integrityValid
END FOR
```

**Testing Approach**: Property-based testing can generate random valid filenames and verify they produce identical results.

**Test Plan**: 
- Observe behavior on current code for legitimate files
- Write property-based tests generating valid filenames within the directory
- Verify fixed code produces identical results

**Test Cases**:
1. **Valid JPEG Access**: File exists, is JPEG, correct content-type returned
2. **Valid PNG Access**: File exists, is PNG, correct content-type returned
3. **Hash Verification**: Hash verification works identically in fixed version
4. **Non-existent File**: Both versions return null for non-existent files
5. **Invalid Content**: Both versions return null for files with invalid magic bytes
6. **Edge Case Filenames**: Files with dots, underscores, hyphens (within whitelist) work identically

### Unit Tests

- Test that `path.relative()` correctly detects traversal attempts
- Test that `path.relative()` correctly allows legitimate files
- Test that regex validation still works as first-pass filter
- Test edge cases: empty filename, dot filename, filename boundary conditions
- Test symlink handling (if enhanced version used)

### Property-Based Tests

- Generate random valid filenames and verify they are accessible
- Generate random traversal patterns and verify they are rejected
- Test that all legitimate files produce identical results before/after fix

### Integration Tests

- Full report file access workflow must continue working
- Integrity verification must continue working
- All existing tests in test suite must pass

