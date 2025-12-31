import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
    const config = {
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    } as const;
    
    return new PrismaClient(config);
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
