const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const prisma = require('./prismaClient');gtg


const getUserJobs = require('./routes/Jobs');
const authSession = require('./middleware/authSession');


// Create express app
const app = express();




// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from your frontend's origin
    credentials: true, // Allow cookies and other credentials to be sent
  };

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cookieParser()); // Parse cookies in incoming requests


// Routes
app.use('/api/dashboard', getUserJobs);













// Listen for requests
const startServer = async () => {
    try {
      // Ensure that the Prisma client connects to the database
      await prisma.$connect();
      console.log('Connected to the database');
  
      // Start the server only after a successful connection to the database
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      process.exit(1); // Exit the process with a failure code
    }
  };
  
  // Call the function to start the server
  startServer();