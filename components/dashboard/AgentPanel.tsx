"use client";

import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ShieldAlert,
  Sparkles,
} from "lucide-react";



const workflow = [
  {
    step: "01",
    title: "Evidence Analysis",
    description: "Verify borrower financial signals",
    status: "COMPLETE",
  },
  {
    step: "02",
    title: "Risk Evaluation",
    description: "Calculate credit confidence score",
    status: "COMPLETE",
  },
  {
    step: "03",
    title: "Policy Validation",
    description: "Apply deterministic RiskGuard rules",
    status: "COMPLETE",
  },
  {
    step: "04",
    title: "Credit Execution",
    description: "Prepare Creditcoin transaction",
    status: "READY",
  },
];



export default function AgentPanel() {


  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-[#0b0f14]
      p-6
      "
    >




      {/* HEADER */}


      <div
        className="
        flex
        items-start
        justify-between
        gap-3
        "
      >

        <div>


          <div
            className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            "
          >

            <BrainCircuit
              size={18}
              className="text-cyan-300"
            />

            AI Credit Agent


          </div>



          <div
            className="
            mt-2
            text-xs
            text-zinc-600
            "
          >
            Autonomous risk intelligence engine
          </div>


        </div>





        <div
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-emerald-400/20
          bg-emerald-400/5
          px-3
          py-2
          "
        >

          <span
            className="
            h-2
            w-2
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(52,211,153,0.8)]
            "
          />


          <span
            className="
            text-[10px]
            font-semibold
            uppercase
            text-emerald-300
            "
          >
            Online
          </span>


        </div>


      </div>







      {/* AI DECISION CARD */}



      <div
        className="
        mt-6
        rounded-2xl
        border
        border-white/10
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


          <div
            className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-zinc-600
            "
          >
            Current Assessment
          </div>



          <div
            className="
            flex
            items-center
            gap-1
            rounded-lg
            border
            border-emerald-400/20
            bg-emerald-400/5
            px-2
            py-1
            text-[9px]
            font-semibold
            uppercase
            text-emerald-300
            "
          >

            <CheckCircle2 size={12} />

            APPROVED

          </div>



        </div>






        {/* SCORE */}


        <div
          className="
          mt-6
          flex
          items-center
          gap-5
          "
        >


          <div
            className="
            relative
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/5
            "
          >

            <div className="text-center">

              <div
                className="
                text-3xl
                font-bold
                text-white
                "
              >
                82
              </div>


              <div
                className="
                text-[9px]
                uppercase
                tracking-wide
                text-cyan-300
                "
              >
                Risk Score
              </div>


            </div>


          </div>





          <div>


            <div
              className="
              text-xs
              text-zinc-500
              "
            >
              AI Recommendation
            </div>


            <div
              className="
              mt-1
              text-xl
              font-semibold
              text-emerald-300
              "
            >
              Approve Credit
            </div>


            <div
              className="
              mt-2
              max-w-xs
              text-xs
              leading-5
              text-zinc-600
              "
            >
              Strong repayment history and verified collateral
              indicate acceptable borrower risk.
            </div>


          </div>



        </div>








        {/* TERMS */}


        <div
          className="
          mt-6
          grid
          grid-cols-2
          gap-3
          "
        >


          <div
            className="
            rounded-xl
            border
            border-white/5
            bg-white/[0.02]
            p-3
            "
          >

            <CircleDollarSign
              size={16}
              className="text-cyan-300"
            />

            <div
              className="
              mt-2
              text-[10px]
              text-zinc-600
              "
            >
              Credit Amount
            </div>


            <div
              className="
              mt-1
              text-lg
              font-semibold
              "
            >
              700 TEST
            </div>


          </div>






          <div
            className="
            rounded-xl
            border
            border-white/5
            bg-white/[0.02]
            p-3
            "
          >

            <Clock3
              size={16}
              className="text-violet-300"
            />

            <div
              className="
              mt-2
              text-[10px]
              text-zinc-600
              "
            >
              Duration
            </div>


            <div
              className="
              mt-1
              text-lg
              font-semibold
              "
            >
              30 Days
            </div>


          </div>



        </div>



      </div>







      {/* WORKFLOW */}


      <div className="mt-6">


        <div
          className="
          flex
          items-center
          gap-2
          text-[10px]
          uppercase
          tracking-[0.18em]
          text-zinc-600
          "
        >

          <Sparkles size={13} />

          Agent Workflow

        </div>





        <div
          className="
          mt-4
          space-y-3
          "
        >


          {workflow.map((item) => (


            <div
              key={item.step}
              className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/5
              bg-black/20
              p-3
              "
            >


              <div
                className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                border
                border-cyan-400/20
                text-[10px]
                font-mono
                text-cyan-300
                "
              >
                {item.step}
              </div>



              <div className="flex-1">

                <div
                  className="
                  text-xs
                  text-zinc-300
                  "
                >
                  {item.title}
                </div>


                <div
                  className="
                  mt-1
                  text-[10px]
                  text-zinc-600
                  "
                >
                  {item.description}
                </div>

              </div>




              <span
                className="
                text-[9px]
                font-semibold
                uppercase
                text-emerald-300
                "
              >
                {item.status}
              </span>



            </div>


          ))}


        </div>


      </div>








      {/* LINK */}


      <div
        className="
        mt-5
        border-t
        border-white/5
        pt-4
        "
      >

        <Link
          href="/agent"
          className="
          flex
          items-center
          gap-1
          text-xs
          font-medium
          text-cyan-300
          hover:text-cyan-200
          "
        >

          Open AI Agent Console

          <ArrowRight size={13} />

        </Link>


      </div>



    </div>

  );

}