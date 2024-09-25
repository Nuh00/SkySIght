FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy prisma directory
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

EXPOSE 4000

CMD ["npm", "start"]