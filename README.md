# Dashboard DB

Business Dashboard with Supabase integration and Railway deployment.

## Features

- 📊 Real-time KPI dashboard
- 📈 Sales data visualization
- 🌍 Multi-environment deployment (production & staging)
- 🚀 Automatic deployment from GitHub (main & dev branches)

## Project Structure

```
.
├── index.html          # Frontend HTML
├── style.css           # Styling (RTL for Hebrew)
├── script.js           # Frontend logic with Supabase integration
├── Dockerfile          # Frontend Docker container
└── backend/            # Backend API
    ├── server.js       # Node.js API server
    ├── package.json
    └── Dockerfile      # Backend Docker container
```

## Quick Start

### Local Development

```bash
# Start frontend
python -m http.server 8000

# Start backend
cd backend
node server.js
```

### Environment Variables

Create `.env` file in the root:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
```

## Railway Deployment

### Project Setup

- **Project**: dashboard-db
- **Environments**: 
  - Production (main branch)
  - Staging (dev branch)
- **Services**:
  - Frontend (port 8000)
  - Backend API (port 3000)

### Deploy Instructions

1. Go to [Railway Dashboard](https://railway.com)
2. Connect to GitHub repository: `shaharlembergliany-code/dashboard-db`
3. For each service:
   - Set environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_KEY`
     - `PORT=8000` (for frontend) or `PORT=3000` (for backend)

### Production Deployment

Push to `main` branch to trigger production deployment:

```bash
git checkout main
git merge staging
git push origin main
```

### Staging Deployment

Push to `dev` branch to trigger staging deployment:

```bash
git checkout dev
git push origin dev
```

## Database Schema

### Tables

#### kpis
- id (BIGSERIAL PRIMARY KEY)
- revenue (DECIMAL)
- customers (INTEGER)
- orders (INTEGER)
- satisfaction (DECIMAL)
- updated_at (TIMESTAMP)

#### sales
- id (BIGSERIAL PRIMARY KEY)
- date (DATE)
- product (VARCHAR)
- quantity (INTEGER)
- price (DECIMAL)
- total (DECIMAL)
- status (VARCHAR)
- created_at (TIMESTAMP)

## API Endpoints

### Frontend
- `GET /` - Main dashboard

### Backend
- `GET /api/health` - Health check
- `GET /api/data` - Get KPI data

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (RTL)
- **Backend**: Node.js
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Railway
- **Version Control**: GitHub

## Contributing

1. Create a feature branch from `dev`
2. Make changes and test locally
3. Push to `dev` for staging deployment
4. Create pull request to `main` for production

## License

MIT
