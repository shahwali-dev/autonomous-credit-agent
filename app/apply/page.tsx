"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

const evidenceSources = [
  {
    id: "repayment",
    title: "Repayment History",
    description:
      "Verified borrowing behavior and previous repayment activity.",
    source: "Attestcoin Proof",
    confidence: "+25 Credit Confidence",
  },
  {
    id: "collateral",
    title: "Verified Collateral",
    description:
      "On-chain assets available as transparent credit backing.",
    source: "Cross-chain Asset Proof",
    confidence: "+20 Credit Confidence",
  },
  {
    id: "activity",
    title: "Financial Activity",
    description:
      "Cross-chain transaction and settlement behavior.",
    source: "Blockchain History",
    confidence: "+15 Credit Confidence",
  },
];

const supportedChains = [
  {
    name: "Ethereum Sepolia",
    chainId: "11155111",
    status: "Verified",
  },
  {
    name: "Creditcoin Testnet",
    chainId: "102031",
    status: "Verified",
  },
];

const pipelineSteps = [
  {
    id: "01",
    title: "Wallet Identity",
    subtitle: "Borrower verification",
    icon: "◉",
  },
  {
    id: "02",
    title: "Attestcoin",
    subtitle: "Cryptographic evidence",
    icon: "◆",
  },
  {
    id: "03",
    title: "AI Agent",
    subtitle: "Risk intelligence",
    icon: "✦",
  },
  {
    id: "04",
    title: "RiskGuard",
    subtitle: "Policy validation",
    icon: "◈",
  },
  {
    id: "05",
    title: "Creditcoin",
    subtitle: "Execution layer",
    icon: "⬢",
  },
];

