# STM Customer Management - Black Screen Troubleshooting Guide

## 🚨 Black Screen Issue - Step by Step Fix

If you're seeing a black screen with "no available server", follow these steps:

### Step 1: Test Basic Connectivity

1. **Test the simple page first**:
   Visit: `https://yourdomain.com/simple`
   
   - ✅ **If this works**: Next.js is running, issue is with CSS/Tailwind
   - ❌ **If this fails**: Application is not starting properly

2. **Test API endpoints**:
   - Health: `https://yourdomain.com/api/health`
   - Debug: `https://yourdomain.com/api/debug`

### Step 2: Check Coolify Logs

1. Go to your Coolify dashboard
2. Navigate to your application
3. Check the **Build Logs** and **Application Logs**
4. Look for these common errors:

```bash
# Database connection errors
Error: P1001: Can't reach database server
Error: connect ECONNREFUSED

# Build errors
Error: Cannot find module
npm ERR! code ELIFECYCLE

# Runtime errors
Error: listen EADDRINUSE :::3000
```

### Step 3: Verify Environment Variables

In Coolify, check these are set correctly:

```bash
DATABASE_URL=postgresql://[username]:[password]@[service-name]:5432/[database]?schema=public
JWT_SECRET=[your-secure-jwt-secret-32-chars-minimum]
NEXT_PUBLIC_APP_URL=https://[your-domain.com]
NODE_ENV=production
```

**Important**: Replace the bracketed placeholders with your actual values. Make sure your DATABASE_URL matches your actual PostgreSQL service name and credentials in Coolify.

### Step 4: Database Connection Fix

The most common issue is database connection. Your startup script now has a timeout, but check:

1. **PostgreSQL Service Status**:
   - In Coolify, verify your PostgreSQL service is running
   - Check the service name matches your DATABASE_URL

2. **Database URL Format**:
   ```bash
   # Correct format for Coolify
   postgresql://[username]:[password]@[service-name]:5432/[database]?schema=public
   
   # Example structure (replace with your actual values)
   postgresql://[your-user]:[your-password]@[your-postgres-service]:5432/[your-database]?schema=public
   ```

### Step 5: CSS/Tailwind Issues

If the simple page works but main page is black:

1. **Check browser console** (F12):
   - Look for CSS loading errors
   - Check for JavaScript errors

2. **Verify Tailwind build**:
   - The build process should compile Tailwind CSS
   - Check if `.next/static/css/` files exist

### Step 6: Quick Fixes

Try these immediate fixes:

1. **Redeploy with clean build**:
   - In Coolify, trigger a new deployment
   - This will rebuild everything from scratch

2. **Check container health**:
   - The healthcheck should pass after 40 seconds
   - If it fails, check the logs

3. **Test without database**:
   - Temporarily comment out database calls in health check
   - See if the app starts without DB connection

### Step 7: Emergency Debugging

If nothing works, add this temporary debug route:

Create `/api/emergency/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'emergency-debug',
        env: {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
            JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
        },
        timestamp: new Date().toISOString()
    });
}
```

## 🔧 Common Solutions

### Solution 1: Database Connection Timeout
**Problem**: App waits forever for database
**Fix**: Updated startup script with timeout (already done)

### Solution 2: Wrong Environment Variables
**Problem**: DATABASE_URL doesn't match actual service
**Fix**: Update DATABASE_URL to match your Coolify PostgreSQL service

### Solution 3: CSS Not Loading
**Problem**: Tailwind CSS not compiled properly
**Fix**: Trigger clean rebuild in Coolify

### Solution 4: Port Issues
**Problem**: App trying to bind to wrong port
**Fix**: Ensure PORT=3000 is set in environment

### Solution 5: Healthcheck Failing
**Problem**: Container marked unhealthy
**Fix**: Increased healthcheck timeout to 40 seconds

## 📋 Verification Checklist

After applying fixes:

- [ ] `/simple` page loads correctly
- [ ] `/api/health` returns `{"status":"healthy"}`
- [ ] `/api/debug` shows correct environment
- [ ] Main page `/` loads without black screen
- [ ] Browser console shows no errors
- [ ] Coolify logs show no errors

## 🆘 If All Else Fails

1. **Check Coolify system status**
2. **Try deploying to a fresh Coolify application**
3. **Test the Docker image locally**:
   ```bash
   docker build -t stm-test .
   docker run -p 3000:3000 -e DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" stm-test
   ```

## 📞 Getting Help

When asking for help, provide:
1. Coolify build logs
2. Coolify application logs
3. Results from `/api/debug` endpoint
4. Browser console errors
5. Your environment variables (without sensitive values)

## 🎯 Most Likely Causes

Based on your setup, the black screen is most likely caused by:

1. **Database connection timeout** (70% probability)
2. **CSS compilation issues** (20% probability)
3. **Environment variable mismatch** (10% probability)

The fixes I've implemented should resolve the database timeout issue. If you're still seeing problems, start with Step 1 above.