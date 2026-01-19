# 🚀 DentaMate Quick Start Guide

Complete setup instructions to get DentaMate API Gateway and Auth Service running.

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ **Node.js v24+** installed ([Download](https://nodejs.org/))
- ✅ **Docker Desktop** installed ([Download](https://www.docker.com/products/docker-desktop))
- ✅ **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- ✅ **Git** installed

## 🏗️ Project Structure

```
Main Cop/
├── backend/
│   ├── api-gateway/        # Port 3000 - Central API Gateway
│   └── auth-service/       # Port 3001 - Authentication Service
├── docker-compose.yml      # Docker orchestration
├── .env                    # Environment variables
└── README.md
```

## ⚡ Quick Start (Docker - Recommended)

### 1. Clone or Navigate to Project
```bash
cd "f:/Main Cop"
```

### 2. Verify Environment File
Check that `.env` file exists in the root directory with your credentials:
```bash
# Should contain:
# - JWT_SECRET
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - TWILIO credentials
```

### 3. Start All Services
```bash
docker-compose up -d
```

This will start:
- MongoDB (Port 27017)
- Redis (Port 6379)
- Auth Service (Port 3001)
- API Gateway (Port 3000)

### 4. Verify Services
```bash
# Check all containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Test API Gateway
curl http://localhost:3000/health

# Test Auth Service
curl http://localhost:3001/health
```

### 5. Stop Services
```bash
docker-compose down
```

## 🔧 Manual Setup (Development)

### Step 1: Install API Gateway Dependencies
```bash
cd backend/api-gateway
npm install
```

### Step 2: Configure API Gateway Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your values
notepad .env
```

### Step 3: Install Auth Service Dependencies
```bash
cd ../auth-service
npm install
```

### Step 4: Configure Auth Service Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add:
# - MongoDB Atlas URI
# - JWT secrets
# - Google OAuth credentials
# - Twilio credentials
notepad .env
```

### Step 5: Start MongoDB & Redis Locally
```bash
# Option 1: Use Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
docker run -d -p 6379:6379 --name redis redis:7-alpine

# Option 2: Install locally (Windows)
# Download and install MongoDB Community Server
# Download and install Redis for Windows
```

### Step 6: Start Services
```bash
# Terminal 1 - Auth Service
cd backend/auth-service
npm run dev

# Terminal 2 - API Gateway (in new terminal)
cd backend/api-gateway
npm run dev
```

## 🧪 Testing the Setup

### 1. Health Checks
```bash
# API Gateway
curl http://localhost:3000/health

# Auth Service
curl http://localhost:3001/health
```

Expected Response:
```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "service": "dentamate-api-gateway",
    "version": "1.0.0",
    "uptime": 123.45
  }
}
```

### 2. Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@dentamate.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "PATIENT"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@dentamate.com",
    "password": "SecurePass123!"
  }'
```

Response will include:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "abc123...",
    "user": { ... }
  }
}
```

### 4. Access Protected Route
```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🗄️ Database Setup

### MongoDB Atlas (Production)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Add your IP to whitelist (or allow all: 0.0.0.0/0)
4. Create database user
5. Get connection string
6. Update `MONGODB_URI` in `.env`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dentamate-auth?retryWrites=true&w=majority
```

### Local MongoDB (Development)
```bash
# Install MongoDB Community Server
# Connection string:
mongodb://localhost:27017/dentamate-auth
```

## 🔐 Security Configuration

### JWT Secrets
Generate strong secrets:
```bash
# Windows PowerShell
$([char[]](Get-Random -Count 64 -InputObject (0..255))) -join ''

# Or use online generator
# https://randomkeygen.com/
```

Update in `.env`:
```env
JWT_SECRET=your-generated-secret-here
JWT_REFRESH_SECRET=another-secret-here
```

### Google OAuth 2.0
Configure your own credentials:
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Twilio SMS
Configure your own credentials:
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## 📊 Monitoring

### View Logs
```bash
# Docker logs
docker-compose logs -f api-gateway
docker-compose logs -f auth-service

# Local logs
# Check logs/ directory in each service
```

### Database Connections
```bash
# MongoDB shell
docker exec -it dentamate-mongodb mongosh

# Redis CLI
docker exec -it dentamate-redis redis-cli
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### MongoDB Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user credentials are correct

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild containers
docker-compose up --build

# Clean Docker system
docker system prune -a
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend/api-gateway
rm -rf node_modules package-lock.json
npm install

cd ../auth-service
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. ✅ **Verify Setup** - Test all endpoints
2. 📖 **Read API Docs** - Check individual service READMEs
3. 🔨 **Build Frontend** - Connect Angular app
4. 🚀 **Add More Services** - User, Clinic, Appointment services
5. 🧪 **Write Tests** - Add unit and integration tests

## 🆘 Getting Help

- Check individual service READMEs:
  - `backend/api-gateway/README.md`
  - `backend/auth-service/README.md`
- Review logs for error messages
- Check environment variables are set correctly

## 🎉 Success!

If you see this response from health checks, you're all set:

```json
{
  "success": true,
  "message": "Service is healthy",
  "database": "connected"
}
```

**Happy Coding! 🚀**
