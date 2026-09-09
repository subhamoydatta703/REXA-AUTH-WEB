
import { type AuthenticatedRequest } from '../middlewares/authMiddleware';
import type { Response } from "express";

import {generateTokenService} from "../services/tokenService"


export const userTokenController = async (req: AuthenticatedRequest, res: Response) => {

    try {
        // checking is the req has userId
        if(!req.userId){
            return res.status(404).json({
                success:false,
                message:"Invalid user"
            })
        }
        // get the token and expiry time using the user id
        const {token, expiresAt} = await generateTokenService(req.userId);
        return res.status(200).json({
            success: true,
            message: "Token generated successfully",
            token,
            expiresAt,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}