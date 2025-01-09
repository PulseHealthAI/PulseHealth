import { PublicKey } from "@solana/web3.js";

/**
 * Common wellness token addresses used across the PulseHealthAI toolkit
 */
export const TOKENS = {
  PULSE: new PublicKey("PULSE1234567890123456789012345678901234567890"),
  WELLNESS: new PublicKey("WELLN12345678901234567890123456789012345678"),
  REWARD: new PublicKey("REWAR12345678901234567890123456789012345678"),
  HEALTH: new PublicKey("HEALT12345678901234567890123456789012345678"),
} as const;

/**
 * Default configuration options for the PulseHealthAI platform
 * @property {number} SLIPPAGE_BPS - Default slippage tolerance in basis points (300 = 3%)
 * @property {number} TOKEN_DECIMALS - Default number of decimals for wellness tokens
 * @property {number} REWARD_FEE_BPS - Default reward distribution fee in basis points
 * @property {string} NETWORK - Blockchain network for transactions (mainnet-beta)
 */
export const DEFAULT_OPTIONS = {
  SLIPPAGE_BPS: 300,
  TOKEN_DECIMALS: 9,
  REWARD_FEE_BPS: 200,
  NETWORK: "mainnet-beta",
} as const;

/**
 * PulseHealthAI API URL for wellness and health metric integration
 */
export const PULSE_API = "https://api.pulsehealth.ai/v1";

/**
 * Referral address for health engagement partnerships
 */
export const PULSE_REFERRAL_ADDRESS = "PULSEHEALTHREFERRAL12345678901234567890";

/**
 * Maximum number of health actions that can be performed per day
 */
export const MAX_DAILY_HEALTH_ACTIONS = 100;
