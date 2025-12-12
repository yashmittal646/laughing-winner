import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route example
router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route accessed!",
    user: req.user,
  });
});

export default router;
