# Build stage
FROM node:22 AS builder
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install
 
COPY . .
RUN node ace build
 
# Production stage
FROM node:22
 
WORKDIR /app
 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
 
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333
 

 
CMD ["sh", "-c", "node build/ace migration:run --force && node build/bin/server.js"]