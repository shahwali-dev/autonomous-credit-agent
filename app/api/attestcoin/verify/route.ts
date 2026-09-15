import { NextResponse } from "next/server";
import { JsonRpcProvider } from "ethers";
import { generateAndVerifyAttestcoinProof } from "@/lib/attestcoin/proof-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const txHash = body?.txHash;
    const walletAddress = body?.walletAddress;

    if (
      typeof walletAddress !== "string" ||
      !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid wallet address is required.",
        },
        { status: 400 }
      );
    }

    if (
      typeof txHash !== "string" ||
      !/^0x[a-fA-F0-9]{64}$/.test(txHash)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid transaction hash is required.",
        },
        { status: 400 }
      );
    }

    const sourceRpcUrl = process.env.SOURCE_CHAIN_RPC_URL;
    const creditcoinRpcUrl = process.env.CREDITCOIN_RPC_URL;
    const proofBuilderUrl =
      process.env.CREDITCOIN_PROOF_BUILDER_URL;

    if (
      !sourceRpcUrl ||
      !creditcoinRpcUrl ||
      !proofBuilderUrl
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Attestcoin server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    const sourceChainRpc =
      new JsonRpcProvider(sourceRpcUrl);

    const creditcoinRpc =
      new JsonRpcProvider(creditcoinRpcUrl);

    const result =
      await generateAndVerifyAttestcoinProof({
        txHash,
        chainKey: 1,
        proofBuilderUrl,
        creditcoinRpc,
        sourceChainRpc,
      });

    return NextResponse.json({
      success: true,
      verified: result.verified,
      proofGenerated: true,
      txHash: result.txHash,
      sourceBlock: result.headerNumber,
    });
  } catch (error) {
    console.error("Attestcoin verification failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Attestcoin verification failed.",
      },
      { status: 500 }
    );
  }
}
