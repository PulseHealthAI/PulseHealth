import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

/**
 * Generates a new keypair for PulseHealthAI wallet management
 * and logs the public key and encoded secret key for secure storage.
 */
export const pulseHealthKeypair = Keypair.generate();

console.log("PulseHealthAI Wallet Public Key:", pulseHealthKeypair.publicKey.toString());
console.log(
  "PulseHealthAI Wallet Secret Key (Base58 Encoded):",
  bs58.encode(pulseHealthKeypair.secretKey)
);
