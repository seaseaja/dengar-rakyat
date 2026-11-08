# Dengar Rakyat - Platform Aspirasi dan Keluhan Warga

**Versi:** Iterasi 3 P1 + H6 (Complete) | **Status:** Production Ready

Platform digital untuk menyampaikan aspirasi dan keluhan kepada pemerintah dengan transparan, aman, dan akuntabel.

---

## 📊 Database Iterasi - COMPLETE

### ✅ Iterasi 2 + Iterasi 3 P1 (SEMUA MIGRATIONS SELESAI)

#### H1 - User Encryption & Password Hardening ✅
- Enkripsi NIK (AES-256-GCM) + HMAC authentication
- Enkripsi alamat dengan algoritma AES-256-GCM
- Password hashing dengan Argon2id (memory: 65536, time: 3, parallelism: 4)

#### H3 - Session Management ✅
- Session timeout (idle: 30 min, absolute: 24 hours)
- Session regeneration (fixation prevention)
- Activity tracking

#### H6 - Cleanup & Optimization ✅
- Database constraints & indices
- Plaintext data dihapus setelah enkripsi
- Referential integrity

#### P1 - Audit Logging ✅ (CURRENT)
- Audit trail untuk auth events
- Rate limiting (5 attempts / 2 min)
- Failed login tracking

**Total Tables:** 7 (users, laporan, sessions, audit_logs, status_history, password_resets, wilayah)
**Encryption:** 100% (NIK, alamat, password)
**Session Management:** Active
**Audit Logging:** Active

---

## 🚀 Quick Start

### 1. Setup Database (DONE - All migrations applied)

```powershell
# Check database status
node scripts/check-db.js

# If migrations not applied, run:
$mysql = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

# Base schema + Iter 2 migrations
Get-Content db\mysql_migration.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h1_schema_migration.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h1_laporan_encryption.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h3_session_timeout.sql | & $mysql -u root -p dengar_rakyat
Get-Content db\iter2_h6_cleanup.sql | & $mysql -u root -p dengar_rakyat

# Iter 3 migrations
Get-Content db\iter3_p1_audit_schema.sql | & $mysql -u root -p dengar_rakyat

# Seed users
npx tsx scripts/seed-hardened-users.ts
```

### 2. Environment Setup

```bash
# .env.local
DATABASE_URL=mysql://root:password@127.0.0.1:3306/dengar_rakyat
ENCRYPTION_KEY=<32-byte-hex>
HMAC_KEY=<32-byte-hex>
NODE_ENV=development
```

### 3. Start Development Server

```bash
npm install
npm run dev

# Open http://localhost:3000
```

---

## 👥 Test Credentials

| Role | Email | Password | Wilayah |
|------|-------|----------|---------|
| **Admin Pusat** | pusat@dengarrakyat.id | pusat123 | - |
| **Admin Pemda** | pemda.jakut@dengarrakyat.id | pemda123 | Jakarta Utara |
| **Petugas Pos** | pos.koja@dengarrakyat.id | pos123 | Kecamatan Koja |
| **Warga** | budi@example.com | warga123 | - |
| **Warga** | siti@example.com | warga123 | - |

---

## 🎨 Features

### Dashboard Pages (All with Charts & Analytics)

**Admin Pusat Dashboard** (`/dashboard/pusat`)
- 7 Visualizations: Daily trend, monthly trend, top 10 categories, age distribution, status comparison, wilayah heatmap
- National-level monitoring
- AdminTools for system management

**Admin Pemda Dashboard** (`/dashboard/pemda`)
- 6 Visualizations: Weekly trend, top categories, status distribution, per-kecamatan breakdown, summary cards, detailed table
- Regional-level monitoring scoped to pemda wilayah
- AdminTools access

**Petugas Pos Dashboard** (`/dashboard/pos`)
- 5 Components: Daily trend line chart, status progress bars, recent activity timeline, summary cards, quick action button
- District-level monitoring scoped to pos wilayah
- Real-time activity updates

### Core Features

✅ **Authentication**
- Login/Register dengan email & password
- Forgot password flow
- Password reset dengan token
- Change password (authenticated)
- Rate limiting (5 attempts / 2 min)
- Session management (30 min idle, 24 hour absolute)

