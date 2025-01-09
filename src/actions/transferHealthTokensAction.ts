import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import { transferHealthTokens } from "../tools";

const transferHealthTokensAction: Action = {
  name: "TRANSFER_HEALTH_TOKENS",
  similes: [
    "send wellness tokens",
    "transfer health credits",
    "send pulse tokens",
    "transfer wellness points",
    "send tokens",
  ],
  description: `Transfer wellness or health-related tokens to another address within the PulseHealthAI network for health data sharing and rewards distribution.`,
  examples: [
    [
      {
        input: {
          to: "8x2dR8Mpzuz2YqyZyZjUbYWKSWesBo5jMx2Q9Y86udVk",
          amount: 100,
          mint: "HealthToken123456789012345678901234567890123",
        },
        output: {
          status: "success",
          message: "Transfer completed successfully",
          amount: 100,
          recipient: "8x2dR8Mpzuz2YqyZyZjUbYWKSWesBo5jMx2Q9Y86udVk",
          token: "HealthToken123456789012345678901234567890123",
          transaction: "5UfgJ5vVZxUxefDGqzqkVLHzHxVTyYH9StYyHKgvHYmXJgqJKxEqy9k4Rz9LpXrHF9kUZB7",
        },
        explanation: "Transfer 100 HealthTokens to the specified recipient address",
      },
    ],
  ],
  schema: z.object({
    to: z.string().min(32, "Invalid PulseHealthAI address"),
    amount: z.number().positive("Amount must be positive"),
    mint: z.string().optional(),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    const recipient = new PublicKey(input.to);
    const mintAddress = input.mint ? new PublicKey(input.mint) : undefined;

    const tx = await transferHealthTokens(agent, recipient, input.amount, mintAddress);

    return {
      status: "success",
      message: "Transfer completed successfully",
      amount: input.amount,
      recipient: input.to,
      token: input.mint || "PulseToken",
      transaction: tx,
    };
  },
};

export default transferHealthTokensAction;
