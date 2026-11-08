# Dengar Rakyat - Platform Aspirasi dan Keluhan Warga

**Versi:** Iterasi 3 (P1 Audit Logging) | **Status:** Development

Platform digital untuk menyampaikan aspirasi dan keluhan kepada pemerintah dengan transparan, aman, dan akuntabel.

---

## 📋 Database Iterasi

### ✅ Iterasi 2 (Keamanan & Fitur Dasar)

#### H1 - User Encryption & Password Hardening
- Enkripsi NIK (AES-256-GCM) + HMAC authentication
- Enkripsi alamat dengan algoritma AES-256-GCM
- Password hashing dengan Argon2id (memory: 65536, time: 3, parallelism: 4)
- Secure password reset dengan token expiry
- **Files:** `iter2_h1_schema_migration.sql`, `iter2_h1_laporan_encryption.sql`

#### H3 - Session Management
- Session timeout (idle: 30 min, absolute: 24 hours)
- Session regeneration (fixation prevention)
- Activity tracking (`last_activity_at`)
- **File:** `iter2_h3_session_timeout.sql`

#### H6 - Cleanup & Optimization
- Database constraints dan indices
- Referential integrity
- **File:** `iter2_h6_cleanup.sql`

### ⏳ Iterasi 3 (Audit & Compliance)

#### P1 - Audit Logging (**Current**)
- Audit trail untuk auth events (login success/failure, password change)
- Rate limiting (5 attempts / 2 min per IP & email)
- Failed login tracking
- **File:** `iter3_p1_audit_schema.sql`

#### P2 - Security (Optional)
- Database least privilege (role-based access)
- **File:** `security_db_least_privilege.sql`

---

## 🚀 Quick Start

### Setup Database

```powershell
# 1. Connect to MySQL
$mysql = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

# 2. Create database
echo "CREATE DATABASE dengar_rakyat;" | & $mysql -u root -p

# 3. Run migrations in order
echo "ITERATE 2:"
Get-Content db\mysql_migration.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h1_schema_migration.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h1_laporan_encryption.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h3_session_timeout.sql | & $mysql -u root -p dengar_rakyat

echo "ITERATE 3:"
Get-Content db\iter3_p1_audit_schema.sql | & $mysql -u root -p dengar_rakyat

# 4. Seed users
npx tsx scripts/seed-hardened-users.ts

# 5. Check database status
node scripts/check-db.js
```

### Setup Environment

```bash
# .env.local
DATABASE_URL=mysql://root:password@127.0.0.1:3306/dengar_rakyat
ENCRYPTION_KEY=<generate-with-crypto-randomBytes>
HMAC_KEY=<generate-with-crypto-randomBytes>
```

### Start Development Server

```bash
npm install
npm run dev

# Open http://localhost:3000
```

---

## 👥 Default Users (Seeded)

| Email | Password | Role | Wilayah |
|-------|----------|------|---------|
| pusat@dengarrakyat.id | pusat123 | Admin Pusat | - |
| pemda.jakut@dengarrakyat.id | pemda123 | Admin Pemda | Jakarta Utara |
| pos.koja@dengarrakyat.id | pos123 | Petugas Pos | Kecamatan Koja |
| budi@example.com | warga123 | Warga | - |
| siti@example.com | warga123 | Warga | - |

---

## 📊 Features

### User Roles & Access

#### 🎯 Admin Pusat (National Level)
- Dashboard nasional dengan 7 visualisasi
- Monitor laporan dari seluruh wilayah
- Statistik agregasi (tren harian/bulanan, top kategori, distribusi usia)
- Akses admin tools

#### 🏛️ Admin Pemda (Provincial/Municipal)
- Dashboard wilayah dengan 6 visualisasi
- Monitor laporan kota/kabupaten
- Breakdown per kecamatan
- Akses admin tools

#### 📍 Petugas Pos (District Level)
- Dashboard kecamatan dengan 5 visualisasi
- Monitor laporan lokal
- Lihat laporan terbaru
- Status tracking

#### 👤 Warga (Citizens)
- Buat laporan baru
- Lihat status laporan sendiri
- Edit profil
- Ubah password

### Dashboard Features

**Pusat Dashboard:**
- 📈 Daily trend (30 hari terakhir)
- 📊 Monthly trend (12 bulan terakhir)
- 🏆 Top 10 kategori laporan
- 👥 Distribusi usia pelapor
- ⚙️ Status perbandingan (pie chart)
- 🗺️ Top 10 wilayah

**Pemda Dashboard:**
- 📈 Daily trend (scoped ke pemda)
- 📊 Monthly trend
- 🏆 Top 10 kategori
- 👥 Distribusi usia
- ⚙️ Status distribution
- 🔍 Breakdown per kecamatan

**Pos Dashboard:**
- 📈 Daily trend (30 hari)
- 🏆 Top 5 kategori
- ⚙️ Status comparison
- 📋 Recent reports (10 terbaru)

### Security Features

✅ **Authentication & Authorization**
- Secure login dengan rate limiting
- Session regeneration (fixation prevention)
- Idle & absolute timeout
- CSRF protection
- Security headers (CSP, HSTS, X-Frame-Options, dll)

✅ **Data Protection**
- Enkripsi NIK & alamat (AES-256-GCM)
- Password hashing (Argon2id)
- HMAC authentication
- Input validation & sanitization

