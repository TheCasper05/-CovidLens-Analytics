# 🚀 CovidLens Analytics - Deployment Guide

This guide explains how to deploy the complete CovidLens Analytics application (Frontend + Backend + Database).

## 📋 Table of Contents
- [Architecture](#architecture)
- [Frontend Deployment (GitHub Pages)](#frontend-deployment-github-pages)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   GitHub Pages      │  ← Frontend (Vue.js)
│  (Static Hosting)   │
└──────────┬──────────┘
           │
           │ API Calls
           ▼
┌─────────────────────┐
│   Render.com        │  ← Backend (Flask/Python)
│  (Web Service)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Render.com        │  ← Database (PostgreSQL)
│  (PostgreSQL DB)    │
└─────────────────────┘
```

---

## 🌐 Frontend Deployment (GitHub Pages)

### Prerequisites
- GitHub account
- Repository with the code

### Steps

#### 1. Enable GitHub Pages
1. Go to your repository: https://github.com/TheCasper05/-CovidLens-Analytics
2. Click on **Settings** ⚙️
3. In the left sidebar, click **Pages**
4. Under **Source**, select: **GitHub Actions**
5. Click **Save**

#### 2. Automatic Deployment
The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) will automatically:
- Build the Vue.js frontend
- Deploy to GitHub Pages
- Make it available at: `https://thecasper05.github.io/-CovidLens-Analytics/`

#### 3. Trigger Deployment
Every push to the `main` branch will trigger a new deployment automatically.

---

## 🔧 Backend Deployment (Render)

### Prerequisites
- Render account (free tier): https://render.com
- GitHub account

### Steps

#### 1. Connect GitHub to Render
1. Go to https://dashboard.render.com
2. Click **New +** → **Blueprint**
3. Connect your GitHub account
4. Select the repository: `TheCasper05/-CovidLens-Analytics`

#### 2. Deploy with Blueprint
The `render.yaml` file will automatically create:
- ✅ PostgreSQL database (free tier, 1GB)
- ✅ Web service for the Flask backend
- ✅ Environment variables configured

#### 3. Wait for Deployment
- Database will deploy first (~5 minutes)
- Backend will deploy after database is ready (~10 minutes)
- You'll get a URL like: `https://covidlens-analytics.onrender.com`

#### 4. Load COVID-19 Data
After deployment, you need to load the dataset:

```bash
# 1. Download the dataset
curl -o owid-covid-data.csv https://github.com/owid/covid-19-data/raw/master/public/data/owid-covid-data.csv

# 2. Access Render Shell (via dashboard or CLI)
# 3. Run the initialization scripts
psql $DATABASE_URL < Backend/init-db/schema.sql
psql $DATABASE_URL < Backend/init-db/load.sql
```

**Alternative**: Use Render's Web Shell from the dashboard.

---

## 🔐 Environment Variables

### Frontend (.env)
Create a `.env` file in the `Frontend/` directory:

```bash
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

### Backend (Render Dashboard)
These are automatically set by `render.yaml`:
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port (5432)
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `FLASK_ENV` - production

---

## ✅ Post-Deployment

### 1. Update Frontend API URL
After backend is deployed, update the frontend:

```bash
cd Frontend
# Edit .env or create .env.production
echo "VITE_API_BASE_URL=https://your-backend.onrender.com/api" > .env.production
```

Commit and push to trigger a new deployment:
```bash
git add Frontend/.env.production
git commit -m "Update production API URL"
git push origin main
```

### 2. Test the Application
1. Frontend: https://thecasper05.github.io/-CovidLens-Analytics/
2. Backend API: https://your-backend.onrender.com/health
3. Check the dashboard loads data correctly

### 3. Monitor Logs
- **Frontend**: Check GitHub Actions tab for build logs
- **Backend**: Check Render dashboard for runtime logs

---

## 🐛 Troubleshooting

### Frontend Issues
- **404 errors**: Check that `base` in `vite.config.ts` matches your repository name
- **API errors**: Verify `VITE_API_BASE_URL` is correct
- **Build fails**: Check GitHub Actions logs

### Backend Issues
- **Database connection failed**: Check environment variables in Render
- **Slow first request**: Render free tier sleeps after 15 min inactivity (first request takes ~30s)
- **No data**: Make sure you loaded the CSV data into PostgreSQL

### CORS Issues
If you get CORS errors, verify Flask-CORS is configured in `Backend/app/__init__.py`:
```python
CORS(app)
```

---

## 💰 Cost Breakdown

### Free Tier (Recommended)
- **GitHub Pages**: ✅ Free (unlimited for public repos)
- **Render PostgreSQL**: ✅ Free (1GB, expires after 90 days)
- **Render Web Service**: ✅ Free (750 hrs/month, sleeps after inactivity)

**Total Cost**: $0/month

### Production Tier (Optional)
- **Render PostgreSQL**: $7/month (256MB, persistent)
- **Render Web Service**: $7/month (no sleep, always on)

**Total Cost**: $14/month

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Flask Production Best Practices](https://flask.palletsprojects.com/en/latest/deploying/)

---

## 👥 Authors
- Jean Marthé
- Oscar Gil
- Juan Palacios

**Universidad del Norte** - Database Laboratory Project

---

## 📄 License
MIT License - feel free to use this project for learning purposes!
