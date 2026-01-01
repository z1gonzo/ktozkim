# Use Node.js 18 Alpine for smaller image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build || (echo "TypeScript compilation failed" && exit 1)

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Override default entrypoint
ENTRYPOINT []

# Start the application
CMD ["node", "/app/dist/index.js"]
