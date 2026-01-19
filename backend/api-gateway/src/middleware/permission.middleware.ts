import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { Permission, hasAnyPermission } from '../types/roles';
import logger from '../utils/logger';

export const requirePermission = (...permissions: Permission[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        },
        timestamp: new Date().toISOString()
      });
      return;
    }

    const hasRequiredPermission = hasAnyPermission(req.user.role, permissions);

    if (!hasRequiredPermission) {
      logger.warn(`Permission denied for user ${req.user.userId} (${req.user.role}). Required: ${permissions.join(', ')}`);
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        },
        timestamp: new Date().toISOString()
      });
      return;
    }

    next();
  };
};

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        },
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`Role check failed for user ${req.user.userId}. Required: ${allowedRoles.join(', ')}, Got: ${req.user.role}`);
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient role permissions'
        },
        timestamp: new Date().toISOString()
      });
      return;
    }

    next();
  };
};
