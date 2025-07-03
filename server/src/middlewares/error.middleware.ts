import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { logger } from '@/config/logger';
import { AppError } from '@/utils/app-error';

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ZodError) {
    logger.error('Validation error', { error });
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    });
    return;
  }

  if (error instanceof AppError) {
    logger.error('Application error', { error });
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      code: error.code,
    });
    return;
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    logger.error('Authentication error', { error });
    res.status(401).json({
      status: 'error',
      message: error instanceof TokenExpiredError ? 'Token expired' : 'Invalid token',
      code: 'AUTH_ERROR',
    });
    return;
  }

  logger.error('Internal server error', { error });
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
