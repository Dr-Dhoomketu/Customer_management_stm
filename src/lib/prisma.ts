import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const url = process.env.DATABASE_URL;
const isAccelerated = url?.startsWith('prisma://') || url?.startsWith('prisma+postgres://');

let prismaClient: PrismaClient;

if (isAccelerated) {
    prismaClient = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        accelerateUrl: url,
    });
} else {
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);
    prismaClient = new PrismaClient({ 
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
}

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
