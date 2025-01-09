import { PulseHealthAI } from "../agent";
import { z } from "zod";

/**
 * Example of a health-related action with input and output
 */
export interface HealthActionExample {
  input: Record<string, any>;
  output: Record<string, any>;
  explanation: string;
}

/**
 * Handler function type for executing health actions
 */
export type HealthHandler = (
  agent: PulseHealthAI,
  input: Record<string, any>,
) => Promise<Record<string, any>>;

/**
 * Main Action interface for health-related functionalities
 */
export interface HealthAction {
  /**
   * Unique name of the health action
   */
  name: string;

  /**
   * Alternative names/phrases that can trigger this health action
   */
  similes: string[];

  /**
   * Detailed description of what the health action does
   */
  description: string;

  /**
   * Array of health-related example inputs and outputs for the action
   */
  examples: HealthActionExample[][];

  /**
   * Zod schema for input validation
   */
  schema: z.ZodType<any>;

  /**
   * Function that executes the health action
   */
  handler: HealthHandler;
}
