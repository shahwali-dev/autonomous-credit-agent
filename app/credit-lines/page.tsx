"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Wallet,
  Activity,
  TrendingUp,
  Database,
  BrainCircuit,
  Zap,
} from "lucide-react";

import { useCreditStore } from "@/lib/store/credit-store";


const CREDITCOIN_EXPLORER =
  "https://creditcoin-testnet.blockscout.com";


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



const lifecycle = [
  {
    title: "Attestcoin Evidence",
    detail:
      "Verified cross-chain borrower evidence",
    icon: Fingerprint,
    status: "VERIFIED",
  },
  {
    title: "AI Credit Agent",
    detail:
      "Autonomous risk recommendation",
    icon: BrainCircuit,
    status: "ACTIVE",
  },
  {
    title: "RiskGuard",
    detail:
      "Deterministic execution safety",
    icon: ShieldCheck,
    status: "PASSED",
  },
  {
    title: "Creditcoin",
    detail:
      "Credit line execution",
    icon: Zap,
    status: "LIVE",
  },
];



export default function CreditLinesPage() {

  const router = useRouter();


  const creditLine =
    useCreditStore(
      (state) => state.creditLine
    );


  const aiDecision =
    useCreditStore(
      (state) => state.aiDecision
    );


  const evidence =
    useCreditStore(
      (state) => state.evidence
    );


  const transactions =
    useCreditStore(
      (state) => state.transactions
    );


  const decisionStatus =
    useCreditStore(
      (state) => state.decisionStatus
    );


  const repayCredit =
    useCreditStore(
      (state) => state.repayCredit
    );


  const drawCredit =
    useCreditStore(
      (state) => state.drawCredit
    );


  const application =
    useCreditStore(
      (state) => state.application
    );



  const [isRepaymentOpen, setIsRepaymentOpen] =
    useState(false);


  const [repaymentAmount, setRepaymentAmount] =
    useState("");



  const [isDrawOpen, setIsDrawOpen] =
    useState(false);


  const [drawAmount, setDrawAmount] =
    useState("");



  const approvedAmount =
    creditLine?.approvedAmount ?? 0;


  const usedAmount =
    creditLine?.usedAmount ?? 0;


  const availableAmount =
    creditLine?.availableAmount ?? 0;


  const collateral =
    creditLine?.collateral ?? 0;



  const isActive =
    creditLine?.status === "ACTIVE";



  const totalRepaid =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "REPAYMENT"
      )
      .reduce(
        (total, transaction) =>
          total + (transaction.amount ?? 0),
        0
      );



  const utilization =
    approvedAmount > 0
      ? Math.round(
        (usedAmount / approvedAmount) * 100
      )
      : 0;



  const collateralCoverage =
    approvedAmount > 0
      ? Math.round(
        (collateral / approvedAmount) * 100
      )
      : 0;



  const handleDraw = () => {

    const amount =
      Number(drawAmount);


    if (
      !amount ||
      amount <= 0 ||
      availableAmount <= 0
    ) {
      return;
    }


    drawCredit(
      Math.min(
        amount,
        availableAmount
      )
    );


    setDrawAmount("");

    setIsDrawOpen(false);

  };



  const handleRepayment = () => {

    const amount =
      Number(repaymentAmount);


    if (
      !amount ||
      amount <= 0 ||
      usedAmount <= 0
    ) {
      return;
    }


    repayCredit(
      Math.min(
        amount,
        usedAmount
      )
    );


    setRepaymentAmount("");

    setIsRepaymentOpen(false);

  };



  return (

    <main
      className="
      min-h-screen
      overflow-hidden
      bg-[#05070b]
      text-zinc-100
      "
    >

      <div
        className="
        mx-auto
        max-w-[1500px]
        px-5
        py-8
        lg:px-8
        "
      >


        {/* HEADER */}

        <section
          className="
          flex
          flex-col
          gap-6
          rounded-3xl
          border
          border-white/[0.07]
          bg-[#080b10]
          p-6
          xl:flex-row
          xl:items-end
          xl:justify-between
          "
        >


          <div>


            <div
              className="
              flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-cyan-300
              "
            >

              <Sparkles
                className="
                h-3.5
                w-3.5
                "
              />

              Autonomous Credit Infrastructure

            </div>



            <h1
              className="
              mt-4
              text-4xl
              font-semibold
              tracking-tight
              text-white
              "
            >

              Credit Line Command Center

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

              Live Creditcoin credit execution layer powered by
              Attestcoin verified evidence, AI decisioning and
              RiskGuard controlled authorization.

            </p>


          </div>




          <div
            className="
            flex
            flex-wrap
            gap-3
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/[0.05]
              px-4
              py-2
              text-xs
              text-emerald-300
              "
            >

              <span
                className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                "
              />

              {isActive
                ? "ACTIVE CREDIT"
                : decisionStatus}

            </div>



            <div
              className="
              rounded-full
              border
              border-white/10
              px-4
              py-2
              text-xs
              text-zinc-500
              "
            >

              TESTNET

            </div>


          </div>


        </section>
        {/* CREDIT METRICS */}

        <section
          className="
          mt-6
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
          "
        >

          {[
            {
              label:
                "Approved Credit Limit",

              value:
                formatCurrency(
                  approvedAmount
                ),

              detail:
                "Creditcoin authorized exposure",

              icon:
                CreditCard,
            },


            {
              label:
                "Current Usage",

              value:
                formatCurrency(
                  usedAmount
                ),

              detail:
                `${utilization}% utilization`,

              icon:
                Activity,
            },


            {
              label:
                "Available Balance",

              value:
                formatCurrency(
                  availableAmount
                ),

              detail:
                "Ready for draw",

              icon:
                TrendingUp,
            },


            {
              label:
                "Collateral Coverage",

              value:
                `${collateralCoverage}%`,

              detail:
                formatCurrency(
                  collateral
                ),

              icon:
                LockKeyhole,
            },

          ].map(
            (item) => {

              const Icon =
                item.icon;


              return (

                <div
                  key={item.label}
                  className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#090c11]
                  p-5
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    "
                  >

                    <div
                      className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-cyan-400/20
                      bg-cyan-400/[0.05]
                      "
                    >

                      <Icon
                        className="
                        h-5
                        w-5
                        text-cyan-300
                        "
                      />

                    </div>


                  </div>


                  <div
                    className="
                    mt-5
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-zinc-600
                    "
                  >

                    {item.label}

                  </div>


                  <div
                    className="
                    mt-2
                    text-2xl
                    font-semibold
                    text-white
                    "
                  >

                    {item.value}

                  </div>


                  <div
                    className="
                    mt-2
                    text-xs
                    text-zinc-500
                    "
                  >

                    {item.detail}

                  </div>


                </div>

              );

            }

          )}


        </section>







        {/* AI CREDIT HEALTH */}


        <section
          className="
          mt-6
          grid
          gap-6
          lg:grid-cols-[1fr_360px]
          "
        >


          <div
            className="
            rounded-3xl
            border
            border-cyan-400/10
            bg-[#090c11]
            p-6
            "
          >


            <div
              className="
              flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-cyan-300
              "
            >

              <BrainCircuit
                className="
                h-4
                w-4
                "
              />

              AI Credit Intelligence

            </div>



            <h2
              className="
              mt-3
              text-2xl
              font-semibold
              "
            >

              Autonomous credit assessment

            </h2>



            <p
              className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-zinc-500
              "
            >

              The AI agent continuously evaluates verified borrower
              evidence and converts it into explainable credit decisions.

            </p>




            <div
              className="
              mt-8
              grid
              gap-4
              md:grid-cols-3
              "
            >


              {[
                [
                  "Risk Level",
                  aiDecision?.risk ??
                  "PENDING",
                ],

                [
                  "AI Confidence",
                  `${aiDecision?.confidence ?? 0}%`,
                ],

                [
                  "Repayment History",
                  `${evidence.repaymentCount}
                   verified`,
                ],

              ].map(
                ([label, value]) => (

                  <div
                    key={label}
                    className="
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/20
                    p-4
                    "
                  >

                    <div
                      className="
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-zinc-600
                      "
                    >

                      {label}

                    </div>


                    <div
                      className="
                      mt-3
                      text-lg
                      font-semibold
                      text-zinc-200
                      "
                    >

                      {value}

                    </div>


                  </div>

                )
              )}


            </div>


          </div>







          {/* SCORE RING */}


          <div
            className="
            flex
            items-center
            justify-center
            rounded-3xl
            border
            border-white/[0.07]
            bg-[#090c11]
            "
          >


            <div
              className="
              relative
              flex
              h-56
              w-56
              items-center
              justify-center
              rounded-full
              border
              border-cyan-400/20
              bg-[#070b10]
              "
            >


              <div
                className="
                absolute
                inset-5
                rounded-full
                border
                border-dashed
                border-cyan-400/20
                "
              />


              <div
                className="
                text-center
                "
              >

                <div
                  className="
                  text-5xl
                  font-semibold
                  text-white
                  "
                >

                  {aiDecision?.confidence ?? 0}

                  <span
                    className="
                    text-xl
                    text-cyan-300
                    "
                  >
                    %
                  </span>

                </div>


                <div
                  className="
                  mt-2
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-zinc-600
                  "
                >

                  AI Confidence

                </div>


              </div>


            </div>


          </div>


        </section>







        {/* TRUST PIPELINE */}


        <section
          className="
          mt-6
          rounded-3xl
          border
          border-white/[0.07]
          bg-[#090c11]
          p-6
          "
        >


          <div
            className="
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-zinc-600
            "
          >

            <Database
              className="
              h-4
              w-4
              text-cyan-300
              "
            />

            Autonomous credit lifecycle

          </div>



          <div
            className="
            mt-6
            grid
            gap-4
            md:grid-cols-4
            "
          >

            {
              lifecycle.map(
                (item, index) => {

                  const Icon =
                    item.icon;


                  return (

                    <div
                      key={item.title}
                      className="
                      relative
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-black/20
                      p-5
                      "
                    >


                      <div
                        className="
                        flex
                        items-center
                        justify-between
                        "
                      >

                        <Icon
                          className="
                          h-5
                          w-5
                          text-cyan-300
                          "
                        />


                        <CheckCircle2
                          className="
                          h-4
                          w-4
                          text-emerald-300
                          "
                        />


                      </div>



                      <div
                        className="
                        mt-5
                        text-sm
                        font-semibold
                        text-white
                        "
                      >

                        {item.title}

                      </div>


                      <div
                        className="
                        mt-2
                        text-xs
                        leading-5
                        text-zinc-500
                        "
                      >

                        {item.detail}

                      </div>


                      <div
                        className="
                        mt-4
                        text-[9px]
                        uppercase
                        tracking-wider
                        text-emerald-300
                        "
                      >

                        {item.status}

                      </div>


                    </div>

                  );

                }
              )
            }


          </div>


        </section>
        {/* CREDIT UTILIZATION */}

        <section
          className="
          mt-6
          grid
          gap-6
          xl:grid-cols-[1.4fr_1fr]
          "
        >


          <div
            className="
            rounded-3xl
            border
            border-white/[0.07]
            bg-[#090c11]
            p-6
            "
          >


            <div
              className="
              flex
              items-start
              justify-between
              "
            >

              <div>

                <div
                  className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-zinc-600
                  "
                >

                  Credit utilization

                </div>


                <h3
                  className="
                  mt-3
                  text-xl
                  font-semibold
                  "
                >

                  Active credit exposure

                </h3>

              </div>



              <div
                className="
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.05]
                px-3
                py-1
                text-xs
                text-cyan-300
                "
              >

                {utilization}% Used

              </div>


            </div>





            <div
              className="
              mt-8
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
              "
            >

              <div>

                <div
                  className="
                  text-5xl
                  font-semibold
                  tracking-tight
                  text-white
                  "
                >

                  {formatCurrency(
                    usedAmount
                  )}

                </div>


                <div
                  className="
                  mt-2
                  text-sm
                  text-zinc-500
                  "
                >

                  of {formatCurrency(
                    approvedAmount
                  )} authorized credit

                </div>

              </div>



              <div
                className="
                text-right
                "
              >

                <div
                  className="
                  text-xs
                  text-zinc-500
                  "
                >

                  Available

                </div>


                <div
                  className="
                  mt-1
                  text-xl
                  font-semibold
                  text-cyan-300
                  "
                >

                  {formatCurrency(
                    availableAmount
                  )}

                </div>

              </div>


            </div>





            <div
              className="
              mt-8
              h-3
              overflow-hidden
              rounded-full
              bg-white/5
              "
            >

              <div
                className="
                h-full
                rounded-full
                bg-cyan-300
                transition-all
                "
                style={{
                  width:
                    `${Math.min(
                      utilization,
                      100
                    )}%`,
                }}
              />

            </div>





            <div
              className="
              mt-6
              grid
              grid-cols-3
              gap-4
              "
            >

              {[
                [
                  "Used",
                  formatCurrency(
                    usedAmount
                  ),
                ],

                [
                  "Available",
                  formatCurrency(
                    availableAmount
                  ),
                ],

                [
                  "Limit",
                  formatCurrency(
                    approvedAmount
                  ),
                ],

              ].map(
                ([label, value]) => (

                  <div
                    key={label}
                    className="
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/20
                    p-3
                    "
                  >

                    <div
                      className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-zinc-600
                      "
                    >

                      {label}

                    </div>


                    <div
                      className="
                      mt-2
                      text-sm
                      font-semibold
                      text-white
                      "
                    >

                      {value}

                    </div>

                  </div>

                )
              )}


            </div>


          </div>







          {/* CREDIT TERMS */}


          <div
            className="
            rounded-3xl
            border
            border-white/[0.07]
            bg-[#090c11]
            p-6
            "
          >


            <div
              className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-zinc-600
              "
            >

              Credit agreement

            </div>



            <h3
              className="
              mt-3
              text-xl
              font-semibold
              "
            >

              Autonomous terms

            </h3>




            <div
              className="
              mt-6
              space-y-1
              divide-y
              divide-white/5
              "
            >

              {[
                [
                  "Approved amount",
                  formatCurrency(
                    approvedAmount
                  ),
                ],

                [
                  "Duration",
                  `${aiDecision?.recommendedDuration ?? 0} days`,
                ],

                [
                  "Collateral",
                  formatCurrency(
                    collateral
                  ),
                ],

                [
                  "Coverage",
                  `${collateralCoverage}%`,
                ],

                [
                  "Risk",
                  aiDecision?.risk ??
                  "PENDING",
                ],

                [
                  "Confidence",
                  `${aiDecision?.confidence ?? 0}%`,
                ],

              ].map(
                ([label, value]) => (

                  <div
                    key={label}
                    className="
                    flex
                    items-center
                    justify-between
                    py-4
                    "
                  >

                    <span
                      className="
                      text-sm
                      text-zinc-500
                      "
                    >

                      {label}

                    </span>


                    <span
                      className="
                      text-sm
                      font-medium
                      text-zinc-200
                      "
                    >

                      {value}

                    </span>


                  </div>

                )
              )}

            </div>


          </div>


        </section>







        {/* REPAYMENT INTELLIGENCE */}


        <section
          className="
          mt-6
          rounded-3xl
          border
          border-white/[0.07]
          bg-[#090c11]
          p-6
          "
        >


          <div
            className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            "
          >

            <div>

              <div
                className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-zinc-600
                "
              >

                Repayment engine

              </div>


              <h3
                className="
                mt-3
                text-xl
                font-semibold
                "
              >

                Credit health tracking

              </h3>

            </div>



            <div
              className="
              rounded-full
              border
              border-emerald-400/20
              bg-emerald-400/[0.04]
              px-4
              py-2
              text-xs
              text-emerald-300
              "
            >

              {isActive
                ? "Monitoring"
                : "Inactive"}

            </div>


          </div>





          <div
            className="
            mt-8
            grid
            gap-5
            md:grid-cols-3
            "
          >

            {[
              [
                "Total repaid",
                formatCurrency(
                  totalRepaid
                ),
              ],

              [
                "Current balance",
                formatCurrency(
                  usedAmount
                ),
              ],

              [
                "Verified repayments",
                evidence.repaymentCount,
              ],

            ].map(
              ([label, value]) => (

                <div
                  key={label}
                  className="
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-black/20
                  p-5
                  "
                >

                  <div
                    className="
                    text-xs
                    text-zinc-500
                    "
                  >

                    {label}

                  </div>


                  <div
                    className="
                    mt-3
                    text-2xl
                    font-semibold
                    "
                  >

                    {value}

                  </div>


                </div>

              )
            )}


          </div>


        </section>
        {/* TRANSACTION ACTIVITY */}

        <section
          className="
          mt-6
          rounded-3xl
          border
          border-white/[0.07]
          bg-[#090c11]
          p-6
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            <div>

              <div
                className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-zinc-600
                "
              >

                Transaction history

              </div>


              <h3
                className="
                mt-3
                text-xl
                font-semibold
                "
              >

                Credit activity

              </h3>

            </div>


            <button
              onClick={() =>
                router.push("/transactions")
              }
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-xs
              text-zinc-300
              "
            >

              View all

              <ArrowRight
                className="
                h-3.5
                w-3.5
                "
              />

            </button>


          </div>





          <div
            className="
            mt-6
            overflow-x-auto
            "
          >

            <table
              className="
              w-full
              min-w-[700px]
              text-left
              "
            >

              <thead>

                <tr
                  className="
                  border-b
                  border-white/5
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-zinc-600
                  "
                >

                  <th className="pb-3">
                    Activity
                  </th>

                  <th className="pb-3">
                    Amount
                  </th>

                  <th className="pb-3">
                    Status
                  </th>

                  <th className="pb-3">
                    Date
                  </th>

                  <th className="pb-3 text-right">
                    Reference
                  </th>

                </tr>

              </thead>



              <tbody>

                {
                  transactions.length > 0

                    ?

                    transactions.map(
                      (transaction) => (

                        <tr
                          key={transaction.id}
                          className="
                        border-b
                        border-white/5
                        "
                        >

                          <td
                            className="
                          py-4
                          text-sm
                          text-zinc-300
                          "
                          >

                            {
                              transaction.type
                                .replaceAll("_", " ")
                            }

                          </td>


                          <td
                            className="
                          py-4
                          text-sm
                          font-medium
                          "
                          >

                            {
                              transaction.amount
                                ?
                                formatCurrency(
                                  transaction.amount
                                )
                                :
                                "—"
                            }

                          </td>


                          <td
                            className="
                          py-4
                          "
                          >

                            <span
                              className="
                            rounded-lg
                            border
                            border-emerald-400/20
                            bg-emerald-400/5
                            px-2
                            py-1
                            text-[11px]
                            text-emerald-300
                            "
                            >

                              {transaction.status}

                            </span>


                          </td>


                          <td
                            className="
                          py-4
                          text-xs
                          text-zinc-500
                          "
                          >

                            {
                              new Date(
                                transaction.timestamp
                              )
                                .toLocaleDateString()
                            }

                          </td>


                          <td
                            className="
                          py-4
                          text-right
                          font-mono
                          text-xs
                          text-zinc-600
                          "
                          >

                            {
                              transaction.hash ??
                              transaction.id
                            }

                          </td>


                        </tr>

                      )

                    )

                    :

                    (

                      <tr>

                        <td
                          colSpan={5}
                          className="
                        py-10
                        text-center
                        text-xs
                        text-zinc-600
                        "
                        >

                          No transactions yet.

                        </td>

                      </tr>

                    )

                }


              </tbody>


            </table>


          </div>


        </section>








        {/* SYSTEM SAFETY */}


        <section
          className="
          mt-6
          grid
          gap-6
          md:grid-cols-2
          "
        >

          <div
            className="
            rounded-3xl
            border
            border-cyan-400/15
            bg-cyan-400/[0.03]
            p-6
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              text-cyan-300
              "
            >

              <ShieldCheck
                className="
                h-4
                w-4
                "
              />

              Safety Layer

            </div>


            <h3
              className="
              mt-4
              text-xl
              font-semibold
              "
            >

              RiskGuard protection

            </h3>



            <p
              className="
              mt-3
              text-sm
              leading-6
              text-zinc-500
              "
            >

              AI recommends credit.
              RiskGuard limits execution.
              Creditcoin performs settlement.

            </p>


          </div>





          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#090c11]
            p-6
            "
          >

            <div
              className="
              flex
              items-center
              gap-2
              text-zinc-300
              "
            >

              <Wallet
                className="
                h-4
                w-4
                "
              />

              Wallet

            </div>


            <div
              className="
              mt-5
              font-mono
              text-sm
              text-zinc-400
              "
            >

              {
                shortenAddress(
                  useCreditStore.getState().application.walletAddress
                )
              }

            </div>


            <a
              href={
                `${CREDITCOIN_EXPLORER}`
              }
              target="_blank"
              rel="noreferrer"
              className="
              mt-4
              inline-flex
              items-center
              gap-2
              text-xs
              text-cyan-300
              "
            >

              Explorer

              <ExternalLink
                className="
                h-3
                w-3
                "
              />

            </a>


          </div>


        </section>


      </div>








      {/* REPAYMENT MODAL */}


      {
        isRepaymentOpen && (

          <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-5
            "
          >

            <div
              className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#090c11]
              p-6
              "
            >

              <h3
                className="
                text-xl
                font-semibold
                "
              >

                Make repayment

              </h3>


              <input
                type="number"
                value={repaymentAmount}
                onChange={(e) =>
                  setRepaymentAmount(
                    e.target.value
                  )
                }
                placeholder="Amount"
                className="
                mt-6
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-4
                py-3
                text-white
                "
              />



              <button
                onClick={handleRepayment}
                className="
                mt-5
                w-full
                rounded-xl
                bg-cyan-300
                px-4
                py-3
                font-semibold
                text-black
                "
              >

                Confirm repayment

              </button>


            </div>


          </div>

        )
      }







      {/* DRAW MODAL */}


      {
        isDrawOpen && (

          <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-5
            "
          >

            <div
              className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-[#090c11]
              p-6
              "
            >

              <h3
                className="
                text-xl
                font-semibold
                "
              >

                Draw credit

              </h3>


              <input
                type="number"
                value={drawAmount}
                onChange={(e) =>
                  setDrawAmount(
                    e.target.value
                  )
                }
                placeholder="Amount"
                className="
                mt-6
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-4
                py-3
                text-white
                "
              />



              <button
                onClick={handleDraw}
                className="
                mt-5
                w-full
                rounded-xl
                bg-cyan-300
                px-4
                py-3
                font-semibold
                text-black
                "
              >

                Confirm draw

              </button>


            </div>


          </div>

        )
      }


    </main>

  );

}