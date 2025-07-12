import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
