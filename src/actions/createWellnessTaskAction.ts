import { Action } from "../types/action";
import { PulseHealthAI } from "../agent";
import { z } from "zod";
import { createWellnessTask } from "../tools";

const createWellnessTaskAction: Action = {
  name: "CREATE_WELLNESS_TASK",
  similes: [
    "create wellness task",
    "post health goal",
    "set wellness milestone",
    "create health challenge",
    "start new wellness activity",
  ],
  description:
    "Create a new wellness task for users to participate in and track their health progress with token-based incentives.",
  examples: [
    [
      {
        input: {
          title: "Daily Step Challenge",
          content: "Walk 10,000 steps each day for a week.",
          requirements: "Submit step count data daily.",
          tags: ["fitness", "steps", "health"],
          tokenAmount: 100,
          tokenType: "wellness points",
        },
        output: {
          status: "success",
          taskId: "task_456",
          message: "Successfully created task: Daily Step Challenge",
        },
        explanation:
          "Created a step challenge task with wellness points as rewards.",
      },
    ],
  ],
  schema: z.object({
    title: z.string().min(1).describe("Title of the wellness task"),
    content: z.string().min(1).describe("Description of the wellness task"),
    requirements: z.string().min(1).describe("Requirements to complete the task"),
    tags: z.array(z.string()).min(1).describe("List of tags for the task"),
    tokenAmount: z.number().positive().describe("Amount of reward tokens for the task"),
    tokenType: z.string().min(1).describe("Type of reward tokens, e.g., 'wellness points'"),
  }),
  handler: async (agent: PulseHealthAI, input: Record<string, any>) => {
    try {
      const responseData = await createWellnessTask(
        agent,
        input.title,
        input.content,
        input.requirements,
        input.tags,
        input.tokenAmount,
        input.tokenType
      );

      return {
        status: "success",
        taskId: responseData.taskId,
        message: `Successfully created task: ${input.title}`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to create task: ${error.message}`,
      };
    }
  },
};

export default createWellnessTaskAction;
