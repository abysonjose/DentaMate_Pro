import mongoose, { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdByIp: string;
  revokedAt?: Date;
  revokedByIp?: string;
  replacedByToken?: string;
  isActive: boolean;
  isExpired?: boolean;
  isValid?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true
    },
    createdByIp: {
      type: String,
      required: true
    },
    revokedAt: {
      type: Date
    },
    revokedByIp: {
      type: String
    },
    replacedByToken: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual for checking if token is expired
refreshTokenSchema.virtual('isExpired').get(function(this: IRefreshToken) {
  return Date.now() >= this.expiresAt.getTime();
});

// Virtual for checking if token is active and valid
refreshTokenSchema.virtual('isValid').get(function(this: IRefreshToken) {
  return this.isActive && !(this as any).isExpired;
});

// Index for cleanup of expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);
