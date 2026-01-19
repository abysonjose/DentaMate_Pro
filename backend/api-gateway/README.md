# DentaMate API Gateway

Central entry point for all DentaMate microservices with authentication, authorization, and request routing.

## Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control (RBAC)** - 15+ user roles with granular permissions
- ✅ **Service Discovery** - Dynamic routing to microservices
- ✅ **Rate Limiting** - Protection against DDoS attacks
- ✅ **Request Logging** - Comprehensive audit trail
- ✅ **Health Monitoring** - Service health checks
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Compression** - Response compression for performance
- ✅ **Security Headers** - Helmet.js integration

## Tech Stack

- **Runtime**: Node.js v24
- **Framework**: Express.js
- **Language**: TypeScript
- **Proxy**: http-proxy-middleware
- **Cache**: Redis
- **Authentication**: JWT

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your configuration
```

## Development

```bash
# Start in development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Docker

```bash
# Build image
docker build -t dentamate-api-gateway .

# Run container
docker run -p 3000:3000 --env-file .env dentamate-api-gateway
```

## API Routes

### Public Routes
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/verify-email` - Verify email

### Protected Routes (Require Authentication)

#### Auth Service
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

#### User Service
- `GET /api/v1/users` - List users (RBAC)
- `POST /api/v1/users` - Create user (RBAC)
- `GET /api/v1/users/:id` - Get user details
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (RBAC)

#### Clinic Service
- `GET /api/v1/clinics` - List clinics
- `POST /api/v1/clinics` - Create clinic (Admin)
- `GET /api/v1/clinics/:id` - Get clinic details
- `PUT /api/v1/clinics/:id` - Update clinic
- `GET /api/v1/branches` - List branches
- `POST /api/v1/branches` - Create branch (Admin)

#### Appointment Service
- `GET /api/v1/appointments` - List appointments
- `POST /api/v1/appointments` - Create appointment
- `PUT /api/v1/appointments/:id` - Update appointment
- `DELETE /api/v1/appointments/:id` - Cancel appointment

#### Billing Service
- `GET /api/v1/billing` - List bills
- `POST /api/v1/billing` - Create bill
- `POST /api/v1/payments` - Process payment

#### AI Services
- `POST /api/v1/ai/diagnosis` - AI diagnosis (Doctors only)
- `POST /api/v1/ai/ocr` - OCR prescription scan

#### Analytics Service
- `GET /api/v1/analytics/dashboard` - Dashboard analytics
- `GET /api/v1/analytics/reports` - Generate reports

## User Roles & Permissions

### Administrative Roles
- **SAAS_ADMIN** - Full system access
- **CENTRAL_ADMIN** - Multi-clinic management
- **BRANCH_ADMIN** - Single branch management

### Medical Staff
- **DOCTOR** - Patient diagnosis & treatment
- **HEAD_NURSE** - Nursing team management
- **NURSE** - Patient care & vitals
- **ORTHOTIST** - Orthodontic services

### Front Office
- **RECEPTIONIST** - Appointments & check-in

### Financial
- **BILLING_OFFICER** - Billing & invoicing
- **ACCOUNTANT** - Financial reports
- **ACCOUNTS_MANAGER** - Revenue analytics
- **PAYROLL_OFFICER** - Payroll management

### Other Roles
- **HR_STAFF** - HR management
- **SUPPORT_STAFF** - Support services
- **INSURANCE_OFFICER** - Insurance claims
- **PATIENT** - Patient portal

## Environment Variables

See `.env.example` for all configuration options.

## Health Check

```bash
curl http://localhost:3000/health
```

## License

MIT License - DentaMate Team
