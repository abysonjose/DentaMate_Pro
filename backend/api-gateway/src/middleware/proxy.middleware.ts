import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { config } from '../config';
import logger from '../utils/logger';

export const createServiceProxy = (target: string, pathRewrite?: Record<string, string>): ReturnType<typeof createProxyMiddleware> => {
  const proxyOptions: Options = {
    target,
    changeOrigin: true,
    pathRewrite: pathRewrite || {},
    onProxyReq: (proxyReq, req, _res) => {
      logger.info(`Proxying ${req.method} ${req.url} to ${target}`);
      
      // Forward user information if available
      if ((req as any).user) {
        proxyReq.setHeader('X-User-Id', (req as any).user.userId);
        proxyReq.setHeader('X-User-Role', (req as any).user.role);
        if ((req as any).user.clinicId) {
          proxyReq.setHeader('X-Clinic-Id', (req as any).user.clinicId);
        }
        if ((req as any).user.branchId) {
          proxyReq.setHeader('X-Branch-Id', (req as any).user.branchId);
        }
      }
    },
    onProxyRes: (proxyRes, _req, _res) => {
      logger.info(`Received response from ${target} with status ${proxyRes.statusCode}`);
    },
    onError: (err, _req, res) => {
      logger.error(`Proxy error for ${target}:`, err);
      (res as any).status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: `Service temporarily unavailable: ${target}`
        },
        timestamp: new Date().toISOString()
      });
    },
    logLevel: 'warn'
  };

  return createProxyMiddleware(proxyOptions);
};

// Service-specific proxy configurations
export const authServiceProxy = createServiceProxy(config.services.auth, {
  '^/api/v1/auth': ''
});

export const userServiceProxy = createServiceProxy(config.services.user, {
  '^/api/v1/users': ''
});

export const clinicServiceProxy = createServiceProxy(config.services.clinic, {
  '^/api/v1/clinics': ''
});

export const appointmentServiceProxy = createServiceProxy(config.services.appointment, {
  '^/api/v1/appointments': ''
});

export const billingServiceProxy = createServiceProxy(config.services.billing, {
  '^/api/v1/billing': '',
  '^/api/v1/payments': ''
});

export const notificationServiceProxy = createServiceProxy(config.services.notification, {
  '^/api/v1/notifications': ''
});

export const aiDiagnosisServiceProxy = createServiceProxy(config.services.aiDiagnosis, {
  '^/api/v1/ai/diagnosis': ''
});

export const prescriptionOcrServiceProxy = createServiceProxy(config.services.prescriptionOcr, {
  '^/api/v1/ai/ocr': ''
});

export const analyticsServiceProxy = createServiceProxy(config.services.analytics, {
  '^/api/v1/analytics': ''
});
