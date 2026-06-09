# 🚀 Quick Start Guide - Pharmaceutical Similarity Detection Platform

This guide will help you get the project up and running in minutes.

---

## ⚠️ Important Note

**This project structure is currently a template/skeleton.** The actual application code (API endpoints, models, services, etc.) needs to be implemented following the [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md).

However, you can still set up the development environment and verify that all configurations are working correctly.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.12+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 15+** - [Download](https://www.postgresql.org/download/)
- **Docker & Docker Compose** (Optional but recommended) - [Download](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/downloads)

---

## 🎯 Three Ways to Run This Project

### Option 1: Docker Compose (Recommended - Easiest)
### Option 2: Manual Setup (Full Control)
### Option 3: Development Mode (For Active Development)

---

## 🐳 Option 1: Docker Compose (Recommended)

This is the easiest way to get everything running with one command.

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd "Helthcare Ai"
```

### Step 2: Create Environment Files
```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.local.example frontend/.env.local
```

### Step 3: Start All Services
```bash
docker-compose -f docker/docker-compose.yml up -d
```

This will start:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- Backend API (port 8000)
- Frontend app (port 3000)

### Step 4: Verify Services
```bash
# Check running containers
docker-compose -f docker/docker-compose.yml ps

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Check backend health
curl http://localhost:8000/health

# Check frontend
open http://localhost:3000
```

### Step 5: Stop Services
```bash
docker-compose -f docker/docker-compose.yml down

# To remove volumes as well
docker-compose -f docker/docker-compose.yml down -v
```

---

## 🔧 Option 2: Manual Setup

For more control over each component.

### Step 1: Set Up PostgreSQL Database

```bash
# Create database
createdb pharma_db

# Or using psql
psql -U postgres
CREATE DATABASE pharma_db;
CREATE USER pharma_user WITH PASSWORD 'pharma_password';
GRANT ALL PRIVILEGES ON DATABASE pharma_db TO pharma_user;
\q
```

### Step 2: Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://pharma_user:pharma_password@localhost:5432/pharma_db

# Run database migrations (once implemented)
# alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

### Step 3: Set Up Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start the development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### Step 4: Set Up Redis (Optional)

```bash
# Install Redis
# macOS:
brew install redis
brew services start redis

# Ubuntu/Debian:
sudo apt-get install redis-server
sudo systemctl start redis

# Windows:
# Download from https://github.com/microsoftarchive/redis/releases
```

---

## 💻 Option 3: Development Mode

For active development with hot-reloading.

### Terminal 1 - Database
```bash
# Start PostgreSQL
# macOS:
brew services start postgresql@15

# Ubuntu/Debian:
sudo systemctl start postgresql

# Or use Docker for just the database
docker run -d \
  --name pharma-postgres \
  -e POSTGRES_USER=pharma_user \
  -e POSTGRES_PASSWORD=pharma_password \
  -e POSTGRES_DB=pharma_db \
  -p 5432:5432 \
  postgres:15-alpine
```

## 🔧 Option 2: Manual Setup

### Step 2: Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://pharma_user:pharma_password@localhost:5432/pharma_db

# Add Gemini API credentials to .env
# GEMINI_API_KEY=your_gemini_api_key

# Run database migrations (once implemented)
# alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 3 - Frontend
```bash
cd frontend

# Development mode with hot-reload
npm run dev

# Or build and start (production-like)
npm run build
npm start
```

### Terminal 4 - Redis (Optional)
```bash
redis-server
```

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
source venv/bin/activate

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test types
pytest -m unit
pytest -m integration
pytest -m e2e

# Run specific test file
pytest tests/unit/test_services/test_name_similarity.py
```

### Frontend Tests
```bash
cd frontend

# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 📊 Accessing the Application

Once everything is running:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main web application |
| Backend API | http://localhost:8000 | REST API |
| API Docs (Swagger) | http://localhost:8000/docs | Interactive API documentation |
| API Docs (ReDoc) | http://localhost:8000/redoc | Alternative API documentation |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |

---

## 🔍 Verifying the Setup

### Check Backend
```bash
# Health check
curl http://localhost:8000/health

# API documentation
open http://localhost:8000/docs
```

### Check Frontend
```bash
# Open in browser
open http://localhost:3000
```

### Check Database
```bash
# Connect to database
psql -U pharma_user -d pharma_db -h localhost

# List tables (once migrations are run)
\dt

# Exit
\q
```

### Check Redis
```bash
# Test Redis connection
redis-cli ping
# Should return: PONG
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: ModuleNotFoundError**
```bash
# Solution: Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Database connection error**
```bash
# Solution: Check PostgreSQL is running
pg_isready

# Check connection string in .env
DATABASE_URL=postgresql://pharma_user:pharma_password@localhost:5432/pharma_db
```

**Problem: Port 8000 already in use**
```bash
# Solution: Find and kill the process
# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Problem: Module not found**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem: Port 3000 already in use**
```bash
# Solution: Use a different port
PORT=3001 npm run dev
```

**Problem: API connection error**
```bash
# Solution: Check NEXT_PUBLIC_API_URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# Restart the dev server
npm run dev
```

### Docker Issues

**Problem: Docker containers won't start**
```bash
# Solution: Check Docker is running
docker ps

# View logs
docker-compose -f docker/docker-compose.yml logs

# Rebuild containers
docker-compose -f docker/docker-compose.yml up --build
```

**Problem: Port conflicts**
```bash
# Solution: Stop conflicting services
docker-compose -f docker/docker-compose.yml down

# Or change ports in docker-compose.yml
```

---

## 🔐 Default Credentials

**Database:**
- Username: `pharma_user`
- Password: `pharma_password`
- Database: `pharma_db`

**Note:** Change these in production!

---

## 📝 Environment Variables

### Backend (.env)
```bash
# Application
APP_NAME="Pharma Similarity Platform"
ENVIRONMENT="development"

# Database
DATABASE_URL="postgresql://pharma_user:pharma_password@localhost:5432/pharma_db"

# Security
SECRET_KEY="your-secret-key-change-in-production"
JWT_SECRET_KEY="your-jwt-secret-change-in-production"

# Redis
REDIS_URL="redis://localhost:6379/0"
```

### Frontend (.env.local)
```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Application
NEXT_PUBLIC_APP_NAME="Pharma Similarity Platform"
NEXT_PUBLIC_ENVIRONMENT=development
```

---

## 🎯 Next Steps After Setup

1. **Verify Setup** - Ensure all services are running
2. **Review Documentation** - Read [ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md)
3. **Start Implementation** - Follow [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
4. **Create First Endpoint** - Implement `/health` endpoint
5. **Set Up Database Models** - Create SQLAlchemy models
6. **Run Migrations** - Set up database schema
7. **Implement Core Features** - Follow the 16-week plan

---

## 📚 Additional Resources

- [README.md](./README.md) - Project overview
- [ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md) - System architecture
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Development roadmap
- [TECH_STACK.md](./TECH_STACK.md) - Technology details
- [backend/README.md](./backend/README.md) - Backend documentation

---

## 🆘 Getting Help

- **Issues:** Create an issue on GitHub
- **Documentation:** Check the `/docs` directory
- **Email:** support@pharma-platform.co.za

---

## ⚡ Quick Commands Reference

```bash
# Docker
docker-compose -f docker/docker-compose.yml up -d    # Start all services
docker-compose -f docker/docker-compose.yml down     # Stop all services
docker-compose -f docker/docker-compose.yml logs -f  # View logs

# Backend
cd backend && source venv/bin/activate               # Activate environment
uvicorn app.main:app --reload                        # Start backend
pytest                                                # Run tests
alembic upgrade head                                  # Run migrations

# Frontend
cd frontend                                           # Go to frontend
npm install                                           # Install dependencies
npm run dev                                           # Start dev server
npm run build                                         # Build for production
npm test                                              # Run tests

# Database
psql -U pharma_user -d pharma_db                     # Connect to database
createdb pharma_db                                    # Create database
pg_isready                                            # Check if PostgreSQL is running

# Redis
redis-server                                          # Start Redis
redis-cli ping                                        # Test Redis connection
```

---

**Status:** ✅ Setup Guide Complete  
**Last Updated:** 2026-05-16  
**Version:** 1.0.0