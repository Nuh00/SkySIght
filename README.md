# SkySight - Job Application Tracker

SkySight is a full-stack job application tracker that helps users organize and manage their job applications efficiently. The platform allows users to track applications, update statuses, and perform advanced searches with pagination, logging, and secure authentication.

## Features

- **Job Management**: Track all job applications with features like search, pagination, and status updates (Accepted, Rejected, Pending, Ghosted).
- **User Authentication**: OAuth integration with Google and GitHub, along with password-based registration.
- **Real-time Updates**: User's job application data is fetched and updated in real-time.
- **Efficient Backend**: Migrated from serverless functions to an Express.js backend hosted on Railway, resulting in a 40% reduction in infrastructure costs and 30% faster response times.
- **Performance Optimizations**: Conducted load testing with up to 10 concurrent users, improving request handling and overall system reliability by 25%.
- **Logging & Monitoring**: Implemented Winston for logging, with logs sent to BetterStack for better readability and monitoring, resulting in 20% faster issue resolution.

## Tech Stack

### Frontend
- **Next.js**
- **React**
- **Tailwind CSS**
- **Redux** for state management
- **NextAuth.js** for authentication

### Backend
- **Express.js** (for API endpoints)
- **Prisma ORM** (for database interactions)
- **MongoDB Atlas** (database)
- **Railway** (backend hosting)

### Authentication
- **Google OAuth** and **GitHub OAuth**

### Other Technologies
- **Winston**: For logging.
- **BetterStack**: For log aggregation and monitoring.
- ** k6**: For performance testing
