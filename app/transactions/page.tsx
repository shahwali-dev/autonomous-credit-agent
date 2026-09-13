"use client";

import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

export default function TransactionsPage() {
  const router = useRouter();

  const transactions = useCreditStore(
    (state) => state.transactions
  );
  const creditLine = useCreditStore(
    (state) => state.creditLine
  );
  const aiDecision = useCreditStore(
    (state) => state.aiDecision
  );
  const evidence = useCreditStore(
    (state) => state.evidence
  );
  const application = useCreditStore(
    (state) => state.application
  );
  const decisionStatus = useCreditStore(
    (state) => state.decisionStatus
  );

  const formatTime = (timestamp: number) => {
    if (!timestamp) return "—";

    return new Date(timestamp).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatHash = (hash?: string) => {
    if (!hash) return "Pending";

    if (hash.length <= 18) return hash;

    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const getTransactionMeta = (
    type: string
  ) => {
    switch (type) {
      case "CREDIT_ISSUED":
        return {
          title: "Credit issued",
          description:
            "Autonomous credit execution",
          icon: "↗",
        };

      case "RISKGUARD":
        return {
          title: "RiskGuard validation",
          description:
            "Deterministic policy authorization",
          icon: "◆",
        };

      case "AI_DECISION":
        return {
          title: "AI decision",
          description:
            "Credit recommendation generated",
          icon: "AI",
        };

      case "EVIDENCE_VERIFIED":
        return {
          title: "Evidence verified",
          description:
            "Cross-chain financial evidence",
          icon: "✓",
        };

      case "COLLATERAL_VERIFIED":
        return {
          title: "Collateral verified",
          description:
            "Verified collateral balance",
          icon: "◇",
        };

      case "REPAYMENT":
        return {
          title: "Repayment",
          description:
            "Credit repayment recorded",
          icon: "↙",
        };

      default:
        return {
          title: "Transaction",
          description:
            "Autonomous credit activity",
          icon: "•",
        };
    }
  };

  const totalTransactions =
    transactions.length;

  const executedCredit =
    creditLine?.approvedAmount ?? 0;

  const verifiedEvents =
    evidence.verified
      ? evidence.repaymentCount
      : 0;

  const successfulRepayments =
    evidence.failedObligations === 0
      ? evidence.repaymentCount
      : Math.max(
          evidence.repaymentCount -
            evidence.failedObligations,
          0
        );

  const isConnected =
    decisionStatus === "EXECUTED" ||
    decisionStatus === "READY_TO_EXECUTE";

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-[1500px] p-5 md:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              On-chain activity
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Transactions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Track AI decisions, verified evidence,
              RiskGuard authorization, Creditcoin
              execution, and repayment activity.
            </p>
          </div>

          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10">
            Export activity
          </button>
        </div>

        {/* Network status */}
        <section className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Creditcoin network connected
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {isConnected
                    ? "Autonomous credit activity is available."
                    : "Transaction monitoring is ready."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
                Attestcoin
              </span>

              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
                Creditcoin
              </span>

              <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
                Testnet
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total transactions",
              value: totalTransactions.toString(),
              note: "Recorded in current session",
            },
            {
              label: "Credit executed",
              value:
                executedCredit > 0
                  ? `$${executedCredit.toLocaleString()}`
                  : "$0",
              note:
                creditLine?.status === "ACTIVE"
                  ? "Current active credit"
                  : "No credit executed yet",
            },
            {
              label: "Verified events",
              value: verifiedEvents.toString(),
              note: evidence.verified
                ? "Attestcoin evidence"
                : "Awaiting verification",
            },
            {
              label: "Successful repayments",
              value: `${successfulRepayments} / ${evidence.repaymentCount}`,
              note:
                evidence.repaymentCount > 0
                  ? "Current verified history"
                  : "No repayment history",
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

        {/* Main transaction table */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b1016]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/5 p-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold">
                Transaction history
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Complete activity across the autonomous
                credit pipeline
              </p>
            </div>

            <div className="flex gap-2">
              <button className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                All
              </button>

              <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500 hover:bg-white/5">
                Credit
              </button>

              <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500 hover:bg-white/5">
                Evidence
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-600">
                  <th className="px-6 py-4 font-medium">
                    Transaction
                  </th>

                  <th className="py-4 font-medium">
                    Amount
                  </th>

                  <th className="py-4 font-medium">
                    Network
                  </th>

                  <th className="py-4 font-medium">
                    Status
                  </th>

                  <th className="py-4 font-medium">
                    Date
                  </th>

                  <th className="py-4 pr-6 text-right font-medium">
                    Reference
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto max-w-md">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                          <span className="text-lg text-zinc-600">
                            —
                          </span>
                        </div>

                        <p className="mt-4 text-sm font-medium text-zinc-300">
                          No transactions yet
                        </p>

                        <p className="mt-2 text-xs leading-5 text-zinc-600">
                          Transactions will appear here when
                          the autonomous credit pipeline
                          generates activity.
                        </p>

                        <button
                          onClick={() =>
                            router.push("/apply")
                          }
                          className="mt-5 rounded-xl bg-cyan-300 px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-cyan-200"
                        >
                          Start Credit Assessment
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => {
                    const meta =
                      getTransactionMeta(
                        transaction.type
                      );

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-white/5 transition hover:bg-white/[0.02] last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                              <span className="text-xs text-cyan-300">
                                {meta.icon}
                              </span>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-zinc-200">
                                {meta.title}
                              </p>

                              <p className="mt-1 text-xs text-zinc-600">
                                {meta.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 text-sm font-medium text-white">
                          {transaction.amount !==
                          undefined
                            ? `$${transaction.amount.toLocaleString()}`
                            : "—"}
                        </td>

                        <td className="py-4">
                          <span className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                            {transaction.network}
                          </span>
                        </td>

                        <td className="py-4">
                          <span
                            className={`inline-flex rounded-lg border px-2.5 py-1 text-[11px] ${
                              transaction.status ===
                              "FAILED"
                                ? "border-red-400/20 bg-red-400/5 text-red-300"
                                : "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>

                        <td className="py-4 text-xs text-zinc-500">
                          {formatTime(
                            transaction.timestamp
                          )}
                        </td>

                        <td className="py-4 pr-6 text-right">
                          <button className="font-mono text-xs text-cyan-400/70 transition hover:text-cyan-300">
                            {formatHash(
                              transaction.hash
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Autonomous execution */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-6">
            <p className="text-sm font-semibold">
              Autonomous execution trail
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Every credit decision passes through the
              same bounded execution pipeline.
            </p>

            <div className="mt-7 space-y-5">
              {[
                {
                  step: "01",
                  title: "Evidence verified",
                  description:
                    "Attestcoin confirms cross-chain financial activity.",
                },
                {
                  step: "02",
                  title: "AI decision generated",
                  description:
                    "The credit agent evaluates risk and recommends terms.",
                },
                {
                  step: "03",
                  title: "RiskGuard validated",
                  description:
                    "Deterministic policies validate the AI recommendation.",
                },
                {
                  step: "04",
                  title: "Creditcoin executed",
                  description:
                    "Approved credit is executed within the allowed limits.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5 font-mono text-[10px] text-cyan-300">
                    {item.step}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet / execution card */}
          <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.03] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Execution account
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Wallet authorized for bounded credit
                  execution
                </p>
              </div>

              <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-xs text-emerald-300">
                Connected
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                Wallet
              </p>

              <p className="mt-2 font-mono text-sm text-zinc-300">
                {application.walletAddress
                  ? `${application.walletAddress.slice(
                      0,
                      8
                    )}...${application.walletAddress.slice(
                      -6
                    )}`
                  : "0x7A42...91F2"}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-xs text-zinc-500">
                  Network
                </p>

                <p className="mt-2 text-sm font-medium">
                  Creditcoin Testnet
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-xs text-zinc-500">
                  Authority
                </p>

                <p className="mt-2 text-sm font-medium text-cyan-300">
                  RiskGuard
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <p className="text-xs font-medium text-emerald-300">
                  Execution policy active
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                AI recommendations cannot exceed the
                limits enforced by RiskGuard.
              </p>
            </div>
          </div>
        </section>

        {/* Current decision context */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-5">
            <p className="text-xs text-zinc-500">
              Current AI recommendation
            </p>

            <p className="mt-3 text-xl font-semibold">
              {aiDecision?.recommendation ??
                "PENDING"}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              {aiDecision
                ? `${aiDecision.confidence}% confidence · ${aiDecision.risk} risk`
                : "Assessment not completed"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-5">
            <p className="text-xs text-zinc-500">
              Requested credit
            </p>

            <p className="mt-3 text-xl font-semibold">
              $
              {application.requestedAmount.toLocaleString()}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              {application.durationDays} day requested
              duration
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b1016] p-5">
            <p className="text-xs text-zinc-500">
              Evidence status
            </p>

            <p
              className={`mt-3 text-xl font-semibold ${
                evidence.verified
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              {evidence.verified
                ? "VERIFIED"
                : "PENDING"}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              {evidence.repaymentCount} repayments ·{" "}
              {evidence.activityDays} days activity
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d171d] to-[#0b1016] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold">
                Ready for another credit assessment?
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Submit verified financial evidence and
                let the autonomous credit agent evaluate
                your next request.
              </p>
            </div>

            <button
              onClick={() => router.push("/apply")}
              className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              Start New Assessment
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}