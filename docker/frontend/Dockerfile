FROM node:20-alpine

WORKDIR /app/frontend

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .


# Start the application
CMD ["npm", "run", "dev"]