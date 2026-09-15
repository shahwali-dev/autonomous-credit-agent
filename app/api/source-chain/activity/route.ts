import { NextResponse } from "next/server";
import { getOnchainActivity } from "@/lib/source-chain/activity";

export async function GET(request: Request) {
  try {
    const rpcUrl = process.env.SOURCE_CHAIN_RPC_URL;

    if (!rpcUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "SOURCE_CHAIN_RPC_URL is not configured.",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("wallet");

    if (
      !walletAddress ||
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

    const activity = await getOnchainActivity(
      rpcUrl,
      walletAddress
    );

    return NextResponse.json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error(
      "Source-chain activity read failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to read source-chain activity.",
      },
      { status: 500 }
    );
  }
}
