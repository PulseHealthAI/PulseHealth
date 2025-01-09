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
  input: Record<string, any>
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

/**
 * Fetch the health data for a given patient ID
 * @param agent PulseHealthAI instance
 * @param patientId The unique identifier for the patient
 * @returns The patient's health data record
 */
export async function fetchHealthData(
  agent: PulseHealthAI,
  patientId: string
): Promise<Record<string, any>> {
  try {
    const response = await agent.getHealthData(patientId);
    return response;
  } catch (error: any) {
    throw new Error(`Failed to fetch health data: ${error.message}`);
  }
}

/**
 * Validate health data against schema
 * @param data Health data record
 * @param schema Zod schema to validate against
 * @returns Boolean indicating if the data is valid
 */
export function validateHealthData(
  data: Record<string, any>,
  schema: z.ZodType<any>
): boolean {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}
