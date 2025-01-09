import { PulseHealthAI } from "../index";
import { VersionedTransaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { HealthTaskResponse } from "../types";

/**
 * Create a new health task on PulseHealthAI for wellness tracking and health-related goal management.
 * @param agent PulseHealthAI instance configured for health task management
 * @param title Title of the health task
 * @param content Description of the task
 * @param requirements Requirements for completing the health task
 * @param tags List of tags associated with the health task
 * @param payer Payer address for the task (default: agent wallet address)
 * @param tokenMintAddress Token mint address for payment
 * @param tokenAmount Payment amount for the health task
 * @returns Object containing task creation transaction and generated taskId
 */
export async function createHealthTask(
  agent: PulseHealthAI,
  title: string,
  content: string,
  requirements: string,
  tags: string[],
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
          content: content,
          requirements: requirements,
          tags: tags,
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
