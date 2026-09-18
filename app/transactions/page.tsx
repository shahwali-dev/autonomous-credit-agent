"use client";

import { useRouter } from "next/navigation";
import { useCreditStore } from "@/lib/store/credit-store";

export default function TransactionsPage() {
  const router = useRouter();

  const transactions = useCreditStore(
    (state) => state.transactions
  );

  const creditLine = useCreditStore(
    (state) => state.creditLine
  );

  const aiDecision = useCreditStore(
    (state) => state.aiDecision
  );

  const evidence = useCreditStore(
    (state) => state.evidence
  );

  const application = useCreditStore(
    (state) => state.application
  );

  const decisionStatus = useCreditStore(
    (state) => state.decisionStatus
  );


  /* -----------------------------
      Formatting helpers
  ------------------------------ */

  const formatTime = (timestamp: number) => {
    if (!timestamp) return "Pending";

    return new Date(timestamp).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const shortenHash = (hash?: string) => {
    if (!hash) return "Awaiting execution";

    if (hash.length <= 18) {
      return hash;
    }

    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };


  const shortenAddress = (
    address?: string | null
  ) => {
    if (!address) return "Not connected";

    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };


  const getTransactionMeta = (
    type: string
  ) => {
    switch (type) {

      case "CREDIT_ISSUED":
        return {
          title: "Credit executed",
          description:
            "Creditcoin autonomous credit issuance",
          icon: "₿",
          category: "Creditcoin",
        };


      case "RISKGUARD":
        return {
          title: "RiskGuard authorization",
          description:
            "Deterministic policy validation completed",
          icon: "◆",
          category: "Security",
        };


      case "AI_DECISION":
        return {
          title: "AI credit decision",
          description:
            "Autonomous risk analysis generated",
          icon: "AI",
          category: "AI Agent",
        };


      case "EVIDENCE_VERIFIED":
        return {
          title: "Evidence verified",
          description:
            "Attestcoin verified financial evidence",
          icon: "✓",
          category: "Attestcoin",
        };


      case "COLLATERAL_VERIFIED":
        return {
          title: "Collateral verified",
          description:
            "Verified collateral assessment",
          icon: "◇",
          category: "Evidence",
        };


      case "REPAYMENT":
        return {
          title: "Repayment recorded",
          description:
            "Credit obligation repayment event",
          icon: "↙",
          category: "Credit",
        };


      default:
        return {
          title: "Protocol event",
          description:
            "Autonomous credit pipeline activity",
          icon: "•",
          category: "System",
        };
    }
  };


  /* -----------------------------
      Dashboard calculations
  ------------------------------ */


  const totalTransactions =
    transactions.length;


  const executedCredit =
    creditLine?.approvedAmount ?? 0;


  const activeCredit =
    creditLine?.status === "ACTIVE";


  const verifiedEvents =
    evidence.verified
      ? evidence.repaymentCount
      : 0;


  const successfulRepayments =
    Math.max(
      evidence.repaymentCount -
      evidence.failedObligations,
      0
    );


  const pipelineReady =
    decisionStatus === "EXECUTED" ||
    decisionStatus === "READY_TO_EXECUTE";


  const wallet =
    application.walletAddress;


  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      <div className="mx-auto max-w-[1500px] p-5 md:p-8">


        {/* Header */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300">

              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

              Autonomous Credit Protocol

            </div>


            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Transaction Intelligence
            </h1>


            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">

              Complete execution history across
              Attestcoin verification, AI decisioning,
              RiskGuard policy enforcement, and
              Creditcoin credit operations.

            </p>

          </div>


          <button
            className="
            rounded-xl
            border border-white/10
            bg-white/5
            px-5
            py-3
            text-sm
            font-medium
            text-zinc-300
            transition
            hover:bg-white/10
            "
          >
            Export Activity
          </button>

        </div>



        {/* Protocol Health */}

        <section className="
          mt-8
          rounded-2xl
          border
          border-emerald-400/20
          bg-emerald-400/[0.04]
          p-6
        ">


          <div className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          ">


            <div className="flex items-center gap-4">


              <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-400/10
              ">

                <span className="
                  h-3
                  w-3
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_15px_rgba(52,211,153,0.8)]
                "/>

              </div>


              <div>

                <p className="text-sm font-semibold">
                  Autonomous execution layer active
                </p>


                <p className="mt-1 text-xs text-zinc-500">

                  {pipelineReady
                    ? "Credit execution pipeline completed successfully."
                    : "Monitoring protocol state and awaiting execution."
                  }

                </p>


              </div>

            </div>



            <div className="flex flex-wrap gap-2">


              <span className="
                rounded-lg
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                text-xs
                text-zinc-400
              ">
                Attestcoin
              </span>


              <span className="
                rounded-lg
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                text-xs
                text-zinc-400
              ">
                AI Agent
              </span>


              <span className="
                rounded-lg
                border
                border-cyan-400/20
                bg-cyan-400/5
                px-3
                py-1.5
                text-xs
                text-cyan-300
              ">
                Creditcoin Testnet
              </span>


            </div>


          </div>


        </section>
        {/* Protocol Statistics */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              label: "Total Events",
              value: totalTransactions.toString(),
              description:
                "Recorded protocol activity",
            },

            {
              label: "Credit Capacity",
              value:
                executedCredit > 0
                  ? `$${executedCredit.toLocaleString()}`
                  : "$0",
              description:
                activeCredit
                  ? "Active credit line"
                  : "Awaiting execution",
            },

            {
              label: "Verified Evidence",
              value:
                verifiedEvents.toString(),
              description:
                evidence.verified
                  ? "Attestcoin validated"
                  : "Verification pending",
            },

            {
              label: "Repayment Health",
              value:
                `${successfulRepayments}/${evidence.repaymentCount}`,
              description:
                "Verified repayment history",
            },

          ].map((item) => (

            <div
              key={item.label}
              className="
              rounded-2xl
              border
              border-white/10
              bg-[#0b1016]
              p-5
              "
            >

              <p className="text-xs text-zinc-500">
                {item.label}
              </p>


              <p className="
                mt-3
                text-3xl
                font-semibold
                tracking-tight
              ">
                {item.value}
              </p>


              <p className="
                mt-2
                text-xs
                text-zinc-600
              ">
                {item.description}
              </p>


            </div>

          ))}

        </section>



        {/* Transaction Explorer */}

        <section className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#0b1016]
        ">


          <div className="
            flex
            flex-col
            gap-4
            border-b
            border-white/5
            p-6
            md:flex-row
            md:items-center
            md:justify-between
          ">


            <div>

              <p className="text-sm font-semibold">
                Protocol Event Explorer
              </p>


              <p className="
                mt-1
                text-xs
                text-zinc-500
              ">
                Complete autonomous credit execution timeline
              </p>

            </div>



            <div className="flex gap-2">


              <button
                className="
                rounded-lg
                border
                border-cyan-400/20
                bg-cyan-400/5
                px-3
                py-1.5
                text-xs
                text-cyan-300
                "
              >
                All
              </button>


              <button
                className="
                rounded-lg
                border
                border-white/10
                bg-white/[0.02]
                px-3
                py-1.5
                text-xs
                text-zinc-500
                "
              >
                AI
              </button>


              <button
                className="
                rounded-lg
                border
                border-white/10
                bg-white/[0.02]
                px-3
                py-1.5
                text-xs
                text-zinc-500
                "
              >
                On-chain
              </button>


            </div>


          </div>



          <div className="overflow-x-auto">


            <table className="
              w-full
              min-w-[950px]
              text-left
            ">


              <thead>

                <tr className="
                  border-b
                  border-white/5
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-zinc-600
                ">


                  <th className="px-6 py-4 font-medium">
                    Event
                  </th>


                  <th className="py-4 font-medium">
                    Protocol
                  </th>


                  <th className="py-4 font-medium">
                    Amount
                  </th>


                  <th className="py-4 font-medium">
                    Status
                  </th>


                  <th className="py-4 font-medium">
                    Time
                  </th>


                  <th className="py-4 pr-6 text-right font-medium">
                    Reference
                  </th>


                </tr>


              </thead>



              <tbody>


                {transactions.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="
                      px-6
                      py-16
                      text-center
                      "
                    >

                      <div className="
                        mx-auto
                        max-w-md
                      ">


                        <div className="
                          mx-auto
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.03]
                        ">

                          <span className="text-xl text-zinc-600">
                            ∅
                          </span>

                        </div>


                        <p className="
                          mt-4
                          text-sm
                          font-medium
                          text-zinc-300
                        ">
                          No protocol events yet
                        </p>


                        <p className="
                          mt-2
                          text-xs
                          leading-5
                          text-zinc-600
                        ">
                          Start a credit assessment to generate
                          AI decisions, evidence verification,
                          and execution records.
                        </p>


                        <button
                          onClick={() =>
                            router.push("/apply")
                          }
                          className="
                          mt-5
                          rounded-xl
                          bg-cyan-300
                          px-5
                          py-2.5
                          text-xs
                          font-semibold
                          text-black
                          "
                        >
                          Start Assessment
                        </button>


                      </div>


                    </td>


                  </tr>


                ) : (


                  transactions.map((transaction) => {


                    const meta =
                      getTransactionMeta(
                        transaction.type
                      );


                    return (

                      <tr
                        key={transaction.id}
                        className="
                        border-b
                        border-white/5
                        transition
                        hover:bg-white/[0.02]
                        last:border-0
                        "
                      >


                        <td className="px-6 py-4">


                          <div className="flex items-center gap-3">


                            <div className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-white/10
                              bg-white/[0.03]
                            ">

                              <span className="
                                text-xs
                                font-semibold
                                text-cyan-300
                              ">
                                {meta.icon}
                              </span>


                            </div>



                            <div>


                              <p className="
                                text-sm
                                font-medium
                                text-zinc-200
                              ">
                                {meta.title}
                              </p>


                              <p className="
                                mt-1
                                text-xs
                                text-zinc-600
                              ">
                                {meta.description}
                              </p>


                            </div>


                          </div>


                        </td>



                        <td className="py-4">


                          <span className="
                            rounded-lg
                            border
                            border-white/10
                            bg-white/[0.02]
                            px-2.5
                            py-1
                            text-xs
                            text-zinc-400
                          ">
                            {meta.category}
                          </span>


                        </td>



                        <td className="
                          py-4
                          text-sm
                          font-medium
                          text-white
                        ">

                          {transaction.amount !== undefined
                            ? `$${transaction.amount.toLocaleString()}`
                            : "—"}

                        </td>



                        <td className="py-4">

                          <span className="
                            inline-flex
                            rounded-lg
                            border
                            border-emerald-400/20
                            bg-emerald-400/5
                            px-2.5
                            py-1
                            text-[11px]
                            text-emerald-300
                          ">

                            {transaction.status}

                          </span>


                        </td>



                        <td className="
                          py-4
                          text-xs
                          text-zinc-500
                        ">

                          {formatTime(
                            transaction.timestamp
                          )}

                        </td>



                        <td className="
                          py-4
                          pr-6
                          text-right
                        ">

                          <button
                            className="
                            font-mono
                            text-xs
                            text-cyan-400/70
                            "
                          >

                            {shortenHash(
                              transaction.hash
                            )}

                          </button>


                        </td>


                      </tr>

                    );

                  })


                )}


              </tbody>


            </table>


          </div>


        </section>
        {/* Autonomous Execution Pipeline */}

        <section className="
          mt-6
          grid
          gap-6
          lg:grid-cols-2
        ">


          <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0b1016]
            p-6
          ">


            <p className="text-sm font-semibold">
              Autonomous credit pipeline
            </p>


            <p className="
              mt-1
              text-xs
              leading-5
              text-zinc-500
            ">
              Every decision follows a verified execution
              path from evidence to credit execution.
            </p>



            <div className="
              mt-7
              space-y-5
            ">


              {[
                {
                  step: "01",
                  title: "Cross-chain evidence",
                  description:
                    "Attestcoin verifies financial activity and creates trusted evidence.",
                  status: evidence.verified
                    ? "Verified"
                    : "Pending",
                },

                {
                  step: "02",
                  title: "AI risk assessment",
                  description:
                    "AI agent evaluates repayment history, activity and credit profile.",
                  status: aiDecision
                    ? "Completed"
                    : "Pending",
                },

                {
                  step: "03",
                  title: "RiskGuard validation",
                  description:
                    "Deterministic rules limit AI execution boundaries.",
                  status:
                    decisionStatus === "EXECUTED"
                      ? "Passed"
                      : "Pending",
                },

                {
                  step: "04",
                  title: "Creditcoin execution",
                  description:
                    "Approved credit operation is recorded within protocol limits.",
                  status: activeCredit
                    ? "Active"
                    : "Waiting",
                },

              ].map((item) => (

                <div
                  key={item.step}
                  className="flex gap-4"
                >

                  <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-cyan-400/20
                    bg-cyan-400/5
                    font-mono
                    text-xs
                    text-cyan-300
                  ">
                    {item.step}
                  </div>



                  <div className="flex-1">


                    <div className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    ">

                      <p className="
                        text-sm
                        font-medium
                        text-zinc-200
                      ">
                        {item.title}
                      </p>


                      <span className="
                        rounded-lg
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-2
                        py-1
                        text-[10px]
                        text-zinc-400
                      ">
                        {item.status}
                      </span>


                    </div>


                    <p className="
                      mt-1
                      text-xs
                      leading-5
                      text-zinc-600
                    ">
                      {item.description}
                    </p>


                  </div>


                </div>


              ))}


            </div>


          </div>




          {/* Execution Account */}


          <div className="
            rounded-2xl
            border
            border-cyan-400/15
            bg-cyan-400/[0.03]
            p-6
          ">


            <div className="
              flex
              items-start
              justify-between
            ">


              <div>

                <p className="text-sm font-semibold">
                  Execution account
                </p>


                <p className="
                  mt-1
                  text-xs
                  text-zinc-500
                ">
                  Wallet and authorization state
                </p>


              </div>



              <span className="
                rounded-lg
                border
                border-emerald-400/20
                bg-emerald-400/5
                px-2.5
                py-1
                text-xs
                text-emerald-300
              ">
                Connected
              </span>


            </div>



            <div className="
              mt-6
              rounded-xl
              border
              border-white/10
              bg-black/20
              p-4
            ">


              <p className="
                text-[10px]
                uppercase
                tracking-wider
                text-zinc-600
              ">
                Wallet
              </p>


              <p className="
                mt-2
                font-mono
                text-sm
                text-zinc-300
              ">
                {shortenAddress(wallet)}
              </p>


            </div>




            <div className="
              mt-4
              grid
              grid-cols-2
              gap-3
            ">


              <div className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.02]
                p-4
              ">

                <p className="text-xs text-zinc-500">
                  Network
                </p>

                <p className="
                  mt-2
                  text-sm
                  font-medium
                ">
                  Creditcoin Testnet
                </p>

              </div>




              <div className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.02]
                p-4
              ">

                <p className="text-xs text-zinc-500">
                  Authority
                </p>

                <p className="
                  mt-2
                  text-sm
                  font-medium
                  text-cyan-300
                ">
                  RiskGuard
                </p>

              </div>


            </div>




            <div className="
              mt-4
              rounded-xl
              border
              border-emerald-400/10
              bg-emerald-400/[0.03]
              p-4
            ">


              <div className="
                flex
                items-center
                gap-2
              ">

                <span className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "/>


                <p className="
                  text-xs
                  font-medium
                  text-emerald-300
                ">
                  Execution policy active
                </p>


              </div>



              <p className="
                mt-2
                text-xs
                leading-5
                text-zinc-500
              ">
                AI recommendations remain bounded by
                deterministic RiskGuard policies.
              </p>


            </div>


          </div>


        </section>





        {/* Decision Context */}


        <section className="
          mt-6
          grid
          gap-4
          md:grid-cols-3
        ">


          <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0b1016]
            p-5
          ">


            <p className="text-xs text-zinc-500">
              AI recommendation
            </p>


            <p className="
              mt-3
              text-xl
              font-semibold
            ">
              {aiDecision?.recommendation ??
                "PENDING"}
            </p>


            <p className="
              mt-2
              text-xs
              text-zinc-600
            ">
              {aiDecision
                ? `${aiDecision.confidence}% confidence · ${aiDecision.risk} risk`
                : "Awaiting assessment"}
            </p>


          </div>




          <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0b1016]
            p-5
          ">


            <p className="text-xs text-zinc-500">
              Requested credit
            </p>


            <p className="
              mt-3
              text-xl
              font-semibold
            ">
              ${application.requestedAmount.toLocaleString()}
            </p>


            <p className="
              mt-2
              text-xs
              text-zinc-600
            ">
              {application.durationDays} days duration
            </p>


          </div>





          <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0b1016]
            p-5
          ">


            <p className="text-xs text-zinc-500">
              Evidence state
            </p>


            <p className={`
              mt-3
              text-xl
              font-semibold
              ${evidence.verified
                ? "text-emerald-300"
                : "text-amber-300"
              }
            `}>
              {evidence.verified
                ? "VERIFIED"
                : "PENDING"}
            </p>


            <p className="
              mt-2
              text-xs
              text-zinc-600
            ">
              {evidence.repaymentCount} repayments ·{" "}
              {evidence.activityDays} days activity
            </p>


          </div>


        </section>




        {/* Final CTA */}


        <section className="
          mt-6
          rounded-2xl
          border
          border-white/10
          bg-gradient-to-r
          from-[#0d171d]
          to-[#0b1016]
          p-6
        ">


          <div className="
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-center
          ">


            <div>

              <p className="
                text-sm
                font-semibold
              ">
                Autonomous credit agent ready
              </p>


              <p className="
                mt-1
                text-xs
                text-zinc-500
              ">
                Submit verified financial evidence and
                generate a new AI-powered credit assessment.
              </p>


            </div>



            <button
              onClick={() =>
                router.push("/apply")
              }
              className="
                rounded-xl
                bg-cyan-300
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-cyan-200
              "
            >
              Start Assessment
            </button>


          </div>


        </section>


      </div>

    </main>
  );
}