import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.models';
import { TokenService } from '../utils/token';
import { UserRole } from '../types/user';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role = UserRole.User, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        status: 'error',
        message: 'Email already registered',
      });
      return;
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      role,
      firstName,
      lastName,
    });

    // Generate tokens
    const tokens = TokenService.signTokens(user);

    // Return response without password
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during registration',
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    // Generate tokens
    const tokens = TokenService.signTokens(user);

    // Return response without password
    res.json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during login',
    });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    // Verify refresh token
    const payload = TokenService.verifyToken<{ id: string }>(refreshToken);

    // Find user
    const user = await User.findById(payload.id);
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Generate new tokens
    const tokens = TokenService.signTokens(user);

    res.json({
      status: 'success',
      data: tokens,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    const message = error instanceof Error ? error.message : 'Invalid refresh token';
    res.status(401).json({
      status: 'error',
      message,
    });
  }
};
