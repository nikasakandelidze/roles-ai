# Use an official Node.js runtime as the base image
FROM node:17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the custom NGINX configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production-ready build from the build stage to the nginx web server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (the default port for HTTP traffic)
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
