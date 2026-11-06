# ⚡ Quick Start - Dengar Rakyat

**5 menit setup** untuk development atau testing.

---

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- Windows (PowerShell) atau Linux/Mac

---

## 🚀 Installation (5 Steps)

```bash
# 1. Clone & install
git clone <repo_url>
cd dengar-rakyat
npm install

# 2. Install dashboard dependencies
npm install recharts date-fns sharp

# 3. Setup database
mysql -u root -p < db/mysql_migration.sql
mysql -u root -p dengar_rakyat < db/iter2_h1_schema_migration.sql
mysql -u root -p dengar_rakyat < db/iter2_h1_laporan_encryption.sql
mysql -u root -p dengar_rakyat < db/iter2_h3_session_timeout.sql
mysql -u root -p dengar_rakyat < db/iter3_p1_audit_schema.sql

# 4. Seed hardened users
npx tsx scripts/seed-hardened-users.ts

# 5. Setup environment & start
cp .env.local.example .env.local
# Edit .env.local dengan ENCRYPTION_KEY & HMAC_KEY
npm run dev
```

Open http://localhost:3000

---

## 🔑 Default Test Accounts

| Email | Password | Role |
|-------|----------|------|
| pusat@dengarrakyat.id | pusat123 | Admin Pusat |
| pemda.jakut@dengarrakyat.id | pemda123 | Admin Pemda |
| pos.koja@dengarrakyat.id | pos12345 | Petugas POS |
| budi@example.com | budi1234 | Warga |

⚠️ **Change all passwords in production!**

---

## 🎯 Test Dashboards

```bash
# Login sebagai PUSAT
http://localhost:3000/login
Email: pusat@dengarrakyat.id
Password: pusat123

# Access dashboards:
http://localhost:3000/dashboard/pusat  # National statistics
http://localhost:3000/dashboard/pemda  # City/regency (login as PEMDA)
http://localhost:3000/dashboard/pos    # District (login as POS)
```

**Expected:** Charts, insights, dan admin tools tampil tanpa error.

---

## 🧪 Run Automated Tests

```bash
# Run pentest automation (Windows)
.\scripts\run-pentest-automated.ps1

# Verify audit integrity
npm run tsx scripts/verify-audit-integrity.ts

# Security audit
npm audit
```

---

## 📚 Main Documentation

| File | Purpose |
|------|---------|
| [README.md](README.md) | Complete project overview |
| [LAPORAN_AUDIT_KEAMANAN.md](LAPORAN_AUDIT_KEAMANAN.md) | Security audit report (for UAS) |
| [docs/PENTEST_GUIDE.md](docs/PENTEST_GUIDE.md) | Manual testing scenarios |
| [docs/DASHBOARD_FEATURES.md](docs/DASHBOARD_FEATURES.md) | Dashboard documentation |

---

## ❓ Troubleshooting

**Dashboard blank / no charts?**
- Check console for errors
- Verify `npm install recharts date-fns` executed
- Verify database has data (seed users creates sample data)

**401 Unauthorized?**
- Clear cookies
- Re-login with correct credentials

**Database connection error?**
- Check `.env.local` DATABASE_URL
- Verify MySQL server running

**ENCRYPTION_KEY missing?**
```bash
# Generate keys (Windows PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env.local:
ENCRYPTION_KEY=<generated_key>
HMAC_KEY=<generated_key>
```

---

## 🎓 For Students (UAS Submission)

**Checklist:**
1. ✅ Run automated pentest
2. ✅ Run OWASP ZAP scan
3. ✅ Take screenshots (save to docs/pentest/screenshots/)
4. ✅ Fill docs/PENTEST_RESULTS.md with actual results
5. ✅ Update LAPORAN_AUDIT_KEAMANAN.md (replace template hashes)
6. ✅ Export as PDF

**Estimated Time:** 2-3 hours for complete testing + documentation

---

**Need Help?** Check [README.md](README.md) for detailed documentation.

**Status:** ✅ 100% Complete (Iterasi 2 + 3 + Dashboard)  
**Last Updated:** November 6, 2026
