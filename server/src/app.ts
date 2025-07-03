import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { securityMiddleware } from '@/middlewares/security.middleware';
import { errorMiddleware } from '@/middlewares/error.middleware';
import authRouter from '@/route/auth.routes'; // Import the auth router

const app = express();

// ----------------------
// Security middleware
// ----------------------

app.use(helmet());
app.use(cors());

// ----------------------
// Rate limiting
// ----------------------

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ----------------------
// Body parsing
// ----------------------

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ----------------------
// Custom Security Middleware
// ----------------------

app.use(securityMiddleware);

// ----------------------
// Health Check
// ----------------------
console.log('[ROUTE] Adding /health check endpoint');
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ----------------------
// Main API Routes
// ----------------------
console.log('[ROUTE] Registering /api routes');

// Add the authentication routes under /api/auth prefix
app.use('/api/auth', authRouter);

// ----------------------
// 404 Catch-All
// ----------------------

app.use((req, res) => {
  console.warn(`[404] ${req.method} ${req.originalUrl} not found`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
  });
});

// ----------------------
// Global Error Handler
// ----------------------

app.use(errorMiddleware);

// ----------------------
// List Endpoints
// ----------------------

export { app };
