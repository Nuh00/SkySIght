"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export const google = async () => {
  try {
    const result = await signIn("google", {
    //   redirect: false, // Prevents automatic server-side redirect
      callbackUrl: "/dashboard",
    });
    return result; // Return the result containing the URL
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
