import { Permission } from './permissions.map';

/**
 * DentaMate RBAC - Role Access Configuration
 * Maps each user role to their permitted actions
 */

export enum UserRole {
  // Administrative Roles
  SAAS_ADMIN = 'SAAS_ADMIN',
  CENTRAL_ADMIN = 'CENTRAL_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  
  // Medical Staff
  DOCTOR = 'DOCTOR',
  HEAD_NURSE = 'HEAD_NURSE',
  NURSE = 'NURSE',
  ORTHOTIST = 'ORTHOTIST',
  
  // Front Office
  RECEPTIONIST = 'RECEPTIONIST',
  
  // Financial Roles
  BILLING_OFFICER = 'BILLING_OFFICER',
  ACCOUNTANT = 'ACCOUNTANT',
  ACCOUNTS_MANAGER = 'ACCOUNTS_MANAGER',
  PAYROLL_OFFICER = 'PAYROLL_OFFICER',
  
  // HR & Support
  HR_STAFF = 'HR_STAFF',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  
  // Specialized
  INSURANCE_OFFICER = 'INSURANCE_OFFICER',
  
  // Patient
  PATIENT = 'PATIENT'
}

export interface RoleConfig {
  name: string;
  description: string;
  permissions: Permission[];
  inherits?: UserRole[];
}

