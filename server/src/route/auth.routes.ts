import { Router } from 'express';
import { register, login, refreshToken } from '../controller/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validations/auth.validation';
import { authLimiter, loginLimiter } from '@/middlewares/limiter.middleware';

const authRouter = Router();

authRouter.post('/register', authLimiter, validateRequest.body(registerSchema), register);
authRouter.post('/login', loginLimiter, validateRequest.body(loginSchema), login);
authRouter.post('/refresh-token', validateRequest.body(refreshTokenSchema), refreshToken);

export default authRouter;
