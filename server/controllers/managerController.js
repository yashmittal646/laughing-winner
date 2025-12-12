import { fetchChannelVideos } from "../utils/youtubeFetcher.js";
import { generateSuggestions } from "../utils/aiGenerator.js";

export const analyzeChannel = async (req, res) => {
  try {
    const { channelUrl } = req.body;

    if (!channelUrl) {
      return res.status(400).json({ message: "Channel URL is required" });
    }

    const videos = await fetchChannelVideos(channelUrl);

    const aiInsights = await generateSuggestions(videos);

    res.json({
      message: "Channel analysis successful",
      videos,
      aiInsights,
    });

  } catch (err) {
    console.error("Manager Error:", err);
    res.status(500).json({
      message: "Manager analysis failed",
      error: err.message,
    });
  }
};
