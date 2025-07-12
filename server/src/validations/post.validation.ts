// schemas/postValidation.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10000 characters')
    .trim(),
  postType: z.enum(['general', 'question', 'review', 'news'], {
    errorMap: () => ({ message: 'Invalid post type' }),
  }),
  company: z.string().max(100, 'Company name must be less than 100 characters').trim().optional(),
  industry: z.string().max(100, 'Industry must be less than 100 characters').trim().optional(),
  jobTitle: z.string().max(100, 'Job title must be less than 100 characters').trim().optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').trim().optional(),
  tags: z
    .array(z.string().trim().max(50, 'Each tag must be less than 50 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
});

export const updatePostSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(200, 'Title must be less than 200 characters')
      .trim()
      .optional(),
    content: z
      .string()
      .min(1, 'Content is required')
      .max(10000, 'Content must be less than 10000 characters')
      .trim()
      .optional(),
    postType: z
      .enum(['general', 'question', 'review', 'news'], {
        errorMap: () => ({ message: 'Invalid post type' }),
      })
      .optional(),
    company: z.string().max(100, 'Company name must be less than 100 characters').trim().optional(),
    industry: z.string().max(100, 'Industry must be less than 100 characters').trim().optional(),
    jobTitle: z.string().max(100, 'Job title must be less than 100 characters').trim().optional(),
    location: z.string().max(100, 'Location must be less than 100 characters').trim().optional(),
    tags: z
      .array(z.string().trim().max(50, 'Each tag must be less than 50 characters'))
      .max(10, 'Maximum 10 tags allowed')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export const getPostsQuerySchema = z.object({
  company: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  tags: z.string().trim().optional(), // Will be split by comma
  postType: z.enum(['general', 'question', 'review', 'news']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
});
