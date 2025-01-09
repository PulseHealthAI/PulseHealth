import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { createWellnessMarket } from "../tools";
import { PublicKey } from "@solana/web3.js";

const createWellnessMarketAction: Action = {
  name: "CREATE_WELLNESS_MARKET",
  similes: [
    "create wellness market",
    "setup health market",
    "new wellness trading market",
    "create wellness trading pair",
    "setup wellness rewards market",
    "new health market",
  ],
  description: "Create a new wellness reward market for PulseHealthAI",
  examples: [
    [
      {
        input: {
          baseToken: "HealthPointToken",
          rewardToken: "WellnessToken",
          rewardAmount: 100,
          rewardCriteria: "Complete 10,000 steps",
        },
        output: {
          status: "success",
          marketId: "market_123",
          message: "Successfully created Wellness Market",
        },
        explanation:
          "Create a market where users can earn 100 Wellness Tokens for completing 10,000 steps",
      },
    ],
  ],
  schema: z.object({
    baseToken: z.string().min(1).describe("The base health token used for rewards"),
    rewardToken: z.string().min(1).describe("The reward token offered"),
    rewardAmount: z.number().positive().describe("The reward amount offered for task completion"),
    rewardCriteria: z.string().min(1).describe("The criteria for earning the reward"),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    try {
      const baseToken = new PublicKey(input.baseToken);
      const rewardToken = new PublicKey(input.rewardToken);
      const rewardAmount = input.rewardAmount;
      const rewardCriteria = input.rewardCriteria;

      const result = await createWellnessMarket(
        agent,
        baseToken,
        rewardToken,
        rewardAmount,
        rewardCriteria
      );

      return {
        status: "success",
        marketId: result.marketId,
        message: "Successfully created Wellness Market",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to create Wellness Market: ${error.message}`,
      };
    }
  },
};

export default createWellnessMarketAction;
