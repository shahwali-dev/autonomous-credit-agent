"use client";

import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

const executionSteps = [
  ["01", "AI recommendation", "Credit terms generated", "COMPLETE"],
  ["02", "RiskGuard validation", "All deterministic policies passed", "COMPLETE"],
  ["03", "Creditcoin authorization", "Execution is ready", "READY"],
  ["04", "Credit execution", "Awaiting user authorization", "PENDING"],
];

export default function DecisionPage() {
  const router = useRouter();

  const aiDecision = useCreditStore((state) => state.aiDecision);
  const application = useCreditStore((state) => state.application);
  const evidence = useCreditStore((state) => state.evidence);
  const decisionStatus = useCreditStore((state) => state.decisionStatus);
  const executeCredit = useCreditStore(
    (state) => state.executeCredit
  );
  const decisionFactors = [
    [
      "Risk level",
      aiDecision?.risk ?? "PENDING",
    ],
    [
      "AI confidence",
      `${aiDecision?.confidence ?? 0}%`,
    ],
    [
      "Requested credit",
      `$${application.requestedAmount?.toLocaleString() ?? "0"}`,
    ],
    [
      "Recommended credit",
      `$${aiDecision?.recommendedAmount?.toLocaleString() ?? "0"}`,
    ],
    [
      "Duration",
      `${aiDecision?.recommendedDuration ?? 0} days`,
    ],
    [
      "Verified collateral",
      `$${application.collateral?.toLocaleString() ?? "0"}`,
    ],
  ];
  const riskGuardChecks = {
    maxCreditExposure:
      (aiDecision?.recommendedAmount ?? 0) <= 5000,

    collateralCoverage:
      application.collateral >=
      (aiDecision?.recommendedAmount ?? 0) * 0.5,

    maxDuration:
      (aiDecision?.recommendedDuration ?? 0) <= 90,

    evidenceVerified:
      evidence.verified,

    riskThreshold:
      aiDecision?.risk === "LOW" ||
      aiDecision?.risk === "MEDIUM",
  };

  const riskGuardPassed =
    Object.values(riskGuardChecks).every(Boolean);
  const policyChecks = [
    [
      "Maximum credit exposure",
      `$${aiDecision?.recommendedAmount?.toLocaleString() ?? "0"} / $5,000`,
      riskGuardChecks.maxCreditExposure ? "PASS" : "FAIL",
    ],
    [
      "Collateral coverage",
      `${Math.round(
        ((application.collateral ?? 0) /
          (aiDecision?.recommendedAmount || 1)) *
        100
      )}%`,
      riskGuardChecks.collateralCoverage ? "PASS" : "FAIL",
    ],
    [
      "Maximum duration",
      `${aiDecision?.recommendedDuration ?? 0} / 90 days`,
      riskGuardChecks.maxDuration ? "PASS" : "FAIL",
    ],
    [
      "Evidence verification",
      evidence.verified ? "Attestcoin VALID" : "NOT VERIFIED",
      riskGuardChecks.evidenceVerified ? "PASS" : "FAIL",
    ],
    [
      "Risk threshold",
      `${aiDecision?.risk ?? "PENDING"} ≤ MEDIUM`,
      riskGuardChecks.riskThreshold ? "PASS" : "FAIL",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">
              Decision Center
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Autonomous credit decision
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              The AI recommendation has been evaluated against deterministic
              RiskGuard policies before any credit execution can occur.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Final status
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {decisionStatus === "APPROVED"
                ? "READY TO EXECUTE"
                : decisionStatus}
            </div>
          </div>
        </div>

        {/* Decision Banner */}
        <section className="mt-8 relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-[#102119] via-[#0b1511] to-[#0b0f14] p-6 md:p-8">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                  ✓
                </span>

                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  {aiDecision?.recommendation === "APPROVE"
                    ? "Credit approved"
                    : aiDecision?.recommendation === "REJECT"
                      ? "Credit rejected"
                      : "Credit pending"}
                </span>
              </div>

              <div className="mt-5 text-5xl font-semibold tracking-tight text-emerald-300 md:text-6xl">
                $1,000
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                Recommended autonomous credit line
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-[520px]">
              <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                <div className="text-[10px] text-zinc-600">
                  Risk
                </div>

                <div className="mt-2 text-lg font-semibold text-emerald-300">
                  LOW
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                <div className="text-[10px] text-zinc-600">
                  Confidence
                </div>

                <div className="mt-2 text-lg font-semibold">
                  94%
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                <div className="text-[10px] text-zinc-600">
                  Duration
                </div>

                <div className="mt-2 text-lg font-semibold">
                  30 days
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI vs RiskGuard */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* AI Decision */}
          <div className="rounded-2xl border border-cyan-400/10 bg-[#0b0f14] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  AI recommendation
                </div>

                <div className="mt-1 text-xs text-zinc-600">
                  Autonomous risk assessment
                </div>
              </div>

              <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[9px] text-cyan-300">
                AI OUTPUT
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {decisionFactors.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/5 bg-black/20 p-4"
                >
                  <div className="text-[10px] text-zinc-600">
                    {label}
                  </div>

                  <div
                    className={`mt-2 text-sm font-semibold ${label === "Risk level"
                      ? "text-emerald-300"
                      : "text-zinc-300"
                      }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RiskGuard */}
          <div className="rounded-2xl border border-emerald-400/10 bg-[#0b0f14] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  RiskGuard validation
                </div>

                <div className="mt-1 text-xs text-zinc-600">
                  Deterministic policy enforcement
                </div>
              </div>

              <span
                className={`rounded-md border px-2.5 py-1 text-[9px] ${riskGuardPassed
                  ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                  : "border-red-400/20 bg-red-400/5 text-red-300"
                  }`}
              >
                {riskGuardPassed ? "ALL PASSED" : "POLICY FAILED"}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {policyChecks.map(([label, value, status]) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs text-emerald-300">
                    ✓
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-zinc-400">
                      {label}
                    </div>

                    <div className="mt-1 text-[10px] text-zinc-700">
                      {value}
                    </div>
                  </div>

                  <span className="text-[9px] font-medium text-emerald-300">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
          <div>
            <div className="text-sm font-semibold">
              Decision comparison
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              AI recommendation versus deterministic execution constraints.
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/5">
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/5 bg-black/20 px-5 py-3 text-[9px] uppercase tracking-wider text-zinc-700">
              <span>Parameter</span>
              <span>AI recommendation</span>
              <span>RiskGuard limit</span>
            </div>

            {[
              ["Credit amount", "$1,000", "≤ $5,000"],
              ["Duration", "30 days", "≤ 90 days"],
              ["Collateral", "$1,500", "≥ $500"],
              ["Risk", "LOW", "LOW / MEDIUM"],
              ["Evidence", "Verified", "Required"],
            ].map(([label, recommendation, limit]) => (
              <div
                key={label}
                className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/5 px-5 py-4 last:border-0"
              >
                <span className="text-xs text-zinc-500">
                  {label}
                </span>

                <span className="text-xs text-zinc-300">
                  {recommendation}
                </span>

                <span className="text-xs text-emerald-300">
                  {limit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Execution Pipeline */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
          <div>
            <div className="text-sm font-semibold">
              Execution pipeline
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              The complete path from AI decision to Creditcoin execution.
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {executionSteps.map(
              ([number, title, detail, status], index) => (
                <div key={number} className="relative">
                  <div className="rounded-xl border border-white/5 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-cyan-400/60">
                        {number}
                      </span>

                      <span
                        className={`h-2 w-2 rounded-full ${status === "COMPLETE"
                          ? "bg-emerald-400"
                          : status === "READY"
                            ? "bg-cyan-300"
                            : "bg-zinc-700"
                          }`}
                      />
                    </div>

                    <div className="mt-5 text-xs font-medium text-zinc-300">
                      {title}
                    </div>

                    <div className="mt-2 text-[10px] leading-5 text-zinc-600">
                      {detail}
                    </div>

                    <div
                      className={`mt-4 text-[9px] uppercase tracking-wider ${status === "COMPLETE"
                        ? "text-emerald-300"
                        : status === "READY"
                          ? "text-cyan-300"
                          : "text-zinc-700"
                        }`}
                    >
                      {status}
                    </div>
                  </div>

                  {index < executionSteps.length - 1 && (
                    <div className="absolute right-[-10px] top-1/2 hidden text-zinc-700 md:block">
                      →
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* Final Authorization */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.05] to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Creditcoin execution
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                All safety checks passed.
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-zinc-600">
                RiskGuard has validated the AI-generated credit terms. The
                credit line is now ready for bounded execution on Creditcoin.
              </p>
            </div>

            <button
              disabled={!riskGuardPassed}
              onClick={() => {
                if (!riskGuardPassed) return;

                executeCredit();
                router.push("/credit-lines");
              }}
              className={`shrink-0 rounded-xl px-6 py-4 text-sm font-semibold transition ${riskGuardPassed
                ? "bg-cyan-300 text-black hover:bg-cyan-200"
                : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                }`}
            >
              {riskGuardPassed
                ? "Execute Credit on Creditcoin →"
                : "Execution Blocked by RiskGuard"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5 text-[10px] text-zinc-600">
            <span className="rounded-md border border-white/5 px-3 py-1.5">
              ✓ Attestcoin evidence verified
            </span>

            <span className="rounded-md border border-white/5 px-3 py-1.5">
              ✓ AI assessment complete
            </span>

            <span className="rounded-md border border-white/5 px-3 py-1.5">
              ✓ RiskGuard approved
            </span>

            <span className="rounded-md border border-white/5 px-3 py-1.5">
              ✓ Credit terms within policy
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}