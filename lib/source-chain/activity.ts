import {
  Contract,
  JsonRpcProvider,
} from "ethers";

const CONTRACT_ADDRESS =
  "0x3ecb1cD858e422873a2CBe0dDAcAc3C8987Aee1d";

const ABI = [
  "function getActivity(address borrower) view returns (uint256 repaymentCount, uint256 failedObligations, uint256 collateral, uint256 activityStart, uint256 activityEnd)",
  "event RepaymentRecorded(address indexed borrower,uint256 indexed repaymentId,uint256 amount,uint256 timestamp)",
];

export interface OnchainActivity {
  repaymentCount: number;
  failedObligations: number;
  collateral: number;
  activityStart: number;
  activityEnd: number;
  activityDays: number;
  latestRepaymentTxHash: string | null;
}

export async function getOnchainActivity(
  rpcUrl: string,
  borrower: string
): Promise<OnchainActivity> {
  const provider = new JsonRpcProvider(rpcUrl);

  const contract = new Contract(
    CONTRACT_ADDRESS,
    ABI,
    provider
  );

  const [
    repaymentCount,
    failedObligations,
    collateral,
    activityStart,
    activityEnd,
  ] = await contract.getActivity(borrower);

  const repaymentFilter =
    contract.filters.RepaymentRecorded(borrower);

  const currentBlock = await provider.getBlockNumber();

  const repaymentLogs =
    await contract.queryFilter(
      repaymentFilter,
      Math.max(0, currentBlock - 49_999),
      currentBlock
    );

  const latestRepaymentLog =
    repaymentLogs.length > 0
      ? repaymentLogs[repaymentLogs.length - 1]
      : null;

  const latestRepaymentTxHash =
    latestRepaymentLog?.transactionHash ?? null;

  const start = Number(activityStart);
  const end = Number(activityEnd);

  const activityDays =
    start > 0 && end > start
      ? Math.floor((end - start) / 86_400)
      : 0;

  return {
    repaymentCount: Number(repaymentCount),
    failedObligations: Number(failedObligations),
    collateral: Number(collateral),
    activityStart: start,
    activityEnd: end,
    activityDays,
    latestRepaymentTxHash,
  };
}