export default function ApplyPage() {
  const router = useRouter();

  const application = useCreditStore(
    (state) => state.application
  );

  const setApplication = useCreditStore(
    (state) => state.setApplication
  );

  const [selectedEvidence, setSelectedEvidence] =
    useState<string[]>([
      "repayment",
      "collateral",
      "activity",
    ]);

  const [walletConnecting, setWalletConnecting] =
    useState(false);

  const [error, setError] = useState("");

  const walletConnected =
    Boolean(application.walletAddress);


  function toggleEvidence(id: string) {
    setSelectedEvidence((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }


  async function connectWallet() {
    setWalletConnecting(true);
    setError("");

    try {
      if (typeof window === "undefined") {
        return;
      }

      const ethereum = (
        window as typeof window & {
          ethereum?: {
            request(args: {
              method: string;
            }): Promise<string[]>;
          };
        }
      ).ethereum;


      if (!ethereum) {
        setError(
          "No compatible EVM wallet detected."
        );
        return;
      }


      const accounts =
        await ethereum.request({
          method: "eth_requestAccounts",
        });


      if (!accounts?.[0]) {
        setError(
          "Wallet account unavailable."
        );
        return;
      }


      setApplication({
        walletAddress: accounts[0],
      });


    } catch (error) {

      console.error(error);

      setError(
        "Wallet connection failed."
      );

    } finally {

      setWalletConnecting(false);

    }
  }



  function startAssessment() {

    setError("");

    if (
      application.requestedAmount <= 0
    ) {
      setError(
        "Enter a valid credit amount."
      );
      return;
    }


    if (
      application.durationDays <= 0
    ) {
      setError(
        "Select a valid duration."
      );
      return;
    }


    if (
      selectedEvidence.length === 0
    ) {
      setError(
        "Select evidence sources."
      );
      return;
    }


    router.push("/evidence");
  }



  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">


        {/* Protocol Header */}

        <section
          className="
          flex flex-col gap-6
          border-b border-white/10
          pb-8
          md:flex-row
          md:items-end
          md:justify-between
          "
        >

          <div>

            <div
              className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-cyan-300
              "
            >
              Autonomous Credit Protocol
            </div>


            <h1
              className="
              mt-3
              text-4xl
              font-semibold
              tracking-tight
              "
            >
              Create Credit Assessment
            </h1>


            <p
              className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-zinc-500
              "
            >
              Submit a credit request and allow the
              AI Credit Agent to evaluate verified
              cross-chain financial evidence through
              Attestcoin and Creditcoin infrastructure.
            </p>

          </div>



          <div
            className="
            rounded-xl
            border border-cyan-400/20
            bg-cyan-400/[0.04]
            px-5 py-4
            "
          >

            <div
              className="
              text-[10px]
              uppercase
              tracking-widest
              text-zinc-600
              "
            >
              Agent Status
            </div>


            <div
              className="
              mt-2
              flex
              items-center
              gap-2
              text-xs
              text-emerald-300
              "
            >

              <span
                className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                "
              />

              Ready For Assessment

            </div>

          </div>


        </section>



        <div
          className="
          mt-8
          grid
          gap-6
          lg:grid-cols-[1.4fr_0.8fr]
          "
        >


          {/* MAIN FORM */}

          <section
            className="
            rounded-2xl
            border border-white/10
            bg-[#0b0f14]
            p-6
            md:p-8
            "
          >


            <h2
              className="
              text-lg
              font-semibold
              "
            >
              Credit Request
            </h2>


            <p
              className="
              mt-1
              text-xs
              text-zinc-600
              "
            >
              Define parameters for autonomous underwriting.
            </p>



            <div
              className="
              mt-7
              grid
              gap-5
              md:grid-cols-2
              "
            >


              {/* Amount */}

              <div>

                <label
                  className="
                  text-xs
                  text-zinc-500
                  "
                >
                  Requested Amount
                </label>


                <div
                  className="
                  mt-2
                  flex
                  rounded-xl
                  border border-white/10
                  bg-black/20
                  px-4
                  "
                >

                  <span className="flex items-center text-zinc-600">
                    $
                  </span>


                  <input
                    type="number"
                    min="0"
                    value={
                      application.requestedAmount
                    }
                    onChange={(e) =>
                      setApplication({
                        requestedAmount:
                          Number(e.target.value),
                      })
                    }
                    className="
                    w-full
                    bg-transparent
                    px-3
                    py-3
                    text-sm
                    outline-none
                    "
                  />


                  <span
                    className="
                    flex items-center
                    text-xs
                    text-zinc-600
                    "
                  >
                    USDC
                  </span>


                </div>

              </div>




              {/* Duration */}

              <div>

                <label
                  className="
                  text-xs
                  text-zinc-500
                  "
                >
                  Duration
                </label>


                <select
                  value={
                    application.durationDays
                  }
                  onChange={(e) =>
                    setApplication({
                      durationDays:
                        Number(e.target.value),
                    })
                  }
                  className="
                  mt-2
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-sm
                  text-zinc-300
                  outline-none
                  "
                >

                  <option value={30}>
                    30 Days
                  </option>

                  <option value={60}>
                    60 Days
                  </option>

                  <option value={90}>
                    90 Days
                  </option>

                  <option value={180}>
                    180 Days
                  </option>

                </select>


              </div>





              {/* Collateral */}

              <div>

                <label
                  className="
                  text-xs
                  text-zinc-500
                  "
                >
                  Declared Collateral
                </label>


                <div
                  className="
                  mt-2
                  flex
                  rounded-xl
                  border border-white/10
                  bg-black/20
                  px-4
                  "
                >

                  <span className="flex items-center text-zinc-600">
                    $
                  </span>


                  <input
                    type="number"
                    min="0"
                    value={
                      application.collateral
                    }
                    onChange={(e) =>
                      setApplication({
                        collateral:
                          Number(e.target.value),
                      })
                    }
                    className="
                    w-full
                    bg-transparent
                    px-3
                    py-3
                    text-sm
                    outline-none
                    "
                  />


                  <span className="flex items-center text-xs text-zinc-600">
                    USDC
                  </span>

                </div>


              </div>


            </div>


            {/* SOURCE CHAIN */}

            <div className="mt-6">

              <div className="flex items-center justify-between">

                <label
                  className="
                  text-xs
                  text-zinc-500
                  "
                >
                  Evidence Source Chain
                </label>


                <span
                  className="
                  rounded-md
                  border border-cyan-400/20
                  bg-cyan-400/5
                  px-2
                  py-1
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-cyan-300
                  "
                >
                  Attestcoin Ready
                </span>

              </div>


              <select
                value={application.sourceChain}
                onChange={(e) =>
                  setApplication({
                    sourceChain: e.target.value,
                  })
                }
                className="
                mt-2
                w-full
                rounded-xl
                border border-white/10
                bg-black/20
                px-4
                py-3
                text-sm
                text-zinc-300
                outline-none
                "
              >

                {supportedChains.map((chain) => (
                  <option
                    key={chain.chainId}
                    value={chain.name}
                  >
                    {chain.name}
                  </option>
                ))}

              </select>

            </div>



            {/* Evidence */}

            <div
              className="
              mt-8
              border-t
              border-white/5
              pt-7
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-sm font-semibold">
                    Evidence Sources
                  </h2>


                  <p
                    className="
                    mt-1
                    text-xs
                    text-zinc-600
                    "
                  >
                    Verified signals used by AI underwriting.
                  </p>

                </div>


                <div
                  className="
                  rounded-lg
                  border border-cyan-400/20
                  bg-cyan-400/5
                  px-3
                  py-2
                  text-xs
                  text-cyan-300
                  "
                >

                  {selectedEvidence.length}
                  /
                  {evidenceSources.length}

                </div>


              </div>



              <div className="mt-5 space-y-3">


                {evidenceSources.map((item) => {

                  const selected =
                    selectedEvidence.includes(item.id);


                  return (

                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        toggleEvidence(item.id)
                      }
                      className={`
                      w-full
                      rounded-xl
                      border
                      p-4
                      text-left
                      transition

                      ${selected
                          ? "border-cyan-400/30 bg-cyan-400/[0.04]"
                          : "border-white/5 bg-black/20 hover:border-white/10"
                        }
                      `}
                    >


                      <div className="flex gap-4">


                        <div
                          className={`
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          border

                          ${selected
                              ? "border-cyan-400/20 text-cyan-300"
                              : "border-white/10 text-zinc-700"
                            }
                          `}
                        >

                          {selected ? "✓" : "○"}

                        </div>



                        <div className="flex-1">


                          <div
                            className="
                            flex
                            justify-between
                            gap-3
                            "
                          >

                            <span
                              className="
                              text-xs
                              font-medium
                              text-zinc-200
                              "
                            >
                              {item.title}
                            </span>


                            <span
                              className="
                              text-[9px]
                              uppercase
                              tracking-wider
                              text-cyan-300
                              "
                            >
                              {item.confidence}
                            </span>

                          </div>


                          <p
                            className="
                            mt-2
                            text-[11px]
                            leading-5
                            text-zinc-600
                            "
                          >
                            {item.description}
                          </p>


                          <div
                            className="
                            mt-2
                            text-[10px]
                            text-zinc-700
                            "
                          >
                            Source: {item.source}
                          </div>


                        </div>


                      </div>


                    </button>

                  );

                })}


              </div>


            </div>





            {/* WALLET */}

            <div
              className="
              mt-8
              border-t
              border-white/5
              pt-7
              "
            >

              <h2 className="text-sm font-semibold">
                Borrower Wallet
              </h2>


              <p
                className="
                mt-1
                text-xs
                text-zinc-600
                "
              >
                Wallet identity required for verification.
              </p>



              <div
                className="
                mt-4
                rounded-xl
                border border-white/10
                bg-black/20
                p-4
                "
              >

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  "
                >

                  <div>


                    <div className="text-xs text-zinc-400">

                      {
                        walletConnected
                          ? "Wallet Connected"
                          : "Wallet Required"
                      }

                    </div>


                    <div
                      className="
                      mt-2
                      font-mono
                      text-[10px]
                      text-zinc-600
                      "
                    >

                      {
                        application.walletAddress
                          ? `${application.walletAddress.slice(
                            0,
                            10
                          )}...${application.walletAddress.slice(
                            -8
                          )}`
                          : "No address"
                      }

                    </div>


                  </div>




                  <button
                    type="button"
                    onClick={connectWallet}
                    disabled={walletConnecting}
                    className="
                    rounded-lg
                    border border-cyan-400/30
                    bg-cyan-400/10
                    px-4
                    py-2
                    text-xs
                    text-cyan-300
                    "
                  >

                    {
                      walletConnecting
                        ? "Connecting..."
                        : walletConnected
                          ? "Connected"
                          : "Connect Wallet"
                    }


                  </button>


                </div>


              </div>


            </div>





            {/* ERROR */}

            {
              error && (

                <div
                  className="
                  mt-6
                  rounded-xl
                  border border-red-400/20
                  bg-red-400/5
                  p-4
                  text-xs
                  text-red-300
                  "
                >

                  {error}

                </div>

              )
            }





            {/* CTA */}

            <button
              type="button"
              onClick={startAssessment}
              className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-cyan-300
              px-5
              py-4
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-cyan-200
              "
            >

              Continue To Evidence Verification →

            </button>


          </section>





          {/* RIGHT SIDE */}

          <aside className="space-y-6">


            <section
              className="
              rounded-2xl
              border border-white/10
              bg-[#0b0f14]
              p-6
              "
            >

              <div
                className="
                text-[10px]
                uppercase
                tracking-widest
                text-zinc-600
                "
              >
                AI Pipeline
              </div>



              <div className="mt-6 space-y-5">


                {pipelineSteps.map((step) => (

                  <div
                    key={step.id}
                    className="
                    flex
                    gap-3
                    "
                  >

                    <div
                      className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border border-cyan-400/20
                      bg-cyan-400/5
                      text-xs
                      text-cyan-300
                      "
                    >
                      {step.icon}
                    </div>


                    <div>

                      <div
                        className="
                        text-xs
                        text-zinc-300
                        "
                      >
                        {step.title}
                      </div>


                      <div
                        className="
                        text-[10px]
                        text-zinc-700
                        "
                      >
                        {step.subtitle}
                      </div>


                    </div>


                  </div>

                ))}


              </div>


            </section>





            <section
              className="
              rounded-2xl
              border border-cyan-400/10
              bg-cyan-400/[0.03]
              p-6
              "
            >

              <div
                className="
                flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-wider
                text-cyan-300
                "
              >

                <span
                  className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-cyan-300
                  "
                />

                AI Agent Preview

              </div>



              <h3
                className="
                mt-4
                text-sm
                font-semibold
                "
              >
                Waiting for verified evidence
              </h3>


              <p
                className="
                mt-2
                text-xs
                leading-6
                text-zinc-600
                "
              >
                Agent reasoning begins after Attestcoin verification.
              </p>


            </section>





            <section
              className="
              rounded-2xl
              border border-emerald-400/10
              bg-emerald-400/[0.02]
              p-6
              "
            >

              <h3
                className="
                text-sm
                font-semibold
                text-zinc-300
                "
              >
                Bounded Autonomous Execution
              </h3>


              <p
                className="
                mt-3
                text-xs
                leading-6
                text-zinc-600
                "
              >
                AI recommendations are validated by RiskGuard before Creditcoin execution.
              </p>


            </section>


          </aside>


        </div>





        {/* FINAL FLOW */}

        <section
          className="
          mt-6
          rounded-2xl
          border border-white/10
          bg-[#0b0f14]
          p-5
          "
        >

          <div
            className="
            flex
            flex-col
            gap-3
            md:flex-row
            md:items-center
            md:justify-between
            "
          >

            <div>

              <div className="text-xs text-zinc-300">
                Verification Flow
              </div>


              <div className="mt-1 text-[10px] text-zinc-700">
                Truth → Intelligence → Execution
              </div>

            </div>


            <div
              className="
              text-[10px]
              uppercase
              tracking-wider
              text-cyan-300
              "
            >
              Attestcoin → AI → RiskGuard → Creditcoin
            </div>


          </div>


        </section>


      </div>

    </main>
  );
}