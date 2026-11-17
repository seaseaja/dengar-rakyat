# Bugfix Requirements: Path Traversal in Report File Access

## Introduction

The `inspectReportFile()` function in `lib/report-files.ts` contains a path traversal vulnerability. Although the code includes filename validation with regex `/^[a-zA-Z0-9_.-]+$/` and performs path normalization checks, security scanners (Semgrep) continue to flag it as unsafe. The current validation and containment checks are not recognized as sufficient mitigations by automated security tools. This bugfix ensures security scanners accept the implementation while maintaining existing functionality.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a filename containing path traversal sequences (e.g., "../", "..\\") is provided THEN the security scanner flags the code as vulnerable to path traversal even though runtime validation prevents the attack

1.2 WHEN the filename passes the regex validation but contains unusual patterns THEN the path containment check using `path.normalize()` may not satisfy security analysis tools

### Expected Behavior (Correct)

2.1 WHEN a filename is provided THEN the system SHALL use a path containment verification approach that explicitly prevents any resolved path from escaping the upload directory and is recognized by security scanners as safe

2.2 WHEN an attacker attempts path traversal using sequences like "../" or absolute paths THEN the system SHALL reject the request and return null without attempting file access

2.3 WHEN a legitimate filename passing validation is provided THEN the system SHALL successfully read and return the file with correct content type detection

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a valid filename is provided (alphanumeric, dots, underscores, hyphens) THEN the system SHALL CONTINUE TO read the file and return the buffer with correct content type detection

3.2 WHEN the stored path does not start with "/uploads/laporan/" THEN the system SHALL CONTINUE TO return null immediately

3.3 WHEN the file does not exist or cannot be read THEN the system SHALL CONTINUE TO return null

3.4 WHEN the file is not a valid JPEG or PNG THEN the system SHALL CONTINUE TO return null

3.5 WHEN an integrity hash is provided THEN the system SHALL CONTINUE TO validate and return the integrity check result
