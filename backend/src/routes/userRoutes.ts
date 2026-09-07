import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUserById } from "../controllers/userController";
const router = Router();

router.get("/me", authMiddleware, getUserById)

export default router;