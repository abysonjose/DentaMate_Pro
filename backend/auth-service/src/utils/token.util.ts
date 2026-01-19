import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../models/User.model';
import logger from './logger';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  clinicId?: string;
  branchId?: string;
}

export class TokenService {
  private static jwtSecret: Secret = process.env.JWT_SECRET || 'default-secret';
  private static jwtExpiry: string | number = process.env.JWT_EXPIRY || '24h';
  private static refreshExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';

  static generateAccessToken(user: IUser): string {
    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      clinicId: user.clinicId?.toString(),
      branchId: user.branchId?.toString()
    };

    const options: SignOptions = {
      expiresIn: this.jwtExpiry as any,
      issuer: 'dentamate-auth'
    };

    return jwt.sign(payload, this.jwtSecret, options);
  }

  static generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  static verifyAccessToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as JWTPayload;
    } catch (error) {
      logger.error('Access token verification failed:', error);
      throw new Error('Invalid or expired token');
    }
  }

  static generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateEmailVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  static getRefreshTokenExpiry(): Date {
    const days = parseInt(this.refreshExpiry.replace('d', ''));
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  static getPasswordResetExpiry(): Date {
    const expiry = process.env.JWT_RESET_PASSWORD_EXPIRY || '1h';
    const hours = parseInt(expiry.replace('h', ''));
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  }

  static getEmailVerificationExpiry(): Date {
    const expiry = process.env.JWT_EMAIL_VERIFICATION_EXPIRY || '24h';
    const hours = parseInt(expiry.replace('h', ''));
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  }
}