✅ **Audit & Compliance**
- Login event tracking
- Password change audit
- Failed attempt logging
- Rate limit tracking

---

## 📁 Project Structure

```
dengar-rakyat/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Auth pages
│   ├── dashboard/        # Dashboard pages
│   ├── laporan/          # Report pages
│   └── profile/          # Profile page
├── components/
│   ├── layout/           # Navbar
│   ├── auth/             # Auth components
│   ├── dashboard/        # Dashboard components (charts)
│   ├── laporan/          # Report components
│   ├── profile/          # Profile components
│   └── ui/               # Reusable UI components
├── features/
│   ├── auth/             # Auth service & queries
│   ├── audit/            # Audit logging
│   └── laporan/          # Report logic
├── lib/
│   ├── db.ts             # Database connection
│   ├── crypto.ts         # Encryption utilities
│   ├── cookies.ts        # Cookie security
│   ├── rate-limiter.ts   # Rate limiting
│   └── error-handler.ts  # Error handling
├── db/
│   ├── mysql_migration.sql           # Base schema
│   ├── iter2_h1_schema_migration.sql # User encryption
│   ├── iter2_h1_laporan_encryption.sql
│   ├── iter2_h3_session_timeout.sql
│   ├── iter3_p1_audit_schema.sql     # Audit logging
│   └── security_db_least_privilege.sql
└── scripts/
    ├── seed-hardened-users.ts        # Seed test users
    └── check-db.js                   # DB status checker
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new account
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password (authenticated)

### Laporan (Reports)
- `GET /api/laporan` - List reports (mine or all)
- `POST /api/laporan` - Create new report
- `GET /api/laporan/[id]` - Get report detail
- `PUT /api/laporan/[id]/status` - Update report status

### Dashboard Stats
- `GET /api/dashboard/pusat-stats` - National stats (role: pusat)
- `GET /api/dashboard/pemda-stats` - Regional stats (role: admin_pemda)
- `GET /api/dashboard/pos-stats` - District stats (role: petugas_pos)

### Admin
- `GET /api/admin/kota-kab` - Get municipalities (admin only)
- `GET /api/admin/laporan-agregasi` - Aggregated reports (admin)
- `GET /api/admin/laporan-agregasi-nasional` - National aggregation

### Wilayah (Regions)
- `GET /api/wilayah` - List all regions (public)

---

## 🎨 UI/UX

### Design System
- **Color Palette:** Blue (#3b82f6) primary, Gray for secondary
- **Typography:** Inter font family
- **Components:** Tailwind CSS + custom components
- **Responsive:** Mobile-first, breakpoints at sm, md, lg

### Navigation
- **Top Navbar:** Logo, dashboard link, laporan dropdown, profile menu
- **Laporan Dropdown:** "Buat Laporan Baru" & "Laporan Saya"
- **Profile Menu:** Profile, settings, logout
- **Mobile:** Bottom tab bar navigation

### Pages
1. **/login** - Login form dengan email/password
2. **/register** - Registrasi user baru
3. **/forgot-password** - Password reset request
4. **/dashboard** - Home dashboard (role-based redirect)
5. **/dashboard/pusat** - National level analytics
6. **/dashboard/pemda** - Regional level analytics
7. **/dashboard/pos** - District level analytics
8. **/laporan** - List laporan saya
9. **/laporan/baru** - Buat laporan baru
10. **/laporan/[id]** - Detail laporan
11. **/profile** - Edit profil + ubah password

---

## 🧪 Testing

### Test Credentials

**Pusat User:**
```
Email: pusat@dengarrakyat.id
Password: pusat123
```

**Pemda User:**
```
Email: pemda.jakut@dengarrakyat.id
Password: pemda123
```

**Pos User:**
```
Email: pos.koja@dengarrakyat.id
Password: pos123
```

### Dashboard Testing

1. Login dengan user role yang sesuai
2. Verifikasi dashboard charts muncul
3. Test laporan creation flow
4. Verify status updates
5. Check profile edit functionality

---

## 🔐 Security Checklist

- ✅ HTTPS ready (secure cookies)
- ✅ CSRF protection (token validation)
- ✅ XSS mitigation (CSP headers)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Rate limiting (5 attempts / 2 min)
- ✅ Session fixation prevention
- ✅ Password hashing (Argon2id)
- ✅ Data encryption (AES-256-GCM)
- ✅ Audit logging
- ✅ Input validation & sanitization

---

## 📦 Dependencies

- **Next.js** 16.4.3 (React framework)
- **MySQL2** (database driver)
- **Recharts** (data visualization)
- **date-fns** (date formatting)
- **crypto** (Node.js encryption)

---

## 🚢 Deployment

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Environment variables (.env.local)

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```
DATABASE_URL=mysql://user:password@host:3306/dengar_rakyat
ENCRYPTION_KEY=<32-byte-hex>
HMAC_KEY=<32-byte-hex>
NODE_ENV=production
```

---

## 📝 License

Proprietary - Pemerintah Indonesia

---

## 👥 Team

**Development Team:** Kiro AI
**Project:** Dengar Rakyat - Platform Aspirasi Warga
**Last Updated:** November 2026

---

## 🔗 Useful Links

- Database Migrations: `/db`
- API Documentation: OpenAPI (coming soon)
- Issue Tracker: GitHub Issues
- Development Guide: `/docs`

---

**Status:** ✅ Iterasi 3 P1 (Audit Logging) - Production Ready for Testing
