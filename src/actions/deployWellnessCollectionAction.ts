import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { deployWellnessCollection } from "../tools";

interface CollectionOptions {
  name: string;
  uri: string;
  royaltyBasisPoints?: number;
}

const deployWellnessCollectionAction: Action = {
  name: "DEPLOY_WELLNESS_COLLECTION",
  similes: [
    "create wellness collection",
    "launch wellness rewards",
    "deploy health collection",
    "create health collection",
    "mint wellness collection",
  ],
  description: `Deploy a new wellness reward collection on PulseHealthAI platform for health achievements and milestones.`,
  examples: [
    [
      {
        input: {
          name: "Fitness Milestones",
          uri: "https://example.com/collection.json",
          royaltyBasisPoints: 500,
        },
        output: {
          status: "success",
          message: "Collection deployed successfully",
          collectionAddress: "7nE9GvcwsqzYxmJLSrYmSB1V1YoJWVK1KWzAcWAzjXkN",
          name: "Fitness Milestones",
        },
        explanation: "Deploy a wellness reward collection with a 5% royalty fee",
      },
    ],
  ],
  schema: z.object({
    name: z.string().min(1, "Name is required"),
    uri: z.string().url("URI must be a valid URL"),
    royaltyBasisPoints: z.number().min(0).max(10000).optional(),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    const options: CollectionOptions = {
      name: input.name,
      uri: input.uri,
      royaltyBasisPoints: input.royaltyBasisPoints,
    };

    const result = await deployWellnessCollection(agent, options);

    return {
      status: "success",
      message: "Collection deployed successfully",
      collectionAddress: result.collectionAddress.toString(),
      name: input.name,
    };
  },
};

export default deployWellnessCollectionAction;
