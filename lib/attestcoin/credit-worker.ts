import { Contract, JsonRpcProvider, Wallet } from "ethers";
import {
  generateAndVerifyAttestcoinProof,
} from "./proof-service";
import {
  computeCreditProofGasLimit,
  submitCreditProof,
  CREDIT_PROOF_ACTIONS,
} from "./credit-proof";
import { getCreditcoinConfig } from "./credit-config";

import creditASCArtifact from "../../out/CreditASC.sol/CreditASC.json";

export interface ProcessCreditEvidenceParams {
  txHash: string;
  action: number;
}

export async function processCreditEvidence({
  txHash,
  action,
}: ProcessCreditEvidenceParams) {
  const config = getCreditcoinConfig();

  const creditcoinProvider = new JsonRpcProvider(
    config.creditcoinRpcUrl
  );

  const sourceChainProvider = new JsonRpcProvider(
    config.sourceChainRpcUrl
  );

  const wallet = new Wallet(
    config.privateKey,
    creditcoinProvider
  );

  const creditASC = new Contract(
    config.creditASCAddress,
    creditASCArtifact.abi,
    wallet
  );

  console.log(`Processing evidence transaction: ${txHash}`);
  console.log(`Action: ${action}`);
  console.log(`CreditASC: ${config.creditASCAddress}`);

  const verifiedProof =
    await generateAndVerifyAttestcoinProof({
      txHash,
      chainKey: config.sourceChainKey,
      proofBuilderUrl: config.proofBuilderUrl,
      creditcoinRpc: creditcoinProvider,
      sourceChainRpc: sourceChainProvider,
    });

  if (!verifiedProof.verified) {
    throw new Error("Attestcoin proof verification failed");
  }

  if (!verifiedProof.proof.data) {
    throw new Error("Attestcoin proof data is missing");
  }

  const proofData = verifiedProof.proof.data;

  console.log(
    `Verified source transaction at block ${proofData.headerNumber}`
  );

  const signerAddress = await wallet.getAddress();

  const gasLimit = await computeCreditProofGasLimit(
    creditcoinProvider,
    creditASC,
    proofData,
    action,
    signerAddress
  );

  const tx = await submitCreditProof(
    creditASC,
    proofData,
    action,
    gasLimit
  );

  console.log(`Waiting for CreditASC transaction: ${tx.hash}`);

  const receipt = await tx.wait();

  if (!receipt || receipt.status !== 1) {
    throw new Error(
      `CreditASC transaction failed: ${tx.hash}`
    );
  }

  console.log(
    `CreditASC execution confirmed in block ${receipt.blockNumber}`
  );

  return {
    txHash,
    action,
    sourceBlock: proofData.headerNumber,
    creditASCTransactionHash: tx.hash,
    creditASCBlock: receipt.blockNumber,
  };
}

export { CREDIT_PROOF_ACTIONS };
