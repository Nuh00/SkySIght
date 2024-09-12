// authOptions.js
module.exports = {
    providers: [
      // Define any providers if necessary (optional for backend, but required for consistency)
    ],
    secret: process.env.NEXTAUTH_SECRET,
    basePath: process.env.NEXTAUTH_URL,
  };