import nodemailer, { Transporter } from 'nodemailer';
import { google } from 'googleapis';
import logger from './logger';

export class EmailService {
  private static transporter: Transporter | null = null;

  private static async createTransporter(): Promise<Transporter> {
    try {
      // OAuth2 setup for Gmail
      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
      });

      const accessToken = await oauth2Client.getAccessToken();

      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken.token || ''
        }
      } as any);
    } catch (error) {
      logger.error('Failed to create email transporter:', error);
      // Fallback to basic SMTP
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.GOOGLE_REFRESH_TOKEN
        }
      });
    }
  }

  private static async getTransporter(): Promise<Transporter> {
    if (!this.transporter) {
      this.transporter = await this.createTransporter();
    }
    return this.transporter;
  }

  static async sendVerificationEmail(email: string, token: string, firstName: string): Promise<void> {
    try {
      const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL}?token=${token}`;
      const transporter = await this.getTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'DentaMate <noreply@dentamate.com>',
        to: email,
        subject: 'Verify Your DentaMate Account',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { background: #f9fafb; padding: 30px; }
              .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🦷 DentaMate</h1>
              </div>
              <div class="content">
                <h2>Welcome ${firstName}!</h2>
                <p>Thank you for registering with DentaMate. Please verify your email address to activate your account.</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #2563eb;">${verificationUrl}</p>
                <p><strong>This link will expire in 24 hours.</strong></p>
              </div>
              <div class="footer">
                <p>If you didn't create this account, please ignore this email.</p>
                <p>&copy; 2026 DentaMate. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      logger.info(`Verification email sent to ${email}`);
    } catch (error) {
      logger.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  static async sendPasswordResetEmail(email: string, token: string, firstName: string): Promise<void> {
    try {
      const resetUrl = `${process.env.PASSWORD_RESET_URL}?token=${token}`;
      const transporter = await this.getTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'DentaMate <noreply@dentamate.com>',
        to: email,
        subject: 'Reset Your DentaMate Password',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
              .content { background: #f9fafb; padding: 30px; }
              .button { display: inline-block; padding: 12px 24px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Password Reset</h1>
              </div>
              <div class="content">
                <h2>Hi ${firstName},</h2>
                <p>We received a request to reset your DentaMate account password.</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #dc2626;">${resetUrl}</p>
                <p><strong>This link will expire in 1 hour.</strong></p>
              </div>
              <div class="footer">
                <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
                <p>&copy; 2026 DentaMate. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      logger.info(`Password reset email sent to ${email}`);
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  static async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'DentaMate <noreply@dentamate.com>',
        to: email,
        subject: 'Welcome to DentaMate!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #10b981; color: white; padding: 20px; text-align: center; }
              .content { background: #f9fafb; padding: 30px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to DentaMate!</h1>
              </div>
              <div class="content">
                <h2>Hi ${firstName},</h2>
                <p>Your DentaMate account is now active! We're excited to have you on board.</p>
                <p>You can now access all features of the platform:</p>
                <ul>
                  <li>Schedule and manage appointments</li>
                  <li>Access patient records</li>
                  <li>AI-powered diagnosis tools</li>
                  <li>Real-time notifications</li>
                  <li>Comprehensive analytics</li>
                </ul>
                <p>If you have any questions, our support team is here to help.</p>
              </div>
              <div class="footer">
                <p>&copy; 2026 DentaMate. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      logger.info(`Welcome email sent to ${email}`);
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
    }
  }
}
