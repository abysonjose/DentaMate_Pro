import { Request } from 'express';
import { UserRole } from './roles';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  clinicId?: string;
  branchId?: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export interface ServiceRoute {
  path: string;
  target: string;
  methods?: string[];
  authRequired?: boolean;
  permissions?: string[];
  rateLimit?: {
    windowMs: number;
    max: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export interface ServiceHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency?: number;
  lastCheck: string;
}

export interface GatewayConfig {
  port: number;
  env: string;
  services: {
    auth: string;
    user: string;
    clinic: string;
    appointment: string;
    billing: string;
    notification: string;
    aiDiagnosis: string;
    prescriptionOcr: string;
    analytics: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
    db: number;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  jwt: {
    secret: string;
    expiry: string;
  };
}
