# Use Node.js v20 base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose the default React dev server port
EXPOSE 3001

# Start the React development server
CMD ["npm", "start"]
