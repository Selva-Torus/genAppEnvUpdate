#!/bin/sh
set -e
echo "Running Prisma db push..."
npx prisma db push --accept-data-loss --schema=./prisma/schema.prisma
echo "Starting application..."
exec node dist/main

