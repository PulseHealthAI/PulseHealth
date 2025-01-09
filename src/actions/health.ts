import { PublicKey } from "@solana/web3.js";
import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { get_health } from "../tools";

const health: Action = {
  name: "health_ACTION",
  similes: [
    "check health",
    "get health data",
    "view health data",
    "show health data",
    "check health data",
  ],
  description: `Get the health data from your Pulse Health agent
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          balance: "100",
          token: "SOL",
        },
        explanation: "Get SOL balance of the wallet",
      },
    ],
    [
      {
        input: {
          tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        output: {
          status: "success",
          balance: "1000",
          token: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        explanation: "Get health data",
      },
    ],
  ],
  schema: z.object({
    tokenAddress: z.string().optional(),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    const balance = await get_balance(
      agent,
      input.tokenAddress && new PublicKey(input.tokenAddress),
    );

    return {
      status: "success",
      balance: balance,
      token: input.tokenAddress || "SOL",
    };
  },
};

export default balanceAction;
