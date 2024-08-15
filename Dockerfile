# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install --only=production

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the TypeScript code (if using TypeScript)
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Define the command to run the application
CMD ["npm", "start"]
