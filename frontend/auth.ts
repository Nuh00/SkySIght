
import NextAuth from "next-auth";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
   },

  providers: [
    Github,
    Google,
    Resend({
      from: "Acme <onboarding@resend.dev>",
    }),
    Credentials,
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),

    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Resend({
    //   from: "Acme <onboarding@resend.dev>",
    // }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   authorize: async (credentials) => {
    //     let user: any = await db.user.findUnique({
    //       where: { email: credentials.email },
    //     });
    //     if (!user) {
    //       throw new Error("No user found");
    //     }
    //     const isValid = await compare(
    //       credentials.password as string,
    //       user.password
    //     );
    //     if (!isValid) {
    //       throw new Error("Password is incorrect");
    //     }

    //     return user; // ??????
    //   },
    // }),
  ],
});

// !! Extra middlweware file  !!//

// middleware.ts
// import { NextResponse } from "next/server";

// export function middleware(req: Request) {
//   const isLoggedIn = !!req.auth;
//   const url = new URL(req.url);z
//   console.log(`Route: ${url.pathname}, ${isLoggedIn}`);

//   // You can perform additional checks or logic here if needed

//   return NextResponse.next();
// }

// // Specify the routes this middleware should apply to
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ], // Add any other routes you want to log
// };

// Recap: User is stored in db now through github and google registration
// Recap: If user tries to log in and google or github does not exist, then user will be shown an error message
// Recap: user data is inside of the session object from auth so ...
// Recap: ... const session = await auth();
//            console.log("*****************", session?.user);
