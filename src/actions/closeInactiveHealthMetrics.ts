import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { closeInactiveHealthMetrics } from "../tools";

const closeInactiveHealthMetricsAction: Action = {
  name: "CLOSE_INACTIVE_HEALTH_METRICS",
  similes: [
    "remove old health data",
    "clear inactive metrics",
    "delete unused health records",
    "clean wellness data",
    "close inactive metrics",
  ],
  description: `Close inactive health metrics associated with a user to streamline data management.
This action will clear old health metrics that have not been updated recently, helping maintain a cleaner health profile.`,
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          signature: "9KdPxyz123abcVVTy8nf3c2abc6iq1234NxknnusybFTFpXqD8zVSCBAd1X3rUcD8WiG1bdSjFbeHsmc123",
          metricsCleared: 5,
        },
        explanation: "Cleared 5 inactive health metrics successfully.",
      },
    ],
    [
      {
        input: {},
        output: {
          status: "success",
          signature: "",
          metricsCleared: 0,
        },
        explanation: "No inactive health metrics were found to clear.",
      },
    ],
  ],
  schema: z.object({}),
  handler: async (agent: PulseHealthAI) => {
    try {
      const result = await closeInactiveHealthMetrics(agent);

      if (result.size === 0) {
        return {
          status: "success",
          signature: "",
          metricsCleared: 0,
          message: "No inactive health metrics found to clear",
        };
      }

      return {
        status: "success",
        signature: result.signature,
        metricsCleared: result.size,
        message: `Successfully cleared ${result.size} inactive health metrics`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to clear inactive health metrics: ${error.message}`,
      };
    }
  },
};

export default closeInactiveHealthMetricsAction;
