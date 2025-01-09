import { PulseHealthAI } from "../index";
import { VersionedTransaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { HealthTaskResponse } from "../types";

/**
 * Create a new wellness task on PulseHealthAI for health tracking and goal management.
 * @param agent PulseHealthAI instance configured for health task management
 * @param title Title of the wellness task
 * @param description Detailed description of the task
 * @param requirements Criteria for task completion
 * @param categories List of categories related to health and wellness for the task
 * @param payer Optional payer address for task creation (defaults to agent wallet address)
 * @param tokenMintAddress Token mint address for health-related payments
 * @param tokenAmount Payment amount for the wellness task
 * @returns Object containing the task creation transaction and a generated taskId
 */
export async function createWellnessTask(
  agent: PulseHealthAI,
  title: string,
  description: string,
  requirements: string,
  categories: string[],
  tokenMintAddress: PublicKey,
  tokenAmount: number,
  payer?: PublicKey,
): Promise<HealthTaskResponse> {
  try {
    const apiResponse = await fetch(
      "https://api.pulsehealth.ai/tasks/public/transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: description,
          requirements: requirements,
          tags: categories,
          payer: payer?.toBase58() || agent.wallet.publicKey.toBase58(),
          token: {
            mintAddress: tokenMintAddress.toBase58(),
            amount: tokenAmount,
          },
        }),
      },
    );

    const responseData = await apiResponse.json();
    if (!responseData.taskId && !responseData.serializedTransaction) {
      throw new Error(`${responseData.message}`);
    }

    const serializedTransaction = Buffer.from(
      responseData.serializedTransaction,
      "base64",
    );
    const tx = VersionedTransaction.deserialize(serializedTransaction);

    tx.sign([agent.wallet]);
    const signature = await agent.connection.sendTransaction(tx, {
      preflightCommitment: "confirmed",
      maxRetries: 3,
    });

    const latestBlockhash = await agent.connection.getLatestBlockhash();
    await agent.connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });

    return {
      status: "success",
      taskId: responseData.taskId,
      signature: signature,
    };
  } catch (err: any) {
    throw new Error(`${err.message}`);
  }
}
