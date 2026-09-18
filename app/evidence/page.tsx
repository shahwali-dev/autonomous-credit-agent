"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  Loader2,
  LockKeyhole,
  Network,
  ShieldCheck,
  Wallet,
  Eye,
} from "lucide-react";

import {
  useCreditStore,
} from "@/lib/store/credit-store";


/* ======================================================
   TYPES
====================================================== */

type SourceActivity = {
  repaymentCount: number;
  failedObligations: number;
  collateral: number;
  activityDays: number;

  latestRepaymentTxHash?: string;
};


type ActivityRow = {
  id: string;
  title: string;
  type: string;
  state: string;

  amount?: string;
  txHash?: string;
};


type SummaryCard = {
  title: string;
  value: string;
  detail: string;
  status:
  | "VERIFIED"
  | "OBSERVED"
  | "PENDING";

  icon: React.ElementType;
};



/* ======================================================
   CONSTANTS
====================================================== */


const SOURCE_CHAIN_EXPLORER_BASE =
  "https://eth-sepolia.blockscout.com/tx/";


const verificationSteps = [
  {
    number: "01",
    title: "Source event detected",
    detail:
      "Financial activity is read directly from the configured source-chain contract.",
  },

  {
    number: "02",
    title: "Proof requested",
    detail:
      "The selected source transaction is submitted to the Attestcoin verification layer.",
  },

  {
    number: "03",
    title: "Evidence verified",
    detail:
      "Cryptographic verification establishes trusted evidence.",
  },

  {
    number: "04",
    title: "AI handoff",
    detail:
      "Verified evidence becomes input for the autonomous credit agent.",
  },
];



/* ======================================================
   HELPERS
====================================================== */


function shortenAddress(
  value?: string
) {
  if (!value) return "—";

  if (value.length < 14) {
    return value;
  }

  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}



function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits: 0,
    }
  ).format(value);
}



/* ======================================================
   COMPONENT
====================================================== */


