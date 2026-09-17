import { Contract, ethers, EventLog } from "ethers";
import loanManagerArtifact from "../../out/ASCLoanManager.sol/ASCLoanManager.json";
const loanManagerAbi = loanManagerArtifact.abi;

const RPC = process.env.CREDITCOIN_RPC_URL!;
const MANAGER = process.env.ASC_LOAN_MANAGER_CONTRACT_ADDRESS!;
const TOKEN = process.env.SOURCE_CHAIN_ERC20_CONTRACT_ADDRESS!;
const LENDER_KEY = process.env.LENDER_WALLET_PRIVATE_KEY!;
const BORROWER_KEY = process.env.BORROWER_WALLET_PRIVATE_KEY!;

const LOAN_AMOUNT = 700n * 10n ** 18n;
const INTEREST_BPS = 500n;
const EXPECTED_REPAYMENT = 735n * 10n ** 18n;
const DURATION_BLOCKS = 172800n;

async function main() {
  const send = process.argv.includes("--send");

  if (!RPC || !MANAGER || !TOKEN || !LENDER_KEY || !BORROWER_KEY) {
    throw new Error("Missing required environment variables");
  }

  const provider = new ethers.JsonRpcProvider(RPC);

  const lender = new ethers.Wallet(LENDER_KEY, provider);
  const borrower = new ethers.Wallet(BORROWER_KEY, provider);

  const currentBlock = BigInt(await provider.getBlockNumber());
  const deadline = currentBlock + DURATION_BLOCKS;

  const fundFlow = {
    from: lender.address,
    to: borrower.address,
    withToken: TOKEN,
  };

  const repayFlow = {
    from: borrower.address,
    to: lender.address,
    withToken: TOKEN,
  };

  const loanTerms = {
    loanAmount: LOAN_AMOUNT,
    interestRate: INTEREST_BPS,
    expectedRepaymentAmount: EXPECTED_REPAYMENT,
    deadlineBlockNumber: deadline,
  };

  const payloadTypes = [
    "address",
    "address",
    "address",
    "address",
    "address",
    "address",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
  ];

  const payload = [
    fundFlow.from,
    fundFlow.to,
    fundFlow.withToken,
    repayFlow.from,
    repayFlow.to,
    repayFlow.withToken,
    loanTerms.loanAmount,
    loanTerms.interestRate,
    loanTerms.expectedRepaymentAmount,
    loanTerms.deadlineBlockNumber,
  ];

  const payloadToSign = ethers.solidityPackedKeccak256(
    payloadTypes,
    payload
  );

  const lenderSignature = await lender.signMessage(
    ethers.getBytes(payloadToSign)
  );

  const borrowerSignature = await borrower.signMessage(
    ethers.getBytes(payloadToSign)
  );

  console.log("\n=== LOAN REGISTRATION ===");
  console.log("Mode:                 ", send ? "SEND TRANSACTION" : "PREVIEW ONLY");
  console.log("Current block:        ", currentBlock.toString());
  console.log("Deadline block:       ", deadline.toString());
  console.log("Duration:             ", DURATION_BLOCKS.toString());
  console.log("Loan amount:          700 TEST");
  console.log("Interest:             5%");
  console.log("Expected repayment:   735 TEST");
  console.log("Lender:               ", lender.address);
  console.log("Borrower:             ", borrower.address);
  console.log("Token:                ", TOKEN);
  console.log("Manager:              ", MANAGER);
  console.log("Payload hash:         ", payloadToSign);

  if (!send) {
    console.log("\nNO TRANSACTION WAS SENT.");
    return;
  }

  const manager = new Contract(MANAGER, loanManagerAbi, lender);

  console.log("\nSubmitting registerLoan transaction...");

  const tx = await manager.registerLoan(
    fundFlow,
    repayFlow,
    loanTerms,
    lenderSignature,
    borrowerSignature
  );

  console.log("Transaction hash:", tx.hash);
  console.log("Waiting for confirmation...");

  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error("Transaction receipt was not returned");
  }

  console.log("Confirmed in block:", receipt.blockNumber);

  let loanId: bigint | null = null;

  for (const log of receipt.logs) {
    try {
      const parsed = manager.interface.parseLog(log);

      if (parsed && parsed.name === "LoanRegistered") {
        loanId = parsed.args.loanId;
        break;
      }
    } catch {
      // Ignore logs that do not belong to ASCLoanManager.
    }
  }

  if (loanId === null) {
    throw new Error(
      "registerLoan succeeded but LoanRegistered event was not found"
    );
  }

  console.log("\n=== LOAN REGISTERED ===");
  console.log("Loan ID:", loanId.toString());
  console.log("Status: Created");
  console.log("\nDo NOT fund yet. Verify the registered loan on-chain first.");
}

main().catch((error) => {
  console.error("\nRegistration failed:");
  console.error(error.shortMessage ?? error.message ?? error);
  process.exit(1);
});
