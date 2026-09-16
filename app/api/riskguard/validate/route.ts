import { NextResponse } from "next/server";
import { JsonRpcProvider, Wallet, Contract } from "ethers";

const RISKGUARD_ABI = [
  "function validate((uint256 amount,uint256 durationDays,uint256 collateral,bool evidenceVerified,uint8 risk) terms) returns (bool)",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      amount,
      durationDays,
      collateral,
      evidenceVerified,
      risk,
    } = body ?? {};

    if (
      !Number.isFinite(amount) ||
      !Number.isFinite(durationDays) ||
      !Number.isFinite(collateral) ||
      typeof evidenceVerified !== "boolean" ||
      !["LOW", "MEDIUM", "HIGH"].includes(risk)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid RiskGuard terms.",
        },
        { status: 400 }
      );
    }

    const rpcUrl = process.env.SOURCE_CHAIN_RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress =
      process.env.RISKGUARD_CONTRACT_ADDRESS;

    if (!rpcUrl || !privateKey || !contractAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "RiskGuard server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    const provider = new JsonRpcProvider(rpcUrl);
    const signer = new Wallet(privateKey, provider);

    const contract = new Contract(
      contractAddress,
      RISKGUARD_ABI,
      signer
    );

    const riskValue =
      risk === "LOW" ? 0 : risk === "MEDIUM" ? 1 : 2;

    const tx = await contract.validate({
      amount: Math.floor(amount),
      durationDays: Math.floor(durationDays),
      collateral: Math.floor(collateral),
      evidenceVerified,
      risk: riskValue,
    });

    const receipt = await tx.wait();

    if (!receipt || receipt.status !== 1) {
      throw new Error("RiskGuard transaction failed.");
    }

    return NextResponse.json({
      success: true,
      validated: true,
      transactionHash: receipt.hash,
      contractAddress,
    });
  } catch (error) {
    console.error("RiskGuard validation failed:", error);

    return NextResponse.json(
      {
        success: false,
        validated: false,
        error:
          error instanceof Error
            ? error.message
            : "RiskGuard validation failed.",
      },
      { status: 500 }
    );
  }
}
