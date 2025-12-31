# Base image (Prisma compatible, stable)
FROM node:20-bullseye AS base

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# --------------------
# Dependencies stage
# --------------------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# --------------------
# Build stage
# --------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build

# --------------------
# Runtime stage
# --------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]

