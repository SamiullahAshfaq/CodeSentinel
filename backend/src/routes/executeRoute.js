import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { codeExecutionRateLimit } from "../middleware/rateLimit.js";
import { executeCode } from "../controllers/executeController.js";

const router = express.Router();

router.post("/", protectRoute, codeExecutionRateLimit, executeCode);

export default router;