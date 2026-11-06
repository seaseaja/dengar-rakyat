# Dashboard Features - Dengar Rakyat

Dokumentasi lengkap fitur dashboard untuk setiap role dalam sistem Dengar Rakyat.

---

## 📊 Dashboard Pusat (Nasional)

**Role:** PUSAT  
**Akses:** Admin tingkat nasional

### Fitur Statistik

#### 1. **Summary Cards**
- Total Laporan Nasional
- Total Selesai
- Total Pending
- Persentase Selesai

#### 2. **Tren Laporan**
Visualisasi tren dengan toggle view:
- **30 Hari Terakhir** (daily granularity)
- **12 Bulan Terakhir** (monthly granularity)

**Library:** Recharts LineChart  
**Data Source:** `/api/dashboard/pusat-stats`

#### 3. **Perbandingan Status (Merah vs Hijau)**
Pie chart membandingkan:
- 🔴 **Belum Selesai** (Diterima + Diverifikasi + Diproses)
- 🟢 **Selesai**

**Use Case:** Quick overview untuk stakeholder - "Berapa persen yang sudah done?"

#### 4. **Statistik Usia Pelapor**
Pie chart demografi pelapor berdasarkan NIK:
- 18-25 tahun
- 26-35 tahun
- 36-45 tahun
- 46+ tahun

**Algoritma:**  
```sql
YEAR(CURDATE()) - (2000 + CAST(SUBSTRING(u.nik, 11, 2) AS UNSIGNED))
```
Mengambil digit 11-12 dari NIK (YY lahir), asumsi 20XX.

#### 5. **Top 10 Masalah Utama**
Horizontal bar chart kategori laporan:
- INFRASTRUKTUR
- LINGKUNGAN
- SOSIAL
- KEAMANAN
- EKONOMI
- PENDIDIKAN
- KESEHATAN
- TRANSPORTASI
- BENCANA
- LAIN-LAIN

**Sorting:** Descending by count

#### 6. **Heat Map Provinsi (Top 15)**
Bar chart provinsi dengan laporan terbanyak.  
- Top 3 ditandai warna **merah** (hotspot)
- Sisanya **kuning/oranye**

**Use Case:** Identifikasi provinsi yang butuh alokasi resource lebih banyak

### Fitur Insight AI-like

**Component:** `InsightsSummary`

Otomatis generate insight berdasarkan:
- Completion rate (target tercapai/tidak)
- Top category masalah
- Tren meningkat/menurun
- Beban kerja (high/moderate/low)

**Contoh Output:**
> 🎯 **Target Tercapai**  
> 85% laporan telah diselesaikan. Performa sangat baik!

> 📊 **Masalah Utama**  
> INFRASTRUKTUR adalah kategori terbanyak dengan 342 laporan.

### Admin Tools

**Fitur:** Kelola Kota/Kabupaten  
**Tampilan:**
- Grouped by provinsi
- Search bar (provinsi/kota/admin nama)
- Tabel: Kota/Kab | Admin | Email

**Use Case:** Monitoring coverage admin pemda di seluruh Indonesia

---

## 📊 Dashboard Pemda (Kota/Kabupaten)

**Role:** PEMDA  
**Akses:** Admin tingkat kota/kabupaten

### Fitur Statistik

#### 1. **Summary Cards**
- Total Laporan di kota/kab ini
- Total Selesai
- Persentase Selesai

#### 2. **Tren Mingguan (7 Hari Terakhir)**
Line chart aktivitas 7 hari terakhir.

**Use Case:** Monitoring apakah ada lonjakan mendadak (viral issue)

#### 3. **Distribusi Status**
Pie chart breakdown:
- Diterima
- Diverifikasi
- Diproses
- Selesai

