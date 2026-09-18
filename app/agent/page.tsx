"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock3,
  Database,
  ExternalLink,
  Fingerprint,
  Gauge,
  LockKeyhole,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

import { useCreditStore } from "@/lib/store/credit-store";
import { generateRiskDecision } from "@/agent/risk-engine";

const CREDITCOIN_EXPLORER =
  "https://creditcoin-testnet.blockscout.com";

const SEPOLIA_EXPLORER =
  "https://eth-sepolia.blockscout.com";

type SignalImpact = "Positive" | "Neutral" | "Negative";

type RiskFactor = {
  label: string;
  value: string;
  impact: SignalImpact;
  description: string;
  strength: number;
};

type PipelineStep = {
  number: string;
  title: string;
  detail: string;
  layer: string;
  status: "Complete" | "Ready" | "Pending";
};

function formatCurrency(value: number | undefined | null) {
  return `$${(value ?? 0).toLocaleString()}`;
}

function shortenAddress(address: string | null | undefined) {
  if (!address) return "Not connected";
  if (address.length < 12) return address;

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function getImpactClass(impact: SignalImpact) {
  if (impact === "Positive") {
    return {
      text: "text-emerald-300",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/15",
      bar: "bg-emerald-400",
    };
  }

  if (impact === "Neutral") {
    return {
      text: "text-amber-300",
      bg: "bg-amber-400/10",
      border: "border-amber-400/15",
      bar: "bg-amber-400",
    };
  }

  return {
    text: "text-red-300",
    bg: "bg-red-400/10",
    border: "border-red-400/15",
    bar: "bg-red-400",
  };
}

export default function AgentPage() {
  const router = useRouter();

  const aiDecision = useCreditStore((state) => state.aiDecision);
  const application = useCreditStore((state) => state.application);
  const evidence = useCreditStore((state) => state.evidence);
  const decisionStatus = useCreditStore((state) => state.decisionStatus);
  const setAIDecision = useCreditStore((state) => state.setAIDecision);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);

  const isEvidenceVerified = Boolean(evidence.verified);
  const hasDecision = Boolean(aiDecision);
  const isApproved = aiDecision?.recommendation === "APPROVE";

  /*
   * The AI decision is generated from the application's verified
   * evidence state. This keeps the frontend aligned with the actual
   * risk-engine implementation rather than inventing a separate
   * decision model for the visual layer.
   */
  useEffect(() => {
    if (!isEvidenceVerified) {
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
      aiDecision.recommendation !== decision.recommendation;

    if (decisionChanged) {
      setAIDecision(decision);
    }
  }, [
    evidence,
    application,
    aiDecision,
    setAIDecision,
    isEvidenceVerified,
  ]);

  /*
   * Visual analysis sequence.
   *
   * This is deliberately presentation-only. It does not claim that
   * blockchain transactions are happening during the animation.
   * Actual verification / execution remains handled by the existing
   * application flow.
   */
  useEffect(() => {
    if (!isAnalyzing) {
      setAnalysisStage(0);
      return;
    }

    const timers = [
      window.setTimeout(() => setAnalysisStage(1), 450),
      window.setTimeout(() => setAnalysisStage(2), 1000),
      window.setTimeout(() => setAnalysisStage(3), 1550),
      window.setTimeout(() => setAnalysisStage(4), 2100),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isAnalyzing]);

  const riskFactors = useMemo<RiskFactor[]>(
    () => [
      {
        label: "Repayment behavior",
        value:
          evidence.repaymentCount > 5
            ? "Strong"
            : evidence.repaymentCount > 2
              ? "Moderate"
              : "Developing",
        impact:
          evidence.repaymentCount > 2
            ? "Positive"
            : "Neutral",
        description: `${evidence.repaymentCount} successful repayment events observed`,
        strength:
          evidence.repaymentCount > 5
            ? 92
            : evidence.repaymentCount > 2
              ? 72
              : 48,
      },
      {
        label: "Obligation history",
        value:
          evidence.failedObligations === 0
            ? "Clean"
            : `${evidence.failedObligations} detected`,
        impact:
          evidence.failedObligations === 0
            ? "Positive"
            : "Negative",
        description:
          evidence.failedObligations === 0
            ? "No failed obligations detected"
            : "Historical obligation failures require additional caution",
        strength:
          evidence.failedObligations === 0
            ? 96
            : Math.max(
              20,
              80 - evidence.failedObligations * 15
            ),
      },
      {
        label: "Collateral strength",
        value: formatCurrency(evidence.collateral),
        impact:
          evidence.collateral >=
            (aiDecision?.recommendedAmount ??
              application.requestedAmount) *
            0.5
            ? "Positive"
            : "Negative",
        description: "Verified collateral available to support exposure",
        strength:
          evidence.collateral >=
            (aiDecision?.recommendedAmount ??
              application.requestedAmount) *
            0.5
            ? 88
            : 34,
      },
      {
        label: "Financial activity",
        value: `${evidence.activityDays} days`,
        impact:
          evidence.activityDays >= 30
            ? "Positive"
            : evidence.activityDays > 0
              ? "Neutral"
              : "Negative",
        description: "Observed activity period on the source chain",
        strength:
          evidence.activityDays >= 30
            ? 86
            : evidence.activityDays > 0
              ? 58
              : 25,
      },
    ],
    [evidence, aiDecision, application.requestedAmount]
  );

  const pipelineSteps = useMemo<PipelineStep[]>(
    () => [
      {
        number: "01",
        title: "Source evidence",
        detail: "Financial activity detected on Ethereum Sepolia",
        layer: "SOURCE CHAIN",
        status: isEvidenceVerified ? "Complete" : "Pending",
      },
      {
        number: "02",
        title: "Attestcoin verification",
        detail: isEvidenceVerified
          ? "Cryptographically verified evidence available"
          : "Waiting for verified cross-chain evidence",
        layer: "TRUST LAYER",
        status: isEvidenceVerified
          ? "Complete"
          : "Pending",
      },
      {
        number: "03",
        title: "AI underwriting",
        detail: hasDecision
          ? "Risk profile and credit terms generated"
          : "Risk engine waiting for evidence",
        layer: "INTELLIGENCE",
        status: hasDecision ? "Complete" : "Pending",
      },
      {
        number: "04",
        title: "RiskGuard",
        detail: hasDecision
          ? "Decision ready for deterministic policy validation"
          : "Waiting for AI recommendation",
        layer: "SAFETY",
        status:
          decisionStatus === "APPROVED" ||
            decisionStatus === "REJECTED"
            ? "Ready"
            : "Pending",
      },
      {
        number: "05",
        title: "Creditcoin execution",
        detail: "Validated credit action on the execution layer",
        layer: "EXECUTION",
        status: "Pending",
      },
    ],
    [
      isEvidenceVerified,
      hasDecision,
      decisionStatus,
    ]
  );

  const agentMetrics = [
    {
      label: "Evidence confidence",
      value: isEvidenceVerified ? "Verified" : "Pending",
      icon: Fingerprint,
      tone: isEvidenceVerified
        ? "text-emerald-300"
        : "text-amber-300",
    },
    {
      label: "Risk model",
      value: aiDecision?.risk ?? "Pending",
      icon: Gauge,
      tone: hasDecision
        ? "text-cyan-300"
        : "text-zinc-500",
    },
    {
      label: "Decision confidence",
      value: hasDecision
        ? `${aiDecision?.confidence ?? 0}%`
        : "—",
      icon: BrainCircuit,
      tone: hasDecision
        ? "text-violet-300"
        : "text-zinc-500",
    },
    {
      label: "Execution boundary",
      value: "RiskGuard",
      icon: LockKeyhole,
      tone: "text-emerald-300",
    },
  ];

  const analysisMessages = [
    "Initializing underwriting engine",
    "Reading verified cross-chain evidence",
    "Evaluating borrower behavior",
    "Generating bounded credit recommendation",
  ];

  const handleRunAnalysis = () => {
    if (!isEvidenceVerified) {
      router.push("/evidence");
      return;
    }

    if (hasDecision) {
      router.push("/decision");
      return;
    }

    setIsAnalyzing(true);

    window.setTimeout(() => {
      setIsAnalyzing(false);
    }, 2500);
  };

  const statusLabel = isAnalyzing
    ? "PROCESSING"
    : hasDecision
      ? "ASSESSMENT READY"
      : isEvidenceVerified
        ? "READY TO ANALYZE"
        : "WAITING FOR EVIDENCE";

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-zinc-100">
      {/* Ambient system glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[8%] top-[8%] h-72 w-72 rounded-full bg-cyan-400/[0.055] blur-[110px]" />
        <div className="absolute right-[5%] top-[28%] h-96 w-96 rounded-full bg-violet-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-[5%] left-[35%] h-80 w-80 rounded-full bg-emerald-400/[0.035] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* ─────────────────────────────────────────────────────
            TOP SYSTEM BAR
        ───────────────────────────────────────────────────── */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#080b10]/90 px-4 py-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06]">
              <BrainCircuit className="h-4 w-4 text-cyan-300" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Autonomous Credit Infrastructure
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                Agent Core
              </div>

              <div className="mt-0.5 font-mono text-[10px] text-zinc-700">
                ACA-001 / UNDERWRITING-ENGINE
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[9px] uppercase tracking-[0.16em] text-emerald-300">
                {statusLabel}
              </span>
            </div>

            <div className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] text-zinc-600">
              TESTNET
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            PAGE HEADER
        ───────────────────────────────────────────────────── */}
        <header className="flex flex-col justify-between gap-7 xl:flex-row xl:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-cyan-300/70">
              <Sparkles className="h-3 w-3" />
              Autonomous intelligence
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[54px]">
              AI Credit Agent
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-[15px]">
              A bounded underwriting engine that transforms
              cryptographically verified financial evidence into
              explainable credit recommendations.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`${SEPOLIA_EXPLORER}/address/${application.walletAddress ?? ""}`}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs transition ${application.walletAddress
                  ? "border-white/[0.08] bg-white/[0.025] text-zinc-400 hover:border-cyan-400/20 hover:text-cyan-300"
                  : "pointer-events-none border-white/[0.05] bg-white/[0.015] text-zinc-700"
                }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              {shortenAddress(application.walletAddress)}
              {application.walletAddress && (
                <ExternalLink className="h-3 w-3 opacity-50 transition group-hover:opacity-100" />
              )}
            </a>

            <button
              onClick={handleRunAnalysis}
              className="group flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2.5 text-xs font-medium text-cyan-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.11]"
            >
              {isAnalyzing ? (
                <>
                  <ScanLine className="h-3.5 w-3.5 animate-pulse" />
                  Running analysis
                </>
              ) : hasDecision ? (
                <>
                  Review decision
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </>
              ) : isEvidenceVerified ? (
                <>
                  Run assessment
                  <Zap className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Verify evidence
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────
            ANALYSIS CONSOLE
        ───────────────────────────────────────────────────── */}
        {isAnalyzing && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#081016]">
            <div className="flex items-center gap-4 border-b border-white/[0.06] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-zinc-200">
                    Autonomous assessment in progress
                  </div>

                  <div className="font-mono text-[10px] text-cyan-300">
                    {Math.min(analysisStage * 25, 100)}%
                  </div>
                </div>

                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        analysisStage * 25,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-white/[0.04] sm:grid-cols-4">
              {analysisMessages.map((message, index) => {
                const complete = analysisStage > index;
                const active = analysisStage === index;

                return (
                  <div
                    key={message}
                    className="bg-[#081016] px-4 py-4"
                  >
                    <div className="flex items-center gap-2">
                      {complete ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      ) : active ? (
                        <CircleDashed className="h-3.5 w-3.5 animate-spin text-cyan-300" />
                      ) : (
                        <Clock3 className="h-3.5 w-3.5 text-zinc-700" />
                      )}

                      <span
                        className={`text-[10px] ${complete
                            ? "text-emerald-300"
                            : active
                              ? "text-cyan-300"
                              : "text-zinc-700"
                          }`}
                      >
                        {message}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────
            SYSTEM METRICS
        ───────────────────────────────────────────────────── */}
        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {agentMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="group rounded-2xl border border-white/[0.07] bg-[#090c11] p-4 transition hover:border-white/[0.11]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    {metric.label}
                  </span>

                  <Icon
                    className={`h-3.5 w-3.5 ${metric.tone}`}
                  />
                </div>

                <div
                  className={`mt-3 text-lg font-semibold tracking-tight ${metric.tone}`}
                >
                  {metric.value}
                </div>
              </div>
            );
          })}
        </section>

        {/* ─────────────────────────────────────────────────────
            MAIN INTELLIGENCE GRID
        ───────────────────────────────────────────────────── */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.55fr)]">
          {/* Decision Core */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-[#0d1a21] via-[#0a1016] to-[#080b10]">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-400/[0.035] blur-[100px]" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    <BrainCircuit className="h-3.5 w-3.5 text-cyan-300/70" />
                    Decision core
                  </div>

                  <div className="mt-2 text-xs text-zinc-500">
                    Autonomous underwriting output
                  </div>
                </div>

                <div
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] ${!hasDecision
                      ? "border-zinc-400/10 bg-zinc-400/[0.03] text-zinc-600"
                      : isApproved
                        ? "border-emerald-400/15 bg-emerald-400/[0.045] text-emerald-300"
                        : "border-red-400/15 bg-red-400/[0.045] text-red-300"
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${!hasDecision
                        ? "bg-zinc-600"
                        : isApproved
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                  />

                  {hasDecision
                    ? "Decision generated"
                    : "Decision pending"}
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                {/* AI score */}
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Risk classification
                  </div>

                  <div
                    className={`mt-2 text-6xl font-semibold tracking-[-0.055em] sm:text-7xl ${!hasDecision
                        ? "text-zinc-600"
                        : aiDecision?.risk === "LOW"
                          ? "text-emerald-300"
                          : aiDecision?.risk === "MEDIUM"
                            ? "text-amber-300"
                            : "text-red-300"
                      }`}
                  >
                    {aiDecision?.risk ?? "PENDING"}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-lg border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] ${!hasDecision
                          ? "border-white/[0.06] bg-white/[0.02] text-zinc-600"
                          : isApproved
                            ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300"
                            : "border-red-400/15 bg-red-400/[0.05] text-red-300"
                        }`}
                    >
                      Recommendation:{" "}
                      {aiDecision?.recommendation ?? "PENDING"}
                    </span>

                    {isEvidenceVerified && (
                      <span className="flex items-center gap-1.5 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.035] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] text-cyan-300">
                        <Fingerprint className="h-3 w-3" />
                        Verified evidence
                      </span>
                    )}
                  </div>
                </div>

                {/* Confidence ring */}
                <div className="relative flex h-44 w-44 items-center justify-center self-center rounded-full border border-cyan-400/10 bg-[#071016] shadow-[0_0_70px_rgba(34,211,238,0.05)]">
                  <div className="absolute inset-3 rounded-full border border-cyan-400/[0.08]" />
                  <div className="absolute inset-7 rounded-full border border-dashed border-cyan-400/[0.09]" />

                  <div className="text-center">
                    <div className="font-mono text-4xl font-semibold tracking-tight text-white">
                      {aiDecision?.confidence ?? 0}
                      <span className="text-lg text-cyan-300">
                        %
                      </span>
                    </div>

                    <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                      confidence
                    </div>
                  </div>

                  <div className="absolute -right-1 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/20 bg-[#071016]">
                    <Sparkles className="h-3 w-3 text-cyan-300" />
                  </div>
                </div>
              </div>

              {/* Decision metrics */}
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.05] sm:grid-cols-3">
                <div className="bg-black/20 p-5">
                  <div className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    Recommended credit
                  </div>

                  <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {formatCurrency(
                      aiDecision?.recommendedAmount
                    )}
                  </div>

                  <div className="mt-1 text-[10px] text-zinc-700">
                    AI-generated credit limit
                  </div>
                </div>

                <div className="bg-black/20 p-5">
                  <div className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    Duration
                  </div>

                  <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {aiDecision?.recommendedDuration ?? 0}
                    <span className="ml-1 text-sm font-normal text-zinc-600">
                      days
                    </span>
                  </div>

                  <div className="mt-1 text-[10px] text-zinc-700">
                    Recommended repayment window
                  </div>
                </div>

                <div className="bg-black/20 p-5">
                  <div className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                    Requested
                  </div>

                  <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {formatCurrency(
                      application.requestedAmount
                    )}
                  </div>

                  <div className="mt-1 text-[10px] text-zinc-700">
                    Original application amount
                  </div>
                </div>
              </div>

              {/* Bounded autonomy banner */}
              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04]">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  </div>

                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                      Bounded autonomy
                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-zinc-600">
                      AI proposes terms. Deterministic RiskGuard
                      policies remain the execution boundary.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-zinc-600">
                  <LockKeyhole className="h-3 w-3 text-emerald-300/70" />
                  Policy protected
                </div>
              </div>
            </div>
          </div>

          {/* Agent Identity */}
          <aside className="rounded-3xl border border-white/[0.07] bg-[#090c11] p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  <Fingerprint className="h-3.5 w-3.5 text-violet-300/70" />
                  Agent identity
                </div>

                <h2 className="mt-2 text-lg font-semibold tracking-tight text-zinc-200">
                  Underwriting Core
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.06]">
                <BrainCircuit className="h-5 w-5 text-violet-300" />
              </div>
            </div>

            <div className="mt-7 space-y-0">
              <div className="flex items-center justify-between border-b border-white/[0.05] py-4">
                <span className="text-[10px] text-zinc-600">
                  Mode
                </span>
                <span className="text-[10px] font-medium text-zinc-300">
                  Autonomous
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.05] py-4">
                <span className="text-[10px] text-zinc-600">
                  Evidence
                </span>

                <span
                  className={`flex items-center gap-1.5 text-[10px] ${isEvidenceVerified
                      ? "text-emerald-300"
                      : "text-amber-300"
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isEvidenceVerified
                        ? "bg-emerald-400"
                        : "bg-amber-400"
                      }`}
                  />
                  {isEvidenceVerified
                    ? "Attestcoin verified"
                    : "Awaiting verification"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.05] py-4">
                <span className="text-[10px] text-zinc-600">
                  Intelligence
                </span>

                <span className="text-[10px] font-medium text-cyan-300">
                  Risk engine
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.05] py-4">
                <span className="text-[10px] text-zinc-600">
                  Safety
                </span>

                <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                  <LockKeyhole className="h-3 w-3" />
                  RiskGuard
                </span>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-[10px] text-zinc-600">
                  Execution
                </span>

                <span className="text-[10px] font-medium text-zinc-400">
                  Creditcoin
                </span>
              </div>
            </div>

            {/* Trust architecture */}
            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
              <div className="text-[9px] uppercase tracking-[0.16em] text-zinc-700">
                Trust architecture
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/[0.06]">
                    <Database className="h-3.5 w-3.5 text-cyan-300" />
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] text-zinc-400">
                      Source chain
                    </div>
                    <div className="text-[9px] text-zinc-700">
                      Ethereum Sepolia
                    </div>
                  </div>

                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${isEvidenceVerified
                        ? "text-emerald-300"
                        : "text-zinc-700"
                      }`}
                  />
                </div>

                <div className="ml-3 h-3 border-l border-dashed border-white/[0.08]" />

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/[0.06]">
                    <Fingerprint className="h-3.5 w-3.5 text-violet-300" />
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] text-zinc-400">
                      Verification
                    </div>
                    <div className="text-[9px] text-zinc-700">
                      Attestcoin
                    </div>
                  </div>

                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${isEvidenceVerified
                        ? "text-emerald-300"
                        : "text-zinc-700"
                      }`}
                  />
                </div>

                <div className="ml-3 h-3 border-l border-dashed border-white/[0.08]" />

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/[0.06]">
                    <Network className="h-3.5 w-3.5 text-emerald-300" />
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] text-zinc-400">
                      Execution
                    </div>
                    <div className="text-[9px] text-zinc-700">
                      Creditcoin
                    </div>
                  </div>

                  <CircleDashed className="h-3.5 w-3.5 text-zinc-700" />
                </div>
              </div>
            </div>
          </aside>
        </section>
        {/* ─────────────────────────────────────────────────────
            RISK SIGNAL MATRIX
        ───────────────────────────────────────────────────── */}
        <section className="mt-6 rounded-3xl border border-white/[0.07] bg-[#090c11] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                <Gauge className="h-3.5 w-3.5 text-cyan-300/70" />
                Risk signal matrix
              </div>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-200">
                Evidence-based assessment
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Signals extracted from verified financial history.
              </p>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-zinc-600">
              AI interpretation layer
            </div>
          </div>


          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {riskFactors.map((factor) => {
              const style = getImpactClass(
                factor.impact
              );

              return (
                <div
                  key={factor.label}
                  className="rounded-2xl border border-white/[0.06] bg-black/20 p-5 transition hover:border-white/[0.12]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                        {factor.label}
                      </div>

                      <div className="mt-3 text-xl font-semibold text-zinc-200">
                        {factor.value}
                      </div>
                    </div>


                    <span
                      className={`rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.14em] ${style.bg} ${style.border} ${style.text}`}
                    >
                      {factor.impact}
                    </span>
                  </div>


                  <p className="mt-4 text-[10px] leading-5 text-zinc-600">
                    {factor.description}
                  </p>


                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-[9px] text-zinc-700">
                      <span>
                        Signal strength
                      </span>

                      <span>
                        {factor.strength}%
                      </span>
                    </div>


                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full ${style.bar}`}
                        style={{
                          width: `${factor.strength}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ─────────────────────────────────────────────────────
            AI REASONING
        ───────────────────────────────────────────────────── */}
        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <div className="rounded-3xl border border-white/[0.07] bg-[#090c11] p-6 sm:p-8">

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              <BrainCircuit className="h-3.5 w-3.5 text-violet-300" />
              AI reasoning trace
            </div>


            <h2 className="mt-3 text-xl font-semibold text-zinc-200">
              Explainable decision intelligence
            </h2>


            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5">

              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

                <span className="text-[10px] uppercase tracking-[0.15em] text-cyan-300">
                  Model explanation
                </span>
              </div>


              <p className="mt-4 text-xs leading-7 text-zinc-500">
                {aiDecision?.reasoning ??
                  "Waiting for verified evidence before generating AI reasoning."}
              </p>

            </div>


            <div className="mt-4 grid gap-3">

              <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4">

                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-emerald-300">
                  <Check className="h-3 w-3" />
                  Positive indicators
                </div>


                <ul className="mt-3 space-y-2 text-[11px] text-zinc-600">

                  <li>
                    • {evidence.repaymentCount} verified repayment events
                  </li>

                  <li>
                    • {evidence.failedObligations === 0
                      ? "No failed obligations detected"
                      : `${evidence.failedObligations} failed obligations`}
                  </li>

                  <li>
                    • {formatCurrency(evidence.collateral)} verified collateral
                  </li>

                  <li>
                    • {evidence.activityDays} days source-chain activity
                  </li>

                </ul>

              </div>



              <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.025] p-4">

                <div className="text-[10px] uppercase tracking-[0.15em] text-amber-300">
                  Model limitations
                </div>


                <ul className="mt-3 space-y-2 text-[11px] text-zinc-600">

                  <li>
                    • AI recommendations are bounded
                  </li>

                  <li>
                    • RiskGuard remains final policy layer
                  </li>

                  <li>
                    • Execution requires validated conditions
                  </li>

                </ul>

              </div>

            </div>

          </div>





          {/* CREDIT TERMS */}

          <div className="rounded-3xl border border-white/[0.07] bg-[#090c11] p-6 sm:p-8">


            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              <Zap className="h-3.5 w-3.5 text-emerald-300" />
              Generated credit terms
            </div>


            <h2 className="mt-3 text-xl font-semibold text-zinc-200">
              Autonomous recommendation
            </h2>



            <div className="mt-6 grid gap-3 sm:grid-cols-2">


              {[
                [
                  "Credit limit",
                  formatCurrency(
                    aiDecision?.recommendedAmount
                  ),
                ],

                [
                  "Duration",
                  `${aiDecision?.recommendedDuration ?? 0} days`,
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

                [
                  "Collateral",
                  formatCurrency(
                    application.collateral
                  ),
                ],

              ].map(([label, value]) => (

                <div
                  key={label}
                  className="rounded-xl border border-white/[0.06] bg-black/20 p-4"
                >

                  <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-700">
                    {label}
                  </div>


                  <div className="mt-2 text-lg font-semibold text-zinc-200">
                    {value}
                  </div>

                </div>

              ))}

            </div>



            <button

              disabled={!hasDecision}

              onClick={() => {
                if (hasDecision) {
                  router.push("/decision");
                }
              }}

              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition ${hasDecision
                  ? "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300 hover:bg-cyan-400/[0.1]"
                  : "cursor-not-allowed border-white/[0.05] text-zinc-700"
                }`}
            >

              Continue to RiskGuard

              <ChevronRight className="h-4 w-4" />

            </button>


          </div>

        </section>



        {/* ─────────────────────────────────────────────────────
            AUTONOMOUS PIPELINE
        ───────────────────────────────────────────────────── */}


        <section className="mt-6 rounded-3xl border border-white/[0.07] bg-[#090c11] p-6 sm:p-8">


          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">

            <Network className="h-3.5 w-3.5 text-cyan-300" />

            Autonomous execution pipeline

          </div>



          <h2 className="mt-3 text-xl font-semibold text-zinc-200">
            From evidence to execution
          </h2>



          <div className="mt-7 space-y-3">


            {pipelineSteps.map((step) => (
              <div
                key={step.number}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-black/20 p-4"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] font-mono text-xs text-cyan-300">

                  {step.number}

                </div>



                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-sm font-medium text-zinc-300">
                      {step.title}
                    </span>


                    <span className="rounded-md border border-white/[0.05] px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] text-zinc-700">
                      {step.layer}
                    </span>

                  </div>


                  <p className="mt-1 text-[10px] text-zinc-600">
                    {step.detail}
                  </p>

                </div>



                <span
                  className={`rounded-lg border px-2 py-1 text-[9px] uppercase tracking-[0.15em] ${step.status === "Complete"
                      ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300"
                      : step.status === "Ready"
                        ? "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-300"
                        : "border-white/[0.05] text-zinc-700"
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