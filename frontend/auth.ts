import NextAuth from "next-auth";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },

  providers: [
    Github,
    Google,
    Resend({
      from: "SkySight <noreply@skysight.app>",
      // Make sure this email matches a verified sender identity in your Resend account
    }),
    Credentials,
  ],
});
