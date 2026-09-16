import { ethers } from "ethers";

export interface CreditcoinConfig {
  creditcoinRpcUrl: string;
  proofBuilderUrl: string;
  sourceChainRpcUrl: string;
  sourceChainKey: number;
  privateKey: string;
  creditASCAddress: string;
}

export function getCreditcoinConfig(): CreditcoinConfig {
  const required = [
    "CREDITCOIN_RPC_URL",
    "CREDITCOIN_PROOF_BUILDER_URL",
    "SOURCE_CHAIN_RPC_URL",
    "SOURCE_CHAIN_KEY",
    "PRIVATE_KEY",
    "CREDITASC_CONTRACT_ADDRESS",
  ] as const;

  for (const name of required) {
    if (!process.env[name]) {
      throw new Error(`${name} is not configured`);
    }
  }

  const sourceChainKey = Number(process.env.SOURCE_CHAIN_KEY);

  if (!Number.isInteger(sourceChainKey) || sourceChainKey < 0) {
    throw new Error("SOURCE_CHAIN_KEY must be a valid integer");
  }

  if (!ethers.isAddress(process.env.CREDITASC_CONTRACT_ADDRESS!)) {
    throw new Error("CREDITASC_CONTRACT_ADDRESS must be a valid address");
  }

  return {
    creditcoinRpcUrl: process.env.CREDITCOIN_RPC_URL!,
    proofBuilderUrl: process.env.CREDITCOIN_PROOF_BUILDER_URL!,
    sourceChainRpcUrl: process.env.SOURCE_CHAIN_RPC_URL!,
    sourceChainKey,
    privateKey: process.env.PRIVATE_KEY!,
    creditASCAddress: process.env.CREDITASC_CONTRACT_ADDRESS!,
  };
}
