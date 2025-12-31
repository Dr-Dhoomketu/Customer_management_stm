import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a function that returns prisma client or throws during build
function createPrismaClient() {
    // During build time, if DATABASE_URL is not available, return a mock
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
        throw new Error('Database not available during build time');
    }
    
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
