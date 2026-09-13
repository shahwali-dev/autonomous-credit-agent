const stats = [
  {
    label: "Credit Health",
    value: "—",
    detail: "Awaiting verified evidence",
  },
  {
    label: "Verified Evidence",
    value: "0",
    detail: "Cross-chain attestations",
  },
  {
    label: "Available Credit",
    value: "$0",
    detail: "No active credit line",
  },
  {
    label: "Agent Status",
    value: "READY",
    detail: "Waiting for application",
  },
];

export default function StatsGrid() {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-[#0b0f14] p-5"
        >
          <div className="text-xs text-zinc-500">{stat.label}</div>

          <div className="mt-3 text-2xl font-semibold tracking-tight">
            {stat.value}
          </div>

          <div className="mt-2 text-[11px] text-zinc-600">
            {stat.detail}
          </div>
        </div>
      ))}
    </section>
  );
}