export const ROLE_ACCESS_MAP: Record<UserRole, RoleConfig> = {
  // ============================================
  // SAAS ADMIN - Full System Access
  // ============================================
  [UserRole.SAAS_ADMIN]: {
    name: 'SaaS Administrator',
    description: 'Full system access - manages entire platform',
    permissions: Object.values(Permission) // ALL PERMISSIONS
  },

  // ============================================
  // CENTRAL ADMIN - Multi-Clinic Management
  // ============================================
  [UserRole.CENTRAL_ADMIN]: {
    name: 'Central Administrator',
    description: 'Manages multiple clinics and branches',
    permissions: [
      // User Management
      Permission.USER_CREATE,
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.USER_DELETE,
      
      // Clinic & Branch
      Permission.CLINIC_CREATE,
      Permission.CLINIC_READ,
      Permission.CLINIC_UPDATE,
      Permission.CLINIC_DELETE,
      Permission.BRANCH_CREATE,
      Permission.BRANCH_READ,
      Permission.BRANCH_UPDATE,
      Permission.BRANCH_DELETE,
      
      // Appointments
      Permission.APPOINTMENT_MANAGE_ALL,
      Permission.APPOINTMENT_READ,
      
      // Financial
      Permission.FINANCIAL_REPORTS,
      Permission.REVENUE_ANALYTICS,
      Permission.LEDGER_MANAGE,
      
      // HR & Payroll
      Permission.HR_MANAGE,
      Permission.PAYROLL_MANAGE,
      Permission.ATTENDANCE_MANAGE,
      Permission.LEAVE_MANAGE,
      
      // AI System
      Permission.AI_SYSTEM_MANAGE,
      Permission.AI_SETTINGS_CONFIGURE,
      
      // Analytics & Reports
      Permission.ANALYTICS_ADVANCED,
      Permission.REPORTS_GENERATE,
      Permission.DASHBOARD_VIEW,
      
      // System
      Permission.SYSTEM_SETTINGS,
      Permission.AUDIT_LOGS,
      Permission.LICENSE_MANAGE,
      
      // Notifications
      Permission.NOTIFICATION_MANAGE,
      Permission.NOTIFICATION_SEND,
      
      // Department
      Permission.DEPARTMENT_MANAGE,
      Permission.DUTY_ROSTER_MANAGE
    ]
  },

  // ============================================
  // BRANCH ADMIN - Single Branch Management
  // ============================================
  [UserRole.BRANCH_ADMIN]: {
    name: 'Branch Administrator',
    description: 'Manages single branch operations',
    permissions: [
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.BRANCH_READ,
      Permission.BRANCH_UPDATE,
      Permission.APPOINTMENT_MANAGE_ALL,
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.BILLING_READ,
      Permission.FINANCIAL_REPORTS,
      Permission.ANALYTICS_VIEW,
      Permission.DASHBOARD_VIEW,
      Permission.HR_MANAGE,
      Permission.ATTENDANCE_MANAGE,
      Permission.LEAVE_MANAGE,
      Permission.NOTIFICATION_SEND,
      Permission.DEPARTMENT_MANAGE,
      Permission.DUTY_ROSTER_MANAGE,
      Permission.SHIFT_MANAGE
    ]
  },

  // ============================================
  // DOCTOR - Medical Practitioner
  // ============================================
  [UserRole.DOCTOR]: {
    name: 'Doctor',
    description: 'Medical practitioner - diagnosis and treatment',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.APPOINTMENT_UPDATE,
      Permission.PATIENT_RECORD_CREATE,
      Permission.PATIENT_RECORD_READ,
      Permission.PATIENT_RECORD_UPDATE,
      Permission.MEDICAL_HISTORY_VIEW,
      Permission.AI_DIAGNOSIS_USE,
      Permission.AI_OCR_USE,
      Permission.VITALS_RECORD,
      Permission.NURSE_NOTES,
      Permission.ORTHO_REQUEST,
      Permission.NOTIFICATION_SEND,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // HEAD NURSE - Senior Nursing Staff
  // ============================================
  [UserRole.HEAD_NURSE]: {
    name: 'Head Nurse',
    description: 'Senior nursing staff - team management',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.MEDICAL_HISTORY_VIEW,
      Permission.VITALS_RECORD,
      Permission.PATIENT_MONITORING,
      Permission.NURSE_NOTES,
      Permission.NURSE_ALLOCATION,
      Permission.ESCALATION_MANAGE,
      Permission.NOTIFICATION_SEND,
      Permission.CHAT_ACCESS,
      Permission.DUTY_ROSTER_MANAGE,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // NURSE - Nursing Staff
  // ============================================
  [UserRole.NURSE]: {
    name: 'Nurse',
    description: 'Nursing staff - patient care',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.MEDICAL_HISTORY_VIEW,
      Permission.VITALS_RECORD,
      Permission.PATIENT_MONITORING,
      Permission.NURSE_NOTES,
      Permission.ESCALATION_MANAGE,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // ORTHOTIST - Orthodontic Specialist
  // ============================================
  [UserRole.ORTHOTIST]: {
    name: 'Orthotist',
    description: 'Orthodontic specialist',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.PATIENT_RECORD_UPDATE,
      Permission.ORTHO_MEASUREMENT,
      Permission.ORTHO_REQUEST,
      Permission.BRACE_STATUS,
      Permission.DELIVERY_TRACKING,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // RECEPTIONIST - Front Desk
  // ============================================
  [UserRole.RECEPTIONIST]: {
    name: 'Receptionist',
    description: 'Front desk - appointments and check-in',
    permissions: [
      Permission.APPOINTMENT_CREATE,
      Permission.APPOINTMENT_READ,
      Permission.APPOINTMENT_UPDATE,
      Permission.PATIENT_RECORD_CREATE,
      Permission.PATIENT_RECORD_READ,
      Permission.PATIENT_RECORD_UPDATE,
      Permission.NOTIFICATION_SEND,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // BILLING OFFICER - Billing & Invoicing
  // ============================================
  [UserRole.BILLING_OFFICER]: {
    name: 'Billing Officer',
    description: 'Billing and invoicing operations',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.BILLING_CREATE,
      Permission.BILLING_READ,
      Permission.BILLING_UPDATE,
      Permission.BILLING_REFUND,
      Permission.PAYMENT_PROCESS,
      Permission.INSURANCE_CLAIM_CREATE,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // ACCOUNTANT - Financial Management
  // ============================================
  [UserRole.ACCOUNTANT]: {
    name: 'Accountant',
    description: 'Financial records and reporting',
    permissions: [
      Permission.BILLING_READ,
      Permission.FINANCIAL_REPORTS,
      Permission.LEDGER_MANAGE,
      Permission.EXPENSE_MANAGE,
      Permission.REVENUE_ANALYTICS,
      Permission.TAX_MANAGE,
      Permission.ANALYTICS_VIEW,
      Permission.REPORTS_GENERATE,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // ACCOUNTS MANAGER - Senior Financial
  // ============================================
  [UserRole.ACCOUNTS_MANAGER]: {
    name: 'Accounts Manager',
    description: 'Senior financial management and oversight',
    permissions: [
      Permission.BILLING_READ,
      Permission.FINANCIAL_REPORTS,
      Permission.LEDGER_MANAGE,
      Permission.EXPENSE_MANAGE,
      Permission.REVENUE_ANALYTICS,
      Permission.TAX_MANAGE,
      Permission.ANALYTICS_ADVANCED,
      Permission.REPORTS_GENERATE,
      Permission.DASHBOARD_VIEW,
      Permission.AUDIT_LOGS
    ]
  },

  // ============================================
  // PAYROLL OFFICER - Payroll Management
  // ============================================
  [UserRole.PAYROLL_OFFICER]: {
    name: 'Payroll Officer',
    description: 'Payroll processing and management',
    permissions: [
      Permission.HR_MANAGE,
      Permission.PAYROLL_MANAGE,
      Permission.ATTENDANCE_MANAGE,
      Permission.FINANCIAL_REPORTS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // HR STAFF - Human Resources
  // ============================================
  [UserRole.HR_STAFF]: {
    name: 'HR Staff',
    description: 'Human resources management',
    permissions: [
      Permission.USER_READ,
      Permission.USER_UPDATE,
      Permission.HR_MANAGE,
      Permission.ATTENDANCE_MANAGE,
      Permission.LEAVE_MANAGE,
      Permission.RECRUITMENT_MANAGE,
      Permission.PERFORMANCE_MANAGE,
      Permission.NOTIFICATION_SEND,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // SUPPORT STAFF - Support Services
  // ============================================
  [UserRole.SUPPORT_STAFF]: {
    name: 'Support Staff',
    description: 'General support services',
    permissions: [
      Permission.APPOINTMENT_READ,
      Permission.ATTENDANCE_MANAGE,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // INSURANCE OFFICER - Insurance Claims
  // ============================================
  [UserRole.INSURANCE_OFFICER]: {
    name: 'Insurance Officer',
    description: 'Insurance claims processing',
    permissions: [
      Permission.PATIENT_RECORD_READ,
      Permission.BILLING_READ,
      Permission.INSURANCE_CLAIM_CREATE,
      Permission.INSURANCE_CLAIM_APPROVE,
      Permission.INSURANCE_POLICY_MANAGE,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  },

  // ============================================
  // PATIENT - Patient Portal
  // ============================================
  [UserRole.PATIENT]: {
    name: 'Patient',
    description: 'Patient portal access',
    permissions: [
      Permission.APPOINTMENT_CREATE,
      Permission.APPOINTMENT_READ,
      Permission.PATIENT_RECORD_READ,
      Permission.MEDICAL_HISTORY_VIEW,
      Permission.BILLING_READ,
      Permission.PAYMENT_PROCESS,
      Permission.CHAT_ACCESS,
      Permission.DASHBOARD_VIEW
    ]
  }
};

// Utility functions
export const getRolePermissions = (role: UserRole): Permission[] => {
  return ROLE_ACCESS_MAP[role]?.permissions || [];
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
};

export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};

export const getRoleDescription = (role: UserRole): string => {
  return ROLE_ACCESS_MAP[role]?.description || 'Unknown role';
};

export default ROLE_ACCESS_MAP;
