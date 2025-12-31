import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { UserRole } from '@prisma/client';
import { AuthenticatedUser, JWTPayload } from '@/types/auth';

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    // This is a placeholder implementation
    // In a real app, you'd extract the token from headers/cookies
    // For now, return null to indicate no authentication
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function generateToken(user: AuthenticatedUser): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): AuthenticatedUser | null {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function extractTokenFromRequest(req: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Try cookie as fallback
  const tokenCookie = req.cookies.get('auth-token');
  if (tokenCookie) {
    return tokenCookie.value;
  }
  
  return null;
}