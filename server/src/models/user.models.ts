import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserRole } from '../types/user';

// ------- SCHEMA -------------------------------------------------------------

const userSchema = new Schema<IUser, Model<IUser>>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },

    password: { type: String, required: true, minlength: 8 },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User,
    },

    avatarUrl: String,
    bio: String,

    /* ---------- RELATION FIELDS ----------------------------------------- */
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    subscribedCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    ownedCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
    createdJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true }
);

// ------- INDEXES ------------------------------------------------------------
// Email‑only index is already created by `unique: true`, but if you plan to
// query by role frequently, add a compound index:
userSchema.index({ role: 1, email: 1 });

// ------- MIDDLEWARE ---------------------------------------------------------

// Hash password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ------- INSTANCE & STATIC METHODS -----------------------------------------

// Compare plaintext pwd with hash (for login)
userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// Simple role check (can extend to RBAC helper later)
userSchema.methods.isEditor = function () {
  return this.role === UserRole.EDITOR;
};

// ------- MODEL EXPORT -------------------------------------------------------

export const User = mongoose.model<IUser>('User', userSchema);
