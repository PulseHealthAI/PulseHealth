import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import bs58 from "bs58";
import Decimal from "decimal.js";
import { DEFAULT_OPTIONS } from "../constants";
import { Config, HealthTokenData } from "../types";
import {
  deploy_health_collection,
  deploy_health_token,
  get_health_balance,
  get_health_tps,
  resolveHealthProfile,
  getPrimaryHealthProfile,
  launchPulseHealthToken,
  mintWellnessBadge,
  openHealthMarket,
  registerHealthDomain,
  requestWellnessFunds,
  transferHealthTokens,
  getHealthTokenDataByAddress,
  stakeHealthPoints,
  fetchHealthPrice
} from "../tools";

/**
 * Main class for interacting with the PulseHealthAI blockchain
 * Provides a unified interface for health token operations, wellness management, and health data sharing
 *
 * @class PulseHealthAI
 * @property {Connection} connection - PulseHealthAI RPC connection
 * @property {Keypair} wallet - Wallet keypair for signing transactions
 * @property {PublicKey} wallet_address - Public key of the wallet
 * @property {Config} config - Configuration object
 */
export class PulseHealthAI {
  public connection: Connection;
  public wallet: Keypair;
  public wallet_address: PublicKey;
  public config: Config;

  constructor(private_key: string, rpc_url: string, config: Config) {
    this.connection = new Connection(rpc_url);
    this.wallet = Keypair.fromSecretKey(bs58.decode(private_key));
    this.wallet_address = this.wallet.publicKey;
    this.config = config;
  }

  async requestWellnessFunds() {
    return requestWellnessFunds(this);
  }

  async deployHealthToken(
    name: string,
    uri: string,
    symbol: string,
    decimals: number = DEFAULT_OPTIONS.TOKEN_DECIMALS,
    initialSupply?: number
  ): Promise<{ mint: PublicKey }> {
    return deploy_health_token(this, name, uri, symbol, decimals, initialSupply);
  }

  async deployHealthCollection(
    name: string,
    uri: string,
    royaltyBasisPoints: number
  ): Promise<{ collectionAddress: PublicKey }> {
    return deploy_health_collection(this, name, uri, royaltyBasisPoints);
  }

  async getHealthBalance(tokenAddress?: PublicKey): Promise<number> {
    return get_health_balance(this, tokenAddress);
  }

  async mintWellnessBadge(
    collectionMint: PublicKey,
    metadata: { name: string; uri: string },
    recipient?: PublicKey
  ): Promise<{ mint: PublicKey }> {
    return mintWellnessBadge(this, collectionMint, metadata, recipient);
  }

  async transferHealthTokens(
    recipient: PublicKey,
    amount: number,
    mint?: PublicKey
  ): Promise<string> {
    return transferHealthTokens(this, recipient, amount, mint);
  }

  async registerHealthDomain(name: string, spaceKB?: number): Promise<string> {
    return registerHealthDomain(this, name, spaceKB);
  }

  async getHealthTokenDataByAddress(
    mint: string
  ): Promise<HealthTokenData | undefined> {
    return getHealthTokenDataByAddress(new PublicKey(mint));
  }

  async fetchHealthPrice(mint: string): Promise<string> {
    return fetchHealthPrice(new PublicKey(mint));
  }
}
