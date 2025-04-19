FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code (corrected from previous version)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Don't run migrations here - will be handled at runtime
# for better control over database availability

# Start application with wait-for-it script
CMD ["npm", "run", "start"]