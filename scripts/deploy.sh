#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Check if this is a fresh database or existing one
echo "🔍 Checking database status..."
if npx prisma migrate status | grep -q "Database schema is up to date"; then
    echo "✅ Database is up to date"
elif npx prisma migrate status | grep -q "Following migration have not yet been applied"; then
    echo "🗄️ Applying pending migrations..."
    npx prisma migrate deploy
else
    echo "🗄️ Setting up database schema..."
    # For production deployment, use migrate deploy instead of db push
    npx prisma migrate deploy
fi

# Seed database only if SEED_DATABASE is explicitly set to true
if [ "$SEED_DATABASE" = "true" ]; then
    echo "🌱 Seeding database..."
    npm run seed
else
    echo "⏭️ Skipping database seeding (set SEED_DATABASE=true to enable)"
fi

echo "✅ Deployment process completed!"