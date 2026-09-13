const architecture = [
  ["01", "Source Chain", "Financial activity"],
  ["02", "Attestcoin", "Cryptographic verification"],
  ["03", "AI Agent", "Risk intelligence"],
  ["04", "RiskGuard", "Deterministic safety"],
  ["05", "Creditcoin", "Credit execution"],
];

export default function SystemArchitecture() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
      <div className="text-sm font-semibold">System Architecture</div>

      <div className="mt-5 grid gap-3">
        {architecture.map(([number, title, detail]) => (
          <div
            key={number}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-black/20 p-3"
          >
            <div className="font-mono text-[10px] text-cyan-400/60">
              {number}
            </div>

            <div>
              <div className="text-xs font-medium text-zinc-300">
                {title}
              </div>

              <div className="mt-0.5 text-[10px] text-zinc-600">
                {detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}