import { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  companyId?: string;
  iat?: number;
  exp?: number;
}

export interface JWTPayload extends AuthenticatedUser {
  iat: number;
  exp: number;
}