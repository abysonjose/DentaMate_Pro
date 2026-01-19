# DentaMate - Hospital Administration SaaS Platform

Complete microservices-based hospital administration system with AI-powered features. DentaMate is an AI-powered smart dental clinic automation platform that streamlines patient care, appointments, diagnostics, and clinic operations with capabilities like symptom analysis, QR/NFC check-ins, and e-prescriptions.

## 🏥 Project Overview

**DentaMate** is an enterprise-grade, multi-tenant SaaS platform for dental clinic management featuring:
- 15+ microservices architecture
- AI-powered diagnosis and OCR
- Real-time notifications and collaboration
- Comprehensive RBAC with 15+ user roles
- Multi-clinic and branch management

## 🏗️ Architecture

### Tech Stack
- **Backend**: Node.js v24, Java 25 (Spring Boot 4.0), Python 3.12
- **Frontend**: Angular v21
- **Database**: MongoDB Atlas
- **Cache**: Redis
- **Message Queue**: RabbitMQ (planned)
- **Container**: Docker + Kubernetes
- **CI/CD**: GitHub Actions

### Microservices

1. **API Gateway** (Node.js) - Port 3000
   - Central entry point
   - Authentication & authorization
   - Rate limiting & routing

2. **Auth Service** (Node.js) - Port 3001
   - User authentication (OAuth 2.0, JWT)
   - Role-based access control
   - Email/SMS verification

3. **User Service** (Node.js) - Port 3002
   - User management
   - Profile management
   - Staff & patient records

4. **Clinic Service** (Node.js) - Port 3003
   - Clinic & branch management
   - Department management
   - Duty rosters

5. **Appointment Service** (Spring Boot) - Port 3004
   - Appointment scheduling
   - Token queue management

6. **Billing & Payment Service** (Node.js) - Port 3005
   - Billing & invoicing
   - Payment processing (Razorpay)
   - Insurance claims

7. **Notification Service** (Node.js) - Port 3006
   - Email notifications
   - SMS notifications (Twilio)
   - Push notifications

8. **AI Diagnosis Service** (Python) - Port 3007
   - X-ray/image analysis
   - AI-powered diagnosis

9. **Prescription OCR Service** (Python) - Port 3008
   - OCR scanning
   - Prescription extraction

10. **Analytics Service** (Node.js) - Port 3009
    - Business intelligence
    - Reports & dashboards

## 🚀 Quick Start

### Prerequisites
- Node.js v24+
- Java 25+
- Python 3.12+
- Docker & Docker Compose
- MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Main Cop"

# Install API Gateway dependencies
cd backend/api-gateway
npm install
cp .env.example .env

# Install Auth Service dependencies
cd ../auth-service
npm install
cp .env.example .env

# Update .env files with your credentials
```

### Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Running Locally

```bash
# Terminal 1 - API Gateway
cd backend/api-gateway
npm run dev

# Terminal 2 - Auth Service
cd backend/auth-service
npm run dev
```

## 📋 User Roles & Permissions

### Administrative
- **SAAS_ADMIN** - Full system access
- **CENTRAL_ADMIN** - Multi-clinic management
- **BRANCH_ADMIN** - Single branch management

### Medical Staff
- **DOCTOR** - Patient diagnosis & treatment
- **HEAD_NURSE** - Nursing team lead
- **NURSE** - Patient care & vitals
- **ORTHOTIST** - Orthodontic services

### Operations
- **RECEPTIONIST** - Front desk operations
- **BILLING_OFFICER** - Billing & invoicing
- **ACCOUNTANT** - Financial management
- **HR_STAFF** - Human resources
- **SUPPORT_STAFF** - Support services

### Patients
- **PATIENT** - Patient portal access

## 🔐 API Documentation

### API Gateway
- Base URL: `http://localhost:3000`
- Health Check: `GET /health`
- API Version: `GET /api/v1`

### Auth Service
- Base URL: `http://localhost:3001`
- Register: `POST /api/v1/auth/register`
- Login: `POST /api/v1/auth/login`
- Refresh Token: `POST /api/v1/auth/refresh`

See individual service READMEs for detailed API documentation.

## 🗂️ Project Structure

```
Main Cop/
├── backend/
│   ├── api-gateway/          # API Gateway service
│   ├── auth-service/          # Authentication service
│   ├── user-service/          # User management
│   ├── clinic-service/        # Clinic management
│   ├── appointment-service/   # Appointments (Spring Boot)
│   ├── billing-payment-service/
│   ├── notification-service/
│   ├── ai-diagnosis-service/  # Python AI
│   ├── prescription-ocr-service/ # Python OCR
│   └── analytics-service/
├── frontend/
│   └── angular-app/          # Angular v21 frontend
├── docker-compose.yml        # Docker orchestration
└── README.md                 # This file
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 📦 Deployment

### Docker
```bash
# Build images
docker-compose build

# Push to registry
docker-compose push
```

### Kubernetes
```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
```

## 🔧 Configuration

### Environment Variables
- See `.env.example` in each service directory
- Configure MongoDB Atlas connection
- Set up OAuth 2.0 credentials
- Configure Twilio for SMS
- Set up Razorpay for payments

### Database
- MongoDB Atlas cluster
- Database per service pattern
- Automated backups

## 📊 Monitoring

- Health checks: `/health` endpoint
- Logs: Docker logs or Winston logger
- Metrics: Prometheus (planned)
- Tracing: Jaeger (planned)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - DentaMate Team

## 📧 Contact

- Email: abyjp16@gmail.com
- GitHub: @abysonjose

## 🙏 Acknowledgments

- MongoDB Atlas
- Google OAuth 2.0
- Twilio SMS
- Razorpay Payments

---

**Status**: 🚧 In Development

**Next Steps**:
1. ✅ API Gateway - Complete
2. ✅ Auth Service - Complete
3. 🔄 User Service - In Progress
4. ⏳ Clinic Service - Pending
5. ⏳ Appointment Service - Pending
