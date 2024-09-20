"use server";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/app/schemas";
import { getUserByEmail } from "@/data/user";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
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
  try {
    const { name, email, password } = validatedFields.data;
    // Hash password

    const hashedPassword = await hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists" };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(email, verificationToken.token);

    return { success: `User created` };
  } catch (error) {
    return { error: "Error creating user" };
  }
};


let RESEND_DELAY = 5 * 60 * 1000; // 5 minutes in milliseconds
export const loginWithCreds = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email } = validatedFields.data;

  const existingToken = await db.verificationToken.findFirst({
    where: { identifier: email },
    orderBy: { expires: 'desc' }
  });

  if (existingToken) {
    const now = new Date();
    const tokenExpiry = new Date(existingToken.expires);
    const timeSinceTokenCreation = tokenExpiry.getTime() - now.getTime() - RESEND_DELAY;

    if (timeSinceTokenCreation > 0) {
      return { warning: "Verification email already sent. Please check your inbox or spam folder." };
    }
  }

  try {
    const result = await signIn("resend", { email, redirectTo: '/dashboard' });

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
