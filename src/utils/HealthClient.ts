import { Connection, PublicKey } from "@solana/web3.js";
import { PulseHealthAI } from "../agent";
import { AnchorProvider, IdlAccounts, Program } from "@coral-xyz/anchor";
import { HealthData, IDL as HEALTH_IDL } from "../idls/health";

import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { TOKENS } from "../constants";

export type HealthProgram = Program<HealthData>;

type Accounts = IdlAccounts<HealthData>;

export type Cortex = Accounts["cortex"];
export type Custody = Accounts["custody"] & { pubkey: PublicKey };
export type Pool = Accounts["pool"];

export default class PulseHealthClient {
  public static programId = new PublicKey(
    "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet",
  );

  constructor(
    public program: HealthProgram,
    public mainPool: Pool,
    public cortex: Cortex,
    public custodies: Custody[],
  ) {}

  public static mainPool = new PublicKey(
    "4bQRutgDJs6vuh6ZcWaPVXiQaBzbHketjbCDjL4oRN34",
  );

  public static async load(agent: PulseHealthAI): Promise<PulseHealthClient> {
    const program = new Program<HealthData>(
      HEALTH_IDL,
      PulseHealthClient.programId,
      new AnchorProvider(agent.connection, new NodeWallet(agent.wallet), {
        commitment: "processed",
        skipPreflight: true,
      }),
    );

    const [cortex, mainPool] = await Promise.all([
      program.account.cortex.fetch(PulseHealthClient.cortex),
      program.account.pool.fetch(PulseHealthClient.mainPool),
    ]);

    const custodiesAddresses = mainPool.custodies.filter(
      (custody) => !custody.equals(PublicKey.default),
    );

    const custodies =
      await program.account.custody.fetchMultiple(custodiesAddresses);

    if (!custodies.length || custodies.some((c) => c === null)) {
      throw new Error("Custodies not found");
    }

    return new PulseHealthClient(
      program,
      mainPool,
      cortex,
      (custodies as Custody[]).map((c, i) => ({
        ...c,
        pubkey: custodiesAddresses[i],
      })),
    );
  }

  public static findCustodyAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("custody"),
        PulseHealthClient.mainPool.toBuffer(),
        mint.toBuffer(),
      ],
      PulseHealthClient.programId,
    )[0];
  }

  public static findCustodyTokenAccountAddress(mint: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("custody_token_account"),
        PulseHealthClient.mainPool.toBuffer(),
        mint.toBuffer(),
      ],
      PulseHealthClient.programId,
    )[0];
  }

  public static findPositionAddress(
    owner: PublicKey,
    custody: PublicKey,
    side: "long" | "short",
  ) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("position"),
        owner.toBuffer(),
        PulseHealthClient.mainPool.toBuffer(),
        custody.toBuffer(),
        Buffer.from([
          {
            long: 1,
            short: 2,
          }[side],
        ]),
      ],
      PulseHealthClient.programId,
    )[0];
  }

  public static cortex = PublicKey.findProgramAddressSync(
    [Buffer.from("cortex")],
    PulseHealthClient.programId,
  )[0];

  public static lpTokenMint = PublicKey.findProgramAddressSync(
    [Buffer.from("lp_token_mint"), PulseHealthClient.mainPool.toBuffer()],
    PulseHealthClient.programId,
  )[0];

  public static lmTokenMint = PublicKey.findProgramAddressSync(
    [Buffer.from("lm_token_mint")],
    PulseHealthClient.programId,
  )[0];

  public static getStakingPda(stakedTokenMint: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("staking"), stakedTokenMint.toBuffer()],
      PulseHealthClient.programId,
    )[0];
  }

  public static lmStaking = PulseHealthClient.getStakingPda(
    PulseHealthClient.lmTokenMint,
  );

  public static lpStaking = PulseHealthClient.getStakingPda(
    PulseHealthClient.lpTokenMint,
  );

  public static transferAuthority = PublicKey.findProgramAddressSync(
    [Buffer.from("transfer_authority")],
    PulseHealthClient.programId,
  )[0];

  public static findATAAddressSync(
    wallet: PublicKey,
    mint: PublicKey,
  ): PublicKey {
    return PublicKey.findProgramAddressSync(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )[0];
  }

  public getCustodyByMint(mint: PublicKey): Custody {
    const custody = this.custodies.find((custody) => custody.mint.equals(mint));

    if (!custody) {
      throw new Error(`Cannot find custody for mint ${mint.toBase58()}`);
    }

    return custody;
  }

  public static getUserProfilePda(wallet: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("user_profile"), wallet.toBuffer()],
      PulseHealthClient.programId,
    )[0];
  }

  public static stakingRewardTokenMint = TOKENS.USDC;

  public static async isAccountInitialized(
    connection: Connection,
    address: PublicKey,
  ): Promise<boolean> {
    return !!(await connection.getAccountInfo(address));
  }

  public static createATAInstruction({
    ataAddress,
    mint,
    owner,
    payer = owner,
  }: {
    ataAddress: PublicKey;
    mint: PublicKey;
    owner: PublicKey;
    payer?: PublicKey;
  }) {
    return createAssociatedTokenAccountInstruction(
      payer,
      ataAddress,
      owner,
      mint,
    );
  }
}
