"use server";
import * as z from "zod";
import { RegisterSchema } from "@/app/schemas";
import { User } from "@/app/models/userModel";
import { getUserByEmail } from "@/data/user";
import { hash } from "bcryptjs";

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

    const user = await User.create({ name, email, password: hashedPassword });

    return { success: `User created` };
  } catch (error) {
    return { error: "Error creating user" };
  }
};