export default function EvidencePage() {


  const router = useRouter();



  /*
    GLOBAL CREDIT STATE
  */

  const application =
    useCreditStore(
      (state) => state.application
    );


  const evidenceState =
    useCreditStore(
      (state) => state.evidence
    );


  const setEvidence =
    useCreditStore(
      (state) => state.setEvidence
    );


  const addTransaction =
    useCreditStore(
      (state) => state.addTransaction
    );



  /*
    LOCAL STATE
  */


  const [
    loadingActivity,
    setLoadingActivity,
  ] = useState(false);


  const [
    verifying,
    setVerifying,
  ] = useState(false);


  const [
    activityLoaded,
    setActivityLoaded,
  ] = useState(false);


  const [
    verificationError,
    setVerificationError,
  ] = useState("");



  const walletAddress =
    application.walletAddress;



  /* ======================================================
     LOAD SOURCE CHAIN ACTIVITY
  ====================================================== */


  const loadActivity = async (
    address: string,
    options?: {
      silent?: boolean;
    }
  ) => {


    const silent =
      options?.silent ?? false;


    if (!silent) {
      setLoadingActivity(true);
    }


    try {


      const response =
        await fetch(
          `/api/source-chain/activity?wallet=${encodeURIComponent(address)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );



      const data =
        await response.json();



      if (
        !response.ok ||
        !data.success
      ) {

        throw new Error(
          data.error ||
          "Unable to load source activity"
        );

      }



      const activity =
        data.activity as SourceActivity;



      setEvidence({

        repaymentCount:
          activity.repaymentCount,

        failedObligations:
          activity.failedObligations,

        collateral:
          activity.collateral,

        activityDays:
          activity.activityDays,

      });



      setActivityLoaded(true);



      return activity;



    } catch (error) {


      console.error(
        error
      );


      return null;



    } finally {


      if (!silent) {

        setLoadingActivity(false);

      }

    }

  };



  useEffect(() => {


    if (!walletAddress) {

      setActivityLoaded(false);

      return;

    }


    void loadActivity(
      walletAddress
    );


    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [
    walletAddress
  ]);





  /* ======================================================
     DERIVED DATA
  ====================================================== */


  const isVerified =
    evidenceState.verified === true;



  const hasObservedEvidence =
    activityLoaded &&
    (
      evidenceState.repaymentCount > 0 ||
      evidenceState.collateral > 0
    );



  const activityRows =
    useMemo<ActivityRow[]>(() => {


      const rows: ActivityRow[] = [];



      if (
        evidenceState.repaymentCount > 0
      ) {

        rows.push({

          id: "repayment",

          title:
            "Repayment activity",

          type:
            "Repayment",

          state:
            "Detected",

          amount:
            "$100",

          txHash:
            evidenceState.txHash,

        });

      }



      if (
        evidenceState.collateral > 0
      ) {

        rows.push({

          id: "collateral",

          title:
            "Collateral record",

          type:
            "Collateral",

          state:
            "Observed",

          amount:
            `$${formatNumber(
              evidenceState.collateral
            )}`,

        });

      }



      return rows;


    }, [
      evidenceState
    ]);





  const summaryCards =
    useMemo<SummaryCard[]>(() => [


      {

        title:
          "Repayment history",

        value:
          `${evidenceState.repaymentCount}`,

        detail:
          "verified repayment events",

        status:
          isVerified
            ? "VERIFIED"
            : hasObservedEvidence
              ? "OBSERVED"
              : "PENDING",

        icon:
          CheckCircle2,

      },


      {

        title:
          "Verified collateral",

        value:
          `$${formatNumber(
            evidenceState.collateral
          )}`,

        detail:
          "on-chain collateral",

        status:
          isVerified
            ? "VERIFIED"
            : "OBSERVED",

        icon:
          Database,

      },


      {

        title:
          "Activity period",

        value:
          `${evidenceState.activityDays} days`,

        detail:
          "observed financial history",

        status:
          hasObservedEvidence
            ? "OBSERVED"
            : "PENDING",

        icon:
          Activity,

      },


    ], [
      evidenceState,
      isVerified,
      hasObservedEvidence,
    ]);



  /* ======================================================
     VERIFY HANDLER
  ====================================================== */

  const handleAnalyze = async () => {

    if (!walletAddress) {

      setVerificationError(
        "Borrower wallet is not connected."
      );

      return;

    }


    setVerifying(true);

    setVerificationError("");



    try {


      const activity =
        await loadActivity(
          walletAddress,
          {
            silent: true,
          }
        );



      if (!activity) {

        throw new Error(
          "Unable to read source chain activity."
        );

      }



      if (
        !activity.latestRepaymentTxHash
      ) {

        throw new Error(
          "No repayment transaction found."
        );

      }



      const response =
        await fetch(
          "/api/attestcoin/verify",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              txHash:
                activity.latestRepaymentTxHash,

              walletAddress,

            }),

          }
        );



      const data =
        await response.json();



      if (
        !response.ok ||
        !data.success ||
        !data.verified
      ) {

        throw new Error(
          data.error ||
          "Attestcoin verification failed."
        );

      }



      setEvidence({

        verified: true,

        txHash:
          data.txHash,

        sourceBlock:
          data.sourceBlock,

        proofHash:
          data.proofHash ?? "",

        verificationStatus:
          "VERIFIED",

      });



      addTransaction({

        id:
          `evidence-${Date.now()}`,

        type:
          "EVIDENCE_VERIFIED",

        status:
          "VERIFIED",

        network:
          "Ethereum Sepolia + Attestcoin",

        hash:
          data.txHash,

        timestamp:
          Date.now(),

      });



      router.push("/agent");



    } catch (error) {


      setVerificationError(

        error instanceof Error
          ? error.message
          : "Verification failed."

      );



    } finally {


      setVerifying(false);


    }

  };





  return (

    <main className="min-h-screen bg-[#07090d] text-white">


      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

        <div className="absolute right-[-10%] top-[20%] h-[350px] w-[350px] rounded-full bg-violet-500/[0.04] blur-[120px]" />

      </div>



      <div className="relative mx-auto max-w-[1500px] px-5 py-8 lg:px-10">



        {/* HEADER */}

        <header className="mb-8 flex flex-col gap-5 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">


          <div>


            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">

              <ShieldCheck className="h-4 w-4" />

              Evidence Intelligence

            </div>



            <h1 className="mt-4 text-4xl font-semibold tracking-tight">

              Verified financial evidence

            </h1>



            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">

              Source-chain activity is verified through
              Attestcoin before becoming trusted input
              for the autonomous Credit Agent.

            </p>


          </div>




          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs">


            {isVerified ? (

              <span className="flex items-center gap-2 text-emerald-300">

                <CheckCircle2 className="h-4 w-4" />

                Attestcoin Verified

              </span>


            ) : (

              <span className="flex items-center gap-2 text-zinc-400">

                <Clock3 className="h-4 w-4" />

                Awaiting verification

              </span>

            )}


          </div>



        </header>





        {/* TRUST ARCHITECTURE */}


        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02]">


          <div className="grid lg:grid-cols-3">


            {[
              {
                icon: Database,
                title: "Source Chain",
                value: "Ethereum Sepolia",
                active: hasObservedEvidence,
              },

              {
                icon: Fingerprint,
                title: "Trust Layer",
                value: "Attestcoin",
                active: isVerified,
              },


              {
                icon: Activity,
                title: "Intelligence",
                value: "AI Credit Agent",
                active: false,
              },

            ].map((item) => {


              const Icon = item.icon;


              return (

                <div
                  key={item.title}
                  className="flex items-center gap-4 border-b border-white/5 p-5 lg:border-b-0 lg:border-r"
                >

                  <div className="rounded-xl border border-white/10 p-3">

                    <Icon className="h-5 w-5 text-cyan-300" />

                  </div>


                  <div>

                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">

                      {item.title}

                    </p>


                    <p className="mt-1 text-sm">

                      {item.value}

                    </p>

                  </div>


                </div>

              );


            })}


          </div>


        </section>





        {/* WALLET */}


        <section className="mb-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-5">


          <div className="flex items-center gap-4">


            <Wallet className="h-5 w-5 text-cyan-300" />


            <div>


              <p className="text-[10px] uppercase tracking-widest text-zinc-600">

                Applicant Wallet

              </p>


              <p className="mt-1 font-mono text-sm">

                {walletAddress
                  ? shortenAddress(walletAddress)
                  : "Not connected"}

              </p>


            </div>


          </div>


        </section>





        {/* ERROR */}


        {verificationError && (

          <div className="mb-6 flex gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4">

            <AlertTriangle className="text-red-300" />

            <p className="text-sm text-red-300">

              {verificationError}

            </p>

          </div>

        )}







        {/* SUMMARY CARDS */}


        <section className="mb-6 grid gap-4 md:grid-cols-3">


          {summaryCards.map((card) => {


            const Icon = card.icon;


            return (

              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-[#0b0f14] p-5"
              >

                <Icon className="h-5 w-5 text-cyan-300" />


                <p className="mt-5 text-xs text-zinc-500">

                  {card.title}

                </p>


                <p className="mt-2 text-3xl font-semibold">

                  {card.value}

                </p>


                <p className="mt-1 text-xs text-zinc-600">

                  {card.detail}

                </p>


              </div>

            );


          })}


        </section>






        {/* MAIN GRID */}


        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">





          {/* ACTIVITY */}


          <section className="rounded-2xl border border-white/10 bg-[#0b0f14]">


            <div className="border-b border-white/10 p-5">

              <h2 className="text-sm font-semibold">

                Financial activity

              </h2>

              <p className="mt-1 text-xs text-zinc-600">

                Evidence observed directly from wallet.

              </p>

            </div>




            {loadingActivity ? (

              <div className="flex h-52 items-center justify-center">

                <Loader2 className="animate-spin text-cyan-300" />

              </div>


            ) : (


              <div className="divide-y divide-white/5">


                {activityRows.map((row) => (


                  <div
                    key={row.id}
                    className="flex items-center justify-between p-5"
                  >


                    <div>

                      <p className="text-sm">

                        {row.title}

                      </p>


                      <p className="text-xs text-zinc-600">

                        {row.type}

                      </p>


                    </div>



                    <div className="text-right">


                      <p className="text-sm">

                        {row.amount}

                      </p>


                      {row.txHash && (

                        <a
                          target="_blank"
                          href={`${SOURCE_CHAIN_EXPLORER_BASE}${row.txHash}`}
                          className="text-xs text-cyan-300"
                        >

                          View tx

                        </a>

                      )}


                    </div>


                  </div>


                ))}


              </div>


            )}


          </section>








          {/* ATTESTCOIN PANEL */}


          <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-5">


            <div className="flex items-center gap-2">

              <Fingerprint className="text-cyan-300" />

              <h2 className="text-sm font-semibold">

                Attestcoin verification

              </h2>

            </div>




            <div className="mt-6 space-y-3">


              {verificationSteps.map((step) => (


                <div
                  key={step.number}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >

                  <p className="text-xs font-medium">

                    {step.number} — {step.title}

                  </p>


                  <p className="mt-2 text-[11px] text-zinc-600">

                    {step.detail}

                  </p>


                </div>


              ))}


            </div>





            <button

              onClick={handleAnalyze}

              disabled={
                verifying ||
                loadingActivity ||
                !walletAddress
              }

              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-40"

            >


              {verifying ? (

                <>
                  <Loader2 className="animate-spin" />
                  Verifying...
                </>

              ) : (

                <>
                  Verify evidence
                  <ArrowRight />
                </>

              )}


            </button>


          </section>



        </div>







        {/* PIPELINE */}


        <section className="mt-6 rounded-2xl border border-white/10 bg-[#0b0f14] p-5">


          <h2 className="text-sm font-semibold">

            Evidence verification pipeline

          </h2>


          <div className="mt-5 grid gap-3 lg:grid-cols-4">


            {verificationSteps.map((step) => (


              <div
                key={step.number}
                className="rounded-xl border border-white/10 p-4"
              >

                <p className="font-mono text-xs text-zinc-600">

                  {step.number}

                </p>


                <p className="mt-3 text-xs">

                  {step.title}

                </p>


              </div>


            ))}


          </div>


        </section>





      </div>


    </main>

  );


}