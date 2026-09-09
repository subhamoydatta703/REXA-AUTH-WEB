
import { type AuthenticatedRequest } from '../middlewares/authMiddleware';
import type { Response } from "express";
import { getUserService, createUserService } from '../services/userService';
import { clerkClient } from "@clerk/express";


export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {

        if (!req.userId) {
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            })
        }

        const existingUser = await getUserService(req.userId)
        if (!existingUser) {
            return res.status(409).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            existingUser
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })



    }
}

export const createUserController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            })
        }

        const existingUser = await getUserService(req.userId)
        if (existingUser) {
            return res.status(40).json({
                success: false,
                message: "User already exists"
            })
        }

        //  Fetch user data from Clerk
        const clerkUser = await clerkClient.users.getUser(req.userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "No email associated with this Clerk account",
            });
        }

        const user = await createUserService(req.userId, email, name!)

        return res.status(201).json({
            success: true,
            user,
        });




    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}