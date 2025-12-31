# STM Customer Management System - Coolify Deployment Guide

This guide will help you deploy the STM Customer Management System on Coolify with your custom domain.

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- Coolify instance running
- Domain name configured
- GitHub repository with this code

### 2. Push to GitHub
Make sure all files are committed and pushed:
```bash
git add .
git commit -m "Add Coolify deployment configuration"
git push origin main
```

### 3. Create Coolify Project

1. **Login to Coolify Dashboard**
2. **Create New Project** → Name it `stm-customer`
3. **Add PostgreSQL Database**:
   - Click "Add Resource" → "Database" → "PostgreSQL"
   - Name: `stm-postgres`
   - Database: `stm_customer`
   - Username: `stm_user` 
   - Password: `[generate-strong-password]`
   - Save the credentials!

### 4. Deploy Application

1. **Add Application**:
   - Click "Add Resource" → "Application"
   - Choose "Public Repository"
   - Repository URL: `https://github.com/yourusername/your-repo-name`
   - Branch: `main`

2. **Configure Build Settings**:
   - **Build Pack**: Docker
   - **Dockerfile Location**: `./Dockerfile`
   - **Port**: `3000`

3. **Environment Variables**:
   Add these in the application settings:
   ```env
   DATABASE_URL=postgresql://[username]:[password]@[postgres-service]:5432/[database]?schema=public
   JWT_SECRET=[your-secure-jwt-secret-minimum-32-characters]
   NEXT_PUBLIC_APP_URL=https://[your-domain.com]
   NODE_ENV=production
   SEED_DATABASE=false
   ```

   **Important**: 
   - Replace all bracketed placeholders with your actual values
   - Use the exact PostgreSQL service name from Coolify
   - Generate a strong JWT secret (32+ characters)
   - Use your actual domain name

### 5. Configure Domain

1. **Add Domain**:
   - Go to application settings
   - Add your custom domain
   - Enable SSL (automatic with Let's Encrypt)

2. **DNS Configuration**:
   Point your domain to your Coolify server IP:
   ```
   A record: yourdomain.com → YOUR_COOLIFY_SERVER_IP
   ```

### 6. Deploy

1. **Click "Deploy"**
2. **Monitor build logs** for any issues
3. **Wait for deployment to complete**

### 7. Initialize Database (First Time Only)

After successful deployment, the database will be automatically set up with migrations. Your existing admin user will be preserved.

If you need to add sample data to a fresh database:
1. Go to Coolify application terminal
2. Run: `npm run seed:production`

## 🔧 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://[user]:[pass]@[host]:5432/[db]` |
| `JWT_SECRET` | Secret for JWT tokens (32+ chars) | `[your-secure-secret-key-32-chars-min]` |
| `NEXT_PUBLIC_APP_URL` | Your application URL | `https://[your-domain.com]` |
| `NODE_ENV` | Environment mode | `production` |
| `SEED_DATABASE` | Whether to seed on deploy | `false` (to preserve data) |

## 🗄️ Database Management

### Migrations
- Migrations run automatically on deployment
- Your existing data is preserved
- New schema changes are applied safely

### Backup (Recommended)
Before major updates, backup your database:
```bash
# In Coolify PostgreSQL terminal
pg_dump -U stm_user stm_customer > backup.sql
```

### Restore
```bash
# In Coolify PostgreSQL terminal
psql -U stm_user stm_customer < backup.sql
```

## 🔐 Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Strong database password
- [ ] SSL enabled on domain
- [ ] Environment variables secured
- [ ] Default admin password changed

## 🚨 Troubleshooting

### Build Fails
1. Check build logs in Coolify
2. Verify all environment variables are set
3. Ensure Docker builds locally: `docker build -t stm-test .`

### Database Connection Issues
1. Verify DATABASE_URL format
2. Check PostgreSQL service is running
3. Ensure database name and credentials match

### Application Won't Start
1. Check application logs
2. Verify PORT is set to 3000
3. Ensure all dependencies are installed

### Domain Issues
1. Check DNS propagation: `dig yourdomain.com`
2. Verify SSL certificate generation
3. Check Coolify proxy configuration

## 📊 Post-Deployment

### First Login
1. Visit your domain
2. Login with: `admin@stm.com` / `password123`
3. **Immediately change the admin password**
4. Configure your company settings

### Monitoring
- Monitor application logs in Coolify
- Set up database backups
- Monitor disk usage and performance

## 🔄 Updates

To deploy updates:
1. Push changes to GitHub
2. Coolify will auto-deploy (if enabled)
3. Or manually trigger deployment in Coolify

## 📞 Support

If you encounter issues:
1. Check Coolify documentation
2. Review application logs
3. Verify environment configuration
4. Test database connectivity

---

**🎉 Congratulations!** Your STM Customer Management System should now be running on your domain with Coolify!