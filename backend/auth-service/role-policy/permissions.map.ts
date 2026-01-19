/**
 * DentaMate RBAC - Permissions Map
 * Defines all system permissions and their descriptions
 */

export enum Permission {
  // ============================================
  // USER MANAGEMENT
  // ============================================
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  USER_MANAGE_ALL = 'USER_MANAGE_ALL',

  // ============================================
  // CLINIC & BRANCH MANAGEMENT
  // ============================================
  CLINIC_CREATE = 'CLINIC_CREATE',
  CLINIC_READ = 'CLINIC_READ',
  CLINIC_UPDATE = 'CLINIC_UPDATE',
  CLINIC_DELETE = 'CLINIC_DELETE',
  
  BRANCH_CREATE = 'BRANCH_CREATE',
  BRANCH_READ = 'BRANCH_READ',
  BRANCH_UPDATE = 'BRANCH_UPDATE',
  BRANCH_DELETE = 'BRANCH_DELETE',

  // ============================================
  // APPOINTMENT MANAGEMENT
  // ============================================
  APPOINTMENT_CREATE = 'APPOINTMENT_CREATE',
  APPOINTMENT_READ = 'APPOINTMENT_READ',
  APPOINTMENT_UPDATE = 'APPOINTMENT_UPDATE',
  APPOINTMENT_DELETE = 'APPOINTMENT_DELETE',
  APPOINTMENT_MANAGE_ALL = 'APPOINTMENT_MANAGE_ALL',

  // ============================================
  // PATIENT RECORDS
  // ============================================
  PATIENT_RECORD_CREATE = 'PATIENT_RECORD_CREATE',
  PATIENT_RECORD_READ = 'PATIENT_RECORD_READ',
  PATIENT_RECORD_UPDATE = 'PATIENT_RECORD_UPDATE',
  PATIENT_RECORD_DELETE = 'PATIENT_RECORD_DELETE',
  MEDICAL_HISTORY_VIEW = 'MEDICAL_HISTORY_VIEW',

  // ============================================
  // BILLING & PAYMENTS
  // ============================================
  BILLING_CREATE = 'BILLING_CREATE',
  BILLING_READ = 'BILLING_READ',
  BILLING_UPDATE = 'BILLING_UPDATE',
  BILLING_REFUND = 'BILLING_REFUND',
  PAYMENT_PROCESS = 'PAYMENT_PROCESS',

  // ============================================
  // FINANCIAL MANAGEMENT
  // ============================================
  FINANCIAL_REPORTS = 'FINANCIAL_REPORTS',
  LEDGER_MANAGE = 'LEDGER_MANAGE',
  EXPENSE_MANAGE = 'EXPENSE_MANAGE',
  REVENUE_ANALYTICS = 'REVENUE_ANALYTICS',
  TAX_MANAGE = 'TAX_MANAGE',

  // ============================================
  // HR & PAYROLL
  // ============================================
  HR_MANAGE = 'HR_MANAGE',
  PAYROLL_MANAGE = 'PAYROLL_MANAGE',
  ATTENDANCE_MANAGE = 'ATTENDANCE_MANAGE',
  LEAVE_MANAGE = 'LEAVE_MANAGE',
  RECRUITMENT_MANAGE = 'RECRUITMENT_MANAGE',
  PERFORMANCE_MANAGE = 'PERFORMANCE_MANAGE',

  // ============================================
  // NURSING OPERATIONS
  // ============================================
  VITALS_RECORD = 'VITALS_RECORD',
  PATIENT_MONITORING = 'PATIENT_MONITORING',
  NURSE_NOTES = 'NURSE_NOTES',
  NURSE_ALLOCATION = 'NURSE_ALLOCATION',
  ESCALATION_MANAGE = 'ESCALATION_MANAGE',

  // ============================================
  // ORTHODONTIC SERVICES
  // ============================================
  ORTHO_MEASUREMENT = 'ORTHO_MEASUREMENT',
  ORTHO_REQUEST = 'ORTHO_REQUEST',
  BRACE_STATUS = 'BRACE_STATUS',
  DELIVERY_TRACKING = 'DELIVERY_TRACKING',

