# DentaMate Auth Service

Complete authentication and authorization service with OAuth 2.0, JWT, and role-based access control.

## Features

- ✅ **User Registration** - Email/password with verification
- ✅ **User Login** - Secure authentication with JWT
- ✅ **OAuth 2.0** - Google authentication
- ✅ **JWT Tokens** - Access & refresh tokens
- ✅ **Email Verification** - Nodemailer with Gmail
- ✅ **Password Reset** - Secure token-based reset
- ✅ **Role-Based Access Control** - 15+ user roles
- ✅ **Account Locking** - Protection against brute force
- ✅ **Audit Logging** - Complete activity trail
- ✅ **SMS Notifications** - Twilio integration

## Tech Stack

- **Runtime**: Node.js v24
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **Authentication**: JWT + OAuth 2.0
- **Email**: Nodemailer (Gmail)
- **SMS**: Twilio

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
# Start in development mode
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Public Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "PATIENT"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Forgot Password
```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token",
  "newPassword": "NewSecurePass123!"
}
```

#### Verify Email
```http
GET /api/v1/auth/verify-email?token=verification-token
```

### Protected Endpoints

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {access_token}
```

## User Roles

- **SAAS_ADMIN** - System administrator
- **CENTRAL_ADMIN** - Multi-clinic admin
- **BRANCH_ADMIN** - Branch manager
- **DOCTOR** - Medical practitioner
- **HEAD_NURSE** - Senior nursing staff
- **NURSE** - Nursing staff
- **ORTHOTIST** - Orthodontic specialist
- **RECEPTIONIST** - Front desk
- **BILLING_OFFICER** - Billing department
- **ACCOUNTANT** - Finance department
- **ACCOUNTS_MANAGER** - Finance manager
- **PAYROLL_OFFICER** - Payroll department
- **HR_STAFF** - Human resources
- **SUPPORT_STAFF** - Support services
- **INSURANCE_OFFICER** - Insurance claims
- **PATIENT** - Patient user

## Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Account Protection
- Maximum 5 failed login attempts
- 15-minute account lockout
- Automatic unlock after timeout

### Token Security
- Access tokens expire in 24 hours
- Refresh tokens expire in 7 days
- Password reset tokens expire in 1 hour
- Email verification tokens expire in 24 hours

## Environment Variables

See `.env.example` for all required configuration.

## Database Models

### User Model
- Authentication credentials
- Personal information
- Role and permissions
- Email/phone verification status
- Login attempts tracking

### Refresh Token Model
- Token storage
- Expiration tracking
- Revocation support

### Audit Log Model
- User activity tracking
- Security event logging
- 90-day retention

## License

MIT License - DentaMate Team
