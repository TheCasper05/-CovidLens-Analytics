# 🔬 CovidLens Analytics

> Dashboard interactivo de visualización de datos COVID-19 con arquitectura de tres capas desplegada en la nube

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://covidlens-frontend.vercel.app)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat&logo=postgresql)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🌐 Demo en Vivo](https://covidlens-frontend.vercel.app) | [📊 API Docs](https://covid-lens-analytics.vercel.app/api/health) | [📂 Repositorio](https://github.com/TheCasper05/-CovidLens-Analytics)

---

## 📖 Descripción

**CovidLens Analytics** es una aplicación web full-stack que visualiza estadísticas globales de COVID-19 en tiempo real. Permite a los usuarios explorar datos epidemiológicos de más de 230 países mediante gráficas interactivas, filtros dinámicos y una interfaz moderna y responsive.

### ✨ Características Principales

- 📊 **Visualización Interactiva**: Gráficas de líneas, barras y pastel con ApexCharts
- 🌍 **Filtros Dinámicos**: Por país, continente, métrica y rango de fechas
- 📈 **Datos Reales**: +350,000 registros históricos desde enero 2020
- 🚀 **Performance Optimizado**: Connection pooling, lazy loading, CDN global
- 📱 **Responsive Design**: Funciona perfectamente en móvil y escritorio
- 🔒 **Seguro**: HTTPS automático, CORS configurado, variables de entorno

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────┐
│              USUARIO (Navegador)                     │
│         https://covidlens-frontend.vercel.app       │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTPS Request
                     ↓
┌─────────────────────────────────────────────────────┐
│          FRONTEND (Vue.js en Vercel)                │
│  • Vue 3 + TypeScript + Tailwind CSS                │
│  • ApexCharts para visualizaciones                  │
│  • Vite + Bun para build ultrarrápido               │
└────────────────────┬────────────────────────────────┘
                     │
                     │ REST API (JSON)
                     ↓
┌─────────────────────────────────────────────────────┐
│          BACKEND (Flask en Vercel)                  │
│  • Flask REST API (Python 3.10)                     │
│  • Connection pooling (1-20 conexiones)             │
│  • Serverless functions                             │
└────────────────────┬────────────────────────────────┘
                     │
                     │ SQL Queries
                     ↓
