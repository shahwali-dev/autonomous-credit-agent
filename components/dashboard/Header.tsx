"use client";

import Link from "next/link";

import {
  Activity,
  Bot,
  ChevronRight,
  Wallet,
  Wifi,
} from "lucide-react";


export default function Header() {
  return (
    <header
      className="
      flex
      min-h-20
      items-center
      justify-between
      border-b
      border-white/10
      bg-[#090c11]/80
      px-4
      backdrop-blur-xl
      sm:px-6
      md:px-8
      "
    >


      {/* LEFT SIDE */}

      <div className="min-w-0">


        <div
          className="
          flex
          items-center
          gap-2
          text-[11px]
          uppercase
          tracking-[0.2em]
          text-zinc-500
          "
        >

          <Activity size={13} />

          Credit Intelligence Network

        </div>



        <h1
          className="
          mt-1
          truncate
          text-base
          font-semibold
          tracking-tight
          text-white
          sm:text-lg
          "
        >

          Autonomous Credit Dashboard

        </h1>



      </div>






      {/* RIGHT SIDE */}


      <div
        className="
        ml-4
        flex
        shrink-0
        items-center
        gap-2
        sm:gap-3
        "
      >




        {/* AGENT STATUS */}


        <div
          className="
          hidden
          items-center
          gap-2
          rounded-xl
          border
          border-emerald-400/20
          bg-emerald-400/5
          px-3
          py-2
          md:flex
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


          <Bot
            size={14}
            className="text-emerald-300"
          />


          <span
            className="
            text-[11px]
            font-medium
            text-emerald-300
            "
          >
            AI Agent Online
          </span>


        </div>








        {/* NETWORK */}



        <div
          className="
          hidden
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[0.02]
          px-3
          py-2
          sm:flex
          "
        >

          <Wifi
            size={14}
            className="text-cyan-300"
          />


          <div>

            <div
              className="
              text-[9px]
              uppercase
              tracking-widest
              text-zinc-600
              "
            >
              Network
            </div>


            <div
              className="
              text-[11px]
              font-medium
              text-zinc-300
              "
            >
              Creditcoin Testnet
            </div>


          </div>


        </div>







        {/* WALLET BUTTON */}



        <Link
          href="/apply"
          className="
          group
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-cyan-400/30
          bg-cyan-400/10
          px-3
          py-2
          text-xs
          font-medium
          text-cyan-300
          transition
          hover:bg-cyan-400/20
          sm:px-4
          "
        >


          <Wallet
            size={15}
          />


          <span className="hidden sm:inline">
            Connect Wallet
          </span>


          <span className="sm:hidden">
            Wallet
          </span>



          <ChevronRight
            size={13}
            className="
            transition
            group-hover:translate-x-0.5
            "
          />


        </Link>




      </div>



    </header>
  );
}