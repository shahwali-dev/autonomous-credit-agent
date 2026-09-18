import Link from "next/link";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EvidencePanel from "@/components/dashboard/EvidencePanel";
import AgentPanel from "@/components/dashboard/AgentPanel";
import DecisionPipeline from "@/components/dashboard/DecisionPipeline";
import SystemArchitecture from "@/components/dashboard/SystemArchitecture";

const trustLayers = [
  {
    title: "Source Chain",
    value: "Ethereum Sepolia",
    description: "Verified borrower activity",
  },
  {
    title: "Trust Layer",
    value: "Attestcoin",
    description: "Cryptographic evidence verification",
  },
  {
    title: "Execution",
    value: "Creditcoin",
    description: "On-chain credit infrastructure",
  },
];

const liveSignals = [
  {
    label: "Agent Status",
    value: "ONLINE",
    color: "text-emerald-300",
  },
  {
    label: "Evidence Layer",
    value: "VERIFIED",
    color: "text-cyan-300",
  },
  {
    label: "Network",
    value: "TESTNET",
    color: "text-zinc-300",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="flex min-h-screen">

        <Sidebar />

        <section className="flex min-w-0 flex-1 flex-col">

          <Header />

          <div className="flex-1 p-4 sm:p-6 md:p-8">

            <div className="mx-auto max-w-[1500px] space-y-6">


              {/* HERO */}

              <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101b25] via-[#0b1118] to-[#07090d] p-6 md:p-10">

                <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />

                <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />


                <div className="relative max-w-5xl">


                  {/* STATUS */}

                  <div className="mb-6 flex flex-wrap gap-3">

                    {liveSignals.map((signal) => (
                      <div
                        key={signal.label}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {signal.label}
                        </span>

                        <span
                          className={`text-[10px] font-semibold ${signal.color}`}
                        >
                          {signal.value}
                        </span>
                      </div>
                    ))}

                  </div>



                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300">

                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                    Autonomous AI Underwriting Engine

                  </div>




                  <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">

                    Autonomous credit decisions powered by

                    <span className="text-cyan-300">
                      {" "}
                      verified on-chain intelligence.
                    </span>

                  </h2>




                  <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400 md:text-lg">

                    Autonomous Credit Agent combines cryptographically verified
                    cross-chain evidence, AI risk intelligence, deterministic
                    safety controls, and Creditcoin infrastructure to create
                    autonomous credit decisions.

                  </p>




                  <div className="mt-8 flex flex-wrap gap-3">


                    <Link
                      href="/apply"
                      className="rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
                    >
                      Start Credit Assessment
                    </Link>


                    <Link
                      href="/agent"
                      className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                      View AI Agent
                    </Link>


                  </div>




                  {/* TRUST FLOW */}

                  <div className="mt-10 grid gap-3 md:grid-cols-3">

                    {trustLayers.map((layer) => (

                      <div
                        key={layer.title}
                        className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur"
                      >

                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                          {layer.title}
                        </div>


                        <div className="mt-2 text-sm font-semibold text-zinc-200">
                          {layer.value}
                        </div>


                        <div className="mt-2 text-xs text-zinc-500">
                          {layer.description}
                        </div>


                      </div>

                    ))}

                  </div>


                </div>

              </section>




              {/* METRICS */}

              <StatsGrid />




              {/* MAIN INTELLIGENCE */}

              <section className="grid gap-6 xl:grid-cols-3">

                <EvidencePanel />

                <AgentPanel />

              </section>





              {/* PIPELINE */}

              <section className="grid gap-6 md:grid-cols-2">

                <DecisionPipeline />

                <SystemArchitecture />

              </section>






              {/* FINAL CTA */}

              <section className="flex flex-col gap-5 rounded-3xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.05] to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">


                <div>

                  <div className="text-sm font-semibold">
                    Run autonomous credit verification
                  </div>


                  <div className="mt-2 text-xs leading-5 text-zinc-500">
                    Connect wallet, verify evidence through Attestcoin,
                    and generate an AI-powered credit decision.
                  </div>


                </div>



                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                >
                  Launch Assessment
                </Link>


              </section>



            </div>

          </div>

        </section>

      </div>
    </main>
  );
}