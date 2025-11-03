# Build stage
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies using bun
RUN bun install

# Copy source code
COPY . .

# Build the application - continue even if type-check fails
RUN bun run build-only || true

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install a simple HTTP server to serve static files
RUN npm install -g http-server

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Serve the static files
CMD ["http-server", "dist", "-p", "5173", "--cors"]
