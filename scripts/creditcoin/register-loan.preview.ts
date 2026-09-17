import { Contract, ethers } from "ethers";
import loanManagerAbi from "../../out/ASCLoanManager.sol/ASCLoanManager.json";

const RPC = process.env.CREDITCOIN_RPC_URL!;
const MANAGER = process.env.ASC_LOAN_MANAGER_CONTRACT_ADDRESS!;
const TOKEN = process.env.SOURCE_CHAIN_ERC20_CONTRACT_ADDRESS!;
const LENDER_KEY = process.env.LENDER_WALLET_PRIVATE_KEY!;
const BORROWER_KEY = process.env.BORROWER_WALLET_PRIVATE_KEY!;

const LOAN_AMOUNT = 700n * 10n ** 18n; // 700 TEST
const INTEREST_BPS = 500n;              // 5%
const EXPECTED_REPAYMENT = 735n * 10n ** 18n;
const DURATION_BLOCKS = 172800n;        // ~30 days at ~15 sec/block

async function main() {
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

  console.log("\n=== LOAN REGISTRATION PREVIEW ===");
  console.log("Current block:       ", currentBlock.toString());
  console.log("Deadline block:      ", deadline.toString());
  console.log("Duration:             172800 blocks");
  console.log("Loan amount:          700 TEST");
  console.log("Interest:             5%");
  console.log("Expected repayment:   735 TEST");
  console.log("Lender:               ", lender.address);
  console.log("Borrower:             ", borrower.address);
  console.log("Token:                ", TOKEN);
  console.log("Manager:              ", MANAGER);
  console.log("Payload hash:         ", payloadToSign);
  console.log("Lender signature:     ", lenderSignature);
  console.log("Borrower signature:   ", borrowerSignature);
  console.log("\nNO TRANSACTION WAS SENT.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
