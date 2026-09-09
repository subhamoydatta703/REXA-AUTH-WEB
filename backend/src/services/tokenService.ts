import { prisma } from "../config/db";
import crypto from "node:crypto"

const generateAuthToken = () => {
    return crypto.randomBytes(32).toString("hex")
}


const hashToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};


export const generateTokenService = async (userId: string, expiresInMs: number = 10 * 60 * 1000) => {

    try {
        // check if there is already existing token for this user
        const existingToken = await prisma.authToken.findFirst({
            where: { userId, expiresAt: { gt: new Date() } }
        })

        if (existingToken) {
            // delete the existing tokens
            await prisma.authToken.deleteMany({ where: { userId } })
        }

        // create raw token
        const rawToken = generateAuthToken();
        //   hash the raw token
        const hashedToken = hashToken(rawToken);
        //   set expiry time
         const expiresAt = new Date(Date.now() + expiresInMs);

        // save the token data in db
        await prisma.authToken.create({
            data: {
                userId: userId,
                hashedToken,
                expiresAt
            }
        })

        // send the token and expiry time to the user
        
        return {token: rawToken, expiresAt};
    } catch (error) {
        throw error
    }


}