import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EvidencePanel from "@/components/dashboard/EvidencePanel";
import AgentPanel from "@/components/dashboard/AgentPanel";
import DecisionPipeline from "@/components/dashboard/DecisionPipeline";
import SystemArchitecture from "@/components/dashboard/SystemArchitecture";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Header />

          <div className="flex-1 p-5 md:p-8">
            <div className="mx-auto max-w-[1500px]">

              {/* Hero */}
              <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1820] via-[#0b1118] to-[#080b10] p-6 md:p-8">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative max-w-3xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    AI-powered cross-chain underwriting
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                    Credit decisions backed by
                    <span className="text-cyan-300"> verified evidence.</span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                    The Autonomous Credit Agent analyzes cryptographically
                    verified cross-chain financial activity, evaluates risk,
                    and executes bounded credit decisions on Creditcoin.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200">
                      Start Credit Assessment
                    </button>

                    <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10">
                      Explore Evidence
                    </button>
                  </div>
                </div>
              </section>

              <StatsGrid />

              <section className="mt-6 grid gap-6 xl:grid-cols-3">
                <EvidencePanel />
                <AgentPanel />
              </section>

              <section className="mt-6 grid gap-6 md:grid-cols-2">
                <DecisionPipeline />
                <SystemArchitecture />
              </section>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}