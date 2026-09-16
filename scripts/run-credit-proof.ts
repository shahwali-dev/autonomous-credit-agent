import {
  processCreditEvidence,
  CREDIT_PROOF_ACTIONS,
} from "../lib/attestcoin/credit-worker";

const txHash =
  "0x64626b7dd5cb0705535c87d25688126790a118eedbf107d6534b0053d9e32de1";

processCreditEvidence({
  txHash,
  action: CREDIT_PROOF_ACTIONS.COLLATERAL,
})
  .then((result) => {
    console.log("\nCredit evidence processed successfully:");
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(
      "\nCredit evidence processing failed:",
      error?.shortMessage || error?.message || error
    );
    process.exit(1);
  });
