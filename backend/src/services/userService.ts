import { prisma } from "../config/db";


export const getUserService = async (userID:string) => {

    const existingUser = await prisma.user.findUnique({where:{id: userID}})
    return existingUser;
    
}