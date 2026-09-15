import type { JsonRpcApiProvider } from "ethers";
import {
  chainInfo,
  proofProvider,
  blockProver,
} from "@gluwa/usc-sdk";

export interface GenerateProofParams {
  txHash: string;
  chainKey: number;
  proofBuilderUrl: string;
  creditcoinRpc: JsonRpcApiProvider;
  sourceChainRpc: JsonRpcApiProvider;
}

export interface VerifiedAttestcoinProof {
  proof: proofProvider.ProofResult;
  verified: boolean;
  headerNumber: number;
  txHash: string;
}

export async function generateAndVerifyAttestcoinProof({
  txHash,
  chainKey,
  proofBuilderUrl,
  creditcoinRpc,
  sourceChainRpc,
}: GenerateProofParams): Promise<VerifiedAttestcoinProof> {
  console.log(
    `Waiting for transaction ${txHash} to be mined on source chain...`
  );

  const receipt = await sourceChainRpc.waitForTransaction(
    txHash,
    1,
    120_000
  );

  if (!receipt || receipt.blockNumber == null) {
    throw new Error(
      `Transaction ${txHash} is not yet mined on source chain`
    );
  }

  const blockNumber = receipt.blockNumber;

  console.log(
    `Transaction ${txHash} found in block ${blockNumber}`
  );

  const proofBuilder =
    new proofProvider.service.ProofBuilder(
      chainKey,
      proofBuilderUrl
    );

  const info =
    new chainInfo.PrecompileChainInfoProvider(
      creditcoinRpc
    );

  console.log(
    `Waiting for block ${blockNumber} attestation on Creditcoin...`
  );

  const latestAttested =
    await info.getLatestAttestedHeightAndHash(chainKey);

  console.log(
    `Latest attested height for chain key ${chainKey}: ${latestAttested.height}`
  );

  await proofBuilder.waitUntilHeightAttested(
    chainKey,
    blockNumber,
    15_000,
    1_200_000
  );

  console.log(
    `Block ${blockNumber} attested! Generating proof...`
  );

  const proof = await proofBuilder.getProof(txHash);

  if (!proof.success || !proof.data) {
    throw new Error(
      proof.error ||
        `Failed to generate Attestcoin proof for ${txHash}`
    );
  }

  console.log("Proof generation successful!");

  const prover =
    new blockProver.PrecompileBlockProver(
      creditcoinRpc
    );

  const {
    headerNumber,
    txBytes,
    merkleProof,
    continuityProof,
  } = proof.data;

  console.log(
    `Verifying Attestcoin proof for block ${headerNumber}...`
  );

  const verified = await prover.verifySingle(
    chainKey,
    headerNumber,
    txBytes,
    merkleProof,
    continuityProof
  );

  if (!verified) {
    throw new Error(
      `Attestcoin verification failed for transaction ${txHash}`
    );
  }

  console.log(
    `Attestcoin verification successful: ${verified}`
  );

  return {
    proof,
    verified,
    headerNumber,
    txHash,
  };
}
