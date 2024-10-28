FROM node:lts-alpine

# Create a working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy all files to the working directory
COPY . .

# Generate Prisma Client
RUN npm run prisma:generate

# Apply Prisma migrations
RUN npm run prisma:migrate

# Start the app
CMD ["npm", "run", "start"]
