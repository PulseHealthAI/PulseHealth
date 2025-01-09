import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { tradeWellnessTokens } from "../tools";
import { PublicKey } from "@solana/web3.js";

const tradeWellnessTokensAction: Action = {
  name: "TRADE_WELLNESS_TOKENS",
  similes: [
    "swap wellness tokens",
    "exchange health tokens",
    "convert wellness credits",
    "trade pulse tokens",
    "token swap",
  ],
  description: `Swap wellness tokens for other health-related tokens within the PulseHealthAI network for health data and reward conversions.`,
  examples: [
    [
      {
        input: {
          outputMint: "HealthToken123456789012345678901234567890123",
          inputAmount: 50,
        },
        output: {
          status: "success",
          message: "Trade executed successfully",
          transaction: "5ABCDE123...",
          inputAmount: 50,
          inputToken: "PulseToken",
          outputToken: "HealthToken123456789012345678901234567890123",
        },
        explanation: "Swap 50 PulseTokens for HealthTokens",
      },
    ],
  ],
  schema: z.object({
    outputMint: z.string().min(32, "Invalid output mint address"),
    inputAmount: z.number().positive("Input amount must be positive"),
    inputMint: z.string().min(32, "Invalid input mint address").optional(),
    slippageBps: z.number().min(0).max(10000).optional(),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    const transaction = await tradeWellnessTokens(
      agent,
      new PublicKey(input.outputMint),
      input.inputAmount,
      input.inputMint
        ? new PublicKey(input.inputMint)
        : new PublicKey("PulseTokenDefault"),
      input.slippageBps,
    );

    return {
      status: "success",
      message: "Trade executed successfully",
      transaction,
      inputAmount: input.inputAmount,
      inputToken: input.inputMint || "PulseToken",
      outputToken: input.outputMint,
    };
  },
};

export default tradeWellnessTokensAction;
