const evidence = [
  {
    label: "Repayment History",
    value: "—",
  },
  {
    label: "Verified Collateral",
    value: "$0",
  },
  {
    label: "Financial Activity",
    value: "—",
  },
];

export default function EvidencePanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 xl:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">
            Verified Cross-Chain Evidence
          </div>

          <div className="mt-1 text-xs text-zinc-600">
            Attestcoin evidence layer
          </div>
        </div>

        <span className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 text-[10px] text-amber-300">
          NO DATA
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {evidence.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/5 bg-black/20 p-4"
          >
            <div className="text-[11px] text-zinc-600">{item.label}</div>

            <div className="mt-3 text-xl font-semibold text-zinc-300">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-white/10 p-5 text-center">
        <div className="text-sm text-zinc-500">
          Connect a wallet and submit an application to begin evidence
          verification.
        </div>
      </div>
    </div>
  );
}