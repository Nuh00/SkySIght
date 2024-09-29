"use server";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/app/schemas";
import { getUserByEmail } from "@/data/user";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export const login = async (provider: string) => {
  await signIn(provider, {
    redirectTo: "/dashboard",
  });
  revalidatePath("/dashboard");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate fields... client side validation can always be bypassed

  const validatedFields = RegisterSchema.safeParse(values);
  console.log(`yooooo`, validatedFields);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // Create user
  console.log("about to create user");
  try {
    const { name, email, password } = validatedFields.data;
    // Hash password

    const hashedPassword = await hash(password, 10);

    console.log("about to check if user exists");

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists" };
    }

    console.log("about to create user in db");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("user created in db");

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(email, verificationToken.token);

    return { success: `User created` };
  } catch (error) {
    return { error: "Error creating user" };
  }
};

// ?? Make sure user is not able to resend email while one is still pending
const RESEND_DELAY = 3 * 60 * 1000; // 3 minutes in milliseconds
export const loginWithCreds = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found, please register" };
  }

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
    orderBy: { expires: "desc" },
  });

  // Potential issue here that was resovled
  // User was denied access to resend email
  // User tries to log in via google or github with same email
  // User fails since email is unverified but google/github allow 1 more resend
  // User resends email and is allowed to login
  // !! Problem: First verification email is still pending
  // !! So if user decides to logout and log back in via email
  // !! User is not allowed to login
  // !! Solution: Check if user.emailVerified is true
  // !! If so, then user can have another verification email sent
  // !! If not, then user must wait for first verification email to expire

  if (existingToken && !user.emailVerified) {
    const now = new Date();
    const tokenExpiry = new Date(existingToken.expires);
    const timeSinceTokenCreation =
      tokenExpiry.getTime() - now.getTime() - RESEND_DELAY;

    if (timeSinceTokenCreation > 0) {
      return {
        warning:
          "Verification email already sent. Please check your inbox or spam folder.",
      };
    }
  }

  try {
    const result = await signIn("resend", {
      from: "Skysight <noreply@skysight.app>",
      to: email,
      redirectTo: "/dashboard",
    });

    if (!result) {
      return { error: "Sign-in failed" };
    }

    return { success: "Verification email sent" };
  } catch (error) {
    // !! This is not actually an error, but a redirect since waiting for user to verify email
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      // This is not actually an error, but a redirect
      redirect("/verify-email");
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
};
