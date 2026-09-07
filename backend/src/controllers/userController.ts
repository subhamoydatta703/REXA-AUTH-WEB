
import { type AuthenticatedRequest } from '../middlewares/authMiddleware';
import type { Response } from "express";
import { getUserService } from '../services/userService';
import { success } from 'zod';


export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        
        if(!req.userId){
            return res.status(404).json({
                success: false,
                message: "Invalid user"
            })
        }

        const existingUser = await getUserService(req.userId)
        if(!existingUser){
            return res.status(404).json({
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