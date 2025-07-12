import { Router, RequestHandler } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controller/post.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import {
  createPostSchema,
  updatePostSchema,
  getPostsQuerySchema,
} from '../validations/post.validation';
import authenticate from '../middlewares/authenticate';

const router = Router();

// Optionally enable this if you have auth middleware:
// router.use(authenticate);

// ✅ Cast handlers to `RequestHandler` to avoid TS conflict
router.use((req, res, next) => {
  console.log('📡 Unknown route inside /post:', req.method, req.url);
  next();
});

router.post(
  '/',
  authenticate,
  validateRequest.body(createPostSchema),
  createPost as RequestHandler
);
router.get(
  '/',
  authenticate,
  // validateRequest.query(getPostsQuerySchema),
  getAllPosts as RequestHandler
);
router.get('/:id', authenticate, getPostById as RequestHandler);
router.put(
  '/:id',
  authenticate,
  validateRequest.body(updatePostSchema),
  updatePost as RequestHandler
);
router.delete('/:id', deletePost as RequestHandler);

export default router;
