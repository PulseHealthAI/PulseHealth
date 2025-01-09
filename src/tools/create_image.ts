import { PulseHealthAI } from "../index";
import OpenAI from "openai";

/**
 * Generate a health-related image using OpenAI's DALL-E for PulseHealthAI wellness reports and metrics.
 * @param agent PulseHealthAI instance configured for health analytics
 * @param prompt Text description of the health-related image to generate
 * @param size Image size ('256x256', '512x512', or '1024x1024') (default: '1024x1024')
 * @param n Number of images to generate (default: 1)
 * @returns Object containing the generated image URLs for wellness analytics
 */
export async function generateHealthImage(
  agent: PulseHealthAI,
  prompt: string,
  size: "256x256" | "512x512" | "1024x1024" = "1024x1024",
  n: number = 1,
) {
  try {
    if (!agent.config.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not found in PulseHealthAI agent configuration");
    }

    const openai = new OpenAI({
      apiKey: agent.config.OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
      prompt: `Health and wellness: ${prompt}`,
      n,
      size,
    });

    return {
      images: response.data.map((img: any) => img.url),
    };
  } catch (error: any) {
    throw new Error(`PulseHealthAI image generation failed: ${error.message}`);
  }
}
