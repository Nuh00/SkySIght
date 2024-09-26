// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }
// export const db = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = db;

// ... existing code ...
import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const db = global.db || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.db = db;

db.$connect()
  .then(() => console.log("Connected to the database"))
  .catch((error: Error) =>
    console.error("Failed to connect to the database:", error)
  );

export { db };
