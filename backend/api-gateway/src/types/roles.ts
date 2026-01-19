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
  
  // Financial
  BILLING_OFFICER = 'BILLING_OFFICER',
  ACCOUNTANT = 'ACCOUNTANT',
  ACCOUNTS_MANAGER = 'ACCOUNTS_MANAGER',
  PAYROLL_OFFICER = 'PAYROLL_OFFICER',
  
  // HR & Support
  HR_STAFF = 'HR_STAFF',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  
  // Insurance
  INSURANCE_OFFICER = 'INSURANCE_OFFICER',
  
  // Patient
  PATIENT = 'PATIENT'
}

export enum Permission {
  // User Management
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  
  // Clinic Management
  CLINIC_CREATE = 'CLINIC_CREATE',
  CLINIC_READ = 'CLINIC_READ',
  CLINIC_UPDATE = 'CLINIC_UPDATE',
  CLINIC_DELETE = 'CLINIC_DELETE',
  
  // Branch Management
  BRANCH_CREATE = 'BRANCH_CREATE',
  BRANCH_READ = 'BRANCH_READ',
  BRANCH_UPDATE = 'BRANCH_UPDATE',
  BRANCH_DELETE = 'BRANCH_DELETE',
  
  // Appointment Management
  APPOINTMENT_CREATE = 'APPOINTMENT_CREATE',
  APPOINTMENT_READ = 'APPOINTMENT_READ',
  APPOINTMENT_UPDATE = 'APPOINTMENT_UPDATE',
  APPOINTMENT_DELETE = 'APPOINTMENT_DELETE',
  APPOINTMENT_MANAGE_ALL = 'APPOINTMENT_MANAGE_ALL',
  
  // Patient Records
  PATIENT_RECORD_CREATE = 'PATIENT_RECORD_CREATE',
  PATIENT_RECORD_READ = 'PATIENT_RECORD_READ',
  PATIENT_RECORD_UPDATE = 'PATIENT_RECORD_UPDATE',
  PATIENT_RECORD_DELETE = 'PATIENT_RECORD_DELETE',
  
  // Billing & Payments
  BILLING_CREATE = 'BILLING_CREATE',
  BILLING_READ = 'BILLING_READ',
  BILLING_UPDATE = 'BILLING_UPDATE',
  BILLING_REFUND = 'BILLING_REFUND',
  PAYMENT_PROCESS = 'PAYMENT_PROCESS',
  
  // Financial Management
  FINANCIAL_REPORTS = 'FINANCIAL_REPORTS',
  LEDGER_MANAGE = 'LEDGER_MANAGE',
  EXPENSE_MANAGE = 'EXPENSE_MANAGE',
  REVENUE_ANALYTICS = 'REVENUE_ANALYTICS',
  
  // HR & Payroll
  HR_MANAGE = 'HR_MANAGE',
  PAYROLL_MANAGE = 'PAYROLL_MANAGE',
  ATTENDANCE_MANAGE = 'ATTENDANCE_MANAGE',
  LEAVE_MANAGE = 'LEAVE_MANAGE',
  
  // Nursing
  VITALS_RECORD = 'VITALS_RECORD',
  PATIENT_MONITORING = 'PATIENT_MONITORING',
  NURSE_NOTES = 'NURSE_NOTES',
  NURSE_ALLOCATION = 'NURSE_ALLOCATION',
  
  // AI Features
  AI_DIAGNOSIS_USE = 'AI_DIAGNOSIS_USE',
  AI_OCR_USE = 'AI_OCR_USE',
  AI_SYSTEM_MANAGE = 'AI_SYSTEM_MANAGE',
  
  // Analytics
  ANALYTICS_VIEW = 'ANALYTICS_VIEW',
  ANALYTICS_ADVANCED = 'ANALYTICS_ADVANCED',
  
  // System Administration
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS',
  AUDIT_LOGS = 'AUDIT_LOGS',
  LICENSE_MANAGE = 'LICENSE_MANAGE',
  
  // Insurance
  INSURANCE_CLAIM_CREATE = 'INSURANCE_CLAIM_CREATE',
  INSURANCE_CLAIM_APPROVE = 'INSURANCE_CLAIM_APPROVE',
  
  // Notifications
  NOTIFICATION_SEND = 'NOTIFICATION_SEND',
  NOTIFICATION_MANAGE = 'NOTIFICATION_MANAGE'
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  description: string;
}

