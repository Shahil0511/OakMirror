// models/Post.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IPost, PostType } from '../types/post';

const postSchema = new Schema<IPost, Model<IPost>>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },
    postType: {
      type: String,
      enum: Object.values(PostType),
      required: true,
      default: PostType.GENERAL,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    industry: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    jobTitle: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],

    // Audit fields
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
postSchema.index({ postType: 1, createdAt: -1 });
postSchema.index({ company: 1, industry: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ deletedAt: 1 });
postSchema.index({ createdBy: 1, deletedAt: 1 });

export const Post = mongoose.model<IPost>('Post', postSchema);
