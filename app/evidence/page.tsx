"use client";

import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

const activity = [
  ["01", "Repayment #8", "2 days ago", "$250", "Verified"],
  ["02", "Repayment #7", "14 days ago", "$250", "Verified"],
  ["03", "Repayment #6", "27 days ago", "$250", "Verified"],
  ["04", "Collateral deposit", "41 days ago", "$1,500", "Verified"],
];

const verificationSteps = [
  [
    "01",
    "Source event detected",
    "Financial activity event identified",
  ],
  [
    "02",
    "Proof submitted",
    "Attestcoin verification requested",
  ],
  [
    "03",
    "Cryptographic verification",
    "Evidence validated",
  ],
  [
    "04",
    "Credit evidence created",
    "Evidence available to AI agent",
  ],
];

export default function EvidencePage() {
  const router = useRouter();

  const evidenceState = useCreditStore(
    (state) => state.evidence
  );

  const setEvidence = useCreditStore(
    (state) => state.setEvidence
  );

  const evidence = [
    {
      title: "Repayment History",
      value: `${evidenceState.repaymentCount} / ${
        evidenceState.repaymentCount
      }`,
      detail: "Successful repayments",
      status: evidenceState.verified
        ? "VERIFIED"
        : "PENDING",
    },
    {
      title: "Verified Collateral",
      value: `$${evidenceState.collateral.toLocaleString()}`,
      detail: "Cross-chain collateral",
      status: evidenceState.verified
        ? "VERIFIED"
        : "PENDING",
    },
    {
      title: "Financial Activity",
      value: `${evidenceState.activityDays} days`,
      detail: "Observed activity period",
      status: evidenceState.verified
        ? "VERIFIED"
        : "PENDING",
    },
  ];

  const handleAnalyze = () => {
    setEvidence({
      verified: true,
      proofHash:
        evidenceState.proofHash ||
        "0x8f24...a91c...73de...4b21",
    });

    router.push("/agent");
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">
              Evidence Intelligence
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Verified financial evidence
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              Cross-chain financial activity verified through
              the Attestcoin evidence layer and prepared for
              autonomous credit assessment.
            </p>
          </div>

          <div
            className={`rounded-xl border px-4 py-3 ${
              evidenceState.verified
                ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                : "border-amber-400/20 bg-amber-400/[0.04]"
            }`}
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Verification status
            </div>

            <div
              className={`mt-1 flex items-center gap-2 text-xs ${
                evidenceState.verified
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  evidenceState.verified
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />

              {evidenceState.verified
                ? "Evidence verified"
                : "Verification pending"}
            </div>
          </div>
        </div>

        {/* Evidence Summary */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {evidence.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-500">
                  {item.title}
                </div>

                <span
                  className={`rounded-md border px-2 py-1 text-[9px] ${
                    item.status === "VERIFIED"
                      ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                      : "border-amber-400/20 bg-amber-400/5 text-amber-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 text-3xl font-semibold tracking-tight">
                {item.value}
              </div>

              <div className="mt-2 text-[11px] text-zinc-600">
                {item.detail}
              </div>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Activity */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">
                  Verified activity
                </div>

                <div className="mt-1 text-xs text-zinc-600">
                  Financial events used as credit evidence
                </div>
              </div>

              <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-[10px] text-cyan-300">
                4 EVENTS
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/5">
              <div className="grid grid-cols-[40px_1fr_110px_100px_80px] gap-3 border-b border-white/5 bg-black/20 px-4 py-3 text-[9px] uppercase tracking-wider text-zinc-700">
                <span>#</span>
                <span>Event</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
              </div>

              {activity.map(
                ([
                  number,
                  event,
                  date,
                  amount,
                  status,
                ]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[40px_1fr_110px_100px_80px] gap-3 border-b border-white/5 px-4 py-4 last:border-0"
                  >
                    <span className="font-mono text-[10px] text-zinc-700">
                      {number}
                    </span>

                    <span className="text-xs text-zinc-400">
                      {event}
                    </span>

                    <span className="text-[10px] text-zinc-600">
                      {date}
                    </span>

                    <span className="font-mono text-[10px] text-zinc-400">
                      {amount}
                    </span>

                    <span className="flex items-center gap-1.5 text-[9px] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {status}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Attestcoin */}
          <div className="rounded-2xl border border-cyan-400/10 bg-[#0b0f14] p-6">
            <div className="text-sm font-semibold">
              Attestcoin verification
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              Evidence provenance
            </div>

            <div className="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                Cryptographic proof
              </div>

              <div className="mt-4 break-all font-mono text-[10px] leading-5 text-zinc-600">
                {evidenceState.proofHash ||
                  "Proof pending Attestcoin verification"}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] text-zinc-600">
                  Verification
                </span>

                <span
                  className={`text-[10px] font-medium ${
                    evidenceState.verified
                      ? "text-emerald-300"
                      : "text-amber-300"
                  }`}
                >
                  {evidenceState.verified
                    ? "VALID"
                    : "PENDING"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-600">
                  Source chain
                </span>

                <span className="text-zinc-400">
                  Ethereum Sepolia
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-zinc-600">
                  Evidence type
                </span>

                <span className="text-zinc-400">
                  Financial activity
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-zinc-600">
                  Integrity
                </span>

                <span
                  className={
                    evidenceState.verified
                      ? "text-emerald-300"
                      : "text-amber-300"
                  }
                >
                  {evidenceState.verified
                    ? "Verified"
                    : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Timeline */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
          <div>
            <div className="text-sm font-semibold">
              Verification pipeline
            </div>

            <div className="mt-1 text-xs text-zinc-600">
              How financial activity becomes trusted credit
              evidence
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {verificationSteps.map(
              ([number, title, detail], index) => (
                <div key={number} className="relative">
                  <div className="rounded-xl border border-white/5 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-cyan-400/60">
                        {number}
                      </span>

                      <span
                        className={`h-2 w-2 rounded-full ${
                          evidenceState.verified
                            ? "bg-emerald-400"
                            : index === 0
                              ? "bg-emerald-400"
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
                  </div>

                  {index <
                    verificationSteps.length - 1 && (
                    <div className="absolute right-[-10px] top-1/2 hidden text-zinc-700 md:block">
                      →
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* AI Handoff */}
        <section className="mt-6 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.04] to-transparent p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                {evidenceState.verified
                  ? "Evidence verified"
                  : "Ready for verification"}
              </div>

              <h2 className="mt-2 text-xl font-semibold">
                {evidenceState.verified
                  ? "Verified evidence is ready for the Credit Agent."
                  : "Verify evidence before AI assessment."}
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-zinc-600">
                {evidenceState.verified
                  ? "The evidence can now be consumed by the autonomous Credit Agent to generate recommended credit terms."
                  : "The demo verification flow will mark the cross-chain financial evidence as verified and hand it to the Credit Agent."}
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              className="shrink-0 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              {evidenceState.verified
                ? "Continue to AI Agent →"
                : "Verify & Analyze with AI →"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}