**Color Coding:**
- Diterima: Kuning (#f59e0b)
- Diverifikasi: Biru (#3b82f6)
- Diproses: Ungu (#6366f1)
- Selesai: Hijau (#10b981)

#### 4. **Top 5 Kategori Masalah**
Bar chart kategori laporan di wilayah ini.

#### 5. **Top 5 Kecamatan Terpadat**
Horizontal bar chart kecamatan dengan laporan terbanyak.

**Use Case:** Identifikasi kecamatan yang butuh resource tambahan

#### 6. **Tabel Semua Kecamatan**
Daftar lengkap semua kecamatan + jumlah laporan masing-masing.

### Admin Tools

**Fitur:** Kelola Kecamatan & Petugas  
**Tampilan:**
- Search bar (kecamatan/petugas nama)
- Tabel: Kecamatan | Petugas | Email

**Use Case:** Monitoring coverage petugas pos di setiap kecamatan

---

## 📊 Dashboard Pos (Kecamatan)

**Role:** POS  
**Akses:** Petugas pos tingkat kecamatan

### Fitur Statistik

#### 1. **Summary Cards**
- Total Laporan di kecamatan ini
- Total Selesai
- Persentase Selesai

#### 2. **Tren 7 Hari Terakhir**
Mini line chart aktivitas mingguan.

#### 3. **Status Progress Bars**
Progress bar horizontal untuk setiap status:
- Visual persentase (width dinamis)
- Color-coded sesuai status
- Tampilkan count + percentage

**Design:** Lebih compact daripada pie chart, cocok untuk mobile

#### 4. **Aktivitas Terbaru (Timeline)**
5 laporan terbaru dengan:
- Timeline dot (color-coded by status)
- Judul laporan (link ke detail)
- Status badge
- Nama pelapor
- Timestamp

**Use Case:** Quick overview "What's happening now?"

#### 5. **Quick Action Button**
CTA button "Lihat Semua Laporan →" dengan gradient.

---

## 🎨 Design System

### Color Palette
```typescript
const COLORS = {
  primary: "#3b82f6",    // Blue
  success: "#10b981",    // Green
  warning: "#f59e0b",    // Yellow/Amber
  danger: "#ef4444",     // Red
  purple: "#8b5cf6",     // Purple
  indigo: "#6366f1",     // Indigo
  pink: "#ec4899",       // Pink
  teal: "#14b8a6",       // Teal
};
```

### Card Styling
- Border: `border-gray-200`
- Shadow: `shadow-sm`
- Radius: `rounded-xl` (12px)
- Padding: `p-6`

### Gradient Cards (Summary)
```css
border-2 border-blue-100 
bg-gradient-to-br from-blue-50 to-white
```

### Typography
- Title: `text-lg font-semibold text-gray-900`
- Subtitle: `text-sm text-gray-600`
- Value (large): `text-3xl font-bold`

---

## 📡 API Endpoints

### 1. `/api/dashboard/pusat-stats`
**Method:** GET  
**Auth:** Session (role: PUSAT)

**Response:**
```json
{
  "dailyTrend": [{ "date": "2026-11-01", "count": 45 }],
  "monthlyTrend": [{ "date": "2026-01", "count": 1234 }],
  "topCategories": [{ "kategori": "INFRASTRUKTUR", "count": 342 }],
  "ageDistribution": [{ "age_group": "18-25", "count": 156 }],
  "statusComparison": [{ "status": "Selesai", "count": 890 }],
  "provinsiHeatmap": [{ "provinsi": "Jawa Barat", "count": 456 }]
}
```

### 2. `/api/dashboard/pemda-stats`
**Method:** GET  
**Auth:** Session (role: PEMDA)

**Response:**
```json
{
  "perKecamatan": [{ "kecamatan": "Bandung Wetan", "count": 23 }],
  "statusDistribution": [{ "status": "Diterima", "count": 12 }],
  "weeklyTrend": [{ "date": "2026-11-01", "count": 5 }],
  "topCategories": [{ "kategori": "INFRASTRUKTUR", "count": 34 }],
  "totalStats": { "total_laporan": 120, "selesai": 85, "pending": 35 }
}
```

### 3. `/api/dashboard/pos-stats`
**Method:** GET  
**Auth:** Session (role: POS)

**Response:**
```json
{
  "dailyTrend": [{ "date": "2026-11-01", "count": 3 }],
  "statusDistribution": [{ "status": "Diterima", "count": 5 }],
  "recentActivity": [{
    "id": 123,
    "judul": "Jalan Rusak",
    "status": "Diproses",
    "created_at": "2026-11-06T10:00:00Z",
    "pelapor_nama": "Budi"
  }],
  "totalStats": { "total_laporan": 45, "selesai": 30, "pending": 15 }
}
```

---

## 🛠️ Tech Stack

### Libraries
- **recharts** ^2.x - Chart library (Line, Bar, Pie)
- **date-fns** ^3.x - Date formatting
- **React** 19 - UI framework
- **TypeScript** 5.x - Type safety

### Components Structure
```
components/
├── dashboard/
│   ├── PusatDashboard.tsx       # Pusat main component
│   ├── PemdaDashboard.tsx       # Pemda main component
│   ├── PosDashboardContent.tsx  # Pos main component
│   ├── AdminTools.tsx           # Admin management (PUSAT/PEMDA)
│   └── InsightsSummary.tsx      # AI-like insights generator
└── ui/
    ├── ChartContainer.tsx       # Reusable chart wrapper
    ├── InsightCard.tsx          # Insight card component
    ├── StatCard.tsx             # Summary card
    └── StatusBadge.tsx          # Status badge
```

---

## 🚀 Installation & Usage

### Prerequisites
```bash
npm install recharts date-fns
```

### Run Dev Server
```bash
npm run dev
```

### Access Dashboards
- **Pusat:** http://localhost:3000/dashboard/pusat
- **Pemda:** http://localhost:3000/dashboard/pemda
- **Pos:** http://localhost:3000/dashboard/pos

---

## 📈 Performance Optimization

### Current Implementation
- ✅ Client-side rendering dengan `"use client"`
- ✅ API caching dengan `export const dynamic = "force-dynamic"`
- ✅ Lazy loading (React.useMemo untuk derived data)

### Future Improvements
1. **Server-Side Rendering** untuk initial load
2. **React Query** untuk caching + revalidation
3. **Chart virtualization** untuk dataset besar (>1000 points)
4. **WebSocket** untuk real-time updates
5. **Export to PDF/Excel** feature

---

## 🔐 Security

### Authorization
Semua endpoint dashboard:
- ✅ Session validation
- ✅ Role-based access control (RBAC)
- ✅ Wilayah filtering (POS/PEMDA hanya lihat data wilayah mereka)

### Data Privacy
- ✅ NIK tidak di-expose ke frontend (hanya age_group)
- ✅ Audit logging untuk sensitive data access

---

## 📝 TODO / Future Features

- [ ] Export chart as PNG/SVG
- [ ] Custom date range picker
- [ ] Compare periods (YoY, MoM)
- [ ] Email report scheduling
- [ ] Mobile-responsive optimization
- [ ] Dark mode support
- [ ] Real-time notifications
- [ ] Dashboard customization (drag & drop widgets)
- [ ] Drill-down capability (klik chart → detail table)
- [ ] Export to Excel/CSV

---

**Last Updated:** November 6, 2026  
**Version:** 1.0.0  
**Maintainer:** Dengar Rakyat Dev Team
