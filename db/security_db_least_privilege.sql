-- =====================================================
-- Security: Database Least Privilege (A05 Mitigation)
-- =====================================================
-- Create restricted database user for application
-- Grant only necessary permissions (SELECT, INSERT, UPDATE)
-- REVOKE dangerous permissions (DELETE on most tables)
-- REVOKE ALL on audit_logs except INSERT/SELECT (append-only)

USE dengar_rakyat;

-- =====================================================
-- Step 1: Create Application User
-- =====================================================

-- Drop user if exists (for re-running script)
DROP USER IF EXISTS 'dengar_rakyat_app'@'localhost';

-- Create dedicated application user
CREATE USER 'dengar_rakyat_app'@'localhost' IDENTIFIED BY 'CHANGE_THIS_PASSWORD_IN_PRODUCTION';

-- =====================================================
-- Step 2: Grant Necessary Permissions
-- =====================================================

-- Grant SELECT, INSERT, UPDATE on most tables
GRANT SELECT, INSERT, UPDATE ON dengar_rakyat.users TO 'dengar_rakyat_app'@'localhost';
GRANT SELECT, INSERT, UPDATE ON dengar_rakyat.sessions TO 'dengar_rakyat_app'@'localhost';
GRANT SELECT, INSERT, UPDATE ON dengar_rakyat.laporan TO 'dengar_rakyat_app'@'localhost';
GRANT SELECT ON dengar_rakyat.wilayah TO 'dengar_rakyat_app'@'localhost'; -- Read-only
GRANT SELECT, INSERT, UPDATE ON dengar_rakyat.password_resets TO 'dengar_rakyat_app'@'localhost';

-- Audit logs: APPEND-ONLY (INSERT + SELECT only, NO UPDATE/DELETE)
GRANT SELECT, INSERT ON dengar_rakyat.audit_logs TO 'dengar_rakyat_app'@'localhost';

-- =====================================================
-- Step 3: Explicitly REVOKE Dangerous Permissions
-- =====================================================

-- Prevent DELETE on critical tables (soft delete should be used instead)
REVOKE DELETE ON dengar_rakyat.users FROM 'dengar_rakyat_app'@'localhost';
REVOKE DELETE ON dengar_rakyat.laporan FROM 'dengar_rakyat_app'@'localhost';

-- Prevent UPDATE/DELETE on audit logs (append-only enforcement)
REVOKE UPDATE, DELETE ON dengar_rakyat.audit_logs FROM 'dengar_rakyat_app'@'localhost';

-- Prevent ALTER/DROP/CREATE (schema changes)
REVOKE ALTER, DROP, CREATE ON dengar_rakyat.* FROM 'dengar_rakyat_app'@'localhost';

-- =====================================================
-- Step 4: Grant DELETE Only on Sessions & Resets
-- =====================================================

-- Allow DELETE only on temporary tables (sessions, password resets)
GRANT DELETE ON dengar_rakyat.sessions TO 'dengar_rakyat_app'@'localhost';
GRANT DELETE ON dengar_rakyat.password_resets TO 'dengar_rakyat_app'@'localhost';

-- =====================================================
-- Step 5: Apply Changes
-- =====================================================

FLUSH PRIVILEGES;

-- =====================================================
-- Step 6: Verify Permissions
-- =====================================================

-- Show grants for application user
SHOW GRANTS FOR 'dengar_rakyat_app'@'localhost';

-- Expected output:
-- GRANT USAGE ON *.* TO `dengar_rakyat_app`@`localhost`
-- GRANT SELECT, INSERT, UPDATE ON `dengar_rakyat`.`users` TO `dengar_rakyat_app`@`localhost`
-- GRANT SELECT, INSERT, UPDATE, DELETE ON `dengar_rakyat`.`sessions` TO `dengar_rakyat_app`@`localhost`
-- GRANT SELECT, INSERT ON `dengar_rakyat`.`audit_logs` TO `dengar_rakyat_app`@`localhost`
-- ... etc

SELECT 'Database least privilege configured successfully!' AS status;
SELECT 'IMPORTANT: Update DATABASE_URL in .env.local to use dengar_rakyat_app user' AS reminder;

-- =====================================================
-- Production .env.local Configuration
-- =====================================================

-- Update your .env.local with:
-- DATABASE_URL=mysql://dengar_rakyat_app:CHANGE_THIS_PASSWORD_IN_PRODUCTION@127.0.0.1:3306/dengar_rakyat

-- =====================================================
-- Additional Hardening (Optional)
-- =====================================================

-- Restrict user to localhost only (already done above with 'dengar_rakyat_app'@'localhost')
-- For remote access, change to specific IP: 'dengar_rakyat_app'@'192.168.1.100'

-- Audit user activity (MySQL Enterprise Audit Plugin)
-- Not available in MySQL Community Edition

-- =====================================================
-- Testing Permissions
-- =====================================================

-- Test as application user:
-- mysql -u dengar_rakyat_app -p dengar_rakyat

-- Should succeed:
-- SELECT * FROM users LIMIT 1;
-- INSERT INTO audit_logs (...) VALUES (...);

-- Should fail (permission denied):
-- DELETE FROM users WHERE id = 1;
-- UPDATE audit_logs SET event_type = 'HACKED' WHERE id = 1;
-- DROP TABLE users;

