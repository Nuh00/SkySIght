import { User } from "@/app/models/userModel";
import { compare } from "bcryptjs";

import NextAuth from "next-auth";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        console.log(user);

        const userData = {
          firstName: user.name,
          email: user.email,
          id: user._id,
          role: user.role,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },

  callbacks: {
    async session({ session, token }) {
      // console.log("sessionToken:", token);
      // console.log("session:", session);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token }) {
      // console.log(token);
      token.customField = "customField";
      return token;
    },

    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "google") {
        const { email, name, image} = user; //!!
        const googleId = profile?.id;
       try {
         const alreadyUser = await User.findOne({ email });

         if (!alreadyUser) {
           console.log("Creating a new user:", {
             email,
             name,
             image,
             googleId,
           });
           await User.create({
             email,
             name,
             image,
             authProviderId: googleId, // Store Google ID here
             authProvider: "google", // Optionally store the provider
           });
         } else {
           console.log("User already exists:", alreadyUser);
         }

         return true;
       } catch (error) {
         console.error("Error while creating user:", error);
         throw new Error("Error while creating user");
       }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});

// !! Extra middlweware file  !!//

// middleware.ts
// import { NextResponse } from "next/server";

// export function middleware(req: Request) {
//   const isLoggedIn = !!req.auth;
//   const url = new URL(req.url);
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
