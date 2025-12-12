import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import OpenAI from "openai";

const router = express.Router();

router.post("/ask", protect, async (req, res) => {
  try {
    console.log("Loaded NVIDIA Key:", process.env.NVIDIA_API_KEY ? "OK" : "MISSING");
    console.log("Key starts with:", process.env.NVIDIA_API_KEY?.slice(0, 12));

    const client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1"
    });

    const completion = await client.chat.completions.create({
      model: "moonshotai/kimi-k2-thinking",
      messages: [{ role: "user", content: req.body.message }],
      temperature: 1,
      top_p: 0.9,
      max_tokens: 2048
    });

    return res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.log("KIMI ERROR:", error.response?.data || error.message);
    return res.status(500).json({ message: "AI request failed", error });
  }
});

export default router;
