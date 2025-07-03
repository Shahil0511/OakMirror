import mongoose, { Types } from 'mongoose';

// Enum keeps role values in one place
export enum UserRole {
  Admin = 'admin',
  EDITOR = 'editor',
  User = 'user',
}

// Shape of a user document (instance methods can extend this later)
export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;

  /* Viewer interactions */
  likedPosts: mongoose.Types.ObjectId[];
  subscribedCompanies: mongoose.Types.ObjectId[];

  /* Editor contributions */
  ownedCompanies: mongoose.Types.ObjectId[];
  createdJobs: mongoose.Types.ObjectId[];
}