  // ============================================
  // AI FEATURES
  // ============================================
  AI_DIAGNOSIS_USE = 'AI_DIAGNOSIS_USE',
  AI_OCR_USE = 'AI_OCR_USE',
  AI_SYSTEM_MANAGE = 'AI_SYSTEM_MANAGE',
  AI_SETTINGS_CONFIGURE = 'AI_SETTINGS_CONFIGURE',

  // ============================================
  // ANALYTICS
  // ============================================
  ANALYTICS_VIEW = 'ANALYTICS_VIEW',
  ANALYTICS_ADVANCED = 'ANALYTICS_ADVANCED',
  REPORTS_GENERATE = 'REPORTS_GENERATE',
  DASHBOARD_VIEW = 'DASHBOARD_VIEW',

  // ============================================
  // SYSTEM ADMINISTRATION
  // ============================================
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS',
  AUDIT_LOGS = 'AUDIT_LOGS',
  LICENSE_MANAGE = 'LICENSE_MANAGE',
  BACKUP_RESTORE = 'BACKUP_RESTORE',
  SECURITY_MANAGE = 'SECURITY_MANAGE',

  // ============================================
  // INSURANCE
  // ============================================
  INSURANCE_CLAIM_CREATE = 'INSURANCE_CLAIM_CREATE',
  INSURANCE_CLAIM_APPROVE = 'INSURANCE_CLAIM_APPROVE',
  INSURANCE_POLICY_MANAGE = 'INSURANCE_POLICY_MANAGE',

  // ============================================
  // INVENTORY & PHARMACY
  // ============================================
  INVENTORY_MANAGE = 'INVENTORY_MANAGE',
  PHARMACY_MANAGE = 'PHARMACY_MANAGE',
  STOCK_MANAGE = 'STOCK_MANAGE',

  // ============================================
  // COLLABORATION
  // ============================================
  CHAT_ACCESS = 'CHAT_ACCESS',
  NOTIFICATION_SEND = 'NOTIFICATION_SEND',
  NOTIFICATION_MANAGE = 'NOTIFICATION_MANAGE',
  
  // ============================================
  // DEPARTMENT SPECIFIC
  // ============================================
  DEPARTMENT_MANAGE = 'DEPARTMENT_MANAGE',
  DUTY_ROSTER_MANAGE = 'DUTY_ROSTER_MANAGE',
  SHIFT_MANAGE = 'SHIFT_MANAGE'
}

