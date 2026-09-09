
import { type AuthenticatedRequest } from '../middlewares/authMiddleware';
import  { type Request, type Response } from "express";

import {generateTokenService, verifyTokenService} from "../services/tokenService"


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



// verify token

export const verifyTokenController = async (req: Request, res: Response) => {

    try {
        // checking header for token
        const auth = req.headers.authorization;
        if (!auth?.startsWith("Bearer ")) {
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }
        // slicing the token from the header
        const tokenString = auth.slice("Bearer ".length).trim();
        // verify the token
        const verifiedToken = await verifyTokenService(tokenString);
        if (!verifiedToken) {
            return res.status(401).json({
                success: false, 
                message: "Invalid or expired token" 
            });
        }
        // send response
        return res.status(200).json({
            success: true,
            message: "Token verified successfully",   
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}