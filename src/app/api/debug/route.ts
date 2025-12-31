import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const debugInfo = {
            timestamp: new Date().toISOString(),
            nodeEnv: process.env.NODE_ENV,
            port: process.env.PORT,
            hostname: process.env.HOSTNAME,
            databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
            jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
            nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
            platform: process.platform,
            nodeVersion: process.version,
            memory: process.memoryUsage(),
            uptime: process.uptime()
        };
        
        return NextResponse.json(debugInfo);
    } catch (error) {
        return NextResponse.json(
            { error: 'Debug info unavailable', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}