export const PermissionDescriptions: Record<Permission, string> = {
  // User Management
  [Permission.USER_CREATE]: 'Create new users',
  [Permission.USER_READ]: 'View user information',
  [Permission.USER_UPDATE]: 'Update user information',
  [Permission.USER_DELETE]: 'Delete users',
  [Permission.USER_MANAGE_ALL]: 'Full user management access',

  // Clinic & Branch
  [Permission.CLINIC_CREATE]: 'Create new clinics',
  [Permission.CLINIC_READ]: 'View clinic information',
  [Permission.CLINIC_UPDATE]: 'Update clinic information',
  [Permission.CLINIC_DELETE]: 'Delete clinics',
  [Permission.BRANCH_CREATE]: 'Create new branches',
  [Permission.BRANCH_READ]: 'View branch information',
  [Permission.BRANCH_UPDATE]: 'Update branch information',
  [Permission.BRANCH_DELETE]: 'Delete branches',

  // Appointments
  [Permission.APPOINTMENT_CREATE]: 'Create appointments',
  [Permission.APPOINTMENT_READ]: 'View appointments',
  [Permission.APPOINTMENT_UPDATE]: 'Update appointments',
  [Permission.APPOINTMENT_DELETE]: 'Cancel appointments',
  [Permission.APPOINTMENT_MANAGE_ALL]: 'Manage all appointments across clinics',

  // Patient Records
  [Permission.PATIENT_RECORD_CREATE]: 'Create patient records',
  [Permission.PATIENT_RECORD_READ]: 'View patient records',
  [Permission.PATIENT_RECORD_UPDATE]: 'Update patient records',
  [Permission.PATIENT_RECORD_DELETE]: 'Delete patient records',
  [Permission.MEDICAL_HISTORY_VIEW]: 'View medical history',

  // Billing
  [Permission.BILLING_CREATE]: 'Create bills',
  [Permission.BILLING_READ]: 'View bills',
  [Permission.BILLING_UPDATE]: 'Update bills',
  [Permission.BILLING_REFUND]: 'Process refunds',
  [Permission.PAYMENT_PROCESS]: 'Process payments',

  // Financial
  [Permission.FINANCIAL_REPORTS]: 'View financial reports',
  [Permission.LEDGER_MANAGE]: 'Manage ledger entries',
  [Permission.EXPENSE_MANAGE]: 'Manage expenses',
  [Permission.REVENUE_ANALYTICS]: 'Access revenue analytics',
  [Permission.TAX_MANAGE]: 'Manage tax information',

  // HR & Payroll
  [Permission.HR_MANAGE]: 'Manage HR operations',
  [Permission.PAYROLL_MANAGE]: 'Manage payroll',
  [Permission.ATTENDANCE_MANAGE]: 'Manage attendance',
  [Permission.LEAVE_MANAGE]: 'Manage leave requests',
  [Permission.RECRUITMENT_MANAGE]: 'Manage recruitment',
  [Permission.PERFORMANCE_MANAGE]: 'Manage performance reviews',

  // Nursing
  [Permission.VITALS_RECORD]: 'Record patient vitals',
  [Permission.PATIENT_MONITORING]: 'Monitor patients',
  [Permission.NURSE_NOTES]: 'Create nurse notes',
  [Permission.NURSE_ALLOCATION]: 'Allocate nursing staff',
  [Permission.ESCALATION_MANAGE]: 'Manage escalations',

  // Orthodontic
  [Permission.ORTHO_MEASUREMENT]: 'Record orthodontic measurements',
  [Permission.ORTHO_REQUEST]: 'Create orthodontic requests',
  [Permission.BRACE_STATUS]: 'Update brace status',
  [Permission.DELIVERY_TRACKING]: 'Track deliveries',

  // AI Features
  [Permission.AI_DIAGNOSIS_USE]: 'Use AI diagnosis tools',
  [Permission.AI_OCR_USE]: 'Use OCR scanning',
  [Permission.AI_SYSTEM_MANAGE]: 'Manage AI systems',
  [Permission.AI_SETTINGS_CONFIGURE]: 'Configure AI settings',

  // Analytics
  [Permission.ANALYTICS_VIEW]: 'View analytics',
  [Permission.ANALYTICS_ADVANCED]: 'Access advanced analytics',
  [Permission.REPORTS_GENERATE]: 'Generate reports',
  [Permission.DASHBOARD_VIEW]: 'View dashboards',

  // System
  [Permission.SYSTEM_SETTINGS]: 'Manage system settings',
  [Permission.AUDIT_LOGS]: 'View audit logs',
  [Permission.LICENSE_MANAGE]: 'Manage licenses',
  [Permission.BACKUP_RESTORE]: 'Backup and restore',
  [Permission.SECURITY_MANAGE]: 'Manage security settings',

  // Insurance
  [Permission.INSURANCE_CLAIM_CREATE]: 'Create insurance claims',
  [Permission.INSURANCE_CLAIM_APPROVE]: 'Approve insurance claims',
  [Permission.INSURANCE_POLICY_MANAGE]: 'Manage insurance policies',

  // Inventory
  [Permission.INVENTORY_MANAGE]: 'Manage inventory',
  [Permission.PHARMACY_MANAGE]: 'Manage pharmacy',
  [Permission.STOCK_MANAGE]: 'Manage stock levels',

  // Collaboration
  [Permission.CHAT_ACCESS]: 'Access chat system',
  [Permission.NOTIFICATION_SEND]: 'Send notifications',
  [Permission.NOTIFICATION_MANAGE]: 'Manage notifications',

  // Department
  [Permission.DEPARTMENT_MANAGE]: 'Manage departments',
  [Permission.DUTY_ROSTER_MANAGE]: 'Manage duty rosters',
  [Permission.SHIFT_MANAGE]: 'Manage shifts'
};

export default Permission;
