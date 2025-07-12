// src/middlewares/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models';

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.warn('⚠️ Token missing in Authorization header');
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    // Attach user to req
    (req as any).user = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    next();
    return; // ✅ fixes the TS warning
  } catch (err) {
    console.error('JWT auth error:', err);
    res.status(403).json({ success: false, message: 'Unauthorized' });
    return;
  }
};

export default authenticate;
