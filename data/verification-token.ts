import { db } from "@/db";

export const getVerificationToken = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email: email,
      },
      
    });

    return verificationToken;
  } catch (error) {}
};
