import { PublicKey } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { get_health_metric } from "../tools";

const balanceAction: Action = {
  name: "HEALTH_METRIC_ACTION",
  similes: [
    "check health metric",
    "get wellness data",
    "view health insights",
    "show fitness score",
    "check health balance",
  ],
  description: `Retrieve a user's health metric data or wellness score.
  If you want to get the default health score, you don't need to provide a specific metric.
  If no metric is provided, the score will be based on overall health balance.`,
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          balance: "85",
          metric: "Overall Health",
        },
        explanation: "Get overall health balance of the user",
      },
    ],
    [
      {
        input: {
          metric: "Heart Rate",
        },
        output: {
          status: "success",
          balance: "72 bpm",
          metric: "Heart Rate",
        },
        explanation: "Get user's heart rate metric",
      },
    ],
  ],
  schema: z.object({
    metric: z.string().optional(),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    const balance = await get_health_metric(
      agent,
      input.metric
    );

    return {
      status: "success",
      balance: balance,
      metric: input.metric || "Overall Health",
    };
  },
};

export default balanceAction;