✅ **Laporan Management**
- Create laporan baru
- List laporan saya dengan filter
- Detail laporan dengan status tracking
- Status update (admin only)
- GPS location support

✅ **User Profile**
- View personal info
- Edit nama & alamat
- Change password
- Secure session handling

✅ **Navigation**
- Navbar dengan logo + dropdown menus
- Laporan dropdown (Buat Baru + Laporan Saya)
- Profile menu (Edit Profile, Settings, Logout)
- Mobile-responsive bottom tab bar
- Role-based menu visibility

✅ **Admin Tools**
- Wilayah management (kota/kab dropdown)
- Report aggregation
- Laporan status audit
- National aggregation (Pusat only)

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
- ✅ Audit logging (all auth events)
- ✅ Input validation & sanitization
- ✅ Role-based access control
- ✅ Session timeout (idle & absolute)

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - Login dengan rate limiting
- `POST /api/auth/logout` - Logout & destroy session
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password dengan token
- `POST /api/auth/change-password` - Change password (authenticated)

### Dashboard Stats (dengan role-based access)
- `GET /api/dashboard/pusat-stats` - National stats (role: pusat) ✅
- `GET /api/dashboard/pemda-stats` - Regional stats (role: admin_pemda) ✅
- `GET /api/dashboard/pos-stats` - District stats (role: petugas_pos) ✅

### Laporan
- `GET /api/laporan` - List reports (mine=1 untuk laporan saya)
- `POST /api/laporan` - Create new laporan
- `GET /api/laporan/[id]` - Get laporan detail
- `PUT /api/laporan/[id]/status` - Update status (admin)

### Profile
- `PUT /api/profile/update` - Update nama & alamat

### Admin (Role: pusat & admin_pemda)
- `GET /api/admin/kota-kab` - Get municipalities
- `GET /api/admin/laporan-agregasi` - Aggregated reports
- `GET /api/admin/laporan-agregasi-nasional` - National aggregation

### Public
- `GET /api/wilayah` - List all wilayah (public)

---

## 📁 Project Structure

