const express = require("express");
require("dotenv").config();
const cors = require("cors");
const prisma = require("./prismaClient");
const requestProfiler = require("./middleware/requestProfiler");
const helmet = require("helmet");

const getUserJobs = require("./routes/Jobs");

// Create express app
const app = express();
app.use(helmet());

// Configure CORS options


const allowedOrigins = [
  "http://localhost:3000", // Localhost for development
  "https://www.skysight.app", // Production URL
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // If origin is in allowedOrigins or there's no origin (non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // Allow credentials like cookies
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(requestProfiler); // Add this line

// Routes
app.use("/api/dashboard", getUserJobs);

// Listen for requests
const startServer = async () => {
  try {
    // Ensure that the Prisma client connects to the database
    await prisma.$connect();
    console.log("Connected to the database");

    // Start the server only after a successful connection to the database
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Call the function to start the server
startServer();
