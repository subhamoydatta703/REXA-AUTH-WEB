import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { userTokenController } from "../controllers/tokenController";

const router = Router();

router.post("/token", authMiddleware, userTokenController);

export default router;
