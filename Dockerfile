# Use official Node.js image as the base
FROM node:20-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project into the container
COPY . .

# Build the React project
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
