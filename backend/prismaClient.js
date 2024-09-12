// Import the PrismaClient from the @prisma/client package
const { PrismaClient } = require('@prisma/client');

// Instantiate a new PrismaClient
const prisma = new PrismaClient();

// Connect to the database


// Export the instantiated PrismaClient
module.exports = prisma;
