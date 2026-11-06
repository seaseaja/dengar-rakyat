-- =====================================================
-- Iterasi 3 - P1: Audit Logging Schema
-- =====================================================
-- Tanggal: 2026-11-06
-- Kategori OWASP: A09 (Logging Failures)
--
-- Features:
-- 1. Append-only audit log
-- 2. Hash chain (tamper detection)
-- 3. Event categorization
-- 4. User & IP tracking
-- =====================================================

USE dengar_rakyat;

-- =====================================================
-- Audit Log Table
-- =====================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Event Info
    event_type VARCHAR(50) NOT NULL,  -- login, logout, password_reset, status_update, etc
    event_category VARCHAR(20) NOT NULL,  -- auth, data, system
    action VARCHAR(100) NOT NULL,  -- Deskripsi human-readable
    
    -- Actor (who)
    user_id INT NULL,  -- NULL jika anonymous (failed login)
    user_email VARCHAR(100) NULL,
    user_role VARCHAR(20) NULL,
    
    -- Target (what)
    target_type VARCHAR(50) NULL,  -- user, laporan, session, etc
    target_id VARCHAR(100) NULL,  -- ID of target resource
    
    -- Context
    ip_address VARCHAR(45) NULL,  -- IPv4 or IPv6
    user_agent TEXT NULL,
    request_id VARCHAR(64) NULL,  -- For tracing
    
    -- Details (JSON)
    metadata JSON NULL,  -- Additional context
    
    -- Tamper Detection (Hash Chain)
    previous_hash VARCHAR(64) NULL,  -- Hash of previous log entry
    current_hash VARCHAR(64) NOT NULL,  -- Hash of this entry
    
    -- Status
    status VARCHAR(20) NOT NULL,  -- success, failure, warning
    error_message TEXT NULL,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_event_type (event_type),
    INDEX idx_event_category (event_category),
    INDEX idx_user_id (user_id),
    INDEX idx_user_email (user_email),
    INDEX idx_target (target_type, target_id),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status),
    INDEX idx_hash_chain (previous_hash, current_hash)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Event Types (Documentation)
-- =====================================================

-- AUTH events:
-- - login_success
-- - login_failure
-- - logout
-- - register
-- - password_reset_request
-- - password_reset_complete
-- - password_change
-- - session_expired

-- DATA events:
-- - laporan_create
-- - laporan_read
-- - laporan_update
-- - laporan_delete
-- - status_update
-- - data_export
-- - data_delete

-- SYSTEM events:
-- - rate_limit_exceeded
-- - csrf_violation
-- - invalid_token
-- - permission_denied

-- =====================================================
-- Example Queries
-- =====================================================

-- Get all failed login attempts in last hour
-- SELECT * FROM audit_logs 
-- WHERE event_type = 'login_failure' 
-- AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR);

-- Get audit trail for specific user
-- SELECT * FROM audit_logs 
-- WHERE user_id = 1 
-- ORDER BY created_at DESC;

-- Detect tamper attempts (broken hash chain)
-- SELECT a.id, a.current_hash, b.previous_hash
-- FROM audit_logs a
-- LEFT JOIN audit_logs b ON b.id = a.id + 1
-- WHERE b.previous_hash IS NOT NULL AND b.previous_hash != a.current_hash;

-- =====================================================
-- Permissions (Production)
-- =====================================================

-- Audit log should be append-only
-- CREATE USER 'audit_logger'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT INSERT, SELECT ON dengar_rakyat.audit_logs TO 'audit_logger'@'localhost';
-- REVOKE UPDATE, DELETE ON dengar_rakyat.audit_logs FROM 'audit_logger'@'localhost';

SELECT 'Audit schema P1 created successfully!' AS status;