┌─────────────────────────────────────────────────────┐
│       BASE DE DATOS (PostgreSQL en Supabase)        │
│  • PostgreSQL 15                                    │
│  • 350,218 filas × 67 columnas                      │
│  • Índices optimizados                              │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Vue.js 3](https://vuejs.org/) - Progressive JavaScript Framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS
- **Charts**: [ApexCharts](https://apexcharts.com/) - Modern charting library
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Package Manager**: [Bun](https://bun.sh/) - Ultra-fast JavaScript runtime

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/) - Python microframework
- **Language**: Python 3.10
- **Database Driver**: psycopg2 - PostgreSQL adapter
- **CORS**: Flask-CORS - Cross-Origin Resource Sharing

### Database
- **DBMS**: PostgreSQL 15
- **Hosting**: [Supabase](https://supabase.com/) - Open source Firebase alternative
- **Data Source**: [Our World in Data](https://ourworldindata.org/covid-deaths)

### Deployment & DevOps
- **Frontend & Backend**: [Vercel](https://vercel.com/) - Serverless platform
- **CI/CD**: GitHub Actions + Vercel auto-deploy
- **Version Control**: Git + GitHub

---

## 📊 Dataset

**Fuente**: [Our World in Data - COVID-19 Dataset](https://github.com/owid/covid-19-data)

### Estadísticas del Dataset
- **Filas**: 350,218 registros
- **Columnas**: 67 variables
- **Tamaño**: ~150 MB
- **Rango temporal**: Enero 2020 - Marzo 2023
- **Cobertura**: 230+ países y territorios

### Variables Principales
| Categoría | Variables |
|-----------|-----------|
| **Epidemiológicas** | total_cases, new_cases, total_deaths, new_deaths, reproduction_rate |
| **Hospitalización** | icu_patients, hosp_patients, weekly admissions |
| **Testing** | total_tests, positive_rate, tests_per_case |
| **Vacunación** | total_vaccinations, people_vaccinated, people_fully_vaccinated, total_boosters |
| **Demográficas** | population, population_density, median_age, aged_65_older |
| **Socioeconómicas** | gdp_per_capita, extreme_poverty, human_development_index |

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js >= 20.19.0 o Bun >= 1.0
- Python >= 3.10
- PostgreSQL >= 15 (o cuenta en Supabase)
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TheCasper05/-CovidLens-Analytics.git
cd -CovidLens-Analytics
```

### 2. Configurar Frontend

```bash
cd Frontend
bun install  # o npm install

# Crear archivo .env.local
echo "VITE_API_BASE_URL=http://localhost:5001/api/covid" > .env.local

# Ejecutar en desarrollo
bun run dev  # o npm run dev

# Build para producción
bun run build
```

### 3. Configurar Backend

```bash
cd Backend
pip install -r requirements.txt

# Crear archivo .env
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_USER=labuser
DB_PASSWORD=labpass
DB_NAME=labdb
FLASK_ENV=development
EOF

# Ejecutar servidor
python run.py
```

### 4. Configurar Base de Datos

#### Opción A: Docker (Local)

```bash
docker compose up -d
```

#### Opción B: Supabase (Cloud)

1. Crear proyecto en https://supabase.com
2. Ejecutar el schema en SQL Editor:

```bash
cat Backend/init-db/0_schema.sql
# Copiar y pegar en Supabase SQL Editor
```

3. Cargar datos:

```bash
# Descargar dataset
curl -L -o /tmp/owid-covid-data.csv \
  "https://github.com/owid/covid-19-data/raw/master/public/data/owid-covid-data.csv"

# Ejecutar script de carga (ajustar connection string)
python Backend/scripts/load_data.py
```

---

## 📂 Estructura del Proyecto

```
-CovidLens-Analytics/
├── Frontend/                    # Aplicación Vue.js
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── cards/           # Tarjetas de estadísticas
│   │   │   ├── charts/          # Componentes de gráficas
│   │   │   ├── filters/         # Panel de filtros
│   │   │   └── layout/          # Layout components (TopBar)
│   │   ├── views/               # Páginas/vistas
│   │   │   ├── HomeView.vue     # Dashboard principal
│   │   │   └── AboutView.vue    # Página sobre el proyecto
│   │   ├── services/            # Servicios API
│   │   │   └── api.ts           # Cliente Axios
│   │   ├── types/               # Definiciones TypeScript
│   │   └── main.ts              # Punto de entrada
│   ├── public/                  # Assets estáticos
│   ├── index.html               # HTML principal
│   ├── vite.config.ts           # Configuración Vite
│   ├── vercel.json              # Configuración Vercel
│   └── package.json             # Dependencias frontend
│
├── Backend/                     # API Flask
│   ├── app/
│   │   ├── __init__.py          # Factory de Flask app
│   │   ├── config/
│   │   │   └── database.py      # Connection pooling
│   │   └── routes/
│   │       └── covid_routes.py  # Endpoints API
│   ├── init-db/
│   │   ├── 0_schema.sql         # Schema PostgreSQL
│   │   ├── 1_download_dataset.sh # Script descarga
│   │   └── 2_load.sql           # Script carga
│   ├── run.py                   # Punto de entrada
│   ├── requirements.txt         # Dependencias Python
│   └── vercel.json              # Configuración Vercel
│
├── docker-compose.yml           # Docker setup local
├── Dockerfile.postgres          # Dockerfile PostgreSQL
├── .gitignore                   # Archivos ignorados
├── DEPLOYED.md                  # Documentación deployment
└── README.md                    # Este archivo
```

---

## 🔌 API Endpoints

**Base URL**: `https://covid-lens-analytics.vercel.app/api/covid`

### Health Check
```http
GET /health
```
Verifica que el API esté funcionando.

**Response:**
```json
{
  "status": "ok",
  "message": "COVID-19 Dashboard API",
  "version": "1.0.0"
}
```

### Resumen Global
```http
GET /summary
```
Obtiene estadísticas globales totales.

**Response:**
```json
{
  "total_cases": 482930115,
  "total_deaths": 6189122,
  "total_vaccinations": 13300882148
}
```

### Países Disponibles
```http
GET /locations
```
Lista de todos los países disponibles.

**Response:**
```json
{
  "locations": ["World", "Colombia", "Mexico", "United States", ...]
}
```

### Top Países por Métrica
```http
GET /top-countries?metric=total_cases&limit=10
```
Top N países según una métrica específica.

**Query Parameters:**
- `metric` (string): total_cases | total_deaths | total_vaccinations
- `limit` (number): Cantidad de países a retornar

**Response:**
```json
[
  {"label": "United States", "value": 103436829},
  {"label": "China", "value": 99244409},
  ...
]
```

### Datos por Continente
```http
GET /continents
```
Resumen de casos y muertes por continente.

**Response:**
```json
[
  {"continent": "Asia", "total_cases": 295847124, "total_deaths": 1626870},
  ...
]
```

### Serie Temporal
```http
GET /time-series?location=Colombia&metric=total_cases
```
Evolución temporal de una métrica para un país.

**Query Parameters:**
- `location` (string): Nombre del país
- `metric` (string): Métrica a consultar

**Response:**
```json
[
  {"date": "2020-03-06", "value": 1},
  {"date": "2020-03-07", "value": 1},
  ...
]
```

---

## 🎨 Capturas de Pantalla

### Dashboard Principal
![Dashboard](docs/screenshots/dashboard.png)

### Filtros y Gráficas
![Filters](docs/screenshots/filters.png)

### Página About
![About](docs/screenshots/about.png)

---

## 🧪 Testing

### Frontend

```bash
cd Frontend
bun run build     # Verificar que compila sin errores
bun run preview   # Previsualizar build de producción
```

### Backend

```bash
cd Backend
# Test health endpoint
curl https://covid-lens-analytics.vercel.app/api/health

# Test summary endpoint
curl https://covid-lens-analytics.vercel.app/api/covid/summary
```

### Base de Datos

```sql
-- Verificar integridad
SELECT COUNT(*) FROM covid_data;  -- Esperado: ~350,000

-- Verificar rango de fechas
SELECT MIN(date), MAX(date) FROM covid_data;

-- Verificar países
SELECT COUNT(DISTINCT location) FROM covid_data;  -- Esperado: ~230
```

---

## 🚢 Deployment

### Frontend (Vercel)

1. Conectar repositorio de GitHub a Vercel
2. Configurar:
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend`
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
3. Agregar variable de entorno:
   - `VITE_API_BASE_URL` = `https://covid-lens-analytics.vercel.app/api/covid`
4. Deploy automático en cada push a `main`

### Backend (Vercel)

1. Crear nuevo proyecto en Vercel
2. Configurar:
   - **Framework Preset**: Other
   - **Root Directory**: (dejar vacío o `Backend`)
3. Agregar variable de entorno:
   - `DATABASE_URL` = `postgresql://...` (connection string de Supabase)
4. Deploy automático en cada push a `main`

### Base de Datos (Supabase)

1. Crear proyecto en https://supabase.com
2. Ejecutar schema SQL (`0_schema.sql`)
3. Cargar datos con script Python
4. Crear índices para optimización:
```sql
CREATE INDEX idx_location ON covid_data(location);
CREATE INDEX idx_date ON covid_data(date);
CREATE INDEX idx_location_date ON covid_data(location, date);
```

---

## 👥 Equipo

| Miembro | Rol | Contribución |
|---------|-----|--------------|
| **Jean Marthe** | Full Stack Developer | Arquitectura, Backend, Deployment |
| **Oscar Gil** | Frontend Developer | UI/UX, Componentes Vue, Gráficas |
| **Juan Palacios** | Database Engineer | Schema, Queries, ETL |

---

## 🎓 Información Académica

- **Universidad**: Universidad del Norte
- **Curso**: Laboratorio de Bases de Datos
- **Profesor**: [Nombre del Profesor]
- **Año**: 2025
- **Semestre**: 2025-30

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la Universidad del Norte.

---

## 🙏 Agradecimientos

- [Our World in Data](https://ourworldindata.org/) por el dataset público
- [Vercel](https://vercel.com/) por el hosting gratuito
- [Supabase](https://supabase.com/) por la base de datos PostgreSQL
- Comunidad de Vue.js y Flask

---

## 📞 Contacto

- **Email**: jeanmarthem@gmail.com
- **GitHub**: [@TheCasper05](https://github.com/TheCasper05)
- **Demo**: [covidlens-frontend.vercel.app](https://covidlens-frontend.vercel.app)

---

<div align="center">
  <p>Hecho con ❤️ para la Universidad del Norte</p>
  <p>🤖 Desarrollado con asistencia de <a href="https://claude.ai">Claude Code</a></p>
</div>
