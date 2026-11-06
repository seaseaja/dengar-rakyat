-- =====================================================
-- Iterasi 2 - H3: Session Timeout Enhancement
-- =====================================================
-- Add last_activity_at for idle timeout tracking

USE dengar_rakyat;

-- Add last_activity_at column
ALTER TABLE sessions 
  ADD COLUMN last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER expires_at;

-- Add index for cleanup queries
ALTER TABLE sessions ADD INDEX idx_last_activity (last_activity_at);

SELECT 'Session timeout columns added successfully!' AS status;
