import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { sendWellnessRewards } from "../tools";

const sendWellnessRewardsAction: Action = {
  name: "SEND_WELLNESS_REWARDS",
  similes: [
    "reward wellness points",
    "send health achievements",
    "distribute wellness tokens",
    "send rewards to multiple recipients",
  ],
  description:
    "Send wellness points to multiple users for achieving health milestones and wellness goals.",
  examples: [
    [
      {
        input: {
          rewardType: "wellness points",
          amount: 50,
          recipients: [
            "user1@example.com",
            "user2@example.com"
          ],
          priorityLevel: "high",
          shouldNotify: true,
        },
        output: {
          status: "success",
          message: "Sent 50 wellness points to 2 recipients.",
          transactionHashes: ["123abc", "456def"],
        },
        explanation:
          "Sent 50 wellness points to two users with priority and notification enabled.",
      },
    ],
  ],
  schema: z.object({
    rewardType: z.string().min(1).describe("Type of reward, e.g., 'wellness points'"),
    amount: z.number().positive().describe("Amount of wellness points to distribute"),
    recipients: z.array(z.string()).nonempty().describe("Array of recipient emails"),
    priorityLevel: z.string().optional().describe("Priority level for the reward distribution"),
    shouldNotify: z.boolean().optional().describe("Whether to notify recipients upon reward distribution"),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    try {
      const {
        rewardType,
        amount,
        recipients,
        priorityLevel,
        shouldNotify,
      } = input;

      const txs = await sendWellnessRewards(
        rewardType,
        amount,
        recipients,
        priorityLevel || "normal",
        shouldNotify || false
      );

      return {
        status: "success",
        message: `Sent ${amount} ${rewardType} to ${recipients.length} recipients successfully.",
        transactionHashes: txs,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to send rewards: ${error.message}`,
        code: error.code || "UNKNOWN_ERROR",
      };
    }
  },
};

export default sendWellnessRewardsAction;
