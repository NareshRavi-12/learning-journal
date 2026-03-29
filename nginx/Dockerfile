# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Final stage
FROM node:18-alpine

# Set environment variables
ENV PORT=3000

WORKDIR /app

# Copy node modules from builder stage

# Copy application files
COPY package.json ./
COPY server.js ./
COPY index.html ./


RUN npm install 

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000


# Start application
CMD ["npm", "start"]
