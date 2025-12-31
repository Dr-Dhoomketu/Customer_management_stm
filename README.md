# STM Customer Management System

A comprehensive Enterprise Resource Planning (ERP) system designed for STM Journal Solutions, built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Core Functionality
- **Multi-tenant Architecture** - Support for multiple companies
- **Role-based Access Control** - 8 distinct user roles with granular permissions
- **Customer Management** - Individual, Institution, and Agency customer types
- **Subscription Management** - Flexible journal subscription plans
- **Invoice & Payment Tracking** - Complete financial management
- **Communication Logging** - Track all customer interactions
- **Task Management** - Built-in task and project management
- **Real-time Chat** - Internal team communication
- **Support Ticketing** - Customer support system
- **Analytics Dashboard** - Business intelligence and reporting

### Technical Features
- **Modern Stack** - Next.js 15, TypeScript, Prisma ORM
- **Database** - PostgreSQL with comprehensive schema
- **Authentication** - JWT-based with secure password hashing
- **Docker Ready** - Multi-stage Docker builds with health checks
- **Production Ready** - Optimized for deployment on Coolify
- **Type Safety** - Full TypeScript implementation
- **Security** - Comprehensive security measures and audit logging

## 📋 Prerequisites

- Node.js 22.12.0 or higher
- PostgreSQL 15+
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stm-customer-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

   # Run migrations
   npx prisma migrate deploy

   # Seed the database
   npm run seed:production
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Application: http://localhost:3000
   - Simple test page: http://localhost:3000/simple
   - Health check: http://localhost:3000/api/health

### Docker Deployment

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Using Docker directly**
   ```bash
   docker build -t stm-customer .
   docker run -p 3000:3000 -e DATABASE_URL="your-db-url" stm-customer
   ```

## 🚀 Production Deployment

### Coolify Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Coolify deployment instructions.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret (32+ chars) | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `SEED_DATABASE` | Whether to seed on deploy | No |

## 🏗️ Architecture

### Database Schema

The system uses a comprehensive PostgreSQL schema with:
- **Companies** - Multi-tenant support
- **Users** - Role-based user management
- **Customers** - Flexible customer profiles
- **Journals & Plans** - Product catalog
- **Subscriptions** - Subscription management
- **Invoices & Payments** - Financial tracking
- **Communications** - Interaction logging
- **Tasks** - Task management
- **Chat System** - Real-time messaging
- **Support Tickets** - Customer support
- **Audit Logs** - Complete audit trail

### API Structure

```
/api
├── /auth          # Authentication endpoints
├── /users         # User management
├── /customers     # Customer management
├── /subscriptions # Subscription management
├── /invoices      # Invoice management
├── /analytics     # Business analytics
├── /chat          # Chat system
├── /support       # Support tickets
├── /health        # Health checks
└── /debug         # Debug information
```

## 🔐 Security

### Implemented Security Features
- JWT-based authentication with secure token handling
- bcrypt password hashing (12 rounds)
- Role-based access control (RBAC)
- SQL injection protection via Prisma
- Input validation and sanitization
- Audit logging for all operations
- Docker security best practices

### Security Checklist
- [ ] Change default admin password
- [ ] Configure strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set up regular database backups
- [ ] Configure monitoring and alerting

See [SECURITY.md](./SECURITY.md) for comprehensive security guidelines.

## 🧪 Testing

### Health Checks
- **Simple Page**: `/simple` - Basic functionality test
- **Health API**: `/api/health` - Application and database health
- **Debug API**: `/api/debug` - System information

### Running Tests
```bash
# Run development server
npm run dev

# Check health endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/debug
```

## 🔧 Troubleshooting

### Common Issues

1. **Black Screen / No Available Server**
   - Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for step-by-step fixes

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check PostgreSQL service status
   - Ensure database credentials are correct

3. **Build Failures**
   - Check Node.js version (22.12.0+)
   - Verify all environment variables are set
   - Clear node_modules and reinstall

### Debug Information
- Visit `/api/debug` for system information
- Check application logs for detailed error messages
- Use `/simple` page to test basic functionality

## 📊 Default Credentials

After seeding the database:
- **Email**: admin@stm.com
- **Password**: password123

**⚠️ Important**: Change the admin password immediately after first login!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is proprietary software for STM Journal Solutions.

## 📞 Support

For technical support:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review [SECURITY.md](./SECURITY.md) for security issues
- Contact the development team

## 🔄 Version History

- **v0.1.0** - Initial release with core ERP functionality
- Multi-tenant customer management
- Subscription and billing system
- Real-time chat and support tickets
- Analytics dashboard
- Docker deployment ready

---

**Built with ❤️ for STM Journal Solutions**