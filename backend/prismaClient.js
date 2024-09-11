// Import the PrismaClient from the @prisma/client package
const { PrismaClient } = require('@prisma/client');

// Instantiate a new PrismaClient
const prisma = new PrismaClient();

// Export the instantiated PrismaClient
module.exports = prisma;
