"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

export default function CreditLinesPage() {
  const router = useRouter();

  const creditLine = useCreditStore((state) => state.creditLine);
  const aiDecision = useCreditStore((state) => state.aiDecision);
  const evidence = useCreditStore((state) => state.evidence);
  const transactions = useCreditStore((state) => state.transactions);
  const decisionStatus = useCreditStore(
    (state) => state.decisionStatus
  );
  const repayCredit = useCreditStore(
    (state) => state.repayCredit
  );
  const drawCredit = useCreditStore(
    (state) => state.drawCredit
  );

  const [isRepaymentOpen, setIsRepaymentOpen] = useState(false);
  const [repaymentAmount, setRepaymentAmount] = useState("");

  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const [drawAmount, setDrawAmount] = useState("");

  const approvedAmount = creditLine?.approvedAmount ?? 0;
  const usedAmount = creditLine?.usedAmount ?? 0;
  const availableAmount = creditLine?.availableAmount ?? 0;
  const collateral = creditLine?.collateral ?? 0;

  const totalRepaid = transactions
    .filter((transaction) => transaction.type === "REPAYMENT")
    .reduce(
      (total, transaction) =>
        total + (transaction.amount ?? 0),
      0
    );

  const originalOutstanding =
    usedAmount + totalRepaid;

  const repaymentProgress =
    originalOutstanding > 0
      ? Math.min(
        100,
        Math.round(
          (totalRepaid / originalOutstanding) * 100
        )
      )
      : 0;

  const utilization =
    approvedAmount > 0
      ? Math.round((usedAmount / approvedAmount) * 100)
      : 0;

  const collateralCoverage =
    approvedAmount > 0
      ? Math.round((collateral / approvedAmount) * 100)
      : 0;

  const isActive = creditLine?.status === "ACTIVE";

  const handleDraw = () => {
    const amount = Number(drawAmount);

    if (!amount || amount <= 0) {
      return;
    }

    if (availableAmount <= 0) {
      return;
    }

    const finalAmount = Math.min(
      amount,
      availableAmount
    );

    drawCredit(finalAmount);

    setDrawAmount("");
    setIsDrawOpen(false);
  };

  const handleRepayment = () => {
    const amount = Number(repaymentAmount);

    if (!amount || amount <= 0) {
      return;
    }

    if (usedAmount <= 0) {
      return;
    }

    const finalAmount = Math.min(amount, usedAmount);

    repayCredit(finalAmount);

    setRepaymentAmount("");
    setIsRepaymentOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-[1500px] p-5 md:p-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Creditcoin
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Credit Lines
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Monitor active credit, repayment progress, available limits,
              collateral coverage, and credit health.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/transactions")}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
            >
              View Transactions
            </button>

            <button
              disabled={!isActive || availableAmount <= 0}
              onClick={() => {
                if (!isActive || availableAmount <= 0) return;
                setIsDrawOpen(true);
              }}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isActive && availableAmount > 0
                ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                }`}
            >
              Draw Credit
            </button>

            <button
              disabled={!isActive}
              onClick={() => {
                if (!isActive) return;
                setIsRepaymentOpen(true);
              }}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isActive
                ? "bg-cyan-300 text-black hover:bg-cyan-200"
                : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                }`}
            >
              Make Repayment
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <section
          className={`mt-6 rounded-2xl border p-5 ${isActive
            ? "border-emerald-400/20 bg-emerald-400/[0.04]"
            : "border-white/10 bg-white/[0.02]"
            }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${isActive
                  ? "border-emerald-400/20 bg-emerald-400/10"
                  : "border-white/10 bg-white/5"
                  }`}
              >
                <span
                  className={`h-3 w-3 rounded-full ${isActive
                    ? "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]"
                    : "bg-zinc-600"
                    }`}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {isActive
                    ? "Active credit line"
                    : "No active credit line"}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {isActive
                    ? "Credit is active and currently in good standing."
                    : "Complete an approved credit assessment to activate a credit line."}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 text-xs ${isActive
                ? "text-emerald-300"
                : "text-zinc-500"
                }`}
            >
              <span>●</span>
              {isActive ? "Healthy" : decisionStatus}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total credit limit",
              value: `$${approvedAmount.toLocaleString()}`,
              note: isActive
                ? "Approved autonomous exposure"
                : "No active credit limit",
            },
            {
              label: "Used credit",
              value: `$${usedAmount.toLocaleString()}`,
              note: `${utilization}% of approved limit`,
            },
            {
              label: "Available credit",
              value: `$${availableAmount.toLocaleString()}`,
              note: "Ready for future draws",
            },
            {
              label: "Outstanding balance",
              value: `$${usedAmount.toLocaleString()}`,
              note: "Current principal",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#0b1016] p-5"
            >
              <p className="text-xs text-zinc-500">
                {stat.label}
              </p>

              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                {stat.note}
              </p>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <section className="mt-6 grid gap-6 xl:grid-cols-3">

          {/* Credit Utilization */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6 xl:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Credit utilization
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Current exposure against your approved credit limit
                </p>
              </div>

              <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-xs text-cyan-300">
                {utilization}% used
              </span>
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold">
                    ${usedAmount.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    of ${approvedAmount.toLocaleString()} credit limit
                  </p>
                </div>

                <p className="text-sm text-zinc-400">
                  ${availableAmount.toLocaleString()} remaining
                </p>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-cyan-300 transition-all"
                  style={{
                    width: `${Math.min(utilization, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-zinc-500">Used</p>

                  <p className="mt-1 font-medium text-cyan-300">
                    ${usedAmount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500">Available</p>

                  <p className="mt-1 font-medium text-white">
                    ${availableAmount.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-zinc-500">Limit</p>

                  <p className="mt-1 font-medium text-white">
                    ${approvedAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Health */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6">
            <p className="text-sm font-semibold">
              Credit health
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Based on verified repayment behavior
            </p>

            <div className="mt-7 flex items-center justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-emerald-400/20">
                <div className="absolute inset-0 rotate-[-35deg] rounded-full border-[10px] border-transparent border-r-emerald-400 border-t-emerald-400" />

                <div className="text-center">
                  <p className="text-3xl font-semibold">
                    {aiDecision?.confidence ?? 0}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                    Score
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold text-emerald-300">
                {aiDecision?.risk === "LOW"
                  ? "Excellent"
                  : aiDecision?.risk === "MEDIUM"
                    ? "Moderate"
                    : "Pending"}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {evidence.repaymentCount} verified repayments
              </p>
            </div>
          </div>
        </section>

        {/* Credit Details */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Terms */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6">
            <div>
              <p className="text-sm font-semibold">
                Credit terms
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Current active credit agreement
              </p>
            </div>

            <div className="mt-6 divide-y divide-white/5">
              {[
                [
                  "Approved amount",
                  `$${approvedAmount.toLocaleString()}`,
                ],
                [
                  "Credit duration",
                  `${aiDecision?.recommendedDuration ?? 0} days`,
                ],
                [
                  "Collateral",
                  `$${collateral.toLocaleString()}`,
                ],
                [
                  "Collateral coverage",
                  `${collateralCoverage}%`,
                ],
                [
                  "Risk level",
                  aiDecision?.risk ?? "PENDING",
                ],
                [
                  "AI confidence",
                  `${aiDecision?.confidence ?? 0}%`,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="text-sm text-zinc-500">
                    {label}
                  </span>

                  <span className="text-sm font-medium text-zinc-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Repayment */}
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Repayment progress
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Track your current credit obligation
                </p>
              </div>

              <span
                className={`rounded-lg border px-2.5 py-1 text-xs ${usedAmount === 0 && isActive
                  ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                  : "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                  }`}
              >
                {usedAmount === 0 && isActive
                  ? "No balance"
                  : isActive
                    ? "On track"
                    : "Inactive"}
              </span>
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold">
                    ${totalRepaid.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Repaid
                  </p>
                </div>

                <p className="text-xs text-zinc-500">
                  {repaymentProgress}%
                </p>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{
                    width: `${repaymentProgress}%`,
                  }}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">
                    Outstanding
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    ${usedAmount.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Current principal
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">
                    Repayments
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {evidence.repaymentCount}
                  </p>

                  <p className="mt-1 text-xs text-emerald-400">
                    Successful history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b1016] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">
                Credit activity
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Recent activity associated with this credit line
              </p>
            </div>

            <button
              onClick={() => router.push("/transactions")}
              className="text-xs font-medium text-cyan-300 hover:text-cyan-200"
            >
              View all
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-600">
                  <th className="pb-3 font-medium">Activity</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 text-right font-medium">
                    Reference
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-4 text-sm text-zinc-300">
                        {transaction.type === "CREDIT_DRAWN"
                          ? "Credit drawn"
                          : transaction.type === "CREDIT_APPROVED"
                            ? "Credit approved"
                            : transaction.type === "REPAYMENT"
                              ? "Repayment"
                              : transaction.type === "RISKGUARD"
                                ? "RiskGuard"
                                : transaction.type === "AI_DECISION"
                                  ? "AI decision"
                                  : transaction.type === "EVIDENCE_VERIFIED"
                                    ? "Evidence verified"
                                    : transaction.type === "COLLATERAL_VERIFIED"
                                      ? "Collateral verified"
                                      : transaction.type}
                      </td>

                      <td className="py-4 text-sm font-medium text-white">
                        {transaction.amount
                          ? `$${transaction.amount.toLocaleString()}`
                          : "—"}
                      </td>

                      <td className="py-4">
                        <span className="inline-flex rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-[11px] text-emerald-300">
                          {transaction.status}
                        </span>
                      </td>

                      <td className="py-4 text-xs text-zinc-500">
                        {new Date(
                          transaction.timestamp
                        ).toLocaleDateString()}
                      </td>

                      <td className="py-4 text-right font-mono text-xs text-zinc-600">
                        {transaction.hash ?? transaction.id}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-xs text-zinc-600"
                    >
                      No credit transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Safety / System State */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03] p-6">
            <p className="text-sm font-semibold">
              Autonomous safety state
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              The AI agent can recommend credit, but execution remains bounded
              by deterministic RiskGuard policies.
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Maximum exposure", "$5,000"],
                ["Maximum duration", "90 days"],
                ["Required evidence", "Attestcoin verified"],
                ["Risk threshold", "LOW / MEDIUM"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-xs text-zinc-500">
                    {label}
                  </span>

                  <span className="text-xs font-medium text-zinc-300">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6">
            <p className="text-sm font-semibold">
              Credit line status
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Current state of autonomous credit execution
            </p>

            <div className="mt-6 space-y-4">
              {[
                [
                  "Credit assessment",
                  aiDecision ? "Completed" : "Pending",
                ],
                [
                  "AI recommendation",
                  aiDecision?.recommendation === "APPROVE"
                    ? "Approved"
                    : aiDecision?.recommendation === "REJECT"
                      ? "Rejected"
                      : "Pending",
                ],
                [
                  "RiskGuard validation",
                  isActive ? "Passed" : "Pending",
                ],
                [
                  "Creditcoin execution",
                  isActive ? "Active" : "Pending",
                ],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${status === "Approved" ||
                      status === "Passed" ||
                      status === "Active" ||
                      status === "Completed"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-white/5 text-zinc-600"
                      }`}
                  >
                    {status === "Approved" ||
                      status === "Passed" ||
                      status === "Active" ||
                      status === "Completed"
                      ? "✓"
                      : "•"}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">
                      {label}
                    </p>
                  </div>

                  <span
                    className={`text-xs ${status === "Approved" ||
                      status === "Passed" ||
                      status === "Active" ||
                      status === "Completed"
                      ? "text-emerald-300"
                      : "text-zinc-600"
                      }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Repayment Modal */}
      {isRepaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1016] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold">
                  Make repayment
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Enter the amount you want to repay against your
                  outstanding credit balance.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsRepaymentOpen(false);
                  setRepaymentAmount("");
                }}
                className="rounded-lg px-2 py-1 text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Outstanding balance
                </span>

                <span className="text-sm font-semibold text-white">
                  ${usedAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {usedAmount > 0 ? (
              <>
                <div className="mt-5">
                  <label className="text-xs text-zinc-500">
                    Repayment amount
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                      $
                    </span>

                    <input
                      type="number"
                      min="1"
                      max={usedAmount}
                      value={repaymentAmount}
                      onChange={(event) =>
                        setRepaymentAmount(event.target.value)
                      }
                      placeholder="Enter amount"
                      className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-8 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40"
                    />
                  </div>

                  <button
                    onClick={() =>
                      setRepaymentAmount(
                        String(usedAmount)
                      )
                    }
                    className="mt-2 text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    Repay full balance
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setIsRepaymentOpen(false);
                      setRepaymentAmount("");
                    }}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleRepayment}
                    disabled={
                      !repaymentAmount ||
                      Number(repaymentAmount) <= 0
                    }
                    className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
                  >
                    Confirm repayment
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
                <p className="text-sm font-medium text-cyan-300">
                  No outstanding balance
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  This credit line currently has no drawn balance to repay.
                  Your full approved amount is still available.
                </p>

                <button
                  onClick={() => setIsRepaymentOpen(false)}
                  className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Draw Credit Modal */}
      {isDrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1016] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold">
                  Draw credit
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Draw funds from your approved autonomous credit line.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsDrawOpen(false);
                  setDrawAmount("");
                }}
                className="rounded-lg px-2 py-1 text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Available credit
                </span>

                <span className="text-sm font-semibold text-cyan-300">
                  ${availableAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs text-zinc-500">
                Draw amount
              </label>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>

                <input
                  type="number"
                  min="1"
                  max={availableAmount}
                  value={drawAmount}
                  onChange={(event) =>
                    setDrawAmount(event.target.value)
                  }
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-8 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40"
                />
              </div>

              <button
                onClick={() =>
                  setDrawAmount(String(availableAmount))
                }
                className="mt-2 text-xs text-cyan-300 hover:text-cyan-200"
              >
                Draw full available amount
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setIsDrawOpen(false);
                  setDrawAmount("");
                }}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleDraw}
                disabled={
                  !drawAmount ||
                  Number(drawAmount) <= 0
                }
                className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
              >
                Confirm draw
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
