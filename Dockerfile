# Use Node base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 8081

# Start the app
CMD ["npm", "start"]
