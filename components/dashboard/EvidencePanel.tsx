"use client";

import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Database,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";


const evidenceCards = [
  {
    title: "Repayment History",
    value: "1 Verified Event",
    description: "Previous obligation successfully completed",
    icon: BadgeCheck,
  },

  {
    title: "Collateral Evidence",
    value: "$1,499 Verified",
    description: "Source-chain asset confirmation",
    icon: Database,
  },

  {
    title: "Financial Activity",
    value: "Cross-chain Proof",
    description: "Cryptographically verified behavior",
    icon: Blocks,
  },
];



const verificationFlow = [
  {
    title: "Ethereum Sepolia",
    description: "Borrower activity source",
    status: "SOURCE VERIFIED",
  },

  {
    title: "Attestcoin",
    description: "Cryptographic verification layer",
    status: "PROOF CREATED",
  },

  {
    title: "Creditcoin",
    description: "Credit execution layer",
    status: "READY",
  },
];



export default function EvidencePanel() {


  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-[#0b0f14]
      p-6
      xl:col-span-2
      "
    >



      {/* HEADER */}


      <div
        className="
        flex
        flex-wrap
        items-start
        justify-between
        gap-4
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

            <ShieldCheck
              size={18}
              className="text-cyan-300"
            />

            Verified Cross-Chain Evidence

          </div>



          <p
            className="
            mt-2
            text-xs
            leading-5
            text-zinc-600
            "
          >
            Attestcoin provides the cryptographic trust layer
            behind autonomous credit decisions.
          </p>


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
            tracking-wide
            text-emerald-300
            "
          >
            Verified
          </span>


        </div>


      </div>







      {/* VERIFICATION FLOW */}


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
          mb-5
          flex
          items-center
          gap-2
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-zinc-600
          "
        >

          <Fingerprint size={14} />

          Trust Pipeline

        </div>





        <div
          className="
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-center
          "
        >



          {verificationFlow.map((item, index) => (

            <div
              key={item.title}
              className="
              flex
              flex-1
              items-center
              gap-3
              "
            >


              <div
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.02]
                p-4
                "
              >


                <div
                  className="
                  text-xs
                  font-semibold
                  text-zinc-200
                  "
                >
                  {item.title}
                </div>



                <div
                  className="
                  mt-2
                  text-[11px]
                  text-zinc-600
                  "
                >
                  {item.description}
                </div>



                <div
                  className="
                  mt-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-cyan-300
                  "
                >
                  {item.status}
                </div>


              </div>




              {index !== verificationFlow.length - 1 && (

                <ArrowRight
                  size={16}
                  className="
                  hidden
                  text-zinc-700
                  md:block
                  "
                />

              )}



            </div>


          ))}



        </div>


      </div>







      {/* EVIDENCE CARDS */}


      <div
        className="
        mt-5
        grid
        gap-3
        md:grid-cols-3
        "
      >


        {evidenceCards.map((item) => (


          <div
            key={item.title}
            className="
            rounded-xl
            border
            border-white/5
            bg-black/20
            p-4
            transition
            hover:border-cyan-400/20
            "
          >


            <item.icon
              size={18}
              className="text-cyan-300"
            />


            <div
              className="
              mt-4
              text-[11px]
              uppercase
              tracking-wide
              text-zinc-600
              "
            >
              {item.title}
            </div>


            <div
              className="
              mt-2
              text-sm
              font-semibold
              text-zinc-200
              "
            >
              {item.value}
            </div>


            <div
              className="
              mt-2
              text-[10px]
              leading-5
              text-zinc-600
              "
            >
              {item.description}
            </div>


          </div>


        ))}


      </div>








      {/* FOOTER CTA */}


      <div
        className="
        mt-5
        flex
        flex-col
        gap-3
        rounded-xl
        border
        border-cyan-400/10
        bg-cyan-400/[0.03]
        p-4
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
            tracking-[0.18em]
            text-cyan-300
            "
          >
            Cryptographic Trust Layer
          </div>


          <div
            className="
            mt-1
            text-xs
            text-zinc-500
            "
          >
            Verified evidence becomes trusted input for the AI decision engine.
          </div>


        </div>




        <Link
          href="/evidence"
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

          Explore Evidence

          <ArrowRight size={13} />

        </Link>


      </div>



    </div>

  );

}