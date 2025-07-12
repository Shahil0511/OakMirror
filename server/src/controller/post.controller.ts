import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Post } from '../models/post.models';
import { AuthenticatedRequest } from '../types/post';

export const createPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postData = {
      ...req.body,
      publisher: req.user._id,
      createdBy: req.user._id,
    };

    const post = await Post.create(postData);

    const populatedPost = await Post.findById(post._id)
      .populate('publisher', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populatedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    next(error);
  }
};

export const getAllPosts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { company, jobTitle, tags, postType, page = '1', limit = '10' } = req.query;

    const filter: any = { deletedAt: null };
    if (company) filter.company = { $regex: company, $options: 'i' };
    if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' };
    if (postType) filter.postType = postType;
    if (tags) filter.tags = { $in: tags.split(',').map((t) => t.trim()) };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate('publisher', 'firstName lastName email')
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalPosts: total,
        limit: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    next(error);
  }
};

export const getPostById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid post ID' });
      return;
    }

    const post = await Post.findOne({ _id: id, deletedAt: null })
      .populate('publisher', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Error getting post by ID:', error);
    next(error);
  }
};

export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid post ID' });
      return;
    }

    const post = await Post.findOne({ _id: id, deletedAt: null });
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    if (!post.createdBy.equals(req.user._id)) {
      res.status(403).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body, updatedBy: req.user._id },
      { new: true, runValidators: true }
    )
      .populate('publisher', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    next(error);
  }
};

export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: 'Invalid post ID' });
      return;
    }

    const post = await Post.findOne({ _id: id, deletedAt: null });
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }

    if (!post.createdBy.equals(req.user._id)) {
      res.status(403).json({ success: false, message: 'Unauthorized' });
      return;
    }

    await Post.findByIdAndUpdate(id, {
      deletedBy: req.user._id,
      deletedAt: new Date(),
    });

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    next(error);
  }
};
