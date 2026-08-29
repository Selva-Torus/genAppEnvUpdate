# Stage 1: Install dependencies + build
FROM docker.io/library/node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy Prisma schema and generate client only (no db push)
COPY src/erd/prisma ./prisma

RUN npx prisma generate

# Copy source and build the TypeScript code
COPY . .
RUN npm run build
RUN mkdir -p dist/prisma \
&& cp src/erd/prisma/schema.prisma dist/prisma/schema.prisma \
&& cp src/erd/prisma/schema.previous.prisma dist/prisma/schema.previous.prisma \
&& cp -r src/erd/prisma/migrations dist/prisma/migrations

# Stage 2: Final stage - Run the application
FROM docker.io/library/node:20-alpine AS production
WORKDIR /app

# Install only production deps (smaller final image)
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev && npm install prisma
# Carry over the generated Prisma client from the builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY src/erd/prisma ./prisma
COPY .env .env

# Copy entrypoint
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose the port
EXPOSE 3000

# Run migrations then start app
ENTRYPOINT ["./entrypoint.sh"]
