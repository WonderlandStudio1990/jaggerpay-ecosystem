FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS test
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run linting, type checking, tests, and API spec validation
RUN npm run lint \
    && npm run lint:api \
    && npm run type-check \
    && npm run test:ci \
    && npm run test:api:spectral \
    && npm run format:check

FROM node:18-alpine AS builder
WORKDIR /app

# Install Java for OpenAPI generator and curl for healthcheck
RUN apk add --no-cache openjdk11 curl

# Copy from test stage (ensures we only build if tests pass)
COPY --from=test /app ./

# Generate API types and build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run generate:api || true
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

# Expose the port the app runs on
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]