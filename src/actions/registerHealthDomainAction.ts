import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { registerHealthDomain } from "../tools";

const registerHealthDomainAction: Action = {
  name: "REGISTER_HEALTH_DOMAIN",
  similes: [
    "register health domain",
    "buy wellness domain",
    "secure health profile",
    "register pulse domain",
    "purchase wellness profile",
    "domain registration for health",
  ],
  description: "Register a personalized health and wellness domain using the PulseHealthAI platform.",
  examples: [
    [
      {
        input: {
          name: "myhealthprofile",
          spaceKB: 2,
        },
        output: {
          status: "success",
          signature: "9XY7Qz...",
          message: "Successfully registered myhealthprofile.pulse",
        },
        explanation: "Register a personalized health domain with 2KB storage space",
      },
    ],
  ],
  schema: z.object({
    name: z.string().min(1).describe("Domain name to register (without .pulse)"),
    spaceKB: z
      .number()
      .min(1)
      .max(10)
      .default(1)
      .describe("Space allocation in KB (max 10KB)"),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    try {
      const name = input.name as string;
      const spaceKB = (input.spaceKB as number) || 1;

      const signature = await registerHealthDomain(agent, name, spaceKB);

      return {
        status: "success",
        signature,
        message: `Successfully registered ${name}.pulse`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Domain registration failed: ${error.message}`,
      };
    }
  },
};

export default registerHealthDomainAction;
