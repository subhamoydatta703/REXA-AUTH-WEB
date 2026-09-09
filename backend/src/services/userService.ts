import { prisma } from "../config/db";


export const getUserService = async (userID:string) => {

    const existingUser = await prisma.user.findUnique({where:{id: userID}})
    return existingUser;
    
}

export const createUserService = async (userId:string, email:string, name:string) => {

    const newUser = await prisma.user.create({
        data:{
            id:userId,
            email:email,
            name:name
        }
    })

    return newUser;
}
    