"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  CircleDashed,
  Fingerprint,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
  Database,
  Activity,
  ExternalLink,
} from "lucide-react";

import { validateRiskGuard } from "@/lib/engine/riskguard";
import { useCreditStore } from "@/lib/store/credit-store";


const SEPOLIA_EXPLORER =
  "https://eth-sepolia.blockscout.com";


const CREDITCOIN_EXPLORER =
  "https://creditcoin-testnet.blockscout.com";


const executionSteps = [
  {
    number: "01",
    title: "AI recommendation",
    detail: "Credit terms generated from verified evidence",
    layer: "INTELLIGENCE",
  },
  {
    number: "02",
    title: "RiskGuard validation",
    detail: "Deterministic policies validate AI output",
    layer: "SAFETY",
  },
  {
    number: "03",
    title: "Creditcoin authorization",
    detail: "Execution permission prepared",
    layer: "PROTOCOL",
  },
  {
    number: "04",
    title: "Credit execution",
    detail: "Credit line creation on Creditcoin",
    layer: "EXECUTION",
  },
];


function formatCurrency(
  value: number | undefined | null
) {
  return `$${(value ?? 0).toLocaleString()}`;
}


function shortenAddress(
  address?: string | null
) {
  if (!address) return "Not connected";

  if (address.length < 12) {
    return address;
  }

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}



