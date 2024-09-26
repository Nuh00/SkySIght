// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }
// export const db = global.prisma || new PrismaClient();                  

// if (process.env.NODE_ENV !== "production") global.prisma = db;




import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};

const prisma = global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

prisma
  .$connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Failed to connect to the database:", error));

export default prisma;
