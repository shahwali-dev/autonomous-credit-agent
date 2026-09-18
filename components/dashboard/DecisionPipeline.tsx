"use client";

const pipeline = [
  {
    id: "01",
    title: "Source Chain Evidence",
    description:
      "Borrower financial activity collected from connected blockchain sources.",
    protocol: "Ethereum Sepolia",
    status: "Verified",
    state: "verified",
  },
  {
    id: "02",
    title: "Attestcoin Verification",
    description:
      "Cryptographic verification layer confirms cross-chain financial evidence.",
    protocol: "Attestcoin",
    status: "Proof Verified",
    state: "verified",
  },
  {
    id: "03",
    title: "AI Credit Agent",
    description:
      "Autonomous risk engine analyzes evidence and generates credit terms.",
    protocol: "AI Decision Engine",
    status: "Decision Ready",
    state: "active",
  },
  {
    id: "04",
    title: "RiskGuard Policy",
    description:
      "Deterministic safety layer validates AI output before execution.",
    protocol: "RiskGuard",
    status: "Policy Passed",
    state: "approved",
  },
  {
    id: "05",
    title: "Creditcoin Execution",
    description:
      "Approved credit decision moves into decentralized credit infrastructure.",
    protocol: "Creditcoin",
    status: "Transaction Ready",
    state: "execution",
  },
];

const styles = {
  verified:
    "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
  active:
    "border-amber-400/20 bg-amber-400/5 text-amber-300",
  approved:
    "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
  execution:
    "border-violet-400/20 bg-violet-400/5 text-violet-300",
};

const dots = {
  verified: "bg-cyan-300",
  active: "bg-amber-300 animate-pulse",
  approved: "bg-emerald-300",
  execution: "bg-violet-300 animate-pulse",
};

export default function DecisionPipeline() {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold">
            Autonomous Decision Pipeline
          </h2>

          <p className="mt-1 text-xs text-zinc-600">
            Verified evidence → AI reasoning → controlled execution
          </p>
        </div>

        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] uppercase tracking-wide text-emerald-300">
          System Online
        </div>
      </div>


      {/* Pipeline */}
      <div className="mt-6 space-y-4">

        {pipeline.map((step, index) => (
          <div key={step.id} className="relative">

            {/* Connector */}
            {index !== pipeline.length - 1 && (
              <div className="absolute left-5 top-14 h-8 w-px bg-white/10" />
            )}


            <div className="flex gap-4">

              {/* Number */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 font-mono text-xs text-zinc-400">
                {step.id}
              </div>


              {/* Card */}
              <div
                className="
                  flex-1 rounded-xl border border-white/5
                  bg-black/20 p-4
                  transition
                  hover:border-white/15
                "
              >

                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div>

                    <div className="flex items-center gap-2">

                      <span
                        className={`h-2 w-2 rounded-full ${dots[step.state as keyof typeof dots]}`}
                      />

                      <h3 className="text-sm font-medium text-zinc-200">
                        {step.title}
                      </h3>

                    </div>


                    <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-600">
                      {step.description}
                    </p>

                  </div>



                  <div
                    className={`
                      rounded-lg border px-3 py-1.5
                      text-[10px] uppercase tracking-wide
                      ${styles[step.state as keyof typeof styles]}
                    `}
                  >
                    {step.status}
                  </div>

                </div>


                {/* Protocol Identity */}

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">

                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                    Protocol Layer
                  </span>

                  <span className="text-xs font-medium text-zinc-400">
                    {step.protocol}
                  </span>

                </div>


              </div>

            </div>

          </div>
        ))}

      </div>



      {/* Execution Preview */}

      <div className="mt-6 rounded-xl border border-violet-400/10 bg-violet-400/[0.03] p-4">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div>

            <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300/70">
              Execution Preview
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              Credit decision prepared for on-chain execution
            </div>

          </div>


          <div className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[10px] text-violet-300">
            READY
          </div>

        </div>


        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          <div className="rounded-lg border border-white/5 bg-black/20 p-3">
            <div className="text-[10px] text-zinc-600">
              Decision
            </div>

            <div className="mt-1 text-sm font-semibold text-emerald-300">
              APPROVED
            </div>
          </div>


          <div className="rounded-lg border border-white/5 bg-black/20 p-3">
            <div className="text-[10px] text-zinc-600">
              Credit Line
            </div>

            <div className="mt-1 text-sm font-semibold text-zinc-200">
              700 TEST
            </div>
          </div>


          <div className="rounded-lg border border-white/5 bg-black/20 p-3">
            <div className="text-[10px] text-zinc-600">
              Execution
            </div>

            <div className="mt-1 text-sm font-semibold text-violet-300">
              Creditcoin
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}