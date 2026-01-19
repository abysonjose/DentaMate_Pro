import dotenv from 'dotenv';
import { GatewayConfig } from '../types';

dotenv.config();

export const config: GatewayConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    user: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    clinic: process.env.CLINIC_SERVICE_URL || 'http://localhost:3003',
    appointment: process.env.APPOINTMENT_SERVICE_URL || 'http://localhost:3004',
    billing: process.env.BILLING_SERVICE_URL || 'http://localhost:3005',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3006',
    aiDiagnosis: process.env.AI_DIAGNOSIS_SERVICE_URL || 'http://localhost:3007',
    prescriptionOcr: process.env.PRESCRIPTION_OCR_SERVICE_URL || 'http://localhost:3008',
    analytics: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:3009'
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10)
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiry: process.env.JWT_EXPIRY || '24h'
  }
};
