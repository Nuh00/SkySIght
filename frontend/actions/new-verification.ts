// "use server";

// import { db } from "@/db";
// import { getUserByEmail } from "@/data/user";
// import { get } from "http";
// import { getVerificationTokenbyToken } from "@/data/verification-token";

// export const newVerifyEmail = async (token: string) => {
//     const existingToken = await getVerificationTokenbyToken(token);

//     if (!existingToken) {
//         return { error: "Invalid token" };
//     }

//     const hasExpired = new Date() > existingToken.expires;

//     if (hasExpired) {
//         return { error: "Token has expired" };
//     }

//     const user = await getUserByEmail(existingToken.email);

//     if (!user) {
//         return { error: "User not found" };
//     }

//     await db.user.update({
//         where: {
//             id: existingToken.id

//         },
//         data: {
//             emailVerified: new Date(),
//             email: existingToken.email
//         }
//     })

//     await db.verificationToken.delete({
//         where: {
//             id: existingToken.id
//         }
//     })

//     return { success: "Email verified" };






// };