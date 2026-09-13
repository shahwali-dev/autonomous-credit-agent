export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#090c11]/80 px-5 backdrop-blur-xl md:px-8">
      <div>
        <div className="text-xs text-zinc-500">Credit Intelligence</div>

        <h1 className="mt-1 text-lg font-semibold tracking-tight">
          Autonomous Credit Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-500 sm:block">
          Testnet
        </div>

        <button className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}