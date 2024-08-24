"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export const github = async () => {
  try {
    const result = await signIn("github", {
      redirect: false,
      // callbackUrl: "/dashboard",
    });
    return result; // Return the result containing the URL
  } catch (error) {
    return error;
    console.error("GitHub Sign-In Error:", error);
    throw error;
  }
};
