# Start with the official Node.js 22 image
FROM node:22.0.0-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install the dependencies in the container
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application
RUN npm run build

# Your app binds to port 3000; make sure the container listens on this port at runtime
EXPOSE 5000

# Define the command to run your app
CMD ["node", "dist/main"]