# Implementation Plan: SQL Injection in Schema Alignment Script

## Overview
Fix SQL injection vulnerabilities in `scripts/align-legacy-schema.js` by creating enums for index and trigger definitions and refactoring `addIndex()` and `createTrigger()` functions to use enum lookups with validation instead of dynamic SQL concatenation.

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
      "tasks": [3]
    },
    {
      "tasks": [4]
    },
    {
      "tasks": [5]
    },
    {
      "tasks": [6]
    },
    {
      "tasks": [7]
    }
  ]
}
```

**Task Flow:**
1. Write bug condition exploration test
2. Write preservation property tests
3. Create enums and refactor addIndex()
   - 3.1 Create INDEX_DEFINITIONS enum
   - 3.2 Refactor addIndex() to use enum lookup
   - 3.3 Update all addIndex() call sites
4. Create enums and refactor createTrigger()
   - 4.1 Create TRIGGER_DEFINITIONS enum
   - 4.2 Refactor createTrigger() to use enum lookup
   - 4.3 Update all createTrigger() call sites in main()
5. Verify bug condition exploration test now passes
6. Verify preservation tests still pass
7. Checkpoint - Ensure all tests pass and security is confirmed

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Dynamic SQL String Concatenation
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms vulnerability is present
  - **GOAL**: Demonstrate that security scanners detect dynamic SQL concatenation in current code
  - Test implementation details from Bug Condition in design (1.1, 1.2)
  - The test assertions should verify dynamic SQL patterns trigger security warnings (expected: FAIL)
  - Run test on UNFIXED code in `scripts/align-legacy-schema.js`
  - **EXPECTED OUTCOME**: Test FAILS (this confirms security vulnerability exists)
  - Document counterexamples found:
    - `addIndex()` line 66: uses `await connection.query(\`ALTER TABLE ?? ADD ${definition}\`, ...)`
    - `createTrigger()` line 280: uses `await connection.query(sql)` with dynamic trigger SQL
  - Verify security scanner flags:
    - `addIndex()` function for dynamic SQL concatenation
    - `createTrigger()` function for string interpolation vulnerability
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Index and Trigger Creation Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for all valid index/trigger operations:
    - Index creation operations succeed and create correct structures
    - Trigger creation operations succeed and enforce append-only behavior
    - Skipping already-existing indices/triggers works correctly
    - All 8 indices are created with correct definitions
    - All 4 triggers are created with correct logic
    - `alignUsers()` creates UNIQUE KEY uq_users_nik_hash (nik_hash)
    - `alignSessions()` creates KEY idx_sessions_expires (expires_at)
    - `alignSessions()` creates KEY idx_sessions_activity (last_activity_at)
    - `alignLaporan()` creates KEY idx_laporan_geo_repeat (user_id, gps_lat_hash, gps_lng_hash, created_at)
    - `alignLaporan()` creates KEY idx_laporan_public_created (is_public, created_at)
    - `alignStatusHistory()` creates KEY idx_status_history_report_created (laporan_id, created_at)
    - `alignPasswordResets()` creates UNIQUE KEY uq_password_resets_token_hash (token_hash)
    - `alignWilayah()` creates KEY idx_wilayah_tipe_parent (tipe, parent_id)
    - All 4 triggers created: status_history_reject_update, status_history_reject_delete, audit_logs_reject_update, audit_logs_reject_delete
    - Triggers reject UPDATE/DELETE operations on append-only tables
  - Write property-based tests capturing observed behavior from Preservation Requirements (3.1-3.5)
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (confirms baseline behavior to preserve)
  - Document observed results:
    - All indices created successfully
    - All triggers created successfully and functional
    - Main script output shows correct user and wilayah counts
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3. Create enums and refactor addIndex()

  - [ ] 3.1 Create INDEX_DEFINITIONS enum
    - Define all 8 index definitions as constants (no string interpolation):
      - `UNIQUE_USERS_NIK_HASH = "UNIQUE KEY uq_users_nik_hash (nik_hash)"`
      - `IDX_SESSIONS_EXPIRES = "KEY idx_sessions_expires (expires_at)"`
      - `IDX_SESSIONS_ACTIVITY = "KEY idx_sessions_activity (last_activity_at)"`
      - `IDX_LAPORAN_GEO_REPEAT = "KEY idx_laporan_geo_repeat (user_id, gps_lat_hash, gps_lng_hash, created_at)"`
      - `IDX_LAPORAN_PUBLIC_CREATED = "KEY idx_laporan_public_created (is_public, created_at)"`
      - `IDX_STATUS_HISTORY_REPORT = "KEY idx_status_history_report_created (laporan_id, created_at)"`
      - `UNIQUE_PASSWORD_RESETS_TOKEN = "UNIQUE KEY uq_password_resets_token_hash (token_hash)"`
      - `IDX_WILAYAH_TIPE_PARENT = "KEY idx_wilayah_tipe_parent (tipe, parent_id)"`
    - Place enum near top of file after helper functions
    - _Requirements: 2.1_

  - [ ] 3.2 Refactor addIndex() to use enum lookup
    - Change signature: `async function addIndex(connection, table, indexKey)`
    - `indexKey` is enum key (e.g., INDEX_DEFINITIONS.UNIQUE_USERS_NIK_HASH)
    - Add validation: verify indexKey exists in INDEX_DEFINITIONS
    - Lookup definition: `const definition = INDEX_DEFINITIONS[indexKey]`
    - If indexKey not found in enum, throw error
    - Use parameterized query: `await connection.query(\`ALTER TABLE ?? ADD ${definition}\`, [table])`
    - Keep existing index existence check
    - Document that all index definitions are static
    - _Requirements: 2.1, 2.3_

  - [ ] 3.3 Update all addIndex() call sites (8 total)
    - `alignUsers()`: change to use `INDEX_DEFINITIONS.UNIQUE_USERS_NIK_HASH` key
    - `alignSessions()`: change to use `INDEX_DEFINITIONS.IDX_SESSIONS_EXPIRES` key
    - `alignSessions()`: change to use `INDEX_DEFINITIONS.IDX_SESSIONS_ACTIVITY` key
    - `alignLaporan()`: change to use `INDEX_DEFINITIONS.IDX_LAPORAN_GEO_REPEAT` key
    - `alignLaporan()`: change to use `INDEX_DEFINITIONS.IDX_LAPORAN_PUBLIC_CREATED` key
    - `alignStatusHistory()`: change to use `INDEX_DEFINITIONS.IDX_STATUS_HISTORY_REPORT` key
    - `alignPasswordResets()`: change to use `INDEX_DEFINITIONS.UNIQUE_PASSWORD_RESETS_TOKEN` key
    - `alignWilayah()`: change to use `INDEX_DEFINITIONS.IDX_WILAYAH_TIPE_PARENT` key
    - Verify all 8 call sites updated
    - _Requirements: 2.1, 2.3_

- [ ] 4. Create enums and refactor createTrigger()

  - [ ] 4.1 Create TRIGGER_DEFINITIONS enum
    - Define all 4 trigger SQL definitions as constants:
      - `STATUS_HISTORY_REJECT_UPDATE = "CREATE TRIGGER status_history_reject_update BEFORE UPDATE ON status_history FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only'; END"`
      - `STATUS_HISTORY_REJECT_DELETE = "CREATE TRIGGER status_history_reject_delete BEFORE DELETE ON status_history FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'status_history is append-only'; END"`
      - `AUDIT_LOGS_REJECT_UPDATE = "CREATE TRIGGER audit_logs_reject_update BEFORE UPDATE ON audit_logs FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only'; END"`
      - `AUDIT_LOGS_REJECT_DELETE = "CREATE TRIGGER audit_logs_reject_delete BEFORE DELETE ON audit_logs FOR EACH ROW BEGIN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_logs is append-only'; END"`
    - Place enum near INDEX_DEFINITIONS
    - _Requirements: 2.2_

  - [ ] 4.2 Refactor createTrigger() to use enum lookup
    - Change signature: `async function createTrigger(connection, triggerKey, triggerName)`
    - `triggerKey` is enum key (e.g., TRIGGER_DEFINITIONS.STATUS_HISTORY_REJECT_UPDATE)
    - `triggerName` is the trigger name string for existence check
    - Add validation: verify triggerKey exists in TRIGGER_DEFINITIONS
    - Lookup definition: `const triggerSQL = TRIGGER_DEFINITIONS[triggerKey]`
    - If triggerKey not found in enum, throw error
    - Use the static SQL: `await connection.query(triggerSQL)`
    - Keep existing trigger existence check (verify based on trigger name)
    - Document that all trigger definitions are static
    - _Requirements: 2.2, 2.3_

  - [ ] 4.3 Update all createTrigger() call sites in main() (4 total)
    - Update to pass enum key + trigger name:
      - `TRIGGER_DEFINITIONS.STATUS_HISTORY_REJECT_UPDATE, "status_history_reject_update"`
      - `TRIGGER_DEFINITIONS.STATUS_HISTORY_REJECT_DELETE, "status_history_reject_delete"`
      - `TRIGGER_DEFINITIONS.AUDIT_LOGS_REJECT_UPDATE, "audit_logs_reject_update"`
      - `TRIGGER_DEFINITIONS.AUDIT_LOGS_REJECT_DELETE, "audit_logs_reject_delete"`
    - Verify all 4 call sites updated
    - _Requirements: 2.2, 2.3_

- [ ] 5. Verify bug condition exploration test now passes
  - **Property 1: Expected Behavior** - All SQL is Static with Validation
  - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
  - The test from task 1 encoded the expected behavior (no dynamic SQL, only enum lookups)
  - When this test passes, it confirms dynamic SQL is eliminated
  - Run bug condition exploration test from step 1
  - **EXPECTED OUTCOME**: Test PASSES (confirms SQL injection vulnerability is mitigated)
  - Verify security scanner no longer flags:
    - `addIndex()` function for dynamic SQL
    - `createTrigger()` function for dynamic SQL
  - Confirm enum validation prevents invalid keys
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 6. Verify preservation tests still pass
  - **Property 2: Preservation** - Index and Trigger Behavior Unchanged
  - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
  - Run preservation property tests from step 2
  - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
  - Verify all index/trigger creation still works:
    - All 8 indices created successfully with correct structures
    - All 4 triggers created successfully with correct logic
    - Append-only enforcement works (UPDATE/DELETE rejected)
    - Duplicate creation attempts correctly skipped
    - Schema alignment script completes successfully
    - User and wilayah counts output correctly
  - Confirm database state matches unfixed behavior
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7. Checkpoint - Ensure all tests pass and security is confirmed
  - Run full test suite for `scripts/align-legacy-schema.js`
  - Execute schema alignment script against test database
  - Verify no new errors or regressions introduced
  - Confirm security scanner no longer flags SQL injection vulnerability
  - All bug condition tests pass
  - All preservation tests pass
  - Verify append-only triggers function correctly (attempt UPDATE/DELETE and confirm rejection)
  - Verify all 8 indices are created with correct columns and types

## Notes

- Security scanner (Semgrep) flags dynamic SQL string concatenation in both `addIndex()` and `createTrigger()`
- Current code is safe because it's internal script with no user input, but enum approach satisfies security scanners
- 8 index definitions: 1 UNIQUE constraint + 7 regular indices across 6 functions
- 4 trigger definitions: 2 for status_history (append-only) + 2 for audit_logs (append-only)
- All trigger logic unchanged - they continue to reject UPDATE/DELETE operations
- All index structures unchanged - they have identical columns and properties
- Script output (user/wilayah counts) must remain identical after fix
