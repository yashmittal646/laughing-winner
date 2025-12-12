import express from "express";
import { analyzeChannel } from "../controllers/managerController.js";

const router = express.Router();

router.post("/analyze", analyzeChannel);

export default router;
