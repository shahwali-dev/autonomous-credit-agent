"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";
import { generateRiskDecision } from "@/agent/risk-engine";

export default function AgentPage() {
  const router = useRouter();

  const aiDecision = useCreditStore((state) => state.aiDecision);
  const application = useCreditStore((state) => state.application);
  const evidence = useCreditStore((state) => state.evidence);
  const decisionStatus = useCreditStore((state) => state.decisionStatus);
  const setAIDecision = useCreditStore((state) => state.setAIDecision);

  useEffect(() => {
    if (!evidence.verified) {
      return;
    }

    const decision = generateRiskDecision(
      evidence,
      application
    );

    const decisionChanged =
      !aiDecision ||
      aiDecision.risk !== decision.risk ||
      aiDecision.confidence !== decision.confidence ||
      aiDecision.recommendedAmount !==
      decision.recommendedAmount ||
      aiDecision.recommendedDuration !==
      decision.recommendedDuration ||
      aiDecision.recommendation !==
      decision.recommendation;

    if (decisionChanged) {
      setAIDecision(decision);
    }
  }, [
    evidence,
    application,
    aiDecision,
    setAIDecision,
  ]);

  const hasDecision = Boolean(aiDecision);
  const isApproved = aiDecision?.recommendation === "APPROVE";
  const isEvidenceVerified = evidence.verified;

  const riskFactors = [
    {
      label: "Repayment consistency",
      score:
        evidence.repaymentCount > 5
          ? "Strong"
          : evidence.repaymentCount > 2
            ? "Moderate"
            : "Weak",
      impact:
        evidence.repaymentCount > 5
          ? "Positive"
          : evidence.repaymentCount > 2
            ? "Neutral"
            : "Negative",
    },
    {
      label: "Failed obligations",
      score:
        evidence.failedObligations === 0
          ? "0 detected"
          : `${evidence.failedObligations} detected`,
      impact:
        evidence.failedObligations === 0 ? "Positive" : "Negative",
    },
    {
      label: "Verified collateral",
      score: `$${evidence.collateral.toLocaleString()}`,
      impact:
        evidence.collateral >=
          (aiDecision?.recommendedAmount ??
            application.requestedAmount) *
          0.5
          ? "Positive"
          : "Negative",
    },
    {
      label: "Financial activity",
      score: `${evidence.activityDays} days`,
      impact:
        evidence.activityDays >= 30
          ? "Positive"
          : "Neutral",
    },
  ];

  const agentSteps = [
    {
      number: "01",
      title: "Evidence ingestion",
      detail: isEvidenceVerified
        ? "Verified financial evidence received"
        : "Waiting for verified financial evidence",
      status: isEvidenceVerified ? "Complete" : "Pending",
    },
    {
      number: "02",
      title: "Behavior analysis",
      detail: hasDecision
        ? "Repayment behavior evaluated"
        : "Behavior analysis not started",
      status: hasDecision ? "Complete" : "Pending",
    },
    {
      number: "03",
      title: "Risk calculation",
      detail: hasDecision
        ? "Borrower risk profile generated"
        : "Risk profile not generated",
      status: hasDecision ? "Complete" : "Pending",
    },
    {
      number: "04",
      title: "Term generation",
      detail: hasDecision
        ? "Credit terms recommended"
        : "Credit terms pending",
      status: hasDecision ? "Complete" : "Pending",
    },
    {
      number: "05",
      title: "Policy handoff",
      detail: hasDecision
        ? "Decision ready for deterministic RiskGuard checks"
        : "Waiting for AI decision",
      status:
        decisionStatus === "APPROVED" ||
          decisionStatus === "REJECTED"
          ? "Ready"
          : "Pending",
    },
  ];

  const riskBarWidth = (impact: string) => {
    if (impact === "Positive") return "88%";
    if (impact === "Neutral") return "60%";
    return "30%";
  };

  return (
    <main className="min-h-screen bg-[#070a0f] text-zinc-100">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
              Autonomous Intelligence
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              AI Credit Agent
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              An autonomous underwriting engine that evaluates verified
              financial evidence and generates bounded credit recommendations.
            </p>
          </div>

          <div
            className={`rounded-xl border px-4 py-3 ${hasDecision
                ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                : "border-amber-400/20 bg-amber-400/[0.04]"
              }`}
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Agent status
            </div>

            <div
              className={`mt-1 flex items-center gap-2 text-xs ${hasDecision
                  ? "text-emerald-300"
                  : "text-amber-300"
                }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${hasDecision
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                  }`}
              />

              {hasDecision
                ? "Assessment complete"
                : "Awaiting assessment"}
            </div>
          </div>
        </div>

        {/* Decision Overview */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-[#10202a] via-[#0b1118] to-[#0b0f14] p-6 md:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    Autonomous assessment
                  </div>

                  <div
                    className={`mt-3 text-5xl font-semibold tracking-tight ${!hasDecision
                        ? "text-zinc-500"
                        : isApproved
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                  >
                    {aiDecision?.risk ?? "PENDING"}
                  </div>
                </div>

                <div
                  className={`rounded-full border px-3 py-1.5 text-[10px] ${!hasDecision
                      ? "border-zinc-400/20 bg-zinc-400/5 text-zinc-500"
                      : isApproved
                        ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                        : "border-red-400/20 bg-red-400/5 text-red-300"
                    }`}
                >
                  RECOMMENDATION:{" "}
                  {aiDecision?.recommendation ?? "PENDING"}
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <div className="text-[10px] text-zinc-600">
                    Confidence
                  </div>

                  <div className="mt-2 text-2xl font-semibold">
                    {aiDecision?.confidence ?? 0}%
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <div className="text-[10px] text-zinc-600">
                    Recommended credit
                  </div>

                  <div className="mt-2 text-2xl font-semibold">
                    $
                    {aiDecision?.recommendedAmount?.toLocaleString() ??
                      "0"}
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <div className="text-[10px] text-zinc-600">
                    Duration
                  </div>

                  <div className="mt-2 text-2xl font-semibold">
                    {aiDecision?.recommendedDuration ?? 0} days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Identity */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  Agent profile
                </div>

                <div className="mt-1 text-xs text-zinc-600">
                  Autonomous underwriting model
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
                AI
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-zinc-600">
                  Mode
                </span>

                <span className="text-xs text-zinc-400">
                  Autonomous
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-zinc-600">
                  Evidence source
                </span>

                <span
                  className={`text-xs ${isEvidenceVerified
                      ? "text-cyan-300"
                      : "text-zinc-500"
                    }`}
                >
                  {isEvidenceVerified
                    ? "Attestcoin • Verified"
                    : "Attestcoin • Pending"}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-zinc-600">
                  Decision layer
                </span>

                <span className="text-xs text-zinc-400">
                  Risk engine
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-xs text-zinc-600">
                  Execution authority
                </span>

                <span className="text-xs text-emerald-300">
                  RiskGuard bounded
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                Safety constraint
              </div>

              <p className="mt-2 text-[11px] leading-5 text-zinc-600">
                The agent can recommend credit but cannot bypass
                deterministic RiskGuard policies.
              </p>
            </div>
          </div>
        </section>

        {/* Risk Factors */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
          <div>
            <div className="text-sm font-semibold">
              Risk assessment
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              Signals considered by the autonomous credit agent.
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {riskFactors.map((factor) => (
              <div
                key={factor.label}
                className="rounded-xl border border-white/5 bg-black/20 p-5"
              >
                <div className="text-[10px] text-zinc-600">
                  {factor.label}
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="text-sm font-semibold text-zinc-300">
                    {factor.score}
                  </div>

                  <span
                    className={`text-[9px] uppercase tracking-wider ${factor.impact === "Positive"
                        ? "text-emerald-300"
                        : factor.impact === "Neutral"
                          ? "text-amber-300"
                          : "text-red-300"
                      }`}
                  >
                    {factor.impact}
                  </span>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${factor.impact === "Positive"
                        ? "bg-emerald-400/60"
                        : factor.impact === "Neutral"
                          ? "bg-amber-400/60"
                          : "bg-red-400/60"
                      }`}
                    style={{
                      width: riskBarWidth(factor.impact),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reasoning + Terms */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Reasoning */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
            <div className="text-sm font-semibold">
              Decision reasoning
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              Structured explanation of the recommendation.
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.02] p-4">
                <div className="text-xs font-medium text-cyan-300">
                  AI reasoning
                </div>

                <p className="mt-3 text-[11px] leading-6 text-zinc-500">
                  {aiDecision?.reasoning ??
                    "No AI assessment has been completed yet."}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.02] p-4">
                <div className="text-xs font-medium text-emerald-300">
                  Positive signals
                </div>

                <ul className="mt-3 space-y-2 text-[11px] text-zinc-500">
                  <li>
                    • {evidence.repaymentCount} verified successful
                    repayments
                  </li>

                  <li>
                    •{" "}
                    {evidence.failedObligations === 0
                      ? "No failed obligations detected"
                      : `${evidence.failedObligations} failed obligations detected`}
                  </li>

                  <li>
                    • $
                    {evidence.collateral.toLocaleString()} verified
                    collateral
                  </li>

                  <li>
                    • Consistent activity over{" "}
                    {evidence.activityDays} days
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.02] p-4">
                <div className="text-xs font-medium text-amber-300">
                  Risk considerations
                </div>

                <ul className="mt-3 space-y-2 text-[11px] text-zinc-500">
                  <li>
                    • Limited verified borrowing history
                  </li>

                  <li>
                    • Credit exposure should remain bounded
                  </li>

                  <li>
                    • AI recommendations remain subject to
                    deterministic RiskGuard policies
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Terms */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
            <div className="text-sm font-semibold">
              Recommended credit terms
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              Terms generated from verified evidence and risk analysis.
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                [
                  "Credit limit",
                  `$${aiDecision?.recommendedAmount?.toLocaleString() ?? "0"}`,
                ],
                [
                  "Duration",
                  `${aiDecision?.recommendedDuration ?? 0} days`,
                ],
                [
                  "Collateral",
                  `$${application.collateral?.toLocaleString() ?? "0"}`,
                ],
                [
                  "Risk level",
                  aiDecision?.risk ?? "PENDING",
                ],
                [
                  "Confidence",
                  `${aiDecision?.confidence ?? 0}%`,
                ],
                [
                  "Decision",
                  aiDecision?.recommendation ?? "PENDING",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/5 bg-black/20 p-4"
                >
                  <div className="text-[10px] text-zinc-600">
                    {label}
                  </div>

                  <div
                    className={`mt-2 text-sm font-semibold ${label === "Decision"
                        ? value === "APPROVE"
                          ? "text-emerald-300"
                          : value === "REJECT"
                            ? "text-red-300"
                            : "text-zinc-300"
                        : "text-zinc-300"
                      }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={!hasDecision}
              onClick={() => {
                if (!hasDecision) return;
                router.push("/decision");
              }}
              className={`mt-6 w-full rounded-xl border px-5 py-3 text-sm font-medium transition ${hasDecision
                  ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300 hover:bg-emerald-400/10"
                  : "cursor-not-allowed border-white/5 bg-white/[0.02] text-zinc-600"
                }`}
            >
              {hasDecision
                ? "Continue to RiskGuard →"
                : "Waiting for AI assessment"}
            </button>
          </div>
        </section>

        {/* Agent Pipeline */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
          <div>
            <div className="text-sm font-semibold">
              Agent execution pipeline
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              From verified evidence to a bounded credit recommendation.
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            {agentSteps.map((step) => (
              <div
                key={step.number}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/5 font-mono text-[10px] text-cyan-300">
                  {step.number}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-zinc-300">
                    {step.title}
                  </div>

                  <div className="mt-1 text-[10px] text-zinc-600">
                    {step.detail}
                  </div>
                </div>

                <span
                  className={`hidden rounded-md border px-2 py-1 text-[9px] sm:block ${step.status === "Complete"
                      ? "border-emerald-400/10 bg-emerald-400/5 text-emerald-300"
                      : step.status === "Ready"
                        ? "border-cyan-400/10 bg-cyan-400/5 text-cyan-300"
                        : "border-white/5 bg-white/[0.02] text-zinc-600"
                    }`}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}