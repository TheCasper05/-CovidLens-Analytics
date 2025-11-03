# 🚀 CovidLens Analytics - Deployment Information

## 📦 Deployed URLs

### Frontend (Vercel)
- **URL**: https://covidlens-frontend.vercel.app
- **Status**: ✅ Deployed
- **Platform**: Vercel
- **Framework**: Vue 3 + Vite + Bun

### Backend (Vercel)
- **URL**: https://covid-lens-analytics.vercel.app
- **API Base**: https://covid-lens-analytics.vercel.app/api
- **Status**: ✅ Deployed
- **Platform**: Vercel
- **Framework**: Flask (Python)

### Alternative Frontend (GitHub Pages)
- **URL**: https://thecasper05.github.io/-CovidLens-Analytics/
- **Status**: ✅ Deployed
- **Platform**: GitHub Pages
- **Auto-deploy**: On push to `main`

---

## 🔧 Architecture

```
┌─────────────────────────────┐
│   Vercel Frontend           │
│   covidlens-frontend        │
│   (Vue.js + Vite)           │
└──────────┬──────────────────┘
           │
           │ HTTPS API Calls
           │
           ▼
┌─────────────────────────────┐
│   Vercel Backend            │
│   covid-lens-analytics      │
│   (Flask + Python)          │
└──────────┬──────────────────┘
           │
           │ Database Connection
           ▼
┌─────────────────────────────┐
│   PostgreSQL Database       │
│   (Pending Configuration)   │
└─────────────────────────────┘
```

---

## ⚙️ Configuration

### Frontend Environment Variables
```bash
VITE_API_BASE_URL=https://covid-lens-analytics.vercel.app/api
```

### Backend Environment Variables
```bash
FLASK_ENV=production
# Database variables (pending):
# DB_HOST=
# DB_PORT=
# DB_NAME=
# DB_USER=
# DB_PASSWORD=
```

---

## 📋 Next Steps

### 1. Configure Database (Required)
The backend currently doesn't have a database configured. Options:

#### Option A: Supabase (Recommended - Free)
1. Go to https://supabase.com
2. Create new project
3. Get connection string
4. Add to Vercel backend environment variables

#### Option B: Neon (Alternative - Free)
1. Go to https://neon.tech
2. Create database
3. Get connection string
4. Add to Vercel backend environment variables

### 2. Load COVID-19 Data
Once database is configured:
1. Download dataset: https://github.com/owid/covid-19-data/raw/master/public/data/owid-covid-data.csv
2. Run schema: `Backend/init-db/schema.sql`
3. Load data: `Backend/init-db/load.sql`

### 3. Test the Application
1. Visit: https://covidlens-frontend.vercel.app
2. Apply filters
3. View charts and data

---

## 🔄 Deployment Workflow

### Frontend
- **Trigger**: Push to `main` branch
- **Auto-deploy**: ✅ Enabled
- **Build time**: ~2-3 minutes
- **Platform**: Vercel

### Backend
- **Trigger**: Push to `main` branch
- **Auto-deploy**: ✅ Enabled
- **Build time**: ~1-2 minutes
- **Platform**: Vercel

---

## 🌐 Repository

- **GitHub**: https://github.com/TheCasper05/-CovidLens-Analytics
- **Branch**: `main`
- **Author**: Jean Marthe, Oscar Gil, Juan Palacios
- **University**: Universidad del Norte

---

## 📊 Features

### Current Features
- ✅ Dynamic dashboard title based on filters
- ✅ Modern branding (CovidLens Analytics)
- ✅ Real-time data visualization
- ✅ Interactive charts (ApexCharts)
- ✅ Responsive design
- ✅ Filter by location and metric
- ✅ Multiple chart types (Line, Bar, Pie)

### Pending Features
- ⏳ Database connection
- ⏳ Data loading
- ⏳ Full API functionality

---

## 🛠️ Local Development

### Frontend
```bash
cd Frontend
bun install
bun run dev
```

### Backend
```bash
cd Backend
pip install -r requirements.txt
python run.py
```

### Docker (Alternative)
```bash
docker compose up --build
```

---

## 📝 Notes

- Frontend uses Bun for faster builds
- Backend uses Flask with Gunicorn
- Database schema supports 67 columns from OWID dataset
- CORS is enabled for cross-origin requests
- Auto-deployment on every push to main

---

**Last Updated**: 2025-11-03
**Deployment Platform**: Vercel
**Status**: ✅ Active
