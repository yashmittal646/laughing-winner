import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function generateSuggestions(videos) {
  try {
    const prompt = `
Analyze this YouTube channel's content and provide:

1. Top performing themes
2. Content weaknesses
3. Audience demographics + interests
4. 10 viral video ideas (with title + hook + thumbnail concept)
5. What strategy they should follow to grow faster

VIDEOS:
${JSON.stringify(videos, null, 2)}
    `;

    const response = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content;

  } catch (err) {
    console.error("AI Error:", err);
    throw new Error("AI generation failed");
  }
}
