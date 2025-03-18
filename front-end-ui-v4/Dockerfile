FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app .

# Install only production dependencies
RUN npm install --frozen-lockfile --omit=dev

# Expose the Next.js default port
EXPOSE 80
# Start the application
CMD ["npx", "next", "start" ,"-H","0.0.0.0"]
# CMD ["npm","run","dev"]
