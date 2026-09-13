const agentSteps = [
  "Verify cross-chain evidence",
  "Analyze repayment behavior",
  "Calculate risk profile",
  "Generate credit terms",
];

export default function AgentPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">AI Credit Agent</div>

          <div className="mt-1 text-xs text-zinc-600">
            Decision engine
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          READY
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
          Current assessment
        </div>

        <div className="mt-4 text-3xl font-semibold text-zinc-600">
          —
        </div>

        <div className="mt-2 text-xs text-zinc-600">
          Waiting for verified borrower evidence
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {agentSteps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-3 text-xs text-zinc-600"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[10px]">
              {index + 1}
            </span>

            {step}
          </div>
        ))}
      </div>
    </div>
  );
}