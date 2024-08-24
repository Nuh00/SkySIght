"use server";

import * as z from "zod";
import { LoginSchema } from "@/app/schemas";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError, CredentialsSignin } from "next-auth";
import { auth } from "@/auth";

enum ErrorType {
  SignInError,
  // other error types...
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate fields... client side validation can always be bypassed

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  console.log(password);

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    console.log(`Error cause is...: ${someError.cause?.err?.message}`);
    return { error: someError.cause?.err?.message };
  }
  redirect("/dashboard");
};

// User needs to be redirected to the home page after logging in.
// !! Problems occuring in login-form, login server action and auth.ts !!//
// !! The redirect function is not working as expected !!//
