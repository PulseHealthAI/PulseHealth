import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { requestWellnessFunds } from "../tools";

const requestFundsAction: Action = {
  name: "REQUEST_WELLNESS_FUNDS",
  similes: [
    "request wellness points",
    "get health tokens",
    "use wellness faucet",
    "request health credits",
    "get pulse tokens",
  ],
  description: "Request wellness points or health credits from the PulseHealthAI faucet (for testing and demo purposes only).",
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          message: "Successfully requested wellness points",
          network: "testnet.pulsehealth.ai",
        },
        explanation: "Request wellness points from the PulseHealthAI test network faucet",
      },
    ],
  ],
  schema: z.object({}), // No input parameters required
  handler: async (agent: PulseHealthAI, _input: Record<string, any>) => {
    await requestWellnessFunds(agent);

    return {
      status: "success",
      message: "Successfully requested wellness funds",
      network: agent.connection.rpcEndpoint.split("/")[2],
    };
  },
};

export default requestFundsAction;
