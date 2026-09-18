"use client";

const layers = [
  {
    id: "01",
    title: "Source Chain",
    protocol: "Ethereum Sepolia",
    role: "Data Origin",
    description:
      "Borrower activity, repayment history, collateral signals, and financial events.",
    icon: "⛓",
  },
  {
    id: "02",
    title: "Attestcoin",
    protocol: "Verification Layer",
    role: "Trust Layer",
    description:
      "Cryptographically verifies cross-chain data without centralized oracle dependency.",
    icon: "✓",
  },
  {
    id: "03",
    title: "AI Credit Agent",
    protocol: "Autonomous Intelligence",
    role: "Decision Layer",
    description:
      "Analyzes verified evidence and generates risk-aware credit recommendations.",
    icon: "AI",
  },
  {
    id: "04",
    title: "RiskGuard",
    protocol: "Policy Controller",
    role: "Safety Layer",
    description:
      "Validates AI decisions through deterministic rules before execution.",
    icon: "🛡",
  },
  {
    id: "05",
    title: "Creditcoin",
    protocol: "Credit Infrastructure",
    role: "Execution Layer",
    description:
      "Executes approved credit operations on decentralized infrastructure.",
    icon: "₿",
  },
];


export default function SystemArchitecture() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">

      {/* Header */}

      <div>
        <h2 className="text-sm font-semibold">
          System Architecture
        </h2>

        <p className="mt-1 text-xs text-zinc-600">
          Trust layer → intelligence layer → safety layer → execution layer
        </p>
      </div>



      {/* Architecture Flow */}

      <div className="mt-6 space-y-3">

        {layers.map((layer, index) => (

          <div key={layer.id} className="relative">


            {/* Connector */}

            {index !== layers.length - 1 && (
              <div className="absolute left-7 top-14 h-6 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
            )}



            <div
              className="
                relative flex gap-4
                rounded-xl border border-white/5
                bg-black/20 p-4
                transition
                hover:border-cyan-400/20
              "
            >


              {/* Icon */}

              <div
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-cyan-400/10
                  bg-cyan-400/[0.04]
                  text-sm font-semibold
                  text-cyan-300
                "
              >
                {layer.icon}
              </div>




              {/* Content */}

              <div className="min-w-0 flex-1">


                <div className="flex flex-wrap items-start justify-between gap-3">


                  <div>

                    <div className="flex items-center gap-2">

                      <span className="font-mono text-[10px] text-zinc-700">
                        {layer.id}
                      </span>


                      <h3 className="text-sm font-medium text-zinc-200">
                        {layer.title}
                      </h3>

                    </div>


                    <p className="mt-1 text-xs text-zinc-600">
                      {layer.description}
                    </p>

                  </div>



                  {/* Role badge */}

                  <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-wide text-zinc-400">
                    {layer.role}
                  </span>


                </div>



                {/* Protocol */}

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">


                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                    Protocol
                  </span>


                  <span className="text-xs font-medium text-cyan-300">
                    {layer.protocol}
                  </span>


                </div>


              </div>


            </div>


          </div>

        ))}

      </div>





      {/* Core Philosophy */}

      <div
        className="
          mt-6 rounded-xl
          border border-cyan-400/10
          bg-cyan-400/[0.03]
          p-4
        "
      >

        <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
          Core Architecture Principle
        </div>


        <p className="mt-2 text-xs leading-6 text-zinc-500">

          Attestcoin provides trusted evidence,
          the AI agent provides autonomous reasoning,
          RiskGuard enforces safety boundaries,
          and Creditcoin executes verified credit decisions.

        </p>


      </div>


    </section>
  );
}