import { Router } from 'express';
import { register, login, refreshToken } from '../controller/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validations/auth.validation';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authRouter = Router();

authRouter.post('/register', authLimiter, validateRequest.body(registerSchema), register);
authRouter.post('/login', loginLimiter, validateRequest.body(loginSchema), login);
authRouter.post('/refresh-token', validateRequest.body(refreshTokenSchema), refreshToken);

export default authRouter;
