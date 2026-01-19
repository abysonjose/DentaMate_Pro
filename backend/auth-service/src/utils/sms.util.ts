import twilio from 'twilio';
import logger from './logger';

export class SMSService {
  private static client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  private static fromNumber = process.env.TWILIO_PHONE_NUMBER;

  static async sendVerificationCode(phone: string, code: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: `Your DentaMate verification code is: ${code}. Valid for 10 minutes.`,
        from: this.fromNumber,
        to: phone
      });

      logger.info(`Verification SMS sent to ${phone}`);
    } catch (error) {
      logger.error('Failed to send verification SMS:', error);
      throw new Error('Failed to send verification SMS');
    }
  }

  static async sendPasswordResetCode(phone: string, code: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: `Your DentaMate password reset code is: ${code}. Valid for 10 minutes.`,
        from: this.fromNumber,
        to: phone
      });

      logger.info(`Password reset SMS sent to ${phone}`);
    } catch (error) {
      logger.error('Failed to send password reset SMS:', error);
      throw new Error('Failed to send password reset SMS');
    }
  }

  static async sendWelcomeSMS(phone: string, firstName: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: `Welcome to DentaMate, ${firstName}! Your account is now active.`,
        from: this.fromNumber,
        to: phone
      });

      logger.info(`Welcome SMS sent to ${phone}`);
    } catch (error) {
      logger.error('Failed to send welcome SMS:', error);
    }
  }
}
