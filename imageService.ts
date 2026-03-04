import { GoogleGenAI } from "@google/genai";

export async function generateHeroImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: "Ultra-modern luxury villa driveway at sunset with architectural lighting. The scene features clean lines, glass walls, and a minimalist aesthetic. Several BMW M3 G80s in Isle of Man Green and Portimao Blue are parked elegantly alongside sleek black Toyota Yaris Hybrid cars. The sky is a deep twilight blue with warm sunset glows. Professional automotive photography, 8k resolution, 16:9 aspect ratio.",
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
  return null;
}
