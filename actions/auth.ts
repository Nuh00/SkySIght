"use server";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/app/schemas";
import { getUserByEmail } from "@/data/user";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { AuthError } from "next-auth";

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
  console.log(validatedFields);

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

    return { success: `User created` };
  } catch (error) {
    return { error: "Error creating user" };
  }
};

export const loginWithCreds = async (values: z.infer<typeof LoginSchema>) => {
  // Validate fields... client side validation can always be bypassed

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
  }
};
