import jwt, { Secret, SignOptions, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { config } from '../config/env';
import { IUser } from '../types/user';
import { UserRole } from '../types/user';

export interface JwtPayload {
  id: string;
  roles: UserRole[];
  iat?: number;
  exp?: number;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export class TokenService {
  private static readonly secret: Secret = config.JWT_SECRET;
  private static readonly accessExpiresIn: string = config.JWT_ACCESS_EXPIRATION || '15m';
  private static readonly refreshExpiresIn: string = config.JWT_REFRESH_EXPIRATION || '7d';

  public static signTokens(user: IUser): Tokens {
    const payload: JwtPayload = {
      id: user._id.toString(),
      roles: [user.role],
    };

    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: this.accessExpiresIn,
    } as SignOptions);

    const refreshToken = jwt.sign(payload, this.secret, {
      expiresIn: this.refreshExpiresIn,
    } as SignOptions);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  public static verifyToken<T = JwtPayload>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error('Token expired');
      } else if (error instanceof JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  public static decodeToken<T = JwtPayload>(token: string): T | null {
    try {
      return jwt.decode(token) as T;
    } catch {
      return null;
    }
  }
}
