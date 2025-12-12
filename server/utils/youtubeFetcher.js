import axios from "axios";

export async function fetchChannelVideos(channelUrl) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const handle = channelUrl.split("@")[1];
    if (!handle) throw new Error("Invalid YouTube handle.");

    // Get channel ID
    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: handle,
          type: "channel",
          key: apiKey,
        },
      }
    );

    if (!searchRes.data.items.length)
      throw new Error("Channel not found.");

    const channelId = searchRes.data.items[0].snippet.channelId;

    // Get videos
    const videoRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          channelId,
          maxResults: 25,
          order: "date",
          type: "video",
          key: apiKey,
        },
      }
    );

    const videos = videoRes.data.items.map((v) => ({
      id: v.id.videoId,
      title: v.snippet.title,
      description: v.snippet.description,
      tags: v.snippet.tags || [],
      publishedAt: v.snippet.publishedAt,
    }));

    return videos;

  } catch (err) {
    console.error("YouTube Fetch Error:", err.response?.data || err);
    throw new Error("Failed fetching YouTube channel videos.");
  }
}
