import { Request, Response, NextFunction } from 'express';
import { User, AuthProvider } from '../models/User.model';
import { RefreshToken } from '../models/RefreshToken.model';
import { AuditLog, AuditAction } from '../models/AuditLog.model';
import { TokenService } from '../utils/token.util';
import { EmailService } from '../utils/email.util';
import logger from '../utils/logger';

export class AuthController {
  // Register new user
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        res.status(400).json({
          success: false,
          error: {
            code: 'USER_EXISTS',
            message: 'User with this email already exists'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Create user
      const user = new User({
        email: email.toLowerCase(),
        password,
        firstName,
        lastName,
        phone,
        role: role || 'PATIENT',
        authProvider: AuthProvider.LOCAL,
        isEmailVerified: false
      });

      // Generate email verification token
      const verificationToken = TokenService.generateEmailVerificationToken();
      user.emailVerificationToken = TokenService.hashToken(verificationToken);
      user.emailVerificationExpires = TokenService.getEmailVerificationExpiry();

      await user.save();

      // Send verification email
      try {
        await EmailService.sendVerificationEmail(user.email, verificationToken, user.firstName);
      } catch (emailError) {
        logger.error('Failed to send verification email:', emailError);
      }

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.REGISTER,
        email: user.email,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`User registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please check your email to verify your account.',
        data: {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Login user
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip || 'unknown';

      // Find user with password field
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

      if (!user) {
        await AuditLog.create({
          action: AuditAction.FAILED_LOGIN,
          email: email.toLowerCase(),
          ipAddress,
          userAgent: req.get('user-agent') || 'unknown',
          success: false,
          errorMessage: 'User not found'
        });

        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Check if account is locked
      if (user.isLocked()) {
        await AuditLog.create({
          userId: user._id,
          action: AuditAction.FAILED_LOGIN,
          email: user.email,
          ipAddress,
          userAgent: req.get('user-agent') || 'unknown',
          success: false,
          errorMessage: 'Account locked'
        });

        res.status(423).json({
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'Account is locked due to multiple failed login attempts'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Check if account is active
      if (!user.isActive) {
        res.status(403).json({
          success: false,
          error: {
            code: 'ACCOUNT_INACTIVE',
            message: 'Account is inactive. Please contact support.'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        await user.incrementLoginAttempts();

        await AuditLog.create({
          userId: user._id,
          action: AuditAction.FAILED_LOGIN,
          email: user.email,
          ipAddress,
          userAgent: req.get('user-agent') || 'unknown',
          success: false,
          errorMessage: 'Invalid password'
        });

        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Reset login attempts
      if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
      }

      // Generate tokens
      const accessToken = TokenService.generateAccessToken(user);
      const refreshToken = TokenService.generateRefreshToken();

      // Save refresh token
      await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: TokenService.getRefreshTokenExpiry(),
        createdByIp: ipAddress
      });

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.LOGIN,
        email: user.email,
        ipAddress,
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`User logged in: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            clinicId: user.clinicId,
            branchId: user.branchId,
            isEmailVerified: user.isEmailVerified
          },
          accessToken,
          refreshToken,
          expiresIn: process.env.JWT_EXPIRY || '24h'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Refresh access token
  static async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const ipAddress = req.ip || 'unknown';

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_TOKEN',
            message: 'Refresh token is required'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Find refresh token
      const tokenDoc = await RefreshToken.findOne({
        token: refreshToken,
        isActive: true
      });

      if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
        res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired refresh token'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Find user
      const user = await User.findById(tokenDoc.userId);

      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: {
            code: 'USER_INACTIVE',
            message: 'User account is inactive'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Generate new tokens
      const newAccessToken = TokenService.generateAccessToken(user);
      const newRefreshToken = TokenService.generateRefreshToken();

      // Revoke old refresh token
      tokenDoc.isActive = false;
      tokenDoc.revokedAt = new Date();
      tokenDoc.revokedByIp = ipAddress;
      tokenDoc.replacedByToken = newRefreshToken;
      await tokenDoc.save();

      // Save new refresh token
      await RefreshToken.create({
        userId: user._id,
        token: newRefreshToken,
        expiresAt: TokenService.getRefreshTokenExpiry(),
        createdByIp: ipAddress
      });

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.TOKEN_REFRESH,
        email: user.email,
        ipAddress,
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`Token refreshed for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: process.env.JWT_EXPIRY || '24h'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout
  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const user = (req as any).user;
      const ipAddress = req.ip || 'unknown';

      if (refreshToken) {
        // Revoke refresh token
        await RefreshToken.updateOne(
          { token: refreshToken },
          {
            isActive: false,
            revokedAt: new Date(),
            revokedByIp: ipAddress
          }
        );
      }

      // Audit log
      await AuditLog.create({
        userId: user.userId,
        action: AuditAction.LOGOUT,
        email: user.email,
        ipAddress,
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`User logged out: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Logout successful',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Verify email
  static async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.query;

      if (!token) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_TOKEN',
            message: 'Verification token is required'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      const hashedToken = TokenService.hashToken(token as string);

      const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: new Date() }
      }).select('+emailVerificationToken +emailVerificationExpires');

      if (!user) {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired verification token'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save();

      // Send welcome email
      try {
        await EmailService.sendWelcomeEmail(user.email, user.firstName);
      } catch (emailError) {
        logger.error('Failed to send welcome email:', emailError);
      }

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.EMAIL_VERIFICATION,
        email: user.email,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`Email verified for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Request password reset
  static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        // Don't reveal if user exists
        res.status(200).json({
          success: true,
          message: 'If an account exists with this email, a password reset link will be sent.',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Generate reset token
      const resetToken = TokenService.generatePasswordResetToken();
      user.passwordResetToken = TokenService.hashToken(resetToken);
      user.passwordResetExpires = TokenService.getPasswordResetExpiry();
      await user.save();

      // Send reset email
      try {
        await EmailService.sendPasswordResetEmail(user.email, resetToken, user.firstName);
      } catch (emailError) {
        logger.error('Failed to send password reset email:', emailError);
      }

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.PASSWORD_RESET_REQUEST,
        email: user.email,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`Password reset requested for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link will be sent.',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Reset password
  static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Token and new password are required'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      const hashedToken = TokenService.hashToken(token);

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date() }
      }).select('+passwordResetToken +passwordResetExpires');

      if (!user) {
        res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired reset token'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      // Revoke all refresh tokens
      await RefreshToken.updateMany(
        { userId: user._id, isActive: true },
        { isActive: false, revokedAt: new Date() }
      );

      // Audit log
      await AuditLog.create({
        userId: user._id,
        action: AuditAction.PASSWORD_RESET,
        email: user.email,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get('user-agent') || 'unknown',
        success: true
      });

      logger.info(`Password reset for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user
  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
            clinicId: user.clinicId,
            branchId: user.branchId,
            isEmailVerified: user.isEmailVerified,
            isPhoneVerified: user.isPhoneVerified,
            isActive: user.isActive,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt
          }
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}
