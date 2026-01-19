import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { Permission } from '../types/roles';
import {
  authServiceProxy,
  userServiceProxy,
  clinicServiceProxy,
  appointmentServiceProxy,
  billingServiceProxy,
  notificationServiceProxy,
  aiDiagnosisServiceProxy,
  prescriptionOcrServiceProxy,
  analyticsServiceProxy
} from '../middleware/proxy.middleware';

const router = Router();

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

// Auth Service - Login, Register, Password Reset
router.use('/api/v1/auth/login', authServiceProxy);
router.use('/api/v1/auth/register', authServiceProxy);
router.use('/api/v1/auth/forgot-password', authServiceProxy);
router.use('/api/v1/auth/reset-password', authServiceProxy);
router.use('/api/v1/auth/verify-email', authServiceProxy);

// ============================================
// AUTHENTICATED ROUTES
// ============================================

// Auth Service - Protected routes
router.use('/api/v1/auth/refresh', authenticate, authServiceProxy);
router.use('/api/v1/auth/logout', authenticate, authServiceProxy);
router.use('/api/v1/auth/me', authenticate, authServiceProxy);

// User Service
router.use(
  '/api/v1/users',
  authenticate,
  userServiceProxy
);

// Clinic & Branch Service
router.use(
  '/api/v1/clinics',
  authenticate,
  requirePermission(Permission.CLINIC_READ),
  clinicServiceProxy
);

router.use(
  '/api/v1/branches',
  authenticate,
  requirePermission(Permission.BRANCH_READ),
  clinicServiceProxy
);

// Appointment Service
router.use(
  '/api/v1/appointments',
  authenticate,
  requirePermission(Permission.APPOINTMENT_READ),
  appointmentServiceProxy
);

// Billing & Payment Service
router.use(
  '/api/v1/billing',
  authenticate,
  requirePermission(Permission.BILLING_READ),
  billingServiceProxy
);

router.use(
  '/api/v1/payments',
  authenticate,
  requirePermission(Permission.PAYMENT_PROCESS),
  billingServiceProxy
);

// Notification Service
router.use(
  '/api/v1/notifications',
  authenticate,
  notificationServiceProxy
);

// AI Diagnosis Service
router.use(
  '/api/v1/ai/diagnosis',
  authenticate,
  requirePermission(Permission.AI_DIAGNOSIS_USE),
  aiDiagnosisServiceProxy
);

// Prescription OCR Service
router.use(
  '/api/v1/ai/ocr',
  authenticate,
  requirePermission(Permission.AI_OCR_USE),
  prescriptionOcrServiceProxy
);

// Analytics Service
router.use(
  '/api/v1/analytics',
  authenticate,
  requirePermission(Permission.ANALYTICS_VIEW),
  analyticsServiceProxy
);

export default router;