export default function DecisionPage() {

  const router = useRouter();


  const aiDecision =
    useCreditStore(
      (state) => state.aiDecision
    );

  const application =
    useCreditStore(
      (state) => state.application
    );

  const evidence =
    useCreditStore(
      (state) => state.evidence
    );


  const decisionStatus =
    useCreditStore(
      (state) => state.decisionStatus
    );


  const executeCredit =
    useCreditStore(
      (state) => state.executeCredit
    );


  const [
    executing,
    setExecuting
  ] = useState(false);


  const [
    executionError,
    setExecutionError
  ] = useState("");



  const riskGuardResult =
    useMemo(
      () =>
        validateRiskGuard(
          aiDecision,
          application,
          evidence
        ),
      [
        aiDecision,
        application,
        evidence,
      ]
    );


  const riskGuardPassed =
    riskGuardResult.passed;



  const policyChecks =
    riskGuardResult.checks;



  const handleExecute =
    async () => {

      if (
        !riskGuardPassed ||
        !aiDecision
      ) {
        return;
      }


      setExecuting(true);

      setExecutionError("");


      try {

        const response =
          await fetch(
            "/api/riskguard/validate",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },


              body: JSON.stringify({

                amount:
                  aiDecision.recommendedAmount,


                durationDays:
                  aiDecision.recommendedDuration,


                collateral:
                  application.collateral,


                evidenceVerified:
                  evidence.verified,


                risk:
                  aiDecision.risk,

              }),
            }
          );


        const data =
          await response.json();



        if (
          !data.success ||
          !data.validated
        ) {
          throw new Error(
            data.error ??
            "RiskGuard validation failed"
          );
        }



        executeCredit();


        router.push(
          "/credit-lines"
        );



      } catch (error) {


        setExecutionError(

          error instanceof Error

            ? error.message

            : "Execution failed"

        );


      } finally {

        setExecuting(false);

      }

    };





  const decisionFactors = [
    {
      label:
        "Risk classification",

      value:
        aiDecision?.risk ??
        "PENDING",
    },


    {
      label:
        "AI confidence",

      value:
        `${aiDecision?.confidence ?? 0}%`,
    },


    {
      label:
        "Requested credit",

      value:
        formatCurrency(
          application.requestedAmount
        ),
    },


    {
      label:
        "Recommended credit",

      value:
        formatCurrency(
          aiDecision?.recommendedAmount
        ),
    },


    {
      label:
        "Repayment duration",

      value:
        `${aiDecision?.recommendedDuration ?? 0} days`,
    },


    {
      label:
        "Verified collateral",

      value:
        formatCurrency(
          application.collateral
        ),
    },

  ];




  return (

    <main className="
min-h-screen
overflow-hidden
bg-[#05070b]
text-zinc-100
">


      <div className="
mx-auto
max-w-[1500px]
px-4
py-6
sm:px-6
lg:px-8
lg:py-10
">



        {/* SYSTEM HEADER */}

        <div className="
mb-6
flex
flex-col
gap-4
rounded-2xl
border
border-white/[0.07]
bg-[#080b10]
px-5
py-4
backdrop-blur-xl
sm:flex-row
sm:items-center
sm:justify-between
">


          <div className="
flex
items-center
gap-3
">


            <div className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border
border-cyan-400/20
bg-cyan-400/[0.06]
">

              <BrainCircuit
                className="
h-5
w-5
text-cyan-300
"
              />

            </div>



            <div>


              <div className="
text-[10px]
uppercase
tracking-[0.22em]
text-zinc-600
">

                Autonomous Credit Infrastructure

              </div>



              <div className="
mt-1
font-mono
text-xs
text-zinc-400
">

                DECISION-CORE / RISK-AUTHORIZATION

              </div>


            </div>


          </div>





          <div className="
flex
items-center
gap-2
">


            <div className="
flex
items-center
gap-2
rounded-full
border
border-emerald-400/15
bg-emerald-400/[0.04]
px-3
py-1.5
">


              <span className="
h-2
w-2
rounded-full
bg-emerald-400
animate-pulse
"/>


              <span className="
text-[9px]
uppercase
tracking-[0.15em]
text-emerald-300
">

                {
                  decisionStatus === "APPROVED"
                    ?
                    "READY TO EXECUTE"
                    :
                    decisionStatus
                }

              </span>


            </div>



            <div className="
rounded-full
border
border-white/[0.06]
px-3
py-1.5
text-[9px]
text-zinc-600
">

              TESTNET

            </div>


          </div>



        </div>






        {/* PAGE TITLE */}


        <header
          className="
flex
flex-col
justify-between
gap-6
xl:flex-row
xl:items-end
">


          <div>


            <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.22em]
text-cyan-300/70
">

              <Sparkles
                className="
h-3
w-3
"
              />

              Autonomous authorization layer

            </div>



            <h1
              className="
mt-3
text-4xl
font-semibold
tracking-tight
text-white
sm:text-5xl
"
            >

              Decision Center

            </h1>



            <p
              className="
mt-4
max-w-2xl
text-sm
leading-7
text-zinc-500
"
            >

              AI generated credit recommendations validated by
              deterministic RiskGuard policies before Creditcoin execution.

            </p>


          </div>





          <a

            href={
              `${SEPOLIA_EXPLORER}/address/${application.walletAddress ?? ""}`
            }

            target="_blank"

            rel="noreferrer"

            className="
flex
items-center
gap-2
rounded-xl
border
border-white/[0.08]
bg-white/[0.02]
px-4
py-2.5
text-xs
text-zinc-400
"

          >

            <Wallet
              className="
h-3.5
w-3.5
"/>

            {shortenAddress(
              application.walletAddress
            )}

            <ExternalLink
              className="
h-3
w-3
"
            />

          </a>


        </header>
        {/* DECISION CORE */}

        <section className="
mt-8
overflow-hidden
rounded-3xl
border
border-cyan-400/15
bg-gradient-to-br
from-[#0c1720]
via-[#080d13]
to-[#05070b]
p-6
sm:p-8
">


          <div className="
flex
flex-col
gap-4
sm:flex-row
sm:items-start
sm:justify-between
">


            <div>


              <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.2em]
text-zinc-600
">

                <BrainCircuit
                  className="
h-3.5
w-3.5
text-cyan-300
"/>

                AI Decision Core

              </div>



              <h2 className="
mt-3
text-2xl
font-semibold
tracking-tight
text-white
">

                Autonomous credit recommendation

              </h2>



              <p className="
mt-2
text-xs
text-zinc-600
">

                AI proposes terms. RiskGuard controls execution.

              </p>


            </div>



            <div className="
rounded-full
border
border-emerald-400/15
bg-emerald-400/[0.04]
px-3
py-1.5
text-[9px]
uppercase
tracking-[0.15em]
text-emerald-300
">

              Decision generated

            </div>


          </div>






          <div className="
mt-8
grid
gap-6
lg:grid-cols-[1fr_320px]
">



            <div>


              <div className="
text-[10px]
uppercase
tracking-[0.18em]
text-zinc-600
">

                Recommended credit line

              </div>



              <div className="
mt-3
text-6xl
font-semibold
tracking-tight
text-emerald-300
">

                {
                  formatCurrency(
                    aiDecision?.recommendedAmount
                  )
                }

              </div>



              <div className="
mt-2
text-sm
text-zinc-500
">

                AI generated autonomous credit limit

              </div>





              <div className="
mt-6
grid
gap-3
sm:grid-cols-3
">


                {
                  decisionFactors
                    .slice(0, 3)
                    .map(
                      (item) => (
                        <div
                          key={item.label}
                          className="
rounded-xl
border
border-white/[0.06]
bg-black/20
p-4
"
                        >


                          <div className="
text-[9px]
uppercase
tracking-[0.15em]
text-zinc-700
">

                            {item.label}

                          </div>


                          <div className="
mt-2
text-lg
font-semibold
text-zinc-200
">

                            {item.value}

                          </div>


                        </div>
                      )
                    )
                }



              </div>


            </div>







            {/* Confidence */}


            <div className="
flex
items-center
justify-center
">


              <div className="
relative
flex
h-52
w-52
items-center
justify-center
rounded-full
border
border-cyan-400/20
bg-[#071016]
">


                <div className="
absolute
inset-5
rounded-full
border
border-dashed
border-cyan-400/10
"/>



                <div className="
text-center
">


                  <div className="
text-5xl
font-semibold
text-white
">

                    {
                      aiDecision?.confidence ?? 0
                    }

                    <span className="
text-xl
text-cyan-300
">
                      %
                    </span>


                  </div>


                  <div className="
mt-2
text-[9px]
uppercase
tracking-[0.18em]
text-zinc-600
">

                    AI confidence

                  </div>


                </div>


              </div>


            </div>


          </div>


        </section>







        {/* AI VS RISKGUARD */}

        <section className="
mt-6
grid
gap-6
lg:grid-cols-2
">



          <div className="
rounded-3xl
border
border-cyan-400/10
bg-[#090c11]
p-6
">


            <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.18em]
text-cyan-300
">


              <BrainCircuit
                className="
h-3.5
w-3.5
"/>

              AI Brain

            </div>



            <h3 className="
mt-3
text-xl
font-semibold
">

              Recommendation engine

            </h3>



            <div className="
mt-6
space-y-3
">


              {
                [
                  "Analyzes verified financial evidence",
                  "Calculates borrower risk profile",
                  "Generates credit amount and duration",
                  "Provides explainable reasoning",
                ]
                  .map(
                    (text) => (
                      <div
                        key={text}
                        className="
flex
items-center
gap-3
rounded-xl
border
border-white/[0.06]
bg-black/20
p-3
"
                      >

                        <CheckCircle2
                          className="
h-4
w-4
text-cyan-300
"/>

                        <span className="
text-xs
text-zinc-400
">

                          {text}

                        </span>

                      </div>
                    )
                  )
              }



            </div>


          </div>








          <div className="
rounded-3xl
border
border-emerald-400/10
bg-[#090c11]
p-6
">


            <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.18em]
text-emerald-300
">


              <ShieldCheck
                className="
h-3.5
w-3.5
"/>

              RiskGuard

            </div>



            <h3 className="
mt-3
text-xl
font-semibold
">

              Deterministic safety layer

            </h3>



            <div className="
mt-6
space-y-3
">


              {
                policyChecks.map(
                  (check) => (
                    <div
                      key={check.name}
                      className="
flex
items-center
justify-between
rounded-xl
border
border-white/[0.06]
bg-black/20
p-4
"
                    >

                      <div>


                        <div className="
text-xs
text-zinc-300
">

                          {check.name}

                        </div>


                        <div className="
mt-1
text-[10px]
text-zinc-700
">

                          {check.value}

                        </div>


                      </div>



                      <span className="
text-[9px]
uppercase
tracking-wider
text-emerald-300
">

                        PASS

                      </span>


                    </div>
                  )
                )
              }



            </div>


          </div>



        </section>








        {/* TRUST ARCHITECTURE */}


        <section className="
mt-6
rounded-3xl
border
border-white/[0.07]
bg-[#090c11]
p-6
">


          <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.2em]
text-zinc-600
">


            <Network
              className="
h-3.5
w-3.5
text-cyan-300
"/>

            Trust architecture

          </div>



          <div className="
mt-6
grid
gap-4
md:grid-cols-4
">


            {
              [
                {
                  title: "Source",
                  value: "Ethereum Sepolia",
                  Icon: Database,
                },

                {
                  title: "Verification",
                  value: "Attestcoin",
                  Icon: Fingerprint,
                },

                {
                  title: "Intelligence",
                  value: "AI Agent",
                  Icon: BrainCircuit,
                },

                {
                  title: "Execution",
                  value: "Creditcoin",
                  Icon: Zap,
                },

              ].map(
                ({
                  title,
                  value,
                  Icon,
                }) => (
                  <div
                    key={title}
                    className="
rounded-xl
border
border-white/[0.06]
bg-black/20
p-4
"
                  >


                    <Icon
                      className="
h-5
w-5
text-cyan-300
"/>


                    <div className="
mt-4
text-[10px]
uppercase
tracking-[0.15em]
text-zinc-600
">

                      {title}

                    </div>


                    <div className="
mt-2
text-sm
font-medium
text-zinc-300
">

                      {value}

                    </div>


                  </div>
                )
              )
            }



          </div>


        </section>








        {/* EXECUTION PIPELINE */}


        <section className="
mt-6
rounded-3xl
border
border-white/[0.07]
bg-[#090c11]
p-6
">


          <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.2em]
text-zinc-600
">

            <Activity
              className="
h-3.5
w-3.5
text-cyan-300
"/>

            Execution pipeline

          </div>




          <div className="
mt-6
grid
gap-4
md:grid-cols-4
">


            {
              executionSteps.map(
                (step, index) => (
                  <div
                    key={step.number}
                    className="
rounded-xl
border
border-white/[0.06]
bg-black/20
p-5
"
                  >


                    <div className="
flex
justify-between
">

                      <span className="
font-mono
text-xs
text-cyan-300
">

                        {step.number}

                      </span>


                      {
                        index < 2
                          ?
                          <Check
                            className="
h-4
w-4
text-emerald-300
"/>

                          :

                          <CircleDashed
                            className="
h-4
w-4
text-zinc-600
"/>

                      }


                    </div>



                    <div className="
mt-5
text-sm
font-medium
text-zinc-300
">

                      {step.title}

                    </div>


                    <div className="
mt-2
text-[10px]
text-zinc-600
">

                      {step.detail}

                    </div>


                    <div className="
mt-3
text-[9px]
uppercase
tracking-wider
text-cyan-300
">

                      {step.layer}

                    </div>


                  </div>
                )
              )
            }



          </div>


        </section>







        {/* FINAL EXECUTION */}


        <section className="
mt-6
rounded-3xl
border
border-cyan-400/20
bg-cyan-400/[0.03]
p-6
sm:p-8
">


          <div className="
flex
flex-col
gap-6
lg:flex-row
lg:items-center
lg:justify-between
">


            <div>


              <div className="
flex
items-center
gap-2
text-[10px]
uppercase
tracking-[0.2em]
text-cyan-300
">

                <LockKeyhole
                  className="
h-3.5
w-3.5
"/>

                Creditcoin authorization

              </div>



              <h2 className="
mt-3
text-xl
font-semibold
">

                {
                  riskGuardPassed
                    ?
                    "All safety checks passed"
                    :
                    "Execution blocked"
                }

              </h2>



              <p className="
mt-2
max-w-xl
text-xs
leading-6
text-zinc-600
">

                AI decision is protected by RiskGuard before
                any Creditcoin execution.

              </p>


            </div>




            <button

              disabled={
                !riskGuardPassed ||
                executing
              }

              onClick={
                handleExecute
              }

              className={`
rounded-xl
px-6
py-4
text-sm
font-semibold
transition

${riskGuardPassed && !executing

                  ?

                  "bg-cyan-300 text-black hover:bg-cyan-200"

                  :

                  "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }

`}

            >

              {
                executing

                  ?

                  "Validating..."

                  :

                  "Authorize Creditcoin Execution →"

              }


            </button>


          </div>





          {
            executionError &&

            <div className="
mt-5
rounded-xl
border
border-red-400/20
bg-red-400/[0.05]
p-4
text-xs
text-red-300
">

              {executionError}

            </div>

          }



        </section>



      </div>

    </main>

  );

}