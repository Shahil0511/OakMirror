import { Request } from 'express';
import { Types } from 'mongoose';

// ----------------- POST ENUM -----------------
export enum PostType {
  GENERAL = 'general',
  QUESTION = 'question',
  REVIEW = 'review',
  NEWS = 'news',
}

// ----------------- POST MODEL TYPE -----------------
export interface IPost {
  _id: Types.ObjectId;
  title: string;
  content: string;
  postType: PostType;
  company?: string;
  industry?: string;
  jobTitle?: string;
  location?: string;
  tags: string[];
  publisher: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------- AUTH MODULE AUGMENTATION -----------------
// This extends `req.user` to be properly typed across middleware/controllers
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }
}

// ----------------- CUSTOM REQUEST WITH TYPED QUERY AND PARAMS -----------------
export interface AuthenticatedRequest extends Request {
  query: {
    company?: string;
    jobTitle?: string;
    tags?: string;
    postType?: string;
    page?: string;
    limit?: string;
  };
  params: {
    id: string;
  };
  user: {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}
