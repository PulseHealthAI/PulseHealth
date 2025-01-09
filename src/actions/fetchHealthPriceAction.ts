import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import { fetchHealthMetricPrice } from "../tools";

const fetchHealthPriceAction: Action = {
  name: "FETCH_HEALTH_PRICE",
  similes: [
    "get health metric price",
    "check health score value",
    "fetch wellness token price",
    "price check for health tokens",
    "get price in usd",
  ],
  description:
    "Fetch the current price of a PulseHealth wellness metric or token in USD using the PulseHealthAI API",
  examples: [
    [
      {
        input: {
          tokenAddress: "WellnessToken123456789012345678901234567890123",
        },
        output: {
          status: "success",
          price: "50.00",
          message: "Current price: $50.00 USD",
        },
        explanation: "Fetches the current price of the wellness token in USD",
      },
    ],
  ],
  schema: z.object({
    tokenAddress: z
      .string()
      .describe("The mint address of the wellness token to fetch the price for"),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    try {
      const tokenId = new PublicKey(input.tokenAddress);
      const price = await fetchHealthMetricPrice(tokenId);

      return {
        status: "success",
        price,
        message: `Current price: $${price} USD`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to fetch health metric price: ${error.message}`,
      };
    }
  },
};

export default fetchHealthPriceAction;
