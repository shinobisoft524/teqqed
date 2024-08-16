# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./
COPY ./prisma/schema.prisma ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

RUN npm run db:seed

# Stage 2: Serve the built application using a minimal Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Install production dependencies
# RUN npm install --legacy-peer-deps 
# --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]