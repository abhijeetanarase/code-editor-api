import { Request } from 'express';
import { verifyToken } from '../utils/userUtils';
import { AppError } from '../utils/AppError'; // Your custom error class

export interface AuthContext {
  userId?: string;
}

export const authContext = ({ req }: { req: Request }): AuthContext => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new AppError('Authorization token not provided', 401);
  }

  try {
    const context: AuthContext = verifyToken(token);
    return context;
  } catch (error) {
    throw new AppError('Invalid or expired token', 401);
  }
};
