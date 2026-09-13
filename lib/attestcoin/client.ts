import { JsonRpcProvider } from "ethers";
import {
  chainInfo,
  blockProver,
} from "@gluwa/usc-sdk";

export interface AttestcoinClient {
  provider: JsonRpcProvider;
  chainInfoProvider: chainInfo.PrecompileChainInfoProvider;
  blockProver: blockProver.PrecompileBlockProver;
}

export function createAttestcoinClient(
  creditcoinRpcUrl: string
): AttestcoinClient {
  const provider = new JsonRpcProvider(creditcoinRpcUrl);

  const chainInfoProvider =
    new chainInfo.PrecompileChainInfoProvider(provider);

  const blockProverInstance =
    new blockProver.PrecompileBlockProver(provider);

  return {
    provider,
    chainInfoProvider,
    blockProver: blockProverInstance,
  };
}