import { prisma } from "../config/db";
import crypto from "node:crypto"

const generateAuthToken = () => {
    return crypto.randomBytes(32).toString("hex")
}


const hashToken = (token: string) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};


export const tokenService = async (userId: string, expiresInMs: number = 10 * 60 * 1000) => {

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

        // save the token data in db
        await prisma.authToken.create({
            data: {
                userId: userId,
                hashedToken,
                expiresAt: new Date(Date.now() + expiresInMs)
            }
        })

        // send the rawtoken to the user
        
        return rawToken;
    } catch (error) {
        throw error
    }


}