export const ROLE_PERMISSIONS_MAP: Record<UserRole, Permission[]> = {
  [UserRole.SAAS_ADMIN]: [
    // Full system access
    ...Object.values(Permission)
  ],
  
  [UserRole.CENTRAL_ADMIN]: [
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.CLINIC_CREATE,
    Permission.CLINIC_READ,
    Permission.CLINIC_UPDATE,
    Permission.CLINIC_DELETE,
    Permission.BRANCH_CREATE,
    Permission.BRANCH_READ,
    Permission.BRANCH_UPDATE,
    Permission.BRANCH_DELETE,
    Permission.APPOINTMENT_MANAGE_ALL,
    Permission.FINANCIAL_REPORTS,
    Permission.REVENUE_ANALYTICS,
    Permission.AI_SYSTEM_MANAGE,
    Permission.ANALYTICS_ADVANCED,
    Permission.SYSTEM_SETTINGS,
    Permission.AUDIT_LOGS,
    Permission.LICENSE_MANAGE,
    Permission.HR_MANAGE,
    Permission.PAYROLL_MANAGE,
    Permission.NOTIFICATION_MANAGE
  ],
  
  [UserRole.BRANCH_ADMIN]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.BRANCH_READ,
    Permission.BRANCH_UPDATE,
    Permission.APPOINTMENT_READ,
    Permission.APPOINTMENT_MANAGE_ALL,
    Permission.PATIENT_RECORD_READ,
    Permission.BILLING_READ,
    Permission.FINANCIAL_REPORTS,
    Permission.ANALYTICS_VIEW,
    Permission.HR_MANAGE,
    Permission.ATTENDANCE_MANAGE,
    Permission.LEAVE_MANAGE,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.DOCTOR]: [
    Permission.APPOINTMENT_READ,
    Permission.APPOINTMENT_UPDATE,
    Permission.PATIENT_RECORD_CREATE,
    Permission.PATIENT_RECORD_READ,
    Permission.PATIENT_RECORD_UPDATE,
    Permission.AI_DIAGNOSIS_USE,
    Permission.AI_OCR_USE,
    Permission.VITALS_RECORD,
    Permission.NURSE_NOTES,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.HEAD_NURSE]: [
    Permission.APPOINTMENT_READ,
    Permission.PATIENT_RECORD_READ,
    Permission.VITALS_RECORD,
    Permission.PATIENT_MONITORING,
    Permission.NURSE_NOTES,
    Permission.NURSE_ALLOCATION,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.NURSE]: [
    Permission.APPOINTMENT_READ,
    Permission.PATIENT_RECORD_READ,
    Permission.VITALS_RECORD,
    Permission.PATIENT_MONITORING,
    Permission.NURSE_NOTES
  ],
  
  [UserRole.ORTHOTIST]: [
    Permission.APPOINTMENT_READ,
    Permission.PATIENT_RECORD_READ,
    Permission.PATIENT_RECORD_UPDATE
  ],
  
  [UserRole.RECEPTIONIST]: [
    Permission.APPOINTMENT_CREATE,
    Permission.APPOINTMENT_READ,
    Permission.APPOINTMENT_UPDATE,
    Permission.PATIENT_RECORD_CREATE,
    Permission.PATIENT_RECORD_READ,
    Permission.PATIENT_RECORD_UPDATE,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.BILLING_OFFICER]: [
    Permission.APPOINTMENT_READ,
    Permission.PATIENT_RECORD_READ,
    Permission.BILLING_CREATE,
    Permission.BILLING_READ,
    Permission.BILLING_UPDATE,
    Permission.BILLING_REFUND,
    Permission.PAYMENT_PROCESS,
    Permission.INSURANCE_CLAIM_CREATE
  ],
  
  [UserRole.ACCOUNTANT]: [
    Permission.BILLING_READ,
    Permission.FINANCIAL_REPORTS,
    Permission.LEDGER_MANAGE,
    Permission.EXPENSE_MANAGE,
    Permission.REVENUE_ANALYTICS,
    Permission.ANALYTICS_VIEW
  ],
  
  [UserRole.ACCOUNTS_MANAGER]: [
    Permission.BILLING_READ,
    Permission.FINANCIAL_REPORTS,
    Permission.LEDGER_MANAGE,
    Permission.EXPENSE_MANAGE,
    Permission.REVENUE_ANALYTICS,
    Permission.ANALYTICS_ADVANCED,
    Permission.AUDIT_LOGS
  ],
  
  [UserRole.PAYROLL_OFFICER]: [
    Permission.HR_MANAGE,
    Permission.PAYROLL_MANAGE,
    Permission.ATTENDANCE_MANAGE,
    Permission.FINANCIAL_REPORTS
  ],
  
  [UserRole.HR_STAFF]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.HR_MANAGE,
    Permission.ATTENDANCE_MANAGE,
    Permission.LEAVE_MANAGE,
    Permission.NOTIFICATION_SEND
  ],
  
  [UserRole.SUPPORT_STAFF]: [
    Permission.APPOINTMENT_READ,
    Permission.ATTENDANCE_MANAGE
  ],
  
  [UserRole.INSURANCE_OFFICER]: [
    Permission.PATIENT_RECORD_READ,
    Permission.BILLING_READ,
    Permission.INSURANCE_CLAIM_CREATE,
    Permission.INSURANCE_CLAIM_APPROVE
  ],
  
  [UserRole.PATIENT]: [
    Permission.APPOINTMENT_CREATE,
    Permission.APPOINTMENT_READ,
    Permission.PATIENT_RECORD_READ,
    Permission.BILLING_READ,
    Permission.PAYMENT_PROCESS
  ]
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const rolePermissions = ROLE_PERMISSIONS_MAP[role];
  return rolePermissions?.includes(permission) || false;
};

export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};
