import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  SAAS_ADMIN = 'SAAS_ADMIN',
  CENTRAL_ADMIN = 'CENTRAL_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  DOCTOR = 'DOCTOR',
  HEAD_NURSE = 'HEAD_NURSE',
  NURSE = 'NURSE',
  ORTHOTIST = 'ORTHOTIST',
  RECEPTIONIST = 'RECEPTIONIST',
  BILLING_OFFICER = 'BILLING_OFFICER',
  ACCOUNTANT = 'ACCOUNTANT',
  ACCOUNTS_MANAGER = 'ACCOUNTS_MANAGER',
  PAYROLL_OFFICER = 'PAYROLL_OFFICER',
  HR_STAFF = 'HR_STAFF',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  INSURANCE_OFFICER = 'INSURANCE_OFFICER',
  PATIENT = 'PATIENT'
}

export enum AuthProvider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK'
}

export interface IUser extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  clinicId?: mongoose.Types.ObjectId;
  branchId?: mongoose.Types.ObjectId;
  authProvider: AuthProvider;
  googleId?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  refreshTokens: string[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isLocked(): boolean;
  incrementLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: function(this: IUser) {
        return this.authProvider === AuthProvider.LOCAL;
      },
      select: false
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      sparse: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.PATIENT
    },
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic',
      index: true
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      index: true
    },
    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    lastLogin: {
      type: Date
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date
    },
    refreshTokens: [{
      type: String
    }],
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    emailVerificationToken: {
      type: String,
      select: false
    },
    emailVerificationExpires: {
      type: Date,
      select: false
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationExpires;
        delete ret.twoFactorSecret;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ role: 1, clinicId: 1, branchId: 1 });

// Methods
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isLocked = function(): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

userSchema.methods.incrementLoginAttempts = async function(): Promise<void> {
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');
  const lockoutDuration = parseInt(process.env.LOGIN_LOCKOUT_DURATION || '900000'); // 15 minutes

  if (this.lockUntil && this.lockUntil < new Date()) {
    await this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  } else {
    const updates: any = { $inc: { loginAttempts: 1 } };
    
    if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked()) {
      updates.$set = { lockUntil: new Date(Date.now() + lockoutDuration) };
    }
    
    await this.updateOne(updates);
  }
};

userSchema.methods.resetLoginAttempts = async function(): Promise<void> {
  await this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    const bcrypt = await import('bcryptjs');
    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    this.password = await bcrypt.hash(this.password, rounds);
  }
  
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
