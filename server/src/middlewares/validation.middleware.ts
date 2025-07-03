// src/middlewares/validation.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

interface ValidationError {
  path: string;
  message: string;
}

const formatZodError = (error: ZodError): ValidationError[] => {
  return error.errors.map((e) => ({
    path: e.path.join('.'),
    message: e.message,
  }));
};

export const validateRequest = {
  body: (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: formatZodError(err),
          });
          return;
        }
        next(err);
      }
    };
  },
  params: (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.params = schema.parse(req.params);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({
            status: 'error',
            message: 'Invalid URL parameters',
            errors: formatZodError(err),
          });
          return;
        }
        next(err);
      }
    };
  },
  query: (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = schema.parse(req.query);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({
            status: 'error',
            message: 'Invalid query parameters',
            errors: formatZodError(err),
          });
          return;
        }
        next(err);
      }
    };
  },
};