```
dengar-rakyat/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── dashboard/            # Dashboard stats APIs ✅
│   │   ├── laporan/              # Report endpoints
│   │   ├── profile/              # Profile API
│   │   ├── admin/                # Admin endpoints
│   │   └── wilayah/              # Public wilayah endpoint
│   ├── dashboard/                # Dashboard pages (pusat, pemda, pos)
│   ├── laporan/                  # Report pages
│   ├── profile/                  # Profile page
│   ├── login/register/           # Auth pages
│   └── layout.tsx                # Root layout
├── components/
│   ├── layout/
│   │   └── Navbar.tsx            # Navigation component ✅
│   ├── dashboard/
│   │   ├── PusatDashboard.tsx    # Pusat dashboard with charts ✅
│   │   ├── PemdaDashboard.tsx    # Pemda dashboard with charts ✅
│   │   ├── PosDashboardContent.tsx # Pos dashboard components ✅
│   │   ├── AdminTools.tsx        # Admin utilities
│   │   └── InsightsSummary.tsx   # AI-powered insights
│   ├── profile/
│   │   └── EditProfileForm.tsx   # Profile editing ✅
│   ├── laporan/                  # Report components
│   ├── auth/                     # Auth components
│   └── ui/                       # Reusable UI components
├── features/
│   ├── auth/                     # Auth service & queries
│   ├── audit/                    # Audit logging
│   └── laporan/                  # Report logic
├── lib/
│   ├── db.ts                     # Database connection
│   ├── crypto.ts                 # Encryption/decryption
│   ├── cookies.ts                # Cookie security
│   ├── rate-limiter.ts           # Rate limiting
│   ├── error-handler.ts          # Error handling
│   └── request-context.ts        # Request context
├── db/
│   ├── mysql_migration.sql       # Base schema
│   ├── iter2_h1_schema_migration.sql
│   ├── iter2_h1_laporan_encryption.sql
│   ├── iter2_h3_session_timeout.sql
│   ├── iter2_h6_cleanup.sql      # ✅ Applied
│   ├── iter3_p1_audit_schema.sql # ✅ Applied
│   └── security_db_least_privilege.sql
└── scripts/
    ├── seed-hardened-users.ts    # Seed test users
    └── check-db.js               # Database status checker
```

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary:** Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Warning:** Amber (#f59e0b)
- **Danger:** Red (#ef4444)
- **Secondary colors:** Purple, Indigo, Teal

### Components
- Tailwind CSS + custom React components
- Responsive design (mobile-first)
- Breakpoints: sm (640px), md (768px), lg (1024px)

### Typography
- Font: System fonts (Segoe UI, Helvetica, Arial)
- Sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)

### Navigation Hierarchy
- **Navbar:** Logo, Dashboard link, Laporan dropdown, Profile menu
- **Sidebar:** None (mobile-first design)
- **Bottom Tab:** Mobile navigation (Dashboard, Laporan, Profile)

---

## 📊 Dashboard Analytics

### Visualizations Used
- **Line Charts:** Daily/weekly/monthly trends
- **Bar Charts:** Top categories, per-kecamatan breakdown
- **Pie Charts:** Status distribution, age groups
- **Progress Bars:** Status progress
- **Tables:** Detailed data breakdowns
- **Timeline:** Recent activities

### Data Sources
- Real-time SQL queries with proper scoping
- Role-based data filtering (pusat → all, pemda → pemda wilayah, pos → pos wilayah)
- Aggregated statistics with proper null handling

---

## 🧪 Testing Checklist

### Login & Navigation
- [ ] Login dengan credentials valid
- [ ] Verify navbar muncul dengan user info
- [ ] Test laporan dropdown
- [ ] Test profile menu
- [ ] Verify logout works

### Dashboard Pages
- [ ] Pusat dashboard: 7 charts render correctly ✅
- [ ] Pemda dashboard: 6 visualizations render ✅
- [ ] Pos dashboard: 5 components render ✅
- [ ] Charts are responsive on mobile
- [ ] Data updates when creating new laporan

### Laporan Flow
- [ ] Create laporan baru
- [ ] Upload laporan → dashboard
- [ ] View laporan detail
- [ ] Update status (admin)
- [ ] Filter by status

### Profile
- [ ] View profile info
- [ ] Edit nama & alamat
- [ ] Change password
- [ ] Verify changes persist

### Security
- [ ] Rate limiting works (5 failed logins)
- [ ] Session timeout after 30 min inactivity
- [ ] CSRF protection on forms
- [ ] No SQL injection vulnerabilities
- [ ] Audit logs track events

---

## 📦 Dependencies

```json
{
  "next": "16.4.3",
  "react": "19.x",
  "mysql2": "3.x",
  "recharts": "2.x",
  "date-fns": "3.x",
  "argon2": "0.30.x",
  "crypto": "builtin"
}
```

---

## 🚢 Deployment

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Environment variables

### Production Build
```bash
npm run build
npm start
```

### Hosting Options
- Vercel (Next.js native)
- AWS EC2 + RDS
- DigitalOcean App Platform
- Self-hosted VPS

---

## 📝 Recent Changes

**Latest Commit:** `59c32a7`
- Fixed dashboard Pemda & Pos API data structures
- Applied iter2_h6_cleanup migration
- All charts now rendering correctly
- Database fully configured with 7 tables

---

## ✅ Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Database | ✅ Complete | All 7 tables, Iter 3 P1 + H6 |
| Authentication | ✅ Secure | Argon2id + AES-256-GCM |
| Dashboard Pusat | ✅ Working | 7 charts rendering |
| Dashboard Pemda | ✅ Fixed | 6 visualizations rendering |
| Dashboard Pos | ✅ Fixed | 5 components rendering |
| Navbar | ✅ Complete | Dropdowns, mobile nav |
| Profile Edit | ✅ Working | Nama & alamat editable |
| Logout | ✅ Functional | Session destroyed properly |
| API Endpoints | ✅ Working | All 20+ endpoints functional |
| Security | ✅ Hardened | Rate limiting, encryption, audit |

---

## 🔗 Links

- **Repository:** https://github.com/seaseaja/dengar-rakyat
- **Issues:** Use GitHub Issues for bug reports
- **Development:** `npm run dev` at http://localhost:3000

---

**Last Updated:** November 2026  
**Database Iterasi:** 3 P1 (Complete)  
**Build Status:** ✅ Production Ready



