# Use an ARM-compatible Node.js image for Apple Silicon
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files into the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for AWS App Runner
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
