# Bugfix Requirements: SQL Injection in Schema Alignment Script

## Introduction

The `scripts/align-legacy-schema.js` script contains SQL injection vulnerabilities in the `addIndex()` function (line 66) and `createTrigger()` function (line 280). These functions dynamically concatenate SQL strings without proper parameterization. While the current code is internal to the migration script with no direct user input, security scanners (Semgrep) flag the dynamic SQL concatenation as unsafe. This bugfix eliminates all dynamic SQL string construction by using only parameterized queries and static SQL definitions.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the `addIndex()` function constructs a query using `await connection.query(\`ALTER TABLE ?? ADD ${definition}\`, [table])\` THEN the `definition` parameter is dynamically concatenated into the SQL string without parameterization

1.2 WHEN the `createTrigger()` function constructs a query using `await connection.query(sql)\` THEN the `sql` parameter containing trigger definitions is passed directly without parameterization

1.3 WHEN security scanners analyze the code THEN they flag both functions as vulnerable to SQL injection due to dynamic string concatenation

### Expected Behavior (Correct)

2.1 WHEN the `addIndex()` function is called THEN the system SHALL construct and execute the ALTER TABLE statement using only parameterized query placeholders or static pre-validated SQL definitions

2.2 WHEN the `createTrigger()` function is called THEN the system SHALL pass the complete SQL string only after verifying it contains no unvalidated dynamic content, and document that all SQL values are static from this script

2.3 WHEN security scanners analyze the code THEN they SHALL recognize the parameterized approach and not flag it as a SQL injection vulnerability

### Unchanged Behavior (Regression Prevention)

3.1 WHEN `addIndex()` is called with valid table name and index definition THEN the system SHALL CONTINUE TO create the index with the correct structure and columns

3.2 WHEN `createTrigger()` is called with a trigger name and definition THEN the system SHALL CONTINUE TO create the trigger with the correct logic and behavior

3.3 WHEN `addIndex()` is called for an index that already exists THEN the system SHALL CONTINUE TO skip creation and return without error

3.4 WHEN `createTrigger()` is called for a trigger that already exists THEN the system SHALL CONTINUE TO skip creation and return without error

3.5 WHEN the schema alignment script runs THEN it SHALL CONTINUE TO successfully migrate the database schema and produce the same output results (user/wilayah counts)
