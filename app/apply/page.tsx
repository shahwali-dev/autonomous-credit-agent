"use client";

import { useState } from "react";
import { useCreditStore } from "@/lib/store/credit-store";
import { useRouter } from "next/navigation";

const evidenceOptions = [
  {
    id: "repayment",
    title: "Repayment History",
    description: "Verified borrowing and repayment activity",
  },
  {
    id: "collateral",
    title: "Collateral",
    description: "Verified assets available as credit support",
  },
  {
    id: "activity",
    title: "Financial Activity",
    description: "Cross-chain transaction and settlement history",
  },
];

export default function ApplyPage() {
  const router = useRouter();

  const application = useCreditStore((state) => state.application);
  const setApplication = useCreditStore((state) => state.setApplication);

  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([
    "repayment",
    "collateral",
    "activity",
  ]);

  const [walletConnecting, setWalletConnecting] = useState(false);
  const [error, setError] = useState("");

  const walletConnected = Boolean(application.walletAddress);

  const toggleEvidence = (id: string) => {
    setSelectedEvidence((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleStartAssessment = () => {
    setError("");

    if (application.requestedAmount <= 0) {
      setError("Requested credit must be greater than $0.");
      return;
    }

    if (application.durationDays <= 0) {
      setError("Credit duration must be greater than 0 days.");
      return;
    }

    if (application.collateral < 0) {
      setError("Collateral cannot be negative.");
      return;
    }

    if (selectedEvidence.length === 0) {
      setError("Select at least one evidence source.");
      return;
    }

    /*
     * Important:
     * We do NOT generate the AI decision here.
     *
     * The correct flow is:
     *
     * Application
     *      ↓
     * Evidence verification
     *      ↓
     * AI underwriting
     *      ↓
     * RiskGuard
     *      ↓
     * Creditcoin execution
     */
    router.push("/evidence");
  };

  const handleConnectWallet = async () => {
    setWalletConnecting(true);
    setError("");

    try {
      if (typeof window === "undefined") return;

      const ethereum = (
        window as typeof window & {
          ethereum?: {
            request: (args: {
              method: string;
            }) => Promise<string[]>;
          };
        }
      ).ethereum;

      if (!ethereum) {
        setError(
          "No EVM wallet detected. Install MetaMask or another compatible wallet."
        );
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts?.[0]) {
        setError("No wallet account was returned.");
        return;
      }

      setApplication({
        walletAddress: accounts[0],
      });
    } catch (err) {
      console.error(err);

      setError(
        "Wallet connection was cancelled or could not be completed."
      );
    } finally {
      setWalletConnecting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">
              Credit Application
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Apply for autonomous credit
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              Submit your credit request and allow the Autonomous Credit Agent
              to evaluate verified cross-chain financial evidence.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Assessment
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Ready to start
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Application Form */}
          <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 md:p-8">
            <div className="mb-7">
              <div className="text-sm font-semibold">
                Credit request
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                Define the credit line you want the agent to evaluate.
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Requested Credit */}
              <div>
                <label
                  htmlFor="requested-credit"
                  className="text-xs text-zinc-500"
                >
                  Requested credit
                </label>

                <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-cyan-400/40">
                  <span className="text-sm text-zinc-600">$</span>

                  <input
                    id="requested-credit"
                    type="number"
                    min="0"
                    value={application.requestedAmount}
                    onChange={(e) =>
                      setApplication({
                        requestedAmount: Number(e.target.value),
                      })
                    }
                    className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
                  />

                  <span className="text-xs text-zinc-600">
                    USDC
                  </span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="credit-duration"
                  className="text-xs text-zinc-500"
                >
                  Credit duration
                </label>

                <select
                  id="credit-duration"
                  value={application.durationDays}
                  onChange={(e) =>
                    setApplication({
                      durationDays: Number(e.target.value),
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-cyan-400/40"
                >
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>180 days</option>
                </select>
              </div>

              {/* Source Chain */}
              <div>
                <label
                  htmlFor="source-chain"
                  className="text-xs text-zinc-500"
                >
                  Source chain
                </label>

                <select
                  id="source-chain"
                  value={application.sourceChain}
                  onChange={(e) =>
                    setApplication({
                      sourceChain: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-cyan-400/40"
                >
                  <option value="Ethereum Sepolia">
                    Ethereum Sepolia
                  </option>

                  <option value="Creditcoin">
                    Creditcoin
                  </option>

                  <option value="Other supported chain">
                    Other supported chain
                  </option>
                </select>
              </div>

              {/* Collateral */}
              <div>
                <label
                  htmlFor="collateral"
                  className="text-xs text-zinc-500"
                >
                  Verified collateral
                </label>

                <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-cyan-400/40">
                  <span className="text-sm text-zinc-600">$</span>

                  <input
                    id="collateral"
                    type="number"
                    min="0"
                    value={application.collateral}
                    onChange={(e) =>
                      setApplication({
                        collateral: Number(e.target.value),
                      })
                    }
                    className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
                  />

                  <span className="text-xs text-zinc-600">
                    USDC
                  </span>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="mt-8 border-t border-white/5 pt-7">
              <div className="text-sm font-semibold">
                Evidence sources
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                Select the financial evidence the agent should analyze.
              </div>

              <div className="mt-5 space-y-3">
                {evidenceOptions.map((item) => {
                  const selected = selectedEvidence.includes(item.id);

                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                        selected
                          ? "border-cyan-400/20 bg-cyan-400/[0.03]"
                          : "border-white/5 bg-black/20 hover:border-white/10 hover:bg-white/[0.02]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleEvidence(item.id)}
                        className="mt-1 h-4 w-4 accent-cyan-300"
                      />

                      <div className="flex-1">
                        <div className="text-xs font-medium text-zinc-300">
                          {item.title}
                        </div>

                        <div className="mt-1 text-[11px] text-zinc-600">
                          {item.description}
                        </div>
                      </div>

                      <span
                        className={`rounded-md border px-2 py-1 text-[9px] uppercase tracking-wider ${
                          selected
                            ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                            : "border-white/10 text-zinc-600"
                        }`}
                      >
                        {selected ? "Selected" : "Optional"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Wallet */}
            <div className="mt-8 border-t border-white/5 pt-7">
              <div className="text-sm font-semibold">
                Borrower wallet
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                The connected wallet will be used for evidence verification
                and later credit execution.
              </div>

              <div
                className={`mt-4 flex flex-col gap-4 rounded-xl border bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between ${
                  walletConnected
                    ? "border-emerald-400/20"
                    : "border-dashed border-white/10"
                }`}
              >
                <div className="min-w-0">
                  <div
                    className={`text-xs ${
                      walletConnected
                        ? "text-emerald-300"
                        : "text-zinc-500"
                    }`}
                  >
                    {walletConnected
                      ? "Wallet connected"
                      : "Wallet not connected"}
                  </div>

                  <div className="mt-1 truncate font-mono text-[10px] text-zinc-600">
                    {application.walletAddress
                      ? `${application.walletAddress.slice(
                          0,
                          8
                        )}...${application.walletAddress.slice(-6)}`
                      : "0x0000...0000"}
                  </div>
                </div>

                <button
                  onClick={handleConnectWallet}
                  disabled={walletConnecting}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-xs font-medium transition ${
                    walletConnecting
                      ? "cursor-wait border-white/10 bg-white/[0.03] text-zinc-600"
                      : walletConnected
                        ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-300 hover:bg-emerald-400/10"
                        : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
                  }`}
                >
                  {walletConnecting
                    ? "Connecting..."
                    : walletConnected
                      ? "Wallet Connected"
                      : "Connect Wallet"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-4 py-3 text-xs leading-5 text-red-300">
                {error}
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleStartAssessment}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-5 py-4 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              Continue to Evidence Verification
              <span>→</span>
            </button>

            <div className="mt-3 text-center text-[10px] text-zinc-700">
              No credit will be executed until Attestcoin evidence is verified
              and RiskGuard approves the final decision.
            </div>
          </section>

          {/* Right Side */}
          <aside className="space-y-6">
            {/* Request Summary */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
              <div className="text-sm font-semibold">
                Request summary
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                Current application parameters.
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-zinc-600">
                    Requested
                  </span>

                  <span className="text-xs font-medium text-zinc-300">
                    $
                    {application.requestedAmount.toLocaleString()} USDC
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-zinc-600">
                    Duration
                  </span>

                  <span className="text-xs text-zinc-400">
                    {application.durationDays} days
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-zinc-600">
                    Collateral
                  </span>

                  <span className="text-xs text-zinc-400">
                    ${application.collateral.toLocaleString()} USDC
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-zinc-600">
                    Source
                  </span>

                  <span className="text-xs text-cyan-300">
                    {application.sourceChain}
                  </span>
                </div>
              </div>
            </section>

            {/* Assessment Preview */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
              <div className="text-sm font-semibold">
                Assessment pipeline
              </div>

              <div className="mt-1 text-xs text-zinc-600">
                What happens after you submit the application.
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["01", "Cross-chain evidence", "Attestcoin"],
                  ["02", "Repayment behavior", "AI analysis"],
                  ["03", "Risk profile", "Risk engine"],
                  ["04", "Credit terms", "Agent recommendation"],
                  ["05", "Policy validation", "RiskGuard"],
                ].map(([number, title, label]) => (
                  <div
                    key={number}
                    className="flex items-center gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] text-cyan-400/60">
                      {number}
                    </span>

                    <div className="flex-1">
                      <div className="text-xs text-zinc-400">
                        {title}
                      </div>

                      <div className="mt-1 text-[9px] uppercase tracking-wider text-zinc-700">
                        {label}
                      </div>
                    </div>

                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  </div>
                ))}
              </div>
            </section>

            {/* Safety */}
            <section className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.02] p-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <div className="text-sm font-semibold text-zinc-300">
                  Autonomous execution is bounded
                </div>
              </div>

              <p className="mt-3 text-xs leading-6 text-zinc-600">
                The AI agent cannot freely execute credit. Every decision is
                checked against deterministic RiskGuard policies before
                Creditcoin execution.
              </p>
            </section>

            {/* Flow */}
            <section className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Execution flow
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px]">
                <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-cyan-300">
                  Application
                </span>

                <span className="text-zinc-700">→</span>

                <span className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-cyan-300">
                  Attestcoin
                </span>

                <span className="text-zinc-700">→</span>

                <span className="rounded-md border border-white/10 px-2 py-1 text-zinc-500">
                  AI
                </span>

                <span className="text-zinc-700">→</span>

                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-emerald-300">
                  RiskGuard
                </span>

                <span className="text-zinc-700">→</span>

                <span className="rounded-md border border-white/10 px-2 py-1 text-zinc-500">
                  Creditcoin
                </span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
