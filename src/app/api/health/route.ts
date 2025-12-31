import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connectivity
    let dbStatus = "unknown";
    let dbError = null;
    
    try {
      // Dynamic import to avoid build-time issues
      const { prisma } = await import('@/lib/prisma');
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (error) {
      dbStatus = "disconnected";
      dbError = error instanceof Error ? error.message : "Unknown database error";
    }

    const healthData = {
      status: dbStatus === "connected" ? "healthy" : "degraded",
      service: "STM Customer Management System",
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        error: dbError
      },
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };

    // Return 200 for healthy, 503 for degraded
    const statusCode = dbStatus === "connected" ? 200 : 503;
    
    return NextResponse.json(healthData, { status: statusCode });
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      service: "STM Customer Management System",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 503 });
  }
}
