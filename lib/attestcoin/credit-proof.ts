import type { Contract } from "ethers";
import type { proofProvider } from "@gluwa/usc-sdk";

export const CREDIT_PROOF_ACTIONS = {
  REPAYMENT: 1,
  COLLATERAL: 2,
  OBLIGATION_FAILURE: 3,
} as const;

export interface CreditProofSibling {
  hash: string;
  isLeft: boolean;
}

export interface CreditProofArgs {
  action: number;
  chainKey: number;
  blockHeight: number;
  encodedTransaction: string;
  merkleRoot: string;
  siblings: CreditProofSibling[];
  lowerEndpointDigest: string;
  continuityRoots: string[];
}

export function buildCreditProofArgs(
  proofData: proofProvider.ContinuityResponse,
  action: number
): CreditProofArgs {
  return {
    action,
    chainKey: proofData.chainKey,
    blockHeight: proofData.headerNumber,
    encodedTransaction: proofData.txBytes,
    merkleRoot: proofData.merkleProof.root,
    siblings: proofData.merkleProof.siblings,
    lowerEndpointDigest:
      proofData.continuityProof.lowerEndpointDigest,
    continuityRoots: proofData.continuityProof.roots,
  };
}

export function encodeCreditProofExecuteData(
  contract: Contract,
  proofData: proofProvider.ContinuityResponse,
  action: number
): string {
  const args = buildCreditProofArgs(proofData, action);

  const fragment = contract.interface.getFunction(
    "execute"
  );

  if (!fragment) {
    throw new Error("CreditASC execute function not found");
  }

  return contract.interface.encodeFunctionData(
    fragment,
    [
      args.action,
      args.chainKey,
      args.blockHeight,
      args.encodedTransaction,
      args.merkleRoot,
      args.siblings,
      args.lowerEndpointDigest,
      args.continuityRoots,
    ]
  );
}

export async function computeCreditProofGasLimit(
  provider: import("ethers").JsonRpcApiProvider,
  contract: Contract,
  proofData: proofProvider.ContinuityResponse,
  action: number,
  signerAddress: string
): Promise<bigint> {
  const data = encodeCreditProofExecuteData(
    contract,
    proofData,
    action
  );

  const continuityLength =
    proofData.continuityProof.roots?.length || 1;

  try {
    const estimatedGas = await provider.estimateGas({
      to: await contract.getAddress(),
      data,
      from: signerAddress,
    });

    const gasLimit =
      (estimatedGas * BigInt(135)) / BigInt(100);

    console.log(
      `Estimated gas: ${estimatedGas.toString()}, ` +
      `gas limit with buffer: ${gasLimit.toString()}`
    );

    return gasLimit;
  } catch (error: any) {
    const calculatedGas =
      21000 + continuityLength * 5000 + 20000;

    console.warn(
      `Gas estimation failed: ${error?.shortMessage ?? error}`
    );

    console.log(
      `Using calculated gas limit: ${calculatedGas} ` +
      `(${continuityLength} continuity blocks)`
    );

    return BigInt(calculatedGas);
  }
}

export async function submitCreditProof(
  contract: Contract,
  proofData: proofProvider.ContinuityResponse,
  action: number,
  gasLimit: bigint
) {
  const args = buildCreditProofArgs(proofData, action);

  console.log(
    `Submitting CreditASC proof: action=${action}, ` +
    `chainKey=${args.chainKey}, block=${args.blockHeight}`
  );

  const tx = await contract.execute(
    args.action,
    args.chainKey,
    args.blockHeight,
    args.encodedTransaction,
    args.merkleRoot,
    args.siblings,
    args.lowerEndpointDigest,
    args.continuityRoots,
    { gasLimit }
  );

  console.log(`CreditASC transaction submitted: ${tx.hash}`);

  return tx;
}
