# Build stage
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy only what's needed at runtime
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/resources ./resources


CMD ["node", "./build/server.js"]
