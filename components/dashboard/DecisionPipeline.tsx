const pipeline = [
  ["01", "Cross-chain data", "Pending"],
  ["02", "Attestcoin verification", "Pending"],
  ["03", "AI risk assessment", "Pending"],
  ["04", "RiskGuard policy", "Pending"],
  ["05", "Creditcoin execution", "Pending"],
];

export default function DecisionPipeline() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
      <div className="text-sm font-semibold">Decision Pipeline</div>

      <div className="mt-5 space-y-4">
        {pipeline.map(([number, label, status]) => (
          <div
            key={number}
            className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
          >
            <span className="font-mono text-[10px] text-zinc-700">
              {number}
            </span>

            <span className="flex-1 text-xs text-zinc-500">
              {label}
            </span>

            <span className="text-[10px] uppercase text-zinc-700">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}