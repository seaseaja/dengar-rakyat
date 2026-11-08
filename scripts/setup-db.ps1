# Database Setup - Dengar Rakyat

Write-Host "=== DATABASE SETUP ===" -ForegroundColor Cyan

$mysql = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$user = "root"
$pass = "021936"
$db = "dengar_rakyat"

# Check mysql
if (-not (Test-Path $mysql)) {
    $mysql = "C:\xampp\mysql\bin\mysql.exe"
}

if (-not (Test-Path $mysql)) {
    Write-Host "ERROR: MySQL not found!" -ForegroundColor Red
    exit 1
}

Write-Host "MySQL found" -ForegroundColor Green

# 1. Drop & create
Write-Host "[1/8] Creating database..." -ForegroundColor Yellow
& $mysql -u $user -p$pass -e "DROP DATABASE IF EXISTS $db; CREATE DATABASE $db;"

# 2. Base schema
Write-Host "[2/8] Base schema..." -ForegroundColor Yellow
Get-Content db\mysql_migration.sql | & $mysql -u $user -p$pass $db

# 3. H1 user encryption
Write-Host "[3/8] User encryption..." -ForegroundColor Yellow
Get-Content db\iter2_h1_schema_migration.sql | & $mysql -u $user -p$pass $db

# 4. Seed users
Write-Host "[4/8] Seeding users..." -ForegroundColor Yellow
npx tsx scripts/seed-hardened-users.ts

# 5. Laporan encryption
Write-Host "[5/8] Laporan encryption..." -ForegroundColor Yellow
Get-Content db\iter2_h1_laporan_encryption.sql | & $mysql -u $user -p$pass $db

# 6. Session timeout
Write-Host "[6/8] Session timeout..." -ForegroundColor Yellow
Get-Content db\iter2_h3_session_timeout.sql | & $mysql -u $user -p$pass $db

# 7. Audit logging
Write-Host "[7/8] Audit logging..." -ForegroundColor Yellow
Get-Content db\iter3_p1_audit_schema.sql | & $mysql -u $user -p$pass $db

# 8. Verify
Write-Host "[8/8] Verifying..." -ForegroundColor Yellow
node scripts/check-db.js

Write-Host ""
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Cyan
