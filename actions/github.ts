"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const github = async () => {
  try {
    const result = await signIn("github", {
      redirectTo: "/dashboard",
    });
    revalidatePath("/dashboard");
    return result; // Return the result containing the URL
  } catch (error) {
    return error;
    console.error("GitHub Sign-In Error:", error);
    throw error;
  }
};
