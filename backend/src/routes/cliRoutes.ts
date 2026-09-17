import { Router } from "express";
import { verifyTokenController } from "../controllers/tokenController";

const router = Router();

// POST /api/cli/verify
router.post("/verify", verifyTokenController);
router.post("/memory", verifyTokenController);

export default router;
