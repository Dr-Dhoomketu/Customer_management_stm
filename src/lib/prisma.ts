import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const rawUrl = process.env.DATABASE_URL || "";
const isAccelerated = rawUrl.startsWith('prisma://') || rawUrl.startsWith('prisma+postgres://');

// During build time, if we don't have a URL, we must provide a dummy one that 
// matches the engine type we expect to use in production.
const fallbackUrl = "postgresql://unauthenticated@localhost:5432/placeholder";
const finalUrl = rawUrl || fallbackUrl;

export const prisma =
    globalForPrisma.prisma ||
    new (PrismaClient as any)({
        ...(isAccelerated ? { accelerateUrl: finalUrl } : { datasourceUrl: finalUrl }),
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
