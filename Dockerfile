FROM node:18-alpine AS deps
WORKDIR /app

# Install git and essential tools for both Ellipsis and production
RUN apk add --no-cache git curl openjdk11-jre

# Copy package files
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS test
WORKDIR /app

# Copy deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Monite API types (required for both testing and build)
RUN npm run generate:api

# Run comprehensive validation suite
RUN npm run lint \
    && npm run lint:api \
    && npm run type-check \
    && npm run test:ci \
    && npm run test:api:spectral \
    && npm run format:check

# Special stage for Ellipsis code validation
# This stage can be targeted by Ellipsis for code review
FROM test AS ellipsis
WORKDIR /app

# Ellipsis-specific validations can be added here
# No ENTRYPOINT or CMD as per Ellipsis requirements

FROM node:18-alpine AS builder
WORKDIR /app

# Copy from test stage (ensures we only build if tests pass)
COPY --from=test /app ./

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]