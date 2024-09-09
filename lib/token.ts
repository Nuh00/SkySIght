import { getVerificationToken } from '@/data/verification-token';
import { db } from '@/db';
import {v4 as uuidv4} from 'uuid';
export const generateVerificationToken = async (email: string) => {

    // Generate a random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hour

    // Check if the token already exists for the user
    const existingToken = await getVerificationToken(email);

    if (existingToken){
        // delete the existing token
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });

    }

    // Create a new verification token

    const verificationToken = await db.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: new Date(expires)
        }
    });

    return verificationToken;

};
